"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useDashboardStats } from "@/hooks/use-hr-data"

export function StaffTurnover() {
  const stats = useDashboardStats()
  const data = stats.monthlyTurnover

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-6">Staff turnover</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="turnover"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#8b5cf6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
