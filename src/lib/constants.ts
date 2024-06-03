export const CONSTANTS = {
  NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID: process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID as string,
}

export const HOSTNAMES = ['localhost', 'credit.driv.ly'] as const
export const TENANT = process.env.NODE_ENV === 'development' ? 'CLOUD-DEV' : 'CLOUD-PROD'