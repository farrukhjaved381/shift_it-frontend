import React, { useState, useEffect } from "react"
import {
  ArrowLeft,
  Plus,
  Search,
  Trash2,
  Edit,
  DollarSign,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Simple UI component replacements using plain React and Tailwind CSS
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  let baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  if (variant === "ghost") baseClasses += " hover:bg-gray-100"
  else if (variant === "outline") baseClasses += " border border-gray-300 hover:bg-gray-100"
  else baseClasses += " bg-blue-600 text-white hover:bg-blue-700"
  if (size === "sm") baseClasses += " h-9 px-3 text-sm"
  else if (size === "icon") baseClasses += " h-10 w-10"
  else baseClasses += " h-10 py-2 px-4"
  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardDescription = ({ children, className = "", ...props }) => (
  <div className={`text-sm text-gray-600 ${className}`} {...props}>
    {children}
  </div>
)

const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Label = ({ children, className = "", ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </label>
)

const ScrollArea = ({ children, className = "", ...props }) => (
  <div className={`relative overflow-auto ${className}`} {...props}>
    {children}
  </div>
)

const Tabs = ({
  value,
  onValueChange,
  children,
}) => {
  // Simple tabs implementation
  return <div>{children}</div>
}

const TabsList = ({
  children,
  className = "",
  activeTab,
  onTabChange,
  ...props
}) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600 ${className}`} {...props}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { isActive: child.props.value === activeTab, onClick: onTabChange })
    )}
  </div>
)

const TabsTrigger = ({
  children,
  className = "",
  value,
  isActive = false,
  onClick,
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-white text-blue-900 shadow-sm' : ''} ${className}`}
    onClick={() => onClick?.(value)}
    {...props}
  >
    {children}
  </button>
)

const Select = ({
  value,
  onValueChange,
  children,
}) => {
  // Simple select implementation
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)} className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      {children}
    </select>
  )
}

const SelectContent = ({ children, ...props }) => <div {...props}>{children}</div>

const SelectItem = ({ children, ...props }) => (
  <option {...props}>{children}</option>
)

const SelectTrigger = ({ children, ...props }) => <div {...props}>{children}</div>

const SelectValue = ({ placeholder }) => <span>{placeholder}</span>

const Table = ({ children, className = "", ...props }) => (
  <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
    {children}
  </table>
)

const TableBody = ({ children, ...props }) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>
    {children}
  </tbody>
)

const TableCell = ({ children, className = "", ...props }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </td>
)

const TableHead = ({ children, className = "", ...props }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </th>
)

const TableHeader = ({ children, ...props }) => (
  <thead className="border-b border-gray-200" {...props}>
    {children}
  </thead>
)

const TableRow = ({ children, className = "", ...props }) => (
  <tr className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${className}`} {...props}>
    {children}
  </tr>
)

const Collapsible = ({ children }) => <div>{children}</div>

const CollapsibleContent = ({ children, className = "", ...props }) => (
  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${className}`} {...props}>
    {children}
  </div>
)

const CollapsibleTrigger = ({ children, asChild, ...props }) => {
  if (asChild) {
    return React.cloneElement(children, props)
  }
  return <button {...props}>{children}</button>
}

const Dialog = ({
  open,
  onOpenChange,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    if (open) document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} role="dialog" aria-modal="true">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-auto bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
)

const DialogDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-gray-600 ${className}`} {...props}>
    {children}
  </p>
)

const DialogFooter = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`} {...props}>
    {children}
  </div>
)

const DialogHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
    {children}
  </div>
)

const DialogTitle = ({ children, className = "", ...props }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h2>
)

const Alert = ({ children, className = "", ...props }) => (
  <div className={`relative w-full rounded-lg border border-blue-200 bg-blue-50 p-4 ${className}`} {...props}>
    {children}
  </div>
)

const AlertDescription = ({ children, className = "", ...props }) => (
  <div className={`text-sm ${className}`} {...props}>
    {children}
  </div>
)

