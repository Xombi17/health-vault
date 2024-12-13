import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // In a real application, this would fetch from a database
  const dashboardData = {
    appointments: [
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
    reminders: [
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
    ],
    healthScore: 85
  }

  return NextResponse.json(dashboardData)
}

