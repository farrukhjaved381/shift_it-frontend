// src/components/Admin/sidebar/sidebar.jsx
import { 
  Squares2X2Icon,
  CalendarIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import ResponsiveSidebar from '../../shared/ResponsiveSidebar';

const navItems = [
  { label: 'Dashboard', icon: Squares2X2Icon, path: '/dashboard' },
  { label: 'Schedule', icon: CalendarIcon, path: '/schedule' },
  { label: 'Clinical Sites', icon: BuildingOffice2Icon, path: '/clinical-sites' },
  { label: 'Schools', icon: AcademicCapIcon, path: '/schools' },
  { label: 'Students', icon: UserGroupIcon, path: '/students' },
  { label: 'Requests', icon: DocumentTextIcon, path: '/requests' },
  { label: 'Messages', icon: ChatBubbleLeftRightIcon, path: '/messages' },
  { label: 'Payments', icon: CreditCardIcon, path: '/payments' },
  { label: 'Invoicing', icon: DocumentDuplicateIcon, path: '/invoicing' },
  { label: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
];

export default function Sidebar() {
  return <ResponsiveSidebar navItems={navItems} userRole="admin" />;
}