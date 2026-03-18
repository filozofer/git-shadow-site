---
title: commit
description: Stage and commit your changes on the shadow branch, preparing them for publish.
sidebar:
  label: commit
  order: 2
category: commands
---

Commit your staged changes on the `@local` branch. Unlike a plain `git commit`, this command prepares your commit in a way that `publish` can later process — preserving your local comments in the shadow branch while making the clean version available for cherry-picking.

## Usage

```bash
git add .
git shadow commit -m "your commit message"
```

## Example

```bash
git add src/auth/login.ts
git shadow commit -m "feat(auth): implement login flow"
```

## Difference from `git commit`

A standard `git commit` simply records the current state. `git shadow commit` is designed to work with the `publish` workflow:

- It commits your changes including all `///` comments to the `@local` branch
- The commit is structured so `publish` knows how to split it into a clean version (for the public branch) and the full version (kept in `@local`)

## MEMORY commits

You can prefix a commit message with `[MEMORY]` to mark it as a local-only commit. These commits will **never** be cherry-picked to the public branch when you run `publish`.

```bash
git shadow commit -m "[MEMORY] add AI context for authentication module"
```

Use `[MEMORY]` commits for:

- AI memory files
- Local environment tweaks (disabled validations, dev-only config)
- Personal scripts or helpers your team doesn't need
- Architecture notes meant only for your local context

## Shorthand with publish

You can skip a separate `commit` step and commit + publish in one command:

```bash
git shadow publish --commit -m "feat(auth): implement login flow"
```

## Related

- [publish](/docs/commands/publish) — push clean commits to the public branch
