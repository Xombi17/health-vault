import { NextResponse } from 'next/server'

let appointments = [
  {
    id: '1',
    title: 'General Checkup',
    date: '2024-01-15',
    time: '10:00 AM',
    doctor: 'Dr. Smith',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Dental Cleaning',
    date: '2024-01-20',
    time: '2:30 PM',
    doctor: 'Dr. Johnson',
    status: 'upcoming'
  }
]

export async function GET() {
  return NextResponse.json(appointments)
}

export async function POST(request: Request) {
  const newAppointment = await request.json()
  newAppointment.id = String(appointments.length + 1)
  appointments.push(newAppointment)
  return NextResponse.json(newAppointment)
}

export async function PUT(request: Request) {
  const updatedAppointment = await request.json()
  appointments = appointments.map(app => 
    app.id === updatedAppointment.id ? updatedAppointment : app
  )
  return NextResponse.json(updatedAppointment)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  appointments = appointments.filter(app => app.id !== id)
  return NextResponse.json({ message: 'Appointment deleted' })
}

