"use client"

import {
  Home,
  Users,
  DollarSign,
  Calendar,
  UserPlus,
  TrendingUp,
  LogOut,
  FileText,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "employees", icon: Users, label: "Employees" },
    { id: "payroll", icon: DollarSign, label: "Payroll" },
    { id: "attendance", icon: Calendar, label: "Attendance" },
    { id: "recruitment", icon: UserPlus, label: "Recruitment" },
    { id: "performance", icon: TrendingUp, label: "Performance" },
    { id: "documents", icon: FileText, label: "Documents" },
  ]

  const bottomItems = [
    { id: "logout", icon: LogOut, label: "Logout" },
  ]

  return (
    <div className="w-64 bg-[#1a1b23] border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">b</span>
          </div>
          <span className="text-xl font-semibold">HR System</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-800">
        <ul className="space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
