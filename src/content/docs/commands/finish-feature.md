---
title: finish-feature
description: Clean up after a feature branch has been merged — sync shadow branches and optionally delete feature branches.
sidebar:
  label: finish-feature
  order: 4
category: commands
---

Run this command after your pull request or merge request has been merged. It synchronizes your shadow base branch with the public base branch and integrates your local feature work into your local development history.

## Usage

```bash
git shadow finish-feature
```

Run this from your `feature/x@local` branch, after the public `feature/x` has been merged.

## What it does

1. Updates your public base branch (default: `develop`) from remote
2. Merges `develop` into `develop@local` to keep your shadow base up to date
3. Merges `feature/x@local` into `develop@local`, preserving your local comments and notes in the shadow base history
4. Optionally deletes `feature/x` and `feature/x@local`

## Result

```
develop@local  ← now contains your feature's local reasoning + updated base
develop        ← updated from remote
```

Your `develop@local` branch accumulates the local thinking layer of every feature over time — a running history of how you reason about the codebase.

## Why this matters

Without `finish-feature`, your `@local` branches pile up and your `develop@local` diverges from the main timeline. Running it keeps your shadow branch structure clean and coherent.

## Related

- [new-feature](/docs/commands/new-feature) — the corresponding start-of-feature command
- [publish](/docs/commands/publish) — publish clean commits before finishing
