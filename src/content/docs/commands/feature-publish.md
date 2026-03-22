---
title: feature publish
description: Cherry-pick clean commits from your shadow branch to the public branch, skipping local-only commits.
sidebar:
  label: feature publish
  order: 3
category: commands
---

Publish your work from the `@local` branch to the public branch. This command uses `git cherry` to identify commits that are not yet present on the public branch, skips any `[MEMORY]`-prefixed commits, and cherry-picks the rest in order.

## Usage

```bash
# If you've already committed on @local
git shadow feature publish

# Commit and publish in one step
git shadow feature publish --commit -m "your commit message"
```

## Full workflow example

```bash
# On feature/login@local — work normally
git add .
git shadow feature publish --commit -m "feat(auth): user login function"

# Then push the public branch normally
git push origin feature/login
```

## What it does

1. If `--commit` is passed, runs `git shadow commit` first (strips local comments, creates two commits on `@local`)
2. Uses `git cherry` to find commits in `@local` not yet in the public branch
3. Skips commits whose message matches `SHADOW_COMMIT_FILTER` (default: `[MEMORY]` prefix)
4. Cherry-picks the remaining commits onto the public branch in order
5. Skips empty cherry-picks (patches already applied) automatically
6. Stops with an error on conflict — resolve it, then run `git cherry-pick --continue` or `git cherry-pick --abort`

Your `@local` branch retains the full history including local comments. The public branch receives only clean, reviewable commits.

## [MEMORY] commits

Commits prefixed with `[MEMORY]` are **never cherry-picked** to the public branch. Use them for AI context files, local environment changes, or personal helpers.

```bash
git shadow commit -m "[MEMORY] add domain model notes for AI"
```

The `[MEMORY]` prefix is configurable via `SHADOW_COMMIT_PREFIX`.

## After publishing

```bash
# Push to remote as usual
git push origin feature/login
```

Your `@local` branch is blocked from being pushed by the pre-push hook — it stays local by design.

## Related

- [commit](/docs/commands/commit) — commit only, without publishing
- [feature start](/docs/commands/feature-start) — create a new feature with both branches
- [feature finish](/docs/commands/feature-finish) — clean up after the MR is merged
