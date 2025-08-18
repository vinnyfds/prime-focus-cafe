# Branch Protection: Lock `main`

## GitHub UI
1. Settings ➜ Branches ➜ Add rule for `main`
2. Require pull request before merging (min 1 approval)
3. Dismiss stale approvals when new commits are pushed
4. Require status checks to pass (lint, typecheck, build, asset-verify)
5. Require linear history; block force pushes and deletions

## gh CLI
```bash
# Protect main
gh api -X PUT repos/:owner/:repo/branches/main/protection \
  -f required_status_checks.strict=true \
  -f enforce_admins=true \
  -f restrictions=null \
  -f required_linear_history=true \
  -f allow_force_pushes=false \
  -f allow_deletions=false \
  -F required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}'
```

## Required checks (configure in Actions)
- lint
- typecheck
- build
- asset-verify
