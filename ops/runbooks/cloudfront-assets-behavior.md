# CloudFront Assets Behavior Configuration

## Problem
The SPA (Single Page Application) rewrite rule is catching `/assets/*` requests and returning HTML instead of the actual assets, causing:
- CSS files to return `text/html` MIME type
- JavaScript files to return `text/html` MIME type
- 404 errors for missing assets to fall back to `index.html`

## Solution
Configure CloudFront behaviors to ensure `/assets/*` requests are served directly from S3 without SPA fallback.

## Manual Console Steps

### 1. Access CloudFront Console
1. Go to [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Select your distribution: `E32K05VBG79GEL`

### 2. Edit Behaviors
1. Click on the **Behaviors** tab
2. Look for the default behavior (`*` pattern)
3. Click **Edit**

### 3. Configure Path Pattern Priority
Ensure the behaviors are ordered correctly:

**Priority 1: Assets (Exact Match)**
- **Path Pattern**: `/assets/*`
- **Origin**: S3 bucket origin
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS
- **Cache Policy**: CachingOptimized
- **Origin Request Policy**: CORS-S3Origin
- **Response Headers Policy**: CORS-CustomOrigin
- **Function Associations**: None
- **Real-time Logs**: Disabled

**Priority 2: SPA Fallback (Catch-all)**
- **Path Pattern**: `*`
- **Origin**: S3 bucket origin
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS
- **Cache Policy**: CachingDisabled
- **Origin Request Policy**: CORS-S3Origin
- **Response Headers Policy**: CORS-CustomOrigin
- **Function Associations**: None
- **Real-time Logs**: Disabled

### 4. Key Configuration Details

#### Assets Behavior (`/assets/*`)
- **Cache Policy**: Use `CachingOptimized` for long-term caching
- **TTL**: 1 year for JS/CSS, 1 hour for other assets
- **Compression**: Enable compression for text-based assets
- **Headers**: Include `Access-Control-Allow-Origin: *`

#### SPA Behavior (`*`)
- **Cache Policy**: Use `CachingDisabled` to prevent HTML caching
- **TTL**: 0 seconds
- **Compression**: Enable compression
- **Headers**: Include `Access-Control-Allow-Origin: *`

### 5. Error Pages Configuration
1. Go to **Error Pages** tab
2. **Custom Error Responses**: Disabled for all error codes
3. This prevents CloudFront from serving custom error pages that could interfere with SPA routing

### 6. Functions (Optional)
If you have CloudFront Functions, ensure none are attached to the `/assets/*` behavior.

## Verification Steps

### 1. Test Asset Requests
```bash
# Test CSS file
curl -I "https://www.primefocususa.com/assets/index-a60abc64.css"
# Should return: Content-Type: text/css

# Test JS file  
curl -I "https://www.primefocususa.com/assets/index-a1a94dd2.js"
# Should return: Content-Type: application/javascript
```

### 2. Test SPA Fallback
```bash
# Test non-existent route
curl -I "https://www.primefocususa.com/non-existent-route"
# Should return: Content-Type: text/html (index.html)
```

### 3. Check Browser Network Tab
- CSS files should show `200 OK` with `text/css` MIME type
- JS files should show `200 OK` with `application/javascript` MIME type
- No requests to `/assets/*` should return HTML content

## Troubleshooting

### Issue: Assets still returning HTML
1. Check behavior order - `/assets/*` must come before `*`
2. Verify cache policy settings
3. Clear CloudFront cache with invalidation
4. Check S3 bucket permissions

### Issue: Assets returning 404
1. Verify S3 bucket contains the files
2. Check S3 bucket policy allows CloudFront access
3. Verify origin configuration points to correct S3 bucket

### Issue: CORS errors
1. Ensure S3 bucket has CORS configuration
2. Check CloudFront response headers policy
3. Verify `Access-Control-Allow-Origin` header is set

## Rollback
If issues occur:
1. Revert behavior changes in CloudFront console
2. Use S3 versioning to restore previous files
3. Create CloudFront invalidation to clear cache
