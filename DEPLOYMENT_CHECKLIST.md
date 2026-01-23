# 🚀 Deployment Checklist

Follow these steps in order to deploy your dance portfolio website.

## ✅ Step 1: Prepare Local Repository

### 1.1 Initialize Git (Run in Terminal)
```bash
cd "/Users/jjoosseepphh/Desktop/Joseph's website"
git init
git checkout -b main
git add .
git commit -m "Initial commit: Dance portfolio website"
```

**OR** run the automated script:
```bash
./push-to-github.sh
```

### 1.2 Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `dance-portfolio` (or your choice)
3. Description: "Portfolio website for dance videos and photos"
4. **IMPORTANT**: Don't check "Add a README file" or initialize with anything
5. Click "Create repository"

### 1.3 Push to GitHub
```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## ✅ Step 2: Set Up Vercel

### 2.1 Create Vercel Account
1. Go to: https://vercel.com
2. Click "Sign Up" → Choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub

### 2.2 Import Project
1. Click "Add New..." → "Project"
2. Import your `dance-portfolio` repository
3. Click "Import"

### 2.3 Configure Project Settings
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

**DO NOT deploy yet** - we need to set up Blob Storage first!

---

## ✅ Step 3: Set Up Vercel Blob Storage

### 3.1 Create Blob Store
1. In Vercel Dashboard, go to "Storage" tab (left sidebar)
2. Click "Create Database"
3. Select "Blob"
4. Name it: `dance-portfolio-blob` (or your choice)
5. Region: Choose closest to you (e.g., `iad1` for US East)
6. Click "Create"

### 3.2 Copy Credentials
After creation, you'll see:
- `BLOB_READ_WRITE_TOKEN` - Copy this
- Store name (this is your `NEXT_PUBLIC_BLOB_STORE_ID`)

---

## ✅ Step 4: Generate Admin Password Hash

### 4.1 Install Dependencies (if not done)
```bash
cd "/Users/jjoosseepphh/Desktop/Joseph's website"
npm install
```

### 4.2 Generate Hash
```bash
node scripts/generate-password.js your_secure_password_here
```

**Copy the hash that appears** - you'll need it for Vercel environment variables.

---

## ✅ Step 5: Configure Vercel Environment Variables

### 5.1 Add Variables
1. In Vercel project, go to "Settings" → "Environment Variables"
2. Add each variable (click "Add" for each):

   | Name | Value | Environment |
   |------|-------|-------------|
   | `BLOB_READ_WRITE_TOKEN` | (from Step 3.2) | Production, Preview, Development |
   | `NEXT_PUBLIC_BLOB_STORE_ID` | (your blob store name from Step 3.2) | Production, Preview, Development |
   | `ADMIN_PASSWORD_HASH` | (from Step 4.2) | Production, Preview, Development |
   | `NEXT_PUBLIC_BASE_URL` | `https://yourdomain.com` | Production only |

3. **IMPORTANT**: Select all three environments (Production, Preview, Development) for first three variables
4. Click "Save" after adding each variable

### 5.2 Deploy
1. Go back to "Deployments" tab
2. If you already deployed, click the three dots on latest deployment → "Redeploy"
3. Or trigger a new deployment by pushing to GitHub or clicking "Deploy"

Wait for build to complete (usually 1-2 minutes).

---

## ✅ Step 6: Connect GoDaddy Domain

### 6.1 Add Domain in Vercel
1. In Vercel project → "Settings" → "Domains"
2. Enter your domain: `yourdomain.com` (without www)
3. Click "Add"
4. Vercel will show DNS configuration needed

### 6.2 Configure DNS in GoDaddy
1. Login to GoDaddy: https://sso.godaddy.com
2. Go to "My Products" → Click "DNS" next to your domain

3. **Update/Add Records:**

   **Record 1 - Root Domain (A Record):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (or the IP Vercel shows you)
   - TTL: 1 hour

   **Record 2 - www (CNAME Record):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com.` (note the trailing dot)
   - TTL: 1 hour

4. Save all changes
5. **Wait 5 minutes to 48 hours** for DNS propagation

### 6.3 Verify Domain
1. Check status in Vercel "Domains" page
2. When status shows "Valid Configuration", DNS is working
3. Vercel will automatically provision SSL certificate (takes 5-10 minutes after DNS)

### 6.4 Update Environment Variable
Once domain is working, update `NEXT_PUBLIC_BASE_URL`:
1. Settings → Environment Variables
2. Edit `NEXT_PUBLIC_BASE_URL`
3. Change to: `https://yourdomain.com`
4. Redeploy

---

## ✅ Step 7: Test Everything

### 7.1 Test Public Site
- Visit your domain: `https://yourdomain.com`
- Should see home page with gallery

### 7.2 Test Admin Access
- Go to: `https://yourdomain.com/admin/login`
- Login with your password
- Upload a test photo or video
- Verify it appears in gallery

### 7.3 Test Uploads
- Upload a video file
- Upload a photo
- Add a YouTube/Vimeo embed URL
- Verify all appear correctly

---

## 🎉 Done!

Your website is now live! You can:
- Share your domain with others
- Upload new content via `/admin`
- Customize the footer social links in `app/components/Footer.tsx`

---

## 🔧 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify all three variables are added for all environments
- Check build logs in Vercel dashboard

### DNS Not Working
- Wait 24-48 hours for full propagation
- Verify DNS records match exactly what Vercel shows
- Use online DNS checker: https://www.whatsmydns.net

### Can't Upload Files
- Verify Blob Storage is created
- Check `BLOB_READ_WRITE_TOKEN` is correct
- Ensure `NEXT_PUBLIC_BLOB_STORE_ID` matches your store name

### Images Not Loading
- Check Next.js image config allows your blob domain
- Verify blob URLs are correct
- Check browser console for errors

---

## 📝 Next Steps

- Customize your site title in `app/layout.tsx`
- Update social links in `app/components/Footer.tsx`
- Add your actual Instagram, YouTube, etc. URLs
- Customize colors/styling in `tailwind.config.ts`
