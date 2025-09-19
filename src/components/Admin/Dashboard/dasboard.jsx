import React, { useState } from 'react';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Mock data for demonstration
const statusData = [
  { label: 'Accepted', count: 0, color: 'text-blue-500' },
  { label: 'Active', count: 0, color: 'text-green-500' },
  { label: 'Available', count: 0, color: 'text-orange-500' },
  { label: 'Canceled', count: 0, color: 'text-red-500' },
  { label: 'Completed', count: 0, color: 'text-teal-500' },
  { label: 'Paused', count: 0, color: 'text-purple-500' },
  { label: 'Expired', count: 0, color: 'text-gray-500' },
];

const shiftsColumns = [
  'Start Date/Time',
  'Duration', 
  'License Type',
  'Specialization',
  'Rate',
  'Shift ID',
  'Status'
];

const visitsColumns = [
  'Start Date/Time',
  'Patient Name',
  'License Type', 
  'Visit Type',
  'Rate',
  'Visit ID',
  'Status'
];

// Dummy data for testing
const dummyShifts = [
  {
    start: '2025-09-20 08:00',
    duration: '8h',
    license: 'RN',
    specialization: 'ICU',
    rate: '$50/hr',
    id: 'SH12345',
    status: 'Active',
  },
  {
    start: '2025-09-21 16:00',
    duration: '12h',
    license: 'LPN',
    specialization: 'ER',
    rate: '$40/hr',
    id: 'SH12346',
    status: 'Available',
  },
  {
    start: '2025-09-22 09:00',
    duration: '10h',
    license: 'CNA',
    specialization: 'Surgery',
    rate: '$35/hr',
    id: 'SH12347',
    status: 'Completed',
  },
  {
    start: '2025-09-23 07:00',
    duration: '8h',
    license: 'RN',
    specialization: 'Pediatrics',
    rate: '$55/hr',
    id: 'SH12348',
    status: 'Paused',
  },
  {
    start: '2025-09-24 13:00',
    duration: '6h',
    license: 'LPN',
    specialization: 'Oncology',
    rate: '$45/hr',
    id: 'SH12349',
    status: 'Canceled',
  },
  {
    start: '2025-09-25 10:00',
    duration: '8h',
    license: 'RN',
    specialization: 'Cardiology',
    rate: '$60/hr',
    id: 'SH12350',
    status: 'Expired',
  },
  {
    start: '2025-09-26 15:00',
    duration: '12h',
    license: 'CNA',
    specialization: 'Orthopedics',
    rate: '$38/hr',
    id: 'SH12351',
    status: 'Active',
  },
  {
    start: '2025-09-27 08:00',
    duration: '8h',
    license: 'RN',
    specialization: 'ICU',
    rate: '$52/hr',
    id: 'SH12352',
    status: 'Available',
  },
  {
    start: '2025-09-28 16:00',
    duration: '12h',
    license: 'LPN',
    specialization: 'ER',
    rate: '$42/hr',
    id: 'SH12353',
    status: 'Completed',
  },
  {
    start: '2025-09-29 09:00',
    duration: '10h',
    license: 'CNA',
    specialization: 'Surgery',
    rate: '$37/hr',
    id: 'SH12354',
    status: 'Paused',
  },
];

