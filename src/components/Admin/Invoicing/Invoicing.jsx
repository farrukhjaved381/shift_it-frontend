import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, EyeIcon, ArrowDownTrayIcon, PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// Mock data for invoices
const initialInvoices = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2025-001',
    clientName: 'University of Health Sciences',
    clientType: 'School',
    amount: 2400.00,
    status: 'Paid',
    statusColor: 'bg-green-500 text-white',
    issueDate: '2025-08-01',
    dueDate: '2025-08-31',
    paidDate: '2025-08-25',
    items: [
      { description: 'Student Rotation Fee - Alex Johnson', quantity: 1, rate: 800.00, amount: 800.00 },
      { description: 'Student Rotation Fee - Taylor Smith', quantity: 1, rate: 800.00, amount: 800.00 },
      { description: 'Platform Fee', quantity: 1, rate: 800.00, amount: 800.00 },
    ],
    notes: 'Payment for student clinical rotations - August 2025',
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2025-002',
    clientName: 'Memorial Hospital',
    clientType: 'Clinical Site',
    amount: 1600.00,
    status: 'Overdue',
    statusColor: 'bg-red-500 text-white',
    issueDate: '2025-08-15',
    dueDate: '2025-09-14',
    paidDate: null,
    items: [
      { description: 'Site Partnership Fee - Q3 2025', quantity: 1, rate: 1200.00, amount: 1200.00 },
      { description: 'Student Placement Fee', quantity: 2, rate: 200.00, amount: 400.00 },
    ],
    notes: 'Quarterly partnership fee and student placement charges',
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2025-003',
    clientName: 'Medical Training Institute',
    clientType: 'School',
    amount: 3200.00,
    status: 'Pending',
    statusColor: 'bg-yellow-500 text-white',
    issueDate: '2025-09-01',
    dueDate: '2025-09-30',
    paidDate: null,
    items: [
      { description: 'Student Rotation Fees', quantity: 4, rate: 800.00, amount: 3200.00 },
    ],
    notes: 'September 2025 rotation fees for 4 students',
  },
  {
    id: 'INV-004',
    invoiceNumber: 'INV-2025-004',
    clientName: 'City Medical Center',
    clientType: 'Clinical Site',
    amount: 900.00,
    status: 'Draft',
    statusColor: 'bg-gray-500 text-white',
    issueDate: '2025-09-03',
    dueDate: '2025-10-03',
    paidDate: null,
    items: [
      { description: 'Site Setup Fee', quantity: 1, rate: 500.00, amount: 500.00 },
      { description: 'Documentation Review', quantity: 1, rate: 400.00, amount: 400.00 },
    ],
    notes: 'Initial setup and documentation review fees',
  },
];

