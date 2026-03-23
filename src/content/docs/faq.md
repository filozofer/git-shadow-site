---
title: FAQ
description: Frequently asked questions about git shadow and the Shadow Branch Pattern.
sidebar:
  order: 1
category: faq
---

## Does git shadow work with GitHub, GitLab, and Bitbucket?

Yes. Git Shadow only operates on local branches. Your public branch (`feature/login`) behaves exactly like a normal branch — you push it, open a PR/MR, and merge it as usual. The hosting platform is unaware of the shadow branch.

## Does my whole team need to install git shadow?

No. Git Shadow is a personal workflow tool. You can adopt it individually on your machine without requiring your teammates to do anything.

The pre-commit and pre-push hooks are designed to be non-breaking: if a teammate doesn't have git shadow installed, they exit safely without producing errors.

## What happens if I do a plain `git push` from my `@local` branch?

The pre-push hook installed by `git shadow install-hooks` will block it automatically:

```
[git-shadow] Shadow branches are meant to stay local.
Push the public branch instead, or set ALLOW_LOCAL_PUSH=true to override.
```

To allow pushing a shadow branch (e.g. for backup purposes), set `ALLOW_LOCAL_PUSH=true` in your `.git-shadow.env`.

## My `///` comments are stripped on publish — where do they go?

They stay in your `@local` branch. When you run `git shadow commit`, two commits are created:

1. One with the full code including `///` comments — stays in `@local`
2. One with only the clean code — cherry-picked to the public branch by `feature publish`

Your local reasoning is never deleted. It lives in your shadow branch history.

## Can I use a different local comment marker?

Yes. Set `LOCAL_COMMENT_PATTERN` in your `.git-shadow.env` file:

```bash
# Example: use ## as local marker only
LOCAL_COMMENT_PATTERN='^[[:space:]]*(##)'
```

The default pattern supports: `///`, `##`, `%%`, and `<!--`. Note that markers must not conflict with standard syntax — `;;` (valid bash) and `---` (valid YAML/Markdown) are intentionally excluded from the default.

## Can I use git shadow on an existing project?

Yes. Run `git shadow install-hooks` in any existing Git repository. Then create shadow branches from your existing base:

```bash
git shadow feature start feature/my-next-feature
```

Your existing history is unaffected.

## Can I share my shadow branch with teammates?

Yes. By default shadow branches are personal and blocked from being pushed by the pre-push hook. To allow pushing, set `ALLOW_LOCAL_PUSH=true` in your `.git-shadow.env`:

```bash
ALLOW_LOCAL_PUSH=true
```

Once pushed, teammates can pull the shadow branch and work on it together. The key difference from a personal shadow branch is that you **cannot rebase** a shared branch (rebasing rewrites history and breaks everyone else's copy). Use `--merge` instead when syncing:

```bash
git shadow feature sync --merge
```

This merges the public branch into the shadow branch with all code conflicts auto-resolved in favour of the public branch. Your `[MEMORY]` files are always preserved — they don't exist on the public branch and therefore never conflict.

**Typical shared shadow branch workflow:**

```bash
git pull origin feature/login@local     # get teammates' shadow commits
git pull origin feature/login           # get the latest public commits
git shadow feature sync --merge         # merge public into shadow
git push origin feature/login@local     # share the result
```

## How do I handle merge conflicts on `@local`?

Conflicts on `@local` branches are usually limited to your local comments — they don't affect the public branch. The easiest way is to use `git shadow feature sync`, which auto-resolves code conflicts in favour of the public branch and only pauses for `[MEMORY]` commits.

For manual resolution: open the conflicting files, resolve the markers, then continue with `git shadow feature sync --continue`.

## Can I have commits that never reach the public branch?

Yes — prefix the commit message with `[MEMORY]`:

```bash
git shadow commit -m "[MEMORY] AI context for auth module"
```

`[MEMORY]` commits are never cherry-picked during `feature publish`. Use them for AI memory files, local environment changes, or personal scripts.

The prefix is configurable via `SHADOW_COMMIT_PREFIX` in your config.

## Is git shadow compatible with rebase-based workflows?

It works, but with extra care. Rebasing your `@local` branch requires also rebasing the corresponding public branch. The simpler approach is to use merge-based updates (which `feature finish` does by default). If you rebase regularly, test carefully on a non-critical project first.

## Why not just use `.gitignore` or git stash?

`.gitignore` only works for untracked files, not code-level comments inside tracked files. `git stash` is temporary and has no history. Neither provides a persistent, versioned, searchable local layer that stays synchronized with your feature work. That's the gap git shadow fills.

## Why not use git worktrees?

Git worktrees let you check out multiple branches simultaneously in separate directories. That solves a different problem: working on two branches at the same time without stashing. It does nothing to separate thinking scaffolding from publishable code — your worktree still has a single history that goes to the remote as-is.

Git Shadow is not a branching strategy. It's a separation of concerns within a single branch: the `@local` branch is the annotation layer, the public branch is the clean layer. These travel together — the `@local` branch has everything the public branch has, plus your thinking. Worktrees have no equivalent concept.

## Why not use git notes?

Git notes let you attach metadata to commits after the fact. They're not part of the commit, don't show up in normal diffs, and are not pushed by default. They're useful for tagging commits with external system references (ticket numbers, CI results) — not for code-level annotations you write while developing.

Git Shadow's local comments are first-class code — they live in the file, alongside the function they describe, and are versioned as part of the commit. That's the point: the thinking layer is right next to the code it applies to, not attached as metadata.

## Is git shadow stable enough for daily use?

Yes — the core workflow (`feature start`, `feature publish`, `feature finish`) is stable and used daily. The tool has reached v1. Check the [GitHub repository](https://github.com/filozofer/git-shadow) for the current version.
