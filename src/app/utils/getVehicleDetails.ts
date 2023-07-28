'use server'

import z from 'zod'
import getListing from '@drivly/ui/dist/lib/getListing'
import { fetchPrice } from './fetchPrice'
import { formatDigits } from '@drivly/ui'

const betaKey = process.env.DRIVLY_BETA_KEY

const vehicleSchema = z.object({
  year: z.string(),
  make: z.string(),
  model: z.string(),
  vin: z.string(),
  price: z.coerce.string(),
  miles: z.coerce.string(),
})

export type IVDP = z.infer<typeof vehicleSchema>

export async function getVehicleDetails(id: string) {
  if (id?.length !== 17) return

  const [listing, fetchedPrice] = await Promise.all([getListing(id), fetchPrice(id)])
  const { vehicle } = listing
  const { year, make, model } = vehicle

  const wholesale = listing?.wholesaleListing
  const retail = listing?.retailListing

  const wholesalePrice =
    wholesale?.buyNowPrice &&
    Number(wholesale?.buyNowPrice) * 0.01 + 2000 + Number(wholesale?.buyNowPrice)
  let price = fetchedPrice ? fetchedPrice : wholesalePrice || retail?.price
  let miles = wholesale ? wholesale?.miles : retail?.miles

  if (price) price = formatDigits(price, true)
  if (miles) miles = formatDigits(miles)

  if (price?.endsWith('.00')) price = price.replace('.00', '')

  const data = vehicleSchema.parse({ year, make, model, vin: id, price, miles })

  return { ...data }
}
