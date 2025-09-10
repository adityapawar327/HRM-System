"use client"

import { useState } from "react"
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp, Users } from "lucide-react"

export function ReportsSystem() {
  const [selectedReport, setSelectedReport] = useState("employee")
  const [dateRange, setDateRange] = useState("month")
  const [department, setDepartment] = useState("all")

  const reportTypes = [
    {
      id: "employee",
      name: "Employee Report",
      description: "Comprehensive employee data and statistics",
      icon: Users,
      color: "text-blue-400 bg-blue-500/20"
    },
    {
      id: "payroll",
      name: "Payroll Report",
      description: "Salary, benefits, and compensation analysis",
      icon: BarChart3,
      color: "text-green-400 bg-green-500/20"
    },
    {
      id: "attendance",
      name: "Attendance Report",
      description: "Time tracking and attendance patterns",
      icon: Calendar,
      color: "text-purple-400 bg-purple-500/20"
    },
    {
      id: "performance",
      name: "Performance Report",
      description: "Employee performance and goal tracking",
      icon: TrendingUp,
      color: "text-orange-400 bg-orange-500/20"
    }
  ]

  const employeeReportData = {
    totalEmployees: 122,
    newHires: 8,
    terminations: 3,
    departments: [
      { name: "Engineering", count: 45, percentage: 37 },
      { name: "Sales", count: 32, percentage: 26 },
      { name: "Marketing", count: 18, percentage: 15 },
      { name: "HR", count: 12, percentage: 10 },
      { name: "Design", count: 15, percentage: 12 }
    ],
    ageGroups: [
      { range: "20-30", count: 48, percentage: 39 },
      { range: "31-40", count: 42, percentage: 34 },
      { range: "41-50", count: 22, percentage: 18 },
      { range: "51+", count: 10, percentage: 9 }
    ]
  }

  const payrollReportData = {
    totalPayroll: "₹6,73,87,500",
    averageSalary: "₹5,61,562",
    salaryRanges: [
      { range: "₹3L-5L", count: 28, percentage: 23 },
      { range: "₹5L-7L", count: 45, percentage: 37 },
      { range: "₹7L-10L", count: 32, percentage: 26 },
      { range: "₹10L+", count: 17, percentage: 14 }
    ],
    benefits: {
      healthInsurance: 118,
      retirement401k: 95,
      paidTimeOff: 122,
      lifeInsurance: 89
    }
  }

  const generateReport = () => {
    // Simulate report generation
    console.log(`Generating ${selectedReport} report for ${dateRange} period`)
  }

  const exportReport = (format: string) => {
    // Simulate report export
    console.log(`Exporting ${selectedReport} report as ${format}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">Generate comprehensive HR reports and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={generateReport}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <FileText size={16} />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border transition-colors text-left ${
                selectedReport === report.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-800 bg-[#1a1b23] hover:border-gray-700"
              }`}
            >
              <div className={`p-2 rounded-lg ${report.color} w-fit mb-3`}>
                <Icon size={20} />
              </div>
              <h3 className="text-white font-medium mb-1">{report.name}</h3>
              <p className="text-gray-400 text-sm">{report.description}</p>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-4">Report Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
              <option value="design">Design</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter size={16} />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {reportTypes.find(r => r.id === selectedReport)?.name} - {dateRange}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportReport('pdf')}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
            >
              <Download size={14} />
              <span>PDF</span>
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
            >
              <Download size={14} />
              <span>Excel</span>
            </button>
            <button
              onClick={() => exportReport('csv')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
            >
              <Download size={14} />
              <span>CSV</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {selectedReport === "employee" && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0f1015] rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm mb-1">Total Employees</h3>
                  <p className="text-2xl font-bold text-white">{employeeReportData.totalEmployees}</p>
                </div>
                <div className="bg-[#0f1015] rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm mb-1">New Hires</h3>
                  <p className="text-2xl font-bold text-green-400">{employeeReportData.newHires}</p>
                </div>
                <div className="bg-[#0f1015] rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm mb-1">Terminations</h3>
                  <p className="text-2xl font-bold text-red-400">{employeeReportData.terminations}</p>
                </div>
              </div>

              {/* Department Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-4">Department Distribution</h3>
                  <div className="space-y-3">
                    {employeeReportData.departments.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{dept.name}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${dept.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm w-8">{dept.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-4">Age Distribution</h3>
                  <div className="space-y-3">
                    {employeeReportData.ageGroups.map((group, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{group.range}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{ width: `${group.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-white text-sm w-8">{group.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedReport === "payroll" && (
            <div className="space-y-6">
              {/* Payroll Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f1015] rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm mb-1">Total Monthly Payroll</h3>
                  <p className="text-2xl font-bold text-white">{payrollReportData.totalPayroll}</p>
                </div>
                <div className="bg-[#0f1015] rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm mb-1">Average Salary</h3>
                  <p className="text-2xl font-bold text-green-400">{payrollReportData.averageSalary}</p>
                </div>
              </div>

              {/* Salary Distribution */}
              <div>
                <h3 className="text-white font-medium mb-4">Salary Range Distribution</h3>
                <div className="space-y-3">
                  {payrollReportData.salaryRanges.map((range, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300">{range.range}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${range.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-8">{range.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Enrollment */}
              <div>
                <h3 className="text-white font-medium mb-4">Benefits Enrollment</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(payrollReportData.benefits).map(([benefit, count]) => (
                    <div key={benefit} className="bg-[#0f1015] rounded-lg p-4 text-center">
                      <p className="text-gray-400 text-sm capitalize mb-1">
                        {benefit.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xl font-bold text-white">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(selectedReport === "attendance" || selectedReport === "performance") && (
            <div className="text-center py-12">
              <FileText size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">Report Coming Soon</h3>
              <p className="text-gray-400">
                {selectedReport === "attendance" ? "Attendance" : "Performance"} reports are currently being developed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}