# Environment Configuration & Vercel Deployment Guide

## Overview

This guide explains how to set up environment variables for local development and deploy to Vercel with support for multiple regions (Sangli and Kolhapur).

## Local Development Setup

### 1. Create `.env.local` File

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Configure Google Credentials

You need a Google Service Account to access Google Sheets. Follow these steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable the Google Sheets API
4. Create a Service Account:
   - Go to "Service Accounts" page
   - Click "Create Service Account"
   - Fill in the details and click "Create"
   - Click on the created service account
   - Go to "Keys" tab → "Add Key" → "Create new key"
   - Choose JSON format and download the file

5. Open the downloaded JSON file and fill in `.env.local`:

```bash
# From the service account JSON file:
GOOGLE_CREDENTIALS_TYPE=service_account
GOOGLE_CREDENTIALS_PROJECT_ID=<project_id from JSON>
GOOGLE_CREDENTIALS_PRIVATE_KEY_ID=<private_key_id from JSON>
GOOGLE_CREDENTIALS_PRIVATE_KEY="<private_key from JSON>"  # Keep the \n characters
GOOGLE_CREDENTIALS_CLIENT_EMAIL=<client_email from JSON>
GOOGLE_CREDENTIALS_CLIENT_ID=<client_id from JSON>
GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_CREDENTIALS_CLIENT_CERT_URL=<client_x509_cert_url from JSON>
```

### 3. Configure Sheet IDs

The sheet IDs are already set in `.env.example`:

```bash
NEXT_PUBLIC_SHEET_ID_SANGLI=1eey_a4t5EOL_nyEDau4FLvXomcnwgxWa5F3Rjd52OQg
NEXT_PUBLIC_SHEET_ID_KOLHAPUR=1i4Bp2AgJ7hPCJ6Zr6BL-hq6Puo85lgnGDHg9r6BozBo
```

If you need to use different sheets, update these values in `.env.local`.

### 4. Set Default Region

Choose which region to display by default:

```bash
NEXT_PUBLIC_DEFAULT_REGION=sangli  # or kolhapur
```

### 5. Run Locally

```bash
npm run dev
```

The application will start at `http://localhost:3000`

## Vercel Deployment

### 1. Push Code to GitHub

Ensure your code is in a GitHub repository. Make sure `.env.local` is in your `.gitignore` (it should be already).

Verify that sensitive files are not committed:
```bash
git status
```

You should NOT see:
- `.env.local`
- `credentials.json`
- `sheetid...txt` files

### 2. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### 3. Configure Environment Variables in Vercel

In the "Environment Variables" section during project setup or in project settings:

#### For All Deployments

Add these variables (same for preview, production, etc.):

```
GOOGLE_CREDENTIALS_TYPE=service_account
GOOGLE_CREDENTIALS_PROJECT_ID=<your_project_id>
GOOGLE_CREDENTIALS_PRIVATE_KEY_ID=<your_key_id>
GOOGLE_CREDENTIALS_PRIVATE_KEY=<your_private_key>  # Paste the entire key with \n preserved
GOOGLE_CREDENTIALS_CLIENT_EMAIL=<your_service_account_email>
GOOGLE_CREDENTIALS_CLIENT_ID=<your_client_id>
GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_CREDENTIALS_CLIENT_CERT_URL=<your_cert_url>
NEXT_PUBLIC_SHEET_ID_SANGLI=1eey_a4t5EOL_nyEDau4FLvXomcnwgxWa5F3Rjd52OQg
NEXT_PUBLIC_SHEET_ID_KOLHAPUR=1i4Bp2AgJ7hPCJ6Zr6BL-hq6Puo85lgnGDHg9r6BozBo
NEXT_PUBLIC_DEFAULT_REGION=sangli
NEXT_PUBLIC_APP_NAME=Wildlife Call Management Dashboard
NEXT_PUBLIC_APP_VERSION=0.1.0
```

⚠️ **Important for `GOOGLE_CREDENTIALS_PRIVATE_KEY`:**
- When pasting into Vercel, ensure the newlines (`\n`) are preserved
- You can either:
  - Paste the raw multi-line key (Vercel will handle the escaping)
  - Or paste it exactly as it appears in your `.env.local`

### 4. Handling Multiple Deployments (Optional)

If you want separate Vercel deployments for each region:

1. Create separate Vercel projects for each region
2. Set different `NEXT_PUBLIC_DEFAULT_REGION` values in each
3. Or set different `NEXT_PUBLIC_SHEET_ID_*` values if using different sheets

For example:
- **Sangli Deployment**: `NEXT_PUBLIC_DEFAULT_REGION=sangli`
- **Kolhapur Deployment**: `NEXT_PUBLIC_DEFAULT_REGION=kolhapur`

### 5. Deploy

Once environment variables are set:

1. Click "Deploy"
2. Vercel will build and deploy your project
3. Your app will be live at `https://your-project.vercel.app`

## Using Multiple Regions in the Same Deployment

The application supports switching between regions at runtime:

1. The `fetchIncidentData()` function accepts an optional `region` parameter
2. Update the page component to allow region selection
3. Different regions use different sheet IDs automatically

Example modification needed in `src/app/page.tsx`:

```typescript
// Add state for region selection
const [selectedRegion, setSelectedRegion] = useState<'sangli' | 'kolhapur'>('sangli')

// Pass region to fetchIncidentData
const incidentData = await fetchIncidentData(selectedRegion)
```

## Troubleshooting

### "GOOGLE_CREDENTIALS_PRIVATE_KEY is not set" Error

1. Check that the environment variable is set in Vercel
2. For local development, verify `.env.local` has the key
3. Ensure the private key is properly escaped with `\n` characters

### "Sheet ID for region is not configured"

1. Check that `NEXT_PUBLIC_SHEET_ID_SANGLI` and `NEXT_PUBLIC_SHEET_ID_KOLHAPUR` are set
2. Verify the sheet IDs are not empty strings
3. Check that the service account has access to these sheets

### Permission Denied Error

1. Ensure the service account email is shared as a viewer on the Google Sheet
2. The sheet should be shared with the service account email address
3. Check that the service account has "Viewer" or higher permissions

## Security Best Practices

1. ✅ Never commit `.env.local` to git (it's in `.gitignore`)
2. ✅ Never commit `credentials.json` (it's in `.gitignore`)
3. ✅ Use strong, random service account keys
4. ✅ Rotate keys periodically in Google Cloud Console
5. ✅ Limit service account permissions to "Viewer" on Google Sheets
6. ✅ Use Vercel's environment variable encryption for sensitive values
7. ✅ Don't share `.env.local` files across team members - each person should have their own

## Next Steps

Once deployed and working, you might want to:

1. Set up automatic deployments on push to specific branches
2. Add a region selector to the UI for runtime switching
3. Create separate Vercel deployments for each region (optional)
4. Monitor Google Sheets API usage and quotas
5. Set up error logging and monitoring
