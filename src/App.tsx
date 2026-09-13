import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { ZonesPage } from './pages/ZonesPage';
import { JoinersPage } from './pages/JoinersPage';
import { HotelsPage } from './pages/HotelsPage';
import { OrdersPage } from './pages/OrdersPage';
import { DriversPage } from './pages/DriversPage';
import { InventoryPage } from './pages/InventoryPage';
import { CommissionPage } from './pages/CommissionPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AddHotelModal } from './components/Modals/AddHotelModal';
import { AddJoinerModal } from './components/Modals/AddJoinerModal';
import { AddZoneModal } from './components/Modals/AddZoneModal';
import { OrderDetailModal } from './components/Modals/OrderDetailModal';
import { NotificationsDrawer } from './components/Modals/NotificationsDrawer';
import { AdminProfileModal } from './components/AdminProfileModal';
import { AdminProfilePage } from './pages/AdminProfilePage';
import { JoinerMobileAppManagementPage } from './pages/JoinerMobileAppManagementPage';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderTab = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Joiner Mobile App':
      case 'Joiner App Management':
      case 'Mobile App':
        return <JoinerMobileAppManagementPage />;
      case 'Zones':
        return <ZonesPage />;
      case 'Joiners':
      case 'Hotel Joiners':
        return <JoinersPage />;
      case 'Hotels':
        return <HotelsPage />;
      case 'Orders':
        return <OrdersPage />;
      case 'Drivers':
      case 'Delivery Drivers':
        return <DriversPage />;
      case 'Inventory':
      case 'Products / Inventory':
        return <InventoryPage />;
      case 'Commission':
      case 'Joiner Commission':
        return <CommissionPage />;
      case 'Payments':
        return <PaymentsPage />;
      case 'Reports':
        return <ReportsPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Profile':
      case 'Admin Profile':
      case 'My Profile':
        return <AdminProfilePage />;
      case 'Notifications':
        return <NotificationsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100/70 flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header />
        <main className="flex-1 pb-12 overflow-y-auto">
          {renderTab()}
        </main>
      </div>

      {/* Interactive Modals */}
      <AddHotelModal />
      <AddJoinerModal />
      <AddZoneModal />
      <OrderDetailModal />
      <NotificationsDrawer />
      <AdminProfileModal />
    </div>
  );
};

import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { StandaloneMobileApp } from './mobileApp/StandaloneMobileApp';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const isMobileMode =
    typeof window !== 'undefined' &&
    (Capacitor.isNativePlatform() ||
      window.location.search.includes('mode=mobile') ||
      window.location.search.includes('app=joiner') ||
      navigator.userAgent.includes('FarmerBox'));

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {isMobileMode ? (
        <StandaloneMobileApp />
      ) : (
        <AppProvider>
          <MainContent />
        </AppProvider>
      )}
    </>
  );
}
