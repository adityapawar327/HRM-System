"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useDashboardStats } from "@/hooks/use-hr-data"

export function WorkingFormatChart() {
  const stats = useDashboardStats()

  const data = [
    { name: "Employee Hybrid", value: stats.workingFormatDistribution.hybrid, color: "#3b82f6" },
    { name: "Employee onsite", value: stats.workingFormatDistribution.onsite, color: "#f97316" },
    { name: "Employee Remote", value: stats.workingFormatDistribution.remote, color: "#ef4444" },
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-6">Working Format</h3>

      <div className="flex items-center justify-between">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-sm">Total</div>
              <div className="text-white text-xl font-bold">{total}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-300 text-sm">{item.name}</span>
              <span className="text-white font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
