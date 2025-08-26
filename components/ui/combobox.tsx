"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ComboboxProps {
  options: string[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  allowCustom?: boolean
  customPlaceholder?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  allowCustom = false,
  customPlaceholder = "Enter custom value...",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const [isCustomMode, setIsCustomMode] = React.useState(false)

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchValue.toLowerCase()))

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue)
    setOpen(false)
    setSearchValue("")
    setIsCustomMode(false)
  }

  const handleCustomSubmit = () => {
    if (searchValue.trim()) {
      onValueChange(searchValue.trim())
      setOpen(false)
      setSearchValue("")
      setIsCustomMode(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isCustomMode && searchValue.trim()) {
      handleCustomSubmit()
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <div className="flex flex-col">
          <div className="p-2">
            <input
              type="text"
              placeholder={isCustomMode ? customPlaceholder : searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {allowCustom && (
            <div className="px-2 pb-2">
              {!isCustomMode ? (
                <Button variant="outline" size="sm" onClick={() => setIsCustomMode(true)} className="w-full text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Custom Option
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleCustomSubmit}
                  disabled={!searchValue.trim()}
                  className="w-full text-xs"
                >
                  Add "{searchValue}"
                </Button>
              )}
            </div>
          )}

          <div className="max-h-60 overflow-auto">
            {!isCustomMode && filteredOptions.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 text-center">No options found.</div>
            ) : !isCustomMode ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100",
                    value === option && "bg-blue-50",
                  )}
                  onClick={() => handleSelect(option)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")} />
                  {option}
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-gray-500 text-center">
                Type your custom option above and press Enter or click "Add"
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
