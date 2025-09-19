import React, { useState } from 'react';
import { Home, User, RefreshCw, Calendar, BarChart3, Settings, Users, FileText, ArrowLeft, Building2, Upload, Save, MapPin, Phone, Mail, Plus, AlertTriangle, X } from 'lucide-react';

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
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
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
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    teal: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
    blue: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  };
  
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
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
  defaultValue = '',
  name = ''
}) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    defaultValue={defaultValue}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${className}`}
  />
);

const Textarea = ({ 
  id, 
  value, 
  onChange, 
  placeholder = '',
  className = '',
  rows = 4
}) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-vertical ${className}`}
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

const Select = ({ children, value, onChange, defaultValue, className = '' }) => (
  <select
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${className}`}
  >
    {children}
  </select>
);

const Avatar = ({ children, className = '' }) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
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
  <div className={`inline-flex h-10 items-center justify-center rounded-md p-1 ${className}`}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ children, value, className = '', activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all ${
      activeTab === value 
        ? 'bg-purple-600 text-white' 
        : 'text-gray-600 hover:text-gray-900'
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

// Modal Dialog Components
const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const DialogTrigger = ({ children, isOpen, setIsOpen }) => (
  <div onClick={() => setIsOpen(true)}>
    {children}
  </div>
);

const DialogContent = ({ children, className = '', isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 ${className}`}>
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const DialogTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const DialogDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 mt-1 ${className}`}>
    {children}
  </p>
);

const DialogFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 flex justify-end gap-3 ${className}`}>
    {children}
  </div>
);



