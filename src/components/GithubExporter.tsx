import { useState } from 'react';
import { Check, Code, Copy, Download, ExternalLink, FileCode, FileJson, FileText, Github, Globe, Terminal } from 'lucide-react';
import { CONTACT_INFO, CORPORATE_PLANS, FAQS, POINT_TO_POINT_ROUTES, TOUR_PACKAGES, VEHICLE_TARIFFS } from '../data/getgoData';

export default function GithubExporter() {
  const [activeFormat, setActiveFormat] = useState<'json' | 'typescript' | 'markdown'>('json');
  const [copied, setCopied] = useState<boolean>(false);

  const fullDataset = {
    metadata: {
      generatedFor: CONTACT_INFO.domain,
      brandName: CONTACT_INFO.brandName,
      extractedDate: '2026-09-05',
      author: 'GetGo Taxi Operations',
      version: '1.0.0',
    },
    contactInfo: CONTACT_INFO,
    vehicleTariffs: VEHICLE_TARIFFS,
    tourPackages: TOUR_PACKAGES,
    popularRoutes: POINT_TO_POINT_ROUTES,
    corporatePlans: CORPORATE_PLANS,
    faqs: FAQS,
  };

  const jsonString = JSON.stringify(fullDataset, null, 2);

  const typescriptSnippet = `// Data Module for GetGo Taxi (getgotaxi.online)
export const GETGO_DATA = ${jsonString} as const;

export type GetGoData = typeof GETGO_DATA;
`;

  const markdownSpec = `# GetGo Taxi (getgotaxi.online) — Master Data & Platform Specification

> **Official Data Repository for getgotaxi.online**  
> Ready for deployment on GitHub Pages or custom frontend templates.

---

## 1. Quick Contacts & Operations
- **Brand:** ${CONTACT_INFO.brandName}
- **Live Domain:** [https://${CONTACT_INFO.domain}](https://${CONTACT_INFO.domain})
- **Operations Manager:** ${CONTACT_INFO.contactPerson}
- **24/7 Hotline:** ${CONTACT_INFO.phoneFormatted}
- **WhatsApp:** ${CONTACT_INFO.phoneFormatted}
- **Email:** ${CONTACT_INFO.emailPrimary}
- **Registered Address:** ${CONTACT_INFO.address.line1}, ${CONTACT_INFO.address.area}, ${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.state} - ${CONTACT_INFO.address.pincode}, India

---

## 2. Price Maths & Fleet Tariff Summary

### A. Local Hourly Rental Packages
| Vehicle | 4 Hr / 40 KM | 8 Hr / 80 KM | 10 Hr / 100 KM | 12 Hr / 120 KM | Extra KM Rate | Extra Time Rate |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Sedan (Dzire/Etios)** | ₹1,128 | ₹2,128 | ₹2,628 | ₹3,128 | ₹14–17/km | ₹2/min (₹120/hr) |
| **Innova / SUV (6-7s)** | ₹2,000 | ₹3,600 | ₹4,200 | ₹4,800 | ₹15–17/km | ₹250–300/hr |
| **Tempo Traveller (12s)** | ₹2,400 | ₹4,500 | ₹5,250 | ₹6,000 | ₹22/km | ₹650/hr |
| **Mini Bus (25s)** | ₹3,500 | ₹6,500 | ₹7,800 | ₹8,800 | ₹25/km | ₹800/hr |

### B. Outstation Per-KM Pricing Formulas
- **Sedan:** ₹12 / KM (Min 250 km/day • Driver Bata ₹400/day • Night Allowance ₹300)
- **Innova / SUV:** ₹16 / KM (Min 300 km/day • Driver Bata ₹500/day • Night Allowance ₹350)
- **Tempo Traveller:** ₹22 / KM (Min 300 km/day • Driver Bata ₹700/day • Night Allowance ₹400)
- **Mini Bus:** ₹25 / KM (Min 350 km/day • Driver Bata ₹800/day • Night Allowance ₹500)

*Math Formula:* \`Total = Max(Actual_KM, Min_KM_Day * Days) * Per_KM_Rate + (Driver_Bata * Days) + (Night_Allowance * Nights)\`

---

## 3. Tour Packages (11 Handcrafted Itineraries)
${TOUR_PACKAGES.map((t, idx) => `${idx + 1}. **${t.title}** (${t.duration}) — Distance: ${t.distanceFromCoimbatore}. Sedan From ₹${t.vehiclePricing.sedanEstimate.toLocaleString('en-IN')}, Innova From ₹${t.vehiclePricing.innovaEstimate.toLocaleString('en-IN')}. Highlights: ${t.keyAttractions.slice(0, 4).join(', ')}.`).join('\n')}

---

## 4. GitHub Pages Deployment Guide
1. Push your repository to GitHub: \`https://github.com/<your-username>/getgotaxi\`
2. Place a file named \`CNAME\` in the root containing: \`getgotaxi.online\`
3. Point your DNS provider (Cloudflare, GoDaddy, Namecheap) to GitHub Pages IPs:
   - \`185.199.108.153\`
   - \`185.199.109.153\`
   - \`185.199.110.153\`
   - \`185.199.111.153\`
4. Go to **Settings** → **Pages** → Source: **Deploy from branch (main or gh-pages)** → Custom Domain: \`getgotaxi.online\`
5. Check **Enforce HTTPS**.
`;

  const getActiveCode = () => {
    if (activeFormat === 'json') return jsonString;
    if (activeFormat === 'typescript') return typescriptSnippet;
    return markdownSpec;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename =
      activeFormat === 'json'
        ? 'getgotaxi_data.json'
        : activeFormat === 'typescript'
        ? 'getgotaxi_data.ts'
        : 'GETGOTAXI_SPEC.md';
    const mime =
      activeFormat === 'json'
        ? 'application/json'
        : activeFormat === 'typescript'
        ? 'text/typescript'
        : 'text/markdown';

    const blob = new Blob([getActiveCode()], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
              <Github className="w-3.5 h-3.5 text-amber-400" />
              Ready for GitHub Hosting & Website Templates
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Structured Data Hub & Export Center</h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              All price maths, vehicle tariffs, tour packages, routes, address, and contacts are completely structured and verified for {CONTACT_INFO.domain}.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-xs"
            >
              <Download className="w-4 h-4" />
              Download {activeFormat.toUpperCase()}
            </button>
            <button
              onClick={handleCopy}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveFormat('json')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeFormat === 'json'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            JSON File (API & Templates)
          </button>
          <button
            onClick={() => setActiveFormat('typescript')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeFormat === 'typescript'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            TypeScript Module
          </button>
          <button
            onClick={() => setActiveFormat('markdown')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeFormat === 'markdown'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            GitHub README Specification
          </button>
        </div>
      </div>

      {/* Code / Data Viewer */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xs overflow-hidden">
        <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-slate-300">
              {activeFormat === 'json'
                ? 'getgotaxi_data.json'
                : activeFormat === 'typescript'
                ? 'getgotaxi_data.ts'
                : 'GETGOTAXI_SPEC.md'}
            </span>
            <span className="text-2xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
              {(getActiveCode().length / 1024).toFixed(1)} KB
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <pre className="p-5 text-xs text-slate-300 font-mono overflow-x-auto max-h-[480px] leading-relaxed select-all">
          {getActiveCode()}
        </pre>
      </div>

      {/* GitHub Hosting & Custom Domain Deployment Guide */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            How to Host on GitHub with Custom Domain <code className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">{CONTACT_INFO.domain}</code>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-2xs">
              1
            </span>
            <div className="font-bold text-slate-900">Create GitHub Repo</div>
            <p className="text-slate-600 leading-relaxed">
              Create a new public or private repository on GitHub (e.g. <code className="font-mono bg-white px-1">getgotaxi</code>). Push your code or static templates.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-2xs">
              2
            </span>
            <div className="font-bold text-slate-900">Add CNAME File</div>
            <p className="text-slate-600 leading-relaxed">
              Create a file named <code className="font-mono bg-white px-1">CNAME</code> in the root directory or public folder containing just: <code className="font-mono text-amber-700">getgotaxi.online</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-2xs">
              3
            </span>
            <div className="font-bold text-slate-900">Configure DNS Records</div>
            <p className="text-slate-600 leading-relaxed">
              In your domain registrar (GoDaddy, Cloudflare, Namecheap), point an <code className="font-mono bg-white px-1">A</code> record to <code className="font-mono">185.199.108.153</code> and CNAME <code className="font-mono">www</code> to <code className="font-mono">yourusername.github.io</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-2xs">
              4
            </span>
            <div className="font-bold text-slate-900">Enable GitHub Pages</div>
            <p className="text-slate-600 leading-relaxed">
              In repository <strong>Settings → Pages</strong>, select branch <code className="font-mono bg-white px-1">gh-pages</code> or <code className="font-mono bg-white px-1">main</code>, save, and check <strong>Enforce HTTPS</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
