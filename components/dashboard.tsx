import { StatsCards } from "./dashboard/stats-cards"
import { WorkingFormatChart } from "./dashboard/working-format-chart"
import { ProjectEmploymentChart } from "./dashboard/project-employment-chart"
import { ApplicationsProgress } from "./dashboard/applications-progress"
import { AttendanceOverview } from "./dashboard/attendance-overview"
import { StaffTurnover } from "./dashboard/staff-turnover"
import { RecruitmentProgress } from "./dashboard/recruitment-progress"

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkingFormatChart />
        <ProjectEmploymentChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationsProgress />
        <AttendanceOverview />
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StaffTurnover />
        <RecruitmentProgress />
      </div>
    </div>
  )
}
