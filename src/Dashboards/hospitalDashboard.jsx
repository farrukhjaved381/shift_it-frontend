import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { 
  Sidebar,
  Dashboard,
  Calendar,
  Reports,
  Schools,
  StudentsRotationCompletions,
  ClinicalSupervision,
  Messages,
  Profile,
  Settings,
  HospitalCompanyConfiguration,
  GeoFenceSettings,
  DocumentationSettings,
  DepartmentDisciplines,
  HospitalContacts
} from '../components/Hospitals/index';

function HospitalDashboard() {
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
              <Route path="/calendar" element={<motion.div {...pageTransition}><Calendar /></motion.div>} />
              <Route path="/reports" element={<motion.div {...pageTransition}><Reports /></motion.div>} />
              <Route path="/schools" element={<motion.div {...pageTransition}><Schools /></motion.div>} />
              <Route path="/students" element={<motion.div {...pageTransition}><StudentsRotationCompletions /></motion.div>} />
              <Route path="/clinical-instructors" element={<motion.div {...pageTransition}><ClinicalSupervision /></motion.div>} />
              <Route path="/messages" element={<motion.div {...pageTransition}><Messages /></motion.div>} />
              <Route path="/profile" element={<motion.div {...pageTransition}><Profile /></motion.div>} />
              <Route path="/settings" element={<motion.div {...pageTransition}><Settings /></motion.div>} />

              {/* Nested settings pages */}
              <Route 
                path="/settings/company-configuration" 
                element={<motion.div {...pageTransition}><HospitalCompanyConfiguration onNavigateBack={() => navigate('/settings')} /></motion.div>} 
              />
              <Route 
                path="/settings/geo-fence" 
                element={<motion.div {...pageTransition}><GeoFenceSettings onNavigateBack={() => navigate('/settings')} /></motion.div>} 
              />
              <Route 
                path="/settings/documentation" 
                element={<motion.div {...pageTransition}><DocumentationSettings onNavigateBack={() => navigate('/settings')} /></motion.div>} 
              />
              <Route 
                path="/settings/departments&disciplines" 
                element={<motion.div {...pageTransition}><DepartmentDisciplines onNavigateBack={() => navigate('/settings')} /></motion.div>} 
              />
              <Route 
                path="/settings/contacts" 
                element={<motion.div {...pageTransition}><HospitalContacts onNavigateBack={() => navigate('/settings')} /></motion.div>} 
              />

              {/* 404 */}
              <Route 
                path="*" 
                element={
                  <motion.div {...pageTransition} className="flex items-center justify-center min-h-screen">
                    <h1 className="text-2xl font-bold text-gray-700">404 - Page Not Found</h1>
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default HospitalDashboard;
