import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Edit, Save, X } from 'lucide-react';

// UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '', 
  onClick,
  disabled = false 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };
  
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
    icon: 'w-8 h-8',
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Input = ({ 
  id, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '',
  className = '',
  min
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    min={min}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

const Label = ({ htmlFor, children, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
  >
    {children}
  </label>
);

const Switch = ({ id, checked, onCheckedChange, className = '' }) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      checked ? 'bg-blue-600' : 'bg-gray-200'
    } ${className}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Tabs = ({ children, defaultValue, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className={className}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className = '', activeTab, setActiveTab }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ children, value, className = '', activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
      activeTab === value 
        ? 'bg-white text-gray-900 shadow-sm' 
        : 'text-gray-500 hover:text-gray-900'
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab, className = '' }) => {
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
};



export default function DepartmentsPage() {
  // Initial departments data
  const initialDepartments = [
    {
      id: 1,
      name: "Emergency Department",
      active: true,
      maxStudents: 15,
      subdepartments: [
        { id: 101, name: "Trauma Center", active: true, maxStudents: 5 },
        { id: 102, name: "Triage", active: true, maxStudents: 3 },
      ],
      units: [
        { id: 1001, name: "ED Bay 1", active: true, maxStudents: 3 },
        { id: 1002, name: "ED Bay 2", active: true, maxStudents: 3 },
        { id: 1003, name: "Fast Track", active: true, maxStudents: 2 },
      ],
    },
    {
      id: 2,
      name: "Radiology",
      active: true,
      maxStudents: 10,
      subdepartments: [
        { id: 201, name: "MRI", active: true, maxStudents: 4 },
        { id: 202, name: "X-ray", active: true, maxStudents: 3 },
        { id: 203, name: "Ultrasound", active: true, maxStudents: 3 },
      ],
      units: [
        { id: 2001, name: "MRI Suite A", active: true, maxStudents: 2 },
        { id: 2002, name: "MRI Suite B", active: true, maxStudents: 2 },
        { id: 2003, name: "X-ray Room 1", active: true, maxStudents: 2 },
        { id: 2004, name: "X-ray Room 2", active: true, maxStudents: 1 },
      ],
    },
    {
      id: 3,
      name: "Surgery",
      active: true,
      maxStudents: 12,
      subdepartments: [
        { id: 301, name: "General Surgery", active: true, maxStudents: 4 },
        { id: 302, name: "Orthopedic Surgery", active: true, maxStudents: 4 },
        { id: 303, name: "Cardiac Surgery", active: true, maxStudents: 2 },
      ],
      units: [
        { id: 3001, name: "OR 1", active: true, maxStudents: 2 },
        { id: 3002, name: "OR 2", active: true, maxStudents: 2 },
        { id: 3003, name: "OR 3", active: true, maxStudents: 2 },
        { id: 3004, name: "Pre-Op", active: true, maxStudents: 3 },
        { id: 3005, name: "Post-Op", active: true, maxStudents: 3 },
      ],
    },
    {
      id: 4,
      name: "Pediatrics",
      active: true,
      maxStudents: 8,
      subdepartments: [],
      units: [
        { id: 4001, name: "PICU", active: true, maxStudents: 2 },
        { id: 4002, name: "NICU", active: true, maxStudents: 2 },
        { id: 4003, name: "Pediatric Ward", active: true, maxStudents: 4 },
      ],
    },
    {
      id: 5,
      name: "Oncology",
      active: true,
      maxStudents: 6,
      subdepartments: [],
      units: [
        { id: 5001, name: "Chemo Suite", active: true, maxStudents: 3 },
        { id: 5002, name: "Radiation Therapy", active: true, maxStudents: 2 },
        { id: 5003, name: "Oncology Ward", active: true, maxStudents: 1 },
      ],
    },
  ];

  const [departments, setDepartments] = useState(initialDepartments);
  const [newDepartment, setNewDepartment] = useState("");
  const [newDepartmentMaxStudents, setNewDepartmentMaxStudents] = useState(10);
  const [activeTab, setActiveTab] = useState("all");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingSubdepartment, setEditingSubdepartment] = useState(null);
  const [newSubdepartmentName, setNewSubdepartmentName] = useState("");
  const [newSubdepartmentMaxStudents, setNewSubdepartmentMaxStudents] = useState(5);
  const [addingSubdepartmentFor, setAddingSubdepartmentFor] = useState(null);

  const [editingUnit, setEditingUnit] = useState(null);
  const [newUnitName, setNewUnitName] = useState("");
  const [newUnitMaxStudents, setNewUnitMaxStudents] = useState(3);
  const [addingUnitFor, setAddingUnitFor] = useState(null);

  // Disciplines state
  const initialDisciplines = [
    { id: 1, name: "Radiology (MRI, X-ray, US)", active: true },
    { id: 2, name: "Social Workers", active: true },
    { id: 3, name: "Surgical Technicians", active: true },
    { id: 4, name: "Respiratory Therapists", active: true },
    { id: 5, name: "Phlebotomists", active: true },
    { id: 6, name: "EMT", active: true },
    { id: 7, name: "CLS", active: true },
    { id: 8, name: "Nutritionists", active: true },
    { id: 9, name: "MDs/DOs", active: true },
    { id: 10, name: "Nurse Practitioners", active: true },
    { id: 11, name: "Registered Nurses", active: true },
    { id: 12, name: "Vocational Nurses", active: true },
    { id: 13, name: "Physician Assistants", active: true },
    { id: 14, name: "Certified Nursing Assistants", active: true },
    { id: 15, name: "Physical Therapists", active: true },
    { id: 16, name: "Occupational Therapists", active: true },
    { id: 17, name: "Speech Therapists", active: true },
    { id: 18, name: "Pharmacy", active: true },
  ];

  const [disciplines, setDisciplines] = useState(initialDisciplines);
  const [newDiscipline, setNewDiscipline] = useState("");
  const [disciplineActiveTab, setDisciplineActiveTab] = useState("all");

  // Function to add a new department
  const handleAddDepartment = () => {
    if (newDepartment.trim() === "") return;

    const newId = departments.length > 0 ? Math.max(...departments.map((d) => d.id)) + 1 : 1;

    setDepartments([
      ...departments,
      {
        id: newId,
        name: newDepartment,
        active: true,
        maxStudents: newDepartmentMaxStudents,
        subdepartments: [],
        units: [],
      },
    ]);
    setNewDepartment("");
    setNewDepartmentMaxStudents(10);
  };

  // Function to delete a department
  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((department) => department.id !== id));
  };

  // Function to toggle department active status
  const handleToggleDepartmentActive = (id) => {
    setDepartments(
      departments.map((department) =>
        department.id === id ? { ...department, active: !department.active } : department
      )
    );
  };

  // Function to toggle subdepartment active status
  const handleToggleSubdepartmentActive = (deptId, subId) => {
    setDepartments(
      departments.map((department) => {
        if (department.id === deptId) {
          return {
            ...department,
            subdepartments: department.subdepartments.map((sub) =>
              sub.id === subId ? { ...sub, active: !sub.active } : sub
            ),
          };
        }
        return department;
      })
    );
  };

  // Function to toggle department expansion
  const handleToggleExpand = (id) => {
    setDepartments(
      departments.map((department) =>
        department.id === id ? { ...department, expanded: !department.expanded } : department
      )
    );
  };

  // Function to start editing a department
  const handleStartEditDepartment = (id) => {
    setEditingDepartment(id);
  };

  // Function to save department edits
  const handleSaveDepartment = (id, newName, newMaxStudents) => {
    setDepartments(
      departments.map((department) =>
        department.id === id ? { ...department, name: newName, maxStudents: newMaxStudents } : department
      )
    );
    setEditingDepartment(null);
  };

  // Function to start editing a subdepartment
  const handleStartEditSubdepartment = (deptId, subId) => {
    setEditingSubdepartment({ deptId, subId });
  };

  // Function to save subdepartment edits
  const handleSaveSubdepartment = (deptId, subId, newName, newMaxStudents) => {
    setDepartments(
      departments.map((department) => {
        if (department.id === deptId) {
          return {
            ...department,
            subdepartments: department.subdepartments.map((sub) =>
              sub.id === subId ? { ...sub, name: newName, maxStudents: newMaxStudents } : sub
            ),
          };
        }
        return department;
      })
    );
    setEditingSubdepartment(null);
  };

  // Function to start adding a subdepartment
  const handleStartAddSubdepartment = (deptId) => {
    setAddingSubdepartmentFor(deptId);
    setNewSubdepartmentName("");
    setNewSubdepartmentMaxStudents(5);
  };

  // Function to add a new subdepartment
  const handleAddSubdepartment = (deptId) => {
    if (newSubdepartmentName.trim() === "") return;

    setDepartments(
      departments.map((department) => {
        if (department.id === deptId) {
          const newSubId =
            department.subdepartments.length > 0
              ? Math.max(...department.subdepartments.map((s) => s.id)) + 1
              : department.id * 100 + 1;

          return {
            ...department,
            expanded: true,
            subdepartments: [
              ...department.subdepartments,
              {
                id: newSubId,
                name: newSubdepartmentName,
                active: true,
                maxStudents: newSubdepartmentMaxStudents,
              },
            ],
          };
        }
        return department;
      })
    );
    setAddingSubdepartmentFor(null);
    setNewSubdepartmentName("");
    setNewSubdepartmentMaxStudents(5);
  };

  // Function to delete a subdepartment
  const handleDeleteSubdepartment = (deptId, subId) => {
    setDepartments(
      departments.map((department) => {
        if (department.id === deptId) {
          return {
            ...department,
            subdepartments: department.subdepartments.filter((sub) => sub.id !== subId),
          };
        }
        return department;
      })
    );
  };

  // Unit management functions
  const handleToggleUnitActive = (deptId, unitId) => {
    setDepartments(
      departments.map((department) => {
        if (department.id === deptId) {
          return {
            ...department,
            units: department.units.map((unit) => (unit.id === unitId ? { ...unit, active: !unit.active } : unit)),
          };
        }
        return department;
      })
    );
  };

  const handleStartEditUnit = (deptId, unitId) => {
    setEditingUnit({ deptId, unitId });
  };

  const handleSaveUnit = (deptId, unitId, newName, newMaxStudents) => {
    setDepartments(
      departments.map((department) => {
        if (department.id === deptId) {
          return {
            ...department,
            units: department.units.map((unit) =>
              unit.id === unitId ? { ...unit, name: newName, maxStudents: newMaxStudents } : unit
            ),
          };
        }
        return department;
      })
    );
    setEditingUnit(null);
  };

  const handleStartAddUnit = (deptId) => {
    setAddingUnitFor(deptId);
    setNewUnitName("");
    setNewUnitMaxStudents(3);
  };

  const handleAddUnit = (deptId) => {
    if (newUnitName.trim() === "") return;

    setDepartments(
      departments.map((department) => {
        if (department.id === deptId) {
          const newUnitId =
            department.units.length > 0 ? Math.max(...department.units.map((u) => u.id)) + 1 : department.id * 1000 + 1;

          return {
            ...department,
            expanded: true,
            units: [
              ...department.units,
              {
                id: newUnitId,
                name: newUnitName,
                active: true,
                maxStudents: newUnitMaxStudents,
              },
            ],
          };
        }
        return department;
      })
    );
    setAddingUnitFor(null);
    setNewUnitName("");
    setNewUnitMaxStudents(3);
  };

  const handleDeleteUnit = (deptId, unitId) => {
    setDepartments(
      departments.map((department) => {
        if (department.id === deptId) {
          return {
            ...department,
            units: department.units.filter((unit) => unit.id !== unitId),
          };
        }
        return department;
      })
    );
  };

  // Disciplines functions
  const handleAddDiscipline = () => {
    if (newDiscipline.trim() === "") return;
    const newId = disciplines.length > 0 ? Math.max(...disciplines.map((d) => d.id)) + 1 : 1;
    setDisciplines([...disciplines, { id: newId, name: newDiscipline, active: true }]);
    setNewDiscipline("");
  };

  const handleDeleteDiscipline = (id) => {
    setDisciplines(disciplines.filter((discipline) => discipline.id !== id));
  };

  const handleToggleDisciplineActive = (id) => {
    setDisciplines(
      disciplines.map((discipline) =>
        discipline.id === id ? { ...discipline, active: !discipline.active } : discipline
      )
    );
  };

  // Filter departments based on active tab
  const filteredDepartments = departments.filter((department) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return department.active;
    if (activeTab === "inactive") return !department.active;
    return true;
  });

  // Filter disciplines based on active tab
  const filteredDisciplines = disciplines.filter((discipline) => {
    if (disciplineActiveTab === "all") return true;
    if (disciplineActiveTab === "active") return discipline.active;
    if (disciplineActiveTab === "inactive") return !discipline.active;
    return true;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-blue-600">Departments & Disciplines</h1>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="departments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="disciplines">Disciplines</TabsTrigger>
            </TabsList>

            <TabsContent value="departments" className="mt-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Department Setup</CardTitle>
                  <CardDescription>
                    Manage departments and subdepartments for clinical rotations. Set maximum student capacity for each.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-4 mb-6">
                    <div className="flex-1">
                      <Label htmlFor="new-department">Add New Department</Label>
                      <Input
                        id="new-department"
                        placeholder="Enter department name"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                      />
                    </div>
                    <div className="w-32">
                      <Label htmlFor="max-students">Max Students</Label>
                      <Input
                        id="max-students"
                        type="number"
                        min="1"
                        value={newDepartmentMaxStudents}
                        onChange={(e) => setNewDepartmentMaxStudents(parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <Button onClick={handleAddDepartment}>
                      <Plus className="mr-2 h-4 w-4" /> Add Department
                    </Button>
                  </div>

                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Departments</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab}>
                      <div className="space-y-4">
                        {filteredDepartments.map((department) => (
                          <div
                            key={department.id}
                            className="rounded-lg border border-gray-200 bg-white overflow-hidden"
                          >
                            <div className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-4 flex-1">
                                <Switch
                                  id={`department-${department.id}`}
                                  checked={department.active}
                                  onCheckedChange={() => handleToggleDepartmentActive(department.id)}
                                />
                                {editingDepartment === department.id ? (
                                  <div className="flex items-center gap-2 flex-1">
                                    <Input
                                      value={department.name}
                                      onChange={(e) =>
                                        setDepartments(
                                          departments.map((d) =>
                                            d.id === department.id ? { ...d, name: e.target.value } : d
                                          )
                                        )
                                      }
                                      className="flex-1"
                                    />
                                    <Input
                                      type="number"
                                      min="1"
                                      value={department.maxStudents}
                                      onChange={(e) =>
                                        setDepartments(
                                          departments.map((d) =>
                                            d.id === department.id
                                              ? { ...d, maxStudents: parseInt(e.target.value) || 1 }
                                              : d
                                          )
                                        )
                                      }
                                      className="w-24"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        handleSaveDepartment(department.id, department.name, department.maxStudents)
                                      }
                                    >
                                      <Save className="h-5 w-5 text-green-600" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => setEditingDepartment(null)}>
                                      <X className="h-5 w-5 text-red-600" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-4 flex-1">
                                    <Label
                                      htmlFor={`department-${department.id}`}
                                      className={`font-medium ${department.active ? "text-gray-900" : "text-gray-500"}`}
                                    >
                                      {department.name}
                                    </Label>
                                    <div className="ml-auto flex items-center gap-2">
                                      <span className="text-sm text-gray-500">
                                        Max Students: {department.maxStudents}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleStartEditDepartment(department.id)}
                                      >
                                        <Edit className="h-4 w-4 text-gray-500" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleToggleExpand(department.id)}>
                                  {department.expanded ? (
                                    <ChevronUp className="h-5 w-5 text-gray-500" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteDepartment(department.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-5 w-5" />
                                  <span className="sr-only">Delete {department.name}</span>
                                </Button>
                              </div>
                            </div>

                            {department.expanded && (
                              <div className="bg-gray-50 p-4 border-t border-gray-200">
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-500 mb-2">Subdepartments</h4>
                                  {department.subdepartments.length > 0 ? (
                                    <div className="space-y-2">
                                      {department.subdepartments.map((sub) => (
                                        <div
                                          key={sub.id}
                                          className="flex items-center justify-between p-3 rounded-md bg-white border border-gray-200"
                                        >
                                          <div className="flex items-center gap-3 flex-1">
                                            <Switch
                                              id={`sub-${sub.id}`}
                                              checked={sub.active}
                                              onCheckedChange={() =>
                                                handleToggleSubdepartmentActive(department.id, sub.id)
                                              }
                                            />
                                            {editingSubdepartment &&
                                            editingSubdepartment.deptId === department.id &&
                                            editingSubdepartment.subId === sub.id ? (
                                              <div className="flex items-center gap-2 flex-1">
                                                <Input
                                                  value={sub.name}
                                                  onChange={(e) => {
                                                    setDepartments(
                                                      departments.map((d) => {
                                                        if (d.id === department.id) {
                                                          return {
                                                            ...d,
                                                            subdepartments: d.subdepartments.map((s) =>
                                                              s.id === sub.id ? { ...s, name: e.target.value } : s
                                                            ),
                                                          };
                                                        }
                                                        return d;
                                                      })
                                                    );
                                                  }}
                                                  className="flex-1"
                                                />
                                                <Input
                                                  type="number"
                                                  min="1"
                                                  value={sub.maxStudents}
                                                  onChange={(e) => {
                                                    setDepartments(
                                                      departments.map((d) => {
                                                        if (d.id === department.id) {
                                                          return {
                                                            ...d,
                                                            subdepartments: d.subdepartments.map((s) =>
                                                              s.id === sub.id
                                                                ? { ...s, maxStudents: parseInt(e.target.value) || 1 }
                                                                : s
                                                            ),
                                                          };
                                                        }
                                                        return d;
                                                      })
                                                    );
                                                  }}
                                                  className="w-24"
                                                />
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={() =>
                                                    handleSaveSubdepartment(
                                                      department.id,
                                                      sub.id,
                                                      sub.name,
                                                      sub.maxStudents
                                                    )
                                                  }
                                                >
                                                  <Save className="h-4 w-4 text-green-600" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={() => setEditingSubdepartment(null)}
                                                >
                                                  <X className="h-4 w-4 text-red-600" />
                                                </Button>
                                              </div>
                                            ) : (
                                              <div className="flex items-center gap-4 flex-1">
                                                <Label
                                                  htmlFor={`sub-${sub.id}`}
                                                  className={`text-sm ${sub.active ? "text-gray-900" : "text-gray-500"}`}
                                                >
                                                  {sub.name}
                                                </Label>
                                                <div className="ml-auto flex items-center gap-2">
                                                  <span className="text-xs text-gray-500">
                                                    Max Students: {sub.maxStudents}
                                                  </span>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleStartEditSubdepartment(department.id, sub.id)}
                                                  >
                                                    <Edit className="h-3.5 w-3.5 text-gray-500" />
                                                  </Button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteSubdepartment(department.id, sub.id)}
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500 italic">No subdepartments</p>
                                  )}
                                  {addingSubdepartmentFor === department.id ? (
                                    <div className="flex items-end gap-2 mt-4">
                                      <div className="flex-1">
                                        <Label htmlFor="new-subdepartment" className="text-sm">
                                          Subdepartment Name
                                        </Label>
                                        <Input
                                          id="new-subdepartment"
                                          placeholder="Enter subdepartment name"
                                          value={newSubdepartmentName}
                                          onChange={(e) => setNewSubdepartmentName(e.target.value)}
                                          className="text-sm"
                                        />
                                      </div>
                                      <div className="w-32">
                                        <Label htmlFor="sub-max-students" className="text-sm">
                                          Max Students
                                        </Label>
                                        <Input
                                          id="sub-max-students"
                                          type="number"
                                          min="1"
                                          value={newSubdepartmentMaxStudents}
                                          onChange={(e) => setNewSubdepartmentMaxStudents(parseInt(e.target.value) || 1)}
                                          className="text-sm"
                                        />
                                      </div>
                                      <div className="flex gap-2">
                                        <Button size="sm" onClick={() => handleAddSubdepartment(department.id)}>
                                          Add
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => setAddingSubdepartmentFor(null)}>
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleStartAddSubdepartment(department.id)}
                                      className="mt-2"
                                    >
                                      <Plus className="mr-1 h-3.5 w-3.5" /> Add Subdepartment
                                    </Button>
                                  )}
                                </div>

                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-500 mb-2">Units</h4>
                                  {department.units.length > 0 ? (
                                    <div className="space-y-2">
                                      {department.units.map((unit) => (
                                        <div
                                          key={unit.id}
                                          className="flex items-center justify-between p-3 rounded-md bg-white border border-gray-200"
                                        >
                                          <div className="flex items-center gap-3 flex-1">
                                            <Switch
                                              id={`unit-${unit.id}`}
                                              checked={unit.active}
                                              onCheckedChange={() => handleToggleUnitActive(department.id, unit.id)}
                                            />
                                            {editingUnit &&
                                            editingUnit.deptId === department.id &&
                                            editingUnit.unitId === unit.id ? (
                                              <div className="flex items-center gap-2 flex-1">
                                                <Input
                                                  value={unit.name}
                                                  onChange={(e) => {
                                                    setDepartments(
                                                      departments.map((d) => {
                                                        if (d.id === department.id) {
                                                          return {
                                                            ...d,
                                                            units: d.units.map((u) =>
                                                              u.id === unit.id ? { ...u, name: e.target.value } : u
                                                            ),
                                                          };
                                                        }
                                                        return d;
                                                      })
                                                    );
                                                  }}
                                                  className="flex-1"
                                                />
                                                <Input
                                                  type="number"
                                                  min="1"
                                                  value={unit.maxStudents}
                                                  onChange={(e) => {
                                                    setDepartments(
                                                      departments.map((d) => {
                                                        if (d.id === department.id) {
                                                          return {
                                                            ...d,
                                                            units: d.units.map((u) =>
                                                              u.id === unit.id
                                                                ? { ...u, maxStudents: parseInt(e.target.value) || 1 }
                                                                : u
                                                            ),
                                                          };
                                                        }
                                                        return d;
                                                      })
                                                    );
                                                  }}
                                                  className="w-24"
                                                />
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={() =>
                                                    handleSaveUnit(department.id, unit.id, unit.name, unit.maxStudents)
                                                  }
                                                >
                                                  <Save className="h-4 w-4 text-green-600" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  onClick={() => setEditingUnit(null)}
                                                >
                                                  <X className="h-4 w-4 text-red-600" />
                                                </Button>
                                              </div>
                                            ) : (
                                              <div className="flex items-center gap-4 flex-1">
                                                <Label
                                                  htmlFor={`unit-${unit.id}`}
                                                  className={`text-sm ${unit.active ? "text-gray-900" : "text-gray-500"}`}
                                                >
                                                  {unit.name}
                                                </Label>
                                                <div className="ml-auto flex items-center gap-2">
                                                  <span className="text-xs text-gray-500">
                                                    Max Students: {unit.maxStudents}
                                                  </span>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleStartEditUnit(department.id, unit.id)}
                                                  >
                                                    <Edit className="h-3.5 w-3.5 text-gray-500" />
                                                  </Button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteUnit(department.id, unit.id)}
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500 italic">No units</p>
                                  )}
                                  {addingUnitFor === department.id ? (
                                    <div className="flex items-end gap-2 mt-4">
                                      <div className="flex-1">
                                        <Label htmlFor="new-unit" className="text-sm">
                                          Unit Name
                                        </Label>
                                        <Input
                                          id="new-unit"
                                          placeholder="Enter unit name"
                                          value={newUnitName}
                                          onChange={(e) => setNewUnitName(e.target.value)}
                                          className="text-sm"
                                        />
                                      </div>
                                      <div className="w-32">
                                        <Label htmlFor="unit-max-students" className="text-sm">
                                          Max Students
                                        </Label>
                                        <Input
                                          id="unit-max-students"
                                          type="number"
                                          min="1"
                                          value={newUnitMaxStudents}
                                          onChange={(e) => setNewUnitMaxStudents(parseInt(e.target.value) || 1)}
                                          className="text-sm"
                                        />
                                      </div>
                                      <div className="flex gap-2">
                                        <Button size="sm" onClick={() => handleAddUnit(department.id)}>
                                          Add
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => setAddingUnitFor(null)}>
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleStartAddUnit(department.id)}
                                      className="mt-2"
                                    >
                                      <Plus className="mr-1 h-3.5 w-3.5" /> Add Unit
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        {filteredDepartments.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No departments found. Add a new department to get started.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="disciplines" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Accepted Disciplines For Clinical Rotation</CardTitle>
                  <CardDescription>
                    Manage the disciplines that are accepted for clinical rotations. Add new disciplines or remove
                    existing ones.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-4 mb-6">
                    <div className="flex-1">
                      <Label htmlFor="new-discipline">Add New Discipline</Label>
                      <Input
                        id="new-discipline"
                        placeholder="Enter discipline name"
                        value={newDiscipline}
                        onChange={(e) => setNewDiscipline(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddDiscipline}>
                      <Plus className="mr-2 h-4 w-4" /> Add Discipline
                    </Button>
                  </div>

                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Disciplines</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    </TabsList>

                    <TabsContent value={disciplineActiveTab}>
                      <div className="space-y-4">
                        {filteredDisciplines.map((discipline) => (
                          <div
                            key={discipline.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
                          >
                            <div className="flex items-center gap-4">
                              <Switch
                                id={`discipline-${discipline.id}`}
                                checked={discipline.active}
                                onCheckedChange={() => handleToggleDisciplineActive(discipline.id)}
                              />
                              <Label
                                htmlFor={`discipline-${discipline.id}`}
                                className={`font-medium ${discipline.active ? "text-gray-900" : "text-gray-500"}`}
                              >
                                {discipline.name}
                              </Label>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteDiscipline(discipline.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-5 w-5" />
                              <span className="sr-only">Delete {discipline.name}</span>
                            </Button>
                          </div>
                        ))}

                        {filteredDisciplines.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No disciplines found. Add a new discipline to get started.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}