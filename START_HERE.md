# 🎬 START HERE - Next Steps

Your dance portfolio website is ready! Follow these steps to deploy it.

## ⚡ Quick Commands (Run These First)

Open Terminal and run:

```bash
cd "/Users/jjoosseepphh/Desktop/Joseph's website"

# Initialize git and commit
git init
git checkout -b main
git add .
git commit -m "Initial commit: Dance portfolio website"

# Or use the automated script:
# ./push-to-github.sh
```

## 📋 What to Do Next (In Order)

### 1️⃣ Push to GitHub (5 minutes)
1. Create a new repository at: https://github.com/new
   - Name it: `dance-portfolio` (or your choice)
   - **Don't** initialize with README
2. Run these commands (replace YOUR_USERNAME and REPO_NAME):
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2️⃣ Connect to Vercel (5 minutes)
1. Go to: https://vercel.com → Sign up with GitHub
2. Click "Add New Project"
3. Import your repository
4. **Don't deploy yet** - we need to set up storage first!

### 3️⃣ Set Up Blob Storage (5 minutes)
1. In Vercel → "Storage" → "Create Database" → "Blob"
2. Copy the token and store name

### 4️⃣ Generate Password Hash (2 minutes)
```bash
npm install
node scripts/generate-password.js your_secure_password
```
Copy the hash that appears.

### 5️⃣ Add Environment Variables (5 minutes)
In Vercel project → Settings → Environment Variables, add:
- `BLOB_READ_WRITE_TOKEN` (from step 3)
- `NEXT_PUBLIC_BLOB_STORE_ID` (from step 3)
- `ADMIN_PASSWORD_HASH` (from step 4)
- `NEXT_PUBLIC_BASE_URL` = `https://yourdomain.com` (use your GoDaddy domain)

### 6️⃣ Deploy! (2 minutes)
Click "Deploy" in Vercel. Wait for build to complete.

### 7️⃣ Connect GoDaddy Domain (10 minutes)
1. In Vercel → Settings → Domains → Add your domain
2. Update DNS in GoDaddy (see DEPLOYMENT_CHECKLIST.md for details)
3. Wait for DNS propagation (5 min - 48 hours)

## 📖 Detailed Guides

- **Full step-by-step**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Quick reference**: See [QUICK_START.md](./QUICK_START.md)

## ✅ You're All Set!

Once deployed, you'll be able to:
- View your portfolio at your domain
- Upload videos/photos at `/admin`
- Share your site with the world!

## 🆘 Need Help?

If you get stuck at any step, check:
1. DEPLOYMENT_CHECKLIST.md for detailed troubleshooting
2. Vercel build logs if deployment fails
3. DNS checker: https://www.whatsmydns.net if domain not working

---

**Estimated total time: ~30 minutes** ⏱️
