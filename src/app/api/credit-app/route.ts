import { formatApplicant } from '@/utils/formatApplicant'
import { slackMsgRequest } from '@/utils/slackMsg'
import { NextResponse } from 'next/server'
import { withAppRouterHighlight } from '@/utils/withAppRouterHighlight'

const slackUrl = process.env.SLACK_WEBHOOK_URL
const TENANT = process.env.NODE_ENV === 'development' ? 'CLOUD-DEV' : 'CLOUD-PROD'
export const maxDuration = 300

export const POST = withAppRouterHighlight(async (request: Request) => {
  let payload: Record<string, any> = {
    tenant: TENANT,
  }
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
  console.log('🚀 ~ CREDIT_API_DRIVLY ~ payload:', payload)
  try {
    await slackMsgRequest({ url: slackUrl, data })
    const d = await fetch(`${process.env.CREDIT_API_DRIVLY}/applications`, {
      method: 'POST',
      body: JSON.stringify({ ...payload }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await d.json()
    console.log('🚀 ~ CREDIT_API_DRIVLY ~ response:', response)

    return NextResponse.json({ status: 200, data: response })
  } catch (error: any) {
    console.log('error', error.message)
    return NextResponse.json({ error: error.message, status: 500 })
  }
})
