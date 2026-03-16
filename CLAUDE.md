# SOAR — Pathfinder

## What is this?
An interactive consulting presentation tool called **Pathfinder**. Built for live CXO-level client meetings to diagnose operational pain points and generate offshore transformation recommendations — all in one unified workflow.

**Live URL:** https://sai230382.github.io/Pathfinder/
**GitHub:** https://github.com/Sai230382/Pathfinder

## Architecture
- **Single-page app** — all HTML/CSS/JS in `index.html` (~5900+ lines)
- **External data files:**
  - `painPointLibrary.js` — 450 pain points across 23 keys (1 common + 16 industries + 6 new: utilities, diversified, customer_ops, back_office, mortgages, collections) × 3 categories (People/Process/Technology)
  - `recommendation-engine.js` — 60+ recommendation templates, industry vocabulary (including utilities & diversified), synthesis functions
- **Libraries (CDN) — load order matters:**
  1. Chart.js 4.x — all charts (bar, doughnut, radar, line)
  2. GSAP 3.12.5 — slide transitions + element animations
  3. Leaflet 1.9.4 — interactive maps (Slides 5 & 8)
  4. PptxGenJS 3.12.0 — client-side PowerPoint generation (**must load BEFORE recommendation-engine.js** due to UMD module.exports conflict)
  5. **Three.js r134** (`three@0.134.0/build/three.min.js`) — 3D globe on Slide 1 (**must load AFTER PptxGenJS**)
  6. `painPointLibrary.js`
  7. `recommendation-engine.js`
  - Google Fonts: Inter (body) + Playfair Display (headings)
- **No build step** — open `index.html` in browser
- **Deployment:** GitHub Pages via `cp` from SOAR working copy to Pathfinder repo

## 11-Slide Flow
| # | Slide | Purpose |
|---|-------|---------|
| 1 | Home Scene | Two-homes opening: Apartment (MVP) + Villa (Full Pathfinder) with 3D rotating globe divider, SVG buildings, window flicker animation |
| 2 | Client Profile | Industry (6 options) + Horizontal (4 options) + company size + region + client name |
| 3 | Pain Point Board | 3-column capture: People/Process/Technology with autocomplete filtered by industry + horizontal |
| 4 | Client Configuration | Workforce details: locations, headcount, channels, tiers, rates, offshore picks, contact segments |
| 5 | Current State Map | Leaflet map with bubble markers + detail panel with segment bars |
| 6 | Transformation Strategy Brief | 2-col: left = industry context strip + 2×3 lever card grid (toggle to activate); right = 2×2 segment strategy matrix (Offshore Affinity × Automation Potential) + treatment list |
| 7 | Channel & Tier Matrix | Toggle work packages, segment-weighted confidence, FTE calculator, segment strip |
| 8 | Proposed Transformation | Map with hair-thin animated dotted flow lines + FTE flow cards (grouped by source) + proximity-nudged markers + AI thinking overlay + segment badges + lever cards with "View Full Detail" modals |
| 9 | Financial Dashboard | Rate comparison, cost charts, ROI projection, segment savings chart, assumptions panel (dark card with cyan border above segment chart) |
| 10 | Solution Framework + Roadmap | Radar chart + recommendation cards + synthesis + 3-phase timeline |
| 11 | Executive Summary | Before/After comparison, KPI strip, segment strategy, PDF + PPT export buttons |

## Slide 1 — Two-Homes Opening Scene
Replaces the old title slide with an immersive night-sky scene where users choose between two buildings:

**HTML structure:**
```html
<section class="slide slide-home-select active" id="slide-1">
  <canvas id="particles-canvas"></canvas>
  <div class="hs-header">  <!-- compass SVG, eyebrow, PATHFINDER title, prompt --></div>
  <div class="homes-scene">
    <div class="home-wrapper" id="home-mvp" onclick="selectMode('mvp')">
      <!-- SVG apartment building (.aw window classes) + .home-card.apt-card -->
    </div>
    <div class="homes-or">
      <canvas id="globe-canvas" width="200" height="200"></canvas>
      <span class="globe-or-label">or</span>
    </div>
    <div class="home-wrapper" id="home-villa" onclick="selectMode('full')">
      <!-- SVG villa building (.vw window classes) + .home-card.villa-card -->
    </div>
  </div>
  <div id="villa-soon" class="villa-soon-overlay"><!-- Reimagining overlay --></div>
</section>
```

