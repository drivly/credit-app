import { create } from 'zustand'

type Customer = {
  name?: string
  email?: string
  vin?: string
  vehicleYear?: string
  vehicleMake?: string
  vehicleModel?: string
  applicationId?: string
  vehiclePrice?: string
  vehicleMileage?: string
}

type AppStore = {
  customer: Customer | null
  setCustomer: (state?: {
    name?: string
    email?: string
    applicationId?: string
    vin?: string
    vehicleYear?: string
    vehicleMake?: string
    vehicleModel?: string
    vehicleMileage?: string
    vehiclePrice?: string
  }) => void
  resetCustomer: () => void
}

const useCustomer = create<AppStore>((set, get) => ({
  customer: null,
  setCustomer: (state?: any) => {
    const updatedState = { ...get().customer, ...state }
    set({ customer: updatedState })
  },
  resetCustomer: () => set({ customer: null }),
}))

export default useCustomer
