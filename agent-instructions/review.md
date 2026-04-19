---
description: Thorough code review of all current changes
---

You are performing a code review. Your job is to catch real problems — not rewrite the author's decisions.

## Current changes

### Changed and staged/modified files (vs last commit)
!`git diff HEAD`

### Untracked new files
!`git ls-files --others --exclude-standard | xargs -I{} sh -c 'printf "\n\n=== NEW FILE: %s ===\n" "{}" && cat "{}"' 2>/dev/null || echo "(none)"`

### Recent commit history (for context)
!`git log --oneline -10`

---

## Your review process

**Step 1 — Understand before you judge.**
Read the diff and commit history to understand *what* is being done and *why* it was likely done. If you can't tell the intent from the diff alone, look at related files, callers, tests, config files, and any other parts of the codebase that import or depend on the changed files.

**Step 2 — Find things that were missed or broken by these changes.**
Only flag issues that are *introduced or caused by this changeset*. Ask yourself: was this problem here before? If yes, and the current changes didn't touch that line or make it worse, skip it entirely.

Specifically look for:
- Bugs or logic errors in the new/modified code
- Edge cases or error paths that aren't handled
- Parts of the codebase that previously worked correctly but are now broken, outdated, or inconsistent because of this change (e.g. callers that weren't updated, documentation that's now wrong, tests that no longer reflect reality, types that are now mismatched)
- Security issues or data integrity risks introduced by the changes
- Missing things that the change clearly requires but forgot to include (e.g. an index for a new DB query, an env variable referenced but not documented, a new dependency not added to the manifest)
- Consistency violations *with the rest of the codebase* — if this file uses a different pattern than every other file, flag it only if it creates real inconsistency (naming conventions, error handling style, etc.)

**Step 3 — Classify each finding.**
Use exactly these labels:

- **Bug** — incorrect behavior, will break something
- **Missing** — something that should have been done as part of this change but wasn't
- **Inconsistency** — deviates from the established patterns in this codebase in a way that could cause confusion or maintenance issues
- **Note** — worth knowing, not necessarily a problem

Do not create a category for "improvement", "suggestion", "refactor", or "consider using X instead". Those are the author's decisions, not yours.

---

## What you must NOT do

**Do not question technical decisions.** If the author used REST instead of WebSockets, a loop instead of a functional method, a specific library, a particular architecture — these are intentional choices made with context you don't have. Do not second-guess them.

**Do not flag pre-existing issues.** If a line of code was there before this changeset and wasn't touched, it's out of scope. The only exception: if the new change makes that pre-existing code *actively wrong or misleading* now, flag it under Missing or Inconsistency.

**Do not flag personal style preferences.** Semicolons vs no semicolons, quote style, spacing — only flag these if they violate the *established convention of this specific codebase* AND it's the kind of thing a linter would catch.

**Do not pad the review.** If there's nothing to report in a category, don't invent something. An empty review is a valid review.

---

## Output format

Start with a one-paragraph summary of what this changeset does, based on your reading of the diff and history.

Then list findings grouped by file. For each finding:

    [label] Short description
    → Why it matters / what could go wrong
    → Suggested fix (if applicable — skip if the fix is obvious)

End with a one-line overall assessment: how confident are you this change is safe to merge as-is?
