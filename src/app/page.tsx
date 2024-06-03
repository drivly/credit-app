import Form from '@/components/Form'
import getTenant from '@/lib/actions/getTeanant'

interface HomePageProps {
  searchParams: {
    tenant?: string
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const tenantQuery = await getTenant(searchParams)

  return (
    <div className='mx-auto my-8 mb-16 max-w-[1200px] py-10 max-[1200px]:my-0 sm:p-4 md:p-10'>
      <Form tenant={tenantQuery} />
    </div>
  )
}
