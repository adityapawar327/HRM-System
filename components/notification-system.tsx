"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useHRData } from "@/hooks/use-hr-data"

export function NotificationSystem() {
  const { toast } = useToast()
  const { employees, leaveRequests, candidates, payrollRecords } = useHRData()

  useEffect(() => {
    // Check for pending leave requests
    const pendingLeaves = leaveRequests.filter((req) => req.status === "Pending")
    if (pendingLeaves.length > 0) {
      toast({
        title: "Pending Leave Requests",
        description: `You have ${pendingLeaves.length} leave request(s) awaiting approval.`,
        variant: "default",
      })
    }

    // Check for new candidates
    const newCandidates = candidates.filter((candidate) => candidate.stage === "Applied")
    if (newCandidates.length > 0) {
      toast({
        title: "New Applications",
        description: `${newCandidates.length} new candidate(s) have applied for positions.`,
        variant: "default",
      })
    }

    // Check for payroll processing
    const pendingPayroll = payrollRecords.filter((record) => record.status === "Pending")
    if (pendingPayroll.length > 0) {
      toast({
        title: "Payroll Processing",
        description: `${pendingPayroll.length} employee(s) have pending payroll processing.`,
        variant: "default",
      })
    }

    // Check for employees with low performance
    const lowPerformanceEmployees = employees.filter((emp) => emp.performanceRating && emp.performanceRating < 3)
    if (lowPerformanceEmployees.length > 0) {
      toast({
        title: "Performance Alert",
        description: `${lowPerformanceEmployees.length} employee(s) may need performance attention.`,
        variant: "destructive",
      })
    }
  }, [employees, leaveRequests, candidates, payrollRecords, toast])

  return null
}
