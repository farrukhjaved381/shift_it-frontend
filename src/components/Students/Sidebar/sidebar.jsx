// src/components/Students/Sidebar/sidebar.jsx
import { 
  Squares2X2Icon,
  CalendarIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import ResponsiveSidebar from '../../shared/ResponsiveSidebar';

const navItems = [
  { label: 'Dashboard', icon: Squares2X2Icon, path: '/dashboard' },
  { label: 'Schedule', icon: CalendarIcon, path: '/schedule' },
  { label: 'Rotations', icon: BuildingOffice2Icon, path: '/rotations' },
  { label: 'Messages', icon: AcademicCapIcon, path: '/messages' },
  { label: 'Job Offers', icon: UserGroupIcon, path: '/job-offers' },
];

export default function Sidebar() {
  return <ResponsiveSidebar navItems={navItems} userRole="student" />;
}