// Infermedica Clinical Engine Integration Service

export async function triageWithInfermedica({
  text,
  appId,
  appKey,
  baseUrl = "https://api.infermedica.com/v3",
  language = "en",
  age = 35,
  sex = "female"
}) {
  if (!appId || !appKey) {
    throw new Error("Missing Infermedica App-Id or App-Key");
  }

  const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

  // 1. Call /v3/parse to identify clinical mentions (symptoms, conditions) from user text
  const parseRes = await fetch(`${cleanBaseUrl}/parse`, {
    method: "POST",
    headers: {
      "App-Id": appId.trim(),
      "App-Key": appKey.trim(),
      "Content-Type": "application/json",
      "Model": "infermedica-en"
    },
    body: JSON.stringify({
      text: text,
      age: { value: age }
    })
  });

  if (!parseRes.ok) {
    const errorText = await parseRes.text();
    throw new Error(`Infermedica /parse error (${parseRes.status}): ${errorText}`);
  }

  const parseData = await parseRes.json();
  const mentions = parseData.mentions || [];

  if (mentions.length === 0) {
    // If no specific Infermedica concept was matched, return null to allow fallback
    return null;
  }

  // 2. Prepare evidence payload for /v3/triage
  const evidence = mentions.map((m) => ({
    id: m.id,
    choice_id: m.choice_id || "present",
    source: "initial"
  }));

  // 3. Call /v3/triage to compute clinically certified urgency level
  const triageRes = await fetch(`${cleanBaseUrl}/triage`, {
    method: "POST",
    headers: {
      "App-Id": appId.trim(),
      "App-Key": appKey.trim(),
      "Content-Type": "application/json",
      "Model": "infermedica-en"
    },
    body: JSON.stringify({
      sex: sex,
      age: { value: age },
      evidence: evidence
    })
  });

  if (!triageRes.ok) {
    const errorText = await triageRes.text();
    throw new Error(`Infermedica /triage error (${triageRes.status}): ${errorText}`);
  }

  const triageData = await triageRes.json();
  const level = (triageData.triage_level || "").toLowerCase();

  // Map Infermedica triage level to ArogyaGram 3-tier system
  let urgency = "YELLOW";
  if (level.includes("emergency") || level.includes("ambulance")) {
    urgency = "RED";
  } else if (level === "self_care") {
    urgency = "GREEN";
  } else {
    urgency = "YELLOW";
  }

  const detectedNames = mentions.map(m => m.common_name || m.name);

  // Return formatted clinical object compatible with ArogyaGram UI
  if (language === "hi") {
    return {
      urgency,
      source: "Infermedica Clinical Engine",
      urgencyLabel: urgency === "RED" 
        ? "अति गंभीर आपातकाल (RED) — इन्फरमेडिका क्लिनिकल इंजन" 
        : urgency === "YELLOW"
        ? "मध्यम गंभीरता (YELLOW) — इन्फरमेडिका क्लिनिकल इंजन"
        : "सामान्य (GREEN) — इन्फरमेडिका क्लिनिकल इंजन",
      observations: [
        `इन्फरमेडिका मेडिकल AI द्वारा पहचाने गए लक्षण: ${detectedNames.join(", ")}।`,
        triageData.description || `क्लिनिकल ट्राइएज स्तर: ${triageData.label || triageData.triage_level}`
      ],
      actions: [
        urgency === "RED" 
          ? "तत्काल 108 एम्बुलेंस या नजदीकी बड़े अस्पताल के आपातकालीन वार्ड में जाएं।"
          : urgency === "YELLOW"
          ? "24 घंटे के भीतर प्राथमिक स्वास्थ्य केंद्र (PHC) में डॉक्टर को दिखाएं।"
          : "पर्याप्त तरल पदार्थ, आराम और घरेलू देखभाल जारी रखें।",
        "दवाएं केवल अधिकृत चिकित्सक की सलाह से ही लें।"
      ],
      warningSigns: (triageData.serious_symptoms || []).map(s => s.name || s) || [
        "लक्षणों का अचानक तेज होना",
        "सांस लेने में गंभीर परेशानी या तेज दर्द"
      ],
      speechText: urgency === "RED"
        ? "इन्फरमेडिका मेडिकल सिस्टम के अनुसार यह एक गंभीर आपातकाल है। मरीज को तुरंत अस्पताल ले जाएं।"
        : "इन्फरमेडिका मेडिकल विश्लेषण के अनुसार स्थिति को 24 घंटे में डॉक्टर को दिखाना जरूरी है।"
    };
  } else {
    return {
      urgency,
      source: "Infermedica Clinical Engine",
      urgencyLabel: urgency === "RED"
        ? "CRITICAL EMERGENCY (RED) — Infermedica Clinical Engine"
        : urgency === "YELLOW"
        ? "Moderate Triage (YELLOW) — Infermedica Clinical Engine"
        : "Mild Home Care (GREEN) — Infermedica Clinical Engine",
      observations: [
        `Identified Clinical Mentions: ${detectedNames.join(", ")}.`,
        triageData.description || `Assessment Level: ${triageData.label || triageData.triage_level}`
      ],
      actions: [
        urgency === "RED"
          ? "Escalate immediately to emergency hospital ward or call 108 ambulance."
          : urgency === "YELLOW"
          ? "Schedule physical evaluation at Primary Health Center (PHC) within 24 hours."
          : "Safe for home monitoring with adequate hydration and rest.",
        "Ensure patient vitals are monitored by the local ASHA worker."
      ],
      warningSigns: (triageData.serious_symptoms || []).map(s => s.name || s) || [
        "Rapid onset of severe dyspnea, pain, or altered consciousness"
      ],
      speechText: urgency === "RED"
        ? "Infermedica clinical intelligence has classified this as an emergency. Immediate medical escalation is required."
        : "Infermedica assessment suggests clinical consultation is needed within 24 hours."
    };
  }
}
