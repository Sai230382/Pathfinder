// industryIntelligence.js — Pathfinder Industry & Horizontal Intelligence Layer
// Provides: regulations, segment score adjusters, benchmarks, insights
// Loaded AFTER recommendation-engine.js

// ─────────────────────────────────────────────────────────────────
// INDUSTRY INTELLIGENCE — 6 industries
// segmentAdjusters: MULTIPLIERS on base offshoreAffinity / automationPotential
//   1.00 = no change, 0.80 = 20% reduction, 1.15 = 15% boost (capped 0–1)
// regulations: severity 'warning' | 'info'
//   affectedCountries: [] = applies to all offshore selections
// ─────────────────────────────────────────────────────────────────
const INDUSTRY_INTELLIGENCE = {

  healthcare: {
    label: 'Healthcare',
    icon: '🏥',
    regulations: [
      {
        name: 'HIPAA / PHI',
        description: 'Protected Health Information requires HIPAA-compliant BAA agreements before offshoring PHI-touching work.',
        severity: 'warning',
        affectedCountries: ['IN', 'PH', 'EG', 'CO', 'MX'],
        prompt: 'Ensure Business Associate Agreement (BAA) is signed with offshore vendor — PHI without BAA is a federal violation.'
      },
      {
        name: 'State Data Residency',
        description: 'Several US states (CA, NY, TX) require patient data to remain within US jurisdiction.',
        severity: 'warning',
        affectedCountries: ['IN', 'PH', 'MX', 'CO', 'EG'],
        prompt: 'Confirm client data residency requirements — may restrict non-US destinations for account and clinical work.'
      }
    ],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 0.85, automationPotential: 1.10 }, // PHI concern on billing; billing automation mature
      techSupport:    { offshoreAffinity: 0.75, automationPotential: 0.85 }, // Clinical knowledge barrier; complex queries
      accountMgmt:    { offshoreAffinity: 0.80, automationPotential: 0.95 }, // PHI-sensitive account activity
      salesRetention: { offshoreAffinity: 1.00, automationPotential: 1.00 }, // Sales less regulated
      orderMgmt:      { offshoreAffinity: 0.90, automationPotential: 1.15 }, // Rx/prior-auth processing automatable
      generalInquiry: { offshoreAffinity: 1.00, automationPotential: 1.05 }
    },
    benchmarks: {
      costPerContact: { low: 3.50, high: 8.00 },
      offshoreAdoption: '30–45%',
      headline: 'Healthcare offshore growing but remains compliance-gated; billing & coding lead adoption.'
    },
    insights: [
      'Billing & coding is the most mature offshore segment — 60%+ of US providers already offshore this work.',
      'HIPAA BAA agreements add 4–8 weeks to vendor onboarding timelines.',
      'Clinical knowledge requirements increase training investment by 25–40% vs. standard BPO.',
      'Voice channels for clinical queries face higher patient skepticism — digital preferred.',
      'RCM (Revenue Cycle Management) is a proven high-volume offshore opportunity in Healthcare.'
    ]
  },

  financial_services: {
    label: 'Banking & Financial Services',
    icon: '🏦',
    regulations: [
      {
        name: 'GDPR',
        description: 'EU client data has strict transfer restrictions outside the EEA — Standard Contractual Clauses required.',
        severity: 'warning',
        affectedCountries: ['IN', 'PH', 'MX', 'CO', 'EG'],
        prompt: 'EU-origin operations require GDPR-compliant data transfer mechanisms (SCCs or BCRs) before offshore processing.'
      },
      {
        name: 'PCI-DSS',
        description: 'Card payment data must be handled only in PCI Level 1 certified environments.',
        severity: 'warning',
        affectedCountries: ['EG', 'CO', 'MX'],
        prompt: 'Verify PCI-DSS Level 1 certification at offshore vendor before routing any billing or payment work.'
      },
      {
        name: 'FCA / OCC Third-Party Risk',
        description: 'Regulated entities must maintain governance and operational resilience over all outsourced activities.',
        severity: 'info',
        affectedCountries: [],
        prompt: 'Build third-party risk management framework — regulators expect documented oversight regardless of offshore location.'
      }
    ],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 0.85, automationPotential: 1.10 }, // PCI concern; automation mature in payments
      techSupport:    { offshoreAffinity: 0.95, automationPotential: 1.00 }, // Proven offshore tech support in BFS
      accountMgmt:    { offshoreAffinity: 0.85, automationPotential: 1.00 }, // KYC/AML sensitivity
      salesRetention: { offshoreAffinity: 0.80, automationPotential: 0.90 }, // Regulated sales; vulnerable customers
      orderMgmt:      { offshoreAffinity: 0.90, automationPotential: 1.15 }, // Transaction processing automatable
      generalInquiry: { offshoreAffinity: 1.00, automationPotential: 1.00 }
    },
    benchmarks: {
      costPerContact: { low: 2.50, high: 6.00 },
      offshoreAdoption: '55–70%',
      headline: 'Most mature offshore sector — India and Philippines dominate global BFS BPO.'
    },
    insights: [
      'BFS is the most mature offshore vertical — India hosts 40%+ of global BFS BPO volume.',
      'PCI-DSS Level 1 certification is non-negotiable for card and payment processing.',
      'Complaints and vulnerable customer handling are increasingly retained onshore under FCA pressure.',
      'Automation ROI is highest in billing, account management, and transaction processing.',
      'Nearshore (Poland, Romania) increasingly preferred for EU GDPR-sensitive workloads.'
    ]
  },

  retail: {
    label: 'Retail',
    icon: '🛒',
    regulations: [
      {
        name: 'CCPA',
        description: 'California Consumer Privacy Act restricts use and transfer of California resident data.',
        severity: 'info',
        affectedCountries: ['IN', 'PH', 'MX', 'CO'],
        prompt: 'Ensure CCPA-compliant data handling procedures are contractually required at offshore site.'
      }
    ],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 1.00, automationPotential: 1.10 }, // Straightforward; automatable
      techSupport:    { offshoreAffinity: 0.90, automationPotential: 1.05 }, // Product knowledge trainable
      accountMgmt:    { offshoreAffinity: 1.00, automationPotential: 1.00 },
      salesRetention: { offshoreAffinity: 0.85, automationPotential: 0.95 }, // Brand voice important in retail
      orderMgmt:      { offshoreAffinity: 1.00, automationPotential: 1.20 }, // Highest automation in retail
      generalInquiry: { offshoreAffinity: 1.00, automationPotential: 1.10 }
    },
    benchmarks: {
      costPerContact: { low: 1.80, high: 4.50 },
      offshoreAdoption: '60–75%',
      headline: 'Retail is highly offshore-friendly with strong order management automation potential.'
    },
    insights: [
      'Order management is the #1 automation opportunity — chatbot deflection of 50–65% is achievable.',
      'Peak season scaling is a primary offshore benefit — elastic capacity without permanent headcount.',
      'Returns and complaints handling may benefit from nearshore due to emotional complexity.',
      'Philippines leads for omnichannel CX (voice + digital) due to cultural alignment with US/AU.',
      'AI-powered product recommendation during service calls can convert service into sales.'
    ]
  },

  telecom: {
    label: 'Communications, Media & Technology',
    icon: '📡',
    regulations: [
      {
        name: 'GDPR / ePrivacy',
        description: 'EU telecom subscriber data has strict cross-border transfer requirements under GDPR and ePrivacy Directive.',
        severity: 'warning',
        affectedCountries: ['IN', 'PH', 'MX', 'CO'],
        prompt: 'EU subscriber data requires Standard Contractual Clauses — document lawful transfer basis before offshore go-live.'
      }
    ],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 1.00, automationPotential: 1.10 }, // Bill disputes highly automatable
      techSupport:    { offshoreAffinity: 1.05, automationPotential: 0.90 }, // Offshore proven; complexity resists automation
      accountMgmt:    { offshoreAffinity: 1.00, automationPotential: 1.00 },
      salesRetention: { offshoreAffinity: 0.90, automationPotential: 0.85 }, // Churn management needs empathy
      orderMgmt:      { offshoreAffinity: 1.00, automationPotential: 1.15 }, // Provisioning automation strong
      generalInquiry: { offshoreAffinity: 1.00, automationPotential: 1.10 }
    },
    benchmarks: {
      costPerContact: { low: 2.00, high: 5.50 },
      offshoreAdoption: '65–80%',
      headline: 'CMT is a high-volume, well-established offshore sector with deep India/PH capability.'
    },
    insights: [
      'Technical support requires continuous product training — recommend offshore knowledge hubs with rapid update cycles.',
      'High contact volumes make automation ROI exceptional — billing automation 60–70% self-service deflectable.',
      'Retention agents benefit from cultural proximity to source market — consider nearshore for churn-sensitive accounts.',
      'Philippines is strongest for voice-heavy CMT operations due to cultural and language alignment with US/AU.',
      'Network troubleshooting increasingly automated via remote diagnostics — human intervention rate falling 20% YoY.'
    ]
  },

  utilities: {
    label: 'Utilities',
    icon: '⚡',
    regulations: [
      {
        name: 'Critical Infrastructure / NERC CIP',
        description: 'Energy and water utility operational data may be subject to national security restrictions.',
        severity: 'warning',
        affectedCountries: ['IN', 'PH', 'EG', 'CO', 'MX'],
        prompt: 'Determine if client is classified as Critical Infrastructure — NERC CIP may restrict offshore access to operational systems.'
      }
    ],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 1.00, automationPotential: 1.15 }, // Highest automation in utilities
      techSupport:    { offshoreAffinity: 0.80, automationPotential: 0.85 }, // Field/technical knowledge barrier
      accountMgmt:    { offshoreAffinity: 0.95, automationPotential: 1.00 },
      salesRetention: { offshoreAffinity: 0.90, automationPotential: 0.90 }, // Regulatory price sensitivity
      orderMgmt:      { offshoreAffinity: 1.00, automationPotential: 1.10 }, // Service order processing
      generalInquiry: { offshoreAffinity: 1.00, automationPotential: 1.05 }
    },
    benchmarks: {
      costPerContact: { low: 2.20, high: 5.00 },
      offshoreAdoption: '35–55%',
      headline: 'Utilities offshore adoption growing but remains regulation and knowledge-sensitive.'
    },
    insights: [
      'Billing is the highest-volume, most automation-ready segment in utilities — smart bill deflection 50%+ feasible.',
      'Technical field support queries require local infrastructure knowledge — nearshore often preferred.',
      'Smart meter rollout is creating rapid self-service deflection opportunities in general inquiries.',
      'NERC CIP compliance may restrict operational data leaving jurisdiction for energy clients.',
      'Water utilities face less regulatory restriction than energy — more offshore-friendly profile.'
    ]
  },

  diversified: {
    label: 'Diversified',
    icon: '🏢',
    regulations: [
      {
        name: 'Multi-Jurisdictional Exposure',
        description: 'Diversified operations may span multiple regulatory regimes — assessment required per business unit.',
        severity: 'info',
        affectedCountries: [],
        prompt: 'Map primary regulatory exposure by business unit before finalising offshore strategy — risk profile varies significantly.'
      }
    ],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 1.00, automationPotential: 1.00 },
      techSupport:    { offshoreAffinity: 1.00, automationPotential: 1.00 },
      accountMgmt:    { offshoreAffinity: 1.00, automationPotential: 1.00 },
      salesRetention: { offshoreAffinity: 1.00, automationPotential: 1.00 },
      orderMgmt:      { offshoreAffinity: 1.00, automationPotential: 1.00 },
      generalInquiry: { offshoreAffinity: 1.00, automationPotential: 1.00 }
    },
    benchmarks: {
      costPerContact: { low: 2.00, high: 6.00 },
      offshoreAdoption: '40–65%',
      headline: 'Apply a segment-by-segment assessment — diversified conglomerates have highly variable risk profiles.'
    },
    insights: [
      'Prioritise the highest-volume business unit for the initial offshore tranche.',
      'Common shared services (finance, HR, billing) are typically the safest first wave.',
      'Regulatory complexity is often the greatest barrier — conduct compliance mapping before Slide 4.',
      'Shared service centres allow regulatory risk concentration and governance simplification.'
    ]
  }

};

