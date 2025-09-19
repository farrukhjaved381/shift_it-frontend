import { useState } from "react";
import { ChevronDownIcon, CalendarIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Expanded mock data for demonstration
const generateScheduleData = () => {
  const data = [];
  const types = ['Shift', 'Visit'];
  const licenseTypes = ['RN', 'LPN', 'CNA', 'MD'];
  const specializations = ['ICU', 'Emergency', 'Pediatrics', 'Cardiology', 'Oncology', 'Orthopedics', 'Neurology', 'General'];
  const visitTypes = ['Home Care', 'Follow-up', 'Assessment', 'Treatment', 'Consultation'];
  const patientNames = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Lisa Davis', 'Tom Anderson', 'Mary Garcia', 'Chris Martinez', 'Emily Taylor'];
  const statuses = [
    { status: 'Confirmed', color: 'text-green-500' },
    { status: 'Pending', color: 'text-orange-500' },
    { status: 'Cancelled', color: 'text-red-500' },
    { status: 'Completed', color: 'text-blue-500' }
  ];

  for (let i = 1; i <= 250; i++) { // Increased to 250 for better pagination testing
    const type = types[Math.floor(Math.random() * types.length)];
    const statusObj = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generate dates within the next 6 months for more variety
    const baseDate = new Date();
    const randomDays = Math.floor(Math.random() * 180);
    const eventDate = new Date(baseDate);
    eventDate.setDate(baseDate.getDate() + randomDays);

    const item = {
      id: type === 'Shift' ? `S${String(i).padStart(3, '0')}` : `V${String(i).padStart(3, '0')}`,
      type,
      date: eventDate.toISOString().split('T')[0],
      time: `${String(8 + Math.floor(Math.random() * 8)).padStart(2, '0')}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'} - ${String(9 + Math.floor(Math.random() * 8)).padStart(2, '0')}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      status: statusObj.status,
      statusColor: statusObj.color,
    };

    if (type === 'Shift') {
      item.licenseType = licenseTypes[Math.floor(Math.random() * licenseTypes.length)];
      item.specialization = specializations[Math.floor(Math.random() * specializations.length)];
      item.rate = `$${(35 + Math.floor(Math.random() * 30))}/hr`;
    } else {
      item.patientName = patientNames[Math.floor(Math.random() * patientNames.length)];
      item.licenseType = licenseTypes[Math.floor(Math.random() * licenseTypes.length)];
      item.visitType = visitTypes[Math.floor(Math.random() * visitTypes.length)];
      item.rate = `$${(50 + Math.floor(Math.random() * 100))}/visit`;
    }

    data.push(item);
  }

  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const scheduleData = generateScheduleData();
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Schedule() {
  const [selectedFilter, setSelectedFilter] = useState('All'); // Changed default to 'All' to see more events
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(scheduleData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Made it changeable
  const [newEvent, setNewEvent] = useState({
    type: 'Shift',
    date: '',
    time: '',
    licenseType: '',
    specialization: '',
    patientName: '',
    visitType: '',
    rate: '',
    status: 'Pending',
    statusColor: 'text-orange-500',
  });

  const filterOptions = ['Today', 'This Week', 'This Month', 'Next 30 Days', 'All'];
  const itemsPerPageOptions = [5, 10, 20, 50];

  // Generate calendar days for the current month
  const getCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // Filter schedule data based on selected filter
  const filteredData = events.filter((item) => {
    const itemDate = new Date(item.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedFilter === 'Today') {
      return itemDate.toDateString() === today.toDateString();
    } else if (selectedFilter === 'This Week') {
      const currentDate = new Date();
      const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
      const weekEnd = new Date(currentDate.setDate(currentDate.getDate() + 6));
      weekStart.setHours(0, 0, 0, 0);
      weekEnd.setHours(23, 59, 59, 999);
      return itemDate >= weekStart && itemDate <= weekEnd;
    } else if (selectedFilter === 'This Month') {
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    } else if (selectedFilter === 'Next 30 Days') {
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 30);
      return itemDate >= today && itemDate <= endDate;
    }
    return true; // 'All' filter
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filter or items per page changes
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    setDropdownOpen(false);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddEvent = () => {
    const id = `E${events.length + 1}`;
    setEvents([...events, { ...newEvent, id }]);
    setNewEvent({
      type: 'Shift',
      date: '',
      time: '',
      licenseType: '',
      specialization: '',
      patientName: '',
      visitType: '',
      rate: '',
      status: 'Pending',
      statusColor: 'text-orange-500',
    });
    setShowAddModal(false);
  };

  // Enhanced Pagination component
  const Pagination = () => {
    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pageNumbers.push(i);
          }
          pageNumbers.push('...');
          pageNumbers.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pageNumbers.push(1);
          pageNumbers.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          pageNumbers.push(1);
          pageNumbers.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pageNumbers.push(i);
          }
          pageNumbers.push('...');
          pageNumbers.push(totalPages);
        }
      }
      
      return pageNumbers;
    };

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="text-sm text-gray-700 self-center">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, filteredData.length)}</span> of{' '}
              <span className="font-medium">{filteredData.length}</span> results
            </p>
            {/* Items per page selector */}
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">per page</span>
            </div>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
                  disabled={pageNumber === '...'}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    pageNumber === currentPage
                      ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : pageNumber === '...'
                      ? 'text-gray-700 ring-1 ring-inset ring-gray-300 cursor-default'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-900">Schedule</h1>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Souheil Jawad</p>
              <p className="text-xs text-indigo-600 cursor-pointer hover:underline">View Profile</p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
            <div className="space-y-4">
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Shift">Shift</option>
                <option value="Visit">Visit</option>
              </select>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Time (e.g., 08:00 AM - 04:00 PM)"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {newEvent.type === 'Shift' ? (
                <>
                  <input
                    type="text"
                    placeholder="License Type"
                    value={newEvent.licenseType}
                    onChange={(e) => setNewEvent({ ...newEvent, licenseType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Specialization"
                    value={newEvent.specialization}
                    onChange={(e) => setNewEvent({ ...newEvent, specialization: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Patient Name"
                    value={newEvent.patientName}
                    onChange={(e) => setNewEvent({ ...newEvent, patientName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Visit Type"
                    value={newEvent.visitType}
                    onChange={(e) => setNewEvent({ ...newEvent, visitType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </>
              )}
              <input
                type="text"
                placeholder="Rate"
                value={newEvent.rate}
                onChange={(e) => setNewEvent({ ...newEvent, rate: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Calendar Controls */}
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl text-indigo-900 font-semibold">Calendar</h2>
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs bg-blue-600 font-semibold">i</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 text-sm"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Event
            </button>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full sm:w-40 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition duration-200"
              >
                <span className="truncate">{selectedFilter}</span>
                <ChevronDownIcon className="h-4 w-4 ml-2 flex-shrink-0" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-full sm:w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterChange(option)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 transition duration-150"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6 mb-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
              className="text-indigo-600 hover:text-indigo-900 font-medium transition duration-200 text-sm sm:text-base"
            >
              Previous
            </button>
            <h3 className="text-base sm:text-lg font-semibold text-indigo-900 text-center">
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
              className="text-indigo-600 hover:text-indigo-900 font-medium transition duration-200 text-sm sm:text-base"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {getCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`p-1 sm:p-2 text-center border rounded-md transition duration-200 min-h-[60px] sm:min-h-[80px] ${
                  day
                    ? new Date(day).toDateString() === new Date().toDateString()
                      ? 'bg-indigo-100 text-indigo-900 shadow-inner'
                      : 'bg-white hover:bg-gray-50 hover:shadow-sm'
                    : 'bg-gray-50'
                }`}
              >
                {day ? (
                  <>
                    <div className="font-semibold text-xs sm:text-sm">{day.getDate()}</div>
                    {events
                      .filter((item) => new Date(item.date).toDateString() === day.toDateString())
                      .slice(0, 2)
                      .map((item, idx) => (
                        <div
                          key={item.id}
                          className="mt-1 text-xs text-white bg-indigo-500 rounded px-1 py-0.5 shadow-sm truncate"
                          title={item.type === 'Shift' ? `${item.time} (${item.specialization})` : item.patientName}
                        >
                          {item.type === 'Shift' ? item.specialization : item.patientName}
                        </div>
                      ))}
                    {events.filter((item) => new Date(item.date).toDateString() === day.toDateString()).length > 2 && (
                      <div className="mt-1 text-xs text-gray-600">
                        +{events.filter((item) => new Date(item.date).toDateString() === day.toDateString()).length - 2} more
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-indigo-900">Scheduled Events</h2>
              <div className="text-sm text-gray-600">
                {filteredData.length} {filteredData.length === 1 ? 'event' : 'events'}
              </div>
            </div>
          </div>
          
          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {currentData.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {currentData.map((item) => (
                  <div key={item.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{item.type}</p>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <span className={`text-sm font-medium ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Time:</span> {item.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Details:</span>{' '}
                        {item.type === 'Shift' ? `${item.licenseType} - ${item.specialization}` : item.patientName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Rate:</span> {item.rate}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">ID:</span> {item.id}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No scheduled events
              </div>
            )}
            <Pagination />
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Date', 'Time', 'Type', 'Details', 'Rate', 'ID', 'Status'].map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.type === 'Shift' ? `${item.licenseType} - ${item.specialization}` : item.patientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.rate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${item.statusColor} font-medium`}>
                        {item.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No scheduled events
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}