# Quick Start Guide - GitHub & Vercel Deployment

## Prerequisites
- GitHub account
- Vercel account (sign up with GitHub at vercel.com)
- GoDaddy domain

## Step 1: Push to GitHub

### Option A: Use the provided script
```bash
./deploy.sh
```

Then follow the commands it outputs.

### Option B: Manual steps

1. **Initialize Git** (if not done):
```bash
git init
git checkout -b initial-setup
```

2. **Commit all files**:
```bash
git add .
git commit -m "Initial commit: Dance portfolio website with admin upload interface"
```

3. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repo (don't initialize with README)
   - Copy the repository URL

4. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Connect to Vercel

1. **Sign in to Vercel**: https://vercel.com (use GitHub to sign in)

2. **Import Project**:
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project** (should auto-detect Next.js):
   - Framework: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Set Up Vercel Blob Storage**:
   - In Vercel dashboard, go to "Storage" tab
   - Click "Create Database" → Select "Blob"
   - Name it (e.g., "dance-portfolio-blob")
   - Copy the `BLOB_READ_WRITE_TOKEN` and `NEXT_PUBLIC_BLOB_STORE_ID`

5. **Add Environment Variables**:
   - In project settings → "Environment Variables"
   - Add these (for all environments):
   
   ```
   BLOB_READ_WRITE_TOKEN=<from blob storage>
   NEXT_PUBLIC_BLOB_STORE_ID=<from blob storage>
   ADMIN_PASSWORD_HASH=<generate with: node scripts/generate-password.js your_password>
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   ```

6. **Generate Password Hash**:
   ```bash
   npm install
   node scripts/generate-password.js your_secure_password
   ```
   Copy the output and use it for `ADMIN_PASSWORD_HASH`

7. **Deploy**: Click "Deploy" button

## Step 3: Connect GoDaddy Domain

1. **Add Domain in Vercel**:
   - Go to project → "Settings" → "Domains"
   - Enter your domain: `yourdomain.com`
   - Vercel will show DNS configuration needed

2. **Update GoDaddy DNS**:
   - Login to GoDaddy → "My Products" → "DNS"
   - Add/Update records:

   **For Root Domain:**
   - Type: `A` Record
   - Name: `@`
   - Value: `76.76.21.21` (or value shown in Vercel)
   - TTL: 1 hour

   **For www:**
   - Type: `CNAME` Record  
   - Name: `www`
   - Value: `cname.vercel-dns.com.`
   - TTL: 1 hour

3. **Wait for DNS Propagation** (5 minutes to 48 hours)

4. **Verify**: Check status in Vercel dashboard - SSL will auto-configure

## Troubleshooting

- **DNS not working?** Wait 24-48 hours for full propagation
- **Build fails?** Check environment variables are set correctly
- **Can't upload?** Verify Blob Storage credentials in environment variables

## Need Help?

See detailed instructions in `SETUP.md`
