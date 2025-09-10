"use client"

import { useState, useEffect } from "react"
import { Search, Maximize2, Minimize2, X } from "lucide-react"
import { UserProfile } from "./user-profile"
import { HelpCenter } from "./help-center"
import { Notifications } from "./notifications"

interface HeaderProps {
  globalSearchTerm: string
  setGlobalSearchTerm: (term: string) => void
  setSearchResults: (results: any[]) => void
  setActiveSection: (section: string) => void
}

export function Header({ globalSearchTerm, setGlobalSearchTerm, setSearchResults, setActiveSection }: HeaderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Check fullscreen status on mount and listen for changes
  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    checkFullscreen()
    document.addEventListener('fullscreenchange', checkFullscreen)
    
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen)
    }
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
    }
  }

  // Mock data for search - in a real app, this would come from your data store
  const mockData = {
    employees: [
      { id: "1", name: "John Doe", email: "john.doe@company.com", department: "Engineering", position: "Senior Developer" },
      { id: "2", name: "Jane Smith", email: "jane.smith@company.com", department: "Design", position: "UX Designer" },
      { id: "3", name: "Mike Johnson", email: "mike.johnson@company.com", department: "Marketing", position: "Marketing Manager" },
      { id: "4", name: "Sarah Wilson", email: "sarah.wilson@company.com", department: "HR", position: "HR Specialist" },
      { id: "5", name: "David Brown", email: "david.brown@company.com", department: "Sales", position: "Sales Representative" },
    ],
    departments: ["Engineering", "Design", "Marketing", "HR", "Sales"],
    positions: ["Senior Developer", "UX Designer", "Marketing Manager", "HR Specialist", "Sales Representative"],
  }

  const performSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    const results: any[] = []
    const searchLower = searchTerm.toLowerCase()

    // Search employees
    mockData.employees.forEach(employee => {
      if (
        employee.name.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower) ||
        employee.position.toLowerCase().includes(searchLower)
      ) {
        results.push({
          id: `employee-${employee.id}`,
          title: employee.name,
          subtitle: `${employee.position} in ${employee.department}`,
          section: "employees",
          type: "employee",
          data: employee
        })
      }
    })

    // Search departments
    mockData.departments.forEach(dept => {
      if (dept.toLowerCase().includes(searchLower)) {
        results.push({
          id: `dept-${dept}`,
          title: dept,
          subtitle: `Department`,
          section: "employees",
          type: "department",
          data: { department: dept }
        })
      }
    })

    // Search positions
    mockData.positions.forEach(position => {
      if (position.toLowerCase().includes(searchLower)) {
        results.push({
          id: `pos-${position}`,
          title: position,
          subtitle: `Job Position`,
          section: "employees",
          type: "position",
          data: { position }
        })
      }
    })

    // Add section-specific searches
    if ("payroll".includes(searchLower)) {
      results.push({
        id: "section-payroll",
        title: "Payroll Processing",
        subtitle: "Manage employee salaries and payments",
        section: "payroll",
        type: "section",
        data: {}
      })
    }

    if ("attendance".includes(searchLower) || "leave".includes(searchLower)) {
      results.push({
        id: "section-attendance",
        title: "Attendance & Leave",
        subtitle: "Track employee attendance and leave requests",
        section: "attendance",
        type: "section",
        data: {}
      })
    }

    if ("recruitment".includes(searchLower) || "hiring".includes(searchLower)) {
      results.push({
        id: "section-recruitment",
        title: "Recruitment Management",
        subtitle: "Manage job applications and hiring process",
        section: "recruitment",
        type: "section",
        data: {}
      })
    }

    if ("performance".includes(searchLower) || "review".includes(searchLower)) {
      results.push({
        id: "section-performance",
        title: "Performance Tracking",
        subtitle: "Employee performance reviews and evaluations",
        section: "performance",
        type: "section",
        data: {}
      })
    }

    if ("documents".includes(searchLower) || "files".includes(searchLower)) {
      results.push({
        id: "section-documents",
        title: "Documents Management",
        subtitle: "Manage employee documents and files",
        section: "documents",
        type: "section",
        data: {}
      })
    }

    setSearchResults(results)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGlobalSearchTerm(value)
    performSearch(value)
  }

  const clearSearch = () => {
    setGlobalSearchTerm("")
    setSearchResults([])
  }

  return (
    <header className="h-16 bg-[#1a1b23] border-b border-gray-800 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search employees, departments, sections..."
            value={globalSearchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#0f1015] border border-gray-700 rounded-lg pl-10 pr-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          {globalSearchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Notifications onNavigate={setActiveSection} />

        <HelpCenter />

        {/* Fullscreen */}
        <button 
          type="button"
          onClick={toggleFullscreen}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>

        <UserProfile />
      </div>
    </header>
  )
}
