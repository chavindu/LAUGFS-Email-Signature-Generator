"use client"

import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface CopySuccessToastProps {
  show: boolean
  message?: string
}

export function CopySuccessToast({ show, message = "Signature copied with formatting!" }: CopySuccessToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}
