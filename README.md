# 🌿 ArogyaGram AI (आरोग्यग्राम)
### Rural Clinic Copilot & Vernacular Triage Assistant for Frontline Healthcare Workers (ASHAs) & Remote Communities

> **Social Impact Hackathon 2026 Submission**  
> **Theme:** Healthcare and Wellbeing  
> **One-Line Description:** *ArogyaGram AI is a voice-first, multilingual rural clinic assistant that empowers frontline healthcare workers and villagers to perform instant symptom triage, decode prescriptions, and access critical emergency guidance in regional languages.*

---

## 📌 Executive Summary

Over **70% of India's population lives in rural areas**, served by fewer than **30% of trained doctors** (creating an alarming **1 : 10,000+ doctor-to-patient ratio**). In remote villages, Primary Health Centers (PHCs) and sub-centers are run by dedicated **ASHA workers (Accredited Social Health Activists)** and ANMs who lack clinical decision-support tools. 

Furthermore, prescriptions and drug strips are printed in English or illegible doctor handwriting. This language and literacy barrier leads to **over 40% medication non-adherence**, catastrophic out-of-pocket transportation expenses, and delayed emergency referrals.

**ArogyaGram AI** bridges this divide by delivering a **voice-first, multilingual clinical assistant** that runs on basic smartphones, works offline on low-bandwidth 2G/3G networks, and provides audio guidance in native languages (Hindi and English).

---

## 🚀 Key Modules & Capabilities

### 1. 🎙️ Vernacular Voice & Text Symptom Triage (लक्षण जांच)
* **Voice-First Input:** Patients and ASHA workers can speak their symptoms naturally in **Hindi or English** using real-time speech recognition.
* **Intelligent Clinical Urgency Scoring:**
  * 🟢 **Green (Mild):** Safe home care hydration steps, rest, and ASHA monitoring.
  * 🟡 **Yellow (Moderate):** Recommends visiting the nearest Primary Health Center (PHC) within 24 hours.
  * 🔴 **Red (Critical Emergency):** Immediate hospital referral + 108 Ambulance dispatch with red-flag warning signs.
* **Audio Readout (Text-to-Speech):** Speaks advice aloud in Hindi/English for illiterate or elderly patients.

### 2. 💊 Medicine Strip & Prescription Decoder (दवा पहचान एवं खुराक)
* **Visual Dosage Timetable:** Intuitive icons for **Morning (☀️), Afternoon (🌤️), and Night (🌙)** with meal indicators (*"After Food"* / *"Before Food"*).
* **Native Audio Playback:** Explains the medicine's exact purpose, course duration, and critical precautions in simple spoken language.
* **Drug Resistance Protection:** Highlights critical warnings (e.g., *"Complete the full 5-day antibiotic course even if you feel better"*).

### 3. 📋 Digital ASHA Referral Slip (आशा रेफरल पर्ची)
* Eliminates patient history loss during village door-to-door checkups.
* Captures vitals (**Temperature, BP, Pulse, SpO2**) and clinical presentation.
* Generates an official printable referral token with a verification QR code.
* One-click **WhatsApp sharing** to the PHC medical officer or ambulance driver.

### 4. 🚨 Offline Rural Emergency First-Aid Guides (आपातकालीन प्राथमिक उपचार)
* Life-saving step-by-step protocols designed for remote hamlets where ambulance transit takes hours:
  * 🐍 **Snakebite Protocol:** Limb immobilization, reassurance, NO tourniquet, anti-venom center rush.
  * ☀️ **Heatstroke & Dehydration:** Emergency ORS formula (1L water + 6 tsp sugar + 1/2 tsp salt).
  * 🔥 **Burns Care:** 15–20 minutes cool water soak, anti-infection protocol (dispelling cow dung/toothpaste myths).
  * 👶 **Infant Respiratory Distress:** Breathing count thresholds & chest-indrawing detection for under-5 pneumonia.

### 5. 📊 Interactive In-App Pitch Deck
* Built directly into the web application so hackathon judges can review all 6 pitch slides and social impact metrics directly inside the live prototype!

---

## 🛠️ Technology Stack & AI Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite, Tailwind CSS (Mobile-First Responsive PWA) |
| **AI Reasoning Engine** | Google Gemini 2.0 Flash Multimodal API (Medical NLP & OCR) |
| **Edge Fallback Engine** | Local Deterministic Clinical Rule Trees (WHO IMCI & ICMR Guidelines) |
| **Speech Processing** | Web Speech API (`SpeechRecognition` & `SpeechSynthesis` for Hindi/English) |
| **Design & Icons** | Lucide React, Google Fonts (Plus Jakarta Sans, Noto Sans Devanagari) |
| **Deployment Target** | Vercel / Netlify (Zero-configuration CI/CD) |

---

## 💻 Getting Started (Local Development)

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** (v9 or higher)

### Installation
```bash
# 1. Clone repository
git clone https://github.com/your-username/arogyagram-ai.git
cd arogyagram-ai

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open `http://localhost:5173` in your browser.
### Production Build
```bash
npm run build
npm run preview
```📄 License
MIT License. Built for the **Social Impact Hackathon 2026** under the theme **Healthcare and Wellbeing**.
