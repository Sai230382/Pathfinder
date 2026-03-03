# SOAR — Pathfinder

## What is this?
An interactive consulting presentation tool called **Pathfinder**. Built for live CXO-level client meetings to diagnose operational pain points and generate offshore transformation recommendations — all in one unified workflow.

**Live URL:** https://sai230382.github.io/Pathfinder/
**GitHub:** https://github.com/Sai230382/Pathfinder

## Architecture
- **Single-page app** — all HTML/CSS/JS in `index.html` (~5000+ lines)
- **External data files:**
  - `painPointLibrary.js` — 342 pain points across 17 industries (1 common + 16 specific) × 3 categories (People/Process/Technology), perfectly balanced at 114 per category
  - `recommendation-engine.js` — 60+ recommendation templates, industry vocabulary, synthesis functions
- **Libraries (CDN):**
  - Chart.js 4.x — all charts (bar, doughnut, radar, line)
  - GSAP 3.12.5 — slide transitions + element animations
  - Leaflet 1.9.4 — interactive maps (Slides 5 & 7)
  - PptxGenJS 3.12.0 — client-side PowerPoint generation (must load BEFORE recommendation-engine.js due to UMD module.exports conflict)
  - Google Fonts: Inter (body) + Playfair Display (headings)
- **No build step** — open `index.html` in browser
- **Deployment:** GitHub Pages via `cp` from SOAR working copy to Pathfinder repo

## 10-Slide Flow
| # | Slide | Purpose |
|---|-------|---------|
| 1 | Title | "Intelligent Consulting — Pathfinder" with particle animation, compass logo |
| 2 | Client Profile | Industry (4 options) + Horizontal + company size + region + client name |
| 3 | Pain Point Board | 3-column capture: People/Process/Technology with autocomplete from 342-item library |
| 4 | Client Configuration | Workforce details: locations, headcount, channels, tiers, rates, offshore picks, contact segments |
| 5 | Current State Map | Leaflet map with bubble markers + detail panel with segment bars |
| 6 | Channel & Tier Matrix | Toggle work packages, segment-weighted confidence, FTE calculator, segment strip |
| 7 | Proposed Transformation | Map with animated dotted flow lines + AI thinking overlay + segment badges |
| 8 | Financial Dashboard | Rate comparison, cost charts, ROI projection, segment savings chart, assumptions panel |
| 9 | Solution Framework + Roadmap | Radar chart + recommendation cards + synthesis + 3-phase timeline |
| 10 | Executive Summary | Before/After comparison, KPI strip, segment strategy, PDF + PPT export buttons |

## Industries & Horizontals (Slide 2)
**Industries (4):**
- Healthcare
- Banking & Financial Services (BFS)
- Retail
- Communications, Media & Technology (CMT)

**Horizontals (4):**
- Customer Ops & CX
- Back Office
- Mortgages
- Collections

## Contact Segments (6)
Added as a cross-cutting dimension orthogonal to channels, flowing through all slides:
```javascript
const CONTACT_SEGMENTS = {
  billing:        { name:'Billing & Payments',  complexity:'Simple',         offshoreAffinity:0.90, automationPotential:0.70 },
  techSupport:    { name:'Technical Support',   complexity:'Medium-Complex',  offshoreAffinity:0.60, automationPotential:0.45 },
  accountMgmt:    { name:'Account Management',  complexity:'Medium',          offshoreAffinity:0.80, automationPotential:0.55 },
  salesRetention: { name:'Sales & Retention',   complexity:'Complex',         offshoreAffinity:0.40, automationPotential:0.30 },
  orderMgmt:      { name:'Order Management',    complexity:'Simple-Medium',   offshoreAffinity:0.85, automationPotential:0.75 },
  generalInquiry: { name:'General Inquiries',   complexity:'Simple',          offshoreAffinity:0.95, automationPotential:0.85 }
};
```
- **Slide 4:** 3x2 grid of segment % inputs (must sum to 100%)
- **Slide 5:** Segment bars in location detail panel with complexity badges
- **Slide 6:** Segment strip above matrix + segment-weighted confidence (`70% base + 30% segment affinity`)
- **Slide 7:** Segment badges on transform solutions + risk callouts for low-affinity segments
- **Slide 8:** Horizontal bar chart "Savings Potential by Contact Segment"
- **Slide 9:** Roadmap milestones reference pilot/retain segments
- **Slide 10:** Current/Future state shows segment mix with priority offshore/retain recommendations

## Key State Variables
- `diagnosticContext` — { industry, horizontal, companySize, region, clientName }
- `selectedPainPoints` — { people: [], process: [], technology: [] }
- `CONFIG` — rebuilt from form data on slide 4 submission, includes `segments` property
- `formLocations`, `formTiers`, `formRates`, `formOffshoreSelections`, `formSegments` — form state
- `offshoreSelections` — which channel/tier combos are toggled for offshore
- `chartInstances` — Chart.js instance cache for cleanup
- `LLM_CONFIG` — provider, apiKey, endpoint, enabled (persisted in localStorage)
- `currentScenario` — Conservative / Moderate / Aggressive (affects offshore %)

