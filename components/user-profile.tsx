"use client"

import { useState } from "react"
import { User, Bell, Camera, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UserProfile() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Developer",
    bio: "Experienced software developer with 8+ years in full-stack development.",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: "2020-03-15",
    employeeId: "EMP001",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    performanceUpdates: true,
    payrollAlerts: true,
    leaveApprovals: false,
    systemUpdates: true,
  })

  const handleSaveProfile = () => {
    console.log("[v0] Saving profile:", profileData)
    setIsProfileModalOpen(false)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 text-gray-300 hover:text-white">
          <Avatar className="w-8 h-8">
            <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
            <AvatarFallback className="bg-blue-600 text-white">
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block">{profileData.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1b23] border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>User Profile</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#0f1015]">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{profileData.name}</h3>
                <p className="text-gray-400">{profileData.position}</p>
                <p className="text-gray-400">{profileData.department}</p>
                <p className="text-sm text-gray-500">Employee ID: {profileData.employeeId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Department</Label>
                  <Input
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={profileData.position}
                    onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                  />
                </div>
                <div>
                  <Label>Join Date</Label>
                  <Input
                    type="date"
                    value={profileData.joinDate}
                    onChange={(e) => setProfileData({ ...profileData, joinDate: e.target.value })}
                    className="bg-[#0f1015] border-gray-700"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="bg-[#0f1015] border-gray-700"
                rows={4}
              />
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-400">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Performance Updates</Label>
                    <p className="text-sm text-gray-400">Get notified about performance reviews</p>
                  </div>
                  <Switch
                    checked={notifications.performanceUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("performanceUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payroll Alerts</Label>
                    <p className="text-sm text-gray-400">Notifications about payroll processing</p>
                  </div>
                  <Switch
                    checked={notifications.payrollAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("payrollAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Leave Approvals</Label>
                    <p className="text-sm text-gray-400">Notifications for leave request updates</p>
                  </div>
                  <Switch
                    checked={notifications.leaveApprovals}
                    onCheckedChange={(checked) => handleNotificationChange("leaveApprovals", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Updates</Label>
                    <p className="text-sm text-gray-400">Important system announcements</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("systemUpdates", checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
          <Button variant="outline" onClick={() => setIsProfileModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
