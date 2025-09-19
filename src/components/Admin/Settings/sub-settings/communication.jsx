import React, { useState, createContext, useContext } from "react"
import {
  ArrowLeft,
  Send,
  Inbox,
  Bell,
  MessageSquare,
  Users,
  Eye,
  Reply,
  Trash2,
  X,
  CheckCircle,
  Circle,
} from "lucide-react"

// ---------- UI Primitives ----------
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const variants = {
    default: "bg-indigo-900 text-white hover:bg-indigo-800",
    ghost: "hover:bg-gray-100",
    outline: "border border-gray-300 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  }
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm",
    icon: "h-10 w-10",
  }
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
)
const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)
const CardFooter = ({ children, className = "" }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
)
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
)
const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
)

const Badge = ({
  children,
  className = "",
  variant = "default",
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>
}

const Label = ({ children, className = "" }) => (
  <label className={`text-sm font-medium ${className}`}>{children}</label>
)

// ---------- Tabs with Context ----------
const TabsContext = createContext(null)

const Tabs = ({ value, onValueChange, children }) => (
  <TabsContext.Provider value={{ value, setValue: onValueChange }}>
    {children}
  </TabsContext.Provider>
)

const TabsList = ({ children, className = "" }) => (
  <div className={`inline-flex h-10 items-center rounded-md bg-gray-100 p-1 ${className}`}>{children}</div>
)

const TabsTrigger = ({ value, children }) => {
  const ctx = useContext(TabsContext)
  const active = ctx.value === value
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-sm transition-all ${active ? "bg-white shadow-sm" : "hover:bg-gray-50"}`}
    >
      {children}
    </button>
  )
}

const TabsContent = ({value, children }) => {
  const ctx = useContext(TabsContext)
  if (ctx.value !== value) return null
  return <div className="mt-2">{children}</div>
}

// ---------- Modal Component ----------
const Modal = ({
  isOpen,
  onClose,
  children,
  title
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-indigo-900">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// ---------- Main Component ----------
function Communication({ onNavigateBack }) {
  const [activeTab, setActiveTab] = useState("inbox")
  const [searchQuery, setSearchQuery] = useState("")

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Admin",
      subject: "Welcome to SHIFTit",
      content: "Welcome to the SHIFTit platform. Please review the documentation.",
      timestamp: "2025-09-01T10:00:00Z",
      status: "Unread",
      isRead: false,
    },
    {
      id: "2",
      sender: "HR Department",
      subject: "Policy Update",
      content: "There has been an update to our company policies. Please check the documentation section.",
      timestamp: "2025-08-30T14:30:00Z",
      status: "Read",
      isRead: true,
    },
  ])
  const [notifications] = useState([
    { id: "1", title: "Shift Assigned", message: "You have been assigned a new shift on September 5th.", type: "Info", timestamp: "2025-09-01T08:00:00Z", read: false },
    { id: "2", title: "Document Expiring", message: "Your BLS Certification is expiring soon. Please renew it.", type: "Warning", timestamp: "2025-08-31T12:00:00Z", read: true },
  ])
  const [broadcasts, setBroadcasts] = useState([
    { id: "1", title: "System Maintenance", content: "System maintenance on Sept 10th from 2 AM to 4 AM.", recipientType: "All Users", timestamp: "2025-09-01T09:00:00Z", sentBy: "Super Admin" },
  ])

  const [newMessage, setNewMessage] = useState({ recipient: "", subject: "", content: "" })
  const [newBroadcast, setNewBroadcast] = useState({ title: "", content: "", recipientType: "All Users" })
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [isReadModalOpen, setIsReadModalOpen] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")

  const filteredMessages = messages.filter(
    (msg) =>
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!newMessage.subject.trim() || !newMessage.content.trim()) {
      alert("Please fill in subject and message")
      return
    }
    const msg = {
      id: (messages.length + 1).toString(),
      sender: "Super Admin",
      recipient: newMessage.recipient || "Unknown Recipient",
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date().toISOString(),
      status: "Sent",
      isRead: true,
    }
    setMessages([...messages, msg])
    setNewMessage({ recipient: "", subject: "", content: "" })
    setActiveTab("sent")
  }

  const handleSendBroadcast = () => {
    if (!newBroadcast.title.trim() || !newBroadcast.content.trim()) {
      alert("Please fill in title and message")
      return
    }
    const bc = {
      id: (broadcasts.length + 1).toString(),
      title: newBroadcast.title,
      content: newBroadcast.content,
      recipientType: newBroadcast.recipientType,
      timestamp: new Date().toISOString(),
      sentBy: "Super Admin",
    }
    setBroadcasts([...broadcasts, bc])
    setNewBroadcast({ title: "", content: "", recipientType: "All Users" })
  }

  const handleReadMessage = (message) => {
    setSelectedMessage(message)
    setIsReadModalOpen(true)
    if (!message.isRead) {
      setMessages(messages.map(msg =>
        msg.id === message.id ? { ...msg, status: "Read", isRead: true } : msg
      ))
    }
  }

  const handleReplyMessage = () => {
    if (!replyMessage.trim()) {
      alert("Please enter a reply message")
      return
    }
    if (!selectedMessage) return
    const reply = {
      id: (messages.length + 1).toString(),
      sender: "Super Admin",
      recipient: selectedMessage.sender,
      subject: `Re: ${selectedMessage.subject}`,
      content: replyMessage,
      timestamp: new Date().toISOString(),
      status: "Sent",
      isRead: true,
    }
    setMessages([...messages, reply])
    setReplyMessage("")
    setIsReadModalOpen(false)
    setActiveTab("sent")
  }

  const handleMarkAsRead = (id) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, status: "Read", isRead: true } : msg)))
  }
  const handleDeleteMessage = (id) => setMessages(messages.filter((msg) => msg.id !== id))
  const handleDeleteBroadcast = (id) => setBroadcasts(broadcasts.filter((b) => b.id !== id))

  const getNotificationColor = (type) => {
    switch (type) {
      case "Info": return "bg-blue-100 text-blue-800"
      case "Warning": return "bg-yellow-100 text-yellow-800"
      case "Error": return "bg-red-100 text-red-800"
      case "Success": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(date))

  const unreadCount = messages.filter(m => !m.isRead && m.status !== "Sent").length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onNavigateBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-indigo-900">Communication</h1>
      </div>

      {/* Search */}
      <Input placeholder="Search messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="max-w-md" />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="inbox"><Inbox className="h-4 w-4 mr-2" /> Inbox ({unreadCount})</TabsTrigger>
          <TabsTrigger value="sent"><Send className="h-4 w-4 mr-2" /> Sent ({messages.filter(m => m.status === "Sent").length})</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" /> Notifications ({notifications.filter(n => !n.read).length})</TabsTrigger>
          <TabsTrigger value="broadcasts"><Users className="h-4 w-4 mr-2" /> Broadcasts</TabsTrigger>
          <TabsTrigger value="compose"><MessageSquare className="h-4 w-4 mr-2" /> Compose</TabsTrigger>
        </TabsList>

        {/* Inbox */}
        <TabsContent value="inbox">
          {filteredMessages.filter(m => m.status !== "Sent").length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Inbox className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No messages in your inbox</p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.filter(m => m.status !== "Sent").map((msg) => (
              <Card key={msg.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!msg.isRead ? 'border-l-4 border-l-indigo-500' : ''}`}>
                <CardHeader className="flex justify-between">
                  <div className="flex-1" onClick={() => handleReadMessage(msg)}>
                    <CardTitle className="hover:text-indigo-600">{msg.subject}</CardTitle>
                    <CardDescription>From: {msg.sender}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!msg.isRead ? (
                      <Circle className="h-4 w-4 text-indigo-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleReadMessage(msg)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleMarkAsRead(msg.id)}>
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(msg.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent onClick={() => handleReadMessage(msg)}>
                  <p className="text-sm text-gray-600 line-clamp-2">{msg.content}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-gray-500">{formatDate(msg.timestamp)}</span>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Sent */}
        <TabsContent value="sent">
          {filteredMessages.filter(m => m.status === "Sent").length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Send className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No sent messages</p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.filter(m => m.status === "Sent").map((msg) => (
              <Card key={msg.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="flex justify-between">
                  <div className="flex-1" onClick={() => handleReadMessage(msg)}>
                    <CardTitle className="hover:text-indigo-600">{msg.subject}</CardTitle>
                    <CardDescription>To: {msg.recipient}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleReadMessage(msg)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(msg.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent onClick={() => handleReadMessage(msg)}>
                  <p className="text-sm text-gray-600 line-clamp-2">{msg.content}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-gray-500">{formatDate(msg.timestamp)}</span>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No notifications</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((n) => (
              <Card key={n.id}>
                <CardHeader className="flex justify-between">
                  <div>
                    <CardTitle>{n.title}</CardTitle>
                    <Badge className={getNotificationColor(n.type)}>{n.type}</Badge>
                  </div>
                  {!n.read && <Badge>Unread</Badge>}
                </CardHeader>
                <CardContent><p>{n.message}</p></CardContent>
                <CardFooter><span className="text-xs text-gray-500">{formatDate(n.timestamp)}</span></CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Broadcasts */}
        <TabsContent value="broadcasts">
          <Card>
            <CardHeader><CardTitle>Send Broadcast</CardTitle><CardDescription>Send messages to all users, admins, or SHIFTerz</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Title</Label><Input value={newBroadcast.title} onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })} /></div>
              <div><Label>Message</Label><Textarea value={newBroadcast.content} onChange={(e) => setNewBroadcast({ ...newBroadcast, content: e.target.value })} rows={5} /></div>
              <div>
                <Label>Recipient Type</Label>
                <select value={newBroadcast.recipientType} onChange={(e) => setNewBroadcast({ ...newBroadcast, recipientType: e.target.value })}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm">
                  <option value="All Users">All Users</option>
                  <option value="Admins">Admins</option>
                  <option value="SHIFTerz">SHIFTerz</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
            </CardContent>
            <CardFooter><Button onClick={handleSendBroadcast}><Send className="h-4 w-4 mr-2" /> Send Broadcast</Button></CardFooter>
          </Card>

          <h3 className="mt-6 text-lg font-medium text-indigo-900">Recent Broadcasts</h3>
          {broadcasts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No broadcasts sent yet</p>
              </CardContent>
            </Card>
          ) : (
            broadcasts.map((broadcast) => (
              <Card key={broadcast.id}>
                <CardHeader className="flex justify-between">
                  <div>
                    <CardTitle>{broadcast.title}</CardTitle>
                    <CardDescription>To: {broadcast.recipientType}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteBroadcast(broadcast.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{broadcast.content}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-gray-500">Sent by {broadcast.sentBy} on {formatDate(broadcast.timestamp)}</span>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Compose */}
        <TabsContent value="compose">
          <Card>
            <CardHeader>
              <CardTitle>Compose New Message</CardTitle>
              <CardDescription>Send a message to a specific recipient</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="composeRecipient">Recipient</Label>
                <Input
                  id="composeRecipient"
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                  placeholder="Enter recipient email or name"
                />
              </div>
              <div>
                <Label htmlFor="composeSubject">Subject</Label>
                <Input
                  id="composeSubject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Enter message subject"
                />
              </div>
              <div>
                <Label htmlFor="composeContent">Message</Label>
                <Textarea
                  id="composeContent"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Enter your message"
                  rows={8}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Read Message Modal */}
      <Modal
        isOpen={isReadModalOpen}
        onClose={() => setIsReadModalOpen(false)}
        title={selectedMessage?.subject || "Message"}
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{selectedMessage.subject}</h3>
                  <p className="text-sm text-gray-600">
                    From: {selectedMessage.sender} • {formatDate(selectedMessage.timestamp)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedMessage.isRead ? (
                    <Badge className="bg-green-100 text-green-800">Read</Badge>
                  ) : (
                    <Badge className="bg-blue-100 text-blue-800">Unread</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="min-h-[200px]">
              <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.content}</p>
            </div>

            <div className="border-t pt-4">
              <Label htmlFor="reply">Reply to this message</Label>
              <Textarea
                id="reply"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsReadModalOpen(false)}>
                Close
              </Button>
              <Button onClick={handleReplyMessage}>
                <Reply className="h-4 w-4 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Communication