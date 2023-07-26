import { formatApplicant } from '@/utils/formatApplicant'
import { slackMsgRequest } from '@/utils/slackMsg'
import { NextResponse } from 'next/server'

const slackUrl = process.env.SLACK_WEBHOOK_URL

export async function POST(request: Request) {
  let secondaryRequest
  const data = await request.json()
  const { primary, secondary, vehicle } = data

  const primaryRequest = formatApplicant(vehicle, primary)

  if (secondary !== undefined) {
    secondaryRequest = formatApplicant(vehicle, secondary)
  }

  const payload = {
    primaryBuyer: primaryRequest.app,
    vehicles: primaryRequest.vin,
    coBuyer: secondaryRequest?.app,
  }

  try {
    await slackMsgRequest({ url: slackUrl, data })
    const response = await fetch('https://credit.api.driv.ly/applications', {
      method: 'POST',
      body: JSON.stringify({ primaryBuyer: primaryRequest.app, vehicles: primaryRequest.vin }),
      headers: { 'Content-Type': 'application/json' },
    })

    const application = await response.json()
    console.log('application', application)

    if (!response.ok) {
      throw new Error(application)
    }

    return NextResponse.json({ status: 200, data: application })
  } catch (error: any) {
    console.log('error', error.message)
    return NextResponse.json({ error: error.message, status: 500 })
  }
}

// POST to https://credit.api.driv.ly/applications
