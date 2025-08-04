"use client"

import { useEffect, useState } from "react"

export default function TestTinyMCEPage() {
  const [tinymceStatus, setTinymceStatus] = useState<string>("Checking...")
  const [windowStatus, setWindowStatus] = useState<string>("Checking...")

  useEffect(() => {
    const checkTinyMCE = () => {
      console.log("=== TinyMCE Test ===")
      console.log("Window object:", typeof window)
      console.log("Window available:", typeof window !== "undefined")
      
      if (typeof window !== "undefined") {
        setWindowStatus("Window is available")
        console.log("TinyMCE object:", window.tinymce)
        console.log("TinyMCE type:", typeof window.tinymce)
        
        if (window.tinymce) {
          setTinymceStatus("TinyMCE is loaded and available")
          console.log("TinyMCE version:", window.tinymce.majorVersion)
        } else {
          setTinymceStatus("TinyMCE is NOT loaded")
        }
      } else {
        setWindowStatus("Window is NOT available (SSR)")
      }
    }

    // Check immediately
    checkTinyMCE()

    // Check again after a delay
    const timer = setTimeout(checkTinyMCE, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">TinyMCE Loading Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Window Status:</h2>
          <p className="text-sm">{windowStatus}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">TinyMCE Status:</h2>
          <p className="text-sm">{tinymceStatus}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Instructions:</h2>
          <p className="text-sm mb-2">1. Open browser developer console (F12)</p>
          <p className="text-sm mb-2">2. Look for "=== TinyMCE Test ===" messages</p>
          <p className="text-sm mb-2">3. Check if TinyMCE is loading from the CDN</p>
          <p className="text-sm">4. Verify the status messages above</p>
        </div>
      </div>
    </div>
  )
} 