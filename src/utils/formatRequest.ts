export function formatRequest(data: any) {
  const { joint } = data

  delete data.joint
  delete data.employedPrimary
  delete data.employedJoint

  let primary: Record<string, any> = {}
  let secondary: Record<string, any> | null = {}
  let vehicle: Record<string, any> | null = {}
  let tradeIn: Record<string, any> | null = {}

  for (const key in data) {
    if (!key.includes('vehicle') && !key.startsWith('co_') && !key.includes('tradeIn')) {
      primary[key] = data[key]
    } else if (joint && key.startsWith('co_')) {
      let newKey = key.replace('co_', '')
      secondary[newKey] = data[key]
    } else if (key.includes('vehicle') && data[key].length > 0) {
      let newKey = key.replace('vehicle', '')
      newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1)
      vehicle[newKey] = data[key]
    } else if (key.includes('tradeIn') && data[key].length > 0) {
      let newKey = key.replace('tradeIn', '')
      newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1)
      tradeIn[newKey] = data[key]
    }
  }

  if (Object.entries(secondary).length === 0) {
    secondary = null
  }
  if (Object.entries(vehicle).length === 0) {
    vehicle = null
  }
  if (Object.entries(tradeIn).length === 0) {
    tradeIn = null
  }

  return { primary, secondary, vehicle, tradeIn }
}
