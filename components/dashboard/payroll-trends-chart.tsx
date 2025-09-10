"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useHRData } from "../../hooks/use-hr-data"
import { DollarSign } from "lucide-react"

export function PayrollTrendsChart() {
  const { payrollRecords, employees } = useHRData()

  // Generate monthly payroll data
  const monthlyPayrollData = [
    { month: "Jul", total: 4250000, processed: 4100000, pending: 150000 },
    { month: "Aug", total: 4380000, processed: 4380000, pending: 0 },
    { month: "Sep", total: 4420000, processed: 4200000, pending: 220000 },
    { month: "Oct", total: 4500000, processed: 4350000, pending: 150000 },
    { month: "Nov", total: 4650000, processed: 4500000, pending: 150000 },
    { month: "Dec", total: 4750000, processed: 4600000, pending: 150000 },
  ]

  // Calculate current month totals from actual data
  const currentMonthTotal = payrollRecords.reduce((sum, record) => sum + record.netPay, 0)
  const processedAmount = payrollRecords
    .filter(record => record.status === "Processed" || record.status === "Paid")
    .reduce((sum, record) => sum + record.netPay, 0)
  const pendingAmount = payrollRecords
    .filter(record => record.status === "Pending")
    .reduce((sum, record) => sum + record.netPay, 0)

  // Update current month with real data
  if (monthlyPayrollData.length > 0) {
    monthlyPayrollData[monthlyPayrollData.length - 1] = {
      month: "Dec",
      total: currentMonthTotal,
      processed: processedAmount,
      pending: pendingAmount
    }
  }

  return (
    <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <DollarSign className="text-green-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Payroll Trends</h3>
            <p className="text-gray-400 text-sm">Monthly payroll processing overview</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">₹{(currentMonthTotal / 100000).toFixed(1)}L</p>
          <p className="text-gray-400 text-sm">This Month</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyPayrollData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              formatter={(value: number, name: string) => [
                `₹${(value / 100000).toFixed(1)}L`,
                name === 'processed' ? 'Processed' : name === 'pending' ? 'Pending' : 'Total'
              ]}
            />
            <Bar dataKey="processed" fill="#10B981" name="processed" />
            <Bar dataKey="pending" fill="#F59E0B" name="pending" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Processed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Pending</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            {payrollRecords.filter(r => r.status === "Pending").length} pending records
          </p>
        </div>
      </div>
    </div>
  )
}