import { Bell , SlidersHorizontal , MapPin , UserCog ,FileText , GraduationCap , Contact } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center rounded-lg shadow-sm mb-6">
        <h1 className="text-3xl font-bold text-indigo-900">Settings</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-200">
            <span className="text-gray-600">🔍</span>
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <span className="text-gray-600"><Bell /></span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Souheil Jawad</span>
            <button className="p-1 rounded-full bg-gray-200">
              <span className="text-gray-600">▼</span>
            </button>
          </div>
        </div>
      </header>

      {/* Client Interface Setup Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-indigo-900 mb-4">Client Interface Setup</h2>
        <p className="text-gray-600 mb-6">Access all client management applications</p>

        {/* Grid of Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Company Configuration */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/company-configuration')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl"><SlidersHorizontal/></span>
            </div>
            <h3 className="font-medium text-gray-900">Company Configuration</h3>
            <p className="text-sm text-gray-500">Manage company details</p>
          </button>

          {/* Geo Fence */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/geo-fence')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl"><MapPin/></span>
            </div>
            <h3 className="font-medium text-gray-900">Geo Fence</h3>
            <p className="text-sm text-gray-500">Configure location based geo in/out</p>
          </button>

           {/* User Access Management */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/user-accessManagement')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl"><UserCog/></span>
            </div>
            <h3 className="font-medium text-gray-900">User Access Management</h3>
            <p className="text-sm text-gray-500">Control user permission and access</p>
          </button>

           {/* Documentation */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/documentation')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl"><FileText/></span>
            </div>
            <h3 className="font-medium text-gray-900">Documentation</h3>
            <p className="text-sm text-gray-500">Access client documentation</p>
          </button>

           {/* Departments and disciplines*/}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/departments&disciplines')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl"><GraduationCap/></span>
            </div>
            <h3 className="font-medium text-gray-900">Departments and disciplines</h3>
            <p className="text-sm text-gray-500">Configure departments, sub-departments and clinical disciplines</p>
          </button>

           {/* Contacts */}
          <button
            type="button"
            className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/settings/contacts')} // Customize navigation path
          >
            <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
              <span className="text-white text-2xl"><Contact/></span>
            </div>
            <h3 className="font-medium text-gray-900">Contacts</h3>
            <p className="text-sm text-gray-500">View and manage Shitit contacts</p>
          </button>


         
        </div>
      </div>
    </div>
  );
};

export default Settings;