// ============================================================================
// PATHFINDER DIAGNOSTIC RECOMMENDATION ENGINE
// Rule-based templates for McKinsey-grade consulting recommendations
// ============================================================================

// ---------------------------------------------------------------------------
// INDUSTRY VOCABULARY — canonical terms by vertical
// ---------------------------------------------------------------------------
const INDUSTRY_VOCABULARY = {
  healthcare: {
    customer: 'patient',
    customers: 'patients',
    transaction: 'clinical encounter',
    transactions: 'clinical encounters',
    quality: 'patient safety',
    throughput: 'patient throughput',
    compliance: 'HIPAA/regulatory compliance',
    escalation: 'clinical escalation',
    backlog: 'care backlog',
    agent: 'care coordinator',
    agents: 'care coordinators',
    sla: 'care SLA',
    csat: 'patient satisfaction (HCAHPS)',
    workflow: 'clinical workflow',
    ticket: 'case',
    tickets: 'cases',
    resolution: 'case resolution',
    channel: 'care channel',
    selfService: 'patient portal utilization',
    costPerUnit: 'cost per encounter'
  },
  financial_services: {
    customer: 'client',
    customers: 'clients',
    transaction: 'financial transaction',
    transactions: 'financial transactions',
    quality: 'regulatory compliance',
    throughput: 'processing volume',
    compliance: 'SOX/Basel compliance',
    escalation: 'exception handling',
    backlog: 'processing backlog',
    agent: 'analyst',
    agents: 'analysts',
    sla: 'processing SLA',
    csat: 'client satisfaction (NPS)',
    workflow: 'processing workflow',
    ticket: 'case',
    tickets: 'cases',
    resolution: 'case disposition',
    channel: 'service channel',
    selfService: 'digital self-service adoption',
    costPerUnit: 'cost per transaction'
  },
  retail: {
    customer: 'customer',
    customers: 'customers',
    transaction: 'order',
    transactions: 'orders',
    quality: 'order accuracy',
    throughput: 'order throughput',
    compliance: 'PCI-DSS compliance',
    escalation: 'escalation',
    backlog: 'order backlog',
    agent: 'associate',
    agents: 'associates',
    sla: 'fulfillment SLA',
    csat: 'CSAT/NPS',
    workflow: 'fulfillment workflow',
    ticket: 'ticket',
    tickets: 'tickets',
    resolution: 'resolution',
    channel: 'commerce channel',
    selfService: 'self-service adoption',
    costPerUnit: 'cost per order'
  },
  technology: {
    customer: 'user',
    customers: 'users',
    transaction: 'support interaction',
    transactions: 'support interactions',
    quality: 'product reliability',
    throughput: 'ticket throughput',
    compliance: 'SOC 2/ISO 27001 compliance',
    escalation: 'engineering escalation',
    backlog: 'sprint backlog',
    agent: 'support engineer',
    agents: 'support engineers',
    sla: 'uptime SLA',
    csat: 'CSAT/CES',
    workflow: 'DevOps workflow',
    ticket: 'ticket',
    tickets: 'tickets',
    resolution: 'resolution',
    channel: 'support channel',
    selfService: 'self-service deflection rate',
    costPerUnit: 'cost per ticket'
  },
  telecommunications: {
    customer: 'subscriber',
    customers: 'subscribers',
    transaction: 'service request',
    transactions: 'service requests',
    quality: 'network quality',
    throughput: 'request throughput',
    compliance: 'FCC/regulatory compliance',
    escalation: 'NOC escalation',
    backlog: 'service backlog',
    agent: 'service representative',
    agents: 'service representatives',
    sla: 'service restoration SLA',
    csat: 'subscriber NPS',
    workflow: 'provisioning workflow',
    ticket: 'trouble ticket',
    tickets: 'trouble tickets',
    resolution: 'fault resolution',
    channel: 'service channel',
    selfService: 'digital self-care adoption',
    costPerUnit: 'cost per service request'
  },
  insurance: {
    customer: 'policyholder',
    customers: 'policyholders',
    transaction: 'claim',
    transactions: 'claims',
    quality: 'claims accuracy',
    throughput: 'claims throughput',
    compliance: 'state regulatory compliance',
    escalation: 'adjuster escalation',
    backlog: 'claims backlog',
    agent: 'claims adjuster',
    agents: 'claims adjusters',
    sla: 'claims processing SLA',
    csat: 'policyholder satisfaction',
    workflow: 'underwriting workflow',
    ticket: 'claim',
    tickets: 'claims',
    resolution: 'claims settlement',
    channel: 'distribution channel',
    selfService: 'digital claims filing rate',
    costPerUnit: 'cost per claim'
  },
  manufacturing: {
    customer: 'customer',
    customers: 'customers',
    transaction: 'work order',
    transactions: 'work orders',
    quality: 'defect rate / Six Sigma',
    throughput: 'production throughput',
    compliance: 'ISO 9001/OSHA compliance',
    escalation: 'quality escalation',
    backlog: 'production backlog',
    agent: 'operator',
    agents: 'operators',
    sla: 'delivery SLA',
    csat: 'on-time delivery (OTIF)',
    workflow: 'production workflow',
    ticket: 'work order',
    tickets: 'work orders',
    resolution: 'issue resolution',
    channel: 'service channel',
    selfService: 'self-service portal adoption',
    costPerUnit: 'cost per unit produced'
  },
  logistics: {
    customer: 'shipper',
    customers: 'shippers',
    transaction: 'shipment',
    transactions: 'shipments',
    quality: 'delivery accuracy',
    throughput: 'shipment throughput',
    compliance: 'customs/trade compliance',
    escalation: 'exception escalation',
    backlog: 'fulfillment backlog',
    agent: 'logistics coordinator',
    agents: 'logistics coordinators',
    sla: 'delivery SLA',
    csat: 'shipper satisfaction',
    workflow: 'supply chain workflow',
    ticket: 'shipment exception',
    tickets: 'shipment exceptions',
    resolution: 'exception resolution',
    channel: 'booking channel',
    selfService: 'self-service booking rate',
    costPerUnit: 'cost per shipment'
  },
  energy: {
    customer: 'ratepayer',
    customers: 'ratepayers',
    transaction: 'service order',
    transactions: 'service orders',
    quality: 'grid reliability',
    throughput: 'service order throughput',
    compliance: 'NERC/FERC compliance',
    escalation: 'field escalation',
    backlog: 'service backlog',
    agent: 'field technician',
    agents: 'field technicians',
    sla: 'restoration SLA',
    csat: 'ratepayer satisfaction (JD Power)',
    workflow: 'field service workflow',
    ticket: 'service order',
    tickets: 'service orders',
    resolution: 'service restoration',
    channel: 'service channel',
    selfService: 'digital account management rate',
    costPerUnit: 'cost per service order'
  },
  government: {
    customer: 'constituent',
    customers: 'constituents',
    transaction: 'service request',
    transactions: 'service requests',
    quality: 'service delivery quality',
    throughput: 'processing throughput',
    compliance: 'FedRAMP/statutory compliance',
    escalation: 'supervisory escalation',
    backlog: 'processing backlog',
    agent: 'case worker',
    agents: 'case workers',
    sla: 'processing timeline',
    csat: 'constituent satisfaction',
    workflow: 'adjudication workflow',
    ticket: 'case',
    tickets: 'cases',
    resolution: 'case disposition',
    channel: 'service channel',
    selfService: 'digital service adoption',
    costPerUnit: 'cost per case'
  },
  pharma: {
    customer: 'HCP',
    customers: 'HCPs',
    transaction: 'engagement',
    transactions: 'engagements',
    quality: 'GxP compliance',
    throughput: 'engagement throughput',
    compliance: 'FDA/EMA compliance',
    escalation: 'medical affairs escalation',
    backlog: 'review backlog',
    agent: 'medical science liaison',
    agents: 'medical science liaisons',
    sla: 'response SLA',
    csat: 'HCP satisfaction',
    workflow: 'regulatory workflow',
    ticket: 'inquiry',
    tickets: 'inquiries',
    resolution: 'inquiry resolution',
    channel: 'engagement channel',
    selfService: 'digital engagement rate',
    costPerUnit: 'cost per engagement'
  },
  education: {
    customer: 'student',
    customers: 'students',
    transaction: 'enrollment',
    transactions: 'enrollments',
    quality: 'academic quality',
    throughput: 'enrollment throughput',
    compliance: 'FERPA/accreditation compliance',
    escalation: 'academic escalation',
    backlog: 'admissions backlog',
    agent: 'advisor',
    agents: 'advisors',
    sla: 'response SLA',
    csat: 'student satisfaction',
    workflow: 'academic workflow',
    ticket: 'request',
    tickets: 'requests',
    resolution: 'request resolution',
    channel: 'engagement channel',
    selfService: 'self-service portal adoption',
    costPerUnit: 'cost per student served'
  },
  utilities: {
    customer: 'ratepayer',
    customers: 'ratepayers',
    transaction: 'service order',
    transactions: 'service orders',
    quality: 'grid reliability',
    throughput: 'service order throughput',
    compliance: 'NERC/PUC regulatory compliance',
    escalation: 'field escalation',
    backlog: 'service backlog',
    agent: 'field technician',
    agents: 'field technicians',
    sla: 'restoration SLA',
    csat: 'ratepayer satisfaction (JD Power)',
    workflow: 'field service workflow',
    ticket: 'service order',
    tickets: 'service orders',
    resolution: 'service restoration',
    channel: 'service channel',
    selfService: 'digital account management rate',
    costPerUnit: 'cost per service order'
  },
  diversified: {
    customer: 'client',
    customers: 'clients',
    transaction: 'engagement',
    transactions: 'engagements',
    quality: 'service quality',
    throughput: 'processing throughput',
    compliance: 'multi-regulatory compliance',
    escalation: 'cross-BU escalation',
    backlog: 'processing backlog',
    agent: 'specialist',
    agents: 'specialists',
    sla: 'service SLA',
    csat: 'client satisfaction (NPS)',
    workflow: 'shared services workflow',
    ticket: 'case',
    tickets: 'cases',
    resolution: 'case resolution',
    channel: 'service channel',
    selfService: 'digital self-service adoption',
    costPerUnit: 'cost per engagement'
  }
};

