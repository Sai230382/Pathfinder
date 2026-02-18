const PAIN_POINT_LIBRARY = {
  people: {
    _common: [
      'High employee attrition rates',
      'Inconsistent onboarding experience',
      'Limited career progression pathways',
      'Skills gap in digital capabilities',
      'Low employee engagement scores',
      'Knowledge loss from retiring workforce',
      'Insufficient cross-functional collaboration',
      'Overreliance on tribal knowledge',
      'Burnout from excessive manual workloads',
      'Lack of leadership development pipeline',
      'Poor change management adoption',
      'Workforce planning misaligned to demand',
      'Inadequate performance feedback loops',
      'Remote workforce engagement declining',
      'Diversity and inclusion targets not met',
      'Middle management capability gaps',
      'Contractor-to-FTE conversion pipeline slow',
      'Employee wellness program underutilization'
    ],
    healthcare: [
      'Clinical staff shortages across specialties',
      'Nurse burnout and turnover crisis',
      'Credentialing backlogs delaying onboarding',
      'Provider scheduling inequity complaints',
      'Lack of telehealth-trained clinicians',
      'Fragmented care team communication'
    ],
    financial_services: [
      'Compliance officer talent scarcity',
      'Advisor attrition to fintech competitors',
      'Siloed relationship manager knowledge',
      'Risk analyst pipeline insufficient',
      'Branch workforce underutilization',
      'Fraud investigation team capacity limits'
    ],
    manufacturing: [
      'Skilled trades recruitment pipeline gap',
      'Aging workforce succession risk',
      'High shop floor turnover rates',
      'Safety culture compliance fatigue',
      'Maintenance technician knowledge silos',
      'Limited lean methodology proficiency'
    ],
    retail: [
      'Seasonal staffing ramp-up delays',
      'Store associate turnover exceeding targets',
      'Inconsistent omnichannel training programs',
      'Loss prevention staffing shortfalls',
      'District manager span of control issues',
      'Merchandising team alignment gaps'
    ],
    technology: [
      'Senior engineer retention declining',
      'DevOps talent acquisition bottleneck',
      'Product-engineering alignment friction',
      'Cloud migration skills shortage',
      'Security talent market premium',
      'Technical debt ownership ambiguity'
    ],
    telecom: [
      'Field technician dispatch inefficiency',
      'Network engineer retention challenges',
      'Retail store staff product knowledge gaps',
      'Call center agent attrition spike',
      'Fiber deployment crew shortage',
      'Cross-sell capability gaps in frontline'
    ],
    insurance: [
      'Underwriter talent pipeline drying up',
      'Claims adjuster capacity constraints',
      'Actuary succession planning gaps',
      'Agency force digital literacy deficit',
      'Complex product training ineffectiveness',
      'Policyholder service agent burnout'
    ],
    logistics: [
      'Driver recruitment and retention crisis',
      'Warehouse labor market tightening',
      'Dispatch coordinator turnover impact',
      'Cold chain specialist scarcity',
      'Last-mile delivery workforce scaling',
      'Customs brokerage expertise concentration'
    ],
    energy: [
      'Utility lineworker retirement wave',
      'Renewable energy skills transition gap',
      'Field safety compliance inconsistency',
      'SCADA operator knowledge concentration',
      'Environmental compliance specialist shortage',
      'Grid modernization talent deficit'
    ],
    government: [
      'Civil servant retirement cliff approaching',
      'Competitive pay gap vs private sector',
      'Cybersecurity analyst recruitment failure',
      'Siloed inter-agency workforce planning',
      'Citizen service representative burnout',
      'Procurement officer capacity bottleneck'
    ],
    professional_services: [
      'Consultant utilization rate pressure',
      'Partner-track attrition at mid-levels',
      'Subject matter expert bandwidth limits',
      'Cross-practice staffing coordination',
      'Billable hours vs development tension',
      'Junior talent accelerated turnover'
    ],
    cx_operations: [
      'Agent attrition above industry benchmark',
      'Supervisor-to-agent ratio imbalance',
      'Multilingual agent sourcing difficulty',
      'Quality assurance team understaffing',
      'Workforce management forecast accuracy',
      'Tier-2 escalation specialist shortage'
    ],
    media: [
      'Content creator retention in competitive market',
      'Newsroom staffing levels unsustainable',
      'Digital production talent acquisition delays',
      'Ad sales team quota attainment declining',
      'Rights management specialist shortage',
      'Streaming platform engineering talent war'
    ],
    hospitality: [
      'Seasonal staffing ramp-up consistently late',
      'Front desk agent turnover exceeding 80%',
      'Housekeeping crew absenteeism spikes',
      'F&B management pipeline insufficient',
      'Revenue management analyst scarcity',
      'Guest experience staff training inconsistent'
    ],
    pharma: [
      'Clinical research associate retention crisis',
      'Regulatory affairs specialist pipeline gap',
      'Medical science liaison recruitment bottleneck',
      'Pharmacovigilance staffing lagging volume',
      'Manufacturing quality technician shortage',
      'Drug safety reporting team capacity limits'
    ],
    education: [
      'Faculty recruitment in STEM disciplines',
      'Adjunct instructor reliance increasing risk',
      'Student advisor caseload exceeding standards',
      'IT support staff turnover in campus systems',
      'Enrollment counselor burnout and attrition',
      'Research staff grant-dependent instability'
    ]
  },

  process: {
    _common: [
      'No standardized operating procedures',
      'Undocumented tribal process knowledge',
      'Excessive manual data entry steps',
      'Redundant approval chain bottlenecks',
      'Inconsistent handoff between departments',
      'Lack of end-to-end process visibility',
      'Reporting cadence misaligned to decisions',
      'Error-prone spreadsheet-based workflows',
      'No closed-loop feedback mechanism',
      'Fragmented vendor management process',
      'Root cause analysis rarely completed',
      'Audit trail gaps in key workflows',
      'Duplicate data entry across systems',
      'SLA breach resolution process undefined',
      'Change request management overwhelmed',
      'Cross-regional process standardization lacking',
      'Compliance training completion tracking manual',
      'Vendor SLA monitoring reactive not proactive'
    ],
    healthcare: [
      'Prior authorization turnaround delays',
      'Manual patient intake documentation',
      'Fragmented discharge planning workflow',
      'Claim denial rework cycle inefficiency',
      'Medication reconciliation process gaps',
      'Referral management tracking breakdown'
    ],
    financial_services: [
      'Manual KYC compliance verification',
      'Loan origination cycle time excessive',
      'Fragmented account opening workflow',
      'Reconciliation process error-prone',
      'AML alert triage backlog growing',
      'Portfolio rebalancing manual intervention'
    ],
    manufacturing: [
      'Production scheduling relies on spreadsheets',
      'Quality inspection bottleneck at final stage',
      'Supplier qualification process too slow',
      'Bill of materials change control gaps',
      'Preventive maintenance scheduling reactive',
      'Non-conformance report resolution delays'
    ],
    retail: [
      'Markdown optimization lacks data inputs',
      'Store replenishment forecast inaccuracy',
      'Returns processing workflow fragmented',
      'Planogram compliance verification manual',
      'Vendor onboarding cycle too lengthy',
      'Promotional pricing approval delays'
    ],
    technology: [
      'Incident triage routing inconsistency',
      'Release management handoff friction',
      'Customer escalation path undefined',
      'Technical debt prioritization absent',
      'Sprint retrospective actions not tracked',
      'Feature request intake unstructured'
    ],
    telecom: [
      'Service provisioning order fallout rate',
      'Network trouble ticket duplication',
      'Tower lease renewal tracking manual',
      'Customer migration process error rate',
      'Capacity planning cycle too long',
      'Number porting workflow exceptions'
    ],
    insurance: [
      'Policy issuance turnaround too slow',
      'Claims FNOL intake inconsistency',
      'Underwriting referral queue backlog',
      'Endorsement processing manual steps',
      'Subrogation recovery process leakage',
      'Renewal retention workflow reactive'
    ],
    logistics: [
      'Shipment exception handling manual',
      'Carrier rate negotiation unstructured',
      'Customs documentation error frequency',
      'Proof of delivery reconciliation delays',
      'Route optimization recalculation lag',
      'Warehouse slotting review infrequent'
    ],
    energy: [
      'Outage restoration prioritization manual',
      'Meter-to-cash cycle inefficiency',
      'Permit acquisition timeline unpredictable',
      'Asset inspection scheduling fragmented',
      'Renewable interconnection queue backlog',
      'Demand response enrollment process slow'
    ],
    government: [
      'Permit application review cycle excessive',
      'Inter-agency data sharing blocked',
      'Procurement bid evaluation slow',
      'Constituent complaint resolution tracking',
      'Grant disbursement audit trail gaps',
      'FOIA request processing backlog'
    ],
    professional_services: [
      'Proposal development cycle too long',
      'Time and expense capture inconsistent',
      'Resource allocation across projects opaque',
      'Client deliverable review loops excessive',
      'Knowledge management contribution low',
      'Subcontractor compliance tracking manual'
    ],
    cx_operations: [
      'First contact resolution rate declining',
      'Call routing logic outdated rules-based',
      'Interaction quality scoring inconsistent',
      'Customer callback scheduling manual',
      'Cross-channel context not maintained',
      'Complaint escalation path unclear'
    ],
    media: [
      'Content distribution workflow bottlenecked',
      'Ad trafficking process error-prone',
      'Rights clearance turnaround delays',
      'Audience measurement data reconciliation manual',
      'Cross-platform publishing workflow fragmented',
      'Editorial approval chain too many steps'
    ],
    hospitality: [
      'Reservation-to-arrival handoff gaps',
      'Guest complaint resolution cycle slow',
      'Revenue management pricing update manual',
      'Housekeeping room turnover tracking paper-based',
      'Vendor procurement approval delays',
      'Loyalty program enrollment process fragmented'
    ],
    pharma: [
      'Clinical trial enrollment pipeline slow',
      'Adverse event reporting cycle excessive',
      'Regulatory submission document assembly manual',
      'Manufacturing batch record review backlog',
      'Supply chain temperature excursion handling reactive',
      'Patent lifecycle tracking unstructured'
    ],
    education: [
      'Student enrollment application review backlog',
      'Course scheduling conflict resolution manual',
      'Financial aid disbursement cycle delays',
      'Research grant reporting process fragmented',
      'Campus facilities work order tracking gaps',
      'Accreditation compliance documentation scattered'
    ]
  },

  technology: {
    _common: [
      'Legacy system integration complexity',
      'Siloed data across business units',
      'No single source of truth exists',
      'Outdated CRM limiting capabilities',
      'Manual report generation from multiple tools',
      'API infrastructure nonexistent or brittle',
      'Cybersecurity posture assessment overdue',
      'Cloud migration roadmap undefined',
      'Business intelligence adoption low',
      'Data warehouse schema not governed',
      'Vendor lock-in limiting flexibility',
      'Real-time analytics capability absent',
      'IT service management tooling fragmented',
      'Data governance policy enforcement weak',
      'Disaster recovery plan untested',
      'Shadow IT proliferation uncontrolled',
      'Mobile workforce tooling insufficient',
      'AI/ML infrastructure and tooling absent'
    ],
    healthcare: [
      'EHR interoperability between systems poor',
      'Patient portal adoption rate stagnant',
      'Clinical decision support underutilized',
      'Health data exchange standards lagging',
      'Remote patient monitoring integration gap',
      'Legacy billing system constraining revenue'
    ],
    financial_services: [
      'Core banking platform end-of-life nearing',
      'Fraud detection models stale and rules-based',
      'Open banking API readiness lacking',
      'Customer data platform not implemented',
      'Real-time payment infrastructure absent',
      'Regulatory reporting system brittle'
    ],
    manufacturing: [
      'OT-IT network convergence incomplete',
      'MES-ERP integration gaps persist',
      'IoT sensor data not operationalized',
      'Digital twin adoption not initiated',
      'Legacy SCADA system security risk',
      'Predictive maintenance platform missing'
    ],
    retail: [
      'POS system fragmentation across brands',
      'Inventory visibility across channels poor',
      'Loyalty platform personalization limited',
      'E-commerce platform scalability ceiling',
      'Clienteling tools not mobile-enabled',
      'Demand sensing data feeds disconnected'
    ],
    technology: [
      'Monolithic architecture inhibiting velocity',
      'Observability tooling coverage insufficient',
      'CI/CD pipeline reliability degrading',
      'Multi-cloud governance framework absent',
      'Technical debt compounding quarterly',
      'Developer experience platform fragmented'
    ],
    telecom: [
      'BSS/OSS stack modernization stalled',
      'Network function virtualization incomplete',
      'Subscriber data platform fragmented',
      'Self-service portal capability limited',
      'Real-time network analytics gap',
      '5G core integration complexity'
    ],
    insurance: [
      'Policy administration system inflexible',
      'Claims management platform outdated',
      'Actuarial modeling tools siloed',
      'Agent portal experience substandard',
      'Telematics data integration absent',
      'Straight-through processing rate low'
    ],
    logistics: [
      'TMS-WMS integration unreliable',
      'Real-time shipment tracking gaps',
      'Fleet telematics data underutilized',
      'EDI connectivity with partners limited',
      'Yard management system nonexistent',
      'Last-mile delivery platform scaling issues'
    ],
    energy: [
      'Grid management SCADA system aging',
      'Smart meter data analytics immature',
      'Outage management system unreliable',
      'DER integration platform lacking',
      'Asset performance management manual',
      'Energy trading system latency issues'
    ],
    government: [
      'Citizen-facing portal modernization overdue',
      'Legacy mainframe systems unsupported',
      'Inter-agency system interoperability poor',
      'Cybersecurity framework implementation gaps',
      'Open data platform underperforming',
      'Case management system fragmentation'
    ],
    professional_services: [
      'PSA tool adoption inconsistent',
      'Knowledge repository search ineffective',
      'Client collaboration platform fragmented',
      'Proposal automation tooling absent',
      'Resource forecasting model unsophisticated',
      'Data analytics self-service limited'
    ],
    cx_operations: [
      'CCaaS platform migration incomplete',
      'Omnichannel routing engine outdated',
      'CRM-telephony integration unreliable',
      'Speech analytics not deployed at scale',
      'Agent desktop tool sprawl excessive',
      'Knowledge base search relevancy poor'
    ],
    media: [
      'Content management system aging and inflexible',
      'Ad tech stack integration unreliable',
      'Digital asset management platform fragmented',
      'Audience data platform not unified',
      'Streaming infrastructure scalability ceiling',
      'Rights management database siloed'
    ],
    hospitality: [
      'PMS-CRM integration unreliable',
      'Revenue management system outdated',
      'Guest WiFi analytics not operationalized',
      'Online booking engine conversion rate low',
      'Loyalty platform personalization limited',
      'IoT room automation platform nonexistent'
    ],
    pharma: [
      'LIMS-ERP integration gaps persist',
      'Clinical trial management system outdated',
      'Pharmacovigilance database interoperability poor',
      'Manufacturing execution system inflexible',
      'Drug safety signal detection manual',
      'Regulatory information management platform fragmented'
    ],
    education: [
      'Student information system aging and inflexible',
      'Learning management system adoption uneven',
      'Research data management platform absent',
      'Campus ERP integration incomplete',
      'Admissions CRM analytics limited',
      'Library digital resource platform outdated'
    ]
  }
};


