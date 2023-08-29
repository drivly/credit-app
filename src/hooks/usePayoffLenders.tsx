'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const usePayoffLenders = () => {
  const { setValue } = useFormContext()
  const searchParams = useSearchParams()

  const tradeWanted = searchParams.get('tradeInVehicleIndicator')?.toString()
  const [isTrade, setTrade] = React.useState(Boolean(tradeWanted))
  const [lenders, setLenders] = React.useState<Record<string, any>[]>([])

  useEffect(() => {
    if (!isTrade) {
      setValue('tradeInVin', '')
      setValue('tradeInAllowance', '')
      setValue('tradeInYear', '')
      setValue('tradeInMake', '')
      setValue('tradeInModel', '')
      setValue('tradeInLienIndicator', '')
      setValue('tradeInLienHoldername', '')
      setValue('tradeInGrossPayOffAmount', '')
      setValue('tradeInOtherLienHoldername', '')
    }
  }, [isTrade, setValue])

  useEffect(() => {
    const getPayoffLenders = async () => {
      const { data } = await fetch('https://credit.api.driv.ly/fields').then((res) => res.json())
      const lenders = await data?.ancillaryServices[0].financeSourceList
      const sortedLenders = sortByFsName(lenders)
      setLenders(sortedLenders)
    }
    if (isTrade) {
      getPayoffLenders()
    }
  }, [isTrade])
  
  const lenderCats = [
    { value: '', optionName: 'Select' },
    { value: 'idk', optionName: "I don't know" },
    { value: 'other', optionName: 'Other' },
    ...lenders.map((item) => ({ value: item.fsId, optionName: item.fsName })),
  ]

  return { lenders, lenderCats, isTrade, setTrade }
}

export default usePayoffLenders

function sortByFsName(arr: Record<string, any>[]) {
  return arr.slice().sort((a, b) => a.fsName.localeCompare(b.fsName))
}
