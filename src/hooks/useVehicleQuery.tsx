'use client'

import useCustomer from '@/app/store'
import { getVehicleDetails } from '@/app/utils/getVehicleDetails'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const useVehicleQuery = () => {
  const { watch } = useFormContext()
  const setCustomer = useCustomer((s) => s.setCustomer)
  const hasMounted = useRef(false)
  const { setValue } = useFormContext()
  const watchedVin = watch('vehicleVin')

  const { data, isFetching } = useQuery(
    ['vehicle', watchedVin],
    async () => {
      const toastId = toast.loading('Searching for vehicle...')
      const details = await getVehicleDetails(watchedVin!)
      return { toastId, details }
    },
    {
      enabled: watchedVin?.length === 17,
      onSuccess: ({ toastId, details }) => {
        if (details) {
          toast.success('Vehicle found!', { id: toastId })
          setCustomer({
            vehicleMileage: details?.miles,
            vehiclePrice: details?.price,
            vehicleYear: details?.year,
            vehicleMake: details?.make,
            vehicleModel: details?.model,
          })
          setValue('vehicleYear', details?.year)
          setValue('vehicleMake', details?.make)
          setValue('vehicleModel', details?.model)
          setValue('vehiclePrice', details?.price)
          setValue('vehicleMileage', details?.miles)
          setValue('vehicleVin', details?.vin)
        } else if (!details) {
          toast.error('Vehicle not found!', { id: toastId })
        }
      },
    }
  )

  useEffect(() => {
    hasMounted.current = true

    return () => {
      hasMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!watchedVin) {
      setValue('vehicleYear', '')
      setValue('vehicleMake', '')
      setValue('vehicleModel', '')
      setValue('vehiclePrice', '')
      setValue('vehicleMileage', '')
      setCustomer({
        vehicleMileage: '',
        vehiclePrice: '',
        vehicleYear: '',
        vehicleMake: '',
        vehicleModel: '',
      })
    }
  }, [setCustomer, setValue, watchedVin])

  return { hasMounted, isFetching }
}

export default useVehicleQuery
