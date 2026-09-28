import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Roadmap from './pages/Roadmap';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <Sidebar />

        <div className="main-content">
          {/* Header */}
          <Navbar />

          {/* Dynamic Views */}
          <main className="page-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;