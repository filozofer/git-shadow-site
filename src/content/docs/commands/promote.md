---
title: promote
description: Publish a shadow-only file to the public branch for the first time.
sidebar:
  label: promote
  order: 5
category: commands
---

Publish a file that exists only on your shadow branch to the public branch. Use this when you have a file committed on `@local` that has never appeared on the public branch and you want to share it.

## Usage

```bash
git shadow promote <file>
```

## When to use it

A shadow-only file is a file committed on your `@local` branch but absent from the public branch. Common cases:

- An AI memory file you initially kept local and now want to share with the team
- A configuration or script you drafted privately and are ready to publish

For files that already exist on the public branch, use a regular `git shadow commit` instead.

## How it works

`promote` creates a special commit on the shadow branch that records the file path and its current blob SHA:

```
shadow: promote path/to/file.md

path=path/to/file.md
blob=<sha>
```

When you run `git shadow feature publish` afterward, it detects the promotion commit and applies the file to the public branch.

## Example

```bash
# You have CLAUDE.md committed on the shadow branch but not on the public branch
git shadow promote CLAUDE.md

# Then publish — the file will appear on the public branch
git shadow feature publish
```

## Preconditions

- Must be run from a `@local` shadow branch
- The file must be committed on the shadow branch (`HEAD:<file>` must exist)
- The file must not already exist on the public branch

## Related

- [commit](/docs/commands/commit) — create a regular commit that strips local comments
- [feature publish](/docs/commands/feature-publish) — publish pending commits to the public branch
