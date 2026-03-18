---
title: publish
description: Strip local comments and publish clean commits from your shadow branch to the public branch.
sidebar:
  label: publish
  order: 3
category: commands
---

The core command of git-shadow. It strips local comments from your staged changes, creates two commits (one clean, one with comments), and cherry-picks the clean commit to the public branch.

## Usage

```bash
# If you've already committed on @local
git shadow publish

# Commit and publish in one step
git shadow publish --commit -m "your commit message"
```

## Full workflow example

```bash
# On feature/login@local — work normally
git add .
git shadow publish --commit -m "feat(auth): user login function"

# Then push the public branch normally
git push origin feature/login
```

## What it does

1. **Strips** local comments (matching `LOCAL_COMMENT_PATTERN`, default: `///`) from staged files
2. **Creates two commits** on `@local`:
   - one with your changes and local comments intact (stays in `@local`)
   - one with only the clean code (will be cherry-picked)
3. **Cherry-picks** the clean commit onto the public branch

Your `@local` branch retains the full history including comments. The public branch gets only clean, reviewable commits.

## MEMORY commits

Commits prefixed with `[MEMORY]` are **never cherry-picked** to the public branch. Use them for AI context files, local environment changes, or personal helpers.

```bash
git shadow publish --commit -m "[MEMORY] add domain model notes for AI"
```

## After publishing

```bash
# Push to remote as usual
git push origin feature/login
```

Your `@local` branch is never pushed — it stays local by design.

## Related

- [commit](/docs/commands/commit) — commit only, without publishing
- [new-feature](/docs/commands/new-feature) — create a new feature with both branches
- [finish-feature](/docs/commands/finish-feature) — clean up after the MR is merged
