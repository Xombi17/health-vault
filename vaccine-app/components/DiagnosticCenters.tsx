"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

// Add interface for center type
interface DiagnosticCenter {
  id: string;
  name: string;
  availability: string;
  cost: string;
  distance: string;
}

export default function DiagnosticCenters() {
  const [centers, setCenters] = useState<DiagnosticCenter[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch('/api/centers')
        const data = await response.json()
        setCenters(data)
      } catch (error) {
        console.error('Failed to fetch diagnostic centers:', error)
        toast({
          title: "Error",
          description: "Failed to fetch diagnostic centers. Please try again.",
          variant: "destructive",
        })
      }
    }
    fetchCenters()
  }, [toast])

  const filteredCenters = centers.filter(center =>
    center.name?.toLowerCase().includes(searchTerm.toLowerCase() || '')
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Centers</CardTitle>
          <CardDescription>Find nearby diagnostic centers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Distance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCenters.map((center) => (
                <TableRow
                  key={center.id}
                  className="transition-opacity duration-300"
                >
                  <TableCell>{center.name}</TableCell>
                  <TableCell>{center.availability}</TableCell>
                  <TableCell>{center.cost}</TableCell>
                  <TableCell>{center.distance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}

