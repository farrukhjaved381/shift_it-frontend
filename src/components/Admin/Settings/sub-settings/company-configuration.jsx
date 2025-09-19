import { useState, useEffect } from "react";
import { ArrowLeft, Save, MapPin, Phone, Mail, User, Globe, Info, Check, AlertTriangle } from "lucide-react";

export default function CompanyConfiguration({ onNavigateBack }) {
  // Default company info
  const defaultCompanyInfo = {
    name: "SHIFTit Solutions",
    legalName: "SHIFTit Solutions Inc.",
    type: "corporation",
    industry: "Software",
    taxId: "12-3456789",
    website: "https://shiftit.example.com",
    email: "info@shiftit.example.com",
    phone: "(555) 123-4567",
    reportingState: "California",
    address: {
      street: "123 Innovation Way",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
    },
    contacts: [
      {
        id: "1",
        name: "Alex Johnson",
        title: "Chief Executive Officer",
        email: "alex@shiftit.example.com",
        phone: "(555) 987-6543",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        name: "Sam Rivera",
        title: "Operations Manager",
        email: "sam@shiftit.example.com",
        phone: "(555) 456-7890",
      },
    ],
    description: "SHIFTit Solutions provides innovative workforce management software for businesses of all sizes.",
  };

  // State variables
  const [companyInfo, setCompanyInfo] = useState(defaultCompanyInfo);
  const [activeTab, setActiveTab] = useState("general");
  const [isFormModified, setIsFormModified] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
  });
  const [isAddingContact, setIsAddingContact] = useState(false);

  // Set form as modified when any input changes
  useEffect(() => {
    setIsFormModified(true);
  }, [companyInfo]);

  // Function to handle back navigation
  const handleBackNavigation = () => {
    if (isFormModified) {
      setShowConfirmDialog(true);
    } else {
      onNavigateBack();
    }
  };

  // Function to update company info
  const updateCompanyInfo = (field, value) => {
    setCompanyInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to update address
  const updateAddress = (field, value) => {
    setCompanyInfo((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  // Function to add a new contact
  const addContact = () => {
    if (newContact.name && newContact.email) {
      const contact = {
        id: Date.now().toString(),
        name: newContact.name || "",
        title: newContact.title || "",
        email: newContact.email || "",
        phone: newContact.phone || "",
      };

      setCompanyInfo((prev) => ({
        ...prev,
        contacts: [...prev.contacts, contact],
      }));

      setNewContact({
        name: "",
        title: "",
        email: "",
        phone: "",
      });

      setIsAddingContact(false);
    }
  };

  // Function to remove a contact
  const removeContact = (id) => {
    setCompanyInfo((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));
  };

  // Function to save company info
  const saveCompanyInfo = () => {
    console.log("Saving company info:", companyInfo);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    setIsFormModified(false);
  };

  // Function to save and navigate back
  const saveAndNavigateBack = () => {
    saveCompanyInfo();
    setShowConfirmDialog(false);
    onNavigateBack();
  };

  // Function to discard changes and navigate back
  const discardAndNavigateBack = () => {
    setShowConfirmDialog(false);
    onNavigateBack();
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6 bg-gray-100">  {/* Added bg-gray-100 for background */}
        <div className="flex items-center">
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={handleBackNavigation}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-900 my-4">Company Configuration</h1>
            <p className="text-sm text-gray-600">Manage your company details and contact information</p>
          </div>
        </div>

        {showSuccessMessage && (
          <div className="bg-gray-100 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <div>
                <h4 className="font-medium text-green-800">Success</h4>
                <p className="text-sm text-green-700">Company information has been saved successfully.</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tabs Header */}
          <div className="border-b overflow-x-auto">
            <div className="bg-transparent h-12 sm:h-14 px-2 sm:px-4 flex">
              <button
                className={`px-4 py-2 text-xs sm:text-sm transition-colors ${
                  activeTab === "general"
                    ? "bg-indigo-100 text-indigo-900 border-b-2 border-indigo-900"
                    : "text-gray-600 hover:text-indigo-900"
                }`}
                onClick={() => setActiveTab("general")}
              >
                General Information
              </button>
              <button
                className={`px-4 py-2 text-xs sm:text-sm transition-colors ${
                  activeTab === "address"
                    ? "bg-indigo-100 text-indigo-900 border-b-2 border-indigo-900"
                    : "text-gray-600 hover:text-indigo-900"
                }`}
                onClick={() => setActiveTab("address")}
              >
                Address
              </button>
              <button
                className={`px-4 py-2 text-xs sm:text-sm transition-colors ${
                  activeTab === "contacts"
                    ? "bg-indigo-100 text-indigo-900 border-b-2 border-indigo-900"
                    : "text-gray-600 hover:text-indigo-900"
                }`}
                onClick={() => setActiveTab("contacts")}
              >
                Contact Persons
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            {/* General Tab */}
            {activeTab === "general" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      value={companyInfo.name}
                      onChange={(e) => updateCompanyInfo("name", e.target.value)}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base min-h-[44px] transition-colors"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="legal-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Name
                    </label>
                    <input
                      id="legal-name"
                      type="text"
                      value={companyInfo.legalName}
                      onChange={(e) => updateCompanyInfo("legalName", e.target.value)}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base min-h-[44px] transition-colors"
                      placeholder="Enter legal name"
                    />
                  </div>

                  <div>
                    <label htmlFor="company-type" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Type
                    </label>
                    <select
                      id="company-type"
                      value={companyInfo.type}
                      onChange={(e) => updateCompanyInfo("type", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="corporation">Corporation</option>
                      <option value="llc">Limited Liability Company (LLC)</option>
                      <option value="partnership">Partnership</option>
                      <option value="soleProprietorship">Sole Proprietorship</option>
                      <option value="nonprofit">Non-Profit Organization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <input
                      id="industry"
                      type="text"
                      value={companyInfo.industry}
                      onChange={(e) => updateCompanyInfo("industry", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter industry"
                    />
                  </div>

                  <div>
                    <label htmlFor="reporting-state" className="block text-sm font-medium text-gray-700">
                      SHIFTerz Reporting State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="reporting-state"
                      value={companyInfo.reportingState}
                      onChange={(e) => updateCompanyInfo("reportingState", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Alabama">Alabama</option>
                      <option value="Alaska">Alaska</option>
                      <option value="Arizona">Arizona</option>
                      <option value="Arkansas">Arkansas</option>
                      <option value="California">California</option>
                      <option value="Colorado">Colorado</option>
                      <option value="Connecticut">Connecticut</option>
                      <option value="Delaware">Delaware</option>
                      <option value="Florida">Florida</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Idaho">Idaho</option>
                      <option value="Illinois">Illinois</option>
                      <option value="Indiana">Indiana</option>
                      <option value="Iowa">Iowa</option>
                      <option value="Kansas">Kansas</option>
                      <option value="Kentucky">Kentucky</option>
                      <option value="Louisiana">Louisiana</option>
                      <option value="Maine">Maine</option>
                      <option value="Maryland">Maryland</option>
                      <option value="Massachusetts">Massachusetts</option>
                      <option value="Michigan">Michigan</option>
                      <option value="Minnesota">Minnesota</option>
                      <option value="Mississippi">Mississippi</option>
                      <option value="Missouri">Missouri</option>
                      <option value="Montana">Montana</option>
                      <option value="Nebraska">Nebraska</option>
                      <option value="Nevada">Nevada</option>
                      <option value="New Hampshire">New Hampshire</option>
                      <option value="New Jersey">New Jersey</option>
                      <option value="New Mexico">New Mexico</option>
                      <option value="New York">New York</option>
                      <option value="North Carolina">North Carolina</option>
                      <option value="North Dakota">North Dakota</option>
                      <option value="Ohio">Ohio</option>
                      <option value="Oklahoma">Oklahoma</option>
                      <option value="Oregon">Oregon</option>
                      <option value="Pennsylvania">Pennsylvania</option>
                      <option value="Rhode Island">Rhode Island</option>
                      <option value="South Carolina">South Carolina</option>
                      <option value="South Dakota">South Dakota</option>
                      <option value="Tennessee">Tennessee</option>
                      <option value="Texas">Texas</option>
                      <option value="Utah">Utah</option>
                      <option value="Vermont">Vermont</option>
                      <option value="Virginia">Virginia</option>
                      <option value="Washington">Washington</option>
                      <option value="West Virginia">West Virginia</option>
                      <option value="Wisconsin">Wisconsin</option>
                      <option value="Wyoming">Wyoming</option>
                      <option value="District of Columbia">District of Columbia</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      This determines which state's labor laws will be applied to SHIFTerz operations.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="tax-id" className="block text-sm font-medium text-gray-700">
                      Tax ID / EIN
                    </label>
                    <input
                      id="tax-id"
                      type="text"
                      value={companyInfo.taxId}
                      onChange={(e) => updateCompanyInfo("taxId", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="XX-XXXXXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <Globe className="h-4 w-4" />
                      </span>
                      <input
                        id="website"
                        type="url"
                        value={companyInfo.website}
                        onChange={(e) => updateCompanyInfo("website", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <Mail className="h-4 w-4" />
                      </span>
                      <input
                        id="email"
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => updateCompanyInfo("email", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="info@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex mt-1">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <Phone className="h-4 w-4" />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        value={companyInfo.phone}
                        onChange={(e) => updateCompanyInfo("phone", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="(XXX) XXX-XXXX"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Company Description
                  </label>
                  <textarea
                    id="description"
                    value={companyInfo.description}
                    onChange={(e) => updateCompanyInfo("description", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                    placeholder="Brief description of your company"
                  />
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === "address" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <input
                      id="street"
                      type="text"
                      value={companyInfo.address.street}
                      onChange={(e) => updateAddress("street", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="123 Main St, Suite 100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={companyInfo.address.city}
                    onChange={(e) => updateAddress("city", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State / Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={companyInfo.address.state}
                    onChange={(e) => updateAddress("state", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="State or Province"
                  />
                </div>

                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                    ZIP / Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="zip"
                    type="text"
                    value={companyInfo.address.zip}
                    onChange={(e) => updateAddress("zip", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="ZIP or Postal Code"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={companyInfo.address.country}
                    onChange={(e) => updateAddress("country", e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Country"
                  />
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === "contacts" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Contact Persons</h3>
                  <button
                    onClick={() => setIsAddingContact(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Add Contact
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companyInfo.contacts.map((contact) => (
                    <div key={contact.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white font-bold">
                              {contact.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{contact.name}</h4>
                              <p className="text-sm text-gray-600">{contact.title}</p>
                            </div>
                          </div>
                          <button
                            className="p-1 text-red-500 hover:text-red-700"
                            onClick={() => removeContact(contact.id)}
                            aria-label="Remove contact"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{contact.email}</span>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {companyInfo.contacts.length === 0 && (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <User className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">No contacts added yet</h3>
                    <p className="mt-2 text-gray-600">Add contact persons to manage your company's key personnel.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mb-7 m-4">
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={saveCompanyInfo}
          >
            <Save className="inline h-4 w-4 mr-2 py-3" />
            Save Company Information
          </button>
        </div>
      </div>

      {/* Add Contact Dialog */}
      {isAddingContact && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-medium mb-4">Add Contact Person</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={newContact.name || ""}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="contact-title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  id="contact-title"
                  type="text"
                  value={newContact.title || ""}
                  onChange={(e) => setNewContact({ ...newContact, title: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Job title"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={newContact.email || ""}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={newContact.phone || ""}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setIsAddingContact(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={addContact}
                disabled={!newContact.name || !newContact.email}
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
{showConfirmDialog && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowConfirmDialog(false)}>
    <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
      <h2 className="text-lg font-medium mb-4 flex items-center">
        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
        Unsaved Changes
      </h2>
      <p className="mb-4">You have unsaved changes. What would you like to do?</p>
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          onClick={() => setShowConfirmDialog(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
          onClick={discardAndNavigateBack}
        >
          Discard Changes
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={saveAndNavigateBack}
        >
          Save & Exit
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}