import React from 'react';
import { CustomerAppProvider, useCustomerApp } from './CustomerAppContext';
import { CustomerBottomNav } from './components/CustomerBottomNav';
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen1 } from './screens/OnboardingScreen1';
import { OnboardingScreen2 } from './screens/OnboardingScreen2';
import { OnboardingScreen3 } from './screens/OnboardingScreen3';
import { LoginSignUpScreen } from './screens/LoginSignUpScreen';
import { OtpVerifyScreen } from './screens/OtpVerifyScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { ProductListingScreen } from './screens/ProductListingScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { SearchScreen } from './screens/SearchScreen';
import { CartScreen } from './screens/CartScreen';
import { AddressScreen } from './screens/AddressScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { OrderSuccessScreen } from './screens/OrderSuccessScreen';
import { MyOrdersScreen } from './screens/MyOrdersScreen';
import { WishlistScreen } from './screens/WishlistScreen';
import { WalletScreen } from './screens/WalletScreen';
import { OffersScreen } from './screens/OffersScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { HelpSupportScreen } from './screens/HelpSupportScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Wifi, Battery, Signal } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

const ScreenRouter: React.FC = () => {
  const { currentScreen } = useCustomerApp();

  const normalized = (currentScreen || 'home')
    .toLowerCase()
    .replace(/_/g, '-');

  // Normalize specific aliases
  const getScreenKey = (key: string): string => {
    if (key === 'login' || key === 'login-signup') return 'login-signup';
    if (key === 'otp' || key === 'otp-verify') return 'otp-verify';
    if (key === 'address' || key === 'address-selection') return 'address-selection';
    if (key === 'payment' || key === 'payment-method') return 'payment-method';
    if (key === 'orders' || key === 'my-orders') return 'my-orders';
    return key;
  };

  const activeKey = getScreenKey(normalized);

  // Screens that show the bottom navigation bar
  const showBottomNav = [
    'home',
    'categories',
    'product-listing',
    'cart',
    'wishlist',
    'profile',
    'offers'
  ].includes(activeKey);

  const renderScreen = () => {
    switch (activeKey) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding-1':
        return <OnboardingScreen1 />;
      case 'onboarding-2':
        return <OnboardingScreen2 />;
      case 'onboarding-3':
        return <OnboardingScreen3 />;
      case 'login-signup':
        return <LoginSignUpScreen />;
      case 'otp-verify':
        return <OtpVerifyScreen />;
      case 'home':
        return <HomeScreen />;
      case 'categories':
        return <CategoriesScreen />;
      case 'product-listing':
        return <ProductListingScreen />;
      case 'product-detail':
        return <ProductDetailScreen />;
      case 'search':
        return <SearchScreen />;
      case 'cart':
        return <CartScreen />;
      case 'address-selection':
        return <AddressScreen />;
      case 'payment-method':
        return <PaymentScreen />;
      case 'order-success':
        return <OrderSuccessScreen />;
      case 'my-orders':
        return <MyOrdersScreen />;
      case 'wishlist':
        return <WishlistScreen />;
      case 'wallet':
        return <WalletScreen />;
      case 'offers':
        return <OffersScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'help-support':
        return <HelpSupportScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const hasGreenHeader = [
    'home',
    'categories',
    'product-listing',
    'address-selection',
    'my-orders',
    'order-success',
    'profile',
    'offers',
    'wishlist',
    'notifications',
    'help-support',
    'settings',
    'wallet'
  ].includes(activeKey);

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-50 overflow-hidden font-sans select-none">
      {/* Phone Status Bar (Immersive Safe Area Overlay) */}
      <div
        className="absolute top-0 left-0 right-0 h-9 z-40 flex items-center justify-between px-6 select-none text-[11px] font-bold pointer-events-none transition-colors duration-500 text-slate-800"
      >
        <span className="tracking-tight font-extrabold">9:41</span>
        <div className="flex items-center gap-1.5 opacity-90">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Screen Content - Fills 100% full height to the very top edge */}
      <div className="flex-1 overflow-hidden flex flex-col relative w-full h-full">
        {renderScreen()}
      </div>

      {/* Persistent Bottom Nav Bar */}
      {showBottomNav && <CustomerBottomNav />}
    </div>
  );
};

export const CustomerMobileApp: React.FC<{ isEmbedded?: boolean; initialScreen?: string }> = ({ 
  isEmbedded = false,
  initialScreen = 'home' 
}) => {
  const isRealMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || Capacitor.isNativePlatform());

  if (isEmbedded || isRealMobile) {
    return (
      <CustomerAppProvider initialScreen={initialScreen as any}>
        <div className="w-full h-full min-h-screen bg-slate-50 flex flex-col">
          <ScreenRouter />
        </div>
      </CustomerAppProvider>
    );
  }

  return (
    <CustomerAppProvider initialScreen={initialScreen as any}>
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-[390px] h-[844px] bg-white rounded-[44px] shadow-2xl overflow-hidden border-[10px] border-slate-800 relative flex flex-col">
          {/* Dynamic Island / Notch centered inside status bar */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-40 flex items-center justify-end px-2 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700"></div>
          </div>
          
          <ScreenRouter />
        </div>
      </div>
    </CustomerAppProvider>
  );
};

export default CustomerMobileApp;
