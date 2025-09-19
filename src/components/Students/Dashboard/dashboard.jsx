import React, { useState } from 'react';

// Mock data based on the provided types
const mockUserProfile = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@example.com",
  phone: "(555) 123-4567",
};

const mockCurrentRotation = {
  title: "Emergency Medicine",
  hospital: "St. Mary's Hospital",
  location: "New York, NY",
  startDate: "2025-07-27",
  endDate: "2025-08-22",
  hoursCompleted: 8,
  totalHours: 160,
  instructor: "Dr. Sarah Johnson",
};

const mockMissingDocuments = [
  "Annual Influenza Vaccination",
  "Hepatitis B Immunity (Expired)",
  "Background Check Renewal",
];

const mockUpcomingSessions = [
  {
    id: 1,
    date: "2025-07-28",
    startTime: "07:00",
    endTime: "19:00",
    type: "Clinical",
    rotation: "Emergency Medicine",
    hospital: "St. Mary's Hospital"
  },
  {
    id: 2,
    date: "2025-07-29",
    startTime: "08:00",
    endTime: "17:00",
    type: "Clinical",
    rotation: "Emergency Medicine",
    hospital: "St. Mary's Hospital"
  },
  {
    id: 3,
    date: "2025-07-30",
    startTime: "07:00",
    endTime: "19:00",
    type: "Clinical",
    rotation: "Emergency Medicine",
    hospital: "St. Mary's Hospital"
  }
];

