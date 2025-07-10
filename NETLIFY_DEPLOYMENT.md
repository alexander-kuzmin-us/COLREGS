# Netlify + Neon Database Deployment Guide

This guide will help you migrate your COLREGS app from your current setup to Netlify with Neon database.

## 🚀 Quick Start

### 1. Set Up Netlify Neon Database

1. Go to [Netlify](https://netlify.com) and sign up/login
2. Navigate to **Functions** → **Databases**
3. Click **Create database** → **Neon**
4. Choose your plan (free tier available)
5. Note down your `NETLIFY_DATABASE_URL`

### 2. Environment Variables

Set these environment variables in your Netlify dashboard:

```bash
NETLIFY_DATABASE_URL=your_netlify_neon_database_url
SESSION_SECRET=your_secure_session_secret
GOOGLE_CLIENT_ID=your_google_client_id (optional)
GOOGLE_CLIENT_SECRET=your_google_client_secret (optional)
NODE_ENV=production
```

### 3. Database Migration

Run the migration script to create your database schema:

```bash
# Set your environment variable
export NETLIFY_DATABASE_URL="your_netlify_neon_database_url"

# Run migration
npm run migrate:netlify
```

### 4. Database Seeding (IMPORTANT!)

**This step is crucial!** Your app won't work without data. Run the seed script to populate the database:

```bash
# Set your environment variable
export NETLIFY_DATABASE_URL="your_netlify_neon_database_url"

# Run seeding
npm run seed:netlify
```

This will populate your database with:
- 41 COLREGS rules (1-41)
- Comprehensive quizzes for each rule
- All parts (A-E) of the regulations

### 5. Deploy to Netlify

#### Option A: Deploy via Git (Recommended)

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build settings:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `netlify/functions`

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

## 📁 File Structure Changes

Your app has been updated with the following new files:

```
COLREGS/
├── netlify.toml              # Netlify configuration
├── migrate-to-netlify.js     # Database migration script
├── seed-netlify.js          # Database seeding script
├── netlify/
│   └── functions/
│       └── api.ts           # Netlify function wrapper
├── client/public/
│   └── _redirects           # SPA routing rules
└── NETLIFY_DEPLOYMENT.md    # This guide
```

## 🔧 Configuration Changes

### Database Connection
- **Old**: `@neondatabase/serverless` with `DATABASE_URL`
- **New**: `@netlify/neon` with `NETLIFY_DATABASE_URL`

### Build Process
- **Old**: Single build for Express server
- **New**: Separate builds for frontend and serverless functions

## 🗄️ Database Migration Steps

### 1. Export Current Data (if any)

If you have existing data, export it from your current database:

```sql
-- Export rules
COPY rules TO '/tmp/rules.csv' WITH CSV HEADER;

-- Export quizzes  
COPY quizzes TO '/tmp/quizzes.csv' WITH CSV HEADER;

-- Export other tables as needed
```

### 2. Import Data to Netlify Neon

```bash
# Connect to your Netlify Neon database
psql "your_netlify_neon_database_url"

# Import data
\copy rules FROM '/tmp/rules.csv' WITH CSV HEADER;
\copy quizzes FROM '/tmp/quizzes.csv' WITH CSV HEADER;
```

### 3. Verify Migration

```bash
# Test database connection
npm run migrate:netlify
```

## 🔍 Troubleshooting

### Common Issues

1. **"Page Not Found" Error**
   - Check that `_redirects` file is in `dist/public/`
   - Verify publish directory is set to `dist/public`
   - Ensure build is not failing

2. **Empty Database / "Start Learning" Not Working**
   - **Most common issue**: Database is empty
   - Run the seed script: `npm run seed:netlify`
   - Check database status: Visit `/api/status` endpoint
   - Verify `NETLIFY_DATABASE_URL` is correct

3. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check build logs in Netlify dashboard

4. **Database Connection Issues**
   - Verify `NETLIFY_DATABASE_URL` is correct
   - Check if database is accessible from Netlify
   - Ensure SSL is enabled for database connection

5. **Function Timeouts**
   - Netlify functions have a 10-second timeout
   - Optimize database queries
   - Consider caching for heavy operations

### Environment Variables

Make sure these are set in Netlify:
- `NETLIFY_DATABASE_URL` (required)
- `SESSION_SECRET` (required)
- `GOOGLE_CLIENT_ID` (optional)
- `GOOGLE_CLIENT_SECRET` (optional)

### Local Testing

Test locally before deploying:

```bash
# Set environment variables
export NETLIFY_DATABASE_URL="your_url"
export SESSION_SECRET="your_secret"

# Test migration
npm run migrate:netlify

# Test seeding
npm run seed:netlify

# Test build
npm run build:netlify
```

### Database Status Check

You can check your database status by visiting:
- `https://your-app.netlify.app/api/status`

This will show:
- Database connection status
- Number of rules and quizzes
- Whether data is seeded

## 📊 Performance Considerations

### Netlify Limitations
- **Function timeout**: 10 seconds
- **Function memory**: 1024 MB
- **Request size**: 6 MB
- **Response size**: 6 MB

### Optimization Tips
1. Use connection pooling for database
2. Implement caching for static data
3. Optimize bundle size
4. Use CDN for static assets

## 🔐 Security

### Environment Variables
- Never commit sensitive data to Git
- Use Netlify's environment variable management
- Rotate secrets regularly

### Database Security
- Use SSL connections
- Implement proper authentication
- Regular security updates

## 📈 Monitoring

### Netlify Analytics
- Function invocations
- Response times
- Error rates
- Bandwidth usage

### Database Monitoring
- Connection count
- Query performance
- Storage usage

## 🆘 Support

If you encounter issues:

1. Check Netlify function logs
2. Verify database connectivity
3. Review build logs
4. Check environment variables
5. Test locally first
6. **Most importantly**: Ensure database is seeded!

## 🎉 Success!

Once deployed, your app will be available at:
`https://your-app-name.netlify.app`

Your database will be automatically managed by Netlify Neon with:
- Automatic backups
- SSL encryption
- Connection pooling
- Performance monitoring

## 🚨 Important Notes

- **Database seeding is required** - Your app won't work without data
- The seed script populates 41 rules and comprehensive quizzes
- Run `npm run seed:netlify` after setting up your database
- Check `/api/status` to verify database is populated 