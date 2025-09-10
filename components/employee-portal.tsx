"use client"

import { useState } from "react"
import { User, Calendar, FileText, Settings, Clock, Award, MessageSquare, Download } from "lucide-react"

export function EmployeePortal() {
  const [activeTab, setActiveTab] = useState("profile")
  const [leaveForm, setLeaveForm] = useState({
    type: "vacation",
    startDate: "",
    endDate: "",
    reason: ""
  })

  const employee = {
    name: "John Doe",
    id: "EMP001",
    position: "Senior Developer",
    department: "Engineering",
    manager: "Sarah Johnson",
    joinDate: "2022-01-15",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=80&width=80"
  }

  const leaveBalance = {
    vacation: { used: 8, total: 20 },
    sick: { used: 2, total: 10 },
    personal: { used: 1, total: 5 }
  }

  const recentPaystubs = [
    { date: "2024-01-31", gross: "$8,333", net: "$6,250", status: "Paid" },
    { date: "2023-12-31", gross: "$8,333", net: "$6,250", status: "Paid" },
    { date: "2023-11-30", gross: "$8,333", net: "$6,250", status: "Paid" }
  ]

  const performanceGoals = [
    { title: "Complete React Migration", progress: 85, deadline: "2024-03-15" },
    { title: "Mentor Junior Developers", progress: 60, deadline: "2024-06-30" },
    { title: "Improve Code Coverage", progress: 40, deadline: "2024-04-30" }
  ]

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "leave", label: "Leave Management", icon: Calendar },
    { id: "payroll", label: "Payroll", icon: FileText },
    { id: "performance", label: "Performance", icon: Award },
    { id: "settings", label: "Settings", icon: Settings }
  ]

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle leave request submission
    console.log("Leave request submitted:", leaveForm)
    setLeaveForm({ type: "vacation", startDate: "", endDate: "", reason: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Employee Portal</h1>
          <p className="text-gray-400 mt-1">Welcome back, {employee.name}</p>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-full border-2 border-gray-600"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400 bg-blue-500/10"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Full Name</label>
                  <p className="text-white font-medium">{employee.name}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Employee ID</label>
                  <p className="text-white font-medium">{employee.id}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Position</label>
                  <p className="text-white font-medium">{employee.position}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Department</label>
                  <p className="text-white font-medium">{employee.department}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <p className="text-white font-medium">{employee.email}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Phone</label>
                  <p className="text-white font-medium">{employee.phone}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Manager</label>
                  <p className="text-white font-medium">{employee.manager}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Join Date</label>
                  <p className="text-white font-medium">{employee.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leave" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Leave Management</h2>
            
            {/* Leave Balance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(leaveBalance).map(([type, balance]) => (
                <div key={type} className="bg-[#0f1015] rounded-lg p-4">
                  <h3 className="text-white font-medium capitalize mb-2">{type} Leave</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Used: {balance.used}</span>
                    <span className="text-gray-400 text-sm">Total: {balance.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(balance.used / balance.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-green-400 text-sm mt-2">
                    {balance.total - balance.used} days remaining
                  </p>
                </div>
              ))}
            </div>

            {/* Leave Request Form */}
            <div className="bg-[#0f1015] rounded-lg p-6">
              <h3 className="text-white font-medium mb-4">Request Leave</h3>
              <form onSubmit={handleLeaveSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Leave Type</label>
                    <select
                      value={leaveForm.type}
                      onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                      className="w-full bg-[#1a1b23] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="vacation">Vacation</option>
                      <option value="sick">Sick Leave</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Start Date</label>
                    <input
                      type="date"
                      value={leaveForm.startDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                      className="w-full bg-[#1a1b23] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">End Date</label>
                    <input
                      type="date"
                      value={leaveForm.endDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                      className="w-full bg-[#1a1b23] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Reason</label>
                  <textarea
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    className="w-full bg-[#1a1b23] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    rows={3}
                    placeholder="Please provide a reason for your leave request"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "payroll" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Payroll Information</h2>
            
            <div className="bg-[#0f1015] rounded-lg p-6">
              <h3 className="text-white font-medium mb-4">Recent Pay Stubs</h3>
              <div className="space-y-3">
                {recentPaystubs.map((paystub, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#1a1b23] rounded-lg">
                    <div>
                      <p className="text-white font-medium">{paystub.date}</p>
                      <p className="text-gray-400 text-sm">Gross: {paystub.gross} | Net: {paystub.net}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        {paystub.status}
                      </span>
                      <button className="text-blue-400 hover:text-blue-300">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Performance Goals</h2>
            
            <div className="space-y-4">
              {performanceGoals.map((goal, index) => (
                <div key={index} className="bg-[#0f1015] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">{goal.title}</h3>
                    <span className="text-gray-400 text-sm">Due: {goal.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-blue-400 text-sm font-medium">{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">Account Settings</h2>
            
            <div className="space-y-4">
              <div className="bg-[#0f1015] rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-300">Email notifications for leave approvals</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-300">SMS notifications for urgent updates</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300">Weekly performance summaries</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-[#0f1015] rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">Security</h3>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}