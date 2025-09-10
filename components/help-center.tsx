"use client"

import { useState } from "react"
import { HelpCircle, Book, MessageCircle, Phone, Mail, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HelpCenter() {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const faqItems = [
    {
      question: "How do I request time off?",
      answer:
        "Go to Attendance & Leave section, click 'Request Leave', fill out the form with dates and reason, then submit for approval.",
    },
    {
      question: "Where can I view my payslip?",
      answer:
        "Navigate to Payroll Processing section where you can view and download your current and historical payslips.",
    },
    {
      question: "How do I update my personal information?",
      answer: "Click on your profile avatar in the top right, then select 'Profile' tab to edit your personal details.",
    },
    {
      question: "How do I check in/out for attendance?",
      answer: "Use the Attendance & Leave section to clock in when you arrive and clock out when you leave work.",
    },
    {
      question: "Who do I contact for technical support?",
      answer: "Use the contact information in the Support tab or submit a ticket through the system.",
    },
  ]

  const tutorials = [
    { title: "Getting Started with HR System", duration: "5 min" },
    { title: "Managing Your Profile", duration: "3 min" },
    { title: "Requesting Time Off", duration: "4 min" },
    { title: "Understanding Your Payslip", duration: "6 min" },
    { title: "Performance Review Process", duration: "8 min" },
  ]

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Dialog open={isHelpModalOpen} onOpenChange={setIsHelpModalOpen}>
      <DialogTrigger asChild>
        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          <HelpCircle size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1b23] border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Help Center</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#0f1015]">
            <TabsTrigger value="faq" className="data-[state=active]:bg-blue-600">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="data-[state=active]:bg-blue-600">
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-blue-600">
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0f1015] border-gray-700 pl-10"
                />
              </div>

              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="bg-[#0f1015] p-4 rounded-lg border border-gray-700">
                    <h3 className="font-semibold text-blue-400 mb-2">{item.question}</h3>
                    <p className="text-gray-300 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Book className="w-5 h-5" />
                <span>Video Tutorials</span>
              </h3>

              <div className="space-y-3">
                {tutorials.map((tutorial, index) => (
                  <div
                    key={index}
                    className="bg-[#0f1015] p-4 rounded-lg border border-gray-700 flex items-center justify-between hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Book className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{tutorial.title}</h4>
                        <p className="text-sm text-gray-400">{tutorial.duration}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6 mt-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Contact Support</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f1015] p-6 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                    <h4 className="font-semibold">Live Chat</h4>
                  </div>
                  <p className="text-gray-400 mb-4">Get instant help from our support team</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Chat</Button>
                </div>

                <div className="bg-[#0f1015] p-6 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="w-6 h-6 text-green-400" />
                    <h4 className="font-semibold">Email Support</h4>
                  </div>
                  <p className="text-gray-400 mb-4">Send us an email and we'll respond within 24 hours</p>
                  <Button variant="outline" className="w-full border-gray-600 bg-transparent">
                    Send Email
                  </Button>
                </div>

                <div className="bg-[#0f1015] p-6 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <Phone className="w-6 h-6 text-orange-400" />
                    <h4 className="font-semibold">Phone Support</h4>
                  </div>
                  <p className="text-gray-400 mb-2">Call us during business hours</p>
                  <p className="text-white font-mono">+91 1800-123-HELP</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM IST</p>
                </div>

                <div className="bg-[#0f1015] p-6 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <HelpCircle className="w-6 h-6 text-purple-400" />
                    <h4 className="font-semibold">Submit Ticket</h4>
                  </div>
                  <p className="text-gray-400 mb-4">Create a support ticket for complex issues</p>
                  <Button variant="outline" className="w-full border-gray-600 bg-transparent">
                    Create Ticket
                  </Button>
                </div>
              </div>

              <div className="bg-[#0f1015] p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2">System Status</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-400">All systems operational</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
