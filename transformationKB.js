// transformationKB.js — Pathfinder Transformation Knowledge Base
// 4 lever buckets × 29 levers — People · Process · Technology balance
// "Address People. Fix Process. Automate what remains. Offshore the right work."
// Loaded after industryIntelligence.js

// ─────────────────────────────────────────────────────────────────
// LEVER BUCKETS — ordered by the sequence they should be applied
// ─────────────────────────────────────────────────────────────────
const LEVER_BUCKETS = {
  optimise: { label: 'Optimise', color: '#10b981', icon: '⚙', seq: 1,
    tagline: 'Address people capability and fix processes before adding technology' },
  automate: { label: 'Automate', color: '#f59e0b', icon: '⚡', seq: 2,
    tagline: 'Rule-based automation of repetitive, structured tasks' },
  augment:  { label: 'Augment',  color: '#7c5cfc', icon: '✦', seq: 3,
    tagline: 'AI assistance for humans handling complex, variable work' },
  offshore: { label: 'Offshore', color: '#00d4ff', icon: '⊕', seq: 4,
    tagline: 'Labour arbitrage — move appropriately scoped work to lower-cost locations' }
};

// ─────────────────────────────────────────────────────────────────
// SOLUTION CATEGORY COLOURS — for P·P·T tags on Slide 6
// ─────────────────────────────────────────────────────────────────
const SOLUTION_CATEGORY_META = {
  people:     { label: 'People',     color: '#f472b6', bg: 'rgba(244,114,182,.12)' },
  process:    { label: 'Process',    color: '#34d399', bg: 'rgba(52,211,153,.12)'  },
  technology: { label: 'Technology', color: '#f59e0b', bg: 'rgba(245,158,11,.12)'  }
};

