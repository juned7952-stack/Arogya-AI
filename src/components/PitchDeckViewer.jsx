import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle, 
  Users, 
  HeartPulse, 
  Cpu, 
  TrendingUp, 
  Globe, 
  Download,
  Copy,
  Check
} from 'lucide-react';
import { pitchDeckSlides } from '../data/medicalKnowledge';
import { translations } from '../data/translations';

export default function PitchDeckViewer({ lang, isHighContrast }) {
  const t = translations[lang];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const slide = pitchDeckSlides[currentSlideIndex];

  const getSlideIcon = (iconName) => {
    switch (iconName) {
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-amber-500" />;
      case 'Users': return <Users className="w-6 h-6 text-blue-500" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-emerald-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-purple-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-rose-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-teal-500" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-500" />;
    }
  };

  const oneLinePitch = "ArogyaGram AI is a voice-first, multilingual rural clinic assistant that empowers frontline healthcare workers and villagers to perform instant symptom triage, decode prescriptions, and access critical emergency guidance in regional languages.";

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(oneLinePitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-6 ${isHighContrast ? 'text-lg font-medium' : ''}`}>
      {/* Pitch Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Social Impact Hackathon 2026 Deliverable</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.pitchHeader}
          </h2>
          <p className="mt-2 text-purple-200 text-sm sm:text-base leading-relaxed">
            {t.pitchSubheader}
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* One-Line Pitch Callout Box */}
      <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
            Mandatory Item #2 — One-Line Project Description
          </span>
          <p className="text-sm sm:text-base font-bold text-slate-900 italic">
            "{oneLinePitch}"
          </p>
        </div>

        <button
          onClick={handleCopyPitch}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy 1-Liner'}</span>
        </button>
      </div>

      {/* Slide Carousel Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        {/* Slide Progress Indicator */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              Slide {currentSlideIndex + 1} of {pitchDeckSlides.length}
            </span>
            <div className="flex gap-1.5 ml-2">
              {pitchDeckSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentSlideIndex 
                      ? 'w-7 bg-purple-600' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <a
            href="https://drive.google.com/drive/folders/1HcfyQEYE4-UQNhydTYV-2gEbA00cbJ4D?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800"
          >
            <span>Official Google Drive Deck Template</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Slide Content Body */}
        <div className="p-6 sm:p-10 space-y-8 min-h-[380px] flex flex-col justify-between">
          <div>
            {/* Title & Icon */}
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100 shadow-2xs">
                {getSlideIcon(slide.icon)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {slide.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-purple-700">
                  {slide.subtitle}
                </p>
              </div>
            </div>

            {/* Slide Points Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {slide.points.map((pt, i) => (
                <div key={i} className="bg-slate-50 p-4.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 mb-1.5">
                      {pt.heading}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Highlight Footer */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200 flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-black text-purple-700">
                {slide.metric}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-md">
                {slide.metricLabel}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0}
                className="p-2 rounded-xl bg-white border border-slate-300 disabled:opacity-40 hover:bg-slate-50 transition shadow-2xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentSlideIndex(Math.min(pitchDeckSlides.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === pitchDeckSlides.length - 1}
                className="p-2 rounded-xl bg-purple-600 text-white disabled:opacity-40 hover:bg-purple-700 transition shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
