---
title: Troubleshooting
description: Recovery steps for the most common situations where git shadow operations go wrong.
sidebar:
  label: Troubleshooting
  order: 1
category: troubleshooting
---

> **Quick state check** — when something feels off, start here:
> ```bash
> git status          # what branch, what is staged
> git shadow status   # shadow/public pair health
> git log --oneline -5
> ```

## Cherry-pick conflict during `feature publish`

**Symptom:** `feature publish` stops mid-run with a message like:

```
CONFLICT (content): Merge conflict in src/auth.ts
error: could not apply abc1234... feat: login function
hint: After resolving the conflicts, run:
      git cherry-pick --continue
```

**What happened:** `feature publish` cherry-picks each publishable commit from your `@local` branch to the public branch one by one. A conflict means the public branch has changes that overlap with the commit being cherry-picked.

**Where you are:** You are on the **public branch** (e.g. `feature/login`) with `CHERRY_PICK_HEAD` set.

**Recovery — option A: resolve and continue**

```bash
# 1. Open the conflicting file(s) and resolve the markers (<<<<, ====, >>>>)
# 2. Stage the resolved files
git add src/auth.ts

# 3. Continue the cherry-pick
git cherry-pick --continue

# 4. Re-run publish — it will skip already-cherry-picked commits
git checkout feature/login@local
git shadow feature publish
```

**Recovery — option B: abort and go back**

```bash
# Cancel the cherry-pick entirely — the public branch is left as it was before publish
git cherry-pick --abort

# Return to your shadow branch to investigate
git checkout feature/login@local
```

**Prevention:** Keep your shadow and public branches in sync. If the public branch received changes since your last publish, merge them into your shadow branch first:

```bash
git checkout feature/login@local
git merge feature/login
git shadow feature publish
```

---

## Merge conflict during `feature finish`

**Symptom:** `feature finish` exits mid-run with:

```
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.
```

**What happened:** `feature finish` runs two merges in sequence:
1. Sync merge: `main` → `main@local`
2. Feature merge: `feature@local` → `main@local`

The conflict occurred in one of these two merges.

**Where you are:** You are on **`main@local`** with `MERGE_HEAD` set.

**Recovery:**

```bash
# 1. Check which files are in conflict
git status

# 2. Resolve the conflict markers in each file
# 3. Stage the resolved files
git add path/to/file.txt

# 4. Complete the merge
git merge --continue

# 5. If the conflict was in the sync merge, re-run finish to complete the feature merge
git checkout feature/login@local
git shadow feature finish --no-pull
```

**To start over:**

```bash
git merge --abort
# You are back on main@local in a clean state
git log --oneline --graph main main@local feature/login@local
```

---

## Pre-commit hook is blocking a legitimate commit

**Symptom:**

```
❌ Commit blocked: local comments are still present in staged files.
```

**Cause A: you staged local comments by accident**

Use `git shadow commit` instead of `git commit` — it strips comments automatically:

```bash
git shadow commit -m "your message"
```

**Cause B: the pattern is matching real code**

The default `LOCAL_COMMENT_PATTERN` matches `///`, `##`, `%%`, and `<!--`. If your project uses these legitimately (Rust doc comments, bash headers, HTML…), adjust the pattern:

```bash
# Check which lines are being flagged
git shadow check-local-comments

# Restrict the pattern to only your chosen marker
git shadow config set LOCAL_COMMENT_PATTERN '^[[:space:]]*(///)' --project-config
```

**Cause C: one-off bypass**

```bash
git commit --no-verify -m "your message"
```

---

## Sync stuck mid-rebase (`feature sync` without `--merge`)

**Symptom:** `feature sync` paused on a `[MEMORY]` commit conflict and you are now in a detached HEAD state.

**Where you are:** `git rev-parse --git-dir)/rebase-merge` exists. HEAD is detached.

**Recovery — resolve and continue:**

```bash
# 1. Check which files are conflicted
git status

# 2. Open each conflicted file, resolve the markers, then stage
git add path/to/file.md

# 3. Resume
git shadow feature sync --continue
```

**Recovery — give up and go back:**

```bash
git shadow feature sync --abort
```

**The rebase loop never ends (infinite conflicts):** This can happen if a cherry-picked commit was already applied with a different patch ID (e.g. after a prior conflict resolution). Skip the offending commit:

```bash
git rebase --skip
# Then resume the sync loop by re-running
git shadow feature sync --continue
```

---

## Sync stuck mid-merge (`feature sync --merge`)

**Symptom:** `git merge` left conflict markers and `MERGE_HEAD` is set (this is rare — `--merge` mode uses `-X theirs` which resolves automatically, but binary conflicts or rename conflicts can still require manual attention).

**Where you are:** You are on the shadow branch with `MERGE_HEAD` set.

**Recovery — resolve and continue:**

```bash
git status
# Fix conflicted files, then:
git add path/to/file
git shadow feature sync --continue
```

**Recovery — abort:**

```bash
git shadow feature sync --abort
```

