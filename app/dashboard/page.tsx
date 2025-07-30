"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Mail, Plus, Settings, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const user = {
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Marketing",
  }

  const signatures = [
    {
      id: 1,
      name: "LAUGFS Corporate",
      isActive: true,
      lastModified: "2024-01-15",
      template: "laugfs",
    },
    {
      id: 2,
      name: "Professional",
      isActive: false,
      lastModified: "2024-01-10",
      template: "professional",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SignatureSync</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">Manage your email signatures for {user.email}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Signature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Professional</div>
              <p className="text-sm text-gray-600">Currently applied</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Signatures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{signatures.length}</div>
              <p className="text-sm text-gray-600">Created signatures</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{user.department}</div>
              <p className="text-sm text-gray-600">Team assignment</p>
            </CardContent>
          </Card>
        </div>

        {/* Signatures Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Your Signatures</h3>
          <div className="flex gap-2">
            <Link href="/signature/templates">
              <Button variant="outline">Browse Templates</Button>
            </Link>
            <Link href="/signature/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Signature
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {signatures.map((signature) => (
            <Card key={signature.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{signature.name}</h4>
                      <p className="text-sm text-gray-600">Last modified: {signature.lastModified}</p>
                    </div>
                    {signature.isActive && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/signature/edit/${signature.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    {!signature.isActive && <Button size="sm">Apply to Outlook</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
