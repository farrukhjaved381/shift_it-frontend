import React, { useState } from "react"
import {
  ArrowLeft,
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Plus,
} from "lucide-react"

// Simple UI component replacements using plain React and Tailwind CSS
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  let baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  if (variant === "ghost") baseClasses += " hover:bg-gray-100"
  else if (variant === "outline") baseClasses += " border border-gray-300 hover:bg-gray-100"
  else if (variant === "destructive") baseClasses += " bg-red-600 text-white hover:bg-red-700"
  else baseClasses += " bg-blue-600 text-white hover:bg-blue-700"
  if (size === "sm") baseClasses += " h-9 px-3 text-sm"
  else if (size === "icon") baseClasses += " h-10 w-10"
  else baseClasses += " h-10 py-2 px-4"
  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardDescription = ({ children, className = "", ...props }) => (
  <div className={`text-sm text-gray-600 ${className}`} {...props}>
    {children}
  </div>
)

const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const Badge = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  let baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  if (variant === "outline") baseClasses += " border border-gray-300 text-gray-700"
  else baseClasses += " bg-gray-100 text-gray-800"
  return (
    <span className={`${baseClasses} ${className}`} {...props}>
      {children}
    </span>
  )
}

const Label = ({ children, className = "", ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </label>
)

const Checkbox = ({
  className = "",
  onCheckedChange,
  ...props
}) => (
  <input
    type="checkbox"
    className={`h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
    onChange={(e) => onCheckedChange?.(e.target.checked)}
    {...props}
  />
)

const ScrollArea = ({ children, className = "", ...props }) => (
  <div className={`relative overflow-auto ${className}`} {...props}>
    {children}
  </div>
)

const Tabs = ({
  value,
  onValueChange,
  children,
}) => {
  const renderChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === TabsTrigger) {
        return React.cloneElement(child, { onValueChange, isActive: child.props.value === value })
      }
      if (child.type === TabsContent) {
        return child
      }
    }
    return child
  })
  return <div>{renderChildren}</div>
}

const TabsList = ({ children, className = "", ...props }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600 ${className}`} {...props}>
    {children}
  </div>
)

const TabsTrigger = ({
  children,
  className = "",
  value,
  onValueChange,
  isActive = false,
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-white shadow-sm' : 'hover:bg-gray-50'} ${className}`}
    onClick={() => onValueChange?.(value)}
    {...props}
  >
    {children}
  </button>
)

const TabsContent = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`mt-2 ${className}`} {...props}>
    {children}
  </div>
)

const Select = ({
  value,
  onValueChange,
  children,
}) => {
  const options = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === SelectItem) {
      return <option key={child.props.value} value={child.props.value}>{child.props.children}</option>
    }
    return null
  })
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)} className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      {options}
    </select>
  )
}

const SelectContent = ({ children, ...props }) => <div {...props}>{children}</div>

const SelectItem = ({ children, ...props }) => (
  <option {...props}>{children}</option>
)

const SelectTrigger = ({ children, ...props }) => <div {...props}>{children}</div>

const SelectValue = ({ placeholder }) => <span>{placeholder}</span>

const Dialog = ({
  open,
  onOpenChange,
  children,
}) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} role="dialog" aria-modal="true">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-auto bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
)

const DialogDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-gray-600 ${className}`} {...props}>
    {children}
  </p>
)

const DialogFooter = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`} {...props}>
    {children}
  </div>
)

const DialogHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
    {children}
  </div>
)

const DialogTitle = ({ children, className = "", ...props }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h2>
)

const DialogTrigger = ({ children, ...props }) => (
  <button {...props}>{children}</button>
)

