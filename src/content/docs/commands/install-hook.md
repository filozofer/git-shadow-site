---
title: install-hook
description: Install the pre-commit hook that prevents accidentally committing local comments to the public branch.
sidebar:
  label: install-hook
  order: 5
category: commands
---

Install a pre-commit hook in the current Git repository. The hook prevents accidentally committing local comments (matching `LOCAL_COMMENT_PATTERN`) on a public branch.

## Usage

```bash
git shadow install-hook
```

Run this from inside the repository where you want to use git-shadow.

## What it does

Installs a `.git/hooks/pre-commit` script that:

1. Checks whether the current branch is a shadow branch (`@local` suffix)
2. If you are on a **public** branch, scans staged files for the local comment pattern (default: `///`)
3. Blocks the commit if local comments are found, displaying a clear error message

## Safe for teammates

The hook is designed to be non-breaking for developers who haven't installed git-shadow. If a teammate runs `git commit` on a machine without git-shadow, the hook either exits silently or is absent — it does not produce errors for them.

## Example hook output

When you accidentally try to commit `///` comments on the public branch:

```
[git-shadow] ERROR: Local comment pattern found in staged files.
You are on a public branch. Run `git shadow publish` instead.
```

## Customizing the pattern

The pattern is controlled by `LOCAL_COMMENT_PATTERN` in your `.env` file:

```bash
LOCAL_COMMENT_PATTERN='^[[:space:]]*(///|##|---|;;|%%)'
```

Adjust this to match your preferred local comment style.

## Related

- [publish](/docs/commands/publish) — the correct way to commit on a public branch
- [Getting Started](/docs/getting-started) — full installation walkthrough
