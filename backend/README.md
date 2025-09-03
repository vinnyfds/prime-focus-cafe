# Prime Focus C.A.F.E. Backend API

A comprehensive Node.js backend API for the Prime Focus C.A.F.E. application with authentication, OAuth, email verification, and waitlist management.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Password hashing with bcrypt
  - Email verification
  - Password reset functionality

- 🌐 **OAuth Integration**
  - Google OAuth 2.0
  - Facebook OAuth
  - LinkedIn OAuth

- 📧 **Email Services**
  - Email verification
  - Password reset emails
  - Welcome emails
  - SendGrid integration

- 🛡️ **Security Features**
  - Rate limiting
  - CORS configuration
  - Helmet security headers
  - Input validation
  - SQL injection protection

- 📊 **Database**
  - MongoDB with Mongoose
  - User management
  - Waitlist management
  - Session storage

## Quick Start

### Prerequisites

- Node.js 16+ 
- MongoDB
- SendGrid account (for emails)
- OAuth app credentials (Google, Facebook, LinkedIn)

### Installation

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp env.example .env
   ```
   
   Configure your `.env` file with:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/primefocus
   SESSION_SECRET=your-super-secret-session-key-here
   
   # JWT Configuration
   JWT_SECRET=your-jwt-secret-key-here
   JWT_EXPIRES_IN=7d
   
   # Email Configuration (SendGrid)
   SENDGRID_API_KEY=your-sendgrid-api-key
   FROM_EMAIL=noreply@primefocususa.com
   
   # OAuth Configuration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   FACEBOOK_APP_ID=your-facebook-app-id
   FACEBOOK_APP_SECRET=your-facebook-app-secret
   
   LINKEDIN_CLIENT_ID=your-linkedin-client-id
   LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or using local MongoDB installation
   mongod
   ```

5. **Run the application:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/verify-email` - Verify email with token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### OAuth
- `GET /api/oauth/google` - Google OAuth login
- `GET /api/oauth/facebook` - Facebook OAuth login
- `GET /api/oauth/linkedin` - LinkedIn OAuth login
- `GET /api/oauth/urls` - Get OAuth URLs

### Waitlist
- `POST /api/waitlist/join` - Join waitlist
- `GET /api/waitlist/stats` - Get waitlist statistics
- `GET /api/waitlist/check` - Check if email is on waitlist

### Health Check
- `GET /health` - API health status

## Database Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  isEmailVerified: Boolean,
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  oauthProvider: String,
  oauthId: String,
  profilePicture: String,
  consent: Boolean,
  lastLogin: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Waitlist Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  consent: Boolean,
  source: String,
  status: String,
  notifiedAt: Date,
  convertedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

### Rate Limiting
- General API: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- Email verification: 3 requests per hour
- Password reset: 3 requests per hour

### Password Security
- bcrypt hashing with salt rounds of 12
- Minimum 6 character password requirement
- Password reset tokens expire in 10 minutes

### JWT Security
- Configurable expiration (default: 7 days)
- Secure token generation
- Token validation middleware

### CORS Configuration
- Configurable origin (default: localhost:3000)
- Credentials support
- Specific methods and headers allowed

## Deployment

### Using Docker
```bash
# Build image
docker build -t primefocus-api .

# Run container
docker run -d -p 3001:3001 --env-file .env primefocus-api
```

### Using PM2
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name "primefocus-api"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Environment Variables for Production
Make sure to set these in your production environment:
- `NODE_ENV=production`
- `MONGODB_URI` (production MongoDB)
- `JWT_SECRET` (strong secret key)
- `SENDGRID_API_KEY` (production SendGrid key)
- All OAuth credentials for production apps

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Monitoring

The API includes:
- Health check endpoint
- Error logging
- Request logging
- Performance monitoring hooks

## Support

For issues or questions:
1. Check the logs for error details
2. Verify environment variables
3. Ensure MongoDB is running
4. Check OAuth app configurations

## License

Private - Prime Focus C.A.F.E.
