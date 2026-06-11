/*
 * Domain glossary for CT-scanner field service.
 *
 * This vocabulary is heavy and easy to mis-hear. It is fed into BOTH:
 *   1. Deepgram keyword boosting (improves raw transcription), and
 *   2. The Claude system prompt (so assembly knows the in-domain terms and
 *      which ones to flag for review).
 *
 * Extend per-OEM / per-customer over time. Keep entries short and literal.
 */
export const DOMAIN_GLOSSARY: string[] = [
  // Boards / assemblies
  "FRDM board",
  "axial encoder assembly",
  "Jedi board",
  "DAS",
  "gantry",
  "slip ring",
  "collimator",
  "tube",
  "detector",
  "high voltage tank",
  "rotor",
  "stator",
  "PDU",
  "STC",
  "CTA",
  // OEMs / systems
  "GE",
  "Siemens",
  "Philips",
  "Canon",
  "LightSpeed",
  "Revolution",
  "Optima",
  // Common spoken units / phrasing
  "kV",
  "mA",
  "milliamps",
  "kilovolts",
  "axial",
  "helical",
  "recon",
  "calibration",
  "air cal",
  "fast cal",
  // Error-code phrasing (boosts digit-string recognition)
  "Error code",
  "fault",
  "board number",
  "labor hours",
  "travel hours",
];

/**
 * A compact, human-readable glossary string for the Claude system prompt.
 */
export function glossaryPromptBlock(): string {
  return DOMAIN_GLOSSARY.map((t) => `- ${t}`).join("\n");
}
