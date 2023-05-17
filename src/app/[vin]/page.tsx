import Form from '@/components/Form'
import { getVehicleDetails } from '@/utils/getVehicleDetails'

export default async function VinPage({ params }: { params: { vin: string } }) {
  const vdp = await getVehicleDetails(params.vin)

  return (
    <div className='mx-auto my-8 mb-16 max-w-[1200px] rounded-[5px] p-4 drop-shadow-sm max-[1200px]:my-0 md:p-10'>
      <div className='bg-BG_BASE_CARD mb-8 space-y-10 divide-y divide-gray-900/10'>
        <Form vdp={vdp} />
      </div>
    </div>
  )
}