// Main Component
export default function CompanyConfigurationPage() {
  // State for contact persons
  const [contactPersons, setContactPersons] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      title: "Chief Executive Officer",
      email: "alex@shiftit.example.com",
      phone: "(555) 987-6543",
      emailOptIn: true,
      smsOptIn: true,
      initials: "AJ",
      avatarColor: "bg-purple-600 text-white",
    },
    {
      id: 2,
      name: "Sam Rivera",
      title: "Operations Manager",
      email: "sam@shiftit.example.com",
      phone: "(555) 456-7890",
      emailOptIn: true,
      smsOptIn: false,
      initials: "SR",
      avatarColor: "bg-blue-600 text-white",
    },
    {
      id: 3,
      name: "Maria Chen",
      title: "Clinical Director",
      email: "maria@shiftit.example.com",
      phone: "(555) 123-4567",
      emailOptIn: false,
      smsOptIn: true,
      initials: "MC",
      avatarColor: "bg-teal-600 text-white",
    },
  ]);

  // State for the new contact form
  const [newContact, setNewContact] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    emailOptIn: false,
    smsOptIn: false,
  });

  // Function to add a new contact
  const addContact = () => {
    if (!newContact.name || !newContact.title || !newContact.email || !newContact.phone) {
      return; // Don't add if required fields are empty
    }

    // Generate initials from name
    const nameParts = newContact.name.split(" ");
    const initials =
      nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[1][0]}` : `${nameParts[0][0]}${nameParts[0][1] || ""}`;

    // Rotate through brand colors
    const colors = ["bg-purple-600", "bg-blue-600", "bg-teal-600"];
    const colorIndex = contactPersons.length % colors.length;

    const newContactWithDetails = {
      id: contactPersons.length + 1,
      ...newContact,
      initials: initials.toUpperCase(),
      avatarColor: `${colors[colorIndex]} text-white`,
    };

    setContactPersons([...contactPersons, newContactWithDetails]);

    // Reset form
    setNewContact({
      name: "",
      title: "",
      email: "",
      phone: "",
      emailOptIn: false,
      smsOptIn: false,
    });
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewContact({
      ...newContact,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <a href="#" className="text-gray-500 hover:text-purple-600">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-2xl font-semibold text-blue-600">Company Configuration</h1>
          </div>
          <p className="text-gray-500 mt-1">Manage clinical site details and preferences</p>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6 bg-white border">
              <TabsTrigger value="general">General Information</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
            </TabsList>

            {/* General Information Tab */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center gap-2">
                    <Building2 className="w-5 h-5" /> General Information
                  </CardTitle>
                  <CardDescription>Basic information about your clinical site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="facility-name">Facility Name</Label>
                        <Input id="facility-name" placeholder="e.g. Memorial General Hospital" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="facility-type">Facility Type</Label>
                        <Input id="facility-type" placeholder="e.g. Teaching Hospital, Community Clinic, etc." />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tax-id">Tax ID / EIN</Label>
                        <Input id="tax-id" placeholder="XX-XXXXXXX" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" placeholder="https://www.example.com" />
                      </div>
                    </div>

                    <div className="w-full md:w-1/3 space-y-4">
                      <div className="space-y-2">
                        <Label>Facility Logo</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 h-40">
                          <Upload className="w-10 h-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 text-center">
                            Drag and drop your logo here or{" "}
                            <span className="text-purple-600 font-medium cursor-pointer">browse files</span>
                          </p>
                          <p className="text-xs text-gray-400 mt-2">PNG, JPG or SVG (max. 2MB)</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="established">Year Established</Label>
                        <Input id="established" placeholder="e.g. 1985" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Facility Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your facility..."
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address">
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-600 flex items-center gap-2">
                        <MapPin className="w-5 h-5" /> Address Information
                      </CardTitle>
                      <CardDescription>Physical location of your clinical site</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street-address">Street Address</Label>
                      <Input id="street-address" placeholder="123 Main St" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-line2">Address Line 2</Label>
                      <Input id="address-line2" placeholder="Suite 100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Anytown" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select id="state">
                        <option value="">Select state</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="CA">California</option>
                        <option value="FL">Florida</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="12345" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select id="country" defaultValue="US">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Contact Details Tab */}
            <TabsContent value="contact">
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-600 flex items-center gap-2">
                        <User className="w-5 h-5" /> Contact Persons
                      </CardTitle>
                      <CardDescription>People to contact at your clinical site</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="teal">
                          <Plus className="w-4 h-4 mr-2" /> Add Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add New Contact</DialogTitle>
                          <DialogDescription>Add a new contact person for your clinical site.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 px-6">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name*
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={newContact.name}
                              onChange={handleInputChange}
                              className="col-span-3"
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                              Title*
                            </Label>
                            <Input
                              id="title"
                              name="title"
                              value={newContact.title}
                              onChange={handleInputChange}
                              className="col-span-3"
                              placeholder="Clinical Director"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email*
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={newContact.email}
                              onChange={handleInputChange}
                              className="col-span-3"
                              placeholder="john.doe@example.com"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                              Phone*
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={newContact.phone}
                              onChange={handleInputChange}
                              className="col-span-3"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Opt-in</Label>
                            <div className="col-span-3 flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id="emailOptIn"
                                  name="emailOptIn"
                                  checked={newContact.emailOptIn}
                                  onChange={handleInputChange}
                                  className="rounded"
                                />
                                <Label htmlFor="emailOptIn" className="text-sm">
                                  Email
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id="smsOptIn"
                                  name="smsOptIn"
                                  checked={newContact.smsOptIn}
                                  onChange={handleInputChange}
                                  className="rounded"
                                />
                                <Label htmlFor="smsOptIn" className="text-sm">
                                  SMS
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={addContact}
                          >
                            Add Contact
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactPersons.map((contact) => (
                      <div key={contact.id} className="border rounded-lg overflow-hidden bg-white">
                        <div className="bg-gray-100 p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className={contact.avatarColor}>
                              {contact.initials}
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-gray-900">{contact.name}</h3>
                              <p className="text-sm text-gray-500">{contact.title}</p>
                            </div>
                          </div>
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{contact.email}</span>
                            {contact.emailOptIn && (
                              <Badge className="ml-auto bg-green-100 text-green-800 border-green-200">
                                Email Opt-in
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{contact.phone}</span>
                            {contact.smsOptIn ? (
                              <Badge className="ml-auto bg-green-100 text-green-800 border-green-200">
                                SMS Opt-in
                              </Badge>
                            ) : (
                              <Badge className="ml-auto bg-gray-100 text-gray-800 border-gray-200">
                                No SMS
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-600 flex items-center gap-2">
                        <Mail className="w-5 h-5" /> General Contact Information
                      </CardTitle>
                      <CardDescription>General contact details for your clinical site</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="main-phone">Main Phone Number</Label>
                      <Input id="main-phone" placeholder="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fax">Fax Number</Label>
                      <Input id="fax" placeholder="(555) 123-4568" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="general-email">General Email</Label>
                      <Input id="general-email" type="email" placeholder="info@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-contact">Emergency Contact Number</Label>
                      <Input id="emergency-contact" placeholder="(555) 123-4569" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button variant="blue">
                  <Save className="w-4 h-4 mr-2" /> Save Company Information
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}