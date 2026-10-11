// AI Service with Triple-Tier Clinical Intelligence:
// 1. Infermedica Clinical Engine (Certified Medical Symptom & Triage API)
// 2. Google Gemini 2.0 Flash Multimodal API (Conversational Multilingual Reasoning)
// 3. Comprehensive Edge Clinical Decision Engine (WHO IMCI & ICMR Guidelines)

import { triageWithInfermedica } from './infermedicaService';

export async function analyzeSymptoms(symptomsText, language = 'en', customApiKey = '', customInfermedica = null) {
  // Check for Infermedica configuration (from arguments, localStorage, or env)
  const infermedicaAppId = (
    customInfermedica?.appId || 
    localStorage.getItem('arogya_infermedica_app_id') || 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_INFERMEDICA_APP_ID) || 
    ''
  ).trim();

  const infermedicaAppKey = (
    customInfermedica?.appKey || 
    localStorage.getItem('arogya_infermedica_app_key') || 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_INFERMEDICA_APP_KEY) || 
    ''
  ).trim();

  const infermedicaUrl = (
    customInfermedica?.baseUrl || 
    localStorage.getItem('arogya_infermedica_url') || 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_INFERMEDICA_URL) || 
    'https://api.infermedica.com/v3'
  ).trim();

  // Tier 1: Try Infermedica Certified Clinical API if credentials are present
  if (infermedicaAppId && infermedicaAppKey) {
    try {
      const infermedicaResult = await triageWithInfermedica({
        text: symptomsText,
        appId: infermedicaAppId,
        appKey: infermedicaAppKey,
        baseUrl: infermedicaUrl,
        language: language
      });

      if (infermedicaResult && infermedicaResult.urgency) {
        return infermedicaResult;
      }
    } catch (err) {
      console.warn("Infermedica clinical call had an issue, routing to secondary engines:", err);
    }
  }

  // Tier 2: Check for Google Gemini 2.0 Flash API Key
  const apiKey = (
    customApiKey || 
    localStorage.getItem('arogya_gemini_key') || 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || 
    ''
  ).trim();

  if (apiKey && apiKey.length > 10) {
    try {
      const systemInstruction = `You are ArogyaGram AI, a clinical decision support system designed for rural frontline health workers (ASHAs) and primary clinics.
CRITICAL SAFETY & TRIAGE RULES:
1. ALWAYS classify severe conditions (such as any Stage 3 or Stage 4 Cancer, tumors, stroke, paralysis, heart attack, severe trauma, organ failure, sepsis, obstetric emergencies, or uncontrolled hemorrhage) as RED (CRITICAL EMERGENCY / TERTIARY CARE REFERRAL). NEVER classify cancer or chronic organ failure as mild!
2. RED = Life-threatening emergencies, advanced malignancies (Cancer), stroke, acute chest pain, infant respiratory distress, severe hemorrhage, snakebite, organ failure, or septic shock. Must refer to District Hospital / Medical College / Regional Cancer Center immediately.
3. YELLOW = Moderate conditions needing clinical evaluation at a Primary Health Center (PHC) within 24 hours (e.g. persistent fever > 3 days, diabetes/BP dysregulation, early stage tumors needing biopsy, moderate dehydration, wounds needing stitches/tetanus, suspected tuberculosis).
4. GREEN = Minor, self-limiting discomforts (e.g. mild common cold without fever, mild farm fatigue, slight superficial scratch).

Analyze the patient symptoms: "${symptomsText}"

Output strict, valid JSON with this exact schema:
{
  "urgency": "GREEN" | "YELLOW" | "RED",
  "urgencyLabel": "Short summary title of urgency level in ${language === 'hi' ? 'Hindi' : 'English'}",
  "observations": ["clinical observation 1 in ${language === 'hi' ? 'Hindi' : 'English'}", "observation 2"],
  "actions": ["action step 1 in ${language === 'hi' ? 'Hindi' : 'English'}", "action step 2", "action step 3"],
  "warningSigns": ["red flag sign 1 in ${language === 'hi' ? 'Hindi' : 'English'}", "red flag sign 2"],
  "speechText": "Empathetic, clear vernacular explanation for the patient or family in ${language === 'hi' ? 'Hindi' : 'English'}"
}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemInstruction }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          if (parsed.urgency) return parsed;
        }
      }
    } catch (e) {
      console.warn("Gemini API request failed. Falling back to edge clinical rule engine.", e);
    }
  }

  // Tier 3: Edge Deterministic Clinical Decision Engine (WHO IMCI & ICMR Guidelines)
  return runComprehensiveClinicalTriage(symptomsText, language);
}

// Comprehensive Edge Clinical Decision Engine
function runComprehensiveClinicalTriage(text, language = 'en') {
  const lower = text.toLowerCase();
  const containsAny = (keywords) => keywords.some(k => lower.includes(k.toLowerCase()));

  // 1. CANCER & ONCOLOGY / ADVANCED TUMOR TRIAGE (CRITICAL RED)
  const cancerKeywords = [
    "cancer", "कैंसर", "carcinoma", "कार्सिनोमा", "tumor", "ट्यूमर", 
    "stage 4", "stage 3", "stage 2", "stage iv", "stage iii", "metastasis", 
    "metastasized", "chemotherapy", "कीमोथेरेपी", "radiation", "malignant", 
    "malignancy", "lymphoma", "leukemia", "ल्यूकेमिया", "लिवर कैंसर", 
    "ब्लड कैंसर", "मुंह का कैंसर", "breast cancer", "oral cancer", "lung cancer"
  ];

  if (containsAny(cancerKeywords)) {
    if (language === 'hi') {
      return {
        urgency: "RED",
        urgencyLabel: "अति गंभीर — तृतीयक ऑन्कोलॉजी / कैंसर विशेषज्ञ रेफरल (RED)",
        observations: [
          "मरीज में गंभीर व उन्नत ऑन्कोलॉजिकल बीमारी (कैंसर / ट्यूमर) के संकेत दर्ज हैं।",
          "यह स्थिति प्राथमिक या सामुदायिक स्तर पर प्रबंधित नहीं हो सकती; इसे तत्काल मेडिकल कॉलेज या क्षेत्रीय कैंसर केंद्र (Regional Cancer Centre) में विशेष जांच और उपचार की आवश्यकता है।",
          "दर्द प्रबंधन (Palliative Pain Management), पोषण एवं कीमोथेरेपी/रेडिएशन परामर्श अत्यंत आवश्यक है।"
        ],
        actions: [
          "मरीज को तत्काल जिला अस्पताल या क्षेत्रीय कैंसर संस्थान (RCC) के ऑन्कोलॉजी विभाग में रेफर करें।",
          "आयुष्मान भारत (PM-JAY) योजना के तहत निशुल्क कैंसर उपचार व जांच के लिए मरीज का गोल्डन कार्ड तैयार कराएं।",
          "मरीज को गंभीर दर्द होने पर डॉक्टर की देखरेख में उपशामक दवाइयां (Palliative Care) दिलवाएं।",
          "गांव में किसी भी अप्रमाणित नीम-हकीम या झाड़-फूंक के चक्कर में कीमती समय बर्बाद न करें।"
        ],
        warningSigns: [
          "असहनीय दर्द, अत्यधिक वजन गिरना (Cachexia) और अत्यधिक कमजोरी",
          "शरीर के किसी भी हिस्से से असामान्य रक्तस्राव या सांस लेने में भारी रुकावट",
          "मरीज का बेहोश होना, भोजन या तरल पदार्थ निगलने में असमर्थ होना"
        ],
        speechText: "सावधान! यह एक अत्यंत गंभीर स्थिति है। कैंसर या उन्नत ट्यूमर का इलाज केवल बड़े मेडिकल कॉलेज या कैंसर अस्पताल में ही संभव है। मरीज को तुरंत विशेषज्ञ डॉक्टर के पास ले जाएं और आयुष्मान भारत योजना का लाभ लें।"
      };
    } else {
      return {
        urgency: "RED",
        urgencyLabel: "CRITICAL — Tertiary Oncology & Palliative Care Escalation (RED)",
        observations: [
          "Advanced oncological disease / suspected malignancy detected in clinical history.",
          "This condition cannot be managed at a primary village health center; it requires specialized oncological staging, multi-disciplinary tumor board review, and systemic therapy.",
          "Active risk of metastasis, severe neuropathic pain, immune compromise, and metabolic distress."
        ],
        actions: [
          "Escalate immediately to the nearest District Hospital, Government Medical College, or Regional Cancer Centre (RCC).",
          "Facilitate registration under the National Ayushman Bharat (PM-JAY) scheme for covered tertiary oncology care.",
          "Initiate clinical palliative care protocol for compassionate pain relief and nutritional support.",
          "Ensure family avoids unverified alternative remedies that delay life-extending medical interventions."
        ],
        warningSigns: [
          "Severe intractable pain, profound cachexia (uncontrolled weight loss), or severe anemia",
          "Spontaneous bleeding, secondary infection, or sudden onset respiratory failure",
          "Altered mental status or bone pain indicating metastatic progression"
        ],
        speechText: "Critical Warning! Advanced oncological conditions require immediate evaluation at a specialized tertiary cancer hospital. Please escort the patient to the district hospital oncology department without delay."
      };
    }
  }

  // 2. CARDIOVASCULAR & STROKE / NEUROLOGICAL EMERGENCIES (RED)
  const cardioNeuroKeywords = [
    "chest pain", "सीने में दर्द", "heart attack", "दिल का दौरा", "angina", 
    "stroke", "लकवा", "पक्षाघात", "paralysis", "seizure", "दौरा", "मिर्गी", "fit", 
    "unconscious", "बेहोश", "fainted", "coma", "slurred speech", "मुंह टेढ़ा", 
    "sudden numbness", "cold sweat", "ठंडा पसीना", "cardiac"
  ];

  if (containsAny(cardioNeuroKeywords)) {
    if (language === 'hi') {
      return {
        urgency: "RED",
        urgencyLabel: "अति गंभीर — हृदय / न्यूरो आपातकाल (RED) तत्काल 108 बुलाएं",
        observations: [
          "सीने में तेज दबाव, सांस रुकना या अचानक लकवा/दौरे के लक्षण दिल के दौरे (Heart Attack) या स्ट्रोक (Brain Stroke) का संकेत देते हैं।",
          "यह गोल्डन ऑवर (पहला 1 घंटा) का मामला है — हर मिनट देरी से जान का खतरा बढ़ता है।"
        ],
        actions: [
          "तुरंत 108 या 102 नंबर डायल करके आपातकालीन एम्बुलेंस बुलाएं।",
          "मरीज को सीधा आराम की स्थिति में रखें, तंग कपड़े तुरंत ढीले करें।",
          "यदि मरीज होश में है और छाती में तेज दर्द है, तो एम्बुलेंस आने तक एस्पिरिन (Aspirin 300mg) चबाने हेतु स्वास्थ्य कार्यकर्ता परामर्श दें।",
          "मरीज को खुद से चलने या सीढ़ियां चढ़ने बिल्कुल न दें।"
        ],
        warningSigns: [
          "मरीज का बेहोश हो जाना या सांस रुकना",
          "चेहरा टेढ़ा होना, एक तरफ का हाथ या पैर सुन्न पड़ जाना",
          "उल्टी के साथ ठंडा पसीना और तेज घबराहट"
        ],
        speechText: "आपातकालीन चेतावनी! यह दिल का दौरा या स्ट्रोक हो सकता है। तुरंत 108 पर एम्बुलेंस बुलाएं और मरीज को आईसीयू सुविधा वाले बड़े अस्पताल ले जाएं।"
      };
    } else {
      return {
        urgency: "RED",
        urgencyLabel: "CRITICAL EMERGENCY — Cardiovascular / Stroke Escalation (RED)",
        observations: [
          "Acute clinical presentation consistent with Myocardial Infarction (Heart Attack) or Cerebrovascular Stroke.",
          "Patient is within the golden hour window where immediate thrombolysis or critical intervention can save life and brain function."
        ],
        actions: [
          "Immediately mobilize 108 / 102 Emergency Ambulance for rapid transport to a cardiac/stroke care center.",
          "Keep the patient in a semi-Fowler's comfortable position and loosen tight garments.",
          "If conscious and not allergic, administer chewable Aspirin (300mg) under medical protocol.",
          "Do NOT allow the patient to walk or exert themselves."
        ],
        warningSigns: [
          "Loss of consciousness, apnea, or cardiac arrest",
          "FAST signs: Facial drooping, Arm weakness, Slurred speech",
          "Profuse diaphoresis (cold clammy sweat) and cyanosis"
        ],
        speechText: "Emergency alert! Symptoms suggest a possible heart attack or stroke. Call the 108 ambulance immediately and transport the patient to a hospital with an emergency ICU."
      };
    }
  }

  // 3. TOXICOLOGY, TRAUMA, BITES & ACUTE OBSTETRIC (RED)
  const acuteTraumaBiteKeywords = [
    "snake", "सांप", "poison", "जहर", "pesticide", "कीटनाशक", "insecticide", 
    "dog bite", "कुत्ता", "rabies", "fracture", "हड्डी टूट", "head injury", 
    "सिर पर चोट", "heavy bleeding", "रक्तस्राव", "vomiting blood", "खून की उल्टी", 
    "labor pain", "प्रसव", "pregnancy bleeding", "गर्भावस्था में खून", "hanging"
  ];

  if (containsAny(acuteTraumaBiteKeywords)) {
    if (language === 'hi') {
      return {
        urgency: "RED",
        urgencyLabel: "अति गंभीर — आपातकालीन विषैला दंश / आघात रेफरल (RED)",
        observations: [
          "विषैला दंश, कीटनाशक सेवन, गंभीर आघात या प्रसवकालीन जटिलता दर्ज हुई है।",
          "एंटी-स्नेक वेनम (ASV), ब्लड ट्रांसफ्यूजन या आपातकालीन सर्जरी की तुरंत जरूरत है।"
        ],
        actions: [
          "बिना 1 मिनट भी गंवाए 108 एम्बुलेंस से नजदीकी सामुदायिक स्वास्थ्य केंद्र (CHC) या जिला अस्पताल ले जाएं।",
          "सांप काटने पर काटे गए अंग को लकड़ी की खपच्ची बांधकर स्थिर रखें, चीरा न लगाएं।",
          "कीटनाशक सेवन में मरीज को जबरन उल्टी न कराएं (फेफड़ों में जहर जाने का खतरा)।",
          "प्रसव या गर्भावस्था में रक्तस्राव होने पर मरीज के पैर थोड़े ऊंचे रखकर लिटाएं।"
        ],
        warningSigns: [
          "मुंह से झाग आना, पुतलियों का सिकुड़ना या फैलना",
          "गहरी बेहोशी या सांस लेने में भारी घरघराहट",
          "काटे गए अंग पर तेजी से सूजन और कालापन पड़ना"
        ],
        speechText: "तत्काल अस्पताल ले जाएं! सांप काटने, जहर या गंभीर चोट में घरेलू इलाज में समय न गंवाएं। सीधा जिला अस्पताल पहुंचे जहां एंटी-वेनम और आईसीयू उपलब्ध हो।"
      };
    } else {
      return {
        urgency: "RED",
        urgencyLabel: "CRITICAL — Acute Trauma, Toxicology & Envenomation (RED)",
        observations: [
          "Acute life threat identified: potential envenomation, organophosphate poisoning, compound trauma, or obstetric hemorrhage.",
          "Requires immediate Anti-Snake Venom (ASV), atropine antidote, surgical stabilization, or blood bank facilities."
        ],
        actions: [
          "Mobilize 108 Emergency Ambulance for immediate transfer to the nearest tertiary center.",
          "For snakebite: immobilize limb with splint, do NOT cut or apply tourniquet.",
          "For pesticide poisoning: remove contaminated clothes, do not induce vomiting.",
          "For obstetric bleeding: maintain lateral tilt, elevate legs, and keep warm."
        ],
        warningSigns: [
          "Respiratory paralysis, frothing at mouth, or constricted pin-point pupils",
          "Rapid hypovolemic shock (feeble pulse, low BP)",
          "Ascending neurotoxicity (ptosis, difficulty swallowing)"
        ],
        speechText: "Immediate hospital escalation required! Rush the patient to the district hospital emergency department for life-saving antivenom or antidote treatment."
      };
    }
  }

  // 4. PEDIATRIC & RESPIRATORY CRITICAL RED FLAGS (RED)
  const pediatricRespiratoryRed = [
    "chest indrawing", "पसली", "infant not feeding", "दूध नहीं पी", "breathless", 
    "सांस फूल", "oxygen", "ऑक्सीजन", "cyanosis", "नीला", "asthma attack", "दमा का दौरा", 
    "drowning", "डूबना", "suffocating", "दम घुट"
  ];

  if (containsAny(pediatricRespiratoryRed) || (containsAny(["child", "बच्चा", "शिशु", "baby", "toddler", "3-year"]) && containsAny(["high fever", "तेज बुखार", "vomiting everything", "उल्टी"]))) {
    if (language === 'hi') {
      return {
        urgency: "RED",
        urgencyLabel: "अति गंभीर — शिशु / बाल आपातकाल (RED)",
        observations: [
          "छोटे बच्चे में गंभीर निमोनिया, निर्जलीकरण (डिहाइड्रेशन) या सांस रुकने के खतरे के लक्षण हैं।",
          "5 वर्ष से कम उम्र के बच्चों में यह स्थिति तेजी से बिगड़ सकती है।"
        ],
        actions: [
          "तत्काल बाल रोग विशेषज्ञ (Pediatrician) या जिला अस्पताल की इमरजेंसी में ले जाएं।",
          "बच्चे को गर्म रखें और सीधा रखें। यदि स्तनपान कर सके तो थोड़ा-थोड़ा दूध पिलाते रहें।",
          "वयस्कों की कफ सिरप या अनजानी गोलियां बिल्कुल न दें।"
        ],
        warningSigns: [
          "पसली चलना (सांस लेते समय छाती अंदर धंसना)",
          "बच्चे का सुस्त पड़ना, जगाने पर भी न जागना",
          "पानी या दूध की एक घूंट भी न रोक पाना"
        ],
        speechText: "चेतावनी! बच्चे में खतरे के लक्षण हैं। तुरंत ऑक्सीजन सुविधा वाले अस्पताल ले जाएं।"
      };
    } else {
      return {
        urgency: "RED",
        urgencyLabel: "CRITICAL — Pediatric Respiratory & Severe Dehydration Emergency (RED)",
        observations: [
          "Severe IMCI danger signs present: chest indrawing, severe respiratory distress, or pediatric dehydration shock.",
          "Under-5 children deteriorate rapidly without supplemental oxygen and pediatric IV hydration."
        ],
        actions: [
          "Escalate immediately to a pediatric emergency ward with oxygen and nebulization facilities.",
          "Keep the infant upright and warm; continue small frequent sips of breastmilk if able to swallow.",
          "Do NOT administer adult over-the-counter cough medicines or sedatives."
        ],
        warningSigns: [
          "Subcostal chest indrawing, stridor, or grunting breathing",
          "Lethargy, limpness, or inability to awaken the infant",
          "Sunken fontanelle with dry tongue and absence of tears"
        ],
        speechText: "Emergency alert! Critical danger signs detected in the child. Please seek immediate pediatric hospital care with oxygen support."
      };
    }
  }

  // 5. MODERATE (YELLOW) — PRIMARY HEALTH CENTER / CHRONIC CLINIC
  const moderateKeywords = [
    "fever", "बुखार", "loose motion", "दस्त", "diarrhea", "vomiting", "उल्टी", 
    "dehydration", "कमजोरी", "diabetes", "sugar", "शुगर", "मधुमेह", "bp", "hypertension", 
    "रक्तचाप", "tb", "टीबी", "cough", "खांसी", "wound", "घाव", "nail", "कील", "cut", 
    "चोट", "jaundice", "पीलिया", "urine infection", "पेशाब में जलन", "swelling", "सूजन", 
    "rash", "दाने", "infection", "संक्रमण", "pain", "दर्द", "ear", "कान"
  ];

  if (containsAny(moderateKeywords)) {
    if (language === 'hi') {
      return {
        urgency: "YELLOW",
        urgencyLabel: "मध्यम स्तर (YELLOW) — 24 घंटे में प्राथमिक स्वास्थ्य केंद्र (PHC) दिखाएं",
        observations: [
          "संक्रमण, डिहाइड्रेशन, घाव या पुरानी बीमारी (डायबिटीज/बीपी) में असंतुलन के लक्षण हैं।",
          "प्राथमिक स्वास्थ्य केंद्र में डॉक्टर द्वारा जांच, खून/पेशाब टेस्ट या दवा की खुराक तय करना आवश्यक है।"
        ],
        actions: [
          "आज ही प्राथमिक स्वास्थ्य केंद्र (PHC) या उप-केंद्र में डॉक्टर/एएनएम को दिखाएं।",
          "यदि उल्टी/दस्त है, तो उबले हुए पानी में ओआरएस (ORS) घोल बनाकर लगातार पिलाएं।",
          "बुखार में गीले सूती कपड़े से माथे व बदन पर पट्टी रखें (Tepid Sponging)।",
          "घाव या लोहे की कील लगने पर डेटॉल/साबुन से धोएं और टिटनेस का इंजेक्शन लगवाएं।"
        ],
        warningSigns: [
          "बुखार 103°F से अधिक बढ़ जाना या कंपकंपी न रुकना",
          "दिन में 6 से अधिक बार पतले दस्त होना और 8 घंटे तक पेशाब न आना",
          "घाव में तेज सूजन, लाली या मवाद बनना"
        ],
        speechText: "स्थिति मध्यम गंभीर है। घरेलू प्राथमिक देखभाल शुरू करें और अगले 24 घंटे के भीतर प्राथमिक स्वास्थ्य केंद्र में डॉक्टर को जरूर दिखाएं।"
      };
    } else {
      return {
        urgency: "YELLOW",
        urgencyLabel: "Moderate (YELLOW) — Primary Health Center (PHC) Visit Required",
        observations: [
          "Clinical symptoms indicating ongoing bacterial/viral infection, metabolic fluctuation, or traumatic lesion.",
          "Requires physical examination, diagnostic blood work (malaria/dengue/CBC), or prescription adjustment at the PHC."
        ],
        actions: [
          "Visit the local Primary Health Center (PHC) or Community Health Center within 24 hours.",
          "Start oral rehydration solution (ORS) immediately for any gastrointestinal fluid losses.",
          "Perform tepid sponging for fevers exceeding 101°F.",
          "Clean any farmland cuts with soap and water and receive a Tetanus Toxoid booster."
        ],
        warningSigns: [
          "Persistent high-grade fever > 103°F unresponsive to paracetamol",
          "Severe dehydration (no urine for >8 hours, dizziness on standing)",
          "Spreading cellulitis, purulent discharge, or localized severe swelling"
        ],
        speechText: "The symptoms require clinical attention. Start supportive home hydration and visit your local Primary Health Center within 24 hours."
      };
    }
  }

  // 6. MILD (GREEN) — HOME CARE & ASHA SUPERVISION
  if (language === 'hi') {
    return {
      urgency: "GREEN",
      urgencyLabel: "सामान्य (GREEN) — घरेलू देखभाल एवं आराम पर्याप्त है",
      observations: [
        "गंभीर खतरे या आपातकाल के कोई लक्षण नहीं पाए गए हैं।",
        "मौसमी बदलाव, सामान्य थकान या हल्का अपच प्रतीत होता है।"
      ],
      actions: [
        "मरीज को भरपूर आराम करने दें और हल्का, सुपाच्य ताजा भोजन दें।",
        "स्वच्छ उबला हुआ पानी, नींबू पानी या दाल का पानी पर्याप्त मात्रा में पिलाएं।",
        "आशा कार्यकर्ता से संपर्क बनाए रखें यदि लक्षण 48 घंटे में ठीक न हों।"
      ],
      warningSigns: [
        "लक्षणों का अचानक तेज होना या नया तेज दर्द शुरू होना",
        "तेज बुखार (101°F से ऊपर) या लगातार उल्टियां शुरू होना"
      ],
      speechText: "स्थिति सामान्य है। भरपूर आराम और पर्याप्त पानी दें। यदि दो दिन में आराम न मिले तो आशा कार्यकर्ता से मिलें।"
    };
  } else {
    return {
      urgency: "GREEN",
      urgencyLabel: "Mild (GREEN) — Home Care & Hydration Supervised by ASHA",
      observations: [
        "No acute danger signs detected. Symptoms are characteristic of a mild, self-limiting seasonal condition or physical fatigue.",
        "Safe for initial home-based monitoring under frontline health worker oversight."
      ],
      actions: [
        "Ensure adequate hydration with clean boiled water, herbal teas, or clear broths.",
        "Encourage rest and light, wholesome home-cooked nutrition.",
        "Re-evaluate with the local ASHA worker if discomfort persists beyond 48 hours."
      ],
      warningSigns: [
        "Sudden escalation to high-grade fever with rigors",
        "Inability to tolerate liquids or onset of respiratory difficulty"
      ],
      speechText: "The symptoms appear mild and manageable at home. Ensure proper rest and fluids. Contact your ASHA worker if symptoms do not improve."
    };
  }
}
