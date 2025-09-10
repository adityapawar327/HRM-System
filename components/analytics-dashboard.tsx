"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Target, BarChart3, PieChart } from "lucide-react"

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("all")

  const metrics = [
    {
      title: "Employee Satisfaction",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "text-green-400 bg-green-500/20"
    },
    {
      title: "Retention Rate",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: Target,
      color: "text-blue-400 bg-blue-500/20"
    },
    {
      title: "Average Salary",
      value: "$78,500",
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-400 bg-purple-500/20"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-3 days",
      trend: "down",
      icon: Calendar,
      color: "text-orange-400 bg-orange-500/20"
    }
  ]

  const departmentData = [
    { name: "Engineering", employees: 45, budget: "$2.1M", performance: 92 },
    { name: "Sales", employees: 32, budget: "$1.8M", performance: 88 },
    { name: "Marketing", employees: 18, budget: "$950K", performance: 85 },
    { name: "HR", employees: 12, budget: "$720K", performance: 90 },
    { name: "Design", employees: 15, budget: "$890K", performance: 94 }
  ]

  const performanceTrends = [
    { month: "Jan", performance: 85, satisfaction: 82, retention: 91 },
    { month: "Feb", performance: 87, satisfaction: 84, retention: 93 },
    { month: "Mar", performance: 89, satisfaction: 86, retention: 94 },
    { month: "Apr", performance: 91, satisfaction: 87, retention: 95 },
    { month: "May", performance: 88, satisfaction: 85, retention: 92 },
    { month: "Jun", performance: 92, satisfaction: 89, retention: 96 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Comprehensive HR metrics and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-[#1a1b23] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
          
          return (
            <div key={index} className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <Icon size={20} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === "up" ? "text-green-400" : "text-red-400"
                }`}>
                  <TrendIcon size={16} />
                  <span>{metric.change}</span>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* Performance Trends Chart */}
      <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Performance Trends</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Satisfaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Retention</span>
            </div>
          </div>
        </div>
        
        {/* Simple Chart Representation */}
        <div className="space-y-4">
          {performanceTrends.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-gray-400 text-sm">{data.month}</div>
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 bg-gray-800 rounded-full h-2 relative">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${data.performance}%` }}
                  ></div>
                </div>
                <span className="text-blue-400 text-sm w-8">{data.performance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-6">Department Overview</h2>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#0f1015] rounded-lg">
                <div>
                  <h3 className="text-white font-medium">{dept.name}</h3>
                  <p className="text-gray-400 text-sm">{dept.employees} employees</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{dept.budget}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${dept.performance}%` }}
                      ></div>
                    </div>
                    <span className="text-green-400 text-sm">{dept.performance}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-6">Key Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp size={16} className="text-blue-400" />
                <h3 className="text-blue-400 font-medium">Performance Improvement</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Overall performance increased by 12% this quarter, with Engineering leading at 94%.
              </p>
            </div>
            
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target size={16} className="text-green-400" />
                <h3 className="text-green-400 font-medium">Retention Success</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Employee retention rate reached 94%, exceeding the industry average by 8%.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar size={16} className="text-orange-400" />
                <h3 className="text-orange-400 font-medium">Hiring Efficiency</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Time to hire reduced to 18 days, improving recruitment efficiency by 15%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}