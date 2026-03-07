# Implementation Guide: Region Selection UI

This guide shows how to integrate the region selector into your dashboard UI.

## Overview

The region selector allows users to switch between Sangli and Kolhapur regions at runtime. The application will fetch data for the selected region from the appropriate Google Sheet.

## Quick Start

### 1. Basic Region Selection (Recommended for Now)

Add the region selector to your dashboard. Create a simple integration first:

```typescript
// src/app/page.tsx (example usage)

'use client'

import { useState } from 'react'
import type { Region } from '@/lib/config'
import { RegionSelector, RegionBadge } from '@/components/region-selector'
import { fetchIncidentData } from './actions'
import { IncidentData } from '@/types'

export default function Home() {
  const [region, setRegion] = useState<Region>('sangli')
  const [data, setData] = useState<IncidentData[]>([])
  const [loading, setLoading] = useState(false)

  const handleRegionChange = async (newRegion: Region) => {
    setRegion(newRegion)
    setLoading(true)
    try {
      const incidentData = await fetchIncidentData(newRegion)
      setData(incidentData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1>Wildlife Call Management Dashboard</h1>
          <RegionBadge region={region} />
        </div>
        <RegionSelector value={region} onChange={handleRegionChange} />
      </header>

      {loading && <div>Loading data for {region}...</div>}
      
      {/* Rest of your dashboard content */}
    </div>
  )
}
```

## Component Reference

### RegionSelector

Allows user to select between regions using button group.

```typescript
import { RegionSelector } from '@/components/region-selector'
import type { Region } from '@/lib/config'

function MyComponent() {
  const [region, setRegion] = useState<Region>('sangli')

  return (
    <RegionSelector 
      value={region} 
      onChange={setRegion}
      size="md"  // sm, md, or lg
    />
  )
}
```

**Props:**
- `value` (Region): Current selected region
- `onChange` (function): Called when region changes
- `size` (optional): Button size - 'sm' | 'md' | 'lg'

### RegionBadge

Displays the current region as a badge.

```typescript
import { RegionBadge } from '@/components/region-selector'
import type { Region } from '@/lib/config'

function MyComponent() {
  const region: Region = 'sangli'
  
  return <RegionBadge region={region} />
}
```

**Props:**
- `region` (Region): Region to display

## Hook Reference

### useRegion

Custom hook for managing region state.

```typescript
import { useRegion } from '@/hooks/use-region'

function MyComponent() {
  const { region, switchRegion, getRegionLabel, regions } = useRegion()

  return (
    <div>
      <p>Current: {getRegionLabel(region)}</p>
      {regions.map(r => (
        <button key={r} onClick={() => switchRegion(r)}>
          {getRegionLabel(r)}
        </button>
      ))}
    </div>
  )
}
```

**Returns:**
- `region`: Current region
- `switchRegion(region)`: Function to change region
- `getRegionLabel(region)`: Get display label for region
- `regions`: Array of available regions

## Updated fetchIncidentData Signature

The `fetchIncidentData()` function now accepts a region parameter:

```typescript
import { fetchIncidentData } from './actions'

// Default region (from .env default)
const data = await fetchIncidentData()

// Specific region
const sankli_data = await fetchIncidentData('sangli')
const kolhapur_data = await fetchIncidentData('kolhapur')
```

## Configuration Helper Functions

### getSheetId()

Get the Google Sheet ID for a region:

```typescript
import { getSheetId } from '@/lib/config'

const sangliSheetId = getSheetId('sangli')
const kolhapurSheetId = getSheetId('kolhapur')
```

### getAppConfig()

Get app configuration including default region:

```typescript
import { getAppConfig } from '@/lib/config'

const config = getAppConfig()
console.log(config.defaultRegion)  // 'sangli' or 'kolhapur'
console.log(config.sheetIds)       // { sangli: '...', kolhapur: '...' }
```

### validateConfig()

Check if all required configuration is set:

```typescript
import { validateConfig } from '@/lib/config'

const { valid, errors } = validateConfig()
if (!valid) {
  console.error('Configuration errors:', errors)
  // Handle error - missing env variables
}
```

## Integration Examples

### Example 1: Simple Region Toggle

```typescript
'use client'

import { useState } from 'react'
import { RegionSelector } from '@/components/region-selector'
import { fetchIncidentData } from './actions'
import type { Region } from '@/lib/config'
import type { IncidentData } from '@/types'

export function DashboardHeader() {
  const [region, setRegion] = useState<Region>('sangli')
  const [data, setData] = useState<IncidentData[]>([])

  const handleRegionChange = async (newRegion: Region) => {
    setRegion(newRegion)
    const newData = await fetchIncidentData(newRegion)
    setData(newData)
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <RegionSelector value={region} onChange={handleRegionChange} />
      <p>Showing {data.length} records for {region}</p>
    </div>
  )
}
```

