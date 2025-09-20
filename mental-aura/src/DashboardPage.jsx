import React, { useState } from 'react';

// CORRECTED import paths to match your folder name
import Sidebar from './Dashboardcomponents/Sidebar.jsx';
import Dashboard from './Dashboardcomponents/Dashboard';
import SOSModal from './Dashboardcomponents/SOSModal';

function DashboardPage() { 
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex h-screen bg-background text-text font-sans">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <Dashboard onOpenModal={openModal} />
      </main>
      <SOSModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default DashboardPage;