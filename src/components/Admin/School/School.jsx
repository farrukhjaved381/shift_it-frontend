import { useState } from "react";
import { PlusIcon, PencilIcon, NoSymbolIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Mock data for schools
const initialSchools = [
    {
        id: 'SCH-001',
        name: 'University of Health Sciences',
        location: 'Boston, MA',
        status: 'Active',
        statusColor: 'bg-green-500 text-white',
        created: 'Feb 20, 2017',
        contactPerson: 'Dr. James Wilson',
        email: 'admin@uhs.edu',
        phone: '(617) 555-1000',
        address: '100 University Ave, Boston, MA 02115',
        clinicalSites: 2,
        programs: 3,
        students: 3,
        activeRotations: 2,
        accountStatus: 'Activated',
        accountNumber: 'SCH-2020-001',
        username: 'universityhealthsciences',
        lastLogin: 'Dec 19, 2023',
        documentsStatus: 'Complete',
    },
    {
        id: 'SCH-002',
        name: 'Medical Training Institute',
        location: 'New York, NY',
        status: 'Active',
        statusColor: 'bg-green-500 text-white',
        created: 'Jan 15, 2018',
        contactPerson: 'Dr. Sarah Johnson',
        email: 'admin@mti.edu',
        phone: '(212) 555-6789',
        address: '456 Medical Plaza, New York, NY 10001',
        clinicalSites: 8,
        programs: 4,
        students: 200,
        activeRotations: 12,
        accountStatus: 'Credentials Sent',
        accountNumber: 'SCH-2018-001',
        username: 'medicaltraininginstitute',
        lastLogin: 'Aug 15, 2024',
        documentsStatus: 'Pending Review',
    },
    {
        id: 'SCH-003',
        name: 'Allied Health College',
        location: 'Chicago, IL',
        status: 'Pending',
        statusColor: 'bg-yellow-500 text-white',
        created: 'Mar 10, 2019',
        contactPerson: 'Dr. Michael Chen',
        email: 'admin@ahc.edu',
        phone: '(312) 555-4321',
        address: '789 Education Blvd, Chicago, IL 60601',
        clinicalSites: 3,
        programs: 2,
        students: 85,
        activeRotations: 5,
        accountStatus: 'Account Created',
        documentsStatus: 'Missing',
    },
    {
        id: 'SCH-004',
        name: 'Nursing Academy',
        location: 'Los Angeles, CA',
        status: 'Suspended',
        statusColor: 'bg-red-500 text-white',
        created: 'Jun 5, 2020',
        contactPerson: 'Dr. Emily Davis',
        email: 'admin@nursacad.edu',
        phone: '(213) 555-9876',
        address: '321 Nursing St, Los Angeles, CA 90001',
        clinicalSites: 2,
        programs: 1,
        students: 45,
        activeRotations: 2,
        accountStatus: 'No Account',
        documentsStatus: 'Expired',
    },
    {
        id: 'SCH-005',
        name: 'Healthcare Education Center',
        location: 'Atlanta, GA',
        status: 'Inactive',
        statusColor: 'bg-gray-500 text-white',
        created: 'Feb 20, 2017',
        contactPerson: 'Dr. Robert Kim',
        email: 'admin@hec.edu',
        phone: '(404) 555-5000',
        address: '500 Health Blvd, Atlanta, GA 30301',
        clinicalSites: 0,
        programs: 2,
        students: 0,
        activeRotations: 0,
        accountStatus: 'No Account',
        documentsStatus: 'Missing',
    },
];

export default function SchoolsManagement() {
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [schools, setSchools] = useState(initialSchools);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAccountCreationOpen, setIsAccountCreationOpen] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    
    // Mobile view state
    const [showDetails, setShowDetails] = useState(false);

    const [newSchool, setNewSchool] = useState({
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
        clinicalSites: 0,
        programs: 0,
        students: 0,
        activeRotations: 0,
        accountStatus: 'No Account',
        documentsStatus: 'Missing',
    });
    const [editSchool, setEditSchool] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Filter schools based on search and filters
    const filteredSchools = schools.filter((school) => {
        const matchesSearch = school.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'All Statuses' || school.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSchools = filteredSchools.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle school selection (mobile responsive)
    const handleSchoolSelect = (school) => {
        setSelectedSchool(school);
        setShowDetails(true);
    };

    // Handle back to list (mobile)
    const handleBackToList = () => {
        setShowDetails(false);
        setSelectedSchool(null);
    };

    // Handle Add School Form Submission
    const handleAddSchool = (e) => {
        e.preventDefault();
        const schoolToAdd = {
            ...newSchool,
            id: `SCH-${Date.now()}`,
            statusColor:
                newSchool.status === 'Active'
                    ? 'bg-green-500 text-white'
                    : newSchool.status === 'Pending'
                    ? 'bg-yellow-500 text-white'
                    : newSchool.status === 'Suspended'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-500 text-white',
        };
        setSchools([...schools, schoolToAdd]);
        setIsAddModalOpen(false);
        setNewSchool({
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
            clinicalSites: 0,
            programs: 0,
            students: 0,
            activeRotations: 0,
            accountStatus: 'No Account',
            documentsStatus: 'Missing',
        });
        alert('School added successfully!');
    };

    // Handle Edit School Form Submission
    const handleEditSchool = (e) => {
        e.preventDefault();
        if (editSchool) {
            const updatedSchool = {
                ...editSchool,
                statusColor:
                    editSchool.status === 'Active'
                        ? 'bg-green-500 text-white'
                        : editSchool.status === 'Pending'
                        ? 'bg-yellow-500 text-white'
                        : editSchool.status === 'Suspended'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-500 text-white',
            };
            setSchools(
                schools.map((school) =>
                    school.id === updatedSchool.id ? updatedSchool : school
                )
            );
            setSelectedSchool(updatedSchool);
            setIsEditModalOpen(false);
            setEditSchool(null);
            alert('School updated successfully!');
        }
    };

    // Handle Suspend School (only for Active schools)
    const handleSuspendSchool = () => {
        if (selectedSchool && selectedSchool.status === 'Active') {
            if (
                window.confirm(
                    `Are you sure you want to suspend ${selectedSchool.name}?`
                )
            ) {
                const updatedSchool = {
                    ...selectedSchool,
                    status: 'Suspended',
                    statusColor: 'bg-red-500 text-white',
                };
                setSchools(
                    schools.map((school) =>
                        school.id === updatedSchool.id ? updatedSchool : school
                    )
                );
                setSelectedSchool(updatedSchool);
                alert(`${selectedSchool.name} has been suspended!`);
            }
        } else {
            alert('This school cannot be suspended.');
        }
    };

    // Handle Reactivate School (only for Suspended schools)
    const handleReactivateSchool = () => {
        if (selectedSchool && selectedSchool.status === 'Suspended') {
            if (
                window.confirm(
                    `Are you sure you want to reactivate ${selectedSchool.name}?`
                )
            ) {
                const updatedSchool = {
                    ...selectedSchool,
                    status: 'Active',
                    statusColor: 'bg-green-500 text-white',
                };
                setSchools(
                    schools.map((school) =>
                        school.id === updatedSchool.id ? updatedSchool : school
                    )
                );
                setSelectedSchool(updatedSchool);
                alert(`${selectedSchool.name} has been reactivated!`);
            }
        } else {
            alert('This school cannot be reactivated.');
        }
    };

    // Handle Create Account (opens popup and initializes username)
    const handleCreateAccount = () => {
        if (selectedSchool && selectedSchool.accountStatus === 'No Account') {
            setUsername(selectedSchool.name.toLowerCase().replace(/\s+/g, '')); // Initialize username
            setPassword(''); // Reset password
            setShowPassword(false); // Reset showPassword
            setIsAccountCreationOpen(true);
        }
    };

    // Handle Generate Password
    const handleGeneratePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let newPassword = '';
        for (let i = 0; i < 12; i++) {
            newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(newPassword);
    };

    // Handle Account Creation Submission
    const handleAccountCreationSubmit = ({ accountNumber, username, password }) => {
        if (selectedSchool && selectedSchool.accountStatus === 'No Account') {
            const updatedSchool = { 
                ...selectedSchool, 
                accountStatus: 'Account Created',
                accountNumber,
                username,
                lastLogin: null 
            };
            setSchools(schools.map((school) => (school.id === updatedSchool.id ? updatedSchool : school)));
            setSelectedSchool(updatedSchool);
            alert(`Account created for ${selectedSchool.name}!`);
            setIsAccountCreationOpen(false);
        }
    };

    // Pagination component
    const Pagination = () => {
        return (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(endIndex, filteredSchools.length)}</span> of{' '}
                            <span className="font-medium">{filteredSchools.length}</span> results
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                                        page === currentPage
                                            ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="px-4 py-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-xl sm:text-2xl font-bold text-indigo-900">
                            Schools Management
                        </h1>
                        <p className="text-sm text-gray-600">
                            Manage schools, students, and clinical rotations
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full sm:w-auto"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add School
                    </button>
                </div>
            </header>

            {/* Mobile Layout */}
            <div className="lg:hidden">
                {!showDetails ? (
                    <div className="px-4 py-4">
                        {/* Filters */}
                        <div className="flex flex-col space-y-2 mb-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <input
                                type="text"
                                placeholder="Search by school name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md flex-1"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md sm:w-40"
                            >
                                <option>All Statuses</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Suspended</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        {/* Schools Count */}
                        <div className="bg-indigo-900 text-white p-4 rounded-md mb-4">
                            <div className="text-center">
                                <span className="text-2xl font-bold">{filteredSchools.length}</span>
                                <p className="text-sm">Schools found</p>
                            </div>
                        </div>

                        {/* Schools List */}
                        <div className="space-y-3">
                            {currentSchools.map((school) => (
                                <div
                                    key={school.id}
                                    onClick={() => handleSchoolSelect(school)}
                                    className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                                            <div>
                                                <p className="font-medium text-gray-900">{school.name}</p>
                                                <p className="text-sm text-gray-500">{school.location}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${school.statusColor}`}>
                                            {school.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div>Students: {school.students}</div>
                                        <div>Programs: {school.programs}</div>
                                        <div>Clinical Sites: {school.clinicalSites}</div>
                                        <div>Rotations: {school.activeRotations}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && <Pagination />}
                    </div>
                ) : (
                    /* School Details for Mobile */
                    <div className="px-4 py-4">
                        {/* Back Button */}
                        <button
                            onClick={handleBackToList}
                            className="flex items-center text-indigo-600 mb-4"
                        >
                            <ChevronLeftIcon className="h-5 w-5 mr-1" />
                            Back to Schools
                        </button>

                        {/* School Header */}
                        <div className="bg-indigo-900 text-white p-4 rounded-t-lg">
                            <h2 className="text-lg font-bold">{selectedSchool.name}</h2>
                            <p className="text-sm opacity-90">
                                ID: {selectedSchool.id} · Created: {selectedSchool.created}
                            </p>
                        </div>

                        {/* School Details */}
                        <div className="bg-white p-4 border border-gray-200 rounded-b-lg">
                            <div className="space-y-4">
                                {/* Contact Information */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                                    <div className="text-sm space-y-1">
                                        <p>Contact: {selectedSchool.contactPerson}</p>
                                        <p>Email: {selectedSchool.email}</p>
                                        <p>Phone: {selectedSchool.phone}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Address</h3>
                                    <p className="text-sm">{selectedSchool.address}</p>
                                </div>

                                {/* Status */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Status</h3>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${selectedSchool.statusColor}`}>
                                        {selectedSchool.status}
                                    </span>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedSchool.status === 'Active'
                                            ? 'This school is active and in good standing.'
                                            : selectedSchool.status === 'Suspended'
                                            ? 'This school is suspended and cannot operate.'
                                            : selectedSchool.status === 'Pending'
                                            ? 'This school is pending approval.'
                                            : selectedSchool.status === 'Inactive'
                                            ? 'This school is inactive.'
                                            : ''}
                                    </p>
                                </div>

                                {/* Account Status */}
                                {selectedSchool.status === 'Active' && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Account Status</h3>
                                        <div className="text-sm space-y-1">
                                            <p>Account Number: {selectedSchool.accountNumber}</p>
                                            <p>Username: {selectedSchool.username}</p>
                                            <p>Status: <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500 text-white">{selectedSchool.accountStatus}</span></p>
                                            <p>Last Login: {selectedSchool.lastLogin}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Summary */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Summary</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <p>Clinical Sites: {selectedSchool.clinicalSites}</p>
                                        <p>Programs: {selectedSchool.programs}</p>
                                        <p>Students: {selectedSchool.students}</p>
                                        <p>Active Rotations: {selectedSchool.activeRotations}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-2">
                                {selectedSchool.accountStatus === 'No Account' && (
                                    <button
                                        onClick={handleCreateAccount}
                                        className="w-full px-4 py-2 text-sm text-green-600 bg-green-100 rounded-md hover:bg-green-200"
                                    >
                                        Create Account
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setEditSchool(selectedSchool);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="w-full flex items-center justify-center px-4 py-2 text-sm text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200"
                                >
                                    <PencilIcon className="h-4 w-4 mr-2" />
                                    Edit Details
                                </button>
                                {selectedSchool.status === 'Active' && (
                                    <button
                                        onClick={handleSuspendSchool}
                                        className="w-full flex items-center justify-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                                    >
                                        <NoSymbolIcon className="h-4 w-4 mr-2" />
                                        Suspend School
                                    </button>
                                )}
                                {selectedSchool.status === 'Suspended' && (
                                    <button
                                        onClick={handleReactivateSchool}
                                        className="w-full px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                                    >
                                        Reactivate School
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex px-6 py-4">
                {/* Left: Schools List */}
                <div className="w-1/3 pr-4">
                    {/* Filters */}
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search by school name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md w-60"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md w-40"
                        >
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Suspended</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    {/* Schools Heading */}
                    <div className="bg-indigo-900 text-white p-4 rounded-md mb-4 flex justify-between items-center">
                        <span className="flex gap-2 items-center text-center text-lg">
                            {filteredSchools.length}{' '}
                            <span className="text-3xl font-semibold">Schools</span> have been
                            found
                        </span>
                        <span className="text-sm">...</span>
                    </div>

                    {/* Schools List Container */}
                    <div className="space-y-1">
                        <ul className="space-y-1">
                            {currentSchools.map((school) => (
                                <li
                                    key={school.id}
                                    onClick={() => {
                                        console.log('Selected school:', school.name);
                                        setSelectedSchool(school);
                                    }}
                                    className={`flex items-center justify-between p-4 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 ${
                                        selectedSchool?.id === school.id ? 'border-indigo-600' : ''
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">{school.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {school.location}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full ${school.statusColor}`}
                                    >
                                        {school.status}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Pagination */}
                        {totalPages > 1 && <Pagination />}
                    </div>
                </div>

                {/* Right: Details (shown only if school selected) */}
                <div className="w-2/3 pl-4">
                    {selectedSchool ? (
                        <>
                            {/* Tabs */}
                            <div className="flex space-x-6 border-b border-gray-200 mb-4 overflow-x-auto">
                                <button className="pb-2 text-indigo-900 font-medium border-b-2 border-indigo-600 whitespace-nowrap">
                                    Details
                                </button>
                                <button className="pb-2 text-gray-500 whitespace-nowrap">Clinical Sites</button>
                                <button className="pb-2 text-gray-500 whitespace-nowrap">Programs</button>
                                <button className="pb-2 text-gray-500 whitespace-nowrap">Students</button>
                                <button className="pb-2 text-gray-500 whitespace-nowrap">Rotations</button>
                                <button className="pb-2 text-gray-500 whitespace-nowrap">Contracts</button>
                                <button className="pb-2 text-gray-500 whitespace-nowrap">Reports</button>
                            </div>

                            {/* School Header */}
                            <div className="bg-indigo-900 text-white p-4 rounded-t-md flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">{selectedSchool.name}</h2>
                                    <p className="text-sm">
                                        ID: {selectedSchool.id} · Created:{' '}
                                        {selectedSchool.created}
                                    </p>
                                </div>
                                <span className="text-sm">...</span>
                            </div>

                            {/* Details Content */}
                            <div className="bg-white p-6 border border-gray-200 rounded-b-md">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">
                                            Contact Information
                                        </h3>
                                        <p>Contact Person: {selectedSchool.contactPerson}</p>
                                        <p>Email: {selectedSchool.email}</p>
                                        <p>Phone: {selectedSchool.phone}</p>

                                        <h3 className="font-medium text-gray-900 mb-2 mt-6">Status</h3>
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${selectedSchool.statusColor}`}
                                        >
                                            {selectedSchool.status}
                                        </span>
                                        <p className="text-sm text-gray-500 mt-2">
                                            {selectedSchool.status === 'Active'
                                                ? 'This school is active and in good standing.'
                                                : selectedSchool.status === 'Suspended'
                                                ? 'This school is suspended and cannot operate.'
                                                : selectedSchool.status === 'Pending'
                                                ? 'This school is pending approval.'
                                                : selectedSchool.status === 'Inactive'
                                                ? 'This school is inactive.'
                                                : ''}
                                        </p>

                                        {selectedSchool.status === 'Active' && (
                                            <>
                                                <h3 className="font-medium text-gray-900 mb-2 mt-6">
                                                    Account Status
                                                </h3>
                                                <p>Account Number: {selectedSchool.accountNumber}</p>
                                                <p>Username: {selectedSchool.username}</p>
                                                <p>Status: <span className={`px-3 py-1 text-xs font-medium rounded-full bg-green-500 text-white`}>{selectedSchool.accountStatus}</span></p>
                                                <p>Last Login: {selectedSchool.lastLogin}</p>
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Address</h3>
                                        <p>{selectedSchool.address}</p>

                                        <h3 className="font-medium text-gray-900 mb-2 mt-6">Summary</h3>
                                        <p>Clinical Sites: {selectedSchool.clinicalSites}</p>
                                        <p>Programs: {selectedSchool.programs}</p>
                                        <p>Students: {selectedSchool.students}</p>
                                        <p>Active Rotations: {selectedSchool.activeRotations}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                                    {selectedSchool.accountStatus === 'No Account' && (
                                        <button
                                            onClick={handleCreateAccount}
                                            className="flex items-center justify-center px-4 py-2 text-sm text-green-600 bg-green-100 rounded-md hover:bg-green-200 w-full sm:w-auto"
                                        >
                                            Create Account
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setEditSchool(selectedSchool);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="flex items-center justify-center px-4 py-2 text-sm text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 w-full sm:w-auto"
                                    >
                                        <PencilIcon className="h-4 w-4 mr-2" />
                                        Edit Details
                                    </button>
                                    {selectedSchool.status === 'Active' && (
                                        <button
                                            onClick={handleSuspendSchool}
                                            className="flex items-center justify-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 w-full sm:w-auto"
                                        >
                                            <NoSymbolIcon className="h-4 w-4 mr-2" />
                                            Suspend School
                                        </button>
                                    )}
                                    {selectedSchool.status === 'Suspended' && (
                                        <button
                                            onClick={handleReactivateSchool}
                                            className="flex items-center justify-center px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 w-full sm:w-auto"
                                        >
                                            Reactivate School
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Select a school to view details
                        </div>
                    )}
                </div>
            </div>

            {/* Add School Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                            Add New School
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                            Enter the details for the new school. Required fields are marked
                            with an asterisk (*).
                        </p>

                        <form
                            onSubmit={handleAddSchool}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                            {/* School Name */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    School Name *
                                </label>
                                <input
                                    type="text"
                                    value={newSchool.name}
                                    onChange={(e) =>
                                        setNewSchool({ ...newSchool, name: e.target.value })
                                    }
                                    placeholder="Enter school name"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* Contact Person */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contact Person *
                                </label>
                                <input
                                    type="text"
                                    value={newSchool.contactPerson}
                                    onChange={(e) =>
                                        setNewSchool({
                                            ...newSchool,
                                            contactPerson: e.target.value,
                                        })
                                    }
                                    placeholder="Enter contact name"
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
                                    value={newSchool.phone}
                                    onChange={(e) =>
                                        setNewSchool({ ...newSchool, phone: e.target.value })
                                    }
                                    placeholder="(xxx) xxx-xxxx"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={newSchool.email}
                                    onChange={(e) =>
                                        setNewSchool({ ...newSchool, email: e.target.value })
                                    }
                                    placeholder="Enter email address"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    value={newSchool.address}
                                    onChange={(e) =>
                                        setNewSchool({ ...newSchool, address: e.target.value })
                                    }
                                    placeholder="Enter street address"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    value={newSchool.location}
                                    onChange={(e) =>
                                        setNewSchool({ ...newSchool, location: e.target.value })
                                    }
                                    placeholder="City, State"
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
                                    value={newSchool.status}
                                    onChange={(e) =>
                                        setNewSchool({ ...newSchool, status: e.target.value })
                                    }
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Suspended">Suspended</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full sm:w-auto"
                                >
                                    Add School
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit School Modal */}
            {isEditModalOpen && editSchool && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                            Edit School
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                            Update the details for the school. Required fields are marked with
                            an asterisk (*).
                        </p>

                        <form
                            onSubmit={handleEditSchool}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                            {/* School Name */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    School Name *
                                </label>
                                <input
                                    type="text"
                                    value={editSchool.name}
                                    onChange={(e) =>
                                        setEditSchool({ ...editSchool, name: e.target.value })
                                    }
                                    placeholder="Enter school name"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* Contact Person */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contact Person *
                                </label>
                                <input
                                    type="text"
                                    value={editSchool.contactPerson}
                                    onChange={(e) =>
                                        setEditSchool({
                                            ...editSchool,
                                            contactPerson: e.target.value,
                                        })
                                    }
                                    placeholder="Enter contact name"
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
                                    value={editSchool.phone}
                                    onChange={(e) =>
                                        setEditSchool({ ...editSchool, phone: e.target.value })
                                    }
                                    placeholder="(xxx) xxx-xxxx"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={editSchool.email}
                                    onChange={(e) =>
                                        setEditSchool({ ...editSchool, email: e.target.value })
                                    }
                                    placeholder="Enter email address"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    value={editSchool.address}
                                    onChange={(e) =>
                                        setEditSchool({ ...editSchool, address: e.target.value })
                                    }
                                    placeholder="Enter street address"
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    value={editSchool.location || ''}
                                    onChange={(e) =>
                                        setEditSchool({ ...editSchool, location: e.target.value })
                                    }
                                    placeholder="City, State"
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
                                    value={editSchool.status}
                                    onChange={(e) =>
                                        setEditSchool({ ...editSchool, status: e.target.value })
                                    }
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Suspended">Suspended</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full sm:w-auto"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Account Creation Popup */}
            {isAccountCreationOpen && selectedSchool && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-indigo-900">Create Account for {selectedSchool.name}</h3>
                            <span className="cursor-pointer text-2xl" onClick={() => setIsAccountCreationOpen(false)}>&times;</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Set up a new account for this school. An account number will be automatically generated, and you can customize the username and temporary password.</p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Account Number *</label>
                                <input type="text" value={`SCH-${new Date().getFullYear()}-001`} readOnly className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                                <small className="text-xs text-gray-500">Format: SCH-YYYY-XXX (School - Year - Sequential Number)</small>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username *</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                <small className="text-xs text-gray-500">suggested: {selectedSchool.name.toLowerCase().replace(/\s+/g, '')}</small>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Temporary Password *</label>
                                <div className="flex flex-col sm:flex-row gap-2 mt-1">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter temporary password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleGeneratePassword}
                                            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 whitespace-nowrap"
                                        >
                                            Generate
                                        </button>
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 whitespace-nowrap"
                                        >
                                            {showPassword ? 'Hide' : 'View'}
                                        </button>
                                    </div>
                                </div>
                                <small className="text-xs text-gray-500">Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.</small>
                            </div>
                            <div className="bg-green-50 p-3 rounded-md">
                                <h4 className="text-sm font-medium text-gray-900">Account Permissions</h4>
                                <ul className="text-sm text-gray-700 list-disc pl-5 mt-1">
                                    <li>Manage student enrollment and documentation</li>
                                    <li>Assign students to clinical rotations</li>
                                    <li>View and update school information</li>
                                    <li>Generate student progress reports</li>
                                    <li>Communicate with clinical sites</li>
                                    <li>Track graduation requirements</li>
                                </ul>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setIsAccountCreationOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleAccountCreationSubmit({ accountNumber: `SCH-${new Date().getFullYear()}-001`, username, password })}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full sm:w-auto"
                                >
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}