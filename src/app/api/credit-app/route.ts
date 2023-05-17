import { formatPrimaryApp } from '@/utils/formatPrimaryApp'
import { slackMsgRequest } from '@/utils/slackMsg'
import { NextResponse } from 'next/server'

const slackUrl = process.env.SLACK_WEBHOOK_URL

export async function POST(request: Request) {
  const data = await request.json()

  const primaryRequest = formatPrimaryApp(data)

  try {
    await slackMsgRequest({ url: slackUrl, data })
    const appRequest = await fetch('https://credit.api.driv.ly/applications', {
      method: 'POST',
      body: JSON.stringify({ primaryBuyer: primaryRequest.primary, vehicles: primaryRequest.vin }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())

    console.log('appRequest', appRequest)

    return NextResponse.json({ status: 200, data: appRequest })
  } catch (error) {}
  return NextResponse.json({ status: 200, message: 'Success' })
}


// POST to https://credit.api.driv.ly/applications