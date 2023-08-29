import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const data = await fetch(`https://credit.api.driv.ly/payoff`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())

    if (data.error) throw new Error(data.error)

    return NextResponse.json(data)
  } catch (error: any) {
    console.log('error', error)
    return NextResponse.json({ error: error.message, status: 500 })
  }
}