**Key details:**
- Apartment card: tag "LIVE NOW", title "Pathfinder MVP", desc "Global Delivery Optimisation"
- Villa card: tag "COMING SOON", title "Pathfinder", desc "Transform & Transition"
- Globe: 200×200px WebGL canvas between the two cards (see Globe section below)
- `appMode` global: `'mvp' | 'full'`
- `selectMode('mvp')` — GSAP pulse + navigate to Slide 2
- `selectMode('full')` — shows `#villa-soon` overlay ("Reimagining the Operating Model")
- Villa overlay ESC handler in `bindEvents()` (NOT inline onclick — IIFE scope)
- Window flicker: `.aw` (cyan lit) and `.vw` (purple lit) classes toggled via `setInterval`

## 3D Globe (Slide 1 divider)
Three.js WebGL globe between the MVP and Villa cards.

**Function:** `initGlobe3D()` — called from `playTitleAnimation()`, cleaned up on Slide 1 exit
**Cleanup:** `cancelAnimationFrame(window._g3d.raf)` + `renderer.dispose()` stored in `window._g3d`

**Key implementation details:**
```javascript
// Canvas: 200×200px, alpha:true, antialias:true
// Camera: PerspectiveCamera(40, 1, 0.1, 100), position.z = 2.8
// Earth: SphereGeometry(1, 64, 32) with MeshPhongMaterial
//   - Fallback color: 0x1a4a7a (ocean blue) while texture loads
//   - Texture loaded via callback: earthMat.map = tex; earthMat.color.set(0xffffff)
//   - Texture URL: cdn.jsdelivr.net/gh/mrdoob/three.js@r134/examples/textures/planets/earth_atmos_2048.jpg
//   - shininess: 8 (low — avoids specular hotspot)
// Atmosphere inner: SphereGeometry(1.055), opacity:0.065, FrontSide
// Halo outer: SphereGeometry(1.13), opacity:0.042, BackSide
// Lighting:
//   - AmbientLight(0x334466, 1.6) — STRONG so dark side always shows texture
//   - DirectionalLight sun(0xfff5e0, 0.85) at position(5, 3, -0.8) — side-top, slightly BEHIND globe
//   - DirectionalLight rim(0x0044aa, 0.3) at position(-4, 0, -3) — back-left limb glow
// Rotation: earth.rotation.y += 0.0014 per frame
// Stars: 1200 BufferGeometry points, size 0.13, opacity 0.65
```

**Critical lighting rule:** Sun Z must be NEGATIVE (behind globe) to avoid torch/flashlight effect. Positive Z = sun between camera and globe = harsh face-on spotlight.

**CSS:** `#globe-canvas { width:200px; height:200px; border-radius:50%; box-shadow: 0 0 45px rgba(0,212,255,0.25)... }`

## Industries & Horizontals (Slide 2)
**Industries (6):**
- Healthcare
- Banking & Financial Services (BFS)
- Retail
- Communications, Media & Technology (CMT)
- Utilities
- Diversified

**Horizontals (4):**
- Customer Ops & CX
- Back Office
- Mortgages
- Collections

## Pain Point Library (450 entries)
Structure: `PAIN_POINT_LIBRARY.{people|process|technology}.{key}` → array of strings
- `_common` — 18 universal pain points per category
- 16 original industries: healthcare, financial_services, manufacturing, retail, technology, telecom, insurance, logistics, energy, government, professional_services, cx_operations, media, hospitality, pharma, education — 6 each
- **New industries:** `utilities`, `diversified` — 6 each per category
- **New horizontals:** `customer_ops`, `back_office`, `mortgages`, `collections` — 6 each per category

Autocomplete on Slide 3 builds pool: `_common` + `industry-specific` + `horizontal-specific`

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
- `appMode` — `'mvp' | 'full'` — which home the user selected on Slide 1
- `diagnosticContext` — { industry, horizontal, companySize, region, clientName }
- `selectedPainPoints` — { people: [], process: [], technology: [] }
- `CONFIG` — rebuilt from form data on slide 4 submission, includes `segments` property
- `formLocations`, `formTiers`, `formRates`, `formOffshoreSelections`, `formSegments` — form state
- `offshoreSelections` — which channel/tier combos are toggled for offshore
- `chartInstances` — Chart.js instance cache for cleanup
- `LLM_CONFIG` — provider, apiKey, endpoint, enabled (persisted in localStorage)
- `currentScenario` — Conservative / Moderate / Aggressive (affects offshore %)
- `window._g3d` — `{ renderer, raf }` — Three.js globe instance for cleanup

