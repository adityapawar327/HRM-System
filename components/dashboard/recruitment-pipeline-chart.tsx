"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, Cell } from "recharts"
import { useHRData } from "../../hooks/use-hr-data"
import { UserPlus } from "lucide-react"

export function RecruitmentPipelineChart() {
  const { candidates } = useHRData()

  // Pipeline stages data
  const pipelineData = [
    { stage: "Applied", count: candidates.filter(c => c.stage === "Applied").length || 25, color: "#3B82F6" },
    { stage: "Screening", count: candidates.filter(c => c.stage === "Screening").length || 18, color: "#10B981" },
    { stage: "Interview", count: candidates.filter(c => c.stage === "Interview").length || 12, color: "#F59E0B" },
    { stage: "Final Review", count: candidates.filter(c => c.stage === "Final Review").length || 8, color: "#EF4444" },
    { stage: "Hired", count: candidates.filter(c => c.stage === "Hired").length || 5, color: "#8B5CF6" },
  ]

  // Monthly hiring trends
  const monthlyHiringData = [
    { month: "Jul", applications: 45, hired: 8, conversionRate: 17.8 },
    { month: "Aug", applications: 52, hired: 12, conversionRate: 23.1 },
    { month: "Sep", applications: 38, hired: 6, conversionRate: 15.8 },
    { month: "Oct", applications: 41, hired: 9, conversionRate: 22.0 },
    { month: "Nov", applications: 48, hired: 11, conversionRate: 22.9 },
    { month: "Dec", applications: candidates.length || 35, hired: candidates.filter(c => c.stage === "Hired").length || 7, conversionRate: 0 },
  ]

  // Calculate current month conversion rate
  const currentApplications = monthlyHiringData[monthlyHiringData.length - 1].applications
  const currentHired = monthlyHiringData[monthlyHiringData.length - 1].hired
  const currentConversionRate = currentApplications > 0 ? Math.round((currentHired / currentApplications) * 100) : 20

  monthlyHiringData[monthlyHiringData.length - 1].conversionRate = currentConversionRate

  const totalCandidates = pipelineData.reduce((sum, stage) => sum + stage.count, 0)
  const conversionRate = totalCandidates > 0 ? Math.round((pipelineData[4].count / totalCandidates) * 100) : 20

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <UserPlus className="text-indigo-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Recruitment Pipeline</h3>
            <p className="text-gray-400 text-sm">Candidate journey and hiring trends</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{conversionRate}%</p>
          <p className="text-gray-400 text-sm">Conversion Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <div>
          <h4 className="text-white font-medium mb-3">Current Pipeline</h4>
          <div className="space-y-3">
            {pipelineData.map((stage, index) => {
              const percentage = totalCandidates > 0 ? (stage.count / totalCandidates) * 100 : 0
              return (
                <div key={stage.stage} className="flex items-center space-x-3">
                  <div className="w-24 text-gray-400 text-sm">{stage.stage}</div>
                  <div className="flex-1 bg-gray-700 rounded-full h-6 relative">
                    <div 
                      className="h-6 rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-300"
                      style={{ 
                        width: `${Math.max(percentage, 10)}%`, 
                        backgroundColor: stage.color 
                      }}
                    >
                      {stage.count}
                    </div>
                  </div>
                  <div className="w-12 text-gray-400 text-sm text-right">
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Monthly Trends */}
        <div>
          <h4 className="text-white font-medium mb-3">Monthly Hiring Trends</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyHiringData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
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
                  formatter={(value: number, name: string) => [
                    name === 'conversionRate' ? `${value}%` : value,
                    name === 'applications' ? 'Applications' : name === 'hired' ? 'Hired' : 'Conversion Rate'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  name="applications"
                />
                <Area 
                  type="monotone" 
                  dataKey="hired" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981"
                  fillOpacity={0.6}
                  name="hired"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{totalCandidates}</p>
            <p className="text-gray-400 text-sm">Total Candidates</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{pipelineData[4].count}</p>
            <p className="text-gray-400 text-sm">Hired</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{pipelineData[2].count}</p>
            <p className="text-gray-400 text-sm">In Interview</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            Average time to hire: 18 days
          </p>
        </div>
      </div>
    </div>
  )
}