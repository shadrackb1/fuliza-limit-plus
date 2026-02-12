
import React, { useEffect, useState } from 'react';
import { Tier } from '../types';
import Confetti from 'canvas-confetti';

interface SuccessProps {
  tier: Tier;
  onRefresh: () => void;
}

const Success: React.FC<SuccessProps> = ({ tier, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    Confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#47B04B', '#ffffff', '#22c55e']
    });
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      onRefresh();
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
          <svg className="w-12 h-12 text-[#47B04B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-safaricom-green rounded-full flex items-center justify-center border-4 border-white">
           <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
             <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
           </svg>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Upgrade Successful!</h2>
        <p className="text-gray-500 max-w-[280px] mx-auto text-lg leading-snug">
          Your Fuliza limit has been upgraded to <span className="text-[#47B04B] font-bold">KES {tier.newLimit.toLocaleString()}</span>.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-green-100/30 w-full max-w-xs space-y-4">
        <div className="space-y-1 text-left">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Receipt Details</p>
           <div className="flex justify-between text-sm py-2 border-b border-gray-50">
             <span className="text-gray-500">Transaction ID</span>
             <span className="font-mono font-bold">SBR45{Math.random().toString(36).substring(7).toUpperCase()}</span>
           </div>
           <div className="flex justify-between text-sm py-2">
             <span className="text-gray-500">Amount Paid</span>
             <span className="font-bold">KES {tier.fee}</span>
           </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
            isRefreshing ? 'bg-gray-300' : 'bg-safaricom-green hover:bg-[#3e9a41] shadow-lg shadow-green-100'
          }`}
        >
          {isRefreshing ? (
             <>
               <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Refreshing...
             </>
          ) : 'Refresh Fuliza Limit'}
        </button>
      </div>

      <p className="text-xs text-gray-400 max-w-[240px]">
        It may take up to 2 minutes for the new limit to reflect on your M-Pesa *234# menu.
      </p>
    </div>
  );
};

export default Success;
