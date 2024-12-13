import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const { aadhaar, dob, phone } = await request.json()

  const user = db.getUserByAadhaar(aadhaar)

  if (user && user.dob === dob && user.phone === phone) {
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}

