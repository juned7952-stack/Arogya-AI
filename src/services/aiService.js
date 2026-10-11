// AI Service with dual-mode: Gemini 2.0 Live API + Offline Clinical Engine Fallback

export async function analyzeSymptoms(symptomsText, language = 'en', apiKey = '') {
  // If user provides a Gemini API key, use live Gemini 2.0 Flash
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt = `You are ArogyaGram AI, a frontline rural clinic triage assistant for community health workers (ASHAs) and villagers.
Analyze the following patient symptoms:
"${symptomsText}"

Respond strictly in valid JSON with this exact structure:
{
  "urgency": "GREEN" | "YELLOW" | "RED",
  "urgencyLabel": "Short summary title of urgency level in ${language === 'hi' ? 'Hindi' : 'English'}",
  "observations": ["observation 1 in ${language === 'hi' ? 'Hindi' : 'English'}", "observation 2"],
  "actions": ["action step 1 in ${language === 'hi' ? 'Hindi' : 'English'}", "action step 2", "action step 3"],
  "warningSigns": ["red flag sign 1 in ${language === 'hi' ? 'Hindi' : 'English'}", "red flag sign 2"],
  "speechText": "Clear conversational spoken explanation for illiterate patients in ${language === 'hi' ? 'Hindi' : 'English'}"
}
GREEN = Mild issue, home hydration/rest, ASHA monitoring.
YELLOW = Moderate issue, needs Primary Health Center (PHC) visit within 24 hours.
RED = Emergency, life threatening (chest pain, severe dehydration in infant, snakebite, unconsciousness, severe wound), rush to District Hospital / Call 108.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          return JSON.parse(rawJson);
        }
      }
    } catch (e) {
      console.warn("Gemini API call failed, falling back to local clinical engine", e);
    }
  }

  // Built-in Deterministic Clinical Decision Tree (100% Offline-capable)
  return runOfflineClinicalTriage(symptomsText, language);
}

function runOfflineClinicalTriage(text, language = 'en') {
  const lower = text.toLowerCase();

  // 1. CRITICAL EMERGENCY (RED) TRIGGERS
  const isEmergency = 
    lower.includes("chest") || lower.includes("सीना") || lower.includes("दिल") ||
    lower.includes("breath") || lower.includes("सांस") || lower.includes("दमा") ||
    lower.includes("unconscious") || lower.includes("बेहोश") ||
    lower.includes("snake") || lower.includes("सांप") ||
    lower.includes("poison") || lower.includes("जहर") || lower.includes("कीटनाशक") ||
    (lower.includes("baby") || lower.includes("बच्चा") || lower.includes("शिशु") || lower.includes("infant") || lower.includes("3-year") || lower.includes("child")) && (lower.includes("vomit") || lower.includes("उल्टी") || lower.includes("high fever") || lower.includes("102"));

  if (isEmergency) {
    if (language === 'hi') {
      return {
        urgency: "RED",
        urgencyLabel: "अति गंभीर आपातकाल (RED) — तत्काल 108 एम्बुलेंस बुलाएं",
        observations: [
          "गंभीर जीवन-रक्षक आपातकालीन लक्षण पाए गए हैं।",
          "यह स्थिति गांव या प्राथमिक स्तर पर ठीक नहीं की जा सकती, विशेष गहन चिकित्सा की आवश्यकता है।"
        ],
        actions: [
          "बिना समय गंवाए 108 या 102 नंबर पर फोन करके एम्बुलेंस बुलाएं।",
          "मरीज को सीधा और आरामदायक स्थिति में लिटाएं, कपड़े ढीले करें।",
          "यदि सांस लेने में तकलीफ या सीने में दर्द है तो मरीज को चलने न दें।",
          "पास के जिला अस्पताल या सामुदायिक स्वास्थ्य केंद्र (CHC) में तुरंत ले जाएं।"
        ],
        warningSigns: [
          "मरीज का सुस्त पड़ना या बेहोश होना",
          "होंठ या नाखून नीले पड़ना (ऑक्सीजन की भारी कमी)",
          "लगातार उल्टियां होना और मुंह से कुछ भी न ले पाना"
        ],
        speechText: "सावधान! यह एक अति गंभीर आपातकालीन स्थिति है। मरीज को तुरंत जिला अस्पताल ले जाएं या 108 नंबर पर एम्बुलेंस बुलाएं। खुद से कोई दवा न दें।"
      };
    } else {
      return {
        urgency: "RED",
        urgencyLabel: "CRITICAL EMERGENCY (RED) — Immediate Hospital Escalation",
        observations: [
          "High-risk clinical symptoms detected indicating potential cardiovascular, severe respiratory, or pediatric distress.",
          "Patient requires emergency oxygen, IV fluids, or critical care unavailable at the village sub-center."
        ],
        actions: [
          "Immediately call 108 / 102 Emergency Ambulance.",
          "Keep patient in a comfortable, semi-propped position; loosen tight clothing.",
          "Do NOT force heavy solid food or non-prescribed oral medications.",
          "Escalate immediately to the nearest District Hospital / CHC with oxygen facilities."
        ],
        warningSigns: [
          "Loss of consciousness or severe confusion",
          "Bluish discoloration of lips or fingernails",
          "Inability of child to drink fluids or chest indrawing"
        ],
        speechText: "Warning! This is a critical medical emergency. Please call 108 ambulance or transport the patient to the nearest district hospital immediately."
      };
    }
  }

  // 2. MODERATE / PHC VISIT (YELLOW) TRIGGERS
  const isModerate = 
    lower.includes("fever") || lower.includes("बुखार") ||
    lower.includes("loose motion") || lower.includes("दस्त") || lower.includes("diarrhea") ||
    lower.includes("nail") || lower.includes("कील") || lower.includes("cut") || lower.includes("चोट") || lower.includes("घाव") ||
    lower.includes("pain") || lower.includes("दर्द") || lower.includes("cough") || lower.includes("खांसी");

  if (isModerate) {
    if (language === 'hi') {
      return {
        urgency: "YELLOW",
        urgencyLabel: "मध्यम स्तर (YELLOW) — प्राथमिक स्वास्थ्य केंद्र (PHC) में डॉक्टर को दिखाएं",
        observations: [
          "संक्रमण, डिहाइड्रेशन या चोट के लक्षण मौजूद हैं जिन्हें 24 घंटे के भीतर डॉक्टर या नर्स को दिखाना आवश्यक है।",
          "घाव होने पर टिटनेस (Tetanus) इंजेक्शन की आवश्यकता हो सकती है।"
        ],
        actions: [
          "आज ही पास के प्राथमिक स्वास्थ्य केंद्र (PHC) या उप-केंद्र पर जाकर जांच करवाएं।",
          "यदि दस्त या उल्टी है, तो उबले हुए पानी में ओआरएस (ORS) घोल बनाकर थोड़ा-थोड़ा पिलाते रहें।",
          "बुखार होने पर गीले साफ कपड़े से माथे और शरीर पर पट्टियां रखें।",
          "जंग लगी कील या चोट लगने पर घाव को साफ पानी और साबुन से धोएं, टिटनेस का टीका लगवाएं।"
        ],
        warningSigns: [
          "बुखार 103°F से अधिक बढ़ जाना या कंपकंपी न रुकना",
          "दिन में 6 से अधिक बार पतले दस्त होना और पेशाब बंद होना",
          "घाव में तेज सूजन, लाली या मवाद बनना"
        ],
        speechText: "मरीज की स्थिति मध्यम गंभीर है। घरेलू प्राथमिक उपचार शुरू करें और अगले 24 घंटों में प्राथमिक स्वास्थ्य केंद्र में डॉक्टर को जरूर दिखाएं।"
      };
    } else {
      return {
        urgency: "YELLOW",
        urgencyLabel: "Moderate (YELLOW) — Primary Health Center (PHC) Visit Required",
        observations: [
          "Active symptoms of persistent infection, moderate fluid loss, or traumatic puncture wound detected.",
          "Requires clinical evaluation, malaria/dengue blood smear, or tetanus toxoid administration within 24 hours."
        ],
        actions: [
          "Visit the local Primary Health Center (PHC) or village sub-centre today.",
          "Initiate oral rehydration with clean ORS water for any fluid loss.",
          "Perform tepid sponging with normal room-temperature water if fever is above 101°F.",
          "Wash any farm cuts or nail punctures with clean soap water and check tetanus status."
        ],
        warningSigns: [
          "Fever spiking over 103°F with persistent rigors",
          "Absence of urination for more than 8 hours (severe dehydration)",
          "Rapid spreading redness or pus around wound"
        ],
        speechText: "The patient has moderate symptoms. Please start initial home hydration and visit the nearest Primary Health Center within 24 hours."
      };
    }
  }

  // 3. MILD / HOME CARE (GREEN)
  if (language === 'hi') {
    return {
      urgency: "GREEN",
      urgencyLabel: "सामान्य (GREEN) — घरेलू देखभाल एवं आराम पर्याप्त है",
      observations: [
        "गंभीर खतरे के कोई लक्षण नहीं पाए गए हैं।",
        "मौसमी बदलाव, सामान्य थकान या हल्का अपच प्रतीत होता है।"
      ],
      actions: [
        "मरीज को भरपूर आराम करने दें और हल्का, सुपाच्य ताजा भोजन दें।",
        "स्वच्छ उबला हुआ पानी, नींबू पानी या दाल का पानी पर्याप्त मात्रा में पिलाएं।",
        "आशा कार्यकर्ता से संपर्क बनाए रखें यदि लक्षण 48 घंटे में ठीक न हों।"
      ],
      warningSigns: [
        "लक्षणों का अचानक तेज होना",
        "तेज बुखार या लगातार उल्टियां शुरू होना"
      ],
      speechText: "स्थिति सामान्य है। मरीज को भरपूर आराम और पर्याप्त तरल पदार्थ दें। आशा कार्यकर्ता की देखरेख में रहें।"
    };
  } else {
    return {
      urgency: "GREEN",
      urgencyLabel: "Mild (GREEN) — Home Care & Hydration Supervised by ASHA",
      observations: [
        "No acute red-flag symptoms detected. Likely mild seasonal discomfort, fatigue, or self-limiting viral episode.",
        "Can be managed safely at home with basic supportive measures."
      ],
      actions: [
        "Ensure plentiful clean fluids (boiled water, clear soups, coconut water).",
        "Encourage bed rest and fresh, light home-cooked meals.",
        "Monitor temperature and notify the local ASHA worker if symptoms worsen after 48 hours."
      ],
      warningSigns: [
        "Sudden escalation to high fever with shivering",
        "Inability to retain any liquids"
      ],
      speechText: "The symptoms appear mild. Ensure plenty of fluids, wholesome light food, and rest. Consult your ASHA worker if symptoms do not improve in two days."
    };
  }
}
