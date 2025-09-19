import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, CreditCardIcon, BanknotesIcon, DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// Mock data for payments
const initialPayments = [
  {
    id: 'PAY-001',
    paymentNumber: 'PAY-2025-001',
    recipientName: 'Dr. Sarah Wilson',
    recipientType: 'Staff',
    amount: 1200.00,
    status: 'Completed',
    statusColor: 'bg-green-500 text-white',
    paymentDate: '2025-08-25',
    method: 'Bank Transfer',
    description: 'Preceptor fee for August rotations',
    invoiceRef: 'INV-2025-001',
    category: 'Preceptor Fees',
  },
  {
    id: 'PAY-002',
    paymentNumber: 'PAY-2025-002',
    recipientName: 'Memorial Hospital',
    recipientType: 'Clinical Site',
    amount: 800.00,
    status: 'Pending',
    statusColor: 'bg-yellow-500 text-white',
    paymentDate: '2025-09-03',
    method: 'Check',
    description: 'Site partnership quarterly payment',
    invoiceRef: null,
    category: 'Site Payments',
  },
  {
    id: 'PAY-003',
    paymentNumber: 'PAY-2025-003',
    recipientName: 'Alex Johnson',
    recipientType: 'Student',
    amount: 150.00,
    status: 'Failed',
    statusColor: 'bg-red-500 text-white',
    paymentDate: '2025-09-01',
    method: 'Direct Deposit',
    description: 'Student stipend payment',
    invoiceRef: null,
    category: 'Student Payments',
  },
  {
    id: 'PAY-004',
    paymentNumber: 'PAY-2025-004',
    recipientName: 'University of Health Sciences',
    recipientType: 'School',
    amount: 2400.00,
    status: 'Processing',
    statusColor: 'bg-blue-500 text-white',
    paymentDate: '2025-09-03',
    method: 'Wire Transfer',
    description: 'Revenue share for September',
    invoiceRef: 'INV-2025-003',
    category: 'Revenue Share',
  },
];

