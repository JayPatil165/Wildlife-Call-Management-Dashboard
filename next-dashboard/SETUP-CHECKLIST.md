# Implementation Checklist

Use this checklist to implement the new environment configuration system step-by-step.

## Phase 1: Local Development Setup ✅ (5-10 minutes)

### Get Google Service Account Credentials
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Create a new project or select existing one
- [ ] Enable Google Sheets API
- [ ] Go to Service Accounts (left sidebar)
- [ ] Click "Create Service Account"
- [ ] Fill in details and click "Create and Continue"
- [ ] Skip the optional steps, finish creation
- [ ] Click on the created service account
- [ ] Go to "Keys" tab
- [ ] Click "Add Key" → "Create new key"
- [ ] Choose "JSON" format
- [ ] Download and open the JSON file

### Update .env.local
- [ ] Open `.next-dashboard/.env.local`
- [ ] From the JSON file, copy each value:
  - `type` → `GOOGLE_CREDENTIALS_TYPE`
  - `project_id` → `GOOGLE_CREDENTIALS_PROJECT_ID`
  - `private_key_id` → `GOOGLE_CREDENTIALS_PRIVATE_KEY_ID`
  - `private_key` → `GOOGLE_CREDENTIALS_PRIVATE_KEY` (keep the quotes and \n)
  - `client_email` → `GOOGLE_CREDENTIALS_CLIENT_EMAIL`
  - `client_id` → `GOOGLE_CREDENTIALS_CLIENT_ID`
  - `auth_uri` → `GOOGLE_CREDENTIALS_AUTH_URI`
  - `token_uri` → `GOOGLE_CREDENTIALS_TOKEN_URI`
  - `auth_provider_x509_cert_url` → `GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL`
  - `client_x509_cert_url` → `GOOGLE_CREDENTIALS_CLIENT_CERT_URL`
- [ ] Verify all NEXT_PUBLIC_SHEET_ID_* are filled (they should already be)
- [ ] Save the file