---

## Shared shadow branch diverged after `feature sync --merge`

**Symptom:** After running `git shadow feature sync --merge` and pushing, a teammate gets `rejected - non-fast-forward`.

**What happened:** The merge created a new merge commit on the shadow branch. Teammates who had already pulled the old tip now have a diverged history.

**Fix — teammates pull with rebase:**

```bash
git pull --rebase origin feature/login@local
```

**Fix — force push (only if you are the sole maintainer of the shadow branch at this moment):**

```bash
git push --force-with-lease origin feature/login@local
```

> Prefer `--force-with-lease` over `--force` — it refuses to push if someone else pushed in the meantime.

---

## Public branch is ahead of the shadow branch

**Symptom:** `git shadow status` reports `public branch ahead`.

**What happened:** Commits were added to the public branch (teammate merge, hotfix…) that your shadow branch does not contain.

**Recovery (recommended):**

```bash
git checkout feature/login@local
git shadow feature sync          # personal branch: rebase
# or
git shadow feature sync --merge  # shared branch: merge
```

**Manual recovery:**

```bash
git checkout feature/login@local
git merge feature/login
```

After this, `git shadow status` should report `up to date` or `ready to publish`.

---

## Shadow base branch is behind after a team pull

**Symptom:** Your teammates merged into `main` but `main@local` is now behind.

**Recovery:**

```bash
git checkout main && git pull
git checkout main@local && git merge main
```

`git shadow feature finish` performs this sync automatically at end-of-feature time.

---

## Public branch was accidentally deleted

**Recovery:** Recreate the public branch and re-publish from the shadow branch.

```bash
git checkout feature/login@local

# Recreate the public branch from the base
git checkout main
git checkout -b feature/login

# Re-publish — patch comparison detects which commits are missing
git checkout feature/login@local
git shadow feature publish
```

`feature publish` uses patch-content comparison (not SHAs), so it correctly identifies which commits need to be cherry-picked even on a freshly created branch.

---

## LOCAL_COMMENT_PATTERN matches real code

**Symptom:** Real code is being stripped by `git shadow commit`, or the pre-commit hook produces false positives.

**Common triggers:**

| Pattern | Real code causing it | Fix |
|---|---|---|
| `///` | Rust doc comments | Remove `///` from pattern |
| `##` | Bash section headers | Remove `##` from pattern |
| `<!--` | Regular HTML comments | Remove `<!--` from pattern |

**Diagnose:**

```bash
git shadow check-local-comments
```

**Fix:**

```bash
# Keep only your chosen marker
git shadow config set LOCAL_COMMENT_PATTERN '^[[:space:]]*(%%)'  --project-config
git shadow config get LOCAL_COMMENT_PATTERN
```

**Recommended single-language patterns:**

```bash
# TypeScript / JavaScript
LOCAL_COMMENT_PATTERN='^[[:space:]]*(///)'

# Python
LOCAL_COMMENT_PATTERN='^[[:space:]]*(##)'

# Mixed project — use an unlikely marker
LOCAL_COMMENT_PATTERN='^[[:space:]]*(//!|##!)'
```

---

## Removing git shadow hooks from a project

**Identify the hook location:**

```bash
git config --get core.hooksPath   # custom path if set; default is .git/hooks/
```

**Remove only the git-shadow block (recommended):**

Open the hook file and delete the section delimited by `# git-shadow pre-commit hook` / `# git-shadow pre-push hook` down to its `exit 0` line.

If the file contained only the git-shadow block:

```bash
rm .git/hooks/pre-commit
rm .git/hooks/pre-push
```

**Temporarily bypass hooks for one operation:**

```bash
git commit --no-verify -m "your message"
git push --no-verify
```

---

## Adopting git shadow on an existing repository

**Scenario:** You have an existing feature branch and want to start using the shadow branch pattern without losing your work.

```bash
# 1. Create the shadow branch at the current tip of your feature branch
git checkout feature/login
git checkout -b feature/login@local

# 2. Install hooks
git shadow install-hooks

# 3. Create the shadow base branch if it doesn't exist
git checkout main
git checkout -b main@local

# 4. Work from the shadow branch going forward
git checkout feature/login@local
```

From now on, use `git shadow commit` and `git shadow feature publish` normally. Existing commits will not be retroactively split — only new commits are affected.

---

## Binary not found after installation

**Symptom:** `git shadow` returns `command not found`.

**Curl install:** The binary is linked to `~/.local/bin`. Add it to your PATH if needed:

```bash
export PATH="$HOME/.local/bin:$PATH"
# Add this line permanently to ~/.bashrc or ~/.zshrc
source ~/.bashrc
```

**Verify:**

```bash
git shadow version
git shadow doctor
```

If the binary exists but fails with `TOOLKIT_ROOT not found`, the symlink is pointing to a deleted installation directory. Re-run the installer to fix it:

```bash
curl -fsSL https://raw.githubusercontent.com/filozofer/git-shadow/main/install.sh | bash
```
