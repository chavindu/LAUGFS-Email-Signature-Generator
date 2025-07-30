"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Combobox } from "@/components/ui/combobox"
import { Mail, RefreshCw, Monitor, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { SignaturePreview } from "@/components/signature-preview"
import { RichTextCopy } from "@/components/rich-text-copy"
import { ImageUpload } from "@/components/image-upload"

const companyDomains = {
  lubricants: { display: "www.laugfslubricants.com", url: "https://www.laugfslubricants.com" },
  international: { display: "www.laugfsinternational.lk", url: "https://www.laugfsinternational.lk" },
  holdings: { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  gas: { display: "www.laugfsgas.lk", url: "https://www.laugfsgas.lk" },
  engineering: { display: "www.laugfsengineering.lk", url: "https://www.laugfsengineering.lk" },
  "eco-sri": { display: "www.ecosri.lk", url: "https://www.ecosri.lk" },
  rubber: { display: "www.laugfsrubber.com", url: "https://www.laugfsrubber.com" },
  petroleum: { display: "laugfspetroleum.lk", url: "http://laugfspetroleum.lk" },
  power: { display: "laugfspower.lk", url: "https://laugfspower.lk" },
  "life-sciences": { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  restaurants: { display: "www.jade.lk", url: "https://www.jade.lk" },
  "salt-chemicals": { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  custom: { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
}

const companyLogos = [
  { id: "holdings", name: "LAUGFS Holdings", path: "/images/holdings-logo.png" },
  { id: "engineering", name: "LAUGFS Engineering", path: "/images/engineering-logo.png" },
  { id: "lubricants", name: "LAUGFS Lubricants", path: "/images/lubricants-logo.png" },
  { id: "eco-sri", name: "LAUGFS Eco Sri", path: "/images/eco-sri-logo.png" },
  { id: "rubber", name: "LAUGFS Rubber", path: "/images/rubber-logo.png" },
  { id: "life-sciences", name: "LAUGFS Life Sciences", path: "/images/life-sciences-logo.png" },
  { id: "gas", name: "LAUGFS Gas", path: "/images/gas-logo.png" },
  { id: "power", name: "LAUGFS Power", path: "/images/power-logo.png" },
  { id: "petroleum", name: "LAUGFS Petroleum", path: "/images/petroleum-logo.png" },
  { id: "international", name: "LAUGFS International", path: "/images/international-logo.png" },
  { id: "restaurants", name: "LAUGFS Restaurants", path: "/images/restaurants-logo.png" },
  { id: "salt-chemicals", name: "LAUGFS Salt & Chemicals", path: "/images/salt-chemicals-logo.png" },
  { id: "custom", name: "Custom Logo", path: "" },
]

const designations = [
  "Accountant",
  "Accountant - Payments",
  "Accounts Executive",
  "Acting Assistant Manager",
  "Administration Executive",
  "Administrative Executive",
  "AGM - Engineering",
  "AGM - Finance",
  "AGM - Information Security & Compliance",
  "AGM - Procurement & Administration",
  "AGM - Quality, Certifications & Compliance",
  "AGM - Sales & Operations",
  "AGM - Sales Operations",
  "AGM - Finance",
  "Architect",
  "Area Manager",
  "Area Sales Manager",
  "Assiatant Housekeeper",
  "Assistant Accountant",
  "Assistant Area Operations Manager",
  "Assistant Center Manager",
  "Assistant Engineer",
  "Assistant Front Office Manager",
  "Assistant General Manager - Finance",
  "Assistant General Manager - HR",
  "Assistant General Manager - Strategy",
  "Assistant General Manager - Corporate Finance",
  "Assistant General Manager-Human Resources & Group Compliance",
  "Assistant Manager",
  "Assistant Manager - Brand",
  "Assistant Manager - Business Development",
  "Assistant Manager - Category Management",
  "Assistant Manager - Corporate Communication",
  "Assistant Manager - Creative Media & Design",
  "Assistant Manager - Employee Engagement and HR Business Partner",
  "Assistant Manager - Finance",
  "Assistant Manager - HR",
  "Assistant Manager - Human Resources",
  "Assistant Manager - Import & Export",
  "Assistant Manager - IT Service Management",
  "Assistant Manager - IT/ Cyber Securites",
  "Assistant Manager - Learning & Developemnt",
  "Assistant Manager - Logistics",
  "Assistant Manager - Maintenance",
  "Assistant Manager - Marketing",
  "Assistant Manager - Marketing Communications",
  "Assistant Manager - Operation",
  "Assistant Manager - Operations",
  "Assistant Manager - Operations Coordination & Monitoring",
  "Assistant Manager - Pharmacy",
  "Assistant Manager - Plant Engineering",
  "Assistant Manager - Procurement",
  "Assistant Manager - Production",
  "Assistant Manager - Purchasing",
  "Assistant Manager - QC",
  "Assistant Manager - R&D",
  "Assistant Manager - Security Operations & Administration",
  "Assistant Manager - Strategy",
  "Assistant Manager - T&D",
  "Assistant Manager - Technical",
  "Assistant Manager - Workshop",
  "Assistant Manager - Creatives & Special Events",
  "Assistant Manager - Engineering Mold",
  "Assistant Manager - Finance & MIS",
  "Assistant Manager - Salary Administration",
  "Assistant Manager HRD",
  "Assistant Manager HSE",
  "Assistant Manager- Industrial Sales",
  "Assistant Manager- Technical Training",
  "Assistant Manager-CRM",
  "Assistant Manager-Finance Operation",
  "Assistant Manager-HR",
  "Assistant Manager-Key Accounts",
  "Assistant Manager-Logistics",
  "Assistant Manager-Operation (Special Projects)",
  "Assistant Manager-Procurement",
  "Assistant Manger - Audit",
  "Assistant Operation Manager",
  "Associate - Accounting and Finance",
  "Associate - Accounts Payable",
  "Associate - Bank Reconciliations",
  "Associate - General Ledger",
  "Associate - Primary Invoicing",
  "Associate - QA & Governance",
  "Associate - Finance and Tax",
  "Associate Business Analyst",
  "Associate Software Engineer",
  "Associate Software Quality Assurance Engineer",
  "Audit Executive",
  "Branch Manager",
  "Brand Executive",
  "Business Analyst / Project Manager",
  "Center Manager",
  "Centre Manager",
  "CEO",
  "Chairman",
  "Chef",
  "Chef De Cuisine",
  "Chef De Partie",
  "Chemical Engineer",
  "Chemist",
  "Chemist - QC & QA",
  "Chief Engineer",
  "Chief Executive Officer",
  "Chief Executive Officer - LAUGFS Retail",
  "Chief Financial Officer",
  "Chief Operating Officer",
  "Civil Engineer",
  "Consultant",
  "Country Manager-Dubai",
  "CRM Executive",
  "Customer Coordinator",
  "Deputy Chairman",
  "Deputy General Manager",
  "Deputy General Manager-Operations",
  "DGM - Technical",
  "Director - Group Chief People Officer",
  "Director - Group Supply Chain",
  "Director/ Consultant",
  "Director/Cluster CEO",
  "Distribution Executive",
  "Draughtsman",
  "Engineer",
  "Engineering Executive",
  "Engineer-Renewable power",
  "Executive",
  "Executive - Admin & HES",
  "Executive - Administration",
  "Executive - Audit",
  "Executive - Business Intelligence",
  "Executive - Category Management",
  "Executive - EHS",
  "Executive - Electrical",
  "Executive - Finance",
  "Executive - Food Safety and Certifications",
  "Executive - HR",
  "Executive - HRD",
  "Executive - Human Resources",
  "Executive - Imports & Exports",
  "Executive - IT Service Management",
  "Executive - Learning And Development",
  "Executive - Logistic",
  "Executive - Management Systems Cordinator",
  "Executive - Marketing",
  "Executive - Mechanical",
  "Executive - Microbiology",
  "Executive - Operation",
  "Executive - Pharmacy CPU",
  "Executive - Plant Operations",
  "Executive - Procurement",
  "Executive - Projects",
  "Executive - QA",
  "Executive - QC",
  "Executive - Quality Assurance",
  "Executive - R&D",
  "Executive - Sales and Administration",
  "Executive - Tax",
  "Executive - Technical",
  "Executive - Trade Marketing",
  "Executive - Costing",
  "Executive - Design & Development",
  "Executive - Process Engineer R & T",
  "Executive - Procurement cum Export Operations",
  "Executive - Product Development R & T",
  "Executive - Production",
  "Executive - Stores",
  "Executive - System & Process Improvement",
  "Executive Assistant",
  "Executive Chef",
  "Executive Director / CEO",
  "Executive Housekeeper",
  "Executive- Invoicing",
  "Executive- Operations",
  "Executive- Sales",
  "Executive Sous Chef",
  "Executive- Stores",
  "Executive-Credit",
  "Executive-HR",
  "Field Sales Manager",
  "Finance Executive",
  "Finance Manager",
  "Food & Beverage Executive",
  "Front Office Executive",
  "Front office Manager",
  "Functional Lead BPR and Governance",
  "Functional Lead FICO",
  "General Manager - Bulk Sales",
  "General Manager - Finance",
  "General Manager - Group Salary Administration",
  "General Manager - Head of Corporate Communications",
  "General Manager - Head of Group Human Resources",
  "General Manager - Operations",
  "General Manager - Sales",
  "General Manager - Supply Chain",
  "General Manager- Operations",
  "GM - Factory Operations",
  "GM - Treasury & Finance",
  "Group Chief Information & Process Officer",
  "Group Chief Strategy Officer",
  "Group Finance Director",
  "Group MD/CEO",
  "Guest Relations Executive",
  "Head Chef",
  "Head of B2B & Global Markets Development",
  "Head of Corporate Finance",
  "Head of Distributor Operation",
  "Head of Engineering",
  "Head of Enterprise Systems",
  "Head of Finance",
  "Head of Group Audit",
  "Head of Group Security & Administration",
  "Head of Group Tax and Regulatory Reporting",
  "Head of Human Resources",
  "Head of Human Resources - Gas Cluster",
  "Head of IT",
  "Head of Legal",
  "Head of Plant",
  "Head of Plant Operations",
  "Head of Procurement",
  "Head of Procurement - Retail",
  "Head of Production",
  "Head of Quality",
  "Head of Terminals",
  "Housekeeping Executive",
  "HR Executive",
  "HR Executive - Salary Administration",
  "Industrial Services Engineer",
  "Infrastructure Manage Service - MIT",
  "IT Executive",
  "Junior Buyer",
  "Junior Centre Manager",
  "Junior Executive - Finance",
  "Junior Executive - HR",
  "Junior Executive Audit",
  "Lab Analyst",
  "Lead Project Engineer",
  "Legal Executive",
  "Legal Officer",
  "Maintenance Engineer",
  "Maintenance Executive",
  "Manager",
  "Manager - Category & Merchandising",
  "Manager - Distribution & Logistics",
  "Manager - Electrical",
  "Manager - Finance",
  "Manager - Group Risk & Control",
  "Manager - Group Salary Administration",
  "Manager - Health, Safety & Environment",
  "Manager - HR",
  "Manager - Human Resources",
  "Manager - Industrial Sales",
  "Manager - IT Infrastructure",
  "Manager - IT Service Management",
  "Manager - Key Accounts",
  "Manager - Market Activations and Promotion",
  "Manager - Marketing",
  "Manager - Operation",
  "Manager - Operations",
  "Manager - Procurement",
  "Manager - Product & Business Development",
  "Manager - Projects",
  "Manager - Quality & Standards",
  "Manager - Quality Assurance",
  "Manager - Quality Control",
  "Manager - Research & Technology",
  "Manager - Sales",
  "Manager - Stores",
  "Manager - Technical Sales",
  "Manager - Technical Supply Chain",
  "Manager - Treasury",
  "Manager - Financial Reporting",
  "Manager Account - Receivable",
  "Manager Business Systems",
  "Manager- Finance",
  "Manager Invoicing and billing",
  "Manager-Laboratory",
  "Manager-Maintenance",
  "Projects & Administration",
  "Manager-Production Planning",
  "Manger - HSE (Channel and Mabima)",
  "Mechanical Engineer",
  "Non - Executive Director",
  "Operation Coordination Executive",
  "Operation Executive",
  "Operation Manager",
  "Operation Manager - Crimson",
  "Operation Manager - Food & Beverage",
  "Operations Engineer",
  "Operations Executive",
  "Pastry Chef",
  "Pharmacist",
  "Product Manager",
  "Production Co-ordinator",
  "Production Engineer",
  "Production Execuitve",
  "Production Executive",
  "Quantity Surveyor",
  "Recreational Executive",
  "Regional Sales Manager",
  "Reservation Executive",
  "Resort Manager",
  "Restaurant & Bar Executive",
  "Retail Category Buyer",
  "Sales Executive",
  "Sales Manager - Key Account",
  "Senior Accounts Executive",
  "Senior Associate - Accounts Payable",
  "Senior Associate - Bank Reconciliations",
  "Senior Associate - General Ledger",
  "Senior Associate - QA & Governance",
  "Senior Audit Executive",
  "Senior Brand Executive",
  "Senior Buyer",
  "Senior Chef De Partie",
  "Senior Chemist",
  "Senior Executive",
  "Senior Executive - Accounts",
  "Senior Executive - Administration",
  "Senior Executive - Administration & Operation",
  "Senior Executive - Administration and Operations",
  "Senior Executive - Audit",
  "Senior Executive - Bulk Sales",
  "Senior Executive - Category Management",
  "Senior Executive - Civil & Administration",
  "Senior Executive - Digital Marketing",
  "Senior Executive - Distribution",
  "Senior Executive - Finance",
  "Senior Executive - Fleet Management",
  "Senior Executive - Graphic Designing",
  "Senior Executive - Group Tax & Regulatory Reporting",
  "Senior Executive - HR",
  "Senior Executive - Human Resources",
  "Senior Executive - Human Resources & Administration",
  "Senior Executive - IT Service Management",
  "Senior Executive - Logistic",
  "Senior Executive - Operations",
  "Senior Executive - Process Engineer R & T",
  "Senior Executive - Procurement",
  "Senior Executive - Product Development R & D",
  "Senior Executive - Production Planning",
  "Senior Executive - Project Management",
  "Senior Executive - Projects",
  "Senior Executive - Salary Administration",
  "Senior Executive - Stores",
  "Senior Executive - Technical",
  "Senior Executive - Treasury",
  "Senior Executive - Warehouse & Logistics",
  "Senior Executive BD",
  "Senior Executive Finance & Tax",
  "Senior Executive -QC",
  "Senior Field Sales Manager",
  "Senior Legal Officer",
  "Senior Manager - Corporate Administration",
  "Senior Manager - Corporate Finance",
  "Senior Manager - Demand Planning",
  "Senior Manager - Engineering",
  "Senior Manager - Finance & Accounting",
  "Senior Manager - HR",
  "Senior Manager - Logistics",
  "Senior Manager - Operations",
  "Senior Manager - Procurement",
  "Senior Manager - Production",
  "Senior Manager - Projects",
  "Senior Manager - Sales & Marketing",
  "Senior Manager - Stores & Security",
  "Senior Manager - Technical",
  "Senior Manager - Business Development",
  "Senior Manager HSE",
  "Senior Manager-Finance",
  "Senior Manager-Logistics & Transport",
  "Senior Manager-Marketing",
  "Senior Operation Executive",
  "Senior Quantity Surveyor",
  "Senior Sales Coordinator",
  "Senior Software Engineer",
  "Snr.Executive - IT",
  "Software Engineer",
  "Software Quality Assurance Engineer",
  "Sr. Executive- HR & Admin",
  "Sr. Executive- Sales",
  "Stores Executive",
  "Superintendent - Security and Administration",
  "Supervisor",
  "Supply Chain Controller",
  "Technical Assistant",
  "Technical Lead",
  "Technical Officer",
  "Territory Manager",
  "Trainee Executive - Marketing",
  "Transport Executive",
  "Visiting Security Officer",
  "Warehouse & Logistics Executive",
  "Zonal Manager (Sales)",
]

const departments = [
  "Finance",
  "Accounts & Finace - Car Care",
  "Supermarket",
  "Maintenance",
  "Projects & Administration",
  "Administration",
  "Engineering",
  "IT",
  "Risk & Control",
  "Marketing",
  "Sales & Marketing",
  "Operations",
  "Sales",
  "Housekeeping",
  "Car Care",
  "Engineering - Mechanical",
  "Front Office",
  "Human Resources",
  "Strategy",
  "Corporate Finance",
  "Category & Merchandising",
  "Corporate Communication",
  "Supply Chain",
  "Stores",
  "Maintenance",
  "Engineering and Maintenance",
  "Operation",
  "Operation & Admin",
  "Plant and Terminal Operation - Admin",
  "Pharmacy",
  "Production",
  "Production General",
  "Quality Control",
  "R&D",
  "Security",
  "Technical",
  "Engineering - Mold",
  "HSE",
  "Technical Training",
  "CRM",
  "Logistic & Supply",
  "Sourcing & Inventory Control",
  "Audit",
  "Quality",
  "Tax",
  "Filling Station",
  "Directors office",
  "Hot Kitchen",
  "Kitchen",
  "Pastry & Bakery",
  "Manufacturing",
  "Engineering - Civil",
  "SLOGAL",
  "Centralized services",
  "Warehouse & Logistics",
  "Restaurant",
  "Business Intelligence",
  "EHS",
  "Plant and Terminal Operation",
  "Project",
  "Quality Assuarance",
  "R & D and Systems",
  "Customer Care",
  "Credit",
  "Food & Beverage",
  "Bulk sales",
  "Treasury",
  "Group Finance",
  "Legal",
  "Bulk and Commercial Engineering Services",
  "Engineering - Electrical",
  "Power Products",
  "Invoicing & Billing",
  "Planing",
  "Quantity Survey",
  "QA/QC",
  "Procurement",
  "Mechanical",
  "Quantity Survey - Civil",
]

export default function HomePage() {
  const [signatureData, setSignatureData] = useState({
    fullName: "",
    designation: "",
    department: "",
    mobile: "",
    direct: "",
    extension: "",
    address: "3rd Floor, No 101, Maya Avenue, Colombo 6, Sri Lanka.",
    selectedLogo: "holdings",
    customLogoBase64: "",
  })

  const [outlookType, setOutlookType] = useState("web")
  const [logoBase64Cache, setLogoBase64Cache] = useState<Record<string, string>>({})

  // Convert company logos to base64 on component mount
  useEffect(() => {
    const convertLogos = async () => {
      for (const logo of companyLogos) {
        if (logo.path) {
          try {
            const response = await fetch(logo.path)
            const blob = await response.blob()
            const reader = new FileReader()
            reader.onload = () => {
              setLogoBase64Cache((prev) => ({ ...prev, [logo.id]: reader.result as string }))
            }
            reader.readAsDataURL(blob)
          } catch (error) {
            console.error(`Failed to load ${logo.name} logo:`, error)
          }
        }
      }
    }
    convertLogos()
  }, [])

  // Auto-generate direct line from extension with correct format
  useEffect(() => {
    if (signatureData.extension && signatureData.extension.length === 4) {
      const directLine = `+94 11 55 6${signatureData.extension.substring(0, 1)} ${signatureData.extension.substring(1)}`
      setSignatureData((prev) => ({ ...prev, direct: directLine }))
    }
  }, [signatureData.extension])

  const getCurrentLogoBase64 = () => {
    if (signatureData.selectedLogo === "custom") {
      return signatureData.customLogoBase64
    }
    return logoBase64Cache[signatureData.selectedLogo] || ""
  }

  const formatMobileNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Handle different input scenarios
    let formattedDigits = digits

    // If starts with 0, replace with 94
    if (digits.startsWith("0")) {
      formattedDigits = "94" + digits.substring(1)
    }
    // If starts with 94, keep as is
    else if (digits.startsWith("94")) {
      formattedDigits = digits
    }
    // If starts with 7, add 94
    else if (digits.startsWith("7")) {
      formattedDigits = "94" + digits
    }

    // Ensure it starts with 947
    if (!formattedDigits.startsWith("947")) {
      return value // Return original if doesn't match pattern
    }

    // Format: +94 7X XX XX XXX
    if (formattedDigits.length >= 11) {
      const formatted = `+94 ${formattedDigits.substring(2, 3)}${formattedDigits.substring(3, 4)} ${formattedDigits.substring(4, 6)} ${formattedDigits.substring(6, 8)} ${formattedDigits.substring(8, 11)}`
      return formatted
    }

    return `+94 ${formattedDigits.substring(2)}`
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMobileNumber(e.target.value)
    setSignatureData({ ...signatureData, mobile: formatted })
  }

  const handleExtensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4)
    setSignatureData({ ...signatureData, extension: value })
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatureData({ ...signatureData, fullName: e.target.value.toUpperCase() })
  }

  const getCurrentDomain = () => {
    return companyDomains[signatureData.selectedLogo as keyof typeof companyDomains] || companyDomains.holdings
  }

  const generateSignatureHTML = () => {
    const logoSrc = getCurrentLogoBase64()
    const showContactInfo = signatureData.extension.length === 4
    const domain = getCurrentDomain()

    return `<table style="border-collapse:collapse;width:670.5pt;margin-left:6.75pt;margin-right:6.75pt;">
    <tbody>
        <tr>
            <td style="width:166.25pt;border-right:1pt solid windowtext;padding:0in 0in 0in 0.2in;vertical-align:top;">
                <p style="margin-top:12.0pt;margin-bottom:8.0pt;margin-left:-14.05pt;line-height:115%;font-size:16px;font-family:Aptos,sans-serif;"><img width="208" height="64" src="${logoSrc}" alt="Company Logo" style="display:block;max-height:64px;width:auto;max-width:208px;"></p>
            </td>
            <td style="width:2.5in;border-right:1pt solid windowtext;padding:0in 0in 0in 0.2in;vertical-align:top;">
                <p style="margin-top:12.0pt;margin-bottom:8.0pt;line-height:1.0;font-size:16px;font-family:Aptos,sans-serif;"><strong>${signatureData.fullName}</strong></p>
                <p style="margin-top:12.0pt;margin-bottom:8.0pt;line-height:1.0;font-size:16px;font-family:Aptos,sans-serif;">${signatureData.designation}</p>
                <p style="margin-top:12.0pt;margin-bottom:8.0pt;line-height:1.0;font-size:16px;font-family:Aptos,sans-serif;">${signatureData.department}</p>
            </td>
            <td style="width:324.25pt;padding:0in 0in 0in 0.2in;vertical-align:top;">
                <p style="margin-top:12.0pt;margin-bottom:8.0pt;line-height:1.0;font-size:16px;font-family:Aptos,sans-serif;">${signatureData.address}</p>
                <p style="margin-top:12.0pt;margin-bottom:8.0pt;line-height:1.0;font-size:16px;font-family:Aptos,sans-serif;">Mobile: ${signatureData.mobile} | Tel: +94 11 55 66 222</p>
                ${showContactInfo ? `<p style="margin-top:12.0pt;margin-bottom:8.0pt;line-height:1.0;font-size:16px;font-family:Aptos,sans-serif;">Direct: ${signatureData.direct} | Ext: ${signatureData.extension}</p>` : ""}
            </td>
        </tr>
        <tr>
            <td colspan="3" style="width:670.5pt;background:#FFC000;padding:0in 0in 0in 0.2in;">
                <p style="margin:0;line-height:115%;font-size:16px;font-family:Aptos,sans-serif;"><span style="color:#467886;"><a href="${domain.url}" target="_blank" style="color:#467886;font-weight:bold;text-decoration:underline;">${domain.display}</a></span></p>
            </td>
        </tr>
    </tbody>
</table>`
  }

  const resetForm = () => {
    setSignatureData({
      fullName: "",
      designation: "",
      department: "",
      mobile: "",
      direct: "",
      extension: "",
      address: "3rd Floor, No 101, Maya Avenue, Colombo 6, Sri Lanka.",
      selectedLogo: "holdings",
      customLogoBase64: "",
    })
  }

  const handleImageChange = (base64: string) => {
    setSignatureData((prev) => ({ ...prev, customLogoBase64: base64 }))
  }

  const handleLogoChange = (value: string) => {
    setSignatureData((prev) => ({ ...prev, selectedLogo: value }))
  }

  const isFormValid = () => {
    return (
      signatureData.fullName &&
      signatureData.designation &&
      signatureData.department &&
      signatureData.mobile &&
      signatureData.address
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      {/* Compact Header */}
      <header className="bg-white shadow-lg border-b-4 border-[#FFC000]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Icon and Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Mail className="h-10 w-10 text-[#FFC000]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="h-10 w-px bg-gray-300"></div>
              <img src="/images/holdings-logo.png" alt="LAUGFS Holdings" className="h-10" />
            </div>

            {/* Right side - Text */}
            <div className="text-right">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-[#FFC000] bg-clip-text text-transparent">
                Email Signature Generator
              </h1>
              <p className="text-gray-600 text-sm">Create professional signatures for LAUGFS Group</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Instructions */}
          <Card className="h-fit">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-[#FFC000]/10">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Monitor className="h-5 w-5" />
                Setup Instructions
              </CardTitle>
              <CardDescription>Follow these steps to add your signature to Outlook</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div>
                  <Label>Select your Outlook version:</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant={outlookType === "web" ? "default" : "outline"}
                      onClick={() => setOutlookType("web")}
                      className="flex-1"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Outlook Web
                    </Button>
                    <Button
                      variant={outlookType === "desktop" ? "default" : "outline"}
                      onClick={() => setOutlookType("desktop")}
                      className="flex-1"
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      Outlook Desktop
                    </Button>
                  </div>
                </div>

                {outlookType === "web" ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-900">Outlook Web/New Outlook:</h4>
                    <ol className="space-y-2 text-sm list-decimal list-inside">
                      <li>Open Outlook in your web browser</li>
                      <li>Click the ⚙️ Settings gear icon in the top right</li>
                      <li>Select "View all Outlook settings" at the bottom</li>
                      <li>Go to "Mail" → "Compose and reply"</li>
                      <li>Scroll down to "Email signature" section</li>
                      <li>Click "Copy Rich Text" button below and paste (Ctrl+V) in the signature box</li>
                      <li>Click "Save" to apply your signature</li>
                    </ol>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-900">Outlook Desktop (Classic):</h4>
                    <ol className="space-y-2 text-sm list-decimal list-inside">
                      <li>Open Outlook desktop application</li>
                      <li>Go to "File" → "Options"</li>
                      <li>Select "Mail" from the left sidebar</li>
                      <li>Click "Signatures..." button</li>
                      <li>Click "New" to create a new signature</li>
                      <li>Give your signature a name</li>
                      <li>Click "Copy Rich Text" button below and paste (Ctrl+V) in the signature editor</li>
                      <li>Set as default for new messages and replies</li>
                      <li>Click "OK" to save</li>
                    </ol>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h5>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Use "Copy Rich Text" for best results - images and formatting are preserved</li>
                    <li>Test your signature by sending yourself an email</li>
                    <li>The signature will appear automatically in all new emails</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="h-fit">
            <CardHeader className="bg-gradient-to-r from-[#FFC000]/10 to-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Mail className="h-5 w-5" />
                Your Details
              </CardTitle>
              <CardDescription>Fill in your information to generate your signature</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyLogo">Company Logo *</Label>
                  <Select value={signatureData.selectedLogo} onValueChange={handleLogoChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company logo" />
                    </SelectTrigger>
                    <SelectContent>
                      {companyLogos.map((logo) => (
                        <SelectItem key={logo.id} value={logo.id}>
                          {logo.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {signatureData.selectedLogo === "custom" && (
                  <ImageUpload
                    onImageChange={handleImageChange}
                    currentImage={signatureData.customLogoBase64}
                    label="Upload Custom Logo"
                  />
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={signatureData.fullName}
                    onChange={handleFullNameChange}
                    className="font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation *</Label>
                  <Combobox
                    options={designations}
                    value={signatureData.designation}
                    onValueChange={(value) => setSignatureData({ ...signatureData, designation: value })}
                    placeholder="Select or search your designation"
                    searchPlaceholder="Search designations..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Combobox
                    options={departments}
                    value={signatureData.department}
                    onValueChange={(value) => setSignatureData({ ...signatureData, department: value })}
                    placeholder="Select or search your department"
                    searchPlaceholder="Search departments..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="e.g., 3rd Floor, No 101, Maya Avenue, Colombo 6, Sri Lanka."
                    value={signatureData.address}
                    onChange={(e) => setSignatureData({ ...signatureData, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    placeholder="+94 77 12 34 567"
                    value={signatureData.mobile}
                    onChange={handleMobileChange}
                  />
                  <p className="text-xs text-gray-500">Format: +94 7X XX XX XXX</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extension">Extension (Optional)</Label>
                  <Input
                    id="extension"
                    placeholder="6413"
                    value={signatureData.extension}
                    onChange={handleExtensionChange}
                    className="max-w-32"
                    maxLength={4}
                  />
                  <p className="text-xs text-gray-500">4 digits only. Direct line will be auto-generated.</p>
                </div>

                {signatureData.extension.length === 4 && (
                  <div className="space-y-2">
                    <Label htmlFor="direct">Direct Line (Auto-generated)</Label>
                    <Input id="direct" value={signatureData.direct} readOnly className="bg-gray-50" />
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={resetForm} variant="outline" className="flex-1 bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <RichTextCopy htmlContent={generateSignatureHTML()} className="flex-1" disabled={!isFormValid()} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card className="mt-6 max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>This is how your signature will appear in emails</CardDescription>
          </CardHeader>
          <CardContent>
            <SignaturePreview
              data={{
                ...signatureData,
                logoBase64: getCurrentLogoBase64(),
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-[#FFC000] mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/images/holdings-logo.png" alt="LAUGFS Holdings" className="h-6" />
          </div>
          <p className="text-gray-600">Crafted with ❤️ by ITSM Team</p>
        </div>
      </footer>
    </div>
  )
}
