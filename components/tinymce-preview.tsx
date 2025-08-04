"use client"

import { useEffect, useRef } from "react"

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

  useEffect(() => {
    if (typeof window !== "undefined" && window.tinymce && editorRef.current) {
      // Initialize TinyMCE
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
    }

    return () => {
      if (typeof window !== "undefined" && window.tinymce && editorRef.current) {
        window.tinymce.remove(`#${editorRef.current.id}`)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.tinymce && editorRef.current) {
      const editor = window.tinymce.get(editorRef.current.id)
      if (editor) {
        editor.setContent(htmlContent)
      }
    }
  }, [htmlContent])

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