// ---------------------------------------------------------------------------
// HELPER: resolve industry vocabulary with fallback
// ---------------------------------------------------------------------------
function vocab(industry, key) {
  const ind = INDUSTRY_VOCABULARY[industry] || INDUSTRY_VOCABULARY.technology;
  return ind[key] || key;
}

// ---------------------------------------------------------------------------
// DATA-DRIVEN RECOMMENDATION ACTIONS
// ---------------------------------------------------------------------------
// Each action has: title, triggers (keyword array), compose(ctx) function
// compose() builds insight using ONLY real data from ctx — never fabricated %s
// ---------------------------------------------------------------------------

const RECOMMENDATION_ACTIONS = {
  // =========================================================================
  // PROCESS IMPROVEMENT & OPTIMIZATION — crisp one-liners
  // =========================================================================
  process: [
    {
      title: 'Address Workforce Attrition & Retention Risk',
      triggers: ['attrition','turnover','retention','leaving','resign','churn','departure','losing','vacancy','vacancies','quit','employee loss','high attrition'],
      compose: function(ctx) {
        var line = 'Launch retention program: stay interviews + career pathing + attrition risk scorecard \u2192 reduce turnover-driven cost drain';
        if (ctx.topDest && ctx.movedFTEs > 0) line += ' \u2192 design dedicated engagement model for ' + ctx.topDest + ' (' + ctx.movedFTEs + ' FTEs)';
        return line;
      }
    },
    {
      title: 'Redesign Change Management & Request Intake',
      triggers: ['change request','change management','overwhelm','overloaded','swamped','buried','unmanageable','too many','flood','volume of','request management','change control'],
      compose: function(ctx) {
        var line = 'Tiered change intake: auto-approve standard changes, reserve capacity for high-impact \u2192 eliminate request pipeline bottleneck';
        if (ctx.totalHeadcount > 0) line += ' \u2192 dedicate rotating change pod (2\u20133 ' + ctx.v('agents') + ') for ' + ctx.totalHeadcount + '-person operation';
        return line;
      }
    },
    {
      title: 'Reduce Burnout & Optimize Workload Distribution',
      triggers: ['burnout','workload','stress','overwhelm','overwork','fatigue','morale','engagement','wellbeing','well-being','understaffed','overloaded','pressure','exhaustion'],
      compose: function(ctx) {
        var line = 'Deploy workload analytics + automated load-balancing with capacity buffer \u2192 break the burnout-attrition cycle';
        if (ctx.topDest && ctx.movedFTEs > 0) line += ' \u2192 right-size volume across onshore and ' + ctx.topDest + ' (' + ctx.movedFTEs + ' FTEs)';
        return line;
      }
    },
    {
      title: 'Standardize Escalation & Routing Protocols',
      triggers: ['undefined','undocumented','inconsistent','no standard','fragmented','gaps','unclear','misaligned','escalation','sla','service level','complaint','dissatisfaction','experience','nps','csat'],
      compose: function(ctx) {
        var line = 'Unified escalation matrix: defined tier ownership + SLA routing rules \u2192 standardize ' + ctx.v('resolution') + ' across all sites';
        if (ctx.topDest && ctx.movedFTEs > 0) line += ' \u2192 deploy simultaneously at ' + ctx.topDest + ' (' + ctx.movedFTEs + ' FTEs)';
        return line;
      }
    },
    {
      title: 'Eliminate Bottlenecks & Reduce Cycle Time',
      triggers: ['slow','bottleneck','delays','cycle time','backlog','queue','rework','turnaround','overdue','lag','wait','pending','stuck','inefficien','waste','costly','expensive','overtime','throughput'],
      compose: function(ctx) {
        var line = 'Value-stream redesign of top 3 ' + ctx.v('workflow') + ' types: strip non-value steps, compress handoffs \u2192 cut cycle time';
        if (ctx.topDest) line += ' \u2192 deploy only lean processes to ' + ctx.topDest;
        return line;
      }
    },
    {
      title: 'Implement Closed-Loop Quality Framework',
      triggers: ['quality','compliance','audit trail','governance','error rate','rework','declining','leakage','fallout','defect','mistake','accuracy','inaccura'],
      compose: function(ctx) {
        var line = 'Closed-loop quality: automated sampling + root-cause tagging + weekly calibration \u2192 eliminate rework and ' + ctx.v('csat') + ' erosion';
        if (ctx.topDest && ctx.movedFTEs > 0) line += ' \u2192 identical governance at ' + ctx.topDest + ' (' + ctx.movedFTEs + ' FTEs)';
        return line;
      }
    },
    {
      title: 'Formalize Knowledge Management & Training',
      triggers: ['knowledge','documentation','tribal','undocumented','training','onboarding','skill','learning','competenc','capability','expertise','ramp','new hire','cross-train'],
      compose: function(ctx) {
        var line = 'Searchable playbooks + structured onboarding curriculum \u2192 cut ramp time from months to weeks';
        if (ctx.movedFTEs > 0 && ctx.topDest) line += ' \u2192 prerequisite before ' + ctx.topDest + ' transition (' + ctx.movedFTEs + ' FTEs)';
        return line;
      }
    },
    {
      title: 'Implement Dynamic Workforce Planning',
      triggers: ['workforce','capacity','demand','staffing','scheduling','planning','misaligned','understaffed','overstaffed','headcount','hiring','talent','recruitment','resource'],
      compose: function(ctx) {
        var line = 'Rolling demand forecasting + flex pools + real-time rebalancing \u2192 eliminate chronic over/understaffing';
        if (ctx.topDest) line += ' \u2192 unified demand orchestration between onshore and ' + ctx.topDest;
        if (ctx.totalHeadcount > 0) line += ' (' + ctx.totalHeadcount + ' FTEs)';
        return line;
      }
    },
    {
      title: 'Build Process Excellence CoE',
      triggers: ['no standard','undocumented','inconsistent','fragmented','procedures','framework','documentation','standards','governance','change management','change request'],
      compose: function(ctx) {
        var line = 'Process Excellence CoE: master process library + quarterly audits + change governance \u2192 sustain improvements at scale';
        if (ctx.topDest && ctx.costRatio) line += ' \u2192 anchor analytics in ' + ctx.topDest + ' (' + ctx.costRatio + 'x cost advantage)';
        return line;
      }
    },
    {
      title: 'Streamline Handoffs & Approval Layers',
      triggers: ['redundant','excessive','handoff','approval','duplicate','hand-off','bureaucra','complex process','complicated','convoluted'],
      compose: function(ctx) {
        var line = 'Map full ' + ctx.v('transaction') + ' lifecycle, replace approval gates with rule-based auto-approvals \u2192 cut latency and error risk';
        if (ctx.annualSavings > 0) line += ' \u2192 amplifies $' + (ctx.annualSavings/1e6).toFixed(1) + 'M projected savings';
        return line;
      }
    }
  ],

  // =========================================================================
  // AUTOMATION & AGENTIC AI — crisp one-liners
  // =========================================================================
  automation: [
    {
      title: 'Deploy RPA on High-Volume Manual Workflows',
      triggers: ['manual','repetitive','data entry','spreadsheet','copy-paste','paper-based','rekeying','form-filling','tedious','labor-intensive','time-consuming','clerical','human error','typing'],
      compose: function(ctx) {
        var line = 'Deploy RPA on top 3 manual ' + ctx.v('workflow') + 's \u2192 automate first, then offshore exception handling';
        if (ctx.topDest && ctx.movedFTEs > 0) line += ' to ' + ctx.topDest + ' (' + ctx.movedFTEs + ' FTEs' + (ctx.costRatio ? ', ' + ctx.costRatio + 'x cost advantage' : '') + ')';
        return line;
      }
    },
    {
      title: 'Deploy Intelligent Document Processing',
      triggers: ['extraction','verification','validation','reconciliation','matching','batch processing','report generation','document','invoice','receipt','pdf','scan','ocr','paperwork'],
      compose: function(ctx) {
        var line = 'IDP pipeline: OCR + AI extraction for standard docs, human review for exceptions only \u2192 high straight-through processing';
        if (ctx.topDest && ctx.movedFTEs > 0) line += ' \u2192 ' + ctx.topDest + ' team handles edge cases (' + ctx.movedFTEs + ' FTEs)';
        return line;
      }
    },
    {
      title: 'Build Workflow Orchestration Engine',
      triggers: ['hand-off','handoff','scheduling','template','email-driven','duplicate','workflow','coordination','assignment','dispatch','task management','ticket'],
      compose: function(ctx) {
        var line = 'Workflow orchestration: SLA-triggered routing + auto-tracking + system-directed distribution \u2192 zero dropped items';
        if (ctx.channels && Object.keys(ctx.channels).length > 1) line += ' across ' + Object.keys(ctx.channels).join(', ') + (ctx.topDest ? ' and ' + ctx.topDest : '');
        return line;
      }
    },
    {
      title: 'Deploy AI-Powered Routing & Triage',
      triggers: ['routing','triage','classification','scoring','prioritization','detection','misroute','wrong team','transfer','bounce','redirect','assign'],
      compose: function(ctx) {
        var line = 'ML-based triage: complexity scoring + skills-based routing \u2192 steer L1\u2013L2 volume offshore, retain complex work onshore';
        if (ctx.topDest && ctx.costRatio) line += ' \u2192 ' + ctx.topDest + ' (' + ctx.costRatio + 'x cost advantage)';
        return line;
      }
    },
    {
      title: 'Implement Predictive Analytics & Demand Sensing',
      triggers: ['prediction','forecasting','anomaly','demand sensing','pattern','adaptive','seasonal','spike','unexpected','unpredictable','volatile','fluctuat'],
      compose: function(ctx) {
        var line = 'Predictive models on ' + ctx.v('transaction') + ' data \u2192 forecast volume 48\u201372hrs ahead, pre-position staff, flag SLA risks';
        if (ctx.totalHeadcount > 0) line += ' (' + ctx.totalHeadcount + '-person operation)';
        return line;
      }
    },
    {
      title: 'Deploy AI Copilot for Frontline Teams',
      triggers: ['recommendation','personalization','sentiment','intelligence','cognitive','decision support','natural language','assist','copilot','ai','chatbot','self-service','agent assist','knowledge base'],
      compose: function(ctx) {
        var line = 'AI copilot in ' + ctx.v('agent') + ' desktop: next-best-action + auto-drafted responses + contextual knowledge \u2192 compress time-to-proficiency';
        if (ctx.topDest && ctx.movedFTEs > 0) line += ' \u2192 force multiplier for ' + ctx.movedFTEs + ' new ' + ctx.topDest + ' hires';
        return line;
      }
    },
    {
      title: 'Build Autonomous Resolution Workflows',
      triggers: ['optimization','adaptive','cognitive','prediction','classification','detection','scoring','automat','autonomous','end-to-end','straight-through','zero-touch'],
      compose: function(ctx) {
        var line = 'Agentic AI for routine ' + ctx.v('resolution') + ': intake to closure, zero-touch \u2192 redeploy ' + ctx.v('agents') + ' to complex work';
        if (ctx.totalHeadcount > 0) line += ' (' + ctx.totalHeadcount + '-person team shifts to supervisory role)';
        return line;
      }
    },
    {
      title: 'Establish Enterprise Automation Factory',
      triggers: ['manual','repetitive','data entry','copy-paste','paper-based','spreadsheet','batch processing','rpa','bot','automat','macro','script'],
      compose: function(ctx) {
        var line = 'Centralized Automation Factory: shared bot library + CI/CD + CoE governance \u2192 eliminate ungoverned bot sprawl';
        if (ctx.topDest && ctx.costRatio) line += ' \u2192 dev pod in ' + ctx.topDest + ' (' + ctx.costRatio + 'x cost advantage)';
        return line;
      }
    }
  ],

  // =========================================================================
  // TOOLS & TECH MODERNIZATION — crisp one-liners
  // =========================================================================
  tech: [
    {
      title: 'Consolidate the Tool Landscape',
      triggers: ['legacy','outdated','siloed','fragmented','monolithic','end-of-life','brittle','aging','too many tools','multiple system','disparate','disconnected','patchwork','sprawl','redundant system'],
      compose: function(ctx) {
        var line = 'Rationalize to unified ' + ctx.v('agent') + ' desktop: SSO + shared context + integrated analytics \u2192 eliminate system toggling';
        if (ctx.topDest) line += ' \u2192 one toolset across all sites including ' + ctx.topDest;
        return line;
      }
    },
    {
      title: 'Modernize Integration Architecture',
      triggers: ['interoperability','migration','integration','platform','infrastructure','inflexible','vendor lock-in','api','interface','connect','data flow','sync','compatibility','complexity'],
      compose: function(ctx) {
        var line = 'API-first architecture + integration middleware \u2192 replace brittle point-to-point transfers, enable real-time data parity';
        if (ctx.topDest && ctx.movedFTEs > 0) line += ' \u2192 ' + ctx.topDest + ' team (' + ctx.movedFTEs + ' FTEs) operates on same data as onshore';
        return line;
      }
    },
    {
      title: 'Migrate to Cloud-Native Infrastructure',
      triggers: ['infrastructure','scalability','modernization','architecture','convergence','virtualization','cloud','hosting','server','downtime','uptime','availability','disaster recovery','performance'],
      compose: function(ctx) {
        var line = 'Cloud-native: containerized services + auto-scaling + managed DBs \u2192 elastic capacity, seamless multi-geo ops';
        if (ctx.topDest) line += ' \u2192 identical environments for ' + ctx.topDest + ', no VPN dependencies';
        return line;
      }
    },
    {
      title: 'Build Unified Data & Analytics Platform',
      triggers: ['siloed','fragmented','reporting','analytics','visibility','data','dashboard','insight','metric','kpi','tracking','monitor','real-time'],
      compose: function(ctx) {
        var line = 'Unified data platform: event streaming + centralized warehouse + self-service BI \u2192 kill manual reporting';
        if (ctx.topDest) line += ' \u2192 shared dashboards and live data for ' + ctx.topDest + ' collaboration';
        return line;
      }
    },
    {
      title: 'Establish Platform Engineering Practice',
      triggers: ['legacy','monolithic','brittle','end-of-life','aging','outdated','technical debt','maintenance','upgrade','patch','security','vulnerab','unsupported'],
      compose: function(ctx) {
        var line = 'Platform engineering: CI/CD + infra-as-code + observability \u2192 accelerate every future initiative, reduce tech debt';
        if (ctx.topDest && ctx.costRatio) line += ' \u2192 team based in ' + ctx.topDest + ' (' + ctx.costRatio + 'x cost advantage)';
        return line;
      }
    }
  ]
};


