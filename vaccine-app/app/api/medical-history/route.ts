import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // In a real application, you would fetch this data from a database
  const medicalHistory = [
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
        {
          id: "d2",
          date: "2022-11-20",
          doctor: "Dr. Johnson",
          diagnosis: "Regular checkup",
          treatment: "Cleaning",
          notes: "No issues found",
          files: [
            { name: "dental-report.pdf", url: "#" }
          ]
        }
      ]
    },
    {
      id: "optical",
      name: "Eye Care",
      records: [
        {
          id: "o1",
          date: "2023-03-10",
          doctor: "Dr. Lee",
          diagnosis: "Myopia progression",
          treatment: "Updated prescription",
          notes: "New glasses ordered",
          files: [
            { name: "eye-test.pdf", url: "#" },
            { name: "prescription.jpg", url: "#" }
          ]
        }
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
        {
          id: "g2",
          date: "2022-09-12",
          doctor: "Dr. Davis",
          diagnosis: "Flu",
          treatment: "Prescribed antivirals",
          notes: "Rest and hydration recommended",
          files: [
            { name: "prescription.pdf", url: "#" }
          ]
        }
      ]
    }
  ]

  return NextResponse.json(medicalHistory)
}

