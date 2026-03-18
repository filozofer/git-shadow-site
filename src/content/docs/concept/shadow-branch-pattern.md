---
title: Shadow Branch Pattern
description: Separate development scaffolding from published code by maintaining a local shadow branch alongside a public branch.
sidebar:
  label: Shadow Branch Pattern
  order: 1
category: concept
---

> **Separate development scaffolding from published code** by maintaining a local shadow branch alongside a public branch.

This pattern allows developers to keep personal reasoning structures — comments, notes, temporary code — locally, while publishing only clean commits to the shared repository.

## Motivation

When developing complex features, developers often rely on temporary structures to reason about the code:

- exploratory comments
- pseudo-code
- debug logs
- TODO notes
- intermediate refactors
- structural hints for algorithm steps

These elements help structure thinking and reduce cognitive load during development. However, they do not always belong in the shared codebase.

Teams often prefer to keep repository history clean and focused on the final implementation. This creates friction between **individual development practices** and **team repository conventions**.

The Shadow Branch Pattern resolves this tension by separating the **thinking layer** from the **published layer**.

## Structure

For each public branch, maintain a corresponding **shadow branch**.

```
feature/login         → public branch
feature/login@local   → shadow branch
```

Typical base branches:

```
develop               → public base branch
develop@local         → shadow base branch
```

The shadow branch may contain development scaffolding not intended to be shared. The public branch contains only the commits intended for collaboration.

## Workflow

**1.** Create both a public branch and its shadow counterpart.

```
feature/x
feature/x@local
```

**2.** Perform all development work on the shadow branch.

**3.** Keep development scaffolding locally — for example, structured comments using `///`:

```js
/// Get user from database
/// Verify credentials
/// Build user session
```

**4.** Publish clean commits to the public branch via `git shadow publish`.

**5.** Push the public branch and follow the normal team workflow (PR, MR, etc.).

**6.** Merge the shadow feature branch back into the shadow base branch to preserve local reasoning for future work.

```
develop@local
```

## Benefits

**Cleaner repository history** — the shared repository contains only the code intended for collaboration.

**Reduced team friction** — developers can use their preferred reasoning structures without forcing them into the shared codebase.

**Improved cognitive workflow** — temporary scaffolding remains available during development without polluting commit history.

**Clear separation of concerns**

```
shadow branch → thinking layer
public branch → collaboration layer
```

## Trade-offs

**More branches** — each feature requires both a public branch and a shadow branch.

**Workflow discipline** — developers must consistently publish from the shadow branch to the public branch.

**Conflict management** — since `@local` branches diverge from public branches, merge conflicts may appear when rebasing or finishing features. These are usually limited to comments and straightforward to resolve.

**Tooling recommended** — automation tools significantly simplify the workflow and reduce errors. This is what git-shadow provides.

## When to use this pattern

The Shadow Branch Pattern works well when:

- developers rely heavily on comments or pseudo-code to structure reasoning
- teams prefer a clean shared repository history
- development scaffolding is useful locally but undesirable in shared code
- the team is comfortable with slightly more advanced Git workflows

## When not to use this pattern

This pattern may be unnecessary when:

- the team already accepts development comments in the repository
- the project uses very simple workflows (e.g., trunk-based with no feature branches)
- the team prefers minimal Git workflow complexity

## Related concepts

The Shadow Branch Pattern shares ideas with several existing practices:

- **Stacked branches** (Graphite, ghstack)
- **Patch stack workflows** (StGit)
- **Debug vs release builds**
- **Exploratory notebooks vs production scripts**

In all cases, the underlying idea is the same: separate the environment used for exploration from the environment used for publication.

## Reference implementation

The CLI tool **git-shadow** implements this workflow and automates all required operations.

```bash
git shadow new-feature feature/login
git shadow publish --commit -m "feat(login): add login flow"
git shadow finish-feature
```

The tool handles shadow branch creation, comment filtering, commit publication, and branch synchronization.
