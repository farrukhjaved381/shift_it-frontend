import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  MoreHorizontal,
  ChevronDown,
  FileText,
  Calendar,
  Clock,
  Building2,
  MapPin
} from 'lucide-react';

const ClinicalRotationSupervision = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Rotations');
  const [selectedRows, setSelectedRows] = useState([]);

  // Sample student data
  const studentsData = [
    {
      id: 1,
      name: 'Emma Johnson',
      school: 'University of California Nursing School',
      startDate: '2023-09-15',
      endDate: '2023-10-15',
      time: '08:00 AM - 04:00 PM',
      department: 'Nursing',
      unit: 'Emergency Department',
      documents: 3
    },
    {
      id: 2,
      name: 'Michael Smith',
      school: 'Johns Hopkins School of Medicine',
      startDate: '2023-08-01',
      endDate: '2023-09-01',
      time: '07:00 AM - 03:00 PM',
      department: 'Radiology',
      unit: 'Diagnostic Imaging',
      documents: 2
    },
    {
      id: 3,
      name: 'Sophia Williams',
      school: 'NYU Rory Meyers College of Nursing',
      startDate: '2023-07-15',
      endDate: '2023-08-15',
      time: '08:00 AM - 04:00 PM',
      department: 'Pediatrics',
      unit: 'Neonatal Intensive Care',
      documents: 3
    },
    {
      id: 4,
      name: 'James Brown',
      school: 'Duke University School of Medicine',
      startDate: '2023-09-01',
      endDate: '2023-10-01',
      time: '07:00 AM - 03:00 PM',
      department: 'Surgery',
      unit: 'Operating Room',
      documents: 4
    }
  ];

  const filterOptions = ['All Rotations', 'Nursing', 'Radiology', 'Surgery', 'Cardiology', 'Pediatrics'];

  // Filter students based on search and department filter
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All Rotations' || student.department === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getDocumentBadgeColor = (count) => {
    if (count >= 4) return 'bg-green-100 text-green-800 border-green-200';
    if (count >= 3) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (count >= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const handleSelectRow = (studentId) => {
    setSelectedRows(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredStudents.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredStudents.map(student => student.id));
    }
  };

  const handleDownload = (studentId, studentName) => {
    console.log(`Downloading documents for ${studentName}`);
    alert(`Downloading documents for ${studentName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Clinical Rotation Students</h1>
          <p className="text-sm sm:text-base text-gray-600">
            View and manage students participating in clinical rotations
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-md overflow-hidden">
          {/* Card Header */}
          <div className="sticky top-0 bg-white z-10 p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Clinical Rotation Students
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-4">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedFilter(option)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedFilter === option
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {filteredStudents.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(student.id)}
                          onChange={() => handleSelectRow(student.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                        />
                        <div className="w-8 h-8 bg-blue-100 text-blue-700 font-semibold rounded-full flex items-center justify-center mr-3 text-sm">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.school}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDownload(student.id, student.name)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        Start: {formatDate(student.startDate)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        End: {formatDate(student.endDate)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        {student.time}
                      </div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 text-gray-400 mr-1" />
                        {student.department}
                      </div>
                      <div className="flex items-center col-span-2">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        {student.unit}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getDocumentBadgeColor(
                          student.documents
                        )}`}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        {student.documents} Documents
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  No students found
                </h3>
                <p className="text-sm text-gray-500">
                  {searchTerm || selectedFilter !== "All Rotations"
                    ? "No students match your current search or filter criteria."
                    : "No clinical rotation student records yet."}
                </p>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left w-8">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  {[
                    "Student Name",
                    "School",
                    "Start Date",
                    "End Date",
                    "Time",
                    "Department",
                    "Unit",
                    "Documents",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, idx) => (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } ${
                      selectedRows.includes(student.id)
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(student.id)}
                        onChange={() => handleSelectRow(student.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>

                    {/* Student Name */}
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-10 bg-blue-100 text-blue-700 font-semibold rounded-full flex items-center justify-center mr-3">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="font-medium text-gray-900">
                          {student.name}
                        </div>
                      </div>
                    </td>

                    {/* School - Truncated */}
                    <td className="px-4 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                      {student.school}
                    </td>

                    {/* Start Date */}
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        {formatDate(student.startDate)}
                      </div>
                    </td>

                    {/* End Date */}
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        {formatDate(student.endDate)}
                      </div>
                    </td>

                    {/* Time */}
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        {student.time}
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">
                          {student.department}
                        </span>
                      </div>
                    </td>

                    {/* Unit */}
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          {student.unit}
                        </span>
                      </div>
                    </td>

                    {/* Documents */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDocumentBadgeColor(
                          student.documents
                        )}`}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        {student.documents} Documents
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleDownload(student.id, student.name)
                          }
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No students found
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                {searchTerm || selectedFilter !== "All Rotations"
                  ? "No students match your current search or filter criteria."
                  : "No clinical rotation student records yet."}
              </p>
            </div>
          )}

          {/* Footer with Results Count */}
          {filteredStudents.length > 0 && (
            <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {filteredStudents.length} of {studentsData.length} students
                {selectedRows.length > 0 && (
                  <span className="ml-2 text-blue-600">
                    ({selectedRows.length} selected)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalRotationSupervision;