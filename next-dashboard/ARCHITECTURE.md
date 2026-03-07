# Architecture & File Organization Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                     │
│                  (Single Codebase, Multi-Region)            │
└──────────────────────────┬──────────────────────────────────┘
                           │
           ┌───────────────┴───────────────┐
           │                               │
    ┌──────▼──────┐              ┌────────▼─────┐
    │   Local Dev │              │  Vercel Prod │
    │  (.env.local)              │  (Dashboard) │
    └──────────────┘             └──────────────┘
           │                           │
    ┌──────▼──────────────────────────▼──────┐
    │   Configuration System                 │
    │   (src/lib/config.ts)                  │
    │                                        │
    │  - getGoogleCredentials()              │
    │  - getSheetId(region)                  │
    │  - getAppConfig()                      │
    │  - validateConfig()                    │
    └──────────────────┬─────────────────────┘
                       │
      ┌────────────────┴────────────────┐
      │                                 │
   ┌──▼──────┐                    ┌────▼──────┐
   │ Sangli  │                    │ Kolhapur  │
   │ Region  │                    │ Region    │
   └─────────┘                    └───────────┘
      │                                 │
   ┌──▼──────────────────────────────▼──┐
   │   Google Sheets API                │
   │   (googleapis library)              │
   │                                    │
   │   Route: Form_responses_1!A:Z      │
   └────────────────────────────────────┘
      │                   │
   ┌──▼──────┐      ┌────▼──────┐
   │ Sangli  │      │ Kolhapur  │
   │ Sheet   │      │ Sheet     │
   └─────────┘      └───────────┘
```

## File Organization

```
next-dashboard/
├── 📄 .env.example              # Template (committed to git)
├── 📄 .env.local                # Actual values (git-ignored) ⚠️ SECRET
├── 📄 .gitignore                # Updated to exclude secrets
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── actions.ts           # ✏️ Updated - uses env vars, accepts region
│   │   ├── page.tsx             # 📋 TODO - add region selector
│   │   └── ...
│   │
│   ├── 📁 components/
│   │   ├── region-selector.tsx  # ✨ NEW - UI component for region selection
│   │   └── ...
│   │
│   ├── 📁 hooks/
│   │   ├── use-region.ts        # ✨ NEW - region state management
│   │   └── ...
│   │
│   ├── 📁 lib/
│   │   ├── config.ts            # ✨ NEW - configuration utilities
│   │   └── ...
│   │
│   └── 📁 types/
│       └── ...
│
├── 📁 Contacts/
├── 📁 public/
├── 📁 scripts/
│
├── 📖 SETUP-SUMMARY.md          # ✨ NEW - Overview of everything
├── 📖 SETUP-CHECKLIST.md        # ✨ NEW - Step-by-step checklist
├── 📖 VERCEL-DEPLOYMENT.md      # ✨ NEW - Complete Vercel guide
├── 📖 ENVIRONMENT-SETUP.md      # ✨ NEW - Configuration migration
├── 📖 ENV-VARIABLES-REFERENCE.md # ✨ NEW - All variables documented
├── 📖 REGION-SELECTOR-INTEGRATION.md # ✨ NEW - UI integration guide
│
└── package.json, tsconfig.json, etc.
```

## Data Flow

### Local Development Flow
```
1. npm run dev
   ↓
2. Next.js loads .env.local
   ↓
3. User loads http://localhost:3000
   ↓
4. page.tsx mounted
   ↓
5. fetchIncidentData('sangli') called (server action)
   ↓
6. config.ts loads credentials from GOOGLE_CREDENTIALS_*
   ↓
7. config.ts loads sheet ID from NEXT_PUBLIC_SHEET_ID_SANGLI
   ↓
8. Google Sheets API called with auth + sheet ID
   ↓
9. Data fetched and returned to page
   ↓
10. UI renders with incident data
```

### Vercel Production Flow
```
1. GitHub commit → push to main
   ↓
