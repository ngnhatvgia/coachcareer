import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp, AppProvider } from './context/AppContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { UserInfoForm } from './components/UserInfoForm';
import { HollandTest } from './components/HollandTest';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsDashboard } from './components/ResultsDashboard';
import { CareerSearch } from './components/CareerSearch';
import { Numerology } from './components/Numerology';
import { Zodiac } from './components/Zodiac';
import { Tarot } from './components/Tarot';
import { DailyMessage } from './components/DailyMessage';
import { EntertainmentHub } from './components/EntertainmentHub';
import { Navbar } from './components/Navbar';
import { CareerDetailView } from './components/CareerDetailView';
import { DiscoverySelection } from './components/DiscoverySelection';

const Home = () => {
  const { step } = useApp();
  
  // Render the appropriate component based on the current step
  if (step === 0) return <WelcomeScreen />;
  if (step === 1) return <UserInfoForm />;
  if (step === 2) return <DiscoverySelection />;
  if (step === 3) return <HollandTest />;
  if (step === 4) return <LoadingScreen />;
  if (step === 5) return <ResultsDashboard />;
  
  return <WelcomeScreen />;
};

const AppContent = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FAFAF9] font-sans text-stone-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/career" element={<CareerSearch />} />
            <Route path="/career/:id" element={<CareerDetailView />} />
            <Route path="/entertainment" element={<EntertainmentHub />} />
            <Route path="/zodiac" element={<Zodiac />} />
            <Route path="/numerology" element={<Numerology />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/daily" element={<DailyMessage />} />
            <Route path="/profile" element={<UserInfoForm isProfileMode={true} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
