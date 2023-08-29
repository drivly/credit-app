'use client'

import useCustomer from '@/app/store'
import { getPayoffQuote } from '@/app/utils/getPayoffQuote'
import React, { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

const usePayoffQuery = ({
  watchTradeInVin,
  lenders,
}: {
  watchTradeInVin: string
  lenders: Record<string, any>[]
}) => {
  const [customer, setCustomer] = useCustomer((s) => [s.customer, s.setCustomer])
  const { setValue, setFocus, watch } = useFormContext()
  const [isReady, setReady] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [payload, setPayload] = React.useState<any>({})
  const tradeRef = React.useRef<HTMLDivElement>(null)
  const watchLienName = watch('tradeInLienHoldername')
  const isLienOther = watchLienName === 'other' || watchLienName === 'idk'
  const ssn = watch('ssn')

  useEffect(() => {
    if (watchLienName && !isLienOther) {
      const needsSSN = lenders
        .find((lender) => lender.fsId === watchLienName)
        ?.serviceOptions.find((item: any) => item.option === 'SSNTXID')
      const socialSecurity = ssn?.replace(/-/g, '')
      const payoffRequest = needsSSN
        ? { vin: watchTradeInVin, source: watchLienName, ssn }
        : { vin: watchTradeInVin, source: watchLienName }

      if (needsSSN && !socialSecurity) {
        toast.error('SSN required for trade-in payoff quote')
        setFocus('ssn')
        setReady(false)
      } else if (needsSSN && socialSecurity?.length === 9) {
        setReady(true)
        setPayload(payoffRequest)
        setTimeout(
          () => tradeRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          150
        )
      } else if (!needsSSN) {
        setReady(true)
        setPayload(payoffRequest)
      }
    }
  }, [isLienOther, lenders, setFocus, ssn, watchLienName, watchTradeInVin])

  useEffect(() => {
    if (isReady && payload) {
      const getPayoff = async () => {
        const toastId = toast.loading('Getting payoff quote')
        setLoading(true)
        try {
          const response = await getPayoffQuote(payload)
          console.log('responses trade payoffquote', response)
          if (response) {
            const lenderString = lenders.find((item) => item.fsId === watchLienName)?.fsName
            toast.success('Payoff Quote Found', { id: toastId })
            setValue('tradeInAllowance', response?.allowance)
            setValue('tradeInGrossPayOffAmount', response?.quote?.grossPayOffAmount)
            setCustomer({
              ...customer,
              tradeInfo: {
                ...customer?.tradeInfo,
                fsId: watchLienName,
                lienholder: lenderString,
                tradeInAllowance: response?.allowance,
                grossPayOffAmount: response?.quote?.grossPayOffAmount,
                id: response?.id,
              },
            })
            console.log('req', response)
          } else {
            toast.error('Failed to get payoff quote', { id: toastId })
          }
        } catch (error: any) {
          console.error('error', error)
          toast.error(error.message || 'Failed to get payoff quote', { id: toastId })
        } finally {
          setLoading(false)
        }
      }
      getPayoff()
    }

    
  }, [isReady, lenders, payload, watchLienName])

  return { tradeRef, isLienOther, isLoading }
}

export default usePayoffQuery



  
  
