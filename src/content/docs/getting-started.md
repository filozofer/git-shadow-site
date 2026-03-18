---
title: Getting Started
description: Install git-shadow and run your first command in minutes.
sidebar:
  order: 1
category: getting-started
---

Git Shadow is a shell CLI. It requires Git and Bash — no other runtime or package manager.

## Prerequisites

- Git (any recent version)
- Bash (macOS, Linux, WSL, or Git Bash on Windows)

## 1. Clone the repository

```bash
git clone https://github.com/filozofer/git-shadow.git
```

## 2. Configure your environment (optional)

Copy the example environment file and adapt it to your needs:

```bash
cp .env.example .env
```

Available options:

| Variable | Default | Description |
|---|---|---|
| `WORKSPACE_DIR` | `../` | Path to your workspace |
| `PUBLIC_BASE_BRANCH` | `develop` | Your main base branch |
| `LOCAL_SUFFIX` | `@local` | Suffix for shadow branches |
| `LOCAL_COMMENT_PATTERN` | `^[[:space:]]*(///\|##\|...)` | Pattern that marks local comments |

## 3. Add git-shadow to your PATH

The recommended approach is to add the `bin` folder to your PATH so you can run `git shadow` from anywhere:

```bash
export PATH="/path/to/git-shadow/bin:$PATH"
```

Add this line to your `~/.bashrc` or `~/.zshrc` to make it permanent.

Alternatively, create a Git alias:

```bash
git config --global alias.shadow "!sh /path/to/git-shadow/bin/git-shadow"
```

## 4. Install the pre-commit hook

Run this from inside the repository where you want to use git-shadow:

```bash
git shadow install-hook
```

This installs a hook that prevents accidentally committing local comments (`///`) to the public branch. The hook is non-blocking for teammates who haven't installed git-shadow.

## 5. Verify your installation

```bash
git shadow doctor
```

The doctor command checks your installation, Git availability, and current repository status. A clean output means you're ready.

## Your first feature

```bash
# Create a new feature (creates both branches, switches to @local)
git shadow new-feature feature/my-feature

# Work normally on your @local branch
# Add /// comments freely

# When ready to publish
git shadow publish --commit -m "feat: my feature"
git push origin feature/my-feature

# After the MR is merged
git shadow finish-feature
```

That's it. Read the [Shadow Branch Pattern](/docs/concept/shadow-branch-pattern) to understand what happens under the hood.
