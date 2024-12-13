import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you'd use a proper database.
const mockMedicalHistory = {
  '1': [
    {
      id: "dental",
      name: "Dental Records",
      records: [
        {
          id: "d1",
          date: "2023-05-15",
          doctor: "Dr. Smith",
          diagnosis: "Cavity in molar",
          treatment: "Filling",
          notes: "Follow-up in 6 months",
          files: [
            { name: "x-ray.pdf", url: "#" },
            { name: "prescription.pdf", url: "#" }
          ]
        },
      ]
    },
    {
      id: "general",
      name: "General Health",
      records: [
        {
          id: "g1",
          date: "2023-01-05",
          doctor: "Dr. Brown",
          diagnosis: "Annual physical",
          treatment: "None required",
          notes: "All vitals normal, recommended more exercise",
          files: [
            { name: "blood-work.pdf", url: "#" },
            { name: "health-report.pdf", url: "#" }
          ]
        },
      ]
    }
  ]
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId

  // Simulate a delay to mimic a real database query
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Check if the user exists in our mock database
  if (!mockMedicalHistory[userId]) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Return the medical history for the user
  return NextResponse.json(mockMedicalHistory[userId])
}

