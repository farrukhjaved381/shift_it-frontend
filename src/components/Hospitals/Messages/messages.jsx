import React, { useState } from 'react';
import { Plus, GraduationCap, UserCheck, Headphones, Search, Star, Archive, Trash2, Mail, MoreHorizontal, X, Menu } from 'lucide-react';

// Mock data for messages
const initialMessages = {
  inbox: [
    {
      id: 1,
      from: "Dr. Sarah Johnson",
      subject: "Clinical Rotation Schedule Update",
      preview: "Please review the updated schedule for next week's rotations...",
      date: "over 2 years ago",
      isUrgent: true,
      isStarred: false
    },
    {
      id: 2,
      from: "University Hospital Admin",
      subject: "New Student Orientation",
      preview: "The orientation for new students will take place on Monday at 9 AM...",
      date: "over 2 years ago",
      isInformational: true,
      isStarred: false
    },
    {
      id: 3,
      from: "Clinical Education Team",
      subject: "Feedback on Student Performance",
      preview: "We would like to gather your feedback on the students' performance...",
      date: "over 2 years ago",
      isStarred: false,
      isCompleted: true
    },
    {
      id: 4,
      from: "Dr. Michael Chen",
      subject: "Department Meeting",
      preview: "Please join us for the monthly department meeting on Friday at 2 PM...",
      date: "over 2 years ago",
      isImportant: true,
      isStarred: false
    },
    {
      id: 5,
      from: "Student Affairs Office",
      subject: "Documentation Requirements",
      preview: "This is a reminder that all students must submit their health records...",
      date: "over 2 years ago",
      isStarred: true
    },
    {
      id: 6,
      from: "Library Services",
      subject: "Overdue Books Reminder",
      preview: "Please return your overdue books to avoid late fees...",
      date: "5 days ago",
      isStarred: false
    },
    {
      id: 7,
      from: "Lab Coordinator",
      subject: "Lab Safety Training",
      preview: "Mandatory lab safety training will be held next week...",
      date: "3 days ago",
      isImportant: true,
      isStarred: false
    },
    {
      id: 8,
      from: "Dean's Office",
      subject: "Scholarship Opportunities",
      preview: "We are pleased to announce new scholarships available...",
      date: "2 weeks ago",
      isInformational: true,
      isStarred: false
    }
  ],
  sent: [
    {
      id: 9,
      from: "You",
      subject: "Re: Clinical Rotation Schedule Update",
      preview: "Thank you for the update. I will review the schedule.",
      date: "1 day ago",
      isStarred: false
    },
    {
      id: 10,
      from: "You",
      subject: "Re: Orientation",
      preview: "Looking forward to meeting everyone on Monday.",
      date: "3 days ago",
      isStarred: false
    }
  ],
  drafts: [
    {
      id: 11,
      from: "You",
      subject: "Pending Approval Request",
      preview: "Draft message awaiting final review...",
      date: "2 days ago",
      isStarred: false
    },
    {
      id: 12,
      from: "You",
      subject: "Reminder to Students",
      preview: "Need to remind students about assignment deadlines...",
      date: "1 week ago",
      isStarred: false
    }
  ],
  students: [
    {
      id: 13,
      from: "Student A",
      subject: "Question about rotation",
      preview: "I have a question about my upcoming rotation...",
      date: "3 days ago",
      isStarred: false
    },
    {
      id: 14,
      from: "Student B",
      subject: "Sick Leave Notice",
      preview: "I am unable to attend tomorrow due to illness...",
      date: "1 day ago",
      isStarred: false
    },
    {
      id: 15,
      from: "Student C",
      subject: "Assignment Submission Issue",
      preview: "I had trouble submitting my assignment through the portal...",
      date: "5 days ago",
      isStarred: false
    }
  ],
  instructors: [
    {
      id: 16,
      from: "Instructor X",
      subject: "Rotation Performance Update",
      preview: "Student has shown good improvement over the last two weeks...",
      date: "2 days ago",
      isStarred: false
    }
  ],
  support: [
    {
      id: 17,
      from: "SHIFTit Support",
      subject: "System Maintenance Notice",
      preview: "The system will be undergoing scheduled maintenance this weekend...",
      date: "4 days ago",
      isInformational: true,
      isStarred: false
    }
  ],
  archived: [
    {
      id: 18,
      from: "Admin Office",
      subject: "Old Meeting Notes",
      preview: "Here are the notes from the previous semester meetings...",
      date: "6 months ago",
      isStarred: false
    }
  ],
  trash: [
    {
      id: 19,
      from: "Spam Sender",
      subject: "You won a prize!",
      preview: "Click here to claim your reward...",
      date: "1 year ago",
      isStarred: false
    }
  ]
};

