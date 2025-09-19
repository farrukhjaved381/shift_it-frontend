import { useState } from "react";
import { 
    PlusIcon, 
    PencilIcon, 
    NoSymbolIcon, 
    CheckCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

// Extended mock data for clinical sites (more entries for pagination demo)
const initialClinicalSites = [
    {
        id: 'CS-001',
        name: 'Memorial Hospital',
        location: 'Boston, MA',
        status: 'Active',
        statusColor: 'bg-green-500 text-white',
        created: 'Jan 15, 2023',
        contactPerson: 'Dr. Emily Carter',
        email: 'info@memorialhospital.org',
        phone: '(617) 555-1234',
        address: '123 Beacon St, Boston, MA 02116',
        assignedSchools: 2,
        disciplines: 4,
        departments: 5,
        accountStatus: 'Activated',
        documentsStatus: 'Complete',
    },
    {
        id: 'CS-002',
        name: 'City Medical Center',
        location: 'New York, NY',
        status: 'Active',
        statusColor: 'bg-green-500 text-white',
        created: 'Feb 10, 2023',
        contactPerson: 'Dr. Michael Chen',
        email: 'info@citymedical.org',
        phone: '(212) 555-6789',
        address: '456 Oak Ave, New York, NY 10001',
        assignedSchools: 1,
        disciplines: 3,
        departments: 4,
        accountStatus: 'Credentials Sent',
        documentsStatus: 'Pending Review',
    },
    {
        id: 'CS-003',
        name: 'Riverside Clinic',
        location: 'Chicago, IL',
        status: 'Pending',
        statusColor: 'bg-yellow-500 text-white',
        created: 'Mar 5, 2023',
        contactPerson: 'Dr. Sarah Johnson',
        email: 'info@riversideclinic.org',
        phone: '(312) 555-4321',
        address: '789 River Rd, Chicago, IL 60601',
        assignedSchools: 0,
        disciplines: 2,
        departments: 3,
        accountStatus: 'Account Created',
        documentsStatus: 'Missing',
    },
    {
        id: 'CS-004',
        name: 'Sunset Rehabilitation Center',
        location: 'Los Angeles, CA',
        status: 'Terminated',
        statusColor: 'bg-red-500 text-white',
        created: 'Apr 20, 2023',
        contactPerson: 'Dr. Robert Lee',
        email: 'info@sunsetrehab.org',
        phone: '(213) 555-9876',
        address: '101 Sunset Blvd, Los Angeles, CA 90001',
        assignedSchools: 1,
        disciplines: 1,
        departments: 2,
        accountStatus: 'No Account',
        documentsStatus: 'Expired',
    },
    {
        id: 'CS-005',
        name: 'Northside Health Partners',
        location: 'Atlanta, GA',
        status: 'Blocked',
        statusColor: 'bg-gray-500 text-white',
        created: 'May 12, 2023',
        contactPerson: 'Dr. Lisa Wong',
        email: 'info@northsidehealth.org',
        phone: '(404) 555-5678',
        address: '234 Peachtree St, Atlanta, GA 30303',
        assignedSchools: 0,
        disciplines: 0,
        departments: 0,
        accountStatus: 'Activated',
        documentsStatus: 'Complete',
    },
    {
        id: 'CS-006',
        name: 'Green Valley Medical',
        location: 'Phoenix, AZ',
        status: 'Active',
        statusColor: 'bg-green-500 text-white',
        created: 'Jun 8, 2023',
        contactPerson: 'Dr. James Wilson',
        email: 'info@greenvalley.org',
        phone: '(602) 555-2468',
        address: '890 Desert Rd, Phoenix, AZ 85001',
        assignedSchools: 3,
        disciplines: 5,
        departments: 6,
        accountStatus: 'Activated',
        documentsStatus: 'Complete',
    },
    {
        id: 'CS-007',
        name: 'Pacific Coast Clinic',
        location: 'Seattle, WA',
        status: 'Pending',
        statusColor: 'bg-yellow-500 text-white',
        created: 'Jul 22, 2023',
        contactPerson: 'Dr. Maria Rodriguez',
        email: 'info@pacificcoast.org',
        phone: '(206) 555-1357',
        address: '567 Coast Ave, Seattle, WA 98101',
        assignedSchools: 0,
        disciplines: 2,
        departments: 2,
        accountStatus: 'Account Created',
        documentsStatus: 'Pending Review',
    },
    {
        id: 'CS-008',
        name: 'Mountain View Hospital',
        location: 'Denver, CO',
        status: 'Active',
        statusColor: 'bg-green-500 text-white',
        created: 'Aug 15, 2023',
        contactPerson: 'Dr. David Thompson',
        email: 'info@mountainview.org',
        phone: '(303) 555-9753',
        address: '123 Mountain Rd, Denver, CO 80201',
        assignedSchools: 2,
        disciplines: 4,
        departments: 4,
        accountStatus: 'Activated',
        documentsStatus: 'Complete',
    },
];

export default function ClinicalSite() {
    const [selectedSite, setSelectedSite] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [accountFilter, setAccountFilter] = useState('All Accounts');
    const [documentsFilter, setDocumentsFilter] = useState('All Documents');
    const [sites, setSites] = useState(initialClinicalSites);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showDetailView, setShowDetailView] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    const [newSite, setNewSite] = useState({
        id: '',
        name: '',
        location: '',
        status: 'Pending',
        statusColor: 'bg-yellow-500 text-white',
        created: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }),
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        assignedSchools: 0,
        disciplines: 0,
        departments: 0,
        accountStatus: 'No Account',
        documentsStatus: 'Missing',
        city: '',
        state: '',
        zip: '',
    });
    const [editSite, setEditSite] = useState(null);

    // Filter sites based on search and filters
    const filteredSites = sites.filter((site) => {
        const matchesSearch = site.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'All Statuses' || site.status === statusFilter;
        const matchesAccount =
            accountFilter === 'All Accounts' || site.accountStatus === accountFilter;
        const matchesDocuments =
            documentsFilter === 'All Documents' ||
            site.documentsStatus === documentsFilter;
        return (
            matchesSearch && matchesStatus && matchesAccount && matchesDocuments
        );
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredSites.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSites = filteredSites.slice(startIndex, endIndex);

    // Calculate status counts
    const statusCounts = {
        Active: filteredSites.filter((s) => s.status === 'Active').length,
        Pending: filteredSites.filter((s) => s.status === 'Pending').length,
        Terminated: filteredSites.filter((s) => s.status === 'Terminated').length,
        Blocked: filteredSites.filter((s) => s.status === 'Blocked').length,
    };

    // Handle site selection (mobile responsive)
    const handleSiteSelect = (site) => {
        setSelectedSite(site);
        setShowDetailView(true);
    };

    // Handle pagination
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Reset to first page when filters change
    const handleFilterChange = (filterType, value) => {
        setCurrentPage(1);
        switch (filterType) {
            case 'search':
                setSearchTerm(value);
                break;
            case 'status':
                setStatusFilter(value);
                break;
            case 'account':
                setAccountFilter(value);
                break;
            case 'documents':
                setDocumentsFilter(value);
                break;
            default:
                break;
        }
    };

    // Handle Add Clinical Site Form Submission
    const handleAddSite = (e) => {
        e.preventDefault();
        const siteToAdd = {
            ...newSite,
            id: `CS-${Date.now()}`,
            location: `${newSite.city}, ${newSite.state}`,
            statusColor:
                newSite.status === 'Active'
                    ? 'bg-green-500 text-white'
                    : newSite.status === 'Pending'
                    ? 'bg-yellow-500 text-white'
                    : newSite.status === 'Terminated'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-500 text-white',
        };
        setSites([...sites, siteToAdd]);
        setIsAddModalOpen(false);
        setNewSite({
            id: '',
            name: '',
            location: '',
            status: 'Pending',
            statusColor: 'bg-yellow-500 text-white',
            created: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
            contactPerson: '',
            email: '',
            phone: '',
            address: '',
            assignedSchools: 0,
            disciplines: 0,
            departments: 0,
            accountStatus: 'No Account',
            documentsStatus: 'Missing',
            city: '',
            state: '',
            zip: '',
        });
        // Show success message with better UX
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        toast.textContent = 'Clinical site added successfully!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    // Handle Edit Details Form Submission
    const handleEditSite = (e) => {
        e.preventDefault();
        if (editSite) {
            const updatedSite = {
                ...editSite,
                location: `${editSite.city || ''}, ${editSite.state || ''}`,
                statusColor:
                    editSite.status === 'Active'
                        ? 'bg-green-500 text-white'
                        : editSite.status === 'Pending'
                        ? 'bg-yellow-500 text-white'
                        : editSite.status === 'Terminated'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-500 text-white',
            };
            setSites(
                sites.map((site) => (site.id === updatedSite.id ? updatedSite : site))
            );
            setSelectedSite(updatedSite);
            setIsEditModalOpen(false);
            setEditSite(null);
            // Show success message
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
            toast.textContent = 'Clinical site updated successfully!';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    };

    // Handle Block/Unblock Site
    const handleToggleBlockSite = () => {
        if (selectedSite) {
            const isBlocked = selectedSite.status === 'Blocked';
            const action = isBlocked ? 'unblock' : 'block';
            const newStatus = isBlocked ? 'Active' : 'Blocked';
            
            if (window.confirm(`Are you sure you want to ${action} ${selectedSite.name}?`)) {
                const updatedSite = {
                    ...selectedSite,
                    status: newStatus,
                    statusColor: newStatus === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white',
                };
                setSites(
                    sites.map((site) => (site.id === updatedSite.id ? updatedSite : site))
                );
                setSelectedSite(updatedSite);
                // Show success message
                const toast = document.createElement('div');
                toast.className = `fixed top-4 right-4 ${isBlocked ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md shadow-lg z-50`;
                toast.textContent = `${selectedSite.name} has been ${action}ed!`;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            }
        }
    };

    return (
        <div className="flex-1 bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Clinical Sites
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage clinical sites, assign schools, and handle documentation
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 w-full sm:w-auto"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Clinical Site
                    </button>
                </div>
            </header>

            {/* Filters */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-lg">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search clinical sites..."
                            value={searchTerm}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Terminated</option>
                            <option>Blocked</option>
                        </select>
                        <select
                            value={accountFilter}
                            onChange={(e) => handleFilterChange('account', e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option>All Accounts</option>
                            <option>No Account</option>
                            <option>Account Created</option>
                            <option>Credentials Sent</option>
                            <option>Activated</option>
                        </select>
                        <select
                            value={documentsFilter}
                            onChange={(e) => handleFilterChange('documents', e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option>All Documents</option>
                            <option>Complete</option>
                            <option>Missing</option>
                            <option>Expired</option>
                            <option>Pending Review</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Mobile Detail View */}
            <div className={`lg:hidden ${showDetailView ? 'block' : 'hidden'}`}>
                {selectedSite && (
                    <div className="px-4 py-4">
                        {/* Back button */}
                        <button
                            onClick={() => setShowDetailView(false)}
                            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition-colors duration-200"
                        >
                            <ChevronLeftIcon className="h-5 w-5 mr-1" />
                            Back to list
                        </button>

                        {/* Site Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 rounded-t-lg shadow-sm">
                            <h2 className="text-xl font-bold">{selectedSite.name}</h2>
                            <p className="text-indigo-100 mt-1">
                                ID: {selectedSite.id} · Created: {selectedSite.created}
                            </p>
                        </div>

                        {/* Details Content */}
                        <div className="bg-white p-6 border border-gray-200 rounded-b-lg shadow-sm">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Contact Person:</span>
                                            <span className="font-medium">{selectedSite.contactPerson}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Email:</span>
                                            <span className="font-medium">{selectedSite.email}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Phone:</span>
                                            <span className="font-medium">{selectedSite.phone}</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Address</h3>
                                    <p className="text-sm text-gray-700">{selectedSite.address}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900">{selectedSite.assignedSchools}</div>
                                            <div className="text-xs text-gray-500">Schools</div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900">{selectedSite.disciplines}</div>
                                            <div className="text-xs text-gray-500">Disciplines</div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900">{selectedSite.departments}</div>
                                            <div className="text-xs text-gray-500">Departments</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                                    <span
                                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${selectedSite.statusColor}`}
                                    >
                                        {selectedSite.status}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 flex flex-col space-y-3">
                                <button
                                    onClick={() => {
                                        setEditSite(selectedSite);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="flex items-center justify-center px-4 py-2 text-sm text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                                >
                                    <PencilIcon className="h-4 w-4 mr-2" />
                                    Edit Details
                                </button>
                                <button
                                    onClick={handleToggleBlockSite}
                                    className={`flex items-center justify-center px-4 py-2 text-sm text-white rounded-lg transition-colors duration-200 ${
                                        selectedSite.status === 'Blocked'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-red-600 hover:bg-red-700'
                                    }`}
                                >
                                    {selectedSite.status === 'Blocked' ? (
                                        <>
                                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                                            Unblock Site
                                        </>
                                    ) : (
                                        <>
                                            <NoSymbolIcon className="h-4 w-4 mr-2" />
                                            Block Site
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sites List and Details - Desktop Layout */}
            <div className={`lg:flex ${showDetailView ? 'hidden lg:flex' : 'block lg:flex'}`}>
                {/* Left: Sites List */}
                <div className="w-full lg:w-1/3 bg-white border-r border-gray-200">
                    {/* Stats and Title */}
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Clinical Sites
                            </h2>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                            </select>
                        </div>
                        <div className="text-xs text-gray-500">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredSites.length)} of {filteredSites.length} sites
                        </div>
                        <div className="flex space-x-4 mt-2 text-xs">
                            <span className="text-green-600 font-medium">{statusCounts.Active} Active</span>
                            <span className="text-yellow-600 font-medium">{statusCounts.Pending} Pending</span>
                            <span className="text-red-600 font-medium">{statusCounts.Terminated} Terminated</span>
                            <span className="text-gray-600 font-medium">{statusCounts.Blocked} Blocked</span>
                        </div>
                    </div>

                    {/* Sites List */}
                    <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 300px)' }}>
                        <ul className="divide-y divide-gray-200">
                            {paginatedSites.map((site) => (
                                <li
                                    key={site.id}
                                    onClick={() => handleSiteSelect(site)}
                                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                                        selectedSite?.id === site.id ? 'bg-indigo-50 border-r-2 border-indigo-500' : ''
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                                {site.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {site.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {site.location}
                                            </p>
                                            <div className="flex items-center mt-1">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${site.statusColor}`}
                                                >
                                                    {site.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="border-t border-gray-200 px-4 py-3 bg-white">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeftIcon className="h-3 w-3 mr-1" />
                                    Previous
                                </button>
                                
                                <div className="flex space-x-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => goToPage(i + 1)}
                                            className={`px-2 py-1 text-xs font-medium rounded ${
                                                currentPage === i + 1
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRightIcon className="h-3 w-3 ml-1" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Details (Desktop only) */}
                <div className="hidden lg:block w-2/3 bg-white">
                    {selectedSite ? (
                        <>
                            {/* Tabs */}
                            <div className="flex space-x-6 border-b border-gray-200 px-6 pt-6 pb-0 overflow-x-auto">
                                <button className="pb-3 text-indigo-600 font-medium border-b-2 border-indigo-600 whitespace-nowrap text-sm">
                                    Details
                                </button>
                                <button className="pb-3 text-gray-500 hover:text-gray-700 whitespace-nowrap text-sm">Assigned Schools</button>
                                <button className="pb-3 text-gray-500 hover:text-gray-700 whitespace-nowrap text-sm">Documentation</button>
                                <button className="pb-3 text-gray-500 hover:text-gray-700 whitespace-nowrap text-sm">Disciplines</button>
                                <button className="pb-3 text-gray-500 hover:text-gray-700 whitespace-nowrap text-sm">Departments</button>
                                <button className="pb-3 text-gray-500 hover:text-gray-700 whitespace-nowrap text-sm">Contracts</button>
                                <button className="pb-3 text-gray-500 hover:text-gray-700 whitespace-nowrap text-sm">Students</button>
                            </div>

                            {/* Site Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 mx-6 mt-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedSite.name}</h2>
                                        <p className="text-indigo-100 mt-1">
                                            ID: {selectedSite.id} · Created: {selectedSite.created}
                                        </p>
                                    </div>
                                    <span
                                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                            selectedSite.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            selectedSite.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            selectedSite.status === 'Blocked' ? 'bg-gray-100 text-gray-800' :
                                            'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {selectedSite.status}
                                    </span>
                                </div>
                            </div>

                            {/* Details Content */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">
                                                Contact Information
                                            </h3>
                                            <dl className="space-y-2">
                                                <div className="flex justify-between py-1">
                                                    <dt className="text-sm text-gray-500">Contact Person</dt>
                                                    <dd className="text-sm font-medium text-gray-900">{selectedSite.contactPerson}</dd>
                                                </div>
                                                <div className="flex justify-between py-1">
                                                    <dt className="text-sm text-gray-500">Email</dt>
                                                    <dd className="text-sm font-medium text-gray-900">{selectedSite.email}</dd>
                                                </div>
                                                <div className="flex justify-between py-1">
                                                    <dt className="text-sm text-gray-500">Phone</dt>
                                                    <dd className="text-sm font-medium text-gray-900">{selectedSite.phone}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Address</h3>
                                            <p className="text-sm text-gray-700">{selectedSite.address}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                    <div className="text-3xl font-bold text-gray-900">{selectedSite.assignedSchools}</div>
                                                    <div className="text-sm text-gray-500">Schools</div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                    <div className="text-3xl font-bold text-gray-900">{selectedSite.disciplines}</div>
                                                    <div className="text-sm text-gray-500">Disciplines</div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                    <div className="text-3xl font-bold text-gray-900">{selectedSite.departments}</div>
                                                    <div className="text-sm text-gray-500">Departments</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Account Status</h3>
                                            <p className="text-sm text-gray-700">Status: {selectedSite.accountStatus}</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Documents Status</h3>
                                            <p className="text-sm text-gray-700">Status: {selectedSite.documentsStatus}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 flex justify-end space-x-3">
                                    <button
                                        onClick={() => {
                                            setEditSite(selectedSite);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                    >
                                        <PencilIcon className="h-4 w-4 mr-2" />
                                        Edit Details
                                    </button>
                                    <button
                                        onClick={handleToggleBlockSite}
                                        className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                                            selectedSite.status === 'Blocked'
                                                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                        }`}
                                    >
                                        {selectedSite.status === 'Blocked' ? (
                                            <>
                                                <CheckCircleIcon className="h-4 w-4 mr-2" />
                                                Unblock Site
                                            </>
                                        ) : (
                                            <>
                                                <NoSymbolIcon className="h-4 w-4 mr-2" />
                                                Block Site
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
                            <AdjustmentsHorizontalIcon className="h-12 w-12 text-gray-300" />
                            <p className="text-lg font-medium">Select a clinical site</p>
                            <p className="text-sm">Choose a site from the list to view details</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Site Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add New Clinical Site
                            </h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Enter the details for the new clinical site. Required fields are marked with an asterisk (*).
                        </p>

                        <form onSubmit={handleAddSite} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Site Name *
                                </label>
                                <input
                                    type="text"
                                    value={newSite.name}
                                    onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                                    placeholder="Enter site name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Person *
                                    </label>
                                    <input
                                        type="text"
                                        value={newSite.contactPerson}
                                        onChange={(e) => setNewSite({ ...newSite, contactPerson: e.target.value })}
                                        placeholder="Dr. John Smith"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={newSite.phone}
                                        onChange={(e) => setNewSite({ ...newSite, phone: e.target.value })}
                                        placeholder="(555) 123-4567"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={newSite.email}
                                    onChange={(e) => setNewSite({ ...newSite, email: e.target.value })}
                                    placeholder="contact@hospital.org"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    value={newSite.address}
                                    onChange={(e) => setNewSite({ ...newSite, address: e.target.value })}
                                    placeholder="123 Main Street"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                    <input
                                        type="text"
                                        value={newSite.city}
                                        onChange={(e) => setNewSite({ ...newSite, city: e.target.value })}
                                        placeholder="Boston"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                    <input
                                        type="text"
                                        value={newSite.state}
                                        onChange={(e) => setNewSite({ ...newSite, state: e.target.value })}
                                        placeholder="MA"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                                    <input
                                        type="text"
                                        value={newSite.zip}
                                        onChange={(e) => setNewSite({ ...newSite, zip: e.target.value })}
                                        placeholder="02101"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={newSite.status}
                                        onChange={(e) => setNewSite({ ...newSite, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Terminated">Terminated</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add Clinical Site
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Site Modal */}
            {isEditModalOpen && editSite && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Edit Clinical Site
                            </h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Update the details for the clinical site. Required fields are marked with an asterisk (*).
                        </p>

                        <form onSubmit={handleEditSite} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Site Name *
                                </label>
                                <input
                                    type="text"
                                    value={editSite.name}
                                    onChange={(e) => setEditSite({ ...editSite, name: e.target.value })}
                                    placeholder="Enter site name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Person *
                                    </label>
                                    <input
                                        type="text"
                                        value={editSite.contactPerson}
                                        onChange={(e) => setEditSite({ ...editSite, contactPerson: e.target.value })}
                                        placeholder="Dr. John Smith"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={editSite.phone}
                                        onChange={(e) => setEditSite({ ...editSite, phone: e.target.value })}
                                        placeholder="(555) 123-4567"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={editSite.email}
                                    onChange={(e) => setEditSite({ ...editSite, email: e.target.value })}
                                    placeholder="contact@hospital.org"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    value={editSite.address}
                                    onChange={(e) => setEditSite({ ...editSite, address: e.target.value })}
                                    placeholder="123 Main Street"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                    <input
                                        type="text"
                                        value={editSite.city || ''}
                                        onChange={(e) => setEditSite({ ...editSite, city: e.target.value })}
                                        placeholder="Boston"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                    <input
                                        type="text"
                                        value={editSite.state || ''}
                                        onChange={(e) => setEditSite({ ...editSite, state: e.target.value })}
                                        placeholder="MA"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                                    <input
                                        type="text"
                                        value={editSite.zip || ''}
                                        onChange={(e) => setEditSite({ ...editSite, zip: e.target.value })}
                                        placeholder="02101"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={editSite.status}
                                        onChange={(e) => setEditSite({ ...editSite, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Terminated">Terminated</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}