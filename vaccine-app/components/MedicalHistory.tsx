"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Folder, Upload, File, X } from 'lucide-react'
import { useAuth } from '@/app/contexts/AuthContext'

interface MedicalRecord {
  id: string
  date: string
  doctor: string
  diagnosis: string
  treatment: string
  notes: string
  files?: { name: string; url: string }[]
}

interface MedicalDomain {
  id: string
  name: string
  records: MedicalRecord[]
}

export default function MedicalHistory() {
  const [domains, setDomains] = useState<MedicalDomain[]>([])
  const [activeTab, setActiveTab] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to upload files.",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    acceptedFiles.forEach((file) => {
      formData.append('files', file)
    })

    try {
      const response = await fetch(`/api/medical-history/${user.id}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload files')
      }

      const result = await response.json()
      toast({
        title: "Success",
        description: `Successfully uploaded ${acceptedFiles.length} files`,
      })

      // Refresh the medical history data
      fetchMedicalHistory()
    } catch (error) {
      console.error('Error uploading files:', error)
      toast({
        title: "Error",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      })
    }
  }, [user, toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    }
  })

  const fetchMedicalHistory = useCallback(async () => {
    if (!user) {
      setError("You must be logged in to view medical history.")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/medical-history/${user.id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setDomains(data)
      if (data.length > 0) {
        setActiveTab(data[0].id)
      }
    } catch (error) {
      console.error('Failed to fetch medical history:', error)
      setError("Failed to fetch medical history. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to fetch medical history",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [user, toast])

  useEffect(() => {
    fetchMedicalHistory()
  }, [fetchMedicalHistory])

  if (isLoading) {
    return <div>Loading medical history...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm">
              {isDragActive
                ? "Drop the files here..."
                : "Drag & drop files here, or click to select files"}
            </p>
          </CardContent>
        </Card>
      </div>

      {domains.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-4 mb-4">
            {domains.map((domain) => (
              <TabsTrigger
                key={domain.id}
                value={domain.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Folder className="mr-2 h-4 w-4" />
                {domain.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {domains.map((domain) => (
              <TabsContent key={domain.id} value={domain.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {domain.records.map((record) => (
                    <motion.div
                      key={record.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <File className="mr-2 h-4 w-4" />
                            {new Date(record.date).toLocaleDateString()}
                          </CardTitle>
                          <CardDescription>{record.doctor}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <p className="font-medium">Diagnosis</p>
                            <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                          </div>
                          <div>
                            <p className="font-medium">Treatment</p>
                            <p className="text-sm text-muted-foreground">{record.treatment}</p>
                          </div>
                          {record.notes && (
                            <div>
                              <p className="font-medium">Notes</p>
                              <p className="text-sm text-muted-foreground">{record.notes}</p>
                            </div>
                          )}
                          {record.files && record.files.length > 0 && (
                            <div>
                              <p className="font-medium mb-2">Attachments</p>
                              <div className="flex flex-wrap gap-2">
                                {record.files.map((file, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                    asChild
                                  >
                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                      <File className="mr-1 h-3 w-3" />
                                      {file.name}
                                    </a>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No medical history records found.</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}

