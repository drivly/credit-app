import { CONSTANTS } from "@/app/constants";

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {

    const { registerHighlight } = await import('@highlight-run/next/server')
    registerHighlight({
      projectID: CONSTANTS.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID,
    })
  }
}