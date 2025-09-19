import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  Users, 
  Settings, 
  Save, 
  Upload,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

// Sample data for geo-fences
const geoFences = [
  {
    id: 1,
    name: "Main Hospital - 3rd Floor",
    description: "Third floor including nursing stations and patient rooms",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
      radius: 50,
    },
    locationName: "Memorial Hospital",
    floorPlan: "/floorplans/hospital-3rd-floor.png",
    status: "Active",
    usersInZone: 12,
    lastUpdated: "2023-11-10T14:30:00Z",
  },
  {
    id: 2,
    name: "East Wing - ICU",
    description: "Intensive Care Unit and surrounding areas",
    coordinates: {
      latitude: 34.0523,
      longitude: -118.2438,
      radius: 30,
    },
    locationName: "Memorial Hospital",
    floorPlan: "/floorplans/hospital-icu.png",
    status: "Active",
    usersInZone: 5,
    lastUpdated: "2023-11-09T10:15:00Z",
  },
  {
    id: 3,
    name: "West Building - Labs",
    description: "Laboratory area including research labs and equipment rooms",
    coordinates: {
      latitude: 34.0525,
      longitude: -118.244,
      radius: 45,
    },
    locationName: "Research Medical Center",
    floorPlan: "/floorplans/west-labs.png",
    status: "Inactive",
    usersInZone: 0,
    lastUpdated: "2023-10-25T16:45:00Z",
  },
  {
    id: 4,
    name: "Emergency Department",
    description: "ER and trauma areas",
    coordinates: {
      latitude: 34.0518,
      longitude: -118.2432,
      radius: 60,
    },
    locationName: "Community Hospital",
    floorPlan: "/floorplans/emergency-dept.png",
    status: "Active",
    usersInZone: 8,
    lastUpdated: "2023-11-11T08:20:00Z",
  },
];

// Define geo-fence locations
const locations = [
  { id: 1, name: "Memorial Hospital", address: "123 Medical Center Dr, Los Angeles, CA 90095" },
  { id: 2, name: "Research Medical Center", address: "456 Health Science Blvd, Los Angeles, CA 90095" },
  { id: 3, name: "Community Hospital", address: "789 Wellness Way, Los Angeles, CA 90033" },
];

// UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-100 shadow-sm ${className}`}>
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
    primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    outline: 'border border-gray-100 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
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
  className = ''
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`flex h-10 w-full rounded-md border border-gray-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${className}`}
  />
);

const Textarea = ({ 
  id, 
  value, 
  onChange, 
  placeholder = '',
  className = '',
  rows = 3
}) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`flex w-full rounded-md border border-gray-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none ${className}`}
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

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const Switch = ({ id, checked, onCheckedChange, className = '' }) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
      checked ? 'bg-purple-600' : 'bg-gray-200'
    } ${className}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// Table Components
const Table = ({ children, className = '' }) => (
  <div className={`w-full overflow-auto ${className}`}>
    <table className="w-full caption-bottom text-sm">
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="border-b">
    {children}
  </thead>
);

const TableBody = ({ children }) => (
  <tbody className="divide-y divide-gray-200">
    {children}
  </tbody>
);

const TableRow = ({ children, className = '' }) => (
  <tr className={`border-b transition-colors hover:bg-gray-50 ${className}`}>
    {children}
  </tr>
);

