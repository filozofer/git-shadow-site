---
title: Getting Started
description: Install git-shadow and run your first command in minutes.
sidebar:
  order: 1
category: getting-started
---

Git Shadow is a shell CLI. Current version: **v1.0.x** — stable and used daily. It requires Git and Bash — no other runtime or package manager.

## Prerequisites

- Git (any recent version)
- Bash (macOS, Linux, WSL, or Git Bash on Windows)

## 1. Install

### One-command installer (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/filozofer/git-shadow/main/install.sh | bash
```

This clones git-shadow to `~/.local/share/git-shadow`, symlinks the binary to `~/.local/bin`, and installs shell completion automatically.

If `~/.local/bin` is not in your PATH, add it to your shell profile:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

### npm (requires Node ≥ 14)

```bash
npm install -g git-shadow
```

### Manual clone

```bash
git clone https://github.com/filozofer/git-shadow.git
export PATH="/path/to/git-shadow/bin:$PATH"
```

Add the `export` line to your `~/.bashrc` or `~/.zshrc` to make it permanent.

## 2. Configure your environment (optional)

Create a `.git-shadow.env` file at the root of your project to override defaults:

```bash
# .git-shadow.env
PUBLIC_BASE_BRANCH="main"
LOCAL_SUFFIX="@local"
LOCAL_COMMENT_PATTERN='^[[:space:]]*(///|##|%%|<!--)'
```

Configuration is loaded from three tiers (highest priority first):

| Tier | Location |
|---|---|
| Project | `.git-shadow.env` in your repo root |
| User | `~/.config/git-shadow/config.env` |
| Defaults | Shipped with the tool |

Available options:

| Variable | Default | Description |
|---|---|---|
| `PUBLIC_BASE_BRANCH` | `main` | Your main integration branch |
| `LOCAL_SUFFIX` | `@local` | Suffix for shadow branches |
| `LOCAL_COMMENT_PATTERN` | `^[[:space:]]*(///\|##\|%%\|<!--)` | Pattern that marks local-only lines |
| `SHADOW_COMMIT_PREFIX` | `[MEMORY]` | Prefix for shadow-only commits |
| `ALLOW_LOCAL_PUSH` | `false` | Allow pushing `@local` branches to remote |

Use `git shadow config list` to see all available keys.

## 3. Install the hooks

Run this from inside the repository where you want to use git-shadow:

```bash
git shadow install-hooks
```

This installs two hooks:

- **pre-commit** — prevents accidentally committing local comments on any branch
- **pre-push** — blocks pushing `@local` shadow branches to a remote

Both hooks are non-breaking for teammates who haven't installed git-shadow.

## 4. Install shell completion (optional)

If you used the curl installer, completion is already set up. Otherwise, run:

```bash
git shadow completion install
```

Supports bash, zsh, and fish.

## 5. Verify your installation

```bash
git shadow doctor
```

The doctor command checks your installation and current repository status.

## Your first feature

```bash
# Create a new feature (creates both branches, switches to @local)
git shadow feature start feature/my-feature

# Work normally on your @local branch
# Add /// comments freely

# When ready to publish
git shadow feature publish --commit -m "feat: my feature"
git push origin feature/my-feature

# After the MR is merged
git shadow feature finish
```

That's it. Read the [Shadow Branch Pattern](/docs/concept/shadow-branch-pattern) to understand what happens under the hood.

## Updating

Re-run the curl installer at any time — it detects an existing installation and updates it to the latest version:

```bash
curl -fsSL https://raw.githubusercontent.com/filozofer/git-shadow/main/install.sh | bash
```

## Uninstalling

```bash
# Remove the binary symlink
rm ~/.local/bin/git-shadow

# Remove the toolkit (optional — only if installed via curl)
rm -rf ~/.local/share/git-shadow

# Remove shell completion (if installed)
# Bash/zsh: remove the `source` line added to ~/.bashrc or ~/.zshrc
# Fish: rm ~/.config/fish/completions/git-shadow.fish
```

Hooks installed in your repositories (`pre-commit`, `pre-push`) are not removed automatically — delete them manually if needed, or leave them in place (they exit silently when git-shadow is not found).
