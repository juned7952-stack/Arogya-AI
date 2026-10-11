import React from 'react';
import { HeartPulse, Globe, PhoneCall, Sparkles, Wifi, ShieldAlert, Key } from 'lucide-react';
import { translations } from '../data/translations';

export default function Header({ 
  lang, 
  setLang, 
  onOpenSettings, 
  isHighContrast, 
  setIsHighContrast,
  hasApiKey 
}) {
  const t = translations[lang];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm transition-colors">
      {/* Top Emergency SOS Strip */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-4 py-1.5 text-xs sm:text-sm font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 animate-pulse text-amber-300" />
          <span>{lang === 'hi' ? 'ग्रामीण आपातकाल: तुरंत 108 / 102 पर कॉल करें' : 'Rural Emergency SOS: Call 108 / 102 Ambulance Free'}</span>
        </div>
        <a 
          href="tel:108" 
          className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm transition"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? 'डायल 108' : 'Dial 108'}</span>
        </a>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {t.appTitle}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                AI 2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Offline / Connectivity Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.offlineBadge}</span>
          </div>

          {/* High Contrast / Text Size Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              isHighContrast 
                ? 'bg-amber-100 border-amber-300 text-amber-900' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Toggle Large / High Contrast Text for Rural Accessibility"
          >
            A+ {lang === 'hi' ? 'बड़ा फॉन्ट' : 'High Contrast'}
          </button>

          {/* API Key / Cloud AI status */}
          <button
            onClick={onOpenSettings}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              hasApiKey 
                ? 'bg-purple-50 text-purple-700 border-purple-200' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">{hasApiKey ? 'Gemini Live' : 'AI Config'}</span>
          </button>

          {/* Vernacular Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition active:scale-95"
          >
            <Globe className="w-4 h-4" />
            <span>{t.languageToggle}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
