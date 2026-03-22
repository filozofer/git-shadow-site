---
title: completion install
description: Install shell tab completion for git shadow commands.
sidebar:
  label: completion install
  order: 8
category: commands
---

Install tab completion for git shadow in your shell. Once installed, pressing `<Tab>` after `git shadow` will suggest available commands and subcommands.

## Usage

```bash
git shadow completion install
```

## Supported shells

| Shell | Method |
|---|---|
| bash | Appends `source` line to `~/.bashrc` |
| zsh | Appends `source` line to `~/.zshrc` |
| fish | Symlinks completion file to `~/.config/fish/completions/` |

The shell is detected automatically from `$SHELL`.

## After installing

Reload your shell to activate completion:

```bash
source ~/.bashrc   # or source ~/.zshrc
```

For fish, completion is active immediately in new sessions.

## Idempotent

Running `completion install` multiple times is safe — it detects if completion is already installed and exits without making changes.

## Manual install

If your shell is not detected automatically, the command prints the paths to the completion scripts so you can source them manually:

```
Bash: source ~/.local/share/git-shadow/completions/git-shadow.bash
Zsh:  source ~/.local/share/git-shadow/completions/git-shadow.zsh
Fish: ln -sf ~/.local/share/git-shadow/completions/git-shadow.fish ~/.config/fish/completions/git-shadow.fish
```

## Note

If you installed git shadow via the curl installer, completion is set up automatically during installation. You only need to run this command if you installed manually.

## Related

- [Getting Started](/docs/getting-started) — full installation walkthrough