const SOLUTION_TAXONOMY = {
  process_improvement: {
    keywords: [
      'no standard', 'undocumented', 'inconsistent', 'undefined', 'unstructured',
      'no closed-loop', 'fragmented', 'gaps', 'unclear', 'misaligned',
      'compliance', 'audit trail', 'governance', 'documentation', 'standards',
      'visibility', 'tracking', 'quality', 'framework', 'procedures',
      'attrition', 'turnover', 'retention', 'burnout', 'morale', 'engagement',
      'training', 'onboarding', 'skill', 'knowledge', 'change request', 'change management',
      'overwhelm', 'workload', 'understaffed', 'hiring', 'talent', 'absenteeism',
      'escalation', 'sla', 'service level', 'customer satisfaction', 'csat',
      'nps', 'churn', 'complaint', 'dissatisfaction', 'experience'
    ],
    label: 'Process Improvement',
    color: '#3b82f6',
    icon: '\u{1F4CB}'
  },
  process_optimization: {
    keywords: [
      'slow', 'bottleneck', 'redundant', 'excessive', 'delays',
      'cycle time', 'turnaround', 'backlog', 'queue', 'too long',
      'rework', 'inefficiency', 'lag', 'overdue', 'reactive',
      'declining', 'leakage', 'dropout', 'fallout', 'error rate',
      'waste', 'cost', 'expensive', 'overtime', 'capacity', 'utilization',
      'throughput', 'volume', 'peak', 'demand', 'overload'
    ],
    label: 'Process Optimization',
    color: '#8b5cf6',
    icon: '\u26A1'
  },
  automation: {
    keywords: [
      'manual', 'repetitive', 'data entry', 'spreadsheet', 'hand-off',
      'paper-based', 'copy-paste', 'reconciliation', 'duplicate', 'rekeying',
      'batch processing', 'email-driven', 'template', 'form-filling', 'verification',
      'extraction', 'matching', 'validation', 'report generation', 'scheduling',
      'time-consuming', 'labor-intensive', 'tedious', 'human error', 'clerical'
    ],
    label: 'Automation / RPA',
    color: '#10b981',
    icon: '\u{1F916}'
  },
  agentic_ai: {
    keywords: [
      'routing', 'triage', 'prediction', 'classification', 'recommendation',
      'anomaly', 'scoring', 'prioritization', 'detection', 'forecasting',
      'personalization', 'sentiment', 'optimization', 'demand sensing', 'decision support',
      'natural language', 'pattern', 'intelligence', 'adaptive', 'cognitive',
      'self-service', 'chatbot', 'virtual agent', 'ai', 'machine learning'
    ],
    label: 'Agentic AI',
    color: '#00d4ff',
    icon: '\u{1F9FF}'
  },
  tech_modernization: {
    keywords: [
      'legacy', 'outdated', 'siloed', 'end-of-life', 'aging',
      'inflexible', 'monolithic', 'fragmented', 'brittle', 'vendor lock-in',
      'interoperability', 'migration', 'integration', 'platform', 'infrastructure',
      'architecture', 'scalability', 'modernization', 'convergence', 'virtualization',
      'system', 'tool', 'software', 'technology', 'upgrade', 'downtime', 'security'
    ],
    label: 'Tech Modernization',
    color: '#f97316',
    icon: '\u{1F527}'
  }
};
