---
title: feature start
description: Create a new feature with its public branch and shadow branch counterpart.
sidebar:
  label: feature start
  order: 1
category: commands
---

Create a new feature. This command creates both the public branch and its `@local` shadow counterpart, then switches you to the shadow branch to start working.

## Usage

```bash
git shadow feature start <branch-name>
```

## Example

```bash
git shadow feature start feature/user-login
```

This creates:

```
feature/user-login         ← public branch (collaboration layer)
feature/user-login@local   ← shadow branch (thinking layer)
```

Then switches your working directory to `feature/user-login@local`.

## What it does

1. Creates the public branch from your configured base branch (default: `main`)
2. Creates the `@local` shadow branch from the local base branch (e.g. `main@local`)
3. Switches to the `@local` branch so you can start working immediately

If the local base branch (e.g. `main@local`) does not exist, git-shadow falls back to using the public base branch as the starting point and informs you.

## After running this command

You are on `feature/user-login@local`. Work normally — write code, add `///` comments, create architecture notes, include AI memory files. None of this will reach the public branch until you explicitly publish.

```bash
# Work on your @local branch
# ... edit files, add /// comments ...

# When ready to publish
git shadow feature publish --commit -m "feat(auth): user login"
```

## Related

- [feature publish](/docs/commands/feature-publish) — publish your work to the public branch
- [feature finish](/docs/commands/feature-finish) — clean up after the MR is merged
- [Shadow Branch Pattern](/docs/concept/shadow-branch-pattern) — understand the dual-branch structure
