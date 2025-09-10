"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Calendar,
  User,
  Building,
  Shield,
  Award,
  Heart,
  Briefcase,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: string
  name: string
  type: string
  category: "personal" | "official" | "contract" | "certificate" | "policy" | "medical"
  uploadDate: string
  size: string
  uploadedBy: string
  description?: string
  expiryDate?: string
  status: "active" | "expired" | "pending"
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Employment Contract - John Doe.pdf",
    type: "PDF",
    category: "contract",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    uploadedBy: "HR Admin",
    description: "Employment contract for Software Engineer position",
    expiryDate: "2025-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "ID Card - Jane Smith.jpg",
    type: "JPG",
    category: "personal",
    uploadDate: "2024-02-10",
    size: "1.2 MB",
    uploadedBy: "Jane Smith",
    description: "Government issued ID card",
    status: "active",
  },
  {
    id: "3",
    name: "Medical Certificate - Mike Johnson.pdf",
    type: "PDF",
    category: "medical",
    uploadDate: "2024-03-05",
    size: "856 KB",
    uploadedBy: "Mike Johnson",
    description: "Annual health checkup certificate",
    expiryDate: "2025-03-05",
    status: "active",
  },
  {
    id: "4",
    name: "Training Certificate - Sarah Wilson.pdf",
    type: "PDF",
    category: "certificate",
    uploadDate: "2024-01-20",
    size: "1.8 MB",
    uploadedBy: "Sarah Wilson",
    description: "React Development Certification",
    status: "active",
  },
  {
    id: "5",
    name: "Company Policy - Remote Work.pdf",
    type: "PDF",
    category: "policy",
    uploadDate: "2024-02-01",
    size: "3.2 MB",
    uploadedBy: "HR Admin",
    description: "Updated remote work policy guidelines",
    status: "active",
  },
]

export function DocumentsManagement() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const { toast } = useToast()

  const [newDocument, setNewDocument] = useState({
    name: "",
    category: "",
    description: "",
    expiryDate: "",
  })

  const categoryIcons = {
    personal: User,
    official: Building,
    contract: Briefcase,
    certificate: Award,
    policy: Shield,
    medical: Heart,
  }

  const categoryColors = {
    personal: "bg-blue-500",
    official: "bg-purple-500",
    contract: "bg-green-500",
    certificate: "bg-orange-500",
    policy: "bg-red-500",
    medical: "bg-pink-500",
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUpload = () => {
    if (!newDocument.name || !newDocument.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const document: Document = {
      id: Date.now().toString(),
      name: newDocument.name,
      type: "PDF",
      category: newDocument.category as Document["category"],
      uploadDate: new Date().toISOString().split("T")[0],
      size: "1.5 MB",
      uploadedBy: "Current User",
      description: newDocument.description,
      expiryDate: newDocument.expiryDate || undefined,
      status: "active",
    }

    setDocuments([document, ...documents])
    setNewDocument({ name: "", category: "", description: "", expiryDate: "" })
    setIsUploadOpen(false)

    toast({
      title: "Success",
      description: "Document uploaded successfully",
    })
  }

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
    toast({
      title: "Success",
      description: "Document deleted successfully",
    })
  }

  const handleDownload = (document: Document) => {
    toast({
      title: "Download Started",
      description: `Downloading ${document.name}`,
    })
  }

  const handleView = (document: Document) => {
    setSelectedDocument(document)
    toast({
      title: "Opening Document",
      description: `Opening ${document.name}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "expired":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const documentsByCategory = {
    personal: documents.filter((doc) => doc.category === "personal").length,
    official: documents.filter((doc) => doc.category === "official").length,
    contract: documents.filter((doc) => doc.category === "contract").length,
    certificate: documents.filter((doc) => doc.category === "certificate").length,
    policy: documents.filter((doc) => doc.category === "policy").length,
    medical: documents.filter((doc) => doc.category === "medical").length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documents Management</h1>
          <p className="text-gray-400 mt-1">Upload, view and manage personal and official documents</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1b23] border-gray-800">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file">Select File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="name">Document Name</Label>
                <Input
                  id="name"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                  placeholder="Enter document name"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newDocument.category}
                  onValueChange={(value) => setNewDocument({ ...newDocument, category: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="official">Official</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                  placeholder="Enter document description"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="expiry">Expiry Date (Optional)</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={newDocument.expiryDate}
                  onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600">
                  Upload Document
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(documentsByCategory).map(([category, count]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons]
          const colorClass = categoryColors[category as keyof typeof categoryColors]
          return (
            <Card key={category} className="bg-[#252730] border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 capitalize">{category}</p>
                    <p className="text-xl font-bold">{count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Search and Filter */}
      <Card className="bg-[#252730] border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="official">Official</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="policy">Policy</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="bg-[#252730] border-gray-800">
        <CardHeader>
          <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => {
              const Icon = categoryIcons[document.category]
              const colorClass = categoryColors[document.category]
              return (
                <div key={document.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{document.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {document.uploadDate}
                        </span>
                        <span>{document.size}</span>
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {document.uploadedBy}
                        </span>
                        {document.expiryDate && <span className="text-orange-400">Expires: {document.expiryDate}</span>}
                      </div>
                      {document.description && <p className="text-sm text-gray-500 mt-1">{document.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStatusColor(document.status)} text-white`}>{document.status}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(document)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(document)}
                      className="text-green-400 hover:text-green-300"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(document.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="bg-[#1a1b23] border-gray-800 max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedDocument.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Category:</span>
                    <span className="ml-2 capitalize">{selectedDocument.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Size:</span>
                    <span className="ml-2">{selectedDocument.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Upload Date:</span>
                    <span className="ml-2">{selectedDocument.uploadDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Uploaded By:</span>
                    <span className="ml-2">{selectedDocument.uploadedBy}</span>
                  </div>
                  {selectedDocument.expiryDate && (
                    <div>
                      <span className="text-gray-400">Expiry Date:</span>
                      <span className="ml-2">{selectedDocument.expiryDate}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <Badge className={`ml-2 ${getStatusColor(selectedDocument.status)} text-white`}>
                      {selectedDocument.status}
                    </Badge>
                  </div>
                </div>
                {selectedDocument.description && (
                  <div className="mt-4">
                    <span className="text-gray-400">Description:</span>
                    <p className="mt-1">{selectedDocument.description}</p>
                  </div>
                )}
              </div>
              <div className="bg-gray-900 p-8 rounded-lg text-center">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400">Document preview would appear here</p>
                <p className="text-sm text-gray-500 mt-2">
                  In a real application, this would show the actual document content
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleDownload(selectedDocument)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={() => setSelectedDocument(null)}>Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
