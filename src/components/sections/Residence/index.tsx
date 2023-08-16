import JointAddr from './JointAddr'
import PrimaryAddr from './PrimaryAddr'

type ResidenceProps = {
  type: string
  section: {
    title: string
    description: string
  }
}

export default function Residence(props: ResidenceProps) {
  const { type, section } = props

  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
      {type === 'Primary' ? <PrimaryAddr section={section} /> : null}

      {type === 'Joint' ? <JointAddr section={section} /> : null}
    </div>
  )
}
