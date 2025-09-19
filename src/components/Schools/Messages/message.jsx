import React, { useState } from "react";
import { Search, Reply, Trash2, User, X, Send } from "lucide-react";

// Custom UI Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    normal: "bg-green-100 text-green-800 border border-green-200",
    unread: "bg-blue-100 text-blue-800 border border-blue-200",
    read: "bg-gray-100 text-gray-600 border border-gray-200",
    high: "bg-red-100 text-red-800 border border-red-200",
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    ghost: "hover:bg-gray-100 text-gray-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
  };
  
  const sizes = {
    default: "px-4 py-2 text-sm",
    icon: "p-2",
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

// Messages Module Component matching the image
const MessagesModule = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [newMessageData, setNewMessageData] = useState({
    recipient: "",
    priority: "Normal",
    subject: "",
    message: "",
  });

  const recipients = ["Dr. Smith", "Admin", "Coordinator"];
  const priorities = ["Normal", "High", "Urgent"];

  // Sample messages data matching the image
  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      status: "normal",
      readStatus: "unread",
      subject: "Question about Clinical Rotation Schedule",
      content: "Hi, I have a question about my upcoming clinical rotation schedule. Could you please clarify the start time for Monday's shift?",
      category: "Clinical Rotation",
      date: "Jan 15, 2024",
      priority: false
    },
    {
      id: 2,
      sender: "Michael Chen",
      status: "high",
      readStatus: "read",
      subject: "Document Resubmission - Hepatitis B Immunity",
      content: "I've uploaded a new copy of my Hepatitis B immunity documentation. The previous one was rejected due to unclear dates. Please review the new submission.",
      category: "Document Management",
      date: "Jan 14, 2024",
      priority: true
    },
    {
      id: 3,
      sender: "Dr. Jennifer Martinez",
      status: "normal",
      readStatus: "read",
      subject: "Student Performance Update",
      content: "I wanted to provide an update on Emily Rodriguez's performance during her ICU rotation. She has shown excellent clinical skills and professionalism.",
      category: "Performance Review",
      date: "Jan 13, 2024",
      priority: false
    }
  ];

  const stats = [
    { label: "Total Messages", value: "5", color: "text-blue-600", icon: "💬" },
    { label: "Unread", value: "2", color: "text-red-600", icon: "📧" },
    { label: "Urgent", value: "1", color: "text-orange-600", icon: "⭐" },
    { label: "Today", value: "0", color: "text-green-600", icon: "🕒" }
  ];

  // Filter messages based on search term, status, and type
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      searchTerm === "" ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Unread" && message.readStatus === "unread") ||
      (statusFilter === "Read" && message.readStatus === "read") ||
      (statusFilter === "High Priority" && message.status === "high");

    const matchesType = typeFilter === "All Types" || message.category === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleNewMessageSubmit = () => {
    // Handle form submission, e.g., send message
    console.log("New message:", newMessageData);
    setIsNewMessageOpen(false);
    setNewMessageData({ recipient: "", priority: "Normal", subject: "", message: "" });
  };

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsNewMessageOpen(true)}>
            + New Message
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search messages by sender, subject, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Status</option>
                <option>Unread</option>
                <option>Read</option>
                <option>High Priority</option>
              </select>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Types</option>
                <option>Clinical Rotation</option>
                <option>Document Management</option>
                <option>Performance Review</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Messages Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <Card key={message.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  
                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{message.sender}</h3>
                      <Badge variant={message.status}>{message.status}</Badge>
                      <Badge variant={message.readStatus}>{message.readStatus}</Badge>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">{message.subject}</h4>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{message.content}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Category: {message.category}</span>
                      <span>{message.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                    <Reply className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* New Message Modal */}
      <Modal isOpen={isNewMessageOpen} onClose={() => setIsNewMessageOpen(false)}>
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">New Message</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsNewMessageOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Recipient and Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient <span className="text-red-500">*</span>
                </label>
                <select
                  value={newMessageData.recipient}
                  onChange={(e) => setNewMessageData({...newMessageData, recipient: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select Recipient</option>
                  {recipients.map(recipient => (
                    <option key={recipient} value={recipient}>{recipient}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newMessageData.priority}
                  onChange={(e) => setNewMessageData({...newMessageData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <Input
                placeholder="Enter subject..."
                value={newMessageData.subject}
                onChange={(e) => setNewMessageData({...newMessageData, subject: e.target.value})}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <Textarea
                placeholder="Type your message here..."
                value={newMessageData.message}
                onChange={(e) => setNewMessageData({...newMessageData, message: e.target.value})}
                className="min-h-[120px]"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              onClick={() => setIsNewMessageOpen(false)}
              className="text-gray-600"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleNewMessageSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MessagesModule;