## Key Functions
- `playTitleAnimation()` — GSAP timeline for home scene entrance; calls `initWindowFlicker()` + `initGlobe3D()`
- `initWindowFlicker()` — randomised `setInterval` toggling `.lit` class on `.aw` / `.vw` window elements
- `initGlobe3D()` — Three.js WebGL rotating Earth on Slide 1 (see Globe section above)
- `selectMode(mode)` — handles MVP/Villa click: pulse animation + navigate, or show coming-soon overlay
- `initPainBoard()` — typeahead autocomplete pulling from PAIN_POINT_LIBRARY, filtered by `diagnosticContext.industry` + `diagnosticContext.horizontal`
- `buildSolutionFramework()` — radar chart + recommendation cards from recommendation-engine.js
- `computeAffinityScore()` — 5-factor model (language 35%, timezone 20%, cost 25%, culture 10%, channel 10%)
- `calculateOffshoreImpact()` / `calculateFinancials()` — core financial calculations
- `generateInsightNarrative()` — produces pairing analysis with risks
- `getSegmentWeightedConfidence(channel, tier)` — blends base confidence with segment affinity
- `getSegmentProfile()` — returns `{dominant, highAutomation[], lowOffshore[]}` for narrative use
- `renderSegmentInputs()` / `updateSegment()` / `updateSegmentValidation()` — segment form handling
- `handleAnalyze()` — async try/catch/finally; shows spinner + "Generating Transformation Plan..."; `navigateToSlide` guaranteed in `finally` block
- `callLLM()` — async API call with fallback to rule-based engine
- `collectDataContext()` — gathers all data for AI/recommendation context
- `exportReport()` — 4-page print PDF (exec brief + destinations + financials + diagnostic)
- `exportPPT()` — 8-slide CXO PowerPoint deck via PptxGenJS
- `initTransformMap(impact)` — Slide 7 map with proximity-nudged markers, hair-thin flow lines, grouped flow summary cards
- `getNudgedLatLng(code)` — detects nearby markers within 5° lat / 8° lng and offsets them radially
- `initDigitalRain()` / `initGlobe()` / `initParticles()` — ambient visual animations (note: `initGlobe()` = Slide 2 Leaflet globe, distinct from `initGlobe3D()` = Slide 1 Three.js globe)

## Slide 7 — Transform Map Details
- **Markers:** 36px bubble dots (adaptive: 44-56px based on total location count), no language line, country name with dark bg label
- **Proximity nudging:** Markers within 5° lat / 8° lng get radially offset (angles 0-300°, variable distance 2.5-5.5°)
- **Flow lines:** Hair-thin dotted (`weight:1.2, opacity:0.7, dashArray:'3 5'`), animated via CSS `dash-flow` keyframes
- **Color palette (bright for dark map):** `['#00d4ff', '#a78bfa', '#fbbf24', '#34d399', '#f87171', '#f472b6', '#22d3ee', '#a3e635']`
- **FTE Flow summary:** Side-by-side cards grouped by source location (no mid-line labels), each card shows source name + color dot + destination flows sorted by FTE count
- **Solution bullets (left/right columns):** Split by `→` arrows into bullet list items, each uppercase. Shows triggering pain point(s) in purple italic.

## Export System

### PDF Report (4 pages, via `window.print()`)
| Page | Title | Content |
|------|-------|---------|
| 1 | Executive Brief | Industry, horizontal, overview table, key findings, affinity scorecard |
| 2 | Destination Analysis | Pairing cards, risk assessment, methodology |
| 3 | Financial Summary | Cost comparison table, segment table, savings breakdown cards |
| 4 | Diagnostic & Recommendations | Pain points by category, solution cards, synthesis |

Print CSS: All `.slide` elements hidden, only `.print-page` sections render. `@page` rules for A4 portrait. Page numbers via CSS counters. `.homes-scene` and `#globe-canvas` are hidden in print.

