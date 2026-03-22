---
title: version
description: Print the currently installed version of git shadow.
sidebar:
  label: version
  order: 10
category: commands
---

Print the currently installed version of git shadow.

## Usage

```bash
git shadow version
```

## Example output

```
1.0.3
```

## When to use it

- After installation — confirm what version you have
- When reporting a bug — include the version in your report
- After updating — verify the update was applied

## Updating

To update to the latest version, re-run the installer:

```bash
curl -fsSL https://raw.githubusercontent.com/filozofer/git-shadow/main/install.sh | bash
```

The installer detects an existing installation and updates it in place.

## Related

- [Getting Started](/docs/getting-started) — installation and update instructions
- [doctor](/docs/commands/doctor) — full health check of your installation