### Example 2: Region Hook with Persistence

```typescript
'use client'

import { useRegion } from '@/hooks/use-region'

export function RegionalChart() {
  const { region, switchRegion, getRegionLabel } = useRegion()

  return (
    <div>
      <button onClick={() => switchRegion('sangli')}>
        Sangli
      </button>
      <button onClick={() => switchRegion('kolhapur')}>
        Kolhapur
      </button>
      <p>Showing data for {getRegionLabel(region)}</p>
    </div>
  )
}
```

### Example 3: Using in Existing Charts

If you have chart components that fetch their own data:

```typescript
// charts/incident-frequency-chart.tsx

'use client'

import { useEffect, useState } from 'react'
import { fetchIncidentData } from '@/app/actions'
import type { Region } from '@/lib/config'

interface ChartProps {
  region: Region
}

export function IncidentFrequencyChart({ region }: ChartProps) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchIncidentData(region).then(setData)
  }, [region])

  return (
    <div>
      {/* Your chart code */}
    </div>
  )
}
```

## Migration Checklist

For integrating region selection into your main dashboard:

- [ ] Add state for region selection in main page component
- [ ] Import RegionSelector component
- [ ] Place RegionSelector in header/toolbar
- [ ] Update fetchIncidentData call to pass region parameter
- [ ] Add RegionBadge to show current region
- [ ] Test region switching locally
- [ ] Verify data changes when region changes
- [ ] Test in production (Vercel)

## Step-by-Step Integration (Main Page)

If you want to add region selection to your existing `src/app/page.tsx`:

1. **Add state for region**:
```typescript
const [region, setRegion] = useState<Region>('sangli')
```

2. **Update loadData function**:
```typescript
const loadData = async () => {
  setLoading(true)
  setError(null)
  try {
    const incidentData = await fetchIncidentData(region)  // ← Add region
    // ... rest of code
  }
}
```

3. **Add dependency to useEffect**:
```typescript
useEffect(() => {
  loadData()
}, [region])  // ← Add region as dependency
```

4. **Add RegionSelector to JSX**:
```typescript
<RegionSelector 
  value={region} 
  onChange={setRegion}
/>
```

## Common Patterns

### Pattern 1: Region Selector in Sidebar

```typescript
// In your sidebar/layout component
<div className="p-4 border-b">
  <RegionSelector value={region} onChange={setRegion} size="sm" />
</div>
```

### Pattern 2: Region in Header

```typescript
// In your header/navbar component
<header className="flex justify-between items-center">
  <h1>Dashboard</h1>
  <div className="flex gap-4 items-center">
    <RegionBadge region={region} />
    <RegionSelector value={region} onChange={setRegion} />
  </div>
</header>
```

### Pattern 3: Multiple Regions Comparison (Future Enhancement)

```typescript
// For comparing regions side-by-side
const [selectedRegions, setSelectedRegions] = useState<Region[]>(['sangli'])

// Fetch data for all selected regions
const allData = await Promise.all(
  selectedRegions.map(r => fetchIncidentData(r))
)
```

## Troubleshooting

### Region selector not updating data

**Check:**
1. Is `fetchIncidentData()` being called with the region parameter?
2. Is the region state being updated correctly?
3. Are you properly handling the async data fetch?

### Environment variables not working

**Check:**
1. Is `.env.local` properly filled out?
2. Did you restart `npm run dev` after updating `.env.local`?
3. Are all required variables set? Run `validateConfig()`

### Wrong sheet ID being used

**Check:**
1. Verify `NEXT_PUBLIC_SHEET_ID_SANGLI` and `NEXT_PUBLIC_SHEET_ID_KOLHAPUR` in `.env.local`
2. Make sure the service account has access to both sheets
3. Check that the sheet IDs in the environment match the actual Google Sheet URLs

## Next Steps

After completing the integration:

1. ✅ Test region switching in local dev
2. ✅ Push to GitHub
3. ✅ Deploy to Vercel
4. ✅ Test in production environment
5. 📋 Plan UI improvements (as planned later)

## Questions?

Refer to:
- [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md) - For deployment issues
- [ENV-VARIABLES-REFERENCE.md](./ENV-VARIABLES-REFERENCE.md) - For environment variable details
- [src/lib/config.ts](./src/lib/config.ts) - For configuration utilities
