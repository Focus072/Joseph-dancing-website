#!/bin/bash

# Script to initialize git and prepare for GitHub push
# Run this script to set up your repository

set -e

echo "🎬 Dance Portfolio - Git Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
else
    echo -e "${GREEN}✅ Git repository already exists${NC}"
fi

# Check if we're on a branch
if ! git rev-parse --abbrev-ref HEAD &> /dev/null; then
    echo "🌿 Creating initial branch..."
    git checkout -b main 2>/dev/null || git branch main
    git checkout main
    echo -e "${GREEN}✅ On branch: main${NC}"
else
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo -e "${GREEN}✅ Current branch: $CURRENT_BRANCH${NC}"
fi

# Add all files
echo ""
echo "📝 Staging all files..."
git add .
echo -e "${GREEN}✅ Files staged${NC}"

# Check if there are changes to commit
if git diff --cached --quiet 2>/dev/null; then
    echo -e "${YELLOW}⚠️  No changes to commit (everything already committed)${NC}"
else
    echo ""
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit: Dance portfolio website with admin upload interface

- Next.js 14 with TypeScript and Tailwind CSS
- Gallery for videos and photos
- Admin upload interface with password protection
- Support for file uploads and YouTube/Vimeo embeds
- Vercel Blob Storage integration
- Responsive design matching fedeenterprises.com aesthetic"
    echo -e "${GREEN}✅ Changes committed${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ Git repository is ready!${NC}"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   👉 Go to: https://github.com/new"
echo "   • Repository name: dance-portfolio (or your preferred name)"
echo "   • Make it Public or Private (your choice)"
echo "   • DO NOT initialize with README, .gitignore, or license"
echo "   • Click 'Create repository'"
echo ""
echo "2. Connect and push to GitHub:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git push -u origin main"
echo ""
echo "   (Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values)"
echo ""
echo "3. After pushing, follow QUICK_START.md for Vercel setup"
echo ""
echo "================================"
