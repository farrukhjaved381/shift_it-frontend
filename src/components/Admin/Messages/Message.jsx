import { useState, useEffect } from "react";
import { PaperAirplaneIcon, MagnifyingGlassIcon, EllipsisVerticalIcon, PlusIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';

// Mock data for conversations and messages
const initialConversations = [
  {
    id: 'conv-001',
    type: 'School',
    name: 'University of Health Sciences',
    lastMessage: 'Thank you for the update on student rotations.',
    timestamp: '2 hours ago',
    unread: 0,
    avatar: 'UHS',
  },
  {
    id: 'conv-002',
    type: 'Clinical Site',
    name: 'Memorial Hospital',
    lastMessage: 'We need to discuss the new preceptor assignments.',
    timestamp: '4 hours ago',
    unread: 2,
    avatar: 'MH',
  },
  {
    id: 'conv-003',
    type: 'Student',
    name: 'Alex Johnson',
    lastMessage: 'I have completed my rotation documentation.',
    timestamp: '1 day ago',
    unread: 0,
    avatar: 'AJ',
  },
  {
    id: 'conv-004',
    type: 'School',
    name: 'Medical Training Institute',
    lastMessage: 'Please confirm the schedule for next semester.',
    timestamp: '2 days ago',
    unread: 1,
    avatar: 'MTI',
  },
];

const initialMessages = {
  'conv-001': [
    {
      id: 'msg-001',
      sender: 'Dr. James Wilson',
      content: 'Hello, I wanted to follow up on the clinical rotation schedule for our nursing students.',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: 'msg-002',
      sender: 'You',
      content: 'Hi Dr. Wilson, I have reviewed the schedule and made the necessary adjustments. All students have been assigned to appropriate clinical sites.',
      timestamp: '10:45 AM',
      isOwn: true,
    },
    {
      id: 'msg-003',
      sender: 'Dr. James Wilson',
      content: 'Thank you for the update on student rotations.',
      timestamp: '11:00 AM',
      isOwn: false,
    },
  ],
  'conv-002': [
    {
      id: 'msg-004',
      sender: 'Dr. Emily Carter',
      content: 'We need to discuss the new preceptor assignments for the emergency department rotations.',
      timestamp: '2:15 PM',
      isOwn: false,
    },
    {
      id: 'msg-005',
      sender: 'Dr. Emily Carter',
      content: 'Also, please let me know about the student evaluation forms.',
      timestamp: '2:16 PM',
      isOwn: false,
    },
  ],
};

export default function Message() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [newChatForm, setNewChatForm] = useState({
    name: '',
    type: 'School',
    email: '',
  });
  const [showConversations, setShowConversations] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter conversations based on search and type
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || conv.type === filterType;
    return matchesSearch && matchesType;
  });

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentConversations = filteredConversations.slice(indexOfFirst, indexOfLast);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredConversations.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: `msg-${Date.now()}`,
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };

      setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: [...(prev[selectedConversation.id] || []), message],
      }));

      // Update conversation with last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { ...conv, lastMessage: newMessage.trim(), timestamp: 'now' }
            : conv
        )
      );

      setNewMessage('');
    }
  };

  // Handle creating new conversation
  const handleCreateChat = (e) => {
    e.preventDefault();
    const newConv = {
      id: `conv-${Date.now()}`,
      type: newChatForm.type,
      name: newChatForm.name,
      lastMessage: 'New conversation started',
      timestamp: 'now',
      unread: 0,
      avatar: newChatForm.name.split(' ').map(n => n[0]).join('').substring(0, 3).toUpperCase(),
    };

    setConversations([newConv, ...conversations]);
    setMessages(prev => ({ ...prev, [newConv.id]: [] }));
    setSelectedConversation(newConv);
    setIsNewChatOpen(false);
    setNewChatForm({ name: '', type: 'School', email: '' });
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'School': return 'bg-blue-100 text-blue-800';
      case 'Clinical Site': return 'bg-green-100 text-green-800';
      case 'Student': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Ensure conversations list is shown when no conversation is selected on mobile
  useEffect(() => {
    if (!selectedConversation && isMobile) {
      setShowConversations(true);
    }
  }, [selectedConversation, isMobile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-4 sm:py-6 border-b border-gray-200 bg-white rounded-t-lg sm:rounded-none">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-indigo-900">Messages</h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Communicate with schools, clinical sites, and students
                </p>
              </div>
              {isMobile && (
                <button
                  onClick={() => setShowConversations(!showConversations)}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation"
                  aria-label={showConversations ? "Hide conversations" : "Show conversations"}
                >
                  <Bars3Icon className="h-5 w-5 text-gray-600" />
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => setIsNewChatOpen(true)}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
              >
                <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                New Chat
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Souheil Jawad</p>
                  <p className="text-xs text-indigo-600 cursor-pointer hover:underline">View Profile</p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  SJ
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className={`grid gap-4 sm:gap-6 py-4 sm:py-6 ${
          isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-1 lg:grid-cols-3 h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)]'
        }`}>
          {/* Left: Conversations List */}
          <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 ${
            isMobile 
              ? `${showConversations ? 'block' : 'hidden'} h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]` 
              : 'lg:col-span-1 lg:block h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]'
          }`}>
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Conversations</h2>
                {isMobile && (
                  <button
                    onClick={() => setShowConversations(false)}
                    className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation"
                    aria-label="Close conversations"
                  >
                    <EllipsisVerticalIcon className="h-4 w-4 text-gray-500" />
                  </button>
                )}
              </div>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full mt-3 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Types</option>
                <option value="School">Schools</option>
                <option value="Clinical Site">Clinical Sites</option>
                <option value="Student">Students</option>
              </select>
            </div>
            <div className="overflow-y-auto h-[calc(100%-140px)] sm:h-[calc(100%-160px)]">
              <ul className="space-y-2">
                {currentConversations.map((conversation) => (
                  <li
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    className={`p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${
                      selectedConversation?.id === conversation.id ? 'bg-indigo-50' : ''
                    } touch-manipulation`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {conversation.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{conversation.name}</p>
                          <span className="text-xs text-gray-500 flex-shrink-0">{conversation.timestamp}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(conversation.type)}`}>{conversation.type}</span>
                        <p className="text-sm text-gray-700 truncate mt-1">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[20px] text-center flex-shrink-0">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Pagination */}
            {pageNumbers.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2 p-4 border-t border-gray-200">
                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } touch-manipulation`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Chat Area */}
          <div className={`bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col transition-all duration-300 ${
            isMobile 
              ? `${!showConversations ? 'block' : 'hidden'} h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]` 
              : 'lg:col-span-2 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]'
          }`}>
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {selectedConversation?.avatar || 'SJ'}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      {selectedConversation?.name || 'Select a conversation'}
                    </h2>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(selectedConversation?.type || '')}`}>
                      {selectedConversation?.type || ''}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isMobile && !showConversations && (
                    <button
                      onClick={() => setShowConversations(true)}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation"
                      aria-label="Show conversations"
                    >
                      <Bars3Icon className="h-5 w-5 text-gray-600" />
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation">
                    <EllipsisVerticalIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
              {selectedConversation && messages[selectedConversation.id]?.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] sm:max-w-[60%] lg:max-w-[50%] px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                      message.isOwn
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    {!message.isOwn && (
                      <p className="text-xs font-medium mb-1">{message.sender}</p>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? "text-indigo-200" : "text-gray-500"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {selectedConversation && (
              <div className="border-t border-gray-200 p-4 sm:p-6">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none bg-white text-sm"
                      rows={2}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="px-3 sm:px-4 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-200 shadow-sm hover:shadow-md touch-manipulation"
                  >
                    <PaperAirplaneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Chat Modal */}
        {isNewChatOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Start New Conversation</h2>
                <button
                  onClick={() => setIsNewChatOpen(false)}
                  className="text-gray-400 hover:text-gray-600 touch-manipulation"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateChat}>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={newChatForm.name}
                      onChange={(e) => setNewChatForm(prev => ({...prev, name: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="Enter contact name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Type</label>
                    <select
                      value={newChatForm.type}
                      onChange={(e) => setNewChatForm(prev => ({...prev, type: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    >
                      <option value="School">School</option>
                      <option value="Clinical Site">Clinical Site</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={newChatForm.email}
                      onChange={(e) => setNewChatForm(prev => ({...prev, email: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
                  <button
                    type="button"
                    onClick={() => setIsNewChatOpen(false)}
                    className="px-3 py-2 sm:px-4 sm:py-2 text-gray-600 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 text-sm touch-manipulation"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm touch-manipulation"
                  >
                    Start Chat
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}