import React, { useState, useEffect } from 'react';
import { X, Key, Check, Sparkles, ShieldCheck, ExternalLink, Activity, Database } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, apiKey, setApiKey, lang }) {
  if (!isOpen) return null;

  const [tempGeminiKey, setTempGeminiKey] = useState(apiKey || '');
  const [infermedicaAppId, setInfermedicaAppId] = useState('');
  const [infermedicaAppKey, setInfermedicaAppKey] = useState('');
  const [infermedicaUrl, setInfermedicaUrl] = useState('https://api.infermedica.com/v3');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setInfermedicaAppId(localStorage.getItem('arogya_infermedica_app_id') || '');
    setInfermedicaAppKey(localStorage.getItem('arogya_infermedica_app_key') || '');
    setInfermedicaUrl(localStorage.getItem('arogya_infermedica_url') || 'https://api.infermedica.com/v3');
  }, [isOpen]);

  const handleSave = () => {
    setApiKey(tempGeminiKey);
    localStorage.setItem('arogya_gemini_key', tempGeminiKey);
    localStorage.setItem('arogya_infermedica_app_id', infermedicaAppId.trim());
    localStorage.setItem('arogya_infermedica_app_key', infermedicaAppKey.trim());
    localStorage.setItem('arogya_infermedica_url', infermedicaUrl.trim());
    
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {lang === 'hi' ? 'क्लीनिकल व AI API सेटिंग्स' : 'Clinical & AI API Configuration'}
              </h3>
              <p className="text-xs text-slate-500">Infermedica & Google Gemini Integrations</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Infermedica Clinical API */}
        <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Infermedica Clinical Engine</span>
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
              Certified Medical API
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Infermedica Environment Endpoint
              </label>
              <select
                value={infermedicaUrl}
                onChange={(e) => setInfermedicaUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800"
              >
                <option value="https://api.infermedica.com/v3">Production (https://api.infermedica.com/v3)</option>
                <option value="https://api.dev.infermedica.com/v3">Development (https://api.dev.infermedica.com/v3)</option>
                <option value="https://api.infermedica.com/api/ct/v2">Conversational (https://api.infermedica.com/api/ct/v2)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">App-Id</label>
                <input
                  type="text"
                  value={infermedicaAppId}
                  onChange={(e) => setInfermedicaAppId(e.target.value)}
                  placeholder="e.g. 8a4c12..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">App-Key</label>
                <input
                  type="password"
                  value={infermedicaAppKey}
                  onChange={(e) => setInfermedicaAppKey(e.target.value)}
                  placeholder="e.g. 5f98a7..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Gemini API */}
        <div className="bg-purple-50/60 rounded-xl p-4 border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Google Gemini 2.0 Flash</span>
            </span>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
              Multilingual NLP & Vision
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={tempGeminiKey}
              onChange={(e) => setTempGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
            />
          </div>
        </div>

        {/* Security badge */}
        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 flex items-start gap-2 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p>
            {lang === 'hi'
              ? 'की केवल आपके स्थानीय ब्राउज़र में सुरक्षित रहेगी। यदि कोई की नहीं जोड़ी जाती है, तो इन-बिल्ट क्लिनिकल नियम इंजन हमेशा 100% काम करता है।'
              : 'Keys are stored client-side in your browser. If keys are omitted, the built-in clinical rule engine runs offline.'}
          </p>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-emerald-400" />}
            <span>{saved ? 'Saved Successfully!' : 'Save & Activate'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
