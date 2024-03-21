'use server'

export const fromTableUniverse = async (base: string, table: string, id: string) => {
  const d = await fetch(`${process.env.TABLE_VIN_UNIVERSE_API}/${base}/${table}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.VIN_UNIVERSE_KEY}`,
    },
  })
  if (d.status != 200) {
    return null
  }
  return (await d.json()).data
}

export const searchTableUniverse = async (base: string, table: string, query: string) => {
  const d = await fetch(`${process.env.TABLE_VIN_UNIVERSE_API}/${base}/${table}?${query}`, {
    headers: { Authorization: `Bearer ${process.env.VIN_UNIVERSE_KEY}` },
  })

  if (d.status != 200) {
    return null
  }

  return (await d.json()).data
}
