"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { EmployeeManagement } from "@/components/employee-management"
import { PayrollProcessing } from "@/components/payroll-processing"
import { AttendanceLeave } from "@/components/attendance-leave"
import { RecruitmentManagement } from "@/components/recruitment-management"
import { PerformanceTracking } from "@/components/performance-tracking"
import { DocumentsManagement } from "@/components/documents-management" // Added documents management import
import { GlobalSearchResults } from "@/components/global-search-results"
import { NotificationProvider } from "@/hooks/use-notifications"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { EmployeePortal } from "@/components/employee-portal"
import { ReportsSystem } from "@/components/reports-system"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [globalSearchTerm, setGlobalSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState(null)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "employees":
        return <EmployeeManagement />
      case "payroll":
        return <PayrollProcessing />
      case "attendance":
        return <AttendanceLeave />
      case "recruitment":
        return <RecruitmentManagement />
      case "performance":
        return <PerformanceTracking />
      case "documents": // Added documents case to render documents management
        return <DocumentsManagement />
      case "analytics":
        return <AnalyticsDashboard />
      case "reports":
        return <ReportsSystem />
      case "portal":
        return <EmployeePortal />
      default:
        return <Dashboard />
    }
  }

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-[#0f1015] text-white">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 flex flex-col">
          <Header 
            globalSearchTerm={globalSearchTerm}
            setGlobalSearchTerm={setGlobalSearchTerm}
            setSearchResults={setSearchResults}
            setActiveSection={setActiveSection}
          />
          <main className="flex-1 overflow-auto p-6">
            {searchResults ? (
              <GlobalSearchResults 
                results={searchResults} 
                searchTerm={globalSearchTerm}
                onClearSearch={() => {
                  setSearchResults(null)
                  setGlobalSearchTerm("")
                }}
                onNavigate={(section) => {
                  setActiveSection(section)
                  setSearchResults(null)
                  setGlobalSearchTerm("")
                }}
              />
            ) : (
              renderContent()
            )}
          </main>
        </div>
      </div>
    </NotificationProvider>
  )
}
