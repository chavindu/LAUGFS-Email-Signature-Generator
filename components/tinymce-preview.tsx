"use client"

import { useEffect, useRef, useState } from "react"

interface TinyMCEPreviewProps {
  htmlContent: string
}

declare global {
  interface Window {
    tinymce: any
  }
}

export function TinyMCEPreview({ htmlContent }: TinyMCEPreviewProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const [tinymceLoaded, setTinymceLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if TinyMCE is available
    const checkTinyMCE = () => {
      if (typeof window !== "undefined" && window.tinymce) {
        setTinymceLoaded(true)
        return true
      }
      return false
    }

    // Try to initialize TinyMCE
    const initTinyMCE = () => {
      if (!checkTinyMCE() || !editorRef.current) {
        setError("TinyMCE not available")
        return
      }

      try {
        window.tinymce.init({
          target: editorRef.current,
          height: 300,
          menubar: false,
          toolbar: false,
          statusbar: false,
          readonly: true,
          content_style: `
            body { 
              font-family: Calibri, sans-serif; 
              font-size: 10px; 
              margin: 10px;
              background: white;
            }
            table {
              border-collapse: collapse;
              width: 670.5pt;
              margin-left: 6.75pt;
              margin-right: 6.75pt;
              border: none;
            }
            td {
              vertical-align: top;
              padding: 0;
            }
            p {
              margin: 0;
              line-height: 1.0;
              font-size: 10px;
              font-family: Calibri, sans-serif;
            }
            img {
              display: block;
              height: 48px;
              width: auto;
              object-fit: contain;
            }
            a {
              color: #467886;
              font-weight: bold;
              text-decoration: underline;
            }
          `,
          setup: (editor: any) => {
            editor.on("init", () => {
              editor.setContent(htmlContent)
            })
          },
        })
      } catch (err) {
        setError("Failed to initialize TinyMCE")
        console.error("TinyMCE initialization error:", err)
      }
    }

    // Wait a bit for TinyMCE to load
    const timer = setTimeout(() => {
      initTinyMCE()
    }, 1000)

    return () => {
      clearTimeout(timer)
      if (typeof window !== "undefined" && window.tinymce && editorRef.current) {
        try {
          window.tinymce.remove(`#${editorRef.current.id}`)
        } catch (err) {
          console.error("Error removing TinyMCE:", err)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (tinymceLoaded && typeof window !== "undefined" && window.tinymce && editorRef.current) {
      try {
        const editor = window.tinymce.get(editorRef.current.id)
        if (editor) {
          editor.setContent(htmlContent)
        }
      } catch (err) {
        console.error("Error updating TinyMCE content:", err)
      }
    }
  }, [htmlContent, tinymceLoaded])

  // Fallback preview if TinyMCE fails
  if (error || !tinymceLoaded) {
    return (
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="p-4 bg-gray-50 border-b">
          <p className="text-sm text-gray-600">
            {error ? "Preview Error: " + error : "Loading preview..."}
          </p>
        </div>
        <div 
          className="p-4"
          style={{ 
            fontFamily: 'Calibri, sans-serif',
            fontSize: '10px',
            minHeight: '300px'
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <textarea
        ref={editorRef}
        id="tinymce-preview"
        defaultValue={htmlContent}
        style={{ width: "100%", height: "300px" }}
      />
    </div>
  )
}
