const betaKey = process.env.DRIVLY_BETA_KEY

export interface IVDP {
  year: number
  make: string
  model: string
  vin: string
  price: number
  miles: number
}

export async function getVehicleDetails(vin: string) {
  const data = await fetch(`https://listing.vin/${vin}`, {
    cache: 'default',
    next: { revalidate: 60 },
    headers: { Authorization: betaKey! },
  }).then((res) => res.json())

  if (data) {
    const vehicle = data?.vehicle
    const wholesale = data?.wholesaleListing
    const retail = data?.retailListing

    const { year, make, model, vin } = vehicle
    const price = wholesale ? wholesale?.buyNowPrice : retail?.price
    const miles = wholesale ? wholesale?.miles : retail?.miles

    return {
      year,
      make,
      model,
      vin,
      price,
      miles,
    } as IVDP
  }
  return null
}
