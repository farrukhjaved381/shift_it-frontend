import { useState, useEffect } from "react"
import { Search, Send, Paperclip, MoreVertical, MessageSquare, Users } from "lucide-react"

export default function MessagesModule({
  conversations = [],
  messages = [],
  onSendMessage,
  onConversationSelect,
  className,
}) {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showConversations, setShowConversations] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Default data for demonstration
  const defaultConversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Clinical Supervisor",
      lastMessage: "Please remember to complete your patient logs...",
      time: "2h ago",
      unread: 2
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Pediatrics Instructor",
      lastMessage: "Great work on the case study today!",
      time: "1d ago",
      unread: 0
    },
    {
      id: 3,
      name: "Dr. Amanda Williams",
      role: "Internal Medicine",
      lastMessage: "Don't forget the upcoming exam preparation",
      time: "2d ago",
      unread: 1
    },
    {
      id: 4,
      name: "Dr. Robert Davis",
      role: "Surgery Department",
      lastMessage: "Your performance in the OR was excellent",
      time: "3d ago",
      unread: 0
    }
  ]

  const defaultMessages = [
    {
      id: 1,
      content: "Hello! How are you doing with your clinical rotations?",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      content: "Hi Dr. Johnson! I'm doing well, thank you. Just finished my shift at the ER.",
      time: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      content: "Excellent! Remember to complete your patient logs before the end of each shift.",
      time: "10:35 AM",
      isOwn: false
    },
    {
      id: 4,
      content: "Will do! Also, I have a question about the upcoming case review session.",
      time: "10:36 AM",
      isOwn: true
    },
    {
      id: 5,
      content: "Of course! The case review will be next Tuesday at 2 PM in Conference Room A. Please come prepared with your notes.",
      time: "10:38 AM",
      isOwn: false
    }
  ]

  const currentConversations = conversations.length > 0 ? conversations : defaultConversations
  const currentMessages = messages.length > 0 ? messages : defaultMessages

  const filteredConversations = currentConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage)
      setNewMessage("")
    }
  }

  const handleConversationSelect = (conversationId) => {
    setSelectedConversation(conversationId)
    onConversationSelect?.(conversationId)
    // On mobile, hide conversations after selecting one
    if (isMobile) {
      setShowConversations(false)
    }
  }

  const selectedConvData = currentConversations.find(c => c.id === selectedConversation)

  const toggleConversations = () => {
    setShowConversations(!showConversations)
  }

  return (
    <div className={`min-h-screen bg-gray-50 mobile-container ${className || ""}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Top Header */}
        <header className="py-4 sm:py-6 border-b border-gray-200 bg-white rounded-t-lg sm:rounded-none">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Messages</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Communicate with supervisors, coordinators, and peers
              </p>
            </div>
            {/* Toggle button for mobile */}
            {isMobile && (
              <button
                onClick={toggleConversations}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation"
                aria-label={showConversations ? "Hide conversations" : "Show conversations"}
              >
                {showConversations ? (
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                ) : (
                  <Users className="h-5 w-5 text-gray-600" />
                )}
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className={`grid gap-4 sm:gap-6 py-4 sm:py-6 ${
          isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-1 lg:grid-cols-3 h-[calc(100vh-200px)]'
        }`}>
          {/* Conversations List */}
          <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 ${
            isMobile 
              ? `${showConversations ? 'block' : 'hidden'} h-[calc(100vh-160px)]` 
              : 'lg:col-span-1 lg:block h-[calc(100vh-200px)]'
          }`}>
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Conversations</h2>
                {isMobile && (
                  <button
                    onClick={() => setShowConversations(false)}
                    className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    aria-label="Close conversations"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm no-zoom"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-120px)] sm:h-[calc(100%-140px)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${
                    selectedConversation === conversation.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 truncate text-sm">{conversation.name}</h4>
                        <span className="text-xs text-gray-500 flex-shrink-0">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{conversation.role}</p>
                      <p className="text-sm text-gray-700 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[20px] text-center flex-shrink-0">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          <div className={`bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col transition-all duration-300 ${
            isMobile 
              ? `${!showConversations ? 'block' : 'hidden'} h-[calc(100vh-160px)]` 
              : 'lg:col-span-2 h-[calc(100vh-200px)]'
          }`}>
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {selectedConvData?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("") || "SJ"}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                      {selectedConvData?.name || "Dr. Sarah Johnson"}
                    </h2>
                    <p className="text-sm text-gray-600 truncate">
                      {selectedConvData?.role || "Clinical Supervisor"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isMobile && !showConversations && (
                    <button
                      onClick={() => setShowConversations(true)}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation"
                      aria-label="Show conversations"
                    >
                      <Users className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 touch-manipulation">
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
              {currentMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[280px] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                      message.isOwn
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 sm:p-6">
              <div className="flex gap-2">
                <button className="p-2.5 sm:p-3 hover:bg-gray-100 rounded-md transition-colors duration-200 border border-gray-300 touch-manipulation">
                  <Paperclip className="h-4 w-4 text-gray-500" />
                </button>
                <div className="flex-1">
                  <textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white text-sm no-zoom"
                    rows={1}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200 shadow-sm hover:shadow-md touch-manipulation"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}