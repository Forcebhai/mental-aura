import React from 'react';
const Sidebar = () => {
  // Simple icon components for clarity
  const DashboardIcon = () => <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />;
  const JournalIcon = () => <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />;
  const GoalsIcon = () => <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />;
  const ResourcesIcon = () => <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />;

  const NavLink = ({ icon, text, active = false }) => (
    <a href="#" className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${active ? 'text-primary bg-blue-50' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>
      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">{icon}</svg>
      {text}
    </a>
  );

  return (
    <aside className="w-64 bg-surface border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary">Aura</h1>
        <p className="text-sm text-gray-600">Mental Health Dashboard</p>
      </div>
      <nav className="space-y-2">
        <NavLink icon={<DashboardIcon />} text="Dashboard" active />
        <NavLink icon={<JournalIcon />} text="Journal" />
        <NavLink icon={<GoalsIcon />} text="Goals" />
        <NavLink icon={<ResourcesIcon />} text="Resources" />
      </nav>
    </aside>
  );
};

export default Sidebar;