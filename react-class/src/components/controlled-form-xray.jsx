

import { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Lock,
  Zap,
  Database,
  CheckCircle2,
  RotateCcw,
  Code2,
  ChevronDown,
  ChevronUp,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
} from "lucide-react";

const FIELDS = [
  { name: "username", label: "Username", type: "text", icon: User, placeholder: "ada_lovelace" },
  { name: "email", label: "Email", type: "email", icon: Mail, placeholder: "ada@example.com" },
  { name: "password", label: "Password", type: "password", icon: Lock, placeholder: "••••••••" },
];

const CODE_LINES = [
  { text: `const [formData, setFormData] = useState({` },
  { text: `  username: "", email: "", password: ""` },
  { text: `})` },
  { text: `` },
  { text: `const handleChange = (e) => {` },
  { text: `  const { name, value } = e.target`, hl: true },
  { text: `  setFormData(prev => ({ ...prev, [name]: value }))`, hl: true },
  { text: `}` },
  { text: `` },
  { text: `<form onSubmit={handleSubmit}>` },
  { text: `  <input` },
  { text: `    name="username"`, hl: true },
  { text: `    value={formData.username}`, hl: true },
  { text: `    onChange={handleChange}`, hl: true },
  { text: `  />` },
  { text: `  {/* email + password inputs follow the same shape */}` },
  { text: `</form>` },
  { text: `` },
  { text: `const handleSubmit = (e) => {` },
  { text: `  e.preventDefault()`, hl: true },
  { text: `  console.log(formData)` },
  { text: `}` },
];

export default function ControlledFormXray() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [lastEvent, setLastEvent] = useState(null);
  const [pulseField, setPulseField] = useState(null);
  const [connected, setConnected] = useState(true);
  const [submitted, setSubmitted] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const pulseTimer = useRef(null);

  useEffect(() => () => clearTimeout(pulseTimer.current), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLastEvent({ type: "change", name, value });
    setPulseField(name);
    clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulseField(null), 500);
  };

  const handleSubmit = () => {
    setSubmitted({ ...formData });
    setLastEvent({ type: "submit", name: null, value: null });
  };

  const handleReset = () => {
    setFormData({ username: "", email: "", password: "" });
    setSubmitted(null);
    setLastEvent(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <Zap size={14} />
            Controlled Components — Live
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Watch React Track Every Keystroke
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            No API calls, no Zustand — just{" "}
            <code className="text-teal-300 bg-slate-900 px-1.5 py-0.5 rounded">useState</code>, an
            event object, and a form that mirrors it back in real time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* THE FORM */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                The Form
              </h2>
              <button
                onClick={() => setConnected((c) => !c)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  connected
                    ? "bg-teal-500/10 border-teal-700 text-teal-300"
                    : "bg-rose-500/10 border-rose-700 text-rose-300"
                }`}
              >
                {connected ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                {connected ? "onChange connected" : "onChange disconnected"}
              </button>
            </div>

            {!connected && (
              <div className="flex items-start gap-2 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-lg p-3 mb-4">
                <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  Try typing below. <code>value={"{formData.field}"}</code> is still set, but
                  nothing updates it anymore — this is the classic frozen-input bug. Check your
                  browser console for React's own warning about it.
                </span>
              </div>
            )}

            {FIELDS.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.name} className="mb-4">
                  <label className="block text-xs text-slate-500 mb-1.5">{f.label}</label>
                  <div className="relative">
                    <Icon
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type={f.type}
                      name={f.name}
                      value={formData[f.name]}
                      onChange={connected ? handleChange : undefined}
                      placeholder={f.placeholder}
                      className={`w-full bg-slate-950 border rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors ${
                        pulseField === f.name
                          ? "border-teal-400 ring-2 ring-teal-400/30"
                          : "border-slate-700 focus:border-teal-500"
                      }`}
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm rounded-lg py-2.5 transition-colors"
              >
                Submit
              </button>
              <button
                onClick={handleReset}
                className="px-4 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg text-sm flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>

          {/* UNDER THE HOOD */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wide mb-3">
                <Database size={14} />
                Component State — formData
              </div>
              <div className="font-mono text-xs md:text-sm bg-slate-950 rounded-lg p-4 leading-relaxed">
                <div className="text-slate-500">{"{"}</div>
                {FIELDS.map((f, idx) => (
                  <div
                    key={f.name}
                    className={`pl-4 transition-colors duration-300 ${
                      pulseField === f.name ? "text-teal-300" : "text-slate-300"
                    }`}
                  >
                    <span className="text-slate-500">{f.name}</span>:{" "}
                    <span className="text-amber-300">"{formData[f.name]}"</span>
                    {idx < FIELDS.length - 1 ? "," : ""}
                  </div>
                ))}
                <div className="text-slate-500">{"}"}</div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wide mb-3">
                <Zap size={14} />
                Last Event Fired
              </div>
              {lastEvent ? (
                <div className="font-mono text-xs md:text-sm space-y-1.5 bg-slate-950 rounded-lg p-4">
                  <div>
                    <span className="text-slate-500">e.type</span> ={" "}
                    <span className="text-amber-300">"{lastEvent.type}"</span>
                  </div>
                  {lastEvent.name && (
                    <div>
                      <span className="text-slate-500">e.target.name</span> ={" "}
                      <span className="text-amber-300">"{lastEvent.name}"</span>
                    </div>
                  )}
                  {lastEvent.value !== null && lastEvent.value !== undefined && (
                    <div>
                      <span className="text-slate-500">e.target.value</span> ={" "}
                      <span className="text-amber-300">"{lastEvent.value}"</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-slate-600 text-sm italic bg-slate-950 rounded-lg p-4">
                  Start typing to fire an event...
                </div>
              )}
            </div>

            {submitted && (
              <div className="bg-emerald-950/30 border border-emerald-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-3">
                  <CheckCircle2 size={14} />
                  Submitted — preventDefault() stopped the reload
                </div>
                <div className="font-mono text-xs md:text-sm space-y-1 bg-slate-950 rounded-lg p-4 text-emerald-200">
                  {Object.entries(submitted).map(([k, v]) => (
                    <div key={k}>
                      {k}: "{v}"
                    </div>
                  ))}
                </div>
                <p className="text-xs text-emerald-500/70 mt-3">
                  No network request sent — this is pure React state, nothing left this browser
                  tab.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowCode((s) => !s)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-300"
          >
            <span className="flex items-center gap-2">
              <Code2 size={16} />
              The exact code producing this
            </span>
            {showCode ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showCode && (
            <div className="px-5 pb-5">
              <div className="font-mono text-xs md:text-sm bg-slate-950 rounded-lg p-4 overflow-x-auto">
                {CODE_LINES.map((l, i) => (
                  <div
                    key={i}
                    className={`px-2 -mx-2 rounded ${
                      l.hl ? "bg-teal-500/10 text-teal-200" : "text-slate-300"
                    }`}
                  >
                    {l.text || "\u00A0"}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Lines highlighted in teal are the three pieces that make an input controlled:{" "}
                <span className="text-teal-300">name</span>,{" "}
                <span className="text-teal-300">value</span>, and{" "}
                <span className="text-teal-300">onChange</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
