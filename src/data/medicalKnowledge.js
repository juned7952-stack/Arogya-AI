export const sampleMedicines = {
  pcm: {
    name: "Paracetamol 500mg",
    hindiName: "पैरासिटामोल 500mg",
    category: "Antipyretic / Analgesic",
    purpose: {
      en: "Used to reduce high body temperature (fever) and relieve mild to moderate body ache, headache, or joint pain.",
      hi: "शरीर का तेज बुखार कम करने और सिरदर्द, बदन दर्द या जोड़ों के दर्द में आराम देने के लिए उपयोग किया जाता है।"
    },
    dosage: {
      morning: { active: true, count: "1 Tablet", instruction: { en: "After breakfast", hi: "नाश्ते के बाद" } },
      afternoon: { active: false, count: "-", instruction: { en: "Only if fever recurs (>101°F)", hi: "केवल यदि दोबारा बुखार चढ़े (>101°F)" } },
      night: { active: true, count: "1 Tablet", instruction: { en: "After dinner", hi: "रात के खाने के बाद" } }
    },
    duration: {
      en: "3 to 5 days. Stop if fever subsides completely.",
      hi: "3 से 5 दिन तक। बुखार पूरी तरह उतर जाने पर बंद करें।"
    },
    precautions: {
      en: [
        "Do not exceed 4 tablets (2000mg) in 24 hours to prevent liver damage.",
        "Take with a glass of water after food to avoid stomach irritation.",
        "If fever persists beyond 3 days, get tested for Malaria or Dengue at the PHC."
      ],
      hi: [
        "24 घंटे में 4 गोली से ज्यादा कभी न लें, इससे लीवर को नुकसान हो सकता है।",
        "हमेशा कुछ खाने के बाद पानी के साथ लें ताकि पेट में जलन न हो।",
        "यदि 3 दिन बाद भी बुखार न उतरे, तो प्राथमिक स्वास्थ्य केंद्र में मलेरिया या डेंगू की जांच करवाएं।"
      ]
    }
  },
  amox: {
    name: "Amoxicillin 500mg",
    hindiName: "अमोक्सिसिलिन 500mg (एंटीबायोटिक)",
    category: "Antibacterial Antibiotic",
    purpose: {
      en: "Prescription antibiotic to cure bacterial infections such as severe throat infection, chest bronchitis, or infected skin wounds.",
      hi: "गले के गंभीर संक्रमण, छाती में जकड़न (ब्रोंकाइटिस) या घाव में मवाद होने पर बैक्टीरिया को खत्म करने वाला एंटीबायोटिक।"
    },
    dosage: {
      morning: { active: true, count: "1 Capsule", instruction: { en: "After food", hi: "सुबह भोजन के बाद" } },
      afternoon: { active: true, count: "1 Capsule", instruction: { en: "After lunch", hi: "दोपहर भोजन के बाद" } },
      night: { active: true, count: "1 Capsule", instruction: { en: "After dinner", hi: "रात भोजन के बाद" } }
    },
    duration: {
      en: "Strictly complete the 5-day course (15 capsules total).",
      hi: "5 दिन का पूरा कोर्स अवश्य करें (कुल 15 कैप्सूल)। अधूरा न छोड़ें।"
    },
    precautions: {
      en: [
        "IMPORTANT: Do NOT stop taking this midway even if you feel better; bacteria can become drug-resistant.",
        "Not effective for viral coughs or ordinary common cold.",
        "Stop immediately if you develop skin hives or facial swelling (allergic reaction)."
      ],
      hi: [
        "महत्वपूर्ण: आराम लगने पर भी दवा बीच में न छोड़ें, अन्यथा कीटाणु दोबारा हमला कर सकते हैं (रेजिस्टेंस)।",
        "यह साधारण जुकाम या मौसमी खांसी के लिए नहीं है।",
        "यदि शरीर पर लाल चकत्ते या खुजली हो तो तुरंत दवा रोकें और स्वास्थ्य कार्यकर्ता को बताएं।"
      ]
    }
  },
  ors: {
    name: "Oral Rehydration Salts (ORS)",
    hindiName: "ओआरएस (जीवन रक्षक घोल)",
    category: "Electrolyte Replenisher",
    purpose: {
      en: "Prevents fatal dehydration and replenishes lost salts and water during diarrhea, cholera, or extreme vomiting.",
      hi: "दस्त, उल्टी या दस्त लगने पर शरीर में पानी और नमक की कमी (डिहाइड्रेशन) को रोककर जान बचाता है।"
    },
    dosage: {
      morning: { active: true, count: "1 Glass", instruction: { en: "Sip slowly throughout morning", hi: "सुबह घूंट-घूंट करके पिएं" } },
      afternoon: { active: true, count: "1 Glass", instruction: { en: "After every loose stool", hi: "हर बार दस्त के बाद एक गिलास" } },
      night: { active: true, count: "1 Glass", instruction: { en: "Before sleeping", hi: "सोने से पहले पिएं" } }
    },
    duration: {
      en: "Continue as long as diarrhea or vomiting continues (usually 2-3 days).",
      hi: "जब तक दस्त या उल्टी बंद न हो (आमतौर पर 2-3 दिन तक)।"
    },
    precautions: {
      en: [
        "Dissolve 1 entire packet in exactly 1 Liter of clean boiled & cooled water. Do NOT mix in milk or juice.",
        "Discard any prepared solution older than 24 hours and prepare a fresh batch.",
        "Give with a spoon to infants; never force drink."
      ],
      hi: [
        "पूरा 1 पैकेट ठीक 1 लीटर उबले और ठंडे किए गए पानी में घोलें। दूध या चाय में कभी न मिलाएं।",
        "24 घंटे बाद बचा हुआ घोल फेंक दें और नया घोल बनाएं।",
        "छोटे बच्चों को चम्मच से थोड़ा-थोड़ा पिलाएं।"
      ]
    }
  },
  met: {
    name: "Metformin 500mg",
    hindiName: "मेटफॉर्मिन 500mg (मधुमेह / शुगर)",
    category: "Anti-diabetic Medication",
    purpose: {
      en: "Controls high blood sugar in patients with Type-2 Diabetes by helping the body respond better to natural insulin.",
      hi: "टाइप-2 डायबिटीज (शुगर) के मरीजों में खून में शर्करा के स्तर को नियंत्रित रखने की दैनिक दवा।"
    },
    dosage: {
      morning: { active: true, count: "1 Tablet", instruction: { en: "With or immediately after breakfast", hi: "नाश्ते के साथ या तुरंत बाद" } },
      afternoon: { active: false, count: "-", instruction: { en: "Not required unless prescribed", hi: "ज़रूरत नहीं" } },
      night: { active: true, count: "1 Tablet", instruction: { en: "With dinner", hi: "रात के खाने के साथ" } }
    },
    duration: {
      en: "Chronic long-term therapy as advised by physician. Do not stop abruptly.",
      hi: "डॉक्टर की सलाह अनुसार नियमित रूप से। अचानक बंद न करें।"
    },
    precautions: {
      en: [
        "Always consume with meals to avoid nausea and stomach upset.",
        "Avoid alcohol completely while taking this medication.",
        "Report any sudden extreme weakness, sweating, or trembling (hypoglycemia signs)."
      ],
      hi: [
        "हमेशा भोजन के बीच या तुरंत बाद लें ताकि पेट में गैस या मितली न हो।",
        "शराब का सेवन बिल्कुल न करें।",
        "यदि अचानक पसीना, घबराहट या हाथ कांपें तो तुरंत मीठा पानी या बिस्कुट लें।"
      ]
    }
  }
};