export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [payments, setPayments] = useState(initialPayments);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    recipientName: '',
    recipientType: 'Staff',
    amount: '',
    method: 'Bank Transfer',
    description: '',
    category: 'Preceptor Fees',
    paymentDate: new Date().toISOString().split('T')[0],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'paymentDate', direction: 'desc' });
  const [showDetails, setShowDetails] = useState(false);
  const itemsPerPage = 10;

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort payments
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || payment.status === statusFilter;
    const matchesCategory = categoryFilter === 'All Categories' || payment.category === categoryFilter;
    const matchesDate = (!dateRange.start || payment.paymentDate >= dateRange.start) &&
                       (!dateRange.end || payment.paymentDate <= dateRange.end);
    return matchesSearch && matchesStatus && matchesCategory && matchesDate;
  }).sort((a, b) => {
    if (sortConfig.key === 'amount') {
      return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortConfig.key === 'paymentDate') {
      return sortConfig.direction === 'asc'
        ? new Date(a.paymentDate) - new Date(b.paymentDate)
        : new Date(b.paymentDate) - new Date(a.paymentDate);
    }
    return 0;
  });

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirst, indexOfLast);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPayments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Reset page on filter or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, dateRange, sortConfig]);

  // Calculate totals
  const totals = {
    completed: payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0),
    processing: payments.filter(p => p.status === 'Processing').reduce((sum, p) => sum + p.amount, 0),
    failed: payments.filter(p => p.status === 'Failed').reduce((sum, p) => sum + p.amount, 0),
  };

  // Handle create payment
  const handleCreatePayment = (e) => {
    e.preventDefault();
    
    const payment = {
      id: `PAY-${Date.now()}`,
      paymentNumber: `PAY-2025-${String(payments.length + 1).padStart(3, '0')}`,
      recipientName: newPayment.recipientName,
      recipientType: newPayment.recipientType,
      amount: parseFloat(newPayment.amount),
      status: 'Pending',
      statusColor: 'bg-yellow-500 text-white',
      paymentDate: newPayment.paymentDate,
      method: newPayment.method,
      description: newPayment.description,
      invoiceRef: null,
      category: newPayment.category,
    };
    
    setPayments([payment, ...payments]);
    setIsCreateModalOpen(false);
    setNewPayment({
      recipientName: '',
      recipientType: 'Staff',
      amount: '',
      method: 'Bank Transfer',
      description: '',
      category: 'Preceptor Fees',
      paymentDate: new Date().toISOString().split('T')[0],
    });
    alert('Payment created successfully!');
  };

  // Handle payment status update
  const handleStatusUpdate = (paymentId, newStatus) => {
    const statusColors = {
      'Completed': 'bg-green-500 text-white',
      'Failed': 'bg-red-500 text-white',
      'Pending': 'bg-yellow-500 text-white',
      'Processing': 'bg-blue-500 text-white',
      'Cancelled': 'bg-gray-500 text-white',
    };

    setPayments(prev => 
      prev.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: newStatus, statusColor: statusColors[newStatus] }
          : payment
      )
    );

    if (selectedPayment?.id === paymentId) {
      setSelectedPayment(prev => ({ 
        ...prev, 
        status: newStatus, 
        statusColor: statusColors[newStatus]
      }));
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle CSV export
  const handleExportCSV = () => {
    const headers = ['Payment #', 'Recipient', 'Type', 'Amount', 'Status', 'Date', 'Method', 'Category', 'Description'];
    const rows = filteredPayments.map(p => [
      p.paymentNumber,
      p.recipientName,
      p.recipientType,
      p.amount.toFixed(2),
      p.status,
      p.paymentDate,
      p.method,
      p.category,
      p.description.replace(/,/g, ';'), // Avoid CSV delimiter issues
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payments_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Bank Transfer':
      case 'Wire Transfer':
      case 'Direct Deposit':
        return <BanknotesIcon className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'Check':
        return <DocumentTextIcon className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'Credit Card':
        return <CreditCardIcon className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <BanknotesIcon className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-4 sm:py-6 bg-white shadow-sm rounded-t-lg sm:rounded-none">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-indigo-900">Payment Management</h1>
              <p className="text-xs sm:text-sm text-gray-600">Manage payments to preceptors, clinical sites, schools, and students</p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <button
                onClick={handleExportCSV}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm transition-transform hover:scale-105 touch-manipulation"
                aria-label="Export payments as CSV"
              >
                <ArrowDownTrayIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Export CSV
              </button>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm transition-transform hover:scale-105 touch-manipulation"
                aria-label="Create new payment"
              >
                <BanknotesIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                New Payment
              </button>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="py-4 sm:py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 mb-6">
            {[
              { title: 'Completed', amount: totals.completed, color: 'text-green-600' },
              { title: 'Pending', amount: totals.pending, color: 'text-yellow-600' },
              { title: 'Processing', amount: totals.processing, color: 'text-blue-600' },
              { title: 'Failed', amount: totals.failed, color: 'text-red-600' },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-sm font-medium text-indigo-900 mb-2">{card.title}</h3>
                <p className={`text-2xl sm:text-3xl font-bold ${card.color}`}>${card.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
            {/* Left: Payments List */}
            <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Filters */}
              <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="space-y-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      aria-label="Search payments"
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="Filter by status"
                    >
                      <option>All Statuses</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Failed</option>
                    </select>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="Filter by category"
                    >
                      <option>All Categories</option>
                      <option>Preceptor Fees</option>
                      <option>Site Payments</option>
                      <option>Student Payments</option>
                      <option>Revenue Share</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="Start date filter"
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="End date filter"
                    />
                  </div>
                </div>
              </div>

              {/* Payments Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700">
                  <thead className="bg-indigo-50 text-indigo-900">
                    <tr>
                      <th
                        className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-indigo-100 transition-colors"
                        onClick={() => handleSort('paymentDate')}
                        aria-sort={sortConfig.key === 'paymentDate' ? sortConfig.direction : 'none'}
                      >
                        Date {sortConfig.key === 'paymentDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">Payment #</th>
                      <th className="px-4 py-3 text-left font-semibold">Recipient</th>
                      <th
                        className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-indigo-100 transition-colors"
                        onClick={() => handleSort('amount')}
                        aria-sort={sortConfig.key === 'amount' ? sortConfig.direction : 'none'}
                      >
                        Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                      <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        onClick={() => {
                          setSelectedPayment(payment);
                          if (isMobile) setShowDetails(true);
                        }}
                        className={`border-b border-gray-200 hover:bg-indigo-50 transition-colors cursor-pointer touch-manipulation ${
                          selectedPayment?.id === payment.id ? 'bg-indigo-50' : ''
                        }`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedPayment(payment)}
                      >
                        <td className="px-4 py-3 text-xs sm:text-sm">{payment.paymentDate}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm font-medium">{payment.paymentNumber}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm">{payment.recipientName}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm font-bold text-indigo-900">${payment.amount.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${payment.statusColor}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">
                          <div className="flex items-center gap-1">
                            {getMethodIcon(payment.method)}
                            <span>{payment.method}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pageNumbers.length > 1 && (
                <div className="flex justify-center gap-2 p-4 border-t border-gray-200">
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`px-3 py-1 text-sm rounded-md transition-transform hover:scale-105 ${
                        currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } touch-manipulation`}
                      aria-label={`Go to page ${number}`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Payment Details (Desktop) / Modal (Mobile) */}
            {selectedPayment && (
              <div className={`lg:flex-1 lg:bg-white lg:rounded-lg lg:border lg:border-gray-200 lg:shadow-sm lg:h-[calc(100%-180px)] sm:h-[calc(100%-200px)] ${
                isMobile ? 'fixed inset-0 bg-white z-50 overflow-y-auto' : ''
              }`}>
                <div className={`p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center ${isMobile ? 'sticky top-0 bg-white z-10' : ''}`}>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-indigo-900">{selectedPayment.paymentNumber}</h2>
                    <p className="text-sm text-gray-600">{selectedPayment.recipientName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getMethodIcon(selectedPayment.method)}
                    <span className="text-sm hidden sm:inline">{selectedPayment.method}</span>
                    {isMobile && (
                      <button
                        onClick={() => setShowDetails(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 touch-manipulation"
                        aria-label="Close payment details"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6 max-h-[calc(100%-80px)] overflow-y-auto">
                  <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Payment Information</h3>
                      <p className="text-sm"><span className="font-medium">Payment #:</span> {selectedPayment.paymentNumber}</p>
                      <p className="text-sm"><span className="font-medium">Payment Date:</span> {selectedPayment.paymentDate}</p>
                      <p className="text-sm"><span className="font-medium">Method:</span> {selectedPayment.method}</p>
                      <p className="text-sm"><span className="font-medium">Category:</span> {selectedPayment.category}</p>
                      {selectedPayment.invoiceRef && (
                        <p className="text-sm"><span className="font-medium">Invoice Ref:</span> {selectedPayment.invoiceRef}</p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Recipient Information</h3>
                      <p className="text-sm"><span className="font-medium">Name:</span> {selectedPayment.recipientName}</p>
                      <p className="text-sm"><span className="font-medium">Type:</span> {selectedPayment.recipientType}</p>
                      <h3 className="font-medium text-gray-900 mb-2 mt-4 text-sm sm:text-base">Status</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${selectedPayment.statusColor}`}>
                        {selectedPayment.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Payment Amount</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-indigo-900">${selectedPayment.amount.toFixed(2)}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Description</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{selectedPayment.description}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                    {selectedPayment.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(selectedPayment.id, 'Processing')}
                          className="px-3 py-2 sm:px-4 sm:py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-transform hover:scale-105 touch-manipulation"
                          aria-label="Process payment"
                        >
                          Process Payment
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(selectedPayment.id, 'Cancelled')}
                          className="px-3 py-2 sm:px-4 sm:py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-transform hover:scale-105 touch-manipulation"
                          aria-label="Cancel payment"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {selectedPayment.status === 'Processing' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(selectedPayment.id, 'Completed')}
                          className="px-3 py-2 sm:px-4 sm:py-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-transform hover:scale-105 touch-manipulation"
                          aria-label="Mark as completed"
                        >
                          Mark as Completed
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(selectedPayment.id, 'Failed')}
                          className="px-3 py-2 sm:px-4 sm:py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-transform hover:scale-105 touch-manipulation"
                          aria-label="Mark as failed"
                        >
                          Mark as Failed
                        </button>
                      </>
                    )}
                    {selectedPayment.status === 'Failed' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedPayment.id, 'Pending')}
                        className="px-3 py-2 sm:px-4 sm:py-2 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-md hover:bg-yellow-100 transition-transform hover:scale-105 touch-manipulation"
                        aria-label="Retry payment"
                      >
                        Retry Payment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Payment Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-indigo-900">Create New Payment</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 touch-manipulation"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreatePayment}>
                <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={newPayment.recipientName}
                      onChange={(e) => setNewPayment(prev => ({...prev, recipientName: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50"
                      placeholder="Enter recipient name"
                      aria-required="true"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Type</label>
                      <select
                        value={newPayment.recipientType}
                        onChange={(e) => setNewPayment(prev => ({...prev, recipientType: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50"
                        aria-label="Recipient type"
                      >
                        <option value="Staff">Staff/Preceptor</option>
                        <option value="Clinical Site">Clinical Site</option>
                        <option value="School">School</option>
                        <option value="Student">Student</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <select
                        value={newPayment.method}
                        onChange={(e) => setNewPayment(prev => ({...prev, method: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50"
                        aria-label="Payment method"
                      >
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Wire Transfer">Wire Transfer</option>
                        <option value="Direct Deposit">Direct Deposit</option>
                        <option value="Check">Check</option>
                        <option value="Credit Card">Credit Card</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={newPayment.amount}
                        onChange={(e) => setNewPayment(prev => ({...prev, amount: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50"
                        placeholder="Enter amount"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                      <input
                        type="date"
                        required
                        value={newPayment.paymentDate}
                        onChange={(e) => setNewPayment(prev => ({...prev, paymentDate: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newPayment.category}
                      onChange={(e) => setNewPayment(prev => ({...prev, category: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50"
                      aria-label="Payment category"
                    >
                      <option value="Preceptor Fees">Preceptor Fees</option>
                      <option value="Site Payments">Site Payments</option>
                      <option value="Student Payments">Student Payments</option>
                      <option value="Revenue Share">Revenue Share</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={newPayment.description}
                      onChange={(e) => setNewPayment(prev => ({...prev, description: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-gray-50"
                      placeholder="Enter payment description..."
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-3 py-2 sm:px-4 sm:py-2 text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 transition-transform hover:scale-105 touch-manipulation"
                    aria-label="Cancel payment creation"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 sm:px-4 sm:py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-transform hover:scale-105 touch-manipulation"
                    aria-label="Create payment"
                  >
                    Create Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}