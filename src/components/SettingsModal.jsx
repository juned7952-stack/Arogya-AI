import React, { useState } from 'react';
import { X, Key, Check, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, apiKey, setApiKey, lang }) {
  if (!isOpen) return null;

  const [tempKey, setTempKey] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(tempKey);
    localStorage.setItem('arogya_gemini_key', tempKey);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'hi' ? 'AI मॉडल सेटिंग्स' : 'Gemini AI Configuration'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'hi' 
              ? 'आरोग्यग्राम AI अपने इन-बिल्ट क्लिनिकल इंजन के साथ बिना इंटरनेट या बिना की के भी 100% काम करता है। यदि आप गूगल जेमिनी 2.0 लाइव मॉडल से कनेक्ट करना चाहते हैं तो अपनी API Key यहां दर्ज करें।' 
              : 'ArogyaGram AI functions 100% offline out-of-the-box using deterministic clinical rules. To enable live deep clinical reasoning via Google Gemini 2.0 Flash, paste your API key below.'}
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Google Gemini API Key (Optional)
            </label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm font-mono"
            />
          </div>

          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              {lang === 'hi'
                ? 'आपकी की केवल आपके ब्राउज़र में सुरक्षित रहेगी और कहीं स्टोर नहीं होती।'
                : 'Your key stays client-side in your local browser storage.'}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
            >
              <span>{lang === 'hi' ? 'मुफ्त API Key प्राप्त करें' : 'Get Free Gemini Key'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition flex items-center gap-1.5"
            >
              {saved ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              <span>{saved ? 'Saved!' : 'Save & Enable'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
