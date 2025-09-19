import React, { useState } from 'react';
import {
    Building,
    Download,
    FileText,
    Mail,
    MapPin,
    MoreHorizontal,
    Phone,
    Search,
    User,
    FileDown,
    ChevronDown,
    CheckCircle2,
    Plus,
    Send,
    School,
    Eye,
    ExternalLink
} from 'lucide-react';

// Sample data
const schools = [
    {
        id: 1,
        name: "University of Medical Sciences",
        address: {
            street: "123 University Ave",
            city: "Boston",
            state: "MA",
            zip: "02115",
        },
        clinicalEducators: [
            {
                id: 101,
                name: "Dr. Sarah Johnson",
                title: "Clinical Education Director",
                email: "sjohnson@umedsci.edu",
                phone: "(617) 555-1234",
            },
            {
                id: 102,
                name: "Dr. Michael Chen",
                title: "Associate Director of Clinical Training",
                email: "mchen@umedsci.edu",
                phone: "(617) 555-2345",
            },
        ],
        contactPerson: {
            name: "Emily Rodriguez",
            title: "Program Coordinator",
            email: "erodriguez@umedsci.edu",
            phone: "(617) 555-3456",
        },
        documents: [
            { id: 1001, name: "Liability Insurance", type: "pdf", status: "Verified" },
            { id: 1002, name: "Accreditation Certificate", type: "pdf", status: "Verified" },
            { id: 1003, name: "Clinical Agreement", type: "pdf", status: "Verified" },
        ],
        programTypes: ["Nursing", "Physical Therapy", "Occupational Therapy"],
        status: "Active",
    },
    {
        id: 2,
        name: "Harvard Medical School",
        address: {
            street: "25 Shattuck St",
            city: "Boston",
            state: "MA",
            zip: "02115",
        },
        clinicalEducators: [
            {
                id: 201,
                name: "Dr. John Doe",
                title: "Clinical Director",
                email: "jdoe@harvard.edu",
                phone: "(617) 555-1111",
            },
        ],
        contactPerson: {
            name: "Jane Smith",
            title: "Coordinator",
            email: "jsmith@harvard.edu",
            phone: "(617) 555-2222",
        },
        documents: [
            { id: 2001, name: "Insurance", type: "pdf", status: "Verified" },
            { id: 2002, name: "Certificate", type: "pdf", status: "Pending" },
        ],
        programTypes: ["Medicine", "Surgery"],
        status: "Active",
    },
    {
        id: 3,
        name: "Stanford University School of Medicine",
        address: {
            street: "291 Campus Dr",
            city: "Stanford",
            state: "CA",
            zip: "94305",
        },
        clinicalEducators: [
            {
                id: 301,
                name: "Dr. Alice Brown",
                title: "Education Head",
                email: "abrown@stanford.edu",
                phone: "(650) 555-3333",
            },
        ],
        contactPerson: {
            name: "Bob Wilson",
            title: "Program Manager",
            email: "bwilson@stanford.edu",
            phone: "(650) 555-4444",
        },
        documents: [
            { id: 3001, name: "Agreement", type: "pdf", status: "Verified" },
        ],
        programTypes: ["Nursing", "Pharmacy"],
        status: "Review Required",
    },
    {
        id: 4,
        name: "Johns Hopkins School of Medicine",
        address: {
            street: "733 N Broadway",
            city: "Baltimore",
            state: "MD",
            zip: "21205",
        },
        clinicalEducators: [
            {
                id: 401,
                name: "Dr. Charlie Davis",
                title: "Clinical Supervisor",
                email: "cdavis@jh.edu",
                phone: "(410) 555-5555",
            },
        ],
        contactPerson: {
            name: "Diana Evans",
            title: "Coordinator",
            email: "devans@jh.edu",
            phone: "(410) 555-6666",
        },
        documents: [
            { id: 4001, name: "Insurance", type: "pdf", status: "Expired" },
        ],
        programTypes: ["Physical Therapy"],
        status: "Active",
    },
    {
        id: 5,
        name: "University of California, San Francisco",
        address: {
            street: "505 Parnassus Ave",
            city: "San Francisco",
            state: "CA",
            zip: "94143",
        },
        clinicalEducators: [
            {
                id: 501,
                name: "Dr. Eve Foster",
                title: "Director",
                email: "efoster@ucsf.edu",
                phone: "(415) 555-7777",
            },
        ],
        contactPerson: {
            name: "Frank Garcia",
            title: "Manager",
            email: "fgarcia@ucsf.edu",
            phone: "(415) 555-8888",
        },
        documents: [
            { id: 5001, name: "Certificate", type: "pdf", status: "Verified" },
            { id: 5002, name: "Agreement", type: "pdf", status: "Verified" },
        ],
        programTypes: ["Occupational Therapy", "Speech Therapy"],
        status: "Active",
    },
];

