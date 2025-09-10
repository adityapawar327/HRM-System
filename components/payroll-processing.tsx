"use client"

import { useState } from "react"
import { DollarSign, Download, Eye, Calendar, Edit, Check, X, Search } from "lucide-react"
import * as XLSX from 'xlsx'

interface PayrollEmployee {
  id: number
  employeeName: string
  employeeId: string
  baseSalary: number
  overtime: number
  bonuses: number
  deductions: number
  netPay: number
  status: "Processed" | "Pending" | "Draft"
  payDate: string
  hoursWorked: number
  overtimeHours: number
}

export function PayrollProcessing() {
  const [selectedMonth, setSelectedMonth] = useState("2024-01")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showPayslipModal, setShowPayslipModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollEmployee | null>(null)
  const [editingEmployee, setEditingEmployee] = useState<PayrollEmployee | null>(null)

  const [payrollData, setPayrollData] = useState<PayrollEmployee[]>([
    {
      id: 1,
      employeeName: "John Doe",
      employeeId: "EMP001",
      baseSalary: 75000,
      overtime: 2500,
      bonuses: 5000,
      deductions: 1200,
      netPay: 81300,
      status: "Processed",
      payDate: "2024-01-31",
      hoursWorked: 160,
      overtimeHours: 10,
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      baseSalary: 68000,
      overtime: 1800,
      bonuses: 3000,
      deductions: 1100,
      netPay: 71700,
      status: "Pending",
      payDate: "2024-01-31",
      hoursWorked: 160,
      overtimeHours: 8,
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      employeeId: "EMP003",
      baseSalary: 82000,
      overtime: 3200,
      bonuses: 4500,
      deductions: 1400,
      netPay: 88300,
      status: "Draft",
      payDate: "2024-01-31",
      hoursWorked: 160,
      overtimeHours: 12,
    },
  ])

  const filteredPayrollData = payrollData.filter((employee) => {
    const matchesSearch =
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || employee.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPayroll = filteredPayrollData.reduce((sum, emp) => sum + emp.netPay, 0)

  const calculateNetPay = (employee: PayrollEmployee) => {
    const hourlyRate = employee.baseSalary / (160 * 12) // Assuming 160 hours per month
    const overtimePay = employee.overtimeHours * hourlyRate * 1.5
    const grossPay = employee.baseSalary / 12 + overtimePay + employee.bonuses
    return grossPay - employee.deductions
  }

  const processPayroll = (employeeId: number) => {
    setPayrollData((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, status: "Processed" as const, netPay: calculateNetPay(emp) } : emp,
      ),
    )
  }

  const processBulkPayroll = () => {
    setPayrollData((prev) =>
      prev.map((emp) =>
        emp.status === "Pending" || emp.status === "Draft"
          ? { ...emp, status: "Processed" as const, netPay: calculateNetPay(emp) }
          : emp,
      ),
    )
  }

  const saveEditedEmployee = () => {
    if (editingEmployee) {
      const updatedEmployee = {
        ...editingEmployee,
        netPay: calculateNetPay(editingEmployee),
      }
      setPayrollData((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? updatedEmployee : emp)))
      setShowEditModal(false)
      setEditingEmployee(null)
    }
  }

  const exportToExcel = () => {
    // Prepare data for Excel export
    const exportData = filteredPayrollData.map((employee) => ({
      'Employee ID': employee.employeeId,
      'Employee Name': employee.employeeName,
      'Base Salary': employee.baseSalary,
      'Overtime Pay': employee.overtime,
      'Overtime Hours': employee.overtimeHours,
      'Bonuses': employee.bonuses,
      'Deductions': employee.deductions,
      'Net Pay': employee.netPay,
      'Hours Worked': employee.hoursWorked,
      'Status': employee.status,
      'Pay Date': employee.payDate,
    }))

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(exportData)

    // Set column widths
    const columnWidths = [
      { wch: 12 }, // Employee ID
      { wch: 20 }, // Employee Name
      { wch: 15 }, // Base Salary
      { wch: 15 }, // Overtime Pay
      { wch: 15 }, // Overtime Hours
      { wch: 12 }, // Bonuses
      { wch: 12 }, // Deductions
      { wch: 15 }, // Net Pay
      { wch: 15 }, // Hours Worked
      { wch: 12 }, // Status
      { wch: 12 }, // Pay Date
    ]
    worksheet['!cols'] = columnWidths

    // Add summary row at the top
    const summaryData = [
      {
        'Employee ID': 'SUMMARY',
        'Employee Name': `Total Employees: ${filteredPayrollData.length}`,
        'Base Salary': '',
        'Overtime Pay': '',
        'Overtime Hours': '',
        'Bonuses': '',
        'Deductions': '',
        'Net Pay': `Total: $${totalPayroll.toLocaleString()}`,
        'Hours Worked': '',
        'Status': `Pay Period: ${selectedMonth}`,
        'Pay Date': new Date().toLocaleDateString(),
      },
      {}, // Empty row for spacing
    ]

    // Insert summary at the beginning
    XLSX.utils.sheet_add_json(worksheet, summaryData, { origin: 'A1' })
    XLSX.utils.sheet_add_json(worksheet, exportData, { origin: 'A4' })

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payroll Report')

    // Generate filename with current date and pay period
    const currentDate = new Date().toISOString().split('T')[0]
    const filename = `Payroll_Report_${selectedMonth}_${currentDate}.xlsx`

    // Save the file
    XLSX.writeFile(workbook, filename)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Payroll Processing</h1>
        <div className="flex items-center space-x-4">
          <button 
            type="button"
            onClick={exportToExcel}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            title="Export payroll data to Excel"
          >
            <Download size={20} />
            <span>Export Payroll</span>
          </button>
          <button
            onClick={processBulkPayroll}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <DollarSign size={20} />
            <span>Process All Pending</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Total Payroll</h3>
            <DollarSign className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">${totalPayroll.toLocaleString()}</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Employees Paid</h3>
            <Calendar className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">
            {payrollData.filter((emp) => emp.status === "Processed").length}
          </p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Pending</h3>
            <Calendar className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">
            {payrollData.filter((emp) => emp.status === "Pending").length}
          </p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Average Salary</h3>
            <DollarSign className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">
            ${Math.round(totalPayroll / payrollData.length).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Pay Period</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Processed">Processed</option>
                <option value="Pending">Pending</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <label className="block text-gray-400 text-sm mb-2">Search Employee</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0f1015] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white w-full focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1015] border-b border-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Employee</th>
                <th className="text-left p-4 text-gray-400 font-medium">Base Salary</th>
                <th className="text-left p-4 text-gray-400 font-medium">Overtime</th>
                <th className="text-left p-4 text-gray-400 font-medium">Bonuses</th>
                <th className="text-left p-4 text-gray-400 font-medium">Deductions</th>
                <th className="text-left p-4 text-gray-400 font-medium">Net Pay</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayrollData.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-800 hover:bg-[#0f1015] transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{employee.employeeName}</div>
                      <div className="text-gray-400 text-sm">{employee.employeeId}</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">${employee.baseSalary.toLocaleString()}</td>
                  <td className="p-4 text-gray-300">${employee.overtime.toLocaleString()}</td>
                  <td className="p-4 text-gray-300">${employee.bonuses.toLocaleString()}</td>
                  <td className="p-4 text-gray-300">${employee.deductions.toLocaleString()}</td>
                  <td className="p-4 text-white font-semibold">${employee.netPay.toLocaleString()}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${employee.status === "Processed"
                        ? "bg-green-500/20 text-green-400"
                        : employee.status === "Pending"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-gray-500/20 text-gray-400"
                        }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee)
                          setShowPayslipModal(true)
                        }}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                        title="View Payslip"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingEmployee(employee)
                          setShowEditModal(true)
                        }}
                        className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                        title="Edit Payroll"
                      >
                        <Edit size={16} />
                      </button>
                      {employee.status !== "Processed" && (
                        <button
                          onClick={() => processPayroll(employee.id)}
                          className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                          title="Process Payroll"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                        title="Download Payslip"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPayslipModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Payslip - {selectedEmployee.employeeName}</h2>
              <button onClick={() => setShowPayslipModal(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Employee ID</p>
                  <p className="text-white font-medium">{selectedEmployee.employeeId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Pay Period</p>
                  <p className="text-white font-medium">{selectedMonth}</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-white font-semibold mb-3">Earnings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base Salary</span>
                    <span className="text-white">${selectedEmployee.baseSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Overtime ({selectedEmployee.overtimeHours} hrs)</span>
                    <span className="text-white">${selectedEmployee.overtime.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bonuses</span>
                    <span className="text-white">${selectedEmployee.bonuses.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-white font-semibold mb-3">Deductions</h3>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Deductions</span>
                  <span className="text-white">${selectedEmployee.deductions.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Net Pay</span>
                  <span className="text-green-400">${selectedEmployee.netPay.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPayslipModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Download size={16} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Edit Payroll - {editingEmployee.employeeName}</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Base Salary</label>
                <input
                  type="number"
                  value={editingEmployee.baseSalary}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, baseSalary: Number(e.target.value) })}
                  className="bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Overtime Hours</label>
                <input
                  type="number"
                  value={editingEmployee.overtimeHours}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, overtimeHours: Number(e.target.value) })}
                  className="bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Bonuses</label>
                <input
                  type="number"
                  value={editingEmployee.bonuses}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, bonuses: Number(e.target.value) })}
                  className="bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Deductions</label>
                <input
                  type="number"
                  value={editingEmployee.deductions}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, deductions: Number(e.target.value) })}
                  className="bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedEmployee}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
