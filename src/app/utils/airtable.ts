export const conciergeBase = 'app0ha03ugcl45qM1'

export const fromAirtable = async (base: string, table: string, id: string) => {
  const d = await fetch(`https://airtable.vin/${base}/${table}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.VIN_UNIVERSE_KEY}`,
    },
  })
  if (d.status != 200) {
    return null
  }
  return (await d.json()).data
}

export const searchAirtable = async (base: string, table: string, query: string) => {
  const d = await fetch(`https://airtable.vin/${base}/${table}?${query}`, {
    headers: { Authorization: `Bearer ${process.env.VIN_UNIVERSE_KEY}` },
  })

  if (d.status != 200) {
    return null
  }

  return (await d.json()).data
}
