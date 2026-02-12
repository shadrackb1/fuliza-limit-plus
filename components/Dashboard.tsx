
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
          contents: `Provide a short 10-word financial tip about M-Pesa Fuliza limits for a user with KES ${userData.currentLimit} limit. Make it sound professional and encouraging.`,
        });
        setAiTip(response.text || 'Timely Fuliza repayments guarantee continuous limit growth and financial health.');
      } catch (err) {
        setAiTip('Pay your Fuliza on time to boost your credit score.');
      }
    };
    fetchAiAdvice();
  }, [userData]);

  const availableTiers = TIERS.filter(t => t.newLimit > userData.currentLimit);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-600">
      <div className="bg-white p-1 rounded-[32px] shadow-2xl shadow-gray-200">
        <div className="bg-safaricom-green rounded-[30px] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Credit Score Analysis</p>
                <h3 className="text-3xl font-extrabold tracking-tight">Level {Math.ceil(userData.currentLimit / 1000) + 1}</h3>
              </div>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/20">
                Verified Profile
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-black/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold text-green-100 uppercase tracking-tighter mb-1">Current Limit</p>
                  <p className="text-xl font-black">KES {userData.currentLimit.toLocaleString()}</p>
               </div>
               <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold text-green-100 uppercase tracking-tighter mb-1">Max Potential</p>
                  <p className="text-xl font-black">KES {userData.potentialLimit.toLocaleString()}</p>
               </div>
            </div>

            <div className="pt-2">
               <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white shimmer transition-all duration-1000" 
                    style={{ width: `${Math.min((userData.currentLimit / userData.potentialLimit) * 100, 100)}%` }}
                  ></div>
               </div>
               <p className="text-[9px] text-green-100 mt-2 font-bold uppercase text-center tracking-widest">
                 System indicates growth headroom available
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Select Upgrade Path</h3>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-tighter">
            Instant Disbursement
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {availableTiers.length > 0 ? (
            availableTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => onSelectTier(tier)}
                className="flex items-center justify-between p-6 bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-safaricom-green/30 hover:-translate-y-1 transition-all active:scale-[0.98] group text-left"
              >
                <div className="flex items-center gap-5">
                  <div className={`${tier.color} w-16 h-16 rounded-[20px] flex items-center justify-center font-black text-2xl border-2 shadow-inner group-hover:scale-110 transition-transform`}>
                    {tier.name[0]}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-gray-900">{tier.name}</span>
                      <span className="bg-gray-50 text-[9px] font-black text-gray-400 px-2 py-0.5 rounded uppercase tracking-tighter border">
                        {tier.badge}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-safaricom-green">KES {tier.newLimit.toLocaleString()} Limit</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter mb-0.5">Admin Fee</p>
                  <p className="text-xl font-black text-gray-900">KES {tier.fee}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
               <p className="text-gray-400 font-bold">No higher tiers available at this time.</p>
               <p className="text-xs text-gray-400 mt-2">Increase your M-Pesa usage to qualify for the Platinum tier.</p>
            </div>
          )}
        </div>
      </div>

      {aiTip && (
        <div className="bg-gray-900 text-white p-6 rounded-[28px] relative overflow-hidden shadow-xl shadow-gray-200">
           <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full -mb-12 -mr-12 blur-2xl"></div>
           <div className="relative z-10 flex gap-4 items-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
                </svg>
              </div>
              <p className="text-sm font-medium leading-relaxed italic text-blue-100">
                "{aiTip}"
              </p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
