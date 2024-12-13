import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // In a real application, you would fetch this data from a database
  // based on the authenticated user's ID
  const profile = {
    name: 'John Doe',
    email: 'john@example.com',
    dob: '1990-01-01',
    gender: 'Male',
    uniqueId: 'HV12345678',
  }

  return NextResponse.json(profile)
}

export async function POST(request: Request) {
  const data = await request.json()
  
  // Here you would typically save this data to a database
  // For now, we'll just generate a unique ID and return it
  const uniqueId = 'HV' + Math.random().toString(36).substr(2, 8).toUpperCase()

  return NextResponse.json({ ...data, uniqueId })
}

