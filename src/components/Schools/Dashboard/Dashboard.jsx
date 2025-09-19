import React, { useState } from 'react';
import {
  Users,
  Calendar,
  FileCheck,
  Shield,
  FlaskConical,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedRotation, setSelectedRotation] = useState(null);

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${
          color.includes('red') ? 'bg-red-50' : 
          color.includes('green') ? 'bg-green-50' : 
          color.includes('yellow') ? 'bg-yellow-50' : 
          color.includes('blue') ? 'bg-blue-50' : 'bg-gray-50'
        }`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const RequestCard = ({ name, department, hospital, status }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-200">
      <div>
        <p className="font-medium text-gray-900">{name} - {department}</p>
        <p className="text-sm text-gray-600">{hospital}</p>
      </div>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'Approved' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {status === 'Approved' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
        {status}
      </span>
    </div>
  );

  const ActionButton = ({ icon: Icon, label, onClick, variant = 'secondary' }) => (
    <button
      onClick={onClick}
      className={`w-full h-20 flex flex-col items-center justify-center space-y-2 rounded-lg border transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
        variant === 'primary' 
          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 active:bg-blue-800' 
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
      }`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  const handleViewRotations = () => {
    navigate('/rotations');
  };

  const handleManageStudents = () => {
    navigate('/students');
  };

  const handleSendMessage = () => {
    navigate('/messages');
  };

  const handleManageDocuments = () => {
    navigate('/verifications');
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your clinical rotation management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard 
          title="Active Students" 
          value="24" 
          subtitle="+2 from last month" 
          icon={Users} 
          color="text-blue-600" 
        />
        <StatCard 
          title="Pending Rotations" 
          value="8" 
          subtitle="Awaiting approval" 
          icon={Calendar} 
          color="text-yellow-600" 
        />
        <StatCard 
          title="Documents Pending" 
          value="12" 
          subtitle="Require review" 
          icon={FileCheck} 
          color="text-red-600" 
        />
        <StatCard 
          title="Background Checks" 
          value="3" 
          subtitle="In progress" 
          icon={Shield} 
          color="text-green-600" 
        />
        <StatCard 
          title="Drug Tests" 
          value="2" 
          subtitle="In progress" 
          icon={FlaskConical} 
          color="text-blue-600" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clinical Rotation Requests */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Clinical Rotation Requests</h3>
          </div>
          <div className="p-6 space-y-4">
            <RequestCard 
              name="Sarah Johnson" 
              department="Pediatric ICU" 
              hospital="Memorial Hospital" 
              status="Pending" 
            />
            <RequestCard 
              name="Michael Chen" 
              department="Emergency Medicine" 
              hospital="City General Hospital" 
              status="Approved" 
            />
            <RequestCard 
              name="Emily Davis" 
              department="Surgery" 
              hospital="Regional Medical Center" 
              status="Pending" 
            />
            <button 
              onClick={handleViewRotations}
              className="w-full mt-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              View All Rotations
            </button>
          </div>
        </div>

        {/* Document Status Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Document Status Overview</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
              <div>
                <p className="font-medium text-gray-900">Background Checks</p>
                <p className="text-sm text-gray-600">3 pending review</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                Action Required
              </span>
            </div>
            <div className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors duration-200">
              <div>
                <p className="font-medium text-gray-900">Health Records</p>
                <p className="text-sm text-gray-600">All up to date</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Complete
              </span>
            </div>
            <button 
              onClick={handleManageDocuments}
              className="w-full mt-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Manage Documents
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionButton 
              icon={Calendar} 
              label="View Rotations" 
              onClick={handleViewRotations} 
              variant="primary" 
            />
            <ActionButton 
              icon={Users} 
              label="Manage Students" 
              onClick={handleManageStudents} 
            />
            <ActionButton 
              icon={MessageSquare} 
              label="Send Message" 
              onClick={handleSendMessage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;