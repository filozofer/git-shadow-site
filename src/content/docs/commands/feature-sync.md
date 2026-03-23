---
title: feature sync
description: Rebase your shadow branch onto its public counterpart, auto-resolving code conflicts and pausing on [MEMORY] commits.
sidebar:
  label: feature sync
  order: 5
category: commands
---

Keep your `@local` shadow branch in sync with the public branch after colleagues push new commits. This command rebases the shadow branch onto its public counterpart, with smart conflict handling.

## Usage

```bash
# Start sync
git shadow feature sync

# Resume after manually resolving a [MEMORY] conflict
git shadow feature sync --continue

# Abort and return to the state before sync
git shadow feature sync --abort
```

## What it does

1. Validates you are on a shadow branch (ending with `@local`)
2. Runs `git rebase <public-branch>` to replay your shadow commits on top of the latest public work
3. For each conflicting commit:
   - **Regular code commit** → auto-resolved in favour of the public branch (`--ours`). If the commit becomes empty after resolution, it is silently dropped.
   - **`[MEMORY]` commit** → paused for manual resolution. Your local AI context files are never silently overwritten.
4. Prints a success message once all commits are replayed.

## Conflict handling

### Code commits

Conflicts on regular commits are resolved automatically — the public branch version wins. You do not need to intervene.

```
🧠 Auto-resolving (code commit): feat(auth): update login route
```

### [MEMORY] commits

Conflicts on `[MEMORY]` commits require manual resolution:

```
⚠️  Conflict on shadow commit: [MEMORY] add domain model notes
ℹ️  Conflicted files:
     docs/domain-model.md
ℹ️  Resolve conflicts manually, then run:
   git shadow feature sync --continue
ℹ️  To abort:
   git shadow feature sync --abort
```

Open the conflicted files, resolve them, stage the result, then continue:

```bash
# Resolve the conflicts in your editor, then:
git add docs/domain-model.md
git shadow feature sync --continue
```

## When to use it

Run `feature sync` whenever the public branch has advanced since you last rebased — typically after a colleague pushes, or before opening a merge request.

```bash
# Typical mid-feature workflow
git pull origin feature/login          # update public branch
git shadow feature sync                # rebase shadow onto it
```

## Related

- [feature start](/docs/commands/feature-start) — create a new feature with both branches
- [feature publish](/docs/commands/feature-publish) — cherry-pick clean commits to the public branch
- [feature finish](/docs/commands/feature-finish) — clean up after the MR is merged