const dummyVisits = [
  {
    start: '2025-09-20 09:00',
    patient: 'John Doe',
    license: 'RN',
    type: 'Home',
    rate: '$70',
    id: 'VS98765',
    status: 'Completed',
  },
  {
    start: '2025-09-22 14:00',
    patient: 'Jane Smith',
    license: 'LPN',
    type: 'Clinic',
    rate: '$60',
    id: 'VS98766',
    status: 'Active',
  },
  {
    start: '2025-09-23 11:00',
    patient: 'Alice Brown',
    license: 'CNA',
    type: 'Home',
    rate: '$65',
    id: 'VS98767',
    status: 'Available',
  },
  {
    start: '2025-09-24 15:00',
    patient: 'Bob White',
    license: 'RN',
    type: 'Clinic',
    rate: '$80',
    id: 'VS98768',
    status: 'Paused',
  },
  {
    start: '2025-09-25 10:00',
    patient: 'Charlie Black',
    license: 'LPN',
    type: 'Home',
    rate: '$75',
    id: 'VS98769',
    status: 'Canceled',
  },
  {
    start: '2025-09-26 13:00',
    patient: 'Diana Green',
    license: 'RN',
    type: 'Clinic',
    rate: '$85',
    id: 'VS98770',
    status: 'Expired',
  },
  {
    start: '2025-09-27 09:00',
    patient: 'Eve Blue',
    license: 'CNA',
    type: 'Home',
    rate: '$68',
    id: 'VS98771',
    status: 'Active',
  },
  {
    start: '2025-09-28 14:00',
    patient: 'Frank Red',
    license: 'LPN',
    type: 'Clinic',
    rate: '$62',
    id: 'VS98772',
    status: 'Available',
  },
  {
    start: '2025-09-29 11:00',
    patient: 'Grace Yellow',
    license: 'RN',
    type: 'Home',
    rate: '$78',
    id: 'VS98773',
    status: 'Completed',
  },
  {
    start: '2025-09-30 15:00',
    patient: 'Henry Purple',
    license: 'CNA',
    type: 'Clinic',
    rate: '$66',
    id: 'VS98774',
    status: 'Paused',
  },
];

