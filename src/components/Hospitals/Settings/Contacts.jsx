import React, { useState } from 'react';
import { FileText, Download, Printer, Calendar, Clock, CheckCircle, AlertCircle, Users, Building } from 'lucide-react';

// UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white hover:bg-green-600 ${className}`}>
    {children}
  </span>
);

const Tabs = ({ children, defaultValue, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className={className}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className = '', activeTab, setActiveTab }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>
    {React.Children.map(children, child => 
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ children, value, className = '', activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
      activeTab === value 
        ? 'bg-white text-gray-900 shadow-sm' 
        : 'text-gray-500 hover:text-gray-900'
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab, className = '' }) => {
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
};


export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState("current");

  // Sample contract data with added dummy data
  const contracts = {
    current: [
      {
        id: "CT-2023-001",
        name: "SHIFTit Clinical Rotation Agreement",
        status: "Active",
        startDate: "January 15, 2023",
        endDate: "January 14, 2024",
        signedBy: "Dr. Sarah Johnson",
        signedOn: "January 10, 2023",
        renewalDate: "December 15, 2023",
        type: "Standard",
        file: "/contracts/clinical-rotation-agreement.pdf",
      },
      {
        id: "CT-2023-002",
        name: "SHIFTit Research Collaboration Contract",
        status: "Active",
        startDate: "March 1, 2023",
        endDate: "February 28, 2024",
        signedBy: "Prof. Michael Lee",
        signedOn: "February 20, 2023",
        renewalDate: "January 31, 2024",
        type: "Research",
        file: "/contracts/research-collaboration.pdf",
      },
      {
        id: "CT-2023-003",
        name: "SHIFTit Equipment Lease Agreement",
        status: "Active",
        startDate: "May 15, 2023",
        endDate: "May 14, 2024",
        signedBy: "Ms. Emily Chen",
        signedOn: "May 10, 2023",
        renewalDate: "April 15, 2024",
        type: "Lease",
        file: "/contracts/equipment-lease.pdf",
      },
    ],
    past: [
      {
        id: "CT-2022-001",
        name: "SHIFTit Clinical Rotation Agreement",
        status: "Expired",
        startDate: "January 15, 2022",
        endDate: "January 14, 2023",
        signedBy: "Dr. Sarah Johnson",
        signedOn: "January 8, 2022",
        renewalDate: "N/A",
        type: "Standard",
        file: "/contracts/clinical-rotation-agreement-2022.pdf",
      },
      {
        id: "CT-2022-002",
        name: "SHIFTit Training Program Contract",
        status: "Expired",
        startDate: "April 1, 2022",
        endDate: "March 31, 2023",
        signedBy: "Mr. David Kim",
        signedOn: "March 25, 2022",
        renewalDate: "N/A",
        type: "Training",
        file: "/contracts/training-program-2022.pdf",
      },
      {
        id: "CT-2021-001",
        name: "SHIFTit Partnership Agreement",
        status: "Expired",
        startDate: "June 1, 2021",
        endDate: "May 31, 2022",
        signedBy: "Dr. Anna Rodriguez",
        signedOn: "May 20, 2021",
        renewalDate: "N/A",
        type: "Partnership",
        file: "/contracts/partnership-2021.pdf",
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-blue-600">Contracts</h1>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="current" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="current">Current Contracts</TabsTrigger>
                <TabsTrigger value="past">Past Contracts</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="current" className="space-y-6">
              {contracts.current.map((contract) => (
                <Card key={contract.id} className="overflow-hidden">
                  <CardHeader className="bg-white border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl text-blue-600 flex items-center">
                          <FileText className="mr-2 h-5 w-5" /> {contract.name}
                        </CardTitle>
                        <CardDescription className="mt-1">Contract ID: {contract.id}</CardDescription>
                      </div>
                      <Badge>{contract.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="border rounded-lg overflow-hidden bg-gray-50 h-[400px] flex items-center justify-center">
                          <div className="text-center p-6">
                            <FileText className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                            <h3 className="text-lg font-medium mb-2">Contract Preview</h3>
                            <p className="text-gray-500 mb-4">Click the button below to view the full contract</p>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => console.log('View full contract', contract.id)}>View Full Contract</Button>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" className="flex items-center" onClick={() => console.log('Download contract', contract.id)}>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                          <Button variant="outline" className="flex items-center" onClick={() => console.log('Print contract', contract.id)}>
                            <Printer className="mr-2 h-4 w-4" /> Print
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-4">Contract Details</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Contract Period</p>
                              <p className="text-gray-500">
                                {contract.startDate} - {contract.endDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Signed By</p>
                              <p className="text-gray-500">{contract.signedBy}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Signed On</p>
                              <p className="text-gray-500">{contract.signedOn}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Renewal Date</p>
                              <p className="text-gray-500">{contract.renewalDate}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Building className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Contract Type</p>
                              <p className="text-gray-500">{contract.type}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {contracts.past.map((contract) => (
                <Card key={contract.id} className="overflow-hidden">
                  <CardHeader className="bg-white border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl text-blue-600 flex items-center">
                          <FileText className="mr-2 h-5 w-5" /> {contract.name}
                        </CardTitle>
                        <CardDescription className="mt-1">Contract ID: {contract.id}</CardDescription>
                      </div>
                      <Badge className="bg-gray-500 text-white hover:bg-gray-600">{contract.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="border rounded-lg overflow-hidden bg-gray-50 h-[400px] flex items-center justify-center">
                          <div className="text-center p-6">
                            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">Contract Preview</h3>
                            <p className="text-gray-500 mb-4">This is an expired contract</p>
                            <Button variant="outline" onClick={() => console.log('View archive', contract.id)}>View Archive</Button>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" className="flex items-center" onClick={() => console.log('Download contract', contract.id)}>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                          <Button variant="outline" className="flex items-center" onClick={() => console.log('Print contract', contract.id)}>
                            <Printer className="mr-2 h-4 w-4" /> Print
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-4">Contract Details</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Contract Period</p>
                              <p className="text-gray-500">
                                {contract.startDate} - {contract.endDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Signed By</p>
                              <p className="text-gray-500">{contract.signedBy}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Signed On</p>
                              <p className="text-gray-500">{contract.signedOn}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Renewal Date</p>
                              <p className="text-gray-500">{contract.renewalDate}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Building className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Contract Type</p>
                              <p className="text-gray-500">{contract.type}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Active Contracts</span>
                    <span className="font-medium">{contracts.current.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Expired Contracts</span>
                    <span className="font-medium">{contracts.past.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Next Renewal</span>
                    <span className="font-medium">December 15, 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">SHIFTit Account Manager</p>
                      <p className="text-gray-500">Michael Rodriguez</p>
                      <p className="text-gray-500">michael.rodriguez@shiftit.com</p>
                      <p className="text-gray-500">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Building className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Legal Department</p>
                      <p className="text-gray-500">contracts@shiftit.com</p>
                      <p className="text-gray-500">(555) 987-6543</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}