/**
 * Region Selector Component
 * Allows users to switch between Sangli and Kolhapur regions
 */

'use client'

import React from 'react'
import type { Region } from '@/lib/config'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

interface RegionSelectorProps {
  value: Region
  onChange: (region: Region) => void
  size?: 'sm' | 'md' | 'lg'
}

const REGIONS: { value: Region; label: string; shortLabel: string }[] = [
  { value: 'sangli', label: 'Sangli', shortLabel: 'SG' },
  { value: 'kolhapur', label: 'Kolhapur', shortLabel: 'KH' },
]

/**
 * Main Region Selector Component
 * Button group variant for region selection
 */
export const RegionSelector: React.FC<RegionSelectorProps> = ({
  value,
  onChange,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <div className="flex gap-2">
      {REGIONS.map((region) => (
        <Button
          key={region.value}
          onClick={() => onChange(region.value)}
          variant={value === region.value ? 'default' : 'outline'}
          size="sm"
          className={sizeClasses[size]}
        >
          <MapPin className="w-4 h-4 mr-1" />
          {region.label}
        </Button>
      ))}
    </div>
  )
}

/**
 * Region Display Badge
 * Shows currently selected region
 */
export const RegionBadge: React.FC<{ region: Region }> = ({ region }) => {
  const label = REGIONS.find((r) => r.value === region)?.label || region

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100">
      <MapPin className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
