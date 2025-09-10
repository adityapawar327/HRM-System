"use client"

import { useDashboardStats } from "@/hooks/use-hr-data"

export function RecruitmentProgress() {
  const stats = useDashboardStats()
  const candidates = stats.recentCandidates.map((candidate) => ({
    name: candidate.name,
    department: candidate.position,
    type: getTypeFromStage(candidate.stage),
    avatar: "/placeholder.svg?height=32&width=32",
  }))

  function getTypeFromStage(stage: string) {
    switch (stage) {
      case "Applied":
      case "Screening":
        return "Resume review"
      case "Interview":
        return "Tech interview"
      case "Final Review":
        return "Final interview"
      default:
        return "Resume review"
    }
  }

  const getStatusColor = (type: string) => {
    switch (type) {
      case "Tech interview":
        return "bg-blue-500"
      case "Resume review":
        return "bg-orange-500"
      case "Final interview":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-6">Recruitment progress</h3>

      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-gray-400 text-sm">
        <div>Full Name</div>
        <div>Department</div>
        <div>Type</div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 items-center">
            <div className="flex items-center space-x-3">
              <img src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} className="w-8 h-8 rounded-full" />
              <span className="text-white">{candidate.name}</span>
            </div>
            <div className="text-gray-300">{candidate.department}</div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(candidate.type)}`} />
              <span className="text-gray-300 text-sm">{candidate.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
