import React from 'react';
import { useJoinerApp, JoinerAppProvider } from './JoinerAppContext';
import { MobileSplashScreen } from './screens/MobileSplashScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { MyHotelsScreen } from './screens/MyHotelsScreen';
import { AddHotelScreen } from './screens/AddHotelScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { CartScreen } from './screens/CartScreen';
import { MyOrdersScreen } from './screens/MyOrdersScreen';
import { ReorderScreen } from './screens/ReorderScreen';
import { OrderSuccessScreen } from './screens/OrderSuccessScreen';
import { CommissionScreen } from './screens/CommissionScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AppUpdateModal } from './components/AppUpdateModal';
import { GlobalNotificationToast } from './components/GlobalNotificationToast';

const MobileScreenRouter: React.FC = () => {
  const { currentScreen, userProfile } = useJoinerApp();

  // Strict route protection: unauthenticated users cannot view dashboard or private screens
  if (!userProfile.uid && currentScreen !== 'SPLASH' && currentScreen !== 'WELCOME' && currentScreen !== 'LOGIN' && currentScreen !== 'REGISTER') {
    return <LoginScreen />;
  }

  switch (currentScreen) {
    case 'SPLASH':
      return <MobileSplashScreen />;
    case 'WELCOME':
      return <WelcomeScreen />;
    case 'LOGIN':
      return <LoginScreen />;
    case 'REGISTER':
      return <RegisterScreen />;
    case 'DASHBOARD':
      return <DashboardScreen />;
    case 'MY_HOTELS':
      return <MyHotelsScreen />;
    case 'ADD_HOTEL':
      return <AddHotelScreen />;
    case 'PLACE_ORDER':
      return <PlaceOrderScreen />;
    case 'CART':
      return <CartScreen />;
    case 'MY_ORDERS':
      return <MyOrdersScreen />;
    case 'REORDER':
      return <ReorderScreen />;
    case 'ORDER_SUCCESS':
      return <OrderSuccessScreen />;
    case 'COMMISSION':
      return <CommissionScreen />;
    case 'NOTIFICATIONS':
      return <NotificationsScreen />;
    case 'PROFILE':
      return <ProfileScreen />;
    default:
      return userProfile.uid ? <DashboardScreen /> : <LoginScreen />;
  }
};

export const StandaloneMobileApp: React.FC = () => {
  return (
    <JoinerAppProvider>
      <div className="h-screen w-screen overflow-hidden bg-slate-50 flex flex-col select-none max-w-md mx-auto shadow-2xl relative">
        <GlobalNotificationToast />
        <MobileScreenRouter />
        <AppUpdateModal />
      </div>
    </JoinerAppProvider>
  );
};
