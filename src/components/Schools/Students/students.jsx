import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  ArrowLeft,
} from "lucide-react";

// --- SAMPLE DATA (trimmed/kept same structure) ---
const initialStudents = [
  {
    id: "1",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@student.usc.edu",
    program: "Nursing - BSN",
    academicYear: "4th Year",
    status: "Active",
    documentsStatus: "Complete",
    drugTestStatus: "Complete",
    backgroundCheckStatus: "Complete",
    lastActivity: "2024-01-10",
    drugTestDetails: {
      testType: "10-Panel Urine",
      testDate: "2024-01-05",
      results: "Negative",
      expiryDate: "2025-01-05",
      location: "SHIFTit Testing Center - Downtown",
    },
    backgroundCheckDetails: {
      checkType: "Comprehensive Background",
      requestDate: "2024-01-03",
      completionDate: "2024-01-08",
      status: "Clear",
      results: "No criminal history found",
    },
    documents: [
      { id: "1", name: "COVID-19 Vaccination Record", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/covid-vaccination.pdf" },
      { id: "2", name: "Hepatitis B Immunity", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/hepatitis-b.pdf" },
      { id: "3", name: "MMR Immunity", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/mmr-immunity.pdf" },
      { id: "4", name: "Varicella (Chickenpox) Immunity", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/varicella.pdf" },
      { id: "5", name: "Tdap Vaccination", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/tdap-vaccination.pdf" },
      { id: "6", name: "Annual Influenza Vaccination", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/influenza-vaccination.pdf" },
      { id: "7", name: "TB Screening", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/tb-screening.pdf" },
      { id: "8", name: "Physical Examination", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/physical-examination.pdf" },
      { id: "11", name: "CPR/BLS Certification", type: "Training & Certifications", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/cpr-certification.pdf" },
      { id: "12", name: "ACLS Certification", type: "Training & Certifications", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/acls-certification.pdf" },
      { id: "13", name: "HIPAA Training Certificate", type: "Training & Certifications", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/hipaa-training.pdf" },
      { id: "19", name: "Professional Liability Insurance", type: "Legal", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/liability-insurance.pdf" },
      { id: "21", name: "Confidentiality Agreement", type: "Legal", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/confidentiality-agreement.pdf" },
      { id: "10", name: "Health Insurance Verification", type: "Legal", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05", fileUrl: "/documents/health-insurance.pdf" },
    ],
    requiredDocuments: [
      "COVID-19 Vaccination Record",
      "Hepatitis B Immunity",
      "MMR Immunity",
      "Varicella (Chickenpox) Immunity",
      "Tdap Vaccination",
      "Annual Influenza Vaccination",
      "TB Screening",
      "Physical Examination",
      "CPR/BLS Certification",
      "ACLS Certification",
      "HIPAA Training Certificate",
      "Professional Liability Insurance",
      "Confidentiality Agreement",
      "Health Insurance Verification",
    ],
  },
];

const additionalStudents = Array.from({ length: 22 }, (_, index) => ({
  id: `${index + 4}`,
  name: `Student ${index + 4}`,
  email: `student${index + 4}@student.usc.edu`,
  program: index % 3 === 0 ? "Nursing - BSN" : index % 3 === 1 ? "Nursing - ADN" : "Medical Assistant",
  academicYear: ["1st Year", "2nd Year", "3rd Year", "4th Year"][index % 4],
  status: "Active",
  documentsStatus: ["Complete", "Incomplete", "Needs Attention"][index % 3],
  drugTestStatus: ["Complete", "Pending", "Expired", "Not Started"][index % 4],
  backgroundCheckStatus: ["Complete", "Pending", "Expired", "Not Started"][index % 4],
  lastActivity: `2024-01-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
  drugTestDetails: { testType: ["5-Panel Urine", "10-Panel Urine", "Hair Follicle"][index % 3], testDate: "2024-01-05", results: ["Negative", "Pending", "Negative"][index % 3], expiryDate: "2025-01-05", location: "SHIFTit Testing Center - Downtown" },
  backgroundCheckDetails: { checkType: ["Basic Criminal", "Comprehensive", "Healthcare Specific"][index % 3], requestDate: "2024-01-03", completionDate: index % 2 === 0 ? "2024-01-08" : null, status: ["Clear", "Pending", "Clear"][index % 3], results: ["No criminal history found", "Pending completion", "No criminal history found"][index % 3] },
  documents: [
    { id: "1", name: "COVID-19 Vaccination Record", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-05", expiryDate: "2025-01-05" },
    { id: "2", name: "Hepatitis B Immunity", type: "Health & Immunization", status: "Approved", uploadDate: "2024-01-03", expiryDate: "2025-01-03" },
    { id: "3", name: "MMR Immunity", type: "Health & Immunization", status: "Missing", uploadDate: null, expiryDate: null },
  ],
  requiredDocuments: [
    "COVID-19 Vaccination Record",
    "Hepatitis B Immunity",
    "MMR Immunity",
    "Varicella (Chickenpox) Immunity",
    "Tdap Vaccination",
    "Annual Influenza Vaccination",
    "TB Screening",
    "Physical Examination",
    "CPR/BLS Certification",
    "ACLS Certification",
    "HIPAA Training Certificate",
    "Professional Liability Insurance",
    "Confidentiality Agreement",
    "Health Insurance Verification",
  ],
}));

const initialPendingRequests = [
  { id: 1, name: "Sarah Johnson", email: "sarah.johnson@student.usc.edu", program: "Nursing - BSN", academicYear: "3rd Year", notes: "Transfer student from community college", requestDate: "2024-01-15", status: "Pending" },
  { id: 2, name: "Michael Chen", email: "michael.chen@student.usc.edu", program: "Nursing - ADN", academicYear: "2nd Year", notes: "Excellent academic record", requestDate: "2024-01-14", status: "Pending" },
];

// --- MAIN COMPONENT ---
export default function StudentDocumentManagementModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState("directory");
  const [studentRows, setStudentRows] = useState([{ id: 1, name: "", email: "", program: "", academicYear: "", notes: "" }]);
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
  const [filterStatus, setFilterStatus] = useState("all");

  const students = initialStudents.concat(additionalStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  function isStudentEnrolled(id) {
    return !(id === "2" || id === "5" || id === "8" || id === "11" || id === "14" || id === "17" || id === "20");
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesFilter = true;
    switch (filterStatus) {
      case "all":
        matchesFilter = true;
        break;
      case "active":
        matchesFilter = student.status === "Active";
        break;
      case "enrolled":
        matchesFilter = isStudentEnrolled(student.id);
        break;
      case "not-enrolled":
        matchesFilter = !isStudentEnrolled(student.id);
        break;
      case "documents-complete":
        matchesFilter = student.documentsStatus === "Complete";
        break;
      case "documents-incomplete":
        matchesFilter = student.documentsStatus === "Incomplete";
        break;
      case "needs-attention":
        matchesFilter = student.documentsStatus === "Needs Attention";
        break;
      case "drug-test-complete":
        matchesFilter = student.drugTestStatus === "Complete";
        break;
      case "drug-test-pending":
        matchesFilter = student.drugTestStatus === "Pending";
        break;
      case "drug-test-expired":
        matchesFilter = student.drugTestStatus === "Expired";
        break;
      case "background-complete":
        matchesFilter = student.backgroundCheckStatus === "Complete";
        break;
      case "background-pending":
        matchesFilter = student.backgroundCheckStatus === "Pending";
        break;
      default:
        matchesFilter = true;
    }
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const paginatedStudents = filteredStudents.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800 border-green-300";
      case "Incomplete":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Needs Attention":
        return "bg-red-100 text-red-800 border-red-300";
      case "Active":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Expired":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "Not Started":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Expired":
        return "bg-orange-100 text-orange-800";
      case "Missing":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const addStudentRow = () => {
    if (studentRows.length < 10) {
      const newId = Math.max(...studentRows.map((row) => row.id)) + 1;
      setStudentRows([...studentRows, { id: newId, name: "", email: "", program: "", academicYear: "", notes: "" }]);
    }
  };

  const removeStudentRow = (id) => {
    if (studentRows.length > 1) {
      setStudentRows(studentRows.filter((row) => row.id !== id));
    }
  };

  const updateStudentRow = (id, field, value) => {
    setStudentRows(studentRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleSubmitStudents = () => {
    const validStudents = studentRows.filter((student) => student.name.trim() && student.email.trim());
    if (validStudents.length === 0) {
      alert("Please fill in at least one student's name and email.");
      return;
    }
    const newRequests = validStudents.map((student) => ({
      id: Math.max(...pendingRequests.map((r) => r.id), 0) + Math.random(),
      name: student.name,
      email: student.email,
      program: student.program || "Not specified",
      academicYear: student.academicYear || "Not specified",
      notes: student.notes || "",
      requestDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    }));
    setPendingRequests([...pendingRequests, ...newRequests]);
    setStudentRows([{ id: 1, name: "", email: "", program: "", academicYear: "", notes: "" }]);
    alert(`${validStudents.length} student request(s) submitted for admin approval.`);
  };

  const canSubmit = studentRows.some((student) => student.name.trim() && student.email.trim());

  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  function fmtDate(d) {
    return d.toLocaleDateString();
  }

  function getCurrentRotation(student) {
    if (!isStudentEnrolled(student.id)) return null;
    const rotations = ["Med-Surg", "Pediatrics", "ICU", "Psych", "OB/GYN", "Community Health"];
    const idx = Number.parseInt(student.id, 10) % rotations.length;
    const base = new Date(student.lastActivity || "2024-01-10");
    const start = addDays(base, 3);
    const end = addDays(start, 7);
    return { name: rotations[idx], startDate: fmtDate(start), endDate: fmtDate(end) };
  }

  function getNextRotation(student) {
    if (!isStudentEnrolled(student.id)) return null;
    const rotations = ["Med-Surg", "Pediatrics", "ICU", "Psych", "OB/GYN", "Community Health"];
    const idx = Number.parseInt(student.id, 10) % rotations.length;
    const base = new Date(student.lastActivity || "2024-01-10");
    const nextStart = addDays(base, 3 + 7 + 3);
    const nextEnd = addDays(nextStart, 7);
    const nextName = rotations[(idx + 1) % rotations.length];
    return { name: nextName, startDate: fmtDate(nextStart), endDate: fmtDate(nextEnd) };
  }

  // Responsive Student Details Dialog
  const StudentDetailsDialog = ({ isOpen, onClose, student }) => {
    if (!isOpen || !student) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-auto max-h-[90vh]">
          <div className="p-4 border-b border-gray-200 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-600">{student.email}</p>
              <p className="text-sm text-gray-700">{student.program} — {student.academicYear}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <section>
              <h3 className="font-medium mb-2">Documents</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {student.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between border border-gray-200 p-2 rounded">
                    <div className="flex-1">
                      <div className="text-sm font-medium truncate">{doc.name}</div>
                      <div className="text-xs text-gray-500">{doc.type} • Uploaded: {doc.uploadDate || '—'}</div>
                    </div>
                    <div className="ml-3 flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs ${getDocumentStatusColor(doc.status)}`}>{doc.status}</span>
                      {doc.fileUrl && <a href={doc.fileUrl} className="text-blue-600 text-xs underline" target="_blank" rel="noopener noreferrer">View</a>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-3 rounded">
                <h4 className="font-medium mb-1">Drug Test</h4>
                <p className="text-sm">Status: <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(student.drugTestStatus)}`}>{student.drugTestStatus}</span></p>
                {student.drugTestDetails && (
                  <div className="text-sm text-gray-600 mt-2">
                    <div>Type: {student.drugTestDetails.testType}</div>
                    <div>Date: {student.drugTestDetails.testDate}</div>
                    <div>Result: {student.drugTestDetails.results}</div>
                    <div>Expires: {student.drugTestDetails.expiryDate}</div>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 p-3 rounded">
                <h4 className="font-medium mb-1">Background Check</h4>
                <p className="text-sm">Status: <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(student.backgroundCheckStatus)}`}>{student.backgroundCheckStatus}</span></p>
                {student.backgroundCheckDetails && (
                  <div className="text-sm text-gray-600 mt-2">
                    <div>Type: {student.backgroundCheckDetails.checkType}</div>
                    <div>Requested: {student.backgroundCheckDetails.requestDate}</div>
                    <div>Completed: {student.backgroundCheckDetails.completionDate || '—'}</div>
                    <div>Result: {student.backgroundCheckDetails.results}</div>
                  </div>
                )}
              </div>
            </section>

          </div>
        </div>
      </div>
    );
  };

  // ADD STUDENTS VIEW (responsive layout)
  if (currentView === "add-students") {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentView("directory")} className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded hover:bg-gray-50">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-xl font-bold">Request New Students</h1>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Plus className="w-5 h-5 text-blue-600" />
            <div className="font-semibold">Request New Student Addition</div>
          </div>

          <div className="space-y-3">
            {studentRows.map((student) => (
              <div key={student.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                <div className="md:col-span-3">
                  <input className="w-full border border-gray-200 rounded px-2 py-1" placeholder="Full name*" value={student.name} onChange={(e) => updateStudentRow(student.id, 'name', e.target.value)} />
                </div>
                <div className="md:col-span-3">
                  <input className="w-full border border-gray-200 rounded px-2 py-1" placeholder="Email*" type="email" value={student.email} onChange={(e) => updateStudentRow(student.id, 'email', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <select className="w-full border border-gray-200 rounded px-2 py-1" value={student.program} onChange={(e) => updateStudentRow(student.id, 'program', e.target.value)}>
                    <option value="">Select program</option>
                    <option value="Nursing - BSN">Nursing - BSN</option>
                    <option value="Nursing - ADN">Nursing - ADN</option>
                    <option value="Medical Assistant">Medical Assistant</option>
                    <option value="Pharmacy Technician">Pharmacy Technician</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <select className="w-full border border-gray-200 rounded px-2 py-1" value={student.academicYear} onChange={(e) => updateStudentRow(student.id, 'academicYear', e.target.value)}>
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div className="md:col-span-1">
                  <input className="w-full border border-gray-200 rounded px-2 py-1" placeholder="Notes" value={student.notes} onChange={(e) => updateStudentRow(student.id, 'notes', e.target.value)} />
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                  {studentRows.length > 1 && (
                    <button onClick={() => removeStudentRow(student.id)} className="p-2 border border-gray-200 rounded hover:bg-gray-50">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button onClick={addStudentRow} disabled={studentRows.length >= 10} className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded hover:bg-gray-50">
                  <Plus className="w-4 h-4" /> Add Student ({studentRows.length}/10)
                </button>
                <div className="text-sm text-gray-500">You can add up to 10 students</div>
              </div>
              <button onClick={handleSubmitStudents} disabled={!canSubmit} className="px-4 py-2 rounded bg-blue-600 text-white w-full md:w-auto">
                Submit All Requests
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3"><Clock className="w-5 h-5 text-yellow-600" /><div className="font-semibold">Pending Admin Approval</div></div>
          {pendingRequests.length === 0 ? (
            <div className="py-10 text-center text-gray-500">No pending requests</div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded p-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="font-medium">{request.name}</div>
                        <div className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">{request.status}</div>
                      </div>
                      <div className="text-sm text-gray-600">{request.email} • {request.program} • {request.academicYear}</div>
                    </div>
                    {request.notes && <div className="text-sm text-gray-600">Notes: {request.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    );
  }

  // MAIN DIRECTORY VIEW (responsive)
  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Student Directory</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => setCurrentView("add-students")} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Add Students
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded"><FileText className="w-5 h-5 text-blue-600" /></div>
          <div>
            <div className="text-sm text-gray-600">Total Students</div>
            <div className="text-xl font-bold">{students.length}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded"><CheckCircle className="w-5 h-5 text-green-600" /></div>
          <div>
            <div className="text-sm text-gray-600">Enrolled in Rotations</div>
            <div className="text-xl font-bold">{students.filter((s) => isStudentEnrolled(s.id)).length}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3">
          <div className="p-2 bg-yellow-50 rounded"><Clock className="w-5 h-5 text-yellow-600" /></div>
          <div>
            <div className="text-sm text-gray-600">Pending Documents</div>
            <div className="text-xl font-bold">{students.filter((student) => student.documentsStatus === "Incomplete" || student.documentsStatus === "Needs Attention").length}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3">
          <div className="p-2 bg-red-50 rounded"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
          <div>
            <div className="text-sm text-gray-600">Needs Attention</div>
            <div className="text-xl font-bold">{students.filter((student) => student.documentsStatus === "Needs Attention").length}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input className="w-full border border-gray-200 rounded pl-10 pr-3 py-2" placeholder="Search students by name, email, or program..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="w-full sm:w-48">
          <select className="w-full border border-gray-200 rounded px-2 py-2" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Students</option>
            <option value="active">Active</option>
            <option value="enrolled">Enrolled in Rotations</option>
            <option value="not-enrolled">Not Enrolled</option>
            <option value="documents-complete">Documents Complete</option>
            <option value="documents-incomplete">Documents Incomplete</option>
            <option value="needs-attention">Needs Attention</option>
            <option value="drug-test-complete">Drug Test Complete</option>
            <option value="drug-test-pending">Drug Test Pending</option>
            <option value="drug-test-expired">Drug Test Expired</option>
            <option value="background-complete">Background Check Complete</option>
            <option value="background-pending">Background Check Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-2 bg-gray-50 px-4 py-3 text-xs text-gray-600 font-medium">
          <div className="col-span-3">Student</div>
          <div className="col-span-2">Current Rotation</div>
          <div className="col-span-2">Next Rotation</div>
          <div className="col-span-1">Documents</div>
          <div className="col-span-1">Drug Test</div>
          <div className="col-span-1">Background</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        <div className="divide-y">
          {paginatedStudents.map((student) => (
            <div key={student.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-3">
                  <div className="font-medium text-gray-900 truncate">{student.name}</div>
                  <div className="text-xs text-gray-600 truncate">{student.email}</div>
                  <div className="text-xs text-gray-600">{student.program} — {student.academicYear}</div>
                </div>

                <div className="md:col-span-2">
                  {(() => { const curr = getCurrentRotation(student); if (!curr) return <span className={`px-2 py-1 rounded border border-gray-200 ${getStatusColor('Not Started')} text-xs`}>Not Enrolled</span>; return <div><div className="font-medium text-sm truncate">{curr.name}</div><div className="text-xs text-gray-600">{curr.startDate} — {curr.endDate}</div></div> })()}
                </div>

                <div className="md:col-span-2">
                  {(() => { const next = getNextRotation(student); if (!next) return <span className="px-2 py-1 rounded border border-gray-200 bg-gray-100 text-xs">Not Scheduled</span>; return <div><div className="font-medium text-sm truncate">{next.name}</div><div className="text-xs text-gray-600">{next.startDate} — {next.endDate}</div></div> })()}
                </div>

                <div className="md:col-span-1">
                  <div className="font-medium text-sm">{student.documents.filter((d) => d.status === 'Approved').length}/14</div>
                </div>

                <div className="md:col-span-1">
                  <div className="text-xs"><span className={`px-2 py-1 rounded ${getStatusColor(student.drugTestStatus)} text-xs`}>{student.drugTestStatus}</span></div>
                </div>

                <div className="md:col-span-1">
                  <div className="text-xs"><span className={`px-2 py-1 rounded ${getStatusColor(student.backgroundCheckStatus)} text-xs`}>{student.backgroundCheckStatus}</span></div>
                </div>

                <div className="md:col-span-2 flex md:justify-center">
                  <button onClick={() => { setSelectedStudent(student); setIsStudentDialogOpen(true); }} className="px-3 py-2 rounded bg-blue-600 text-white w-full md:w-auto">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredStudents.length > studentsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-700">Showing {(currentPage - 1) * studentsPerPage + 1} to {Math.min(currentPage * studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-2 py-1 border border-gray-200 rounded bg-gray-100 hover:bg-gray-200">Previous</button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 p-0 border border-gray-200 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{page}</button>
              ))}
            </div>
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-2 py-1 border border-gray-200 rounded bg-gray-100 hover:bg-gray-200">Next</button>
          </div>
        </div>
      )}

      {filteredStudents.length === 0 && <div className="text-center py-10 text-gray-500">No students found.</div>}

      <StudentDetailsDialog isOpen={isStudentDialogOpen} onClose={() => { setIsStudentDialogOpen(false); setSelectedStudent(null); }} student={selectedStudent} />

    </div>
  );
}
