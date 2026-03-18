---
title: doctor
description: Check your git-shadow installation and current repository status.
sidebar:
  label: doctor
  order: 6
category: commands
---

Run a health check on your git-shadow installation and the current repository. Useful after initial setup or when something doesn't seem to be working.

## Usage

```bash
git shadow doctor
```

## What it checks

- Essential toolkit scripts are present and executable
- Git is available in your PATH
- `git shadow` command is reachable (PATH or alias configured)
- Current repository status (clean working tree, staged files, current branch)

## Example output

A healthy installation looks like:

```
[git-shadow doctor]

✔  git found: git version 2.44.0
✔  git shadow command found
✔  Scripts present: new-feature, publish, commit, finish-feature, install-hook
✔  .env loaded

Repository status:
  Branch:  feature/login@local
  Status:  clean
```

If something is wrong, the doctor reports the failing check with a hint:

```
✘  git shadow command not found
   → Add the bin/ folder to your PATH or create a Git alias.
   → See: https://gitshadow.dev/docs/getting-started
```

## When to run it

- Right after installation — verify everything is wired correctly
- When a command fails unexpectedly — rule out configuration issues
- When onboarding a new machine or environment

## Related

- [Getting Started](/docs/getting-started) — full installation walkthrough
- [install-hook](/docs/commands/install-hook) — install the pre-commit hook
