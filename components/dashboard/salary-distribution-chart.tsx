"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts"
import { useHRData } from "../../hooks/use-hr-data"
import { IndianRupee } from "lucide-react"

export function SalaryDistributionChart() {
  const { employees } = useHRData()

  // Salary ranges in Indian Rupees (Lakhs)
  const salaryRanges = [
    { range: "3-5L", min: 300000, max: 500000, count: 0, color: "#3B82F6" },
    { range: "5-7L", min: 500000, max: 700000, count: 0, color: "#10B981" },
    { range: "7-10L", min: 700000, max: 1000000, count: 0, color: "#F59E0B" },
    { range: "10-15L", min: 1000000, max: 1500000, count: 0, color: "#EF4444" },
    { range: "15L+", min: 1500000, max: Infinity, count: 0, color: "#8B5CF6" },
  ]

  // Count employees in each salary range
  employees.forEach(emp => {
    const salaryRange = salaryRanges.find(range => 
      emp.salary >= range.min && emp.salary < range.max
    )
    if (salaryRange) {
      salaryRange.count++
    }
  })

  // Department-wise average salary
  const departmentSalaries = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { total: 0, count: 0, employees: [] }
    }
    acc[emp.department].total += emp.salary
    acc[emp.department].count++
    acc[emp.department].employees.push(emp)
    return acc
  }, {} as Record<string, any>)

  const departmentAvgData = Object.entries(departmentSalaries).map(([dept, data]) => ({
    department: dept,
    avgSalary: Math.round(data.total / data.count),
    employees: data.count,
    minSalary: Math.min(...data.employees.map((e: any) => e.salary)),
    maxSalary: Math.max(...data.employees.map((e: any) => e.salary)),
  }))

  // Salary vs Experience scatter data (mock experience data)
  const experienceData = employees.map((emp, index) => ({
    experience: 2 + (index * 1.5), // Mock experience years
    salary: emp.salary / 100000, // Convert to lakhs
    department: emp.department,
    name: emp.name
  }))

  const totalSalaryBudget = employees.reduce((sum, emp) => sum + emp.salary, 0)
  const avgSalary = Math.round(totalSalaryBudget / employees.length)
  const highestPaid = Math.max(...employees.map(emp => emp.salary))

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <IndianRupee className="text-emerald-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Salary Distribution</h3>
            <p className="text-gray-400 text-sm">Compensation analysis across organization</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">₹{(avgSalary / 100000).toFixed(1)}L</p>
          <p className="text-gray-400 text-sm">Average Salary</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Range Distribution */}
        <div>
          <h4 className="text-white font-medium mb-3">Salary Ranges</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryRanges} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="range" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value: number) => [`${value} employees`, 'Count']}
                />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Average Salaries */}
        <div>
          <h4 className="text-white font-medium mb-3">Department Averages</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentAvgData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="department" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value: number, name: string) => [
                    `₹${(value / 100000).toFixed(1)}L`,
                    'Average Salary'
                  ]}
                  labelFormatter={(label) => `${label} Department`}
                />
                <Bar dataKey="avgSalary" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Salary Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0f1015] rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">₹{(totalSalaryBudget / 10000000).toFixed(1)}Cr</p>
            <p className="text-gray-400 text-sm">Total Budget</p>
          </div>
          <div className="bg-[#0f1015] rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">₹{(highestPaid / 100000).toFixed(1)}L</p>
            <p className="text-gray-400 text-sm">Highest Paid</p>
          </div>
          <div className="bg-[#0f1015] rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{salaryRanges.find(r => r.count === Math.max(...salaryRanges.map(s => s.count)))?.range}</p>
            <p className="text-gray-400 text-sm">Most Common</p>
          </div>
          <div className="bg-[#0f1015] rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">{employees.length}</p>
            <p className="text-gray-400 text-sm">Total Employees</p>
          </div>
        </div>
      </div>

      {/* Salary Range Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        {salaryRanges.map((range) => (
          <div key={range.range} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: range.color }}
            ></div>
            <span className="text-gray-400 text-sm">{range.range} ({range.count})</span>
          </div>
        ))}
      </div>
    </div>
  )
}