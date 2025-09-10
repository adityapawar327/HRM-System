"use client"

import { useState } from "react"
import { Search, Plus, Eye, MessageSquare, Calendar, Edit, Trash2, CheckCircle, XCircle, User } from "lucide-react"

export function RecruitmentManagement() {
  const [selectedStage, setSelectedStage] = useState("all")
  const [showJobModal, setShowJobModal] = useState(false)
  const [showCandidateModal, setShowCandidateModal] = useState(false)
  const [showInterviewModal, setShowInterviewModal] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    type: "Full-time",
    description: "",
    requirements: "",
  })
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: "",
  })

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      position: "Frontend Developer",
      email: "alice.johnson@email.com",
      phone: "+91 98765 43215",
      stage: "Technical Interview",
      appliedDate: "2024-01-10",
      experience: "3 years",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      resume: "alice_resume.pdf",
      notes: "Strong React skills, good communication",
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Backend Developer",
      email: "bob.smith@email.com",
      phone: "+91 98765 43216",
      stage: "Resume Review",
      appliedDate: "2024-01-12",
      experience: "5 years",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      resume: "bob_resume.pdf",
      notes: "Excellent Node.js experience",
    },
    {
      id: 3,
      name: "Carol Davis",
      position: "UX Designer",
      email: "carol.davis@email.com",
      phone: "+91 98765 43217",
      stage: "Final Interview",
      appliedDate: "2024-01-08",
      experience: "4 years",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      resume: "carol_resume.pdf",
      notes: "Great portfolio, creative thinking",
    },
  ])

  const [jobOpenings, setJobOpenings] = useState([
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      type: "Full-time",
      applicants: 25,
      status: "Active",
      description: "Looking for an experienced React developer",
      requirements: "5+ years React experience, TypeScript knowledge",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Design",
      type: "Full-time",
      applicants: 18,
      status: "Active",
      description: "Creative designer for user experience",
      requirements: "3+ years UX design, Figma proficiency",
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      type: "Full-time",
      applicants: 12,
      status: "Draft",
      description: "Strategic product management role",
      requirements: "MBA preferred, 5+ years product management",
    },
  ])

  const stages = ["all", "Resume Review", "Technical Interview", "Final Interview", "Offer Extended"]

  const handleJobSubmit = (e) => {
    e.preventDefault()
    const newJob = {
      id: jobOpenings.length + 1,
      ...jobForm,
      applicants: 0,
      status: "Active",
    }
    setJobOpenings([...jobOpenings, newJob])
    setJobForm({
      title: "",
      department: "",
      type: "Full-time",
      description: "",
      requirements: "",
    })
    setShowJobModal(false)
  }

  const handleCandidateSubmit = (e) => {
    e.preventDefault()
    const newCandidate = {
      id: candidates.length + 1,
      ...candidateForm,
      stage: "Resume Review",
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "",
    }
    setCandidates([...candidates, newCandidate])
    setCandidateForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      resume: "",
    })
    setShowCandidateModal(false)
  }

  const moveToNextStage = (candidateId) => {
    const stageOrder = ["Resume Review", "Technical Interview", "Final Interview", "Offer Extended", "Hired"]
    setCandidates(
      candidates.map((candidate) => {
        if (candidate.id === candidateId) {
          const currentIndex = stageOrder.indexOf(candidate.stage)
          const nextStage = currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : candidate.stage
          return { ...candidate, stage: nextStage }
        }
        return candidate
      }),
    )
  }

  const rejectCandidate = (candidateId) => {
    setCandidates(
      candidates.map((candidate) => (candidate.id === candidateId ? { ...candidate, status: "Rejected" } : candidate)),
    )
  }

  const filteredCandidates = candidates.filter(
    (candidate) => (selectedStage === "all" || candidate.stage === selectedStage) && candidate.status === "Active",
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Recruitment Management</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCandidateModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <User size={20} />
            <span>Add Candidate</span>
          </button>
          <button
            onClick={() => setShowJobModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Job Opening</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Active Jobs</h3>
            <Calendar className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{jobOpenings.filter((job) => job.status === "Active").length}</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Total Applicants</h3>
            <Search className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{jobOpenings.reduce((sum, job) => sum + job.applicants, 0)}</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">In Interview</h3>
            <MessageSquare className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">
            {candidates.filter((c) => c.stage.includes("Interview")).length}
          </p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Hired This Month</h3>
            <Eye className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">8</p>
        </div>
      </div>

      {/* Job Openings */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Active Job Openings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1015] border-b border-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Job Title</th>
                <th className="text-left p-4 text-gray-400 font-medium">Department</th>
                <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                <th className="text-left p-4 text-gray-400 font-medium">Applicants</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobOpenings.map((job) => (
                <tr key={job.id} className="border-b border-gray-800 hover:bg-[#0f1015] transition-colors">
                  <td className="p-4 text-white font-medium">{job.title}</td>
                  <td className="p-4 text-gray-300">{job.department}</td>
                  <td className="p-4 text-gray-300">{job.type}</td>
                  <td className="p-4 text-gray-300">{job.applicants}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidates */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Candidates</h2>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage === "all" ? "All Stages" : stage}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1015] border-b border-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Candidate</th>
                <th className="text-left p-4 text-gray-400 font-medium">Position</th>
                <th className="text-left p-4 text-gray-400 font-medium">Experience</th>
                <th className="text-left p-4 text-gray-400 font-medium">Stage</th>
                <th className="text-left p-4 text-gray-400 font-medium">Applied Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-gray-800 hover:bg-[#0f1015] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={candidate.avatar || "/placeholder.svg"}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-white font-medium">{candidate.name}</div>
                        <div className="text-gray-400 text-sm">{candidate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{candidate.position}</td>
                  <td className="p-4 text-gray-300">{candidate.experience}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                      {candidate.stage}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{candidate.appliedDate}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCandidate(candidate)
                          setShowInterviewModal(true)
                        }}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => moveToNextStage(candidate.id)}
                        className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => rejectCandidate(candidate.id)}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-md border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Add Job Opening</h3>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Job Title</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Department</label>
                <input
                  type="text"
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Employment Type</label>
                <select
                  value={jobForm.type}
                  onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Job Description</label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Requirements</label>
                <textarea
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Create Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCandidateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-md border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Add Candidate</h3>
            <form onSubmit={handleCandidateSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={candidateForm.name}
                  onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={candidateForm.email}
                  onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={candidateForm.phone}
                  onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Position Applied For</label>
                <input
                  type="text"
                  value={candidateForm.position}
                  onChange={(e) => setCandidateForm({ ...candidateForm, position: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Years of Experience</label>
                <input
                  type="text"
                  value={candidateForm.experience}
                  onChange={(e) => setCandidateForm({ ...candidateForm, experience: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCandidateModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showInterviewModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Candidate Details</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedCandidate.avatar || "/placeholder.svg"}
                  alt={selectedCandidate.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="text-white font-semibold">{selectedCandidate.name}</h4>
                  <p className="text-gray-400">{selectedCandidate.position}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 text-sm">Email:</span>
                  <p className="text-white">{selectedCandidate.email}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Phone:</span>
                  <p className="text-white">{selectedCandidate.phone}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Experience:</span>
                  <p className="text-white">{selectedCandidate.experience}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Applied Date:</span>
                  <p className="text-white">{selectedCandidate.appliedDate}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Current Stage:</span>
                <span className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                  {selectedCandidate.stage}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Notes:</span>
                <p className="text-white">{selectedCandidate.notes || "No notes available"}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowInterviewModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  moveToNextStage(selectedCandidate.id)
                  setShowInterviewModal(false)
                }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Move to Next Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
