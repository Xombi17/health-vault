import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('certificate') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${uuidv4()}_${file.name}`
  const filepath = path.join(process.cwd(), 'public', 'uploads', filename)

  try {
    await fs.writeFile(filepath, buffer)

    // Here you would typically use an OCR service to extract data from the image
    // For this example, we'll simulate extracting data
    const extractedData = {
      name: 'COVID-19 Vaccine',
      date: '2023-06-15',
      nextDose: '2023-12-15',
    }

    // Save the extracted data to the database
    // This is a simulated database operation
    const newVaccine = {
      id: uuidv4(),
      ...extractedData,
      certificateUrl: `/uploads/${filename}`,
    }

    return NextResponse.json({ success: true, vaccine: newVaccine })
  } catch (error) {
    console.error('Error processing certificate:', error)
    return NextResponse.json({ error: 'Failed to process certificate' }, { status: 500 })
  }
}

