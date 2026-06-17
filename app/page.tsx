'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  Calculator,
  Layout,
  Layers,
  Sliders,
  Type as FontIcon,
  Palette,
  Check,
  Send,
  ArrowUpRight,
  CheckCircle2,
  Menu,
  X,
  Plus,
  Minus,
  RefreshCw,
  Copy,
  Info,
  ExternalLink,
  Lock,
  Compass,
  FileText
} from 'lucide-react';

// Define typed list of projects to showcase
interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Editorial' | 'Commerce' | 'SaaS' | 'Art & Culture';
  description: string;
  year: string;
  imageUrl: string;
  gridFormula: string;
  fontFamily: string;
  themeColor: string;
  accentColor: string;
  brief: string;
}

const PROJECTS: Project[] = [
  {
    id: 'proj_1',
    title: 'Aura Fine Jewelry',
    slug: 'aura-fine-jewelry',
    category: 'Editorial',
    description: 'An asymmetrical boutique gallery design using micro-margins and fine borders to elevate high-end artisanal craftsmanship.',
    year: '2026',
    imageUrl: 'https://picsum.photos/seed/aura/900/600',
    gridFormula: '12-Col Multi-offset | 1.618 Golden Ratio Margins',
    fontFamily: 'Instrument Serif & Inter Mono',
    themeColor: '#FAF9F6',
    accentColor: '#D4AF37',
    brief: 'A tactile, luxury catalogue experience prioritizing spatial rhythm over dense text blocks, allowing gold and gem reflections to occupy negative space.'
  },
  {
    id: 'proj_2',
    title: 'Metropolis Journal',
    slug: 'metropolis-journal',
    category: 'Editorial',
    description: 'A structural publication portal with rigid columns, heavy brutalist rules, and variable text density simulating actual newsprint.',
    year: '2025',
    imageUrl: 'https://picsum.photos/seed/metro/900/600',
    gridFormula: '8-Col Uniform Grid | 16px Solid Intersection Lines',
    fontFamily: 'Space Grotesk & System Serif',
    themeColor: '#121212',
    accentColor: '#FF4E00',
    brief: 'An opinionated art-direction engine that scales from complex three-column editorial opinion pieces to cinematic photographic grids.'
  },
  {
    id: 'proj_3',
    title: 'Apex SaaS Platform',
    slug: 'apex-saas',
    category: 'SaaS',
    description: 'A razor-sharp developer toolkit dashboard layout designed around modular bento grids and ultra-fast visual hierarchy paths.',
    year: '2026',
    imageUrl: 'https://picsum.photos/seed/apex/900/600',
    gridFormula: '16-Col Modular Bento | Fluid Gap Matrix',
    fontFamily: 'JetBrains Mono & Inter',
    themeColor: '#0A0B0E',
    accentColor: '#3B82F6',
    brief: 'A technical software interface utilizing visual density thresholds to bundle telemetry graphs, active command terminals, and toggle controls.'
  },
  {
    id: 'proj_4',
    title: 'Bento Ledger',
    slug: 'bento-ledger',
    category: 'Commerce',
    description: 'A physical object e-commerce matrix utilizing seamless drag-to-cart slots, typographic scaling, and high-contrast focal highlights.',
    year: '2026',
    imageUrl: 'https://picsum.photos/seed/ledger/900/600',
    gridFormula: '4x4 Asymmetric Matrix Layout',
    fontFamily: 'Syne & Space Grotesk',
    themeColor: '#FFFFFF',
    accentColor: '#1C1C1C',
    brief: 'A hyper-clean catalog that subverts the traditional catalog column array, providing interactive focal scale points for bespoke physical goods.'
  }
];

