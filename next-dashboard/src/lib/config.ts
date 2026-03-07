/**
 * Configuration management for the Wildlife Dashboard
 * Handles environment variables and region-based configuration
 */

export type Region = 'sangli' | 'kolhapur'

export interface AppConfig {
  defaultRegion: Region
  sheetIds: Record<Region, string>
  appName: string
  appVersion: string
}

export interface GoogleCredentials {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
}

/**
 * Load Google Credentials from environment variables
 * This is used server-side for Google Sheets API authentication
 */
export function getGoogleCredentials(): GoogleCredentials {
  const privateKey = process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY
  if (!privateKey) {
    throw new Error('GOOGLE_CREDENTIALS_PRIVATE_KEY environment variable is not set')
  }

  return {
    type: process.env.GOOGLE_CREDENTIALS_TYPE || 'service_account',
    project_id: process.env.GOOGLE_CREDENTIALS_PROJECT_ID || '',
    private_key_id: process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY_ID || '',
    private_key: privateKey.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CREDENTIALS_CLIENT_EMAIL || '',
    client_id: process.env.GOOGLE_CREDENTIALS_CLIENT_ID || '',
    auth_uri: process.env.GOOGLE_CREDENTIALS_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
    token_uri: process.env.GOOGLE_CREDENTIALS_TOKEN_URI || 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: process.env.GOOGLE_CREDENTIALS_AUTH_PROVIDER_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.GOOGLE_CREDENTIALS_CLIENT_CERT_URL || '',
  }
}

/**
 * Get the sheet ID for a specific region
 */
export function getSheetId(region: Region): string {
  const sheetIds: Record<Region, string> = {
    sangli: process.env.NEXT_PUBLIC_SHEET_ID_SANGLI || '',
    kolhapur: process.env.NEXT_PUBLIC_SHEET_ID_KOLHAPUR || '',
  }

  const sheetId = sheetIds[region]
  if (!sheetId) {
    throw new Error(`Sheet ID for region "${region}" is not configured`)
  }

  return sheetId
}

/**
 * Get application configuration
 */
export function getAppConfig(): AppConfig {
  const defaultRegion: Region = (process.env.NEXT_PUBLIC_DEFAULT_REGION as Region) || 'sangli'

  return {
    defaultRegion,
    sheetIds: {
      sangli: process.env.NEXT_PUBLIC_SHEET_ID_SANGLI || '',
      kolhapur: process.env.NEXT_PUBLIC_SHEET_ID_KOLHAPUR || '',
    },
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'Wildlife Call Management Dashboard',
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
  }
}

/**
 * Validate that all required configuration is present
 */
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check Google Credentials
  if (!process.env.GOOGLE_CREDENTIALS_TYPE) {
    errors.push('GOOGLE_CREDENTIALS_TYPE is not set')
  }
  if (!process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY) {
    errors.push('GOOGLE_CREDENTIALS_PRIVATE_KEY is not set')
  }
  if (!process.env.GOOGLE_CREDENTIALS_CLIENT_EMAIL) {
    errors.push('GOOGLE_CREDENTIALS_CLIENT_EMAIL is not set')
  }

  // Check Sheet IDs
  if (!process.env.NEXT_PUBLIC_SHEET_ID_SANGLI) {
    errors.push('NEXT_PUBLIC_SHEET_ID_SANGLI is not set')
  }
  if (!process.env.NEXT_PUBLIC_SHEET_ID_KOLHAPUR) {
    errors.push('NEXT_PUBLIC_SHEET_ID_KOLHAPUR is not set')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
