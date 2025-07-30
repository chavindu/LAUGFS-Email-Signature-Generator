"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"
import { useRef, useState } from "react"

interface ImageUploadProps {
  onImageChange: (base64: string) => void
  currentImage?: string
  label?: string
}

export function ImageUpload({ onImageChange, currentImage, label = "Upload Logo" }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0]

      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        onImageChange(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const removeImage = () => {
    onImageChange("")
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {currentImage ? (
        <div className="relative">
          <div className="border rounded-lg p-4 bg-gray-50">
            <img
              src={currentImage || "/placeholder.svg"}
              alt="Uploaded logo"
              className="max-w-full h-auto max-h-20 object-contain"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={removeImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Drag and drop your logo here, or click to browse</p>
          <p className="text-xs text-gray-500">Supports PNG, JPG, GIF (max 2MB)</p>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

      <p className="text-xs text-gray-500">Recommended size: 208x64 pixels for best results</p>
    </div>
  )
}