// UI Components
const Button = ({ children, onClick, variant = "primary", className = "", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center";
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-600"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Sidebar Component
const MessageSidebar = ({ messages, activeTab, setActiveTab, searchTerm, setSearchTerm, onClose, selectedLabel, setSelectedLabel }) => {
  const sidebarItems = [
    { icon: Mail, label: 'Inbox', count: messages.inbox.length, color: 'blue' },
    { icon: Mail, label: 'Sent', count: messages.sent.length },
    { icon: Mail, label: 'Drafts', count: messages.drafts.length, color: 'yellow' },
    { icon: GraduationCap, label: 'Students', count: messages.students.length, color: 'blue' },
    { icon: UserCheck, label: 'Instructors', count: messages.instructors.length, color: 'green' },
    { icon: Headphones, label: 'Support', count: messages.support.length, color: 'purple' },
    { icon: Star, label: 'Starred', count: Object.values(messages).flat().filter(m => m.isStarred).length },
    { icon: Archive, label: 'Archived', count: messages.archived.length },
    { icon: Trash2, label: 'Trash', count: messages.trash.length }
  ];

  const labels = [
    { name: 'Urgent', color: 'red' },
    { name: 'Important', color: 'yellow' },
    { name: 'Completed', color: 'green' },
    { name: 'Information', color: 'blue' }
  ];

  return (
    <div className="h-full p-4 bg-white overflow-y-auto">
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose}>
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        {sidebarItems.map((item, index) => (
          <div key={index} className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
            activeTab === item.label.toLowerCase() ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100 text-gray-700'
          }`} onClick={() => {
            setActiveTab(item.label.toLowerCase());
            onClose();
          }}>
            <div className="flex items-center space-x-3">
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {item.count > 0 && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                item.color === 'green' ? 'bg-green-100 text-green-800' :
                item.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Labels</h3>
        <div className="space-y-1">
          {labels.map((label, index) => {
            const lower = label.name.toLowerCase();
            const isActive = selectedLabel === lower;
            return (
              <div 
                key={index} 
                className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                  isActive ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => {
                  setSelectedLabel(isActive ? null : lower);
                  onClose();
                }}
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  label.color === 'red' ? 'bg-red-500' :
                  label.color === 'yellow' ? 'bg-yellow-500' :
                  label.color === 'green' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}></div>
                <span className="text-sm">{label.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Message Alerts Component
const MessageAlerts = ({ notifications, onDismiss, onDismissAll, onView }) => {
  if (notifications.length === 0) return null;
  
  return (
    <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 md:px-6">
      {notifications.map((notification, index) => (
        <div key={notification.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 ${index < notifications.length - 1 ? 'mb-2' : ''}`}>
          <div className="flex items-center space-x-3 flex-1">
            <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-blue-900 block truncate">New message</span>
              <div className="text-xs text-blue-700 truncate">
                <span className="font-medium">{notification.from}</span> - {notification.subject}
              </div>
            </div>
            <span className="text-xs text-blue-600 flex-shrink-0">{notification.time}</span>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button onClick={() => onView(notification.id)} className="text-xs text-blue-600 hover:text-blue-800">View</button>
            <button onClick={() => onDismiss(notification.id)} className="text-xs text-blue-600 hover:text-blue-800">Dismiss</button>
          </div>
        </div>
      ))}
      <div className="flex justify-end space-x-2 mt-2">
        <button className="text-xs text-blue-600 hover:text-blue-800">View all</button>
        <button onClick={onDismissAll} className="text-xs text-blue-600 hover:text-blue-800">Dismiss all</button>
      </div>
    </div>
  );
};

