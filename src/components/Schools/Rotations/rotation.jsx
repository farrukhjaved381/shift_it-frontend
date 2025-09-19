import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, PlusIcon, SearchIcon, UsersIcon, AlertTriangleIcon, EyeIcon, CheckIcon, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock Data
const mockRotations = [
  {
    id: "ROT001",
    title: "Medical-Surgical Nursing",
    location: "USC Medical Center",
    instructor: "Dr. Sarah Mitchell",
    status: "Active",
    assignedStudents: ["Emily Johnson", "Michael Chen", "Sarah Williams", "David Rodriguez", "Jessica Lee"],
    maxStudents: 8,
    schedule: {
      days: ["Monday", "Tuesday", "Wednesday"],
      startTime: "7:00 AM",
      endTime: "3:00 PM",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
    },
  },
  {
    id: "ROT002",
    title: "Pediatric Nursing",
    location: "Children's Hospital LA",
    instructor: "Prof. Michael Rodriguez",
    status: "Active",
    assignedStudents: ["Amanda Davis", "James Wilson", "Lisa Garcia"],
    maxStudents: 6,
    schedule: {
      days: ["Thursday", "Friday"],
      startTime: "8:00 AM",
      endTime: "4:00 PM",
      startDate: "2024-01-20",
      endDate: "2024-03-20",
    },
  },
];

const upcomingRotations = [
  {
    id: "ROT004",
    title: "Critical Care Nursing",
    location: "UCLA Medical Center",
    instructor: "Dr. Amanda Foster",
    status: "Upcoming",
    assignedStudents: ["Kevin Park", "Rachel Green"],
    maxStudents: 6,
    schedule: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      startTime: "6:00 AM",
      endTime: "6:00 PM",
      startDate: "2024-04-01",
      endDate: "2024-06-01",
    },
  },
];

const completedRotations = [
  {
    id: "ROT005",
    title: "Emergency Medicine",
    location: "Cedars-Sinai Medical Center",
    instructor: "Dr. Thomas Wright",
    status: "Completed",
    assignedStudents: ["Alex Johnson", "Maria Lopez", "Chris Taylor"],
    maxStudents: 8,
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      startTime: "8:00 AM",
      endTime: "8:00 PM",
      startDate: "2023-11-01",
      endDate: "2024-01-01",
    },
  },
];

const pendingRequests = [
  {
    id: "REQ001",
    title: "Obstetrics & Gynecology",
    hospital: "Memorial Hospital",
    rotationType: "Obstetrics",
    programType: "Nursing - BSN",
    requestedBy: "UCLA School of Nursing",
    requestDate: "2024-01-10",
    status: "Pending Review",
    priority: "High",
    numberOfStudents: "6",
    numberOfClinicalEducators: "2",
    rotationStartDate: "2024-03-15",
    rotationEndDate: "2024-05-15",
    rotationDays: ["Monday", "Tuesday", "Wednesday"],
    rotationStartTime: "7:00",
    rotationEndTime: "15:00",
    courseObjective: "Obstetrics and Gynecology Clinical Experience",
    message: "We need clinical placement for our final semester BSN students in OB/GYN rotation.",
  },
];

// Badge Component
const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