const TableHead = ({ children, className = '' }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 ${className}`}>
    {children}
  </th>
);

const TableCell = ({ children, className = '' }) => (
  <td className={`p-4 align-middle ${className}`}>
    {children}
  </td>
);

// Tabs Components
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

const TabsContent = ({ children, value, activeTab }) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};

// Dialog Components
const Dialog = ({ children, open, onOpenChange }) => {
  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DialogContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const DialogHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const DialogTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h2>
);

const DialogDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>
    {children}
  </p>
);

const DialogFooter = ({ children, className = '' }) => (
  <div className={`flex justify-end gap-3 pt-4 border-t ${className}`}>
    {children}
  </div>
);

// Dropdown Menu Components
const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, isOpen, setIsOpen }) => (
  <div onClick={() => setIsOpen(!isOpen)}>
    {children}
  </div>
);

const DropdownMenuContent = ({ children, align = 'left', isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 z-10"
        onClick={() => setIsOpen(false)}
      />
      <div className={`absolute z-20 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${
        align === 'end' ? 'right-0' : 'left-0'
      }`}>
        <div className="py-1">
          {React.Children.map(children, child => 
            React.cloneElement(child, { setIsOpen })
          )}
        </div>
      </div>
    </>
  );
};

const DropdownMenuItem = ({ children, className = '', onClick, setIsOpen }) => (
  <button
    className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
    onClick={(e) => {
      if (onClick) onClick(e);
      setIsOpen(false);
    }}
  >
    {children}
  </button>
);



// Main Component
export default function GeoFencePage() {
  const [isAddGeoFenceDialogOpen, setIsAddGeoFenceDialogOpen] = useState(false);
  const [isViewFloorPlanDialogOpen, setIsViewFloorPlanDialogOpen] = useState(false);
  const [selectedGeoFence, setSelectedGeoFence] = useState(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [newGeoFence, setNewGeoFence] = useState({
    name: "",
    description: "",
    locationId: "",
    radius: "50",
    isActive: true,
  });
  const fileInputRef = useRef(null);
  const [uploadedFloorPlan, setUploadedFloorPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Handler for floor plan upload
  const handleFloorPlanUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFloorPlan(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for viewing a floor plan
  const handleViewFloorPlan = (geoFence) => {
    setSelectedGeoFence(geoFence);
    setIsViewFloorPlanDialogOpen(true);
  };

  // Handler for form input change
  const handleInputChange = (field, value) => {
    setNewGeoFence({
      ...newGeoFence,
      [field]: value,
    });
  };

  // Filter geo-fences based on search term
  const filteredGeoFences = geoFences.filter(
    (fence) =>
      fence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fence.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fence.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderTableContent = (fences) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Radius (m)</TableHead>
            <TableHead>Floor Plan</TableHead>
            <TableHead>Users in Zone</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fences.map((fence) => (
            <TableRow key={fence.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{fence.name}</span>
                  <span className="text-xs text-gray-500">{fence.description}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{fence.locationName}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    fence.status === "Active"
                      ? "bg-green-100 text-green-800 border-gray-100"
                      : "bg-gray-100 text-gray-800 border-gray-100"
                  }
                >
                  {fence.status}
                </Badge>
              </TableCell>
              <TableCell>{fence.coordinates.radius}m</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => handleViewFloorPlan(fence)}
                >
                  View Plan
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{fence.usersInZone}</span>
                </div>
              </TableCell>
              <TableCell>{new Date(fence.lastUpdated).toLocaleDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Geo Fence</DropdownMenuItem>
                    <DropdownMenuItem>View Active Users</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete Geo Fence
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-blue-600">Geo Fence Management</h1>
              <p className="text-gray-500">Create and manage geo-fenced areas for attendance tracking</p>
            </div>
            <Button
              onClick={() => setIsAddGeoFenceDialogOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Geo Fence
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Geo Fence Locations</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search locations..."
                      className="pl-8 w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Locations</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  {renderTableContent(filteredGeoFences)}
                </TabsContent>

                <TabsContent value="active">
                  {renderTableContent(filteredGeoFences.filter((fence) => fence.status === "Active"))}
                </TabsContent>

                <TabsContent value="inactive">
                  {renderTableContent(filteredGeoFences.filter((fence) => fence.status === "Inactive"))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Geo Fence Dialog */}
      <Dialog open={isAddGeoFenceDialogOpen} onOpenChange={setIsAddGeoFenceDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Geo Fence</DialogTitle>
            <DialogDescription>
              Upload a floor plan and define a geo-fenced area for attendance tracking
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Geo Fence Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Main Hospital - 3rd Floor"
                  value={newGeoFence.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe this geo-fenced area"
                  className="min-h-[80px]"
                  value={newGeoFence.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  className="flex h-10 w-full rounded-md border border-gray-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={newGeoFence.locationId}
                  onChange={(e) => handleInputChange("locationId", e.target.value)}
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="radius">Radius (meters)</Label>
                <Input
                  id="radius"
                  type="number"
                  placeholder="50"
                  value={newGeoFence.radius}
                  onChange={(e) => handleInputChange("radius", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newGeoFence.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
                <Label htmlFor="status">Active</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Floor Plan</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center h-[300px] flex flex-col items-center justify-center cursor-pointer ${
                    uploadedFloorPlan ? "border-gray-100 bg-green-50" : "border-gray-100 hover:border-gray-100"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {!uploadedFloorPlan ? (
                    <>
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-1">Upload floor plan image</p>
                      <p className="text-xs text-gray-400">Click to browse or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF up to 10MB</p>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <img
                        src={uploadedFloorPlan}
                        alt="Floor Plan Preview"
                        className="max-h-[230px] max-w-full object-contain"
                      />
                      <p className="text-xs text-gray-500 mt-2">Floor plan uploaded successfully</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={handleFloorPlanUpload}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Define Geo Fence Area</Label>
                <div className="border rounded-lg p-2 bg-gray-50 h-[100px] flex flex-col items-center justify-center">
                  <p className="text-sm text-gray-500">
                    After uploading a floor plan, you can define the geo-fence area
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    disabled={!uploadedFloorPlan}
                    onClick={() => setIsDrawingMode(!isDrawingMode)}
                  >
                    {isDrawingMode ? "Stop Drawing" : "Start Drawing"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsAddGeoFenceDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Save className="mr-2 h-4 w-4" /> Save Geo Fence
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Floor Plan Dialog */}
      <Dialog open={isViewFloorPlanDialogOpen} onOpenChange={setIsViewFloorPlanDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedGeoFence?.name} - Floor Plan</DialogTitle>
            <DialogDescription>Floor plan with geo-fence area highlighted</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {selectedGeoFence && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">{selectedGeoFence.locationName}</span>
                  </div>
                  <Badge
                    className={
                      selectedGeoFence.status === "Active"
                        ? "bg-green-100 text-green-800 border-gray-100"
                        : "bg-gray-100 text-gray-800 border-gray-100"
                    }
                  >
                    {selectedGeoFence.status}
                  </Badge>
                </div>
                <div className="p-4 flex flex-col items-center">
                  <div className="w-full max-h-[500px] bg-gray-200 rounded-md mb-3 overflow-hidden flex items-center justify-center">
                    <img
                      src={selectedGeoFence.floorPlan || "/placeholder.svg"}
                      alt={`${selectedGeoFence.name} Floor Plan`}
                      className="max-w-full max-h-[500px] object-contain"
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Coordinates:</span>
                        <span className="text-sm text-gray-500">
                          {selectedGeoFence.coordinates.latitude}, {selectedGeoFence.coordinates.longitude}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Radius:</span>
                        <span className="text-sm text-gray-500">{selectedGeoFence.coordinates.radius} meters</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Upload className="h-3.5 w-3.5" /> Upload New Version
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1 text-red-600">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}