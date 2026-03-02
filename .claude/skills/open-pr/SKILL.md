---
name: open-pr
description: Open a pull request from the current branch to main. Analyzes all commits, generates a structured PR title and description, and creates the PR via GitHub CLI.
user_invocable: true
---

Open a pull request from the current branch to `main`.

## Steps

1. **Pre-flight checks**
   - Confirm we are NOT on `main`. If on `main`, abort and tell the user.
   - Run `git status` to check for uncommitted changes. If there are any, warn the user and ask whether to proceed or commit first.
   - Ensure the current branch has been pushed to the remote. If not, push it with `git push -u origin HEAD`.

2. **Gather context**
   - Run `git log main..HEAD --oneline` to get all commits on this branch.
   - Run `git diff main...HEAD --stat` to get a summary of changed files.
   - Read the diff with `git diff main...HEAD` to understand the actual changes.

3. **Generate PR title**
   - Keep it under 70 characters.
   - Use conventional format: `type: short description` (e.g., `fix: resolve transaction form validation bugs`).
   - Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`.

4. **Generate PR description** using this template:

```
## Summary
<!-- 2-4 sentences explaining what this PR does and why -->

## Changes
<!-- Bulleted list of key changes, grouped logically -->

## Testing
<!-- How to verify these changes work -->

## Notes
<!-- Any follow-ups, trade-offs, or things reviewers should know. Omit section if nothing relevant. -->
```

5. **Create the PR**
   - Use `gh pr create --base main --title "<title>" --body "<body>"` with a HEREDOC for the body.
   - Display the resulting PR URL to the user.
