# MY CUSTOM RULES - WEBSITE PROTECTION

## 🚨 CRITICAL: NO PLACEHOLDER CONTENT ALLOWED

**NEVER, EVER deploy placeholder content to the main website. The website must ALWAYS contain the real Prime Focus C.A.F.E. content.**

## 📋 WEBSITE CONTENT REQUIREMENTS

### ✅ REQUIRED CONTENT (Your Real Business)
- **Prime Focus C.A.F.E.** - Liquid nootropic product
- **C.A.F.E. Benefits**: Clarity, Awareness, Focus, Energy
- **Product Description**: Clean, daily liquid nootropic for cognitive enhancement
- **Real branding and messaging** - NO generic placeholders

### ❌ FORBIDDEN CONTENT
- "Welcome to our website"
- "Your content will go here"
- "Prime Focus Cafe" (wrong name)
- Generic placeholder text
- Sample/demo content

## 🛡️ DEPLOYMENT PROTECTION RULES

### 1. ALWAYS BACKUP BEFORE CHANGES
**Before making ANY changes to the main website:**
```bash
# Create backup branch
git checkout -b backup/$(date +%Y%m%d)-before-changes

# Create snapshot
# (This will be done automatically by the system)
```

### 2. MANDATORY WARNING SYSTEM
**Before ANY direct website update, you MUST:**
1. **WARN THE USER**: "Your main website is going to be updated"
2. **EXPLAIN CHANGES**: What exactly will change and why
3. **GET EXPLICIT PERMISSION**: User must approve before proceeding
4. **BACKUP CURRENT STATE**: Take current website state backup
5. **VERIFY CONTENT**: Ensure no placeholder content is being deployed

### 3. CONTENT VALIDATION
**Before deployment, verify:**
- [ ] No placeholder text exists
- [ ] Real business content is present
- [ ] Product names are correct (Prime Focus C.A.F.E.)
- [ ] Business messaging is accurate
- [ ] No generic "Welcome" or "Content goes here" text

## 🔒 BRANCH PROTECTION

### Main Branch Rules
- **NO DIRECT PUSHES** to main without user permission
- **ALL CHANGES** must go through proper workflow
- **EMERGENCY ROLLBACKS** only with explicit user approval
- **CONTENT REVIEW** required before any merge to main

### Development Workflow
1. **Create feature branch**: `feat/description-of-change`
2. **Develop and test** on feature branch
3. **User review** of all changes
4. **User approval** before merge
5. **Merge to main** only after user confirms

## 🚨 EMERGENCY PROCEDURES

### If Placeholder Content is Detected
1. **IMMEDIATELY STOP** any deployment
2. **NOTIFY USER** of the issue
3. **ROLLBACK** to last working version
4. **INVESTIGATE** how placeholder got there
5. **FIX** the source of the problem
6. **VERIFY** real content is restored

### Rollback Commands
```bash
# Emergency rollback to S3 versioning
aws s3api copy-object --bucket www.primefocususa.com-site --key index.html --copy-source "www.primefocususa.com-site/index.html?versionId=1674VaXBTHfza0nFZBa0johV.b5n0ZDJ"

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id E32K05VBG79GEL --paths "/*"
```

## 📝 LOGGING REQUIREMENTS

### Every Action Must Be Logged
- **Timestamp** of action
- **What was changed** (exact details)
- **Why it was changed** (reason)
- **User approval** status
- **Backup created** (yes/no)
- **Result** of the action

### Log File Location
- **Primary**: `ops/logs/APP_LOG.md`
- **Emergency**: `ops/logs/EMERGENCY_LOG.md`
- **User Actions**: `ops/logs/USER_ACTIONS.md`

## 🎯 WEBSITE CONTENT STANDARDS

### Brand Guidelines
- **Company Name**: Prime Focus C.A.F.E. (not "Cafe")
- **Product Type**: Liquid nootropic supplement
- **Key Benefits**: Clarity, Awareness, Focus, Energy
- **Tone**: Professional, trustworthy, health-focused
- **Target Audience**: People seeking cognitive enhancement

### Design Requirements
- **Modern, professional appearance**
- **Mobile-responsive design**
- **Fast loading times**
- **Accessibility compliance**
- **SEO optimization**

## ⚠️ VIOLATION CONSEQUENCES

### If These Rules Are Broken
1. **IMMEDIATE ROLLBACK** required
2. **User notification** within 5 minutes
3. **Investigation** of how it happened
4. **Prevention measures** implemented
5. **Documentation** of the incident

## 🔍 MONITORING AND VERIFICATION

### Daily Checks
- [ ] Website loads correctly
- [ ] Real content is displayed
- [ ] No placeholder text visible
- [ ] All images load properly
- [ ] No broken links

### Weekly Reviews
- [ ] Content accuracy check
- [ ] Performance metrics
- [ ] User feedback review
- [ ] Security status
- [ ] Backup verification

## 📞 CONTACT AND ESCALATION

### Primary Contact
- **User**: Direct communication required for all changes
- **No autonomous decisions** allowed without user input

### Emergency Contacts
- **Immediate**: User notification
- **Escalation**: User approval required
- **External**: No external changes without user permission

---

## 🚨 REMEMBER: THIS IS YOUR REAL BUSINESS WEBSITE

**NEVER treat it like a demo or placeholder. Every change affects your actual business and customers.**

**Last Updated**: 2025-08-18
**Created By**: AI Assistant (following user requirements)
**Status**: ACTIVE - MUST BE FOLLOWED
