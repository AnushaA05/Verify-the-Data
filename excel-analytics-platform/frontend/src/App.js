// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UploadAnalyze from "./pages/UploadAnalyze";
import Logout from './pages/Logout';
import Landing from './pages/Landing';
import { UserProvider } from "./context/UserContext";
import UploadHistory from "./components/UploadHistory"; // ✅

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <UserProvider> {/* ✅ Wrap with context */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/dashboard" element={<Layout><UserDashboard /></Layout>} />
          <Route path="/logout" element={<Layout><Logout /></Layout>} />
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/upload-analyze" element={<Layout><UploadAnalyze /></Layout>} />
          <Route path="/upload-history" element={<Layout><UploadHistory /></Layout>} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;




