import 'server-only'

export const fetchPrice = async (id: string) => {

  const url = `https://camel.case.do/api.airtable.com/v0/app0ha03ugcl45qM1/Vehicles/?cellFormat=string&userLocale=en-us&timeZone=America/Chicago&sort[0][field]=VIN&sort[0][direction]=desc&filterByFormula=AND({VIN}='${id}')`
  const AT_KEY = process.env.AIRTABLE_KEY

  try {
    const data = await fetch(`${url}&api_key=${AT_KEY!}`, {
      next: { revalidate: 0 },
    }).then((res) => res.json())
    const record = data?.records?.find((record: any) => record.fields?.vin === id)

    const salesPrice = record?.fields?.salesPrice?.replace(/[$\,]/g, '')
    const buyNow = record?.fields?.buyNow?.replace(/[$\,]/g, '')
    const price = salesPrice ? salesPrice : Number(buyNow) * 0.01 + 2000 + Number(buyNow)
    return price
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}
