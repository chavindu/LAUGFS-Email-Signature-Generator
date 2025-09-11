"use client"

import type React from "react"

import { COMPANY_LOGO_CONFIG, COMPANY_DOMAINS, getLogoConfig, getCompanyDomain } from "@/lib/logo-config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Combobox } from "@/components/ui/combobox"
import { Mail, RefreshCw, Monitor, Globe, Shield, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { SignaturePreview } from "@/components/signature-preview"
import { RichTextCopy } from "@/components/rich-text-copy"
import { ImageUpload } from "@/components/image-upload"


const companyLogos = [
  { id: "anantaya-chilaw", name: "Anantaya Resort and Spa Chilaw", path: "/images/Anantaya Resort and Spa Chilaw.png" },
  {
    id: "anantaya-passikudah",
    name: "Anantaya Resort and Spa Passikuda",
    path: "/images/Anantaya Resort and Spa Passikuda.png",
  },
  { id: "business-solutions", name: "LAUGFS Business Solutions", path: "/images/LAUGFS Business Solutions.png" },
  { id: "eco-sri", name: "LAUGFS Eco Sri", path: "/images/LAUGFS Eco Sri.png" },
  { id: "engineering", name: "LAUGFS Engineering", path: "/images/LAUGFS Engineering.png" },
  { id: "europe-bv", name: "LAUGFS Europe BV", path: "/images/LAUGFS Europe BV.png" },
  { id: "gas", name: "LAUGFS Gas", path: "/images/LAUGFS Gas.png" },
  { id: "holdings", name: "LAUGFS Holdings", path: "/images/LAUGFS Holdings.png" },
  { id: "international", name: "LAUGFS International", path: "/images/LAUGFS International.png" },
  { id: "leisure", name: "LAUGFS Leisure", path: "/images/LAUGFS Leisure.png" },
  { id: "life-sciences", name: "LAUGFS Life Sciences", path: "/images/LAUGFS Life Sciences.png" },
  { id: "lubricants", name: "LAUGFS Lubricants", path: "/images/LAUGFS Lubricants.png" },
  { id: "lubricants-bangladesh", name: "LAUGFS Lubricants (Bangladesh)", path: "/images/LAUGFS Lubricants.png" },
  { id: "maritime", name: "LAUGFS Maritime", path: "/images/LAUGFS Maritime.png" },
  { id: "petroleum", name: "LAUGFS Petroleum", path: "/images/LAUGFS Petroleum.png" },
  { id: "power", name: "LAUGFS Power", path: "/images/LAUGFS Power.png" },
  { id: "property", name: "LAUGFS Property", path: "/images/LAUGFS Property.png" },
  { id: "restaurants", name: "LAUGFS Restaurants", path: "/images/LAUGFS Restaurants.png" },
  { id: "rubber", name: "LAUGFS Rubber", path: "/images/LAUGFS Rubber.png" },
  { id: "salt-chemicals", name: "LAUGFS Salt and Chemicals", path: "/images/LAUGFS Salt and Chemicals.png" },
  { id: "slogal", name: "SLOGAL Energy DMCC", path: "/images/SLOGAL Energy DMCC.png" },
  { id: "southern-petroleum", name: "Southern Petroleum", path: "/images/Southern Petroleum.png" },
  { id: "super", name: "LAUGFS Super", path: "/images/LAUGFS Super.png" },
  { id: "terminals", name: "LAUGFS Terminals", path: "/images/LAUGFS Terminals.png" },
  { id: "usa-llc", name: "LAUGFS USA LLC", path: "/images/LAUGFS USA LLC.png" },
  { id: "custom", name: "Custom Company", path: "" },
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
    firstName: "",
    lastName: "",
    designation: "",
    department: "",
    mobile: "",
    direct: "",
    extension: "",
    address: "3rd Floor, No 101, Maya Avenue, Colombo 6, Sri Lanka.",
    selectedLogo: "holdings",
    customLogoBase64: "",
    customCompanyName: "",
    customDomain: "",
  })

  const [outlookType, setOutlookType] = useState("web")
  const [logoBase64Cache, setLogoBase64Cache] = useState<Record<string, string>>({})
  const [generatedHTML, setGeneratedHTML] = useState("")
  const [currentLogoBase64, setCurrentLogoBase64] = useState("")
  const [secondLogosBase64, setSecondLogosBase64] = useState<Record<string, string>>({})
  const [currentSecondLogoBase64, setCurrentSecondLogoBase64] = useState("")
  const [secondLogoDimensionsMap, setSecondLogoDimensionsMap] = useState<Record<string, { width: number; height: number }>>({})

  // Function to measure logo dimensions
  const measureLogoDimensions = (base64: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        // Calculate proportional width when height is fixed at 90px
        const aspectRatio = img.width / img.height
        const newWidth = Math.round(90 * aspectRatio)
        resolve({ width: newWidth, height: 90 })
      }
      img.src = base64
    })
  }

  // Convert company logos to base64 on component mount
  useEffect(() => {
    const resizeImage = (base64: string, targetWidth = 180): Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")

          // Calculate new height maintaining aspect ratio
          const aspectRatio = img.height ? img.width / img.height : 1
          const newHeight = Math.round(targetWidth / aspectRatio)

          canvas.width = targetWidth
          canvas.height = newHeight

          // Draw resized image
          ctx?.drawImage(img, 0, 0, targetWidth, newHeight)

          // Convert to base64
          const resizedBase64 = canvas.toDataURL("image/png", 0.8)
          resolve(resizedBase64)
        }
        img.src = base64
      })
    }

    const convertLogos = async () => {
      for (const logo of companyLogos) {
        if (logo.path) {
          try {
            const response = await fetch(logo.path)
            const blob = await response.blob()
            const reader = new FileReader()
            reader.onload = async () => {
              const originalBase64 = reader.result as string
              const resizedBase64 = await resizeImage(originalBase64, 180)
              setLogoBase64Cache((prev) => ({ ...prev, [logo.id]: resizedBase64 }))
            }
            reader.readAsDataURL(blob)
          } catch (error) {
            console.error(`Failed to load ${logo.name} logo:`, error)
          }
        }
      }
    }
    convertLogos()

    // Preload second (anniversary) logos and cache as base64 at width 260px
    const loadSecondLogos = async () => {
      const resizeByHeight = (base64: string, targetHeight = 90): Promise<string> => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            const aspectRatio = img.width ? img.width / img.height : 1
            const newWidth = Math.round(targetHeight * aspectRatio)
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            canvas.width = newWidth
            canvas.height = targetHeight
            ctx?.drawImage(img, 0, 0, newWidth, targetHeight)
            const resizedBase64 = canvas.toDataURL("image/png", 0.9)
            resolve(resizedBase64)
          }
          img.src = base64
        })
      }

      const paths: { key: string; path: string }[] = [
        { key: "holdings", path: "/images/2nd-logo/30-years-holdings.png" },
        { key: "others", path: "/images/2nd-logo/30-years-others.png" },
      ]

      for (const item of paths) {
        try {
          const response = await fetch(item.path)
          const blob = await response.blob()
          const reader = new FileReader()
          reader.onload = async () => {
            const b64 = reader.result as string
            const resized = await resizeByHeight(b64, 90)
            setSecondLogosBase64((prev) => ({ ...prev, [item.key]: resized }))
            // Measure the actual dimensions of the resized logo for this key
            const dimensions = await measureLogoDimensions(resized)
            setSecondLogoDimensionsMap((prev) => ({ ...prev, [item.key]: dimensions }))
          }
          reader.readAsDataURL(blob)
        } catch (error) {
          console.error(`Failed to load second logo ${item.key}:`, error)
        }
      }
    }
    loadSecondLogos()
  }, [])

  // Update generated HTML and current logo when signature data changes
  useEffect(() => {
    const updateSignature = async () => {
      const logo = await getCurrentLogoBase64()
      setCurrentLogoBase64(logo)
      const anniversary = await getSecondLogoBase64()
      setCurrentSecondLogoBase64(anniversary)
      const html = await generateSignatureHTML()
      setGeneratedHTML(html)
    }
    updateSignature()
  }, [signatureData, logoBase64Cache, secondLogosBase64])

  // Also update when secondLogosBase64 changes to ensure 2nd logo appears
  useEffect(() => {
    if (Object.keys(secondLogosBase64).length > 0) {
      const updateSignature = async () => {
        const logo = await getCurrentLogoBase64()
        setCurrentLogoBase64(logo)
        const anniversary = await getSecondLogoBase64()
        setCurrentSecondLogoBase64(anniversary)
        const html = await generateSignatureHTML()
        setGeneratedHTML(html)
      }
      updateSignature()
    }
  }, [secondLogosBase64])

  // Auto-generate direct line from extension with correct format
  useEffect(() => {
    if (signatureData.extension && signatureData.extension.length === 4) {
      const directLine = `+94 11 55 6${signatureData.extension.substring(0, 1)} ${signatureData.extension.substring(1)}`
      setSignatureData((prev) => ({ ...prev, direct: directLine }))
    }
  }, [signatureData.extension])

  const resizeImage = (base64: string, targetHeight = 48): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        // Calculate new width maintaining aspect ratio for height-based resizing
        const aspectRatio = img.width / img.height
        const newWidth = Math.round(targetHeight * aspectRatio)

        canvas.width = newWidth
        canvas.height = targetHeight

        // Draw resized image
        ctx?.drawImage(img, 0, 0, newWidth, targetHeight)

        // Convert to base64
        const resizedBase64 = canvas.toDataURL("image/png", 0.8)
        resolve(resizedBase64)
      }
      img.src = base64
    })
  }

  const getCurrentLogoBase64 = async () => {
    if (signatureData.selectedLogo === "custom") {
      if (signatureData.customLogoBase64) {
        // Custom main logo uses custom configuration
        const config = COMPANY_LOGO_CONFIG.custom
        const resizeByWidth = (base64: string, targetWidth = config.width): Promise<string> => {
          return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
              const aspectRatio = img.height ? img.width / img.height : 1
              const newHeight = Math.round(targetWidth / aspectRatio)
              const canvas = document.createElement("canvas")
              const ctx = canvas.getContext("2d")
              canvas.width = targetWidth
              canvas.height = newHeight
              ctx?.drawImage(img, 0, 0, targetWidth, newHeight)
              resolve(canvas.toDataURL("image/png", 0.8))
            }
            img.src = base64
          })
        }
        return await resizeByWidth(signatureData.customLogoBase64, config.width)
      }
      return ""
    }
    return logoBase64Cache[signatureData.selectedLogo] || ""
  }

  const getSecondLogoBase64 = async () => {
    // If selected company is holdings -> show holdings anniversary logo
    // Otherwise show others. Hide if not loaded yet.
    const key = signatureData.selectedLogo === "holdings" ? "holdings" : "others"
    return secondLogosBase64[key] || ""
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

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatureData({ ...signatureData, firstName: e.target.value.toUpperCase() })
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatureData({ ...signatureData, lastName: e.target.value.toUpperCase() })
  }

  const getCurrentDomain = () => {
    if (signatureData.selectedLogo === "custom" && signatureData.customDomain) {
      const domain = signatureData.customDomain
      const url = domain.startsWith("http") ? domain : `https://${domain}`
      return { display: domain, url }
    }
    return getCompanyDomain(signatureData.selectedLogo)
  }

  const getFullName = () => {
    return `${signatureData.firstName} ${signatureData.lastName}`.trim()
  }

  const generateSignatureHTML = async () => {
    const logoSrc = await getCurrentLogoBase64()
    const secondLogoSrc = await getSecondLogoBase64()
    const secondLogoKey = signatureData.selectedLogo === "holdings" ? "holdings" : "others"
    const showContactInfo = signatureData.extension.length === 4
    const domain = getCurrentDomain()
    const fullName = getFullName()

    // Calculate dynamic column widths
    const calculateTextWidth = (text: string, isBold = false) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.font = isBold ? "bold 10px Calibri, sans-serif" : "10px Calibri, sans-serif"
        return ctx.measureText(text).width
      }
      return 0
    }

    // Get current company logo configuration
    const currentLogoConfig = getLogoConfig(signatureData.selectedLogo)

    // Main logo width from configuration
    const logoWidth = currentLogoConfig.width

    // Calculate name column width with proper bold text measurement
    const nameWidth = calculateTextWidth(fullName, true) // Bold text
    const designationWidth = calculateTextWidth(signatureData.designation, false)
    const departmentWidth = calculateTextWidth(signatureData.department, false)
    const maxTextWidth = Math.max(nameWidth, designationWidth, departmentWidth)

    // Calculate contact column width using the longest of address/mobile/direct
    const addressWidth = calculateTextWidth(signatureData.address, false)
    const mobileText = showContactInfo ? `Mobile: ${signatureData.mobile} | Tel: +94 11 55 66 222` : `Mobile: ${signatureData.mobile}`
    const mobileWidth = calculateTextWidth(mobileText, false)
    const telText = showContactInfo ? "" : "Tel: +94 11 55 66 222"
    const telWidth = showContactInfo ? 0 : calculateTextWidth(telText, false)
    const directText = `Direct: ${signatureData.direct} | Ext: ${signatureData.extension}`
    const directWidth = showContactInfo ? calculateTextWidth(directText, false) : 0
    const contactWidth = Math.max(addressWidth, mobileWidth, telWidth, directWidth)

    return `<!--[if mso]>
<style>
table, td, tr {
  border: none !important;
  mso-table-lspace: 0pt !important;
  mso-table-rspace: 0pt !important;
}
</style>
<![endif]-->
<table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:none; mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%; max-width:894px; margin:0;">
    <tbody>
        <tr>
            <!-- Main logo column -->
            <td style="width:${logoWidth}px; min-width:${logoWidth}px; border:none; padding:0px 15px 0px 0px; vertical-align:middle; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                <p style="margin:0; padding:0; line-height:115%; font-size:10pt; font-family:Calibri,sans-serif; text-align:center;"><img src="${logoSrc}" alt="Company Logo" style="display:block; width:${currentLogoConfig.width}px; height:${currentLogoConfig.height}; object-fit:contain; margin-left:auto; margin-right:auto;"></p>
            </td>
            <!-- Separator 1 (short, centered) -->
            <td style="width:1px; padding:0; vertical-align:middle; mso-table-lspace:0pt; mso-table-rspace:0pt; color:inherit;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin:0 auto; color:inherit;">
                <tr>
                  <td style="border-right:1pt solid currentColor; height:60px; line-height:60px; font-size:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
            <!-- 2nd logo column (conditional) -->
            ${secondLogoSrc ? `<td style="width:${secondLogoDimensionsMap[secondLogoKey] ? secondLogoDimensionsMap[secondLogoKey].width + 30 : 177}px; min-width:${secondLogoDimensionsMap[secondLogoKey] ? secondLogoDimensionsMap[secondLogoKey].width + 30 : 177}px; max-width:${secondLogoDimensionsMap[secondLogoKey] ? secondLogoDimensionsMap[secondLogoKey].width + 30 : 177}px; border:none; padding:0px 20px 0px 20px; vertical-align:top; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                <p style="margin:0; padding:0; line-height:115%; font-size:10pt; font-family:Calibri,sans-serif; text-align:left; margin-bottom:10px;"><img src="${secondLogoSrc}" alt="Anniversary Logo" style="display:block; width:${secondLogoDimensionsMap[secondLogoKey] ? secondLogoDimensionsMap[secondLogoKey].width + 'px' : 'auto'}; height:90px; object-fit:contain; margin:0; padding:0;"></p>
            </td>
            <!-- Separator 2 (short, centered) -->
            <td style="width:1px; padding:0; vertical-align:middle; mso-table-lspace:0pt; mso-table-rspace:0pt; color:inherit;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin:0 auto; color:inherit;">
                <tr>
                  <td style="border-right:1pt solid currentColor; height:60px; line-height:60px; font-size:0;">&nbsp;</td>
                </tr>
              </table>
            </td>` : ``}
            <!-- Name column -->
            <td style="width:auto; min-width:${maxTextWidth}px; border:none; padding:0px 15px 0px 15px; vertical-align:top; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                <p style="margin-top:12.0pt; margin-bottom:4.0pt; line-height:1.0; font-size:11pt; font-family:Calibri,sans-serif; white-space:nowrap; text-align:left;"><strong>${fullName}</strong></p>
                <p style="margin-top:4.0pt; margin-bottom:4.0pt; line-height:1.0; font-size:10pt; font-family:Calibri,sans-serif; white-space:nowrap; text-align:left;">${signatureData.designation}</p>
                <p style="margin-top:4.0pt; margin-bottom:8.0pt; line-height:1.0; font-size:10pt; font-family:Calibri,sans-serif; white-space:nowrap; text-align:left;">${signatureData.department}</p>
            </td>
            <!-- Separator 3 (short, centered) -->
            <td style="width:1px; padding:0; vertical-align:middle; mso-table-lspace:0pt; mso-table-rspace:0pt; color:inherit;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin:0 auto; color:inherit;">
                <tr>
                  <td style="border-right:1pt solid currentColor; height:60px; line-height:60px; font-size:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
            <!-- Contact column -->
            <td style="width:auto; min-width:${contactWidth}px; border:none; padding:0px 0px 0px 15px; vertical-align:top; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                <p style="margin-top:12.0pt; margin-bottom:4.0pt; line-height:1.0; font-size:10pt; font-family:Calibri,sans-serif; white-space:nowrap; text-align:left;">${signatureData.address}</p>
                <p style="margin-top:4.0pt; margin-bottom:4.0pt; line-height:1.0; font-size:10pt; font-family:Calibri,sans-serif; white-space:nowrap; text-align:left;">${mobileText}</p>
                ${!showContactInfo ? `<p style="margin-top:4.0pt; margin-bottom:4.0pt; line-height:1.0; font-size:10pt; font-family:Calibri,sans-serif; white-space:nowrap; text-align:left;">${telText}</p>` : ""}
                ${showContactInfo ? `<p style="margin-top:4.0pt; margin-bottom:8.0pt; line-height:1.0; font-size:10pt; font-family:Calibri,sans-serif; white-space:nowrap; text-align:left;">${directText}</p>` : ""}
            </td>
        </tr>
        <tr>
            <td colspan="${secondLogoSrc ? 7 : 5}" style="width:100%; background:#FFC000; border:none; padding:0in 0in 0in 0.2in; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                <p style="margin:0; line-height:115%; font-size:10pt; font-family:Calibri,sans-serif;"><span style="color:#467886;"><a href="${domain.url}" target="_blank" style="color:#467886; font-weight:bold; text-decoration:underline;">${domain.display}</a></span></p>
            </td>
        </tr>
    </tbody>
</table>`
  }

  const resetForm = () => {
    setSignatureData({
      firstName: "",
      lastName: "",
      designation: "",
      department: "",
      mobile: "",
      direct: "",
      extension: "",
      address: "3rd Floor, No 101, Maya Avenue, Colombo 6, Sri Lanka.",
      selectedLogo: "holdings",
      customLogoBase64: "",
      customCompanyName: "",
      customDomain: "",
    })
  }

  const handleImageChange = (base64: string) => {
    setSignatureData((prev) => ({ ...prev, customLogoBase64: base64 }))
  }

  const handleLogoChange = (value: string) => {
    setSignatureData((prev) => ({ ...prev, selectedLogo: value }))
  }

  const handleDownloadHTML = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5)
    const filename = `${signatureData.firstName} ${signatureData.lastName} - ${timestamp}.html`
    const blob = new Blob([generatedHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const isFormValid = () => {
    return (
      signatureData.firstName &&
      signatureData.lastName &&
      signatureData.designation &&
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
              <img src="/images/LAUGFS Holdings.png" alt="LAUGFS Holdings" className="h-10" />
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
          {/* Left Column */}
          <div className="space-y-6">
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

            {/* Privacy Notice */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Shield className="h-5 w-5" />
                  Privacy Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700">
                  <strong>Your data is safe:</strong> This website does not save or store any user-entered information.
                  All data is processed locally in your browser and is not transmitted to any server. Your personal
                  information remains completely private and secure.
                </p>
              </CardContent>
            </Card>
          </div>

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
                  <Label htmlFor="companyLogo">Company Name *</Label>
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
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customCompanyName">Custom Company Name</Label>
                      <Input
                        id="customCompanyName"
                        placeholder="Enter your company name"
                        value={signatureData.customCompanyName}
                        onChange={(e) => setSignatureData({ ...signatureData, customCompanyName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customDomain">Company Website</Label>
                      <Input
                        id="customDomain"
                        placeholder="www.yourcompany.com"
                        value={signatureData.customDomain}
                        onChange={(e) => setSignatureData({ ...signatureData, customDomain: e.target.value })}
                      />
                      <p className="text-xs text-gray-500">Enter your company website (with or without https://)</p>
                    </div>
                    <ImageUpload
                      onImageChange={handleImageChange}
                      currentImage={signatureData.customLogoBase64}
                      label="Upload Custom Logo"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="MANOJ"
                      value={signatureData.firstName}
                      onChange={handleFirstNameChange}
                      className="font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="GAMAGE"
                      value={signatureData.lastName}
                      onChange={handleLastNameChange}
                      className="font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation *</Label>
                  <Combobox
                    options={designations}
                    value={signatureData.designation}
                    onValueChange={(value) => setSignatureData({ ...signatureData, designation: value })}
                    placeholder="Select or search your designation"
                    searchPlaceholder="Search designations..."
                    allowCustom={true}
                    customPlaceholder="Enter your custom designation..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Combobox
                    options={departments}
                    value={signatureData.department}
                    onValueChange={(value) => setSignatureData({ ...signatureData, department: value })}
                    placeholder="Select or search your department"
                    searchPlaceholder="Search departments..."
                    allowCustom={true}
                    customPlaceholder="Enter your custom department..."
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

                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="extension">Extension (Optional)</Label>
                    <Input
                      id="extension"
                      placeholder="6413"
                      value={signatureData.extension}
                      onChange={handleExtensionChange}
                      maxLength={4}
                    />
                    <p className="text-xs text-gray-500">4 digits only. Direct line will be auto-generated.</p>
                  </div>

                  {signatureData.extension.length === 4 && (
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="direct">Direct Line (Auto-generated)</Label>
                      <Input id="direct" value={signatureData.direct} readOnly className="bg-gray-50" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={resetForm} variant="outline" className="flex-1 bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleDownloadHTML}
                  variant="outline"
                  className="flex-1 bg-transparent"
                  disabled={!isFormValid()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download HTML
                </Button>
                <RichTextCopy htmlContent={generatedHTML} className="flex-1" disabled={!isFormValid()} />
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
                fullName: getFullName(),
                logoBase64: currentLogoBase64,
                secondLogoBase64: currentSecondLogoBase64,
              }}
              htmlContent={generatedHTML}
            />
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-[#FFC000] mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/images/LAUGFS Holdings.png" alt="LAUGFS Holdings" className="h-6" />
          </div>
          <p className="text-gray-600">Crafted with ❤️ by ITSM Team</p>
        </div>
      </footer>
    </div>
  )
}