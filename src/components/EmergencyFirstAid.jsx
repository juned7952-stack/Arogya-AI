import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sun, 
  Flame, 
  AlertOctagon, 
  Check, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { translations } from '../data/translations';
import { emergencyProtocols } from '../data/medicalKnowledge';
import { speakText, stopSpeaking } from '../utils/speech';

export default function EmergencyFirstAid({ lang, isHighContrast }) {
  const t = translations[lang];

  const [activeId, setActiveId] = useState('snakebite');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const protocol = emergencyProtocols.find(p => p.id === activeId) || emergencyProtocols[0];

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const title = lang === 'hi' ? protocol.title.hi : protocol.title.en;
      const dosList = (lang === 'hi' ? protocol.dos.hi : protocol.dos.en).join('. ');
      const dontsList = (lang === 'hi' ? protocol.donts.hi : protocol.donts.en).join('. ');
      const textToSpeak = `${title}. क्या करें: ${dosList}. क्या न करें: ${dontsList}`;
      speakText(textToSpeak, lang, () => setIsSpeaking(false));
    }
  };

  const getIcon = (id) => {
    switch(id) {
      case 'snakebite': return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'heatstroke': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'burns': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'infant_respiratory': return <AlertOctagon className="w-5 h-5 text-purple-600" />;
      default: return <ShieldAlert className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className={`space-y-6 ${isHighContrast ? 'text-lg font-medium' : ''}`}>
      {/* Intro Box */}
      <div className="bg-gradient-to-r from-red-600 to-rose-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'hi' ? 'ऑफलाइन आपातकालीन प्राथमिक उपचार' : 'Offline Life-Saving Protocols'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.firstAidHeader}
          </h2>
          <p className="mt-2 text-rose-100 text-sm sm:text-base leading-relaxed">
            {t.firstAidSubheader}
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Protocol Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {emergencyProtocols.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => {
                setActiveId(p.id);
                stopSpeaking();
                setIsSpeaking(false);
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                isActive
                  ? 'bg-red-50 border-red-400 text-red-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="p-2 rounded-xl bg-white border border-slate-200 flex-shrink-0 shadow-2xs">
                {getIcon(p.id)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs sm:text-sm font-bold truncate">
                  {lang === 'hi' ? p.title.hi : p.title.en}
                </p>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  p.urgency === 'RED' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {p.urgency}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Protocol Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Header with audio */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              {getIcon(protocol.id)}
            </div>
            <div>
              <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1 ${
                protocol.urgency === 'RED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {lang === 'hi' ? protocol.badge.hi : protocol.badge.en}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === 'hi' ? protocol.title.hi : protocol.title.en}
              </h3>
            </div>
          </div>

          <button
            onClick={toggleSpeech}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition active:scale-95 ${
              isSpeaking 
                ? 'bg-rose-600 text-white animate-pulse' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t.stopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t.readAloud}</span>
              </>
            )}
          </button>
        </div>

        {/* Dos and Don'ts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* DOs Card */}
          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200">
            <div className="flex items-center gap-2 mb-4 text-emerald-900 font-extrabold text-base">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span>{lang === 'hi' ? 'क्या करें (DOs) — जीवन रक्षक कदम' : 'DOs — Essential First Actions'}</span>
            </div>
            <ul className="space-y-3">
              {(lang === 'hi' ? protocol.dos.hi : protocol.dos.en).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DONTs Card */}
          <div className="bg-rose-50/70 rounded-2xl p-5 border border-rose-200">
            <div className="flex items-center gap-2 mb-4 text-rose-900 font-extrabold text-base">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
              <span>{lang === 'hi' ? 'क्या न करें (DON’Ts) — खतरनाक गलतियां' : 'DON’Ts — Harmful Myths & Errors'}</span>
            </div>
            <ul className="space-y-3">
              {(lang === 'hi' ? protocol.donts.hi : protocol.donts.en).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency Call Banner */}
        <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <p className="text-xs sm:text-sm font-semibold">
              {lang === 'hi' 
                ? 'यदि मरीज की स्थिति में सुधार न दिखे, तो तुरंत 108 पर कॉल करें' 
                : 'If symptoms persist or worsen, mobilize the 108 Emergency Ambulance immediately.'}
            </p>
          </div>
          <a
            href="tel:108"
            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm"
          >
            {lang === 'hi' ? '108 कॉल करें' : 'Call 108 Free'}
          </a>
        </div>
      </div>
    </div>
  );
}
