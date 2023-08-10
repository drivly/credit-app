'use server'

export async function getBuild(vin: string) {
  if (!vin) {
    throw new Error('No VIN provided')
  }
  const data = await fetch(`https://build.vin/${vin}`).then((res) => res.json())

  if (!data) {
    throw new Error('No build data found')
  }
  
  return data.build
}