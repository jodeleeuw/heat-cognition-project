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
 * Get trial objects from global scope
 * This function must be called after all trial definitions are loaded
 * @returns {object} Object containing all trial definitions
 */
function getTrialObjects() {
  // Try to access trials from global scope
  // These are defined as const in other scripts, so we use eval or direct references
  return {
    intro_trial: typeof intro_trial !== 'undefined' ? intro_trial : undefined,
    consent_trial: typeof consent_trial !== 'undefined' ? consent_trial : undefined,
    ip_check: typeof ip_check !== 'undefined' ? ip_check : undefined,
    browser_check: typeof browser_check !== 'undefined' ? browser_check : undefined,
    de_trial: typeof de_trial !== 'undefined' ? de_trial : undefined,
    vulnerability_timeline: typeof vulnerability_timeline !== 'undefined' ? vulnerability_timeline : undefined,
    go_nogo_trial: typeof go_nogo_trial !== 'undefined' ? go_nogo_trial : undefined,
    nback_trial: typeof nback_trial !== 'undefined' ? nback_trial : undefined,
    bart_trial: typeof bart_trial !== 'undefined' ? bart_trial : undefined,
    cpr_trial: typeof cpr_trial !== 'undefined' ? cpr_trial : undefined,
    svo_trials: typeof svo_trials !== 'undefined' ? svo_trials : undefined,
    vams_trial: typeof vams_trial !== 'undefined' ? vams_trial : undefined,
    bpaq_trial: typeof bpaq_trial !== 'undefined' ? bpaq_trial : undefined,
    ac_trial: typeof ac_trial !== 'undefined' ? ac_trial : undefined,
    cce_trial: typeof cce_trial !== 'undefined' ? cce_trial : undefined,
    ccj_trial: typeof ccj_trial !== 'undefined' ? ccj_trial : undefined,
    cca_trial: typeof cca_trial !== 'undefined' ? cca_trial : undefined,
    ccb_trial: typeof ccb_trial !== 'undefined' ? ccb_trial : undefined,
    final_comments_trial: typeof final_comments_trial !== 'undefined' ? final_comments_trial : undefined
  };
}

/**
 * Build a jsPsych timeline for a specific variant
 * This function maps component names to their actual trial objects
 * Note: Trial objects must be defined before calling this function
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

  // Get trial objects from global scope
  const trialObjects = getTrialObjects();

  const timeline = [];

  // Add core survey trials (common to all variants)
  timeline.push(trialObjects.intro_trial);
  timeline.push(trialObjects.consent_trial);
  timeline.push(trialObjects.ip_check);
  timeline.push(trialObjects.browser_check);
  timeline.push(trialObjects.de_trial); // Demographics

  // vulnerability trials
  timeline.push(trialObjects.vulnerability_timeline);

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
        const trial = trialObjects[ref];
        if (trial) {
          timeline.push(trial);
        } else {
          console.warn(`Trial object "${ref}" not found - may not be implemented yet`);
        }
      });
    } else {
      const trial = trialObjects[trialRef];
      if (trial) {
        timeline.push(trial);
      } else {
        console.warn(`Trial object "${trialRef}" not found - may not be implemented yet`);
      }
    }
  });

  // Add final comments trial
  timeline.push(trialObjects.final_comments_trial);

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
