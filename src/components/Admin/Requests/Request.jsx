import { useState, useMemo } from "react";

const initialRows = [
  {
    id: 'req-std-003',
    name: 'Jordan Lee',
    email: 'jordan.lee@email.com',
    type: 'Student',
    status: 'Pending',
    priority: 'High',
    date: 'Dec 20, 2023',
    reason: 'Requesting internship placement due to academic requirements.',
    documents: [
      { name: 'Resume.pdf', url: 'https://example.com/resume.pdf' },
      { name: 'Transcript.pdf', url: 'https://example.com/transcript.pdf' },
    ],
    notes: '',
  },
  {
    id: 'req-std-001',
    name: 'Riley Johnson',
    email: 'rileyjohnson@email.com',
    type: 'Student',
    status: 'Pending',
    priority: 'Medium',
    date: 'Dec 19, 2023',
    reason: 'Seeking clinical site for thesis research.',
    documents: [
      { name: 'Thesis Proposal.pdf', url: 'https://example.com/thesis.pdf' },
    ],
    notes: '',
  },
  {
    id: 'req-sch-001',
    name: 'Pacific Health Institute',
    email: 'admin@pacifichealth.edu',
    type: 'School',
    status: 'Pending',
    priority: 'High',
    date: 'Dec 18, 2023',
  },
];

const statusBadge = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Review': 'bg-blue-100 text-blue-800',
  Processed: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

const priorityClass = {
  Low: 'text-gray-500',
  Medium: 'text-blue-600',
  High: 'text-red-600 font-semibold',
};

const RequestsManagement = () => {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notes, setNotes] = useState('');
  const itemsPerPage = 5;

  const filtered = useMemo(() => {
    let filteredData = rows.filter((r) => {
      const q = query.toLowerCase();
      const matchQuery =
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q);
      const matchTab =
        tab === 'All' ||
        (tab === 'Sites' && r.type === 'Site') ||
        (tab === 'Schools' && r.type === 'School') ||
        (tab === 'Students' && r.type === 'Student');
      return matchQuery && matchTab;
    });

    if (sortConfig) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  }, [rows, query, tab, sortConfig]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const counts = useMemo(() => ({
    total: rows.length,
    pending: rows.filter(r => r.status === 'Pending').length,
    inReview: rows.filter(r => r.status === 'In Review').length,
    processed: rows.filter(r => r.status === 'Processed').length,
  }), [rows]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleStatusChange = (id, status) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleBulkUpdate = (status) => {
    setRows(prev => prev.map(r => selectedRows.has(r.id) ? { ...r, status } : r));
    setSelectedRows(new Set());
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setNotes(request.notes || '');
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedRequest(null);
    setNotes('');
  };

  const handleReject = () => {
    if (selectedRequest) {
      handleStatusChange(selectedRequest.id, 'Rejected');
      setRows(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, notes } : r));
      handleCloseModal();
    }
  };

  const handleApprove = () => {
    if (selectedRequest) {
      handleStatusChange(selectedRequest.id, 'Processed');
      setRows(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, notes } : r));
      handleCloseModal();
    }
  };

  const handleViewDocument = (url) => {
    window.open(url, '_blank'); // Simulate viewing document
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Requests Management</h1>
      <p className="text-gray-600 mb-6">
        Manage and process incoming requests from clinical sites, schools, and students.
      </p>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Requests', value: counts.total },
          { label: 'Pending', value: counts.pending },
          { label: 'In Review', value: counts.inReview },
          { label: 'Processed', value: counts.processed },
        ].map((c) => (
          <div
            key={c.label}
            className="bg-white rounded-xl shadow-sm py-4 px-5 text-center"
          >
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="flex items-center border-b border-gray-200 px-4">
          {['All', 'Sites', 'Schools', 'Students'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 px-4 text-sm font-medium focus:outline-none ${
                tab === t
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="p-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search requests..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {selectedRows.size > 0 && (
            <div className="flex gap-2">
              <button onClick={() => handleBulkUpdate('In Review')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Bulk Review</button>
              <button onClick={() => handleBulkUpdate('Processed')} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">Bulk Process</button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3"><input type="checkbox" onChange={(e) => e.target.checked ? setSelectedRows(new Set(filtered.map(r => r.id))) : setSelectedRows(new Set())} /></th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('date')}>Date</th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('id')}>Request ID</th>
                <th className="px-6 py-3">Name / Organization</th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('type')}>Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('priority')}>Priority</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginated.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><input type="checkbox" checked={selectedRows.has(r.id)} onChange={() => handleSelectRow(r.id)} /></td>
                  <td className="px-6 py-4 text-gray-900">{r.date}</td>
                  <td className="px-6 py-4 text-gray-500">{r.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{r.name}</div>
                    <div className="text-gray-500">{r.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{r.type}</td>
                  <td className="px-6 py-4">
                    <select value={r.status} onChange={(e) => handleStatusChange(r.id, e.target.value)} className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusBadge[r.status]}`}>
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Processed">Processed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className={`px-6 py-4 ${priorityClass[r.priority]}`}>{r.priority}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleViewDetails(r)} className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, counts.total)} of {counts.total} requests
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(counts.total / itemsPerPage)))}
              className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0  bg-black/40 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto">
          <div className="bg-white w-2/5 max-h-screen overflow-y-auto p-6 mt-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h2>
            <div className="mb-4">
              <p><strong>ID:</strong> {selectedRequest.id}</p>
              <p><strong>Name:</strong> {selectedRequest.name}</p>
              <p><strong>Email:</strong> {selectedRequest.email}</p>
              <p><strong>Type:</strong> {selectedRequest.type}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <p><strong>Priority:</strong> {selectedRequest.priority}</p>
              <p><strong>Date:</strong> {selectedRequest.date}</p>
            </div>
            {selectedRequest.type === 'Student' && (
              <>
                <div className="mb-4">
                  <h3 className="font-medium">Reason for Request</h3>
                  <p>{selectedRequest.reason}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-medium">Submitted Documents</h3>
                  <ul>
                    {selectedRequest.documents?.map((doc, index) => (
                      <li key={index} className="flex justify-between items-center mb-2">
                        <span>{doc.name}</span>
                        <button onClick={() => handleViewDocument(doc.url)} className="text-indigo-600 hover:text-indigo-800 text-xs">View</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <div className="mb-4">
              <h3 className="font-medium">Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                rows={4}
                placeholder="Add notes here..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={handleCloseModal} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm">Close</button>
              <button onClick={handleReject} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm">Reject</button>
              <button onClick={handleApprove} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsManagement;