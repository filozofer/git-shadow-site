---
title: config
description: Read and write git shadow configuration values across project and user scopes.
sidebar:
  label: config
  order: 8
category: commands
---

Inspect and modify git shadow configuration. Configuration is loaded from three tiers — built-in defaults, user-level, and project-level. The `config` command lets you view and update values at any tier.

## Subcommands

### list

```bash
git shadow config list [--json]
```

Lists all known configuration keys with their default values and descriptions.

### show

```bash
git shadow config show [--json]
```

Shows the **effective** configuration — the merged result across all tiers — with the source tier for each key.

```
PUBLIC_BASE_BRANCH                 main                                      (source: defaults)
LOCAL_SUFFIX                       @local                                    (source: defaults)
LOCAL_COMMENT_PATTERN              ^[[:space:]]*(///|##|%%|<!--)             (source: project)
ALLOW_LOCAL_PUSH                   false                                     (source: defaults)
```

### get

```bash
git shadow config get <KEY> [--json]
```

Shows the effective value and source tier for a single key.

```bash
git shadow config get PUBLIC_BASE_BRANCH
```

### set

```bash
git shadow config set <KEY>=<VALUE> [--project-config|--user-config]
```

Writes a value to the project config (`.git-shadow.env`) or user config (`~/.config/git-shadow/config.env`).

```bash
# Set a project-level override
git shadow config set PUBLIC_BASE_BRANCH=develop --project-config

# Set a user-level default
git shadow config set LOCAL_SUFFIX=@mine --user-config
```

If no scope flag is provided and stdin is a TTY, an interactive prompt lets you select the key, value, and scope.

### unset

```bash
git shadow config unset <KEY> [--project-config|--user-config]
```

Removes a key from the project or user config file, reverting it to the default.

## Configuration keys

| Key | Default | Description |
|---|---|---|
| `PUBLIC_BASE_BRANCH` | `main` | Main integration branch |
| `LOCAL_SUFFIX` | `@local` | Suffix for shadow branches |
| `LOCAL_COMMENT_PATTERN` | `^[[:space:]]*(///\|##\|%%\|<!--)` | Pattern for local-only lines |
| `SHADOW_COMMIT_PREFIX` | `[MEMORY]` | Prefix for shadow-only commits |
| `SHADOW_COMMIT_FILTER` | `^\[MEMORY\]` | Regex to skip commits during publish |
| `ALLOW_LOCAL_PUSH` | `false` | Allow pushing `@local` branches to remote |
| `DELETE_FEATURE_BRANCHES` | `true` | Delete feature branches on `feature finish` |
| `AUTO_PULL_BASE_BRANCHES` | `true` | Pull base branches on `feature finish` |

## Related

- [Getting Started](/docs/getting-started) — configuration overview
- [install-hooks](/docs/commands/install-hooks) — hooks that use `LOCAL_COMMENT_PATTERN` and `ALLOW_LOCAL_PUSH`
