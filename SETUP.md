# Deployment Setup Guide

## Step 1: Initialize Git and Push to GitHub

### 1.1 Initialize Git Repository
```bash
git init
```

### 1.2 Create Initial Branch (never work on main)
```bash
git checkout -b initial-setup
```

### 1.3 Add All Files
```bash
git add .
```

### 1.4 Create Initial Commit
```bash
git commit -m "Initial commit: Dance portfolio website with admin upload interface"
```

### 1.5 Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Create a new repository (name it something like `dance-portfolio`)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)

### 1.6 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Step 2: Set Up Vercel

### 2.1 Connect GitHub to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js (should auto-detect)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

### 2.2 Add Environment Variables in Vercel
Before deploying, add these environment variables in Vercel project settings:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following:

```
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
ADMIN_PASSWORD_HASH=your_hashed_password
NEXT_PUBLIC_BLOB_STORE_ID=your_blob_store_id
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

**Important:** Set these for all environments (Production, Preview, Development)

### 2.3 Set Up Vercel Blob Storage
1. In Vercel dashboard, go to "Storage"
2. Click "Create Database" → Select "Blob"
3. Choose a name for your blob store
4. Copy the `BLOB_READ_WRITE_TOKEN` and `NEXT_PUBLIC_BLOB_STORE_ID`
5. Add these to your environment variables

### 2.4 Deploy
Click "Deploy" and wait for the build to complete.

## Step 3: Connect GoDaddy Domain to Vercel

### 3.1 Add Domain in Vercel
1. In your Vercel project, go to "Settings" → "Domains"
2. Enter your domain (e.g., `yourdomain.com`)
3. Vercel will show you the DNS records needed

### 3.2 Configure DNS in GoDaddy
1. Log in to your GoDaddy account
2. Go to "My Products" → "DNS Management"
3. Add/Update the following records:

**For Root Domain (yourdomain.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
- TTL: 3600

**OR use CNAME (recommended):**
- Type: `CNAME`
- Name: `@`
- Value: `cname.vercel-dns.com.`
- TTL: 3600

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com.`
- TTL: 3600

### 3.3 Wait for DNS Propagation
- DNS changes can take 24-48 hours to propagate globally
- Usually works within a few hours
- You can check status in Vercel dashboard

### 3.4 Verify SSL Certificate
- Vercel automatically provisions SSL certificates via Let's Encrypt
- Wait 5-10 minutes after DNS propagation for SSL to activate
- Your site will be available at `https://yourdomain.com`

## Step 4: Generate Admin Password Hash

Before deploying, generate your admin password hash:

```bash
npm install
node scripts/generate-password.js your_secure_password
```

Copy the generated hash and add it to Vercel environment variables as `ADMIN_PASSWORD_HASH`.

## Troubleshooting

### DNS Not Working?
- Wait 24-48 hours for full propagation
- Use `dig yourdomain.com` or online DNS checkers to verify
- Ensure GoDaddy DNS records match exactly what Vercel shows

### Build Fails?
- Check that all environment variables are set in Vercel
- Ensure `package.json` has all dependencies
- Check build logs in Vercel dashboard for specific errors

### Images/Videos Not Loading?
- Verify Vercel Blob Storage is properly configured
- Check that `BLOB_READ_WRITE_TOKEN` is set correctly
- Ensure `NEXT_PUBLIC_BLOB_STORE_ID` matches your blob store

## Security Notes

- Never commit `.env.local` to GitHub (it's in `.gitignore`)
- Keep your `ADMIN_PASSWORD_HASH` secure
- Use a strong password for admin access
- Consider enabling Vercel's password protection for preview deployments
