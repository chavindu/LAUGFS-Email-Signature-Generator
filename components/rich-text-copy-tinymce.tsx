"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { CopySuccessToast } from "@/components/copy-success-toast"

interface RichTextCopyTinyMCEProps {
  className?: string
  disabled?: boolean
  htmlContent?: string
}

const RichTextCopyTinyMCE: React.FC<RichTextCopyTinyMCEProps> = ({ 
  className, 
  disabled = false, 
  htmlContent = "" 
}) => {
  const [copyRichSuccess, setCopyRichSuccess] = useState(false)

  const copyRichText = async () => {
    if (disabled) return

    try {
      console.log("Copying HTML content, length:", htmlContent?.length || 0)

      if (!htmlContent) {
        console.error("No HTML content provided to copy")
        return
      }

      // Create a temporary div with the signature HTML
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = htmlContent
      tempDiv.style.position = "absolute"
      tempDiv.style.left = "-9999px"
      document.body.appendChild(tempDiv)

      // Select the content
      const range = document.createRange()
      range.selectNodeContents(tempDiv)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)

      // Copy as rich text
      const success = document.execCommand("copy")

      // Clean up
      document.body.removeChild(tempDiv)
      selection?.removeAllRanges()

      if (success) {
        setCopyRichSuccess(true)
        setTimeout(() => setCopyRichSuccess(false), 3000)
      } else {
        // Fallback to clipboard API
        try {
          const blob = new Blob([htmlContent], { type: "text/html" })
          const clipboardItem = new ClipboardItem({ "text/html": blob })
          await navigator.clipboard.write([clipboardItem])
          setCopyRichSuccess(true)
          setTimeout(() => setCopyRichSuccess(false), 3000)
        } catch (fallbackErr) {
          console.error("Fallback copy also failed: ", fallbackErr)
        }
      }
    } catch (err) {
      console.error("Failed to copy rich text: ", err)
    }
  }

  return (
    <>
      <Button
        onClick={copyRichText}
        className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={disabled}
      >
        {copyRichSuccess ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </>
        )}
      </Button>
      <CopySuccessToast show={copyRichSuccess} message="Signature copied with formatting!" />
    </>
  )
}

export { RichTextCopyTinyMCE }
