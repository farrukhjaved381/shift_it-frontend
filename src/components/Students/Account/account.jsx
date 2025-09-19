import React, { useState } from 'react';

// Mock data for demonstration
const mockDocuments = [
  {
    id: '1',
    name: 'Medical Certificate',
    category: 'health',
    status: 'approved',
    type: 'PDF',
    size: '2.3 MB',
    uploadDate: '2024-01-15',
    expiryDate: '2025-01-15',
    description: 'Annual medical examination certificate',
    required: true
  },
  {
    id: '2',
    name: 'Driver\'s License',
    category: 'legal',
    status: 'expired',
    type: 'PDF',
    size: '1.1 MB',
    uploadDate: '2023-05-20',
    expiryDate: '2024-05-20',
    description: 'Valid driver\'s license for vehicle operation',
    required: true
  },
  {
    id: '3',
    name: 'Safety Training Certificate',
    category: 'training',
    status: 'pending',
    type: 'PDF',
    size: '1.8 MB',
    uploadDate: '2024-02-10',
    expiryDate: '2025-02-10',
    description: 'Workplace safety training completion certificate',
    required: true
  },
  {
    id: '4',
    name: 'First Aid Certificate',
    category: 'training',
    status: 'missing',
    type: '',
    size: '',
    uploadDate: '',
    expiryDate: '2024-12-31',
    description: 'Basic first aid and CPR certification',
    required: true
  }
];

