'use server'

import z from 'zod'
import getListing from '@drivly/ui/dist/lib/getListing'
import { formatDigits } from '@drivly/ui'
import { conciergeBase, searchAirtable } from './airtable'

const vehicleSchema = z.object({
  year: z.string(),
  make: z.string(),
  model: z.string(),
  vin: z.string(),
  price: z.coerce.string(),
  miles: z.coerce.string(),
})

export type VehicleDetailProps = z.infer<typeof vehicleSchema>

export async function getVehicleDetails(id: string) {
  'use server'
  if (id?.length !== 17) return

  const [listing, fetchedPrice] = await Promise.all([getListing(id), fetchPrice(id)])
  if (!listing?.vehicle?.year) return null

  const { year, make, model } = listing?.vehicle
  const wholesale = listing?.wholesaleListing || null
  const retail = listing?.retailListing || null

  const wholesalePrice = wholesale?.buyNowPrice
    ? Number(wholesale?.buyNowPrice) * 0.01 + 2000 + Number(wholesale?.buyNowPrice)
    : null
  let price = fetchedPrice ? fetchedPrice : wholesalePrice ? wholesalePrice : retail?.price || ''
  let miles: number | string = Math.max(wholesale?.miles || 0, retail?.miles || 0)

  if (miles === 0) {
    miles = ''
  } else {
    miles = formatDigits(miles)
  }
  if (price) price = formatDigits(price, true)
  if (price?.endsWith('.00')) price = price.replace('.00', '')

  const data = vehicleSchema?.parse({ year, make, model, vin: id, price, miles })

  if (!data) return null

  return { ...data }
}

export const fetchPrice = async (id: string) => {
  const data = await searchAirtable(conciergeBase, 'Vehicles', `AND({VIN}='${id}')`)
  if (!data?.records?.length) return null

  const highestPricedRecord = findHighestPricedRecord(data?.records)
  const salesPrice = highestPricedRecord?.salesPrice || ''
  const buyNow = highestPricedRecord?.buyNow || ''
  const retailPrice = highestPricedRecord?.retailPrice || ''
  const price = salesPrice ? salesPrice : buyNow ? buyNow * 0.01 + 2000 + buyNow : retailPrice
  return price
}

interface VehicleRecord {
  retailPrice?: number
  salesPrice?: number
  buyNow?: number
}

function findHighestPricedRecord(records: VehicleRecord[]) {
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