export const emergencyProtocols = [
  {
    id: "snakebite",
    title: { en: "Snakebite Emergency Protocol", hi: "सांप काटने पर आपातकालीन प्राथमिक उपचार" },
    urgency: "RED",
    badge: { en: "Critical — High Mortality Risk", hi: "अति गंभीर — जान का जोखिम" },
    icon: "ShieldAlert",
    dos: {
      en: [
        "Reassure the victim and keep them completely still. Immobilize the bitten limb with a splint/cloth.",
        "Remove rings, tight bangles, anklets, or shoes before swelling begins.",
        "Keep the bite area at or slightly below heart level.",
        "Transport immediately to the nearest Community Health Center (CHC) or District Hospital equipped with Anti-Snake Venom (ASV)."
      ],
      hi: [
        "मरीज को शांत रखें और हिलने-डुलने न दें। काटे गए अंग को लकड़ी या कपड़े से बांधकर स्थिर रखें।",
        "सूजन आने से पहले अंगूठी, कंगन, पायल या जूते तुरंत उतार दें।",
        "काटे गए हिस्से को दिल के स्तर से नीचे रखें।",
        "बिना किसी देरी के तुरंत उस अस्पताल ले जाएं जहां एंटी-स्नेक वेनम (ASV) उपलब्ध हो।"
      ]
    },
    donts: {
      en: [
        "DO NOT tie tight rope/tourniquet (cuts off blood supply and causes gangrene).",
        "DO NOT make incisions or cut the wound with blades or knives.",
        "DO NOT attempt to suck venom with mouth or pump devices.",
        "DO NOT waste precious hours visiting traditional faith healers (jhaad-phook)."
      ],
      hi: [
        "कसा हुआ फंदा (टूर्निकेट) न बांधें, इससे अंग सड़ सकता है (गैंग्रीन)।",
        "ब्लेड या चाकू से चीरा न लगाएं।",
        "मुंह से जहर चूसने की कोशिश बिल्कुल न करें।",
        "झाड़-फूंक या तांत्रिक के चक्कर में समय बर्बाद न करें — केवल अस्पताल में ही जान बच सकती है।"
      ]
    }
  },
  {
    id: "heatstroke",
    title: { en: "Heatstroke & Severe Dehydration", hi: "लू लगना (Heatstroke) एवं गंभीर डिहाइड्रेशन" },
    urgency: "YELLOW",
    badge: { en: "Moderate to Severe", hi: "मध्यम से गंभीर" },
    icon: "Sun",
    dos: {
      en: [
        "Immediately move the patient to a shaded, well-ventilated or fan-cooled area.",
        "Loosen heavy clothing and apply wet cool cloths to neck, armpits, and forehead.",
        "If conscious, give sips of fresh ORS water, raw mango panna (आम पन्ना), or buttermilk with pinch of salt.",
        "Monitor body temperature; if above 104°F, seek emergency medical care."
      ],
      hi: [
        "मरीज को तुरंत धूप से हटाकर छायादार, हवादार स्थान या पंखे के नीचे लाएं।",
        "तंग कपड़े ढीले करें और गर्दन, कांख व माथे पर ठंडे पानी की पट्टियां रखें।",
        "यदि मरीज होश में है, तो ओआरएस का घोल, कच्चा आम पन्ना या नमक मिला मट्ठा थोड़ा-थोड़ा पिलाएं।",
        "यदि तेज बुखार (104°F) हो और बेहोशी छाए, तो तुरंत अस्पताल ले जाएं।"
      ]
    },
    donts: {
      en: [
        "DO NOT pour ice-cold water directly on an unconscious patient.",
        "DO NOT force fluids into the mouth of a drowsy or unconscious person (risk of choking into lungs).",
        "DO NOT give caffeinated tea, alcohol, or heavy oily food."
      ],
      hi: [
        "बेहोश मरीज के ऊपर एकदम बर्फ का पानी न डालें।",
        "बेहोश या ऊंघते हुए व्यक्ति के मुंह में जबरन पानी न डालें (फेफड़ों में जाने का खतरा)।",
        "चाय, शराब या भारी तला-भुना खाना न दें।"
      ]
    }
  },
  {
    id: "burns",
    title: { en: "Thermal & Farm Burns", hi: "जलने एवं आग की चोट का प्राथमिक उपचार" },
    urgency: "YELLOW",
    badge: { en: "Urgent Local Care", hi: "तत्काल स्थानीय उपचार" },
    icon: "Flame",
    dos: {
      en: [
        "Immediately hold the burn under gentle running cool tap water for 15-20 minutes.",
        "Cover the burn with a clean, dry cloth or sterile plastic cling-film.",
        "Give pain relief (Paracetamol) if patient is in severe agony.",
        "If burn is larger than palm size, involves face/hands, or on an infant, take to PHC immediately."
      ],
      hi: [
        "जले हुए हिस्से पर तुरंत 15 से 20 मिनट तक नल का ताजा ठंडा पानी लगातार डालते रहें।",
        "जले स्थान को साफ, सूखे सूती कपड़े से ढकें।",
        "अत्यधिक दर्द होने पर पैरासिटामोल दें।",
        "यदि घाव हथेली से बड़ा है, चेहरे या हाथ पर है, या छोटे बच्चे का है, तो तुरंत प्राथमिक स्वास्थ्य केंद्र ले जाएं।"
      ]
    },
    donts: {
      en: [
        "DO NOT apply toothpaste, cow dung, mud, turmeric, or butter to burns (leads to severe infection).",
        "DO NOT burst blisters or peel dead skin away.",
        "DO NOT use raw ice directly on the burnt flesh (causes tissue necrosis)."
      ],
      hi: [
        "जले हुए पर टूथपेस्ट, गोबर, मिट्टी, हल्दी या तेल कभी न लगाएं — इससे गंभीर मवाद पड़ सकता है।",
        "उठे हुए फफोलों को कभी न फोड़ें।",
        "सीधे बर्फ न रगड़ें।"
      ]
    }
  },
  {
    id: "infant_respiratory",
    title: { en: "Infant Respiratory Distress / Pneumonia", hi: "शिशु में निमोनिया व पसली चलना" },
    urgency: "RED",
    badge: { en: "Critical Emergency for Under-5", hi: "5 वर्ष से कम बच्चों के लिए अति गंभीर" },
    icon: "AlertOctagon",
    dos: {
      en: [
        "Check breathing rate: Count breaths for 1 full minute (Fast breathing: >50 breaths/min in 2-11 months, >40 in 1-5 yrs).",
        "Look for chest indrawing (lower chest pulls inwards when breathing in).",
        "Keep the child warm and upright; continue small, frequent breastfeeding if child can suckle.",
        "Emergency referral to District Hospital with pediatric oxygen bed immediately."
      ],
      hi: [
        "सांस की गति गिनें: 1 पूरे मिनट तक पेट/छाती की हरकत गिनें (2-11 महीने में 50 से अधिक, 1-5 साल में 40 से अधिक सांस तेज मानी जाती है)।",
        "पसली चलने (Chest Indrawing) की जांच करें — सांस लेते समय छाती का निचला हिस्सा अंदर धंसना।",
        "बच्चे को गर्म रखें और सीधा लिटाएं; यदि स्तनपान कर सके तो थोड़ा-थोड़ा दूध पिलाते रहें।",
        "बिना किसी देरी के ऑक्सीजन सुविधा वाले बड़े अस्पताल ले जाएं।"
      ]
    },
    donts: {
      en: [
        "DO NOT give over-the-counter adult cough syrups (can cause respiratory arrest in infants).",
        "DO NOT keep child in a smoky room with burning cow dung cakes (chulha smoke).",
        "DO NOT wait till morning if the child stops drinking fluids or becomes lethargic."
      ],
      hi: [
        "वयस्कों की कफ सिरप छोटे बच्चे को कभी न दें।",
        "बच्चे को चूल्हे या धुएं वाले कमरे में न रखें।",
        "यदि बच्चा सुस्त पड़ जाए या दूध पीना बंद कर दे तो सुबह होने का इंतजार बिल्कुल न करें।"
      ]
    }
  }
];