export default function WebDesignLandingPage() {
  // Navigation states
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);
  const [showWireframeOverlay, setShowWireframeOverlay] = useState<boolean>(false);
  
  // Interactive CSS Hero Playground states
  const [gridColumns, setGridColumns] = useState<number>(3);
  const [gridGap, setGridGap] = useState<number>(16);
  const [gridRigidity, setGridRigidity] = useState<number>(50); // slider between rigid geometric & asymmetric fluid

  // Cost Calculator states
  const [tier, setTier] = useState<'landing' | 'boutique' | 'portal'>('boutique');
  const [pageCount, setPageCount] = useState<number>(5);
  const [includeCopy, setIncludeCopy] = useState<boolean>(false);
  const [includeAI, setIncludeAI] = useState<boolean>(true);
  const [includeAnimation, setIncludeAnimation] = useState<boolean>(true);
  const [calculatorStatus, setCalculatorStatus] = useState<string>('Brief pre-calculated and idle');

  // AI-powered website Concept Generator states
  const [businessName, setBusinessName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('Architecture & Public Space');
  const [vibe, setVibe] = useState<string>('Warm Editorial Minimalist');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedConcept, setGeneratedConcept] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Inquiry form states
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientMessage, setClientMessage] = useState<string>('');
  const [budgetVal, setBudgetVal] = useState<string>('$5,000 - $10,000');
  const [aiLoadedFlag, setAiLoadedFlag] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitProgress, setSubmitProgress] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Filter project gallery
  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === selectedCategory);

  // Calculate pricing
  const basePrice = tier === 'landing' ? 2500 : tier === 'boutique' ? 4800 : 9500;
  const pageCost = (pageCount - (tier === 'landing' ? 1 : tier === 'boutique' ? 5 : 10)) * 400;
  const copyCost = includeCopy ? 1500 : 0;
  const aiCost = includeAI ? 1200 : 0;
  const animCost = includeAnimation ? 1000 : 0;
  const totalPrice = Math.max(basePrice, basePrice + pageCost + copyCost + aiCost + animCost);
  const totalWeeks = Math.ceil(4 + (pageCount * 0.4) + (includeAI ? 1.5 : 0) + (includeAnimation ? 1 : 0));

  // Trigger brief integration from estimate
  const applyEstimateToForm = () => {
    const tierName = tier === 'landing' ? 'Single Page Landing' : tier === 'boutique' ? 'Editorial Boutique (5+ Pages)' : 'Custom Enterprise Portal';
    const copyChoice = includeCopy ? 'with Custom Copywriting' : 'excluding Copywriting';
    const aiChoice = includeAI ? 'with Dynamic AI Integration' : 'excluding AI Tools';
    const animChoice = includeAnimation ? 'with High-Interactivity Framer Animation Suite' : 'excluding animations';
    
    setClientMessage(
      `Hello Studio Form & Function. I am looking to initiate an inquiry for a "${tierName}" project. 
- Estimated Pages: ${pageCount} Pages
- Custom Services selected: ${copyChoice}, ${aiChoice}, ${animChoice}.
- Estimated Scope pricing is roughly $${totalPrice.toLocaleString()} USD over a ${totalWeeks} week timeline.`
    );
    
    const element = document.getElementById('inquiry-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCalculatorStatus('Calculated scope successfully bundled & transferred down below!');
    setTimeout(() => setCalculatorStatus('Brief pre-calculated and idle'), 4000);
  };

  // Trigger custom AI Generator
  const generateDesignBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setErrorMsg(' Please enter your business or brand name.');
      return;
    }
    setErrorMsg('');
    setIsGenerating(true);
    setGeneratedConcept(null);

    try {
      const response = await fetch('/api/generate-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          industry,
          vibe
        }),
      });

      if (!response.ok) {
        throw new Error('API server returned error code ' + response.status);
      }

      const data = await response.json();
      setGeneratedConcept(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Error generating design blueprint. Our design servers are busy, please retry in a moment.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Preload AI Concept blueprint findings to project brief
  const preLoadConceptToBrief = () => {
    if (!generatedConcept) return;

    const brandName = businessName;
    const colors = generatedConcept.colorPalette ? generatedConcept.colorPalette.map((c: any) => `${c.name} (${c.hex} - ${c.role})`).join(', ') : '';
    const typography = generatedConcept.typography ? `${generatedConcept.typography.headerFont} (Headings) paired with ${generatedConcept.typography.bodyFont} (Body)` : '';
    const headline = generatedConcept.heroCopy?.headline || '';
    
    setClientMessage(
      `Hi Studio! I just used your brand generator tool for my business "${brandName}". I love the direction we found and want to explore it further:
- Color Direction: ${colors}
- Typography Choice: ${typography}
- Headline Pitch: "${headline}"
- Category: ${industry} (${vibe} style)

Looking forward to our discovery call!`
    );
    setAiLoadedFlag(true);
    
    const element = document.getElementById('inquiry-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Copy text utility helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Submit Inquiry handler
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert('Please fill out name and email fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitProgress('Compiling scope criteria & wireframe bounds...');

    setTimeout(() => {
      setSubmitProgress('Evaluating content structure against our core visual formula...');
      setTimeout(() => {
        setSubmitProgress('Packaging telemetry block & establishing private review slot...');
        setTimeout(() => {
          setIsSubmitting(false);
          setFormSubmitted(true);
        }, 1200);
      }, 1000);
    }, 1000);
  };

  // Reset standard contact form
  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setClientMessage('');
    setAiLoadedFlag(false);
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      
      {/* Structural Minimalist Alert Row */}
      <div className="w-full bg-[#1C1C1C] text-white py-2.5 px-4 text-xs tracking-wider uppercase flex justify-between items-center border-b border-neutral-800 font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Studio capacity: Autumn 2026 scheduling is open</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-neutral-400">
          <span>Est. 2018</span>
          <span>•</span>
          <span>Interactivity & Layout Experts</span>
        </div>
      </div>

      {/* Main Elegant Header */}
      <header className="sticky top-0 z-40 bg-[#FAF5FF]/90 backdrop-blur-md border-b border-[#E2E1EC] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <a href="#" className="flex items-center gap-2.5" id="studio-logo-link">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <div className="w-4 h-4 bg-white rounded-xs rotate-45"></div>
            </div>
            <span className="font-display font-black text-2xl tracking-tighter text-indigo-950">FORM + FUNCTION.</span>
          </a>

          {/* Nav items */}
          <nav className="hidden md:flex items-center gap-10 font-mono text-xs font-bold uppercase tracking-widest text-[#4A4E69]">
            <a href="#lab-section" className="hover:text-indigo-600 transition-colors">Philosophy Lab</a>
            <a href="#portfolio-section" className="hover:text-indigo-600 transition-colors">Case Studies</a>
            <a href="#calculator-section" className="hover:text-indigo-600 transition-colors">Scope Cost Matrix</a>
            <a href="#ai-blueprinting-section" className="hover:text-indigo-600 transition-colors bg-indigo-600 text-white px-3 py-1.5 rounded text-[11px] flex items-center gap-1.5 hover:bg-indigo-700 hover:shadow-md hover:scale-102 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              AI Design Planner
            </a>
            <a href="#inquiry-form-section" className="hover:text-indigo-600 transition-colors">Contact</a>
          </nav>

          <div className="md:hidden">
            <a href="#inquiry-form-section" className="font-mono text-xs uppercase bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700 transition-all">
              Inquire
            </a>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-28 border-b border-[#E2E1EC] bg-[#FAF5FF]/80">
        {/* Decorative blur overlay bubbles from design specifications */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute top-[400px] left-[-150px] w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100/80 border border-indigo-200 px-4 py-1.5 rounded-full font-mono text-[11px] text-indigo-700 uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
              <span>Bespoke Web Design & Development</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6.5xl font-black tracking-tight text-indigo-950 leading-[1.05]">
              We build <span className="text-indigo-600 font-serif italic font-semibold">epic</span> websites that convert.
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
              {"We operate at the nexus of severe layout rigor and interactive magic. Our sites don't rely on decorative clutter—they use layout as architecture to represent your company's absolute clarity."}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a 
                href="#calculator-section" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase tracking-widest px-10 py-5 rounded-2xl text-center shadow-xl shadow-indigo-100 hover:shadow-indigo-200 hover:scale-[1.03] active:scale-98 transition-all flex items-center justify-center gap-2 group font-bold font-mono"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-white" />
              </a>
              <a 
                href="#portfolio-section" 
                className="border-2 border-slate-100 bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs uppercase tracking-widest px-10 py-5 rounded-2xl text-center shadow-sm hover:scale-[1.02] active:scale-98 transition-all font-bold"
              >
                View Portfolio
              </a>
            </div>

            {/* Credibility mini matrix */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-indigo-100/80 max-w-lg">
              <div>
                <p className="font-display text-4xl font-black text-indigo-950">100%</p>
                <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Bespoke Code</p>
              </div>
              <div>
                <p className="font-display text-4xl font-black text-indigo-950">12</p>
                <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Design Awards</p>
              </div>
              <div>
                <p className="font-display text-4xl font-black text-indigo-950">98%</p>
                <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Happy Clients</p>
              </div>
            </div>

          </div>

          {/* Hero Right Column: Interactive Philosophy Lab */}
          <div className="lg:col-span-5 bg-white border border-indigo-100 rounded-3xl p-7 shadow-2xl shadow-indigo-100/50 space-y-6 relative overflow-hidden" id="lab-section">
            <div className="flex items-center justify-between border-b border-indigo-50/80 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-indigo-950">Form Philosophy Lab v1.0</span>
              </div>
              <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-bold">Interactive Specs</span>
            </div>

            <p className="text-xs text-slate-550 leading-relaxed font-semibold">
              Adjust the physical properties below to see how our CSS layout matrices rearrange dynamically. We design based on responsive structural laws.
            </p>

            {/* Range controls */}
            <div className="space-y-4">
              {/* Density / columns control */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono uppercase text-slate-400 font-bold">
                  <span>Structural Columns ({gridColumns})</span>
                  <span>Grid Width Pattern</span>
                </div>
                <div className="flex gap-2">
                  {[2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setGridColumns(num)}
                      className={`flex-1 py-2 px-2 text-xs font-mono rounded-xl border text-center font-bold transition-all ${
                        gridColumns === num 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      {num} Cols
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Gap control */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono uppercase text-slate-400 font-bold">
                  <span>Grid Gap Matrix ({gridGap}px)</span>
                  <span>Spatial Tension</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="32"
                  step="4"
                  value={gridGap}
                  onChange={(e) => setGridGap(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Wireframe vs Fluid design factor */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono uppercase text-slate-400 font-bold">
                  <span>Asymmetry Variance ({gridRigidity}%)</span>
                  <span>Balance Factor</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={gridRigidity}
                  onChange={(e) => setGridRigidity(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Output Visual Area */}
            <div className="border border-dashed border-indigo-200 bg-indigo-50/30 p-4 rounded-xl relative min-h-[180px] flex items-center justify-center transition-all">
              <div 
                className="grid w-full h-full transition-all duration-300"
                style={{ 
                  gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`, 
                  gap: `${gridGap}px` 
                }}
              >
                {Array.from({ length: 6 }).map((_, idx) => {
                  // Calculate dynamic offset heights & transforms based on Asymmetry factor
                  const offsetScale = (gridRigidity / 100) * 15;
                  const translateY = idx % 2 === 0 ? offsetScale : -offsetScale;
                  const opacityVal = 0.4 + (idx % 3) * 0.25;

                  return (
                    <div 
                      key={idx}
                      className="border border-indigo-100 bg-white rounded-xl p-2.5 flex flex-col justify-between transition-all duration-300"
                      style={{ 
                        transform: `translateY(${translateY}px)`,
                        boxShadow: gridRigidity > 40 && idx === 1 ? '0 10px 15px -3px rgba(79, 70, 229, 0.08)' : 'none'
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[9px] text-indigo-950 font-bold">BLOCK_0{idx+1}</span>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgba(79,70,229, ${opacityVal})` }}></div>
                      </div>
                      
                      <div className="space-y-1 my-3">
                        <div className="h-1 bg-indigo-100 rounded w-full"></div>
                        <div className="h-1 bg-indigo-50 rounded w-3/4"></div>
                      </div>

                      <span className="font-mono text-[8px] text-slate-400">OFFSET: {translateY.toFixed(1)}px</span>
                    </div>
                  );
                })}
              </div>

              {/* Visual Grid line overlay */}
              <div className="absolute inset-0 pointer-events-none border border-red-500/10 flex justify-around">
                <div className="border-l border-red-500/5 h-full"></div>
                <div className="border-l border-red-500/5 h-full"></div>
                <div className="border-l border-red-500/5 h-full"></div>
              </div>
            </div>

            <div className="bg-indigo-50/50 p-3.5 rounded-xl text-[11px] text-indigo-950 space-y-1 border border-indigo-100/50">
              <span className="font-bold text-indigo-950 block">{"Architect's Design Rule:"}</span>
              <p className="text-slate-600">{"Asymmetrical balance creates high-end editorial tension (shown in block elevations), making users linger longer & scroll with intention."}</p>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Case Studies Gallery */}
      <section id="portfolio-section" className="py-20 border-b border-[#E2E1EC] bg-[#FAF5FF]/50 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Section titles */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E1EC] pb-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">01 / Curation</span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-indigo-950">Crafted Case Studies</h2>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {['All', 'Editorial', 'Commerce', 'SaaS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    // Automatically pull first project in this category
                    const matched = cat === 'All' ? PROJECTS[0] : PROJECTS.find(p => p.category === cat);
                    if (matched) setActiveProject(matched);
                  }}
                  className={`px-5 py-2.5 rounded-full border transition-all uppercase tracking-wider font-bold ${
                    selectedCategory === cat 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' 
                      : 'bg-white hover:bg-indigo-50 text-slate-600 border-indigo-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Split Feature View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left selector card list */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <p className="font-mono text-[11px] text-slate-400 uppercase tracking-widest mb-1 font-bold">Select Case Design Workspace</p>
              {filteredProjects.map((proj) => {
                const isSelected = activeProject.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col gap-2 relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-white border-indigo-600 shadow-lg shadow-indigo-100/50 ring-1 ring-indigo-600' 
                        : 'bg-white/60 border-indigo-100 hover:bg-white hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase font-bold">
                        {proj.category}
                      </span>
                      <span className="font-mono text-xs text-slate-400 font-semibold">{proj.year}</span>
                    </div>
                    <span className="font-display text-lg font-bold text-indigo-950 mt-2 block">
                      {proj.title}
                    </span>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">
                      {proj.description}
                    </p>

                    {isSelected && (
                      <span className="absolute right-4 bottom-4 w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Interactive Portfolio Viewfinder */}
            <div className="lg:col-span-8 bg-white border border-[#E2E1EC] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl shadow-indigo-100/30 relative">
              
              {/* Floating controls */}
              <div className="flex justify-between items-center border-b border-indigo-50 pb-5 mb-6">
                <div>
                  <span className="font-mono text-xs text-slate-400 block font-bold">ACTIVE WIREFRAME PROJECT</span>
                  <span className="font-display font-black text-xl text-indigo-950">{activeProject.title}</span>
                </div>
                
                {/* Wireframe toggle */}
                <button
                  onClick={() => setShowWireframeOverlay(!showWireframeOverlay)}
                  className={`font-mono text-[11px] px-3.5 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-bold ${
                    showWireframeOverlay 
                      ? 'bg-red-50 text-red-600 border-red-200' 
                      : 'bg-indigo-50 hover:bg-indigo-100/60 border-indigo-100 text-indigo-900'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  {showWireframeOverlay ? 'DISABLE WIREFRAME LABELS' : 'ENABLE GRID RULES'}
                </button>
              </div>

              {/* Interactive preview image window */}
              <div className="relative w-full aspect-[16/10] bg-[#FAF5FF] border border-indigo-50 rounded-2xl overflow-hidden group">
                <Image
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={`transition-all duration-700 select-none ${showWireframeOverlay ? 'opacity-40 blur-[2px]' : 'group-hover:scale-102'}`}
                  referrerPolicy="no-referrer"
                />

                {/* Simulated Wireframe vectors if toggled */}
                {showWireframeOverlay && (
                  <div className="absolute inset-0 bg-red-100/5 p-4 font-mono text-[9px] text-red-600 grid grid-cols-12 grid-rows-6 pointer-events-none transition-all duration-300">
                    
                    {/* Visual columns line outlines */}
                    <div className="absolute inset-0 border border-red-500/20 grid grid-cols-12 gap-0">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="border-r border-dashed border-red-500/10 h-full flex items-start justify-end p-1">
                          <span className="text-[8px] opacity-30">C{i+1}</span>
                        </div>
                      ))}
                    </div>

                    {/* Intersection crosshairs and annotations */}
                    <div className="col-span-5 row-span-2 border border-red-500/40 border-dashed m-1 p-2 bg-white/95 backdrop-blur-xs flex flex-col justify-between rounded-xl shadow-sm">
                      <div>
                        <span className="font-bold text-[10px] block text-red-700">GRID_CELL_A1</span>
                        <span>[x: 0, y: 0, w: 41.6%]</span>
                      </div>
                      <span className="text-[8px] text-slate-400">CONTAINER / TITLE HEADER WRAPPER</span>
                    </div>

                    <div className="col-start-8 col-span-5 row-start-2 row-span-4 border border-red-500/40 border-dashed m-1 p-2 bg-white/95 backdrop-blur-xs flex flex-col justify-between rounded-xl shadow-sm">
                      <div>
                        <span className="font-bold text-[10px] block text-red-700">GRID_CELL_B5</span>
                        <span>[x: 58.3%, y: 16.6%, w: 41.6%]</span>
                      </div>
                      <span className="text-[8px] text-neutral-400">RESPONSIVE ASYMMETRIC MEDIA CAROUSEL</span>
                    </div>

                    {/* Center focal box metrics */}
                    <div className="absolute left-[15%] top-[55%] bg-black/90 text-white border border-neutral-700 px-3 py-1.5 rounded text-[10px] space-y-0.5 pointer-events-auto">
                      <p className="font-bold tracking-widest text-[#D4AF37]">RHYTHM METRIC APPROVED</p>
                      <p className="text-neutral-400">Viewport Scaling: CSS Container Query (cqw)</p>
                    </div>

                    <div className="absolute right-[5%] bottom-[5%] bg-red-600 text-white px-2 py-0.5 text-[8px] font-bold rounded">
                      ASSET OVERLAY CALIBRATED
                    </div>

                  </div>
                )}
              </div>
              {/* Spec sheet parameters bar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-indigo-50 text-xs text-indigo-950">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block uppercase font-bold">Visual Formula</span>
                  <p className="font-mono text-indigo-950 font-semibold mt-0.5">{activeProject.gridFormula}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block uppercase font-bold">Type Spec</span>
                  <p className="font-mono text-indigo-950 font-semibold mt-0.5">{activeProject.fontFamily}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block uppercase font-bold">Project Category</span>
                  <p className="font-mono text-indigo-950 font-semibold mt-0.5">{activeProject.category}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block uppercase font-bold">Theme Space</span>
                  <p className="font-mono text-indigo-600 font-extrabold mt-0.5">Bespoke Aura Core</p>
                </div>
              </div>

              {/* Detailed project review description */}
              <div className="mt-6 bg-[#FAF5FF] border border-indigo-100 p-5 rounded-2xl space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-indigo-600">Design Brief Direction</span>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">{activeProject.brief}</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Interactive Scope & Price Estimator Box */}
      <section id="calculator-section" className="py-20 border-b border-[#E2E1EC] bg-[#FAF5FF]/30">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">02 / transparent Pricing</span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-indigo-950">Scope Cost Matrix</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-semibold">
              Skip the opaque negotiation emails. Use our interactive matrix calculator to outline your exact budget criteria, features, and target schedule range instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            
            {/* Left Panel: Inputs */}
            <div className="lg:col-span-7 bg-white border border-[#E2E1EC] rounded-3xl p-6 md:p-8 space-y-8 shadow-xl shadow-indigo-100/40">
              
              {/* Step 1: Base Tier selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">Step 1: Choose Website Core System</span>
                  <span className="font-mono text-[10px] text-indigo-500 font-bold">Architectural baseline</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Option 1: Landing */}
                  <button
                    onClick={() => {
                      setTier('landing');
                      setPageCount(1);
                    }}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                      tier === 'landing' 
                        ? 'bg-white border-2 border-indigo-600 shadow-md ring-1 ring-indigo-600' 
                        : 'bg-[#FAF5FF]/30 border-indigo-100 hover:bg-white hover:border-indigo-200'
                    }`}
                  >
                    <span className="font-serif italic font-normal text-xs text-indigo-400 block mb-1">01 / Boutique</span>
                    <span className="font-display font-black text-sm text-indigo-950 block">Single Landing</span>
                    <p className="text-[11px] text-slate-500 mt-2 font-medium">Bespoke single-page visual brochure designed perfectly for instant conversion.</p>
                    <span className="font-mono text-xs text-indigo-600 font-bold block mt-3">$2,500 base</span>
                  </button>

                  {/* Option 2: Boutique */}
                  <button
                    onClick={() => {
                      setTier('boutique');
                      setPageCount(5);
                    }}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                      tier === 'boutique' 
                        ? 'bg-white border-2 border-indigo-600 shadow-md ring-1 ring-indigo-600' 
                        : 'bg-[#FAF5FF]/30 border-indigo-100 hover:bg-white hover:border-indigo-200'
                    }`}
                  >
                    <span className="font-serif italic font-normal text-xs text-indigo-400 block mb-1">02 / Signature</span>
                    <span className="font-display font-black text-sm text-indigo-950 block">Editorial Studio</span>
                    <p className="text-[11px] text-slate-500 mt-2 font-medium">5 key pages tailored around detailed product stories, galleries, and collections.</p>
                    <span className="font-mono text-xs text-indigo-600 font-bold block mt-3">$4,800 base</span>
                  </button>

                  {/* Option 3: Portal */}
                  <button
                    onClick={() => {
                      setTier('portal');
                      setPageCount(10);
                    }}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                      tier === 'portal' 
                        ? 'bg-white border-2 border-indigo-600 shadow-md ring-1 ring-indigo-600' 
                        : 'bg-[#FAF5FF]/30 border-indigo-100 hover:bg-white hover:border-indigo-200'
                    }`}
                  >
                    <span className="font-serif italic font-normal text-xs text-indigo-400 block mb-1">03 / Legacy</span>
                    <span className="font-display font-black text-sm text-indigo-950 block">Custom Master Portal</span>
                    <p className="text-[11px] text-slate-500 mt-2 font-medium">10+ high-scale templates, dynamic filter suites, databases, and heavy design blocks.</p>
                    <span className="font-mono text-xs text-indigo-600 font-bold block mt-3">$9,500 base</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Page Counter Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">Step 2: Total Custom Pages</span>
                  <span className="font-mono text-xs text-indigo-600 font-extrabold">{pageCount} Custom Templates</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setPageCount(Math.max(1, pageCount - 1))}
                    disabled={tier === 'landing' && pageCount <= 1}
                    className="w-10 h-10 border border-indigo-100 bg-white hover:bg-indigo-50/50 rounded-full flex items-center justify-center disabled:opacity-30 text-indigo-950"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  
                  <input
                    type="range"
                    min={tier === 'landing' ? 1 : tier === 'boutique' ? 2 : 5}
                    max={30}
                    value={pageCount}
                    onChange={(e) => setPageCount(parseInt(e.target.value))}
                    className="flex-1 accent-indigo-600 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />

                  <button
                    onClick={() => setPageCount(Math.min(30, pageCount + 1))}
                    className="w-10 h-10 border border-indigo-100 bg-white hover:bg-indigo-50/50 rounded-full flex items-center justify-center text-indigo-950"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 font-mono font-bold">Each additional template beyond standard baseline adds $400 for responsive refinement & alignment passes.</p>
              </div>

              {/* Step 3: Special Addon Matrices */}
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block">Step 3: Signature Modules & Tectonic Features</span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Copywriting */}
                  <div 
                    onClick={() => setIncludeCopy(!includeCopy)}
                    className={`p-5 rounded-2xl border bg-white cursor-pointer transition-all flex items-start gap-3 select-none ${
                      includeCopy ? 'border-indigo-600 ring-2 ring-indigo-600 shadow-lg shadow-indigo-100/50 bg-indigo-50/10' : 'border-[#E2E1EC]'
                    }`}
                  >
                    <input type="checkbox" checked={includeCopy} readOnly className="mt-1 accent-indigo-600" />
                    <div>
                      <span className="font-mono text-xs font-bold block text-indigo-950">Copy & Strategy</span>
                      <p className="text-[10px] text-slate-500 mt-1 font-medium">High-end conversion and brand narrative copywriting.</p>
                      <span className="font-mono text-[11px] text-indigo-600 font-bold block mt-1">+$1,500</span>
                    </div>
                  </div>

                  {/* AI Assistant Hook */}
                  <div 
                    onClick={() => setIncludeAI(!includeAI)}
                    className={`p-5 rounded-2xl border bg-white cursor-pointer transition-all flex items-start gap-3 select-none ${
                      includeAI ? 'border-indigo-600 ring-2 ring-indigo-600 shadow-lg shadow-indigo-100/50 bg-indigo-50/10' : 'border-[#E2E1EC]'
                    }`}
                  >
                    <input type="checkbox" checked={includeAI} readOnly className="mt-1 accent-indigo-600" />
                    <div>
                      <span className="font-mono text-xs font-bold block text-indigo-950">AI Hook & API Tool</span>
                      <p className="text-[10px] text-slate-500 mt-1 font-medium">Real-time LLM suggestions similar to our Concept Generator.</p>
                      <span className="font-mono text-[11px] text-indigo-600 font-bold block mt-1">+$1,200</span>
                    </div>
                  </div>

                  {/* Interactivity Framer animations */}
                  <div 
                    onClick={() => setIncludeAnimation(!includeAnimation)}
                    className={`p-5 rounded-2xl border bg-white cursor-pointer transition-all flex items-start gap-3 select-none ${
                      includeAnimation ? 'border-indigo-600 ring-2 ring-indigo-600 shadow-lg shadow-indigo-100/50 bg-indigo-50/10' : 'border-[#E2E1EC]'
                    }`}
                  >
                    <input type="checkbox" checked={includeAnimation} readOnly className="mt-1 accent-indigo-600" />
                    <div>
                      <span className="font-mono text-xs font-bold block text-indigo-950">Immersive Motion</span>
                      <p className="text-[10px] text-slate-500 mt-1 font-medium">Rich coordinate parallax, organic SVG lines, fluid scrolling.</p>
                      <span className="font-mono text-[11px] text-indigo-600 font-bold block mt-1">+$1,000</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Panel: Estimated Invoice receipt & brief bundler */}
            <div className="lg:col-span-5 bg-[#0f0b3e] text-white border border-indigo-900 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl shadow-indigo-950/40 relative">
              
              <div className="border-b border-indigo-900/60 pb-5 text-center">
                <span className="font-mono text-[10px] uppercase text-indigo-300 tracking-widest block font-bold">Studio Statement of Work</span>
                <span className="text-xs text-indigo-200/60 font-mono mt-1 block">CALCULATED SECURE SCOPE v3</span>
              </div>

              {/* Invoice lines */}
              <div className="space-y-4 font-mono text-xs pt-2">
                <div className="flex justify-between border-b border-indigo-950 pb-2">
                  <span className="text-indigo-200/60 uppercase">Core Framework</span>
                  <span className="text-right font-bold text-white">
                    {tier === 'landing' ? 'Single Landing Base' : tier === 'boutique' ? 'Editorial Studio Base' : 'Legacy Master Portal'}
                  </span>
                </div>

                <div className="flex justify-between border-b border-indigo-950 pb-2">
                  <span className="text-indigo-200/60 uppercase">Base Allocation</span>
                  <span className="text-indigo-50 font-bold">$ {basePrice.toLocaleString()} USD</span>
                </div>

                <div className="flex justify-between border-b border-indigo-950 pb-2">
                  <span className="text-indigo-200/60 uppercase">Templates ({pageCount} total)</span>
                  <span className="text-white font-bold">
                    {pageCost > 0 ? `+ $ ${pageCost.toLocaleString()} USD` : pageCost < 0 ? `- $ ${Math.abs(pageCost).toLocaleString()} USD` : '$ 0.00'}
                  </span>
                </div>

                {includeCopy && (
                  <div className="flex justify-between border-b border-indigo-950 pb-2 text-indigo-300 font-bold">
                    <span className="uppercase text-indigo-200/60">Content Strategy</span>
                    <span>+ $ 1,500.00 USD</span>
                  </div>
                )}

                {includeAI && (
                  <div className="flex justify-between border-b border-indigo-950 pb-2 text-indigo-300 font-bold">
                    <span className="uppercase text-indigo-200/60">AI Workspace Hook</span>
                    <span>+ $ 1,200.00 USD</span>
                  </div>
                )}

                {includeAnimation && (
                  <div className="flex justify-between border-b border-indigo-950 pb-2 text-indigo-300 font-bold">
                    <span className="uppercase text-indigo-200/60">Motion Suite</span>
                    <span>+ $ 1,000.00 USD</span>
                  </div>
                )}

                <div className="flex justify-between border-b border-indigo-950 pb-2">
                  <span className="text-indigo-200/60 uppercase">Refinement & QA passes</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>

                <div className="flex justify-between border-b border-indigo-950 pb-2">
                  <span className="text-indigo-200/60 uppercase">Development Space</span>
                  <span className="text-indigo-50 font-bold">~{(pageCount * 8 + (includeAI ? 20 : 0) + (includeAnimation ? 16 : 0))} Engineering Hrs</span>
                </div>
              </div>

              {/* Pricing Callout box */}
              <div className="bg-indigo-900/40 p-5 rounded-2xl border border-indigo-900 space-y-2 mt-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-indigo-200/50 uppercase tracking-widest block">Investment Bound</span>
                  <span className="font-mono text-[10px] text-indigo-300 font-bold uppercase">ESTIMATED SHIELD</span>
                </div>
                
                <h3 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight">
                  ${totalPrice.toLocaleString()} <span className="text-xs text-indigo-200 font-mono font-normal">USD</span>
                </h3>

                <div className="flex justify-between text-[11px] text-indigo-200/60 font-mono pt-2 border-t border-indigo-900/50 mt-2">
                  <span>Delivery timeline:</span>
                  <span className="text-indigo-300 font-bold">{totalWeeks} Working Weeks</span>
                </div>
              </div>

              {/* Submit to Brief CTA */}
              <button
                onClick={applyEstimateToForm}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs uppercase tracking-widest py-4.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-indigo-950/50"
              >
                Bundle and Inject to Inquiry Form
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Status prompt */}
              <p className="font-mono text-[10px] text-indigo-300/40 text-center uppercase tracking-wider block font-semibold font-bold">
                {calculatorStatus}
              </p>

            </div>

          </div>

        </div>
      </section>
      <section id="ai-blueprinting-section" className="py-20 border-b border-[#E2E1EC] bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-indigo-50 pb-8">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">03 / Lead Magnet tool</span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-indigo-950">AI Website Concept Generator</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Want to pre-visualize your strategy before scheduling a brief call? Provide your business meta-details, and our custom-engineered Gemini model will formulate a bespoke digital direction in real time.
              </p>
            </div>
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-indigo-100 self-start lg:self-auto flex items-center gap-2 text-xs font-mono text-indigo-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Powered by gemini-3.5-flash server</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            
            {/* Input Generator board form */}
            <div className="lg:col-span-5 bg-white border border-[#E2E1EC] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl shadow-indigo-100/40">
              <span className="font-mono text-xs uppercase tracking-wider text-indigo-950 font-extrabold block border-b border-indigo-50 pb-3">Configure Blueprint Criteria</span>
              
              <form onSubmit={generateDesignBlueprint} className="space-y-4">
                {/* Brand Name input */}
                <div className="space-y-2">
                  <label htmlFor="brand-input" className="block font-mono text-[11px] uppercase tracking-wider text-indigo-600 font-bold">1. Business Name</label>
                  <input
                    id="brand-input"
                    type="text"
                    required
                    maxLength={50}
                    placeholder="e.g. Lumis Fragrances, Symmetrica Architects"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-[#FAF5FF]/30 border border-indigo-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-650 focus:ring-1 focus:ring-indigo-600 focus:bg-white text-indigo-950 font-bold transition-all"
                  />
                </div>

                {/* Industry Selection */}
                <div className="space-y-2">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-indigo-600 font-bold">2. Target Industry / Segment</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Architecture & Space',
                      'Art & Culture Gallery',
                      'Bespoke Fine jewelry',
                      'Technical Developer SaaS',
                      'Gastronomy & Micro Café',
                      'Premium Wellness'
                    ].map((ind) => (
                      <div
                        key={ind}
                        onClick={() => setIndustry(ind)}
                        className={`p-2.5 rounded-xl border text-[11px] font-mono cursor-pointer text-center select-none font-bold transition-all ${
                          industry === ind 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100/50' 
                            : 'bg-[#FAF5FF]/30 hover:bg-indigo-50 border-indigo-100 text-slate-600'
                        }`}
                      >
                        {ind}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vibe selection */}
                <div className="space-y-2">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-indigo-600 font-bold">3. Brand Vibe Alignment</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Warm Editorial Minimalist',
                      'High-Contrast Tech Brutalist',
                      'Modern European Classic',
                      'Organic Craft Boutique'
                    ].map((vb) => (
                      <div
                        key={vb}
                        onClick={() => setVibe(vb)}
                        className={`p-2.5 rounded-xl border text-[11px] font-mono cursor-pointer text-center select-none font-bold transition-all ${
                          vibe === vb 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100/50' 
                            : 'bg-[#FAF5FF]/30 hover:bg-indigo-50 border-indigo-100 text-slate-600'
                        }`}
                      >
                        {vb}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Action button */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase tracking-widest py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-indigo-100"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white/80" />
                      Analyzing design vectors...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      Generate Bespoke Blueprint
                    </>
                  )}
                </button>
              </form>

              {/* Simple error display */}
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-mono rounded border border-red-100">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Right Output: Render Generated Blueprint dynamically */}
            <div className="lg:col-span-7 bg-white border border-[#E2E1EC] rounded-3xl p-6 md:p-8 min-h-[400px] flex flex-col justify-between shadow-xl shadow-indigo-100/40 relative">
              
              <AnimatePresence mode="wait">
                {!generatedConcept && !isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-20 space-y-4"
                  >
                    <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100">
                      <Compass className="w-6 h-6 text-indigo-650" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-black text-lg text-indigo-950">Your Design Workspace is Empty</h4>
                      <p className="text-xs text-slate-500 max-w-sm font-semibold">Fill out the variables on the left. The AI model will assemble a structural blueprint containing typography suggestions, hex guides, and proposed layouts.</p>
                    </div>
                  </motion.div>
                )}

                {isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-20 space-y-6"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
                      <Sparkles className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-mono text-xs uppercase tracking-widest font-extrabold text-indigo-655 text-indigo-700 animate-pulse">Studio Algorithm Compiling</h4>
                      <div className="space-y-1 text-xs text-slate-400 font-bold">
                        <p>1. Querying model weights (gemini-3.5-flash)...</p>
                        <p>2. Formulating spacing math for {industry}...</p>
                        <p>3. Isolating palette hex coordinates for a &quot;{vibe}&quot; aura...</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {generatedConcept && !isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {/* Header receipt info */}
                    <div className="flex justify-between items-start border-b border-indigo-50 pb-4">
                      <div>
                        <span className="font-mono text-[10px] text-indigo-600 block font-bold uppercase">Blueprinted Concept Presentation</span>
                        <h4 className="font-display text-2xl font-black text-indigo-950">{businessName} Blueprint</h4>
                      </div>
                      <span className="font-mono text-[10px] text-indigo-700 uppercase bg-indigo-50 border border-indigo-105-0 px-2 py-1 rounded font-bold">Aesthetic: {vibe}</span>
                    </div>

                    {/* Color Swatches Grid */}
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-indigo-650 uppercase block font-bold tracking-widest">Recommended Digital Palette</span>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {generatedConcept.colorPalette?.map((color: any, index: number) => (
                          <div 
                            key={index}
                            className="border border-indigo-50 bg-[#FAF5FF]/30 p-2 rounded-2xl flex flex-col gap-2 group cursor-pointer hover:shadow-md transition-all duration-300"
                            onClick={() => handleCopyText(color.hex, `color-${index}`)}
                          >
                            <div 
                              className="w-full aspect-[2/1] rounded-xl transition-transform group-hover:scale-102 border border-indigo-100/50" 
                              style={{ backgroundColor: color.hex }}
                            ></div>
                            <div className="font-mono text-[9px] space-y-0.5">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-indigo-950 uppercase max-w-[50px] truncate">{color.name}</span>
                                <span className="text-slate-400 text-[8px] uppercase font-bold">{color.hex}</span>
                              </div>
                              <span className="text-slate-400 text-[8px] block italic truncate">{color.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Typographical recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF5FF]/60 border border-indigo-50 p-5 rounded-2xl">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-indigo-600 block uppercase font-bold tracking-wider">Typography Matrix</span>
                        <p className="font-display text-lg font-black text-indigo-950 border-b border-indigo-50 pb-1.5">{generatedConcept.typography?.headerFont}</p>
                        <span className="font-mono text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Display Header Font</span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Secondary Text System</span>
                        <p className="font-mono text-sm text-indigo-950 border-b border-indigo-50 pb-1.5 font-bold mt-1">{generatedConcept.typography?.bodyFont}</p>
                        <span className="font-mono text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Body copy Sans/Serif</span>
                      </div>
                      <p className="col-span-1 md:col-span-2 text-[11px] text-slate-600 font-semibold italic mt-2 leading-relaxed">
                        &quot;{generatedConcept.typography?.rationale}&quot;
                      </p>
                    </div>

                    {/* Copied alert */}
                    {copiedText && (
                      <div className="font-mono text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded inline-block font-bold animate-pulse">
                        Hex value copied to clipboard!
                      </div>
                    )}

                    {/* Hero copy preview panel */}
                    <div className="space-y-2 border-l-2 border-indigo-600 pl-4">
                      <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-widest block font-bold">Recommended Focal Pitch Copy</span>
                      <h5 className="font-display text-xl font-black text-indigo-950 leading-snug">
                        {generatedConcept.heroCopy?.headline}
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed font-bold">
                        {generatedConcept.heroCopy?.subheadline}
                      </p>
                      <span className="inline-block font-mono text-[10px] uppercase font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-xl mt-2 border border-indigo-100">
                        CTA: {generatedConcept.heroCopy?.ctaText}
                      </span>
                    </div>

                    {/* Sections recommended */}
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-widest block font-bold">Proposed Tectonic Page Layout Strategy</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedConcept.sections?.map((sect: any, idx: number) => (
                          <div key={idx} className="border border-indigo-50 bg-[#FAF5FF]/30 p-4 rounded-xl space-y-1 hover:bg-[#FAF5FF] transition-all duration-300">
                            <span className="font-mono text-[9px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full inline-block font-extrabold mb-1">SECTION 0{idx+1}: {sect.title}</span>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-medium">{sect.description}</p>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-dashed border-indigo-100">
                              <Compass className="w-3 h-3 text-indigo-400" />
                              <span>Interaction: <strong className="text-indigo-750 text-indigo-600">{sect.suggestedInteractiveFeature}</strong></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Designer Curator Tip */}
                    <div className="border border-dashed border-indigo-300 bg-indigo-50/20 p-4 rounded-xl space-y-1">
                      <strong className="font-mono text-[10px] text-indigo-600 uppercase block font-bold tracking-wider">Studio Chief Curator Advisory Tag</strong>
                      <p className="text-xs text-slate-600 leading-relaxed italic font-bold">
                        &quot;{generatedConcept.designerTip}&quot;
                      </p>
                    </div>

                    {/* Preload Action */}
                    <div className="pt-4 border-t border-indigo-50 flex flex-wrap gap-4 items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono font-semibold">Satisfied with these direction notes? Preload them directly into the contact model!</span>
                      <button
                        onClick={preLoadConceptToBrief}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[10px] uppercase tracking-widest py-3 px-5 rounded-xl font-bold flex items-center gap-2 group transition-all shadow-md shadow-indigo-100"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Load parameters into Brief
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 duration-200" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* Structured Process Timeline Section */}
      <section className="py-20 border-b border-[#E2E1EC] bg-[#FAF5FF]/30">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">04 / Rigorous methodology</span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-indigo-950">Process Blueprint</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-semibold">
              We reject chaotic design steps. Our 4-phase program translates requirements transparently into production digital layout files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative mt-8">
            
            {/* Process Step 1 */}
            <div className="border border-indigo-100 rounded-3xl p-6.5 space-y-4 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-300 relative bg-white">
              <span className="font-sans text-4xl text-indigo-100 block font-black">01</span>
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-bold">Phase One</span>
                <h4 className="font-display text-lg font-black text-indigo-950">Structure &amp; Scope</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium font-semibold">
                We establish the exact coordinate matrix, configure content trees, and outline functional blueprints using our interactive matrix tool.
              </p>
              <span className="font-mono text-[9px] text-indigo-705 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-xl font-bold uppercase inline-block border border-indigo-100">Duration: Week 1</span>
            </div>

            {/* Process Step 2 */}
            <div className="border border-indigo-100 rounded-3xl p-6.5 space-y-4 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-300 relative bg-white">
              <span className="font-sans text-4xl text-indigo-100 block font-black">02</span>
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-bold">Phase Two</span>
                <h4 className="font-display text-lg font-black text-indigo-950">Visual Proving</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium font-semibold">
                We design fully annotated responsive canvas mockups from scratch—absolutely no cookie-cutter layouts. Grid vectors and font weights are locked.
              </p>
              <span className="font-mono text-[9px] text-indigo-705 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-xl font-bold uppercase inline-block border border-indigo-100">Duration: Weeks 2-4</span>
            </div>

            {/* Process Step 3 */}
            <div className="border border-indigo-100 rounded-3xl p-6.5 space-y-4 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-300 relative bg-white">
              <span className="font-sans text-4xl text-indigo-100 block font-black">03</span>
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-bold">Phase Three</span>
                <h4 className="font-display text-lg font-black text-indigo-950">Interactive Build</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium font-semibold">
                We craft clean Next.js/Tailwind components with lightweight animations from native core loops. Zero bloated scripts or visual noise.
              </p>
              <span className="font-mono text-[9px] text-indigo-705 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-xl font-bold uppercase inline-block border border-indigo-100">Duration: Weeks 5-7</span>
            </div>

            {/* Process Step 4 */}
            <div className="border border-indigo-100 rounded-3xl p-6.5 space-y-4 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-300 relative bg-white">
              <span className="font-sans text-4xl text-indigo-100 block font-black">04</span>
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-bold">Phase Four</span>
                <h4 className="font-display text-lg font-black text-indigo-950">Fluid Speed launch</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium font-semibold">
                We stress test page core speeds, audit responsiveness across physical devices, deploy to isolated containers, and monitor LCP limits.
              </p>
              <span className="font-mono text-[9px] text-indigo-705 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-xl font-bold uppercase inline-block border border-indigo-100">Duration: Week 8</span>
            </div>

          </div>

          {/* Testimonial Quote */}
          <div className="max-w-4xl mx-auto border border-indigo-100 bg-white p-8 md:p-10 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xl shadow-indigo-100/40">
            <div className="md:col-span-8 space-y-4">
              <p className="font-display text-lg italic text-indigo-950 leading-relaxed font-bold">
                &quot;Form &amp; Function rebuilt our art catalog layout system from scratch. The design system is highly architectural. The integration of clean white borders and asymmetrical grids tripled our average session duration.&quot;
              </p>
              <div>
                <strong className="block font-mono text-xs uppercase tracking-wider text-indigo-950 font-extrabold">Elene Rostova</strong>
                <span className="text-xs text-slate-400 font-mono font-bold">Operations Director, Rostova Editorial House</span>
              </div>
            </div>
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-28 h-28 rounded-full border border-indigo-100 overflow-hidden grayscale">
                <Image
                  src="https://picsum.photos/seed/director/150/150"
                  alt="Elena Rostova Avatar"
                  fill
                  style={{ objectFit: 'cover' }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Inquiry Intake brief */}
      <section id="inquiry-form-section" className="py-20 border-b border-[#E2E1EC] bg-[#FAF5FF]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Inquiry Left text parameters */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">05 / Intake</span>
                <h3 className="font-display text-3xl md:text-5xl font-black text-indigo-950">Start a Custom Inquiry</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  {"Ready to prove your brand's digital intent? Fill out our visual intake brief. If you used our Estimate Pricing matrix or AI Blueprint tool above, click their CTA buttons to instantly auto-populate the details."}
                </p>
              </div>

              {/* Secure guarantee label */}
              <div className="space-y-4 pt-6 border-t border-indigo-50">
                <div className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 bg-[#FAF5FF] border border-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-indigo-950 uppercase tracking-wider">NDA Secure Guarantee</h5>
                    <p className="text-[11px] text-slate-500 mt-1 font-bold">
                      All structural coordinates, brief files, and conceptual guidelines are kept entirely private. We never share raw client criteria.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 bg-[#FAF5FF] border border-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-indigo-950 uppercase tracking-wider">Next-day Response Path</h5>
                    <p className="text-[11px] text-slate-500 mt-1 font-bold">
                      A senior creative director will reply with custom-tailored wireframe ideas and setup schedule dates within 24 working hours.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Inquiry Front desk form card */}
            <div className="lg:col-span-7 bg-white border border-[#E2E1EC] rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-100/40">
              <AnimatePresence mode="wait">
                
                {!formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    
                    {/* Floating pill indicators for loaded custom blueprints */}
                    <div className="flex flex-wrap gap-2">
                      <span className="font-mono text-[10px] text-indigo-600 uppercase bg-[#FAF5FF] border border-indigo-100 px-3 py-1 rounded-xl font-bold">
                        Secure Client Panel
                      </span>
                      {aiLoadedFlag && (
                        <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse font-bold">
                          <Check className="w-3 h-3 text-indigo-650" />
                          Concept parameters Loaded
                        </span>
                      )}
                    </div>

                    <form onSubmit={handleInquirySubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1">
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-indigo-600 font-bold" htmlFor="name-field">Your Name *</label>
                          <input
                            id="name-field"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full bg-[#FAF5FF]/30 border border-indigo-100 rounded-xl px-4 py-3 text-sm text-indigo-950 font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-1 focus:ring-indigo-600 transition-all"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-indigo-600 font-bold" htmlFor="email-field">Email Address *</label>
                          <input
                            id="email-field"
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="w-full bg-[#FAF5FF]/30 border border-indigo-100 rounded-xl px-4 py-3 text-sm text-indigo-950 font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-1 focus:ring-indigo-600 transition-all"
                          />
                        </div>
                      </div>

                      {/* Budget Matrix */}
                      <div className="space-y-2">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-indigo-600 font-semibold font-bold">Budget Bracket Allocation</span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] font-mono">
                          {['< $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'].map((bracket) => (
                            <div
                              key={bracket}
                              onClick={() => setBudgetVal(bracket)}
                              className={`p-2.5 rounded-xl border cursor-pointer text-center select-none font-bold transition-all ${
                                budgetVal === bracket 
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100/50' 
                                  : 'bg-[#FAF5FF]/30 hover:bg-indigo-50 border-indigo-100 text-slate-600'
                              }`}
                            >
                              {bracket}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Brief text box */}
                      <div className="space-y-1">
                        <label className="block font-mono text-[10px] uppercase tracking-wider text-indigo-600 font-bold" htmlFor="msg-field">Project Brief &amp; Context Message</label>
                        <textarea
                          id="msg-field"
                          rows={6}
                          placeholder="Describe the aesthetic, key objectives, and functional items you need us to craft."
                          value={clientMessage}
                          onChange={(e) => setClientMessage(e.target.value)}
                          className="w-full bg-[#FAF5FF]/30 border border-indigo-100 rounded-xl px-4 py-3 text-sm text-indigo-950 font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-1 focus:ring-indigo-600 transition-all font-mono text-xs leading-relaxed"
                        ></textarea>
                      </div>

                      {isSubmitting ? (
                        <div className="space-y-2 py-2">
                          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-bold">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>{submitProgress}</span>
                          </div>
                          <div className="w-full h-1.5 bg-indigo-50 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 animate-[pulse_1s_infinite]" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase tracking-widest py-4.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-indigo-100"
                        >
                          <Send className="w-4 h-4 text-white group-hover:translate-x-1 duration-200" />
                          Deliver Structural Inquiry
                        </button>
                      )}

                    </form>
                  </motion.div>
                )}

                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-6"
                  >
                    <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-650">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-indigo-600 font-bold uppercase tracking-widest block animate-pulse">Intake Submission Completed</span>
                      <h4 className="font-display text-2xl font-black text-indigo-950">Inquiry Received &amp; Encrypted</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed mt-2 font-semibold">
                        Thank you for your trust. A Senior Studio Partner has been allocated to review your target metrics against our Autumn 2026 scheduling. We will reply to <span className="font-bold text-indigo-900">{clientEmail}</span> within 24 working hours.
                      </p>
                    </div>

                    <div className="border border-dashed border-indigo-200 bg-indigo-50/20 p-4 rounded-xl text-[11px] text-slate-650 font-mono text-left max-w-sm space-y-1">
                      <span className="font-bold uppercase tracking-wider block text-indigo-950 border-b border-indigo-100 pb-1 mb-1.5 font-extrabold">Intake Data packet</span>
                      <p>Client: {clientName}</p>
                      <p>Allocation Bracket: {budgetVal}</p>
                      <p>Status: Queued for review [AUTUMN_SECTOR_7]</p>
                    </div>

                    <button
                      onClick={resetForm}
                      className="border border-indigo-150 hover:bg-[#FAF5FF]/50 text-indigo-700 font-mono text-[10px] uppercase tracking-wider py-2.5 px-6 rounded-xl font-bold transition-all"
                    >
                      Reset Brief Form
                    </button>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Footer block */}
      <footer className="bg-indigo-950 text-white py-16 px-6 mt-auto border-t border-indigo-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Col 1: Studio info */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-xl tracking-widest">FORM</span>
              <span className="font-sans font-light text-indigo-400 text-lg">&amp;</span>
              <span className="font-display font-black text-xl tracking-widest text-indigo-300">FUNCTION</span>
            </div>
            
            <p className="text-xs text-indigo-200/80 leading-relaxed max-w-xs font-semibold">
              A private digital design agency committed to severe layout grids, elite conversion design, and seamless typography pairings.
            </p>

            <span className="text-[10px] text-indigo-400/60 font-mono block font-semibold">
              © 2018 - 2026 Studio Form &amp; Function Co. All Rights Reserved.
            </span>
          </div>

          {/* Col 2: Services list */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-305 text-indigo-300 block font-bold">Services Matrix</span>
            <ul className="text-xs text-indigo-200/80 space-y-2 font-mono uppercase font-bold">
              <li className="hover:text-indigo-300 transition-colors cursor-pointer">Editorial Design Systems</li>
              <li className="hover:text-indigo-300 transition-colors cursor-pointer">Boutique SaaS Interfaces</li>
              <li className="hover:text-indigo-300 transition-colors cursor-pointer">Next.js/Tailwind Builds</li>
              <li className="hover:text-indigo-300 transition-colors cursor-pointer">Immersive Motion Framer</li>
              <li className="hover:text-indigo-300 transition-colors cursor-pointer">UX/UI Audit Analysis</li>
            </ul>
          </div>

          {/* Col 3: Direct contact */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400/85 block font-bold">Workspace Coordinate</span>
            <p className="text-xs text-indigo-200/80 font-mono leading-relaxed font-bold">
              Studio Form &amp; Function LLC<br />
              600 Pine Street Suite 11<br />
              Seattle, WA 98101<br />
              <span className="text-indigo-400">desk@formandfunction.design</span>
            </p>
          </div>

          {/* Col 4: Links */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400/85 block font-bold">Inquire</span>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-indigo-200/80 font-bold">
              <a href="#lab-section" className="hover:text-indigo-300 transition-colors cursor-pointer">Philosophy</a>
              <a href="#portfolio-section" className="hover:text-indigo-300 transition-colors cursor-pointer">Portfolios</a>
              <a href="#calculator-section" className="hover:text-indigo-300 transition-colors cursor-pointer">Estimates</a>
              <a href="#ai-blueprinting-section" className="hover:text-indigo-305 text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer">
                <Sparkles className="w-3 h-3" />
                AI Blueprint
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
