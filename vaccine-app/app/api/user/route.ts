import { NextResponse } from 'next/server'

// Mock user data - in a real app, this would come from a database
const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  aadhaar: '123456789012',
  dob: '1990-01-01',
  phone: '1234567890',
}

export async function GET() {
  return NextResponse.json(user)
}

export async function PUT(request: Request) {
  const data = await request.json()
  // In a real app, you would update the user in the database here
  Object.assign(user, data)
  return NextResponse.json(user)
}

