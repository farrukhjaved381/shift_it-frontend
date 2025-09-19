import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { 
  Dashboard, 
  Schedule, 
  Payment, 
  Invoicing, 
  Settings, 
  Student, 
  Request, 
  Message, 
  ClinicalSite, 
  School 
} from '../components/Admin/index';
import Sidebar from '../components/Admin/sidebar/sidebar';
import {
  CompanyConfiguration,
  ShiftSetup,
  SchedulingPreferences,
  DepartmentStructures,
  ShifterzRatesSetup,
  Documentation,
  Communication,
  ReportsAnalytics,
  SystemSettings
} from '../components/Admin/Settings/index';

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Page transition settings
  const pageTransition = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mobile-container">
      <Sidebar />
      <main className="flex-1 lg:ml-70 min-h-screen transition-all duration-300 mobile-container">
        <div className="pt-16 lg:pt-6 px-3 sm:px-4 lg:px-6 safe-area-top">
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<motion.div {...pageTransition}><Dashboard /></motion.div>} />
              <Route path="/schedule" element={<motion.div {...pageTransition}><Schedule /></motion.div>} />
              <Route path="/clinical-sites" element={<motion.div {...pageTransition}><ClinicalSite /></motion.div>} />
              <Route path="/schools" element={<motion.div {...pageTransition}><School /></motion.div>} />
              <Route path="/payments" element={<motion.div {...pageTransition}><Payment /></motion.div>} />
              <Route path="/invoicing" element={<motion.div {...pageTransition}><Invoicing /></motion.div>} />
              <Route path="/settings" element={<motion.div {...pageTransition}><Settings /></motion.div>} />

              {/* Nested settings pages */}
              <Route path="/settings/company-configuration" element={<motion.div {...pageTransition}><CompanyConfiguration onNavigateBack={() => navigate('/settings')} /></motion.div>} />
              <Route path="/settings/shifts-setup" element={<motion.div {...pageTransition}><ShiftSetup onNavigateBack={() => navigate('/settings')} /></motion.div>} />
              <Route path="/settings/scheduling-preferences" element={<motion.div {...pageTransition}><SchedulingPreferences onNavigateBack={() => navigate('/settings')} /></motion.div>} />
              <Route path="/settings/department-structures" element={<motion.div {...pageTransition}><DepartmentStructures onNavigateBack={() => navigate('/settings')} /></motion.div>} />
              <Route path="/settings/shifterz-rates-setup" element={<motion.div {...pageTransition}><ShifterzRatesSetup onNavigateBack={() => navigate('/settings')} /></motion.div>} />
              <Route path="/settings/documentation" element={<motion.div {...pageTransition}><Documentation onNavigateBack={() => navigate('/settings')} /></motion.div>} />
              <Route path="/settings/communication" element={<motion.div {...pageTransition}><Communication onNavigateBack={() => navigate('/settings')} /></motion.div>} />
              <Route path="/settings/reports-analytics" element={<motion.div {...pageTransition}><ReportsAnalytics onNavigateBack={() => navigate('/settings')} /></motion.div>} />
              <Route path="/settings/system-settings" element={<motion.div {...pageTransition}><SystemSettings onNavigateBack={() => navigate('/settings')} /></motion.div>} />

              <Route path="/students" element={<motion.div {...pageTransition}><Student /></motion.div>} />
              <Route path="/requests" element={<motion.div {...pageTransition}><Request /></motion.div>} />
              <Route path="/messages" element={<motion.div {...pageTransition}><Message /></motion.div>} />

              {/* 404 */}
              <Route path="*" element={<motion.div {...pageTransition} className="flex items-center justify-center min-h-screen">
                  <h1 className="text-2xl font-bold text-gray-700">404 - Page Not Found</h1>
              </motion.div>} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
