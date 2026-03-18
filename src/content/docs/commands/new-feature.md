---
title: new-feature
description: Create a new feature with its public branch and shadow branch counterpart.
sidebar:
  label: new-feature
  order: 1
category: commands
---

Create a new feature. This command creates both the public branch and its `@local` shadow counterpart, then switches you to the shadow branch to start working.

## Usage

```bash
git shadow new-feature <branch-name>
```

## Example

```bash
git shadow new-feature feature/user-login
```

This creates:

```
feature/user-login         ← public branch (collaboration layer)
feature/user-login@local   ← shadow branch (thinking layer)
```

Then switches your working directory to `feature/user-login@local`.

## What it does

1. Creates the public branch from your configured base branch (default: `develop`)
2. Creates the `@local` shadow branch from the same base
3. Switches to the `@local` branch so you can start working immediately

## After running this command

You are on `feature/user-login@local`. Work normally — write code, add `///` comments, create architecture notes, include AI memory files. None of this will reach the public branch until you explicitly publish.

```bash
# Work on your @local branch
# ... edit files, add /// comments ...

# When ready to publish
git shadow publish --commit -m "feat(auth): user login"
```

## Related

- [publish](/docs/commands/publish) — publish your work to the public branch
- [finish-feature](/docs/commands/finish-feature) — clean up after the MR is merged
- [Shadow Branch Pattern](/docs/concept/shadow-branch-pattern) — understand the dual-branch structure
