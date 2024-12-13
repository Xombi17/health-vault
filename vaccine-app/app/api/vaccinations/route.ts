import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // In a real application, you would fetch this data from a database
  const vaccinations = [
    { id: 1, name: 'COVID-19', date: '2021-05-01', nextDose: '2021-05-29' },
    { id: 2, name: 'Flu', date: '2022-10-15', nextDose: '2023-10-15' },
  ]

  return NextResponse.json(vaccinations)
}

export async function POST(request: Request) {
  const data = await request.json()
  
  // Here you would typically save this data to a database
  // For now, we'll just return the data with a generated ID
  const newVaccination = { id: Date.now(), ...data }

  return NextResponse.json(newVaccination)
}

