# Backend Deployment Guide

## Production Environment Setup

### 1. Environment Variables

Create a `.env` file in the backend directory with these production values:

```env
# Production Environment Configuration
PORT=3001
NODE_ENV=production

# Database - Use MongoDB Atlas or AWS DocumentDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primefocus?retryWrites=true&w=majority
SESSION_SECRET=your-super-secret-session-key-for-production

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-for-production
JWT_EXPIRES_IN=7d

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@primefocususa.com

# OAuth Configuration - Production Apps
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Frontend URL
FRONTEND_URL=https://www.primefocususa.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Database Setup

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

#### Option B: AWS DocumentDB

1. Create DocumentDB cluster in AWS
2. Configure security groups
3. Get connection string
4. Update `MONGODB_URI` in your `.env` file

### 3. OAuth App Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://api.primefocususa.com/api/oauth/google/callback`
6. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

#### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URIs:
   - `https://api.primefocususa.com/api/oauth/facebook/callback`
5. Update `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET`

#### LinkedIn OAuth

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add Sign In with LinkedIn product
4. Configure OAuth redirect URIs:
   - `https://api.primefocususa.com/api/oauth/linkedin/callback`
5. Update `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`

### 4. SendGrid Setup

1. Go to [SendGrid](https://sendgrid.com/)
2. Create an account
3. Generate API key
4. Update `SENDGRID_API_KEY` in your `.env` file

### 5. Deployment Options

#### Option A: AWS EC2

1. Launch EC2 instance (t2.micro for free tier)
2. Install Node.js and PM2
3. Clone repository
4. Install dependencies
5. Configure environment variables
6. Start with PM2

#### Option B: AWS Elastic Beanstalk

1. Create Elastic Beanstalk application
2. Upload backend code as ZIP
3. Configure environment variables
4. Deploy

#### Option C: Docker on AWS ECS

1. Create Dockerfile
2. Build and push to ECR
3. Create ECS service
4. Configure environment variables

### 6. Domain Setup

1. Point `api.primefocususa.com` to your server
2. Configure SSL certificate
3. Update CORS settings

### 7. Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] Strong session secret
- [ ] MongoDB connection secured
- [ ] OAuth credentials configured
- [ ] SendGrid API key secured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Rate limiting enabled

### 8. Testing

1. Test health endpoint: `GET https://api.primefocususa.com/health`
2. Test auth endpoints
3. Test OAuth flows
4. Test email functionality

### 9. Monitoring

- Set up CloudWatch logs
- Monitor API performance
- Set up alerts for errors
- Monitor database performance

## Quick Deploy Script

```bash
# Install dependencies
npm install

# Set up environment
cp env.example .env
# Edit .env with production values

# Start with PM2
npm install -g pm2
pm2 start server.js --name "primefocus-api"
pm2 save
pm2 startup
```

## Frontend Integration

Once backend is deployed, update frontend:

1. Uncomment OAuth URLs in `AuthEnhanced.tsx`
2. Uncomment API calls in `App.tsx` and `Newsletter.tsx`
3. Update API base URL to `https://api.primefocususa.com`
4. Test all functionality
