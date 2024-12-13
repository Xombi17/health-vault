"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Camera, Upload } from 'lucide-react'

export default function VaccinationRecords() {
  const [vaccines, setVaccines] = useState([])
  const [newVaccine, setNewVaccine] = useState({ name: '', date: '', nextDose: '' })
  const { toast } = useToast()
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        const response = await fetch('/api/vaccinations')
        const data = await response.json()
        setVaccines(data)
      } catch (error) {
        console.error('Failed to fetch vaccinations:', error)
        toast({
          title: "Error",
          description: "Failed to fetch vaccinations. Please try again.",
          variant: "destructive",
        })
      }
    }
    fetchVaccinations()
  }, [toast])

  const handleAddVaccine = async () => {
    if (!newVaccine.name || !newVaccine.date) {
      toast({
        title: "Error",
        description: "Please fill in at least the vaccine name and date.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/vaccinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVaccine),
      })
      const data = await response.json()
      setVaccines([...vaccines, data]) 
      setNewVaccine({ name: '', date: '', nextDose: '' })
      toast({
        title: "Success",
        description: "Vaccination record added successfully.",
      })
    } catch (error) {
      console.error('Failed to add vaccination:', error)
      toast({
        title: "Error",
        description: "Failed to add vaccination. Please try again.",
        variant: "destructive",
      })
    }
  }

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      videoRef.current.srcObject = stream
      setIsScanning(true)
    } catch (error) {
      console.error('Failed to start camera:', error)
      toast({
        title: "Error",
        description: "Failed to start camera. Please check your permissions.",
        variant: "destructive",
      })
    }
  }

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
    }
    setIsScanning(false)
  }

  const captureImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    canvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('certificate', blob, 'certificate.jpg')

      try {
        const response = await fetch('/api/scan-certificate', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        if (data.success) {
          setVaccines([...vaccines, data.vaccine])
          toast({
            title: "Success",
            description: "Vaccination certificate scanned and added successfully.",
          })
        } else {
          throw new Error(data.error || 'Failed to process certificate')
        }
      } catch (error) {
        console.error('Failed to process certificate:', error)
        toast({
          title: "Error",
          description: "Failed to process certificate. Please try again.",
          variant: "destructive",
        })
      } finally {
        stopScanning()
      }
    }, 'image/jpeg')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Vaccination Records</CardTitle>
          <CardDescription>Keep track of your vaccinations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vaccine</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Next Dose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {vaccines.map((vaccine) => (
                  <TableRow key={vaccine.id}>
                    <motion.td
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {vaccine.name}
                    </motion.td>
                    <motion.td
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {vaccine.date}
                    </motion.td>
                    <motion.td
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {vaccine.nextDose}
                    </motion.td>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex space-x-2 w-full">
            <Input 
              placeholder="Vaccine Name" 
              value={newVaccine.name} 
              onChange={(e) => setNewVaccine({...newVaccine, name: e.target.value})}
            />
            <Input 
              type="date" 
              value={newVaccine.date} 
              onChange={(e) => setNewVaccine({...newVaccine, date: e.target.value})}
            />
            <Input 
              type="date" 
              value={newVaccine.nextDose} 
              onChange={(e) => setNewVaccine({...newVaccine, nextDose: e.target.value})}
            />
            <Button onClick={handleAddVaccine}>Add</Button>
          </div>
          <div className="flex justify-center w-full">
            {isScanning ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full max-w-md"
                  onError={() => {
                    toast({
                      title: "Error",
                      description: "Failed to access camera stream",
                      variant: "destructive",
                    });
                    stopScanning();
                  }}
                />
                <div className="flex gap-2">
                  <Button onClick={captureImage}><Camera className="mr-2 h-4 w-4" /> Capture</Button>
                  <Button onClick={stopScanning} variant="destructive">Stop</Button>
                </div>
              </div>
            ) : (
              <Button onClick={startScanning}><Upload className="mr-2 h-4 w-4" /> Scan Certificate</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

