import { NextResponse } from 'next/server'

// Mock appointments data
const appointmentsByUser = {
  '1': [
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
  ],
  '2': [
    {
      id: '3',
      title: 'Eye Exam',
      date: '2024-01-18',
      time: '11:00 AM',
      doctor: 'Dr. Lee',
      status: 'upcoming'
    }
  ]
}

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const appointments = appointmentsByUser[params.userId] || []
  return NextResponse.json(appointments)
}

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const newAppointment = await request.json()
  newAppointment.id = String(Date.now())
  if (!appointmentsByUser[params.userId]) {
    appointmentsByUser[params.userId] = []
  }
  appointmentsByUser[params.userId].push(newAppointment)
  return NextResponse.json(newAppointment)
}

export async function PUT(request: Request, { params }: { params: { userId: string } }) {
  const updatedAppointment = await request.json()
  const appointments = appointmentsByUser[params.userId]
  if (appointments) {
    const index = appointments.findIndex(app => app.id === updatedAppointment.id)
    if (index !== -1) {
      appointments[index] = updatedAppointment
      return NextResponse.json(updatedAppointment)
    }
  }
  return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  const { id } = await request.json()
  const appointments = appointmentsByUser[params.userId]
  if (appointments) {
    appointmentsByUser[params.userId] = appointments.filter(app => app.id !== id)
    return NextResponse.json({ message: 'Appointment deleted' })
  }
  return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
}

