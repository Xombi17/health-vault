"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VaccinationRecords from './VaccinationRecords'
import HealthTasks from './HealthTasks'
import DiagnosticCenters from './DiagnosticCenters'
import Profile from './Profile'
import HealthWidget from './HealthWidget'
import VaccineProgressWidget from './VaccineProgressWidget'
import DemographicGraph from './DemographicGraph'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="flex flex-col w-full max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Health Vault</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <HealthWidget />
        <VaccineProgressWidget />
        <DemographicGraph />
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          <TabsTrigger value="tasks">Health Tasks</TabsTrigger>
          <TabsTrigger value="centers">Diagnostic Centers</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="vaccinations">
          <VaccinationRecords />
        </TabsContent>
        <TabsContent value="tasks">
          <HealthTasks />
        </TabsContent>
        <TabsContent value="centers">
          <DiagnosticCenters />
        </TabsContent>
      </Tabs>
    </div>
  )
}

