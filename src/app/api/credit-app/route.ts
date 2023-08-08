import { formatApplicant } from '@/utils/formatApplicant'
import { slackMsgRequest } from '@/utils/slackMsg'
import { NextResponse } from 'next/server'

const slackUrl = process.env.SLACK_WEBHOOK_URL

export async function POST(request: Request) {
  let secondaryRequest
  let buyerRelationship
  const data = await request.json()
  const { primary, secondary, vehicle } = data

  const primaryRequest = formatApplicant(primary)

  if (secondary !== undefined) {
    secondaryRequest = formatApplicant(secondary)
    buyerRelationship = secondaryRequest?.app?.buyerRelationship
    delete secondaryRequest?.app.buyerRelationship
  }

  const payload = {
    primaryBuyer: primaryRequest.app,
    buyerRelationship,
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
    }).then((res) => res.json())
    console.log('response', response)

    if (!response.success) {
      throw new Error(response)
    }

    return NextResponse.json({ status: 200, data: response })
  } catch (error: any) {
    console.log('error', error.message)
    return NextResponse.json({ error: error.message, status: 500 })
  }
}
