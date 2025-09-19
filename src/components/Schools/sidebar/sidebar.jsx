// src/components/Schools/sidebar/sidebar.jsx
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
} from "@heroicons/react/24/outline";
import ResponsiveSidebar from '../../shared/ResponsiveSidebar';

const navItems = [
  { label: 'Dashboard', icon: Squares2X2Icon, path: '/dashboard' },
  { label: 'Schedule', icon: CalendarIcon, path: '/schedule' },
  { label: 'Students', icon: BuildingOffice2Icon, path: '/students' },
  { label: 'Instructors', icon: AcademicCapIcon, path: '/instructors' },
  { label: 'Rotations', icon: UserGroupIcon, path: '/rotations' },
  { label: 'Clinical Sites', icon: DocumentTextIcon, path: '/clinical-sites' },
  { label: 'Messages', icon: ChatBubbleLeftRightIcon, path: '/messages' },
  { label: 'Verifications', icon: CreditCardIcon, path: '/verifications' },
  { label: 'Invoices', icon: DocumentDuplicateIcon, path: '/invoicing' },
];

export default function Sidebar() {
  return <ResponsiveSidebar navItems={navItems} userRole="school" />;
}
