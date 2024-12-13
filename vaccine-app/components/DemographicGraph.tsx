"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { age: '0-18', count: 250 },
  { age: '19-30', count: 300 },
  { age: '31-50', count: 400 },
  { age: '51-70', count: 350 },
  { age: '71+', count: 200 },
]

export default function DemographicGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