// Simple Dialogs
function RotationDetailsDialog({ rotation, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Rotation Details</h2>
        {rotation && (
          <div>
            <p><strong>Title:</strong> {rotation.title || rotation.title}</p>
            <p><strong>Location:</strong> {rotation.location || rotation.hospital}</p>
            <p><strong>Instructor:</strong> {rotation.instructor || rotation.requestedBy}</p>
            <p><strong>Students:</strong> {rotation.assignedStudents ? rotation.assignedStudents.join(', ') : '—'}</p>
            <p><strong>Schedule:</strong> {rotation.schedule ? `${rotation.schedule.days.join(', ')} ${rotation.schedule.startTime} - ${rotation.schedule.endTime}` : '—'}</p>
          </div>
        )}
        <button onClick={onClose} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}

function RequestRotationDialog({ isOpen, onClose }) {
  const [currentTab, setCurrentTab] = useState("hospital");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    hospital: "",
    rotationType: "",
    programType: "",
    programStartDate: "",
    rotationStartDate: "",
    rotationEndDate: "",
    rotationDays: [],
    rotationStartTime: "",
    rotationEndTime: "",
    courseObjective: "",
    message: "",
    numberOfStudents: "",
    numberOfClinicalEducators: "",
  });

  const hospitals = ["Memorial Hospital", "City General Hospital", "University Medical Center"];
  const rotationTypes = ["Medical-Surgical", "Pediatrics", "Obstetrics"];
  const programTypes = ["Nursing - BSN", "Nursing - ADN"];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDayToggle = (day) => {
    const updatedDays = formData.rotationDays.includes(day) ? formData.rotationDays.filter(d => d !== day) : [...formData.rotationDays, day];
    handleInputChange("rotationDays", updatedDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting rotation request:", formData);
    setSubmitted(true);
  };

  const goToNextTab = () => {
    const tabs = ["hospital", "program", "schedule", "details", "review"];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) setCurrentTab(tabs[currentIndex + 1]);
  };

  const goToPreviousTab = () => {
    const tabs = ["hospital", "program", "schedule", "details", "review"];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) setCurrentTab(tabs[currentIndex - 1]);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      hospital: "",
      rotationType: "",
      programType: "",
      programStartDate: "",
      rotationStartDate: "",
      rotationEndDate: "",
      rotationDays: [],
      rotationStartTime: "",
      rotationEndTime: "",
      courseObjective: "",
      message: "",
      numberOfStudents: "",
      numberOfClinicalEducators: "",
    });
    setCurrentTab("hospital");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Request Clinical Rotation</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        {submitted ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Request Submitted Successfully</h3>
            <p className="text-center text-gray-500 mb-6">Your request has been submitted.</p>
            <div className="flex justify-center">
              <button onClick={handleClose} className="bg-blue-600 text-white px-4 py-2 rounded">Close</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-5 mb-6">
              {["hospital", "program", "schedule", "details", "review"].map((tab) => (
                <button
                  key={tab}
                  className={`p-4 text-center ${currentTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {currentTab === "hospital" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Hospital</h3>
                <select value={formData.hospital} onChange={(e) => handleInputChange("hospital", e.target.value)} className="w-full p-2 border border-gray-200 rounded">
                  <option value="">Select Hospital</option>
                  {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                <div className="flex justify-end">
                  <button onClick={goToNextTab} disabled={!formData.hospital} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
                </div>
              </div>
            )}

            {currentTab === "program" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Program Information</h3>
                <select value={formData.rotationType} onChange={(e) => handleInputChange("rotationType", e.target.value)} className="w-full p-2 border border-gray-200 rounded">
                  <option value="">Select Rotation Type</option>
                  {rotationTypes.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <select value={formData.programType} onChange={(e) => handleInputChange("programType", e.target.value)} className="w-full p-2 border border-gray-200 rounded">
                  <option value="">Select Program Type</option>
                  {programTypes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <div className="flex justify-between">
                  <button onClick={goToPreviousTab} className="bg-gray-300 px-4 py-2 rounded">Previous</button>
                  <button onClick={goToNextTab} disabled={!formData.rotationType || !formData.programType} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
                </div>
              </div>
            )}

            {currentTab === "schedule" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Schedule</h3>
                <input type="date" value={formData.rotationStartDate} onChange={(e) => handleInputChange("rotationStartDate", e.target.value)} className="w-full p-2 border border-gray-200 rounded" />
                <input type="date" value={formData.rotationEndDate} onChange={(e) => handleInputChange("rotationEndDate", e.target.value)} className="w-full p-2 border border-gray-200 rounded" />
                <div className="flex gap-2 flex-wrap">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                    <button
                      key={day}
                      className={`p-2 border border-gray-200 rounded ${formData.rotationDays.includes(day) ? 'bg-blue-600 text-white' : ''}`}
                      onClick={() => handleDayToggle(day)}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button onClick={goToPreviousTab} className="bg-gray-300 px-4 py-2 rounded">Previous</button>
                  <button onClick={goToNextTab} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
                </div>
              </div>
            )}

            {currentTab === "details" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Details</h3>
                <input type="text" placeholder="Course Objective" value={formData.courseObjective} onChange={(e) => handleInputChange("courseObjective", e.target.value)} className="w-full p-2 border border-gray-200 rounded" />
                <textarea placeholder="Message" value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} className="w-full p-2 border border-gray-200 rounded" rows="4"></textarea>
                <div className="flex justify-between">
                  <button onClick={goToPreviousTab} className="bg-gray-300 px-4 py-2 rounded">Previous</button>
                  <button onClick={goToNextTab} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
                </div>
              </div>
            )}

            {currentTab === "review" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Review</h3>
                <div className="border border-gray-200 p-4 rounded">
                  <p>Hospital: {formData.hospital}</p>
                  <p>Rotation Type: {formData.rotationType}</p>
                  <p>Program Type: {formData.programType}</p>
                  <p>Start Date: {formData.rotationStartDate}</p>
                  <p>End Date: {formData.rotationEndDate}</p>
                  <p>Days: {formData.rotationDays.join(', ')}</p>
                  <p>Objective: {formData.courseObjective}</p>
                  <p>Message: {formData.message}</p>
                </div>
                <div className="flex justify-between">
                  <button onClick={goToPreviousTab} className="bg-gray-300 px-4 py-2 rounded">Previous</button>
                  <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ApproveRotationDialog({ request, isOpen, onClose }) {
  const [action, setAction] = useState(null);
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Admin action:", { action, comments, requestId: request?.id });
    setSubmitted(true);
  };

  const resetForm = () => {
    setAction(null);
    setComments("");
    setSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Review Rotation Request</h2>
        {submitted ? (
          <div className="text-center">
            <p>Request {action}ed successfully.</p>
            <button onClick={handleClose} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Close</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p><strong>Hospital:</strong> {request.hospital}</p>
              <p><strong>Type:</strong> {request.rotationType}</p>
            </div>
            <div>
              <label className="block">Action</label>
              <select value={action || ""} onChange={(e) => setAction(e.target.value)} className="w-full p-2 border border-gray-200 rounded">
                <option value="">Select Action</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <textarea placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)} className="w-full p-2 border border-gray-200 rounded" rows="4"></textarea>
            <div className="flex justify-end gap-2">
              <button onClick={handleClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSubmit} disabled={!action} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Component
export default function RotationsModule() {
  // Pagination states
  const [rotations] = useState(mockRotations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("active");
  const [selectedRotation, setSelectedRotation] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRotationDetails, setShowRotationDetails] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);

  // Pagination states for each tab
  const [activePage, setActivePage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);
  const PAGE_SIZE = 5; // You can adjust this number as needed

  // Filtering logic
  const filteredRotations = rotations.filter((rotation) => {
    const matchesSearch = rotation.title.toLowerCase().includes(searchTerm.toLowerCase()) || rotation.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || rotation.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredRequests = pendingRequests.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || request.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const getPaginated = (items, page) => items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeRotations = filteredRotations.filter(r => r.status === "Active");
  const paginatedActive = getPaginated(activeRotations, activePage);
  const activeTotalPages = Math.max(1, Math.ceil(activeRotations.length / PAGE_SIZE));

  const paginatedUpcoming = getPaginated(upcomingRotations, upcomingPage);
  const upcomingTotalPages = Math.max(1, Math.ceil(upcomingRotations.length / PAGE_SIZE));

  const paginatedCompleted = getPaginated(completedRotations, completedPage);
  const completedTotalPages = Math.max(1, Math.ceil(completedRotations.length / PAGE_SIZE));

  const paginatedPending = getPaginated(filteredRequests, pendingPage);
  const pendingTotalPages = Math.max(1, Math.ceil(filteredRequests.length / PAGE_SIZE));

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
  };

  const renderScheduleCards = (schedule) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <div className="flex gap-2 flex-wrap">
        {days.map((day, index) => {
          const isScheduled = schedule.days.includes(day.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/, (m) => ({ Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" }[m])));
          return (
            <div key={index} className={`text-xs p-2 rounded border text-center w-[80px] ${!isScheduled ? "bg-gray-100 text-gray-600 border-gray-200" : "bg-blue-100 text-blue-800 border-blue-300"}`}>
              <div className="font-medium mb-1">{day}</div>
              {!isScheduled ? <div className="text-[10px]">Open</div> : <><div className="text-[10px]">{schedule.startTime}</div><div className="text-[10px]">- {schedule.endTime}</div></>}
            </div>
          );
        })}
      </div>
    );
  };

  const getStatusBadge = (status) => {
    let className;
    switch (status) {
      case "Pending Review":
        className = "bg-yellow-100 text-yellow-800";
        break;
      case "Under Review":
        className = "bg-blue-100 text-blue-800";
        break;
      default:
        className = "bg-gray-100 text-gray-800";
    }
    return <Badge className={className}>{status}</Badge>;
  };

  const handleApproveRequest = (request) => {
    setSelectedRequest(request);
    setShowApproveDialog(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">Clinical Rotations</h2>
        <button onClick={() => setShowRequestForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition">
          <PlusIcon className="h-5 w-5" />
          Request Rotation
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Rotations</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Students Assigned</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Clinical Sites</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search rotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 bg-blue-100 rounded-t-xl overflow-hidden mt-2">
        <button
          className={`p-4 text-center ${activeTab === 'active' ? 'bg-white font-medium border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('active')}
        >
          Active Rotations
        </button>
        <button
          className={`p-4 text-center ${activeTab === 'upcoming' ? 'bg-white font-medium border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`p-4 text-center ${activeTab === 'completed' ? 'bg-white font-medium border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button
          className={`p-4 text-center ${activeTab === 'pending' ? 'bg-white font-medium border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending <Badge className="ml-2 bg-red-500 text-white">1</Badge>
        </button>
      </div>

      <div className="mt-4 space-y-8">

        {/* MOBILE: card lists for each tab (with pagination) */}
        <div className="md:hidden">
          {activeTab === 'active' && paginatedActive.map(rotation => (
            <div key={rotation.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:shadow-md transition flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{rotation.title}</div>
                  <div className="text-xs text-gray-500">{rotation.id}</div>
                </div>
                <div className="text-sm text-gray-600 text-right">
                  <div className="text-lg font-bold text-blue-600">{rotation.assignedStudents.length}</div>
                  <div className="text-xs text-gray-500">/ {rotation.maxStudents}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2"><MapPinIcon className="h-4 w-4" /> {rotation.location}</div>
              <div className="text-sm text-gray-600">Instructor: {rotation.instructor}</div>
              <div>{renderScheduleCards(rotation.schedule)}</div>
              <div className="flex justify-end gap-2">
                <button onClick={() => { setSelectedRotation(rotation); setShowRotationDetails(true); }} className="border border-gray-200 px-3 py-1 rounded">
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === 'active' && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">
                Page {activePage} of {activeTotalPages}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  disabled={activePage === 1}
                  onClick={() => setActivePage(activePage - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  disabled={activePage === activeTotalPages}
                  onClick={() => setActivePage(activePage + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          {activeTab === 'upcoming' && paginatedUpcoming.map(rotation => (
            <div key={rotation.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{rotation.title}</div>
                  <div className="text-xs text-gray-500">{rotation.id}</div>
                </div>
                <div className="text-sm text-gray-600 text-right">
                  <div className="text-lg font-bold text-green-600">{rotation.assignedStudents.length}</div>
                  <div className="text-xs text-gray-500">/ {rotation.maxStudents}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2"><MapPinIcon className="h-4 w-4" /> {rotation.location}</div>
              <div className="text-sm text-gray-600">Instructor: {rotation.instructor}</div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {formatDateShort(rotation.schedule.startDate)}</span>
                <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {formatDateShort(rotation.schedule.endDate)}</span>
              </div>
              <div className="flex justify-end">
                <button onClick={() => { setSelectedRotation(rotation); setShowRotationDetails(true); }} className="border border-gray-200 px-3 py-1 rounded">
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === 'upcoming' && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">
                Page {upcomingPage} of {upcomingTotalPages}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  disabled={upcomingPage === 1}
                  onClick={() => setUpcomingPage(upcomingPage - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  disabled={upcomingPage === upcomingTotalPages}
                  onClick={() => setUpcomingPage(upcomingPage + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          {activeTab === 'completed' && paginatedCompleted.map(rotation => (
            <div key={rotation.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{rotation.title}</div>
                  <div className="text-xs text-gray-500">{rotation.id}</div>
                </div>
                <div className="text-sm text-gray-600 text-right">
                  <div className="text-lg font-bold text-gray-600">{rotation.assignedStudents.length}</div>
                  <div className="text-xs text-gray-500">/ {rotation.maxStudents}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2"><MapPinIcon className="h-4 w-4" /> {rotation.location}</div>
              <div className="text-sm text-gray-600">Instructor: {rotation.instructor}</div>
              <div className="text-sm text-gray-600">End: {formatDateShort(rotation.schedule.endDate)}</div>
              <div className="flex justify-end">
                <button onClick={() => { setSelectedRotation(rotation); setShowRotationDetails(true); }} className="border border-gray-200 px-3 py-1 rounded">
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === 'completed' && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">
                Page {completedPage} of {completedTotalPages}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  disabled={completedPage === 1}
                  onClick={() => setCompletedPage(completedPage - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  disabled={completedPage === completedTotalPages}
                  onClick={() => setCompletedPage(completedPage + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          {activeTab === 'pending' && paginatedPending.map(request => (
            <div key={request.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{request.title}</div>
                  <div className="text-xs text-gray-500">{request.rotationType}</div>
                </div>
                <div>{getStatusBadge(request.status)}</div>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2"><MapPinIcon className="h-4 w-4" /> {request.hospital}</div>
              <div className="text-sm text-gray-600">Students: <span className="font-medium">{request.numberOfStudents}</span></div>
              <div className="flex justify-between text-sm text-gray-600">
                <div>{formatDateShort(request.rotationStartDate)}</div>
                <div>to {formatDateShort(request.rotationEndDate)}</div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => handleApproveRequest(request)} className="border border-gray-200 px-3 py-1 rounded">Approve</button>
                <button onClick={() => { setSelectedRotation(request); setShowRotationDetails(true); }} className="border border-gray-200 px-3 py-1 rounded">
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {activeTab === 'pending' && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">
                Page {pendingPage} of {pendingTotalPages}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  disabled={pendingPage === 1}
                  onClick={() => setPendingPage(pendingPage - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  disabled={pendingPage === pendingTotalPages}
                  onClick={() => setPendingPage(pendingPage + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP: tables (with pagination) */}
        <div className="hidden md:block">
          {activeTab === 'active' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Active Rotation Assignments</h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left font-medium text-gray-600">Rotation Name</th>
                      <th className="p-2 text-left font-medium text-gray-600">Location</th>
                      <th className="p-2 text-left font-medium text-gray-600">Instructor</th>
                      <th className="p-2 text-left font-medium text-gray-600">Students</th>
                      <th className="p-2 text-left font-medium text-gray-600">Period</th>
                      <th className="p-2 text-left font-medium text-gray-600">Schedule</th>
                      <th className="p-2 text-left font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRotations.filter(r => r.status === "Active").map((rotation) => (
                      <tr key={rotation.id} className="border-t border-gray-200">
                        <td className="p-2">
                          <div className="font-medium">{rotation.title}</div>
                          <div className="text-sm text-gray-500">{rotation.id}</div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                            {rotation.location}
                          </div>
                        </td>
                        <td className="p-2">{rotation.instructor}</td>
                        <td className="p-2">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{rotation.assignedStudents.length}</div>
                            <div className="text-xs text-gray-500"> / {rotation.maxStudents}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">
                            <div className="font-medium">{formatDateShort(rotation.schedule.startDate)}</div>
                            <div className="text-gray-500">to {formatDateShort(rotation.schedule.endDate)}</div>
                          </div>
                        </td>
                        <td className="p-2">{renderScheduleCards(rotation.schedule)}</td>
                        <td className="p-2">
                          <button onClick={() => { setSelectedRotation(rotation); setShowRotationDetails(true); }} className="border border-gray-200 px-2 py-1 rounded">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                  Page {activePage} of {activeTotalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    disabled={activePage === 1}
                    onClick={() => setActivePage(activePage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    disabled={activePage === activeTotalPages}
                    onClick={() => setActivePage(activePage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'upcoming' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Upcoming Rotations</h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left font-medium text-gray-600">Rotation Name</th>
                      <th className="p-2 text-left font-medium text-gray-600">Location</th>
                      <th className="p-2 text-left font-medium text-gray-600">Instructor</th>
                      <th className="p-2 text-left font-medium text-gray-600">Students</th>
                      <th className="p-2 text-left font-medium text-gray-600">Start Date</th>
                      <th className="p-2 text-left font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingRotations.map((rotation) => (
                      <tr key={rotation.id} className="border-t border-gray-200">
                        <td className="p-2">
                          <div className="font-medium">{rotation.title}</div>
                          <div className="text-sm text-gray-500">{rotation.id}</div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                            {rotation.location}
                          </div>
                        </td>
                        <td className="p-2">{rotation.instructor}</td>
                        <td className="p-2">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{rotation.assignedStudents.length}</div>
                            <div className="text-xs text-gray-500"> / {rotation.maxStudents}</div>
                          </div>
                        </td>
                        <td className="p-2">{formatDateShort(rotation.schedule.startDate)}</td>
                        <td className="p-2">
                          <button onClick={() => { setSelectedRotation(rotation); setShowRotationDetails(true); }} className="border border-gray-200 px-2 py-1 rounded">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                  Page {upcomingPage} of {upcomingTotalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    disabled={upcomingPage === 1}
                    onClick={() => setUpcomingPage(upcomingPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    disabled={upcomingPage === upcomingTotalPages}
                    onClick={() => setUpcomingPage(upcomingPage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'completed' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Completed Rotations</h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left font-medium text-gray-600">Rotation Name</th>
                      <th className="p-2 text-left font-medium text-gray-600">Location</th>
                      <th className="p-2 text-left font-medium text-gray-600">Instructor</th>
                      <th className="p-2 text-left font-medium text-gray-600">Students</th>
                      <th className="p-2 text-left font-medium text-gray-600">End Date</th>
                      <th className="p-2 text-left font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedRotations.map((rotation) => (
                      <tr key={rotation.id} className="border-t border-gray-200">
                        <td className="p-2">
                          <div className="font-medium">{rotation.title}</div>
                          <div className="text-sm text-gray-500">{rotation.id}</div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                            {rotation.location}
                          </div>
                        </td>
                        <td className="p-2">{rotation.instructor}</td>
                        <td className="p-2">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-600">{rotation.assignedStudents.length}</div>
                            <div className="text-xs text-gray-500"> / {rotation.maxStudents}</div>
                          </div>
                        </td>
                        <td className="p-2">{formatDateShort(rotation.schedule.endDate)}</td>
                        <td className="p-2">
                          <button onClick={() => { setSelectedRotation(rotation); setShowRotationDetails(true); }} className="border border-gray-200 px-2 py-1 rounded">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                  Page {completedPage} of {completedTotalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    disabled={completedPage === 1}
                    onClick={() => setCompletedPage(completedPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    disabled={completedPage === completedTotalPages}
                    onClick={() => setCompletedPage(completedPage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'pending' && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Pending Rotation Requests</h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left font-medium text-gray-600">Rotation Name</th>
                      <th className="p-2 text-left font-medium text-gray-600">Location</th>
                      <th className="p-2 text-left font-medium text-gray-600">Students</th>
                      <th className="p-2 text-left font-medium text-gray-600">Dates</th>
                      <th className="p-2 text-left font-medium text-gray-600">Status</th>
                      <th className="p-2 text-left font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="border-t border-gray-200">
                        <td className="p-2">
                          <div className="font-medium">{request.title}</div>
                          <div className="text-sm text-gray-500">{request.rotationType}</div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                            {request.hospital}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{request.numberOfStudents}</div>
                            <div className="text-xs text-gray-500">students</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">
                            <div className="font-medium">{formatDateShort(request.rotationStartDate)}</div>
                            <div className="text-gray-500">to {formatDateShort(request.rotationEndDate)}</div>
                          </div>
                        </td>
                        <td className="p-2">{getStatusBadge(request.status)}</td>
                        <td className="p-2">
                          <button onClick={() => handleApproveRequest(request)} className="border border-gray-200 px-2 py-1 rounded mr-2">
                            Approve
                          </button>
                          <button onClick={() => { setSelectedRotation(request); setShowRotationDetails(true); }} className="border border-gray-200 px-2 py-1 rounded">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                  Page {pendingPage} of {pendingTotalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    disabled={pendingPage === 1}
                    onClick={() => setPendingPage(pendingPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    disabled={pendingPage === pendingTotalPages}
                    onClick={() => setPendingPage(pendingPage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <RotationDetailsDialog rotation={selectedRotation} isOpen={showRotationDetails} onClose={() => setShowRotationDetails(false)} />
      <RequestRotationDialog isOpen={showRequestForm} onClose={() => setShowRequestForm(false)} />
      <ApproveRotationDialog request={selectedRequest} isOpen={showApproveDialog} onClose={() => setShowApproveDialog(false)} />
    </div>
  );
}