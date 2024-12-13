import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const userData = await request.json()

  if (db.getUserByAadhaar(userData.aadhaar)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const newUser = db.createUser(userData)
  const { password, ...userWithoutPassword } = newUser

  return NextResponse.json(userWithoutPassword)
}

