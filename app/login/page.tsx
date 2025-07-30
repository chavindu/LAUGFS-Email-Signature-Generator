"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Shield } from "lucide-react"
import { useState } from "react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleMicrosoftLogin = async () => {
    setIsLoading(true)
    // In a real app, this would redirect to Microsoft OAuth
    // For demo purposes, we'll simulate the login process
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Welcome to SignatureSync</CardTitle>
          <CardDescription>Connect your Microsoft account to manage your email signatures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleMicrosoftLogin} disabled={isLoading} className="w-full h-12 text-base">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sign in with Microsoft
              </div>
            )}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>Secure OAuth 2.0 authentication</p>
            <p className="mt-1">We never store your password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