const availableDisciplines = [
    "Radiology (MRI, X-ray, US)",
    "Social Workers",
    "Surgical Technicians",
    "Respiratory Therapists",
    "Phlebotomists",
    "EMT",
    "CLS",
    "Nutritionists",
    "MDs/DOs",
    "Nurse Practitioners",
    "Registered Nurses",
    "Vocational Nurses",
    "Physician Assistants",
    "Certified Nursing Assistants",
    "Physical Therapists",
    "Occupational Therapists",
    "Speech Therapists",
    "Pharmacy",
];

const ApprovedSchools = () => {
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [inviteFormData, setInviteFormData] = useState({
        schoolName: "",
        firstName: "",
        lastName: "",
        contactEmail: "",
        contactPhone: "",
        message: "",
        inviteStudents: true,
        studentCount: "",
        disciplines: [],
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedSchoolDocuments, setSelectedSchoolDocuments] = useState(null);
    const [isSchoolDocumentDialogOpen, setIsSchoolDocumentDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [search, setSearch] = useState('');
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [openActionsId, setOpenActionsId] = useState(null);
    const [documentTab, setDocumentTab] = useState('all');

    const handleInputChange = (field, value) => {
        setInviteFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleDisciplineToggle = (discipline) => {
        setInviteFormData(prev => ({
            ...prev,
            disciplines: prev.disciplines.includes(discipline)
                ? prev.disciplines.filter(d => d !== discipline)
                : [...prev.disciplines, discipline]
        }));
    };

    const handleInviteSubmit = () => {
        console.log("Invitation submitted:", inviteFormData);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setIsInviteDialogOpen(false);
            setInviteFormData({
                schoolName: "",
                firstName: "",
                lastName: "",
                contactEmail: "",
                contactPhone: "",
                message: "",
                inviteStudents: true,
                studentCount: "",
                disciplines: [],
            });
        }, 2000);
    };

    let filteredSchools = schools;
    if (activeTab === 'active') {
        filteredSchools = filteredSchools.filter(s => s.status === 'Active');
    } else if (activeTab === 'review') {
        filteredSchools = filteredSchools.filter(s => s.status === 'Review Required');
    }
    if (search) {
        filteredSchools = filteredSchools.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    }

    let filteredDocuments = selectedSchoolDocuments || [];
    if (documentTab === 'verified') {
        filteredDocuments = filteredDocuments.filter(d => d.status === 'Verified');
    } else if (documentTab === 'pending') {
        filteredDocuments = filteredDocuments.filter(d => d.status === 'Pending');
    } else if (documentTab === 'expired') {
        filteredDocuments = filteredDocuments.filter(d => d.status === 'Expired');
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Review Required': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-red-100 text-red-800';
        }
    };

    const getDocStatusColor = (status) => {
        switch (status) {
            case 'Verified': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Expired': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-gray-100  p-9 font-sans  ">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Approved Schools</h1>
            <p className="text-sm text-gray-600 mb-6">Schools approved for clinical rotations at your facility</p>

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsInviteDialogOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Invite School
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Approved Schools</h3>
                    <div className="relative w-64">
                        <input
                            type="search"
                            placeholder="Search schools..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <nav className="flex space-x-6 px-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-2 text-sm font-medium ${activeTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        All Schools
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`pb-2 text-sm font-medium ${activeTab === 'active' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setActiveTab('review')}
                        className={`pb-2 text-sm font-medium ${activeTab === 'review' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Review Required
                    </button>
                </nav>

                <div className="overflow-y-auto min-h-[400px]">  {/* Changed: Removed overflow-x-auto, added overflow-y-auto and min-height for vertical scroll only */}
                    <table className="min-w-full divide-y divide-gray-200" style={{ tableLayout: 'fixed', width: '100%' }}>  {/* Added: table-layout fixed and width 100% */}
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '20%' }}>School Name</th>  {/* Added: width and reduced padding */}
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Address</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Clinical Educators</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>Contact Person</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '10%' }}>Programs</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '10%' }}>Documents</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '10%' }}>Status</th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '5%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSchools.map((school) => (
                                <tr key={school.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={school.name} style={{ width: '20%' }}>{school.name}</td>  {/* Added: truncate, title, width, reduced padding */}
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 truncate" title={`${school.address.street}, ${school.address.city}, ${school.address.state} ${school.address.zip}`} style={{ width: '15%' }}>
                                        <div className="flex items-center">
                                            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                            {`${school.address.street}, ${school.address.city}, ${school.address.state} ${school.address.zip}`}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500" style={{ width: '15%' }}>
                                        <div className="flex items-center relative group">
                                            <User className="h-5 w-5 text-gray-400 mr-2" />
                                            {school.clinicalEducators.length} Educators
                                            <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white rounded-md shadow-lg p-4 z-10 min-w-[250px] border border-gray-200">
                                                {school.clinicalEducators.map((educator) => (
                                                    <div key={educator.id} className="mb-4 last:mb-0">
                                                        <p className="text-sm font-medium text-gray-900">{educator.name}</p>
                                                        <p className="text-xs text-gray-500">{educator.title}</p>
                                                        <p className="text-xs flex items-center mt-1">
                                                            <Mail className="h-4 w-4 mr-1 text-gray-400" />
                                                            {educator.email}
                                                        </p>
                                                        <p className="text-xs flex items-center mt-1">
                                                            <Phone className="h-4 w-4 mr-1 text-gray-400" />
                                                            {educator.phone}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500" style={{ width: '15%' }}>
                                        <p className="text-sm font-medium text-gray-900 truncate" title={school.contactPerson.name}>{school.contactPerson.name}</p>
                                        <p className="text-xs text-gray-500 truncate" title={school.contactPerson.title}>{school.contactPerson.title}</p>
                                        <p className="text-xs flex items-center mt-1 truncate" title={school.contactPerson.email}>
                                            <Mail className="h-4 w-4 mr-1 text-gray-400" />
                                            {school.contactPerson.email}
                                        </p>
                                        <p className="text-xs flex items-center mt-1 truncate" title={school.contactPerson.phone}>
                                            <Phone className="h-4 w-4 mr-1 text-gray-400" />
                                            {school.contactPerson.phone}
                                        </p>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-500" style={{ width: '10%' }}>
                                        <div className="flex flex-wrap gap-1">
                                            {school.programTypes.map((program) => (
                                                <span key={program} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                    {program}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-500" style={{ width: '10%' }}>
                                        <div className="flex items-center gap-2">
                                            <div className="relative group">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                                    {school.documents.length} Documents
                                                </span>
                                                <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white rounded-md shadow-lg p-4 z-10 min-w-[250px] border border-gray-200">
                                                    <p className="text-sm font-medium text-gray-900 mb-2">Required Documents:</p>
                                                    <ul className="space-y-2">
                                                        {school.documents.map((doc) => (
                                                            <li key={doc.id} className="flex justify-between items-center text-sm">
                                                                <span>{doc.name}</span>
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocStatusColor(doc.status)}`}>
                                                                    {doc.status}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenDropdownId(openDropdownId === school.id ? null : school.id)}
                                                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <Download className="h-4 w-4 mr-2 text-gray-500" />
                                                    Download
                                                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                                                </button>
                                                {openDropdownId === school.id && (
                                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => console.log('Download all')}
                                                                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                <FileDown className="h-4 w-4 mr-3 text-gray-400" />
                                                                Download All Documents
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedSchoolDocuments(school.documents);
                                                                    setIsSchoolDocumentDialogOpen(true);
                                                                    setOpenDropdownId(null);
                                                                }}
                                                                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                <Eye className="h-4 w-4 mr-3 text-gray-400" />
                                                                View Documents
                                                            </button>
                                                        </div>
                                                        <div className="border-t border-gray-100"></div>
                                                        <div className="py-1">
                                                            {school.documents.map((doc) => (
                                                                <button
                                                                    key={doc.id}
                                                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                >
                                                                    <CheckCircle2 className={`h-4 w-4 mr-3 ${doc.status === 'Verified' ? 'text-green-500' : doc.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`} />
                                                                    {doc.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium" style={{ width: '10%' }}>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(school.status)}`}>
                                            {school.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium" style={{ width: '5%' }}>
                                        <div className="relative inline-block text-left">
                                            <button
                                                onClick={() => setOpenActionsId(openActionsId === school.id ? null : school.id)}
                                                className="inline-flex justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                            {openActionsId === school.id && (
                                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                    <div className="py-1">
                                                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            <FileText className="h-5 w-5 mr-3 text-gray-400" />
                                                            View Details
                                                        </button>
                                                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            <Building className="h-5 w-5 mr-3 text-gray-400" />
                                                            View Programs
                                                        </button>
                                                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            <User className="h-5 w-5 mr-3 text-gray-400" />
                                                            Contact School
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invite Dialog */}
            {isInviteDialogOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto h-full w-full flex items-center justify-center bg-black bg-opacity-60">
                    <div className="relative bg-white rounded-lg shadow-2xl border border-gray-200 max-w-2xl w-full mx-4 p-8">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <School className="h-5 w-5 mr-2 text-indigo-600" />
                                Invite School for Clinical Rotations
                            </h3>
                            <button
                                onClick={() => setIsInviteDialogOpen(false)}
                                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Send an invitation to a school to participate in clinical rotations at your facility.</p>
                        {showSuccess ? (
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800">Invitation sent</h3>
                                        <div className="mt-2 text-sm text-green-700">
                                            <p>Your invitation has been sent successfully.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form className="space-y-8">
                                <div>
                                    <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">School Name</label>
                                    <div className="mt-1">
                                        <input
                                            id="schoolName"
                                            name="schoolName"
                                            type="text"
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors duration-200"
                                            value={inviteFormData.schoolName}
                                            onChange={(e) => handleInputChange('schoolName', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <div className="mt-1">
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={inviteFormData.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <div className="mt-1">
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={inviteFormData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Email</label>
                                        <div className="mt-1">
                                            <input
                                                id="contactEmail"
                                                name="contactEmail"
                                                type="email"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={inviteFormData.contactEmail}
                                                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Phone</label>
                                        <div className="mt-1">
                                            <input
                                                id="contactPhone"
                                                name="contactPhone"
                                                type="tel"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={inviteFormData.contactPhone}
                                                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Invitation Message</label>
                                    <div className="mt-1">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            value={inviteFormData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="inviteStudents"
                                        name="inviteStudents"
                                        type="checkbox"
                                        checked={inviteFormData.inviteStudents}
                                        onChange={(e) => handleInputChange('inviteStudents', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="inviteStudents" className="ml-2 block text-sm text-gray-900">
                                        Include Student Invitations
                                    </label>
                                </div>
                                {inviteFormData.inviteStudents && (
                                    <>
                                        <div>
                                            <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700">Maximum Number of Students</label>
                                            <div className="mt-1">
                                                <input
                                                    id="studentCount"
                                                    name="studentCount"
                                                    type="number"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    value={inviteFormData.studentCount}
                                                    onChange={(e) => handleInputChange('studentCount', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="block text-sm font-medium text-gray-700 mb-2">Available Disciplines</p>
                                            <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto space-y-4">
                                                {availableDisciplines.map((discipline) => (
                                                    <div key={discipline} className="flex items-center">
                                                        <input
                                                            id={discipline}
                                                            type="checkbox"
                                                            checked={inviteFormData.disciplines.includes(discipline)}
                                                            onChange={() => handleDisciplineToggle(discipline)}
                                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor={discipline} className="ml-2 text-sm text-gray-900">
                                                            {discipline}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Preview Email</p>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p><strong>To:</strong> {inviteFormData.contactEmail || "recipient@school.edu"}</p>
                                        <p><strong>Subject:</strong> Invitation to Clinical Rotation Program at SHIFTit</p>
                                        <hr className="my-2" />
                                        <p>Dear {inviteFormData.firstName || "Program Director"} {inviteFormData.lastName || ""},</p>
                                        <p>We would like to invite {inviteFormData.schoolName || "your institution"} to participate in our clinical rotation program at SHIFTit.</p>
                                        <p>{inviteFormData.message}</p>
                                        <p>Please click the link below to accept this invitation and set up your account.</p>
                                        <p className="text-indigo-600">[Accept Invitation Link]</p>
                                    </div>
                                </div>
                            </form>
                        )}

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                onClick={() => setIsInviteDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                onClick={handleInviteSubmit}
                            >
                                <Send className="h-5 w-5 mr-2 inline" />
                                Send Invitation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Document Dialog */}
            {isSchoolDocumentDialogOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto h-full w-full flex items-center justify-center bg-black bg-opacity-60">
                    <div className="relative bg-white rounded-lg shadow-2xl border border-gray-200 max-w-4xl w-full mx-4 p-8">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">School Documentation</h3>
                            <button
                                onClick={() => setIsSchoolDocumentDialogOpen(false)}
                                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">View and verify school documentation for clinical rotations</p>

                        <nav className="flex space-x-6 border-b border-gray-200 mb-6">
                            <button
                                onClick={() => setDocumentTab('all')}
                                className={`pb-2 text-sm font-medium ${documentTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                All Documents
                            </button>
                            <button
                                onClick={() => setDocumentTab('verified')}
                                className={`pb-2 text-sm font-medium ${documentTab === 'verified' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                Verified
                            </button>
                            <button
                                onClick={() => setDocumentTab('pending')}
                                className={`pb-2 text-sm font-medium ${documentTab === 'pending' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setDocumentTab('expired')}
                                className={`pb-2 text-sm font-medium ${documentTab === 'expired' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                Expired
                            </button>
                        </nav>

                        <div className="space-y-6">
                            {filteredDocuments.map((doc) => (
                                <div key={doc.id} className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
                                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                                            <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                                            {doc.name}
                                        </h4>
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getDocStatusColor(doc.status)}`}>
                                            {doc.status}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-center">
                                            <div>
                                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                                <p className="text-sm text-gray-500">PDF Document</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-gray-500">
                                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                                            <div className="flex space-x-3">
                                                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                                    <Download className="h-4 w-4 mr-2 -ml-1 text-gray-400" />
                                                    Download
                                                </button>
                                                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                                    <ExternalLink className="h-4 w-4 mr-2 -ml-1 text-gray-400" />
                                                    Open
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApprovedSchools;