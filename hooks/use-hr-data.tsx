"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Types for all HR data
export interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
  salary: number
  startDate: string
  status: "Active" | "Inactive"
  workingFormat: "Remote" | "Hybrid" | "Onsite"
}

export interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  baseSalary: number
  overtime: number
  deductions: number
  netPay: number
  status: "Pending" | "Processed" | "Paid"
  payPeriod: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  checkIn: string
  checkOut: string
  status: "Present" | "Absent" | "Late" | "Half Day"
  hoursWorked: number
}

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  type: "Sick" | "Vacation" | "Personal" | "Emergency"
  startDate: string
  endDate: string
  days: number
  status: "Pending" | "Approved" | "Rejected"
  reason: string
}

export interface Candidate {
  id: string
  name: string
  email: string
  position: string
  department: string
  stage: "Applied" | "Screening" | "Interview" | "Final Review" | "Hired" | "Rejected"
  appliedDate: string
  experience: string
}

export interface PerformanceReview {
  id: string
  employeeId: string
  employeeName: string
  reviewPeriod: string
  overallRating: number
  goals: number
  communication: number
  teamwork: number
  status: "Draft" | "Completed" | "Approved"
}

interface HRDataContextType {
  employees: Employee[]
  payrollRecords: PayrollRecord[]
  attendanceRecords: AttendanceRecord[]
  leaveRequests: LeaveRequest[]
  candidates: Candidate[]
  performanceReviews: PerformanceReview[]
  addEmployee: (employee: Omit<Employee, "id">) => void
  updateEmployee: (id: string, employee: Partial<Employee>) => void
  deleteEmployee: (id: string) => void
  addCandidate: (candidate: Omit<Candidate, "id">) => void
  updateCandidate: (id: string, candidate: Partial<Candidate>) => void
  addLeaveRequest: (request: Omit<LeaveRequest, "id">) => void
  updateLeaveRequest: (id: string, request: Partial<LeaveRequest>) => void
  checkInEmployee: (employeeId: string) => void
  checkOutEmployee: (employeeId: string) => void
  processPayroll: (employeeId: string) => void
  addPerformanceReview: (review: Omit<PerformanceReview, "id">) => void
  updatePerformanceReview: (id: string, review: Partial<PerformanceReview>) => void
}

const HRDataContext = createContext<HRDataContextType | undefined>(undefined)

