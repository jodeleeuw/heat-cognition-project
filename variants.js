// Study variants configuration
// Based on survey_variants_N2000_25variants.csv

const VARIANTS = [
  { variant: 1, components: ["Go/No-Go", "BPAQ", "Attention Cog"] },
  { variant: 2, components: ["Go/No-Go", "Climate Emotions", "Climate Justice"] },
  { variant: 3, components: ["Go/No-Go", "VAMS", "BPAQ", "Climate Emotions"] },
  { variant: 4, components: ["Go/No-Go", "Policy+Events"] },
  { variant: 5, components: ["Go/No-Go", "CPR", "VAMS"] },
  { variant: 6, components: ["Go/No-Go", "SVO Task", "BPAQ"] },
  { variant: 7, components: ["Go/No-Go", "SVO Task", "Climate Emotions"] },
  { variant: 8, components: ["Go/No-Go", "VAMS", "Attention Cog", "Climate Justice"] },
  { variant: 9, components: ["N-back", "VAMS", "Attention Cog"] },
  { variant: 10, components: ["N-back", "BPAQ", "Climate Emotions"] },
  { variant: 11, components: ["N-back", "Climate Justice", "BPAQ"] },
  { variant: 12, components: ["N-back", "Policy+Events"] },
  { variant: 13, components: ["N-back", "CPR", "VAMS"] },
  { variant: 14, components: ["N-back", "SVO Task", "BPAQ"] },
  { variant: 15, components: ["N-back", "SVO Task", "Climate Justice"] },
  { variant: 16, components: ["N-back", "VAMS", "Climate Emotions", "Attention Cog"] },
  { variant: 17, components: ["BART", "VAMS", "BPAQ", "Attention Cog", "Climate Emotions", "Climate Justice"] },
  { variant: 18, components: ["BART", "Policy+Events", "BPAQ", "Attention Cog", "Climate Emotions"] },
  { variant: 19, components: ["BART", "CPR", "VAMS", "Attention Cog"] },
  { variant: 20, components: ["BART", "CPR", "BPAQ", "Climate Emotions"] },
  { variant: 21, components: ["BART", "CPR", "Policy+Events"] },
  { variant: 22, components: ["BART", "SVO Task", "Policy+Events", "BPAQ"] },
  { variant: 23, components: ["BART", "SVO Task", "VAMS", "Attention Cog", "Climate Emotions"] },
  { variant: 24, components: ["BART", "SVO Task", "BPAQ", "Climate Justice"] },
  { variant: 25, components: ["CPR", "SVO Task", "Policy+Events", "VAMS", "BPAQ", "Attention Cog", "Climate Emotions", "Climate Justice"] }
];

// Component name to trial object mapping
const COMPONENT_MAP = {
  "Go/No-Go": "go_nogo_trial",
  "N-back": "nback_trial",
  "BART": "bart_trial",
  "CPR": "cpr_trial",
  "SVO Task": "svo_trials",
  "VAMS": "vams_trial",
  "BPAQ": "bpaq_trial",
  "Attention Cog": "ac_trial",
  "Climate Emotions": "cce_trial",
  "Climate Justice": "ccj_trial",
  "Policy+Events": ["cca_trial", "ccb_trial"] // Combined component
};

/**
 * Get the configuration for a specific variant
 * @param {number} variantNumber - Variant number (1-25)
 * @returns {object|null} Variant configuration or null if not found
 */
function getVariant(variantNumber) {
  return VARIANTS.find(v => v.variant === variantNumber) || null;
}

/**
 * Build a jsPsych timeline for a specific variant
 * This function maps component names to their actual trial objects
 * Note: Trial objects must be defined in the global scope before calling this function
 *
 * @param {number} variantNumber - Variant number (1-25)
 * @returns {Array} Array of trial objects for the variant, or empty array if variant not found
 */
function buildVariantTimeline(variantNumber) {
  const variant = getVariant(variantNumber);

  if (!variant) {
    console.error(`Variant ${variantNumber} not found`);
    return [];
  }

  const timeline = [];

  // Add core survey trials (common to all variants)
  // These should be added by the main experiment file before variant-specific components
  timeline.push(intro_trial);
  timeline.push(consent_trial);
  timeline.push(ip_check);
  timeline.push(browser_check);
  timeline.push(de_trial); // Demographics

  // vulnerability trials
  timeline.push(vulnerability_timeline)

  // Add variant-specific components
  variant.components.forEach(componentName => {
    const trialRef = COMPONENT_MAP[componentName];

    if (!trialRef) {
      console.warn(`Component "${componentName}" not found in COMPONENT_MAP`);
      return;
    }

    // Handle combined components (arrays)
    if (Array.isArray(trialRef)) {
      trialRef.forEach(ref => {
        const trial = window[ref];
        if (trial) {
          timeline.push(trial);
        } else {
          console.warn(`Trial object "${ref}" not found in global scope`);
        }
      });
    } else {
      const trial = window[trialRef];
      if (trial) {
        timeline.push(trial);
      } else {
        console.warn(`Trial object "${trialRef}" not found in global scope`);
      }
    }
  });

  return timeline;
}

/**
 * Get a list of all component names used in a variant
 * @param {number} variantNumber - Variant number (1-25)
 * @returns {Array<string>} Array of component names
 */
function getVariantComponents(variantNumber) {
  const variant = getVariant(variantNumber);
  return variant ? variant.components : [];
}

/**
 * Get the number of available variants
 * @returns {number} Total number of variants
 */
function getVariantCount() {
  return VARIANTS.length;
}