function Pagination({ page, pageCount, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded border bg-white text-indigo-600 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      <span className="text-sm font-medium">
        Page {page} of {pageCount}
      </span>
      <button
        className="px-3 py-1 rounded border bg-white text-indigo-600 disabled:opacity-50"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shiftPage, setShiftPage] = useState(1);
  const [visitPage, setVisitPage] = useState(1);
  const pageSize = 5;

  const filterOptions = ['Today', 'This Week', 'This Month', 'Last 30 Days'];

  const shiftPageCount = Math.ceil(dummyShifts.length / pageSize);
  const visitPageCount = Math.ceil(dummyVisits.length / pageSize);

  const pagedShifts = dummyShifts.slice((shiftPage - 1) * pageSize, shiftPage * pageSize);
  const pagedVisits = dummyVisits.slice((visitPage - 1) * pageSize, visitPage * pageSize);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen mobile-container">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 max-w-full">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-900 truncate">Dashboard</h1>    
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            <button className="p-2 text-gray-400 hover:text-indigo-900 transition-colors touch-friendly">
              <BellIcon className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Souheil Jawad</p>
                <p className="text-xs text-indigo-600 cursor-pointer hover:underline">View Profile</p>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Dropdown */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl text-indigo-900 font-semibold">Status</h1>
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs bg-blue-600 font-semibold">i</span>
            </div>
          </div>
          <div className="relative w-full sm:w-auto sm:max-w-xs">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-full sm:min-w-[180px] px-3 sm:px-4 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors touch-friendly no-zoom"
            >
              {selectedFilter}
              <ChevronDownIcon className="h-4 w-4 ml-2 flex-shrink-0" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedFilter(option);
                      setDropdownOpen(false);
                    }}
                    className="block w-full px-3 sm:px-4 py-3 text-left text-sm text-gray-700 hover:bg-teal-300 transition-colors touch-friendly no-zoom"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {statusData.map((status) => (
            <div key={status.label} className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 border border-gray-100 hover:shadow transition-shadow min-h-[90px] flex flex-col justify-center">
              <h3 className="text-xs sm:text-sm font-medium text-indigo-900 mb-2">{status.label}</h3>
              <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${status.color}`}>{status.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Available Shifts Listing */}
      <div className="px-3 sm:px-4 lg:px-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-100">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-indigo-900">Upcoming Available Shifts</h2>
          </div>
          {/* Mobile: Cards, Desktop: Table */}
          <div className="block sm:hidden px-3 py-3">
            {pagedShifts.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-8">No Available shifts</div>
            ) : (
              pagedShifts.map((shift) => (
                <div key={shift.id} className="mb-4 p-4 rounded border border-gray-100 bg-gray-50">
                  <div className="font-semibold text-indigo-900 mb-2">{shift.specialization} ({shift.license})</div>
                  <div className="text-xs text-gray-500 mb-1">Start: {shift.start}</div>
                  <div className="text-xs text-gray-500 mb-1">Duration: {shift.duration}</div>
                  <div className="text-xs text-gray-500 mb-1">Rate: {shift.rate}</div>
                  <div className="text-xs text-gray-500 mb-1">Shift ID: {shift.id}</div>
                  <div className="text-xs font-bold text-indigo-600">Status: {shift.status}</div>
                </div>
              ))
            )}
            <Pagination page={shiftPage} pageCount={shiftPageCount} onPageChange={setShiftPage} />
          </div>
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-[600px] w-full">
              <thead className="bg-gray-50">
                <tr>
                  {shiftsColumns.map((column) => (
                    <th key={column} className="px-2 sm:px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pagedShifts.length === 0 ? (
                  <tr>
                    <td colSpan={shiftsColumns.length} className="px-2 sm:px-3 lg:px-6 py-8 sm:py-12 text-center text-gray-500 text-sm">
                      No Available shifts
                    </td>
                  </tr>
                ) : (
                  pagedShifts.map((shift) => (
                    <tr key={shift.id}>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{shift.start}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{shift.duration}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{shift.license}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{shift.specialization}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{shift.rate}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{shift.id}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{shift.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination page={shiftPage} pageCount={shiftPageCount} onPageChange={setShiftPage} />
          </div>
        </div>
      </div>

      {/* Upcoming Available Visits Listing */}
      <div className="px-3 sm:px-4 lg:px-6 mb-6 sm:mb-8 pb-4">
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-100">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-indigo-900">Upcoming Available Visits</h2>
          </div>
          {/* Mobile: Cards, Desktop: Table */}
          <div className="block sm:hidden px-3 py-3">
            {pagedVisits.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-8">No Available visits</div>
            ) : (
              pagedVisits.map((visit) => (
                <div key={visit.id} className="mb-4 p-4 rounded border border-gray-100 bg-gray-50">
                  <div className="font-semibold text-indigo-900 mb-2">{visit.patient} ({visit.license})</div>
                  <div className="text-xs text-gray-500 mb-1">Start: {visit.start}</div>
                  <div className="text-xs text-gray-500 mb-1">Type: {visit.type}</div>
                  <div className="text-xs text-gray-500 mb-1">Rate: {visit.rate}</div>
                  <div className="text-xs text-gray-500 mb-1">Visit ID: {visit.id}</div>
                  <div className="text-xs font-bold text-indigo-600">Status: {visit.status}</div>
                </div>
              ))
            )}
            <Pagination page={visitPage} pageCount={visitPageCount} onPageChange={setVisitPage} />
          </div>
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-[600px] w-full">
              <thead className="bg-gray-50">
                <tr>
                  {visitsColumns.map((column) => (
                    <th key={column} className="px-2 sm:px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pagedVisits.length === 0 ? (
                  <tr>
                    <td colSpan={visitsColumns.length} className="px-2 sm:px-3 lg:px-6 py-8 sm:py-12 text-center font-semibold text-gray-500 text-sm">
                      No Available visits
                    </td>
                  </tr>
                ) : (
                  pagedVisits.map((visit) => (
                    <tr key={visit.id}>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{visit.start}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{visit.patient}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{visit.license}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{visit.type}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{visit.rate}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{visit.id}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-3">{visit.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination page={visitPage} pageCount={visitPageCount} onPageChange={setVisitPage} />
          </div>
        </div>
      </div>
    </div>
  );
}