// Mock data generator with consistent values to prevent hydration issues
const generateMockData = () => {
  const employees: Employee[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john@company.com",
      department: "Engineering",
      position: "Senior Developer",
      salary: 85000,
      startDate: "2022-01-15",
      status: "Active",
      workingFormat: "Hybrid",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      salary: 75000,
      startDate: "2021-08-20",
      status: "Active",
      workingFormat: "Remote",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@company.com",
      department: "Engineering",
      position: "Frontend Developer",
      salary: 70000,
      startDate: "2023-03-10",
      status: "Active",
      workingFormat: "Onsite",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@company.com",
      department: "HR",
      position: "HR Specialist",
      salary: 65000,
      startDate: "2022-11-05",
      status: "Active",
      workingFormat: "Hybrid",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@company.com",
      department: "Sales",
      position: "Sales Representative",
      salary: 60000,
      startDate: "2023-01-20",
      status: "Active",
      workingFormat: "Remote",
    },
  ]

  // Use consistent values instead of Math.random() to prevent hydration issues
  const overtimeValues = [1500, 800, 1200, 600, 900]
  const deductionValues = [500, 300, 400, 200, 350]
  
  const payrollRecords: PayrollRecord[] = employees
    .map((emp, index) => ({
      id: `pr-${emp.id}`,
      employeeId: emp.id,
      employeeName: emp.name,
      baseSalary: emp.salary / 12,
      overtime: overtimeValues[index],
      deductions: deductionValues[index],
      netPay: 0,
      status: index % 3 === 0 ? "Pending" : index % 3 === 1 ? "Processed" : "Paid",
      payPeriod: "December 2024",
    }))
    .map((record) => ({
      ...record,
      netPay: record.baseSalary + record.overtime - record.deductions,
    }))

  const attendanceRecords: AttendanceRecord[] = []
  // Use a fixed date to prevent hydration issues
  const baseDate = new Date('2024-12-01')
  for (let i = 0; i < 30; i++) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() - i)
    employees.forEach((emp, empIndex) => {
      // Use deterministic logic instead of Math.random()
      if ((i + empIndex) % 10 !== 0) { // 90% attendance rate
        attendanceRecords.push({
          id: `att-${emp.id}-${i}`,
          employeeId: emp.id,
          employeeName: emp.name,
          date: date.toISOString().split("T")[0],
          checkIn: "09:00",
          checkOut: "17:30",
          status: (i + empIndex) % 20 === 0 ? "Late" : "Present", // 5% late rate
          hoursWorked: 8.5,
        })
      }
    })
  }

  const leaveRequests: LeaveRequest[] = [
    {
      id: "lr-1",
      employeeId: "1",
      employeeName: "John Smith",
      type: "Vacation",
      startDate: "2024-12-20",
      endDate: "2024-12-25",
      days: 5,
      status: "Approved",
      reason: "Holiday vacation",
    },
    {
      id: "lr-2",
      employeeId: "2",
      employeeName: "Sarah Johnson",
      type: "Sick",
      startDate: "2024-12-15",
      endDate: "2024-12-16",
      days: 2,
      status: "Pending",
      reason: "Flu symptoms",
    },
    {
      id: "lr-3",
      employeeId: "3",
      employeeName: "Mike Chen",
      type: "Personal",
      startDate: "2024-12-18",
      endDate: "2024-12-18",
      days: 1,
      status: "Approved",
      reason: "Personal appointment",
    },
  ]

  const candidates: Candidate[] = [
    {
      id: "c-1",
      name: "Dom Sibley",
      email: "dom@email.com",
      position: "DevOps Engineer",
      department: "Engineering",
      stage: "Interview",
      appliedDate: "2024-12-01",
      experience: "5 years",
    },
    {
      id: "c-2",
      name: "Joe Root",
      email: "joe@email.com",
      position: "UX/UI Designer",
      department: "Design",
      stage: "Final Review",
      appliedDate: "2024-11-28",
      experience: "3 years",
    },
    {
      id: "c-3",
      name: "Zak Crawley",
      email: "zak@email.com",
      position: ".Net Developer",
      department: "Engineering",
      stage: "Screening",
      appliedDate: "2024-12-05",
      experience: "4 years",
    },
  ]

  // Use consistent ratings instead of Math.random() to prevent hydration issues
  const ratings = [4, 5, 4, 5, 4]
  const performanceReviews: PerformanceReview[] = employees.map((emp, index) => ({
    id: `perf-${emp.id}`,
    employeeId: emp.id,
    employeeName: emp.name,
    reviewPeriod: "Q4 2024",
    overallRating: ratings[index], // 4-5 rating
    goals: ratings[index],
    communication: ratings[index],
    teamwork: ratings[index],
    status: "Completed",
  }))

  return { employees, payrollRecords, attendanceRecords, leaveRequests, candidates, performanceReviews }
}

