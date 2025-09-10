"use client"

import { useState } from "react"
import { Calendar, Clock, UserCheck, UserX, Plus, Eye, CheckCircle, XCircle } from "lucide-react"

export function AttendanceLeave() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [showLeaveDetailsModal, setShowLeaveDetailsModal] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState(null)
  const [leaveForm, setLeaveForm] = useState({
    employeeName: "",
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  })

  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      workHours: "9h 0m",
      status: "Present",
      date: "2024-01-15",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      checkIn: "09:15 AM",
      checkOut: "06:15 PM",
      workHours: "9h 0m",
      status: "Late",
      date: "2024-01-15",
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      checkIn: "-",
      checkOut: "-",
      workHours: "0h 0m",
      status: "Absent",
      date: "2024-01-15",
    },
    {
      id: 4,
      employeeName: "Sarah Wilson",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      workHours: "9h 0m",
      status: "Present",
      date: "2024-01-15",
    },
  ])

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: "Sarah Wilson",
      leaveType: "Annual Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      days: 5,
      status: "Pending",
      reason: "Family vacation",
    },
    {
      id: 2,
      employeeName: "David Brown",
      leaveType: "Sick Leave",
      startDate: "2024-01-18",
      endDate: "2024-01-19",
      days: 2,
      status: "Approved",
      reason: "Medical appointment",
    },
    {
      id: 3,
      employeeName: "Emma Davis",
      leaveType: "Personal Leave",
      startDate: "2024-01-22",
      endDate: "2024-01-22",
      days: 1,
      status: "Pending",
      reason: "Personal matters",
    },
  ])

  const handleLeaveSubmit = (e) => {
    e.preventDefault()
    const days = Math.ceil((new Date(leaveForm.endDate) - new Date(leaveForm.startDate)) / (1000 * 60 * 60 * 24)) + 1
    const newLeave = {
      id: leaveRequests.length + 1,
      ...leaveForm,
      days,
      status: "Pending",
    }
    setLeaveRequests([...leaveRequests, newLeave])
    setLeaveForm({
      employeeName: "",
      leaveType: "Annual Leave",
      startDate: "",
      endDate: "",
      reason: "",
    })
    setShowLeaveModal(false)
  }

  const handleLeaveAction = (id, action) => {
    setLeaveRequests(leaveRequests.map((leave) => (leave.id === id ? { ...leave, status: action } : leave)))
  }

  const handleCheckIn = (employeeId) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setAttendanceData(
      attendanceData.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              checkIn: currentTime,
              status: new Date().getHours() > 9 ? "Late" : "Present",
            }
          : emp,
      ),
    )
  }

  const handleCheckOut = (employeeId) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setAttendanceData(
      attendanceData.map((emp) => {
        if (emp.id === employeeId) {
          const checkInTime = new Date(`2024-01-01 ${emp.checkIn}`)
          const checkOutTime = new Date(`2024-01-01 ${currentTime}`)
          const workHours = Math.floor((checkOutTime - checkInTime) / (1000 * 60 * 60))
          const workMinutes = Math.floor(((checkOutTime - checkInTime) % (1000 * 60 * 60)) / (1000 * 60))
          return {
            ...emp,
            checkOut: currentTime,
            workHours: `${workHours}h ${workMinutes}m`,
          }
        }
        return emp
      }),
    )
  }

  const presentCount = attendanceData.filter((emp) => emp.status === "Present").length
  const lateCount = attendanceData.filter((emp) => emp.status === "Late").length
  const absentCount = attendanceData.filter((emp) => emp.status === "Absent").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Attendance & Leave Management</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowLeaveModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>New Leave Request</span>
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-[#1a1b23] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Present Today</h3>
            <UserCheck className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{presentCount}</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Late Arrivals</h3>
            <Clock className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{lateCount}</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Absent Today</h3>
            <UserX className="text-red-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">{absentCount}</p>
        </div>

        <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Pending Leaves</h3>
            <Calendar className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-white">
            {leaveRequests.filter((req) => req.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Today's Attendance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1015] border-b border-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Employee</th>
                <th className="text-left p-4 text-gray-400 font-medium">Check In</th>
                <th className="text-left p-4 text-gray-400 font-medium">Check Out</th>
                <th className="text-left p-4 text-gray-400 font-medium">Work Hours</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) => (
                <tr key={record.id} className="border-b border-gray-800 hover:bg-[#0f1015] transition-colors">
                  <td className="p-4 text-white font-medium">{record.employeeName}</td>
                  <td className="p-4 text-gray-300">{record.checkIn}</td>
                  <td className="p-4 text-gray-300">{record.checkOut}</td>
                  <td className="p-4 text-gray-300">{record.workHours}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === "Present"
                          ? "bg-green-500/20 text-green-400"
                          : record.status === "Late"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {record.checkIn === "-" ? (
                        <button
                          onClick={() => handleCheckIn(record.id)}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-colors"
                        >
                          Check In
                        </button>
                      ) : record.checkOut === "-" ? (
                        <button
                          onClick={() => handleCheckOut(record.id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
                        >
                          Check Out
                        </button>
                      ) : (
                        <span className="text-gray-500 text-xs">Complete</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Leave Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1015] border-b border-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Employee</th>
                <th className="text-left p-4 text-gray-400 font-medium">Leave Type</th>
                <th className="text-left p-4 text-gray-400 font-medium">Start Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">End Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Days</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-800 hover:bg-[#0f1015] transition-colors">
                  <td className="p-4 text-white font-medium">{request.employeeName}</td>
                  <td className="p-4 text-gray-300">{request.leaveType}</td>
                  <td className="p-4 text-gray-300">{request.startDate}</td>
                  <td className="p-4 text-gray-300">{request.endDate}</td>
                  <td className="p-4 text-gray-300">{request.days}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === "Approved"
                          ? "bg-green-500/20 text-green-400"
                          : request.status === "Pending"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedLeave(request)
                          setShowLeaveDetailsModal(true)
                        }}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      {request.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleLeaveAction(request.id, "Approved")}
                            className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleLeaveAction(request.id, "Rejected")}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-md border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">New Leave Request</h3>
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Employee Name</label>
                <input
                  type="text"
                  value={leaveForm.employeeName}
                  onChange={(e) => setLeaveForm({ ...leaveForm, employeeName: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Leave Type</label>
                <select
                  value={leaveForm.leaveType}
                  onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Paternity Leave">Paternity Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Start Date</label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">End Date</label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Reason</label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLeaveDetailsModal && selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-md border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Leave Request Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400 text-sm">Employee:</span>
                <p className="text-white">{selectedLeave.employeeName}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Leave Type:</span>
                <p className="text-white">{selectedLeave.leaveType}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Duration:</span>
                <p className="text-white">
                  {selectedLeave.startDate} to {selectedLeave.endDate} ({selectedLeave.days} days)
                </p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    selectedLeave.status === "Approved"
                      ? "bg-green-500/20 text-green-400"
                      : selectedLeave.status === "Pending"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {selectedLeave.status}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Reason:</span>
                <p className="text-white">{selectedLeave.reason}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowLeaveDetailsModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
