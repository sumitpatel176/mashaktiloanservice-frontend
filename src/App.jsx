import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { LoanProvider } from './context/LoanContext';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
      <LoanProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
              </Routes>
          </Router>
      </LoanProvider>
  );
}

export default App;