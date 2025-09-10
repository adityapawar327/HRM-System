"use client"

import { useState } from "react"
import { Bell, X, Check, AlertCircle, Info, Calendar, Users, DollarSign, FileText } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"

interface NotificationsProps {
  onNavigate?: (section: string) => void
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications()

  const getNotificationIcon = (category: string) => {
    switch (category) {
      case "leave":
        return Calendar
      case "payroll":
        return DollarSign
      case "recruitment":
        return Users
      case "performance":
        return FileText
      case "employee":
        return Users
      case "system":
        return Info
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400 bg-green-500/20"
      case "warning":
        return "text-orange-400 bg-orange-500/20"
      case "error":
        return "text-red-400 bg-red-500/20"
      case "info":
      default:
        return "text-blue-400 bg-blue-500/20"
    }
  }



  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.actionUrl && onNavigate) {
      onNavigate(notification.actionUrl)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors relative"
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Panel */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-[#1a1b23] border border-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-semibold">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.category)
                  const colorClass = getNotificationColor(notification.type)
                  
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-800 hover:bg-[#0f1015] transition-colors cursor-pointer ${
                        !notification.read ? "bg-blue-500/5" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-1.5 rounded-lg ${colorClass} flex-shrink-0`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium ${
                              !notification.read ? "text-white" : "text-gray-300"
                            }`}>
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                              }}
                              className="text-gray-500 hover:text-gray-300 ml-2"
                            >
                              <X size={12} />
                            </button>
                          </div>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-gray-500 text-xs">
                              {notification.timestamp}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="p-8 text-center">
                  <Bell size={32} className="text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400">No notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-800 text-center">
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}