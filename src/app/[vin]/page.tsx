import Form from '@/components/Form'
import { getVehicleDetails } from '@/app/utils/getVehicleDetails'
import { getAirtableVehicle } from '../utils/getAirtableVehicle'

export default async function VinPage({ params }: { params: { vin: string } }) {
  const vdp =
    params.vin.length < 17
      ? await getAirtableVehicle(params.vin)
      : await getVehicleDetails(params.vin)

  return (
    <div className='mx-auto my-8 mb-16 max-w-[1200px] p-4 py-10 max-[1200px]:my-0 md:p-10'>
      <Form vdp={vdp} />
    </div>
  )
}