### PowerPoint Deck (8 slides, via PptxGenJS)
| Slide | Title | Enhancements |
|-------|-------|-------------|
| 1 | Title | Compass logo (base64), gradient bg, decorative accent bars (ROUNDED_RECTANGLE) |
| 2 | Executive Summary | Shadow KPI cards, key findings bullets |
| 3 | Current State | Locations table (no emoji flags) + segment donut chart with legend |
| 4 | Proposed Transformation | Destinations table + segment strategy cards + top pairings |
| 5 | Before/After Comparison | Side-by-side cards with arrow connector |
| 6 | Financial Impact | Cost table + savings bar chart + shadow KPI cards |
| 7 | Recommendations | Large numbered cards (01-06) with vertical dividers |
| 8 | Implementation Roadmap | Timeline bar + 3 phase cards + next steps |

**PPT Design rules (avoid repair issues):**
- Use `ROUNDED_RECTANGLE` (not `RECTANGLE`) when using `rectRadius`
- No `charSpacing` property (causes repair triggers)
- No emoji flags in table text (encoding issues)
- Guard charts with `if(data.length > 0)` before `addChart()`
- No `plotBgColor` on BAR charts
- No `holeSize` on DOUGHNUT charts
- No `dataLabelFormatCode` on BAR charts
- No shadow objects with decimal opacity
- No `lineSpacingMultiple` per bullet item — use `lineSpacing` (pts) on the container instead
- ASCII characters only (no Unicode ✓➔✖▶→ — use sanitize() on all dynamic text)
- Image data URI must have `data:` prefix: `'data:image/png;base64,'` not `'image/png;base64,'`
- Safeguard all financial values against NaN/undefined
- Design system: Dark navy gradients (BG/BG2/BG3), cyan/purple accents, Arial font, shadows `{ type:'outer', blur:8, offset:2, color:'000000', opacity:0.3 }`

**`sanitize()` helper** (inside `exportPPT()`) — strips all non-ASCII from dynamic text:
```javascript
function sanitize(str) {
  if(typeof str !== 'string') return String(str || '');
  return str
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/[\u00B7\u2022\u2219]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2026]/g, '...')
    .replace(/[\u2192\u2190\u2191\u2193]/g, '->')
    .replace(/[^\x20-\x7E\n\r\t]/g, '');
}
```

## Country Default Rates (COUNTRY_DB)
Key rates that differ from neighbours:
- **Colombia (CO):** `$16/hr` — above India ($12), below Poland ($18)
- **Egypt (EG):** `$14/hr` — above India ($12), below Poland ($18)

## Generated Artifacts
- `/Users/saikiran/SOAR/Pathfinder_PainPoints_Library.csv` — pain points as CSV
- `/Users/saikiran/SOAR/Pathfinder_BRD.docx` — Comprehensive BRD (11 sections, 43KB)

## Design System
- Dark theme: `#0a1628` bg, `#1e293b` cards, `#334155` borders
- Gradient alternates: `#0f1d32`, `#111e33` for PPT slides
- Accents: Cyan `#00d4ff`, Purple `#7c5cfc`, Green `#10b981`, Amber `#f59e0b`, Red `#ef4444`
- Map line palette (brighter): `#00d4ff`, `#a78bfa`, `#fbbf24`, `#34d399`, `#f87171`, `#f472b6`, `#22d3ee`, `#a3e635`
- Fonts: Playfair Display (headings), Inter (body), Arial (PPT - universal)
- Complexity badges: Simple (green), Medium (amber), Complex (red)
- All animations via GSAP — professional, subtle (0.3-0.5s)
- No brain/robot imagery — compass/geometric for AI overlays
- Nav bar: `position:fixed; bottom:24px` with `z-index:100`, all slides have `padding-bottom:100px` to avoid overlap
- Spinner CSS: `.btn-spinner { inline-block; 18px; border-top:2.5px; animation:btn-spin .6s linear infinite }`

