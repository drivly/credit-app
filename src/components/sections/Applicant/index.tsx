import JointApp from './JointApp'
import PrimaryApp from './PrimaryApp'

export default function Applicant(props: any) {
  const { type, section } = props

  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
      {/* <div className='px-4 sm:px-0'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>{section.title}</h2>
      </div> */}

      {type === 'Primary' ? <PrimaryApp section={section} type={type} /> : null}

      {type === 'Joint' ? <JointApp section={section} type={type} /> : null}
    </div>
  )
}
