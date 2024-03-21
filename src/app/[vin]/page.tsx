import Form from '@/components/Form'
import useCustomer from '../../store'
import StoreInitializer from '../../store/StoreInitializer'
import { getVehicleById, getVehicleDetails } from '@/lib/actions/vehicle.action'

export default async function VinPage({ params }: { params: { vin: string } }) {
  const vdp =
    params.vin.length < 17 ? await getVehicleById(params.vin) : await getVehicleDetails(params.vin)

  useCustomer.setState({
    customer: {
      vehicleMileage: vdp?.miles,
      vehiclePrice: vdp?.price,
      vehicleYear: vdp?.year,
      vehicleMake: vdp?.make,
      vehicleModel: vdp?.model,
    },
  })

  return (
    <div className='mx-auto my-8 mb-16 max-w-[1200px] py-10 max-[1200px]:my-0 sm:p-4 md:p-10'>
      <Form vdp={vdp} />
      <StoreInitializer
        vehicleMileage={vdp?.miles}
        vehiclePrice={vdp?.price}
        vehicleYear={vdp?.year}
        vehicleMake={vdp?.make}
        vehicleModel={vdp?.model}
      />
    </div>
  )
}
