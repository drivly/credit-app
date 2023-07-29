'use server'

import z from 'zod'
import getListing from '@drivly/ui/dist/lib/getListing'
import { formatDigits } from '@drivly/ui'

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
  const { year, make, model } = listing?.vehicle

  const wholesale = listing?.wholesaleListing || null
  const retail = listing?.retailListing || null

  const wholesalePrice = wholesale?.buyNowPrice
    ? Number(wholesale?.buyNowPrice) * 0.01 + 2000 + Number(wholesale?.buyNowPrice)
    : null
  let price = fetchedPrice ? fetchedPrice : wholesalePrice ? wholesalePrice : retail?.price || ''
  let miles = wholesale ? wholesale?.miles : retail?.miles || ''

  if (miles) miles = formatDigits(miles)
  if (price) price = formatDigits(price, true)
  if (price?.endsWith('.00')) price = price.replace('.00', '')

  const data = vehicleSchema?.parse({ year, make, model, vin: id, price, miles })

  return { ...data }
}

export const fetchPrice = async (id: string) => {
  const data = await fetch(
    `https://camel.case.do/api.airtable.com/v0/app0ha03ugcl45qM1/Vehicles/?cellFormat=string&userLocale=en-us&timeZone=America/Chicago&sort[0][field]=VIN&sort[0][direction]=desc&filterByFormula=AND({VIN}='${id}')&api_key=${process.env.AIRTABLE_KEY}`
  ).then((res) => res.json())
  console.log('data', data)

  if (!data?.records?.length) return null

  const record = data?.records.find((record: any) => record.fields.vin === id)

  const salesPrice = record?.fields?.salesPrice?.replace(/[$\,]/g, '') || ''
  const buyNow = record?.fields?.buyNow?.replace(/[$\,]/g, '') || ''
  const retailPrice = record?.fields?.retailPrice?.replace(/[$\,]/g, '') || ''
  const price = salesPrice
    ? salesPrice
    : buyNow
    ? Number(buyNow) * 0.01 + 2000 + Number(buyNow)
    : retailPrice
  return price
}
