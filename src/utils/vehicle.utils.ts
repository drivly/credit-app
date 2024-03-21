import { formatDigits } from '@drivly/ui'

export const findVehiclePrice = (data: Record<string, any>) => {
  const buyNowPrice = data?.buyNow
  const calculatedBuyNow = buyNowPrice
    ? formatDigits(
        Number(buyNowPrice) * 0.01 + 2000 + Number(buyNowPrice),
        true
      )
    : null
  const dealerPrice = data?.retailPrice
    ? formatDigits(data?.retailPrice, true)
    : null
  const manualPrice = data?.salesPrice
    ? formatDigits(data?.salesPrice, true)
    : null

  let price = manualPrice
    ? manualPrice
    : calculatedBuyNow
    ? calculatedBuyNow
    : dealerPrice

  if (!price) return ''
  if (price?.toString()?.endsWith('.00')) {
    price = price?.toString()?.replace('.00', '')
  }
  return price
}

interface VehicleRecord {
  retailPrice?: number
  salesPrice?: number
  buyNow?: number
}

export function findHighestPricedVehicle(records: VehicleRecord[]) {
  let highestPriceRecord: VehicleRecord = {}
  let highestPrice = Number.NEGATIVE_INFINITY

  records.forEach((record) => {
    const salesPrice = record?.salesPrice || 0
    const buyNowPrice = record?.buyNow || 0
    const retailPrice = record?.retailPrice || 0

    const currentPrice = salesPrice || buyNowPrice || retailPrice

    if (currentPrice > highestPrice) {
      highestPrice = currentPrice
      highestPriceRecord = record
    }
  })

  return highestPriceRecord
}