2. Vercel webhook triggered
   ↓
3. Vercel builds Next.js app
   ↓
4. Vercel injects environment variables from dashboard
   ↓
5. App deployed to Vercel edge
   ↓
6. User loads https://your-project.vercel.app
   ↓
7-10. [Same as local flow - uses env vars from Vercel dashboard]
```

### Region Selection Flow (After UI Integration)
```
User clicks "Kolhapur" button
   ↓
setRegion('kolhapur')
   ↓
useEffect triggered (region dependency)
   ↓
loadData('kolhapur') called
   ↓
fetchIncidentData('kolhapur') called
   ↓
config.ts gets NEXT_PUBLIC_SHEET_ID_KOLHAPUR
   ↓
Google Sheets API queries Kolhapur sheet
   ↓
Data fetched for Kolhapur
   ↓
UI updates to show Kolhapur data
```

## Configuration Priority

```
┌─────────────────────────────────────┐
│  Most Specific (Local Override)     │
├─────────────────────────────────────┤
│  .env.local (development)           │
├─────────────────────────────────────┤
│  .env.production (future)           │
├─────────────────────────────────────┤
│  Vercel Dashboard (production)      │
├─────────────────────────────────────┤
│  Hardcoded Defaults (fallback)      │
├─────────────────────────────────────┤
│  Least Specific (Defaults)          │
└─────────────────────────────────────┘
```

## Type Safety

```typescript
// ✅ Type-safe region handling
type Region = 'sangli' | 'kolhapur'

// ✅ Type-safe config objects
interface AppConfig {
  defaultRegion: Region
  sheetIds: Record<Region, string>
  appName: string
  appVersion: string
}

interface GoogleCredentials {
  type: string
  project_id: string
  private_key: string
  // ... other fields
}

// ✅ Type-safe functions
export function getSheetId(region: Region): string
export function getGoogleCredentials(): GoogleCredentials
export function getAppConfig(): AppConfig
```

## Environment Variable Categories

```
Credentials (Server-side only - HIDDEN from browser)
├── GOOGLE_CREDENTIALS_TYPE
├── GOOGLE_CREDENTIALS_PROJECT_ID
├── GOOGLE_CREDENTIALS_PRIVATE_KEY_ID
├── GOOGLE_CREDENTIALS_PRIVATE_KEY ⚠️ SENSITIVE
├── GOOGLE_CREDENTIALS_CLIENT_EMAIL
├── GOOGLE_CREDENTIALS_CLIENT_ID
├── GOOGLE_CREDENTIALS_AUTH_URI
├── GOOGLE_CREDENTIALS_TOKEN_URI
├── GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL
└── GOOGLE_CREDENTIALS_CLIENT_CERT_URL

Public Configuration (Client-side - VISIBLE to browser)
├── NEXT_PUBLIC_SHEET_ID_SANGLI
├── NEXT_PUBLIC_SHEET_ID_KOLHAPUR
├── NEXT_PUBLIC_DEFAULT_REGION
├── NEXT_PUBLIC_APP_NAME
└── NEXT_PUBLIC_APP_VERSION
```

## Security Model

```
┌──────────────────────────────────────────────┐
│  Development Machine                        │
├──────────────────────────────────────────────┤
│  .env.local (git-ignored) ← Only place with │
│                              actual secrets  │
│  ✅ Never shared                             │
│  ✅ Never committed                          │
│  ✅ Local use only                           │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  GitHub Repository                          │
├──────────────────────────────────────────────┤
│  .env.example (template) ← Placeholder only  │
│  ✅ Safe to commit                           │
│  ✅ Visible to all                           │
│  ✅ Used as template                         │
│                                             │
│  Code (no secrets)                          │
│  ✅ Safe to commit                           │
│  ✅ No credentials                           │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  Vercel Dashboard                           │
├──────────────────────────────────────────────┤
│  Environment Variables (encrypted) ← Secrets │
│  ✅ Encrypted by Vercel                      │
│  ✅ Not visible in logs                      │
│  ✅ Only accessible to app at runtime        │
│  ✅ Separate for prod/preview/dev            │
└──────────────────────────────────────────────┘
```

## Integration Paths

### Path A: Minimal Setup (Current)
```
No UI changes needed now
✓ Configuration system ready
✓ Multi-region support in code
✓ Can deploy to Vercel
- Region switching in UI not yet visible
```

### Path B: Full Integration (Recommended Soon)
```
Add RegionSelector to UI
✓ Configuration system ready
✓ Multi-region support in code
✓ UI component created
✓ Region switching works in UI
✓ Deploy to Vercel with full functionality
```

### Path C: Advanced (Optional, Future)
```
Multiple Vercel deployments per region
✓ All of Path B
✓ Separate Vercel projects per region
✓ Region-specific URLs
✓ Region-specific configurations
```

## Documentation Map

```
New to everything?
→ Start with SETUP-SUMMARY.md

