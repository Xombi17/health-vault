import { NextResponse } from 'next/server'

let reminders = [
  {
    id: '1',
    title: 'Take Blood Pressure Medicine',
    time: '8:00 AM',
    type: 'medication'
  },
  {
    id: '2',
    title: 'Lab Test',
    time: '11:00 AM',
    type: 'test'
  }
]

export async function GET() {
  return NextResponse.json(reminders)
}

export async function POST(request: Request) {
  const newReminder = await request.json()
  newReminder.id = String(reminders.length + 1)
  reminders.push(newReminder)
  return NextResponse.json(newReminder)
}

export async function PUT(request: Request) {
  const updatedReminder = await request.json()
  reminders = reminders.map(rem => 
    rem.id === updatedReminder.id ? updatedReminder : rem
  )
  return NextResponse.json(updatedReminder)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  reminders = reminders.filter(rem => rem.id !== id)
  return NextResponse.json({ message: 'Reminder deleted' })
}

