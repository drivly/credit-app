'use server'

import formatDate from '@/utils/formatDate'
import type { CreditApplicant, VehicleOfInterest } from 'typings'
import { createSlackSection, formatSlackApplicant, type SlackBlocks } from './slack.helpers'

interface SlackParams {
  url: string | undefined
  data: {
    primary: CreditApplicant
    secondary: CreditApplicant
    vehicle: VehicleOfInterest
    tradeIn: {
      id: string
      lienholder: string
      allowance: number
    }
  }
}

export async function slackMessageCredit({ url, data }: SlackParams) {
  const date = formatDate(new Date(), true)
  const blocks: SlackBlocks = []

  blocks.push(
    createSlackSection(
      `*${data.primary.firstName} ${data.primary.lastName}* | ${date} :moneybag:\n* ${data.primary.email} | ${date}*`
    )
  )
  blocks.push(...formatSlackApplicant(data.primary, 'Primary'))

  if (data.secondary) {
    blocks.push(...formatSlackApplicant(data.secondary, 'Joint'))
  }

  blocks.push({ type: 'divider' })
  blocks.push(
    createSlackSection(
      `*Vehicle of Interest*\n*Cash Down:* ${data?.vehicle?.cashDown}\n*VIN:* ${data.vehicle.vin}\n*Year:* ${data.vehicle.year}\n*Make:* ${data.vehicle.make}\n*Model:* ${data.vehicle.model}\n*Odometer:* ${data.vehicle.mileage}\n*Price:* ${data.vehicle.price}`
    )
  )

  if (data.tradeIn) {
    blocks.push({ type: 'divider' })
    blocks.push(
      createSlackSection(
        `*Trade Information*\n*Record Id:* ${data.tradeIn.id}\n*Lender:* ${data.tradeIn.lienholder}\n*Trade In Allowance:* ${data.tradeIn.allowance}`
      )
    )
  }

  await fetch(url!, {
    method: 'POST',
    body: JSON.stringify({ blocks }),
    headers: { 'Content-Type': 'application/json' },
  })
}