## Key Functions
- `initPainBoard()` — typeahead autocomplete pulling from PAIN_POINT_LIBRARY
- `buildSolutionFramework()` — radar chart + recommendation cards from recommendation-engine.js
- `computeAffinityScore()` — 5-factor model (language 35%, timezone 20%, cost 25%, culture 10%, channel 10%)
- `calculateOffshoreImpact()` / `calculateFinancials()` — core financial calculations
- `generateInsightNarrative()` — produces pairing analysis with risks
- `getSegmentWeightedConfidence(channel, tier)` — blends base confidence with segment affinity
- `getSegmentProfile()` — returns `{dominant, highAutomation[], lowOffshore[]}` for narrative use
- `renderSegmentInputs()` / `updateSegment()` / `updateSegmentValidation()` — segment form handling
- `callLLM()` — async API call with fallback to rule-based engine
- `collectDataContext()` — gathers all data for AI/recommendation context
- `exportReport()` — 4-page print PDF (exec brief + destinations + financials + diagnostic)
- `exportPPT()` — 8-slide CXO PowerPoint deck via PptxGenJS
- `initDigitalRain()` / `initGlobe()` / `initParticles()` — ambient visual animations

## Export System

### PDF Report (4 pages, via `window.print()`)
| Page | Title | Content |
|------|-------|---------|
| 1 | Executive Brief | Industry, horizontal, overview table, key findings, affinity scorecard |
| 2 | Destination Analysis | Pairing cards, risk assessment, methodology |
| 3 | Financial Summary | Cost comparison table, segment table, savings breakdown cards |
| 4 | Diagnostic & Recommendations | Pain points by category, solution cards, synthesis |

Print CSS: All `.slide` elements hidden, only `.print-page` sections render. `@page` rules for A4 portrait. Page numbers via CSS counters.

### PowerPoint Deck (8 slides, via PptxGenJS)
| Slide | Title | Enhancements |
|-------|-------|-------------|
| 1 | Title | Compass logo (base64), gradient bg, decorative accent bars |
| 2 | Executive Summary | Shadow KPI cards, key findings bullets |
| 3 | Current State | Locations table + segment donut chart with legend |
| 4 | Proposed Transformation | Destinations table + segment strategy cards + top pairings |
| 5 | Before/After Comparison | Side-by-side cards with arrow connector |
| 6 | Financial Impact | Cost table + savings bar chart + shadow KPI cards |
| 7 | Recommendations | Large numbered cards (01-06) with vertical dividers |
| 8 | Implementation Roadmap | Timeline bar + 3 phase cards + next steps |

Design system: Dark navy gradients, cyan/purple accents, Arial font, slide numbers, compass logo in footer.

## Generated Artifacts
- `/Users/saikiran/SOAR/Pathfinder_PainPoints_Library.csv` — 342 pain points as CSV (Category, Industry, Pain Point)
- `/Users/saikiran/SOAR/Pathfinder_BRD.docx` — Comprehensive BRD (11 sections, 43KB)

## Design System
- Dark theme: `#0a1628` bg, `#1e293b` cards, `#334155` borders
- Gradient alternates: `#0f1d32`, `#111e33` for PPT slides
- Accents: Cyan `#00d4ff`, Purple `#7c5cfc`, Green `#10b981`, Amber `#f59e0b`, Red `#ef4444`
- Fonts: Playfair Display (headings), Inter (body), Arial (PPT - universal)
- Complexity badges: Simple (green), Medium (amber), Complex (red)
- All animations via GSAP — professional, subtle (0.3-0.5s)
- No brain/robot imagery — compass/geometric for AI overlays
- Nav bar: `position:fixed; bottom:24px` with `z-index:100`, all slides have `padding-bottom:100px` to avoid overlap

## Conventions
- Functions exposed globally via `window.functionName = ...` for onclick handlers
- All code inside single IIFE in `index.html`
- Chart.js instances tracked in `chartInstances` and destroyed before recreation
- GSAP used for all slide transitions and element reveals
- CSS variables for theming in `:root`
- PptxGenJS CDN must load BEFORE `recommendation-engine.js` (UMD module.exports conflict)
- Deployment: `cp SOAR/index.html Pathfinder/index.html` then `git add && commit && push`
- Browser cache aggressively caches GitHub Pages — always Cmd+Shift+R after deploy

## File Structure
```
/Users/saikiran/SOAR/                    # Working copy
  index.html                              # Main app (~5000+ lines)
  painPointLibrary.js                     # 342 pain points
  recommendation-engine.js                # 60+ recommendation templates
  Pathfinder_PainPoints_Library.csv       # Generated spreadsheet
  Pathfinder_BRD.docx                     # Generated BRD
  CLAUDE.md                               # This file

/Users/saikiran/Pathfinder/              # GitHub Pages deployment
  index.html                              # Synced from SOAR
  painPointLibrary.js                     # Synced from SOAR
  recommendation-engine.js                # Synced from SOAR
```

## Change Log (Recent)
1. **6 Contact Segments** — Added billing, techSupport, accountMgmt, salesRetention, orderMgmt, generalInquiry flowing through all 10 slides
2. **Slide 6 Segment Strip** — Segment cards above matrix with offshore fit scores
3. **Slide 6 Enriched Rationale** — Matrix rationale includes segment-specific insights
4. **Nav Bar Overlap Fix** — `padding-bottom:100px` on all slides
5. **PDF Export Overhaul** — Hide all live slides, @page rules, page numbers, new Financial Summary page (4 pages total)
6. **PPT Export (PptxGenJS)** — 8-slide CXO deck with gradients, native charts, shadows, numbered recs, logos, Before/After slide
7. **Industry Slim-down** — 4 industries (Healthcare, BFS, Retail, CMT) + 4 Horizontals (Customer Ops & CX, Back Office, Mortgages, Collections)
8. **Title Slide Cleanup** — Removed "500 FTEs / 4 Channels / 2 Regions" meta pills
9. **Assumptions Panel Restyle** — Gradient button, centered, full-width inside dashboard grid with hover glow
