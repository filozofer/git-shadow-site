---
title: install-hooks
description: Install the pre-commit and pre-push hooks that protect shadow branch integrity.
sidebar:
  label: install-hooks
  order: 5
category: commands
---

Install two Git hooks in the current repository to enforce shadow branch discipline automatically.

## Usage

```bash
git shadow install-hooks
```

Run this from inside the repository where you want to use git-shadow.

## What it installs

### pre-commit hook

Scans staged files for lines matching `LOCAL_COMMENT_PATTERN` (default: `///`, `##`, `%%`, `<!--`). Blocks the commit if local comments are found, on **any** branch.

```
[git-shadow] ERROR: Local comment pattern found in staged files.
Run `git shadow feature publish` to publish clean commits instead.
```

### pre-push hook

Blocks pushing any `@local` shadow branch to a remote:

```
[git-shadow] Shadow branches are meant to stay local.
Push the public branch instead, or set ALLOW_LOCAL_PUSH=true to override.
```

To allow pushing a shadow branch (e.g. for backup), set `ALLOW_LOCAL_PUSH=true` in your `.git-shadow.env`, or pass it inline:

```bash
GIT_SHADOW_ALLOW_LOCAL_PUSH=true git push
```

## Safe for teammates

Both hooks are non-breaking for developers who haven't installed git-shadow. If git-shadow is not found on the machine, the hooks exit silently without producing errors.

## Husky and custom hook paths

`install-hooks` respects `core.hooksPath`. If your project uses Husky or another hook manager with a custom hooks directory, the scripts are installed in the correct location automatically.

If a hook file already exists, the git-shadow hook content is appended rather than replacing the existing file.

## Related

- [feature publish](/docs/commands/feature-publish) — the correct way to move commits to the public branch
- [Getting Started](/docs/getting-started) — full installation walkthrough