## Conventions
- Functions exposed globally via `window.functionName = ...` for onclick handlers
- Click handlers on HTML elements inside the IIFE must use `addEventListener` in `bindEvents()`, NOT inline `onclick` attributes (function scope issue). This includes: villa overlay ESC close, any new Slide 1 interactions
- All code inside single IIFE in `index.html`
- Chart.js instances tracked in `chartInstances` and destroyed before recreation
- GSAP used for all slide transitions and element reveals
- CSS variables for theming in `:root`
- PptxGenJS CDN must load BEFORE Three.js and BEFORE `recommendation-engine.js`
- Three.js CDN loads after PptxGenJS, before `painPointLibrary.js`
- Deployment: `cp SOAR/{index.html,painPointLibrary.js,recommendation-engine.js} Pathfinder/` then `git add && commit && push`
- Browser cache aggressively caches GitHub Pages — always **Cmd+Shift+R** after deploy

## File Structure
```
/Users/saikiran/SOAR/                    # Working copy
  index.html                              # Main app (~5900+ lines)
  painPointLibrary.js                     # 450 pain points (23 keys × 3 categories)
  recommendation-engine.js                # 60+ templates + utilities/diversified vocab
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
7. **Industry Slim-down** — 4→6 industries (Healthcare, BFS, Retail, CMT, Utilities, Diversified) + 4 Horizontals
8. **Title Slide Cleanup** — Removed meta pills, added clickable CTA pill button
9. **Assumptions Panel Restyle** — Dark card with solid cyan border, positioned above segment chart
10. **PPT Repair Fix (Round 1)** — Fixed `rectRadius` on RECTANGLE (→ROUNDED_RECTANGLE), removed charSpacing, stripped emoji flags, guarded empty charts, ASCII-only characters, NaN safeguards
11. **PPT Repair Fix (Round 2)** — Added `sanitize()` helper for dynamic text, fixed image data URI prefix (`data:image/png;base64,`), removed `lineSpacingMultiple`, `holeSize`, `dataLabelFormatCode`, shadow decimal opacity
12. **Title CTA Click Fix** — Changed from inline onclick to addEventListener in bindEvents() (IIFE scope fix), styled as pill button
13. **Slide 7 Map Declutter** — Removed mid-line FTE labels, added proximity-nudged markers, hair-thin dotted lines, flow summary cards grouped by source
14. **Pain Point Library Expansion** — 342→450 entries: added utilities, diversified industries + customer_ops, back_office, mortgages, collections horizontals (108 new)
15. **Filtered Autocomplete** — Slide 3 now filters by both industry AND horizontal from Slide 2
16. **Recommendation Engine** — Added utilities & diversified vocabulary, Slide 7 solutions now show as bullet points (split by → arrows) with triggering pain points in purple italic
17. **Brighter Map Flow Lines** — Palette shifted to lighter variants (#a78bfa, #fbbf24, etc.), weight 1.2, opacity 0.7 for visibility on dark map
18. **FTE Flow Cards** — Redesigned from single scrollable list to side-by-side cards grouped by source location
19. **Country Rate Fix** — Colombia $11→$16, Egypt $9→$14 (both above India $12, below Poland $18)
20. **Analyze Button Feedback** — Spinner + "Generating Transformation Plan..." text; try/catch/finally guarantees navigation even on error
21. **CSAT Impact Removed** — Metric removed from Slide 6 to avoid client objections
22. **Two-Homes Opening Scene** — Replaced Slide 1 title with apartment (MVP) + villa (Full) night-sky scene; SVG buildings with animated window flicker; `appMode` variable; `selectMode()` function; Villa "Reimagining the Operating Model" overlay
23. **Slide 1 Copy** — MVP tag "LIVE NOW", description "Global Delivery Optimisation"; villa overlay icon 🔭, title "Reimagining the Operating Model"
24. **3D NASA-Style Globe** — Three.js r134 WebGL rotating Earth between the two building cards; starfield; atmosphere glow; side-lit sun; slow auto-rotation; cyan glow CSS
25. **Globe Fixes** — Size 160→200px; torch-light fixed (sun moved to `z=-0.8`, behind globe); alternating empty/texture fixed (AmbientLight raised to 1.6); texture loads via callback with ocean-blue fallback; shininess reduced to 8
26. **Complaints Segment** — 7th contact segment (Complaints & Disputes): Complex, 30% offshore affinity, 20% automation potential; segment grid updated to 4-col
27. **Transformation KB** — `transformationKB.js` with 23 levers across 4 buckets (Optimise/Automate/Augment/Offshore); scoring engine; `getRecommendedLevers()`, `getTriggeredLevers()`, `getContextualInsights()`
28. **Slide 6 Transformation Strategy Brief** — New dedicated slide with 2-column layout: left = industry context strip + 2×3 lever card grid (full cards, toggle to activate); right = 2×2 CSS-plotted segment matrix (Offshore Affinity × Automation Potential) + treatment list; CTA to Slide 7
29. **11-Slide Renumber** — Inserted Slide 6 (Strategy Brief); old Slide 6→7, 7→8, 8→9, 9→10, 10→11; `TOTAL_SLIDES = 11`; all case hooks, scenario toggle, export btn visibility updated
30. **Lever Detail Modal** — `openLeverModal(id)` opens full overlay: description, how-it-works steps, FTE table (3 scenarios), investment/timeline, stack tiers, risks, matched pain points from Slide 3; wired to "View Full Detail →" button on every Slide 8 lever card
31. **Synthesis Insights Panel** — Replaces static segment treatment list in Slide 6 right column with 3 dynamic synthesis cards. `generateSynthesisInsights(topLevers, segConfig, allPainPoints)` scores (lever × segment × destination) triplets using lever score + offshore affinity + pain matches + talent depth + domain capability. 3-pass deduplication ensures diverse lever AND segment combination. Each card shows: bucket tag, segment label, destination with attrition %, headline ("Voice Bot for Order — India"), 3 insight bullets, FTE range, time-to-value, pain match count. Falls back gracefully to treatment list if no offshore destinations configured.
32. **Deal Commercials + 3-Year P&L Pricing Module (Slide 9)** — New pricing section below the financial dashboard charts. DEAL ASSUMPTIONS bar with 6 configurable inputs (Mgmt Fee %, Contract Years, Y1/Y2 Ramp %, Transform $/FTE, Discount Rate %). KPI strip: Payback Period, NPV (3-Year), IRR, TCV. 3-Year P&L Waterfall chart (Chart.js mixed bar+line: amber Y0 investment, growing green Y1-Y3 savings, cyan cumulative net line). Deal Commercials panel: rate chips per destination, committed FTEs, blended offshore rate, annual labour, mgmt fee, year revenues, TCV. New functions: `getCommercialAssumptions()`, `computeDealCommercials()`, `compute3YearPnL()`, `_solveIRR()` (bisection method, 120 iterations), `renderPnLChart()`. Live recalculation via debounced input listeners on all 6 assumption fields. Layout fix: `#slide-9 .dashboard-grid{flex:0 0 auto}` to prevent flex collapse interleaving.
33. **Font Readability Pass** — Global CSS variables brightened: `--text-muted` `#64748b`→`#8599ac`, `--text-secondary` `#94a3b8`→`#a8bccf`. Pricing section labels `.78rem`/`#b8cad8`. `.dashboard-card h4` promoted from muted to secondary. Synthesis card tags `.52`→`.62rem`, metric labels/bullets bumped. Lever card bucket-tags/fit `.58`→`.65rem`, `lever-desc` `.65`→`.72rem`. Slide 6 loc-chips/ppt-tags `.55`→`.63rem`. Bench/smb labels, 2×2 axis labels, flow-summary-row all bumped ~0.08rem.
34. **IT/Tech Cost in Deal Commercials** — "Tech $/FTE/yr" input (default $1,500) added to DEAL ASSUMPTIONS bar (7th field). "Technology & Infra" row added to Deal Commercials table. `annualTechCost = FTEs × techCostPerFTEYear` as pass-through cost; `annualMgmtFee` applies to labour only. `annualClientCharge` and all TCV/year-revenue calculations updated. `comm-tech-cost` wired to live-recalculation in `bindEvents()`.
35. **Transform Only Mode** — Toggle in Slide 4 "Target Offshore Locations" section: "Transform Only (No Offshoring)". When ON: offshore grid collapses (`offshore-collapsed` class), all selections cleared, `handleAnalyze()` skips offshore validation and language warnings. Allows pure automation/process/AI engagements with no offshoring. `toggleTransformOnly()` exposed globally. CSS: `.toggle-switch`, `.toggle-track`, `.transform-only-bar`, `.offshore-collapsed`.
36. **PPT Export 8→10 Slides** — Two new slides inserted after Financial Impact: Slide 7 (Deal Commercials & 3-Year P&L) with KPI cards (Payback/NPV/IRR/TCV) + deal table + P&L bar chart; Slide 8 (Transformation Strategy Insights) with 3 synthesis cards read from Slide 6 DOM (lever×segment×destination). Old Slides 7→9 (Recommendations), 8→10 (Roadmap). Footer updated to `X / 10`. `TOTAL_PPT_SLIDES = 10` constant added. GRADIENTS array extended to 10 entries.
37. **PDF Export Updated** — Page 3 (Financial Summary) gets new "Deal Commercials & Investment Case" section: 4 KPI boxes (Payback/NPV/IRR/TCV with colour-coded borders) + deal structure table (labour, tech, mgmt fee, year revenues, TCV). Page 4 (Diagnostic) gets new "Transformation Strategy Insights" section: reads `.syn-card` elements from Slide 6 DOM and renders as left-border-accented cards with tags, headline, bullets, metrics. Falls back to instructional message if Slide 6 not yet visited.
38. **Responsive Design (4-tier)** — Comprehensive media query system: `≤1024px` (strategy grid collapses to 1-col, lever grid 2-col), `≤768px` (pain board 1-col, segment grid 2-col, homes scene vertical stack, `--slide-padding:16px`), `≤640px` (nav dots hidden, lever grid 1-col, `--slide-padding:12px`), `≤480px` (slide heading 1.1rem, `--slide-padding:10px`). Covers all major layouts including dashboard, P&L charts, config grid, segment inputs.
39. **Transform Only Mode Improvements** — (a) Model-gated visibility: `.transform-only-bar` hidden by default (`display:none`), shown only when `transformOnsite` selected via `selectTransformationModel()` which adds/removes `.visible` class; auto-enables toggle when Onsite selected, auto-disables for Offshore/LiftShift. (b) Slide 6 matrix mode-awareness: `buildSegment2x2()` detects `transformOnsite` and switches axes to Volume × Automation, updates quadrant labels (Process Redesign / Quick Win-Automate / Retain & Monitor / AI Assist), positions dots by `automationPotential` vs normalised volume. (c) Lever diversity: `getRecommendedLevers()` in `transformationKB.js` uses bucket-prioritised fill (automate→augment→optimise) for `transformOnsite` instead of score-only fill, ensuring diverse lever types surface. (d) Lever cards show "Approach" chip (Onsite AI Tooling / AI Agent Assist / Process Re-design) instead of offshore location chips in Transform Only mode.
40. **Slide 6 mKey Hoisting Fix** — Critical bug: `const mKey` was declared inside `if(mbv){...}` block causing `ReferenceError: mKey is not defined` outside that block, silently halting `buildStrategyBrief()` mid-execution (after meta label but before grid.innerHTML and buildSegment2x2()). Fix: hoisted `const mKey = typeof transformationModel !== 'undefined' ? transformationModel : 'transformOffshore'` to function scope, reusing inside the `if(mbv)` block.
41. **PDF Page-Break Fix** — `#rpt-deal-kpis` and its children given `page-break-inside:avoid` in print CSS; `exportReport()` inline grid div gets `page-break-inside:avoid;break-inside:avoid` to prevent KPI boxes splitting across PDF pages.
42. **Slide 11 Restart Guard** — "New Session" button wrapped in `confirm()` dialog: "Start a new session? This will clear all current data and return to the home screen." Prevents accidental data loss during live presentations.
43. **Transform Only Info Tooltip** — `.to-info-wrap/.to-info-icon/.to-info-box` CSS pattern: hover reveals 276px tooltip bubble explaining what the toggle does, when to use it, and what it affects. Positioned above the info icon (ⓘ) at right end of the Transform Only bar.

## Future Roadmap (Pathfinder Full — "The Villa")
Strategic vision discussed but not yet built:
- **Transform & Transition model** — 3-stream savings: Automation + Process Reengineering + Offshore Arbitrage
- **Transformation Lever Knowledge Base** — maps pain points → tools → process flows → FTE reduction
- **Hiring Plan** — skills by category, language, seniority
- **Training Plan** — atomic task-level learning paths
- **Transition Playbook** — phased migration plan
- **Future State Blueprint** — reimagined operating model with AI-reduced headcount
- **Project Persistence** — localStorage, up to 15 saved projects