const AccountModule = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [documentFilter, setDocumentFilter] = useState('health');
  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const [security, setSecurity] = useState({
    twoFactor: true
  });

  // Icons as SVG components
  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  );

  const FileTextIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
  );

  const BellIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,6V8H3V6H21M6,10V21H18V10H6Z"/>
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
    </svg>
  );

  const HeartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
    </svg>
  );

  const GraduationCapIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
    </svg>
  );

  const ScaleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,10A4.5,4.5 0 0,0 3,14.5C3,16.43 4.57,18 6.5,18A4.5,4.5 0 0,0 11,13.5A4.5,4.5 0 0,0 7.5,10M16.5,10A4.5,4.5 0 0,0 12,14.5A4.5,4.5 0 0,0 16.5,19C18.43,19 20,17.43 20,15.5A4.5,4.5 0 0,0 16.5,10Z"/>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
    </svg>
  );

  const AlertTriangleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  );

  const getAttentionCountByCategory = (category) => {
    return mockDocuments.filter(
      (doc) =>
        doc.category === category &&
        (doc.status === "missing" || doc.status === "expired" || doc.status === "rejected")
    ).length;
  };

  const documentCategories = [
    {
      id: "health",
      label: "Health",
      fullLabel: "Personal Health",
      icon: HeartIcon,
      count: mockDocuments.filter((d) => d.category === "health").length,
      attentionCount: getAttentionCountByCategory("health"),
    },
    {
      id: "training",
      label: "Training",
      fullLabel: "Training & Certificates",
      icon: GraduationCapIcon,
      count: mockDocuments.filter((d) => d.category === "training").length,
      attentionCount: getAttentionCountByCategory("training"),
    },
    {
      id: "legal",
      label: "Legal",
      fullLabel: "Legal Documents",
      icon: ScaleIcon,
      count: mockDocuments.filter((d) => d.category === "legal").length,
      attentionCount: getAttentionCountByCategory("legal"),
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon />;
      case "pending":
        return <ClockIcon />;
      case "expired":
        return <AlertTriangleIcon />;
      case "rejected":
        return <AlertTriangleIcon />;
      case "missing":
        return <AlertTriangleIcon />;
      default:
        return <FileTextIcon />;
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      approved: { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
      pending: { bg: '#fef3c7', text: '#d97706', border: '#fde68a' },
      expired: { bg: '#fecaca', text: '#dc2626', border: '#fca5a5' },
      rejected: { bg: '#fecaca', text: '#dc2626', border: '#fca5a5' },
      missing: { bg: '#fed7aa', text: '#ea580c', border: '#fdba74' },
    };

    const colors = statusColors[status] || statusColors.pending;

    return (
      <span
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'capitalize'
        }}
      >
        {status}
      </span>
    );
  };

  const getComplianceStats = () => {
    const required = mockDocuments.filter((d) => d.required);
    const approved = required.filter((d) => d.status === "approved");
    const pending = required.filter((d) => d.status === "pending");
    const expired = required.filter((d) => d.status === "expired");
    const missing = required.filter((d) => d.status === "missing");
    const rejected = required.filter((d) => d.status === "rejected");

    return {
      total: required.length,
      approved: approved.length,
      pending: pending.length,
      expired: expired.length,
      missing: missing.length,
      rejected: rejected.length,
      compliance: Math.round((approved.length / required.length) * 100),
    };
  };

  const stats = getComplianceStats();

  const getSortedDocumentsByCategory = (category) => {
    const statusOrder = ["missing", "expired", "rejected", "pending", "approved"];
    return mockDocuments
      .filter((doc) => doc.category === category)
      .sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
  };

  const handleInputChange = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const tabStyle = (isActive) => ({
    padding: '12px 16px',
    border: 'none',
    background: isActive ? '#ffffff' : '#f8fafc',
    color: isActive ? '#0f172a' : '#64748b',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    transform: isActive ? 'translateY(-1px)' : 'none'
  });

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    outline: 'none'
  };

  const buttonStyle = (variant = 'primary') => ({
    padding: '10px 20px',
    border: variant === 'primary' ? 'none' : '1px solid #d1d5db',
    backgroundColor: variant === 'primary' ? '#3b82f6' : '#ffffff',
    color: variant === 'primary' ? '#ffffff' : '#374151',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    transform: 'translateY(0)',
  });

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
          Account Settings
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Manage your profile, documents, and preferences
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '8px', 
        marginBottom: '32px',
        backgroundColor: '#f1f5f9',
        padding: '6px',
        borderRadius: '12px'
      }}>
        <button 
          style={tabStyle(activeTab === 'profile')}
          onClick={() => setActiveTab('profile')}
          onMouseOver={(e) => {
            if (activeTab !== 'profile') {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== 'profile') {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          <UserIcon /> Profile
        </button>
        <button 
          style={tabStyle(activeTab === 'documents')}
          onClick={() => setActiveTab('documents')}
          onMouseOver={(e) => {
            if (activeTab !== 'documents') {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== 'documents') {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          <FileTextIcon /> Documents
        </button>
        <button 
          style={tabStyle(activeTab === 'notifications')}
          onClick={() => setActiveTab('notifications')}
          onMouseOver={(e) => {
            if (activeTab !== 'notifications') {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== 'notifications') {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          <BellIcon /> Notifications
        </button>
        <button 
          style={tabStyle(activeTab === 'security')}
          onClick={() => setActiveTab('security')}
          onMouseOver={(e) => {
            if (activeTab !== 'security') {
              e.target.style.backgroundColor = '#f1f5f9';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== 'security') {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          <ShieldIcon /> Security
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div style={cardStyle}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserIcon /> Personal Information
            </h2>
            <p style={{ color: '#64748b' }}>Basic personal details and contact information</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              backgroundColor: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: '600',
              color: '#64748b'
            }}>
              JD
            </div>
            <div>
              <button
                style={{
                  ...buttonStyle('outline'),
                  marginBottom: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Change Photo
              </button>
              <p style={{ fontSize: '12px', color: '#64748b' }}>JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                First Name *
              </label>
              <input
                style={inputStyle}
                value={userProfile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Last Name *
              </label>
              <input
                style={inputStyle}
                value={userProfile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Email Address *
              </label>
              <input
                style={inputStyle}
                type="email"
                value={userProfile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Phone Number *
              </label>
              <input
                style={inputStyle}
                value={userProfile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
            <button
              style={buttonStyle('outline')}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Save as Draft
            </button>
            <button
              style={buttonStyle('primary')}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 8px rgba(59,130,246,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div>
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <div style={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Compliance Rate</p>
                  <p style={{ fontSize: '32px', fontWeight: '700' }}>{stats.compliance}%</p>
                </div>
                <div style={{ fontSize: '32px' }}>📊</div>
              </div>
            </div>
            
            <div style={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
              color: 'white',
              border: 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Approved</p>
                  <p style={{ fontSize: '32px', fontWeight: '700' }}>{stats.approved}/{stats.total}</p>
                </div>
                <div style={{ fontSize: '32px' }}>✅</div>
              </div>
            </div>
            
            <div style={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Pending Review</p>
                  <p style={{ fontSize: '32px', fontWeight: '700' }}>{stats.pending}</p>
                </div>
                <div style={{ fontSize: '32px' }}>⏳</div>
              </div>
            </div>
            
            <div style={{
              ...cardStyle,
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
              color: 'white',
              border: 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Action Required</p>
                  <p style={{ fontSize: '32px', fontWeight: '700' }}>{stats.expired + stats.missing + stats.rejected}</p>
                </div>
                <div style={{ fontSize: '32px' }}>⚠️</div>
              </div>
            </div>
          </div>

          {/* Document Categories */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', marginBottom: '24px' }}>
              Document Library
            </h2>
            
            {/* Category Tabs */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '8px', 
              marginBottom: '24px',
              backgroundColor: '#f1f5f9',
              padding: '6px',
              borderRadius: '12px'
            }}>
              {documentCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    style={{
                      padding: '16px',
                      border: 'none',
                      background: documentFilter === category.id ? '#ffffff' : 'transparent',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: documentFilter === category.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                    }}
                    onClick={() => setDocumentFilter(category.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                      <IconComponent />
                      <span style={{ fontWeight: '500', fontSize: '14px' }}>{category.fullLabel}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <span style={{
                        backgroundColor: '#e2e8f0',
                        color: '#475569',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {category.count}
                      </span>
                      {category.attentionCount > 0 && (
                        <span style={{
                          backgroundColor: '#dc2626',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {category.attentionCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Document List */}
            <div style={{ space: '16px' }}>
              {getSortedDocumentsByCategory(documentFilter).map((document) => (
                <div
                  key={document.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: document.status === 'approved' ? '#dcfce7' : 
                                     document.status === 'pending' ? '#fef3c7' : '#fecaca',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: document.status === 'approved' ? '#15803d' : 
                             document.status === 'pending' ? '#d97706' : '#dc2626'
                    }}>
                      {getStatusIcon(document.status)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                          {document.name}
                        </h4>
                        {document.required && (
                          <span style={{
                            backgroundColor: '#e0e7ff',
                            color: '#3730a3',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            Required
                          </span>
                        )}
                        {getStatusBadge(document.status)}
                      </div>
                      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                        {document.type && `${document.type} • ${document.size} • `}
                        {document.uploadDate && `Uploaded ${new Date(document.uploadDate).toLocaleDateString()}`}
                        {document.expiryDate && ` • Expires ${new Date(document.expiryDate).toLocaleDateString()}`}
                      </div>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                        {document.description}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {document.status !== "missing" && (
                      <>
                        <button
                          style={{
                            padding: '8px',
                            border: 'none',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          title="View Document"
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#e2e8f0';
                            e.target.style.transform = 'scale(1.1)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#f1f5f9';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          👁️
                        </button>
                        <button
                          style={{
                            padding: '8px',
                            border: 'none',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          title="Download"
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#e2e8f0';
                            e.target.style.transform = 'scale(1.1)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#f1f5f9';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          ⬇️
                        </button>
                      </>
                    )}
                    <button
                      style={{
                        padding: '8px',
                        border: 'none',
                        backgroundColor: '#dbeafe',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title={document.status === "missing" ? "Upload Document" : "Upload New Version"}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#bfdbfe';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#dbeafe';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      ⬆️
                    </button>
                    {document.status !== "missing" && (
                      <button
                        style={{
                          padding: '8px',
                          border: 'none',
                          backgroundColor: '#fecaca',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        title="Delete"
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#fca5a5';
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#fecaca';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>
            Notification Preferences
          </h2>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>
            Choose how and when you want to be notified
          </p>

          <div style={{ space: '24px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '20px',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              marginBottom: '16px',
              transition: 'all 0.2s ease'
            }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>
                  Email Notifications
                </h4>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  Receive updates via email
                </p>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '54px', height: '28px' }}>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: notifications.email ? '#3b82f6' : '#cbd5e1',
                  borderRadius: '28px',
                  transition: '0.3s',
                  transform: 'translateZ(0)'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '22px',
                    width: '22px',
                    left: notifications.email ? '29px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </span>
              </label>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '20px',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              marginBottom: '16px',
              transition: 'all 0.2s ease'
            }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>
                  SMS Notifications
                </h4>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  Receive urgent updates via SMS
                </p>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '54px', height: '28px' }}>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={() => handleNotificationChange('sms')}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: notifications.sms ? '#3b82f6' : '#cbd5e1',
                  borderRadius: '28px',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '22px',
                    width: '22px',
                    left: notifications.sms ? '29px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </span>
              </label>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '20px',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              transition: 'all 0.2s ease'
            }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>
                  Push Notifications
                </h4>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  Receive real-time updates on your device
                </p>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '54px', height: '28px' }}>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => handleNotificationChange('push')}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: notifications.push ? '#3b82f6' : '#cbd5e1',
                  borderRadius: '28px',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '22px',
                    width: '22px',
                    left: notifications.push ? '29px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldIcon /> Security Settings
          </h2>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>
            Manage your account security preferences
          </p>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '20px',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>
                  Two-Factor Authentication
                </h4>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  Enable for added security
                </p>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '54px', height: '28px' }}>
                <input
                  type="checkbox"
                  checked={security.twoFactor}
                  onChange={() => setSecurity(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: security.twoFactor ? '#3b82f6' : '#cbd5e1',
                  borderRadius: '28px',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '22px',
                    width: '22px',
                    left: security.twoFactor ? '29px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </span>
              </label>
            </div>

            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>
                Change Password
              </h4>
              <div style={{ space: '16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your current password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <button
                  style={buttonStyle('primary')}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(59,130,246,0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#3b82f6';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountModule;