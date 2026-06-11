import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { LoanProvider } from './context/LoanContext';

function App() {
  return (
      <LoanProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
          </Router>
      </LoanProvider>
  );
}

export default App;