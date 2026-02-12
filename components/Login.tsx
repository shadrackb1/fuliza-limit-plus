
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (data: { phoneNumber: string }) => void;
  onSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignup }) => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10 || pin.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({ phoneNumber: phone });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-600">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Log in to your secure portal to access limit management tools.</p>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-gray-200 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">M-Pesa Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="07XX XXX XXX"
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-base font-bold focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-safaricom-green transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Secret PIN</label>
            <input
              type="password"
              required
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="4 Digits"
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-base font-bold focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-safaricom-green transition-all tracking-[0.5em]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-safaricom-green hover:bg-[#3e9a41] text-white rounded-2xl font-black text-lg shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {loading ? 'Authenticating...' : 'Log In Securely'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={onSignup} className="text-xs font-bold text-gray-400 hover:text-safaricom-green transition-colors">
            Don't have an account? <span className="safaricom-green underline">Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
