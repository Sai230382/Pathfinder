// transformationKB.js — Pathfinder Transformation Knowledge Base
// 4 lever buckets × 22 levers — vendor-neutral, process-first
// "Fix before you automate. Automate before you offshore."
// Loaded after industryIntelligence.js

// ─────────────────────────────────────────────────────────────────
// LEVER BUCKETS — ordered by the sequence they should be applied
// ─────────────────────────────────────────────────────────────────
const LEVER_BUCKETS = {
  optimise: { label: 'Optimise', color: '#10b981', icon: '🔧', seq: 1,
    tagline: 'Fix the process before you automate or offshore' },
  automate: { label: 'Automate', color: '#f59e0b', icon: '🤖', seq: 2,
    tagline: 'Rule-based automation of repetitive, structured tasks' },
  augment:  { label: 'Augment',  color: '#7c5cfc', icon: '🧠', seq: 3,
    tagline: 'AI assistance for humans handling complex, variable work' },
  offshore: { label: 'Offshore', color: '#00d4ff', icon: '🌍', seq: 4,
    tagline: 'Labour arbitrage — move appropriately scoped work to lower-cost locations' }
};

// ─────────────────────────────────────────────────────────────────
// TRANSFORMATION KNOWLEDGE BASE — 22 levers
// fteImpact: conservative / moderate / aggressive % of headcount
// investmentLevel: Very Low / Low / Low-Medium / Medium / Medium-High / High
// painTriggers: keywords matched against captured pain points
// segmentApplicability: keys from CONTACT_SEGMENTS
// industryBoost: multiplier on relevance score per industry/horizontal key
// ─────────────────────────────────────────────────────────────────
const TRANSFORMATION_KB = [

  // ══════════════════════════════════════════════════════════════
  // BUCKET 1: OPTIMISE — process-first, no technology required
  // ══════════════════════════════════════════════════════════════
  {
    id: 'left_shift',
    bucket: 'optimise',
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
    tags: ['quick-win', 'no-tech', 'volume-reduction']
  },
  {
    id: 'contact_deflection',
    bucket: 'optimise',
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
    tags: ['quick-win', 'no-tech', 'high-roi', 'structural']
  },
  {
    id: 'knowledge_mgmt',
    bucket: 'optimise',
    name: 'Knowledge Management Uplift',
    shortName: 'Knowledge Mgmt',
    description: 'Build and maintain a structured knowledge base so agents resolve queries faster, more consistently, and with higher first-contact resolution.',
    howItWorks: 'Audit existing knowledge assets. Implement structured KB with search, tagging, and owner assignment. Train agents. Measure FCR and AHT impact. 6-weekly review cycle to keep content current.',
    painTriggers: ['knowledge', 'inconsistent', 'training', 'AHT', 'handle time', 'first call', 'FCR', 'wrong answer', 'escalate', 'cant find', 'outdated', 'information'],
    segmentApplicability: ['techSupport', 'accountMgmt', 'billing', 'generalInquiry'],
    industryBoost: { healthcare: 1.2, financial_services: 1.1, telecom: 1.15, customer_ops: 1.15 },
    fteImpact: { conservative: '5–8%', moderate: '8–14%', aggressive: '14–20%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Low',
    dependencies: ['Subject matter expert time', 'KB platform (often existing)'],
    stackLayers: ['Guru, Stonly, Confluence (structured KB)', 'Glean, Notion AI (AI-powered search)', 'SharePoint, Google Sites (lightweight)'],
    risks: ['Content staleness without governance cadence', 'Agent adoption requires coaching reinforcement'],
    tags: ['no-tech', 'quick-win', 'agent-productivity']
  },
  {
    id: 'process_simplification',
    bucket: 'optimise',
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
    tags: ['quick-win', 'no-tech', 'high-roi', 'structural']
  },
  {
    id: 'quality_coaching',
    bucket: 'optimise',
    name: 'QA & Performance Coaching Framework',
    shortName: 'QA & Coaching',
    description: 'Implement structured quality assurance and data-driven coaching to close the performance gap between top and bottom quartile agents.',
    howItWorks: 'Establish calibrated QA scoring framework. Identify bottom-quartile agents by metric. Run weekly 1:1 coaching with specific improvement targets. Track 30/60/90 day progress.',
    painTriggers: ['quality', 'QA', 'coaching', 'performance', 'attrition', 'inconsistent', 'error', 'rework', 'compliance', 'variation', 'bottom performers'],
    segmentApplicability: ['salesRetention', 'techSupport', 'accountMgmt', 'billing'],
    industryBoost: { collections: 1.3, financial_services: 1.15, healthcare: 1.1 },
    fteImpact: { conservative: '5–8%', moderate: '8–12%', aggressive: '12–18%' },
    timeToValue: '1–2 months',
    investmentLevel: 'Very Low',
    dependencies: ['QA tooling (even basic spreadsheet scoring)', 'Team lead coaching capacity'],
    stackLayers: ['Scorebuddy, EvaluAgent (dedicated QA platforms)', 'Built-in QA in Five9, NICE CXone'],
    risks: ['Morale impact if coaching is not supportive', 'Requires trained quality coaches'],
    tags: ['quick-win', 'no-tech', 'quality']
  },

  // ══════════════════════════════════════════════════════════════
  // BUCKET 2: AUTOMATE — rule-based and AI automation
  // ══════════════════════════════════════════════════════════════
  {
    id: 'voice_bot',
    bucket: 'automate',
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
    tags: ['high-volume', 'high-roi', 'voice-first']
  },
  {
    id: 'chat_bot',
    bucket: 'automate',
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
    tags: ['digital-first', 'high-roi', 'scalable']
  },
  {
    id: 'email_triage',
    bucket: 'automate',
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
    tags: ['quick-win', 'digital-first', 'back-office']
  },
  {
    id: 'rpa',
    bucket: 'automate',
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
    tags: ['back-office', 'high-roi', 'scalable']
  },
  {
    id: 'idp',
    bucket: 'automate',
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
    tags: ['back-office', 'high-roi', 'mortgages-fit', 'document-heavy']
  },
  {
    id: 'workflow_automation',
    bucket: 'automate',
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
    tags: ['enterprise', 'back-office', 'multi-system']
  },

  // ══════════════════════════════════════════════════════════════
  // BUCKET 3: AUGMENT — AI assistance, not replacement
  // ══════════════════════════════════════════════════════════════
  {
    id: 'agent_assist',
    bucket: 'augment',
    name: 'Agent Assist AI',
    shortName: 'Agent Assist',
    description: 'Real-time AI suggestions during live interactions — next best action, knowledge snippets, sentiment alerts, and compliance prompts.',
    howItWorks: 'Deploy agent assist overlay on existing agent desktop. AI listens/reads the conversation, retrieves relevant KB articles, suggests responses, flags compliance triggers. Reduces AHT 15–25% and re-work.',
    painTriggers: ['AHT', 'handle time', 'inconsistent', 'knowledge', 'compliance', 'script', 'quality', 'agent experience', 'coaching', 'real-time'],
    segmentApplicability: ['techSupport', 'salesRetention', 'accountMgmt', 'billing'],
    industryBoost: { financial_services: 1.2, healthcare: 1.15, collections: 1.2, customer_ops: 1.15 },
    fteImpact: { conservative: '8–12%', moderate: '12–18%', aggressive: '18–25%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Medium',
    dependencies: ['CRM or desktop integration capability', 'Quality knowledge base'],
    stackLayers: ['Cogito, Balto, Cresta (real-time conversation AI)', 'Salesforce Einstein Copilot, ServiceNow (CRM-native AI assist)', 'Google CCAI Agent Assist, AWS Contact Lens (cloud-native)'],
    risks: ['Agent adoption resistance to AI overlay', 'Latency issues on older desktop/WFH infrastructure'],
    tags: ['agent-productivity', 'quick-win', 'genai']
  },
  {
    id: 'predictive_analytics',
    bucket: 'augment',
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
    tags: ['data-driven', 'strategic', 'revenue-impact']
  },
  {
    id: 'intelligent_routing',
    bucket: 'augment',
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
    tags: ['quick-win', 'agent-productivity', 'fcr-improvement']
  },
  {
    id: 'knowledge_ai',
    bucket: 'augment',
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
    tags: ['agent-productivity', 'genai', 'quick-win']
  },
  {
    id: 'quality_ai',
    bucket: 'augment',
    name: 'AI-Powered Quality & Conversation Analytics',
    shortName: 'QA AI',
    description: '100% interaction scoring using AI — identify coaching opportunities, compliance risks, and sentiment patterns at scale (vs. 2–5% manual sampling).',
    howItWorks: 'Deploy speech/text analytics on 100% of interactions. AI scores against QA framework. Auto-flag compliance risks and sentiment drops. Generate agent-specific coaching insights weekly.',
    painTriggers: ['quality', 'QA', 'compliance', 'coaching', 'sampling', 'inconsistent', 'sentiment', 'call recording', 'monitoring', 'score', 'CSAT drop'],
    segmentApplicability: ['salesRetention', 'techSupport', 'accountMgmt', 'billing'],
    industryBoost: { collections: 1.3, financial_services: 1.2, healthcare: 1.15 },
    fteImpact: { conservative: '5–10%', moderate: '10–15%', aggressive: '15–20%' },
    timeToValue: '2–4 months',
    investmentLevel: 'Medium',
    dependencies: ['Call recording or chat transcripts (12+ months preferred)', 'Calibrated QA framework'],
    stackLayers: ['Verint, NICE Enlighten (enterprise speech analytics)', 'Observe.AI, Convin (AI-native QA platforms)', 'CallMiner, Calabrio Analytics (mid-market)'],
    risks: ['False positives on compliance flags can overwhelm QA team', 'Agent trust/privacy concerns'],
    tags: ['quality', 'compliance', 'genai', 'scale']
  },
  {
    id: 'sentiment_analytics',
    bucket: 'augment',
    name: 'Real-Time Sentiment & Escalation AI',
    shortName: 'Sentiment AI',
    description: 'Detect customer frustration, stress, or escalation risk in real-time during interactions — alert supervisors and agents before the situation worsens.',
    howItWorks: 'Sentiment models monitor voice tone and language during live calls. Alert agent and supervisor when frustration score exceeds threshold. Trigger automatic retention offer or supervisor barge-in.',
    painTriggers: ['escalation', 'angry', 'frustrated', 'complaint', 'CSAT', 'sentiment', 'supervisor', 'manager', 'threatening to leave', 'churn risk'],
    segmentApplicability: ['salesRetention', 'techSupport', 'accountMgmt'],
    industryBoost: { telecom: 1.3, utilities: 1.2, financial_services: 1.1 },
    fteImpact: { conservative: '3–6%', moderate: '6–10%', aggressive: '10–15%' },
    timeToValue: '2–3 months',
    investmentLevel: 'Medium',
    dependencies: ['Real-time voice/text stream access', 'Supervisor alerting workflow'],
    stackLayers: ['Cogito (emotion AI)', 'Medallia Speech, Qualtrics (CX analytics)', 'AWS Contact Lens, Google CCAI Insights (real-time)'],
    risks: ['Alert fatigue if thresholds not tuned', 'Accent/language variation affects accuracy'],
    tags: ['real-time', 'cx-quality', 'retention']
  },

  {
    id: 'agentic_ai',
    bucket: 'augment',
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
    tags: ['agentic', 'genai', 'high-roi', 'strategic', 'buzz']
  },

  // ══════════════════════════════════════════════════════════════
  // BUCKET 4: OFFSHORE — labour arbitrage
  // ══════════════════════════════════════════════════════════════
  {
    id: 'offshore_voice',
    bucket: 'offshore',
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
    tags: ['core-offshore', 'voice', 'arbitrage']
  },
  {
    id: 'offshore_digital',
    bucket: 'offshore',
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
    tags: ['core-offshore', 'digital', 'quick-win', 'arbitrage']
  },
  {
    id: 'offshore_back_office',
    bucket: 'offshore',
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
    tags: ['core-offshore', 'back-office', 'high-roi', 'arbitrage']
  },
  {
    id: 'nearshore',
    bucket: 'offshore',
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
    tags: ['language-sensitive', 'EMEA', 'eu-compliance']
  }
];

// ─────────────────────────────────────────────────────────────────
// LEVER SCORING ENGINE
// ─────────────────────────────────────────────────────────────────

/**
 * Score and rank all levers for the current context.
 * Returns top N levers sorted by composite relevance score.
 *
 * Scoring weights:
 *   35% — pain point trigger matches
 *   25% — segment applicability weight
 *   15% — industry/horizontal boost
 *   25% — transformation model alignment
 */
function getRecommendedLevers(painPoints, industryKey, horizontalKey, transformModel, segmentConfig, topN) {
  topN = topN || 6;
  const painText = (painPoints || []).join(' ').toLowerCase();
  const segs = segmentConfig || {};

  const scored = TRANSFORMATION_KB.map(lever => {
    let score = 0;

    // 1. Pain point trigger matches
    const triggers = lever.painTriggers || [];
    const matches = triggers.filter(t => painText.includes(t.toLowerCase())).length;
    score += (matches / Math.max(1, triggers.length)) * 35;

    // 2. Segment applicability — weighted by segment volume
    const appSegs = lever.segmentApplicability || [];
    const segWeight = Object.entries(segs)
      .filter(([k, v]) => v > 0 && appSegs.includes(k))
      .reduce((s, [, v]) => s + v, 0);
    score += (segWeight / 100) * 25;

    // 3. Industry / horizontal boost
    const iBoost = (lever.industryBoost || {})[industryKey]  || 1.0;
    const hBoost = (lever.industryBoost || {})[horizontalKey] || 1.0;
    score += ((iBoost - 1) + (hBoost - 1)) * 37.5; // 15% max for 2× combined

    // 4. Transformation model alignment
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

  return filtered.sort((a, b) => b._score - a._score).slice(0, topN);
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
