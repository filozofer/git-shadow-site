---
title: feature sync
description: Sync your shadow branch with its public counterpart — rebase mode (default) or merge mode for shared shadow branches.
sidebar:
  label: feature sync
  order: 5
category: commands
---

Keep your `@local` shadow branch in sync with the public branch after colleagues push new commits. Two modes are available depending on whether your shadow branch is personal or shared with teammates.

## Usage

```bash
# Default: rebase the shadow branch onto the public branch
git shadow feature sync

# Shared shadow branch: merge instead of rebase (preserves history for push/pull workflows)
git shadow feature sync --merge

# Resume after manually resolving a [MEMORY] conflict
git shadow feature sync --continue

# Abort and return to the state before sync
git shadow feature sync --abort
```

## What it does

1. Validates you are on a shadow branch (ending with `@local`)
2. Runs `git rebase <public-branch>` to replay your shadow commits on top of the latest public work
3. For each conflicting commit:
   - **Regular code commit** → auto-resolved in favour of the public branch (`--ours`). If the commit becomes empty after resolution, it is silently dropped.
   - **`[MEMORY]` commit** → paused for manual resolution. Your local AI context files are never silently overwritten.
4. Prints a success message once all commits are replayed.

## Conflict handling

### Code commits

Conflicts on regular commits are resolved automatically — the public branch version wins. You do not need to intervene.

```
🧠 Auto-resolving (code commit): feat(auth): update login route
```

### [MEMORY] commits

Conflicts on `[MEMORY]` commits require manual resolution:

```
⚠️  Conflict on shadow commit: [MEMORY] add domain model notes
ℹ️  Conflicted files:
     docs/domain-model.md
ℹ️  Resolve conflicts manually, then run:
   git shadow feature sync --continue
ℹ️  To abort:
   git shadow feature sync --abort
```

Open the conflicted files, resolve them, stage the result, then continue:

```bash
# Resolve the conflicts in your editor, then:
git add docs/domain-model.md
git shadow feature sync --continue
```

## Shared shadow branches (--merge mode)

By default, shadow branches are personal and local. But you can share a shadow branch with teammates by pushing it to the remote (see the FAQ). In that case, **rebase rewrites history** and would break your teammates' local copies — use `--merge` instead.

`--merge` runs `git merge -X theirs <public-branch>`, which:
- Merges in the public branch commits in a single step
- Auto-resolves all code conflicts in favour of the public branch
- Preserves your `[MEMORY]` files (they don't exist on the public branch, so they never conflict)
- Keeps a linear, push-friendly history

```bash
# Shared shadow branch workflow
git pull origin feature/login@local     # pull teammates' shadow commits
git pull origin feature/login           # update the public branch locally
git shadow feature sync --merge         # merge public into shadow, public wins on conflicts
git push origin feature/login@local     # share the updated shadow branch
```

> **Why does public win on conflicts?** The shadow branch's extra content is your team's thinking layer — local comments, `[MEMORY]` files, notes. The *code* should always match the public branch so the thinking layer stays anchored to the latest reviewed state.

## When to use it

Run `feature sync` whenever the public branch has advanced since you last synced — typically after a colleague pushes, or before opening a merge request.

```bash
# Typical mid-feature workflow
git pull origin feature/login           # update public branch
git shadow feature sync                 # rebase shadow onto it (personal branch)
# or
git shadow feature sync --merge         # merge public into shadow (shared branch)
```

## Related

- [feature start](/docs/commands/feature-start) — create a new feature with both branches
- [feature publish](/docs/commands/feature-publish) — cherry-pick clean commits to the public branch
- [feature finish](/docs/commands/feature-finish) — clean up after the MR is merged
- [FAQ: sharing shadow branches](/docs/faq#can-i-share-my-shadow-branch-with-teammates)
