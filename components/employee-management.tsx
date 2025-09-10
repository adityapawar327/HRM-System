"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, Eye, X, Save, Upload, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/hooks/use-notifications"

export function EmployeeManagement() {
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Active",
      joinDate: "2023-01-15",
      phone: "+1 (555) 123-4567",
      salary: "$95,000",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "Design",
      position: "UX Designer",
      status: "Active",
      joinDate: "2023-02-20",
      phone: "+1 (555) 234-5678",
      salary: "$85,000",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      status: "On Leave",
      joinDate: "2022-11-10",
      phone: "+1 (555) 345-6789",
      salary: "$78,000",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      department: "HR",
      position: "HR Specialist",
      status: "Active",
      joinDate: "2023-03-05",
      phone: "+1 (555) 456-7890",
      salary: "$72,000",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@company.com",
      department: "Sales",
      position: "Sales Representative",
      status: "Active",
      joinDate: "2023-01-20",
      phone: "+1 (555) 567-8901",
      salary: "$65,000",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    salary: "",
    status: "Active",
    avatar: "",
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  const departments = ["all", "Engineering", "Design", "Marketing", "HR", "Sales"]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file.",
          variant: "destructive",
        })
        return
      }

      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData({ ...formData, avatar: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview("")
    setFormData({ ...formData, avatar: "" })
  }

  const handleAddEmployee = () => {
    if (formData.name && formData.email && formData.department && formData.position) {
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
        avatar: formData.avatar || "/placeholder.svg?height=40&width=40",
      }
      setEmployees([...employees, newEmployee])
      setFormData({ name: "", email: "", department: "", position: "", phone: "", salary: "", status: "Active", avatar: "" })
      setSelectedImage(null)
      setImagePreview("")
      setShowAddModal(false)
      
      // Add notification
      addNotification({
        title: "New Employee Added",
        message: `${formData.name} has been added as ${formData.position} in ${formData.department}`,
        type: "success",
        category: "employee",
        actionUrl: "employees"
      })
      
      toast({
        title: "Employee Added",
        description: `${formData.name} has been successfully added to the system.`,
        variant: "default",
      })
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Department, Position).",
        variant: "destructive",
      })
    }
  }

  const handleEditEmployee = () => {
    if (selectedEmployee && formData.name && formData.email) {
      setEmployees(employees.map((emp) => (emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp)))
      setShowEditModal(false)
      
      // Add notification
      addNotification({
        title: "Employee Updated",
        message: `${formData.name}'s profile information has been updated`,
        type: "info",
        category: "employee",
        actionUrl: "employees"
      })
      
      toast({
        title: "Employee Updated",
        description: `${formData.name}'s information has been successfully updated.`,
        variant: "default",
      })
      setSelectedEmployee(null)
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteEmployee = (id) => {
    const employee = employees.find((emp) => emp.id === id)
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id))
      
      // Add notification
      addNotification({
        title: "Employee Removed",
        message: `${employee?.name} has been removed from the system`,
        type: "warning",
        category: "employee",
        actionUrl: "employees"
      })
      
      toast({
        title: "Employee Deleted",
        description: `${employee?.name} has been removed from the system.`,
        variant: "default",
      })
    }
  }

  const openEditModal = (employee) => {
    setSelectedEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      phone: employee.phone,
      salary: employee.salary,
      status: employee.status,
    })
    setShowEditModal(true)
  }

  const openViewModal = (employee) => {
    setSelectedEmployee(employee)
    setShowViewModal(true)
  }

  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = searchTerm === "" ||
      employee.name.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.position.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower) ||
      employee.phone.toLowerCase().includes(searchLower) ||
      employee.status.toLowerCase().includes(searchLower)

    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Employee Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#1a1b23] rounded-lg p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, position, department, phone, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg pl-10 pr-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Department Filter */}
          <div className="md:w-48">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>

          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Filter size={20} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0f1015] border-b border-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Employee</th>
                <th className="text-left p-4 text-gray-400 font-medium">Department</th>
                <th className="text-left p-4 text-gray-400 font-medium">Position</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Join Date</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-800 hover:bg-[#0f1015] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={employee.avatar || "/placeholder.svg"}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="text-white font-medium">{employee.name}</div>
                          <div className="text-gray-400 text-sm">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{employee.department}</td>
                    <td className="p-4 text-gray-300">{employee.position}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${employee.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-orange-500/20 text-orange-400"
                          }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{employee.joinDate}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openViewModal(employee)}
                          className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                          title="View employee details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(employee)}
                          className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                          title="Edit employee"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete employee"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <Search size={48} className="text-gray-600" />
                      <div className="text-gray-400">
                        {searchTerm || selectedDepartment !== "all" ? (
                          <>
                            <p className="text-lg font-medium">No employees found</p>
                            <p className="text-sm">
                              Try adjusting your search criteria or filters
                            </p>
                            {(searchTerm || selectedDepartment !== "all") && (
                              <button
                                onClick={() => {
                                  setSearchTerm("")
                                  setSelectedDepartment("all")
                                }}
                                className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline"
                              >
                                Clear all filters
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-medium">No employees yet</p>
                            <p className="text-sm">Add your first employee to get started</p>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-gray-400 text-sm">
          {searchTerm || selectedDepartment !== "all" ? (
            <>
              Showing {filteredEmployees.length} of {employees.length} employees
              {searchTerm && (
                <span className="ml-2 text-blue-400">
                  (filtered by "{searchTerm}")
                </span>
              )}
              {selectedDepartment !== "all" && (
                <span className="ml-2 text-blue-400">
                  (department: {selectedDepartment})
                </span>
              )}
            </>
          ) : (
            `Showing ${filteredEmployees.length} employees`
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">2</button>
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">Next</button>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Add New Employee</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Profile Photo Upload */}
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">Profile Photo</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                        <User size={24} className="text-gray-400" />
                      </div>
                    )}
                    {imagePreview && (
                      <button
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer transition-colors inline-flex"
                    >
                      <Upload size={16} />
                      <span>Upload Photo</span>
                    </label>
                    <p className="text-gray-500 text-xs mt-1">Max 5MB, JPG/PNG only</p>
                  </div>
                </div>
              </div>

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Select Department</option>
                {departments.slice(1).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddEmployee}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>Add Employee</span>
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setSelectedImage(null)
                  setImagePreview("")
                  setFormData({ name: "", email: "", department: "", position: "", phone: "", salary: "", status: "Active", avatar: "" })
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Edit Employee</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                {departments.slice(1).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleEditEmployee}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>Update</span>
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {showViewModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1b23] rounded-lg p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Employee Details</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={selectedEmployee.avatar || "/placeholder.svg"}
                  alt={selectedEmployee.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedEmployee.name}</h3>
                  <p className="text-gray-400">{selectedEmployee.position}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <p className="text-white">{selectedEmployee.email}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Department</label>
                  <p className="text-white">{selectedEmployee.department}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Phone</label>
                  <p className="text-white">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Salary</label>
                  <p className="text-white">{selectedEmployee.salary}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Status</label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${selectedEmployee.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-orange-500/20 text-orange-400"
                      }`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Join Date</label>
                  <p className="text-white">{selectedEmployee.joinDate}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowViewModal(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
