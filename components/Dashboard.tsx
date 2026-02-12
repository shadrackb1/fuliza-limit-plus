
import React, { useEffect, useState } from 'react';
import { UserData, Tier, TIERS } from '../types';
import { GoogleGenAI } from '@google/genai';

interface DashboardProps {
  userData: UserData;
  onSelectTier: (tier: Tier) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, onSelectTier }) => {
  const [aiTip, setAiTip] = useState<string>('');

  useEffect(() => {
    const fetchAiAdvice = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `The user has a current Fuliza limit of KES ${userData.currentLimit} and wants to upgrade. 
          Give a short, professional 1-sentence financial tip for improving credit score on M-Pesa specifically about why moving to a higher limit is good.`,
        });
        setAiTip(response.text || 'Consistently paying your Fuliza on time increases your eligibility for higher limits.');
      } catch (err) {
        setAiTip('Regular M-Pesa transactions and timely loan repayments are key to a high credit score.');
      }
    };
    fetchAiAdvice();
  }, [userData]);

  // Filter tiers to only show those that are actually an upgrade
  const availableTiers = TIERS.filter(t => t.newLimit > userData.currentLimit);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-safaricom-green rounded-3xl p-6 text-white shadow-xl shadow-green-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="relative z-10 space-y-1">
          <p className="text-green-100 text-[10px] font-bold uppercase tracking-widest">Eligibility Analysis</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight">KES {userData.potentialLimit.toLocaleString()}</span>
            <span className="text-green-200 text-sm font-medium">Max Upgrade</span>
          </div>
          <div className="pt-4 flex items-center justify-between">
            <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
              Current: KES {userData.currentLimit.toLocaleString()}
            </div>
            <div className="text-[10px] flex items-center gap-1 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Profile Verified
            </div>
          </div>
        </div>
      </div>

      {aiTip && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3">
          <div className="bg-blue-100 p-2 rounded-xl shrink-0 h-fit">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
            </svg>
          </div>
          <p className="text-sm text-blue-800 leading-relaxed italic">
            "{aiTip}"
          </p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 ml-1">Available Upgrades</h3>
        {availableTiers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {availableTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => onSelectTier(tier)}
                className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`${tier.color} w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl border`}>
                    {tier.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{tier.name} Upgrade</span>
                      <span className="bg-gray-100 text-[10px] font-bold text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        {tier.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">New Limit: KES {tier.newLimit.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Fee</p>
                  <p className="text-lg font-bold text-gray-900">KES {tier.fee}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">No higher tiers available for your current limit.</p>
            <p className="text-xs text-gray-400 mt-2">Try increasing your transaction volume to qualify for higher levels.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
