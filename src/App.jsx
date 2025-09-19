import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import AdminDashboard from "./Dashboards/AdminDashboard";
import StudentDashboard from "./Dashboards/studentDashboard";
import SchoolDashboard from "./Dashboards/schoolDashboard";
import HospitalDashboard from "./Dashboards/hospitalDashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";

function AppContent() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  const renderDashboard = () => {
    if (user.role === "admin") {
      return <AdminDashboard />;
    } else if (user.role === "student") {
      return <StudentDashboard />;
    } else if (user.role === "hospital") {
      return <HospitalDashboard />;
    } else if (user.role === "school") {
      return <SchoolDashboard />;
    } else {
      return <div>Unauthorized</div>;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={renderDashboard()} />
    </Routes>
  );
}

// ✅ Footer Component
function Footer() {
  return (
    <footer style={{ 
      textAlign: "center", 
      padding: "1rem", 
      background: "#f5f5f5", 
      marginTop: "auto" 
    }}>
      © {new Date().getFullYear()} Talent Bridge. All rights reserved.
    </footer>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          minHeight: "100vh" 
        }}>
          <AppContent />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
