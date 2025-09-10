"use client"

import { useDashboardStats } from "@/hooks/use-hr-data"

export function ApplicationsProgress() {
  const stats = useDashboardStats()

  const totalApplications = Object.values(stats.applicationsByStage).reduce((sum, count) => sum + count, 0)

  const applications = [
    {
      label: "Applications",
      count: stats.applicationsByStage.applied + stats.applicationsByStage.screening,
      percentage: Math.round(
        ((stats.applicationsByStage.applied + stats.applicationsByStage.screening) / totalApplications) * 100,
      ),
      color: "bg-blue-500",
    },
    {
      label: "Shortlisted",
      count: stats.applicationsByStage.interview + stats.applicationsByStage.finalReview,
      percentage: Math.round(
        ((stats.applicationsByStage.interview + stats.applicationsByStage.finalReview) / totalApplications) * 100,
      ),
      color: "bg-green-500",
    },
    {
      label: "On-Hold",
      count: Math.floor(totalApplications * 0.1), // Mock on-hold data
      percentage: 10,
      color: "bg-orange-500",
    },
    {
      label: "Rejected",
      count: stats.applicationsByStage.rejected,
      percentage: Math.round((stats.applicationsByStage.rejected / totalApplications) * 100),
      color: "bg-red-500",
    },
  ]

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-6">Total Applications</h3>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="bg-red-500" style={{ width: `${applications[3].percentage}%` }} />
          <div className="bg-orange-500" style={{ width: `${applications[2].percentage}%` }} />
          <div className="bg-green-500" style={{ width: `${applications[1].percentage}%` }} />
          <div className="bg-blue-500" style={{ width: `${applications[0].percentage}%` }} />
        </div>
      </div>

      {/* Application stats */}
      <div className="space-y-4">
        {applications.map((app, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${app.color}`} />
              <span className="text-gray-300">{app.label}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">{app.count}</span>
              <div className="bg-gray-700 rounded-full px-2 py-1">
                <span className="text-xs text-gray-300">{app.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
