
import React, { useState, useCallback } from 'react';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout';
import Success from './components/Success';
import { AppStep, Tier, UserData } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  const handleEligibilityCheck = useCallback((phoneNumber: string) => {
    // Simulate API call to fetch current Fuliza status
    setUserData({
      phoneNumber,
      currentLimit: 500,
      potentialLimit: 10000
    });
    setStep('dashboard');
  }, []);

  const handleSelectTier = useCallback((tier: Tier) => {
    setSelectedTier(tier);
    setStep('checkout');
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setStep('success');
  }, []);

  const handleReset = useCallback(() => {
    setStep('landing');
    setUserData(null);
    setSelectedTier(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-safaricom-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <h1 className="font-bold text-gray-900 tracking-tight">Fuliza <span className="text-[#47B04B]">Limit Plus</span></h1>
          </div>
          {step !== 'landing' && (
            <button 
              onClick={handleReset}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 uppercase tracking-widest"
            >
              Cancel
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-md mx-auto w-full px-4 py-6">
        {step === 'landing' && <Landing onCheck={handleEligibilityCheck} />}
        {step === 'dashboard' && userData && (
          <Dashboard 
            userData={userData} 
            onSelectTier={handleSelectTier} 
          />
        )}
        {step === 'checkout' && selectedTier && userData && (
          <Checkout 
            tier={selectedTier} 
            userData={userData}
            onSuccess={handlePaymentSuccess} 
          />
        )}
        {step === 'success' && selectedTier && (
          <Success 
            tier={selectedTier} 
            onRefresh={handleReset} 
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-md mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <span className="text-xs">Secure transaction via Safaricom M-Pesa</span>
          </div>
          <div className="flex gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-6 opacity-50 grayscale" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
