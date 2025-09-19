import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, Eye, ChevronLeft, ChevronRight, Building, RotateCw } from "lucide-react";

// Simplified mock data
const mockClinicalSites = [
	{
		id: "CS001",
		name: "USC Medical Center",
		alternateId: "USCMC-001",
		status: "Active",
		utilization: 85,
		location: "Los Angeles, CA",
		type: "Academic Medical Center",
		capacity: 120,
		currentStudents: 102,
		departments: ["Emergency Medicine", "Internal Medicine"],
		contactPerson: "Dr. Sarah Johnson",
		contactEmail: "sarah.johnson@uscmc.edu",
		contactPhone: "(213) 555-0123",
		address: "1500 San Pablo St, Los Angeles, CA 90033",
		accreditation: "Joint Commission",
		specialties: ["Trauma Center Level I", "Stroke Center"],
		schedule: {
			monday: { morning: { count: 2 }, evening: { count: 2 } },
			tuesday: { morning: { count: 3 }, evening: { count: 3 } },
			wednesday: { morning: { count: 3 }, evening: { count: 2 } },
			thursday: { morning: { count: 4 }, evening: { count: 3 } },
			friday: { morning: { count: 2 }, evening: { count: 1 } },
			saturday: { morning: { count: 1 }, evening: { count: 1 } },
			sunday: { morning: { count: 0 }, evening: { count: 0 } },
		},
		rotations: {
			monday: {
				morning: [
					{
						id: "ROT001",
						title: "Emergency Medicine",
						instructor: "Dr. Michael Chen",
						startTime: "7:00 AM",
						endTime: "3:00 PM",
						students: ["Sarah Williams", "John Davis"],
						department: "Emergency Medicine",
						maxStudents: 4,
						timeSlot: "morning",
					},
					{
						id: "ROT002",
						title: "Internal Medicine",
						instructor: "Dr. Lisa Thompson",
						startTime: "6:00 AM",
						endTime: "2:00 PM",
						students: ["Michael Brown"],
						department: "Internal Medicine",
						maxStudents: 5,
						timeSlot: "morning",
					},
				],
				evening: [
					{
						id: "ROT003",
						title: "Surgery Rotation",
						instructor: "Dr. Robert Garcia",
						startTime: "3:00 PM",
						endTime: "11:00 PM",
						students: ["David Wilson", "Amanda Foster"],
						department: "Surgery",
						maxStudents: 3,
						timeSlot: "evening",
					},
					{
						id: "ROT004",
						title: "Emergency Medicine",
						instructor: "Dr. Sarah Johnson",
						startTime: "4:00 PM",
						endTime: "12:00 AM",
						students: ["Rachel Green"],
						department: "Emergency Medicine",
						maxStudents: 4,
						timeSlot: "evening",
					},
				],
			},
			tuesday: { morning: [], evening: [] },
			wednesday: { morning: [], evening: [] },
			thursday: { morning: [], evening: [] },
			friday: { morning: [], evening: [] },
			saturday: { morning: [], evening: [] },
			sunday: { morning: [], evening: [] },
		},
	},
	{
		id: "CS002",
		name: "Children's Hospital LA",
		alternateId: "CHLA-002",
		status: "Active",
		utilization: 92,
		location: "Los Angeles, CA",
		type: "Pediatric Hospital",
		capacity: 80,
		currentStudents: 74,
		departments: ["Pediatric ICU", "NICU"],
		contactPerson: "Dr. Michael Rodriguez",
		contactEmail: "michael.rodriguez@chla.org",
		contactPhone: "(323) 555-0456",
		address: "4650 Sunset Blvd, Los Angeles, CA 90027",
		accreditation: "Joint Commission",
		specialties: ["Pediatric Trauma Center", "Children's Heart Center"],
		schedule: {
			monday: { morning: { count: 3 }, evening: { count: 2 } },
			tuesday: { morning: { count: 2 }, evening: { count: 2 } },
			wednesday: { morning: { count: 3 }, evening: { count: 3 } },
			thursday: { morning: { count: 2 }, evening: { count: 1 } },
			friday: { morning: { count: 2 }, evening: { count: 2 } },
			saturday: { morning: { count: 0 }, evening: { count: 0 } },
			sunday: { morning: { count: 0 }, evening: { count: 0 } },
		},
		rotations: {
			monday: {
				morning: [
					{
						id: "ROT101",
						title: "Pediatric ICU",
						instructor: "Dr. Maria Santos",
						startTime: "7:00 AM",
						endTime: "3:00 PM",
						students: ["Emma Johnson", "Lucas Brown"],
						department: "Pediatric ICU",
						maxStudents: 4,
						timeSlot: "morning",
					},
					{
						id: "ROT102",
						title: "NICU Rotation",
						instructor: "Dr. Jennifer Park",
						startTime: "6:00 AM",
						endTime: "2:00 PM",
						students: ["Oliver Wilson"],
						department: "NICU",
						maxStudents: 3,
						timeSlot: "morning",
					},
				],
				evening: [
					{
						id: "ROT104",
						title: "Pediatric Emergency",
						instructor: "Dr. Sarah Lee",
						startTime: "4:00 PM",
						endTime: "12:00 AM",
						students: ["Mason Thompson", "Charlotte Anderson"],
						department: "Pediatric Emergency",
						maxStudents: 4,
						timeSlot: "evening",
					},
				],
			},
			tuesday: { morning: [], evening: [] },
			wednesday: { morning: [], evening: [] },
			thursday: { morning: [], evening: [] },
			friday: { morning: [], evening: [] },
			saturday: { morning: [], evening: [] },
			sunday: { morning: [], evening: [] },
		},
	},
];

