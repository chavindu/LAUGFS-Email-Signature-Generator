"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, Save } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CreateSignaturePage() {
  const [signatureData, setSignatureData] = useState({
    name: "",
    fullName: "CHAVINDU NUWANPRIYA",
    designation: "Senior Executive",
    department: "IT Service Management",
    mobile: "+94 74 34 15 163",
    direct: "+94 11 55 66 413",
    extension: "6413",
    template: "laugfs",
    logoUrl: "/placeholder.svg?height=64&width=208",
  })

  const [showPreview, setShowPreview] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert("Signature saved successfully!")
  }

  const generateSignatureHTML = () => {
    return `
    <table style="float: left;border: none;width:670.5pt;border-collapse:collapse;margin-left:6.75pt;margin-right: 6.75pt;">
      <tbody>
        <tr>
          <td style="width: 166.25pt;border-top: none;border-bottom: none;border-left: none;border-image: initial;border-right: 1pt solid windowtext;padding: 0in 0in 0in 0.2in;height: 30.5pt;vertical-align: top;">
            <p style='margin-top:12.0pt;margin-right:0in;margin-bottom:8.0pt;margin-left:-14.05pt;line-height:115%;font-size:16px;font-family:"Aptos",sans-serif;'>
              <img width="208" height="64" src="${signatureData.logoUrl}" alt="Company Logo">
            </p>
          </td>
          <td style="width: 2.5in;border-top: none;border-bottom: none;border-left: none;border-image: initial;border-right: 1pt solid windowtext;padding: 0in 0in 0in 0.2in;height: 30.5pt;vertical-align: top;">
            <p style='margin-top:12.0pt;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:normal;font-size:16px;font-family:"Aptos",sans-serif;'><strong>${signatureData.fullName}</strong></p>
            <p style='margin-top:12.0pt;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:normal;font-size:16px;font-family:"Aptos",sans-serif;'>${signatureData.designation}</p>
            <p style='margin-top:12.0pt;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:normal;font-size:16px;font-family:"Aptos",sans-serif;'>${signatureData.department}</p>
          </td>
          <td style="width: 324.25pt;border: none;padding: 0in 0in 0in 0.2in;height: 30.5pt;vertical-align: top;">
            <p style='margin-top:12.0pt;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:normal;font-size:16px;font-family:"Aptos",sans-serif;'>3<sup>rd</sup> Floor, No 101, Maya Avenue, Colombo 6, Sri Lanka.</p>
            <p style='margin-top:12.0pt;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:normal;font-size:16px;font-family:"Aptos",sans-serif;'>Mobile: ${signatureData.mobile} | Tel: +94 11 55 66 222</p>
            <p style='margin-top:12.0pt;margin-right:0in;margin-bottom:8.0pt;margin-left:0in;line-height:normal;font-size:16px;font-family:"Aptos",sans-serif;'>Direct: ${signatureData.direct} | Ext: ${signatureData.extension}</p>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="width:670.5pt;background:#FFC000;padding:0in 0in 0in .2in;height:11.15pt;">
            <p style='margin-top:0in;margin-right:0in;margin-bottom:0in;margin-left:0in;line-height:115%;font-size:16px;font-family:"Aptos",sans-serif;'><span style="color:#467886;text-decoration:underline;"><a href="http://www.laugfs.lk/" target="_blank"><strong>www.laugfs.lk</strong></a><strong>&nbsp;</strong></span></p>
          </td>
        </tr>
      </tbody>
    </table>
  `
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
            <h1 className="text-2xl font-bold text-gray-900">Create Email Signature</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Signature
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Signature Details</CardTitle>
              <CardDescription>Fill in your information to create a professional email signature</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Signature Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Professional, Marketing Campaign"
                    value={signatureData.name}
                    onChange={(e) => setSignatureData({ ...signatureData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Company Logo URL</Label>
                  <Input
                    id="logoUrl"
                    placeholder="Enter logo image URL"
                    value={signatureData.logoUrl}
                    onChange={(e) => setSignatureData({ ...signatureData, logoUrl: e.target.value })}
                  />
                  <p className="text-sm text-gray-500">
                    Upload your logo to an image hosting service and paste the URL here
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={signatureData.fullName}
                    onChange={(e) => setSignatureData({ ...signatureData, fullName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={signatureData.designation}
                      onChange={(e) => setSignatureData({ ...signatureData, designation: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={signatureData.department}
                      onChange={(e) => setSignatureData({ ...signatureData, department: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                      id="mobile"
                      value={signatureData.mobile}
                      onChange={(e) => setSignatureData({ ...signatureData, mobile: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direct">Direct Line</Label>
                    <Input
                      id="direct"
                      value={signatureData.direct}
                      onChange={(e) => setSignatureData({ ...signatureData, direct: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extension">Extension</Label>
                  <Input
                    id="extension"
                    value={signatureData.extension}
                    onChange={(e) => setSignatureData({ ...signatureData, extension: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {showPreview && (
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>This is how your signature will appear in emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white">
                  <div dangerouslySetInnerHTML={{ __html: generateSignatureHTML() }} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
