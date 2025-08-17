# Prime Focus Cafe

A modern React frontend application for Prime Focus Cafe with AWS deployment.

## Features

- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Responsive design
- GitHub Actions for CI/CD
- AWS S3 + CloudFront deployment

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

The application is automatically deployed to AWS S3 and served via CloudFront CDN when changes are pushed to the main branch.

### Required AWS Secrets:
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key  
- `AWS_REGION` - AWS region (e.g., us-east-1)
- `S3_BUCKET` - S3 bucket name for hosting
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID
