import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6 mobile-container">
      {/* Header */}
      <header className="bg-white p-3 sm:p-4 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 rounded-lg shadow-sm mb-4 sm:mb-6 safe-area-top">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-900">Settings</h1>
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors touch-friendly">
            <span className="text-gray-600 text-sm">🔍</span>
          </button>
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors touch-friendly">
            <span className="text-gray-600"><Bell /></span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Souheil Jawad</span>
            <button className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors touch-friendly">
              <span className="text-gray-600">▼</span>
            </button>
          </div>
        </div>
      </header>

      {/* Client Interface Setup Section */}
      <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm safe-area-bottom">
        <h2 className="text-base sm:text-lg font-semibold text-indigo-900 mb-3 sm:mb-4">Client Interface Setup</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Access all client management applications</p>

        {/* Grid of Modules */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Company Configuration */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors min-h-[120px] touch-manipulation"
            onClick={() => navigate('/settings/company-configuration')}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-xl sm:text-2xl">🏢</span>
            </div>
            <h3 className="font-medium text-gray-900 text-sm sm:text-base">Company Configuration</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage company details</p>
          </button>

          {/* Shifts Setup */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/shifts-setup')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl">⏰</span>
            </div>
            <h3 className="font-medium text-gray-900">Shifts Setup</h3>
            <p className="text-sm text-gray-500">Configure shift patterns</p>
          </button>

          {/* Scheduling Preferences */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/scheduling-preferences')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl">📅</span>
            </div>
            <h3 className="font-medium text-gray-900">Scheduling Preferences</h3>
            <p className="text-sm text-gray-500">Set up scheduling preferences</p>
          </button>

          {/* Department Structures */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/department-structures')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl">🗂️</span>
            </div>
            <h3 className="font-medium text-gray-900">Department Structures</h3>
            <p className="text-sm text-gray-500">Manage department hierarchies</p>
          </button>

          {/* SHIFTerz Rates Setup */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/shifterz-rates-setup')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl">👥</span>
            </div>
            <h3 className="font-medium text-gray-900">SHIFTerz Rates Setup</h3>
            <p className="text-sm text-gray-500">Manage teams and members</p>
          </button>

          {/* Reports & Analytics */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/reports-analytics')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl">📊</span>
            </div>
            <h3 className="font-medium text-gray-900">Reports & Analytics</h3>
            <p className="text-sm text-gray-500">View performance reports</p>
          </button>

          {/* Documentation */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/documentation')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl">📄</span>
            </div>
            <h3 className="font-medium text-gray-900">Documentation</h3>
            <p className="text-sm text-gray-500">Access client documentation</p>
          </button>

          {/* Communication */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/communication')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h3 className="font-medium text-gray-900">Communication</h3>
            <p className="text-sm text-gray-500">Messaging and notifications</p>
          </button>

          {/* System Settings */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/system-settings')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl">⚙️</span>
            </div>
            <h3 className="font-medium text-gray-900">System Settings</h3>
            <p className="text-sm text-gray-500">Configure system preferences</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;