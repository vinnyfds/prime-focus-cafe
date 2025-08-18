# Emergency Rollback Plan

## Quick Rollback Commands

### 1. Restore from S3 Versioning (Immediate)
```bash
# Restore the last working index.html
aws s3api copy-object \
  --bucket www.primefocususa.com-site \
  --key index.html \
  --copy-source "www.primefocususa.com-site/index.html?versionId=1674VaXBTHfza0nFZBa0johV.b5n0ZDJ" \
  --metadata-directive REPLACE \
  --content-type "text/html; charset=utf-8" \
  --cache-control "no-store"

# Restore the last working JavaScript bundle
aws s3api copy-object \
  --bucket www.primefocususa.com-site \
  --key assets/index-B_6PmfN9.js \
  --copy-source "www.primefocususa.com-site/assets/index-B_6PmfN9.js?versionId=.pQv6rLrSABZuATFKoh4wXLBQFqB7G5Q" \
  --metadata-directive REPLACE \
  --content-type "application/javascript; charset=utf-8" \
  --cache-control "public, max-age=31536000, immutable"

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id E32K05VBG79GEL \
  --paths "/*"
```

### 2. Restore from Backup Snapshot
```bash
# Navigate to backup directory
cd snapshots

# Extract the backup
unzip 20241219-repo.zip

# Copy the working dist folder
cp -r prime-focus-cafe/dist/* ../prime-focus-cafe/dist/

# Deploy the backup
cd ../prime-focus-cafe
npm run build
aws s3 sync dist/ s3://www.primefocususa.com-site --delete
aws cloudfront create-invalidation --distribution-id E32K05VBG79GEL --paths "/*"
```

### 3. Git Rollback (If needed)
```bash
# Checkout the backup branch
git checkout ops/recovery-20241219

# Reset to the last working commit
git reset --hard HEAD~1

# Force push (if necessary)
git push --force-with-lease origin ops/recovery-20241219
```

## Rollback Triggers

**Immediate Rollback Required:**
- Site completely broken (white screen, 500 errors)
- Critical functionality not working
- Security vulnerabilities detected

**Consider Rollback:**
- Performance degradation
- Minor UI issues
- Non-critical features broken

## Verification Steps

After rollback:
1. **Check site functionality**: https://www.primefocususa.com
2. **Verify console errors**: No critical JavaScript errors
3. **Test key features**: Navigation, content loading
4. **Check asset loading**: CSS/JS files load correctly

## Contact Information

**Emergency Contacts:**
- **Primary**: Development Team
- **Secondary**: DevOps Team
- **Escalation**: System Administrator

**Communication Channels:**
- Slack: #prime-focus-alerts
- Email: alerts@primefocususa.com
- Phone: Emergency hotline

## Post-Rollback Actions

1. **Document the issue** in APP_LOG.md
2. **Investigate root cause** of the failure
3. **Fix the issue** in development environment
4. **Test thoroughly** before next deployment
5. **Update rollback procedures** if needed

## Prevention Measures

1. **Always test in staging** before production
2. **Use feature flags** for risky changes
3. **Monitor application metrics** during deployment
4. **Have rollback plan ready** before any deployment
5. **Keep backup snapshots** updated
