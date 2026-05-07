/**
 * Hook for managing region selection and related data
 * Allows switching between Sangli and Kolhapur regions
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Region } from '@/lib/config'

export function useRegion() {
  const defaultRegion: Region = (process.env.NEXT_PUBLIC_DEFAULT_REGION as Region) || 'sangli'
  const [region, setRegion] = useState<Region>(defaultRegion)

  const switchRegion = useCallback((newRegion: Region) => {
    setRegion(newRegion)
    // Optional: Save to localStorage for persistence across sessions
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-region', newRegion)
    }
  }, [])

  const getRegionLabel = useCallback((r: Region): string => {
    const labels: Record<Region, string> = {
      sangli: 'Sangli',
      kolhapur: 'Kolhapur',
    }
    return labels[r]
  }, [])

  return {
    region,
    switchRegion,
    getRegionLabel,
    regions: ['sangli', 'kolhapur'] as const,
  }
}

/**
 * Hook to load saved region preference from localStorage
 */
export function useRegionPersistence() {
  const [region, setRegion] = useState<Region | null>(null)

  // Load saved region on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selected-region') as Region | null
      if (saved && (saved === 'sangli' || saved === 'kolhapur')) {
        setRegion(saved)
      }
    }
  }, [])

  const saveRegion = useCallback((newRegion: Region) => {
    setRegion(newRegion)
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-region', newRegion)
    }
  }, [])

  return {
    region,
    saveRegion,
  }
}
