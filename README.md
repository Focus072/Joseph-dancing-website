# Dance Portfolio Website

A Next.js portfolio website to showcase dancing videos and photos, with an admin interface for uploading new content.

## Features

- Gallery view of videos and photos
- Admin upload interface (password protected)
- Support for direct file uploads and YouTube/Vimeo embeds
- Modern, responsive design
- Footer with social media links

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
   - Copy `env.example` to `.env.local`
   - Fill in your values (see deployment guide for Blob Storage setup)

3. **Generate admin password hash:**
```bash
node scripts/generate-password.js your_password_here
```

4. **Run development server:**
```bash
npm run dev
```

5. **Open** [http://localhost:3000](http://localhost:3000)

### Deployment to Vercel

📖 **See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for complete step-by-step deployment instructions.**

Quick overview:
1. Push code to GitHub
2. Connect to Vercel
3. Set up Vercel Blob Storage
4. Configure environment variables
5. Connect your GoDaddy domain

## Admin Access

- Navigate to `/admin/login` to access the admin interface
- Use the password you configured in `ADMIN_PASSWORD_HASH`

## Project Structure

```
/
├── app/                 # Next.js app directory
│   ├── admin/          # Admin pages (password protected)
│   ├── api/            # API routes (auth, upload, media)
│   └── components/     # React components
├── lib/                # Utility functions
├── data/               # Media metadata storage
└── scripts/            # Helper scripts
```

## Documentation

- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Complete deployment guide
- **[QUICK_START.md](./QUICK_START.md)** - Quick reference guide
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Vercel Blob Storage
- **Authentication**: Password-based with bcrypt
