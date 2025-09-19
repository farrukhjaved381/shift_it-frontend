// src/components/Hospitals/sidebar/sidebar.jsx
import { 
  Squares2X2Icon,
  CalendarIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import ResponsiveSidebar from '../../shared/ResponsiveSidebar';

const navItems = [
  { label: 'Dashboard', icon: Squares2X2Icon, path: '/dashboard' },
  { label: 'Calendar', icon: CalendarIcon, path: '/calendar' },
  { label: 'Reports', icon: DocumentDuplicateIcon, path: '/reports' },
  { label: 'Schools', icon: AcademicCapIcon, path: '/schools' },
  { label: 'Students', icon: UserGroupIcon, path: '/students' },
  { label: 'Clinical Instructors', icon: ChatBubbleLeftRightIcon, path: '/clinical-instructors' },
  { label: 'Messages', icon: ChatBubbleLeftRightIcon, path: '/messages' },
  { label: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
];

export default function Sidebar() {
  return <ResponsiveSidebar navItems={navItems} userRole="hospital" />;
}