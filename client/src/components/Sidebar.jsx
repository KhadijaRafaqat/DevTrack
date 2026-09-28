import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Map, CheckSquare } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        <h1 className="brand-title">
          <CheckSquare size={26} /> DevTrack
        </h1>
        <nav className="nav-menu">
          <Link to="/" className="nav-item">
            <LayoutDashboard size={20} color="#6366f1" /> Dashboard
          </Link>
          <Link to="/journal" className="nav-item">
            <BookOpen size={20} color="#10b981" /> Daily Journal
          </Link>
          <Link to="/roadmap" className="nav-item">
            <Map size={20} color="#a855f7" /> Agency Roadmap
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;