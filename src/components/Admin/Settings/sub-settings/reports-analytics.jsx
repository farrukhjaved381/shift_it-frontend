import React, { useState } from "react"
import {
  ArrowLeft,
  BarChart2,
  PieChart,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Download,
  Filter,
  Loader2,
} from "lucide-react"

// ---------- Types ----------
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
      className={`inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}
    {...props}
  >
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
  <div className={`flex items-center justify-between p-6 pt-0 ${className}`}>{children}</div>
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
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// ---------- Main Component ----------

export default function ReportsAnalytics({ onNavigateBack }) {
  const [activeTab, setActiveTab] = useState("analytics")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [loading, setLoading] = useState(false)

  // Demo analytics cards
  const analyticsCards = [
    {
      id: "1",
      title: "Total Shifts",
      value: "1,245",
      icon: <BarChart2 className="h-6 w-6 text-indigo-900" />,
      trend: "up",
      change: "+8%",
      description: "Compared to last month",
    },
    {
      id: "2",
      title: "Active Students",
      value: "312",
      icon: <Users className="h-6 w-6 text-indigo-900" />,
      trend: "down",
      change: "-2%",
      description: "Compared to last month",
    },
    {
      id: "3",
      title: "Departments",
      value: "14",
      icon: <PieChart className="h-6 w-6 text-indigo-900" />,
      trend: "neutral",
      change: "0%",
      description: "Stable",
    },
    {
      id: "4",
      title: "Revenue",
      value: "$48,200",
      icon: <TrendingUp className="h-6 w-6 text-indigo-900" />,
      trend: "up",
      change: "+12%",
      description: "Compared to last month",
    },
  ]

  // Demo reports
  const [reports] = useState([
    {
      id: "1",
      title: "August Shift Summary",
      type: "Shift Summary",
      date: "2025-08-31",
      description: "Overview of all shifts completed in August.",
      status: "Ready",
    },
    {
      id: "2",
      title: "Attendance Report",
      type: "Attendance",
      date: "2025-08-31",
      description: "Attendance details for all staff.",
      status: "Ready",
    },
    {
      id: "3",
      title: "Payroll Report",
      type: "Payroll",
      date: "2025-08-31",
      description: "Payroll calculations and payouts.",
      status: "Processing",
    },
    {
      id: "4",
      title: "Department Performance",
      type: "Department",
      date: "2025-08-31",
      description: "Performance metrics by department.",
      status: "Failed",
    },
  ])

  // Filter + sort reports
  const filteredReports = reports
    .filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "status") return a.status.localeCompare(b.status)
      return 0
    })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onNavigateBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-indigo-900">Reports & Analytics</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === "analytics" ? "default" : "outline"}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </Button>
        <Button
          variant={activeTab === "reports" ? "default" : "outline"}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder={activeTab === "reports" ? "Search reports..." : "Search analytics..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md h-10 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {activeTab === "reports" && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="status">Sort by Status</option>
          </select>
        )}
      </div>

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsCards.map((card) => (
            <Card key={card.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </div>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-900">{card.value}</div>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium mr-2 ${
                      card.trend === "up"
                        ? "text-green-600"
                        : card.trend === "down"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-500">{card.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
              <p className="text-gray-500">Loading reports...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">No reports found</p>
                <Button size="sm">Generate New Report</Button>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      report.status === "Ready"
                        ? "success"
                        : report.status === "Processing"
                        ? "warning"
                        : "error"
                    }
                  >
                    {report.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Type: {report.type}</span>
                    <span>Date: {report.date}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                  {report.status === "Processing" && (
                    <span className="ml-4 text-xs text-yellow-600 animate-pulse">Processing...</span>
                  )}
                  {report.status === "Failed" && (
                    <span className="ml-4 text-xs text-red-600">Failed</span>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
