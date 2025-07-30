"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("laugfs")

  const templates = [
    {
      id: "laugfs",
      name: "LAUGFS Corporate",
      description: "Official LAUGFS company signature template with logo and branding",
      preview: `
        <div style="font-family: Aptos, sans-serif; font-size: 14px; border: 1px solid #ddd; padding: 16px; background: white;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="border-right: 1px solid #000; padding-right: 16px; width: 200px;">
                <div style="width: 180px; height: 56px; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">
                  LOGO
                </div>
              </td>
              <td style="border-right: 1px solid #000; padding: 0 16px; width: 200px;">
                <div style="font-weight: bold; margin-bottom: 4px;">CHAVINDU NUWANPRIYA</div>
                <div style="margin-bottom: 4px;">Senior Executive</div>
                <div>IT Service Management</div>
              </td>
              <td style="padding-left: 16px;">
                <div style="margin-bottom: 4px;">3rd Floor, No 101, Maya Avenue, Colombo 6, Sri Lanka.</div>
                <div style="margin-bottom: 4px;">Mobile: +94 74 34 15 163 | Tel: +94 11 55 66 222</div>
                <div>Direct: +94 11 55 66 413 | Ext: 6413</div>
              </td>
            </tr>
            <tr>
              <td colspan="3" style="background: #FFC000; padding: 8px; text-align: left;">
                <a href="http://www.laugfs.lk/" style="color: #467886; text-decoration: underline; font-weight: bold;">www.laugfs.lk</a>
              </td>
            </tr>
          </table>
        </div>
      `,
    },
    {
      id: "professional",
      name: "Professional",
      description: "Clean and professional signature template",
      preview: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; border: 1px solid #ddd; padding: 16px; background: white;">
          <div style="border-left: 4px solid #2563eb; padding-left: 16px;">
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">John Doe</div>
            <div style="color: #666; margin-bottom: 2px;">Marketing Manager</div>
            <div style="font-weight: bold; color: #2563eb; margin-bottom: 8px;">Acme Corporation</div>
            <div style="margin-bottom: 2px;">📧 john.doe@company.com</div>
            <div style="margin-bottom: 2px;">📞 +1 (555) 123-4567</div>
            <div>🌐 www.company.com</div>
          </div>
        </div>
      `,
    },
  ]

  const handleUseTemplate = (templateId: string) => {
    // In a real app, this would pass the template data to the create page
    window.location.href = `/signature/create?template=${templateId}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Choose Template</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Select a Signature Template</h2>
          <p className="text-gray-600">Choose from our professional email signature templates</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all ${
                selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {template.name}
                      {selectedTemplate === template.id && <Check className="h-5 w-5 text-blue-600" />}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div dangerouslySetInnerHTML={{ __html: template.preview }} />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    onClick={() => setSelectedTemplate(template.id)}
                    className="flex-1"
                  >
                    {selectedTemplate === template.id ? "Selected" : "Select"}
                  </Button>
                  <Button onClick={() => handleUseTemplate(template.id)} disabled={selectedTemplate !== template.id}>
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
