import { formatDigits } from '@drivly/ui'
import { IVDP } from './getVehicleDetails'

const AT_KEY = process.env.AIRTABLE_KEY
const conciergeBase = 'app0ha03ugcl45qM1'

export async function getAirtableVehicle(id: string) {
  const data = await getRecordString(conciergeBase, 'Vehicles', id).then((d) => d?.fields)
  const fields = cleanObject(data)
  const price = findAirtablePrice(data)

  return {
    year: fields?.year,
    make: fields?.make,
    model: fields?.model,
    vin: fields?.vin,
    price,
    miles: fields?.miles || '0',
  } as IVDP
}

export const getRecordString = async (base: string, table: string, id: string) =>
  await fetch(
    `https://camel.case.do/api.airtable.com/v0/${base}/${table}/rec${id}?cellFormat=string&userLocale=en-us&timeZone=America/Chicago&api_key=${AT_KEY}`
  ).then((res) => res.json())

const findAirtablePrice = (data: Record<string, any>) => {
  const buyNowPrice = data?.buyNow?.replace(/[$\,]/g, '')
  const calculatedBuyNow = buyNowPrice
    ? formatDigits(Number(buyNowPrice) * 0.01 + 2000 + Number(buyNowPrice), true)
    : null
  const dealerPrice = data?.retailPrice
    ? formatDigits(data?.retailPrice?.replace(/[$\,]/g, ''), true)
    : null
  const manualPrice = data?.salesPrice
    ? formatDigits(data?.salesPrice?.replace(/[$\,]/g, ''), true)
    : null

  let price = manualPrice ? manualPrice : calculatedBuyNow ? calculatedBuyNow : dealerPrice

  if (!price) return ''
  if (price?.toString()?.endsWith('.00')) {
    price = price?.toString()?.replace('.00', '')
  }
  return price
}

const cleanObject = (data: Record<string, any>): Record<string, any> => {
  const cleanedData: Record<string, any> = {}
  for (const [key, value] of Object.entries(data)) {
    const trimmedValue = value?.toString().trimStart()?.trimEnd()
    const cleanedValue = trimmedValue.replaceAll(/^"(.*)"$/g, '$1')
    cleanedData[key] = cleanedValue
  }
  return cleanedData
}
