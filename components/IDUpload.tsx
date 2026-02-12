
import React, { useState, useRef } from 'react';

interface IDUploadProps {
  onComplete: (front: string, back: string) => void;
}

const IDUpload: React.FC<IDUploadProps> = ({ onComplete }) => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (side: 'front' | 'back', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (side === 'front') setFrontImage(reader.result as string);
      else setBackImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleVerify = () => {
    if (!frontImage || !backImage) return;
    setIsVerifying(true);
    // Simulate server-side OCR and verification
    setTimeout(() => {
      onComplete(frontImage, backImage);
      setIsVerifying(false);
    }, 3000);
  };

  return (
    <div className="flex-1 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-3">
        <div className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] inline-block">
          KYC Compliance Required
        </div>
        <h2 className="text-2xl font-black text-gray-900 leading-tight">Identity Verification</h2>
        <p className="text-gray-500 text-sm px-4">
          To protect your M-Pesa account, please upload clear photos of your National ID.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div 
          onClick={() => frontInputRef.current?.click()}
          className={`relative h-44 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
            frontImage ? 'border-safaricom-green bg-green-50' : 'border-gray-200 bg-white hover:border-safaricom-green/50'
          }`}
        >
          {frontImage ? (
            <img src={frontImage} className="w-full h-full object-cover" alt="ID Front" />
          ) : (
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">ID Card Front</p>
            </div>
          )}
          <input 
            type="file" 
            ref={frontInputRef} 
            className="hidden" 
            accept="image/*" 
            capture="environment"
            onChange={(e) => e.target.files?.[0] && handleFile('front', e.target.files[0])} 
          />
        </div>

        <div 
          onClick={() => backInputRef.current?.click()}
          className={`relative h-44 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
            backImage ? 'border-safaricom-green bg-green-50' : 'border-gray-200 bg-white hover:border-safaricom-green/50'
          }`}
        >
          {backImage ? (
            <img src={backImage} className="w-full h-full object-cover" alt="ID Back" />
          ) : (
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">ID Card Back</p>
            </div>
          )}
          <input 
            type="file" 
            ref={backInputRef} 
            className="hidden" 
            accept="image/*" 
            capture="environment"
            onChange={(e) => e.target.files?.[0] && handleFile('back', e.target.files[0])} 
          />
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleVerify}
          disabled={!frontImage || !backImage || isVerifying}
          className={`w-full py-5 rounded-2xl font-black text-white shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${
            !frontImage || !backImage || isVerifying ? 'bg-gray-200 cursor-not-allowed shadow-none' : 'bg-safaricom-green hover:bg-[#3e9a41] shadow-green-100'
          }`}
        >
          {isVerifying ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying Documents...
            </>
          ) : 'Submit for Verification'}
        </button>
        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-wider">
          <svg className="w-3 h-3 inline mr-1 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Encrypted & Secure PII Protection
        </p>
      </div>
    </div>
  );
};

export default IDUpload;