export const pitchDeckSlides = [
  {
    id: 1,
    title: "1. Problem Statement",
    subtitle: "The Healthcare Divide in Rural India & Developing Regions",
    icon: "AlertTriangle",
    points: [
      {
        heading: "Severe Doctor Deficit (1 : 10,000+)",
        desc: "Over 70% of India's population lives in rural areas, served by under 30% of doctors. Villagers travel 40–50 km over broken roads for basic consultation."
      },
      {
        heading: "Literacy & Medical Language Barrier",
        desc: "Prescriptions and drug strips are printed in English. Handwritten doctor notes are notoriously illegible, resulting in over 40% medication compliance failure."
      },
      {
        heading: "Delayed Emergency Triage",
        desc: "Frontline ASHA workers lack automated decision support. Preventable complications (infant pneumonia, snakebites, dehydration) turn fatal due to delayed escalation."
      }
    ],
    metric: "40%+",
    metricLabel: "Medication non-adherence due to lack of vernacular instructions"
  },
  {
    id: 2,
    title: "2. Who is Affected?",
    subtitle: "Frontline Community Stakeholders & Vulnerable Populations",
    icon: "Users",
    points: [
      {
        heading: "Rural Patients & Daily Wage Earners",
        desc: "Lost daily wages and crippling out-of-pocket transportation costs just to clarify whether a fever requires a hospital visit."
      },
      {
        heading: "1,000,000+ ASHA & ANM Frontline Workers",
        desc: "The backbone of community healthcare. They carry paper registers, have limited diagnostic aids, and bear the burden of door-to-door triage."
      },
      {
        heading: "Primary Health Center (PHC) Doctors",
        desc: "Overwhelmed with non-emergency minor cases while patients with genuine red-flag emergencies arrive too late."
      }
    ],
    metric: "800M+",
    metricLabel: "Rural population dependent on grassroots primary healthcare delivery"
  },
  {
    id: 3,
    title: "3. Solution: ArogyaGram AI",
    subtitle: "Voice-First Vernacular Rural Health Copilot",
    icon: "HeartPulse",
    points: [
      {
        heading: "Voice-First Multilingual Triage",
        desc: "Speak naturally in Hindi/English. Color-codes severity (🟢 Home Care | 🟡 PHC Clinic | 🔴 Red Emergency Ambulance)."
      },
      {
        heading: "Medicine Strip & Prescription Decoder",
        desc: "Camera scan translates complex drug labels into visual dosage schedules (☀️ Morning / 🌙 Night) with native audio playback."
      },
      {
        heading: "Frontline ASHA Referral Token",
        desc: "Generates standardized digital patient summary slips with recorded vitals to eliminate medical history loss during clinic handover."
      },
      {
        heading: "Offline-First Emergency Quickcards",
        desc: "Life-saving protocols for snakebites, heatstroke, and burns that function even with zero internet connectivity."
      }
    ],
    metric: "3x Faster",
    metricLabel: "Frontline triage speed with digital decision support"
  },
  {
    id: 4,
    title: "4. Technology & AI Architecture",
    subtitle: "Built for Low-Bandwidth, Edge-Optimized Rural Delivery",
    icon: "Cpu",
    points: [
      {
        heading: "Google Gemini 2.0 Multimodal API",
        desc: "High-reasoning vernacular NLP + Computer Vision to decipher medicine packaging, dosage text, and clinical symptoms."
      },
      {
        heading: "Edge Clinical Decision Engine",
        desc: "Local deterministic rule trees (based on WHO IMCI & ICMR guidelines) ensuring triage works offline on basic 2G/3G connections."
      },
      {
        heading: "Web Speech API & Audio Synthesis",
        desc: "High-clarity local Hindi and Indian-English voice output for illiterate patients unable to read text."
      },
      {
        heading: "Privacy-Preserving PII Redaction",
        desc: "Zero storage of identifiable patient records; compliant with healthcare data security."
      }
    ],
    metric: "100%",
    metricLabel: "Voice and audio coverage for accessibility"
  },
  {
    id: 5,
    title: "5. Measurable Social Impact",
    subtitle: "Transforming Healthcare Economics & Survival Rates",
    icon: "TrendingUp",
    points: [
      {
        heading: "Eliminates Out-of-Pocket Travel Costs",
        desc: "Saves ₹500–₹1,500 per family per episode by safely triaging mild cases locally rather than booking emergency taxis to city hospitals."
      },
      {
        heading: "Dramatically Reduces Medication Errors",
        desc: "Visual icons and audio timetables ensure rural chronic patients (Diabetes, BP) and children take exact prescribed dosages."
      },
      {
        heading: "Golden Hour Escalation for Emergencies",
        desc: "Guides immediate life-saving first-aid (snakebite stillness, ORS rehydration) while mobilizing 108 ambulance."
      }
    ],
    metric: "₹1,200 Avg",
    metricLabel: "Saved per family in unnecessary travel & diagnostic delays"
  },
  {
    id: 6,
    title: "6. Scalability & Sustainable Roadmap",
    subtitle: "From Web Prototype to Nationwide Grassroots Deployment",
    icon: "Globe",
    points: [
      {
        heading: "Phase 1 (Current MVP): Progressive Web App",
        desc: "Lightweight, zero-install mobile web app testable on any Android phone used by ASHA workers."
      },
      {
        heading: "Phase 2: WhatsApp & Toll-Free IVR Bot",
        desc: "Bring ArogyaGram to basic feature phones via voice call (IVR) and WhatsApp chatbots where internet data is minimal."
      },
      {
        heading: "Phase 3: ABHA / National Digital Health Integration",
        desc: "Integrate with India's Ayushman Bharat Digital Mission (ABHA) IDs and PHC e-Sanjeevani telemedicine kiosks."
      }
    ],
    metric: "Millions",
    metricLabel: "Potential reach via WhatsApp & ASHA networks"
  }
];