// ---------------------------------------------------------------------------
// PAIN POINT CLASSIFIER — maps pain texts to 3 solution groups
// ---------------------------------------------------------------------------
function classifyPainPointsForSolutions(allPainPoints) {
  const taxonomy = (typeof SOLUTION_TAXONOMY !== 'undefined') ? SOLUTION_TAXONOMY : {};

  // Map 5 taxonomy categories to 3 display groups
  const categoryToGroup = {
    process_improvement: 'process',
    process_optimization: 'process',
    automation: 'automation',
    agentic_ai: 'automation',
    tech_modernization: 'tech'
  };

  const classified = { process: [], automation: [], tech: [] };

  for (const pain of allPainPoints) {
    const lower = pain.toLowerCase();
    let bestGroup = null;
    let bestScore = 0;
    let bestKeywords = [];

    for (const [catKey, catDef] of Object.entries(taxonomy)) {
      const matchedKws = (catDef.keywords || []).filter(kw => lower.includes(kw));
      if (matchedKws.length > bestScore) {
        bestScore = matchedKws.length;
        bestGroup = categoryToGroup[catKey];
        bestKeywords = matchedKws;
      }
    }

    if (bestGroup && bestScore > 0) {
      classified[bestGroup].push({ pain, matchedKeywords: bestKeywords });
    } else {
      // Unmatched pain points default to process
      classified.process.push({ pain, matchedKeywords: [] });
    }
  }

  return classified;
}


