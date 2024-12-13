"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import { useAuth } from './contexts/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-background to-secondary">
      <main className="text-center px-4">
        <motion.h1 
          className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to <span className="text-primary">Health Vault</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your personal health companion. Securely manage your vaccinations, health tasks, and find nearby diagnostic centers.
        </motion.p>
        <motion.div 
          className="flex justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {user ? (
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="lg">
              <Link href="/login">Get Started</Link>
            </Button>
          )}
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </motion.div>
        <motion.div 
          id="features" 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FeatureCard 
            title="Vaccination Tracking" 
            description="Keep all your vaccination records in one place and never miss a booster shot."
          />
          <FeatureCard 
            title="Health Task Management" 
            description="Stay on top of your health with personalized task reminders and tracking."
          />
          <FeatureCard 
            title="Diagnostic Center Locator" 
            description="Find nearby diagnostic centers sorted by availability, cost, and distance."
          />
        </motion.div>
      </main>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="bg-secondary text-secondary-foreground">
        <CardContent className="p-6">
          <CheckCircle className="mb-4 h-12 w-12 text-primary mx-auto" />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

