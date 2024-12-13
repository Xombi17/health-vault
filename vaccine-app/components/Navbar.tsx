"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
import { useAuth } from '../app/contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Health Vault</span>
          </Link>
          <div className="hidden sm:flex space-x-4 items-center">
            {user && (
              <>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/vaccinations">Vaccinations</NavLink>
                <NavLink href="/medical-history">Medical History</NavLink>
                <NavLink href="/centers">Diagnostic Centers</NavLink>
                <Button onClick={logout} variant="ghost">Logout</Button>
              </>
            )}
            {!user && (
              <Button asChild variant="default">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
      {children}
    </Link>
  )
}

