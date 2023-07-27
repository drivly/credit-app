'use server'

import { getAirtableVehicle } from './getAirtableVehicle'
import { getVehicleDetails } from './getVehicleDetails'

export async function handleVin(vin: string) {
  if (vin?.length !== 17) return
  const vdp = await getVehicleDetails(vin)
  return vdp
}