// Message List Component
const MessageList = ({ type, messages, setMessages, onSelectMessage, searchTerm, selectedIds, setSelectedIds, selectedLabel }) => {
  let currentMessages = messages[type] || [];
  
  if (type === 'starred') {
    currentMessages = Object.values(messages).flat().filter(m => m.isStarred);
  }
  
  const filteredMessages = currentMessages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const labelFiltered = selectedLabel
    ? filteredMessages.filter(m => {
        if (selectedLabel === 'urgent') return m.isUrgent;
        if (selectedLabel === 'important') return m.isImportant;
        if (selectedLabel === 'completed') return m.isCompleted;
        if (selectedLabel === 'information') return m.isInformational;
        return false;
      })
    : filteredMessages;

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(labelFiltered.map(m => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheck = (id, checked) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  const handleArchive = () => {
    setMessages(prev => {
      const newMsgs = { ...prev };
      selectedIds.forEach(id => {
        for (let key in newMsgs) {
          const idx = newMsgs[key].findIndex(m => m.id === id);
          if (idx !== -1) {
            const [msg] = newMsgs[key].splice(idx, 1);
            newMsgs.archived = [...(newMsgs.archived || []), msg];
            break;
          }
        }
      });
      return newMsgs;
    });
    setSelectedIds([]);
  };

  const handleTrash = () => {
    setMessages(prev => {
      const newMsgs = { ...prev };
      selectedIds.forEach(id => {
        for (let key in newMsgs) {
          const idx = newMsgs[key].findIndex(m => m.id === id);
          if (idx !== -1) {
            const [msg] = newMsgs[key].splice(idx, 1);
            newMsgs.trash = [...(newMsgs.trash || []), msg];
            break;
          }
        }
      });
      return newMsgs;
    });
    setSelectedIds([]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="rounded border-gray-300" onChange={handleCheckAll} checked={selectedIds.length === labelFiltered.length && labelFiltered.length > 0} />
          <Button variant="ghost" className="p-2" onClick={handleArchive}>
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="p-2" onClick={handleTrash}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="p-2">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm text-gray-500">{labelFiltered.length} messages</span>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <div className="hidden md:grid grid-cols-[auto,1fr,2fr,auto] gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 min-w-[640px]">
          <div className="col-span-1"></div>
          <div>From</div>
          <div>Subject</div>
          <div>Date</div>
        </div>
        
        {labelFiltered.map((message) => (
          <div 
            key={message.id} 
            className="md:grid md:grid-cols-[auto,1fr,2fr,auto] flex flex-col gap-2 md:gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors min-w-[640px] md:min-w-0"
            onClick={() => onSelectMessage(message)}
          >
            <div className="flex items-center space-x-2 md:col-span-1">
              <input 
                type="checkbox" 
                className="rounded border-gray-300" 
                checked={selectedIds.includes(message.id)}
                onChange={(e) => handleCheck(message.id, e.target.checked)}
                onClick={e => e.stopPropagation()}
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setMessages(prev => {
                    const newMsgs = { ...prev };
                    for (let key in newMsgs) {
                      newMsgs[key] = newMsgs[key].map(m => 
                        m.id === message.id ? { ...m, isStarred: !m.isStarred } : m
                      );
                    }
                    return newMsgs;
                  });
                }} 
                className={`hover:text-yellow-500 ${message.isStarred ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                <Star className="h-4 w-4" fill={message.isStarred ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="font-medium text-gray-900 md:block flex">
              <span className="md:hidden text-sm text-gray-500 mr-2">From:</span> {message.from}
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-medium text-gray-900 flex">
                  <span className="md:hidden text-sm text-gray-500 mr-2">Subject:</span> {message.subject}
                </span>
                {message.isUrgent && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Urgent</span>
                )}
                {message.isInformational && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Information</span>
                )}
                {message.isImportant && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Important</span>
                )}
                {message.isCompleted && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span>
                )}
              </div>
              <div className="text-sm text-gray-500 truncate">{message.preview}</div>
            </div>
            <div className="flex items-center justify-between md:col-span-1">
              <span className="text-sm text-gray-500 flex">
                <span className="md:hidden text-sm text-gray-500 mr-2">Date:</span> {message.date}
              </span>
              <button className="text-gray-400 hover:text-gray-600" onClick={e => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Compose Message Component
const ComposeMessage = ({ open, onOpenChange, defaultRecipients = [] }) => {
  const [recipients, setRecipients] = useState(defaultRecipients.join(', '));
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-2">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Compose New Message</h2>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4 md:p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter recipients..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter subject..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Type your message..."
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 p-4 md:p-6 border-t border-gray-200">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

// Message Detail Component
const MessageDetail = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-y-auto max-h-[80vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">{message.subject}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div><strong>From:</strong> {message.from}</div>
          <div><strong>Date:</strong> {message.date}</div>
          <div><strong>Message:</strong> <p>{message.preview} (Full message body would appear here.)</p></div>
        </div>
      </div>
    </div>
  );
};

// Main Messages Component
export default function MessagesPage() {
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [composeType, setComposeType] = useState("general");
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedIds, setSelectedIds] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, from: "University Hospital", subject: "Document request", time: "2m ago" },
    { id: 2, from: "Dr. Sarah Johnson", subject: "Schedule update", time: "1h ago" }
  ]);

  const handleComposeClick = (type) => {
    setComposeType(type);
    setComposeOpen(true);
  };

  const getDefaultRecipients = () => {
    switch (composeType) {
      case "students":
        return ["All Students"];
      case "instructors":
        return ["All Clinical Instructors"];
      case "account-manager":
        return ["SHIFTit Account Manager"];
      default:
        return [];
    }
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const dismissAllNotifications = () => {
    setNotifications([]);
  };

  const viewNotification = (id) => {
    const allMsgs = Object.values(messages).flat();
    const msg = allMsgs.find(m => m.id === id);
    if (msg) {
      setSelectedMessage(msg);
    }
  };

  let content;
  let banner = null;
  if (activeTab === 'students') {
    banner = (
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Student Communications</h3>
        </div>
        <p className="text-blue-700 text-sm">
          Messages and communications with clinical rotation students
        </p>
      </div>
    );
  } else if (activeTab === 'instructors') {
    banner = (
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <UserCheck className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-900">Instructor Communications</h3>
        </div>
        <p className="text-green-700 text-sm">Messages and communications with clinical instructors</p>
      </div>
    );
  } else if (activeTab === 'support') {
    banner = (
      <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Headphones className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">SHIFTit Support</h3>
        </div>
        <p className="text-purple-700 text-sm">
          Communications with your SHIFTit account manager and support team
        </p>
      </div>
    );
  }

  content = (
    <>
      {banner}
      <MessageList 
        type={activeTab} 
        messages={messages}
        setMessages={setMessages}
        onSelectMessage={setSelectedMessage} 
        searchTerm={searchTerm} 
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectedLabel={selectedLabel}
      />
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="p-2 md:hidden" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <Button
              onClick={() => handleComposeClick("general")}
              className="bg-purple-600 hover:bg-purple-700 text-xs md:text-base"
            >
              <Plus className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              Compose New
            </Button>
            <Button
              onClick={() => handleComposeClick("students")}
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50 text-xs md:text-base"
            >
              <GraduationCap className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              Message Students
            </Button>
            <Button
              onClick={() => handleComposeClick("instructors")}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50 text-xs md:text-base"
            >
              <UserCheck className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              Message Instructors
            </Button>
            <Button
              onClick={() => handleComposeClick("account-manager")}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white text-xs md:text-base"
            >
              <Headphones className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              Contact Support
            </Button>
          </div>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          <div 
            className={`w-64 border-r border-gray-200 h-full fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto bg-white ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <MessageSidebar 
              messages={messages}
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              onClose={() => setIsSidebarOpen(false)}
              selectedLabel={selectedLabel}
              setSelectedLabel={setSelectedLabel}
            />
          </div>

          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 md:hidden" 
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <div className="flex-1 flex flex-col h-full">
            <MessageAlerts 
              notifications={notifications} 
              onDismiss={dismissNotification} 
              onDismissAll={dismissAllNotifications} 
              onView={viewNotification}
            />

            <div className="p-4 md:p-6 flex-1 overflow-auto">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                  <p className="text-gray-600 text-sm md:text-base">Communicate with students, instructors, and support</p>
                </div>
              </div>

              {content}
            </div>
          </div>
        </div>
        
        <ComposeMessage 
          open={composeOpen} 
          onOpenChange={setComposeOpen} 
          defaultRecipients={getDefaultRecipients()} 
        />

        <MessageDetail 
          message={selectedMessage} 
          onClose={() => setSelectedMessage(null)} 
        />
      </div>
    </div>
  );
}