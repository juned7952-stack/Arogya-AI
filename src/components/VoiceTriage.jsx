import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  Send, 
  ArrowRight,
  ClipboardPlus,
  Loader2,
  HelpCircle
} from 'lucide-react';
import { translations } from '../data/translations';
import { analyzeSymptoms } from '../services/aiService';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../utils/speech';

export default function VoiceTriage({ lang, apiKey, onTransferToAsha, isHighContrast }) {
  const t = translations[lang];

  const [inputSymptoms, setInputSymptoms] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRecognizer, setSpeechRecognizer] = useState(null);

  // Initialize speech recognition
  useEffect(() => {
    const recognizer = createSpeechRecognizer(
      lang,
      (transcript) => {
        setInputSymptoms((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      },
      (error) => {
        console.error("Speech recognition error:", error);
        setIsListening(false);
      },
      () => setIsListening(false)
    );
    setSpeechRecognizer(recognizer);

    return () => {
      stopSpeaking();
      if (recognizer) {
        try { recognizer.abort(); } catch (e) {}
      }
    };
  }, [lang]);

  const toggleMic = () => {
    if (!speechRecognizer) {
      alert(lang === 'hi' ? "आपके ब्राउज़र में वॉइस रिकॉर्डिंग समर्थित नहीं है। कृपया लिखकर बताएं।" : "Speech recognition is not supported in this browser. Please type symptoms.");
      return;
    }

    if (isListening) {
      speechRecognizer.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognizer.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAnalyze = async (overrideText = null) => {
    const textToAnalyze = overrideText || inputSymptoms;
    if (!textToAnalyze || textToAnalyze.trim().length === 0) return;

    setIsLoading(true);
    stopSpeaking();
    setIsSpeaking(false);

    try {
      const data = await analyzeSymptoms(textToAnalyze, lang, apiKey);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCase = (text) => {
    setInputSymptoms(text);
    handleAnalyze(text);
  };

  const toggleSpeechOutput = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (result?.speechText) {
      setIsSpeaking(true);
      speakText(result.speechText, lang, () => setIsSpeaking(false));
    }
  };

  const getUrgencyColors = (urgency) => {
    switch (urgency) {
      case 'RED':
        return {
          bg: 'bg-red-50 border-red-300 text-red-900',
          badge: 'bg-red-600 text-white',
          icon: <AlertOctagon className="w-7 h-7 text-red-600 animate-bounce" />,
          label: t.urgencyRed
        };
      case 'YELLOW':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          badge: 'bg-amber-500 text-white',
          icon: <AlertTriangle className="w-7 h-7 text-amber-600" />,
          label: t.urgencyYellow
        };
      case 'GREEN':
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          icon: <CheckCircle2 className="w-7 h-7 text-emerald-600" />,
          label: t.urgencyGreen
        };
    }
  };

  return (
    <div className={`space-y-6 ${isHighContrast ? 'text-lg font-medium' : ''}`}>
      {/* Intro Box */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'hi' ? 'एआई ग्रामीण लक्षण जांच' : 'AI Frontline Triage Engine'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.triageHeader}
          </h2>
          <p className="mt-2 text-emerald-100 text-sm sm:text-base leading-relaxed">
            {t.triageSubheader}
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        {/* Voice & Text Input */}
        <div className="relative">
          <textarea
            value={inputSymptoms}
            onChange={(e) => setInputSymptoms(e.target.value)}
            placeholder={t.typePlaceholder}
            rows={3}
            className="w-full px-4 py-3.5 pr-14 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 placeholder-slate-400 resize-none text-base transition"
          />
          {/* Floating Mic Button */}
          <button
            onClick={toggleMic}
            className={`absolute right-3 top-3.5 p-2.5 rounded-xl transition shadow-sm ${
              isListening 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
            title={t.speakBtn}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>

        {/* Listening indicator */}
        {isListening && (
          <div className="flex items-center gap-2 text-red-600 text-sm font-semibold animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>{t.listening}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            onClick={() => handleAnalyze()}
            disabled={isLoading || !inputSymptoms.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold shadow-md shadow-emerald-600/20 transition active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{lang === 'hi' ? 'विश्लेषण किया जा रहा है...' : 'Analyzing Clinical Logic...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{t.checkUrgency}</span>
              </>
            )}
          </button>

          <span className="text-xs text-slate-400">
            {apiKey ? '⚡ Live Gemini 2.0 API' : '🔒 Offline Clinical Decision Tree'}
          </span>
        </div>

        {/* Quick Village Presets */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.quickExamplesLabel}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {t.quickCases.map((qc, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickCase(qc.text)}
                className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition font-medium text-left"
              >
                {qc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Triage Results Card */}
      {result && (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden transition-all duration-300">
          {/* Urgency Header Banner */}
          {(() => {
            const urgencyData = getUrgencyColors(result.urgency);
            return (
              <div className={`p-5 border-b ${urgencyData.bg} flex flex-wrap items-center justify-between gap-4`}>
                <div className="flex items-center gap-3.5">
                  {urgencyData.icon}
                  <div>
                    <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 ${urgencyData.badge}`}>
                      {result.urgency} SEVERITY
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {result.urgencyLabel || urgencyData.label}
                    </h3>
                  </div>
                </div>

                {/* Read Aloud Button */}
                <button
                  onClick={toggleSpeechOutput}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition active:scale-95 ${
                    isSpeaking 
                      ? 'bg-rose-600 text-white animate-pulse' 
                      : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-300'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>{t.stopAudio}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                      <span>{t.readAloud}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })()}

          {/* Detailed Observations & Actions */}
          <div className="p-6 space-y-6">
            {/* Clinical Observations */}
            {result.observations && result.observations.length > 0 && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  {t.keyObservations}
                </h4>
                <ul className="space-y-1.5">
                  {result.observations.map((obs, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-800 text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Steps */}
            {result.actions && result.actions.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
                  {t.actionPlan}
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {result.actions.map((act, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Red Flag Warning Signs */}
            {result.warningSigns && result.warningSigns.length > 0 && (
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 text-rose-900">
                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{t.warningSigns}</span>
                </h4>
                <ul className="space-y-1">
                  {result.warningSigns.map((ws, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-rose-900 font-medium">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{ws}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Escalation to ASHA Referral Slip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => onTransferToAsha({
                  symptoms: inputSymptoms,
                  urgency: result.urgency,
                  observations: result.observations?.join('; ')
                })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition shadow-sm"
              >
                <ClipboardPlus className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'यह विवरण आशा रेफरल पर्ची में भेजें' : 'Transfer Details to ASHA Referral Slip'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-slate-400 italic max-w-md">
                {t.disclaimer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
