
import React, { useState } from 'react';
import { Tier, UserData } from '../types';

interface CheckoutProps {
  tier: Tier;
  userData: UserData;
  onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ tier, userData, onSuccess }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePay = () => {
    setIsRedirecting(true);
    // The user provided this specific payment link for M-Pesa integration
    const paymentUrl = "https://lipana.dev/pay/club-18";
    
    // Smooth transition to the external payment portal
    setTimeout(() => {
      window.location.href = paymentUrl;
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 text-center space-y-6 relative overflow-hidden">
        {!isRedirecting ? (
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
                Pay with M-Pesa
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="text-[10px] text-gray-400 font-medium px-2">
                You will be redirected to the secure <strong>Lipana.dev</strong> portal to complete your KES {tier.fee} payment.
              </p>
            </div>
          </>
        ) : (
          <div className="py-12 space-y-8">
            <div className="flex justify-center">
               <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-safaricom-green rounded-full border-t-transparent animate-spin"></div>
               </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">
                Securely Redirecting...
              </h3>
              <p className="text-gray-500 text-sm px-4">
                Opening the M-Pesa payment portal. Please wait a moment while we set up your transaction.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="space-y-1">
          <p className="text-xs font-bold text-blue-900 uppercase tracking-tighter">Security Information</p>
          <p className="text-xs text-blue-800 leading-relaxed">
            Payments are processed securely via <strong>Lipana.dev</strong>. Your transaction is protected by bank-level encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
