# Environment Configuration Migration Guide

## What Has Changed

Previously, the application used:
- ❌ `credentials.json` (file-based)
- ❌ `sheetid.txt`, `sheetid-sangli.txt`, `sheetid-kolhapur.txt` (file-based)

Now, the application uses:
- ✅ Environment variables in `.env.local` (development) and Vercel dashboard (production)
- ✅ Configuration management from `src/lib/config.ts`
- ✅ Region-based sheet ID selection
- ✅ Easy multi-region support

## Quick Start

### 1. For Local Development

```bash
# Copy the example environment file
cp .env.example .env.local

# Fill in your actual Google credentials
# Edit .env.local with your Google Service Account details
```

See [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md#local-development-setup) for detailed instructions.

### 2. For Vercel Deployment

Follow the step-by-step guide in [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md#vercel-deployment)

## Key Features

### 1. Region-Based Sheet Selection

The `fetchIncidentData()` function now accepts a region parameter:

```typescript
// Before
const data = await fetchIncidentData()

// After
const data = await fetchIncidentData('sangli')  // or 'kolhapur'
```

### 2. Configuration Management

Access configuration from `src/lib/config.ts`:

```typescript
import { getAppConfig, getSheetId, Region } from '@/lib/config'

// Get app configuration
const config = getAppConfig()
console.log(config.defaultRegion)  // 'sangli' or 'kolhapur'

// Get sheet ID for a region
const sheetId = getSheetId('sangli')
```

### 3. Region Selector Component

Use the region selector in your UI:

```typescript
import { useState } from 'react'
import { RegionSelector, RegionBadge } from '@/components/region-selector'
import type { Region } from '@/lib/config'

export function MyComponent() {
  const [region, setRegion] = useState<Region>('sangli')

  return (
    <div>
      <RegionSelector value={region} onChange={setRegion} />
      <RegionBadge region={region} />
    </div>
  )
}
```

### 4. Use Region Hook

Manage region state with the custom hook:

```typescript
import { useRegion } from '@/hooks/use-region'

export function MyComponent() {
  const { region, switchRegion, getRegionLabel, regions } = useRegion()

  return (
    <div>
      <p>Current region: {getRegionLabel(region)}</p>
      {regions.map(r => (
        <button key={r} onClick={() => switchRegion(r)}>
          Switch to {r}
        </button>
      ))}
    </div>
  )
}
```

## Files Changed/Created

### Created Files
- ✨ `.env.example` - Template for environment variables
- ✨ `.env.local` - Local development environment (gitignored)
- ✨ `src/lib/config.ts` - Configuration management utilities
- ✨ `src/hooks/use-region.ts` - Region management hook
- ✨ `src/components/region-selector.tsx` - Region selector UI component
- ✨ `VERCEL-DEPLOYMENT.md` - Complete Vercel deployment guide

### Modified Files
- 🔧 `src/app/actions.ts` - Updated to use environment variables and region parameter
- 🔧 `.gitignore` - Updated to properly exclude sensitive files
- 🔧 `src/app/page.tsx` - Will need region selector integration

### Files to Keep (for backwards compatibility)
- ℹ️ `credentials.json.example` - Keep as reference
- ℹ️ `sheetid.txt.example` - Keep as reference
- ℹ️ `sheetid-sangli.txt` - Keep as reference (sheet IDs are also in .env)
- ℹ️ `sheetid-kolhapur.txt` - Keep as reference (sheet IDs are also in .env)

## Migration Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in Google Service Account credentials in `.env.local`
- [ ] Verify credentials work: `npm run dev`
- [ ] Test fetching data for both regions (if implementing UI selector)
- [ ] Push changes to GitHub (ensure `.env.local` is not committed)
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy to Vercel and test
- [ ] Verify data loads correctly in production

## Advantages of This Setup

1. **Single Codebase for Multiple Regions**
   - No need to maintain separate repositories for each region
   - Easy to add new regions by adding more `NEXT_PUBLIC_SHEET_ID_*` variables

2. **Better Security**
   - Credentials never committed to git
   - Environment variables encrypted in Vercel
   - Clear separation of secrets from code

3. **Easier Deployment**
   - One repository for all regions
   - Can deploy to Vercel with environment-based configuration
   - Easy to support multiple deployments (one per region, all from same code)

4. **Better Development Experience**
   - No file I/O required for configuration
   - Type-safe configuration access
   - Easy to test with different regions

5. **Scalability**
   - Can easily add more regions
   - Can support different credentials per region if needed
   - Ready for future enhancements (API keys, API endpoints, etc.)

## Troubleshooting

### Error: "GOOGLE_CREDENTIALS_PRIVATE_KEY is not set"

**Cause**: Environment variable not configured

**Solution**:
1. For local: Make sure `.env.local` has the correct value
2. For Vercel: Add the variable to project settings
3. Run `npm run dev` again after updating `.env.local`

### Error: "Sheet ID for region is not configured"

**Cause**: Sheet ID environment variable not set

**Solution**:
1. Check `.env.local` has both `NEXT_PUBLIC_SHEET_ID_SANGLI` and `NEXT_PUBLIC_SHEET_ID_KOLHAPUR`
2. Verify the IDs are not empty strings
3. Check in Vercel that all sheet ID variables are set

### Changes Not Taking Effect Locally

**Solution**:
1. Restart the dev server: `npm run dev`
2. Check that `.env.local` has `NEXT_PUBLIC_` prefix for public variables
3. Verify no stale environment in terminal (close and reopen if on Windows)

## Configuration Validation

To check if your configuration is valid:

```typescript
import { validateConfig } from '@/lib/config'

const { valid, errors } = validateConfig()
if (!valid) {
  console.error('Configuration errors:', errors)
}
```

This is useful to add at application startup for better error reporting.

## Next Steps

1. ✅ You've set up environment-based configuration
2. 📋 Next: Integrate RegionSelector into the main dashboard UI
3. 🎨 Then: Update UI (as planned later)
4. 🚀 Finally: Monitor and maintain the Vercel deployments

## Support

For detailed Vercel deployment steps, see [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)

For configuration options, see [src/lib/config.ts](./src/lib/config.ts)
