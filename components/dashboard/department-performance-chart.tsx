"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useHRData } from "../../hooks/use-hr-data"
import { TrendingUp } from "lucide-react"

export function DepartmentPerformanceChart() {
  const { employees, performanceReviews } = useHRData()

  // Calculate average performance by department
  const departmentPerformance = employees.reduce((acc, employee) => {
    const reviews = performanceReviews.filter(review => review.employeeId === employee.id)
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.overallRating, 0) / reviews.length 
      : 4.0

    if (!acc[employee.department]) {
      acc[employee.department] = {
        department: employee.department,
        totalRating: 0,
        count: 0,
        employees: 0
      }
    }
    
    acc[employee.department].totalRating += avgRating
    acc[employee.department].count += 1
    acc[employee.department].employees += 1
    
    return acc
  }, {} as Record<string, any>)

  const chartData = Object.values(departmentPerformance).map((dept: any) => ({
    name: dept.department,
    value: Math.round((dept.totalRating / dept.count) * 20), // Convert to percentage
    employees: dept.employees,
    rating: (dept.totalRating / dept.count).toFixed(1)
  }))

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-blue-400">Performance: {data.rating}/5.0</p>
          <p className="text-gray-400">Employees: {data.employees}</p>
        </div>
      )
    }
    return null
  }

  const topPerformer = chartData.reduce((max, dept) => 
    parseFloat(dept.rating) > parseFloat(max.rating) ? dept : max, chartData[0])

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <TrendingUp className="text-blue-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Department Performance</h3>
            <p className="text-gray-400 text-sm">Average performance ratings by department</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{topPerformer?.rating}</p>
          <p className="text-gray-400 text-sm">Top: {topPerformer?.name}</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-4">
          {chartData.map((dept, index) => (
            <div key={dept.name} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{dept.name}</p>
                <p className="text-gray-400 text-xs">{dept.employees} employees • {dept.rating}/5.0</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}