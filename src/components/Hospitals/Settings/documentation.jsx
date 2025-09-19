import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  Download, 
  Eye, 
  FileUp, 
  AlertCircle, 
  Building, 
  GraduationCap 
} from 'lucide-react';

// UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '', 
  onClick,
  disabled = false 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };
  
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    icon: 'w-8 h-8',
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Switch = ({ id, checked, onCheckedChange, className = '' }) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
      checked ? 'bg-purple-600' : 'bg-gray-200'
    } ${className}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Label = ({ htmlFor, children, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
  >
    {children}
  </label>
);

const Tabs = ({ children, defaultValue, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className={className}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className = '', activeTab, setActiveTab }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ children, value, className = '', activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
      activeTab === value 
        ? 'bg-purple-600 text-white shadow-sm' 
        : 'text-gray-500 hover:text-gray-900'
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab, className = '' }) => {
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
};

const Input = ({ 
  id, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '',
  className = ''
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${className}`}
  />
);

const Dialog = ({ children, open, onOpenChange }) => {
  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DialogContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const DialogHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const DialogTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h2>
);

const DialogDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>
    {children}
  </p>
);

const DialogFooter = ({ children, className = '' }) => (
  <div className={`flex justify-end gap-3 pt-4 border-t ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default', className = '' }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
    variant === 'outline' ? 'border border-gray-300 text-gray-500' : 'bg-purple-100 text-purple-800'
  } ${className}`}>
    {children}
  </span>
);

const Textarea = ({ 
  id, 
  value, 
  onChange, 
  placeholder = '',
  className = '',
  rows = 3
}) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none ${className}`}
  />
);


