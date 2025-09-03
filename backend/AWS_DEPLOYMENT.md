# AWS Backend Deployment Guide

## Quick AWS EC2 Deployment

### 1. Launch EC2 Instance
1. Go to AWS EC2 Console
2. Launch Instance
3. Choose Ubuntu Server 22.04 LTS
4. Select t2.micro (free tier)
5. Configure security group:
   - SSH (22) - Your IP
   - HTTP (80) - Anywhere
   - HTTPS (443) - Anywhere
   - Custom TCP (3001) - Anywhere (for API)

### 2. Connect to Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 3. Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install git -y
```

### 4. Deploy Application
```bash
# Clone repository
git clone https://github.com/vinnyfds/prime-focus-cafe.git
cd prime-focus-cafe/backend

# Install dependencies
npm install

# Create environment file
cp env.example .env
nano .env  # Edit with your production values

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 5. Configure Domain (Optional)
1. Point `api.primefocususa.com` to your EC2 IP
2. Install SSL certificate with Let's Encrypt:
```bash
sudo apt install certbot -y
sudo certbot --nginx -d api.primefocususa.com
```

### 6. Environment Variables Setup
Edit `.env` file with these values:

```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primefocus
SESSION_SECRET=your-very-secure-session-secret-here
JWT_SECRET=your-very-secure-jwt-secret-here
SENDGRID_API_KEY=your-sendgrid-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
FRONTEND_URL=https://www.primefocususa.com
```

### 7. Test Deployment
```bash
# Check if API is running
curl http://localhost:3001/health

# Check PM2 status
pm2 status

# View logs
pm2 logs primefocus-api
```

### 8. Update Frontend
Once backend is deployed and working:

1. Update `AuthEnhanced.tsx` - uncomment OAuth URLs
2. Update `App.tsx` - uncomment waitlist API calls
3. Update `Newsletter.tsx` - uncomment API calls
4. Deploy frontend changes

### 9. Monitoring
```bash
# Monitor logs
pm2 logs primefocus-api --lines 100

# Monitor system resources
pm2 monit

# Restart if needed
pm2 restart primefocus-api
```

## Alternative: AWS Elastic Beanstalk

### 1. Create Application
1. Go to Elastic Beanstalk Console
2. Create new application
3. Choose Node.js platform
4. Upload backend code as ZIP

### 2. Configure Environment
1. Set environment variables in EB console
2. Configure load balancer
3. Set up SSL certificate

### 3. Deploy
1. Upload new version
2. Monitor deployment
3. Test endpoints

## Cost Estimation
- EC2 t2.micro: Free tier (750 hours/month)
- MongoDB Atlas: Free tier (512MB)
- SendGrid: Free tier (100 emails/day)
- Total: $0/month (within free tier limits)

## Security Checklist
- [ ] Security groups configured
- [ ] Strong secrets in .env
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Regular updates scheduled
- [ ] Backup strategy in place
