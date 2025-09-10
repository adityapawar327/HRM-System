"use client"

import { Users, Calendar, UserPlus, Heart, TrendingUp, TrendingDown } from "lucide-react"
import { useDashboardStats } from "@/hooks/use-hr-data"

export function StatsCards() {
  const stats = useDashboardStats()

  const statsConfig = [
    {
      title: "Total employees",
      value: stats.totalEmployees.toString(),
      change: "+15%",
      isPositive: true,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Number of leave",
      value: stats.activeLeaveRequests.toString(),
      change: "-10%",
      isPositive: false,
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "New employees",
      value: stats.newEmployeesThisMonth.toString(),
      change: "+12%",
      isPositive: true,
      icon: UserPlus,
      color: "bg-teal-500",
    },
    {
      title: "Happiness rate",
      value: `${stats.averagePerformanceRating}%`,
      change: "-11%",
      isPositive: false,
      icon: Heart,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown

        return (
          <div key={index} className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon size={20} className="text-white" />
              </div>
              <div
                className={`flex items-center space-x-1 text-sm ${stat.isPositive ? "text-green-400" : "text-red-400"}`}
              >
                <TrendIcon size={16} />
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
