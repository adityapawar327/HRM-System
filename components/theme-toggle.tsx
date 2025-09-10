"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get theme from localStorage or default to dark
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark" | "system") || "dark"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = document.documentElement

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", newTheme === "dark")
    }
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
        <Moon className="h-4 w-4" />
      </Button>
    )
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "system":
        return <Monitor className="h-4 w-4" />
      default:
        return <Moon className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-gray-400 hover:text-white">
          {getThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#1a1b23] border-gray-700">
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className="text-gray-300 hover:text-white hover:bg-[#0f1015] cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className="text-gray-300 hover:text-white hover:bg-[#0f1015] cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className="text-gray-300 hover:text-white hover:bg-[#0f1015] cursor-pointer"
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
