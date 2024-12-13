import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // In a real application, you would fetch this data from a database
  const centers = [
    { id: 1, name: 'City Hospital', availability: 'High', cost: '$$$', distance: '2 km' },
    { id: 2, name: 'Community Clinic', availability: 'Medium', cost: '$$', distance: '5 km' },
  ]

  return NextResponse.json(centers)
}

