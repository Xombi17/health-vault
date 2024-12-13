import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const formData = await request.formData()
  const files = formData.getAll('files') as File[]

  if (files.length === 0) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
  }

  const uploadedFiles = []

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${uuidv4()}_${file.name}`
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename)

    try {
      await fs.writeFile(filepath, buffer)
      uploadedFiles.push({
        name: file.name,
        url: `/uploads/${filename}`,
      })
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error)
      return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 })
    }
  }

  // Here you would typically update the user's medical history in the database
  // This is a simulated database operation
  const updatedMedicalHistory = {
    // ... existing medical history data
    files: uploadedFiles,
  }

  return NextResponse.json({ success: true, files: uploadedFiles })
}

