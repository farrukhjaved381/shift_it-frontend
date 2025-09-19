import React, { useState } from 'react';

// Icon Components
const HomeIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UserIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const RefreshIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const CalendarIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ChartIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingsIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UsersIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const DocumentIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const EditIcon = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const BellIcon = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zm0 0V6.5A1.5 1.5 0 0013.5 5h-3A1.5 1.5 0 009 6.5V17" />
  </svg>
);

const MailIcon = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
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
  <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  className = '',
  onClick,
  type = 'button',
  disabled = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  };

  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1.5 text-xs',
  };

  return (
    <button
      type={type}
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
  required = false
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
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

const Alert = ({ children, className = '' }) => (
  <div className={`rounded-md p-4 ${className}`}>
    {children}
  </div>
);

const AlertTitle = ({ children, className = '' }) => (
  <h5 className={`font-medium text-sm ${className}`}>
    {children}
  </h5>
);

const AlertDescription = ({ children, className = '' }) => (
  <div className={`mt-2 text-sm ${className}`}>
    {children}
  </div>
);

// Info Icon Component
const InfoIcon = ({ className = '' }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const Separator = ({ className = '' }) => (
  <hr className={`border-gray-200 ${className}`} />
);

// Change Password Modal
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    return minLength && hasUppercase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = 'Password does not meet requirements';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert('Password updated successfully!');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-500 mt-1">Update your account password</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Include at least one uppercase letter</li>
              <li>• Include at least one number</li>
              <li>• Include at least one special character</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              className={errors.currentPassword ? 'border-red-500' : ''}
            />
            {errors.currentPassword && <p className="text-red-600 text-sm">{errors.currentPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className={errors.newPassword ? 'border-red-500' : ''}
            />
            {errors.newPassword && <p className="text-red-600 text-sm">{errors.newPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update Password</Button>
        </div>
      </div>
    </div>
  );
};

// Main Profile Component
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'security', label: 'Security' },
    { id: 'preferences', label: 'Preferences' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Summary Card */}
              <Card className="md:w-1/3">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-orange-800">SJ</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Souheil Jawad</h2>
                    <p className="text-sm text-gray-500 mb-4">Clinical Administrator</p>

                    <div className="w-full space-y-3 mt-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MailIcon className="w-4 h-4 mr-2 text-purple-600" />
                        <span>souheil.jawad@shiftit.com</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="w-4 h-4 mr-2 text-purple-600" />
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4 mr-2 text-purple-600" />
                        <span>San Francisco, CA</span>
                      </div>
                    </div>

                    <div className="w-full mt-6">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <EditIcon className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <div className="md:w-2/3">
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'personal' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Your personal and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Full Name</h3>
                        <p className="text-sm text-gray-600">Souheil Jawad</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Email Address</h3>
                        <p className="text-sm text-gray-600">souheil.jawad@shiftit.com</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Phone Number</h3>
                        <p className="text-sm text-gray-600">(555) 123-4567</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Address</h3>
                        <p className="text-sm text-gray-600">123 Main Street</p>
                        <p className="text-sm text-gray-600">San Francisco, CA 94105</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Position</h3>
                        <p className="text-sm text-gray-600">Clinical Administrator</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Department</h3>
                        <p className="text-sm text-gray-600">Administration</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'security' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security and login information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Password</h3>
                          <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowPasswordModal(true)}
                        >
                          Change Password
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Not enabled</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Login History</h3>
                          <p className="text-sm text-gray-500">View your recent login activity</p>
                        </div>
                        <Button variant="outline" size="sm">View History</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'preferences' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>Customize your experience and notification settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive email updates about system activities</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <BellIcon className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Language</h3>
                          <p className="text-sm text-gray-500">English (US)</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Time Zone</h3>
                          <p className="text-sm text-gray-500">Pacific Time (PT)</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