// ─────────────────────────────────────────────────────────────────
// HORIZONTAL INTELLIGENCE — 4 horizontals
// ─────────────────────────────────────────────────────────────────
const HORIZONTAL_INTELLIGENCE = {

  customer_ops: {
    label: 'Customer Ops & CX',
    icon: '🎧',
    regulations: [],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 1.00, automationPotential: 1.05 },
      techSupport:    { offshoreAffinity: 1.00, automationPotential: 1.00 },
      accountMgmt:    { offshoreAffinity: 1.00, automationPotential: 1.00 },
      salesRetention: { offshoreAffinity: 1.05, automationPotential: 1.00 }, // Offshore CX sales proven
      orderMgmt:      { offshoreAffinity: 1.00, automationPotential: 1.10 },
      generalInquiry: { offshoreAffinity: 1.00, automationPotential: 1.10 }
    },
    insights: [
      'Customer Ops is the most mature offshore horizontal — deep global capability and proven track record.',
      'NPS-linked SLAs require robust agent coaching and QA frameworks at offshore sites.',
      'Digital deflection strategy should precede offshoring — reduce inbound volume 25–40% first.',
      'Omnichannel capability (voice, email, chat, social) is table stakes for modern CX delivery.'
    ]
  },

  back_office: {
    label: 'Back Office',
    icon: '📋',
    regulations: [],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 1.10, automationPotential: 1.15 }, // Back office billing highly automatable
      techSupport:    { offshoreAffinity: 0.95, automationPotential: 1.00 },
      accountMgmt:    { offshoreAffinity: 1.10, automationPotential: 1.10 }, // Document and data-heavy
      salesRetention: { offshoreAffinity: 0.90, automationPotential: 0.90 }, // Not primary back office activity
      orderMgmt:      { offshoreAffinity: 1.10, automationPotential: 1.20 }, // Highest automation in back office
      generalInquiry: { offshoreAffinity: 1.05, automationPotential: 1.10 }
    },
    insights: [
      'Back office is typically the highest-cost horizontal with the strongest automation ROI.',
      'Document processing and data entry are 70–85% automatable with modern IDP tooling.',
      'Exception handling and approvals workflows remain human-intensive — design escalation paths carefully.',
      'India leads globally for back office BPO with deep talent pool and mature processes.'
    ]
  },

  mortgages: {
    label: 'Mortgages',
    icon: '🏠',
    regulations: [
      {
        name: 'RESPA / TRID',
        description: 'US mortgage disclosures and processing have strict federal compliance requirements under RESPA and TRID.',
        severity: 'warning',
        affectedCountries: ['IN', 'PH', 'EG', 'CO', 'MX'],
        prompt: 'Mortgage processing offshore requires a RESPA-compliant vendor — conduct state-by-state licensing review before go-live.'
      },
      {
        name: 'Loan Officer Licensing',
        description: 'Mortgage origination requires state-licensed loan officers — cannot be performed offshore.',
        severity: 'warning',
        affectedCountries: ['IN', 'PH', 'PL', 'RO', 'EG', 'CO', 'MX', 'ZA'],
        prompt: 'Focus offshore scope on processing support, document indexing, and quality control — not origination or underwriting decisions.'
      }
    ],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 0.95, automationPotential: 1.10 }, // Payment processing
      techSupport:    { offshoreAffinity: 0.85, automationPotential: 0.90 }, // Complex product knowledge
      accountMgmt:    { offshoreAffinity: 0.80, automationPotential: 1.00 }, // Regulated account activity
      salesRetention: { offshoreAffinity: 0.55, automationPotential: 0.70 }, // Origination restricted offshore
      orderMgmt:      { offshoreAffinity: 0.90, automationPotential: 1.15 }, // Processing support is strong
      generalInquiry: { offshoreAffinity: 0.95, automationPotential: 1.05 }
    },
    insights: [
      'Origination and underwriting decisions cannot be performed offshore — retain onshore.',
      'Loan processing support, document indexing, and QC are proven offshore candidates.',
      'India and Philippines have mature mortgage BPO capability (Wells Fargo, JPMorgan precedent).',
      'Regulatory complexity is high — allow 8–12 weeks for compliance review and vendor due diligence.',
      'Post-close QC and trailing document collection are high-volume, low-risk offshore candidates.'
    ]
  },

  collections: {
    label: 'Collections',
    icon: '📞',
    regulations: [
      {
        name: 'FDCPA',
        description: 'Fair Debt Collection Practices Act imposes strict rules on communication and collection methods.',
        severity: 'warning',
        affectedCountries: ['IN', 'PH', 'EG', 'CO', 'MX'],
        prompt: 'Offshore collectors require FDCPA certification training — client remains liable for FDCPA violations by offshore agents.'
      },
      {
        name: 'FCA Consumer Duty (UK)',
        description: 'UK consumer credit collections face increasing FCA scrutiny around vulnerable customer treatment.',
        severity: 'info',
        affectedCountries: ['IN', 'PH', 'ZA'],
        prompt: 'UK collections offshore must evidence Consumer Duty compliance and documented vulnerable customer protocols.'
      }
    ],
    segmentAdjusters: {
      billing:        { offshoreAffinity: 0.95, automationPotential: 1.10 }, // Early-stage billing collections automatable
      techSupport:    { offshoreAffinity: 1.00, automationPotential: 1.00 },
      accountMgmt:    { offshoreAffinity: 0.85, automationPotential: 0.95 }, // Sensitive debt management
      salesRetention: { offshoreAffinity: 0.80, automationPotential: 0.85 }, // Retention in collections is sensitive
      orderMgmt:      { offshoreAffinity: 1.00, automationPotential: 1.10 },
      generalInquiry: { offshoreAffinity: 0.95, automationPotential: 1.00 }
    },
    insights: [
      'FDCPA-trained offshore collections agents require 3–4 weeks specialist compliance training.',
      'Early-stage collections (0–30 DPD) are most suitable for offshore — highest volume, lowest sensitivity.',
      'Late-stage collections (90+ DPD) and legal accounts are typically retained onshore.',
      'Predictive dialler and AI conversation prompting can increase right-party contacts by 20–35%.',
      'Self-cure digital journeys (automated payment plans) can deflect 30–40% of early-stage collection calls.'
    ]
  }

};

