'use server'

import { fromTableUniverse, searchTableUniverse } from './table.action'
import { findHighestPricedVehicle, findVehiclePrice } from '@/utils/vehicle.utils'
import { formatDigits } from '@drivly/ui'
import getListing from '@drivly/ui/dist/lib/getListing'
import {
  BuildData,
  PayoffQuoteRequest,
  PayoffQuoteResponse,
  VehicleDetailProps,
  vehicleSchema,
} from '../shared.contracts'

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

  const data = vehicleSchema?.parse({
    year: year.toString(),
    make,
    model,
    vin: id,
    price,
    miles,
  })

  if (!data) return null

  return { ...data }
}

export const fetchPrice = async (id: string) => {
  const data = await searchTableUniverse('CRM', 'Vehicles', `vin='${id}`)
  if (!data?.length) return null

  const highestPricedRecord = findHighestPricedVehicle(data)
  const salesPrice = highestPricedRecord?.salesPrice || ''
  const buyNow = highestPricedRecord?.buyNow || ''
  const retailPrice = highestPricedRecord?.retailPrice || ''
  const price = salesPrice ? salesPrice : buyNow ? buyNow * 0.01 + 2000 + buyNow : retailPrice
  return price
}

export async function getVehicleById(id: string) {
  const data = await fromTableUniverse('CRM', 'Vehicles', `rec${id}`)
  const price = findVehiclePrice(data)

  return {
    year: data?.year,
    make: data?.make,
    model: data?.model,
    vin: data?.VIN,
    price,
    miles: formatDigits(data?.mileage) || '',
  } as VehicleDetailProps
}

export async function getBuild(vin: string) {
  const data = await fetch(`${process.env.BUILD_VIN_API}/${vin}`).then((res) => res.json())
  return data.build as BuildData['build']
}

export async function getPayoffQuote(request: PayoffQuoteRequest) {
  const res = await fetch(`${process.env.CREDIT_API_DRIVLY}/payoff`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' },
  })

  const response = await res.json()

  return { ...response } as PayoffQuoteResponse
}