export function HRDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(() => generateMockData())

  // Calculate derived stats with consistent values to prevent hydration issues
  const referenceDate = new Date('2024-12-01')
  const stats = {
    totalEmployees: data.employees.filter((emp) => emp.status === "Active").length,
    activeLeaveRequests: data.leaveRequests.filter(
      (req) => req.status === "Approved" && new Date(req.endDate) >= referenceDate,
    ).length,
    newEmployeesThisMonth: data.employees.filter((emp) => {
      const startDate = new Date(emp.startDate)
      return startDate.getMonth() === referenceDate.getMonth() && startDate.getFullYear() === referenceDate.getFullYear()
    }).length,
    averagePerformanceRating:
      data.performanceReviews.reduce((acc, review) => acc + review.overallRating, 0) / data.performanceReviews.length,
    workingFormatDistribution: {
      remote: data.employees.filter((emp) => emp.workingFormat === "Remote").length,
      hybrid: data.employees.filter((emp) => emp.workingFormat === "Hybrid").length,
      onsite: data.employees.filter((emp) => emp.workingFormat === "Onsite").length,
    },
    attendanceRate:
      (data.attendanceRecords.filter((record) => record.status === "Present").length / data.attendanceRecords.length) *
      100,
    pendingApplications: data.candidates.filter((c) => c.stage !== "Hired" && c.stage !== "Rejected").length,
    monthlyTurnover: 3, // Fixed value instead of Math.random()
  }

  const addEmployee = (employee: Omit<Employee, "id">) => {
    const newEmployee = { ...employee, id: `emp-${Date.now()}` }
    setData((prev) => ({ ...prev, employees: [...prev.employees, newEmployee] }))
  }

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setData((prev) => ({
      ...prev,
      employees: prev.employees.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp)),
    }))
  }

  const deleteEmployee = (id: string) => {
    setData((prev) => ({
      ...prev,
      employees: prev.employees.filter((emp) => emp.id !== id),
    }))
  }

  const addCandidate = (candidate: Omit<Candidate, "id">) => {
    const newCandidate = { ...candidate, id: `c-${Date.now()}` }
    setData((prev) => ({ ...prev, candidates: [...prev.candidates, newCandidate] }))
  }

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setData((prev) => ({
      ...prev,
      candidates: prev.candidates.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }))
  }

  const addLeaveRequest = (request: Omit<LeaveRequest, "id">) => {
    const newRequest = { ...request, id: `lr-${Date.now()}` }
    setData((prev) => ({ ...prev, leaveRequests: [...prev.leaveRequests, newRequest] }))
  }

  const updateLeaveRequest = (id: string, updates: Partial<LeaveRequest>) => {
    setData((prev) => ({
      ...prev,
      leaveRequests: prev.leaveRequests.map((req) => (req.id === id ? { ...req, ...updates } : req)),
    }))
  }

  const checkInEmployee = (employeeId: string) => {
    const employee = data.employees.find((emp) => emp.id === employeeId)
    if (employee) {
      const today = new Date().toISOString().split("T")[0]
      const newRecord: AttendanceRecord = {
        id: `att-${employeeId}-${Date.now()}`,
        employeeId,
        employeeName: employee.name,
        date: today,
        checkIn: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
        checkOut: "",
        status: "Present",
        hoursWorked: 0,
      }
      setData((prev) => ({ ...prev, attendanceRecords: [...prev.attendanceRecords, newRecord] }))
    }
  }

  const checkOutEmployee = (employeeId: string) => {
    const today = new Date().toISOString().split("T")[0]
    setData((prev) => ({
      ...prev,
      attendanceRecords: prev.attendanceRecords.map((record) => {
        if (record.employeeId === employeeId && record.date === today && !record.checkOut) {
          const checkOutTime = new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })
          const checkInTime = new Date(`2000-01-01 ${record.checkIn}`)
          const checkOutTimeDate = new Date(`2000-01-01 ${checkOutTime}`)
          const hoursWorked = (checkOutTimeDate.getTime() - checkInTime.getTime()) / (1000 * 60 * 60)

          return {
            ...record,
            checkOut: checkOutTime,
            hoursWorked: Math.round(hoursWorked * 100) / 100,
          }
        }
        return record
      }),
    }))
  }

  const processPayroll = (employeeId: string) => {
    setData((prev) => ({
      ...prev,
      payrollRecords: prev.payrollRecords.map((record) =>
        record.employeeId === employeeId ? { ...record, status: "Processed" as const } : record,
      ),
    }))
  }

  const addPerformanceReview = (review: Omit<PerformanceReview, "id">) => {
    const newReview = { ...review, id: `perf-${Date.now()}` }
    setData((prev) => ({ ...prev, performanceReviews: [...prev.performanceReviews, newReview] }))
  }

  const updatePerformanceReview = (id: string, updates: Partial<PerformanceReview>) => {
    setData((prev) => ({
      ...prev,
      performanceReviews: prev.performanceReviews.map((review) =>
        review.id === id ? { ...review, ...updates } : review,
      ),
    }))
  }

  const contextValue: HRDataContextType = {
    ...data,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addCandidate,
    updateCandidate,
    addLeaveRequest,
    updateLeaveRequest,
    checkInEmployee,
    checkOutEmployee,
    processPayroll,
    addPerformanceReview,
    updatePerformanceReview,
  }

  return <HRDataContext.Provider value={contextValue}>{children}</HRDataContext.Provider>
}

