import { formatApplicant } from '@/utils/formatApplicant'
import { slackMsgRequest } from '@/utils/slackMsg'
import { NextResponse } from 'next/server'
import { withAppRouterHighlight } from '@/utils/withAppRouterHighlight'

type RouteOnePayload = {
  primaryBuyer: Record<string, any>
  vehicles: Record<string, any>[]
  tenant: string
  buyerRelationship?: string
  coBuyer?: Record<string, any>
  trade?: {
    tradeInAllowance: number
    id: string
    lienholder: string
  }
}

const slackUrl = process.env.SLACK_WEBHOOK_URL
export const maxDuration = 300

export const POST = withAppRouterHighlight(async (request: Request) => {
  const data = await request.json()
  const { primary, secondary, vehicle, tradeIn, tenant } = data

  let payload: RouteOnePayload = {
    primaryBuyer: formatApplicant(primary).app,
    vehicles: [vehicle],
    tenant,
  }

  if (secondary) {
    payload['buyerRelationship'] = secondary.buyerRelationship
    delete secondary.buyerRelationship
    payload['coBuyer'] = formatApplicant(secondary).app
  }

  if (tradeIn) {
    payload['trade'] = {
      tradeInAllowance: tradeIn?.allowance,
      id: tradeIn?.id,
      lienholder: tradeIn?.lienholder,
    }
  }

  console.log('🚀 ~ CREDIT_API_DRIVLY ~ payload:', payload)

  try {
    await slackMsgRequest({ url: slackUrl, data })
    const d = await fetch(`${process.env.CREDIT_API_DRIVLY}/applications`, {
      method: 'POST',
      body: JSON.stringify(payload),
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
