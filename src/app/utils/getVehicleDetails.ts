'use server'

import z from 'zod'

const betaKey = process.env.DRIVLY_BETA_KEY

const vehicleSchema = z.object({
  year: z.string(),
  make: z.string(),
  model: z.string(),
  vin: z.string(),
  price: z.coerce.string(),
  miles: z.coerce.string(),
})

export interface IVDP {
  year: string
  make: string
  model: string
  vin: string
  price: string
  miles: string
}

export async function getVehicleDetails(vin: string) {
  const res = await fetch(`https://listing.vin/${vin}`, {
    headers: { Authorization: betaKey! },
  }).then((res) => res.json())

  if (res) {
    const vehicle = res?.vehicle
    const wholesale = res?.wholesaleListing
    const retail = res?.retailListing

    const { year, make, model, vin } = vehicle
    const price = wholesale ? wholesale?.buyNowPrice : retail?.price
    const miles = wholesale ? wholesale?.miles : retail?.miles
    const vehicleDetails = { year, make, model, vin, price, miles } as const

    const data = vehicleSchema.parse(vehicleDetails)

    console.log('vehicleSchema data', data)

    return { ...data } as IVDP
  }
  return null
}
