import React, { useState } from 'react';
import { 
  Pill, 
  Upload, 
  Sun, 
  CloudSun, 
  Moon, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Check, 
  Sparkles,
  Camera,
  FileText
} from 'lucide-react';
import { translations } from '../data/translations';
import { sampleMedicines } from '../data/medicalKnowledge';
import { speakText, stopSpeaking } from '../utils/speech';

export default function MedicineDecoder({ lang, isHighContrast }) {
  const t = translations[lang];

  const [selectedKey, setSelectedKey] = useState('pcm');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const med = sampleMedicines[selectedKey] || sampleMedicines.pcm;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const name = lang === 'hi' ? med.hindiName : med.name;
      const purpose = lang === 'hi' ? med.purpose.hi : med.purpose.en;
      const mDose = med.dosage.morning.active ? `${t.morning}: ${med.dosage.morning.count} (${lang === 'hi' ? med.dosage.morning.instruction.hi : med.dosage.morning.instruction.en}). ` : '';
      const aDose = med.dosage.afternoon.active ? `${t.afternoon}: ${med.dosage.afternoon.count} (${lang === 'hi' ? med.dosage.afternoon.instruction.hi : med.dosage.afternoon.instruction.en}). ` : '';
      const nDose = med.dosage.night.active ? `${t.night}: ${med.dosage.night.count} (${lang === 'hi' ? med.dosage.night.instruction.hi : med.dosage.night.instruction.en}). ` : '';
      const warning = lang === 'hi' ? med.precautions.hi[0] : med.precautions.en[0];

      const fullSpeech = `${name}. ${purpose}. ${mDose} ${aDose} ${nDose} ${warning}`;
      speakText(fullSpeech, lang, () => setIsSpeaking(false));
    }
  };

  return (
    <div className={`space-y-6 ${isHighContrast ? 'text-lg font-medium' : ''}`}>
      {/* Intro Box */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Pill className="w-3.5 h-3.5 text-cyan-300" />
            <span>{lang === 'hi' ? 'दवा व पर्चा अनुवादक' : 'Multilingual Prescription Vision'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.medicineHeader}
          </h2>
          <p className="mt-2 text-blue-100 text-sm sm:text-base leading-relaxed">
            {t.medicineSubheader}
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Upload & Sample Selector Grid */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Upload Card */}
        <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-600" />
              <span>{t.uploadLabel}</span>
            </h3>

            <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition group">
              {uploadedImage ? (
                <div className="space-y-2 text-center">
                  <img 
                    src={uploadedImage} 
                    alt="Prescription" 
                    className="max-h-40 rounded-lg mx-auto object-cover border border-slate-200" 
                  />
                  <p className="text-xs text-blue-600 font-semibold">{lang === 'hi' ? 'फोटो बदली जा सकती है' : 'Click to change photo'}</p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700 text-center">
                    {t.dropzoneText}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, or PDF</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Sample quick selector */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-2">
              {t.selectSample}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {t.samples.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedKey(s.id);
                    stopSpeaking();
                    setIsSpeaking(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition flex items-center justify-between ${
                    selectedKey === s.id
                      ? 'bg-blue-50 border-blue-400 text-blue-800 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{s.name}</span>
                  {selectedKey === s.id && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Decoded Medicine Details Card */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          {/* Header & Speak Button */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 mb-1">
                {med.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === 'hi' ? med.hindiName : med.name}
              </h3>
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

          {/* Purpose */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {t.purpose}
            </h4>
            <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {lang === 'hi' ? med.purpose.hi : med.purpose.en}
            </p>
          </div>

          {/* Visual Dosage Timetable */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {t.dosageSchedule}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {/* Morning */}
              <div className={`p-3.5 rounded-xl border text-center transition ${
                med.dosage.morning.active 
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}>
                <Sun className={`w-6 h-6 mx-auto mb-1.5 ${med.dosage.morning.active ? 'text-amber-500' : 'text-slate-400'}`} />
                <p className="text-xs font-bold text-slate-700">{t.morning}</p>
                <p className="text-sm font-extrabold mt-1">{med.dosage.morning.count}</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                  {lang === 'hi' ? med.dosage.morning.instruction.hi : med.dosage.morning.instruction.en}
                </p>
              </div>

              {/* Afternoon */}
              <div className={`p-3.5 rounded-xl border text-center transition ${
                med.dosage.afternoon.active 
                  ? 'bg-orange-50 border-orange-300 text-orange-900 shadow-2xs' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}>
                <CloudSun className={`w-6 h-6 mx-auto mb-1.5 ${med.dosage.afternoon.active ? 'text-orange-500' : 'text-slate-400'}`} />
                <p className="text-xs font-bold text-slate-700">{t.afternoon}</p>
                <p className="text-sm font-extrabold mt-1">{med.dosage.afternoon.count}</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                  {lang === 'hi' ? med.dosage.afternoon.instruction.hi : med.dosage.afternoon.instruction.en}
                </p>
              </div>

              {/* Night */}
              <div className={`p-3.5 rounded-xl border text-center transition ${
                med.dosage.night.active 
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-2xs' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}>
                <Moon className={`w-6 h-6 mx-auto mb-1.5 ${med.dosage.night.active ? 'text-indigo-600' : 'text-slate-400'}`} />
                <p className="text-xs font-bold text-slate-700">{t.night}</p>
                <p className="text-sm font-extrabold mt-1">{med.dosage.night.count}</p>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                  {lang === 'hi' ? med.dosage.night.instruction.hi : med.dosage.night.instruction.en}
                </p>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-blue-50/70 p-3 rounded-xl border border-blue-200 font-medium">
            <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span><strong>{t.courseDuration}</strong> {lang === 'hi' ? med.duration.hi : med.duration.en}</span>
          </div>

          {/* Critical Warnings */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-amber-900">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{t.precautions}</span>
            </h4>
            <ul className="space-y-1.5">
              {(lang === 'hi' ? med.precautions.hi : med.precautions.en).map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-medium">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
