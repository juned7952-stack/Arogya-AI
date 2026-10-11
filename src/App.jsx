import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Pill, 
  ClipboardCheck, 
  ShieldAlert, 
  Presentation, 
  Heart,
  HeartPulse,
  ExternalLink
} from 'lucide-react';

import Header from './components/Header';
import VoiceTriage from './components/VoiceTriage';
import MedicineDecoder from './components/MedicineDecoder';
import AshaReferralSlip from './components/AshaReferralSlip';
import EmergencyFirstAid from './components/EmergencyFirstAid';
import PitchDeckViewer from './components/PitchDeckViewer';
import SettingsModal from './components/SettingsModal';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('hi'); // Default to Hindi for rural empathy, switchable to English
  const [activeTab, setActiveTab] = useState('triage');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [transferredTriageData, setTransferredTriageData] = useState(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('arogya_gemini_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const t = translations[lang];

  const handleTransferToAsha = (data) => {
    setTransferredTriageData(data);
    setActiveTab('asha');
  };

  const navTabs = [
    { id: 'triage', label: t.tabTriage, icon: Stethoscope, badge: 'Voice/AI' },
    { id: 'medicine', label: t.tabMedicine, icon: Pill, badge: 'OCR Vision' },
    { id: 'asha', label: t.tabAsha, icon: ClipboardCheck, badge: 'Digital Token' },
    { id: 'firstaid', label: t.tabFirstAid, icon: ShieldAlert, badge: 'Offline' },
    { id: 'pitch', label: t.tabPitch, icon: Presentation, badge: 'Hackathon' },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 transition-colors ${isHighContrast ? 'contrast-125' : ''}`}>
      {/* Header */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        hasApiKey={!!apiKey}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex overflow-x-auto scrollbar-none gap-1 sm:gap-2">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[130px] sm:min-w-[150px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all relative ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
                {tab.badge && (
                  <span className={`hidden xl:inline text-[10px] font-semibold px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-emerald-700/80 text-emerald-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-300">
          {activeTab === 'triage' && (
            <VoiceTriage
              lang={lang}
              apiKey={apiKey}
              onTransferToAsha={handleTransferToAsha}
              isHighContrast={isHighContrast}
            />
          )}

          {activeTab === 'medicine' && (
            <MedicineDecoder
              lang={lang}
              isHighContrast={isHighContrast}
            />
          )}

          {activeTab === 'asha' && (
            <AshaReferralSlip
              lang={lang}
              transferredData={transferredTriageData}
              isHighContrast={isHighContrast}
            />
          )}

          {activeTab === 'firstaid' && (
            <EmergencyFirstAid
              lang={lang}
              isHighContrast={isHighContrast}
            />
          )}

          {activeTab === 'pitch' && (
            <PitchDeckViewer
              lang={lang}
              isHighContrast={isHighContrast}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-800">ArogyaGram AI</span>
            <span>•</span>
            <span>Social Impact Hackathon 2026 (Healthcare & Wellbeing)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span>Voice-first Vernacular Delivery</span>
            <span>•</span>
            <span>Works 100% Offline (2G/3G Ready)</span>
            <span>•</span>
            <a 
              href="https://drive.google.com/drive/folders/1HcfyQEYE4-UQNhydTYV-2gEbA00cbJ4D?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Pitch Deck Template</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* AI Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        lang={lang}
      />
    </div>
  );
}
