---
title: status
description: Display the current git shadow state of the branch pair — pending commits, sync state, and next recommended step.
sidebar:
  label: status
  order: 6
category: commands
---

Display a summary of the current git shadow state for the active branch pair. Works from either a shadow or a public branch.

## Usage

```bash
git shadow status [--json]
```

## Example output

```
Git Shadow Status

🧠 Current branch : feature/login@local
   Branch type    : shadow
   Public branch  : feature/login

   Publishable commits pending : 3
   Shadow-only [MEMORY] commits: 1
   Public branch ahead         : no

✅ Status    : ready to publish
   Next step : run `git shadow feature publish`
```

## Status labels

| Status | Meaning |
|---|---|
| `up to date` | Shadow and public branches are in sync |
| `ready to publish` | Commits in `@local` not yet on the public branch |
| `public branch ahead` | Public branch has commits not in `@local` |
| `diverged` | Both branches have commits the other doesn't |
| `shadow branch missing` | No `@local` counterpart found |
| `public branch missing` | No public counterpart found |

## JSON output

Pass `--json` for machine-readable output:

```bash
git shadow status --json
```

```json
{
  "current_branch": "feature/login@local",
  "branch_type": "shadow",
  "shadow_branch": "feature/login@local",
  "public_branch": "feature/login",
  "publishable_count": 3,
  "memory_count": 1,
  "public_ahead": 0,
  "status": "ready to publish",
  "next_step": "run `git shadow feature publish`"
}
```

## Related

- [feature publish](/docs/commands/feature-publish) — publish pending commits to the public branch
- [commit](/docs/commands/commit) — create a new commit on the shadow branch
