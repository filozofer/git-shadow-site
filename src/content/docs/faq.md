---
title: FAQ
description: Frequently asked questions about git-shadow and the Shadow Branch Pattern.
sidebar:
  order: 1
category: faq
---

## Does git-shadow work with GitHub, GitLab, and Bitbucket?

Yes. Git Shadow only operates on local branches. Your public branch (`feature/login`) behaves exactly like a normal branch — you push it, open a PR/MR, and merge it as usual. The hosting platform is unaware of the shadow branch.

## Does my whole team need to install git-shadow?

No. Git Shadow is a personal workflow tool. You can adopt it individually on your machine without requiring your teammates to do anything.

The pre-commit hook is designed to be non-breaking: if a teammate doesn't have git-shadow installed, it exits safely.

## What happens if I do a plain `git push` from my `@local` branch?

Nothing catastrophic — but you shouldn't. The `@local` branch contains your local comments, which would then be visible on the remote.

The pre-commit hook helps prevent this for commits. For pushes, the discipline is yours. You can add a `pre-push` hook or simply remember: always push the public branch, never `@local`.

## My `///` comments are stripped on publish — where do they go?

They stay in your `@local` branch. `git shadow publish` creates **two commits**:

1. One with the full code including `///` comments — stays in `@local`
2. One with only the clean code — cherry-picked to the public branch

Your local reasoning is never deleted. It lives in your shadow branch history.

## Can I use a different local comment marker?

Yes. Set `LOCAL_COMMENT_PATTERN` in your `.env` file:

```bash
# Example: use ## as local marker
LOCAL_COMMENT_PATTERN='^[[:space:]]*(##)'
```

The default pattern supports several markers: `///`, `##`, `---`, `;;`, `%%`, and more.

## Can I use git-shadow on an existing project?

Yes. Run `git shadow install-hook` in any existing Git repository. Then create shadow branches from your existing base:

```bash
git shadow new-feature feature/my-next-feature
```

Your existing history is unaffected.

## How do I handle merge conflicts on `@local`?

Conflicts on `@local` branches are usually limited to your local comments — they don't affect the public branch. Resolve them normally with `git mergetool` or your editor. Because they're typically just comment lines, conflicts are usually straightforward.

## Can I have commits that never reach the public branch?

Yes — prefix the commit message with `[MEMORY]`:

```bash
git shadow commit -m "[MEMORY] AI context for auth module"
```

`[MEMORY]` commits are never cherry-picked during `publish`. Use them for AI memory files, local environment changes, or personal scripts.

## Is git-shadow compatible with rebase-based workflows?

It works, but with extra care. Rebasing your `@local` branch requires also rebasing the corresponding public branch. The simpler approach is to use merge-based updates (which `finish-feature` does by default). If you rebase regularly, test carefully on a non-critical project first.

## Why not just use `.gitignore` or git stash?

`.gitignore` only works for untracked files, not code-level comments inside tracked files. `git stash` is temporary and has no history. Neither provides a persistent, versioned, searchable local layer that stays synchronized with your feature work. That's the gap git-shadow fills.

## Is git-shadow stable enough for daily use?

The core workflow (`new-feature`, `publish`, `finish-feature`) is used daily and stable. The CLI may evolve as the pattern matures. Check the [GitHub repository](https://github.com/filozofer/git-shadow) for the current status.