### Test Locally
- [ ] Open terminal in `next-dashboard` folder
- [ ] Run `npm run dev`
- [ ] Wait for "Local: http://localhost:3000"
- [ ] Open browser to http://localhost:3000
- [ ] Check that data loads (no error messages)
- [ ] If errors, check [VERCEL-DEPLOYMENT.md Troubleshooting](./VERCEL-DEPLOYMENT.md#troubleshooting)

## Phase 2: Share Google Sheets Access ✅ (2 minutes per sheet)

### For Each Google Sheet (Sangli and Kolhapur)
- [ ] Open the Sangli Google Sheet
- [ ] Click "Share" button (top right)
- [ ] Paste the service account email from your JSON: `client_email` value
- [ ] Select "Viewer" permission
- [ ] Uncheck "Notify people"
- [ ] Click "Share"
- [ ] Repeat for Kolhapur sheet

- [ ] Back to browser, verify data still loads
- [ ] Test if you can see both region sheets loading (when implementing UI)

## Phase 3: Add Region Selector to UI ⏳ (10-15 minutes)

⏳ **Optional for now** - Do this before deploying if you want region switching

### Update Main Page Component
- [ ] Open `src/app/page.tsx`
- [ ] Add import:
```typescript
import { RegionSelector, RegionBadge } from '@/components/region-selector'
import type { Region } from '@/lib/config'
```

- [ ] Add region state near top of component:
```typescript
const [region, setRegion] = useState<Region>('sangli')
```

- [ ] Update the loadData function to accept and pass region:
```typescript
const loadData = async (selectedRegion: Region = region) => {
  setLoading(true)
  setError(null)
  try {
    const incidentData = await fetchIncidentData(selectedRegion)
    // ... rest of existing code
  }
}
```

- [ ] Add useEffect to reload when region changes:
```typescript
useEffect(() => {
  loadData(region)
}, [region])
```

- [ ] Add RegionSelector to your JSX header (around line with other controls):
```typescript
<RegionSelector value={region} onChange={setRegion} />
<RegionBadge region={region} />
```

### Test Region Switching
- [ ] Dev server should auto-reload
- [ ] Verify you see region selector buttons
- [ ] Click between Sangli and Kolhapur
- [ ] Verify data changes when region changes
- [ ] Check browser console for errors

## Phase 4: Prepare for Vercel ✅ (2 minutes)

### Commit to Git
- [ ] Open terminal in project root (NOT next-dashboard folder)
- [ ] Run `git status`
- [ ] Verify you do NOT see `.env.local` in the list
  - ✅ Good if absent (it's in .gitignore)
  - ❌ Bad if listed (remove it from git)
- [ ] Run `git add -A`
- [ ] Run `git commit -m "Add environment configuration for multi-region support"`
- [ ] Run `git push origin main` (or your current branch)

### Verify No Secrets in Git
- [ ] Visit your GitHub repository
- [ ] Check the `next-dashboard` folder
- [ ] Verify you do NOT see:
  - `credentials.json` with actual values
  - `.env.local`
  - `sheetid...txt` files with IDs
- [ ] If any secrets are visible, contact GitHub about secret scanning

## Phase 5: Deploy to Vercel ✅ (15 minutes)

### Create Vercel Project
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "New Project"
- [ ] Click "Continue with GitHub"
- [ ] Find your repository
- [ ] Click "Import"

### Configure Environment Variables
When Vercel shows "Environment Variables" step:

- [ ] Click "Add Environment Variable"
- [ ] For each variable below, add it to ALL environments:

**Google Credentials (copy from your .env.local):**
- [ ] `GOOGLE_CREDENTIALS_TYPE` = `service_account`
- [ ] `GOOGLE_CREDENTIALS_PROJECT_ID` = your project ID
- [ ] `GOOGLE_CREDENTIALS_PRIVATE_KEY_ID` = your key ID
- [ ] `GOOGLE_CREDENTIALS_PRIVATE_KEY` = **[IMPORTANT]** paste the full private key as-is (with newlines):
  ```
  -----BEGIN PRIVATE KEY-----
  actual_key_content_here
  -----END PRIVATE KEY-----
  ```
- [ ] `GOOGLE_CREDENTIALS_CLIENT_EMAIL` = service account email
- [ ] `GOOGLE_CREDENTIALS_CLIENT_ID` = client ID
- [ ] `GOOGLE_CREDENTIALS_AUTH_URI` = `https://accounts.google.com/o/oauth2/auth`
- [ ] `GOOGLE_CREDENTIALS_TOKEN_URI` = `https://oauth2.googleapis.com/token`
- [ ] `GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL` = `https://www.googleapis.com/oauth2/v1/certs`
- [ ] `GOOGLE_CREDENTIALS_CLIENT_CERT_URL` = your cert URL

**Sheet IDs:**
- [ ] `NEXT_PUBLIC_SHEET_ID_SANGLI` = `1eey_a4t5EOL_nyEDau4FLvXomcnwgxWa5F3Rjd52OQg`
- [ ] `NEXT_PUBLIC_SHEET_ID_KOLHAPUR` = `1i4Bp2AgJ7hPCJ6Zr6BL-hq6Puo85lgnGDHg9r6BozBo`

**App Settings:**
- [ ] `NEXT_PUBLIC_DEFAULT_REGION` = `sangli`
- [ ] `NEXT_PUBLIC_APP_NAME` = `Wildlife Call Management Dashboard`
- [ ] `NEXT_PUBLIC_APP_VERSION` = `0.1.0`

### Deploy
- [ ] After adding variables, click "Deploy"
- [ ] Wait for build to complete (3-5 minutes)
- [ ] Once deployment succeeds, click "Visit"
- [ ] Verify data loads correctly in production

### Test Production Deployment
- [ ] In production URL, verify data is visible
- [ ] If region selector added, test switching regions
- [ ] If errors, check Vercel logs in dashboard

## Phase 6: Verify Both Environments ✅ (5 minutes)

### Local Development
- [ ] Run `npm run dev` in next-dashboard folder
- [ ] Access http://localhost:3000
- [ ] Verify data loads
- [ ] If region selector added, test switching regions
- [ ] Check browser console for errors

### Production
- [ ] Visit your Vercel deployment URL
- [ ] Verify it's the same as local behavior
- [ ] If region selector added, test switching regions

## Phase 7: Optional - Set Up Multiple Deployments ⏳

If you want separate Vercel deployments per region:

- [ ] Create new Vercel project for Kolhapur version
- [ ] Set `NEXT_PUBLIC_DEFAULT_REGION=kolhapur` only in that project
- [ ] All other variables same as Sangli deployment
- [ ] Deploy both independently

This gives you:
- Sangli version: yourproject-sangli.vercel.app
- Kolhapur version: yourproject-kolhapur.vercel.app

## ✅ Completion Checklist

- [ ] `.env.local` filled with Google credentials
- [ ] Both Google Sheets shared with service account
- [ ] Local dev works: `npm run dev` loads data
- [ ] Code committed to GitHub
- [ ] No secrets visible in GitHub repo
- [ ] Vercel project created
- [ ] All environment variables added in Vercel
- [ ] Deployment successful
- [ ] Production URL loads data correctly
- [ ] (Optional) Region selector added to UI
- [ ] (Optional) Region switching tested

## 🎉 You're Done!

Your Wildlife Call Management Dashboard now:
✅ Has environment-based configuration  
✅ Supports multiple regions (Sangli & Kolhapur)  
✅ Works locally with npm run dev  
✅ Deploys to Vercel  
✅ Has no credentials in git  
✅ Is ready for scaling  

**Next Steps:**
- Monitor your Vercel deployment
- Consider adding the region selector to main UI (if not done)
- Plan UI improvements for later
- Add more regions if needed

---

**Need Help?**
- Local setup: See [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md#local-development-setup)
- Vercel issues: See [VERCEL-DEPLOYMENT.md#troubleshooting](./VERCEL-DEPLOYMENT.md#troubleshooting)
- UI integration: See [REGION-SELECTOR-INTEGRATION.md](./REGION-SELECTOR-INTEGRATION.md)
- Environment variables: See [ENV-VARIABLES-REFERENCE.md](./ENV-VARIABLES-REFERENCE.md)

**Questions about environment variables?**
→ Check if your value is in [ENV-VARIABLES-REFERENCE.md](./ENV-VARIABLES-REFERENCE.md)
