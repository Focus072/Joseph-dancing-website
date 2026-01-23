#!/bin/bash

# Dance Portfolio - Deployment Script
# This script helps you push to GitHub and prepare for Vercel deployment

echo "🚀 Dance Portfolio Deployment Setup"
echo "===================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "none")

if [ "$CURRENT_BRANCH" = "none" ] || [ -z "$CURRENT_BRANCH" ]; then
    echo "🌿 Creating initial branch..."
    git checkout -b initial-setup 2>/dev/null || git checkout initial-setup
    echo "✅ On branch: initial-setup"
else
    echo "✅ Current branch: $CURRENT_BRANCH"
fi

# Add all files
echo ""
echo "📝 Staging files..."
git add .
echo "✅ Files staged"

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "⚠️  No changes to commit"
else
    echo ""
    echo "💾 Committing changes..."
    git commit -m "Initial commit: Dance portfolio website with admin upload interface"
    echo "✅ Changes committed"
fi

echo ""
echo "===================================="
echo "📋 Next Steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo "   (Don't initialize with README, .gitignore, or license)"
echo ""
echo "2. Add the remote and push:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Then follow the instructions in SETUP.md for Vercel configuration"
echo ""
echo "===================================="
