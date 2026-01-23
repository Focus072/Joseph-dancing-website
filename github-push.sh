#!/bin/bash

# Script to push to GitHub
# Usage: ./github-push.sh YOUR_GITHUB_USERNAME YOUR_REPO_NAME

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ Error: Please provide your GitHub username and repository name"
    echo ""
    echo "Usage: ./github-push.sh YOUR_GITHUB_USERNAME YOUR_REPO_NAME"
    echo ""
    echo "Example: ./github-push.sh johndoe dance-portfolio"
    echo ""
    echo "Or run these commands manually:"
    echo ""
    echo "git init"
    echo "git checkout -b main"
    echo "git add ."
    echo "git commit -m 'Initial commit: Dance portfolio website'"
    echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=$2

echo "🚀 Pushing to GitHub..."
echo "Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Create main branch
git checkout -b main 2>/dev/null || git checkout main

# Add all files
echo "📝 Staging files..."
git add .

# Commit
echo "💾 Committing files..."
git commit -m "Initial commit: Dance portfolio website" || echo "Already committed or no changes"

# Add remote (remove if exists first)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push
echo ""
echo "⬆️  Pushing to GitHub..."
echo "If this is your first time, GitHub may ask for credentials."
echo ""
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code is now on GitHub!"
    echo "👉 View it at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   1. Repository doesn't exist on GitHub - create it first at https://github.com/new"
    echo "   2. Authentication required - use GitHub CLI or personal access token"
    echo "   3. Network connection issue"
fi