// ---------------------------------------------------------------------------
// DATA-DRIVEN RECOMMENDATION BUILDER
// ---------------------------------------------------------------------------
// Catch-all recommendations for pain points that don't match specific triggers
const CATCHALL_RECOMMENDATIONS = {
  process: {
    title: 'Run 4-Week Operational Diagnostic',
    compose: function(ctx) {
      var line = 'Map end-to-end ' + ctx.v('workflow') + ' lifecycles \u2192 quantify cost of each pain point \u2192 prioritize fixes by impact & speed';
      if (ctx.topDest && ctx.movedFTEs > 0) line += ' (complete before ' + ctx.topDest + ' transition \u2014 migrate optimized processes, not dysfunction)';
      return line;
    }
  },
  automation: {
    title: 'Assess Automation Readiness Across Operations',
    compose: function(ctx) {
      var line = 'Score each process on volume + standardization + digital maturity \u2192 build prioritized automation pipeline with payback targets';
      if (ctx.totalHeadcount > 0) line += ' (' + ctx.totalHeadcount + '-person operation \u2014 even modest automation compounds fast)';
      return line;
    }
  },
  tech: {
    title: 'Conduct Technology Landscape Assessment',
    compose: function(ctx) {
      var line = 'Inventory all systems \u2192 map data flows \u2192 score platforms on capability, cost & strategic fit \u2192 phased modernization roadmap';
      if (ctx.topDest) line += ' (factor ' + ctx.topDest + ' delivery model \u2014 multi-site amplifies fragmented-stack cost)';
      return line;
    }
  }
};

function buildDataDrivenRecommendations(classifiedPains, dataContext) {
  const results = { process: [], automation: [], tech: [] };

  for (const [category, actions] of Object.entries(RECOMMENDATION_ACTIONS)) {
    const pains = classifiedPains[category] || [];
    if (pains.length === 0) continue;

    const matchedPainSet = new Set(); // Track which pains got matched

    for (const action of actions) {
      // Check if any of this action's triggers match any classified pain
      const matched = pains.filter(function(p) {
        return action.triggers.some(function(t) {
          return p.pain.toLowerCase().includes(t);
        });
      });

      if (matched.length === 0) continue;

      // Track matched pains
      matched.forEach(function(m) { matchedPainSet.add(m.pain); });

      const ctx = Object.assign({}, dataContext, {
        matchedPains: matched,
        v: function(key) { return vocab(dataContext.industry, key); }
      });

      results[category].push({
        title: action.title,
        insight: action.compose(ctx),
        matchedPainTexts: matched.map(function(m) { return m.pain; }),
        category: category
      });
    }

    // Sort by number of matched pains (most relevant first), limit to 3
    results[category].sort(function(a, b) { return b.matchedPainTexts.length - a.matchedPainTexts.length; });
    results[category] = results[category].slice(0, 3);

    // CATCH-ALL: If some pains in this category didn't match ANY trigger, add a diagnostic recommendation
    const unmatchedPains = pains.filter(function(p) { return !matchedPainSet.has(p.pain); });
    if (unmatchedPains.length > 0 && results[category].length < 3) {
      const catchall = CATCHALL_RECOMMENDATIONS[category];
      if (catchall) {
        const ctx = Object.assign({}, dataContext, {
          matchedPains: unmatchedPains,
          v: function(key) { return vocab(dataContext.industry, key); }
        });
        results[category].push({
          title: catchall.title,
          insight: catchall.compose(ctx),
          matchedPainTexts: unmatchedPains.map(function(m) { return m.pain; }),
          category: category
        });
      }
    }
  }

  return results;
}


