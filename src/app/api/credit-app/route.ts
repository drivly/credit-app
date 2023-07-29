import { formatApplicant } from '@/utils/formatApplicant'
import { slackMsgRequest } from '@/utils/slackMsg'
import { NextResponse } from 'next/server'

const slackUrl = process.env.SLACK_WEBHOOK_URL

export async function POST(request: Request) {
  let secondaryRequest
  const data = await request.json()
  const { primary, secondary, vehicle } = data

  const primaryRequest = formatApplicant(primary)

  if (secondary !== undefined) {
    secondaryRequest = formatApplicant(secondary)
  }

  const payload = {
    primaryBuyer: primaryRequest.app,
    vehicles: [vehicle],
    coBuyer: secondaryRequest?.app,
  }
  console.log('payload', payload)

  try {
    await slackMsgRequest({ url: slackUrl, data })
    const response = await fetch('https://credit.api.driv.ly/applications', {
      method: 'POST',
      body: JSON.stringify({ ...payload }),
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await response.json()
    console.log('application', json)

    if (!response.ok) {
      throw new Error(json)
    }

    return NextResponse.json({ status: 200, data: json })
  } catch (error: any) {
    console.log('error', error.message)
    return NextResponse.json({ error: error.message, status: 500 })
  }
}
