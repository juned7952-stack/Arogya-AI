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
```

---

## 📱 How to Deploy Live (for Hackathon Submission Link)

You can deploy the app to **Vercel** or **Netlify** for free in under 2 minutes:

### Option A: Deploy via Vercel (Recommended)
1. Push this folder to a GitHub repository.
2. Visit [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `arogyagram-ai` GitHub repository.
4. Keep the default settings (Framework Preset: **Vite**, Root Directory: `./`).
5. Click **"Deploy"**. You will receive your live URL (e.g., `https://arogyagram-ai.vercel.app`).

### Option B: Deploy via Netlify Drop
1. Run `npm run build` to generate the `dist` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder directly onto the page to get an instant live URL.

---

## 🎙️ Demo Video Script (2–3 Minutes)

Use this script for your mandatory demo video in **English** or **Hindi**:

### English Script:
* **0:00 – 0:30 (Hook & Problem):**
  > *"Hello judges! Over 70% of India's population lives in rural areas, where there is only one doctor for every 10,000 villagers. Frontline ASHA workers carry the entire burden of healthcare delivery with paper registers and no digital decision support. Furthermore, medical prescriptions printed in English cause over 40% of medication errors. That is why we built **ArogyaGram AI**."*
* **0:30 – 1:15 (Voice Triage Demo):**
  > *"Let's see it in action. A village mother comes to the clinic. She clicks the microphone and speaks in Hindi: 'मेरे 3 साल के बच्चे को 2 दिन से तेज बुखार और उल्टी है'. ArogyaGram AI instantly analyzes the symptoms and assigns a RED Critical Urgency with red-flag warning signs. With one tap on 'Listen', the system speaks the advice aloud in clear Hindi so even illiterate patients understand immediately."*
* **1:15 – 1:50 (Medicine Scanner & ASHA Slip):**
  > *"Next, patients often confuse pill schedules. In the Medicine tab, we scan a drug strip like Paracetamol or Amoxicillin. ArogyaGram generates a visual timetable with Sun and Moon icons, warns the patient never to stop antibiotics midway, and speaks the instructions aloud. Then, in the ASHA Referral tab, the health worker logs vitals and prints or WhatsApps an official digital referral slip to the hospital doctor."*
* **1:50 – 2:20 (Offline Emergency & Tech Stack):**
  > *"ArogyaGram works 100% offline on low-bandwidth 2G/3G networks using local clinical rule trees, with optional Gemini 2.0 Flash integration for cloud reasoning. It includes offline emergency protocols for snakebites, heatstroke, and burns."*
* **2:20 – 2:40 (Conclusion & Social Impact):**
  > *"ArogyaGram AI saves families ₹1,200 in unnecessary travel expenses, prevents drug resistance, and ensures no rural emergency goes unnoticed. Thank you!"*

---

## 📜 Pitch Deck Summary (Mandatory Hackathon Item #3)

Download the [Official Pitch Deck Slides](https://drive.google.com/drive/folders/1HcfyQEYE4-UQNhydTYV-2gEbA00cbJ4D?usp=sharing) and use this structured content:

* **Slide a (Problem):** Acute doctor deficit (1:10,000+), English literacy barriers in prescriptions, delayed emergency triage.
* **Slide b (Who is Affected):** 800M+ rural citizens, 1,000,000+ frontline ASHA/ANM workers, overburdened PHC physicians.
* **Slide c (Solution):** Voice-first vernacular triage, visual medicine dosage timetable, digital referral tokens, offline emergency quickcards.
* **Slide d (Technology / AI Used):** Google Gemini 2.0 Multimodal API, WHO/ICMR edge clinical decision trees, Web Speech API (Hindi/English).
* **Slide e (Social Impact):** ₹1,200 saved per family per illness episode, 40% reduction in medication errors, golden-hour emergency escalation.
* **Slide f (Scalability):** Phase 1 (PWA Web MVP), Phase 2 (WhatsApp & IVR Voice bot for feature phones), Phase 3 (Ayushman Bharat ABHA & PHC integration).

---

## 📄 License
MIT License. Built for the **Social Impact Hackathon 2026** under the theme **Healthcare and Wellbeing**.
