"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import CharacterGuide from "./components/Character/CharacterGuide";

/* ─── CERTIFICATION DATA ─── */
const CERTIFICATIONS = [
  {
    icon: "security",
    iconColorHex: "#f87171",
    bgColorStyle: "rgba(248,113,113,0.08)",
    providerColorHex: "#f87171",
    title: "CYBERSECURITY VIRTUAL INTERNSHIP",
    desc: "Advanced threat detection, incident response, and network defense.",
    provider: "PALO ALTO NETWORKS",
    year: "2024",
  },
  {
    icon: "smart_toy",
    iconColorHex: "#fb923c",
    bgColorStyle: "rgba(251,146,60,0.08)",
    providerColorHex: "#fb923c",
    title: "AI-ML VIRTUAL INTERNSHIP",
    desc: "Applied machine learning and AI pipelines on real-world datasets.",
    provider: "GOOGLE",
    year: "2024",
  },
  {
    icon: "android",
    iconColorHex: "#4ade80",
    bgColorStyle: "rgba(74,222,128,0.08)",
    providerColorHex: "#4ade80",
    title: "ANDROID DEVELOPER VIRTUAL INTERNSHIP",
    desc: "Mobile application development with Android SDK and Jetpack Compose.",
    provider: "GOOGLE",
    year: "2024",
  },
  {
    icon: "hub",
    iconColorHex: "#2dd4bf",
    bgColorStyle: "rgba(45,212,191,0.08)",
    providerColorHex: "#2dd4bf",
    title: "NETWORKING VIRTUAL INTERNSHIP",
    desc: "Enterprise routing, switching, and network infrastructure fundamentals.",
    provider: "JUNIPER NETWORKS",
    year: "2024",
  },
  {
    icon: "storage",
    iconColorHex: "#60a5fa",
    bgColorStyle: "rgba(96,165,250,0.08)",
    providerColorHex: "#60a5fa",
    title: "DATA ENGINEERING VIRTUAL INTERNSHIP",
    desc: "Cloud data pipelines, ETL workflows, and scalable data infrastructure.",
    provider: "AWS ACADEMY",
    year: "2024",
  },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"certs" | "internships">("certs");
  const revealRef = useRef<IntersectionObserver | null>(null);

  const [explainFinshield, setExplainFinshield] = useState(false);
  const [finshieldDesc, setFinshieldDesc] = useState("Machine learning fraud detection system with risk scoring, REST API backend, anomaly detection, and production-ready architecture.");
  const [explaining, setExplaining] = useState(false);

  const handleExplainFinshield = async () => {
    if (explainFinshield) {
      setExplainFinshield(false);
      setFinshieldDesc("Machine learning fraud detection system with risk scoring, REST API backend, anomaly detection, and production-ready architecture.");
      return;
    }
    setExplaining(true);
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: "finshield" }),
      });
      const data = await response.json();
      if (data.explanation) {
        setFinshieldDesc(data.explanation);
        setExplainFinshield(true);
      }
    } catch {
    } finally {
      setExplaining(false);
    }
  };

  /* ─── SCROLL REVEAL ─── */
  useEffect(() => {
    revealRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealRef.current?.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      revealRef.current?.observe(el);
    });

    return () => revealRef.current?.disconnect();
  }, []);

  /* ─── CONTACT FORM ─── */
  const handleContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("cf-name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("cf-email") as HTMLInputElement).value;
    const msg = (form.elements.namedItem("cf-msg") as HTMLTextAreaElement).value;
    window.location.href = `mailto:rohitsanjupatil.rsp10@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + "\n\nFrom: " + email)}`;
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen overflow-x-hidden">

      {/* ─── NAV ─── */}
      <header
        id="top"
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4"
        style={{ background: "rgba(10,10,15,0.7)", backdropFilter: "blur(12px)" }}
      >
        <div
          className="text-2xl font-black tracking-wider cursor-pointer"
          style={{ fontFamily: "Bebas Neue, sans-serif", color: "#F5C842" }}
        >
          RSP
        </div>
        <nav className="hidden md:flex gap-8">
          {[
            { label: "WORK", href: "#work" },
            { label: "ABOUT", href: "#about" },
            { label: "STACK", href: "#stack" },
            { label: "CONTACT", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[#6b7280] hover:text-[#F5C842] transition-colors font-mono uppercase tracking-widest text-xs"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-[#F5C842] border border-[rgba(245,200,66,0.3)] px-6 py-2 font-mono text-xs tracking-tighter hover:bg-[rgba(245,200,66,0.1)] transition-all"
          style={{ background: "rgba(245,200,66,0.05)" }}
        >
          HIRE ME
        </a>
      </header>

      <main className="pt-20">
        {/* ─── HERO ─── */}
        <section
          id="hero"
          className="relative py-20 flex flex-col justify-center px-6 md:px-12 overflow-hidden"
          style={{ background: "#0e0e0e" }}
        >
          <div
            className="scanline absolute inset-0 z-10 opacity-30"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-20 items-center">
            {/* Left */}
            <div className="md:col-span-7 reveal">
              <div
                className="inline-block px-2 py-1 font-mono text-[10px] mb-4 tracking-widest"
                style={{
                  background: "rgba(245,200,66,0.1)",
                  color: "#F5C842",
                }}
              >
                SYSTEM_VERSION_3.0_PATCHED
              </div>
              <h1
                className="hero-name leading-none tracking-tight mb-6"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(3.5rem, 10vw, 8rem)",
                  color: "#e5e2e1",
                }}
              >
                ROHIT SANJU{" "}
                <span style={{ color: "#F5C842" }}>PATIL</span>
              </h1>
              <p
                className="text-lg md:text-[18px] max-w-xl mb-8 leading-relaxed"
                style={{ color: "#A0A0A0", fontFamily: "Space Grotesk, sans-serif" }}
              >
                Full Stack Engineer × Security Specialist — building systems that
                perform at scale
              </p>
              {/* Stat pills */}
              <div className="flex flex-wrap gap-4 mb-4">
                {[
                  "Coding Since 2023",
                  "12+ Projects",
                ].map((label, i) => (
                  <div
                    key={i}
                    className="reveal"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div
                      className="flex items-center gap-3 px-4 py-2 border"
                      style={{
                        background: "rgba(245,200,66,0.08)",
                        borderColor: "rgba(245,200,66,0.3)",
                        boxShadow: "0 0 15px rgba(245,200,66,0.12)",
                      }}
                    >
                      <span
                        className="w-2 h-2 animate-pulse"
                        style={{ background: "#F5C842", display: "inline-block" }}
                      />
                      <span
                        className="font-mono text-xs uppercase tracking-widest"
                        style={{ color: "#F5C842" }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="#work"
                  className="px-8 py-3 font-mono text-xs tracking-widest uppercase transition-all hover:brightness-110"
                  style={{
                    background: "#F5C842",
                    color: "#0e0e0e",
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.2em",
                  }}
                >
                  VIEW_PROJECTS
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 font-mono text-xs tracking-widest uppercase transition-all hover:bg-[rgba(245,200,66,0.08)]"
                  style={{
                    border: "1px solid rgba(245,200,66,0.3)",
                    color: "#F5C842",
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.2em",
                  }}
                >
                  GET_IN_TOUCH
                </a>
              </div>
            </div>

            {/* Right — Terminal */}
            <div className="md:col-span-5 relative reveal reveal-delay-2">
              <div
                className="p-1 border"
                style={{
                  background: "#2a2a2a",
                  borderColor: "rgba(59,74,69,0.3)",
                }}
              >
                {/* Terminal header */}
                <div
                  className="flex items-center gap-2 px-3 py-2 border-b"
                  style={{
                    background: "#0e0e0e",
                    borderColor: "rgba(59,74,69,0.2)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5" style={{ background: "rgba(239,68,68,0.5)" }} />
                    <div className="w-2.5 h-2.5" style={{ background: "rgba(234,179,8,0.5)" }} />
                    <div className="w-2.5 h-2.5" style={{ background: "rgba(34,197,94,0.5)" }} />
                  </div>
                  <span
                    className="font-mono text-[10px] ml-4"
                    style={{ color: "#bacac4" }}
                  >
                    main.py — rsp_core
                  </span>
                </div>
                {/* Code */}
                <pre
                  className="p-6 font-mono text-[13px] overflow-x-auto leading-relaxed"
                  style={{ background: "#0e0e0e", color: "#bacac4" }}
                >
<span style={{ color: "#F5C842" }}>def</span>{" "}
<span style={{ color: "#60a5fa" }}>deploy_secure_system</span>(env):{"\n"}
{"    "}<span style={{ color: "#6b7280" }}># Initializing RSP security protocol</span>{"\n"}
{"    "}protocols = [<span style={{ color: "#4ade80" }}>&apos;RSA-4096&apos;</span>, <span style={{ color: "#4ade80" }}>&apos;AES-256&apos;</span>]{"\n"}
{"    "}<span style={{ color: "#F5C842" }}>for</span> p <span style={{ color: "#F5C842" }}>in</span> protocols:{"\n"}
{"        "}print(<span style={{ color: "#4ade80" }}>{`f"Engaging {"{p}"}..."`}</span>){"\n"}
{"\n"}
{"    "}<span style={{ color: "#F5C842" }}>return</span> {"{"}{"\n"}
{"        "}<span style={{ color: "#4ade80" }}>&quot;status&quot;</span>: <span style={{ color: "#4ade80" }}>&quot;STABLE&quot;</span>,{"\n"}
{"        "}<span style={{ color: "#4ade80" }}>&quot;latency&quot;</span>: <span style={{ color: "#4ade80" }}>&quot;0.04ms&quot;</span>,{"\n"}
{"        "}<span style={{ color: "#4ade80" }}>&quot;threat_level&quot;</span>: <span style={{ color: "#f87171" }}>0</span>{"\n"}
{"    "}{"}"}{"\n"}
{"\n"}
<span style={{ color: "#6b7280" }}>{"// "}Execution start</span>{"\n"}
rsp_core.boot()
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TECHNICAL STACK ─── */}
        <section
          id="stack"
          className="py-20 px-6 md:px-12"
          style={{ background: "#131313" }}
        >
          <div className="flex items-center gap-4 mb-16 reveal">
            <h2
              className="text-4xl tracking-wider whitespace-nowrap"
              style={{ fontFamily: "Bebas Neue, sans-serif", color: "#e5e2e1" }}
            >
              TECHNICAL_STACK
            </h2>
            <div className="h-px flex-grow" style={{ background: "rgba(59,74,69,0.2)" }} />
          </div>

          <div className="space-y-12">
            {[
              {
                label: "Languages",
                items: ["Python", "C/C++", "JavaScript", "SQL", "Solidity"],
              },
              {
                label: "Backend_System",
                items: ["Django", "Node.js", "PostgreSQL", "Docker", "Kubernetes", "AWS Lambda"],
              },
              {
                label: "Frontend_Interface",
                items: ["React", "Tailwind CSS", "Next.js", "Framer Motion", "Three.js"],
              },
            ].map(({ label, items }, ri) => (
              <div
                key={label}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center reveal"
                style={{ transitionDelay: `${ri * 0.1}s` }}
              >
                <div
                  className="md:col-span-3 font-mono text-xs uppercase"
                  style={{
                    color: "#bacac4",
                    letterSpacing: "0.2em",
                  }}
                >
                  {label}
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-3">
                  {items.map((item, ii) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-4 py-2 border font-mono text-xs reveal"
                      style={{
                        background: "rgba(245,200,66,0.08)",
                        borderColor: "rgba(245,200,66,0.3)",
                        color: "#F5C842",
                        transitionDelay: `${ii * 0.05}s`,
                      }}
                    >
                      {ii === 0 && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: "#F5C842",
                            boxShadow: "0 0 8px #F5C842",
                            display: "inline-block",
                          }}
                        />
                      )}
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROJECT ARCHIVE ─── */}
        <section
          id="work"
          className="py-20 px-6 md:px-12"
          style={{ background: "#0e0e0e" }}
        >
          <div className="flex items-center gap-4 mb-16 reveal">
            <h2
              className="text-4xl tracking-wider whitespace-nowrap"
              style={{ fontFamily: "Bebas Neue, sans-serif", color: "#e5e2e1" }}
            >
              PROJECT_ARCHIVE
            </h2>
            <div className="h-px flex-grow" style={{ background: "rgba(59,74,69,0.2)" }} />
          </div>

          {/* Featured */}
          <div
            className="group relative border-l-4 p-8 md:p-12 mb-12 transition-all overflow-hidden reveal"
            style={{
              background: "#201f1f",
              borderColor: "#F5C842",
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div
                  className="font-mono text-[10px] mb-2"
                  style={{ color: "#F5C842", letterSpacing: "0.4em" }}
                >
                  FEATURED_SYSTEM
                </div>
                <h3
                  className="text-5xl mb-6 relative inline-block group"
                  style={{ fontFamily: "Bebas Neue, sans-serif", color: "#e5e2e1" }}
                >
                  FINSHIELD AI
                  <button 
                    onClick={handleExplainFinshield} 
                    className="absolute -top-4 -right-16 text-[10px] tracking-widest px-2 py-0.5 border transition-colors flex items-center gap-1"
                    style={{ 
                      background: explainFinshield ? '#F5C842' : 'transparent',
                      color: explainFinshield ? '#0e0e0e' : '#F5C842', 
                      borderColor: '#F5C842',
                      fontFamily: 'monospace'
                    }}
                  >
                    {explaining ? '...' : explainFinshield ? '[HR MODE]' : '[TECH MODE]'}
                  </button>
                </h3>
                <p
                  className="text-sm leading-relaxed mb-8 max-w-md transition-all"
                  style={{ color: "#A0A0A0" }}
                >
                  {finshieldDesc}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["PYTHON", "FASTAPI", "SCIKIT-LEARN", "FEATURE ENGINEERING"].map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-1 border"
                      style={{
                        background: "#353534",
                        color: "#bacac4",
                        borderColor: "rgba(59,74,69,0.2)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/JediScout10/FinShield"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 font-mono tracking-widest hover:brightness-110 active:scale-95 transition-all"
                    style={{
                      background: "transparent",
                      border: "1px solid #F5C842",
                      color: "#F5C842",
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "1.1rem",
                      letterSpacing: "0.2em",
                    }}
                  >
                    SOURCE_CODE
                  </a>
                  <a
                    href="https://finshield-j66s.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 font-mono tracking-widest hover:brightness-110 active:scale-95 transition-all"
                    style={{
                      background: "#F5C842",
                      color: "#0e0e0e",
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "1.1rem",
                      letterSpacing: "0.2em",
                    }}
                  >
                    LIVE_SYSTEM
                  </a>
                </div>
              </div>
              {/* Placeholder visual */}
              <div
                className="relative border overflow-hidden hidden md:block"
                style={{
                  aspectRatio: "16/9",
                  background: "#131313",
                  borderColor: "rgba(59,74,69,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: "rgba(245,200,66,0.15)" }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "96px" }}
                  >
                    shield
                  </span>
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #131313 0%, transparent 60%)",
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          </div>

          {/* 3-card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div
              className="project-card group p-6 border transition-all duration-300 reveal reveal-delay-1 flex flex-col h-full"
              style={{
                background: "#2a2a2a",
                borderColor: "rgba(59,74,69,0.2)",
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined" style={{ color: "#F5C842" }}>
                  psychology
                </span>
                <span className="font-mono text-[9px]" style={{ color: "#6b7280" }}>
                  ID: PRJ-012
                </span>
              </div>
              <h4
                className="text-2xl mb-3 tracking-wide"
                style={{ fontFamily: "Bebas Neue, sans-serif", color: "#e5e2e1" }}
              >
                VC INTELLIGENCE INTERFACE
              </h4>
              <p
                className="text-[14px] leading-snug mb-6 flex-grow"
                style={{ color: "#A0A0A0" }}
              >
                AI-driven venture intelligence system for startup discovery, signal scoring,
                and structured research pipelines.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["NEXT.JS", "TYPESCRIPT", "REACT", "AI INTEGRATION"].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] px-2 py-0.5 border"
                    style={{
                      background: "#131313",
                      color: "#bacac4",
                      borderColor: "rgba(59,74,69,0.1)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <a
                  href="https://github.com/JediScout10/vc-intelligence-interface"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center font-mono text-[10px] uppercase tracking-widest border transition-all"
                  style={{ borderColor: "rgba(245,200,66,0.3)", color: "#F5C842" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "#F5C842";
                    (e.target as HTMLAnchorElement).style.color = "#0e0e0e";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "transparent";
                    (e.target as HTMLAnchorElement).style.color = "#F5C842";
                  }}
                >
                  CODE
                </a>
                <a
                  href="https://vc-intelligence-interface-beryl.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center font-mono text-[10px] uppercase tracking-widest border transition-all"
                  style={{ background: "#F5C842", borderColor: "rgba(245,200,66,0.3)", color: "#0e0e0e" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "transparent";
                    (e.target as HTMLAnchorElement).style.color = "#F5C842";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "#F5C842";
                    (e.target as HTMLAnchorElement).style.color = "#0e0e0e";
                  }}
                >
                  LIVE
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="project-card group p-6 border transition-all duration-300 reveal reveal-delay-2 flex flex-col h-full"
              style={{
                background: "#2a2a2a",
                borderColor: "rgba(59,74,69,0.2)",
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined" style={{ color: "#F5C842" }}>
                  health_and_safety
                </span>
                <span className="font-mono text-[9px]" style={{ color: "#6b7280" }}>
                  ID: PRJ-091
                </span>
              </div>
              <h4
                className="text-2xl mb-3 tracking-wide"
                style={{ fontFamily: "Bebas Neue, sans-serif", color: "#e5e2e1" }}
              >
                CARECONNECT
              </h4>
              <p
                className="text-[14px] leading-snug mb-6 flex-grow"
                style={{ color: "#A0A0A0" }}
              >
                Mental health assistance platform with structured workflows,
                secure backend services, and data persistence.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["DJANGO", "PYTHON", "POSTGRESQL"].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] px-2 py-0.5 border"
                    style={{
                      background: "#131313",
                      color: "#bacac4",
                      borderColor: "rgba(59,74,69,0.1)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto">
                <a
                  href="https://github.com/JediScout10/CareConnect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center font-mono text-[10px] uppercase tracking-widest border transition-all"
                  style={{ borderColor: "rgba(245,200,66,0.3)", color: "#F5C842" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "#F5C842";
                    (e.target as HTMLAnchorElement).style.color = "#0e0e0e";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "transparent";
                    (e.target as HTMLAnchorElement).style.color = "#F5C842";
                  }}
                >
                  OPEN_SYSTEM
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="project-card group p-6 border transition-all duration-300 reveal reveal-delay-3 flex flex-col h-full"
              style={{
                background: "#2a2a2a",
                borderColor: "rgba(59,74,69,0.2)",
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined" style={{ color: "#F5C842" }}>
                  security
                </span>
                <span className="font-mono text-[9px]" style={{ color: "#6b7280" }}>
                  ID: PRJ-102
                </span>
              </div>
              <h4
                className="text-2xl mb-3 tracking-wide"
                style={{ fontFamily: "Bebas Neue, sans-serif", color: "#e5e2e1" }}
              >
                DEVSECOPS CI/CD PIPELINE
              </h4>
              <p
                className="text-[14px] leading-snug mb-6 flex-grow"
                style={{ color: "#A0A0A0" }}
              >
                Secure CI/CD workflow enforcing automated security validation,
                static code analysis, dependency scanning, and container checks.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["DOCKER", "GITHUB ACTIONS", "DEVSECOPS", "CI/CD SECURITY"].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] px-2 py-0.5 border"
                    style={{
                      background: "#131313",
                      color: "#bacac4",
                      borderColor: "rgba(59,74,69,0.1)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto">
                <a
                  href="https://github.com/JediScout10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center font-mono text-[10px] uppercase tracking-widest border transition-all"
                  style={{ borderColor: "rgba(245,200,66,0.3)", color: "#F5C842" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "#F5C842";
                    (e.target as HTMLAnchorElement).style.color = "#0e0e0e";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "transparent";
                    (e.target as HTMLAnchorElement).style.color = "#F5C842";
                  }}
                >
                  ACCESS_MODULE
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CERTIFICATIONS & INTERNSHIPS ─── */}
        <section
          id="about"
          className="py-20 px-6 md:px-12"
          style={{ background: "#131313" }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Tab bar */}
            <div
              className="flex gap-8 mb-12 reveal"
              style={{ borderBottom: "1px solid rgba(59,74,69,0.2)" }}
            >
              <button
                onClick={() => setActiveTab("certs")}
                className="pb-4 font-mono text-2xl tracking-widest transition-all"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  borderBottom: activeTab === "certs"
                    ? "2px solid #F5C842"
                    : "2px solid transparent",
                  color: activeTab === "certs"
                    ? "#F5C842"
                    : "rgba(186,202,196,0.5)",
                }}
              >
                CERTIFICATIONS
              </button>
              <button
                onClick={() => setActiveTab("internships")}
                className="pb-4 font-mono text-2xl tracking-widest transition-all"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  borderBottom: activeTab === "internships"
                    ? "2px solid #F5C842"
                    : "2px solid transparent",
                  color: activeTab === "internships"
                    ? "#F5C842"
                    : "rgba(186,202,196,0.5)",
                }}
              >
                INTERNSHIPS
              </button>
            </div>

            {/* CERTIFICATIONS TAB */}
            {activeTab === "certs" && (
              <div className="space-y-6">
                {CERTIFICATIONS.map((cert, i) => (
                  <div
                    key={cert.title}
                    className="p-8 border flex flex-col md:flex-row gap-8 items-center reveal"
                    style={{
                      background: "#1c1b1b",
                      borderColor: "rgba(59,74,69,0.1)",
                      transitionDelay: `${i * 0.08}s`,
                    }}
                  >
                    <div
                      className="w-20 h-20 flex items-center justify-center border shrink-0"
                      style={{ background: "#131313", borderColor: "rgba(59,74,69,0.2)" }}
                    >
                      <span
                        className="material-symbols-outlined text-4xl"
                        style={{ color: cert.iconColorHex }}
                      >
                        {cert.icon}
                      </span>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h4
                        className="text-2xl tracking-wide mb-1"
                        style={{ fontFamily: "Bebas Neue, sans-serif", color: "#e5e2e1" }}
                      >
                        {cert.title}
                      </h4>
                      <p className="text-sm mb-4" style={{ color: "#A0A0A0" }}>
                        {cert.desc}
                      </p>
                      <span
                        className="px-3 py-1 font-mono text-[10px] uppercase tracking-tighter"
                        style={{
                          background: cert.bgColorStyle,
                          color: cert.providerColorHex,
                        }}
                      >
                        PROVIDER: {cert.provider}
                      </span>
                    </div>
                    <div className="text-right">
                      <div
                        className="font-mono text-xs mb-2"
                        style={{ color: "#6b7280" }}
                      >
                        ISSUED: {cert.year}
                      </div>
                      <button
                        className="font-mono text-[10px] tracking-widest underline underline-offset-4"
                        style={{ color: "#F5C842" }}
                      >
                        VERIFIED_CERT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* INTERNSHIPS TAB */}
            {activeTab === "internships" && (
              <div className="space-y-6">
                <div
                  className="p-8 border flex flex-col items-center justify-center gap-4 reveal text-center"
                  style={{
                    background: "#1c1b1b",
                    borderColor: "rgba(59,74,69,0.1)",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{ color: "rgba(186,202,196,0.3)" }}
                  >
                    work_off
                  </span>
                  <div className="font-mono text-xs uppercase" style={{ color: "#6b7280", letterSpacing: "0.1em" }}>
                    [ No additional internships to display. ]
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section
          id="contact"
          className="py-20 px-6 md:px-12"
          style={{ background: "#0e0e0e" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 reveal">
              <h2
                className="leading-tight"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(2.5rem, 8vw, 4rem)",
                  color: "#e5e2e1",
                }}
              >
                LET&apos;S BUILD SOMETHING
                <span
                  className="animate-pulse"
                  style={{ color: "#F5C842" }}
                >
                  _
                </span>
              </h2>
              <p
                className="mt-4"
                style={{ color: "#A0A0A0", fontFamily: "Space Grotesk, sans-serif" }}
              >
                Available for high-stakes projects and strategic full-stack consulting.
              </p>
            </div>

            <form
              onSubmit={handleContact}
              className="space-y-8 p-10 border reveal"
              style={{
                background: "#1c1b1b",
                borderColor: "rgba(59,74,69,0.2)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
              }}
              suppressHydrationWarning
            >
              <div className="grid md:grid-cols-2 gap-8 form-row">
                <div className="relative group">
                  <label
                    className="block font-mono text-[10px] uppercase mb-2 tracking-widest"
                    style={{ color: "#F5C842" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="cf-name"
                    id="cf-name"
                    required
                    placeholder="IDENTIFY_YOURSELF"
                    className="w-full p-3 outline-none border-b transition-colors"
                    style={{
                      background: "#131313",
                      borderColor: "rgba(59,74,69,0.4)",
                      color: "#e5e2e1",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "1rem",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "#F5C842")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(59,74,69,0.4)")
                    }
                  />
                </div>
                <div className="relative group">
                  <label
                    className="block font-mono text-[10px] uppercase mb-2 tracking-widest"
                    style={{ color: "#F5C842" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="cf-email"
                    id="cf-email"
                    required
                    placeholder="COMM_CHANNEL@DOMAIN"
                    className="w-full p-3 outline-none border-b transition-colors"
                    style={{
                      background: "#131313",
                      borderColor: "rgba(59,74,69,0.4)",
                      color: "#e5e2e1",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "1rem",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "#F5C842")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(59,74,69,0.4)")
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  className="block font-mono text-[10px] uppercase mb-2 tracking-widest"
                  style={{ color: "#F5C842" }}
                >
                  Project Description
                </label>
                <textarea
                  name="cf-msg"
                  id="cf-msg"
                  required
                  rows={4}
                  placeholder="DESCRIBE_THE_SYSTEM_OBJECTIVES"
                  className="w-full p-3 outline-none border-b transition-colors resize-none"
                  style={{
                    background: "#131313",
                    borderColor: "rgba(59,74,69,0.4)",
                    color: "#e5e2e1",
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "1rem",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#F5C842")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(59,74,69,0.4)")
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 flex items-center justify-center gap-4 transition-all"
                style={{
                  background: "#F5C842",
                  color: "#0e0e0e",
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.2em",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.boxShadow =
                    "0 0 20px #F5C842")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.boxShadow = "none")
                }
              >
                TRANSMIT_DATA
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer
        className="w-full px-6 md:px-12 py-20 border-t flex flex-col md:flex-row justify-between items-center gap-8"
        style={{
          background: "#0e0e0e",
          borderColor: "rgba(59,74,69,0.1)",
        }}
      >
        <div className="flex items-center gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span
                className="text-2xl tracking-widest"
                style={{ fontFamily: "Bebas Neue, sans-serif", color: "#e5e2e1" }}
              >
                RSP_ARCHIVE
              </span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/JediScout10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#6b7280" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#F5C842")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#6b7280")
                  }
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/rohit-patil-3b5579321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#6b7280" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#F5C842")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#6b7280")
                  }
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div
              className="font-mono text-[10px] uppercase tracking-tighter mt-1"
              style={{ color: "#6b7280" }}
            >
              Full Stack × Security — V4.0-STABLE
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-6">
            {["terminal", "hub", "shield"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="transition-colors"
                style={{ color: "#6b7280" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#F5C842")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#6b7280")
                }
              >
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
          <span
            className="font-mono text-[10px]"
            style={{ color: "#4b5563" }}
          >
            © 2025 RSP_ARCHIVE — ALL_RIGHTS_RESERVED
          </span>
        </div>
      </footer>

      {/* ─── OWNER DASHBOARD ACCESS ─── */}
      <a
        href="/login"
        className="fixed z-50 flex items-center justify-center border transition-all hover:bg-[rgba(245,200,66,0.1)] group cursor-pointer"
        style={{
          bottom: "16px",
          right: "24px",
          width: "32px",
          height: "32px",
          borderColor: "rgba(245,200,66,0.4)",
          background: "#1c1b1b",
          color: "#F5C842",
        }}
        title="Owner Access"
      >
        <span className="material-symbols-outlined text-[14px]">lock</span>
        {/* Tooltip */}
        <span
          className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] whitespace-nowrap px-2 py-1 border pointer-events-none"
          style={{
            background: "#131313",
            borderColor: "rgba(245,200,66,0.3)",
            color: "#e5e2e1"
          }}
        >
          OWNER_ACCESS
        </span>
      </a>

      {/* ─── NPC CHARACTER GUIDE ─── */}
      <CharacterGuide />
    </div>
  );
}
