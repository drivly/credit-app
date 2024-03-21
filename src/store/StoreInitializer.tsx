'use client'

import { useRef } from 'react'
import useCustomer from '.'

const StoreInitializer = ({
  vehicleYear,
  vehicleMake,
  vehicleModel,
  vehiclePrice,
  vehicleMileage,
}: {
  vehicleYear?: string
  vehicleMake?: string
  vehicleModel?: string
  vehiclePrice?: string
  vehicleMileage?: string
}) => {
  const initialized = useRef(false)

  if (!initialized.current) {
    initialized.current = true
    useCustomer.setState({
      customer: { vehicleMileage, vehiclePrice, vehicleYear, vehicleMake, vehicleModel },
    })
  }
  return null
}

export default StoreInitializer