const AlertTitle = ({ children, className = "", ...props }) => (
  <h4 className={`mb-1 font-medium leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h4>
)

export default function ShifterzRatesSetup({ onNavigateBack }) {
  // State variables
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("Medical")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingPosition, setEditingPosition] = useState(null)
  const [showAddCustomRateDialog, setShowAddCustomRateDialog] = useState(false)
  const [newCustomRate, setNewCustomRate] = useState({ name: "", rate: 0 })
  const [expandedPositionId, setExpandedPositionId] = useState(null)

  const [newPosition, setNewPosition] = useState({
    title: "",
    department: "Medical",
    baseRate: 0,
    overtimeRate: 0,
    weekendRate: 0,
    holidayRate: 0,
    nightDifferential: 0,
    afternoonDifferential: 0,
    weekendMorningDifferential: 0,
    weekendAfternoonDifferential: 0,
    weekendNightDifferential: 0,
    onCallRate: 0,
    customRates: [],
  })

  // Sample positions data
  const [positions, setPositions] = useState([
    // Medical Staff
    {
      id: "med-1",
      title: "Attending Physician",
      department: "Medical",
      baseRate: 150.0,
      overtimeRate: 225.0,
      weekendRate: 187.5,
      holidayRate: 300.0,
      nightDifferential: 30.0,
      afternoonDifferential: 15.0,
      weekendMorningDifferential: 37.5,
      weekendAfternoonDifferential: 45.0,
      weekendNightDifferential: 60.0,
      onCallRate: 75.0,
      customRates: [
        { id: "custom-1", name: "Teaching Rate", rate: 175.0 },
        { id: "custom-2", name: "Consultation Rate", rate: 200.0 },
      ],
      lastUpdated: new Date(2023, 5, 15),
    },
    {
      id: "med-2",
      title: "Resident Physician",
      department: "Medical",
      baseRate: 70.0,
      overtimeRate: 105.0,
      weekendRate: 87.5,
      holidayRate: 140.0,
      nightDifferential: 15.0,
      afternoonDifferential: 7.0,
      weekendMorningDifferential: 17.5,
      weekendAfternoonDifferential: 21.0,
      weekendNightDifferential: 28.0,
      onCallRate: 35.0,
      customRates: [],
      lastUpdated: new Date(2023, 5, 15),
    },

    // Nursing Staff
    {
      id: "nurs-1",
      title: "Registered Nurse (RN)",
      department: "Nursing",
      baseRate: 45.0,
      overtimeRate: 67.5,
      weekendRate: 56.25,
      holidayRate: 90.0,
      nightDifferential: 9.0,
      afternoonDifferential: 4.5,
      weekendMorningDifferential: 11.25,
      weekendAfternoonDifferential: 13.5,
      weekendNightDifferential: 18.0,
      onCallRate: 22.5,
      customRates: [{ id: "custom-3", name: "Charge Nurse Rate", rate: 55.0 }],
      lastUpdated: new Date(2023, 5, 15),
    },

    // Allied Health
    {
      id: "allied-1",
      title: "Physical Therapist",
      department: "Allied Health",
      baseRate: 48.0,
      overtimeRate: 72.0,
      weekendRate: 60.0,
      holidayRate: 96.0,
      nightDifferential: 9.6,
      afternoonDifferential: 4.8,
      weekendMorningDifferential: 12.0,
      weekendAfternoonDifferential: 14.4,
      weekendNightDifferential: 19.2,
      onCallRate: 24.0,
      customRates: [],
      lastUpdated: new Date(2023, 5, 15),
    },

    // Administrative
    {
      id: "admin-1",
      title: "Medical Records Clerk",
      department: "Administrative",
      baseRate: 25.0,
      overtimeRate: 37.5,
      weekendRate: 31.25,
      holidayRate: 50.0,
      nightDifferential: 5.0,
      afternoonDifferential: 2.5,
      weekendMorningDifferential: 6.25,
      weekendAfternoonDifferential: 7.5,
      weekendNightDifferential: 10.0,
      onCallRate: 12.5,
      customRates: [],
      lastUpdated: new Date(2023, 5, 15),
    },

    // Support Services
    {
      id: "support-1",
      title: "Environmental Services Technician",
      department: "Support Services",
      baseRate: 20.0,
      overtimeRate: 30.0,
      weekendRate: 25.0,
      holidayRate: 40.0,
      nightDifferential: 4.0,
      afternoonDifferential: 2.0,
      weekendMorningDifferential: 5.0,
      weekendAfternoonDifferential: 6.0,
      weekendNightDifferential: 8.0,
      onCallRate: 10.0,
      customRates: [],
      lastUpdated: new Date(2023, 5, 15),
    },

    // Technical
    {
      id: "tech-1",
      title: "Radiology Technician",
      department: "Technical",
      baseRate: 38.0,
      overtimeRate: 57.0,
      weekendRate: 47.5,
      holidayRate: 76.0,
      nightDifferential: 7.6,
      afternoonDifferential: 3.8,
      weekendMorningDifferential: 9.5,
      weekendAfternoonDifferential: 11.4,
      weekendNightDifferential: 15.2,
      onCallRate: 19.0,
      customRates: [],
      lastUpdated: new Date(2023, 5, 15),
    },
  ])

  // Filter positions by department and search query
  const filteredPositions = positions.filter(
    (position) =>
      position.department === activeTab &&
      (searchQuery === "" || position.title.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Handle adding a new position
  const handleAddPosition = () => {
    if (newPosition.title && newPosition.baseRate !== undefined) {
      // Generate a unique ID based on the department and title
      const deptPrefix = newPosition.department?.toLowerCase().substring(0, 4) || "pos"
      const uniqueId = `${deptPrefix}-${Date.now().toString().slice(-6)}`

      const positionToAdd = {
        id: uniqueId,
        title: newPosition.title,
        department: newPosition.department,
        baseRate: newPosition.baseRate || 0,
        overtimeRate: newPosition.overtimeRate || 0,
        weekendRate: newPosition.weekendRate || 0,
        holidayRate: newPosition.holidayRate || 0,
        nightDifferential: newPosition.nightDifferential || 0,
        afternoonDifferential: newPosition.afternoonDifferential || 0,
        weekendMorningDifferential: newPosition.weekendMorningDifferential || 0,
        weekendAfternoonDifferential: newPosition.weekendAfternoonDifferential || 0,
        weekendNightDifferential: newPosition.weekendNightDifferential || 0,
        onCallRate: newPosition.onCallRate || 0,
        customRates: newPosition.customRates || [],
        lastUpdated: new Date(),
      }

      setPositions([...positions, positionToAdd])

      // Reset form
      setNewPosition({
        title: "",
        department: activeTab,
        baseRate: 0,
        overtimeRate: 0,
        weekendRate: 0,
        holidayRate: 0,
        nightDifferential: 0,
        afternoonDifferential: 0,
        weekendMorningDifferential: 0,
        weekendAfternoonDifferential: 0,
        weekendNightDifferential: 0,
        onCallRate: 0,
        customRates: [],
      })
      setShowAddDialog(false)
    }
  }

  // Handle editing a position
  const handleEditPosition = () => {
    if (editingPosition && editingPosition.title) {
      setPositions(
        positions.map((pos) =>
          pos.id === editingPosition.id
            ? {
                ...editingPosition,
                lastUpdated: new Date(),
              }
            : pos,
        ),
      )
      setEditingPosition(null)
    }
  }

  // Handle deleting a position
  const handleDeletePosition = (id) => {
    setPositions(positions.filter((pos) => pos.id !== id))
  }

  // Handle adding a custom rate to a position
  const handleAddCustomRate = () => {
    if (editingPosition && newCustomRate.name && newCustomRate.rate !== undefined) {
      const customRateToAdd = {
        id: `custom-${Date.now().toString().slice(-6)}`,
        name: newCustomRate.name,
        rate: newCustomRate.rate,
      }

      setEditingPosition({
        ...editingPosition,
        customRates: [...editingPosition.customRates, customRateToAdd],
      })

      // Reset form
      setNewCustomRate({ name: "", rate: 0 })
      setShowAddCustomRateDialog(false)
    }
  }

  // Handle deleting a custom rate
  const handleDeleteCustomRate = (positionId, rateId) => {
    if (editingPosition && editingPosition.id === positionId) {
      setEditingPosition({
        ...editingPosition,
        customRates: editingPosition.customRates.filter((rate) => rate.id !== rateId),
      })
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Toggle expanded position
  const toggleExpandPosition = (id) => {
    if (expandedPositionId === id) {
      setExpandedPositionId(null)
    } else {
      setExpandedPositionId(id)
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={onNavigateBack} aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-indigo-900">SHIFTerz Rates Setup</h1>
          <p className="text-sm text-gray-600">Configure pay rates for all hospital positions</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 " />
          <Input
            placeholder="Search positions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setNewPosition({
              ...newPosition,
              department: activeTab,
            })
            setShowAddDialog(true)
          }}
          className="w-full sm:w-auto bg-indigo-900 text-white hover:bg-indigo-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Position
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <TabsList activeTab={activeTab} onTabChange={setActiveTab} className="mb-4 overflow-x-auto flex whitespace-nowrap w-full">
          <TabsTrigger value="Medical" className="px-3 py-1.5 text-sm">
            Medical
          </TabsTrigger>
          <TabsTrigger value="Nursing" className="px-3 py-1.5 text-sm">
            Nursing
          </TabsTrigger>
          <TabsTrigger value="Allied Health" className="px-3 py-1.5 text-sm">
            Allied Health
          </TabsTrigger>
          <TabsTrigger value="Administrative" className="px-3 py-1.5 text-sm">
            Administrative
          </TabsTrigger>
          <TabsTrigger value="Support Services" className="px-3 py-1.5 text-sm">
            Support Services
          </TabsTrigger>
          <TabsTrigger value="Technical" className="px-3 py-1.5 text-sm">
            Technical
          </TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                <CardTitle>{activeTab} Positions</CardTitle>
              </div>
              <Button
                onClick={() => {
                  setNewPosition({
                    ...newPosition,
                    department: activeTab,
                  })
                  setShowAddDialog(true)
                }}
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white border-white/40"
              >
                <Plus className="mr-2 h-4 w-4" /> Add {activeTab} Position
              </Button>
            </div>
            <CardDescription className="text-white">
              Configure pay rates for {activeTab.toLowerCase()} staff positions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="p-6">
                {filteredPositions.length > 0 ? (
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="w-[250px]">Position Title</TableHead>
                          <TableHead>Base Rate</TableHead>
                          <TableHead className="hidden lg:table-cell">Overtime</TableHead>
                          <TableHead className="hidden lg:table-cell">Holiday</TableHead>
                          <TableHead className="hidden md:table-cell">Shift Differentials</TableHead>
                          <TableHead className="hidden md:table-cell">Custom Rates</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPositions.map((position) => (
                          <TableRow key={position.id}>
                            <TableCell className="font-medium">{position.title}</TableCell>
                            <TableCell>{formatCurrency(position.baseRate)}</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {formatCurrency(position.overtimeRate)}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {formatCurrency(position.holidayRate)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                onClick={() => toggleExpandPosition(position.id)}
                              >
                                View Differentials
                                {expandedPositionId === position.id ? (
                                  <ChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                )}
                              </Button>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {position.customRates.length > 0 ? (
                                <span>{position.customRates.length} custom rates</span>
                              ) : (
                                <span className="text-gray-500">None</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                  onClick={() => setEditingPosition(position)}
                                  aria-label={`Edit ${position.title}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                                  onClick={() => handleDeletePosition(position.id)}
                                  aria-label={`Delete ${position.title}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Expanded position details */}
                    {expandedPositionId && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        {positions
                          .filter((p) => p.id === expandedPositionId)
                          .map((position) => (
                            <div key={`expanded-${position.id}`}>
                              <h3 className="font-medium mb-3">{position.title} - Shift Differentials</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-3 bg-white rounded-md shadow-sm">
                                  <p className="text-sm text-gray-600">Afternoon Differential</p>
                                  <p className="font-medium">{formatCurrency(position.afternoonDifferential)}</p>
                                </div>
                                <div className="p-3 bg-white rounded-md shadow-sm">
                                  <p className="text-sm text-gray-600">Night Differential</p>
                                  <p className="font-medium">{formatCurrency(position.nightDifferential)}</p>
                                </div>
                                <div className="p-3 bg-white rounded-md shadow-sm">
                                  <p className="text-sm text-gray-600">Weekend Morning Differential</p>
                                  <p className="font-medium">{formatCurrency(position.weekendMorningDifferential)}</p>
                                </div>
                                <div className="p-3 bg-white rounded-md shadow-sm">
                                  <p className="text-sm text-gray-600">Weekend Afternoon Differential</p>
                                  <p className="font-medium">{formatCurrency(position.weekendAfternoonDifferential)}</p>
                                </div>
                                <div className="p-3 bg-white rounded-md shadow-sm">
                                  <p className="text-sm text-gray-600">Weekend Night Differential</p>
                                  <p className="font-medium">{formatCurrency(position.weekendNightDifferential)}</p>
                                </div>
                                <div className="p-3 bg-white rounded-md shadow-sm">
                                  <p className="text-sm text-gray-600">On-Call Rate</p>
                                  <p className="font-medium">{formatCurrency(position.onCallRate)}</p>
                                </div>
                              </div>

                              {position.customRates.length > 0 && (
                                <div className="mt-4">
                                  <h3 className="font-medium mb-3">Custom Rates</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {position.customRates.map((rate) => (
                                      <div key={rate.id} className="p-3 bg-white rounded-md shadow-sm">
                                        <p className="text-sm text-gray-600">{rate.name}</p>
                                        <p className="font-medium">{formatCurrency(rate.rate)}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 mx-auto text-gray-400 opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No positions found</h3>
                    <p className="mt-2 text-gray-600">
                      {searchQuery
                        ? "Try adjusting your search query"
                        : `Add ${activeTab.toLowerCase()} positions to configure pay rates`}
                    </p>
                    <Button
                      onClick={() => {
                        setNewPosition({
                          ...newPosition,
                          department: activeTab,
                        })
                        setShowAddDialog(true)
                      }}
                      className="mt-4"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Your First Position
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4">
            <Alert className="w-full">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-900">Rate Configuration</AlertTitle>
              <AlertDescription className="text-blue-800">
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Base Rate: Standard hourly pay rate</li>
                  <li>Overtime Rate: Typically 1.5x base rate for hours over 40 per week</li>
                  <li>Afternoon Differential: Additional pay for afternoon shifts</li>
                  <li>Night Differential: Additional pay for night shifts</li>
                  <li>Weekend Differentials: Premium rates for weekend shifts by time of day</li>
                  <li>Holiday Rate: Premium rate for holiday shifts (typically 2x base rate)</li>
                  <li>On-Call Rate: Hourly rate when on-call but not actively working</li>
                  <li>Custom Rates: Special rates for specific situations or roles</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      </Tabs>

      {/* Mobile card view - only visible on small screens */}
      <div className="md:hidden mt-4 space-y-4">
        {filteredPositions.map((position) => (
          <Collapsible key={position.id}>
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{position.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      onClick={() => setEditingPosition(position)}
                      aria-label={`Edit ${position.title}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={() => handleDeletePosition(position.id)}
                      aria-label={`Delete ${position.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3 pt-0">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Base Rate:</p>
                    <p className="font-medium">{formatCurrency(position.baseRate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Overtime:</p>
                    <p className="font-medium">{formatCurrency(position.overtimeRate)}</p>
                  </div>
                </div>

                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-blue-600">
                    View All Rates <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h4 className="text-sm font-medium mb-2">Standard Rates</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Base Rate:</p>
                        <p className="font-medium">{formatCurrency(position.baseRate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Overtime:</p>
                        <p className="font-medium">{formatCurrency(position.overtimeRate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Weekend Rate:</p>
                        <p className="font-medium">{formatCurrency(position.weekendRate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Holiday Rate:</p>
                        <p className="font-medium">{formatCurrency(position.holidayRate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">On-Call Rate:</p>
                        <p className="font-medium">{formatCurrency(position.onCallRate)}</p>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium mt-4 mb-2">Shift Differentials</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Afternoon:</p>
                        <p className="font-medium">{formatCurrency(position.afternoonDifferential)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Night:</p>
                        <p className="font-medium">{formatCurrency(position.nightDifferential)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Weekend Morning:</p>
                        <p className="font-medium">{formatCurrency(position.weekendMorningDifferential)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Weekend Afternoon:</p>
                        <p className="font-medium">{formatCurrency(position.weekendAfternoonDifferential)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Weekend Night:</p>
                        <p className="font-medium">{formatCurrency(position.weekendNightDifferential)}</p>
                      </div>
                    </div>

                    {position.customRates.length > 0 && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium mb-2">Custom Rates</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-blue-600"
                            onClick={() => setEditingPosition(position)}
                          >
                            <Edit className="mr-1 h-3 w-3" /> Edit
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {position.customRates.map((rate) => (
                            <div
                              key={rate.id}
                              className="flex justify-between items-center p-2 bg-gray-50 rounded"
                            >
                              <span>{rate.name}</span>
                              <span className="font-medium">{formatCurrency(rate.rate)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </CardContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      {/* Add Position Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[90vh] p-7">
          <DialogHeader>
            <DialogTitle>Add New Position</DialogTitle>
            <DialogDescription>Create a new position with pay rate configuration</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="position-title">
                Position Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="position-title"
                value={newPosition.title}
                onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                placeholder="e.g., Registered Nurse, Physician, etc."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="position-department">
                Department <span className="text-red-500">*</span>
              </Label>
              <Select
                value={newPosition.department}
                onValueChange={(value) => setNewPosition({ ...newPosition, department: value })}
              >
                <SelectTrigger id="position-department" className="mt-1">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                  <SelectItem value="Allied Health">Allied Health</SelectItem>
                  <SelectItem value="Administrative">Administrative</SelectItem>
                  <SelectItem value="Support Services">Support Services</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Standard Rates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="base-rate">
                    Base Rate ($/hr) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="base-rate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.baseRate?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, baseRate: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="overtime-rate">Overtime Rate ($/hr)</Label>
                  <Input
                    id="overtime-rate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.overtimeRate?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, overtimeRate: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="holiday-rate">Holiday Rate ($/hr)</Label>
                  <Input
                    id="holiday-rate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.holidayRate?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, holidayRate: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="on-call-rate">On-Call Rate ($/hr)</Label>
                  <Input
                    id="on-call-rate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.onCallRate?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, onCallRate: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Shift Differentials</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="afternoon-differential">Afternoon Differential ($/hr)</Label>
                  <Input
                    id="afternoon-differential"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.afternoonDifferential?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, afternoonDifferential: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="night-differential">Night Differential ($/hr)</Label>
                  <Input
                    id="night-differential"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.nightDifferential?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, nightDifferential: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="weekend-morning-differential">Weekend Morning Differential ($/hr)</Label>
                  <Input
                    id="weekend-morning-differential"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.weekendMorningDifferential?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({
                        ...newPosition,
                        weekendMorningDifferential: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="weekend-afternoon-differential">Weekend Afternoon Differential ($/hr)</Label>
                  <Input
                    id="weekend-afternoon-differential"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.weekendAfternoonDifferential?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({
                        ...newPosition,
                        weekendAfternoonDifferential: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="weekend-night-differential">Weekend Night Differential ($/hr)</Label>
                  <Input
                    id="weekend-night-differential"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPosition.weekendNightDifferential?.toString() || "0"}
                    onChange={(e) =>
                      setNewPosition({
                        ...newPosition,
                        weekendNightDifferential: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 "  >
            <Button variant="outline" onClick={() => setShowAddDialog(false)} className="w-full mb-4 sm:w-auto">
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto mb-4 bg-indigo-900 text-white hover:bg-indigo-800"
              onClick={handleAddPosition}
              disabled={!newPosition.title || newPosition.baseRate === undefined || false}
            >
              Add Position
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Position Dialog */}
      <Dialog open={!!editingPosition} onOpenChange={(open) => !open && setEditingPosition(null)}>
        <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[90vh] space-x-4 p-7">
          <DialogHeader>
            <DialogTitle>Edit Position</DialogTitle>
            <DialogDescription>Update position information and pay rates</DialogDescription>
          </DialogHeader>
          {editingPosition && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-position-title">Position Title</Label>
                <Input
                  id="edit-position-title"
                  value={editingPosition.title}
                  onChange={(e) => setEditingPosition({ ...editingPosition, title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Standard Rates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-base-rate">Base Rate ($/hr)</Label>
                    <Input
                      id="edit-base-rate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.baseRate}
                      onChange={(e) =>
                        setEditingPosition({ ...editingPosition, baseRate: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-overtime-rate">Overtime Rate ($/hr)</Label>
                    <Input
                      id="edit-overtime-rate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.overtimeRate}
                      onChange={(e) =>
                        setEditingPosition({ ...editingPosition, overtimeRate: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-holiday-rate">Holiday Rate ($/hr)</Label>
                    <Input
                      id="edit-holiday-rate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.holidayRate}
                      onChange={(e) =>
                        setEditingPosition({ ...editingPosition, holidayRate: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-on-call-rate">On-Call Rate ($/hr)</Label>
                    <Input
                      id="edit-on-call-rate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.onCallRate}
                      onChange={(e) =>
                        setEditingPosition({ ...editingPosition, onCallRate: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Shift Differentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-afternoon-differential">Afternoon Differential ($/hr)</Label>
                    <Input
                      id="edit-afternoon-differential"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.afternoonDifferential}
                      onChange={(e) =>
                        setEditingPosition({
                          ...editingPosition,
                          afternoonDifferential: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-night-differential">Night Differential ($/hr)</Label>
                    <Input
                      id="edit-night-differential"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.nightDifferential}
                      onChange={(e) =>
                        setEditingPosition({
                          ...editingPosition,
                          nightDifferential: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-weekend-morning-differential">Weekend Morning Differential ($/hr)</Label>
                    <Input
                      id="edit-weekend-morning-differential"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.weekendMorningDifferential}
                      onChange={(e) =>
                        setEditingPosition({
                          ...editingPosition,
                          weekendMorningDifferential: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-weekend-afternoon-differential">Weekend Afternoon Differential ($/hr)</Label>
                    <Input
                      id="edit-weekend-afternoon-differential"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.weekendAfternoonDifferential}
                      onChange={(e) =>
                        setEditingPosition({
                          ...editingPosition,
                          weekendAfternoonDifferential: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-weekend-night-differential">Weekend Night Differential ($/hr)</Label>
                    <Input
                      id="edit-weekend-night-differential"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPosition.weekendNightDifferential}
                      onChange={(e) =>
                        setEditingPosition({
                          ...editingPosition,
                          weekendNightDifferential: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Custom Rates</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowAddCustomRateDialog(true)} className="h-8">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Custom Rate
                  </Button>
                </div>

                {editingPosition.customRates.length > 0 ? (
                  <div className="space-y-2">
                    {editingPosition.customRates.map((rate) => (
                      <div
                        key={rate.id}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="font-medium">{rate.name}</p>
                          <p className="text-sm text-gray-600">{formatCurrency(rate.rate)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => handleDeleteCustomRate(editingPosition.id, rate.id)}
                          aria-label={`Delete ${rate.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">No custom rates added</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setEditingPosition(null)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto mb-3 bg-indigo-900 text-white hover:bg-indigo-800"
              onClick={handleEditPosition}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Custom Rate Dialog */}
      <Dialog open={showAddCustomRateDialog} onOpenChange={setShowAddCustomRateDialog}>
        <DialogContent className="sm:max-w-md max-w-[95vw] p-6">
          <DialogHeader>
            <DialogTitle>Add Custom Rate</DialogTitle>
            <DialogDescription>Create a custom rate type for this position</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="custom-rate-name">
                Rate Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="custom-rate-name"
                value={newCustomRate.name}
                onChange={(e) => setNewCustomRate({ ...newCustomRate, name: e.target.value })}
                placeholder="e.g., Teaching Rate, Consultation Rate, etc."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custom-rate-amount">
                Rate Amount ($/hr) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="custom-rate-amount"
                type="number"
                min="0"
                step="0.01"
                value={newCustomRate.rate?.toString() || "0"}
                onChange={(e) => setNewCustomRate({ ...newCustomRate, rate: Number.parseFloat(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowAddCustomRateDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto"
              onClick={handleAddCustomRate}
              disabled={!newCustomRate.name || newCustomRate.rate === undefined}
            >
              Add Custom Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}