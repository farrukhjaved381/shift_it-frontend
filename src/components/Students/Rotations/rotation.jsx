import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  MessageSquare,
  Bell,
  FileText,
  Star,
  Send,
  ChevronRight,
  Search,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';

const RotationsModule = ({
  rotations: propRotations = [],
  onMessageSend,
  className = '',
}) => {
  const mockUserProfile = { firstName: 'Alex' }; // Placeholder user profile

  const [activeTab, setActiveTab] = useState('current');
  const [messageContent, setMessageContent] = useState('');
  const [selectedRotation, setSelectedRotation] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 5; // Adjust as needed

  // Sample data if none provided
  const defaultRotations = [
    {
      id: 1,
      name: 'Emergency Medicine',
      hospital: 'General Hospital',
      address: '123 Medical Center Dr, Anytown',
      instructor: 'Dr. Sarah Johnson',
      instructorEmail: 's.johnson@hospital.com',
      instructorPhone: '(555) 123-4567',
      status: 'current',
      blockStartDate: '2025-09-01',
      blockEndDate: '2025-09-30',
      sessions: [
        { date: '2025-09-05', startTime: '8:00', endTime: '16:00', completed: true },
        { date: '2025-09-07', startTime: '8:00', endTime: '16:00', completed: true },
        { date: '2025-09-12', startTime: '8:00', endTime: '16:00', completed: true },
        { date: '2025-09-14', startTime: '8:00', endTime: '16:00', completed: false },
        { date: '2025-09-19', startTime: '8:00', endTime: '16:00', completed: false },
        { date: '2025-09-21', startTime: '8:00', endTime: '16:00', completed: false },
        { date: '2025-09-26', startTime: '8:00', endTime: '16:00', completed: false },
        { date: '2025-09-28', startTime: '8:00', endTime: '16:00', completed: false },
      ],
      totalSessions: 8,
      completedSessions: 3,
      progress: 38,
      bulletin: {
        lastUpdated: '2025-09-10',
        message: 'Please remember to complete your patient logs before the end of each shift. We will have a case review session next Wednesday.'
      }
    },
    {
      id: 2,
      name: 'Pediatrics',
      hospital: 'Children\'s Hospital',
      address: '456 Kids Ave, Anytown',
      instructor: 'Dr. Michael Chen',
      instructorEmail: 'm.chen@childrenshospital.com',
      instructorPhone: '(555) 987-6543',
      status: 'upcoming',
      blockStartDate: '2025-10-01',
      blockEndDate: '2025-10-31',
      sessions: [],
      totalSessions: 10,
      completedSessions: 0,
      progress: 0
    },
    {
      id: 3,
      name: 'Internal Medicine',
      hospital: 'University Hospital',
      address: '789 College Blvd, Anytown',
      instructor: 'Dr. Amanda Williams',
      instructorEmail: 'a.williams@uhospital.com',
      instructorPhone: '(555) 456-7890',
      status: 'completed',
      blockStartDate: '2025-08-01',
      blockEndDate: '2025-08-31',
      sessions: [
        { date: '2025-08-02', startTime: '9:00', endTime: '17:00', completed: true },
        { date: '2025-08-04', startTime: '9:00', endTime: '17:00', completed: true },
        { date: '2025-08-09', startTime: '9:00', endTime: '17:00', completed: true },
        { date: '2025-08-11', startTime: '9:00', endTime: '17:00', completed: true },
        { date: '2025-08-16', startTime: '9:00', endTime: '17:00', completed: true },
        { date: '2025-08-18', startTime: '9:00', endTime: '17:00', completed: true },
        { date: '2025-08-23', startTime: '9:00', endTime: '17:00', completed: true },
        { date: '2025-08-25', startTime: '9:00', endTime: '17:00', completed: true },
        { date: '2025-08-30', startTime: '9:00', endTime: '17:00', completed: true },
      ],
      totalSessions: 9,
      completedSessions: 9,
      progress: 100,
      grade: 'A'
    }
  ];

  const rotations = propRotations.length > 0 ? propRotations : defaultRotations;

  const filteredRotations = rotations.filter(rotation =>
    rotation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rotation.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rotation.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentRotations = filteredRotations.filter((r) => r.status === 'current');
  const upcomingRotations = filteredRotations.filter((r) => r.status === 'upcoming');
  const completedRotations = filteredRotations.filter((r) => r.status === 'completed');

  const handleSendMessage = (rotationId) => {
    onMessageSend?.(rotationId, messageContent);
    setMessageContent('');
    setSelectedRotation(null);
    setIsDialogOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const TabsList = ({ children }) => (
    <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
      {children}
    </div>
  );

  const TabsTrigger = ({ value, children, isActive, onClick }) => (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );

  const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="p-6 border-b border-gray-100">
      {children}
    </div>
  );

  const CardTitle = ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-900">
      {children}
    </h3>
  );

  const CardContent = ({ children }) => (
    <div className="p-6">
      {children}
    </div>
  );

  const Button = ({ children, onClick, className = '', size = 'default', variant = 'default' }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
    
    const variantClasses = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
    };
    
    const sizeClasses = {
      default: 'h-10 py-2 px-4',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-6 text-base'
    };
    
    return (
      <button 
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  const Textarea = ({ value, onChange, placeholder, rows = 3, className = '' }) => (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
    />
  );

  const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
        <div className="relative bg-white rounded-xl max-w-md w-full mx-4 shadow-2xl border border-gray-200">
          {children}
        </div>
      </div>
    );
  };

  const DialogHeader = ({ children }) => (
    <div className="p-6 border-b border-gray-200">
      {children}
    </div>
  );

  const DialogTitle = ({ children }) => (
    <h2 className="text-lg font-semibold text-gray-900">
      {children}
    </h2>
  );

  const DialogDescription = ({ children }) => (
    <p className="text-sm text-gray-600 mt-1">
      {children}
    </p>
  );

  const DialogContent = ({ children }) => (
    <div className="p-6">
      {children}
    </div>
  );

  const DialogTrigger = ({ children, onClick }) => (
    <div onClick={onClick}>
      {children}
    </div>
  );

  const RotationCard = ({ rotation }) => {
    const totalPages = Math.ceil((rotation.sessions?.length || 0) / sessionsPerPage);
    const startIndex = (currentPage - 1) * sessionsPerPage;
    const endIndex = startIndex + sessionsPerPage;
    const currentSessions = rotation.sessions?.slice(startIndex, endIndex) || [];

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <Card className="mb-6 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform">
        <div className="relative">
          {/* Status Banner */}
          <div
            className={`absolute top-0 right-0 px-4 py-1 text-xs font-semibold text-white ${
              rotation.status === 'current'
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : rotation.status === 'upcoming'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                : 'bg-gradient-to-r from-gray-500 to-gray-600'
            } rounded-bl-lg`}
          >
            {rotation.status === 'current' ? '● ACTIVE' : rotation.status.toUpperCase()}
          </div>

          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <CardTitle>{rotation.name}</CardTitle>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{rotation.hospital}</span>
                </div>
                <p className="text-sm text-gray-500">{rotation.address}</p>
              </div>

              {/* Instructor Contact Card */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200 min-w-[250px] shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-purple-600" />
                  <p className="font-semibold text-gray-800 text-sm">{rotation.instructor}</p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{rotation.instructorEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="h-3 w-3" />
                    <span>{rotation.instructorPhone}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xs h-7 shadow-sm"
                  onClick={() => {
                    setSelectedRotation(rotation.id);
                    setIsDialogOpen(true);
                  }}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Message
                </Button>
              </div>
            </div>
          </CardHeader>
        </div>

        <CardContent className="space-y-6">
          {/* Main Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Schedule Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Schedule</h4>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="font-medium text-gray-800">
                    {new Date(rotation.blockStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
                    {new Date(rotation.blockEndDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="text-xs text-gray-500">Days</div>
                    <div className="text-gray-800">
                      {(() => {
                        if (!rotation.sessions || rotation.sessions.length === 0) {
                          return <span className="text-gray-500">TBD</span>;
                        }
                        const daysSet = new Set();
                        rotation.sessions.forEach((session) => {
                          const date = new Date(session.date);
                          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                          daysSet.add(dayName);
                        });
                        const days = Array.from(daysSet).sort((a, b) => {
                          const dayOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                          return dayOrder.indexOf(a) - dayOrder.indexOf(b);
                        });
                        return days.join(', ');
                      })()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500">Sessions</div>
                    <div className="font-semibold text-gray-800">{rotation.totalSessions}</div>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-xs text-gray-500">Times</div>
                  <div className="text-gray-800">
                    {(() => {
                      if (!rotation.sessions || rotation.sessions.length === 0) {
                        return <span className="text-gray-500">TBD</span>;
                      }
                      const timesSet = new Set();
                      rotation.sessions.forEach((session) => {
                        const timeSlot = `${session.startTime}-${session.endTime}`;
                        timesSet.add(timeSlot);
                      });
                      const times = Array.from(timesSet);
                      return times.join(', ');
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduled Days Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <h4 className="font-semibold text-gray-900">Scheduled Days</h4>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {(() => {
                  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

                  // Get unique days of week from sessions
                  const scheduledDays = new Set();
                  rotation.sessions?.forEach((session) => {
                    const date = new Date(session.date);
                    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
                    scheduledDays.add(dayOfWeek);
                  });

                  return daysOfWeek.map((day, index) => {
                    const isScheduled = scheduledDays.has(index);

                    return (
                      <div key={index} className="text-center">
                        <div className={`text-xs font-medium mb-1 ${isScheduled ? 'text-indigo-600' : 'text-gray-400'}`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {isScheduled ? (
                            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mx-auto">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="flex items-center justify-center gap-4 mt-3 pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Scheduled</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Not Scheduled</span>
                </div>
              </div>
            </div>

            {/* Progress/Grade/Status Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 shadow-sm">
              {rotation.status === 'current' && (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Progress</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{rotation.progress}%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Sessions</span>
                        <span>
                          {rotation.completedSessions}/{rotation.totalSessions}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${rotation.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {rotation.status === 'completed' && rotation.grade && (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-semibold text-gray-900">Final Grade</h4>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-yellow-600">{rotation.grade}</div>
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {rotation.status === 'upcoming' && (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Starts In</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.ceil(
                        (new Date(rotation.blockStartDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )}
                    </div>
                    <div className="text-xs text-gray-500">Days</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {rotation.bulletin && (
            <div className="space-y-3">
              <details className="group">
                <summary className="cursor-pointer flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Bell className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Instructor Bulletin</span>
                  <ChevronRight className="h-4 w-4 text-blue-400 transition-transform group-open:rotate-90 ml-auto" />
                </summary>
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-600 font-medium bg-white px-2 py-1 rounded-full">
                      {rotation.bulletin ? `Updated: ${formatDate(rotation.bulletin.lastUpdated)}` : 'No updates yet'}
                    </span>
                  </div>
                  <p className="text-sm text-blue-900 leading-relaxed">
                    {rotation.bulletin
                      ? rotation.bulletin.message
                      : 'No announcements from your instructor at this time. Check back later for updates and important information about your rotation.'}
                  </p>
                </div>
              </details>
            </div>
          )}

          {/* Collapsible Sessions Section with Pagination */}
          {rotation.sessions && rotation.sessions.length > 0 && (
            <div className="space-y-3">
              <details className="group">
                <summary className="cursor-pointer flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Individual Sessions ({rotation.sessions.length})</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-90 ml-auto" />
                </summary>
                <div className="mt-3 bg-white rounded-lg border border-gray-200">
                  <div className="p-2 space-y-1">
                    {currentSessions.map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${session.completed ? 'bg-green-500' : 'bg-gray-300'}`}
                          ></div>
                          <span className="font-medium text-sm text-gray-800">
                            {new Date(session.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              weekday: 'short',
                            })}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between p-2 border-t border-gray-200">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`space-y-5 ${className}`}>
        {/* Top Header */}
        <header className="px-6 py-6 border-b border-gray-200 bg-white">
          <h1 className="text-2xl font-semibold text-gray-900">Rotations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your clinical rotations and track your progress
          </p>
        </header>

      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search rotations by name, hospital, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
          />
        </div>

        <TabsList>
          <TabsTrigger 
            value="current" 
            isActive={activeTab === 'current'}
            onClick={setActiveTab}
          >
            <Clock className="h-4 w-4" />
            Current ({currentRotations.length})
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming" 
            isActive={activeTab === 'upcoming'}
            onClick={setActiveTab}
          >
            <Calendar className="h-4 w-4" />
            Upcoming ({upcomingRotations.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            isActive={activeTab === 'completed'}
            onClick={setActiveTab}
          >
            <FileText className="h-4 w-4" />
            Completed ({completedRotations.length})
          </TabsTrigger>
        </TabsList>

        {activeTab === 'current' && (
          <div className="space-y-6">
            {currentRotations.length > 0 ? (
              currentRotations.map((rotation) => <RotationCard key={rotation.id} rotation={rotation} />)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Current Rotations</h3>
                  <p className="text-gray-600">You don't have any active clinical rotations at the moment.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingRotations.length > 0 ? (
              upcomingRotations.map((rotation) => <RotationCard key={rotation.id} rotation={rotation} />)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Rotations</h3>
                  <p className="text-gray-600">You don't have any scheduled upcoming rotations.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="space-y-6">
            {completedRotations.length > 0 ? (
              completedRotations.map((rotation) => <RotationCard key={rotation.id} rotation={rotation} />)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Rotations</h3>
                  <p className="text-gray-600">You haven't completed any clinical rotations yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Message {rotations.find(r => r.id === selectedRotation)?.instructor}
            </DialogTitle>
            <DialogDescription>
              Send a message regarding the {rotations.find(r => r.id === selectedRotation)?.name} rotation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Textarea
              placeholder="Type your message here..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleSendMessage(selectedRotation)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RotationsModule;