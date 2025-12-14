"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaTelegramPlane, FaEnvelope } from "react-icons/fa";

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const COLOR = "#06B6D4"; // cyan

function TerminalChrome({ title, rightHint }: { title: string; rightHint?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <p className="text-xs font-mono text-slate-400">{title}</p>
      {rightHint ? <p className="text-[10px] font-mono text-slate-600">{rightHint}</p> : <div />}
    </div>
  );
}

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Auto-focus name input when section comes into view
  useEffect(() => {
    if (inView && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 400);
    }
  }, [inView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you'd normally send to your API
    console.log("Form submitted:", formData);
  };

  const socialLinks = [
    { 
      icon: FaGithub, 
      label: "capamir", 
      command: "github",
      href: "https://github.com/capamir", 
      color: "#fff" 
    },
    { 
      icon: FaLinkedin, 
      label: "capamir", 
      command: "linkedin",
      href: "https://linkedin.com/in/capamir", 
      color: "#0A66C2" 
    },
    { 
      icon: FaTelegramPlane, 
      label: "capamir", 
      command: "telegram",
      href: "https://t.me/capamir", 
      color: "#0088CC" 
    },
    { 
      icon: FaEnvelope, 
      label: "amir583121@gmail.com", 
      command: "email",
      href: "mailto:amir583121@gmail.com", 
      color: COLOR 
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute top-10 left-10 h-72 w-72 blur-3xl opacity-15"
        style={{ background: COLOR }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500 mb-2">
            Get in touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50">
            Let&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              connect
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/70 sticky top-24"
            style={{ boxShadow: `0 0 40px ${hexToRgba(COLOR, 0.08)}` }}
          >
            <TerminalChrome title="terminal • contact" rightHint="try: help" />

            <div className="p-6 font-mono text-sm">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* SSH prompt */}
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <span className="text-cyan-400">$</span>
                      <span>ssh contact@amir.dev</span>
                    </div>

                    {/* Connection status */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-slate-500 my-2">
                        <span>›</span>
                        <span>Establishing secure connection...</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span>✓</span>
                        <span>Connection established</span>
                      </div>
                    </div>

                    {/* System info */}
                    <div className="space-y-2 mb-6 pb-6 border-b border-white/10">
                      <p className="text-slate-500">System Info:</p>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="text-cyan-400">📍</span>
                        <span className="text-slate-500">Location:</span>
                        <span>Remote</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="text-cyan-400">🕐</span>
                        <span className="text-slate-500">Timezone:</span>
                        <span>UTC+3:30</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="text-emerald-400">└</span>
                        <span className="text-slate-500">Status:</span>
                        <span className="text-emerald-400">Available for projects</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Success message */}
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                      <span>✓</span>
                      <span>Message sent successfully!</span>
                    </div>

                    {/* JSON response */}
                    <div className="text-slate-300 text-xs leading-relaxed">
                      <pre className="whitespace-pre-wrap">
{`{
  "status": "success",
  "data": {
    "name": "${formData.name}",
    "email": "${formData.email}",
    "subject": "${formData.subject}",
    "message": "${formData.message.slice(0, 40)}${formData.message.length > 40 ? "..." : ""}"
  },
  "timestamp": "${new Date().toISOString()}"
}`}
                      </pre>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-4 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                    >
                      ← Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social links - icon + text in row, labels in column */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-500 mb-4 font-mono">$ LIST --CONNECTIONS</p>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-4 rounded-xl border border-white/10 bg-white/2 hover:bg-white/6 hover:border-cyan-500/30 transition-all group"
                    >
                      <social.icon 
                        className="text-2xl text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0" 
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                          $ open {social.command}
                        </span>
                        <span className="text-xs font-mono text-slate-300 group-hover:text-slate-100 transition-colors">
                          {social.label}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form - matching Skills terminal style */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="rounded-2xl overflow-hidden border border-slate-800/80 bg-[#020617]/95"
            style={{ boxShadow: `0 0 30px ${hexToRgba(COLOR, 0.08)}` }}
          >
            {/* Terminal chrome for form */}
            <TerminalChrome title="terminal • experience" rightHint="try: neofetch" />

            <div className="p-6 sm:p-8 font-mono">
              {/* API-style header */}
              <div className="mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="h-2 w-2 rounded-full animate-pulse"
                    style={{ background: COLOR }}
                  />
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
                    Send Message
                  </p>
                </div>
                <p className="text-xs font-mono text-slate-600">
                  POST /api/v1/contact/message
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-md font-mono text-slate-400 mb-2">
                    <span className="text-purple-400">name:</span> <span className="text-slate-500 italic">str</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-md font-mono text-slate-400 mb-2">
                    <span className="text-purple-400">email:</span> <span className="text-slate-500 italic">EmailStr</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-md font-mono text-slate-400 mb-2">
                    <span className="text-purple-400">subject:</span> <span className="text-slate-500 italic">str</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Discussion"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-md font-mono text-slate-400 mb-2">
                    <span className="text-purple-400">message:</span> <span className="text-slate-500 italic">str</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 rounded-xl font-mono text-md font-semibold text-slate-900 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${COLOR}, #9333EA)`,
                    boxShadow: `0 0 30px ${hexToRgba(COLOR, 0.35)}`,
                  }}
                >
                  Submit
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
