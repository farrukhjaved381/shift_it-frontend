import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Users,
  Building,
  Stethoscope,
  Microscope,
  Pill,
  HeartPulse,
  Brain,
  Baby,
  Scissors,
  Bone,
  Eye,
  Ear,
  Activity,
  Thermometer,
  Radiation,
  FlaskConical,
  Syringe,
  Utensils,
  Briefcase,
  DollarSign,
  ShieldCheck,
  HardHat,
  Trash2,
  Edit,
  Info,
} from "lucide-react";

export default function DepartmentStructures({ onNavigateBack }) {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("clinical");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    type: "clinical",
    description: "",
    staffCount: 0,
    parentId: "",
  });

  // Department data
  const [departments, setDepartments] = useState([
    // Clinical Departments
    {
      id: "emergency",
      name: "Emergency Department",
      type: "clinical",
      description: "Provides immediate care for acute illnesses and injuries",
      staffCount: 120,
      icon: <HeartPulse />,
      color: "text-red-500",
    },
    {
      id: "internal-medicine",
      name: "Internal Medicine",
      type: "clinical",
      description: "Diagnosis and treatment of adult diseases",
      staffCount: 85,
      icon: <Stethoscope />,
      color: "text-blue-500",
    },
    {
      id: "surgery",
      name: "Surgery",
      type: "clinical",
      description: "Surgical procedures and perioperative care",
      staffCount: 95,
      icon: <Scissors />,
      color: "text-purple-500",
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      type: "clinical",
      description: "Medical care for infants, children, and adolescents",
      staffCount: 65,
      icon: <Baby />,
      color: "text-green-500",
    },
    {
      id: "obstetrics",
      name: "Obstetrics & Gynecology",
      type: "clinical",
      description: "Women's health, pregnancy, and childbirth",
      staffCount: 55,
      icon: <Baby />,
      color: "text-pink-500",
    },
    {
      id: "cardiology",
      name: "Cardiology",
      type: "clinical",
      description: "Diagnosis and treatment of heart disorders",
      staffCount: 45,
      parentId: "internal-medicine",
      icon: <Activity />,
      color: "text-red-600",
    },
    {
      id: "neurology",
      name: "Neurology",
      type: "clinical",
      description: "Disorders of the nervous system",
      staffCount: 40,
      parentId: "internal-medicine",
      icon: <Brain />,
      color: "text-indigo-500",
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      type: "clinical",
      description: "Musculoskeletal system disorders",
      staffCount: 50,
      icon: <Bone />,
      color: "text-amber-600",
    },
    {
      id: "ophthalmology",
      name: "Ophthalmology",
      type: "clinical",
      description: "Eye care and vision health",
      staffCount: 25,
      icon: <Eye />,
      color: "text-cyan-500",
    },
    {
      id: "ent",
      name: "Otolaryngology (ENT)",
      type: "clinical",
      description: "Ear, nose, and throat disorders",
      staffCount: 30,
      icon: <Ear />,
      color: "text-orange-500",
    },
    {
      id: "dermatology",
      name: "Dermatology",
      type: "clinical",
      description: "Skin disorders and treatments",
      staffCount: 20,
      icon: <Thermometer />,
      color: "text-rose-400",
    },
    {
      id: "psychiatry",
      name: "Psychiatry",
      type: "clinical",
      description: "Mental health disorders and treatment",
      staffCount: 35,
      icon: <Brain />,
      color: "text-violet-500",
    },
    {
      id: "icu",
      name: "Intensive Care Unit (ICU)",
      type: "clinical",
      description: "Critical care for severely ill patients",
      staffCount: 75,
      icon: <Activity />,
      color: "text-red-700",
    },
    {
      id: "nicu",
      name: "Neonatal ICU",
      type: "clinical",
      description: "Intensive care for newborns",
      staffCount: 45,
      parentId: "pediatrics",
      icon: <Baby />,
      color: "text-blue-400",
    },
    {
      id: "oncology",
      name: "Oncology",
      type: "clinical",
      description: "Cancer diagnosis and treatment",
      staffCount: 60,
      icon: <Radiation />,
      color: "text-purple-600",
    },
    {
      id: "urology",
      name: "Urology",
      type: "clinical",
      description: "Urinary tract and male reproductive system",
      staffCount: 25,
      icon: <FlaskConical />,
      color: "text-yellow-500",
    },
    {
      id: "nephrology",
      name: "Nephrology",
      type: "clinical",
      description: "Kidney function and diseases",
      staffCount: 20,
      parentId: "internal-medicine",
      icon: <FlaskConical />,
      color: "text-blue-600",
    },
    {
      id: "endocrinology",
      name: "Endocrinology",
      type: "clinical",
      description: "Hormone-related disorders",
      staffCount: 15,
      parentId: "internal-medicine",
      icon: <Activity />,
      color: "text-green-600",
    },
    {
      id: "gastroenterology",
      name: "Gastroenterology",
      type: "clinical",
      description: "Digestive system disorders",
      staffCount: 25,
      parentId: "internal-medicine",
      icon: <Utensils />,
      color: "text-amber-500",
    },
    {
      id: "pulmonology",
      name: "Pulmonology",
      type: "clinical",
      description: "Respiratory system disorders",
      staffCount: 20,
      parentId: "internal-medicine",
      icon: <Activity />,
      color: "text-blue-500",
    },
    {
      id: "rheumatology",
      name: "Rheumatology",
      type: "clinical",
      description: "Autoimmune and inflammatory disorders",
      staffCount: 15,
      parentId: "internal-medicine",
      icon: <Bone />,
      color: "text-purple-400",
    },
    {
      id: "hematology",
      name: "Hematology",
      type: "clinical",
      description: "Blood disorders",
      staffCount: 20,
      parentId: "internal-medicine",
      icon: <Activity />,
      color: "text-red-500",
    },
    {
      id: "infectious-disease",
      name: "Infectious Disease",
      type: "clinical",
      description: "Infections and communicable diseases",
      staffCount: 25,
      parentId: "internal-medicine",
      icon: <Microscope />,
      color: "text-green-500",
    },
    {
      id: "general-surgery",
      name: "General Surgery",
      type: "clinical",
      description: "Common surgical procedures",
      staffCount: 40,
      parentId: "surgery",
      icon: <Scissors />,
      color: "text-purple-500",
    },
    {
      id: "neurosurgery",
      name: "Neurosurgery",
      type: "clinical",
      description: "Surgical treatment of nervous system disorders",
      staffCount: 25,
      parentId: "surgery",
      icon: <Brain />,
      color: "text-indigo-600",
    },
    {
      id: "cardiac-surgery",
      name: "Cardiac Surgery",
      type: "clinical",
      description: "Heart and major blood vessel surgery",
      staffCount: 30,
      parentId: "surgery",
      icon: <Activity />,
      color: "text-red-600",
    },
    {
      id: "plastic-surgery",
      name: "Plastic Surgery",
      type: "clinical",
      description: "Reconstructive and cosmetic procedures",
      staffCount: 15,
      parentId: "surgery",
      icon: <Scissors />,
      color: "text-pink-500",
    },
    {
      id: "vascular-surgery",
      name: "Vascular Surgery",
      type: "clinical",
      description: "Blood vessel disorders and surgery",
      staffCount: 20,
      parentId: "surgery",
      icon: <Activity />,
      color: "text-blue-600",
    },
    {
      id: "trauma-surgery",
      name: "Trauma Surgery",
      type: "clinical",
      description: "Surgical care for traumatic injuries",
      staffCount: 35,
      parentId: "surgery",
      icon: <Scissors />,
      color: "text-red-700",
    },

    // Diagnostic Departments
    {
      id: "radiology",
      name: "Radiology",
      type: "diagnostic",
      description: "Medical imaging and diagnostics",
      staffCount: 55,
      icon: <Radiation />,
      color: "text-blue-600",
    },
    {
      id: "laboratory",
      name: "Clinical Laboratory",
      type: "diagnostic",
      description: "Laboratory testing and analysis",
      staffCount: 70,
      icon: <FlaskConical />,
      color: "text-green-600",
    },
    {
      id: "pathology",
      name: "Pathology",
      type: "diagnostic",
      description: "Disease diagnosis through tissue examination",
      staffCount: 30,
      icon: <Microscope />,
      color: "text-purple-600",
    },
    {
      id: "nuclear-medicine",
      name: "Nuclear Medicine",
      type: "diagnostic",
      description: "Diagnostic imaging using radioactive materials",
      staffCount: 20,
      parentId: "radiology",
      icon: <Radiation />,
      color: "text-blue-500",
    },
    {
      id: "ultrasound",
      name: "Ultrasound",
      type: "diagnostic",
      description: "Diagnostic imaging using sound waves",
      staffCount: 15,
      parentId: "radiology",
      icon: <Radiation />,
      color: "text-cyan-500",
    },
    {
      id: "ct-scan",
      name: "CT Scan",
      type: "diagnostic",
      description: "Computed tomography imaging",
      staffCount: 20,
      parentId: "radiology",
      icon: <Radiation />,
      color: "text-indigo-500",
    },
    {
      id: "mri",
      name: "MRI",
      type: "diagnostic",
      description: "Magnetic resonance imaging",
      staffCount: 25,
      parentId: "radiology",
      icon: <Radiation />,
      color: "text-purple-500",
    },
    {
      id: "hematology-lab",
      name: "Hematology Lab",
      type: "diagnostic",
      description: "Blood testing and analysis",
      staffCount: 20,
      parentId: "laboratory",
      icon: <FlaskConical />,
      color: "text-red-500",
    },
    {
      id: "microbiology",
      name: "Microbiology",
      type: "diagnostic",
      description: "Identification of microorganisms",
      staffCount: 25,
      parentId: "laboratory",
      icon: <Microscope />,
      color: "text-green-500",
    },
    {
      id: "biochemistry",
      name: "Biochemistry",
      type: "diagnostic",
      description: "Chemical analysis of body fluids",
      staffCount: 20,
      parentId: "laboratory",
      icon: <FlaskConical />,
      color: "text-amber-500",
    },
    {
      id: "histopathology",
      name: "Histopathology",
      type: "diagnostic",
      description: "Microscopic tissue examination",
      staffCount: 15,
      parentId: "pathology",
      icon: <Microscope />,
      color: "text-purple-600",
    },
    {
      id: "cytopathology",
      name: "Cytopathology",
      type: "diagnostic",
      description: "Cellular examination for disease",
      staffCount: 10,
      parentId: "pathology",
      icon: <Microscope />,
      color: "text-indigo-500",
    },

    // Support Services
    {
      id: "pharmacy",
      name: "Pharmacy",
      type: "support",
      description: "Medication management and dispensing",
      staffCount: 45,
      icon: <Pill />,
      color: "text-green-600",
    },
    {
      id: "physical-therapy",
      name: "Physical Therapy",
      type: "support",
      description: "Rehabilitation services",
      staffCount: 35,
      icon: <Activity />,
      color: "text-blue-500",
    },
    {
      id: "occupational-therapy",
      name: "Occupational Therapy",
      type: "support",
      description: "Functional ability improvement",
      staffCount: 25,
      icon: <Activity />,
      color: "text-purple-500",
    },
    {
      id: "respiratory-therapy",
      name: "Respiratory Therapy",
      type: "support",
      description: "Breathing and respiratory care",
      staffCount: 30,
      icon: <Activity />,
      color: "text-cyan-500",
    },
    {
      id: "nutrition",
      name: "Nutrition Services",
      type: "support",
      description: "Dietary planning and nutritional support",
      staffCount: 40,
      icon: <Utensils />,
      color: "text-amber-500",
    },
    {
      id: "social-services",
      name: "Social Services",
      type: "support",
      description: "Patient advocacy and support",
      staffCount: 20,
      icon: <Users />,
      color: "text-indigo-500",
    },
    {
      id: "blood-bank",
      name: "Blood Bank",
      type: "support",
      description: "Blood collection, testing, and storage",
      staffCount: 15,
      icon: <FlaskConical />,
      color: "text-red-600",
    },
    {
      id: "central-sterile",
      name: "Central Sterile Supply",
      type: "support",
      description: "Sterilization of medical equipment",
      staffCount: 25,
      icon: <Syringe />,
      color: "text-blue-600",
    },
    {
      id: "inpatient-pharmacy",
      name: "Inpatient Pharmacy",
      type: "support",
      description: "Medication for hospitalized patients",
      staffCount: 25,
      parentId: "pharmacy",
      icon: <Pill />,
      color: "text-green-600",
    },
    {
      id: "outpatient-pharmacy",
      name: "Outpatient Pharmacy",
      type: "support",
      description: "Medication for non-hospitalized patients",
      staffCount: 20,
      parentId: "pharmacy",
      icon: <Pill />,
      color: "text-green-500",
    },
    {
      id: "speech-therapy",
      name: "Speech Therapy",
      type: "support",
      description: "Communication and swallowing disorders",
      staffCount: 15,
      icon: <Activity />,
      color: "text-orange-500",
    },

    // Administrative Departments
    {
      id: "administration",
      name: "Hospital Administration",
      type: "administrative",
      description: "Executive leadership and management",
      staffCount: 25,
      icon: <Briefcase />,
      color: "text-blue-700",
    },
    {
      id: "hr",
      name: "Human Resources",
      type: "administrative",
      description: "Personnel management and recruitment",
      staffCount: 30,
      icon: <Users />,
      color: "text-purple-600",
    },
    {
      id: "finance",
      name: "Finance",
      type: "administrative",
      description: "Financial management and accounting",
      staffCount: 35,
      icon: <DollarSign />,
      color: "text-green-700",
    },
    {
      id: "it",
      name: "Information Technology",
      type: "administrative",
      description: "Technology infrastructure and support",
      staffCount: 40,
      icon: <Briefcase />,
      color: "text-blue-600",
    },
    {
      id: "medical-records",
      name: "Medical Records",
      type: "administrative",
      description: "Patient health information management",
      staffCount: 25,
      icon: <Briefcase />,
      color: "text-amber-600",
    },
    {
      id: "quality",
      name: "Quality & Safety",
      type: "administrative",
      description: "Quality assurance and patient safety",
      staffCount: 20,
      icon: <ShieldCheck />,
      color: "text-green-600",
    },
    {
      id: "admissions",
      name: "Admissions",
      type: "administrative",
      description: "Patient intake and registration",
      staffCount: 30,
      icon: <Users />,
      color: "text-blue-500",
    },
    {
      id: "billing",
      name: "Billing & Coding",
      type: "administrative",
      description: "Patient billing and insurance claims",
      staffCount: 35,
      parentId: "finance",
      icon: <DollarSign />,
      color: "text-green-600",
    },
    {
      id: "facilities",
      name: "Facilities Management",
      type: "administrative",
      description: "Building maintenance and operations",
      staffCount: 45,
      icon: <HardHat />,
      color: "text-amber-700",
    },
    {
      id: "security",
      name: "Security",
      type: "administrative",
      description: "Hospital safety and security",
      staffCount: 30,
      icon: <ShieldCheck />,
      color: "text-red-600",
    },
    {
      id: "purchasing",
      name: "Purchasing & Supply Chain",
      type: "administrative",
      description: "Procurement and inventory management",
      staffCount: 25,
      parentId: "finance",
      icon: <DollarSign />,
      color: "text-blue-600",
    },
    {
      id: "compliance",
      name: "Compliance",
      type: "administrative",
      description: "Regulatory compliance and risk management",
      staffCount: 15,
      icon: <ShieldCheck />,
      color: "text-purple-600",
    },

    // Specialty Centers
    {
      id: "trauma-center",
      name: "Trauma Center",
      type: "specialty",
      description: "Specialized care for traumatic injuries",
      staffCount: 65,
      icon: <HeartPulse />,
      color: "text-red-600",
    },
    {
      id: "cancer-center",
      name: "Cancer Center",
      type: "specialty",
      description: "Comprehensive cancer care",
      staffCount: 75,
      icon: <Radiation />,
      color: "text-purple-600",
    },
    {
      id: "heart-center",
      name: "Heart & Vascular Center",
      type: "specialty",
      description: "Cardiovascular care and treatment",
      staffCount: 70,
      icon: <Activity />,
      color: "text-red-500",
    },
    {
      id: "womens-center",
      name: "Women's Health Center",
      type: "specialty",
      description: "Specialized care for women",
      staffCount: 55,
      icon: <Users />,
      color: "text-pink-500",
    },
    {
      id: "childrens-center",
      name: "Children's Hospital",
      type: "specialty",
      description: "Specialized pediatric care",
      staffCount: 85,
      icon: <Baby />,
      color: "text-blue-500",
    },
    {
      id: "behavioral-health",
      name: "Behavioral Health Center",
      type: "specialty",
      description: "Mental health and addiction services",
      staffCount: 60,
      icon: <Brain />,
      color: "text-indigo-600",
    },
    {
      id: "rehab-center",
      name: "Rehabilitation Center",
      type: "specialty",
      description: "Comprehensive rehabilitation services",
      staffCount: 50,
      icon: <Activity />,
      color: "text-green-600",
    },
    {
      id: "transplant-center",
      name: "Transplant Center",
      type: "specialty",
      description: "Organ transplantation services",
      staffCount: 45,
      icon: <HeartPulse />,
      color: "text-purple-500",
    },
    {
      id: "stroke-center",
      name: "Stroke Center",
      type: "specialty",
      description: "Specialized stroke care and treatment",
      staffCount: 40,
      icon: <Brain />,
      color: "text-blue-600",
    },
  ]);

  // Filter departments by type and search query
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.type === activeTab &&
      (searchQuery === "" ||
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Get parent departments (those without a parentId)
  const parentDepartments = filteredDepartments.filter((dept) => !dept.parentId);

  // Get child departments for a given parent
  const getChildDepartments = (parentId) => {
    return filteredDepartments.filter((dept) => dept.parentId === parentId);
  };

  // Get all departments for dropdown
  const allDepartmentsByType = (type) => {
    return departments.filter((dept) => dept.type === type && !dept.parentId);
  };

  // Handle adding a new department
  const handleAddDepartment = () => {
    if (newDepartment.name && newDepartment.description) {
      // Generate a unique ID based on the department name and timestamp
      const uniqueId = `${newDepartment.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString().slice(-6)}`;

      // Determine appropriate icon based on department type
      let icon = <Building />;
      let color = "text-gray-500";

      switch (newDepartment.type) {
        case "clinical":
          icon = <Stethoscope />;
          color = "text-blue-500";
          break;
        case "diagnostic":
          icon = <Microscope />;
          color = "text-green-600";
          break;
        case "support":
          icon = <Pill />;
          color = "text-purple-500";
          break;
        case "administrative":
          icon = <Briefcase />;
          color = "text-amber-600";
          break;
        case "specialty":
          icon = <Building />;
          color = "text-red-600";
          break;
      }

      const departmentToAdd = {
        id: uniqueId,
        name: newDepartment.name,
        type: newDepartment.type,
        description: newDepartment.description,
        staffCount: newDepartment.staffCount || 0,
        parentId: newDepartment.parentId && newDepartment.parentId !== "none" ? newDepartment.parentId : undefined,
        icon: icon,
        color: color,
      };

      setDepartments([...departments, departmentToAdd]);

      // Show success message
      alert(`Department "${newDepartment.name}" has been successfully added.`);

      // Reset form
      setNewDepartment({
        name: "",
        type: "clinical",
        description: "",
        staffCount: 0,
        parentId: "",
      });
      setShowAddDialog(false);
    }
  };

  // Handle editing a department
  const handleEditDepartment = () => {
    if (editingDepartment && editingDepartment.name && editingDepartment.description) {
      setDepartments(departments.map((dept) => (dept.id === editingDepartment.id ? editingDepartment : dept)));
      setEditingDepartment(null);
    }
  };

  // Handle deleting a department
  const handleDeleteDepartment = (id) => {
    // Check if department has children
    const hasChildren = departments.some((dept) => dept.parentId === id);

    if (hasChildren) {
      alert("Cannot delete a department with sub-departments. Please reassign or delete the sub-departments first.");
      return;
    }

    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  // Get icon for department type
  const getDepartmentTypeIcon = (type) => {
    switch (type) {
      case "clinical":
        return <Stethoscope className="h-5 w-5" />;
      case "diagnostic":
        return <Microscope className="h-5 w-5" />;
      case "support":
        return <Pill className="h-5 w-5" />;
      case "administrative":
        return <Briefcase className="h-5 w-5" />;
      case "specialty":
        return <Building className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 m-8">
      <div className="flex items-center">
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          onClick={onNavigateBack}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-900">Department Structures</h1>
          <p className="text-sm text-gray-600">Manage hospital departments and organizational structure</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search departments..."
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowAddDialog(true)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="inline h-4 w-4 mr-2" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {["clinical", "diagnostic", "support", "administrative", "specialty"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === type
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {getDepartmentTypeIcon(type)}
            <span className="hidden sm:inline">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getDepartmentTypeIcon(activeTab)}
              <h2 className="text-lg font-semibold ml-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Departments</h2>
            </div>
            <button
              onClick={() => {
                setNewDepartment({
                  ...newDepartment,
                  type: activeTab,
                });
                setShowAddDialog(true);
              }}
              className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors"
            >
              <Plus className="inline h-4 w-4 mr-2" /> Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Department
            </button>
          </div>
          <p className="text-white/80">
            {activeTab === "clinical" && "Patient care and medical treatment departments"}
            {activeTab === "diagnostic" && "Testing and diagnostic service departments"}
            {activeTab === "support" && "Clinical support and ancillary service departments"}
            {activeTab === "administrative" && "Hospital operations and management departments"}
            {activeTab === "specialty" && "Specialized care centers and programs"}
          </p>
        </div>
        <div className="p-0">
          <div className="h-[600px] overflow-y-auto p-4">
            {parentDepartments.length > 0 ? (
              <div className="space-y-4">
                {parentDepartments.map((dept) => {
                  const childDepts = getChildDepartments(dept.id);
                  return (
                    <div
                      key={dept.id}
                      className="border bg-white rounded-lg shadow-sm"
                    >
                      <div className="px-4 py-3 hover:bg-gray-50 rounded-t-lg cursor-pointer">
                        <div className="flex items-center">
                          <div className={`mr-3 ${dept.color}`}>{dept.icon}</div>
                          <div className="text-left">
                            <h3 className="font-medium">{dept.name}</h3>
                            <p className="text-sm text-gray-600">{dept.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-3 pt-1">
                        <div className="flex justify-between items-center mb-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-md text-xs">
                            <Users className="inline h-3 w-3 mr-1" /> {dept.staffCount} Staff
                          </span>
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md text-sm"
                              onClick={() => setEditingDepartment(dept)}
                            >
                              <Edit className="inline h-4 w-4 mr-1" /> Edit
                            </button>
                            <button
                              className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md text-sm"
                              onClick={() => handleDeleteDepartment(dept.id)}
                            >
                              <Trash2 className="inline h-4 w-4 mr-1" /> Delete
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 mb-2">
                          <h4 className="text-sm font-medium text-gray-600">Sub-departments:</h4>
                          <button
                            className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50 text-sm"
                            onClick={() => {
                              setNewDepartment({
                                ...newDepartment,
                                type: activeTab,
                                parentId: dept.id,
                              });
                              setShowAddDialog(true);
                            }}
                          >
                            <Plus className="inline h-3 w-3 mr-1" /> Add Sub-department
                          </button>
                        </div>

                        {childDepts.length > 0 ? (
                          <div className="space-y-3">
                            {childDepts.map((child) => (
                              <div
                                key={child.id}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                              >
                                <div className="flex items-center">
                                  <div className={`mr-3 ${child.color}`}>{child.icon}</div>
                                  <div>
                                    <h5 className="font-medium">{child.name}</h5>
                                    <p className="text-xs text-gray-600">{child.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-md text-xs">
                                    <Users className="inline h-3 w-3 mr-1" /> {child.staffCount} Staff
                                  </span>
                                  <div className="flex gap-1">
                                    <button
                                      className="h-7 w-7 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded-md"
                                      onClick={() => setEditingDepartment(child)}
                                    >
                                      <Edit className="h-3 w-3" />
                                    </button>
                                    <button
                                      className="h-7 w-7 text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded-md"
                                      onClick={() => handleDeleteDepartment(child.id)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-600">No sub-departments yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Building className="h-12 w-12 mx-auto text-gray-600 opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No departments found</h3>
                <p className="mt-2 text-gray-600">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Add departments to organize your hospital structure"}
                </p>
                <button
                  onClick={() => {
                    setNewDepartment({
                      ...newDepartment,
                      type: activeTab,
                    });
                    setShowAddDialog(true);
                  }}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="inline h-4 w-4 mr-2" /> Add Your First Department
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-50 p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <Info className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800">Department Structure</h4>
                <p className="text-sm text-blue-700 mt-1">
                  {activeTab === "clinical" && "Clinical departments provide direct patient care and treatment services."}
                  {activeTab === "diagnostic" &&
                    "Diagnostic departments provide testing and imaging services to support clinical diagnosis."}
                  {activeTab === "support" &&
                    "Support departments provide essential services to support clinical operations."}
                  {activeTab === "administrative" &&
                    "Administrative departments manage hospital operations and business functions."}
                  {activeTab === "specialty" &&
                    "Specialty centers provide focused care for specific conditions or patient populations."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Department Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAddDialog(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-medium mb-4">Add New Department</h2>
            <p className="text-gray-600 mb-4">Create a new department in your hospital structure</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="dept-name" className="block text-sm font-medium text-gray-700">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="dept-name"
                  type="text"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  placeholder="e.g., Cardiology, Transplant Services, etc."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-gray-600 mt-1">Enter a unique name for this department</p>
              </div>
              <div>
                <label htmlFor="dept-type" className="block text-sm font-medium text-gray-700">
                  Department Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="dept-type"
                  value={newDepartment.type}
                  onChange={(e) => setNewDepartment({ ...newDepartment, type: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="clinical">Clinical (Patient Care)</option>
                  <option value="diagnostic">Diagnostic (Testing & Imaging)</option>
                  <option value="support">Support (Ancillary Services)</option>
                  <option value="administrative">Administrative (Management)</option>
                  <option value="specialty">Specialty (Specialized Centers)</option>
                </select>
                <p className="text-xs text-gray-600 mt-1">
                  Choose the category that best describes this department
                </p>
              </div>
              <div>
                <label htmlFor="dept-description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  id="dept-description"
                  type="text"
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  placeholder="Brief description of the department's function"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Provide a short description of what this department does
                </p>
              </div>
              <div>
                <label htmlFor="dept-staff" className="block text-sm font-medium text-gray-700">
                  Staff Count
                </label>
                <input
                  id="dept-staff"
                  type="number"
                  min="0"
                  value={newDepartment.staffCount?.toString() || "0"}
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, staffCount: Number.parseInt(e.target.value) || 0 })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-gray-600 mt-1">Approximate number of staff in this department</p>
              </div>
              <div>
                <label htmlFor="dept-parent" className="block text-sm font-medium text-gray-700">
                  Parent Department (Optional)
                </label>
                <select
                  id="dept-parent"
                  value={newDepartment.parentId || "none"}
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, parentId: e.target.value === "none" ? undefined : e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="none">None (Top-level Department)</option>
                  {allDepartmentsByType(newDepartment.type).map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-600 mt-1">
                  If this is a sub-department, select its parent department
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowAddDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={handleAddDepartment}
                disabled={!newDepartment.name || !newDepartment.description}
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Dialog */}
      {editingDepartment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setEditingDepartment(null)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-medium mb-4">Edit Department</h2>
            <p className="text-gray-600 mb-4">Update department information</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-dept-name" className="block text-sm font-medium text-gray-700">
                  Department Name
                </label>
                <input
                  id="edit-dept-name"
                  type="text"
                  value={editingDepartment.name}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="edit-dept-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  id="edit-dept-description"
                  type="text"
                  value={editingDepartment.description}
                  onChange={(e) => setEditingDepartment({ ...editingDepartment, description: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="edit-dept-staff" className="block text-sm font-medium text-gray-700">
                  Staff Count
                </label>
                <input
                  id="edit-dept-staff"
                  type="number"
                  value={editingDepartment.staffCount?.toString() || "0"}
                  onChange={(e) =>
                    setEditingDepartment({ ...editingDepartment, staffCount: Number.parseInt(e.target.value) || 0 })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="edit-dept-parent" className="block text-sm font-medium text-gray-700">
                  Parent Department
                </label>
                <select
                  id="edit-dept-parent"
                  value={editingDepartment.parentId || ""}
                  onChange={(e) =>
                    setEditingDepartment({ ...editingDepartment, parentId: e.target.value || undefined })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="top">None (Top-level Department)</option>
                  {allDepartmentsByType(editingDepartment.type)
                    .filter((dept) => dept.id !== editingDepartment.id)
                    .map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setEditingDepartment(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={handleEditDepartment}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}