// ---------------------------------------------------------------------------
// LEGACY: RECOMMENDATION TEMPLATES (kept for backward compatibility with export)
// ---------------------------------------------------------------------------
const RECOMMENDATION_TEMPLATES = {

  // =======================================================================
  // PROCESS IMPROVEMENT
  // =======================================================================
  process_improvement: {
    quick_win: [
      {
        title: 'Standardize Escalation Protocols',
        insight: (industry, ctx, geoData) =>
          `Undefined escalation paths across diagnosed operational gaps are driving ${vocab(industry, 'escalation')} cycle times up 30-50%. Implement tiered routing with documented decision trees to reduce ${vocab(industry, 'resolution')} time by 25-35%.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Train the ${geoData.topDest} team as the L1 triage layer to absorb 60-70% of initial ${geoData.topDest} volume.` : null,
        impact: 'high'
      },
      {
        title: 'Eliminate Redundant Approval Gates',
        insight: (industry, ctx, geoData) =>
          `Process mapping across the identified workflows reveals 3-5 approval gates that add no decision value. Removing non-value-add sign-offs will accelerate ${vocab(industry, 'throughput')} by 20-30%.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Deploy Standardized Quality Checklists',
        insight: (industry, ctx, geoData) =>
          `Inconsistent ${vocab(industry, 'quality')} practices across the identified processes are producing 15-25% rework rates. Introduce role-specific quality checklists at each handoff point.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Calibrate ${geoData.topDest} quality standards against onshore benchmarks within the first 30 days.` : null,
        impact: 'medium'
      },
      {
        title: 'Consolidate Duplicate Handoff Steps',
        insight: (industry, ctx, geoData) =>
          `Current workflows expose 2-4 redundant handoffs per ${vocab(industry, 'transaction')} lifecycle. Collapsing these into a single warm transfer will cut average handling time by 15-20%.`,
        geoTieIn: null,
        impact: 'medium'
      }
    ],
    medium_term: [
      {
        title: 'Implement End-to-End Process Mining',
        insight: (industry, ctx, geoData) =>
          `Root causes behind the diagnosed issues remain hypothesis-driven. Deploy process mining on the top 5 ${vocab(industry, 'workflow')}s to surface the 20% of steps causing 80% of delays.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Use mining outputs to design optimized workflows for the ${geoData.topDest} delivery center from day one.` : null,
        impact: 'high'
      },
      {
        title: 'Redesign SLA Framework by Tier',
        insight: (industry, ctx, geoData) =>
          `Current flat ${vocab(industry, 'sla')} structures mask complexity variation across service tiers. Introduce complexity-weighted SLAs to improve on-time delivery by 30-40% without adding headcount.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Establish Continuous Improvement Cadence',
        insight: (industry, ctx, geoData) =>
          `Issues in current operations recur quarterly because no structured feedback loop exists. Stand up a biweekly Kaizen cycle with ${vocab(industry, 'agent')} input to reduce repeat defects by 40-60%.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Include ${geoData.topDest} team leads in the Kaizen cadence to align improvement velocity across locations.` : null,
        impact: 'medium'
      }
    ],
    strategic: [
      {
        title: 'Build Enterprise Process Excellence CoE',
        insight: (industry, ctx, geoData) =>
          `Fragmented improvement efforts across operational areas yield diminishing returns at scale. A centralized Process Excellence CoE will create reusable frameworks and drive 2-3x faster deployment of process changes.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Anchor the CoE's analytics function in ${geoData.topDest} to leverage the ${geoData.costRatio ? (geoData.costRatio * 100).toFixed(0) + '%' : ''} cost advantage.` : null,
        impact: 'high'
      },
      {
        title: 'Adopt Digital Twin for Operations',
        insight: (industry, ctx, geoData) =>
          `Simulate end-to-end ${vocab(industry, 'workflow')} performance digitally before deploying changes. Digital twin modeling on processes linked to the diagnosed challenges can reduce failed change initiatives by 50-70%.`,
        geoTieIn: null,
        impact: 'medium'
      },
      {
        title: 'Transition to Outcome-Based Governance',
        insight: (industry, ctx, geoData) =>
          `Activity-based metrics across the diagnosed challenges incentivize volume over value. Shift to outcome-based KPIs tied to ${vocab(industry, 'csat')} and ${vocab(industry, 'resolution')} quality to align team behavior with business impact.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Apply identical outcome metrics to ${geoData.topDest} teams to eliminate onshore-offshore performance divergence.` : null,
        impact: 'high'
      }
    ]
  },

  // =======================================================================
  // PROCESS OPTIMIZATION
  // =======================================================================
  process_optimization: {
    quick_win: [
      {
        title: 'Optimize Channel Routing Logic',
        insight: (industry, ctx, geoData) =>
          `Misrouted ${vocab(industry, 'tickets')} in current operations account for 20-30% of wasted ${vocab(industry, 'agent')} capacity. Implement skills-based routing to improve first-contact resolution by 15-25%.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Route lower-complexity ${vocab(geoData.topDest, 'tickets') || 'tickets'} to the ${geoData.topDest} team to maximize cost arbitrage on high-volume work.` : null,
        impact: 'high'
      },
      {
        title: 'Reduce Average Handle Time Drivers',
        insight: (industry, ctx, geoData) =>
          `AHT analysis across the identified workflows reveals 30-40% of handle time is spent on system navigation and data retrieval. Consolidate the top 3 lookup screens into a unified ${vocab(industry, 'agent')} dashboard.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Implement Shift-Left Knowledge Strategy',
        insight: (industry, ctx, geoData) =>
          `L2/L3 queues referenced in current operations contain 40-50% of ${vocab(industry, 'tickets')} resolvable at L1 with proper knowledge articles. Curate top-20 resolution guides to shift volume left.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Equip the ${geoData.topDest} L1 team with these guides to handle an additional 25-35% of current escalation volume.` : null,
        impact: 'medium'
      },
      {
        title: 'Normalize Intake Categorization Taxonomy',
        insight: (industry, ctx, geoData) =>
          `Inconsistent categorization in current operations is corrupting demand analytics and misallocating ${vocab(industry, 'agent')} resources. Standardize to a 3-level taxonomy aligned to resolution paths.`,
        geoTieIn: null,
        impact: 'medium'
      }
    ],
    medium_term: [
      {
        title: 'Deploy Predictive Volume Forecasting',
        insight: (industry, ctx, geoData) =>
          `Reactive staffing models tied to the diagnosed challenges produce 15-20% over/under-staffing daily. Implement ML-based volume forecasting to match ${vocab(industry, 'agent')} supply to demand within 5% variance.`,
        geoTieIn: (geoData) =>
          geoData.topDest && geoData.totalMovedFTEs ? `Model forecasts across both onshore and ${geoData.topDest} (${geoData.totalMovedFTEs} FTEs) to optimize global shift coverage.` : null,
        impact: 'high'
      },
      {
        title: 'Build Real-Time Performance Dashboards',
        insight: (industry, ctx, geoData) =>
          `Lagging indicators across the diagnosed challenges provide visibility only after SLA breaches occur. Deploy real-time dashboards with leading indicators to enable proactive intervention and reduce breaches by 30-50%.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Extend dashboard visibility to ${geoData.topDest} operations leadership to enable same-day corrective action.` : null,
        impact: 'high'
      },
      {
        title: 'Redesign Workforce Planning Model',
        insight: (industry, ctx, geoData) =>
          `Static workforce plans cannot absorb the demand variability surfaced in the diagnostic. Adopt a dynamic Erlang-based model with flex capacity pools to reduce ${vocab(industry, 'sla')} breaches by 25-40%.`,
        geoTieIn: null,
        impact: 'medium'
      }
    ],
    strategic: [
      {
        title: 'Establish Demand Orchestration Platform',
        insight: (industry, ctx, geoData) =>
          `Siloed demand management across functional silos prevents enterprise-level optimization. Build a unified demand orchestration layer to dynamically allocate work across channels, tiers, and geographies.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `The orchestration platform should treat ${geoData.topDest} as a first-class delivery node with real-time capacity balancing.` : null,
        impact: 'high'
      },
      {
        title: 'Implement Value Stream Architecture',
        insight: (industry, ctx, geoData) =>
          `Functional silos magnify the inefficiencies identified in the diagnostic. Reorganize around end-to-end value streams to reduce cross-functional handoffs by 50-60% and improve ${vocab(industry, 'throughput')} by 2x.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Launch Closed-Loop Quality Ecosystem',
        insight: (industry, ctx, geoData) =>
          `${vocab(industry, 'quality')} defects in current operations lack root-cause traceability. Deploy a closed-loop system connecting ${vocab(industry, 'csat')} signals, QA scores, and process telemetry to drive systemic improvement.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Unify quality scoring rubrics across onshore and ${geoData.topDest} to eliminate calibration drift.` : null,
        impact: 'medium'
      }
    ]
  },

  // =======================================================================
  // AUTOMATION
  // =======================================================================
  automation: {
    quick_win: [
      {
        title: 'Automate High-Volume Data Entry',
        insight: (industry, ctx, geoData) =>
          `Manual data entry referenced in current operations consumes 25-35% of ${vocab(industry, 'agent')} productive time. RPA bots on the top 5 data-entry workflows will recover 40-60% of that capacity immediately.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Redeploy recovered capacity in ${geoData.topDest} toward higher-value ${vocab(geoData.topDest, 'resolution') || 'resolution'} work.` : null,
        impact: 'high'
      },
      {
        title: 'Deploy Auto-Classification for Intake',
        insight: (industry, ctx, geoData) =>
          `Manual triage across the diagnosed challenges introduces 10-15 minute latency per ${vocab(industry, 'ticket')}. NLP-based auto-classification will cut triage time by 80-90% and improve routing accuracy to 92%+.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Implement Scheduled Report Generation',
        insight: (industry, ctx, geoData) =>
          `Supervisors spend 5-8 hours weekly building reports related to the diagnosed challenges metrics. Automate the top 10 recurring reports to free leadership time for coaching and continuous improvement.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Include ${geoData.topDest} KPIs in automated reporting to eliminate manual cross-site data consolidation.` : null,
        impact: 'medium'
      },
      {
        title: 'Enable Macro-Driven Status Updates',
        insight: (industry, ctx, geoData) =>
          `${vocab(industry, 'agents')} handling these processes perform 8-12 repetitive status updates per ${vocab(industry, 'transaction')}. Deploy templated macros to reduce after-call work by 30-40%.`,
        geoTieIn: null,
        impact: 'medium'
      }
    ],
    medium_term: [
      {
        title: 'Build Intelligent Document Processing',
        insight: (industry, ctx, geoData) =>
          `Unstructured document handling in current operations requires 15-20 minutes of manual extraction per item. IDP with OCR and entity extraction will achieve 85-95% straight-through processing.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Position the ${geoData.topDest} team as the exception-handling layer for the 5-15% requiring human review.` : null,
        impact: 'high'
      },
      {
        title: 'Deploy Workflow Orchestration Engine',
        insight: (industry, ctx, geoData) =>
          `Disjointed task handoffs across the identified workflows create 2-4 day cycle-time gaps. A workflow orchestration engine with SLA triggers will reduce end-to-end cycle time by 40-60%.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Implement Smart Notification Framework',
        insight: (industry, ctx, geoData) =>
          `${vocab(industry, 'customers')} impacted by these issues receive no proactive updates, driving 20-30% of repeat contacts. Automated milestone notifications will deflect a significant share of follow-up volume.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Reduce inbound follow-up calls to the ${geoData.topDest} center by 20-30% through proactive status messaging.` : null,
        impact: 'medium'
      }
    ],
    strategic: [
      {
        title: 'Establish Enterprise Automation Factory',
        insight: (industry, ctx, geoData) =>
          `Piecemeal automation efforts addressing operational pain points lack reuse and governance. Build a centralized Automation Factory with a shared bot library, CI/CD pipeline, and CoE governance to scale 3-5x faster.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Staff the Automation Factory's development pod in ${geoData.topDest} to leverage the ${geoData.costRatio ? (geoData.costRatio * 100).toFixed(0) + '%' : 'lower'} cost base for bot development.` : null,
        impact: 'high'
      },
      {
        title: 'Deploy Hyperautomation Integration Layer',
        insight: (industry, ctx, geoData) =>
          `Isolated automation tools across operational processes create brittle point solutions. An integration layer combining RPA, IDP, and API orchestration will enable end-to-end hyperautomation with 70-80% straight-through rates.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Build Self-Healing Process Architecture',
        insight: (industry, ctx, geoData) =>
          `Automated processes tied to the diagnosed challenges still require manual exception handling 15-20% of the time. Invest in self-healing logic with fallback routing and auto-retry to push straight-through rates above 95%.`,
        geoTieIn: null,
        impact: 'medium'
      }
    ]
  },

  // =======================================================================
  // AGENTIC AI
  // =======================================================================
  agentic_ai: {
    quick_win: [
      {
        title: 'Deploy AI-Powered Agent Assist',
        insight: (industry, ctx, geoData) =>
          `${vocab(industry, 'agents')} handling complex workflows lack real-time decision support, extending AHT by 20-30%. An AI copilot surfacing next-best-action recommendations will improve ${vocab(industry, 'resolution')} speed and consistency.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `AI Assist accelerates ramp time for new ${geoData.topDest} hires, reducing time-to-proficiency from 12 weeks to 6-8 weeks.` : null,
        impact: 'high'
      },
      {
        title: 'Implement Sentiment-Based Priority Routing',
        insight: (industry, ctx, geoData) =>
          `Uniform priority assignment in current operations fails to detect at-risk ${vocab(industry, 'customers')}. Real-time sentiment analysis on inbound contacts will flag escalation-prone interactions for immediate senior routing.`,
        geoTieIn: null,
        impact: 'medium'
      },
      {
        title: 'Launch AI Knowledge Retrieval Engine',
        insight: (industry, ctx, geoData) =>
          `Knowledge search inefficiency in current operations adds 2-4 minutes per ${vocab(industry, 'ticket')}. A RAG-based knowledge engine will reduce search time by 70-80% and improve first-contact resolution by 10-15pp.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `The AI knowledge engine equalizes institutional knowledge access between onshore and ${geoData.topDest} teams.` : null,
        impact: 'high'
      },
      {
        title: 'Enable AI-Generated Response Drafts',
        insight: (industry, ctx, geoData) =>
          `Written responses for the identified pain points require 5-8 minutes of composition time per ${vocab(industry, 'ticket')}. LLM-generated draft responses will cut composition time by 60-70% while maintaining ${vocab(industry, 'compliance')} standards.`,
        geoTieIn: null,
        impact: 'medium'
      }
    ],
    medium_term: [
      {
        title: 'Build Autonomous Resolution Workflows',
        insight: (industry, ctx, geoData) =>
          `30-45% of ${vocab(industry, 'tickets')} related to the diagnosed challenges follow deterministic resolution paths. Deploy agentic workflows that autonomously resolve these cases end-to-end, with human oversight only on exceptions.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Shift ${geoData.topDest} ${vocab(industry, 'agents')} from routine resolution to exception management as autonomous volumes increase.` : null,
        impact: 'high'
      },
      {
        title: 'Deploy Predictive Escalation Prevention',
        insight: (industry, ctx, geoData) =>
          `Escalation patterns in current operations are predictable 4-6 interactions before they occur. Train a predictive model to trigger preemptive intervention, reducing ${vocab(industry, 'escalation')}s by 25-40%.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Implement Conversational AI for L1',
        insight: (industry, ctx, geoData) =>
          `L1 volume across the diagnosed challenges consists of 50-65% repetitive inquiries addressable by conversational AI. Deploy a multi-turn virtual ${vocab(industry, 'agent')} to deflect this volume with 85%+ containment.`,
        geoTieIn: (geoData) =>
          geoData.topDest && geoData.totalMovedFTEs ? `Conversational AI absorbs projected volume growth, keeping ${geoData.topDest} headcount stable at ${geoData.totalMovedFTEs} FTEs through Year 2.` : null,
        impact: 'high'
      }
    ],
    strategic: [
      {
        title: 'Establish AI-Native Operating Model',
        insight: (industry, ctx, geoData) =>
          `Current human-first operating model treats AI as an add-on, limiting ROI across the diagnosed challenges initiatives. Redesign the operating model to be AI-native with humans handling judgment-intensive work and AI processing everything else.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Reposition the ${geoData.topDest} center as an AI operations hub managing model oversight, training data curation, and edge-case resolution.` : null,
        impact: 'high'
      },
      {
        title: 'Build Autonomous Operations Platform',
        insight: (industry, ctx, geoData) =>
          `Scaling individual AI solutions for the identified pain points creates tool sprawl. Invest in a unified autonomous operations platform with shared reasoning, memory, and tool-use layers to compound AI capabilities across all processes.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Deploy Multi-Agent Orchestration Layer',
        insight: (industry, ctx, geoData) =>
          `Complex ${vocab(industry, 'transactions')} in current operations require coordinated actions across systems. A multi-agent orchestration framework enables specialized AI agents to collaborate on end-to-end resolution with 60-75% autonomy.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Human-in-the-loop checkpoints remain with ${geoData.topDest} oversight teams to maintain ${vocab(industry, 'compliance')} guardrails.` : null,
        impact: 'medium'
      }
    ]
  },

  // =======================================================================
  // TECH MODERNIZATION
  // =======================================================================
  tech_modernization: {
    quick_win: [
      {
        title: 'Consolidate Fragmented Agent Desktops',
        insight: (industry, ctx, geoData) =>
          `${vocab(industry, 'agents')} toggle between 5-8 applications for the identified pain points, adding 3-5 minutes per ${vocab(industry, 'transaction')}. A unified desktop with contextual screen pops will reduce AHT by 15-25%.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Ensure the unified desktop is deployed simultaneously at ${geoData.topDest} to prevent tool fragmentation across sites.` : null,
        impact: 'high'
      },
      {
        title: 'Upgrade Integration Middleware Layer',
        insight: (industry, ctx, geoData) =>
          `Brittle point-to-point integrations behind the diagnosed issues cause 5-10 hours of weekly downtime. Migrate the top 5 integrations to API-based middleware to achieve 99.5%+ uptime and enable real-time data flow.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Implement Single Sign-On Across Tools',
        insight: (industry, ctx, geoData) =>
          `Authentication friction across systems referenced in current operations wastes 10-15 minutes daily per ${vocab(industry, 'agent')}. Deploy SSO with role-based access to recover 3-5% of productive capacity.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Extend SSO to the ${geoData.topDest} environment to streamline secure access provisioning for offshore teams.` : null,
        impact: 'medium'
      },
      {
        title: 'Migrate to Cloud-Based Telephony',
        insight: (industry, ctx, geoData) =>
          `On-premise telephony limitations in current operations prevent intelligent routing and real-time analytics. Cloud CCaaS migration will unlock skills-based routing and reduce infrastructure costs by 20-30%.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Cloud telephony enables seamless call routing between onshore and ${geoData.topDest} without dedicated MPLS circuits.` : null,
        impact: 'medium'
      }
    ],
    medium_term: [
      {
        title: 'Build Unified Data Platform Layer',
        insight: (industry, ctx, geoData) =>
          `Data silos underlying the diagnosed issues prevent cross-functional analytics and real-time decision-making. A unified data platform with event streaming will cut reporting latency from days to minutes and enable AI readiness.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Grant the ${geoData.topDest} analytics team direct platform access to eliminate data transfer delays and improve operational responsiveness.` : null,
        impact: 'high'
      },
      {
        title: 'Deploy API-First Architecture Strategy',
        insight: (industry, ctx, geoData) =>
          `Tightly coupled systems behind the diagnosed issues create 4-8 week change lead times. Adopting an API-first architecture will reduce integration effort by 60-70% and accelerate feature delivery by 2-3x.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Modernize Case Management Platform',
        insight: (industry, ctx, geoData) =>
          `The legacy ${vocab(industry, 'ticket')} management system linked to the diagnosed challenges lacks workflow flexibility and AI integration hooks. Migrate to a modern composable platform to enable 50-70% faster process configuration.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Modern case management enables the ${geoData.topDest} team to operate on the same platform instance, eliminating data synchronization lag.` : null,
        impact: 'high'
      }
    ],
    strategic: [
      {
        title: 'Architect Composable Technology Stack',
        insight: (industry, ctx, geoData) =>
          `Monolithic platforms constraining current operations cannot evolve at the speed of business demand. A composable, MACH-aligned architecture will reduce vendor lock-in and enable 3-5x faster capability deployment.`,
        geoTieIn: null,
        impact: 'high'
      },
      {
        title: 'Establish Platform Engineering Practice',
        insight: (industry, ctx, geoData) =>
          `Fragmented DevOps across teams handling these workloads produces inconsistent reliability and slow deployments. A dedicated platform engineering practice will standardize CI/CD, observability, and infrastructure-as-code.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Anchor the platform engineering team in ${geoData.topDest} to leverage ${geoData.costRatio ? 'the ' + (geoData.costRatio * 100).toFixed(0) + '% cost advantage' : 'cost arbitrage'} on engineering talent.` : null,
        impact: 'high'
      },
      {
        title: 'Build Enterprise AI Infrastructure',
        insight: (industry, ctx, geoData) =>
          `AI initiatives across the organization lack shared model serving, feature stores, and governance. An enterprise AI infrastructure layer will reduce model deployment time from months to days and ensure ${vocab(industry, 'compliance')} at scale.`,
        geoTieIn: (geoData) =>
          geoData.topDest ? `Leverage ${geoData.topDest} data engineering talent to build and maintain the feature store and MLOps pipelines.` : null,
        impact: 'medium'
      }
    ]
  }
};


// ---------------------------------------------------------------------------
// EXECUTIVE SYNTHESIS GENERATOR
// ---------------------------------------------------------------------------
function generateExecutiveSynthesis(painSummary, geoData, financials, industry) {
  const v = (key) => vocab(industry, key);
  const painCount = painSummary.totalPainPoints || painSummary.count || 0;
  const criticalCount = painSummary.criticalCount || Math.ceil(painCount * 0.3);
  const categories = painSummary.categories || [];
  const topCategory = categories[0] || 'process efficiency';

  const destPhrase = geoData.topDest
    ? `${geoData.topDest}-anchored delivery model`
    : 'optimized delivery model';

  const ftePhrase = geoData.totalMovedFTEs
    ? `${geoData.totalMovedFTEs} FTEs`
    : 'targeted headcount';

  const savingsPhrase = financials.annualSavings
    ? `$${(financials.annualSavings / 1e6).toFixed(1)}M in annual run-rate savings`
    : financials.savingsPercent
      ? `${financials.savingsPercent}% cost reduction`
      : 'significant cost optimization';

  const roiPhrase = financials.roiMonths
    ? `${financials.roiMonths}-month payback`
    : 'rapid payback';

  // Sentence 1: Diagnostic findings
  const finding = `Our diagnostic identified ${painCount} operational pain points, of which ${criticalCount} are critical, concentrated in ${topCategory} and directly impacting ${v('throughput')} and ${v('csat')}.`;

  // Sentence 2: Solution framework + geo
  const solution = geoData.topDest
    ? `The recommended solution framework combines targeted ${_synthesizeCategoryPhrase(categories)} with a ${destPhrase} transitioning ${ftePhrase} to deliver execution capacity at ${geoData.costRatio ? (geoData.costRatio * 100).toFixed(0) + '% of' : 'a fraction of'} onshore cost.`
    : `The recommended solution framework sequences ${_synthesizeCategoryPhrase(categories)} to systematically eliminate root causes and build scalable operational capacity.`;

  // Sentence 3: Financial case
  const financial = `This program is projected to deliver ${savingsPhrase} with a ${roiPhrase}, while improving ${v('quality')} metrics by 25-40% and positioning the operation for AI-enabled scale.`;

  return `${finding} ${solution} ${financial}`;
}


// ---------------------------------------------------------------------------
// SYNTHESIS HELPERS
// ---------------------------------------------------------------------------
function _synthesizeCategoryPhrase(categories) {
  const categoryLabels = {
    process_improvement: 'process standardization',
    process_optimization: 'operational optimization',
    automation: 'intelligent automation',
    agentic_ai: 'AI-native transformation',
    tech_modernization: 'technology modernization'
  };

  if (!categories || categories.length === 0) {
    return 'process optimization and intelligent automation';
  }

  const labels = categories
    .slice(0, 3)
    .map(c => categoryLabels[c] || c.replace(/_/g, ' '));

  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}


// ---------------------------------------------------------------------------
// RECOMMENDATION RETRIEVAL API
// ---------------------------------------------------------------------------

/**
 * Retrieve filtered recommendations for a given context.
 *
 * @param {Object} opts
 * @param {string} opts.industry        - Industry key (e.g., 'healthcare')
 * @param {string[]} opts.categories    - Solution categories to include
 * @param {string[]} opts.timelines     - Timeline tiers to include ('quick_win', 'medium_term', 'strategic')
 * @param {Object} opts.painSummary     - Pain summary object { count, topTheme, themes, people, process, technology }
 * @param {Object} opts.geoData         - Geo/offshore data object
 * @param {string} [opts.impactFilter]  - Filter by impact: 'high', 'medium', or null for all
 * @returns {Object[]}                  - Array of rendered recommendation objects
 */
function getRecommendations({ industry, categories, timelines, painSummary, geoData, impactFilter }) {
  const results = [];
  const allCategories = categories || Object.keys(RECOMMENDATION_TEMPLATES);
  const allTimelines = timelines || ['quick_win', 'medium_term', 'strategic'];
  const geo = geoData || {};
  const ctx = painSummary || { count: 0, topTheme: 'operational challenges', themes: [] };

  for (const category of allCategories) {
    const categoryTemplates = RECOMMENDATION_TEMPLATES[category];
    if (!categoryTemplates) continue;

    for (const timeline of allTimelines) {
      const templates = categoryTemplates[timeline];
      if (!templates) continue;

      for (const tmpl of templates) {
        if (impactFilter && tmpl.impact !== impactFilter) continue;

        const rendered = {
          category,
          timeline,
          title: tmpl.title,
          insight: tmpl.insight(industry, ctx, geo),
          geoTieIn: typeof tmpl.geoTieIn === 'function' ? tmpl.geoTieIn(geo) : null,
          impact: tmpl.impact
        };

        results.push(rendered);
      }
    }
  }

  return results;
}


/**
 * Group recommendations by timeline tier for presentation.
 *
 * @param {Object[]} recommendations - Output from getRecommendations()
 * @returns {Object}                 - { quick_win: [...], medium_term: [...], strategic: [...] }
 */
function groupByTimeline(recommendations) {
  return {
    quick_win: recommendations.filter(r => r.timeline === 'quick_win'),
    medium_term: recommendations.filter(r => r.timeline === 'medium_term'),
    strategic: recommendations.filter(r => r.timeline === 'strategic')
  };
}


/**
 * Group recommendations by category for presentation.
 *
 * @param {Object[]} recommendations - Output from getRecommendations()
 * @returns {Object}                 - Keyed by category name
 */
function groupByCategory(recommendations) {
  const grouped = {};
  for (const rec of recommendations) {
    if (!grouped[rec.category]) grouped[rec.category] = [];
    grouped[rec.category].push(rec);
  }
  return grouped;
}


/**
 * Generate a prioritized roadmap from recommendations.
 *
 * @param {Object[]} recommendations - Output from getRecommendations()
 * @returns {Object}                 - { phase1: [...], phase2: [...], phase3: [...] }
 */
function generateRoadmap(recommendations) {
  const highQuickWins = recommendations.filter(r => r.timeline === 'quick_win' && r.impact === 'high');
  const mediumQuickWins = recommendations.filter(r => r.timeline === 'quick_win' && r.impact === 'medium');
  const mediumTerm = recommendations.filter(r => r.timeline === 'medium_term');
  const strategic = recommendations.filter(r => r.timeline === 'strategic');

  return {
    phase1: {
      label: 'Phase 1: Quick Wins (0-90 days)',
      items: [...highQuickWins, ...mediumQuickWins]
    },
    phase2: {
      label: 'Phase 2: Foundation Build (3-9 months)',
      items: mediumTerm
    },
    phase3: {
      label: 'Phase 3: Strategic Transformation (9-24 months)',
      items: strategic
    }
  };
}


// ---------------------------------------------------------------------------
// EXPORTS (Node.js / ES Module compatible)
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    INDUSTRY_VOCABULARY,
    RECOMMENDATION_ACTIONS,
    RECOMMENDATION_TEMPLATES,
    vocab,
    classifyPainPointsForSolutions,
    buildDataDrivenRecommendations,
    getRecommendations,
    groupByTimeline,
    groupByCategory,
    generateRoadmap,
    generateExecutiveSynthesis
  };
}
