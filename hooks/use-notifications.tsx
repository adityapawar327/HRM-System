"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  category: "leave" | "payroll" | "recruitment" | "performance" | "system" | "employee"
  timestamp: string
  read: boolean
  actionUrl?: string
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Leave Request",
      message: "Sarah Wilson has requested 3 days of vacation leave starting Dec 20th",
      type: "info",
      category: "leave",
      timestamp: "2 minutes ago",
      read: false,
      actionUrl: "attendance"
    },
    {
      id: "2",
      title: "Payroll Processing Due",
      message: "Monthly payroll processing is due in 2 days",
      type: "warning",
      category: "payroll",
      timestamp: "1 hour ago",
      read: false,
      actionUrl: "payroll"
    },
    {
      id: "3",
      title: "New Job Application",
      message: "Alex Johnson applied for Senior Developer position",
      type: "info",
      category: "recruitment",
      timestamp: "3 hours ago",
      read: false,
      actionUrl: "recruitment"
    },
    {
      id: "4",
      title: "Performance Review Completed",
      message: "John Doe's Q4 performance review has been submitted",
      type: "success",
      category: "performance",
      timestamp: "5 hours ago",
      read: true,
      actionUrl: "performance"
    },
    {
      id: "5",
      title: "Document Upload Required",
      message: "Mike Johnson needs to upload his updated contract",
      type: "warning",
      category: "employee",
      timestamp: "1 day ago",
      read: false,
      actionUrl: "documents"
    },
    {
      id: "6",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur this weekend",
      type: "info",
      category: "system",
      timestamp: "2 days ago",
      read: true
    }
  ])

  const addNotification = (notificationData: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: "Just now",
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}