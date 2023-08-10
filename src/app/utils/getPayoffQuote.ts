'use server'

type PayoffQuoteRequest = {
  vin: string
  source: string
  ssn?: string
}

// type PayoffQuoteResponse = {
//   _id: string
//   nextPaymentAmount: string | number
//   nextPaymentDate: string | Date
//   quote: {
//     grossPayOffAmount: string | number
//     netPayOffAmount: string | number
//     goodThrough: string | Date
//     perDiem: string | number
//   }
//   comments: string | string[] | null
//   productType: string | number
//   referenceId: string
// }

export async function getPayoffQuote(request: PayoffQuoteRequest) {
  const res = await fetch(`https://credit.api.driv.ly/payoff`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' },
  })

  const response = await res.json()

  return response
}
