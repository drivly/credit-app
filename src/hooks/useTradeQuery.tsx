'use client'

import useCustomer from '@/app/store'
import { getBuild } from '@/app/utils/getBuild'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

const useTradeQuery = () => {
  const { watch, setValue } = useFormContext()
  const [customer, setCustomer] = useCustomer((s) => [s.customer, s.setCustomer])
  const watchTradeInVin = watch('tradeInVin')

  const { data } = useQuery(
    ['trade', watchTradeInVin],
    async () => {
      const toastId = toast.loading('Searching for vehicle...')
      const details = await getBuild(watchTradeInVin)
      return { toastId, details }
    },
    {
      enabled: watchTradeInVin?.length === 17 && !customer?.tradeInfo?.vin?.length,
      onSuccess: ({ toastId, details }) => {
        if (details) {
          toast.success('Vehicle Found', { id: toastId })
          setValue('tradeInYear', details?.year)
          setValue('tradeInMake', details?.make)
          setValue('tradeInModel', details?.model)
          setCustomer({
            tradeInfo: {
              vin: watchTradeInVin,
              year: details?.year,
              make: details?.make,
              model: details?.model,
            },
          })
        } else if (!details) {
          toast.error('Vehicle not found!', { id: toastId })
        }
      },
    }
  )

  useEffect(() => {
    if (!watchTradeInVin) {
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
  }, [setCustomer, setValue, watchTradeInVin])

  return { watchTradeInVin }
}

export default useTradeQuery