function Documentation({ onNavigateBack }) {
  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Employee Handbook",
      description: "Company policies and procedures",
      category: "Onboarding",
      status: "Required",
      dateUploaded: "2025-03-15",
      fileSize: "2.4 MB",
      fileType: "PDF",
      required: true,
      signatureRequired: true,
      completionRequired: false,
    },
    {
      id: "2",
      name: "COVID-19 Vaccination Record",
      description: "Proof of vaccination",
      category: "Medical",
      status: "Required",
      dateUploaded: "2025-03-10",
      expiryDate: "2026-03-10",
      fileSize: "1.1 MB",
      fileType: "PDF",
      required: true,
      signatureRequired: false,
      completionRequired: false,
    },
    {
      id: "3",
      name: "HIPAA Compliance Training",
      description: "Annual HIPAA training module",
      category: "Training",
      status: "Required",
      dateUploaded: "2025-02-28",
      expiryDate: "2026-02-28",
      fileSize: "3.7 MB",
      fileType: "PDF",
      required: true,
      signatureRequired: true,
      completionRequired: true,
    },
    {
      id: "4",
      name: "Liability Waiver",
      description: "Standard liability waiver form",
      category: "Compliance",
      status: "Required",
      dateUploaded: "2025-03-05",
      fileSize: "0.8 MB",
      fileType: "PDF",
      required: true,
      signatureRequired: true,
      completionRequired: false,
    },
    {
      id: "5",
      name: "BLS Certification",
      description: "Basic Life Support certification",
      category: "Medical",
      status: "Required",
      dateUploaded: "2025-01-20",
      expiryDate: "2027-01-20",
      fileSize: "1.5 MB",
      fileType: "PDF",
      required: true,
      signatureRequired: false,
      completionRequired: false,
    },
    {
      id: "6",
      name: "Hospital Orientation Guide",
      description: "Facility-specific orientation information",
      category: "Onboarding",
      status: "Optional",
      dateUploaded: "2025-03-01",
      fileSize: "4.2 MB",
      fileType: "PDF",
      required: false,
      signatureRequired: false,
      completionRequired: true,
    },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [newDocument, setNewDocument] = useState({
    name: "",
    description: "",
    category: "Onboarding",
    required: true,
    signatureRequired: false,
    completionRequired: false,
  })
  const [previewDocument, setPreviewDocument] = useState(null)

  // Filter documents based on search query, category, and status
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "All" || doc.category === categoryFilter
    const matchesStatus = statusFilter === "All" || doc.status === statusFilter
    const matchesTab =
      activeTab === "all" || (activeTab === "required" && doc.required) || (activeTab === "optional" && !doc.required)

    return matchesSearch && matchesCategory && matchesStatus && matchesTab
  })

  console.log('Active tab:', activeTab)
  console.log('Category filter:', categoryFilter)
  console.log('Status filter:', statusFilter)
  console.log('Search query:', searchQuery)
  console.log('Filtered documents length:', filteredDocuments.length)

  const handleUploadDocument = () => {
    const newDoc = {
      id: (documents.length + 1).toString(),
      name: newDocument.name || "Untitled Document",
      description: newDocument.description || "",
      category: newDocument.category || "Other",
      status: newDocument.required ? "Required" : "Optional",
      dateUploaded: new Date().toISOString().split("T")[0],
      fileSize: "1.0 MB", // Placeholder
      fileType: "PDF", // Placeholder
      required: newDocument.required || false,
      signatureRequired: newDocument.signatureRequired || false,
      completionRequired: newDocument.completionRequired || false,
      expiryDate: newDocument.expiryDate,
    }

    setDocuments([...documents, newDoc])
    setUploadDialogOpen(false)
    setNewDocument({
      name: "",
      description: "",
      category: "Onboarding",
      required: true,
      signatureRequired: false,
      completionRequired: false,
    })
  }

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Required":
        return "bg-red-100 text-red-800"
      case "Optional":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Invalid date"
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return "Invalid date"
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch (error) {
      return "Invalid date"
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onNavigateBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Documentation</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-indigo-900 hover:bg-indigo-700" onClick={() => setUploadDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Documentation
          </Button>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Upload documents for SHIFTerz to review, sign, and complete before shifts.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Document Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    placeholder="Employee Handbook"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                    placeholder="Company policies and procedures"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={newDocument.category}
                    onValueChange={(value) => setNewDocument({ ...newDocument, category: value })}
                  >
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Policies">Policies</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newDocument.expiryDate}
                    onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Document Requirements</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="required"
                        checked={newDocument.required}
                        onCheckedChange={(checked) => setNewDocument({ ...newDocument, required: checked === true })}
                      />
                      <label htmlFor="required" className="text-sm">
                        Required document
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="signatureRequired"
                        checked={newDocument.signatureRequired}
                        onCheckedChange={(checked) =>
                          setNewDocument({ ...newDocument, signatureRequired: checked === true })
                        }
                      />
                      <label htmlFor="signatureRequired" className="text-sm">
                        Requires signature
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="completionRequired"
                        checked={newDocument.completionRequired}
                        onCheckedChange={(checked) =>
                          setNewDocument({ ...newDocument, completionRequired: checked === true })
                        }
                      />
                      <label htmlFor="completionRequired" className="text-sm">
                        Requires completion
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">
                    Upload File <span className="text-red-500">*</span>
                  </Label>
                  <Input id="file" type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUploadDocument}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
        </div>
        <div className="flex space-x-2 w-full md:w-1/3">
          <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Onboarding">Onboarding</SelectItem>
            <SelectItem value="Compliance">Compliance</SelectItem>
            <SelectItem value="Training">Training</SelectItem>
            <SelectItem value="Policies">Policies</SelectItem>
            <SelectItem value="Medical">Medical</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </Select>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Required">Required</SelectItem>
            <SelectItem value="Optional">Optional</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="required">Required</TabsTrigger>
          <TabsTrigger value="optional">Optional</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-0">
          {filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-gray-50">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No documents found</h3>
              <p className="text-sm text-gray-600 mt-1 mb-4">
                {searchQuery || categoryFilter !== "All" || statusFilter !== "All"
                  ? "Try adjusting your search or filters"
                  : "Upload documents for SHIFTerz to access"}
              </p>
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base font-medium line-clamp-1">{doc.name}</CardTitle>
                      <Badge className={getStatusBadgeColor(doc.status)}>{doc.status}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-1">{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-col space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span>{doc.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded:</span>
                        <span>{formatDate(doc.dateUploaded)}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expires:</span>
                          <span>{formatDate(doc.expiryDate)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">File:</span>
                        <span>
                          {doc.fileType}, {doc.fileSize}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.signatureRequired && (
                          <Badge variant="outline" className="text-xs">
                            Signature Required
                          </Badge>
                        )}
                        {doc.completionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Completion Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3 border-t">
                    <Dialog open={true} onOpenChange={() => {}}>
                      <DialogTrigger>
                        <Button variant="outline" size="sm" onClick={() => setPreviewDocument(doc)}>
                          <Eye className="h-4 w-4 mr-1" /> Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
                        <DialogHeader>
                          <DialogTitle>{doc.name}</DialogTitle>
                          <DialogDescription>{doc.description}</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] rounded-md border p-4">
                          <div className="flex flex-col items-center justify-center p-8 text-center">
                            <FileText className="h-16 w-16 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium">Document Preview</h3>
                            <p className="text-sm text-gray-600 mt-2 mb-6">
                              This is a placeholder for the actual document preview.
                            </p>
                            <div className="w-full max-w-md p-6 border rounded-lg bg-gray-50">
                              <h4 className="font-medium mb-4">{doc.name}</h4>
                              <p className="text-sm mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                              </p>
                              {doc.signatureRequired && (
                                <div className="mt-8 pt-4 border-t">
                                  <p className="text-sm font-medium mb-2">Signature required:</p>
                                  <div className="h-20 border rounded-md flex items-center justify-center bg-gray-100">
                                    <p className="text-sm text-gray-600">Sign here</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </ScrollArea>
                        <DialogFooter className="flex justify-between">
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2 bg-indigo-900 hover:bg-indigo-700" /> Download
                          </Button>
                          {doc.signatureRequired && (
                            <Button>
                              <Plus className="h-4 w-4 mr-2" /> Sign & Submit
                            </Button>
                          )}
                        </DialogFooter> 
                      </DialogContent>
                    </Dialog>
                    <div className="flex space-x-2 ">
                      <Button variant="default" className=" bg-indigo-900 hover:bg-indigo-700" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Documentation