import { FormEvent, useEffect, useState } from 'react'

const useHasChanged = () => {
  const [hasChanged, setHasChanged] = useState(false)

  useEffect(() => {
    if (!hasChanged) return

    function handleOnBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleOnBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload)
    }
  }, [hasChanged])

  const handleOnChange = (event: FormEvent) => {
    const data = new FormData(event.currentTarget as HTMLFormElement)
    const values = Array.from(data.values())
    const changedFields = values.filter((value) => (value as string).length || (value as File).size)
    setHasChanged(Boolean(changedFields.length))
  }
  return { handleOnChange }
}

export default useHasChanged
