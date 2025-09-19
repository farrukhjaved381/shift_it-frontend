import React, { useState } from 'react';
import { Search, Users, GraduationCap, Award, Eye, Plus, ChevronDown } from 'lucide-react';

// Instructors Management Component
const PAGE_SIZE = 5;

const InstructorsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('active');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [onLeavePage, setOnLeavePage] = useState(1);

  // Mock data
  const instructors = [
    {
      id: "INST001",
      name: "Dr. Sarah Mitchell",
      email: "sarah.mitchell@usc.edu",
      phone: "(213) 555-0201",
      department: "Medical-Surgical Nursing",
      position: "Clinical Instructor",
      yearsExperience: 15,
      specialties: ["Critical Care", "Emergency Nursing", "Trauma Care"],
      status: "Active",
      studentsSupervised: 18,
      totalRotations: 2,
      schedule: {
        monday: { startTime: "7:00 AM", endTime: "3:00 PM", rotation: "ICU Clinical" },
        tuesday: { startTime: "7:00 AM", endTime: "3:00 PM", rotation: "ICU Clinical" },
        wednesday: { startTime: "7:00 AM", endTime: "3:00 PM", rotation: "ICU Clinical" },
        thursday: { startTime: "2:00 PM", endTime: "10:00 PM", rotation: "Emergency Dept" },
        friday: { startTime: "2:00 PM", endTime: "10:00 PM", rotation: "Emergency Dept" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    {
      id: "INST002",
      name: "Prof. Michael Rodriguez",
      email: "michael.rodriguez@usc.edu",
      phone: "(213) 555-0202",
      department: "Pediatric Nursing",
      position: "Associate Professor",
      yearsExperience: 12,
      specialties: ["Pediatric ICU", "Neonatal Care", "Family-Centered Care"],
      status: "Active",
      studentsSupervised: 24,
      totalRotations: 2,
      schedule: {
        monday: { startTime: "8:00 AM", endTime: "4:00 PM", rotation: "Pediatric ICU" },
        tuesday: { startTime: "8:00 AM", endTime: "4:00 PM", rotation: "Pediatric ICU" },
        wednesday: { startTime: "8:00 AM", endTime: "4:00 PM", rotation: "Pediatric ICU" },
        thursday: { startTime: "8:00 AM", endTime: "4:00 PM", rotation: "Pediatric ICU" },
        friday: { startTime: "6:00 AM", endTime: "2:00 PM", rotation: "NICU" },
        saturday: { startTime: "6:00 AM", endTime: "2:00 PM", rotation: "NICU" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    {
      id: "INST003",
      name: "Dr. Jennifer Chen",
      email: "jennifer.chen@usc.edu",
      phone: "(213) 555-0203",
      department: "Mental Health Nursing",
      position: "Clinical Instructor",
      yearsExperience: 10,
      specialties: ["Psychiatric Nursing", "Crisis Intervention", "Substance Abuse"],
      status: "Active",
      studentsSupervised: 12,
      totalRotations: 1,
      schedule: {
        monday: { startTime: "9:00 AM", endTime: "5:00 PM", rotation: "Psychiatric Unit" },
        tuesday: { startTime: "9:00 AM", endTime: "5:00 PM", rotation: "Psychiatric Unit" },
        wednesday: { startTime: "9:00 AM", endTime: "5:00 PM", rotation: "Psychiatric Unit" },
        thursday: { startTime: "9:00 AM", endTime: "5:00 PM", rotation: "Psychiatric Unit" },
        friday: { startTime: "9:00 AM", endTime: "5:00 PM", rotation: "Psychiatric Unit" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    {
      id: "INST004",
      name: "Prof. David Thompson",
      email: "david.thompson@usc.edu",
      phone: "(213) 555-0204",
      department: "Community Health",
      position: "Assistant Professor",
      yearsExperience: 8,
      specialties: ["Public Health", "Community Outreach", "Health Promotion"],
      status: "On Leave",
      studentsSupervised: 0,
      totalRotations: 0,
      schedule: {
        monday: { startTime: "Open", endTime: "", rotation: "" },
        tuesday: { startTime: "Open", endTime: "", rotation: "" },
        wednesday: { startTime: "Open", endTime: "", rotation: "" },
        thursday: { startTime: "Open", endTime: "", rotation: "" },
        friday: { startTime: "Open", endTime: "", rotation: "" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    // Additional mock instructors for pagination testing
    {
      id: "INST005",
      name: "Dr. Emily Carter",
      email: "emily.carter@usc.edu",
      phone: "(213) 555-0205",
      department: "Maternal-Child Health",
      position: "Clinical Instructor",
      yearsExperience: 9,
      specialties: ["Obstetrics", "Neonatal Care"],
      status: "Active",
      studentsSupervised: 20,
      totalRotations: 3,
      schedule: {
        monday: { startTime: "7:00 AM", endTime: "3:00 PM", rotation: "OB Ward" },
        tuesday: { startTime: "7:00 AM", endTime: "3:00 PM", rotation: "OB Ward" },
        wednesday: { startTime: "7:00 AM", endTime: "3:00 PM", rotation: "OB Ward" },
        thursday: { startTime: "Open", endTime: "", rotation: "" },
        friday: { startTime: "Open", endTime: "", rotation: "" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    {
      id: "INST006",
      name: "Dr. John Lee",
      email: "john.lee@usc.edu",
      phone: "(213) 555-0206",
      department: "Medical-Surgical Nursing",
      position: "Clinical Instructor",
      yearsExperience: 11,
      specialties: ["Surgical Nursing", "Post-op Care"],
      status: "Active",
      studentsSupervised: 15,
      totalRotations: 2,
      schedule: {
        monday: { startTime: "8:00 AM", endTime: "4:00 PM", rotation: "Surgical Ward" },
        tuesday: { startTime: "8:00 AM", endTime: "4:00 PM", rotation: "Surgical Ward" },
        wednesday: { startTime: "Open", endTime: "", rotation: "" },
        thursday: { startTime: "Open", endTime: "", rotation: "" },
        friday: { startTime: "Open", endTime: "", rotation: "" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    {
      id: "INST007",
      name: "Prof. Linda Park",
      email: "linda.park@usc.edu",
      phone: "(213) 555-0207",
      department: "Pediatric Nursing",
      position: "Associate Professor",
      yearsExperience: 13,
      specialties: ["Pediatric Oncology", "Child Development"],
      status: "Active",
      studentsSupervised: 22,
      totalRotations: 2,
      schedule: {
        monday: { startTime: "9:00 AM", endTime: "5:00 PM", rotation: "Pediatric Oncology" },
        tuesday: { startTime: "9:00 AM", endTime: "5:00 PM", rotation: "Pediatric Oncology" },
        wednesday: { startTime: "Open", endTime: "", rotation: "" },
        thursday: { startTime: "Open", endTime: "", rotation: "" },
        friday: { startTime: "Open", endTime: "", rotation: "" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    {
      id: "INST008",
      name: "Dr. Mark Evans",
      email: "mark.evans@usc.edu",
      phone: "(213) 555-0208",
      department: "Mental Health Nursing",
      position: "Clinical Instructor",
      yearsExperience: 7,
      specialties: ["Addiction Counseling", "Group Therapy"],
      status: "On Leave",
      studentsSupervised: 0,
      totalRotations: 0,
      schedule: {
        monday: { startTime: "Open", endTime: "", rotation: "" },
        tuesday: { startTime: "Open", endTime: "", rotation: "" },
        wednesday: { startTime: "Open", endTime: "", rotation: "" },
        thursday: { startTime: "Open", endTime: "", rotation: "" },
        friday: { startTime: "Open", endTime: "", rotation: "" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    {
      id: "INST009",
      name: "Prof. Alice Kim",
      email: "alice.kim@usc.edu",
      phone: "(213) 555-0209",
      department: "Community Health",
      position: "Assistant Professor",
      yearsExperience: 6,
      specialties: ["Health Education", "Community Assessment"],
      status: "On Leave",
      studentsSupervised: 0,
      totalRotations: 0,
      schedule: {
        monday: { startTime: "Open", endTime: "", rotation: "" },
        tuesday: { startTime: "Open", endTime: "", rotation: "" },
        wednesday: { startTime: "Open", endTime: "", rotation: "" },
        thursday: { startTime: "Open", endTime: "", rotation: "" },
        friday: { startTime: "Open", endTime: "", rotation: "" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
    {
      id: "INST010",
      name: "Dr. Robert Brown",
      email: "robert.brown@usc.edu",
      phone: "(213) 555-0210",
      department: "Medical-Surgical Nursing",
      position: "Clinical Instructor",
      yearsExperience: 14,
      specialties: ["Cardiac Care", "General Surgery"],
      status: "Active",
      studentsSupervised: 17,
      totalRotations: 2,
      schedule: {
        monday: { startTime: "7:00 AM", endTime: "3:00 PM", rotation: "Cardiac Ward" },
        tuesday: { startTime: "7:00 AM", endTime: "3:00 PM", rotation: "Cardiac Ward" },
        wednesday: { startTime: "Open", endTime: "", rotation: "" },
        thursday: { startTime: "Open", endTime: "", rotation: "" },
        friday: { startTime: "Open", endTime: "", rotation: "" },
        saturday: { startTime: "Open", endTime: "", rotation: "" },
        sunday: { startTime: "Open", endTime: "", rotation: "" },
      },
    },
  ];

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || instructor.department.toLowerCase().includes(filterDepartment.toLowerCase());
    const matchesStatus = filterStatus === "all" || instructor.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const renderScheduleCards = (schedule) => {
    const days = [
      { key: "sunday", label: "Sun" },
      { key: "monday", label: "Mon" },
      { key: "tuesday", label: "Tue" },
      { key: "wednesday", label: "Wed" },
      { key: "thursday", label: "Thu" },
      { key: "friday", label: "Fri" },
      { key: "saturday", label: "Sat" },
    ];

    return (
      <div className="flex gap-2 overflow-x-auto">
        {days.map((day) => (
          <div
            key={day.key}
            className={`min-w-[70px] text-xs p-2 rounded-lg border border-gray-300 text-center ${
              schedule[day.key].startTime === "Open"
                ? "bg-gray-100 text-gray-600"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            <div className="font-medium mb-1">{day.label}</div>
            {schedule[day.key].startTime === "Open" ? (
              <div className="text-[10px]">Open</div>
            ) : (
              <>
                <div className="text-[10px] font-medium">{schedule[day.key].rotation}</div>
                <div className="text-[10px]">{schedule[day.key].startTime}</div>
                <div className="text-[10px]">- {schedule[day.key].endTime}</div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const activeInstructors = filteredInstructors.filter(i => i.status === "Active");
  const onLeaveInstructors = filteredInstructors.filter(i => i.status === "On Leave");

  // Pagination logic
  const activeTotalPages = Math.ceil(activeInstructors.length / PAGE_SIZE) || 1;
  const onLeaveTotalPages = Math.ceil(onLeaveInstructors.length / PAGE_SIZE) || 1;

  const paginatedActive = activeInstructors.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE);
  const paginatedOnLeave = onLeaveInstructors.slice((onLeavePage - 1) * PAGE_SIZE, onLeavePage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-3">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Instructors Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200 flex items-center gap-2"
          >
            <Plus />
            Add Instructor
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Instructors</h3>
              <p className="text-2xl font-bold text-blue-600">{instructors.length}</p>
            </div>
            <Users />
          </div>
          <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active Instructors</h3>
              <p className="text-2xl font-bold text-green-600">
                {instructors.filter((i) => i.status === "Active").length}
              </p>
            </div>
            <GraduationCap />
          </div>
          <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Students Supervised</h3>
              <p className="text-2xl font-bold text-purple-600">
                {instructors.reduce((sum, i) => sum + i.studentsSupervised, 0)}
              </p>
            </div>
            <Users />
          </div>
          <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Rotations</h3>
              <p className="text-2xl font-bold text-orange-600">
                {instructors.reduce((sum, i) => sum + i.totalRotations, 0)}
              </p>
            </div>
            <Award />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-300 p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or instructor ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                <option value="medical-surgical">Medical-Surgical</option>
                <option value="pediatric">Pediatric</option>
                <option value="mental-health">Mental Health</option>
                <option value="community">Community Health</option>
                <option value="maternal">Maternal-Child</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on leave">On Leave</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Instructors Table */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-300">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Instructors ({filteredInstructors.length})
            </h2>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-300">
            <div className="flex">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 sm:px-6 py-2 sm:py-3 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'active'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Active Instructors
              </button>
              <button
                onClick={() => setActiveTab('on-leave')}
                className={`px-4 sm:px-6 py-2 sm:py-3 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'on-leave'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                On Leave
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            {activeTab === 'active' && (
              <>
                <table className="min-w-[600px] w-full">
                  <thead className="bg-gray-50 border-b border-gray-300">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructor ↑
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rotations
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    {paginatedActive.map((instructor) => (
                      <tr key={instructor.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium text-gray-900">{instructor.name}</div>
                            <div className="text-sm text-gray-500">{instructor.department}</div>
                            <div className="text-sm text-gray-500">{instructor.email}</div>
                            <div className="text-sm text-gray-500">{instructor.phone}</div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                          <div className="text-lg font-bold text-blue-600">{instructor.totalRotations}</div>
                          <div className="text-xs text-gray-500">rotations</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                          {instructor.studentsSupervised}
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          {renderScheduleCards(instructor.schedule)}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-150">
                            <Eye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-600">
                    Page {activePage} of {activeTotalPages}
                  </span>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                      disabled={activePage === 1}
                      onClick={() => setActivePage(activePage - 1)}
                    >
                      Prev
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                      disabled={activePage === activeTotalPages}
                      onClick={() => setActivePage(activePage + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'on-leave' && (
              <>
                <table className="min-w-[400px] w-full">
                  <thead className="bg-gray-50 border-b border-gray-300">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructor
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Leave Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    {paginatedOnLeave.map((instructor) => (
                      <tr key={instructor.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium text-gray-900">{instructor.name}</div>
                            <div className="text-sm text-gray-500">{instructor.email}</div>
                            <div className="text-sm text-gray-500">{instructor.phone}</div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                          {instructor.department}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                            On Leave
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-150">
                            <Eye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-600">
                    Page {onLeavePage} of {onLeaveTotalPages}
                  </span>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                      disabled={onLeavePage === 1}
                      onClick={() => setOnLeavePage(onLeavePage - 1)}
                    >
                      Prev
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                      disabled={onLeavePage === onLeaveTotalPages}
                      onClick={() => setOnLeavePage(onLeavePage + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Add Instructor Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 max-w-2xl w-full mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold">Add New Instructor</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select department</option>
                      <option value="medical-surgical">Medical-Surgical Nursing</option>
                      <option value="pediatric">Pediatric Nursing</option>
                      <option value="mental-health">Mental Health Nursing</option>
                      <option value="community">Community Health</option>
                      <option value="maternal">Maternal-Child Health</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialties
                  </label>
                  <input
                    type="text"
                    placeholder="Enter specialties (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  Add Instructor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorsManagement;