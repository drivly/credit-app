'use client'

import useCustomer from '@/app/store'
import { getBuild } from '@/app/utils/getBuild'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

const useTradeQuery = (setPayload: Dispatch<any>) => {
  const { watch, setValue } = useFormContext()
  const [customer, setCustomer] = useCustomer((s) => [s.customer, s.setCustomer])
  const watchTradeInVin = watch('tradeInVin')

  console.log('watchTradeInVin', watchTradeInVin, customer)

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
      setValue('tradeInVin', '')
      setValue('tradeInAllowance', '')
      setValue('tradeInYear', '')
      setValue('tradeInMake', '')
      setValue('tradeInModel', '')
      setValue('tradeInLienIndicator', '')
      setValue('tradeInLienHoldername', '')
      setValue('tradeInGrossPayOffAmount', '')
      setValue('tradeInOtherLienHoldername', '')
      setPayload({})
      setCustomer({
        tradeInfo: {
          vin: '',
          year: '',
          make: '',
          model: '',
        },
      })
    }
  }, [setCustomer, setPayload, setValue, watchTradeInVin])

  return { watchTradeInVin }
}

export default useTradeQuery