// UI Components with gray-100 borders
const Card = ({ children, className = "" }) => (
	<div className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>
		{children}
	</div>
);

const CardHeader = ({ children, className = "" }) => (
	<div className={`p-4 border-b border-gray-100 ${className}`}>
		{children}
	</div>
);

const CardContent = ({ children, className = "" }) => (
	<div className={`p-4 ${className}`}>{children}</div>
);

const Input = ({ className = "", ...props }) => (
	<input
		className={`w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
		{...props}
	/>
);

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
	const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";
	const variantClasses = {
		default: "bg-blue-600 text-white hover:bg-blue-700",
		outline: "border border-gray-100 bg-white hover:bg-gray-50",
		secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
	};
	const sizeClasses = {
		default: "h-10 py-2 px-4",
		sm: "h-9 px-3 text-sm",
		lg: "h-11 px-8",
		icon: "h-10 w-10",
	};

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

// Tab Navigation with gray-100 borders
const TabNavigation = ({ activeTab, onTabChange, tabs }) => (
	<div className="border-b border-gray-100">
		<div className="flex">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={`py-3 px-4 border-b-2 font-medium text-sm flex-1 text-center ${
						activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	</div>
);

// Schedule Scroller with reduced size and responsive behavior
const ScheduleScroller = ({ site }) => {
	const scrollRef = useRef(null);
	const [visibleCount, setVisibleCount] = useState(3);
	const GAP = 8;

	const days = [
		{ key: "sunday", label: "Sun" },
		{ key: "monday", label: "Mon" },
		{ key: "tuesday", label: "Tue" },
		{ key: "wednesday", label: "Wed" },
		{ key: "thursday", label: "Thu" },
		{ key: "friday", label: "Fri" },
		{ key: "saturday", label: "Sat" },
	];

	const rotations = site?.rotations || {};

	const getFirstRotation = (dayKey, slot) => {
		const list = rotations?.[dayKey]?.[slot];
		return Array.isArray(list) && list.length > 0 ? list[0] : null;
	};

	useEffect(() => {
		const measure = () => {
			const w = window.innerWidth;
			setVisibleCount(w >= 1280 ? 5 : w >= 1024 ? 4 : w >= 768 ? 3 : 2);
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);

	const step = 140;
	const scrollBy = (delta) => {
		const el = scrollRef.current;
		if (!el) return;
		el.scrollBy({ left: delta, behavior: "smooth" });
	};

	return (
		<div className="relative p-1">
			<div className="absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
				<Button type="button" size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow bg-white" onClick={() => scrollBy(-step)}>
					<ChevronLeft className="h-4 w-4" />
				</Button>
			</div>
			<div className="absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
				<Button type="button" size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow bg-white" onClick={() => scrollBy(step)}>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
			<div className="w-full overflow-hidden">
				<div ref={scrollRef} className="w-full overflow-x-auto">
					<div className="flex flex-nowrap gap-2 py-1.5 pr-1.5 min-w-max">
						{days.map((d) => {
							const am = getFirstRotation(d.key, "morning");
							const pm = getFirstRotation(d.key, "evening");
							const isEmpty = !am && !pm;
							return (
								<div key={d.key} className={`shrink-0 text-xs p-2 rounded border border-gray-100 w-[120px] ${isEmpty ? "bg-gray-100" : "bg-blue-50"}`}>
									<div className="font-medium mb-1 text-center">{d.label}</div>
									<div className="rounded bg-white/60 border border-gray-100 px-1.5 py-1 mb-1">
										<div className="text-[10px] truncate">{am ? `${am.startTime} - ${am.endTime}` : "—"}</div>
										<div className="text-[10px] truncate">{am?.title || ""}</div>
									</div>
									<div className="rounded bg-white/60 border border-gray-100 px-1.5 py-1">
										<div className="text-[10px] truncate">{pm ? `${pm.startTime} - ${pm.endTime}` : "—"}</div>
										<div className="text-[10px] truncate">{pm?.title || ""}</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

// Details Modal with gray-100 borders
const DetailsModal = ({ site, isOpen, onClose }) => {
	if (!isOpen || !site) return null;
	return (
		<div className="fixed inset-0  bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
				<div className="flex items-center justify-between p-5 border-b border-gray-100">
					<h2 className="text-lg font-semibold">{site.name} - Details</h2>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
						✕
					</button>
				</div>
				<div className="p-5 space-y-5">
					<div>
						<h3 className="text-base font-semibold mb-3">Overview</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<div>
									<span className="text-xs text-gray-500">Site Name</span>
									<p className="font-medium">{site.name}</p>
								</div>
								<div>
									<span className="text-xs text-gray-500">Site ID</span>
									<p className="font-medium">{site.alternateId}</p>
								</div>
								<div>
									<span className="text-xs text-gray-500">Status</span>
									<p className="font-medium">{site.status}</p>
								</div>
								<div>
									<span className="text-xs text-gray-500">Type</span>
									<p className="font-medium">{site.type}</p>
								</div>
							</div>
							<div className="space-y-3">
								<div>
									<span className="text-xs text-gray-500">Location</span>
									<p className="font-medium">{site.location}</p>
								</div>
								<div>
									<span className="text-xs text-gray-500">Address</span>
									<p className="font-medium">{site.address}</p>
								</div>
								<div>
									<span className="text-xs text-gray-500">Contact Person</span>
									<p className="font-medium">{site.contactPerson}</p>
								</div>
								<div>
									<span className="text-xs text-gray-500">Phone</span>
									<p className="font-medium">{site.contactPhone}</p>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h3 className="text-base font-semibold mb-3">Capacity & Utilization</h3>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div>
								<span className="text-xs text-gray-500">Total Capacity</span>
								<p className="font-medium">{site.capacity}</p>
							</div>
							<div>
								<span className="text-xs text-gray-500">Current Students</span>
								<p className="font-medium">{site.currentStudents}</p>
							</div>
							<div>
								<span className="text-xs text-gray-500">Utilization Rate</span>
								<p className="font-medium">{site.utilization}%</p>
							</div>
							<div>
								<span className="text-xs text-gray-500">Available Spots</span>
								<p className="font-medium">{site.capacity - site.currentStudents}</p>
							</div>
						</div>
					</div>
					<div>
						<h3 className="text-base font-semibold mb-3">Departments & Specialties</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<span className="text-xs text-gray-500">Departments</span>
								<p className="font-medium">{site.departments?.join(", ")}</p>
							</div>
							<div>
								<span className="text-xs text-gray-500">Specialties</span>
								<p className="font-medium">{site.specialties?.join(", ")}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-end p-5 border-t border-gray-100">
					<Button variant="outline" onClick={onClose}>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
};

// Add Clinical Site Modal
const AddSiteModal = ({ isOpen, onClose, onAdd }) => {
	const [formData, setFormData] = useState({
		name: "",
		alternateId: "",
		status: "Active",
		location: "",
		type: "",
		capacity: "",
		contactPerson: "",
		contactEmail: "",
		contactPhone: "",
		address: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onAdd(formData);
		setFormData({
			name: "",
			alternateId: "",
			status: "Active",
			location: "",
			type: "",
			capacity: "",
			contactPerson: "",
			contactEmail: "",
			contactPhone: "",
			address: "",
		});
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm  flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
				<div className="flex items-center justify-between p-5 border-b border-gray-100">
					<h2 className="text-lg font-semibold">Add Clinical Site</h2>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
						✕
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-5 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input name="name" placeholder="Site Name" value={formData.name} onChange={handleChange} required />
						<Input name="alternateId" placeholder="Alternate ID" value={formData.alternateId} onChange={handleChange} required />
						<Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
						<Input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
						<Input name="capacity" type="number" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required />
						<Input name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} onChange={handleChange} required />
						<Input name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required />
						<Input name="contactPhone" placeholder="Contact Phone" value={formData.contactPhone} onChange={handleChange} required />
					</div>
					<Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
					<div className="flex justify-end space-x-2">
						<Button variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Add Site</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

const PAGE_SIZE = 5;

const ClinicalSitesModule = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("all");
	const [selectedSite, setSelectedSite] = useState(null);
	const [showDetails, setShowDetails] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [sites, setSites] = useState(mockClinicalSites);
	const [page, setPage] = useState(1);

	const tabs = [
		{ id: "all", label: "All Sites", filter: () => true },
		{ id: "active", label: "Active", filter: (site) => site.status === "Active" },
		{ id: "under-review", label: "Under Review", filter: (site) => site.status === "Under Review" },
		{ id: "inactive", label: "Inactive", filter: (site) => site.status === "Inactive" },
	];

	const countWeekly = (site, slot) => {
		if (site?.rotations) return Object.values(site.rotations).reduce((sum, day) => sum + (day?.[slot]?.length || 0), 0);
		if (site?.schedule) return Object.values(site.schedule).reduce((sum, day) => sum + (day?.[slot]?.count || 0), 0);
		return 0;
	};

	const countOpenSlots = (site, slot) => {
		if (!site?.rotations) return 0;
		return Object.values(site.rotations).reduce((sum, day) => {
			const list = day?.[slot] || [];
			return sum + list.reduce((acc, rot) => acc + Math.max(0, (rot.maxStudents || 0) - (rot.students?.length || 0)), 0);
		}, 0);
	};

	// Filter and paginate data
	const filteredData = sites.filter((item) => {
		const activeTabConfig = tabs.find((tab) => tab.id === activeTab);
		const matchesTab = !activeTabConfig?.filter || activeTabConfig.filter(item);
		const matchesSearch =
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.alternateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(item.type && item.type.toLowerCase().includes(searchTerm.toLowerCase()));
		return matchesTab && matchesSearch;
	});

	const totalSites = filteredData.length;
	const totalRotationsScheduled = filteredData.reduce((sum, site) => sum + countWeekly(site, "morning") + countWeekly(site, "evening"), 0);

	// Pagination logic
	const pageCount = Math.ceil(filteredData.length / PAGE_SIZE);
	const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	useEffect(() => {
		setPage(1); // Reset to first page when filters/search change
	}, [searchTerm, activeTab, sites]);

	const handleViewDetails = (site) => {
		setSelectedSite(site);
		setShowDetails(true);
	};

	const handleAddSite = (newSite) => {
		setSites([
			...sites,
			{
				...newSite,
				id: `CS${sites.length + 1}`,
				utilization: 0,
				currentStudents: 0,
				departments: [],
				specialties: [],
				schedule: {},
				rotations: {},
			},
		]);
	};

	// Pagination controls
	const Pagination = () => (
		<div className="flex justify-center items-center gap-2 mt-4">
			<Button
				variant="outline"
				size="sm"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<span className="text-sm text-gray-600">
				Page {page} of {pageCount || 1}
			</span>
			<Button
				variant="outline"
				size="sm"
				disabled={page === pageCount || pageCount === 0}
				onClick={() => setPage(page + 1)}
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);

	return (
		<div className="space-y-4 p-4 md:p-6">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-xl md:text-2xl font-bold">Clinical Sites</h1>
					<p className="text-gray-600 mt-1 text-sm md:text-base">Manage and monitor clinical rotation sites and their capacity</p>
				</div>
				<div className="w-full sm:w-auto">
					<Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)}>
						<Plus className="h-4 w-4 mr-2" />
						Add Clinical Site
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardContent>
						<div className="flex items-center space-x-2">
							<Building className="h-5 w-5 text-gray-600" />
							<div>
								<div className="text-sm text-gray-600">Total clinical sites</div>
								<div className="text-2xl font-bold">{totalSites}</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div className="flex items-center space-x-2">
							<RotateCw className="h-5 w-5 text-gray-600" />
							<div>
								<div className="text-sm text-gray-600">Total rotations scheduled</div>
								<div className="text-2xl font-bold">{totalRotationsScheduled}</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="col-span-1 lg:col-span-2">
					<CardContent>
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input placeholder="Search clinical sites..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className="overflow-hidden">
				<TabNavigation activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
				<div className="p-4">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
						<h3 className="text-lg font-semibold">All Sites</h3>
						<span className="text-sm text-gray-600">{filteredData.length} items</span>
					</div>

					{/* DESKTOP: table */}
					<div className="hidden md:block">
						<div className="overflow-x-auto">
							<table className="w-full table-auto min-w-[600px]">
								<thead>
									<tr className="border-b border-gray-100">
										<th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Site</th>
										<th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Scheduled</th>
										<th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Availability</th>
										<th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">7-Day</th>
										<th className="text-left py-2 px-2 font-medium text-gray-600 text-xs">Actions</th>
									</tr>
								</thead>
								<tbody>
									{paginatedData.map((item) => {
										const am = countWeekly(item, "morning");
										const pm = countWeekly(item, "evening");
										const amOpen = countOpenSlots(item, "morning");
										const pmOpen = countOpenSlots(item, "evening");
										return (
											<tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 align-middle">
												<td className="py-1 px-2 align-middle">
													<div>
														<div className="font-medium text-gray-900 text-xs truncate">{item.name}</div>
														<div className="text-[10px] text-gray-600 truncate">
															{item.alternateId} • {item.location}
														</div>
														<div className="text-[10px] text-gray-500 truncate">{item.type}</div>
													</div>
												</td>
												<td className="py-1 px-2 text-center align-middle w-20">
													<div>
														<span className="text-base font-bold text-emerald-600">{am}</span>
														<span className="text-[9px] text-gray-500 block">morning</span>
														<span className="text-base font-bold text-amber-600">{pm}</span>
														<span className="text-[9px] text-gray-500 block">evening</span>
													</div>
												</td>
												<td className="py-1 px-2 text-center align-middle w-20">
													<div>
														<span className="text-base font-bold text-emerald-600">{amOpen}</span>
														<span className="text-[9px] text-gray-500 block">morning open</span>
														<span className="text-base font-bold text-amber-600">{pmOpen}</span>
														<span className="text-[9px] text-gray-500 block">evening open</span>
													</div>
												</td>
												<td className="py-1 px-2 align-middle min-w-[180px]">
													<ScheduleScroller site={item} />
												</td>
												<td className="py-1 px-2 align-middle">
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleViewDetails(item)}
														className="flex items-center gap-2"
													>
														<Eye className="h-4 w-4" />
														Details
													</Button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						{paginatedData.length === 0 && (
							<div className="text-center py-8">
								<p className="text-gray-500 text-sm">No items found.</p>
							</div>
						)}
						<Pagination />
					</div>

					{/* MOBILE: card list */}
					<div className="space-y-2 md:hidden">
						{paginatedData.map((item) => {
							const am = countWeekly(item, "morning");
							const pm = countWeekly(item, "evening");
							const amOpen = countOpenSlots(item, "morning");
							const pmOpen = countOpenSlots(item, "evening");
							return (
								<div key={item.id} className="bg-white border border-gray-100 rounded-lg p-2 shadow-sm">
									<div className="flex justify-between items-start">
										<div className="pr-2">
											<div className="font-medium text-gray-900 text-sm">{item.name}</div>
											<div className="text-xs text-gray-500">{item.alternateId} • {item.location}</div>
											<div className="text-xs text-gray-500 mt-1">{item.type}</div>
										</div>
										<div className="flex flex-col items-end text-right">
											<div className="text-xs text-gray-500">Scheduled</div>
											<div className="text-base font-bold text-emerald-600">{am + pm}</div>
											<div className="text-xs text-gray-500">rotations</div>
										</div>
									</div>
									<div className="mt-2 grid grid-cols-2 gap-2">
										<div className="text-center">
											<div className="text-xs text-gray-500">Morning Open</div>
											<div className="text-base font-bold text-emerald-600">{amOpen}</div>
										</div>
										<div className="text-center">
											<div className="text-xs text-gray-500">Evening Open</div>
											<div className="text-base font-bold text-amber-600">{pmOpen}</div>
										</div>
									</div>
									<div className="mt-2">
										<ScheduleScroller site={item} />
									</div>
									<div className="mt-2 flex justify-end gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleViewDetails(item)}
											className="flex items-center gap-2"
										>
											<Eye className="h-4 w-4" />
											Details
										</Button>
									</div>
								</div>
							);
						})}
						{paginatedData.length === 0 && (
							<div className="text-center py-8">
								<p className="text-gray-500 text-sm">No items found.</p>
							</div>
						)}
						<Pagination />
					</div>
				</div>
			</Card>

			<DetailsModal
				site={selectedSite}
				isOpen={showDetails}
				onClose={() => {
					setShowDetails(false);
					setSelectedSite(null);
				}}
			/>
			<AddSiteModal
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
				onAdd={handleAddSite}
			/>
		</div>
	);
};

export default ClinicalSitesModule;