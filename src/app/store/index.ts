import { create } from 'zustand'

type Customer = {
  name: string
  email: string
  vin: string
  applicationId: string
}

type AppStore = {
  customer: Customer | null
  setCustomer: (state: {
    name?: string
    email?: string
    applicationId?: string
    vin?: string
  }) => void
}

const useCustomer = create<AppStore>((set, get) => ({
  customer: null,
  setCustomer: (state: any) => {
    const updatedState = { ...get().customer, ...state }
    set({ customer: updatedState })
  },
  resetCustomer: () => set({ customer: null }),
}))

export default useCustomer
