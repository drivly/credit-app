import 'server-only'
import { formatDigits } from '@drivly/ui'
import { conciergeBase, fromAirtable } from './airtable'
import { VehicleDetailProps } from './getVehicleDetails'

export async function getATVehicleById(id: string) {
  const data = await fromAirtable(conciergeBase, 'Vehicles', `rec${id}`)
  const price = findAirtablePrice(data)

  return {
    year: data?.year,
    make: data?.make,
    model: data?.model,
    vin: data?.VIN,
    price,
    miles: formatDigits(data?.mileage) || '',
  } as VehicleDetailProps
}

const findAirtablePrice = (data: Record<string, any>) => {
  const buyNowPrice = data?.buyNow
  const calculatedBuyNow = buyNowPrice
    ? formatDigits(Number(buyNowPrice) * 0.01 + 2000 + Number(buyNowPrice), true)
    : null
  const dealerPrice = data?.retailPrice ? formatDigits(data?.retailPrice, true) : null
  const manualPrice = data?.salesPrice ? formatDigits(data?.salesPrice, true) : null

  let price = manualPrice ? manualPrice : calculatedBuyNow ? calculatedBuyNow : dealerPrice

  if (!price) return ''
  if (price?.toString()?.endsWith('.00')) {
    price = price?.toString()?.replace('.00', '')
  }
  return price
}
