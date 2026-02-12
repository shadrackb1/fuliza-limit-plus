
import React, { useState } from 'react';

interface LimitInputProps {
  onSubmit: (limit: number) => void;
}

const LimitInput: React.FC<LimitInputProps> = ({ onSubmit }) => {
  const [limit, setLimit] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numLimit = parseInt(limit);
    if (isNaN(numLimit) || numLimit < 0) return;
    
    setLoading(true);
    setTimeout(() => {
      onSubmit(numLimit);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col justify-center gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-full mb-2">
          <svg className="w-6 h-6 text-[#47B04B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
          What is your current <br/>
          <span className="safaricom-green">Fuliza Limit?</span>
        </h2>
        <p className="text-gray-500 text-sm">
          We use this to calculate your maximum potential upgrade based on your credit profile.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Current Limit (KES)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">KES</span>
              <input
                type="number"
                placeholder="e.g. 500"
                required
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#47B04B] focus:border-transparent transition-all"
              />
            </div>
            <p className="text-[10px] text-gray-400 ml-1 italic">Check this on your phone via *234# > Fuliza M-Pesa</p>
          </div>

          <button
            type="submit"
            disabled={!limit || loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-green-200 transition-all transform active:scale-[0.98] ${
              loading || !limit ? 'bg-gray-300 cursor-not-allowed' : 'bg-safaricom-green hover:bg-[#3e9a41]'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating Potential...
              </div>
            ) : 'Analyze Upgrade Potential'}
          </button>
        </form>
      </div>

      <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-4 border border-green-100">
        <div className="bg-white p-2 rounded-xl shadow-sm text-xs font-bold text-green-700">TIP</div>
        <p className="text-xs text-green-800 leading-tight">
          Users with consistent M-Pesa transactions qualify for <strong>10x limit upgrades</strong>.
        </p>
      </div>
    </div>
  );
};

export default LimitInput;
