# Environment Variables Guide

This guide explains all the environment variables you can configure for Joseph's Dancing Highlights website.

## Required Variables

### Admin Authentication
```bash
ADMIN_PASSWORD_HASH=your_hashed_password_here
```
- **How to generate**: Run `node scripts/generate-password.js your_password`
- **Purpose**: Secures the admin dashboard
- **Required**: Yes

### Vercel Blob Storage (for file uploads)
```bash
BLOB_READ_WRITE_TOKEN=your_blob_token_here
NEXT_PUBLIC_BLOB_STORE_ID=your_store_id_here
```
- **How to get**: Create a Blob storage in Vercel dashboard
- **Purpose**: Stores uploaded images and videos
- **Required**: Yes (if uploading files)

### Base URL
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
- **Production**: Set to your domain (e.g., `https://yourdomain.com`)
- **Purpose**: Used for API calls and media URLs
- **Required**: Yes

## Optional Variables

### Social Media Links
Update these with your actual social media profile URLs:

```bash
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your_username
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@your_channel
NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@your_username
```
- **Purpose**: Links in footer and social media page
- **Default**: Generic platform URLs if not set
- **Required**: No

### Contact Information
```bash
NEXT_PUBLIC_CONTACT_EMAIL=contact@example.com
NEXT_PUBLIC_CONTACT_PHONE=+1234567890
```
- **Purpose**: Displayed on the contact page
- **Default**: Placeholder values if not set
- **Required**: No

## Setup Instructions

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Fill in your values in `.env.local`

3. For production (Vercel):
   - Go to your Vercel project → Settings → Environment Variables
   - Add all variables there
   - Make sure to set `NEXT_PUBLIC_BASE_URL` to your production domain

## Notes

- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Never commit `.env.local` to git (it's in `.gitignore`)
- Restart your dev server after changing environment variables
