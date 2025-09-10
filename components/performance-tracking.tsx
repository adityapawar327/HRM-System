"use client"

import { useState } from "react"
import { TrendingUp, Target, Award, Calendar, Plus, Eye, Edit, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PerformanceTracking() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-Q1")
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [reviewForm, setReviewForm] = useState({
    employeeId: "",
    overallScore: 0,
    technicalSkills: 0,
    communication: 0,
    teamwork: 0,
    leadership: 0,
    comments: "",
    goals: "",
  })
  const [goalForm, setGoalForm] = useState({
    title: "",
    description: "",
    employeeId: "",
    dueDate: "",
    priority: "medium",
  })

  const performanceData = [
    {
      id: 1,
      employeeName: "John Doe",
      department: "Engineering",
      overallScore: 4.2,
      technicalSkills: 4.5,
      communication: 4.0,
      teamwork: 4.1,
      leadership: 3.8,
      goals: { completed: 8, total: 10 },
      lastReview: "2024-01-15",
      nextReview: "2024-04-15",
      status: "On Track",
      avatar: "/placeholder.svg?height=40&width=40",
      recentAchievements: ["Completed React certification", "Led team project successfully"],
      areasForImprovement: ["Time management", "Code documentation"],
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      department: "Design",
      overallScore: 4.7,
      technicalSkills: 4.8,
      communication: 4.9,
      teamwork: 4.6,
      leadership: 4.5,
      goals: { completed: 9, total: 10 },
      lastReview: "2024-01-10",
      nextReview: "2024-04-10",
      status: "Exceeding",
      avatar: "/placeholder.svg?height=40&width=40",
      recentAchievements: ["Redesigned user interface", "Mentored junior designers"],
      areasForImprovement: ["Technical skills", "Project planning"],
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      department: "Marketing",
      overallScore: 3.8,
      technicalSkills: 3.5,
      communication: 4.2,
      teamwork: 3.9,
      leadership: 3.6,
      goals: { completed: 6, total: 10 },
      lastReview: "2024-01-20",
      nextReview: "2024-04-20",
      status: "Needs Improvement",
      avatar: "/placeholder.svg?height=40&width=40",
      recentAchievements: ["Launched successful campaign", "Improved social media engagement"],
      areasForImprovement: ["Goal completion", "Strategic thinking"],
    },
  ]

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete React Training",
      description: "Complete advanced React course and certification",
      employee: "John Doe",
      employeeId: 1,
      dueDate: "2024-02-15",
      progress: 75,
      status: "In Progress",
      priority: "high",
      createdDate: "2024-01-01",
    },
    {
      id: 2,
      title: "Design System Implementation",
      description: "Implement new design system across all products",
      employee: "Jane Smith",
      employeeId: 2,
      dueDate: "2024-02-28",
      progress: 90,
      status: "Nearly Complete",
      priority: "high",
      createdDate: "2024-01-05",
    },
    {
      id: 3,
      title: "Marketing Campaign Launch",
      description: "Launch Q1 marketing campaign for new product",
      employee: "Mike Johnson",
      employeeId: 3,
      dueDate: "2024-02-10",
      progress: 60,
      status: "Behind Schedule",
      priority: "medium",
      createdDate: "2024-01-10",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Exceeding":
        return "bg-green-500/20 text-green-400"
      case "On Track":
        return "bg-blue-500/20 text-blue-400"
      case "Needs Improvement":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case "Nearly Complete":
        return "bg-green-500/20 text-green-400"
      case "In Progress":
        return "bg-blue-500/20 text-blue-400"
      case "Behind Schedule":
        return "bg-red-500/20 text-red-400"
      case "Not Started":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const handleCreateReview = () => {
    console.log("[v0] Creating performance review:", reviewForm)
    // In a real app, this would save to database
    setIsReviewModalOpen(false)
    setReviewForm({
      employeeId: "",
      overallScore: 0,
      technicalSkills: 0,
      communication: 0,
      teamwork: 0,
      leadership: 0,
      comments: "",
      goals: "",
    })
  }

  const handleCreateGoal = () => {
    const newGoal = {
      id: goals.length + 1,
      ...goalForm,
      employee: performanceData.find((emp) => emp.id.toString() === goalForm.employeeId)?.employeeName || "",
      progress: 0,
      status: "Not Started",
      createdDate: new Date().toISOString().split("T")[0],
    }
    setGoals([...goals, newGoal])
    setIsGoalModalOpen(false)
    setGoalForm({
      title: "",
      description: "",
      employeeId: "",
      dueDate: "",
      priority: "medium",
    })
  }

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee)
  }

  const updateGoalProgress = (goalId: number, newProgress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              progress: newProgress,
              status:
                newProgress === 100
                  ? "Completed"
                  : newProgress > 75
                    ? "Nearly Complete"
                    : newProgress > 0
                      ? "In Progress"
                      : "Not Started",
            }
          : goal,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Performance Tracking</h1>
        <div className="flex items-center space-x-4">
          <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Review
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1b23] border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Performance Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Employee</Label>
                  <Select
                    value={reviewForm.employeeId}
                    onValueChange={(value) => setReviewForm({ ...reviewForm, employeeId: value })}
                  >
                    <SelectTrigger className="bg-[#0f1015] border-gray-700">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1b23] border-gray-700">
                      {performanceData.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id.toString()}>
                          {emp.employeeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Technical Skills (1-5)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={reviewForm.technicalSkills}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, technicalSkills: Number.parseFloat(e.target.value) })
                      }
                      className="bg-[#0f1015] border-gray-700"
                    />
                  </div>
                  <div>
                    <Label>Communication (1-5)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={reviewForm.communication}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, communication: Number.parseFloat(e.target.value) })
                      }
                      className="bg-[#0f1015] border-gray-700"
                    />
                  </div>
                  <div>
                    <Label>Teamwork (1-5)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={reviewForm.teamwork}
                      onChange={(e) => setReviewForm({ ...reviewForm, teamwork: Number.parseFloat(e.target.value) })}
                      className="bg-[#0f1015] border-gray-700"
                    />
                  </div>
                  <div>
                    <Label>Leadership (1-5)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={reviewForm.leadership}
                      onChange={(e) => setReviewForm({ ...reviewForm, leadership: Number.parseFloat(e.target.value) })}
                      className="bg-[#0f1015] border-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <Label>Comments</Label>
                  <Textarea
                    value={reviewForm.comments}
                    onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Goals for Next Period</Label>
                  <Textarea
                    value={reviewForm.goals}
                    onChange={(e) => setReviewForm({ ...reviewForm, goals: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateReview} className="bg-blue-600 hover:bg-blue-700">
                    Create Review
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-gray-700 bg-transparent">
                <Target className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1b23] border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Goal Title</Label>
                  <Input
                    value={goalForm.title}
                    onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={goalForm.description}
                    onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Assign to Employee</Label>
                  <Select
                    value={goalForm.employeeId}
                    onValueChange={(value) => setGoalForm({ ...goalForm, employeeId: value })}
                  >
                    <SelectTrigger className="bg-[#0f1015] border-gray-700">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1b23] border-gray-700">
                      {performanceData.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id.toString()}>
                          {emp.employeeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={goalForm.dueDate}
                      onChange={(e) => setGoalForm({ ...goalForm, dueDate: e.target.value })}
                      className="bg-[#0f1015] border-gray-700"
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={goalForm.priority}
                      onValueChange={(value) => setGoalForm({ ...goalForm, priority: value })}
                    >
                      <SelectTrigger className="bg-[#0f1015] border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1b23] border-gray-700">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsGoalModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGoal} className="bg-blue-600 hover:bg-blue-700">
                    Create Goal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-[#1a1b23] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="2024-Q1">Q1 2024</option>
            <option value="2023-Q4">Q4 2023</option>
            <option value="2023-Q3">Q3 2023</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Average Score</h3>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">4.2</p>
          <p className="text-green-400 text-sm">+0.3 from last quarter</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Goals Completed</h3>
            <Target className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">23/30</p>
          <p className="text-blue-400 text-sm">77% completion rate</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Top Performers</h3>
            <Award className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">5</p>
          <p className="text-orange-400 text-sm">Exceeding expectations</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Reviews Due</h3>
            <Calendar className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-purple-400 text-sm">This month</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Employee Performance Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1015] border-b border-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Employee</th>
                <th className="text-left p-4 text-gray-400 font-medium">Department</th>
                <th className="text-left p-4 text-gray-400 font-medium">Overall Score</th>
                <th className="text-left p-4 text-gray-400 font-medium">Goals Progress</th>
                <th className="text-left p-4 text-gray-400 font-medium">Last Review</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-800 hover:bg-[#0f1015] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={employee.avatar || "/placeholder.svg"}
                        alt={employee.employeeName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="text-white font-medium">{employee.employeeName}</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{employee.department}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{employee.overallScore}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${
                              star <= Math.floor(employee.overallScore) ? "text-yellow-400" : "text-gray-600"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300 text-sm">
                        {employee.goals.completed}/{employee.goals.total}
                      </span>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(employee.goals.completed / employee.goals.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{employee.lastReview}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewEmployee(employee)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1a1b23] border-gray-700 text-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Performance Details - {employee.employeeName}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Skills Breakdown</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Technical Skills</span>
                                    <div className="flex items-center">
                                      <span className="mr-2">{employee.technicalSkills}</span>
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= employee.technicalSkills ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Communication</span>
                                    <div className="flex items-center">
                                      <span className="mr-2">{employee.communication}</span>
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= employee.communication ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Teamwork</span>
                                    <div className="flex items-center">
                                      <span className="mr-2">{employee.teamwork}</span>
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= employee.teamwork ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Leadership</span>
                                    <div className="flex items-center">
                                      <span className="mr-2">{employee.leadership}</span>
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= employee.leadership ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Recent Achievements</h4>
                                <ul className="space-y-1 text-sm text-gray-300">
                                  {employee.recentAchievements.map((achievement, idx) => (
                                    <li key={idx}>• {achievement}</li>
                                  ))}
                                </ul>
                                <h4 className="font-semibold mb-2 mt-4">Areas for Improvement</h4>
                                <ul className="space-y-1 text-sm text-gray-300">
                                  {employee.areasForImprovement.map((area, idx) => (
                                    <li key={idx}>• {area}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Goals Tracking */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Active Goals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1015] border-b border-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Goal</th>
                <th className="text-left p-4 text-gray-400 font-medium">Employee</th>
                <th className="text-left p-4 text-gray-400 font-medium">Due Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Progress</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <tr key={goal.id} className="border-b border-gray-800 hover:bg-[#0f1015] transition-colors">
                  <td className="p-4 text-white font-medium">{goal.title}</td>
                  <td className="p-4 text-gray-300">{goal.employee}</td>
                  <td className="p-4 text-gray-300">{goal.dueDate}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${goal.progress}%` }} />
                      </div>
                      <span className="text-gray-300 text-sm">{goal.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={(e) => updateGoalProgress(goal.id, Number.parseInt(e.target.value))}
                        className="w-16 h-8 bg-[#0f1015] border-gray-700 text-xs"
                      />
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
