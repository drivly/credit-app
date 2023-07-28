import JointAddr from './JointAddr'
import PrimaryAddr from './PrimaryAddr'

export default function Residence(props: any) {
  const { type, section } = props

  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
      <h2 className='font-mont px-5 text-lg font-semibold leading-7 text-gray-900 sm:px-0 sm:text-base'>
        {section.title}
      </h2>

      {type === 'Primary' ? <PrimaryAddr section={section} /> : null}

      {type === 'Joint' ? <JointAddr section={section} /> : null}
    </div>
  )
}
