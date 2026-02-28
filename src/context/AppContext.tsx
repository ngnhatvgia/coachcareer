import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserProfile, AIAnalysisResult } from '../services/ai';

interface AppState {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  view: 'wizard' | 'search' | 'numerology' | 'zodiac' | 'tarot';
  setView: (view: 'wizard' | 'search' | 'numerology' | 'zodiac' | 'tarot') => void;
  userProfile: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  analysisResult: AIAnalysisResult | null;
  setAnalysisResult: (result: AIAnalysisResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0); // 0: Welcome, 1: Info, 2: Test, 3: Loading, 4: Result
  const [view, setView] = useState<'wizard' | 'search' | 'numerology' | 'zodiac' | 'tarot'>('wizard');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {};
  });
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <AppContext.Provider
      value={{
        step,
        setStep,
        nextStep,
        view,
        setView,
        userProfile,
        updateUserProfile,
        analysisResult,
        setAnalysisResult,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
