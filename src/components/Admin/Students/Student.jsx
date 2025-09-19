import { useState } from "react";
import { PencilIcon, NoSymbolIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// Mock data for students
const initialStudents = [
  {
    id: 'std-001',
    name: 'Alex Johnson',
    school: 'University of Health Sciences',
    program: 'Nursing',
    status: 'Active',
    statusColor: 'bg-green-500 text-white',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    expectedGraduation: '2024',
    totalRotations: 3,
    completed: 2,
    inProgress: 1,
    pending: 0,
  },
  {
    id: 'std-002',
    name: 'Taylor Smith',
    school: 'Medical Training Institute',
    program: 'Physical Therapy',
    status: 'Active',
    statusColor: 'bg-green-500 text-white',
    email: 'taylor.smith@email.com',
    phone: '(555) 234-5678',
    expectedGraduation: '2023',
    totalRotations: 1,
    completed: 1,
    inProgress: 0,
    pending: 0,
  },
  {
    id: 'std-003',
    name: 'Jordan Lee',
    school: 'Allied Health College',
    program: 'Medical Assistant',
    status: 'Pending',
    statusColor: 'bg-yellow-500 text-white',
    email: 'jordan.lee@email.com',
    phone: '(555) 345-6789',
    expectedGraduation: '2025',
    totalRotations: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  },
  {
    id: 'std-004',
    name: 'Morgan Williams',
    school: 'University of Health Sciences',
    program: 'Nursing',
    status: 'Graduated',
    statusColor: 'bg-blue-500 text-white',
    email: 'morgan.williams@email.com',
    phone: '(555) 456-7890',
    expectedGraduation: '2023',
    totalRotations: 4,
    completed: 4,
    inProgress: 0,
    pending: 0,
  },
  {
    id: 'std-005',
    name: 'Casey Brown',
    school: 'Nursing Academy',
    program: 'Nursing',
    status: 'Blocked',
    statusColor: 'bg-red-500 text-white',
    email: 'casey.brown@email.com',
    phone: '(555) 567-8901',
    expectedGraduation: '2024',
    totalRotations: 2,
    completed: 1,
    inProgress: 0,
    pending: 1,
  },
];

// Mock data for rotations
const initialRotations = [
  {
    id: 'rot-001',
    studentId: 'std-001',
    studentName: 'Alex Johnson',
    clinicalSite: 'General Hospital',
    department: 'Emergency',
    startDate: '2025-09-15',
    endDate: '2025-10-15',
    preceptor: 'Dr. Sarah Wilson',
    requiredHours: '120',
    status: 'In Progress',
    notes: 'Emergency rotation focusing on trauma care'
  },
  {
    id: 'rot-002',
    studentId: 'std-002',
    studentName: 'Taylor Smith',
    clinicalSite: 'Rehabilitation Center',
    department: 'Physical Therapy',
    startDate: '2025-09-20',
    endDate: '2025-11-20',
    preceptor: 'Dr. Mike Chen',
    requiredHours: '160',
    status: 'Scheduled',
    notes: 'Outpatient rehabilitation focus'
  },
];

export default function StudentsManagement() {
  const [view, setView] = useState('students');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [students, setStudents] = useState(initialStudents);
  const [rotations, setRotations] = useState(initialRotations);
  const [selectedRotation, setSelectedRotation] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignRotationOpen, setIsAssignRotationOpen] = useState(false);
  const [isRotationDetailsOpen, setIsRotationDetailsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // September 2025
  const [calendarView, setCalendarView] = useState('month');
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    school: '',
    program: '',
    status: 'Pending',
    statusColor: 'bg-yellow-500 text-white',
    email: '',
    phone: '',
    expectedGraduation: '',
    totalRotations: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });
  const [editStudent, setEditStudent] = useState(null);
  const [rotationForm, setRotationForm] = useState({
    clinicalSite: '',
    department: '',
    startDate: '',
    endDate: '',
    preceptor: '',
    requiredHours: '',
    notes: '',
    status: 'Pending Approval',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Statuses' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginate filtered students
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Add Student Form Submission
  const handleAddStudent = (e) => {
    e.preventDefault();
    const studentToAdd = {
      ...newStudent,
      id: `std-${Date.now()}`,
      statusColor:
        newStudent.status === 'Active'
          ? 'bg-green-500 text-white'
          : newStudent.status === 'Pending'
          ? 'bg-yellow-500 text-white'
          : newStudent.status === 'Graduated'
          ? 'bg-blue-500 text-white'
          : newStudent.status === 'Blocked'
          ? 'bg-red-500 text-white'
          : 'bg-gray-500 text-white',
    };
    setStudents([...students, studentToAdd]);
    setIsAddModalOpen(false);
    setNewStudent({
      id: '',
      name: '',
      school: '',
      program: '',
      status: 'Pending',
      statusColor: 'bg-yellow-500 text-white',
      email: '',
      phone: '',
      expectedGraduation: '',
      totalRotations: 0,
      completed: 0,
      inProgress: 0,
      pending: 0,
    });
    alert('Student added successfully!');
  };

  // Handle Edit Student Form Submission
  const handleEditStudent = (e) => {
    e.preventDefault();
    if (editStudent) {
      const updatedStudent = {
        ...editStudent,
        statusColor:
          editStudent.status === 'Active'
            ? 'bg-green-500 text-white'
            : editStudent.status === 'Pending'
            ? 'bg-yellow-500 text-white'
            : editStudent.status === 'Graduated'
            ? 'bg-blue-500 text-white'
            : editStudent.status === 'Blocked'
            ? 'bg-red-500 text-white'
            : 'bg-gray-500 text-white',
      };
      setStudents(
        students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      setSelectedStudent(updatedStudent);
      setIsEditModalOpen(false);
      setEditStudent(null);
      alert('Student updated successfully!');
    }
  };

  // Handle Block/Unblock Student
  const handleBlockUnblockStudent = () => {
    if (selectedStudent) {
      if (selectedStudent.status !== 'Blocked') {
        if (
          window.confirm(
            `Are you sure you want to block ${selectedStudent.name}?`
          )
        ) {
          const updatedStudent = {
            ...selectedStudent,
            status: 'Blocked',
            statusColor: 'bg-red-500 text-white',
          };
          setStudents(
            students.map((student) =>
              student.id === updatedStudent.id ? updatedStudent : student
            )
          );
          setSelectedStudent(updatedStudent);
          alert(`${selectedStudent.name} has been blocked!`);
        }
      } else {
        if (
          window.confirm(
            `Are you sure you want to unblock ${selectedStudent.name}?`
          )
        ) {
          const updatedStudent = {
            ...selectedStudent,
            status: 'Active', // Assuming unblocking sets to Active, adjust if needed
            statusColor: 'bg-green-500 text-white',
          };
          setStudents(
            students.map((student) =>
              student.id === updatedStudent.id ? updatedStudent : student
            )
          );
          setSelectedStudent(updatedStudent);
          alert(`${selectedStudent.name} has been unblocked!`);
        }
      }
    }
  };

  // Handle Assign Rotation Submission
  const handleAssignRotation = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      const newRotation = {
        id: `rot-${Date.now()}`,
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        ...rotationForm,
      };
      
      setRotations([...rotations, newRotation]);
      
      const updatedStudent = {
        ...selectedStudent,
        totalRotations: selectedStudent.totalRotations + 1,
        pending: selectedStudent.pending + 1,
      };
      setStudents(
        students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      setSelectedStudent(updatedStudent);
    }
    setIsAssignRotationOpen(false);
    setRotationForm({
      clinicalSite: '',
      department: '',
      startDate: '',
      endDate: '',
      preceptor: '',
      requiredHours: '',
      notes: '',
      status: 'Pending Approval',
    });
    alert('Rotation assigned successfully!');
  };

  // Calendar logic
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Get rotations for a specific day
  const getRotationsForDay = (day) => {
    const dayString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return rotations.filter(rotation => {
      const startDate = new Date(rotation.startDate);
      const endDate = new Date(rotation.endDate);
      const checkDate = new Date(dayString);
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  // Get status color for rotation
  const getRotationStatusColor = (status) => {
    switch (status) {
      case 'Pending Approval': return 'bg-yellow-500';
      case 'Scheduled': return 'bg-blue-500';
      case 'In Progress': return 'bg-green-500';
      case 'Completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const weeks = [];
    let currentWeek = [];

    // Add empty cells for days before the first
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(<td key={`empty-${i}`} className="border border-gray-200 p-2 h-24 align-top"></td>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayRotations = getRotationsForDay(day);
      currentWeek.push(
        <td key={day} className="border border-gray-200 p-2 h-24 align-top">
          <div className="font-semibold mb-1">{day}</div>
          <div className="space-y-1">
            {dayRotations.slice(0, 2).map((rotation, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedRotation(rotation);
                  setIsRotationDetailsOpen(true);
                }}
                className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 ${getRotationStatusColor(rotation.status)}`}
              >
                {rotation.studentName.split(' ')[0]}
              </div>
            ))}
            {dayRotations.length > 2 && (
              <div className="text-xs text-gray-500">+{dayRotations.length - 2} more</div>
            )}
          </div>
        </td>
      );
      if (currentWeek.length === 7) {
        weeks.push(<tr key={`week-${weeks.length}`}>{currentWeek}</tr>);
        currentWeek = [];
      }
    }

    // Add empty cells after the last day
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(<td key={`empty-after-${currentWeek.length}`} className="border border-gray-200 p-2 h-24 align-top"></td>);
      }
      weeks.push(<tr key={`week-${weeks.length}`}>{currentWeek}</tr>);
    }

    return weeks;
  };

  // Get rotation status counts
  const getRotationCounts = () => {
    const counts = rotations.reduce((acc, rotation) => {
      acc[rotation.status] = (acc[rotation.status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const rotationCounts = getRotationCounts();

  return (
    <div className="flex-1 bg-gray-100 min-h-screen px-4 py-4 md:px-6 md:py-4">
      {/* Header */}
      <header className="mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-xl md:text-2xl font-bold text-indigo-900">
              Students Management
            </h1>
            <p className="text-sm text-gray-600">
              Manage students, assign clinical rotations, and track progress
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setView('students')}
              className={`px-3 py-2 md:px-4 md:py-2 text-sm ${view === 'students' ? 'bg-indigo-900 text-white' : 'bg-white text-indigo-900 border border-indigo-900'} rounded-md`}
            >
              Students
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={`px-3 py-2 md:px-4 md:py-2 text-sm ${view === 'calendar' ? 'bg-indigo-900 text-white' : 'bg-white text-indigo-900 border border-indigo-900'} rounded-md`}
            >
              Rotation Calendar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4">
        {view === 'students' ? (
          <>
            {/* Left: Students List */}
            <div className="w-full md:w-1/3">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md flex-1"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md w-full sm:w-40"
                >
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Graduated</option>
                  <option>Blocked</option>
                </select>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3 py-2 md:px-4 md:py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 text-sm"
                >
                  Add
                </button>
              </div>
              {/* Students Heading */}
              <div className="bg-indigo-900 text-white p-3 md:p-4 rounded-md mb-4 flex justify-between items-center">
                <div>
                  <span className="text-2xl md:text-3xl font-semibold block">Students</span>
                  <span className="text-sm md:text-lg">{filteredStudents.length} students found</span>
                </div>
                <span className="text-sm">...</span>
              </div>
              <ul className="space-y-4 overflow-y-auto h-64 md:h-96">
                {paginatedStudents.map((student) => (
                  <li
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`flex items-center justify-between p-3 md:p-4 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 ${
                      selectedStudent?.id === student.id ? 'border-indigo-900' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm md:text-base truncate">{student.name}</p>
                        <p className="text-xs md:text-sm text-gray-500 truncate">{student.school} • {student.program}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full ${student.statusColor} whitespace-nowrap`}
                    >
                      {student.status}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 text-sm"
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 text-sm"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Right: Student Details */}
            <div className="w-full md:w-2/3">
              {selectedStudent ? (
                <>
                  {/* Tabs */}
                  <div className="flex space-x-4 md:space-x-6 border-b border-gray-200 mb-4 overflow-x-auto">
                    <button className="pb-2 text-indigo-900 font-medium border-b-2 border-indigo-900 text-sm md:text-base whitespace-nowrap">
                      Student Details
                    </button>
                    <button className="pb-2 text-gray-500 text-sm md:text-base whitespace-nowrap">Clinical Rotations</button>
                    <button className="pb-2 text-gray-500 text-sm md:text-base whitespace-nowrap">Documents</button>
                  </div>

                  {/* Student Header */}
                  <div className="bg-indigo-900 text-white p-3 md:p-4 rounded-t-md flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <h2 className="text-lg md:text-xl font-bold">{selectedStudent.name}</h2>
                      <p className="text-xs md:text-sm">
                        ID: {selectedStudent.id} • {selectedStudent.program} Student
                      </p>
                    </div>
                    <span className="text-sm">...</span>
                  </div>

                  {/* Details Content */}
                  <div className="bg-white p-4 md:p-6 border border-gray-200 rounded-b-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Contact Information</h3>
                        <p className="text-sm">Email: {selectedStudent.email}</p>
                        <p className="text-sm">Phone: {selectedStudent.phone}</p>

                        <h3 className="font-medium text-gray-900 mb-2 mt-4 md:mt-6 text-sm md:text-base">Academic Information</h3>
                        <p className="text-sm">School: {selectedStudent.school}</p>
                        <p className="text-sm">Program: {selectedStudent.program}</p>
                        <p className="text-sm">Expected Graduation: {selectedStudent.expectedGraduation}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Status</h3>
                        <span
                          className={`px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full ${selectedStudent.statusColor}`}
                        >
                          {selectedStudent.status}
                        </span>
                        <p className="text-xs md:text-sm text-gray-500 mt-2">
                          This student is {selectedStudent.status.toLowerCase()}{selectedStudent.status === 'Active' ? ' and in good standing.' : '.'}
                        </p>

                        <h3 className="font-medium text-gray-900 mb-2 mt-4 md:mt-6 text-sm md:text-base">Clinical Rotation Summary</h3>
                        <p className="text-sm">Total Rotations: {selectedStudent.totalRotations}</p>
                        <p className="text-sm">Completed: {selectedStudent.completed}</p>
                        <p className="text-sm">In Progress: {selectedStudent.inProgress}</p>
                        <p className="text-sm">Pending Approval: {selectedStudent.pending}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 md:mt-6 flex flex-wrap gap-2 justify-end">
                      <button
                        onClick={() => {
                          setEditStudent(selectedStudent);
                          setIsEditModalOpen(true);
                        }}
                        className="flex items-center px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm text-indigo-900 bg-indigo-100 rounded-md hover:bg-indigo-200"
                      >
                        <PencilIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        Edit Details
                      </button>
                      <button
                        onClick={() => setIsAssignRotationOpen(true)}
                        className="flex items-center px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm text-white bg-indigo-900 rounded-md hover:bg-indigo-800"
                      >
                        <CalendarDaysIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        Assign Rotation
                      </button>
                      <button
                        onClick={handleBlockUnblockStudent}
                        className={`flex items-center px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm text-white rounded-md hover:opacity-80 ${
                          selectedStudent.status === 'Blocked' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        <NoSymbolIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                        {selectedStudent.status === 'Blocked' ? 'Unblock Student' : 'Block Student'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-64 md:h-full text-gray-500 text-sm md:text-base">
                  Select a student to view details
                </div>
              )}
            </div>
          </>
        ) : (
          /* Calendar View */
          <div className="w-full">
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <h1 className="text-lg md:text-2xl font-bold text-indigo-900 mb-2 sm:mb-0">Clinical Rotation Calendar</h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCalendarView('month')}
                  className={`px-3 py-2 md:px-4 md:py-2 text-sm ${calendarView === 'month' ? 'bg-indigo-900 text-white' : 'bg-white text-indigo-900 border border-indigo-900'} rounded-md`}
                >
                  Month View
                </button>
                <button 
                  onClick={() => setCalendarView('list')}
                  className={`px-3 py-2 md:px-4 md:py-2 text-sm ${calendarView === 'list' ? 'bg-indigo-900 text-white' : 'bg-white text-indigo-900 border border-indigo-900'} rounded-md`}
                >
                  List View
                </button>
              </div>
            </div>
            {/* Rotations Header */}
            <div className="bg-indigo-900 text-white p-3 md:p-4 rounded-md mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-2 sm:mb-0">
                <span className="text-2xl md:text-3xl font-semibold block">Clinical Rotations</span>
                <span className="text-sm md:text-lg">{rotations.length} total rotations</span>
              </div>
              <button onClick={() => setIsAssignRotationOpen(true)} className="flex items-center px-3 py-2 md:px-4 md:py-2 bg-white text-indigo-900 rounded-md text-sm">
                Add Rotation
              </button>
            </div>

            {calendarView === 'month' ? (
              <>
                {/* Month Navigation */}
                <div className="flex justify-between mb-2">
                  <button onClick={handlePreviousMonth} className="px-3 py-2 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-sm">
                    Previous Month
                  </button>
                  <span className="text-sm md:text-lg font-semibold">
                    {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                  </span>
                  <button onClick={handleNextMonth} className="px-3 py-2 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-sm">
                    Next Month
                  </button>
                </div>
                {/* Calendar Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mb-4 min-w-full">
                    <thead>
                      <tr>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <th key={day} className="border border-gray-200 p-2 text-center bg-gray-100 text-sm md:text-base">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>{renderCalendar()}</tbody>
                  </table>
                </div>
              </>
            ) : (
              /* List View */
              <div className="bg-white rounded-md border border-gray-200 mb-4">
                <div className="p-3 md:p-4 border-b border-gray-200">
                  <h3 className="text-base md:text-lg font-semibold text-indigo-900">All Rotations</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {rotations.map((rotation) => (
                    <div 
                      key={rotation.id}
                      onClick={() => {
                        setSelectedRotation(rotation);
                        setIsRotationDetailsOpen(true);
                      }}
                      className="p-3 md:p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="font-medium text-gray-900 text-sm md:text-base">{rotation.studentName}</h4>
                          <p className="text-xs md:text-sm text-gray-500">{rotation.clinicalSite} • {rotation.department}</p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {new Date(rotation.startDate).toLocaleDateString()} - {new Date(rotation.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">Preceptor: {rotation.preceptor}</p>
                        </div>
                        <span className={`px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full text-white ${getRotationStatusColor(rotation.status)} whitespace-nowrap`}>
                          {rotation.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 md:gap-4 mt-4">
              <span className="px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full bg-yellow-500 text-white">
                Pending Approval {rotationCounts['Pending Approval'] || 0} rotation(s)
              </span>
              <span className="px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full bg-blue-500 text-white">
                Scheduled {rotationCounts['Scheduled'] || 0} rotation(s)
              </span>
              <span className="px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full bg-green-500 text-white">
                In Progress {rotationCounts['In Progress'] || 0} rotation(s)
              </span>
              <span className="px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full bg-gray-500 text-white">
                Completed {rotationCounts['Completed'] || 0} rotation(s)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modals - Updated for responsiveness */}
      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-base md:text-lg font-semibold text-indigo-900 mb-2">
              Add New Student
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mb-3">
              Enter the details for the new student. Required fields are marked
              with an asterisk (*).
            </p>

            <form
              onSubmit={handleAddStudent}
              className="grid grid-cols-1 gap-3"
            >
              {/* Student Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  placeholder="Enter student name"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* School */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  School *
                </label>
                <input
                  type="text"
                  value={newStudent.school}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, school: e.target.value })
                  }
                  placeholder="Enter school"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Program */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Program *
                </label>
                <input
                  type="text"
                  value={newStudent.program}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, program: e.target.value })
                  }
                  placeholder="Enter program"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Expected Graduation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expected Graduation
                </label>
                <input
                  type="text"
                  value={newStudent.expectedGraduation}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, expectedGraduation: e.target.value })
                  }
                  placeholder="Enter year"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone *
                </label>
                <input
                  type="text"
                  value={newStudent.phone}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, phone: e.target.value })
                  }
                  placeholder="(xxx) xxx-xxxx"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={newStudent.status}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, status: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Graduated">Graduated</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 md:px-4 md:py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 md:px-4 md:py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 text-sm"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && editStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">
              Edit Student
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Update the details for the student. Required fields are marked with
              an asterisk (*).
            </p>

            <form
              onSubmit={handleEditStudent}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {/* Student Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  value={editStudent.name}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, name: e.target.value })
                  }
                  placeholder="Enter student name"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* School */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  School *
                </label>
                <input
                  type="text"
                  value={editStudent.school}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, school: e.target.value })
                  }
                  placeholder="Enter school"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Program */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Program *
                </label>
                <input
                  type="text"
                  value={editStudent.program}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, program: e.target.value })
                  }
                  placeholder="Enter program"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Expected Graduation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expected Graduation
                </label>
                <input
                  type="text"
                  value={editStudent.expectedGraduation}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, expectedGraduation: e.target.value })
                  }
                  placeholder="Enter year"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  value={editStudent.email}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone *
                </label>
                <input
                  type="text"
                  value={editStudent.phone}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, phone: e.target.value })
                  }
                  placeholder="(xxx) xxx-xxxx"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={editStudent.status}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, status: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Graduated">Graduated</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3 py-2 md:px-4 md:py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 md:px-4 md:py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Clinical Rotation Modal */}
      {isAssignRotationOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-indigo-900">Assign Clinical Rotation</h3>
              <span className="cursor-pointer text-2xl" onClick={() => setIsAssignRotationOpen(false)}>&times;</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">Assign {selectedStudent ? selectedStudent.name : 'a student'} to a clinical rotation. Required fields are marked with an asterisk (*).</p>
            <form onSubmit={handleAssignRotation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Clinical Site *</label>
                <select
                  value={rotationForm.clinicalSite}
                  onChange={(e) => setRotationForm({ ...rotationForm, clinicalSite: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select clinical site</option>
                  <option value="General Hospital">General Hospital</option>
                  <option value="Rehabilitation Center">Rehabilitation Center</option>
                  <option value="Children's Hospital">Children's Hospital</option>
                  <option value="Community Health Center">Community Health Center</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department *</label>
                <select
                  value={rotationForm.department}
                  onChange={(e) => setRotationForm({ ...rotationForm, department: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select department</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Physical Therapy">Physical Therapy</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Surgery">Surgery</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                  <input
                    type="date"
                    value={rotationForm.startDate}
                    onChange={(e) => setRotationForm({ ...rotationForm, startDate: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date *</label>
                  <input
                    type="date"
                    value={rotationForm.endDate}
                    onChange={(e) => setRotationForm({ ...rotationForm, endDate: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preceptor *</label>
                <input
                  type="text"
                  value={rotationForm.preceptor}
                  onChange={(e) => setRotationForm({ ...rotationForm, preceptor: e.target.value })}
                  placeholder="Enter preceptor name"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Required Hours *</label>
                <input
                  type="number"
                  value={rotationForm.requiredHours}
                  onChange={(e) => setRotationForm({ ...rotationForm, requiredHours: e.target.value })}
                  placeholder="Enter required hours"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={rotationForm.notes}
                  onChange={(e) => setRotationForm({ ...rotationForm, notes: e.target.value })}
                  placeholder="Enter any additional notes"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={rotationForm.status}
                  onChange={(e) => setRotationForm({ ...rotationForm, status: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAssignRotationOpen(false)}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
                >
                  Assign Rotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rotation Details Modal */}
      {isRotationDetailsOpen && selectedRotation && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-indigo-900">Rotation Details</h3>
              <span className="cursor-pointer text-2xl" onClick={() => setIsRotationDetailsOpen(false)}>&times;</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Student Information</h4>
                <p><span className="font-medium">Name:</span> {selectedRotation.studentName}</p>
                <p><span className="font-medium">Student ID:</span> {selectedRotation.studentId}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Rotation Details</h4>
                <p><span className="font-medium">Clinical Site:</span> {selectedRotation.clinicalSite}</p>
                <p><span className="font-medium">Department:</span> {selectedRotation.department}</p>
                <p><span className="font-medium">Preceptor:</span> {selectedRotation.preceptor}</p>
                <p><span className="font-medium">Required Hours:</span> {selectedRotation.requiredHours}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Schedule</h4>
                <p><span className="font-medium">Start Date:</span> {new Date(selectedRotation.startDate).toLocaleDateString()}</p>
                <p><span className="font-medium">End Date:</span> {new Date(selectedRotation.endDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Duration:</span> {Math.ceil((new Date(selectedRotation.endDate).getTime() - new Date(selectedRotation.startDate).getTime()) / (1000 * 60 * 60 * 24))} days</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${getRotationStatusColor(selectedRotation.status)}`}>
                  {selectedRotation.status}
                </span>
              </div>
              
              {selectedRotation.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-600">{selectedRotation.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsRotationDetailsOpen(false)}
                className="px-4 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}