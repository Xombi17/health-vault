import { NextResponse } from 'next/server'

// Mock user data - in a real app, this would come from a database
const users = {
  '1': {
    id: '1',
    name: 'User One',
    email: 'user1@example.com',
    aadhaar: '123456789012',
    dob: '1990-01-01',
    phone: '1234567890',
  },
  '2': {
    id: '2',
    name: 'User Two',
    email: 'user2@example.com',
    aadhaar: '987654321098',
    dob: '1995-05-05',
    phone: '9876543210',
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = users[params.id]
  if (user) {
    return NextResponse.json(user)
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  if (users[params.id]) {
    users[params.id] = { ...users[params.id], ...data }
    return NextResponse.json(users[params.id])
  }
  return NextResponse.json({ error: 'User not found' }, { status: 404 })
}