// Main Component
export default function DocumentationPage() {
  // Default required documents for students
  const defaultStudentDocs = [
    { id: 1, name: "Background Check", required: true },
    { id: 2, name: "Immunization Records", required: true },
    { id: 3, name: "TB Test", required: true },
    { id: 4, name: "CPR Certification", required: false },
    { id: 5, name: "HIPAA Training", required: true },
    { id: 6, name: "Drug Screening", required: false },
    { id: 7, name: "Malpractice Insurance", required: false },
    { id: 8, name: "Health Insurance", required: false },
    { id: 9, name: "Drug Testing", required: true },
    { id: 10, name: "Physical Exams", required: true },
    { id: 11, name: "Titers: MMR, VRZ, Hep B", required: true },
    { id: 12, name: "Vaccine: MMR, VRZ, Hep B", required: true },
    { id: 13, name: "COVID-19/Boosters/Waivers", required: true },
    { id: 14, name: "Hospital Orientation & Policies", required: true },
    { id: 15, name: "Basic Life Support", required: true },
    { id: 16, name: "Tuberculosis (TB) Results/(x-ray)", required: true },
    { id: 17, name: "Flu Vaccine / waivers", required: true },
    { id: 18, name: "Live Scan", required: true },
    { id: 19, name: "MAB AB 805", required: true },
  ]

  // Default required documents for schools
  const defaultSchoolDocs = [
    { id: 1, name: "Liability Insurance", required: true },
    { id: 2, name: "Accreditation Certificate", required: true },
    { id: 3, name: "Clinical Affiliation Agreement", required: true },
    { id: 4, name: "Faculty Credentials", required: true },
    { id: 5, name: "Program Curriculum", required: false },
    { id: 6, name: "Student Evaluation Process", required: false },
    { id: 7, name: "Background Check Policy", required: true },
    { id: 8, name: "Immunization Policy", required: true },
  ]

  // Sample uploaded documents
  const sampleUploads = [
    {
      id: 1,
      name: "Confidentiality Agreement",
      description: "Must be signed before clinical rotation begins",
      dateUploaded: "2023-10-15",
      size: "245 KB",
      type: "pdf",
      required: true,
    },
    {
      id: 2,
      name: "Facility Orientation Guide",
      description: "Information about facility policies and procedures",
      dateUploaded: "2023-09-22",
      size: "1.2 MB",
      type: "pdf",
      required: true,
    },
    {
      id: 3,
      name: "Parking Information",
      description: "Map and instructions for student parking",
      dateUploaded: "2023-08-30",
      size: "780 KB",
      type: "pdf",
      required: false,
    },
  ]

  // State for student required documents
  const [studentDocs, setStudentDocs] = useState(defaultStudentDocs)
  const [newStudentDocName, setNewStudentDocName] = useState("")
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)

  // State for school required documents
  const [schoolDocs, setSchoolDocs] = useState(defaultSchoolDocs)
  const [newSchoolDocName, setNewSchoolDocName] = useState("")
  const [isSchoolDialogOpen, setIsSchoolDialogOpen] = useState(false)

  // State for uploaded documents
  const [uploadedDocs, setUploadedDocs] = useState(sampleUploads)
  const [newUpload, setNewUpload] = useState({
    name: "",
    description: "",
    required: false,
    file: null,
  })
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Add new student required document
  const addStudentDoc = () => {
    if (newStudentDocName.trim() === "") return

    const newDoc = {
      id: studentDocs.length + 1,
      name: newStudentDocName,
      required: false,
    }

    setStudentDocs([...studentDocs, newDoc])
    setNewStudentDocName("")
    setIsStudentDialogOpen(false) // Close dialog after adding
  }

  // Add new school required document
  const addSchoolDoc = () => {
    if (newSchoolDocName.trim() === "") return

    const newDoc = {
      id: schoolDocs.length + 1,
      name: newSchoolDocName,
      required: false,
    }

    setSchoolDocs([...schoolDocs, newDoc])
    setNewSchoolDocName("")
    setIsSchoolDialogOpen(false) // Close dialog after adding
  }

  // Remove a student required document
  const removeStudentDoc = (id) => {
    setStudentDocs(studentDocs.filter((doc) => doc.id !== id))
  }

  // Remove a school required document
  const removeSchoolDoc = (id) => {
    setSchoolDocs(schoolDocs.filter((doc) => doc.id !== id))
  }

  // Toggle required status for student docs
  const toggleStudentRequired = (id) => {
    setStudentDocs(studentDocs.map((doc) => (doc.id === id ? { ...doc, required: !doc.required } : doc)))
  }

  // Toggle required status for school docs
  const toggleSchoolRequired = (id) => {
    setSchoolDocs(schoolDocs.map((doc) => (doc.id === id ? { ...doc, required: !doc.required } : doc)))
  }

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would handle the file upload here
      console.log("File selected:", e.target.files[0])
      setNewUpload({ ...newUpload, file: e.target.files[0] })
    }
  }

  // Add new uploaded document
  const addUploadedDoc = () => {
    if (newUpload.name.trim() === "") return

    const newDoc = {
      id: uploadedDocs.length + 1,
      name: newUpload.name,
      description: newUpload.description,
      dateUploaded: new Date().toISOString().split("T")[0],
      size: newUpload.file ? `${(newUpload.file.size / 1024).toFixed(1)} KB` : "0 KB",
      type: newUpload.file ? newUpload.file.type.split('/')[1] : "pdf",
      required: newUpload.required,
    }

    setUploadedDocs([...uploadedDocs, newDoc])
    setNewUpload({
      name: "",
      description: "",
      required: false,
      file: null,
    })
    setIsUploadDialogOpen(false) // Close dialog after adding
  }

  // Remove an uploaded document
  const removeUploadedDoc = (id) => {
    setUploadedDocs(uploadedDocs.filter((doc) => doc.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-50">
     
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <button className="text-gray-500 hover:text-purple-600" onClick={() => console.log('Back to settings')}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-semibold text-blue-600">Required Documentation</h1>
          </div>
          <p className="text-gray-500 mt-1">Manage documentation requirements and student resources</p>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="student-required" className="w-full">
            <TabsList className="mb-6 bg-white border">
              <TabsTrigger value="student-required">Student Requirements</TabsTrigger>
              <TabsTrigger value="school-required">School Requirements</TabsTrigger>
              <TabsTrigger value="uploads">Student Resources</TabsTrigger>
            </TabsList>

            {/* Student Required Documentation Tab */}
            <TabsContent value="student-required">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-blue-600 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" /> Student Required Documentation
                    </CardTitle>
                    <CardDescription>Manage documentation required from students</CardDescription>
                  </div>
                  <Button onClick={() => setIsStudentDialogOpen(true)} className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Custom Requirement
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {studentDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <Label htmlFor={`student-req-${doc.id}`} className="text-base">
                              {doc.name}
                            </Label>
                            <p className="text-sm text-gray-500">
                              {doc.required ? "Required from all students" : "Optional documentation"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch
                              id={`student-req-${doc.id}`}
                              checked={doc.required}
                              onCheckedChange={() => toggleStudentRequired(doc.id)}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeStudentDoc(doc.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </CardFooter>
              </Card>
              <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Custom Document Requirement</DialogTitle>
                    <DialogDescription>
                      Add a new document that students must provide before clinical rotation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-student-doc-name" className="text-right">
                        Document Name
                      </Label>
                      <Input
                        id="new-student-doc-name"
                        value={newStudentDocName}
                        onChange={(e) => setNewStudentDocName(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g., Professional Liability Insurance"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={addStudentDoc}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Add Requirement
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* School Required Documentation Tab */}
            <TabsContent value="school-required">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-blue-600 flex items-center gap-2">
                      <Building className="h-5 w-5" /> School Required Documentation
                    </CardTitle>
                    <CardDescription>Manage documentation required from schools</CardDescription>
                  </div>
                  <Button onClick={() => setIsSchoolDialogOpen(true)} className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Custom Requirement
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {schoolDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <Label htmlFor={`school-req-${doc.id}`} className="text-base">
                              {doc.name}
                            </Label>
                            <p className="text-sm text-gray-500">
                              {doc.required ? "Required from all schools" : "Optional documentation"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch
                              id={`school-req-${doc.id}`}
                              checked={doc.required}
                              onCheckedChange={() => toggleSchoolRequired(doc.id)}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeSchoolDoc(doc.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </CardFooter>
              </Card>
              <Dialog open={isSchoolDialogOpen} onOpenChange={setIsSchoolDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Custom Document Requirement</DialogTitle>
                    <DialogDescription>
                      Add a new document that schools must provide for clinical rotations.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-school-doc-name" className="text-right">
                        Document Name
                      </Label>
                      <Input
                        id="new-school-doc-name"
                        value={newSchoolDocName}
                        onChange={(e) => setNewSchoolDocName(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g., Faculty Credentials Verification"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={addSchoolDoc}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Add Requirement
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* Student Resources Tab */}
            <TabsContent value="uploads">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-blue-600 flex items-center gap-2">
                      <FileUp className="h-5 w-5" /> Student Resources
                    </CardTitle>
                    <CardDescription>Upload documents for students to access before clinical rotation</CardDescription>
                  </div>
                  <Button onClick={() => setIsUploadDialogOpen(true)} className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="space-y-4">
                    {uploadedDocs.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No documents uploaded yet. Click "Upload Document" to add resources for students.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {uploadedDocs.map((doc) => (
                          <div key={doc.id} className="border rounded-lg overflow-hidden bg-white">
                            <div className="bg-gray-100 p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-purple-600 text-white p-2 rounded-md">
                                  <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                                  <p className="text-xs text-gray-500">
                                    Uploaded on {doc.dateUploaded} • {doc.size}
                                  </p>
                                </div>
                              </div>
                              {doc.required ? (
                                <Badge className="bg-purple-600 text-white">Required</Badge>
                              ) : (
                                <Badge variant="outline" className="text-gray-500">
                                  Optional
                                </Badge>
                              )}
                            </div>
                            <div className="p-4">
                              <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" className="gap-1" onClick={() => console.log('Preview', doc.id)}>
                                    <Eye className="h-3.5 w-3.5" /> Preview
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-1" onClick={() => console.log('Download', doc.id)}>
                                    <Download className="h-3.5 w-3.5" /> Download
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => removeUploadedDoc(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <AlertCircle className="h-4 w-4" />
                    <span>Students will be able to access these documents in their portal</span>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </CardFooter>
              </Card>
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Upload Document for Students</DialogTitle>
                    <DialogDescription>
                      Upload a document that students can access before their clinical rotation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="upload-name" className="text-right">
                        Document Name
                      </Label>
                      <Input
                        id="upload-name"
                        value={newUpload.name}
                        onChange={(e) => setNewUpload({ ...newUpload, name: e.target.value })}
                        className="col-span-3"
                        placeholder="e.g., Confidentiality Agreement"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="upload-desc" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="upload-desc"
                        value={newUpload.description}
                        onChange={(e) => setNewUpload({ ...newUpload, description: e.target.value })}
                        className="col-span-3"
                        placeholder="Brief description of the document"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">File</Label>
                      <div className="col-span-3">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 text-center">
                            Drag and drop your file here or{" "}
                            <label className="text-purple-600 font-medium cursor-pointer">
                              browse files
                              <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx,.xlsx" />
                            </label>
                          </p>
                          <p className="text-xs text-gray-400 mt-2">PDF, DOCX, or XLSX (max. 10MB)</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="upload-required" className="text-right">
                        Required
                      </Label>
                      <div className="flex items-center gap-2 col-span-3">
                        <Switch
                          id="upload-required"
                          checked={newUpload.required}
                          onCheckedChange={(checked) => setNewUpload({ ...newUpload, required: checked })}
                        />
                        <span className="text-sm text-gray-500">Students must acknowledge this document</span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={addUploadedDoc}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Upload Document
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}