// ─────────────────────────────────────────────────────────────────
// CORE FUNCTIONS — called by index.html
// ─────────────────────────────────────────────────────────────────

/**
 * Compute industry + horizontal adjusted segment scores.
 * Returns a new object with same structure as CONTACT_SEGMENTS
 * but with adjusted offshoreAffinity / automationPotential.
 * Called once in handleAnalyze() and stored as effectiveSegments.
 */
function computeEffectiveSegments(industryKey, horizontalKey) {
  const base = (typeof CONTACT_SEGMENTS !== 'undefined') ? CONTACT_SEGMENTS : {};
  const industryAdj  = ((INDUSTRY_INTELLIGENCE[industryKey]  || {}).segmentAdjusters) || {};
  const horizAdj     = ((HORIZONTAL_INTELLIGENCE[horizontalKey] || {}).segmentAdjusters) || {};

  const result = {};
  Object.entries(base).forEach(([key, seg]) => {
    const iAdj = industryAdj[key]  || { offshoreAffinity: 1, automationPotential: 1 };
    const hAdj = horizAdj[key]     || { offshoreAffinity: 1, automationPotential: 1 };

    const newOA  = Math.min(1, Math.max(0, seg.offshoreAffinity    * iAdj.offshoreAffinity    * hAdj.offshoreAffinity));
    const newAP  = Math.min(1, Math.max(0, seg.automationPotential * iAdj.automationPotential * hAdj.automationPotential));

    result[key] = {
      ...seg,
      offshoreAffinity:    Math.round(newOA * 100) / 100,
      automationPotential: Math.round(newAP * 100) / 100,
      _baseOA:  seg.offshoreAffinity,
      _baseAP:  seg.automationPotential,
      _adjusted: (Math.abs(newOA - seg.offshoreAffinity) > 0.005 || Math.abs(newAP - seg.automationPotential) > 0.005)
    };
  });
  return result;
}

