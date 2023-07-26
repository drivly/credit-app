import { useFormContext } from 'react-hook-form'
import RadioButton from '../form-fields/RadioButton'

interface AgreementProps {
  isError: boolean
  onClick: () => void
}

export default function Agreement({ isError, onClick }: AgreementProps) {
  const methods = useFormContext()

  return (
    <div className='col-span-3 grid grid-cols-1 gap-y-8 pt-10 md:ml-3 md:grid-cols-3'>
      <div className='col-span-3 col-start-2'>
        <h4 className='rounded-[4px] bg-LIGHT_GRAY p-2 text-center text-base font-medium text-txtPrimaryColor'>
          Please read this section before in its entirety before submitting this application!
        </h4>
      </div>
      <div className='col-span-3 col-start-2'>
        <p className='text-sm text-gray-900'>
          I authorize Dealer (&quot;you&quot; and &quot;your&quot;) and any finance company, bank,
          or other financial institution to which the Dealer submits my application to investigate
          my credit and employment history, obtain credit reports, and release information about
          your credit experience with me as the law permits.
        </p>
      </div>
      <div className='col-span-3 col-start-2'>
        <p className='text-sm text-gray-900'>
          If an account is created, I authorize you to obtain credit reports for the purpose of
          reviewing or taking collection action on the account, or for other legitimate purposes
          associated with the account.
        </p>
      </div>
      <div className='col-span-3 col-start-2 flex w-full'>
        <div className='flex w-full'>
          <RadioButton
            {...methods.register('agree')}
            label='I confirm that I have read and agree to the terms of this application, and that all information provided is accurate and truthful.'
            errormsg={isError ? 'Required' : ''}
            onClick={onClick}
            value='YES'
            id='agree'
          />
        </div>
      </div>
    </div>
  )
}
