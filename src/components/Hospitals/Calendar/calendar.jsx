import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  GraduationCap,
  Users,
  School,
  Building2,
  MapPin,
  Grid3X3,
  List,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone
} from 'lucide-react';

const ClinicalRotationCalendar = () => {
  const [currentView, setCurrentView] = useState('Week');
  const [currentDate, setCurrentDate] = useState('Sep 15 - Sep 21, 2025');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentWeekStart, setCurrentWeekStart] = useState(15);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1)); // September 2025
  const [isMobile, setIsMobile] = useState(false);

  // Sample rotation data
  const rotations = {
    'Mon 15': [
      {
        title: 'Surgery',
        subtitle: 'Operating Room',
        time: '7:00-15:00',
        students: 8,
        tags: ['Radiology', 'Respiratory Therapy'],
        color: 'bg-green-100 border-green-300'
      },
      {
        title: 'Emergency',
        subtitle: 'Emergency Department',
        time: '7:00-15:00',
        students: 3,
        tags: ['Respiratory Therapy'],
        color: 'bg-green-100 border-green-300'
      }
    ],
    'Tue 16': [
      {
        title: 'Oncology',
        subtitle: 'Oncology Ward',
        time: '11:00-19:00',
        students: 3,
        tags: ['Occupational Therapy', 'Social Work', 'Pharmacy', 'Nursing'],
        color: 'bg-green-100 border-green-300'
      }
    ],
    'Wed 17': [
      {
        title: 'Nursing',
        subtitle: 'Medical-Surgical',
        time: '11:00-19:00',
        students: 7,
        tags: ['Social Work', 'Pharmacy', 'Radiology'],
        color: 'bg-green-100 border-green-300'
      },
      {
        title: 'Pediatrics',
        subtitle: 'Pediatric Ward',
        time: '9:00-17:00',
        students: 3,
        tags: ['Medical Laboratory', 'Occupational Therapy'],
        color: 'bg-green-100 border-green-300'
      }
    ],
    'Thu 18': [
      {
        title: 'Neurology',
        subtitle: 'Neurology Ward',
        time: '12:00-20:00',
        students: 3,
        tags: ['Physical Therapy'],
        color: 'bg-green-100 border-green-300'
      }
    ],
    'Fri 19': [
      {
        title: 'Nursing',
        subtitle: 'ICU',
        time: '13:00-21:00',
        students: 8,
        tags: ['Social Work'],
        color: 'bg-green-100 border-green-300'
      },
      {
        title: 'Nursing',
        subtitle: 'Labor & Delivery',
        time: '11:00-19:00',
        students: 7,
        tags: ['Radiology', 'Social Work', 'Medical Laboratory'],
        color: 'bg-green-100 border-green-300'
      },
      {
        title: 'Radiology',
        subtitle: 'Diagnostic Imaging',
        time: '10:00-18:00',
        students: 3,
        tags: ['Respiratory Therapy'],
        color: 'bg-yellow-100 border-yellow-300'
      },
      {
        title: 'Cardiology',
        subtitle: 'Cardiac Care',
        time: '',
        students: 0,
        tags: [],
        color: 'bg-teal-100 border-teal-300'
      }
    ]
  };

  const days = [
    `Mon ${currentWeekStart}`,
    `Tue ${currentWeekStart + 1}`,
    `Wed ${currentWeekStart + 2}`,
    `Thu ${currentWeekStart + 3}`,
    `Fri ${currentWeekStart + 4}`,
    `Sat ${currentWeekStart + 5}`,
    `Sun ${currentWeekStart + 6}`
  ];

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation
  const navigatePrevious = () => {
    if (currentView === 'Week') {
      const newStart = currentWeekStart - 7;
      setCurrentWeekStart(newStart);
      setCurrentDate(`Sep ${newStart} - Sep ${newStart + 6}, 2025`);
    } else if (currentView === 'Month') {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(currentMonth.getMonth() - 1);
      setCurrentMonth(newMonth);
    }
  };

  const navigateNext = () => {
    if (currentView === 'Week') {
      const newStart = currentWeekStart + 7;
      setCurrentWeekStart(newStart);
      setCurrentDate(`Sep ${newStart} - Sep ${newStart + 6}, 2025`);
    } else if (currentView === 'Month') {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(currentMonth.getMonth() + 1);
      setCurrentMonth(newMonth);
    }
  };

  const goToToday = () => {
    setCurrentWeekStart(15);
    setCurrentDate('Sep 15 - Sep 21, 2025');
    setCurrentMonth(new Date(2025, 8, 1));
  };

  // Export functionality
  const handleExport = () => {
    const data = {
      dateRange: currentDate,
      view: currentView,
      rotations: Object.values(rotations).flat(),
      statistics: statistics
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clinical-rotations-${currentDate.replace(/\s/g, '-').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter rotations
  const filterRotations = (rotationList) => {
    return rotationList.filter(rotation => {
      const matchesSearch = rotation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rotation.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'All' || rotation.title === selectedDepartment;
      const matchesStatus = selectedStatus === 'All' || rotation.status === selectedStatus;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  };

  const statistics = [
    { title: 'Total Students', value: '52', icon: GraduationCap, color: 'text-purple-600' },
    { title: 'Clinical Educators', value: '8', icon: Users, color: 'text-green-600' },
    { title: 'Schools', value: '4', icon: School, color: 'text-blue-600' },
    { title: 'Departments', value: '8', icon: Building2, color: 'text-orange-600' },
    { title: 'Units', value: '10', icon: MapPin, color: 'text-red-600' }
  ];

  const getTagColor = (tag) => {
    const colors = {
      'Radiology': 'bg-purple-100 text-purple-800',
      'Respiratory Therapy': 'bg-red-100 text-red-800',
      'Occupational Therapy': 'bg-orange-100 text-orange-800',
      'Social Work': 'bg-red-100 text-red-800',
      'Pharmacy': 'bg-green-100 text-green-800',
      'Nursing': 'bg-blue-100 text-blue-800',
      'Physical Therapy': 'bg-green-100 text-green-800',
      'Medical Laboratory': 'bg-blue-100 text-blue-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  // Generate month days
  const generateMonthDays = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const hasRotations = (day) => {
    return Object.keys(rotations).some(key => parseInt(key.split(' ')[1]) === day);
  };

  const getRotationsForDay = (day) => {
    const key = Object.keys(rotations).find(k => parseInt(k.split(' ')[1]) === day);
    return key ? rotations[key] : [];
  };

  // Render views
  const renderWeekView = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
      {days.map((day) => (
        <div key={day} className="min-h-48">
          <div className="text-center mb-3">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">
              {day.split(' ')[0]}
            </div>
            <div className={`w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
              day === `Tue ${currentWeekStart + 1}` ? 'bg-blue-600 text-white' : 'text-gray-700'
            }`}>
              {day.split(' ')[1]}
            </div>
          </div>
          
          <div className="space-y-2">
            {rotations[day] ? filterRotations(rotations[day]).map((rotation, idx) => (
              <div
                key={idx}
                className={`${rotation.color} border-2 rounded-lg p-2 sm:p-3 text-xs sm:text-sm cursor-pointer hover:shadow-md transition-shadow touch-manipulation`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && alert(`Selected: ${rotation.title}`)}
              >
                <div className="font-semibold text-gray-900 mb-1">{rotation.title}</div>
                <div className="text-gray-700 mb-1 truncate">{rotation.subtitle}</div>
                {rotation.time && (
                  <div className="text-gray-600 mb-2 flex items-center justify-between">
                    <span>{rotation.time}</span>
                    {rotation.students > 0 && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        {rotation.students}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {rotation.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs ${getTagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500 mt-4 sm:mt-8 text-xs sm:text-sm">
                No rotations
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDayView = () => (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Today's Rotations</h3>
        <p className="text-xs sm:text-sm text-gray-600">Tuesday, September {currentWeekStart + 1}, 2025</p>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {rotations[`Tue ${currentWeekStart + 1}`] ? filterRotations(rotations[`Tue ${currentWeekStart + 1}`]).map((rotation, idx) => (
          <div
            key={idx}
            className={`${rotation.color} border-2 rounded-lg p-3 sm:p-4 touch-manipulation`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && alert(`Selected: ${rotation.title}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-sm sm:text-lg text-gray-900">{rotation.title}</h4>
                <p className="text-xs sm:text-sm text-gray-700">{rotation.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-xs sm:text-sm text-gray-600">{rotation.time}</p>
                <div className="flex items-center gap-1 justify-end">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{rotation.students} students</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {rotation.tags.map((tag, tagIdx) => (
                <span key={tagIdx} className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs ${getTagColor(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 py-6 sm:py-8 text-xs sm:text-sm">
            No rotations scheduled for today
          </div>
        )}
      </div>
    </div>
  );

  const renderMonthView = () => {
    const monthDays = generateMonthDays(currentMonth);
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
      <div>
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{monthName}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7 sm:gap-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-gray-600 py-1 sm:py-2 text-xs sm:text-sm hidden sm:block">
              {day}
            </div>
          ))}
          {monthDays.map((day, idx) => (
            <div
              key={idx}
              className={`min-h-20 sm:min-h-24 p-2 border border-gray-200 rounded-lg ${
                day ? (hasRotations(day) ? 'bg-blue-50 border-blue-300' : 'bg-white') : 'bg-gray-50'
              } touch-manipulation`}
              role="button"
              tabIndex={day ? 0 : -1}
              onKeyDown={(e) => day && e.key === 'Enter' && alert(`Selected day: ${day}`)}
            >
              {day && (
                <>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">{day}</div>
                  {hasRotations(day) && (
                    <div className="space-y-1">
                      {filterRotations(getRotationsForDay(day)).slice(0, isMobile ? 1 : 2).map((rotation, rIdx) => (
                        <div key={rIdx} className="text-xs bg-green-100 text-green-800 rounded px-1 py-0.5 truncate">
                          {rotation.title}
                        </div>
                      ))}
                      {getRotationsForDay(day).length > (isMobile ? 1 : 2) && (
                        <div className="text-xs text-gray-500">+{getRotationsForDay(day).length - (isMobile ? 1 : 2)} more</div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const allRotations = Object.entries(rotations).flatMap(([day, dayRotations]) => 
      dayRotations.map(rotation => ({ ...rotation, day }))
    );
    const filteredRotations = filterRotations(allRotations);

    return (
      <div className="space-y-3 sm:space-y-4">
        {filteredRotations.map((rotation, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow touch-manipulation"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && alert(`Selected: ${rotation.title}`)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <h4 className="font-semibold text-sm sm:text-lg text-gray-900">{rotation.title}</h4>
                  <span className="text-xs sm:text-sm text-gray-500">{rotation.day}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mb-2 truncate">{rotation.subtitle}</p>
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span>⏰ {rotation.time}</span>
                  <span>👥 {rotation.students} students</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 touch-manipulation" aria-label="Edit rotation">
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button className="p-1 sm:p-2 text-gray-400 hover:text-red-600 touch-manipulation" aria-label="Delete rotation">
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
              {rotation.tags.map((tag, tagIdx) => (
                <span key={tagIdx} className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs ${getTagColor(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'Week':
        return renderWeekView();
      case 'Day':
        return renderDayView();
      case 'Month':
        return renderMonthView();
      case 'List':
        return renderListView();
      default:
        return renderWeekView();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Clinical Rotation Calendar</h1>
          <p className="text-xs sm:text-sm text-gray-600">View and manage scheduled clinical rotations</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-4 mb-4 sm:mb-6">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer touch-manipulation"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && alert(`Selected: ${stat.title}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 mb-4 sm:mb-6 sticky top-0 z-10">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Date Navigation */}
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
              <button 
                onClick={navigatePrevious}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                aria-label="Previous week or month"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={goToToday}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors touch-manipulation"
                  aria-label="Go to today"
                >
                  Today
                </button>
                <span className="text-sm sm:text-lg font-semibold">
                  {currentView === 'Month' ? currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }) : currentDate}
                </span>
              </div>
              <button 
                onClick={navigateNext}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                aria-label="Next week or month"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Search, Filters, and View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rotations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-xs sm:text-sm"
                  aria-label="Search rotations"
                />
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm touch-manipulation ${
                    showFilters ? 'bg-blue-50 border-blue-300' : ''
                  }`}
                  aria-label="Toggle filters"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                {showFilters && (
                  <div className="absolute top-full mt-2 right-0 w-64 sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-3 sm:p-4 z-10">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Department</label>
                        <select 
                          value={selectedDepartment}
                          onChange={(e) => setSelectedDepartment(e.target.value)}
                          className="w-full p-1.5 sm:p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                          aria-label="Filter by department"
                        >
                          <option value="All">All Departments</option>
                          <option value="Surgery">Surgery</option>
                          <option value="Emergency">Emergency</option>
                          <option value="Oncology">Oncology</option>
                          <option value="Nursing">Nursing</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Radiology">Radiology</option>
                          <option value="Cardiology">Cardiology</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Status</label>
                        <select 
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="w-full p-1.5 sm:p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                          aria-label="Filter by status"
                        >
                          <option value="All">All Statuses</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="flex justify-between pt-1 sm:pt-2">
                        <button 
                          onClick={() => {
                            setSelectedDepartment('All');
                            setSelectedStatus('All');
                            setSearchTerm('');
                          }}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800 touch-manipulation"
                          aria-label="Clear filters"
                        >
                          Clear Filters
                        </button>
                        <button 
                          onClick={() => setShowFilters(false)}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 touch-manipulation"
                          aria-label="Apply filters"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center border border-gray-200 rounded-lg">
                {['Week', 'Day', 'Month', 'List'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setCurrentView(view)}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm first:rounded-l-lg last:rounded-r-lg transition-colors touch-manipulation ${
                      currentView === view 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    aria-label={`Switch to ${view} view`}
                  >
                    {view}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleExport}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm touch-manipulation"
                aria-label="Export rotations"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base sm:text-xl font-semibold text-gray-900">{currentView} Schedule</h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  {currentView === 'Week' 
                    ? `Clinical rotations for the week of September ${currentWeekStart}, 2025`
                    : currentView === 'Day'
                    ? `Clinical rotations for Tuesday, September ${currentWeekStart + 1}, 2025`
                    : currentView === 'Month'
                    ? `Clinical rotations for ${currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}`
                    : `All clinical rotations`
                  }
                </p>
              </div>
              <button 
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm touch-manipulation"
                aria-label="Add new rotation"
              >
                <Plus className="w-4 h-4" />
                Add Rotation
              </button>
            </div>
          </div>
          
          <div className="p-3 sm:p-4">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalRotationCalendar;