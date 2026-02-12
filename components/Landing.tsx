
import React from 'react';

interface LandingProps {
  onCheck: () => void;
}

const Landing: React.FC<LandingProps> = ({ onCheck }) => {
  return (
    <div className="flex-1 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-4">
        <span className="bg-green-100 text-safaricom-green text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-[0.2em]">
          Official Upgrade Portal
        </span>
        <h2 className="text-4xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
          Unlock Your True <br/>
          <span className="safaricom-green">M-Pesa Potential.</span>
        </h2>
        <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm">
          Register your account today to access automated Fuliza limit upgrades and credit scoring.
        </p>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-green-900/5 border border-gray-100 relative group overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-safaricom-green/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-safaricom-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>

          <h3 className="text-xl font-black text-gray-900">Mandatory Registration</h3>
          <p className="text-sm text-gray-500">To comply with CBK regulations, all users must create a verified account before accessing limit management tools.</p>

          <button
            onClick={onCheck}
            className="w-full py-5 rounded-2xl font-black text-lg text-white shadow-xl bg-safaricom-green hover:bg-[#3e9a41] shadow-green-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3"
          >
            Create My Account
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-6">
           <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i + 15}`} alt="User" />
                </div>
              ))}
           </div>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
             <span className="text-gray-900">Verified by 2M+ Users</span>
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-5 shadow-sm">
           <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
           </div>
           <div>
              <h4 className="font-bold text-gray-900 text-sm">Encrypted Storage</h4>
              <p className="text-xs text-gray-500 font-medium">Your personal data and ID are protected by end-to-end encryption.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