const ClinicalDashboard = () => {
  const [activeCard, setActiveCard] = useState(null);
  
  // Icons as SVG components
  const ActivityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );

  const AlertTriangleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  );

  const FileTextIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
  );

  // Calculate profile completion percentage
  const profileCompletion = Math.round(((3 - mockMissingDocuments.length) / 3) * 100);

  // Get next session
  const getNextSession = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `Tomorrow ${mockUpcomingSessions[0]?.startTime} AM`;
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  };

  const statCardStyle = (color, isActive) => ({
    ...cardStyle,
    background: isActive ? `linear-gradient(135deg, ${color.primary} 0%, ${color.secondary} 100%)` : '#ffffff',
    color: isActive ? 'white' : '#1f2937',
    transform: isActive ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isActive ? `0 8px 25px ${color.primary}30` : '0 2px 4px rgba(0,0,0,0.1)',
  });

  const colors = {
    blue: { primary: '#3b82f6', secondary: '#1d4ed8' },
    green: { primary: '#10b981', secondary: '#059669' },
    orange: { primary: '#f59e0b', secondary: '#d97706' },
    purple: { primary: '#8b5cf6', secondary: '#7c3aed' },
  };

  return (
    <>
      {/* Added style tag for mobile responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          .main-container {
            padding: 16px 10px !important;
            max-width: 100% !important;
          }
          .header-title {
            font-size: 28px !important;
          }
          .header-subtitle {
            font-size: 16px !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .stat-number {
            font-size: 36px !important;
          }
          .sections-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .progress-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .card-padding {
            padding: 16px !important;
          }
          .alert-padding {
            padding: 24px !important;
          }
        }
      `}</style>

      <div className="main-container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '32px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="header-title" style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#0f172a', 
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome back, {mockUserProfile.firstName}!
          </h1>
          <p className="header-subtitle" style={{ color: '#64748b', fontSize: '18px' }}>
            Here's an overview of your clinical rotation progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px', 
          marginBottom: '40px' 
        }}>
          {/* Current Rotations */}
          <div
            style={statCardStyle(colors.blue, activeCard === 'rotations')}
            onMouseEnter={() => setActiveCard('rotations')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ 
                  fontSize: '14px', 
                  opacity: activeCard === 'rotations' ? 0.9 : 0.6, 
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  Current Rotations
                </p>
                <p className="stat-number" style={{ fontSize: '48px', fontWeight: '700', lineHeight: 1 }}>1</p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: activeCard === 'rotations' ? 'rgba(255,255,255,0.2)' : '#eff6ff',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <ActivityIcon />
              </div>
            </div>
            <p style={{ 
              fontSize: '16px', 
              fontWeight: '500',
              opacity: activeCard === 'rotations' ? 0.9 : 0.7 
            }}>
              {mockCurrentRotation.title}
            </p>
          </div>

          {/* Completed Hours */}
          <div
            style={statCardStyle(colors.green, activeCard === 'hours')}
            onMouseEnter={() => setActiveCard('hours')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ 
                  fontSize: '14px', 
                  opacity: activeCard === 'hours' ? 0.9 : 0.6, 
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  Completed Hours
                </p>
                <p className="stat-number" style={{ fontSize: '48px', fontWeight: '700', lineHeight: 1 }}>{mockCurrentRotation.hoursCompleted}</p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: activeCard === 'hours' ? 'rgba(255,255,255,0.2)' : '#f0fdf4',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <ClockIcon />
              </div>
            </div>
            <p style={{ 
              fontSize: '16px', 
              fontWeight: '500',
              opacity: activeCard === 'hours' ? 0.9 : 0.7 
            }}>
              of {mockCurrentRotation.totalHours} total
            </p>
          </div>

          {/* Upcoming Sessions */}
          <div
            style={statCardStyle(colors.orange, activeCard === 'sessions')}
            onMouseEnter={() => setActiveCard('sessions')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ 
                  fontSize: '14px', 
                  opacity: activeCard === 'sessions' ? 0.9 : 0.6, 
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  Upcoming Sessions
                </p>
                <p className="stat-number" style={{ fontSize: '48px', fontWeight: '700', lineHeight: 1 }}>{mockUpcomingSessions.length}</p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: activeCard === 'sessions' ? 'rgba(255,255,255,0.2)' : '#fff7ed',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <CalendarIcon />
              </div>
            </div>
            <p style={{ 
              fontSize: '16px', 
              fontWeight: '500',
              opacity: activeCard === 'sessions' ? 0.9 : 0.7 
            }}>
              Next: {getNextSession()}
            </p>
          </div>

          {/* Profile Complete */}
          <div
            style={statCardStyle(colors.purple, activeCard === 'profile')}
            onMouseEnter={() => setActiveCard('profile')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ 
                  fontSize: '14px', 
                  opacity: activeCard === 'profile' ? 0.9 : 0.6, 
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600'
                }}>
                  Profile Complete
                </p>
                <p className="stat-number" style={{ fontSize: '48px', fontWeight: '700', lineHeight: 1 }}>{profileCompletion}%</p>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: activeCard === 'profile' ? 'rgba(255,255,255,0.2)' : '#faf5ff',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}>
                <CheckCircleIcon />
              </div>
            </div>
            <p style={{ 
              fontSize: '16px', 
              fontWeight: '500',
              opacity: activeCard === 'profile' ? 0.9 : 0.7,
              color: activeCard === 'profile' ? 'inherit' : '#dc2626'
            }}>
              {mockMissingDocuments.length} items missing
            </p>
          </div>
        </div>

        {/* Missing Documents Alert */}
        {mockMissingDocuments.length > 0 && (
          <div className="alert-padding" style={{
            ...cardStyle,
            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
            border: '1px solid #f59e0b',
            marginBottom: '40px',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ 
                padding: '8px', 
                backgroundColor: '#f59e0b', 
                borderRadius: '12px',
                color: 'white',
                flexShrink: 0
              }}>
                <AlertTriangleIcon />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#92400e', 
                  marginBottom: '8px' 
                }}>
                  Complete Your Profile
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#92400e', 
                  marginBottom: '16px' 
                }}>
                  You have {mockMissingDocuments.length} missing documents that need to be uploaded.
                </p>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '0 0 20px 0' 
                }}>
                  {mockMissingDocuments.map((doc, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      marginBottom: '8px',
                      color: '#92400e',
                      fontSize: '14px'
                    }}>
                      <span style={{ width: '6px', height: '6px', backgroundColor: '#f59e0b', borderRadius: '50%' }} />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#d97706';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(245,158,11,0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f59e0b';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Upload Documents
              </button>
            </div>
          </div>
        )}

        {/* Today's Rotations and Upcoming Sessions */}
        <div className="sections-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
          {/* Today's Rotations */}
          <div className="card-padding" style={cardStyle}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#0f172a', 
              marginBottom: '8px' 
            }}>
              Today's Rotations
            </h2>
            <p style={{ 
              color: '#64748b', 
              marginBottom: '24px',
              fontSize: '16px' 
            }}>
              Your clinical rotations scheduled for today
            </p>

            <div style={{
              padding: '24px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '2px dashed #cbd5e1'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: '600', 
                  color: '#0f172a', 
                  marginBottom: '8px' 
                }}>
                  {mockCurrentRotation.title}
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '16px',
                  marginBottom: '4px' 
                }}>
                  at {mockCurrentRotation.hospital}, {mockCurrentRotation.location}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    backgroundColor: '#15803d', 
                    borderRadius: '50%', 
                    marginRight: '8px' 
                  }} />
                  Currently Active
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="card-padding" style={cardStyle}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#0f172a', 
              marginBottom: '8px' 
            }}>
              Upcoming Sessions
            </h2>
            <p style={{ 
              color: '#64748b', 
              marginBottom: '24px',
              fontSize: '16px' 
            }}>
              Your upcoming clinical rotation sessions
            </p>

            {mockUpcomingSessions.length > 0 ? (
              <div style={{ space: '12px' }}>
                {mockUpcomingSessions.slice(0, 3).map((session, index) => (
                  <div
                    key={session.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: index === 0 ? '#f0f9ff' : '#f8fafc',
                      border: `1px solid ${index === 0 ? '#0ea5e9' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      marginBottom: '12px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div>
                      <p style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: '#0f172a',
                        marginBottom: '4px' 
                      }}>
                        {new Date(session.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#64748b' 
                      }}>
                        {session.startTime} - {session.endTime} • {session.type}
                      </p>
                    </div>
                    {index === 0 && (
                      <div style={{
                        backgroundColor: '#0ea5e9',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        Next
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#64748b',
                fontSize: '16px'
              }}>
                No upcoming sessions scheduled.
              </div>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="card-padding" style={cardStyle}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#0f172a', 
            marginBottom: '8px' 
          }}>
            Rotation Progress
          </h2>
          <p style={{ 
            color: '#64748b', 
            marginBottom: '24px',
            fontSize: '16px' 
          }}>
            Track your progress through current rotations
          </p>

          <div className="progress-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '32px' 
          }}>
            <div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#0f172a', 
                marginBottom: '16px' 
              }}>
                {mockCurrentRotation.title}
              </h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>Hours Completed</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                    {mockCurrentRotation.hoursCompleted} / {mockCurrentRotation.totalHours}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(mockCurrentRotation.hoursCompleted / mockCurrentRotation.totalHours) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
              
              <div style={{
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                  Current Instructor
                </p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>
                  {mockCurrentRotation.instructor}
                </p>
              </div>
            </div>

            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <h4 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '16px',
                color: 'white'
              }}>
                Rotation Details
              </h4>
              <div style={{ space: '12px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>
                    Duration
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: '500' }}>
                    {new Date(mockCurrentRotation.startDate).toLocaleDateString()} - {new Date(mockCurrentRotation.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>
                    Location
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: '500' }}>
                    {mockCurrentRotation.hospital}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>
                    Progress
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: '500' }}>
                    {Math.round((mockCurrentRotation.hoursCompleted / mockCurrentRotation.totalHours) * 100)}% Complete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicalDashboard;