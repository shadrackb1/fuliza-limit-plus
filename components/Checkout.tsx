
import React, { useState, useEffect } from 'react';
import { Tier, UserData } from '../types';

interface CheckoutProps {
  tier: Tier;
  userData: UserData;
  onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ tier, userData, onSuccess }) => {
  const [status, setStatus] = useState<'review' | 'processing' | 'verifying'>('review');
  const [progress, setProgress] = useState(0);

  const handlePay = () => {
    setStatus('processing');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('verifying');
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    }, 150);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 text-center space-y-6 relative overflow-hidden">
        {status === 'review' ? (
          <>
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900">Confirm Upgrade</h2>
              <p className="text-gray-500 text-sm">Review your upgrade details before proceeding to payment.</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6 space-y-4 text-left border border-gray-100">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-500 text-sm">Upgrade Tier</span>
                <span className="font-bold text-gray-900">{tier.name} Plan</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-500 text-sm">New Limit</span>
                <span className="font-bold text-[#47B04B]">KES {tier.newLimit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Upgrade Fee</span>
                <span className="text-xl font-black text-gray-900">KES {tier.fee}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handlePay}
                className="w-full py-5 bg-safaricom-green hover:bg-[#3e9a41] text-white rounded-2xl font-bold shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Trigger STK Push
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="text-[10px] text-gray-400 font-medium">
                Clicking the button will send an M-Pesa prompt to <strong>{userData.phoneNumber}</strong>.
              </p>
            </div>
          </>
        ) : (
          <div className="py-12 space-y-8">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={377}
                  strokeDashoffset={377 - (377 * progress) / 100}
                  className="text-safaricom-green transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black text-gray-900">{progress}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">
                {status === 'processing' ? 'Awaiting M-Pesa Prompt' : 'Verifying Payment...'}
              </h3>
              <p className="text-gray-500 text-sm px-4">
                {status === 'processing' 
                  ? 'Check your phone and enter your M-Pesa PIN to authorize the transaction.' 
                  : 'We are confirming your payment with Safaricom servers. Almost there!'}
              </p>
            </div>

            <div className="flex justify-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-safaricom-green animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-2xl flex items-start gap-3">
        <svg className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-xs text-yellow-800 leading-relaxed">
          <strong>Important:</strong> Do not close this browser window or disconnect your internet until the transaction is fully verified.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