// ─────────────────────────────────────────────────────────────────
// TRANSFORMATION KNOWLEDGE BASE — 29 levers
// fteImpact: conservative / moderate / aggressive % of headcount
// investmentLevel: Very Low / Low / Low-Medium / Medium / Medium-High / High
// painTriggers: keywords matched against captured pain points
// segmentApplicability: keys from CONTACT_SEGMENTS
// industryBoost: multiplier on relevance score per industry/horizontal key
// solutionCategory: 'people' | 'process' | 'technology'
// bestLocations: country codes best suited to execute this lever ([] = location-agnostic)
// notSuitableFor: segment keys where this lever typically doesn't apply well
// ─────────────────────────────────────────────────────────────────
const TRANSFORMATION_KB = [

  // ══════════════════════════════════════════════════════════════
  // BUCKET 1: OPTIMISE — People & Process Fixes First
  // "Hire well. Train well. Fix the process. Then automate."
  // ══════════════════════════════════════════════════════════════

  // ─── PEOPLE SOLUTIONS ─────────────────────────────────────────

  {
    id: 'training_development',
    bucket: 'optimise',
    solutionCategory: 'people',
    name: 'Structured Training & Skills Development',
    shortName: 'Training & Skills',
    description: 'Build modular, role-specific training to cut time-to-competency, reduce error rates, and address skills gaps that high attrition continuously reopens.',
    howItWorks: 'Audit current training against top 10 error drivers. Build modular curriculum by segment and tier. Implement structured 30/60/90-day ramp with competency sign-off gates. Track quality scores per cohort pre vs. post training.',
    painTriggers: ['training', 'ramp', 'onboarding', 'new hire', 'skills gap', 'tribal knowledge', 'competency', 'error rate', 'wrong answer', 'inconsistent', 'attrition', 'turnover', 'inexperienced', 'learning'],
    segmentApplicability: ['techSupport', 'accountMgmt', 'billing', 'salesRetention', 'complaints'],
    industryBoost: { healthcare: 1.2, financial_services: 1.15, telecom: 1.1, mortgages: 1.25, customer_ops: 1.1 },
    fteImpact: { conservative: '5–8%', moderate: '8–14%', aggressive: '14–20%' },
    timeToValue: '1–3 months',
    investmentLevel: 'Low',
    dependencies: ['SME time to build content', 'LMS or structured delivery mechanism'],
    stackLayers: ['Cornerstone, Workday Learning (enterprise LMS)', 'TalentLMS, Docebo (mid-market LMS)', 'Google Sites / SharePoint (lightweight delivery)'],
    risks: ['Content staleness without quarterly refresh governance', 'Training without reinforcement coaching yields short-term retention only'],
    tags: ['people-first', 'no-tech', 'quick-win', 'attrition-driver'],
    bestLocations: ['IN', 'PH'],
    notSuitableFor: ['generalInquiry']
  },

  {
    id: 'talent_acquisition',
    bucket: 'optimise',
    solutionCategory: 'people',
    name: 'Talent Acquisition & Role Profile Redesign',
    shortName: 'Hiring Model',
    description: 'Redefine hiring profiles to recruit for aptitude and values — not just experience. Structured scorecards and realistic job previews reduce first-90-day attrition by 30–40%.',
    howItWorks: 'Analyse top performer profiles by segment. Define competency-based hiring scorecards. Introduce structured panel interviews with calibrated scoring. Add realistic job preview to reduce early attrition. Track quality-of-hire at 30/60/90 days.',
    painTriggers: ['hiring', 'recruitment', 'wrong hire', 'turnover', 'first 90', 'early attrition', 'profile', 'skills', 'fit', 'junior', 'experience', 'sourcing', 'staffing'],
    segmentApplicability: ['salesRetention', 'techSupport', 'accountMgmt', 'complaints'],
    industryBoost: { collections: 1.3, financial_services: 1.1, telecom: 1.1, customer_ops: 1.15 },
    fteImpact: { conservative: '4–7%', moderate: '7–12%', aggressive: '12–18%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Very Low',
    dependencies: ['HR/TA team involvement', 'Top performer data for profile benchmarking'],
    stackLayers: ['HireVue, Pymetrics (AI-powered assessment)', 'Greenhouse, Lever (structured ATS with scorecard)', 'LinkedIn Recruiter + structured scorecards (low-cost start)'],
    risks: ['Hiring manager resistance to new competency frameworks', 'Longer hire cycle if screening steps added without parallel processing'],
    tags: ['people-first', 'no-tech', 'attrition-driver', 'structural'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'career_pathing',
    bucket: 'optimise',
    solutionCategory: 'people',
    name: 'Career Pathing & Internal Mobility',
    shortName: 'Career Paths',
    description: 'Define visible career ladders with clear criteria, timelines, and stretch assignments. Agents with 12-month career visibility have 45% lower voluntary attrition.',
    howItWorks: 'Map current roles to a career architecture (L1 → L2 → Senior → Coach → Team Lead). Define promotion criteria with measurable gates. Launch internal mobility postings. Run quarterly career conversations. Track 12-month retention vs. control.',
    painTriggers: ['attrition', 'retention', 'career', 'promotion', 'growth', 'leaving', 'engagement', 'morale', 'no progression', 'stuck', 'dead end', 'team lead', 'advance'],
    segmentApplicability: ['techSupport', 'salesRetention', 'accountMgmt', 'complaints'],
    industryBoost: { telecom: 1.2, financial_services: 1.1, healthcare: 1.1, customer_ops: 1.2 },
    fteImpact: { conservative: '3–6%', moderate: '6–10%', aggressive: '10–15%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Very Low',
    dependencies: ['HR partnership for grading framework', 'Manager coaching on career conversations'],
    stackLayers: ['Workday HCM, SAP SuccessFactors (career development modules)', 'Lattice, Culture Amp (performance + career platform)', 'Google Sheets / Notion career ladders (lightweight start)'],
    risks: ['Frustration if career paths exist on paper but promotions are budget-blocked', 'Requires visible and credible sponsorship from senior leadership'],
    tags: ['people-first', 'no-tech', 'attrition-driver', 'retention'],
    bestLocations: ['IN', 'PH'],
    notSuitableFor: ['billing', 'generalInquiry', 'orderMgmt']
  },

  {
    id: 'attrition_reduction',
    bucket: 'optimise',
    solutionCategory: 'people',
    name: 'Attrition Reduction & Wellbeing Programme',
    shortName: 'Retention Programme',
    description: 'Diagnose root causes of voluntary attrition through stay/exit interviews. Targeted interventions — schedule flexibility, recognition, manager quality — deliver 15–25% attrition reduction.',
    howItWorks: 'Run exit interview analysis on last 6 months of leavers. Identify top 3 attrition drivers. Implement 90-day stay interview programme. Build recognition cadence (daily huddles, top performer spotlights). Pilot schedule flexibility (compressed week, hybrid split). Track monthly attrition by team.',
    painTriggers: ['attrition', 'turnover', 'leaving', 'resignation', 'morale', 'burnout', 'stress', 'wellbeing', 'absent', 'sickness', 'disengaged', 'replacing staff', 'retention', 'high cost to hire', 'culture'],
    segmentApplicability: ['techSupport', 'salesRetention', 'complaints', 'accountMgmt'],
    industryBoost: { collections: 1.4, customer_ops: 1.3, telecom: 1.2, healthcare: 1.15 },
    fteImpact: { conservative: '5–8%', moderate: '8–15%', aggressive: '15–22%' },
    timeToValue: '1–3 months',
    investmentLevel: 'Very Low',
    dependencies: ['Manager coaching capability', 'HR analytics on attrition root causes'],
    stackLayers: ['Peakon, Glint (employee listening platforms)', 'Culture Amp, Officevibe (pulse surveys)', 'Bonusly, Achievers (recognition platforms)'],
    risks: ['Surface-level interventions without root cause fix have a 90-day lifespan', 'Manager quality is often the #1 driver — hardest to change quickly'],
    tags: ['people-first', 'no-tech', 'attrition-driver', 'urgent'],
    bestLocations: ['IN', 'PH'],
    notSuitableFor: []
  },

  {
    id: 'knowledge_champions',
    bucket: 'optimise',
    solutionCategory: 'people',
    name: 'Knowledge Champions & SME Network',
    shortName: 'Knowledge Champions',
    description: 'Create an embedded network of subject matter experts within operations teams to capture tribal knowledge, answer real-time queries, and reduce key-person dependency.',
    howItWorks: 'Identify top 10% performers per segment as Knowledge Champions. Allocate 20% of their time to knowledge tasks: answering queries, validating KB content, training new hires. Measure FCR, AHT, and escalation reduction on champion-supported teams vs. control.',
    painTriggers: ['tribal knowledge', 'silo', 'dependency', 'SME', 'specialist', 'one person knows', 'key man risk', 'escalate to expert', 'knowledge loss', 'when they leave', 'relies on'],
    segmentApplicability: ['techSupport', 'accountMgmt', 'billing', 'complaints', 'salesRetention'],
    industryBoost: { healthcare: 1.3, financial_services: 1.2, utilities: 1.15, mortgages: 1.2 },
    fteImpact: { conservative: '4–7%', moderate: '7–12%', aggressive: '12–18%' },
    timeToValue: '1–2 months',
    investmentLevel: 'Very Low',
    dependencies: ['Team lead support to protect champion capacity', 'Recognition for champion role without formal pay uplift'],
    stackLayers: ['Teams/Slack channels (quick-ask SME network)', 'Confluence, Notion (champion-owned KB sections)', 'Guru (KB platform with SME owner assignment)'],
    risks: ['Champions become bottlenecks if not empowered to delegate', 'Role burnout if KPI accountability not adjusted for time spent'],
    tags: ['people-first', 'no-tech', 'quick-win', 'knowledge-risk'],
    bestLocations: ['IN', 'PH'],
    notSuitableFor: []
  },

  {
    id: 'quality_coaching',
    bucket: 'optimise',
    solutionCategory: 'people',
    name: 'QA & Performance Coaching Framework',
    shortName: 'QA & Coaching',
    description: 'Implement structured quality assurance and data-driven coaching to close the performance gap between top and bottom quartile agents.',
    howItWorks: 'Establish calibrated QA scoring framework. Identify bottom-quartile agents by metric. Run weekly 1:1 coaching with specific improvement targets. Track 30/60/90 day progress. Celebrate improvement publicly.',
    painTriggers: ['quality', 'QA', 'coaching', 'performance', 'attrition', 'inconsistent', 'error', 'rework', 'compliance', 'variation', 'bottom performers'],
    segmentApplicability: ['salesRetention', 'techSupport', 'accountMgmt', 'billing', 'complaints'],
    industryBoost: { collections: 1.3, financial_services: 1.15, healthcare: 1.1 },
    fteImpact: { conservative: '5–8%', moderate: '8–12%', aggressive: '12–18%' },
    timeToValue: '1–2 months',
    investmentLevel: 'Very Low',
    dependencies: ['QA tooling (even basic spreadsheet scoring)', 'Team lead coaching capacity'],
    stackLayers: ['Scorebuddy, EvaluAgent (dedicated QA platforms)', 'Built-in QA in Five9, NICE CXone'],
    risks: ['Morale impact if coaching is punitive rather than developmental', 'Requires trained quality coaches — not just metric trackers'],
    tags: ['quick-win', 'people-first', 'quality'],
    bestLocations: [],
    notSuitableFor: []
  },

  // ─── PROCESS SOLUTIONS ────────────────────────────────────────

  {
    id: 'left_shift',
    bucket: 'optimise',
    solutionCategory: 'process',
    name: 'Left-Shift & Tier Reduction',
    shortName: 'Left-Shift',
    description: 'Redesign resolution paths to resolve more queries at L1, reducing escalations to costlier L2/L3 tiers.',
    howItWorks: 'Map resolution trees to identify repetitive L2/L3 queries that are scriptable. Empower L1 agents with decision authority, refreshed scripts, and better knowledge access.',
    painTriggers: ['escalation', 'tier', 'l2', 'l3', 'specialist', 'repeat', 'transfer', 'wrong team', 'back and forth', 'hold', 'warm transfer'],
    segmentApplicability: ['billing', 'techSupport', 'generalInquiry', 'orderMgmt'],
    industryBoost: { healthcare: 1.1, financial_services: 1.0, utilities: 1.2, customer_ops: 1.1 },
    fteImpact: { conservative: '8–12%', moderate: '12–18%', aggressive: '18–25%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Low',
    dependencies: ['Knowledge management refresh', 'Agent training program', 'Script redesign'],
    stackRequired: false,
    risks: ['Agent resistance to expanded scope', 'Initial quality dip during ramp'],
    tags: ['quick-win', 'no-tech', 'volume-reduction'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'contact_deflection',
    bucket: 'optimise',
    solutionCategory: 'process',
    name: 'Contact Deflection & Root Cause Fix',
    shortName: 'Contact Deflection',
    description: 'Identify and eliminate root causes of high-volume avoidable contacts. Every contact avoided is a 100% cost reduction.',
    howItWorks: 'Classify contacts by type and avoidability. Identify the top 5 preventable contact drivers. Fix root causes — billing statement clarity, website gaps, proactive notifications. Track weekly deflection rate.',
    painTriggers: ['volume', 'repeat contact', 'unnecessary', 'avoidable', 'billing error', 'confusion', 'website', 'self service', 'why are they calling', 'portal', 'no need to call'],
    segmentApplicability: ['billing', 'generalInquiry', 'orderMgmt', 'accountMgmt'],
    industryBoost: { utilities: 1.3, retail: 1.2, telecom: 1.1, collections: 1.1 },
    fteImpact: { conservative: '5–10%', moderate: '10–15%', aggressive: '15–22%' },
    timeToValue: '3–6 months',
    investmentLevel: 'Low-Medium',
    dependencies: ['Contact classification analytics', 'Cross-functional: product/billing/web teams'],
    stackRequired: false,
    risks: ['Root causes may require product changes', 'Cross-functional alignment needed'],
    tags: ['quick-win', 'no-tech', 'high-roi', 'structural'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'desktop_simplification',
    bucket: 'optimise',
    solutionCategory: 'process',
    name: 'Agent Desktop & Screen Simplification',
    shortName: 'Desktop Simplify',
    description: 'Consolidate agent desktop from multiple toggle-between screens to a single unified view. Reducing clicks and screen-switching cuts AHT 15–25% and errors 30%+ — with no new technology.',
    howItWorks: 'Map current desktop workflow: count screens per interaction type, number of clicks, copy-paste steps. Identify top 5 friction points. Work with IT to surface key data in one view. Build unified agent workspace using existing CRM. Pilot with 20 agents, measure AHT and error rate vs. control group.',
    painTriggers: ['screen', 'desktop', 'multiple screens', 'toggle', 'swivel chair', 'UI', 'UX', 'clicks', 'tools', 'systems', 'copy paste', 'slow', 'login', 'switch', 'navigate', 'agent experience', 'AHT', 'windows'],
    segmentApplicability: ['techSupport', 'billing', 'accountMgmt', 'orderMgmt'],
    industryBoost: { telecom: 1.3, utilities: 1.2, financial_services: 1.1, mortgages: 1.2, customer_ops: 1.2 },
    fteImpact: { conservative: '8–15%', moderate: '15–22%', aggressive: '22–30%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Low',
    dependencies: ['IT access to CRM/ticketing configuration', 'Process mapping of current desktop journey'],
    stackLayers: ['Salesforce Service Console, ServiceNow Unified Agent (native desktop unification)', 'Genesys Agent Desktop, NICE CXone Desktop (CCaaS-native)', 'Custom workspace integrations using embedded APIs / iFrames'],
    risks: ['IT change control delays can extend timeline', 'Agent resistance to changed muscle memory / screen layout'],
    tags: ['quick-win', 'process', 'agent-productivity', 'high-roi'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'sop_standardisation',
    bucket: 'optimise',
    solutionCategory: 'process',
    name: 'SOP Standardisation & Documentation',
    shortName: 'SOP Standards',
    description: 'Document, standardise, and version-control standard operating procedures across all contact types. Eliminates variation from tribal knowledge and prevents quality degradation during attrition spikes.',
    howItWorks: 'Identify top 20 interaction types by volume. Interview top performers per type. Document step-by-step SOPs with decision trees. Validate with QA against real interactions. Publish in KB with version control. Measure quality score variance pre vs. post.',
    painTriggers: ['SOP', 'procedure', 'standard', 'tribal knowledge', 'inconsistent', 'variation', 'different every time', 'undocumented', 'process', 'manual', 'verbal', 'word of mouth', 'informal', 'no process'],
    segmentApplicability: ['techSupport', 'billing', 'accountMgmt', 'orderMgmt', 'complaints'],
    industryBoost: { healthcare: 1.3, financial_services: 1.2, utilities: 1.1, mortgages: 1.25 },
    fteImpact: { conservative: '4–8%', moderate: '8–13%', aggressive: '13–18%' },
    timeToValue: '2–3 months',
    investmentLevel: 'Very Low',
    dependencies: ['SME time to document and validate', 'KB platform for hosting and version control'],
    stackLayers: ['Confluence, Notion (SOP documentation platforms)', 'Stonly, Tettra (process-oriented KB)', 'SharePoint with version control (enterprise)'],
    risks: ['SOPs become outdated quickly without assigned review governance', 'Agent frustration if rigid SOPs undermine their judgment on edge cases'],
    tags: ['no-tech', 'quick-win', 'structural', 'offshore-ready'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'knowledge_mgmt',
    bucket: 'optimise',
    solutionCategory: 'process',
    name: 'Knowledge Management Uplift',
    shortName: 'Knowledge Mgmt',
    description: 'Build and maintain a structured knowledge base so agents resolve queries faster, more consistently, and with higher first-contact resolution.',
    howItWorks: 'Audit existing knowledge assets. Implement structured KB with search, tagging, and owner assignment. Train agents. Measure FCR and AHT impact. 6-weekly review cycle to keep content current.',
    painTriggers: ['knowledge', 'inconsistent', 'training', 'AHT', 'handle time', 'first call', 'FCR', 'wrong answer', 'escalate', 'cant find', 'outdated', 'information'],
    segmentApplicability: ['techSupport', 'accountMgmt', 'billing', 'generalInquiry', 'complaints'],
    industryBoost: { healthcare: 1.2, financial_services: 1.1, telecom: 1.15, customer_ops: 1.15 },
    fteImpact: { conservative: '5–8%', moderate: '8–14%', aggressive: '14–20%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Low',
    dependencies: ['Subject matter expert time', 'KB platform (often existing)'],
    stackLayers: ['Guru, Stonly, Confluence (structured KB)', 'Glean, Notion AI (AI-powered search)', 'SharePoint, Google Sites (lightweight)'],
    risks: ['Content staleness without governance cadence', 'Agent adoption requires coaching reinforcement'],
    tags: ['no-tech', 'quick-win', 'agent-productivity'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'process_simplification',
    bucket: 'optimise',
    solutionCategory: 'process',
    name: 'Process Simplification & Elimination',
    shortName: 'Process Simplify',
    description: 'Map and challenge every step in key workflows. Eliminate redundant approvals, manual handoffs, and non-value-adding steps.',
    howItWorks: 'Run Lean/DMAIC process mapping on top 3 workflows by volume × handling time. Remove unnecessary steps. Merge duplicate processes. Reduce approval chains. Target 30%+ reduction in steps.',
    painTriggers: ['process', 'manual', 'handoff', 'approval', 'slow', 'inefficient', 'redundant', 'steps', 'complex process', 'too many', 'legacy', 'bureaucratic'],
    segmentApplicability: ['orderMgmt', 'accountMgmt', 'billing', 'techSupport'],
    industryBoost: { financial_services: 1.2, healthcare: 1.1, utilities: 1.1, back_office: 1.2, mortgages: 1.2 },
    fteImpact: { conservative: '6–10%', moderate: '10–16%', aggressive: '16–25%' },
    timeToValue: '1–3 months',
    investmentLevel: 'Very Low',
    dependencies: ['Process mapping resource (Lean trained)', 'Change management support'],
    stackRequired: false,
    risks: ['Senior stakeholder alignment required', 'Process owners may resist simplification'],
    tags: ['quick-win', 'no-tech', 'high-roi', 'structural'],
    bestLocations: [],
    notSuitableFor: []
  },

  // ══════════════════════════════════════════════════════════════
  // BUCKET 2: AUTOMATE — rule-based and AI automation
  // ══════════════════════════════════════════════════════════════

  {
    id: 'voice_bot',
    bucket: 'automate',
    solutionCategory: 'technology',
    name: 'Voice Bot / Conversational IVR',
    shortName: 'Voice Bot',
    description: 'Replace touch-tone IVR with natural language voice bots that fully resolve common queries without agent involvement.',
    howItWorks: 'Deploy conversational IVR for top 3–5 intents (billing balance, order status, FAQs). Target 30–50% containment. Measure containment rate and CSAT. Expand to additional intents quarterly.',
    painTriggers: ['IVR', 'voice', 'phone', 'hold time', 'queue', 'abandoned', 'AHT', 'volume', 'repeat', 'routing', 'touch tone', 'keypad'],
    segmentApplicability: ['billing', 'orderMgmt', 'generalInquiry', 'accountMgmt'],
    industryBoost: { utilities: 1.3, financial_services: 1.1, telecom: 1.2, retail: 1.15 },
    fteImpact: { conservative: '15–22%', moderate: '22–32%', aggressive: '32–45%' },
    timeToValue: '3–5 months',
    investmentLevel: 'Medium',
    dependencies: ['CRM/back-end API access', 'Voice platform', 'Intent training data'],
    stackLayers: ['VAPI, Amazon Connect, Genesys Cloud AI (voice AI platforms)', 'Google CCAI, Nuance Dragon (enterprise voice)', 'Twilio Voice, Vonage (cloud telephony layer)'],
    risks: ['Containment < 30% = poor ROI', 'CX risk if bot fails and frustrates callers'],
    tags: ['high-volume', 'high-roi', 'voice-first'],
    bestLocations: [],
    notSuitableFor: ['salesRetention', 'complaints']
  },

  {
    id: 'chat_bot',
    bucket: 'automate',
    solutionCategory: 'technology',
    name: 'Chat & Messaging Bot',
    shortName: 'Chat Bot',
    description: 'Deploy AI-powered chatbots on website, app, and messaging channels to deflect digital contacts before agent handoff.',
    howItWorks: 'Build intent map from historical chat transcripts. Deploy chatbot for top 10 intents. Configure live agent handoff with full context transfer. Target 40–60% containment rate.',
    painTriggers: ['chat', 'digital', 'web', 'email volume', 'messaging', 'self service', 'website', 'app', 'whatsapp', 'online', 'portal'],
    segmentApplicability: ['billing', 'orderMgmt', 'generalInquiry', 'techSupport'],
    industryBoost: { retail: 1.3, telecom: 1.2, financial_services: 1.1, customer_ops: 1.2 },
    fteImpact: { conservative: '12–18%', moderate: '18–28%', aggressive: '28–40%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Medium',
    dependencies: ['Chat platform integration', 'Intent training data (3–6 months history)'],
    stackLayers: ['Intercom, Zendesk AI, Freshdesk (mid-market chat AI)', 'Salesforce Einstein, ServiceNow Virtual Agent (enterprise)', 'Ada, Kore.ai, Yellow.ai (specialist bot platforms)'],
    risks: ['Poor intent coverage = customer frustration', 'Ongoing training investment required'],
    tags: ['digital-first', 'high-roi', 'scalable'],
    bestLocations: [],
    notSuitableFor: ['salesRetention']
  },

  {
    id: 'email_triage',
    bucket: 'automate',
    solutionCategory: 'technology',
    name: 'Email Triage & Intelligent Routing',
    shortName: 'Email Triage',
    description: 'Automatically classify, prioritise, and route inbound emails. Auto-respond to simple queries. Dramatically reduce manual sorting workload.',
    howItWorks: 'Train NLP classifier on historical email data. Deploy routing rules by intent and urgency. Auto-acknowledge and resolve simple cases. Escalate complex cases with enriched context and suggested response.',
    painTriggers: ['email', 'routing', 'sorting', 'triage', 'SLA', 'response time', 'backlog', 'queue', 'manual classification', 'wrong queue'],
    segmentApplicability: ['billing', 'generalInquiry', 'accountMgmt', 'orderMgmt'],
    industryBoost: { financial_services: 1.15, healthcare: 1.1, utilities: 1.1 },
    fteImpact: { conservative: '8–12%', moderate: '12–20%', aggressive: '20–30%' },
    timeToValue: '2–3 months',
    investmentLevel: 'Low-Medium',
    dependencies: ['Minimum 6 months email volume data', 'CRM/ticketing system integration'],
    stackLayers: ['Zendesk, Freshdesk (email management with AI routing)', 'Salesforce Service Cloud Einstein (email classification)', 'AWS Comprehend, Google NLP API (classification engine)'],
    risks: ['Mis-routing of complex or ambiguous cases', 'Training data quality directly impacts accuracy'],
    tags: ['quick-win', 'digital-first', 'back-office'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'rpa',
    bucket: 'automate',
    solutionCategory: 'technology',
    name: 'Process Automation & RPA',
    shortName: 'Process Automation',
    description: 'Deploy software robots to automate high-volume, rule-based back-office tasks — data entry, system transfers, reconciliation, report generation.',
    howItWorks: 'Identify top 5 processes by volume × handling time with < 10% exception rate. Build attended bots first. Progress to unattended bots as confidence grows. Target 90%+ straight-through processing.',
    painTriggers: ['manual', 'data entry', 'copy paste', 'repetitive', 'back office', 'reconciliation', 'processing', 'spreadsheet', 'swivel chair', 'keying', 'rekeying', 'manual update'],
    segmentApplicability: ['billing', 'orderMgmt', 'accountMgmt'],
    industryBoost: { financial_services: 1.3, healthcare: 1.2, mortgages: 1.3, back_office: 1.4 },
    fteImpact: { conservative: '20–30%', moderate: '30–45%', aggressive: '45–60%' },
    timeToValue: '3–6 months',
    investmentLevel: 'Medium',
    dependencies: ['Stable process (< 10% exception rate)', 'IT system access and stable UI/API'],
    stackLayers: ['UiPath, Automation Anywhere, Blue Prism (enterprise RPA)', 'Power Automate Desktop, Zapier (mid-market / citizen dev)', 'Workato, Make.com (integration-focused RPA)'],
    risks: ['Brittle bots break on UI/system changes', 'High exception rate kills ROI — pre-qualify carefully'],
    tags: ['back-office', 'high-roi', 'scalable'],
    bestLocations: ['IN', 'PH'],
    notSuitableFor: ['salesRetention', 'complaints']
  },

  {
    id: 'idp',
    bucket: 'automate',
    solutionCategory: 'technology',
    name: 'Intelligent Document Processing',
    shortName: 'Document AI',
    description: 'Automate extraction, classification, and validation of structured and unstructured documents — forms, contracts, invoices, IDs, statements.',
    howItWorks: 'Deploy IDP platform trained on historical document samples. Auto-extract and validate high-confidence cases. Route low-confidence extractions to human review. Target 70%+ straight-through processing.',
    painTriggers: ['document', 'form', 'manual entry', 'paper', 'scan', 'contract', 'invoice', 'ID verification', 'data capture', 'indexing', 'filing'],
    segmentApplicability: ['billing', 'accountMgmt', 'orderMgmt'],
    industryBoost: { mortgages: 1.4, healthcare: 1.3, financial_services: 1.2, back_office: 1.35 },
    fteImpact: { conservative: '30–40%', moderate: '40–55%', aggressive: '55–70%' },
    timeToValue: '4–6 months',
    investmentLevel: 'Medium',
    dependencies: ['Representative document samples (500+ per type)', 'Clear accuracy and confidence thresholds'],
    stackLayers: ['AWS Textract, Google Document AI (cloud IDP — scalable)', 'ABBYY Vantage, Kofax TotalAgility (specialist enterprise IDP)', 'UiPath Document Understanding, Microsoft Form Recognizer'],
    risks: ['Accuracy drops on variable/handwritten documents', 'Data privacy during model training'],
    tags: ['back-office', 'high-roi', 'mortgages-fit', 'document-heavy'],
    bestLocations: ['IN', 'PH'],
    notSuitableFor: ['salesRetention', 'generalInquiry']
  },

  {
    id: 'workflow_automation',
    bucket: 'automate',
    solutionCategory: 'technology',
    name: 'Process Orchestration & Workflow Automation',
    shortName: 'Workflow Automation',
    description: 'Automate and orchestrate multi-step workflows across systems — approval chains, escalation triggers, SLA management, fulfilment steps.',
    howItWorks: 'Map current workflow with all decision points and system touch points. Identify automatable steps and system handoffs. Deploy BPM/workflow platform. Measure cycle time reduction and exception rate.',
    painTriggers: ['workflow', 'approval', 'multi-step', 'hand-off', 'SLA breach', 'status update', 'wait', 'delay', 'sign off', 'authorize', 'bottleneck'],
    segmentApplicability: ['orderMgmt', 'billing', 'accountMgmt', 'techSupport'],
    industryBoost: { financial_services: 1.2, healthcare: 1.15, utilities: 1.1, mortgages: 1.25 },
    fteImpact: { conservative: '12–18%', moderate: '18–28%', aggressive: '28–38%' },
    timeToValue: '3–6 months',
    investmentLevel: 'Medium-High',
    dependencies: ['Process documentation', 'API access to key systems', 'IT architecture review'],
    stackLayers: ['ServiceNow, Pega (enterprise BPM with case management)', 'Camunda, Appian (open-source / mid-market BPM)', 'Zapier, Power Automate (lightweight / no-code orchestration)'],
    risks: ['Scope creep in complex multi-system workflows', 'Change management for process owners'],
    tags: ['enterprise', 'back-office', 'multi-system'],
    bestLocations: [],
    notSuitableFor: []
  },

  // ══════════════════════════════════════════════════════════════
  // BUCKET 3: AUGMENT — AI assistance, not replacement
  // ══════════════════════════════════════════════════════════════

  {
    id: 'agent_assist',
    bucket: 'augment',
    solutionCategory: 'technology',
    name: 'Agent Assist AI',
    shortName: 'Agent Assist',
    description: 'Real-time AI suggestions during live interactions — next best action, knowledge snippets, sentiment alerts, and compliance prompts.',
    howItWorks: 'Deploy agent assist overlay on existing agent desktop. AI listens/reads the conversation, retrieves relevant KB articles, suggests responses, flags compliance triggers. Reduces AHT 15–25% and re-work.',
    painTriggers: ['AHT', 'handle time', 'inconsistent', 'knowledge', 'compliance', 'script', 'quality', 'agent experience', 'coaching', 'real-time'],
    segmentApplicability: ['techSupport', 'salesRetention', 'accountMgmt', 'billing', 'complaints'],
    industryBoost: { financial_services: 1.2, healthcare: 1.15, collections: 1.2, customer_ops: 1.15 },
    fteImpact: { conservative: '8–12%', moderate: '12–18%', aggressive: '18–25%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Medium',
    dependencies: ['CRM or desktop integration capability', 'Quality knowledge base'],
    stackLayers: ['Cogito, Balto, Cresta (real-time conversation AI)', 'Salesforce Einstein Copilot, ServiceNow (CRM-native AI assist)', 'Google CCAI Agent Assist, AWS Contact Lens (cloud-native)'],
    risks: ['Agent adoption resistance to AI overlay', 'Latency issues on older desktop/WFH infrastructure'],
    tags: ['agent-productivity', 'quick-win', 'genai'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'predictive_analytics',
    bucket: 'augment',
    solutionCategory: 'technology',
    name: 'Predictive Analytics & Proactive Outreach',
    shortName: 'Predictive Analytics',
    description: 'Use ML models to predict churn, billing issues, or service failures before they generate inbound contacts — shifting from reactive to proactive.',
    howItWorks: 'Train churn/risk models on historical data. Deploy trigger-based proactive outreach (SMS, email, push) for at-risk customers. Measure inbound reduction, retention lift, and NPS improvement.',
    painTriggers: ['churn', 'retention', 'proactive', 'predict', 'at-risk', 'reactive', 'customer lifetime', 'win-back', 'save', 'lapse'],
    segmentApplicability: ['salesRetention', 'accountMgmt', 'billing'],
    industryBoost: { telecom: 1.3, financial_services: 1.2, utilities: 1.15, collections: 1.2 },
    fteImpact: { conservative: '5–10%', moderate: '10–16%', aggressive: '16–22%' },
    timeToValue: '4–6 months',
    investmentLevel: 'Medium-High',
    dependencies: ['Minimum 12 months historical transaction data', 'CRM with propensity scoring capability'],
    stackLayers: ['Salesforce Einstein Analytics, HubSpot Predictive (CRM-native scoring)', 'Databricks, Google Vertex AI, AWS SageMaker (ML platform)', 'SAS, SPSS (traditional statistical analytics)'],
    risks: ['Data quality and history dependency (12+ months)', 'False positives erode customer trust'],
    tags: ['data-driven', 'strategic', 'revenue-impact'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'intelligent_routing',
    bucket: 'augment',
    solutionCategory: 'technology',
    name: 'Intelligent Skills-Based Routing',
    shortName: 'Smart Routing',
    description: 'Route contacts to the right agent based on predicted issue type, agent skill profile, and customer value — not just queue availability.',
    howItWorks: 'Implement intent-based routing layer over existing ACD/CCaaS. Match predicted contact intent to agent skill taxonomy. Prioritise high-value customers. Measure FCR and transfer rate improvement.',
    painTriggers: ['routing', 'wrong team', 'transfer', 'FCR', 'first call', 'misdirected', 'queue', 'skill', 'wrong agent', 'bounced'],
    segmentApplicability: ['techSupport', 'accountMgmt', 'salesRetention', 'billing'],
    industryBoost: { telecom: 1.2, financial_services: 1.1, healthcare: 1.1 },
    fteImpact: { conservative: '5–8%', moderate: '8–12%', aggressive: '12–18%' },
    timeToValue: '2–3 months',
    investmentLevel: 'Low-Medium',
    dependencies: ['CCaaS/ACD platform with routing API', 'Defined agent skill taxonomy'],
    stackLayers: ['Genesys Cloud, Avaya OneCloud (intelligent routing)', 'Five9, NICE CXone (CCaaS with AI routing)', 'Amazon Connect, Twilio Flex (cloud-native routing)'],
    risks: ['Over-specialisation creates rigid queues', 'Queue imbalance during peak demand periods'],
    tags: ['quick-win', 'agent-productivity', 'fcr-improvement'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'knowledge_ai',
    bucket: 'augment',
    solutionCategory: 'technology',
    name: 'GenAI Knowledge Copilot',
    shortName: 'Knowledge AI',
    description: 'Deploy a GenAI-powered knowledge assistant — agents query in natural language during live interactions and get instant, sourced answers.',
    howItWorks: 'Index KB, SOPs, and product documentation using RAG (Retrieval-Augmented Generation). Deploy conversational interface on agent desktop. Agents ask questions mid-interaction and receive cited answers in seconds.',
    painTriggers: ['knowledge', 'cant find', 'information', 'policy', 'SOP', 'training', 'inconsistent answer', 'look up', 'procedure', 'guideline'],
    segmentApplicability: ['techSupport', 'accountMgmt', 'billing', 'generalInquiry'],
    industryBoost: { healthcare: 1.2, financial_services: 1.15, telecom: 1.1, mortgages: 1.2 },
    fteImpact: { conservative: '6–10%', moderate: '10–15%', aggressive: '15–22%' },
    timeToValue: '2–3 months',
    investmentLevel: 'Low-Medium',
    dependencies: ['Structured and maintained knowledge assets', 'API access to content sources'],
    stackLayers: ['Microsoft 365 Copilot, Glean (enterprise AI search)', 'Guru AI, Notion AI (KB-native AI copilots)', 'Custom RAG: LangChain + OpenAI GPT-4o / Claude API'],
    risks: ['Hallucination risk when KB quality is low', 'Data privacy with cloud AI providers'],
    tags: ['agent-productivity', 'genai', 'quick-win'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'quality_ai',
    bucket: 'augment',
    solutionCategory: 'technology',
    name: 'AI-Powered Quality & Conversation Analytics',
    shortName: 'QA AI',
    description: '100% interaction scoring using AI — identify coaching opportunities, compliance risks, and sentiment patterns at scale (vs. 2–5% manual sampling).',
    howItWorks: 'Deploy speech/text analytics on 100% of interactions. AI scores against QA framework. Auto-flag compliance risks and sentiment drops. Generate agent-specific coaching insights weekly.',
    painTriggers: ['quality', 'QA', 'compliance', 'coaching', 'sampling', 'inconsistent', 'sentiment', 'call recording', 'monitoring', 'score', 'CSAT drop'],
    segmentApplicability: ['salesRetention', 'techSupport', 'accountMgmt', 'billing', 'complaints'],
    industryBoost: { collections: 1.3, financial_services: 1.2, healthcare: 1.15 },
    fteImpact: { conservative: '5–10%', moderate: '10–15%', aggressive: '15–20%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Medium',
    dependencies: ['Call recording or chat transcripts (12+ months preferred)', 'Calibrated QA framework'],
    stackLayers: ['Verint, NICE Enlighten (enterprise speech analytics)', 'Observe.AI, Convin (AI-native QA platforms)', 'CallMiner, Calabrio Analytics (mid-market)'],
    risks: ['False positives on compliance flags can overwhelm QA team', 'Agent trust/privacy concerns'],
    tags: ['quality', 'compliance', 'genai', 'scale'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'sentiment_analytics',
    bucket: 'augment',
    solutionCategory: 'technology',
    name: 'Real-Time Sentiment & Escalation AI',
    shortName: 'Sentiment AI',
    description: 'Detect customer frustration, stress, or escalation risk in real-time during interactions — alert supervisors and agents before the situation worsens.',
    howItWorks: 'Sentiment models monitor voice tone and language during live calls. Alert agent and supervisor when frustration score exceeds threshold. Trigger automatic retention offer or supervisor barge-in.',
    painTriggers: ['escalation', 'angry', 'frustrated', 'complaint', 'CSAT', 'sentiment', 'supervisor', 'manager', 'threatening to leave', 'churn risk'],
    segmentApplicability: ['salesRetention', 'techSupport', 'accountMgmt', 'complaints'],
    industryBoost: { telecom: 1.3, utilities: 1.2, financial_services: 1.1 },
    fteImpact: { conservative: '3–6%', moderate: '6–10%', aggressive: '10–15%' },
    timeToValue: '2–3 months',
    investmentLevel: 'Medium',
    dependencies: ['Real-time voice/text stream access', 'Supervisor alerting workflow'],
    stackLayers: ['Cogito (emotion AI)', 'Medallia Speech, Qualtrics (CX analytics)', 'AWS Contact Lens, Google CCAI Insights (real-time)'],
    risks: ['Alert fatigue if thresholds not tuned', 'Accent/language variation affects accuracy'],
    tags: ['real-time', 'cx-quality', 'retention'],
    bestLocations: [],
    notSuitableFor: []
  },

  {
    id: 'agentic_ai',
    bucket: 'augment',
    solutionCategory: 'technology',
    name: 'Agentic AI — End-to-End Autonomous Resolution',
    shortName: 'Agentic AI',
    description: 'Deploy AI agents that autonomously handle multi-step customer interactions end-to-end — no human in the loop for scoped, structured workflows.',
    howItWorks: 'Identify contained, high-volume workflows (e.g. refund processing, policy lookup + update, appointment scheduling). Build AI agents with tool-use (CRM read/write, order systems, KB access). Agent handles end-to-end resolution autonomously with human escalation only for exceptions. Target 60–80% autonomous resolution rate on scoped intents.',
    painTriggers: ['agentic', 'autonomous', 'end to end', 'resolution', 'multi-step', 'workflow', 'AI', 'LLM', 'generative', 'automate resolution', 'handle without agent', 'no human', 'fully automated'],
    segmentApplicability: ['billing', 'orderMgmt', 'generalInquiry', 'accountMgmt'],
    industryBoost: { retail: 1.3, telecom: 1.2, utilities: 1.2, financial_services: 1.1, customer_ops: 1.25 },
    fteImpact: { conservative: '20–30%', moderate: '30–45%', aggressive: '45–65%' },
    timeToValue: '3–6 months',
    investmentLevel: 'Medium-High',
    dependencies: ['CRM + back-end system API access', 'Well-scoped intents with < 15% exception rate', 'Robust escalation path to human agent'],
    stackLayers: ['Anthropic Claude API + tool use (enterprise-grade agentic)', 'OpenAI GPT-4o with function calling', 'Salesforce Agentforce, ServiceNow AI Agent (CRM-native agentic)'],
    risks: ['Hallucination risk on ambiguous intents — strict scope required', 'Customer trust risk if agent fails ungracefully', 'Regulatory scrutiny for financial/health decisions without human oversight'],
    tags: ['agentic', 'genai', 'high-roi', 'strategic', 'buzz'],
    bestLocations: [],
    notSuitableFor: ['salesRetention', 'complaints']
  },

  // ══════════════════════════════════════════════════════════════
  // BUCKET 4: OFFSHORE — labour arbitrage
  // ══════════════════════════════════════════════════════════════

  {
    id: 'offshore_voice',
    bucket: 'offshore',
    solutionCategory: 'process',
    name: 'Offshore Voice Operations',
    shortName: 'Offshore Voice',
    description: 'Transition high-volume, language-compatible voice interactions to lower-cost offshore locations with strong English (or target language) capability.',
    howItWorks: 'Identify voice channels with highest offshore affinity (billing, general enquiries). Select destination based on language fit, timezone, and cost model. Transition in tranches of 20–25% per wave over 6 months.',
    painTriggers: ['cost', 'labour', 'headcount', 'expensive', 'offshore', 'budget', 'FTE', 'reduce headcount', 'cost per call', 'labour cost'],
    segmentApplicability: ['billing', 'generalInquiry', 'orderMgmt'],
    industryBoost: { retail: 1.1, telecom: 1.1, financial_services: 1.0, customer_ops: 1.1 },
    fteImpact: { conservative: '35–45%', moderate: '45–55%', aggressive: '55–65%' },
    timeToValue: '4–8 months',
    investmentLevel: 'Medium',
    dependencies: ['Vendor selection', 'Transition plan', 'Knowledge transfer program'],
    stackRequired: false,
    risks: ['Language or accent barriers for complex voice interactions', 'Knowledge transfer quality determines first-wave performance'],
    tags: ['core-offshore', 'voice', 'arbitrage'],
    bestLocations: ['IN', 'PH', 'ZA', 'CO', 'EG'],
    notSuitableFor: ['salesRetention', 'complaints', 'techSupport']
  },

  {
    id: 'offshore_digital',
    bucket: 'offshore',
    solutionCategory: 'process',
    name: 'Offshore Digital Operations',
    shortName: 'Offshore Digital',
    description: 'Move email, chat, and social media handling offshore — digital channels are less accent-sensitive, more easily quality-monitored, and highly scalable.',
    howItWorks: 'Offshore digital channels first as lower language risk than voice. Build offshore team for email/chat. Retain voice onshore for complex/sensitive interactions. Target 40–60% cost arbitrage.',
    painTriggers: ['email', 'digital', 'chat', 'cost', 'labour', 'volume', 'offshore', 'digital channel', 'social', 'messaging'],
    segmentApplicability: ['billing', 'orderMgmt', 'generalInquiry', 'accountMgmt'],
    industryBoost: { retail: 1.2, telecom: 1.15, financial_services: 1.0, customer_ops: 1.15 },
    fteImpact: { conservative: '40–50%', moderate: '50–60%', aggressive: '60–70%' },
    timeToValue: '3–6 months',
    investmentLevel: 'Low-Medium',
    dependencies: ['Offshore vendor with digital capability', 'CRM/ticketing system access'],
    stackRequired: false,
    risks: ['Response quality consistency requires strong QA', 'Brand voice on social media requires careful governance'],
    tags: ['core-offshore', 'digital', 'quick-win', 'arbitrage'],
    bestLocations: ['IN', 'PH', 'ZA', 'CO'],
    notSuitableFor: ['salesRetention']
  },

  {
    id: 'offshore_back_office',
    bucket: 'offshore',
    solutionCategory: 'process',
    name: 'Offshore Back Office Processing',
    shortName: 'Offshore Back Office',
    description: 'Move document processing, data entry, reconciliation, and transaction processing to offshore — typically the highest-ROI offshore opportunity.',
    howItWorks: 'Identify top back-office processes by volume × handling time. Assess data residency constraints. Offshore to India/Philippines for cost; Romania/Poland for EU data compliance.',
    painTriggers: ['back office', 'processing', 'data entry', 'manual', 'reconciliation', 'cost', 'throughput', 'turnaround', 'keying', 'admin'],
    segmentApplicability: ['billing', 'orderMgmt', 'accountMgmt'],
    industryBoost: { financial_services: 1.2, healthcare: 1.1, mortgages: 1.2, back_office: 1.3 },
    fteImpact: { conservative: '40–55%', moderate: '55–65%', aggressive: '65–75%' },
    timeToValue: '4–6 months',
    investmentLevel: 'Low-Medium',
    dependencies: ['Data residency and security clearance', 'Detailed process documentation'],
    stackRequired: false,
    risks: ['Data security governance at offshore site', 'Turnaround SLA dependency on offshore throughput'],
    tags: ['core-offshore', 'back-office', 'high-roi', 'arbitrage'],
    bestLocations: ['IN', 'PH', 'PL', 'RO'],
    notSuitableFor: ['salesRetention', 'generalInquiry', 'techSupport']
  },

  {
    id: 'nearshore',
    bucket: 'offshore',
    solutionCategory: 'process',
    name: 'Nearshore — Language & TZ Sensitive Work',
    shortName: 'Nearshore',
    description: 'Route language-sensitive or regulation-sensitive work to nearshore locations (Poland, Romania, Egypt, Colombia) rather than far-offshore India/Philippines.',
    howItWorks: 'Identify work where German, French, Spanish or EU GDPR compliance makes far-offshore impractical. Route to nearshore with 40–55% cost arbitrage vs. source market. Retain TZ overlap and cultural proximity.',
    painTriggers: ['language', 'german', 'french', 'spanish', 'timezone', 'european', 'latam', 'EMEA', 'regional', 'GDPR', 'EU', 'nearshore', 'proximity'],
    segmentApplicability: ['techSupport', 'accountMgmt', 'salesRetention', 'billing'],
    industryBoost: { financial_services: 1.1, telecom: 1.1, utilities: 1.0 },
    fteImpact: { conservative: '30–40%', moderate: '40–50%', aggressive: '50–60%' },
    timeToValue: '4–7 months',
    investmentLevel: 'Medium',
    dependencies: ['Language screening process', 'Nearshore vendor selection and due diligence'],
    stackRequired: false,
    risks: ['Higher cost than far-offshore (still significant arbitrage vs. source)', 'Talent scarcity for rarer languages in some markets'],
    tags: ['language-sensitive', 'EMEA', 'eu-compliance'],
    bestLocations: ['PL', 'RO', 'EG', 'CO'],
    notSuitableFor: []
  }

];

// ─────────────────────────────────────────────────────────────────
// LEVER SCORING ENGINE
// ─────────────────────────────────────────────────────────────────

/**
 * Score and rank all levers for the current context.
 * Returns levers sorted by composite relevance score.
 * topN: fixed cap (default 8). Pass 0 for score-threshold-based selection.
 *
 * Scoring weights:
 *   35% — pain point trigger matches
 *   25% — segment applicability weight
 *   15% — industry/horizontal boost
 *   25% — transformation model alignment
 *
 * Dynamic selection (topN=0):
 *   Returns all levers with score >= threshold (avg * 0.7), min 3, max 8
 */
function getRecommendedLevers(painPoints, industryKey, horizontalKey, transformModel, segmentConfig, topN) {
  topN = (topN === undefined || topN === null) ? 8 : topN;
  const painText = (painPoints || []).join(' ').toLowerCase();
  const segs = segmentConfig || {};

  const scored = TRANSFORMATION_KB.map(lever => {
    let score = 0;

    // 1. Pain point trigger matches (35%)
    const triggers = lever.painTriggers || [];
    const matches = triggers.filter(t => painText.includes(t.toLowerCase())).length;
    score += (matches / Math.max(1, triggers.length)) * 35;

    // 2. Segment applicability — weighted by segment volume (25%)
    const appSegs = lever.segmentApplicability || [];
    const segWeight = Object.entries(segs)
      .filter(([k, v]) => v > 0 && appSegs.includes(k))
      .reduce((s, [, v]) => s + v, 0);
    score += (segWeight / 100) * 25;

    // 3. Industry / horizontal boost (15%)
    const iBoost = (lever.industryBoost || {})[industryKey]  || 1.0;
    const hBoost = (lever.industryBoost || {})[horizontalKey] || 1.0;
    score += ((iBoost - 1) + (hBoost - 1)) * 37.5; // 15% max for 2× combined

    // 4. Transformation model alignment (25%)
    if (transformModel === 'liftShift') {
      if (lever.bucket === 'offshore') score += 25;
      if (lever.bucket === 'optimise') score += 5;
    } else if (transformModel === 'transformOffshore') {
      if (lever.bucket === 'automate') score += 20;
      if (lever.bucket === 'augment')  score += 18;
      if (lever.bucket === 'optimise') score += 12;
      if (lever.bucket === 'offshore') score += 15;
    } else if (transformModel === 'transformOnsite') {
      if (lever.bucket === 'optimise') score += 25;
      if (lever.bucket === 'automate') score += 22;
      if (lever.bucket === 'augment')  score += 22;
      // offshore levers filtered out below
    }

    return { ...lever, _score: Math.round(score), _painMatches: matches };
  });

  // Filter: remove offshore levers for transformOnsite model
  const filtered = scored.filter(l => {
    if (transformModel === 'transformOnsite' && l.bucket === 'offshore') return false;
    return true;
  });

  const sorted = filtered.sort((a, b) => b._score - a._score);

  // Dynamic balanced mode (topN === 0)
  // Selects exactly 6 levers — fits the 3×2 grid on Slide 6.
  // Guarantees People and Process representation when pain points exist,
  // preventing transformation model bias from returning all-Technology results.
  // Balance: 2 People + 1 Process + 3 Technology (adjusts if fewer available).
  if (topN === 0) {
    const MAX_LEVERS = 6;
    const byCategory = { people: [], process: [], technology: [] };
    sorted.forEach(l => {
      const cat = l.solutionCategory || 'technology';
      if (byCategory[cat]) byCategory[cat].push(l);
    });

    const painTriggeredPeople  = byCategory.people.filter(l  => l._painMatches > 0);
    const painTriggeredProcess = byCategory.process.filter(l => l._painMatches > 0);

    const selected = [];
    const addedIds = new Set();

    const add = (lever) => {
      if (!addedIds.has(lever.id) && selected.length < MAX_LEVERS) {
        selected.push(lever);
        addedIds.add(lever.id);
      }
    };

    // 1. Guarantee at least 2 People levers (top pain-triggered, or top by score)
    const peopleSlot = painTriggeredPeople.length > 0 ? painTriggeredPeople : byCategory.people;
    peopleSlot.slice(0, 2).forEach(add);

    // 2. Guarantee at least 1 Process lever (non-offshore category; top pain-triggered)
    const processSlot = painTriggeredProcess.length > 0 ? painTriggeredProcess : byCategory.process;
    processSlot.filter(l => l.bucket !== 'offshore').slice(0, 1).forEach(add);

    // 3. Fill remaining slots with top-scoring levers across all categories
    sorted.forEach(l => add(l));

    // Return final 6 sorted by score descending
    return selected.sort((a, b) => b._score - a._score);
  }

  return sorted.slice(0, topN);
}

/**
 * Get levers triggered by a specific set of pain points (for Slide 9 narrative).
 */
function getTriggeredLevers(painPoints) {
  const painText = (painPoints || []).join(' ').toLowerCase();
  return TRANSFORMATION_KB
    .map(lever => {
      const matches = (lever.painTriggers || []).filter(t => painText.includes(t.toLowerCase())).length;
      return { ...lever, _painMatches: matches };
    })
    .filter(l => l._painMatches > 0)
    .sort((a, b) => b._painMatches - a._painMatches);
}

/**
 * Get industry/horizontal specific insights for narrative use.
 * Returns combined insights from INDUSTRY_INTELLIGENCE and HORIZONTAL_INTELLIGENCE
 * (defined in industryIntelligence.js — safe to call if that file is loaded).
 */
function getContextualInsights(industryKey, horizontalKey) {
  if (typeof getIndustryInsights === 'function') {
    return getIndustryInsights(industryKey, horizontalKey);
  }
  return [];
}

/**
 * Get country names for bestLocations codes (uses COUNTRY_DB if available).
 */
function getLeverLocationNames(bestLocations) {
  if (!bestLocations || bestLocations.length === 0) return [];
  if (typeof COUNTRY_DB !== 'undefined') {
    return bestLocations
      .map(code => (COUNTRY_DB[code] ? COUNTRY_DB[code].name.split(' ')[0] : code))
      .filter(Boolean);
  }
  return bestLocations;
}
