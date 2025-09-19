import React, { useState, useMemo } from "react";
import { Search, Plus, Eye, Download, User, CheckCircle, AlertCircle, Shield, Clock, FlaskConical, X } from "lucide-react";

// Reusable UI Components
const Button = ({ variant = "default", size = "default", children, className = "", ...props }) => {
  let classes = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  if (variant === "default") classes += " bg-blue-600 text-white hover:bg-blue-700";
  if (variant === "secondary") classes += " bg-gray-200 text-gray-800 hover:bg-gray-300";
  if (variant === "outline") classes += " border border-gray-200 hover:bg-gray-100";
  if (size === "sm") classes += " h-8 px-3";
  else classes += " h-10 px-4 py-2";
  return <button className={`${classes} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = "" }) => <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const Badge = ({ children, className = "" }) => <span className={`inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>{children}</span>;
const Input = ({ className = "", ...props }) => <input className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 ${className}`} {...props} />;

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, valueClassName }) => (
  <Card>
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-medium text-gray-500">{title}</h3>
          <p className={`text-2xl font-bold ${valueClassName ?? "text-black"}`}>{value}</p>
        </div>
        <div className="text-gray-500">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

// Pagination Component
const Pagination = ({ page, pageCount, onPageChange }) => (
  <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>
      <span className="px-2 text-sm font-medium">
        Page {page} of {pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  </div>
);

// Data Table Component (with pagination)
const DataTable = ({
  data,
  type,
  onView,
  onDownload,
  page,
  pageSize,
  onPageChange,
}) => {
  const statusColors = (status) => {
    switch (status) {
      case "completed":
        return {
          text: "text-emerald-700",
          bg: "bg-emerald-100",
          icon: <CheckCircle className="h-4 w-4" />,
        };
      case "in-progress":
        return {
          text: "text-teal-700",
          bg: "bg-teal-100",
          icon: <Shield className="h-4 w-4" />,
        };
      case "pending":
        return {
          text: "text-amber-700",
          bg: "bg-amber-100",
          icon: <Clock className="h-4 w-4" />,
        };
      case "failed":
        return {
          text: "text-rose-700",
          bg: "bg-rose-100",
          icon: <AlertCircle className="h-4 w-4" />,
        };
      default:
        return {
          text: "text-slate-700",
          bg: "bg-slate-100",
          icon: <AlertCircle className="h-4 w-4" />,
        };
    }
  };

  const headers =
    type === "background"
      ? [
          "Student",
          "Check Type",
          "Request Date",
          "Completed Date",
          "Agency",
          "Status",
          "Actions",
        ]
      : [
          "Student",
          "Test Type",
          "Request Date",
          "Completed Date",
          "Lab",
          "Status",
          "Actions",
        ];

  // Pagination logic
  const pageCount = Math.ceil(data.length / pageSize);
  const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white shadow-sm">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {headers.map((header) => (
              <th
                key={header}
                className="text-left py-3 px-4 font-medium text-gray-500 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((item) => {
            const colors = statusColors(item.status);
            return (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{item.studentName}</p>
                      <p className="text-sm text-gray-500">{item.studentId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {type === "background" ? item.checkType : item.testType}
                </td>
                <td className="py-3 px-4">
                  {new Date(item.requestDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {item.completedDate
                    ? new Date(item.completedDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-3 px-4">
                  {type === "background" ? item.agency : item.lab}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={`flex items-center gap-1 ${colors.text} ${colors.bg}`}
                  >
                    {colors.icon}
                    <span className="capitalize">
                      {item.status.replace("-", " ")}
                    </span>
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {item.status === "completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload(item)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        page={page}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    </div>
  );
};

// Request Form Component
const RequestForm = ({ type, formData, onChange, onSubmit, onClose }) => {
  const fields = type === "background" 
    ? [
        { label: "Student ID", key: "studentId", type: "text", required: true },
        { label: "Student Name", key: "studentName", type: "text", required: true },
        { label: "Email", key: "email", type: "email", required: true },
        { label: "Phone", key: "phone", type: "tel" },
        { label: "Check Type", key: "checkType", type: "select", options: ["Criminal Background", "Education Verification", "Employment Verification"] },
        { label: "Agency", key: "agency", type: "select", options: ["Sterling Background Check", "HireRight", "Checkr"] },
        { label: "Notes", key: "notes", type: "textarea" }
      ]
    : [
        { label: "Student ID", key: "studentId", type: "text", required: true },
        { label: "Student Name", key: "studentName", type: "text", required: true },
        { label: "Email", key: "email", type: "email", required: true },
        { label: "Phone", key: "phone", type: "tel" },
        { label: "Test Type", key: "testType", type: "select", options: ["10-Panel Urine", "5-Panel Urine", "Hair Follicle", "Blood Test"] },
        { label: "Lab", key: "lab", type: "select", options: ["Quest Diagnostics", "Labcorp", "Other"] },
        { label: "Notes", key: "notes", type: "textarea" }
      ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              value={formData[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full h-20"
            />
          ) : field.type === "select" ? (
            <select
              value={formData[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full"
            >
              {field.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <Input
              type={field.type}
              value={formData[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              required={field.required}
            />
          )}
        </div>
      ))}
      <Button type="submit" className="w-full">Submit Request</Button>
    </form>
  );
};

// Mock Data
const mockBackgroundChecks = [
  { id: "1", studentName: "Sarah Johnson", studentId: "ST001", checkType: "Criminal Background", requestDate: "2024-01-15", status: "in-progress", agency: "Sterling Background Check" },
  { id: "2", studentName: "Michael Chen", studentId: "ST002", checkType: "Criminal Background", requestDate: "2024-01-10", completedDate: "2024-01-18", status: "completed", agency: "HireRight", results: "Clear" },
  { id: "3", studentName: "Ava Martinez", studentId: "ST003", checkType: "Education Verification", requestDate: "2024-02-01", status: "pending", agency: "Checkr" },
  { id: "4", studentName: "David Lee", studentId: "ST004", checkType: "Criminal Background", requestDate: "2024-02-03", status: "failed", agency: "Checkr", results: "Record Found" },
];

const mockDrugTests = [
  { id: "DT-1", studentName: "Sarah Johnson", studentId: "ST001", testType: "10-Panel Urine", requestDate: "2024-01-16", status: "completed", completedDate: "2024-01-20", lab: "Quest Diagnostics", results: "Negative" },
  { id: "DT-2", studentName: "Michael Chen", studentId: "ST002", testType: "5-Panel Urine", requestDate: "2024-01-12", status: "in-progress", lab: "Labcorp" },
  { id: "DT-3", studentName: "Ava Martinez", studentId: "ST003", testType: "Hair Follicle", requestDate: "2024-02-02", status: "pending", lab: "Quest Diagnostics" },
  { id: "DT-4", studentName: "David Lee", studentId: "ST004", testType: "10-Panel Urine", requestDate: "2024-02-05", status: "failed", lab: "Labcorp", results: "Adulterated" },
];

// Main Component
export default function VerificationsModule() {
  const [tab, setTab] = useState("background");
  const [bgSearch, setBgSearch] = useState("");
  const [bgFilter, setBgFilter] = useState("all");
  const [dtSearch, setDtSearch] = useState("");
  const [dtFilter, setDtFilter] = useState("all");
  const [showBgModal, setShowBgModal] = useState(false);
  const [showDtModal, setShowDtModal] = useState(false);
  const [bgForm, setBgForm] = useState({ studentId: "", studentName: "", email: "", phone: "", checkType: "Criminal Background", agency: "Sterling Background Check", notes: "" });
  const [dtForm, setDtForm] = useState({ studentId: "", studentName: "", email: "", phone: "", testType: "10-Panel Urine", lab: "Quest Diagnostics", notes: "" });
  const [bgPage, setBgPage] = useState(1);
  const [dtPage, setDtPage] = useState(1);
  const [bgPageSize, setBgPageSize] = useState(5);
  const [dtPageSize, setDtPageSize] = useState(5);

  const filteredBackgroundChecks = useMemo(() => {
    return mockBackgroundChecks.filter((check) => {
      const q = bgSearch.toLowerCase();
      const matchesSearch = check.studentName.toLowerCase().includes(q) || check.studentId.toLowerCase().includes(q);
      const matchesFilter = bgFilter === "all" || check.status === bgFilter;
      return matchesSearch && matchesFilter;
    });
  }, [bgSearch, bgFilter]);

  const filteredDrugTests = useMemo(() => {
    return mockDrugTests.filter((test) => {
      const q = dtSearch.toLowerCase();
      const matchesSearch = test.studentName.toLowerCase().includes(q) || test.studentId.toLowerCase().includes(q);
      const matchesFilter = dtFilter === "all" || test.status === dtFilter;
      return matchesSearch && matchesFilter;
    });
  }, [dtSearch, dtFilter]);

  // Reset page when filters/search change
  React.useEffect(() => {
    setBgPage(1);
  }, [bgSearch, bgFilter, bgPageSize]);
  React.useEffect(() => {
    setDtPage(1);
  }, [dtSearch, dtFilter, dtPageSize]);

  const pendingBgCount = mockBackgroundChecks.filter((c) => c.status === "pending").length;
  const pendingDtCount = mockDrugTests.filter((t) => t.status === "pending").length;
  const usersVerifiedLastMonth = (() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    const set = new Set();
    for (const c of mockBackgroundChecks) {
      if (c.status === "completed" && c.completedDate) {
        const d = new Date(c.completedDate);
        if (d >= start && d <= end) set.add(c.studentId);
      }
    }
    return set.size;
  })();

  const handleBgSubmit = (e) => {
    e.preventDefault();
    mockBackgroundChecks.push({
      id: (mockBackgroundChecks.length + 1).toString(),
      studentName: bgForm.studentName,
      studentId: bgForm.studentId,
      checkType: bgForm.checkType,
      requestDate: new Date().toISOString().split("T")[0],
      status: "pending",
      agency: bgForm.agency,
    });
    setShowBgModal(false);
    setBgForm({ studentId: "", studentName: "", email: "", phone: "", checkType: "Criminal Background", agency: "Sterling Background Check", notes: "" });
    alert("Background check requested successfully!");
  };

  const handleDtSubmit = (e) => {
    e.preventDefault();
    mockDrugTests.push({
      id: `DT-${mockDrugTests.length + 1}`,
      studentName: dtForm.studentName,
      studentId: dtForm.studentId,
      testType: dtForm.testType,
      requestDate: new Date().toISOString().split("T")[0],
      status: "pending",
      lab: dtForm.lab,
    });
    setShowDtModal(false);
    setDtForm({ studentId: "", studentName: "", email: "", phone: "", testType: "10-Panel Urine", lab: "Quest Diagnostics", notes: "" });
    alert("Drug test requested successfully!");
  };

  const handleView = (item) => {
    const type = item.checkType ? "background" : "drug";
    const details = type === "background" 
      ? `Check Type: ${item.checkType}\nRequest Date: ${new Date(item.requestDate).toLocaleDateString()}\nCompleted Date: ${item.completedDate ? new Date(item.completedDate).toLocaleDateString() : "N/A"}\nAgency: ${item.agency}\nStatus: ${item.status}\nResults: ${item.results || "N/A"}`
      : `Test Type: ${item.testType}\nRequest Date: ${new Date(item.requestDate).toLocaleDateString()}\nCompleted Date: ${item.completedDate ? new Date(item.completedDate).toLocaleDateString() : "N/A"}\nLab: ${item.lab}\nStatus: ${item.status}\nResults: ${item.results || "N/A"}`;
    alert(`Detailed View for ${item.studentName} (${item.studentId}):\n${details}`);
  };

  const handleDownload = (item) => {
    alert(`Downloading detailed results for ${item.studentName}:\nResults: ${item.results}\nCompleted on: ${new Date(item.completedDate).toLocaleDateString()}`);
  };

  return (
    <div className="space-y-6 p-2 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Verifications</h1>
        <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:gap-2">
          <Button onClick={() => setShowBgModal(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Request Background Check
          </Button>
          <Button variant="secondary" onClick={() => setShowDtModal(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Request Drug Test
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard title="Pending Background Checks" value={pendingBgCount} icon={<Shield className="h-6 w-6" />} valueClassName="text-amber-700" />
        <StatCard title="Pending Drug Tests" value={pendingDtCount} icon={<FlaskConical className="h-6 w-6" />} valueClassName="text-amber-700" />
        <StatCard title="Users Verified Last Month" value={usersVerifiedLastMonth} icon={<CheckCircle className="h-6 w-6" />} valueClassName="text-emerald-700" />
      </div>

      {/* Card: Tabs and Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="sr-only">Verification Lists</CardTitle>
          <div className="grid w-full grid-cols-2 rounded-md bg-gray-100 p-1">
            <button
              data-state={tab === "background" ? "active" : undefined}
              onClick={() => setTab("background")}
              className={`w-full rounded-sm text-gray-500 data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-gray-200 transition`}
            >
              Background Checks
            </button>
            <button
              data-state={tab === "drug" ? "active" : undefined}
              onClick={() => setTab("drug")}
              className={`w-full rounded-sm text-gray-500 data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-gray-200 transition`}
            >
              Drug Tests
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {tab === "background" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input placeholder="Search by student name or ID..." value={bgSearch} onChange={(e) => setBgSearch(e.target.value)} className="pl-9" />
                </div>
                <select value={bgFilter} onChange={(e) => setBgFilter(e.target.value)} className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full sm:w-auto">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
                <select value={bgPageSize} onChange={(e) => setBgPageSize(Number(e.target.value))} className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full sm:w-auto">
                  {[5, 10, 20].map((size) => (
                    <option key={size} value={size}>{size} / page</option>
                  ))}
                </select>
              </div>
              <div className="-mx-2 sm:mx-0">
                <DataTable
                  data={filteredBackgroundChecks}
                  type="background"
                  onView={handleView}
                  onDownload={handleDownload}
                  page={bgPage}
                  pageSize={bgPageSize}
                  onPageChange={setBgPage}
                />
              </div>
            </div>
          )}

          {tab === "drug" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input placeholder="Search by student name or ID..." value={dtSearch} onChange={(e) => setDtSearch(e.target.value)} className="pl-9" />
                </div>
                <select value={dtFilter} onChange={(e) => setDtFilter(e.target.value)} className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full sm:w-auto">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
                <select value={dtPageSize} onChange={(e) => setDtPageSize(Number(e.target.value))} className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full sm:w-auto">
                  {[5, 10, 20].map((size) => (
                    <option key={size} value={size}>{size} / page</option>
                  ))}
                </select>
              </div>
              <div className="-mx-2 sm:mx-0">
                <DataTable
                  data={filteredDrugTests}
                  type="drug"
                  onView={handleView}
                  onDownload={handleDownload}
                  page={dtPage}
                  pageSize={dtPageSize}
                  onPageChange={setDtPage}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal: full screen on mobile */}
      <Modal isOpen={showBgModal} onClose={() => setShowBgModal(false)} title="Request Background Check">
        <div className="w-full">
          <RequestForm type="background" formData={bgForm} onChange={(key, value) => setBgForm({ ...bgForm, [key]: value })} onSubmit={handleBgSubmit} />
        </div>
      </Modal>

      <Modal isOpen={showDtModal} onClose={() => setShowDtModal(false)} title="Request Drug Test">
        <div className="w-full">
          <RequestForm type="drug" formData={dtForm} onChange={(key, value) => setDtForm({ ...dtForm, [key]: value })} onSubmit={handleDtSubmit} />
        </div>
      </Modal>
    </div>
  );
}