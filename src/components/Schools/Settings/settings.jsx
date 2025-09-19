import React, { useState, useContext, createContext } from "react";
import { User, Bell, Shield, Globe, Edit, Save, X, CheckCircle, AlertCircle, Loader } from "lucide-react";

// Reusable components from previous themes
const Button = ({ variant = "default", size = "default", children, className = "", disabled, ...props }) => {
  let classes = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  if (variant === "default") classes += " bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md";
  if (variant === "secondary") classes += " bg-gray-200 text-gray-800 hover:bg-gray-300";
  if (variant === "outline") classes += " border border-gray-300 hover:bg-gray-100 hover:border-gray-400";
  if (variant === "success") classes += " bg-green-600 text-white hover:bg-green-700";
  if (size === "sm") classes += " h-8 px-3";
  else classes += " h-10 px-4 py-2";
  return <button className={`${classes} ${className}`} disabled={disabled} {...props}>{children}</button>;
};

const Card = ({ children, className = "" }) => <div className={`rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>{children}</div>;

const CardContent = ({ children, className = "" }) => <div className={`p-6 ${className}`}>{children}</div>;

const CardHeader = ({ children, className = "" }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;

const CardTitle = ({ children, className = "" }) => <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;

const Input = ({ className = "", error, ...props }) => (
  <input 
    className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 transition-colors ${
      error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:ring-blue-500'
    } ${className}`} 
    {...props} 
  />
);

const TabsContext = createContext(null);

const Tabs = ({ value, onValueChange, children }) => {
  return <TabsContext.Provider value={{ value, onValueChange }}>{children}</TabsContext.Provider>;
};

const TabsList = ({ children, className = "" }) => <div className={`grid w-full grid-cols-4 rounded-md bg-gray-100 p-1 ${className}`}>{children}</div>;

const TabsTrigger = ({ value, children, icon, className = "" }) => {
  const { value: active, onValueChange } = useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      data-state={isActive ? "active" : undefined}
      onClick={() => onValueChange(value)}
      className={`flex items-center justify-center gap-2 w-full rounded-sm text-gray-500 data-[state=active]:text-black data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-gray-200 transition-all hover:bg-gray-50 ${className}`}
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </button>
  );
};

const TabsContent = ({ value, children, className = "" }) => {
  const { value: active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div className={`animate-in fade-in-50 ${className}`}>{children}</div>;
};

const Label = ({ children, htmlFor, className = "", required }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

// Simple Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-in fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Password strength indicator
const PasswordStrength = ({ password }) => {
  const strength = password.length < 6 ? 'weak' : password.length < 10 ? 'medium' : 'strong';
  const colors = { weak: 'bg-red-500', medium: 'bg-yellow-500', strong: 'bg-green-500' };
  return (
    <div className="mt-1">
      <div className="flex gap-1">
        <div className={`h-1 w-1/3 rounded ${strength === 'weak' || strength === 'medium' || strength === 'strong' ? colors[strength] : 'bg-gray-200'}`}></div>
        <div className={`h-1 w-1/3 rounded ${strength === 'medium' || strength === 'strong' ? colors[strength] : 'bg-gray-200'}`}></div>
        <div className={`h-1 w-1/3 rounded ${strength === 'strong' ? colors[strength] : 'bg-gray-200'}`}></div>
      </div>
      <p className="text-xs text-gray-500 mt-1 capitalize">{strength} password</p>
    </div>
  );
};

export default function SettingsModule() {
  const [tab, setTab] = useState("client-interface");
  const [loading, setLoading] = useState(false);

  // States for each tab's forms
  const [clientInterface, setClientInterface] = useState({
    theme: "light",
    language: "english",
    fontSize: "medium",
  });

  const [userSettings, setUserSettings] = useState({
    username: "user123",
    email: "user@example.com",
    fullName: "John Doe",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    password: "",
    confirmPassword: "",
  });

  // Validation states
  const [errors, setErrors] = useState({});

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("");

  const validateForm = (tabName) => {
    const newErrors = {};
    if (tabName === "user-settings") {
      if (!userSettings.email.includes('@')) newErrors.email = "Invalid email";
      if (userSettings.username.length < 3) newErrors.username = "Username too short";
    }
    if (tabName === "security") {
      if (security.password && security.password !== security.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (tabName) => {
    if (!validateForm(tabName)) return;
    setCurrentTab(tabName);
    setShowConfirmModal(true);
  };

  const confirmSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Settings for ${currentTab} saved successfully!`);
      setShowConfirmModal(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and configurations</p>
      </div>

      <Card>
        <Tabs value={tab} onValueChange={setTab}>
          <CardHeader className="pb-3">
            <CardTitle className="sr-only">Settings Tabs</CardTitle>
            <TabsList>
              <TabsTrigger value="client-interface" icon={<Globe className="h-4 w-4" />}>Interface</TabsTrigger>
              <TabsTrigger value="user-settings" icon={<User className="h-4 w-4" />}>Profile</TabsTrigger>
              <TabsTrigger value="notifications" icon={<Bell className="h-4 w-4" />}>Notifications</TabsTrigger>
              <TabsTrigger value="security" icon={<Shield className="h-4 w-4" />}>Security</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="space-y-6">
            <TabsContent value="client-interface" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <select
                    id="theme"
                    value={clientInterface.theme}
                    onChange={(e) => setClientInterface({ ...clientInterface, theme: e.target.value })}
                    className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full hover:border-gray-300 transition-colors"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={clientInterface.language}
                    onChange={(e) => setClientInterface({ ...clientInterface, language: e.target.value })}
                    className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full hover:border-gray-300 transition-colors"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <select
                    id="fontSize"
                    value={clientInterface.fontSize}
                    onChange={(e) => setClientInterface({ ...clientInterface, fontSize: e.target.value })}
                    className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm w-full hover:border-gray-300 transition-colors"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
              <Button onClick={() => handleSave("Client Interface")} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="user-settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username" required>Username</Label>
                  <Input
                    id="username"
                    value={userSettings.username}
                    onChange={(e) => setUserSettings({ ...userSettings, username: e.target.value })}
                    placeholder="Enter username"
                    error={errors.username}
                  />
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={userSettings.fullName}
                    onChange={(e) => setUserSettings({ ...userSettings, fullName: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email" required>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                    placeholder="Enter email"
                    error={errors.email}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <Button onClick={() => handleSave("User Settings")} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Get instant notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    id="pushNotifications"
                    checked={notifications.pushNotifications}
                    onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Receive SMS alerts</p>
                  </div>
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    checked={notifications.smsNotifications}
                    onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("Notifications")} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <input
                    type="checkbox"
                    id="twoFactor"
                    checked={security.twoFactor}
                    onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={security.password}
                    onChange={(e) => setSecurity({ ...security, password: e.target.value })}
                    placeholder="Enter new password"
                  />
                  {security.password && <PasswordStrength password={security.password} />}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    error={errors.confirmPassword}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
              <Button onClick={() => handleSave("Security")} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Confirm Save Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Save"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <p>Are you sure you want to save changes to {currentTab}?</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button onClick={confirmSave} disabled={loading}>
            {loading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
            {loading ? 'Saving...' : 'Confirm'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}