export function formatRequest(data: any) {
  const { joint } = data

  delete data.joint
  delete data.employedPrimary
  delete data.employedJoint

  let primary: Record<string, any> = {}
  let secondary: Record<string, any> | null = {}
  let vehicle: Record<string, any> | null = {}

  for (const key in data) {
    if (!key.includes('vehicle') && !key.startsWith('co_')) {
      primary[key] = data[key]
    } else if (joint && key.startsWith('co_')) {
      let newKey = key.replace('co_', '')
      secondary[newKey] = data[key]
    } else if (key.includes('vehicle') && data[key].length > 0) {
      vehicle[key.replace('vehicle', '')] = data[key]
    }
  }

  if (Object.entries(secondary).length === 0) {
    secondary = null
  }
  if (Object.entries(vehicle).length === 0) {
    vehicle = null
  }

  if (!secondary && !vehicle) {
    return { primary }
  } else if (!secondary) {
    return { primary, vehicle }
  } else if (!vehicle) {
    return { primary, secondary }
  }
  console.log('vehcile', vehicle)
  return { primary, secondary, vehicle }
}
