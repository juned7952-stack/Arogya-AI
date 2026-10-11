import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Share2, 
  QrCode, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  MapPin, 
  Activity, 
  Thermometer, 
  Heart,
  Send,
  Building2
} from 'lucide-react';
import { translations } from '../data/translations';

export default function AshaReferralSlip({ lang, transferredData, isHighContrast }) {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    name: "Rameshwar Prasad (रामेश्वर प्रसाद)",
    ageGender: "54 / M",
    village: "Pipariya Kalan (पिपरीया कलां)",
    ashaName: "Sunita Devi (ASHA-409)",
    temp: "101.4",
    bp: "140/90",
    pulse: "88",
    oxygen: "96",
    symptoms: transferredData?.symptoms || "High fever with chills for 3 days, severe weakness, nausea",
    urgency: transferredData?.urgency || "YELLOW",
    token: "AG-2026-PHC-8821"
  });

  const [isGenerated, setIsGenerated] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `*ArogyaGram Referral Slip* (${formData.token})
👤 Patient: ${formData.name} (${formData.ageGender})
📍 Village: ${formData.village}
👩‍⚕️ ASHA: ${formData.ashaName}
🌡️ Vitals: Temp ${formData.temp}°F | BP ${formData.bp} | Pulse ${formData.pulse} | SpO2 ${formData.oxygen}%
⚠️ Urgency: ${formData.urgency}
📋 Symptoms: ${formData.symptoms}
Sent via ArogyaGram AI.`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`space-y-6 ${isHighContrast ? 'text-lg font-medium' : ''}`}>
      {/* Intro Box */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5 text-teal-200" />
            <span>{lang === 'hi' ? 'सामुदायिक स्वास्थ्य कार्यकर्ता डिजिटल पर्ची' : 'Frontline Health Worker System'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.ashaHeader}
          </h2>
          <p className="mt-2 text-teal-100 text-sm sm:text-base leading-relaxed">
            {t.ashaSubheader}
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Input Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
            {lang === 'hi' ? 'मरीज व स्वास्थ्य विवरण' : 'Patient Information & Vitals'}
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">{t.patientName}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{t.patientAge}</label>
                <input
                  type="text"
                  value={formData.ageGender}
                  onChange={(e) => setFormData({ ...formData, ageGender: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{t.villageName}</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Vitals Grid */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">{t.vitalsTitle}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">{t.temp}</span>
                  <input
                    type="text"
                    value={formData.temp}
                    onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">{t.bp}</span>
                  <input
                    type="text"
                    value={formData.bp}
                    onChange={(e) => setFormData({ ...formData, bp: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">{t.pulse}</span>
                  <input
                    type="text"
                    value={formData.pulse}
                    onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">{t.oxygen}</span>
                  <input
                    type="text"
                    value={formData.oxygen}
                    onChange={(e) => setFormData({ ...formData, oxygen: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {lang === 'hi' ? 'लक्षण एवं परेशानी' : 'Chief Clinical Symptoms'}
              </label>
              <textarea
                rows={2}
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Official Printable Slip Output */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            id="printable-slip"
            className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-300 shadow-md relative"
          >
            {/* Stamp / Watermark */}
            <div className="border-b-2 border-slate-900 pb-4 mb-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                    AG
                  </span>
                  <h4 className="text-lg font-black tracking-wider uppercase text-slate-900">
                    ArogyaGram Referral Slip
                  </h4>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Primary Health Center (PHC) & Community Hospital Token
                </p>
              </div>

              {/* Urgency Badge */}
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-black tracking-wider uppercase ${
                  formData.urgency === 'RED' ? 'bg-red-600 text-white' :
                  formData.urgency === 'YELLOW' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {formData.urgency} TRIAGE
                </span>
                <p className="text-[11px] font-mono text-slate-500 mt-1">{formData.token}</p>
              </div>
            </div>

            {/* Patient & Worker Metadata */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5 text-xs sm:text-sm">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Patient</p>
                <p className="font-extrabold text-slate-900">{formData.name}</p>
                <p className="text-slate-600">Age/Gender: {formData.ageGender}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Location & Worker</p>
                <p className="font-bold text-slate-900">{formData.village}</p>
                <p className="text-slate-600">ASHA: {formData.ashaName}</p>
              </div>
            </div>

            {/* Recorded Vitals Table */}
            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Recorded Vitals (जांचे गए शारीरिक संकेत)
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                  <p className="text-slate-500 font-bold">Temp</p>
                  <p className="text-sm font-black text-slate-900">{formData.temp}°F</p>
                </div>
                <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                  <p className="text-slate-500 font-bold">BP</p>
                  <p className="text-sm font-black text-slate-900">{formData.bp}</p>
                </div>
                <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                  <p className="text-slate-500 font-bold">Pulse</p>
                  <p className="text-sm font-black text-slate-900">{formData.pulse} bpm</p>
                </div>
                <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                  <p className="text-slate-500 font-bold">SpO2</p>
                  <p className="text-sm font-black text-slate-900">{formData.oxygen}%</p>
                </div>
              </div>
            </div>

            {/* Symptoms & Clinical Note */}
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Clinical Presentation (लक्षण)
              </p>
              <p className="text-sm font-semibold text-slate-800 bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                {formData.symptoms}
              </p>
            </div>

            {/* Verification QR & Sign Footer */}
            <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                  <QrCode className="w-full h-full" />
                </div>
                <div className="text-[11px] text-slate-500">
                  <p className="font-bold text-slate-800">Scannable Medical ID</p>
                  <p>Verified by ArogyaGram Core</p>
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-400">
                <div className="w-28 border-b border-slate-400 mb-1"></div>
                <p>Medical Officer Sign / Stamp</p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>{t.printSlip}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.shareWhatsApp}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
