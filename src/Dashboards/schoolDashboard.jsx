import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import {
    Sidebar,
    Dashboard,
    Schedule,
    Students,
    Instructors,
    Rotations,
    ClinicalSites,
    Messages,
    Verifications,
    Invoices,
    Contact,
    Settings
} from '../components/Schools/index';

function SchoolDashboard() {
    const location = useLocation(); // needed for AnimatePresence

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
                            <Route path="/students" element={<motion.div {...pageTransition}><Students /></motion.div>} />
                            <Route path="/instructors" element={<motion.div {...pageTransition}><Instructors /></motion.div>} />
                            <Route path="/rotations" element={<motion.div {...pageTransition}><Rotations /></motion.div>} />
                            <Route path="/clinical-sites" element={<motion.div {...pageTransition}><ClinicalSites /></motion.div>} />
                            <Route path="/messages" element={<motion.div {...pageTransition}><Messages /></motion.div>} />
                            <Route path="/verifications" element={<motion.div {...pageTransition}><Verifications /></motion.div>} />
                            <Route path="/invoicing" element={<motion.div {...pageTransition}><Invoices /></motion.div>} />
                            <Route path="/contact" element={<motion.div {...pageTransition}><Contact /></motion.div>} />
                            <Route path="/settings" element={<motion.div {...pageTransition}><Settings /></motion.div>} />
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

export default SchoolDashboard;