export default function Invoicing() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [clientTypeFilter, setClientTypeFilter] = useState('All Types');
  const [invoices, setInvoices] = useState(initialInvoices);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    clientName: '',
    clientType: '',
    amount: 0,
    status: 'Draft',
    statusColor: 'bg-gray-500 text-white',
    issueDate: '',
    dueDate: '',
    paidDate: null,
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    notes: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || invoice.status === statusFilter;
    const matchesType = clientTypeFilter === 'All Types' || invoice.clientType === clientTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirst, indexOfLast);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredInvoices.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, clientTypeFilter]);

  // Calculate totals
  const totals = {
    pending: invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0),
    paid: invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0),
    draft: invoices.filter(i => i.status === 'Draft').reduce((sum, i) => sum + i.amount, 0),
  };

  // Handle create invoice
  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const totalAmount = newInvoice.items.reduce((sum, item) => sum + item.amount, 0);
    
    const invoice = {
      id: `INV-${Date.now()}`,
      invoiceNumber: `INV-2025-${String(invoices.length + 1).padStart(3, '0')}`,
      clientName: newInvoice.clientName,
      clientType: newInvoice.clientType,
      amount: totalAmount,
      status: 'Draft',
      statusColor: 'bg-gray-500 text-white',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate,
      paidDate: null,
      items: newInvoice.items,
      notes: newInvoice.notes,
    };
    
    setInvoices([invoice, ...invoices]);
    setIsCreateModalOpen(false);
    setNewInvoice({
      invoiceNumber: '',
      clientName: '',
      clientType: 'School',
      amount: 0,
      status: 'Draft',
      statusColor: 'bg-gray-500 text-white',
      issueDate: '',
      dueDate: '',
      paidDate: null,
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      notes: '',
    });
    alert('Invoice created successfully!');
  };

  // Handle invoice status update
  const handleStatusUpdate = (invoiceId, newStatus) => {
    const statusColors = {
      'Paid': 'bg-green-500 text-white',
      'Overdue': 'bg-red-500 text-white',
      'Pending': 'bg-yellow-500 text-white',
      'Draft': 'bg-gray-500 text-white',
      'Sent': 'bg-blue-500 text-white',
    };

    const paidDate = newStatus === 'Paid' ? new Date().toISOString().split('T')[0] : null;

    setInvoices(prev => 
      prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: newStatus, statusColor: statusColors[newStatus], paidDate }
          : invoice
      )
    );

    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice(prev => ({ 
        ...prev, 
        status: newStatus, 
        statusColor: statusColors[newStatus],
        paidDate 
      }));
    }
  };

  // Handle add item to new invoice
  const addInvoiceItem = () => {
    setNewInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  // Handle update invoice item
  const updateInvoiceItem = (index, field, value) => {
    setNewInvoice(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      // Calculate amount for rate/quantity changes
      if (field === 'rate' || field === 'quantity') {
        const rate = field === 'rate' ? parseFloat(value) || 0 : parseFloat(String(newItems[index].rate)) || 0;
        const quantity = field === 'quantity' ? parseInt(value) || 0 : parseInt(String(newItems[index].quantity)) || 0;
        newItems[index].amount = rate * quantity;
      }
      
      return { ...prev, items: newItems };
    });
  };

  // Handle remove invoice item
  const removeInvoiceItem = (index) => {
    if (newInvoice.items.length > 1) {
      setNewInvoice(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="flex-1 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="px-4 py-4 bg-white shadow-sm sm:px-6">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold text-indigo-900 sm:text-2xl">Invoicing Management</h1>
            <p className="text-sm text-gray-600">
              Create, manage, and track invoices for schools and clinical sites
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 sm:mt-0"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Invoice
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="px-4 py-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm sm:p-6">
            <h3 className="text-sm font-medium text-indigo-900 mb-2">Pending Invoices</h3>
            <p className="text-2xl font-bold text-yellow-600 sm:text-3xl">${totals.pending.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm sm:p-6">
            <h3 className="text-sm font-medium text-indigo-900 mb-2">Paid Invoices</h3>
            <p className="text-2xl font-bold text-green-600 sm:text-3xl">${totals.paid.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm sm:p-6">
            <h3 className="text-sm font-medium text-indigo-900 mb-2">Overdue</h3>
            <p className="text-2xl font-bold text-red-600 sm:text-3xl">${totals.overdue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm sm:p-6">
            <h3 className="text-sm font-medium text-indigo-900 mb-2">Draft Invoices</h3>
            <p className="text-2xl font-bold text-gray-600 sm:text-3xl">${totals.draft.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          {/* Left: Invoices List */}
          <div className="flex-1">
            {/* Filters */}
            <div className="space-y-4 mb-4">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>All Statuses</option>
                  <option>Draft</option>
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                </select>
                <select
                  value={clientTypeFilter}
                  onChange={(e) => setClientTypeFilter(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>All Types</option>
                  <option>School</option>
                  <option>Clinical Site</option>
                </select>
              </div>
            </div>

            {/* Invoices Header */}
            <div className="bg-indigo-900 text-white p-4 rounded-md mb-4 flex justify-between items-center">
              <div>
                <span className="text-2xl font-semibold block sm:text-3xl">Invoices</span>
                <span className="text-base sm:text-lg">{filteredInvoices.length} invoices found</span>
              </div>
              <ArrowDownTrayIcon className="h-5 w-5" />
            </div>

            {/* Invoices List */}
            <ul className="space-y-2">
              {currentInvoices.map((invoice) => (
                <li
                  key={invoice.id}
                  onClick={() => setSelectedInvoice(invoice)}
                  className={`p-4 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedInvoice?.id === invoice.id ? 'border-indigo-600 bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${invoice.statusColor}`}>
                          {invoice.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{invoice.clientName}</p>
                      <p className="text-xs text-gray-500">{invoice.clientType}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-bold text-indigo-900">${invoice.amount.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Due: {invoice.dueDate}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            {pageNumbers.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Invoice Details */}
          <div className="flex-1 mt-6 lg:mt-0">
            {selectedInvoice ? (
              <div className="bg-white rounded-md border border-gray-200">
                {/* Invoice Header */}
                <div className="bg-indigo-900 text-white p-4 rounded-t-md flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold sm:text-lg">{selectedInvoice.invoiceNumber}</h2>
                    <p className="text-sm">{selectedInvoice.clientName}</p>
                  </div>
                  <div className="flex space-x-2">
                    <DocumentTextIcon className="h-5 w-5" />
                    <EyeIcon className="h-5 w-5" />
                  </div>
                </div>

                {/* Invoice Content */}
                <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Invoice Information</h3>
                      <p><span className="font-medium">Invoice #:</span> {selectedInvoice.invoiceNumber}</p>
                      <p><span className="font-medium">Issue Date:</span> {selectedInvoice.issueDate}</p>
                      <p><span className="font-medium">Due Date:</span> {selectedInvoice.dueDate}</p>
                      {selectedInvoice.paidDate && (
                        <p><span className="font-medium">Paid Date:</span> {selectedInvoice.paidDate}</p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Client Information</h3>
                      <p><span className="font-medium">Name:</span> {selectedInvoice.clientName}</p>
                      <p><span className="font-medium">Type:</span> {selectedInvoice.clientType}</p>
                      
                      <h3 className="font-medium text-gray-900 mb-2 mt-4">Status</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${selectedInvoice.statusColor}`}>
                        {selectedInvoice.status}
                      </span>
                    </div>
                  </div>

                  {/* Invoice Items */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">Invoice Items</h3>
                    <div className="border border-gray-200 rounded-md overflow-x-auto">
                      <table className="w-full text-sm min-w-max">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left font-medium text-gray-700">Description</th>
                            <th className="px-3 py-2 text-center font-medium text-gray-700">Qty</th>
                            <th className="px-3 py-2 text-right font-medium text-gray-700">Rate</th>
                            <th className="px-3 py-2 text-right font-medium text-gray-700">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedInvoice.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-3 py-2">{item.description}</td>
                              <td className="px-3 py-2 text-center">{item.quantity}</td>
                              <td className="px-3 py-2 text-right">${item.rate.toFixed(2)}</td>
                              <td className="px-3 py-2 text-right font-medium">${item.amount.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td colSpan={3} className="px-3 py-2 text-right font-medium">Total:</td>
                            <td className="px-3 py-2 text-right font-bold text-lg">${selectedInvoice.amount.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedInvoice.notes && (
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{selectedInvoice.notes}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                    {selectedInvoice.status === 'Draft' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(selectedInvoice.id, 'Pending')}
                          className="px-4 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                        >
                          Send Invoice
                        </button>
                      </>
                    )}
                    {selectedInvoice.status === 'Pending' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedInvoice.id, 'Paid')}
                        className="px-4 py-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100"
                      >
                        Mark as Paid
                      </button>
                    )}
                    {selectedInvoice.status === 'Overdue' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedInvoice.id, 'Paid')}
                        className="px-4 py-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-md border border-gray-200 p-8 text-center">
                <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select an invoice to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create New Invoice</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInvoice}>
              <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={newInvoice.clientName}
                    onChange={(e) => setNewInvoice(prev => ({...prev, clientName: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Type</label>
                  <select
                    value={newInvoice.clientType}
                    onChange={(e) => setNewInvoice(prev => ({...prev, clientType: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="School">School</option>
                    <option value="Clinical Site">Clinical Site</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice(prev => ({...prev, dueDate: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Invoice Items */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
                  <button
                    type="button"
                    onClick={addInvoiceItem}
                    className="px-3 py-1 text-sm text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
                  >
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-6">
                  {newInvoice.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 items-end">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                          type="text"
                          required
                          value={item.description}
                          onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={item.quantity}
                          onChange={(e) => updateInvoiceItem(index, 'quantity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rate ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          required
                          value={item.rate}
                          onChange={(e) => updateInvoiceItem(index, 'rate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                        <input
                          type="text"
                          readOnly
                          value={item.amount.toFixed(2)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeInvoiceItem(index)}
                          disabled={newInvoice.items.length <= 1}
                          className="w-full px-3 py-2 text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed md:w-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-right">
                  <p className="text-lg font-bold">
                    Total: ${newInvoice.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  rows={3}
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice(prev => ({...prev, notes: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add any additional notes for this invoice..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}