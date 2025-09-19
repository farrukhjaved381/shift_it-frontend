import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  Download, 
  FileText, 
  Users, 
  KeyRound, 
  LogOut, 
  Settings, 
  User, 
  UserCog,
  Bell
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Custom UI Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>
    {children}
  </p>
);

const Button = ({ children, variant = "default", size = "md", className = "", onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-blue-500"
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Avatar = ({ children, className = "" }) => (
  <div className={`relative inline-block ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt, className = "" }) => (
  <img 
    src={src} 
    alt={alt} 
    className={`w-full h-full object-cover rounded-full ${className}`}
  />
);

const AvatarFallback = ({ children, className = "" }) => (
  <div className={`w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium ${className}`}>
    {children}
  </div>
);

const Tabs = ({ children, defaultValue, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className={`${className}`} data-active-tab={activeTab}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab, className = "" }) => (
  <div className={`flex space-x-1 border-b  ${className}`}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab, className = "" }) => (
  <button
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      activeTab === value 
        ? 'border-blue-500 text-blue-600' 
        : 'border-transparent text-gray-500 hover:text-gray-700'
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab, className = "" }) => (
  activeTab === value ? <div className={className}>{children}</div> : null
);

// Dropdown Components
const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, isOpen, setIsOpen, className = "" }) => (
  <div 
    className={`cursor-pointer ${className}`}
    onClick={() => setIsOpen(!isOpen)}
  >
    {children}
  </div>
);

const DropdownMenuContent = ({ children, isOpen, align = "left", className = "" }) => (
  isOpen ? (
    <div className={`absolute z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${
      align === 'end' ? 'right-0' : 'left-0'
    } ${className}`}>
      <div className="py-1">
        {children}
      </div>
    </div>
  ) : null
);

const DropdownMenuLabel = ({ children, className = "" }) => (
  <div className={`px-4 py-2 text-sm font-medium text-gray-900 ${className}`}>
    {children}
  </div>
);

const DropdownMenuSeparator = ({ className = "" }) => (
  <div className={`my-1 h-px bg-gray-200 ${className}`}></div>
);

const DropdownMenuItem = ({ children, className = "" }) => (
  <div className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${className}`}>
    {children}
  </div>
);

export default function Dashboard() {
  // Sample data for charts and statistics
  const rotationsByDepartment = [
    { name: "Emergency", value: 24 },
    { name: "Surgery", value: 18 },
    { name: "Pediatrics", value: 12 },
    { name: "Obstetrics", value: 9 },
    { name: "Cardiology", value: 15 },
    { name: "Neurology", value: 7 },
  ];

  const rotationsBySchool = [
    { name: "University A", value: 32 },
    { name: "College B", value: 25 },
    { name: "Institute C", value: 18 },
    { name: "University D", value: 15 },
    { name: "College E", value: 10 },
  ];

  const monthlyRotations = [
    { name: "Jan", rotations: 12 },
    { name: "Feb", rotations: 15 },
    { name: "Mar", rotations: 18 },
    { name: "Apr", rotations: 22 },
    { name: "May", rotations: 25 },
    { name: "Jun", rotations: 30 },
    { name: "Jul", rotations: 28 },
    { name: "Aug", rotations: 24 },
    { name: "Sep", rotations: 20 },
    { name: "Oct", rotations: 18 },
    { name: "Nov", rotations: 15 },
    { name: "Dec", rotations: 12 },
  ];

  const attendanceData = [
    { name: "Present", value: 85 },
    { name: "Absent", value: 5 },
    { name: "Late", value: 10 },
  ];

  const COLORS = ["#55b7a6", "#352a77", "#1c174f", "#6b7280"];

  const upcomingRotations = [
    {
      id: "ROT-1234",
      department: "Emergency",
      unit: "Trauma",
      school: "University A",
      students: 8,
      startDate: "2023-11-15",
      endDate: "2023-12-15",
      educator: "Dr. Smith",
    },
    {
      id: "ROT-1235",
      department: "Surgery",
      unit: "General",
      school: "College B",
      students: 6,
      startDate: "2023-11-20",
      endDate: "2023-12-20",
      educator: "Dr. Johnson",
    },
    {
      id: "ROT-1236",
      department: "Pediatrics",
      unit: "NICU",
      school: "University D",
      students: 4,
      startDate: "2023-11-25",
      endDate: "2023-12-25",
      educator: "Dr. Williams",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New rotation created",
      department: "Cardiology",
      user: "Admin User",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Student added to rotation",
      department: "Emergency",
      user: "Jane Smith",
      time: "4 hours ago",
    },
    {
      id: 3,
      action: "Documentation uploaded",
      department: "Surgery",
      user: "John Doe",
      time: "Yesterday",
    },
    {
      id: 4,
      action: "Rotation completed",
      department: "Obstetrics",
      user: "System",
      time: "2 days ago",
    },
  ];

  const keyMetrics = [
    {
      title: "Total Students",
      value: 248,
      change: "+12%",
      icon: <Users className="h-4 w-4 text-teal-500" />,
      link: "/students",
    },
    {
      title: "Active Rotations",
      value: 42,
      change: "+5%",
      icon: <Calendar className="h-4 w-4 text-purple-600" />,
      link: "/calendar",
    },
    {
      title: "Schools",
      value: 15,
      change: "+2",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      link: "/schools",
    },
    {
      title: "Departments",
      value: 8,
      change: "0",
      icon: <FileText className="h-4 w-4 text-teal-500" />,
      link: "/departments",
    },
  ];

  const handleQuickAction = (action) => {
    alert(`${action} clicked! This would navigate to the respective page.`);
  };

  const handleExportDashboard = () => {
    alert('Export functionality would be implemented here!');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
  <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleExportDashboard}>
            <Download className="h-4 w-4 mr-2" />
            Export Dashboard
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/stylized-initials.png" alt="User" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="text-gray-700">Souheil Jawad</p>
                  <p className="text-purple-600 text-xs">View Profile</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center w-full">
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Update Information</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center w-full">
                  <KeyRound className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button className="flex items-center w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="cursor-pointer">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  {metric.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.change} from last month</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="schools">Schools</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Rotations</CardTitle>
                <CardDescription>Number of rotations per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRotations}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="rotations" stroke="#352a77" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Rotations by Department</CardTitle>
                <CardDescription>Distribution of rotations across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rotationsByDepartment}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#55b7a6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schools" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Rotations by School</CardTitle>
                <CardDescription>Distribution of rotations across schools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rotationsBySchool}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1c174f" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Student attendance statistics</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Two Column Layout for Upcoming and Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Rotations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Upcoming Rotations</CardTitle>
              <div className="text-sm text-purple-600 flex items-center cursor-pointer hover:text-purple-800">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingRotations.map((rotation) => (
                  <div
                    key={rotation.id}
                    className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <h4 className="font-medium">
                        {rotation.department} - {rotation.unit}
                      </h4>
                      <p className="text-sm text-gray-500">{rotation.school}</p>
                      <p className="text-xs mt-1">
                        {new Date(rotation.startDate).toLocaleDateString()} -
                        {new Date(rotation.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
                        {rotation.students} Students
                      </span>
                      <p className="text-xs mt-1">{rotation.educator}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <div className="text-sm text-purple-600 flex items-center cursor-pointer hover:text-purple-800">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-gray-500">{activity.department}</p>
                      <p className="text-xs mt-1">By {activity.user}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center justify-center p-4 gap-2"
                onClick={() => handleQuickAction('Create Rotation')}
              >
                <Calendar className="h-6 w-6 text-purple-600" />
                <span>Create Rotation</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center justify-center p-4 gap-2"
                onClick={() => handleQuickAction('Add Student')}
              >
                <Users className="h-6 w-6 text-teal-500" />
                <span>Add Student</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center justify-center p-4 gap-2"
                onClick={() => handleQuickAction('Generate Report')}
              >
                <FileText className="h-6 w-6 text-blue-600" />
                <span>Generate Report</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center justify-center p-4 gap-2"
                onClick={() => handleQuickAction('Export Data')}
              >
                <Download className="h-6 w-6 text-purple-600" />
                <span>Export Data</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}