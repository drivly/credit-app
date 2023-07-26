'use client'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Something went wrong! {error.name}</h2>
        <pre className='text-lg font-medium text-red-700'>{error.message}</pre>
        <p>{error.stack}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
