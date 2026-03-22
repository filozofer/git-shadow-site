---
title: doctor
description: Check your git shadow installation and current repository status.
sidebar:
  label: doctor
  order: 10
category: commands
---

Run a health check on your git shadow installation and the current repository. Useful after initial setup or when something doesn't seem to be working.

## Usage

```bash
git shadow doctor
```

## What it checks

1. All required toolkit files are present (`commands/feature/start.sh`, `commands/feature/publish.sh`, `commands/feature/finish.sh`, `commands/commit.sh`, `commands/install-hooks.sh`, and core scripts)
2. `config/defaults.env` is valid and contains the required keys
3. `git` is available in your PATH
4. `git shadow` CLI is reachable (PATH or alias configured)
5. Current repository status (clean working tree, staged files, current branch)

## Example output

A healthy installation looks like:

```
🔍 git-shadow doctor check
✅ Toolkit files present
✅ Configuration template valid
✅ git CLI available
✅ git-shadow CLI available
⚠️ git shadow alias not set (optional)
📁 Checking project path: .
✅ Inside Git repository: true
🔀 Current branch: feature/login@local
✅ Working tree clean
✅ No staged changes
🏁 git-shadow doctor completed
```

If something is wrong:

```
❌ git-shadow not in PATH (usage: export PATH="~/.local/share/git-shadow/bin:$PATH")
```

## When to run it

- Right after installation — verify everything is wired correctly
- When a command fails unexpectedly — rule out configuration issues
- When onboarding a new machine or environment

## Related

- [Getting Started](/docs/getting-started) — full installation walkthrough
- [install-hooks](/docs/commands/install-hooks) — install the pre-commit and pre-push hooks
