# Commands to Push to GitHub

Your GitHub username: **Focus072**

## Step 1: Create Repository on GitHub First

1. Go to: https://github.com/new
2. Repository name: `dance-portfolio` (or your choice)
3. Description: "Dance portfolio website"
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Run These Commands (Copy & Paste)

```bash
cd "/Users/jjoosseepphh/Desktop/Joseph's website"

git init
git checkout -b main
git add .
git commit -m "Initial commit: Dance portfolio website"

git remote add origin https://github.com/Focus072/dance-portfolio.git
git branch -M main
git push -u origin main
```

**Note:** Replace `dance-portfolio` with your actual repository name if you chose something different.
