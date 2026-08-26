### Modified and staged files (vs last commit)

!`git diff HEAD --name-only | grep -vE '((package|pnpm|vcpkg)-lock\.|\.lock(file)?$|go\.sum$)' | tr '\n' '\0' | xargs -0 -r git diff HEAD --`

### Untracked new files

!`git ls-files --others --exclude-standard | grep -vE '((package|pnpm|vcpkg)-lock\.|\.lock(file)?$|go\.sum$)' | tr '\n' '\0' | xargs -0 -I{} sh -c 'file --mime-encoding -b "{}" | grep -qv binary && printf "\n\n=== NEW FILE: %s ===\n" "{}" && cat "{}"' 2>/dev/null || echo "(none)"`