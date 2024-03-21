import { z } from 'zod'

export const vehicleSchema = z.object({
  year: z.string(),
  make: z.string(),
  model: z.string(),
  vin: z.string(),
  price: z.coerce.string(),
  miles: z.coerce.string(),
})

export type VehicleDetailProps = z.infer<typeof vehicleSchema>

export interface VehicleRecord {
  retailPrice?: number
  salesPrice?: number
  buyNow?: number
}

export type BuildData = {
  build: {
    vin: string
    year: number
    make: string
    model: string
  }
}

export type PayoffQuoteRequest =
  | {
      vin: string
      source: string
      ssn?: string
    }
  | any

export type PayoffQuoteResponse = {
  id: string
  nextPaymentAmount: string | number
  nextPaymentDate: string | Date
  allowance?: number
  quote: {
    grossPayOffAmount?: string | number
    netPayOffAmount?: string | number
    goodThrough?: string | Date
    perDiem?: string | number
  }
  comments?: string | string[] | null
  productType: string | number
}