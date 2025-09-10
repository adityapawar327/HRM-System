"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useDashboardStats } from "@/hooks/use-hr-data"

export function ProjectEmploymentChart() {
  const stats = useDashboardStats()
  const data = stats.projectEmployment

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-6">Project employment</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <Bar dataKey="project" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="bench" fill="#6b7280" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-gray-300 text-sm">Project</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full" />
          <span className="text-gray-300 text-sm">Bench</span>
        </div>
      </div>
    </div>
  )
}
