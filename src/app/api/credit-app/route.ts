import { formatApplicant } from '@/utils/formatApplicant'
import { slackMsgRequest } from '@/utils/slackMsg'
import { NextResponse } from 'next/server'
import { withAppRouterHighlight } from '@/app/utils/withAppRouterHighlight'

const slackUrl = process.env.SLACK_WEBHOOK_URL

export const POST = withAppRouterHighlight(async(request: Request) => {
  let payload: Record<string, any> = {}
  const data = await request.json()
  const { primary, secondary, vehicle, tradeIn } = data

  const primaryRequest = formatApplicant(primary)
  payload['primaryBuyer'] = primaryRequest?.app
  payload['vehicles'] = [vehicle]

  if (secondary) {
    const secondaryRequest = formatApplicant(secondary)
    const buyerRelationship = secondaryRequest?.app?.buyerRelationship
    delete secondaryRequest?.app.buyerRelationship
    payload['coBuyer'] = secondaryRequest?.app
    payload['buyerRelationship'] = buyerRelationship
  }

  if (tradeIn) {
    payload['trade'] = tradeIn
  }
  console.log('payload', payload)
  try {
    await slackMsgRequest({ url: slackUrl, data })
    const d = await fetch('https://credit.api.driv.ly/applications', {
      method: 'POST',
      body: JSON.stringify({ ...payload }),
      headers: { 'Content-Type': 'application/json' },
    })

    console.log('d', d.ok)
    const response = await d.json()
    console.log('response', response)

    return NextResponse.json({ status: 200, data: response })
  } catch (error: any) {
    console.log('error', error.message)
    return NextResponse.json({ error: error.message, status: 500 })
  }
})
