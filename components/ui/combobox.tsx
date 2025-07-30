"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface ComboboxProps {
  options: string[]
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  searchPlaceholder: string
  className?: string
}

export function Combobox({ options, value, onValueChange, placeholder, searchPlaceholder, className }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options
    return options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [options, searchTerm])

  const handleSelect = (option: string) => {
    onValueChange(option)
    setOpen(false)
    setSearchTerm("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[300px] p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 px-0 py-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">No option found.</div>
          ) : (
            <div className="p-1">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    value === option && "bg-accent text-accent-foreground",
                  )}
                  onClick={() => handleSelect(option)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")} />
                  <span className="truncate">{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
