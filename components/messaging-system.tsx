"use client"

import { useState } from "react"
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"

export function MessagingSystem() {
  const [selectedChat, setSelectedChat] = useState("1")
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const contacts = [
    {
      id: "1",
      name: "Sarah Johnson",
      position: "HR Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Thanks for the update on the new hire process",
      timestamp: "2 min ago",
      unread: 2
    },
    {
      id: "2",
      name: "Mike Chen",
      position: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      lastMessage: "The React component is ready for review",
      timestamp: "15 min ago",
      unread: 0
    },
    {
      id: "3",
      name: "Emily Davis",
      position: "Marketing Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "Can we schedule a meeting for tomorrow?",
      timestamp: "1 hour ago",
      unread: 1
    },
    {
      id: "4",
      name: "Engineering Team",
      position: "Group Chat",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "group",
      lastMessage: "David: The deployment went smoothly",
      timestamp: "3 hours ago",
      unread: 5
    }
  ]

  const messages = {
    "1": [
      {
        id: 1,
        sender: "Sarah Johnson",
        content: "Hi! I wanted to follow up on the new employee onboarding process.",
        timestamp: "10:30 AM",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Sure! I've prepared all the documentation. The new hire starts Monday.",
        timestamp: "10:32 AM",
        isOwn: true
      },
      {
        id: 3,
        sender: "Sarah Johnson",
        content: "Perfect! I'll make sure their workspace is ready. Thanks for the update on the new hire process",
        timestamp: "10:35 AM",
        isOwn: false
      }
    ],
    "2": [
      {
        id: 1,
        sender: "Mike Chen",
        content: "Hey, I've finished the user dashboard component. The React component is ready for review",
        timestamp: "9:45 AM",
        isOwn: false
      },
      {
        id: 2,
        sender: "You",
        content: "Great work! I'll review it this afternoon.",
        timestamp: "9:50 AM",
        isOwn: true
      }
    ]
  }

  const currentContact = contacts.find(c => c.id === selectedChat)
  const currentMessages = messages[selectedChat] || []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Add message logic here
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "away": return "bg-yellow-500"
      case "offline": return "bg-gray-500"
      default: return "bg-blue-500"
    }
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-[#1a1b23] rounded-lg border border-gray-800 overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f1015] border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedChat(contact.id)}
              className={`w-full p-4 flex items-center space-x-3 hover:bg-[#0f1015] transition-colors ${
                selectedChat === contact.id ? "bg-[#0f1015] border-r-2 border-blue-500" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1a1b23] ${getStatusColor(contact.status)}`}></div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium truncate">{contact.name}</h3>
                  <span className="text-gray-400 text-xs">{contact.timestamp}</span>
                </div>
                <p className="text-gray-400 text-sm truncate">{contact.lastMessage}</p>
                <p className="text-gray-500 text-xs">{contact.position}</p>
              </div>
              {contact.unread > 0 && (
                <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {contact.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={currentContact.avatar}
                    alt={currentContact.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1a1b23] ${getStatusColor(currentContact.status)}`}></div>
                </div>
                <div>
                  <h3 className="text-white font-medium">{currentContact.name}</h3>
                  <p className="text-gray-400 text-sm">{currentContact.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Video size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isOwn
                        ? "bg-blue-500 text-white"
                        : "bg-[#0f1015] text-gray-300"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-800">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Paperclip size={18} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-[#0f1015] border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Smile size={16} />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-gray-400">Choose a contact to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}