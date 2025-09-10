"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useHRData } from "../../hooks/use-hr-data"
import { Calendar } from "lucide-react"

export function LeaveRequestsChart() {
    const { leaveRequests, employees } = useHRData()

    // Generate monthly leave data
    const monthlyLeaveData = [
        { month: "Jul", approved: 12, pending: 3, rejected: 2 },
        { month: "Aug", approved: 15, pending: 2, rejected: 1 },
        { month: "Sep", approved: 18, pending: 4, rejected: 3 },
        { month: "Oct", approved: 14, pending: 5, rejected: 2 },
        { month: "Nov", approved: 16, pending: 3, rejected: 1 },
        { month: "Dec", approved: 0, pending: 0, rejected: 0 },
    ]

    // Calculate current month data from actual leave requests
    const currentMonthRequests = {
        approved: leaveRequests.filter(req => req.status === "Approved").length,
        pending: leaveRequests.filter(req => req.status === "Pending").length,
        rejected: leaveRequests.filter(req => req.status === "Rejected").length,
    }

    // Update current month with real data
    monthlyLeaveData[monthlyLeaveData.length - 1] = {
        month: "Dec",
        ...currentMonthRequests
    }

    // Leave types breakdown
    const leaveTypeData = [
        { type: "Vacation", count: leaveRequests.filter(req => req.type === "Vacation").length || 8 },
        { type: "Sick", count: leaveRequests.filter(req => req.type === "Sick").length || 5 },
        { type: "Personal", count: leaveRequests.filter(req => req.type === "Personal").length || 3 },
        { type: "Emergency", count: leaveRequests.filter(req => req.type === "Emergency").length || 2 },
    ]

    const totalRequests = currentMonthRequests.approved + currentMonthRequests.pending + currentMonthRequests.rejected
    const approvalRate = totalRequests > 0 ? Math.round((currentMonthRequests.approved / totalRequests) * 100) : 85

    return (
        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Calendar className="text-purple-400" size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Leave Requests</h3>
                        <p className="text-gray-400 text-sm">Monthly leave request trends</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-white">{approvalRate}%</p>
                    <p className="text-gray-400 text-sm">Approval Rate</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <div>
                    <h4 className="text-white font-medium mb-3">Monthly Trends</h4>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyLeaveData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                                />
                                <Line
                                    type="monotone"
                                    dataKey="approved"
                                    stroke="#10B981"
                                    strokeWidth={2}
                                    name="Approved"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="pending"
                                    stroke="#F59E0B"
                                    strokeWidth={2}
                                    name="Pending"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="rejected"
                                    stroke="#EF4444"
                                    strokeWidth={2}
                                    name="Rejected"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Leave Types */}
                <div>
                    <h4 className="text-white font-medium mb-3">Leave Types</h4>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={leaveTypeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="type"
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
                                />
                                <Bar dataKey="count" fill="#8B5CF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-400 text-sm">Approved ({currentMonthRequests.approved})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-400 text-sm">Pending ({currentMonthRequests.pending})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-400 text-sm">Rejected ({currentMonthRequests.rejected})</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400">
                        {totalRequests} total requests this month
                    </p>
                </div>
            </div>
        </div>
    )
}