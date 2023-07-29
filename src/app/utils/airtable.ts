export const fromAirtable = async (table: any, id: any) => {
  const d = await fetch(`https://drivly.airtable.do/commerce/${table}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.VIN_UNIVERSE_KEY}`,
    },
  })
  if (d.status != 200) {
    return null
  }
  return (await d.json()).data
}

const updateAirtable = async (table: any, id: any, data: any) => {
  const d = await fetch(`https://drivly.airtable.do/commerce/${table}/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${process.env.VIN_UNIVERSE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (d.status != 200) {
    return null
  }

  return (await d.json()).data
}

const createAirtable = async (table: any, data: any) => {
  const d = await fetch(`https://drivly.airtable.do/commerce/${table}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.VIN_UNIVERSE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: data,
      typecast: true,
    }),
  })

  if (d.status != 200) {
    console.log(`MAJOR ERROR: Failed to create ${table} record.`, await d.text())
    return null
  }

  return (await d.json()).data
}

const searchAirtable = async (table: any, query: any) => {
  const d = await fetch(`https://drivly.airtable.do/commerce/${table}?filterByFormula=${query}`, {
    headers: { Authorization: `Bearer ${process.env.VIN_UNIVERSE_KEY}` },
  })

  if (d.status != 200) {
    return null
  }

  return (await d.json()).data
}

// phoneType
