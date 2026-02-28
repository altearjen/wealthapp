import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const IconPortfolio = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const IconHoldings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);
const IconPerformance = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IconTransactions = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3h5v5M4 20 21 3"/><path d="M21 16v5h-5M15 15l6 6"/>
  </svg>
);
const IconMarkets = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);
const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const topNavItems = [
  { label: 'Overview', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Accounts', path: '/accounts' },
  { label: 'Research', path: '/research' },
  { label: 'Reports', path: '/reports' },
];

const sideNavItems = [
  { label: 'Portfolio', path: '/portfolio', icon: <IconPortfolio /> },
  { label: 'Holdings', path: '/holdings', icon: <IconHoldings /> },
  { label: 'Performance', path: '/performance', icon: <IconPerformance /> },
  { label: 'Transactions', path: '/transactions', icon: <IconTransactions />, badge: '3' },
  { label: 'Markets', path: '/markets', icon: <IconMarkets /> },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  // Determine which top-nav is active based on path
  const activeTop = topNavItems.find(item =>
    item.path === '/' ? activePath === '/' : activePath.startsWith(item.path)
  )?.path || '/';

  return (
    <div className="app-shell">
      {/* TOP NAV */}
      <nav className="top-nav">
        <div className="logo" onClick={() => navigate('/')}>
          <div className="logo-icon">W</div>
          WealthOS
        </div>
        <div className="top-nav-links">
          {topNavItems.map(item => (
            <div
              key={item.path}
              className={`top-nav-link${activeTop === item.path ? ' active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="top-nav-right">
          <div className="icon-btn"><IconSearch /></div>
          <div className="icon-btn"><IconBell /></div>
          <div className="avatar">AT</div>
        </div>
      </nav>

      <div className="main-body">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-section-label">Navigation</div>
          {sideNavItems.map(item => (
            <div
              key={item.path}
              className={`sidebar-link${activePath === item.path ? ' active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {item.label}
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </div>
          ))}
          <div className="sidebar-spacer" />
          <div className="sidebar-bottom">
            <div className="sidebar-link">
              <IconSettings />
              Settings
            </div>
          </div>
        </aside>

        {/* PAGE CONTENT */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
