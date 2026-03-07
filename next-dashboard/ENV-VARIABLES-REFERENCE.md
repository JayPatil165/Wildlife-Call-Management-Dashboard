# Environment Variables Reference

This document lists all environment variables used by the Wildlife Call Management Dashboard.

## Required Variables

### Google Credentials (Server-side only)

These variables are required for Google Sheets API access. They should be set in `.env.local` and Vercel.

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_CREDENTIALS_TYPE` | Service account type | `service_account` |
| `GOOGLE_CREDENTIALS_PROJECT_ID` | Google Cloud project ID | `my-project-123` |
| `GOOGLE_CREDENTIALS_PRIVATE_KEY_ID` | Private key ID | `key123abc...` |
| `GOOGLE_CREDENTIALS_PRIVATE_KEY` | Service account private key | `-----BEGIN PRIVATE KEY-----\n...` |
| `GOOGLE_CREDENTIALS_CLIENT_EMAIL` | Service account email | `service@project.iam.gserviceaccount.com` |
| `GOOGLE_CREDENTIALS_CLIENT_ID` | Client ID | `123456789...` |
| `GOOGLE_CREDENTIALS_AUTH_URI` | OAuth2 auth endpoint | `https://accounts.google.com/o/oauth2/auth` |
| `GOOGLE_CREDENTIALS_TOKEN_URI` | OAuth2 token endpoint | `https://oauth2.googleapis.com/token` |
| `GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL` | Cert URL | `https://www.googleapis.com/oauth2/v1/certs` |
| `GOOGLE_CREDENTIALS_CLIENT_CERT_URL` | Client cert URL | `https://www.googleapis.com/robot/v1/metadata/...` |

### Sheet IDs (Public - safe to expose)

These are your Google Sheets IDs. They're prefixed with `NEXT_PUBLIC_` so they're available in the browser.

| Variable | Description | Value |
|----------|-------------|-------|
| `NEXT_PUBLIC_SHEET_ID_SANGLI` | Sangli region sheet ID | `1eey_a4t5EOL_nyEDau4FLvXomcnwgxWa5F3Rjd52OQg` |
| `NEXT_PUBLIC_SHEET_ID_KOLHAPUR` | Kolhapur region sheet ID | `1i4Bp2AgJ7hPCJ6Zr6BL-hq6Puo85lgnGDHg9r6BozBo` |

## Optional Variables

### Application Settings

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_DEFAULT_REGION` | Default region on app load | `sangli` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Wildlife Call Management Dashboard` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `0.1.0` |

## How to Find Your Values

### Google Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Enable Google Sheets API
4. Create a Service Account:
   - Navigation Menu → Service Accounts
   - Create Service Account
   - Click on created account
   - Go to "Keys" tab
   - Add Key → Create new key → JSON
   - Download the JSON file

5. Open the JSON file and extract:
   - `type` → `GOOGLE_CREDENTIALS_TYPE`  
   - `project_id` → `GOOGLE_CREDENTIALS_PROJECT_ID`
   - `private_key_id` → `GOOGLE_CREDENTIALS_PRIVATE_KEY_ID`
   - `private_key` → `GOOGLE_CREDENTIALS_PRIVATE_KEY`
   - `client_email` → `GOOGLE_CREDENTIALS_CLIENT_EMAIL`
   - `client_id` → `GOOGLE_CREDENTIALS_CLIENT_ID`
   - `auth_uri` → `GOOGLE_CREDENTIALS_AUTH_URI`
   - `token_uri` → `GOOGLE_CREDENTIALS_TOKEN_URI`
   - `auth_provider_x509_cert_url` → `GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL`
   - `client_x509_cert_url` → `GOOGLE_CREDENTIALS_CLIENT_CERT_URL`

### Sheet IDs

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. Copy the `{SHEET_ID}` part
4. Set as `NEXT_PUBLIC_SHEET_ID_SANGLI` or `NEXT_PUBLIC_SHEET_ID_KOLHAPUR`

## Environment File Locations

- **Local Development**: `.env.local` (git-ignored)
- **Vercel Production**: Vercel Dashboard → Project Settings → Environment Variables
- **Example/Template**: `.env.example` (committed to git)

## Security Notes

⚠️ **Never commit these to git:**
- `.env.local` (automatically ignored)
- `GOOGLE_CREDENTIALS_PRIVATE_KEY` (never share this value)
- Any `.env*` files with actual secrets

✅ **Safe to commit:**
- `.env.example` (template with placeholder values)
- `.env.public` (client-side public variables only)

## Adding New Regions

To add a new region:

```bash
# 1. Add the sheet ID to .env.local
NEXT_PUBLIC_SHEET_ID_MYMUNICIPAL=your-sheet-id-here

# 2. Add to .env.example
NEXT_PUBLIC_SHEET_ID_MYMUNICIPAL=your-google-sheet-id-here
```

## Vercel Environment Variables Setup

1. Go to your Vercel project dashboard
2. Project Settings → Environment Variables
3. Add variables for each environment:
   - Production
   - Preview
   - Development (optional, but recommended)

4. Paste the values (Vercel will handle escaping of `\n` in private keys)
5. Redeploy after adding variables

## Testing Your Configuration

```typescript
// In your code
import { validateConfig } from '@/lib/config'

const { valid, errors } = validateConfig()
console.log(valid ? 'Config OK' : 'Config errors:', errors)
```

## Common Issues

### Private Key Won't Paste into Vercel

**Solution**: The newlines should be preserved. If using a tool, ensure it doesn't escape them. You can:
- Paste exactly as it appears in `.env.local`
- Vercel will handle the escaped newlines
- Or use the raw format with actual newlines (Vercel will escape them)

### Sheet ID Not Found

**Cause**: Copied wrong ID or not shared with service account

**Solution**:
1. Share the sheet with your service account email
2. Verify the sheet ID in the URL
3. Double-check for extra spaces

### "Permission denied" Error

**Cause**: Service account doesn't have access to sheet

**Solution**:
1. Open the Google Sheet
2. Click Share
3. Share with the service account email (from `GOOGLE_CREDENTIALS_CLIENT_EMAIL`)
4. Grant "Viewer" permission (minimum required)

## Questions?

Refer to [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md) for complete setup instructions.
