import { StatsCards } from "./dashboard/stats-cards"
import { WorkingFormatChart } from "./dashboard/working-format-chart"
import { ProjectEmploymentChart } from "./dashboard/project-employment-chart"
import { ApplicationsProgress } from "./dashboard/applications-progress"
import { AttendanceOverview } from "./dashboard/attendance-overview"
import { StaffTurnover } from "./dashboard/staff-turnover"
import { RecruitmentProgress } from "./dashboard/recruitment-progress"
import { PayrollTrendsChart } from "./dashboard/payroll-trends-chart"
import { DepartmentPerformanceChart } from "./dashboard/department-performance-chart"
import { LeaveRequestsChart } from "./dashboard/leave-requests-chart"
import { RecruitmentPipelineChart } from "./dashboard/recruitment-pipeline-chart"
import { SalaryDistributionChart } from "./dashboard/salary-distribution-chart"

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row 1 - Working Format & Project Employment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkingFormatChart />
        <ProjectEmploymentChart />
      </div>

      {/* Charts Row 2 - Payroll & Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PayrollTrendsChart />
        <DepartmentPerformanceChart />
      </div>

      {/* Charts Row 3 - Attendance & Leave Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceOverview />
        <LeaveRequestsChart />
      </div>

      {/* Charts Row 4 - Recruitment Pipeline & Salary Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecruitmentPipelineChart />
        <SalaryDistributionChart />
      </div>

      {/* Charts Row 5 - Applications Progress & Staff Turnover */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationsProgress />
        <StaffTurnover />
      </div>

      {/* Charts Row 6 - Recruitment Progress (Full Width) */}
      <div className="grid grid-cols-1 gap-6">
        <RecruitmentProgress />
      </div>
    </div>
  )
}
