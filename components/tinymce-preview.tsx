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
  const [loadingStatus, setLoadingStatus] = useState<string>("Initializing...")
  const [isClient, setIsClient] = useState(false)
  const editorId = `tinymce-preview-${Math.random().toString(36).substr(2, 9)}`

  // Debug: Log the HTML content being received
  useEffect(() => {
    console.log("TinyMCEPreview received htmlContent:", htmlContent)
    console.log("HTML content length:", htmlContent?.length || 0)
  }, [htmlContent])

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    let retryCount = 0
    const maxRetries = 10
    const retryInterval = 500

    const tryInitTinyMCE = () => {
      setLoadingStatus(`Attempt ${retryCount + 1}/${maxRetries} - Checking TinyMCE...`)
      console.log(`TinyMCE init attempt ${retryCount + 1}/${maxRetries}`)
      
      if (!window.tinymce) {
        console.log("TinyMCE not available yet")
        retryCount++
        if (retryCount < maxRetries) {
          setLoadingStatus(`Attempt ${retryCount + 1}/${maxRetries} - Retrying in ${retryInterval}ms...`)
          setTimeout(tryInitTinyMCE, retryInterval)
        } else {
          console.log("Max retries reached, using fallback")
          setError("TinyMCE not available after multiple attempts")
          setLoadingStatus("Failed to load TinyMCE")
        }
        return
      }

      // Wait for the DOM element to be available
      if (!editorRef.current) {
        console.log("Editor ref not available, waiting for DOM...")
        retryCount++
        if (retryCount < maxRetries) {
          setLoadingStatus(`Attempt ${retryCount + 1}/${maxRetries} - Waiting for editor element...`)
          setTimeout(tryInitTinyMCE, retryInterval)
        } else {
          console.log("Editor element not found after retries")
          setError("Editor element not found")
          setLoadingStatus("Editor element not found")
        }
        return
      }

      try {
        console.log("Initializing TinyMCE...")
        setLoadingStatus("Initializing TinyMCE editor...")
        
        window.tinymce.init({
          target: editorRef.current,
          height: 300,
          menubar: false,
          toolbar: false,
          statusbar: false,
          readonly: true,
          inline: false,
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
              console.log("TinyMCE initialized successfully")
              setTinymceLoaded(true)
              setError(null)
              setLoadingStatus("TinyMCE ready")
              
              // Set content after a small delay to ensure editor is fully ready
              setTimeout(() => {
                try {
                  editor.setContent(htmlContent)
                  console.log("Content set successfully")
                } catch (err) {
                  console.error("Error setting content:", err)
                }
              }, 100)
            })
          },
        })
      } catch (err) {
        console.error("TinyMCE initialization error:", err)
        setError("Failed to initialize TinyMCE")
        setLoadingStatus("Initialization failed")
      }
    }

    // Start the initialization process with a small delay to ensure DOM is ready
    const initTimer = setTimeout(tryInitTinyMCE, 100)

    return () => {
      clearTimeout(initTimer)
      if (window.tinymce && editorRef.current) {
        try {
          window.tinymce.remove(`#${editorRef.current.id}`)
        } catch (err) {
          console.error("Error removing TinyMCE:", err)
        }
      }
    }
  }, [htmlContent, isClient, editorId])

  useEffect(() => {
    if (tinymceLoaded && isClient && window.tinymce && editorRef.current) {
      try {
        const editor = window.tinymce.get(editorRef.current.id)
        if (editor) {
          console.log("Updating content:", htmlContent)
          editor.setContent(htmlContent)
        }
      } catch (err) {
        console.error("Error updating TinyMCE content:", err)
      }
    }
  }, [htmlContent, tinymceLoaded, isClient])

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="p-4 bg-gray-50 border-b">
          <p className="text-sm text-gray-600">Loading preview...</p>
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
      {/* Status bar */}
      <div className="p-4 bg-gray-50 border-b">
        <p className="text-sm text-gray-600">
          {error ? "Preview Error: " + error : loadingStatus}
        </p>
      </div>
      
      {/* Always render the textarea so TinyMCE can initialize on it */}
      <textarea
        ref={editorRef}
        id={editorId}
        defaultValue={htmlContent}
        style={{ 
          width: "100%", 
          height: "300px",
          display: tinymceLoaded ? "none" : "block" // Hide when TinyMCE is loaded
        }}
      />
      
      {/* Show fallback HTML if TinyMCE fails */}
      {error && (
        <div 
          className="p-4"
          style={{ 
            fontFamily: 'Calibri, sans-serif',
            fontSize: '10px',
            minHeight: '300px'
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  )
}
