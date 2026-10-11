export const translations = {
  en: {
    appTitle: "ArogyaGram AI",
    tagline: "Rural Health Copilot & Vernacular Triage Assistant",
    subtitle: "Empowering ASHA workers, village health clinics, and rural patients with instant AI triage and prescription guidance.",
    languageToggle: "हिंदी",
    emergencySOS: "Emergency Ambulance 108 / 102",
    offlineBadge: "Works Offline (2G/3G Ready)",
    aiPowered: "Gemini AI + Rural Clinical Knowledge",
    
    // Tabs
    tabTriage: "Symptom Triage",
    tabMedicine: "Medicine & Rx Scanner",
    tabAsha: "ASHA Referral Slip",
    tabFirstAid: "Rural First-Aid",
    tabPitch: "Pitch Deck & Impact",

    // Triage Tab
    triageHeader: "Voice & Text Symptom Triage",
    triageSubheader: "Speak or type symptoms in your native language. AI triages urgency and guides next steps.",
    speakBtn: "Click to Speak Symptoms",
    listening: "Listening... Please speak now",
    typePlaceholder: "Describe symptoms (e.g., High fever for 3 days with shivering, unable to eat)",
    checkUrgency: "Analyze Symptoms with AI",
    quickExamplesLabel: "Or select a common village case:",
    quickCases: [
      { label: "Stage 4 Cancer / Oncology", text: "Patient diagnosed with 4th stage cancer with severe chronic pain, extreme weakness, and unable to eat." },
      { label: "Child Fever & Vomiting", text: "My 3-year-old child has high fever (102°F) for 2 days and vomiting everything." },
      { label: "Chest Pressure & Breathlessness", text: "Elderly person with heavy chest tightness, cold sweating, and difficulty breathing." },
      { label: "Severe Dehydration / Diarrhea", text: "Severe watery diarrhea 6 times since morning, feeling dizzy and dry mouth." },
      { label: "Rusty Nail Foot Injury", text: "Deep puncture wound in foot from a rusty nail while working on farmland 24 hours ago." }
    ],
    triageResultsTitle: "AI Clinical Assessment & Urgency Score",
    readAloud: "Listen in Audio",
    stopAudio: "Stop Audio",
    urgencyGreen: "Mild — Home Care & ASHA Supervision",
    urgencyYellow: "Moderate — Visit Primary Health Center (PHC)",
    urgencyRed: "CRITICAL EMERGENCY — Immediate Hospital Referral",
    keyObservations: "Clinical Observations:",
    actionPlan: "Recommended Immediate Actions:",
    warningSigns: "Red Flag Signs (Seek Emergency Care if):",
    disclaimer: "Medical Disclaimer: ArogyaGram AI is a clinical decision-support tool for frontline workers. It does not replace a licensed medical practitioner in critical emergencies.",

    // Medicine Tab
    medicineHeader: "Medicine Strip & Prescription Decoder",
    medicineSubheader: "Upload or photograph a medicine strip or doctor's slip to get plain-language instructions and visual timetables.",
    uploadLabel: "Upload photo of medicine strip or prescription",
    dropzoneText: "Drag & drop image here or click to browse",
    selectSample: "Or test with a sample medicine:",
    samples: [
      { id: "pcm", name: "Paracetamol 500mg (Fever/Pain)" },
      { id: "amox", name: "Amoxicillin 500mg (Antibiotic)" },
      { id: "ors", name: "ORS Electrolyte Sachet (Dehydration)" },
      { id: "met", name: "Metformin 500mg (Sugar/Diabetes)" }
    ],
    medicineName: "Identified Medicine:",
    purpose: "What is this medicine for?",
    dosageSchedule: "Visual Daily Dosage Schedule",
    morning: "Morning (सुबह)",
    afternoon: "Afternoon (दोपहर)",
    night: "Night (रात)",
    withFood: "Take after food",
    beforeFood: "Take before food",
    precautions: "Critical Warnings & Precautions:",
    courseDuration: "Standard Course Duration:",

    // ASHA Referral Slip
    ashaHeader: "Digital ASHA Referral Slip",
    ashaSubheader: "Generate a structured referral token during village door-to-door visits to hand over to the visiting doctor.",
    patientName: "Patient Full Name",
    patientAge: "Age & Gender",
    villageName: "Village / Hamlet Name",
    vitalsTitle: "Vital Signs Recorded:",
    temp: "Body Temp (°F)",
    bp: "Blood Pressure (e.g. 120/80)",
    pulse: "Pulse (bpm)",
    oxygen: "SpO2 Oxygen (%)",
    generateSlip: "Generate Official Referral Token",
    printSlip: "Print / Save PDF Slip",
    shareWhatsApp: "Share via WhatsApp",

    // First Aid Tab
    firstAidHeader: "Emergency Rural First-Aid Protocols",
    firstAidSubheader: "Life-saving instant protocols designed for remote areas where ambulance arrival may take hours.",

    // Pitch Tab
    pitchHeader: "Social Impact Hackathon 2026 — Pitch Deck",
    pitchSubheader: "Official 6-Part Pitch Presentation & Strategic Impact Framework"
  },

  hi: {
    appTitle: "आरोग्यग्राम AI",
    tagline: "ग्रामीण स्वास्थ्य सहायक एवं स्थानीय भाषा ट्राइएज मित्र",
    subtitle: "आशा कार्यकर्ताओं, प्राथमिक स्वास्थ्य केंद्रों और ग्रामीणों के लिए तत्काल AI स्वास्थ्य जांच व दवा निर्देश।",
    languageToggle: "English",
    emergencySOS: "आपातकालीन एम्बुलेंस 108 / 102",
    offlineBadge: "ऑफलाइन सक्षम (2G/3G नेटवर्क तैयार)",
    aiPowered: "जेमिनी AI + ग्रामीण क्लिनिकल नॉलेज",

    // Tabs
    tabTriage: "लक्षण जांच (Triage)",
    tabMedicine: "दवा पहचान एवं खुराक",
    tabAsha: "आशा रेफरल पर्ची",
    tabFirstAid: "आपातकालीन प्राथमिक उपचार",
    tabPitch: "पिच डेक एवं सामाजिक प्रभाव",

    // Triage Tab
    triageHeader: "आवाज और भाषा द्वारा लक्षण जांच",
    triageSubheader: "अपनी बोली में लक्षण बोलें या लिखें। AI गंभीरता तय करके सुरक्षित कदम बताएगा।",
    speakBtn: "बोलने के लिए माइक दबाएं",
    listening: "सुन रहे हैं... कृपया अब बोलें",
    typePlaceholder: "लक्षण बताएं (जैसे: 3 दिन से तेज बुखार, ठंड लगना और कमजोरी)",
    checkUrgency: "AI द्वारा लक्षण जांच करें",
    quickExamplesLabel: "या सामान्य ग्रामीण उदाहरण चुनें:",
    quickCases: [
      { label: "स्टेज 4 कैंसर / गंभीर ऑन्कोलॉजी", text: "मरीज को 4th stage cancer (चौथी स्टेज का कैंसर) है, अत्यधिक दर्द, असहनीय कमजोरी और भोजन निगलने में परेशानी है।" },
      { label: "बच्चे को तेज बुखार और उल्टी", text: "मेरे 3 साल के बच्चे को 2 दिन से तेज बुखार है और कुछ भी खाने पर उल्टी हो रही है।" },
      { label: "सीने में भारीपन और पसीना", text: "बुजुर्ग मरीज के सीने में तेज दबाव, सांस लेने में परेशानी और ठंडा पसीना आ रहा है।" },
      { label: "दस्त और अत्यधिक कमजोरी", text: "सुबह से 6 बार पानी जैसा दस्त हुआ है, चक्कर आ रहे हैं और मुंह सूख रहा है।" },
      { label: "खेत में लोहे की कील लगना", text: "खेत में काम करते समय पैर में जंग लगी लोहे की कील गड़ गई, 24 घंटे हो गए हैं।" }
    ],
    triageResultsTitle: "AI क्लिनिकल विश्लेषण एवं गंभीरता स्तर",
    readAloud: "आवाज में सुनें",
    stopAudio: "आवाज बंद करें",
    urgencyGreen: "सामान्य (हरा) — घरेलू उपचार व आशा देखरेख",
    urgencyYellow: "मध्यम (पीला) — प्राथमिक स्वास्थ्य केंद्र (PHC) दिखाएं",
    urgencyRed: "अति गंभीर (लाल) — तत्काल जिला अस्पताल ले जाएं",
    keyObservations: "मुख्य क्लिनिकल निष्कर्ष:",
    actionPlan: "तत्काल जरूरी कदम:",
    warningSigns: "खतरे के संकेत (तुरंत अस्पताल ले जाएं यदि):",
    disclaimer: "चिकित्सा चेतावनी: आरोग्यग्राम AI स्वास्थ्य कार्यकर्ताओं की सहायता हेतु है। गंभीर स्थिति में तुरंत अधिकृत डॉक्टर या 108 एम्बुलेंस से संपर्क करें।",

    // Medicine Tab
    medicineHeader: "दवा पत्ता (Strip) एवं पर्चा अनुवादक",
    medicineSubheader: "दवा के पत्ते या डॉक्टर की पर्ची की फोटो अपलोड करें और समझें कब, कैसे और कितनी दवा लेनी है।",
    uploadLabel: "दवा की फोटो या पर्चा अपलोड करें",
    dropzoneText: "फोटो यहां ड्रैग करें या फाइल चुनें",
    selectSample: "या सामान्य दवा का उदाहरण चुनें:",
    samples: [
      { id: "pcm", name: "पैरासिटामोल 500mg (बुखार / दर्द)" },
      { id: "amox", name: "अमोक्सिसिलिन 500mg (एंटीबायोटिक)" },
      { id: "ors", name: "ओआरएस घोल (ORS - दस्त व डिहाइड्रेशन)" },
      { id: "met", name: "मेटफॉर्मिन 500mg (शुगर / डायबिटीज)" }
    ],
    medicineName: "पहचानी गई दवा:",
    purpose: "यह दवा किस बीमारी के लिए है?",
    dosageSchedule: "दैनिक खुराक समय-सारिणी (Visual Timetable)",
    morning: "सुबह (Morning)",
    afternoon: "दोपहर (Afternoon)",
    night: "रात (Night)",
    withFood: "खाना खाने के बाद लें",
    beforeFood: "खाली पेट लें",
    precautions: "सावधानियां एवं चेतावनी:",
    courseDuration: "दवा का पूरा कोर्स:",

    // ASHA Referral Slip
    ashaHeader: "डिजिटल आशा रेफरल पर्ची",
    ashaSubheader: "गाँव में घर-घर भ्रमण के समय मरीज का विवरण दर्ज करें और डॉक्टर के पास भेजने हेतु पर्ची तैयार करें।",
    patientName: "मरीज का पूरा नाम",
    patientAge: "उम्र एवं लिंग",
    villageName: "गांव / टोला का नाम",
    vitalsTitle: "जांचे गए शारीरिक संकेत (Vitals):",
    temp: "तापमान (°F)",
    bp: "रक्तचाप (BP जैसे 120/80)",
    pulse: "नाड़ी गति (Pulse)",
    oxygen: "ऑक्सीजन (SpO2 %)",
    generateSlip: "आधिकारिक रेफरल पर्ची बनाएं",
    printSlip: "पर्ची प्रिंट / PDF सेव करें",
    shareWhatsApp: "व्हाट्सएप पर भेजें",

    // First Aid Tab
    firstAidHeader: "ग्रामीण आपातकालीन प्राथमिक उपचार",
    firstAidSubheader: "एंबुलेंस आने तक या अस्पताल पहुंचने तक जीवन रक्षक प्राथमिक कदम।",

    // Pitch Tab
    pitchHeader: "सोशल इम्पैक्ट हैकथॉन 2026 — पिच डेक",
    pitchSubheader: "6-भागीय प्रस्तुति एवं सामाजिक प्रभाव रूपरेखा"
  }
};
