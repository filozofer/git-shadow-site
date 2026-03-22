---
title: feature finish
description: Clean up after a feature branch has been merged — sync shadow branches and optionally delete feature branches.
sidebar:
  label: feature finish
  order: 4
category: commands
---

Run this command after your pull request or merge request has been merged. It synchronizes your shadow base branch with the public base branch, integrates your local feature work into your local development history, and optionally deletes the feature branches.

## Usage

```bash
git shadow feature finish [--keep-branches] [--no-pull] [--force]
```

Run this from your `feature/x@local` or `feature/x` branch, after the public `feature/x` has been merged.

## Options

| Flag | Effect |
|---|---|
| `--keep-branches` | Skip deleting feature branches after merging |
| `--no-pull` | Skip `git pull` on base branches |
| `--force` | Force-delete feature branches even if not fully merged |

## What it does

1. Checks out the public base branch (e.g. `main`) and pulls latest changes
2. Verifies that the public feature branch is already merged into the base — warns if not (and aborts branch deletion unless `--force` is set)
3. Checks out the local base branch (e.g. `main@local`) and merges the public base into it
4. Merges `feature/x@local` into `main@local`, preserving your local comments and notes in the shadow base history
5. Deletes `feature/x` and `feature/x@local` (unless `--keep-branches`)

## Prerequisites

The local base branch (e.g. `main@local`) must exist locally. If it doesn't, the command will error. Create it first by running `git shadow feature start` from the base branch.

## Result

```
main@local  ← now contains your feature's local reasoning + updated base
main        ← updated from remote
```

Your `main@local` branch accumulates the local thinking layer of every feature over time — a running history of how you reason about the codebase.

## Why this matters

Without `feature finish`, your `@local` branches pile up and your `main@local` diverges from the main timeline. Running it keeps your shadow branch structure clean and coherent.

## Related

- [feature start](/docs/commands/feature-start) — the corresponding start-of-feature command
- [feature publish](/docs/commands/feature-publish) — publish clean commits before finishing