/**
 * Get regulations applicable to the current industry/horizontal + selected offshore destinations.
 * @param {string} industryKey
 * @param {string} horizontalKey
 * @param {string[]} selectedOffshoreCodes  e.g. ['IN', 'PH']
 * @returns {Array} regulation objects with .affectedSelected added
 */
function getActiveRegulations(industryKey, horizontalKey, selectedOffshoreCodes) {
  const regs = [];
  const seen = new Set();

  const sources = [
    INDUSTRY_INTELLIGENCE[industryKey],
    HORIZONTAL_INTELLIGENCE[horizontalKey]
  ].filter(Boolean);

  sources.forEach(src => {
    (src.regulations || []).forEach(reg => {
      const key = reg.name + '|' + reg.description.slice(0, 30);
      if (seen.has(key)) return;

      const affected = reg.affectedCountries.length === 0
        ? [...selectedOffshoreCodes]
        : selectedOffshoreCodes.filter(c => reg.affectedCountries.includes(c));

      if (affected.length > 0) {
        seen.add(key);
        regs.push({ ...reg, affectedSelected: affected });
      }
    });
  });

  return regs;
}

/** Returns benchmark data for the selected industry */
function getIndustryBenchmarks(industryKey) {
  return (INDUSTRY_INTELLIGENCE[industryKey] || {}).benchmarks || null;
}

/** Returns combined industry + horizontal insight bullets */
function getIndustryInsights(industryKey, horizontalKey) {
  const ind = (INDUSTRY_INTELLIGENCE[industryKey]  || {}).insights || [];
  const hor = (HORIZONTAL_INTELLIGENCE[horizontalKey] || {}).insights || [];
  return [...ind, ...hor];
}
