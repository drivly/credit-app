declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BUILD_VIN_API: string
      CONCIERGE_BASE: string
      CREDIT_API_DRIVLY: string
      NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID: string
      SLACK_WEBHOOK_URL: string
      TABLE_VIN_UNIVERSE_API: string
      VIN_UNIVERSE_KEY: string
    }
  }
}

export {}
