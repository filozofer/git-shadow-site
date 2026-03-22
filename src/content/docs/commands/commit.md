---
title: commit
description: Commit staged changes on the shadow branch, separating clean code from local comments into two distinct commits.
sidebar:
  label: commit
  order: 2
category: commands
---

Commit your staged changes on the `@local` branch. Unlike a plain `git commit`, this command automatically splits your changes into two commits: one with clean code (publishable), and one with your local comments (stays in `@local` only).

## Usage

```bash
git add <files>
git shadow commit -m "your commit message"
```

You must stage your files with `git add` before running this command.

## Example

```bash
git add src/auth/login.ts
git shadow commit -m "feat(auth): implement login flow"
```

## What it does

1. Requires at least one staged change — exits with an error if nothing is staged
2. Strips lines matching `LOCAL_COMMENT_PATTERN` from the index (working tree is untouched)
3. Exits with an error if nothing remains after stripping (staged content was only comments)
4. Creates **commit 1**: clean code, with your supplied message (or opens editor if `-m` is omitted)
5. Runs `git add .` to restage the local comments that remain in the working tree
6. Creates **commit 2** automatically: `[MEMORY] <previous commit subject>` with `--no-verify`

If no local comments were present, only one commit is created and step 5–6 are skipped.

## [MEMORY] commits

You can use any commit message with `[MEMORY]` to create a local-only commit. These commits will **never** be cherry-picked to the public branch when you run `feature publish`.

```bash
git shadow commit -m "[MEMORY] add AI context for authentication module"
```

Use `[MEMORY]` commits for:

- AI memory files
- Local environment tweaks (disabled validations, dev-only config)
- Personal scripts or helpers your team doesn't need
- Architecture notes meant only for your local context

The `[MEMORY]` prefix is configurable via `SHADOW_COMMIT_PREFIX`.

## Shorthand with publish

You can skip a separate `commit` step and commit + publish in one command:

```bash
git shadow feature publish --commit -m "feat(auth): implement login flow"
```

Note: `feature publish --commit` runs `git add .` automatically before committing — you don't need to stage manually.

## Related

- [feature publish](/docs/commands/feature-publish) — push clean commits to the public branch
