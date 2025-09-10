"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useDashboardStats } from "@/hooks/use-hr-data"

export function AttendanceOverview() {
  const stats = useDashboardStats()
  const data = stats.monthlyAttendance

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Attendance Overview</h3>
        <select className="bg-[#0f1015] border border-gray-700 rounded px-3 py-1 text-white text-sm">
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <Bar dataKey="onTime" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="lateArrival" fill="#f97316" radius={[2, 2, 0, 0]} />
            <Bar dataKey="absent" fill="#ef4444" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-gray-300 text-sm">OnTime</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-gray-300 text-sm">Late Arrival</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-gray-300 text-sm">Absent</span>
        </div>
      </div>
    </div>
  )
}
