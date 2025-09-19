import React, { useState } from "react";
import { DollarSign, CheckCircle, Clock, FileText, Eye, Download } from "lucide-react";

// Reusable components with Tailwind styles
const StatCard = ({ title, amount, count, color, icon }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{amount}</p>
        <p className="text-xs text-gray-500">{count}</p>
      </div>
      <div className={`p-2 rounded-full ${color.replace("text-", "bg-").replace(/-\d+/, "-100")}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Badge = ({ children, color }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
    {children}
  </span>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const mockInvoices = [
  {
    id: "INV-2024-001",
    date: "Jan 15, 2024",
    description: "Clinical Rotation Services - Memorial Hospital",
    amount: "$4,500.00",
    status: "Overdue",
    statusColor: "bg-red-100 text-red-700",
  },
  {
    id: "INV-2024-003",
    date: "Jan 25, 2024",
    description: "Background Check Services - 12 Students",
    amount: "$950.00",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
];

export default function InvoicesDashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleView = (invoice) => {
    alert(
      `Viewing invoice: ${invoice.id}\nDate: ${invoice.date}\nDescription: ${invoice.description}\nAmount: ${invoice.amount}\nStatus: ${invoice.status}`
    );
  };

  const handleDownload = (invoice) => {
    alert(`Downloading invoice: ${invoice.id}`);
  };

  const handleSubmitPayment = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  const confirmPayment = () => {
    if (selectedInvoice) {
      alert(`Payment submitted for ${selectedInvoice.id}`);
    }
    closeModal();
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 p-2 rounded hover:bg-gray-100" aria-label="Filter or options">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1-1m-4 0V8m0 8H5l1-1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Outstanding"
          amount="$12,450"
          count="3 invoices"
          color="text-red-600"
          icon={<DollarSign className="h-4 w-4 text-red-600" />}
        />
        <StatCard
          title="Paid This Month"
          amount="$8,750"
          count="5 invoices"
          color="text-green-600"
          icon={<CheckCircle className="h-4 w-4 text-green-600" />}
        />
        <StatCard
          title="Pending"
          amount="$3,200"
          count="2 invoices"
          color="text-yellow-600"
          icon={<Clock className="h-4 w-4 text-yellow-600" />}
        />
        <StatCard
          title="Total This Year"
          amount="$45,890"
          count="28 invoices"
          color="text-blue-600"
          icon={<FileText className="h-4 w-4 text-blue-600" />}
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h2>

      {/* Container supports horizontal scroll on small screens and shows different layouts for mobile vs desktop */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Desktop / Tablet Table (sm and up) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{invoice.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge color={invoice.statusColor}>{invoice.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleView(invoice)} aria-label={`View ${invoice.id}`} className="text-gray-400 hover:text-gray-500 p-2 rounded hover:bg-gray-50">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDownload(invoice)} aria-label={`Download ${invoice.id}`} className="text-gray-400 hover:text-gray-500 p-2 rounded hover:bg-gray-50">
                        <Download className="h-5 w-5" />
                      </button>
                      <Button onClick={() => handleSubmitPayment(invoice)} className="bg-indigo-900 text-white hover:bg-indigo-800">
                        Submit Payment
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List (xs) */}
        <div className="sm:hidden divide-y divide-gray-200">
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{invoice.id}</p>
                  <p className="text-xs text-gray-500">{invoice.date}</p>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">{invoice.description}</p>
                </div>
                <div className="ml-3 flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-900">{invoice.amount}</p>
                  <div className="mt-2">
                    <Badge color={invoice.statusColor}>{invoice.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleView(invoice)} aria-label={`View ${invoice.id}`} className="p-2 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDownload(invoice)} aria-label={`Download ${invoice.id}`} className="p-2 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100">
                    <Download className="h-4 w-4" />
                  </button>
                </div>

                <div className="w-1/2">
                  <Button
                    onClick={() => handleSubmitPayment(invoice)}
                    className="w-full bg-indigo-900 text-white hover:bg-indigo-800"
                  >
                    Submit Payment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          <div className="bg-white rounded-t-lg sm:rounded-lg p-4 sm:p-6 w-full max-w-lg mx-auto overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-start">
              <h3 id="payment-modal-title" className="text-lg font-bold mb-2">
                Submit Payment for {selectedInvoice.id}
              </h3>
              <button onClick={closeModal} aria-label="Close" className="text-gray-500 p-1 rounded hover:bg-gray-100">
                ✕
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-700">Amount: <span className="font-medium text-gray-900">{selectedInvoice.amount}</span></p>

            {/* Payment form - adapted for small screens */}
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); confirmPayment(); }}>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Card Number</label>
                <input type="text" name="card" placeholder="•••• •••• •••• ••••" className="w-full p-2 border border-gray-300 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">MM/YY</label>
                  <input type="text" name="expiry" placeholder="MM/YY" className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">CVV</label>
                  <input type="text" name="cvv" placeholder="CVV" className="w-full p-2 border border-gray-300 rounded" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                <Button type="button" onClick={closeModal} className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-900 text-white hover:bg-indigo-800 w-full sm:w-auto">
                  Confirm Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}