Ready to implement?
→ Use SETUP-CHECKLIST.md (step-by-step)

Need deployment help?
→ Follow VERCEL-DEPLOYMENT.md

Adding region selector to UI?
→ See REGION-SELECTOR-INTEGRATION.md

What's a specific env variable?
→ Check ENV-VARIABLES-REFERENCE.md

Understanding the changes?
→ Read ENVIRONMENT-SETUP.md

Want the technical overview?
→ You're reading it! (This file)
```

## Making Changes Later

### Adding a New Region (e.g., 'Mumbai')
1. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SHEET_ID_MUMBAI=your-sheet-id
   ```
2. Add to `.env.example`:
   ```
   NEXT_PUBLIC_SHEET_ID_MUMBAI=your-google-sheet-id-here
   ```
3. Add to Vercel environment variables
4. Update Region type in `src/lib/config.ts` (add TypeScript type)
5. Done! ✅

### Changing Credentials
1. Update `.env.local` with new credentials
2. Update same variables in Vercel dashboard
3. Test locally, then deploy
4. ✅ Both dev and production updated

### Rotating Keys
1. Create new service account key in Google Cloud
2. Download new JSON
3. Update `.env.local`
4. Update Vercel environment variables
5. Deploy
6. Delete old key in Google Cloud
7. ✅ Old key invalidated, new key active

## Performance Characteristics

```
Data Fetching:
├─ First load: ~2-3 seconds (cold start)
├─ Region switch: ~1-2 seconds (API call)
├─ Cached data: ~100ms (if implemented)
└─ Vercel edge: <500ms (global CDN)

Configuration:
├─ Load time: <1ms (environment vars)
├─ Validation: <5ms (config check)
└─ Memory: ~1KB per region
```

## Monitoring & Debugging

### Local Development
```
npm run dev
→ Check terminal output for errors
→ Open DevTools (F12) for client-side issues
→ Check "Network" tab for API calls
```

### Vercel Production
```
Vercel Dashboard → Deployments → Functions/Logs
→ Check build logs for errors
→ Check runtime logs for API issues
→ Check "Analytics" for performance

GitHub → Actions (if set up)
→ Check workflow logs
```

## Troubleshooting Decision Tree

```
Problem: App not loading
├─ Local? Check .env.local is filled
├─ Vercel? Check env vars in dashboard
└─ Both? Check Google Sheets access

Problem: Wrong data showing
├─ Check region selected
├─ Verify sheet IDs in .env
└─ Confirm service account access

Problem: Auth error
├─ Check GOOGLE_CREDENTIALS_PRIVATE_KEY format
├─ Verify all GOOGLE_CREDENTIALS_* set
└─ Test with validateConfig()
```

---

This architecture supports:
✅ Single codebase for multiple regions  
✅ Local development and Vercel production  
✅ Type-safe configuration  
✅ No credentials in git  
✅ Easy scaling and maintenance  
✅ Future enhancements ready
