import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon,
  ArrowRightOnRectangleIcon 
} from "@heroicons/react/24/outline";
import { AuthContext } from '../../contexts/AuthContext';

const ResponsiveSidebar = ({ navItems, userRole = 'admin' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="p-4 lg:p-6">
        <div className="flex items-center">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-teal-400 rounded-xl flex items-center justify-center mr-2 lg:mr-3">
            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-white rounded-md flex items-center justify-center">
              <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-teal-400 rounded-sm"></div>
            </div>
          </div>
          <span className="font-bold text-xl lg:text-2xl">
            SHIFT<span className="italic text-teal-400">it</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 lg:px-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl mb-1 lg:mb-2 transition-colors ${
                isActive 
                  ? 'bg-indigo-900 text-white shadow-lg' 
                  : 'text-gray-800 hover:bg-indigo-50'
              }`
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm lg:text-base font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="px-3 lg:px-4 pb-4 lg:pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left text-red-600"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm lg:text-base font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-3 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors touch-friendly safe-area-top"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-5 w-5 text-gray-600" />
        ) : (
          <Bars3Icon className="h-5 w-5 text-gray-600" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 sidebar-overlay"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-70 h-screen flex-col z-30 bg-white shadow-lg border-r border-gray-200">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-0 left-0 mobile-sidebar h-screen flex flex-col z-50 bg-white shadow-xl border-r border-gray-200 sidebar-transition safe-area-top ${
        isMobileMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
      }`}>
        <SidebarContent />
      </aside>
    </>
  );
};

export default ResponsiveSidebar;