export function useHRData() {
  const context = useContext(HRDataContext)
  if (context === undefined) {
    throw new Error("useHRData must be used within a HRDataProvider")
  }
  return context
}

// Hook for dashboard statistics
export function useDashboardStats() {
  const data = useHRData()

  return {
    totalEmployees: data.employees.filter((emp) => emp.status === "Active").length,
    activeLeaveRequests: data.leaveRequests.filter(
      (req) => req.status === "Approved" && new Date(req.endDate) >= new Date(),
    ).length,
    newEmployeesThisMonth: data.employees.filter((emp) => {
      const startDate = new Date(emp.startDate)
      // Use fixed date to prevent hydration issues
      const referenceDate = new Date('2024-12-01')
      return startDate.getMonth() === referenceDate.getMonth() && startDate.getFullYear() === referenceDate.getFullYear()
    }).length,
    averagePerformanceRating: Math.round(
      (data.performanceReviews.reduce((acc, review) => acc + review.overallRating, 0) /
        data.performanceReviews.length) *
        20,
    ), // Convert to percentage
    workingFormatDistribution: {
      remote: data.employees.filter((emp) => emp.workingFormat === "Remote").length,
      hybrid: data.employees.filter((emp) => emp.workingFormat === "Hybrid").length,
      onsite: data.employees.filter((emp) => emp.workingFormat === "Onsite").length,
    },
    attendanceRate: Math.round(
      (data.attendanceRecords.filter((record) => record.status === "Present").length / data.attendanceRecords.length) *
        100,
    ),
    pendingApplications: data.candidates.filter((c) => c.stage !== "Hired" && c.stage !== "Rejected").length,
    applicationsByStage: {
      applied: data.candidates.filter((c) => c.stage === "Applied").length,
      screening: data.candidates.filter((c) => c.stage === "Screening").length,
      interview: data.candidates.filter((c) => c.stage === "Interview").length,
      finalReview: data.candidates.filter((c) => c.stage === "Final Review").length,
      hired: data.candidates.filter((c) => c.stage === "Hired").length,
      rejected: data.candidates.filter((c) => c.stage === "Rejected").length,
    },
    recentCandidates: data.candidates.slice(0, 3),
    monthlyAttendance: generateMonthlyAttendanceData(data.attendanceRecords),
    monthlyTurnover: generateMonthlyTurnoverData(),
    projectEmployment: generateProjectEmploymentData(data.employees),
  }
}

// Helper functions for chart data with consistent values to prevent hydration issues
function generateMonthlyAttendanceData(attendanceRecords: AttendanceRecord[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const onTimeValues = [180, 175, 190, 185, 170, 195, 188, 192, 178, 183, 187, 191]
  const lateValues = [25, 30, 22, 28, 35, 20, 24, 21, 32, 27, 23, 26]
  const absentValues = [15, 18, 12, 16, 20, 10, 14, 13, 19, 17, 15, 14]
  
  return months.map((month, index) => ({
    month,
    onTime: onTimeValues[index],
    lateArrival: lateValues[index],
    absent: absentValues[index],
  }))
}

function generateMonthlyTurnoverData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
  const turnoverValues = [120, 95, 180, 140, 75, 200, 160, 110, 135]
  
  return months.map((month, index) => ({
    month,
    turnover: turnoverValues[index],
  }))
}

function generateProjectEmploymentData(employees: Employee[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const projectValues = [180, 220, 210, 200, 190, 230, 170]
  const benchValues = [40, 35, 45, 50, 55, 30, 60]
  
  return days.map((day, index) => ({
    day,
    project: projectValues[index],
    bench: benchValues[index],
  }))
}
