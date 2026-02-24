// src/pages/Home.jsx
import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Scale, Users, Home as HomeIcon, Shield, FileText, Monitor,
  Calculator, MapPin, UserCheck, Phone, ArrowRight, Star,
  CheckCircle2, ChevronRight, Gavel, BookOpen, MessageSquare,
  Award, Clock, Lock, Zap, Search, Building2, BadgeCheck,
  HeartHandshake, Newspaper, Send, MessageCircle, AlarmClock,
  Landmark, ScrollText, CircleDollarSign, BarChart3, Globe,
  ShieldCheck, ChevronDown, ChevronUp, Briefcase,
  GraduationCap, Heart, ThumbsUp, Brain, Bot,
  Lightbulb, FileCheck, PenLine, ListChecks, HelpCircle,
  Flag, Map
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

/* ================================================================
   UTILITY COMPONENTS
================================================================ */
const AnimatedCounter = ({ end, suffix = "", duration = 2200 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const step = end / (duration / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur += step;
          if (cur >= end) { setCount(end); clearInterval(t); }
          else setCount(Math.floor(cur));
        }, 16);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const TypingText = ({ words }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const speed = deleting ? 38 : 85;
    const t = setTimeout(() => {
      if (!deleting && displayed === current) { setTimeout(() => setDeleting(true), 1800); }
      else if (deleting && displayed === "") { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
      else { setDisplayed(p => deleting ? p.slice(0, -1) : current.slice(0, p.length + 1)); }
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx, words]);
  return <span className="hp-typing">{displayed}<span className="hp-cursor">|</span></span>;
};

const Section = ({ children, className = "", id = "" }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <section ref={ref} id={id} className={`${className} ${vis ? "hp-sec-vis" : "hp-sec-hid"}`}>{children}</section>;
};

/* ── Image slot — any size/resolution fits automatically ── */
const ImgSlot = ({ src, alt, className = "", aspectRatio = "16/9" }) => (
  <div className={`hp-img ${className}`} style={{ "--ar": aspectRatio }}>
    {src
      ? <img src={src} alt={alt || ""} className="hp-img__el" loading="lazy" decoding="async" />
      : <div className="hp-img__ph" role="img" aria-label={alt}>
          <FileText size={32} className="hp-img__ph-icon" />
          <span className="hp-img__ph-label">{alt}</span>
          <span className="hp-img__ph-hint">Add image here</span>
        </div>
    }
  </div>
);

/* ── FAQ Accordion ── */
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`hp-faq__item ${open ? "hp-faq__item--open" : ""}`}>
      <button className="hp-faq__q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <div className="hp-faq__body" style={{ maxHeight: open ? "600px" : "0" }}>
        <p className="hp-faq__a">{a}</p>
      </div>
    </div>
  );
};

/* ── WhatsApp ── */
const WABtn = () => (
  <a href="https://wa.me/919876543210?text=Hello%2C%20I%20need%20legal%20help" target="_blank" rel="noopener noreferrer" className="hp-wa" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span className="hp-wa__pulse" />
  </a>
);

/* ── Sticky CTA ── */
const StickyCTA = ({ isDarkMode }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={`hp-sticky ${isDarkMode ? "dark" : "light"} ${show ? "hp-sticky--on" : ""}`}>
      <span className="hp-sticky__txt">Free legal consultation — verified lawyers across all of India & worldwide</span>
      <Link to="/consult-lawyer" className="hp-sticky__btn"><Phone size={13} /> Consult Free</Link>
    </div>
  );
};

/* ── Lexi AI Legal Assistant (Rule-Based, No API) ── */
const KB = [
  { keys: ["divorce","mutual divorce","contested","separation"], ans: "For divorce in India, you can choose:\n🔸 Mutual Consent Divorce (Sec 13B HMA) — requires 1 year separation, 6-month cooling period, takes 6-18 months.\n🔸 Contested Divorce — grounds include adultery, cruelty, desertion (2 yrs), conversion, mental disorder. Can take 2-7 years.\n🔸 NRI Divorce — if married in India, can file in Indian courts regardless of where you live.\nWant info on cost, grounds, or court procedure?" },
  { keys: ["498a","dowry","ipc 498","cruelty husband"], ans: "Section 498A IPC covers cruelty by husband/relatives for dowry. Key points:\n✅ Cognizable & non-bailable offence\n✅ Arrest possible without warrant\n⚠️ Supreme Court guidelines (2017) mandate preliminary inquiry before arrest\n🔸 Defense: Apply for anticipatory bail IMMEDIATELY\n🔸 File counter-complaint if false case\nWant info on bail process or defense strategy?" },
  { keys: ["bail","anticipatory bail","regular bail","arrested","section 438","section 437"], ans: "Bail types in India:\n🔸 Anticipatory Bail (S.438 CrPC) — file in Sessions/High Court before arrest\n🔸 Regular Bail (S.437 CrPC) — after arrest, apply in Magistrate Court\n🔸 High Court Bail (S.439 CrPC) — if lower court refuses\n🔸 Supreme Court — last resort\nFactors: Nature of offence, flight risk, criminal antecedents. NDPS cases are harder — strict conditions apply." },
  { keys: ["property","partition","ancestral","land","succession"], ans: "Property law in India:\n🔸 Hindu Succession Act — daughters have equal coparcenary rights since 2005 amendment\n🔸 Partition suit — file in Civil Court, takes 2-5 years\n🔸 Ancestral property — 4 generations rule\n🔸 NRI property — can own non-agricultural immovable property\n🔸 Mutation — must be done at revenue office after purchase\nNeed state-specific guidance?" },
  { keys: ["consumer","complaint","product","refund","deficiency"], ans: "Consumer Protection Act 2019:\n🔸 District Commission — claims up to ₹1 Crore\n🔸 State Commission — ₹1Cr to ₹10Cr\n🔸 National Commission (NCDRC) — above ₹10Cr\nFile online at edaakhil.nic.in — it's FREE!\nYou can claim: refund + compensation + litigation cost. Complaints must be filed within 2 years of cause of action." },
  { keys: ["cyber","online fraud","upi","hack","phishing","cyber crime"], ans: "Cyber crime in India:\n1️⃣ Report at cybercrime.gov.in immediately\n2️⃣ Call 1930 (National Cyber Crime Helpline — 24/7)\n3️⃣ File FIR at nearest police station\nFor UPI fraud: Contact bank within 3 days — RBI mandates refund for unauthorized transactions. NPCI dispute can be raised too.\nIT Act Sections: 43, 66, 66C, 66D, 67, 72, 420 IPC apply." },
  { keys: ["cheque bounce","138","ni act","dishonour"], ans: "Cheque bounce under Sec 138 NI Act:\n1️⃣ Get dishonour memo from bank\n2️⃣ Send legal notice within 30 days of memo\n3️⃣ 15 days for drawer to pay\n4️⃣ File complaint in Magistrate Court within 30 days\nPunishment: 2 years + fine up to 2x cheque amount. It's compoundable — can settle anytime before conviction. Want a legal notice template?" },
  { keys: ["rera","builder","flat","real estate","possession","delayed"], ans: "RERA (Real Estate Regulation Act 2016):\n🔸 File complaint on your State RERA portal\n🔸 Claim interest @ SBI MCLR+1% for delay\n🔸 Or seek full refund with interest\n🔸 Builder must respond within 30 days\nState RERA portals: maharera.mahaonline.gov.in (Maharashtra), rera.rajasthan.gov.in (Rajasthan), hrera.org.in (Haryana), rera.dda.gov.in (Delhi)" },
  { keys: ["maintenance","alimony","125 crpc","support","wife"], ans: "Maintenance in India:\n🔸 Section 125 CrPC — for wife, minor children, parents. Applies to all religions.\n🔸 Section 24 HMA — interim maintenance during divorce proceedings\n🔸 Permanent alimony — on final divorce decree\nSupreme Court (2022): Maintenance must be paid from filing date. Amount depends on income, lifestyle, needs. Use our Maintenance Calculator for estimate!" },
  { keys: ["fir","first information report","police complaint","refused to file"], ans: "FIR process in India:\n1️⃣ Go to police station of jurisdiction\n2️⃣ If refused, send written complaint to SP/DCP by registered post\n3️⃣ File Zero FIR at any station — they must transfer to correct station\n4️⃣ Approach Magistrate under Sec 156(3) CrPC if police still refuse\n5️⃣ File complaint directly with Magistrate under Sec 200 CrPC\nFIR is mandatory for cognizable offences. Police refusing to file is itself an offence." },
  { keys: ["nri","overseas","foreign","abroad","uk","usa","canada","australia"], ans: "NRI legal services:\n🔸 NRI Divorce — can file in India even if living abroad (if marriage was in India)\n🔸 Property — NRIs can own non-agricultural property. Need GPA for transactions.\n🔸 Succession — nominate Indian lawyer via Power of Attorney\n🔸 OCI/PIO issues — handled at Indian Embassy/Consulate\n🔸 FEMA compliance — mandatory for property purchase/sale\nWe have specialist NRI lawyers covering USA, UK, Canada, Australia, UAE, Singapore." },
  { keys: ["high court","supreme court","appeal","writ","article 226","article 32"], ans: "Court hierarchy in India:\n🏛️ Supreme Court — Article 32 (fundamental rights), SLP appeals\n🏛️ 25 High Courts — Article 226 (writ jurisdiction), First Appeals\n🏛️ District Courts — original civil & criminal jurisdiction\n🏛️ Tribunals — specialized (NCLT, NGT, DRT, ITAT, NCDRC)\nWrit petitions: Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto. File writ for government/constitutional matters." },
  { keys: ["ipc","section","indian penal code","bns"], ans: "Indian Penal Code (now Bharatiya Nyaya Sanhita 2023) key sections:\n🔸 302 — Murder (life imprisonment/death)\n🔸 304 — Culpable homicide\n🔸 376 — Rape\n🔸 498A — Domestic cruelty\n🔸 420 — Cheating\n🔸 379 — Theft\n🔸 323 — Voluntarily causing hurt\n🔸 406 — Criminal breach of trust\nNote: BNS 2023 replaced IPC. Most sections renumbered. Want a specific section explained?" },
];

const getAnswer = (q) => {
  const ql = q.toLowerCase();
  for (const entry of KB) {
    if (entry.keys.some(k => ql.includes(k))) return entry.ans;
  }
  return "Great question! For accurate advice specific to your situation, I recommend:\n🔸 Browse our legal guides (Resources section below)\n🔸 Use our free legal tools (Calculators)\n🔸 Consult a verified lawyer — FIRST 15 MINUTES FREE!\n\nYou can also ask me about: divorce, bail, property, 498A, consumer complaints, cyber crime, cheque bounce, RERA, NRI law, FIR, IPC sections, High Court, Supreme Court.";
};

const Lexi = ({ isDarkMode }) => {
  const [msgs, setMsgs] = useState([{ role: "bot", text: "Hi! I'm Lexi 👋 Ask me anything about Indian law — divorce, bail, property, cyber crime, NRI issues and more. I'll guide you instantly." }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = useCallback(() => {
    if (!input.trim()) return;
    const userMsg = input;
    setMsgs(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs(m => [...m, { role: "bot", text: getAnswer(userMsg) }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  }, [input]);

  const SUGGESTIONS = ["How to get divorce?", "Anticipatory bail process", "498A false case defense", "RERA complaint against builder", "NRI property management"];

  return (
    <div className={`hp-lexi ${isDarkMode ? "dark" : "light"}`}>
      <div className="hp-lexi__head">
        <div className="hp-lexi__avatar"><Bot size={18} /></div>
        <div><div className="hp-lexi__name">Lexi — AI Legal Assistant</div><div className="hp-lexi__status"><span className="hp-lexi__dot" /> Always Online · Indian Law KB</div></div>
      </div>
      <div className="hp-lexi__msgs">
        {msgs.map((m, i) => (
          <div key={i} className={`hp-lexi__msg hp-lexi__msg--${m.role}`} style={{ whiteSpace: "pre-line" }}>{m.text}</div>
        ))}
        {typing && <div className="hp-lexi__msg hp-lexi__msg--bot"><span className="hp-lexi__dots"><span /><span /><span /></span></div>}
        <div ref={endRef} />
      </div>
      <div className="hp-lexi__suggestions">
        {SUGGESTIONS.map((s, i) => <button key={i} className="hp-lexi__sugg" onClick={() => { setInput(s); }}>{s}</button>)}
      </div>
      <div className="hp-lexi__row">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask any legal question…" className="hp-lexi__input" aria-label="Legal question" />
        <button onClick={send} className="hp-lexi__send" aria-label="Send"><Send size={15} /></button>
      </div>
    </div>
  );
};

/* ================================================================
   STATIC DATA
================================================================ */
const HIGH_COURTS = [
  { name: "Supreme Court of India", loc: "New Delhi", est: "1950", img: "/images/courts/supreme-court.jpg", tag: "Apex Court", path: "/delhi-high-court" },
  { name: "Allahabad High Court", loc: "Prayagraj, Uttar Pradesh", est: "1866", img: "/images/courts/allahabad-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Bombay High Court", loc: "Mumbai, Maharashtra", est: "1862", img: "/images/courts/bombay-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Madras High Court", loc: "Chennai, Tamil Nadu", est: "1862", img: "/images/courts/madras-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Calcutta High Court", loc: "Kolkata, West Bengal", est: "1862", img: "/images/courts/calcutta-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Delhi High Court", loc: "New Delhi", est: "1966", img: "/images/courts/delhi-hc.jpg", tag: "High Court", path: "/delhi-high-court" },
  { name: "Karnataka High Court", loc: "Bengaluru, Karnataka", est: "1884", img: "/images/courts/karnataka-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Gujarat High Court", loc: "Ahmedabad, Gujarat", est: "1960", img: "/images/courts/gujarat-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Rajasthan High Court", loc: "Jodhpur, Rajasthan", est: "1949", img: "/images/courts/rajasthan-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Punjab & Haryana HC", loc: "Chandigarh", est: "1947", img: "/images/courts/phc.jpg", tag: "High Court", path: "/blog" },
  { name: "Kerala High Court", loc: "Kochi, Kerala", est: "1956", img: "/images/courts/kerala-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Telangana High Court", loc: "Hyderabad, Telangana", est: "2019", img: "/images/courts/telangana-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Andhra Pradesh HC", loc: "Amaravati, Andhra Pradesh", est: "2019", img: "/images/courts/ap-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Madhya Pradesh HC", loc: "Jabalpur, M.P.", est: "1956", img: "/images/courts/mp-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Patna High Court", loc: "Patna, Bihar", est: "1916", img: "/images/courts/patna-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Chhattisgarh High Court", loc: "Bilaspur, Chhattisgarh", est: "2000", img: "/images/courts/cg-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Orissa High Court", loc: "Cuttack, Odisha", est: "1948", img: "/images/courts/orissa-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Jharkhand High Court", loc: "Ranchi, Jharkhand", est: "2000", img: "/images/courts/jharkhand-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Gauhati High Court", loc: "Guwahati, Assam", est: "1948", img: "/images/courts/gauhati-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Uttarakhand High Court", loc: "Nainital, Uttarakhand", est: "2000", img: "/images/courts/uk-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Himachal Pradesh HC", loc: "Shimla, Himachal Pradesh", est: "1971", img: "/images/courts/hp-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Jammu & Kashmir HC", loc: "Srinagar / Jammu", est: "1943", img: "/images/courts/jk-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Manipur High Court", loc: "Imphal, Manipur", est: "2013", img: "/images/courts/manipur-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Meghalaya High Court", loc: "Shillong, Meghalaya", est: "2013", img: "/images/courts/meghalaya-hc.jpg", tag: "High Court", path: "/blog" },
  { name: "Tripura High Court", loc: "Agartala, Tripura", est: "2013", img: "/images/courts/tripura-hc.jpg", tag: "High Court", path: "/blog" },
];

const DISTRICT_COURTS = [
  { name: "Tis Hazari Court", state: "Delhi", type: "District Court", path: "/tis-hazari-court" },
  { name: "Saket District Court", state: "Delhi", type: "District Court", path: "/saket-court" },
  { name: "Rohini District Court", state: "Delhi", type: "District Court", path: "/rohini-court" },
  { name: "Dwarka Court", state: "Delhi", type: "District Court", path: "/blog" },
  { name: "Karkardooma Court", state: "Delhi", type: "District Court", path: "/blog" },
  { name: "Patiala House Court", state: "Delhi", type: "District Court", path: "/blog" },
  { name: "City Civil Court Mumbai", state: "Maharashtra", type: "District Court", path: "/blog" },
  { name: "City Civil Court Chennai", state: "Tamil Nadu", type: "District Court", path: "/blog" },
  { name: "City Civil Court Kolkata", state: "West Bengal", type: "District Court", path: "/blog" },
  { name: "District Court Bengaluru", state: "Karnataka", type: "District Court", path: "/blog" },
  { name: "District Court Ahmedabad", state: "Gujarat", type: "District Court", path: "/blog" },
  { name: "District Court Lucknow", state: "Uttar Pradesh", type: "District Court", path: "/blog" },
  { name: "District Court Chandigarh", state: "Punjab/Haryana", type: "District Court", path: "/blog" },
  { name: "District Court Jaipur", state: "Rajasthan", type: "District Court", path: "/blog" },
  { name: "District Court Hyderabad", state: "Telangana", type: "District Court", path: "/blog" },
  { name: "District Court Kochi", state: "Kerala", type: "District Court", path: "/blog" },
  { name: "District Court Bhopal", state: "Madhya Pradesh", type: "District Court", path: "/blog" },
  { name: "District Court Patna", state: "Bihar", type: "District Court", path: "/blog" },
  { name: "District Court Guwahati", state: "Assam", type: "District Court", path: "/blog" },
  { name: "District Court Dehradun", state: "Uttarakhand", type: "District Court", path: "/blog" },
];

const TRIBUNALS = [
  { abbr: "NGT", name: "National Green Tribunal", jurisdiction: "Environmental matters", loc: "New Delhi + 4 Benches" },
  { abbr: "NCLT", name: "National Company Law Tribunal", jurisdiction: "Insolvency, company law", loc: "15 Benches Pan India" },
  { abbr: "NCDRC", name: "National Consumer Commission", jurisdiction: "Consumer disputes >₹10Cr", loc: "New Delhi" },
  { abbr: "ITAT", name: "Income Tax Appellate Tribunal", jurisdiction: "Income tax disputes", loc: "Pan India" },
  { abbr: "DRT", name: "Debt Recovery Tribunal", jurisdiction: "Bank debt recovery >₹20L", loc: "39 DRTs Pan India" },
  { abbr: "RERA", name: "Real Estate Regulatory Authority", jurisdiction: "Real estate disputes", loc: "State-wise portals" },
  { abbr: "AFT", name: "Armed Forces Tribunal", jurisdiction: "Armed forces service matters", loc: "New Delhi + 8 Benches" },
  { abbr: "SAT", name: "Securities Appellate Tribunal", jurisdiction: "SEBI orders", loc: "Mumbai" },
  { abbr: "CAT", name: "Central Administrative Tribunal", jurisdiction: "Central govt service matters", loc: "17 Benches" },
  { abbr: "IPAB", name: "Intellectual Property Board", jurisdiction: "Trademark, patent, copyright", loc: "New Delhi, Mumbai, Chennai" },
  { abbr: "TDSAT", name: "Telecom Disputes Tribunal", jurisdiction: "Telecom disputes", loc: "New Delhi" },
  { abbr: "CESTAT", name: "Customs, Excise, Service Tax AT", jurisdiction: "Indirect tax disputes", loc: "4 Benches" },
];

const PRACTICE_AREAS = [
  { icon: <Users size={24} />, title: "Family Law", color: "#E07B54", colorBg: "rgba(224,123,84,0.10)", desc: "Divorce, custody, maintenance, domestic violence, adoption and marriage laws across all Indian states.", links: [{ l: "Divorce in India", p: "/divorce-delhi" }, { l: "Child Custody", p: "/child-custody" }, { l: "498A Help", p: "/498a-case-help" }, { l: "Maintenance 125 CrPC", p: "/maintenance-125-crpc" }] },
  { icon: <HomeIcon size={24} />, title: "Property Law", color: "#4A9D8E", colorBg: "rgba(74,157,142,0.10)", desc: "Property disputes, partition, builder fraud, RERA, land acquisition, title search across all states.", links: [{ l: "Property Dispute", p: "/property-dispute" }, { l: "Partition Suit", p: "/partition-suit" }, { l: "Builder Fraud", p: "/builder-fraud" }, { l: "RERA Complaint", p: "/rera-complaint" }] },
  { icon: <Shield size={24} />, title: "Criminal Law", color: "#C0392B", colorBg: "rgba(192,57,43,0.10)", desc: "Bail, FIR quashing, anticipatory bail, NDPS, white collar crime and criminal appeals in all courts.", links: [{ l: "Bail Process", p: "/bail-process" }, { l: "Anticipatory Bail", p: "/anticipatory-bail" }, { l: "FIR Quashing", p: "/fir-quashing" }, { l: "NDPS Cases", p: "/ndps-case" }] },
  { icon: <FileText size={24} />, title: "Civil Law", color: "#7B68EE", colorBg: "rgba(123,104,238,0.10)", desc: "Cheque bounce, money recovery, specific performance, injunctions, defamation and civil appeals.", links: [{ l: "Cheque Bounce 138", p: "/cheque-bounce-138-ni-act" }, { l: "Money Recovery", p: "/money-recovery-suit" }, { l: "Legal Notice", p: "/legal-notice-format" }, { l: "Consumer Complaint", p: "/consumer-complaint" }] },
  { icon: <Monitor size={24} />, title: "Cyber Law", color: "#1A7A8A", colorBg: "rgba(26,122,138,0.10)", desc: "Cyber crime FIR, UPI fraud, data theft, online harassment, IT Act and digital rights violations.", links: [{ l: "Cyber Crime FIR", p: "/cyber-crime-complaint" }, { l: "UPI Fraud Case", p: "/upi-fraud-case" }, { l: "Data Theft", p: "/data-theft-case" }, { l: "IT Act Explained", p: "/it-act-explained" }] },
  { icon: <Briefcase size={24} />, title: "Corporate Law", color: "#5B8DD9", colorBg: "rgba(91,141,217,0.10)", desc: "Company law, NCLT, insolvency, M&A, FEMA, GST disputes and startup legal compliance.", links: [{ l: "Company Dispute", p: "/blog" }, { l: "NCLT Filing", p: "/blog" }, { l: "Partnership Dispute", p: "/defamation-case" }, { l: "GST Dispute", p: "/blog" }] },
  { icon: <Landmark size={24} />, title: "Constitutional Law", color: "#C9A84C", colorBg: "rgba(201,168,76,0.10)", desc: "Writ petitions, fundamental rights, PIL, election law and constitutional challenges to legislation.", links: [{ l: "Writ Petition", p: "/blog" }, { l: "PIL Filing", p: "/blog" }, { l: "Fundamental Rights", p: "/blog" }, { l: "Election Dispute", p: "/blog" }] },
  { icon: <Globe size={24} />, title: "NRI & International", color: "#9B59B6", colorBg: "rgba(155,89,182,0.10)", desc: "NRI divorce, property, OCI issues, GPA, inheritance, cross-border disputes and immigration law.", links: [{ l: "NRI Divorce", p: "/nri-divorce" }, { l: "NRI Property", p: "/property-dispute" }, { l: "Power of Attorney", p: "/blog" }, { l: "Succession Cert.", p: "/succession-certificate" }] },
  { icon: <Heart size={24} />, title: "Labour & Employment", color: "#E74C3C", colorBg: "rgba(231,76,60,0.10)", desc: "Wrongful termination, PF/ESI disputes, POSH Act, labour court, gratuity and trade union matters.", links: [{ l: "Wrongful Termination", p: "/blog" }, { l: "PF/ESI Dispute", p: "/blog" }, { l: "POSH Act", p: "/blog" }, { l: "Labour Court", p: "/blog" }] },
  { icon: <Calculator size={24} />, title: "Tax Law", color: "#27AE60", colorBg: "rgba(39,174,96,0.10)", desc: "Income tax appeals, GST disputes, ITAT, advance rulings and international tax matters.", links: [{ l: "Income Tax Appeal", p: "/blog" }, { l: "GST Dispute", p: "/blog" }, { l: "ITAT Proceedings", p: "/blog" }, { l: "International Tax", p: "/blog" }] },
  { icon: <Lightbulb size={24} />, title: "Intellectual Property", color: "#8E44AD", colorBg: "rgba(142,68,173,0.10)", desc: "Trademark, copyright, patent filing, IP infringement, domain disputes and licensing agreements.", links: [{ l: "Trademark Reg.", p: "/blog" }, { l: "Copyright", p: "/blog" }, { l: "Patent Filing", p: "/blog" }, { l: "IP Infringement", p: "/blog" }] },
  { icon: <GraduationCap size={24} />, title: "Education Law", color: "#F39C12", colorBg: "rgba(243,156,18,0.10)", desc: "Admission disputes, UGC issues, scholarship problems, exam malpractice and teacher service matters.", links: [{ l: "Admission Dispute", p: "/blog" }, { l: "UGC Issues", p: "/blog" }, { l: "Exam Malpractice", p: "/blog" }, { l: "Teacher Service", p: "/blog" }] },
];

const TOOLS = [
  { icon: <Calculator size={19} />, title: "Divorce Cost Calculator", path: "/divorce-cost-calculator", desc: "State-wise divorce cost estimate", color: "#E07B54" },
  { icon: <BarChart3 size={19} />, title: "Maintenance Calculator", path: "/maintenance-calculator", desc: "Monthly alimony estimation", color: "#4A9D8E" },
  { icon: <ShieldCheck size={19} />, title: "Bail Eligibility Checker", path: "/bail-eligibility-checker", desc: "Check bail conditions & chances", color: "#C0392B" },
  { icon: <HomeIcon size={19} />, title: "Property Share Calculator", path: "/property-share-calculator", desc: "Partition share by Hindu Succession Act", color: "#7B68EE" },
  { icon: <CircleDollarSign size={19} />, title: "Court Fee Calculator", path: "/court-fee-calculator", desc: "Filing fees for any Indian court", color: "#1A7A8A" },
  { icon: <ScrollText size={19} />, title: "Legal Notice Generator", path: "/legal-notice-generator", desc: "Legally valid notice in 2 minutes", color: "#C9A84C" },
  { icon: <FileCheck size={19} />, title: "Stamp Duty Calculator", path: "/blog", desc: "State-wise stamp duty rates", color: "#27AE60" },
  { icon: <PenLine size={19} />, title: "Rent Agreement Generator", path: "/blog", desc: "Legally valid rent deed draft", color: "#5B8DD9" },
  { icon: <ListChecks size={19} />, title: "FIR Draft Generator", path: "/blog", desc: "Structured FIR for any crime", color: "#E74C3C" },
];

const WORLD_LAWYERS = [
  { title: "NRI Legal Services", regions: "UK · USA · Canada · Australia · UAE", icon: <Globe size={22} />, color: "#5B8DD9", desc: "Divorce, property, succession & power of attorney for Indians living abroad. Available in 50+ countries." },
  { title: "International Arbitration", regions: "Singapore · Dubai · London · New York", icon: <Briefcase size={22} />, color: "#7B68EE", desc: "Cross-border commercial disputes, enforcement of foreign arbitral awards in Indian courts." },
  { title: "Immigration & Visa Law", regions: "USA · UK · Canada · Australia · Schengen", icon: <Flag size={22} />, color: "#E07B54", desc: "Visa rejections, deportation defence, OCI/PIO card issues, H1B, student visa and asylum cases." },
  { title: "Corporate & M&A Law", regions: "Pan India + International", icon: <Building2 size={22} />, color: "#4A9D8E", desc: "Cross-border M&A, FDI compliance, FEMA, joint ventures and international contract drafting." },
  { title: "Intellectual Property", regions: "India + 180 Countries via PCT/Madrid", icon: <Lightbulb size={22} />, color: "#C9A84C", desc: "International trademark, patent PCT filings, copyright and IP enforcement worldwide." },
  { title: "Human Rights & Asylum", regions: "UN Geneva · UNHCR · International Courts", icon: <Heart size={22} />, color: "#C0392B", desc: "International human rights violations, refugee status, asylum applications and statelessness cases." },
];

const RESOURCES = [
  { title: "IPC/BNS Sections Explained", path: "/blog", tag: "Criminal Law", icon: <BookOpen size={16} />, time: "12 min" },
  { title: "CrPC / BNSS Explained", path: "/blog", tag: "Procedure", icon: <ScrollText size={16} />, time: "15 min" },
  { title: "IT Act 2000 Guide", path: "/it-act-explained", tag: "Cyber Law", icon: <Monitor size={16} />, time: "10 min" },
  { title: "Hindu Succession Act", path: "/blog", tag: "Property", icon: <FileText size={16} />, time: "8 min" },
  { title: "Consumer Protection 2019", path: "/blog", tag: "Consumer", icon: <Shield size={16} />, time: "11 min" },
  { title: "RERA Act Complete Guide", path: "/rera-complaint", tag: "Real Estate", icon: <HomeIcon size={16} />, time: "9 min" },
  { title: "POCSO Act Explained", path: "/blog", tag: "Child Rights", icon: <Heart size={16} />, time: "7 min" },
  { title: "Right to Information (RTI)", path: "/blog", tag: "Govt Rights", icon: <FileCheck size={16} />, time: "6 min" },
  { title: "POSH Act — Sexual Harassment", path: "/blog", tag: "Labour", icon: <Users size={16} />, time: "8 min" },
  { title: "Writ Petitions Article 226", path: "/blog", tag: "Constitutional", icon: <Landmark size={16} />, time: "13 min" },
  { title: "Arbitration & Conciliation Act", path: "/blog", tag: "Dispute Resolution", icon: <Scale size={16} />, time: "10 min" },
  { title: "Insolvency & Bankruptcy Code", path: "/blog", tag: "Corporate", icon: <Briefcase size={16} />, time: "12 min" },
];

const FAQS = [
  { q: "How long does a mutual divorce take in India?", a: "Mutual divorce under Section 13B of the Hindu Marriage Act requires: (1) 1 year of separation before filing, (2) Filing of First Motion in Family Court, (3) Mandatory 6-month cooling period (Supreme Court can waive this), (4) Second Motion filing, (5) Divorce decree. Total: 6-18 months. The Supreme Court waives the 6-month period in cases where the marriage is clearly irreparable. All religions have their own personal laws (Muslim: Triple Talaq abolished, Special Marriage Act for interfaith couples)." },
  { q: "Can I get anticipatory bail before being arrested?", a: "Yes. Under Section 438 CrPC (now Section 482 BNSS 2023), anticipatory bail can be applied in Sessions Court or High Court when you apprehend arrest in a non-bailable offence. The court considers: nature of accusation, criminal antecedents, possibility of fleeing, and whether accusation appears malafide. Once granted, police must produce you before the court before formal arrest. Common conditions: surrender passport, attend police station weekly, cooperate with investigation." },
  { q: "What is the jurisdiction of India's High Courts?", a: "India has 25 High Courts. Each has: (1) Original Jurisdiction — for cases above a financial threshold filed directly, (2) Appellate Jurisdiction — hears appeals from District Courts, Sessions Courts and Tribunals, (3) Writ Jurisdiction under Article 226 — can issue all 5 writs (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto) for any violation of legal rights, (4) Supervisory Jurisdiction — over all courts in their territory. Some HCs like Bombay and Calcutta have original civil jurisdiction for high-value commercial disputes." },
  { q: "How do NRIs manage property disputes in India?", a: "NRIs can manage Indian property through: (1) General Power of Attorney (GPA) — notarized at Indian Embassy/Consulate, then apostilled. Authorizes a trusted person for all transactions. (2) Special Power of Attorney — for specific transactions only. (3) Online property portals and court e-proceedings. NRIs can own residential and commercial property (not agricultural land/plantation property). FEMA regulations apply to purchase and sale. Rental income is taxable in India and must be declared in DTAA return. Inheritance rights are same as residents." },
  { q: "What is the process for filing a RERA complaint?", a: "RERA complaint process: (1) Check if builder's project is registered on State RERA portal. (2) Register yourself on the portal (free). (3) File complaint under Section 31 — attach allotment letter, payment receipts, delivery agreement. (4) Pay prescribed fee (nominal, usually ₹1,000-5,000). (5) RERA must decide within 60 days. Remedies: Interest at SBI MCLR+1% for delay, or full refund with interest, or compensation. If builder doesn't comply, file with RERA Adjudicating Officer for penalty of up to 10% of project cost." },
  { q: "Can I file a consumer complaint online in India?", a: "Yes! File online at edaakhil.nic.in — it's completely free. Upload scanned copies of: bill/invoice, complaint letter to company, their reply (or proof of no response), any other evidence. Forum based on claim value: District Commission (up to ₹1 Crore), State Commission (₹1Cr-₹10Cr), National Commission (above ₹10Cr). You can represent yourself — no lawyer mandatory for District Commission. Hearings via video conference allowed. Average disposal time: 3-6 months. You can claim: replacement/refund + compensation + litigation costs." },
  { q: "What are grounds to quash an FIR in High Court?", a: "FIR quashing under Section 482 CrPC (now Section 528 BNSS): The Supreme Court laid down grounds in State of Haryana v. Bhajan Lal (1992): (1) No prima facie offence made out from FIR allegations, (2) FIR allegations are manifestly absurd/inherently improbable, (3) Uncontroverted allegations don't constitute an offence, (4) Matter is essentially civil/commercial in nature, (5) FIR filed with malafide intent to harass, (6) Parties have settled (for compoundable offences). File a Criminal Writ Petition in the High Court with all supporting documents." },
  { q: "How does the cheque bounce 138 NI Act case work?", a: "Complete process: (1) Cheque dishonoured → Get memo from bank within 30 days of expiry. (2) Send legal notice to drawer within 30 days of receiving dishonour memo. (3) 15 days for drawer to make payment. (4) If no payment, file complaint before Judicial Magistrate/Metropolitan Magistrate within 30 days of expiry of 15-day notice period. Punishment: Up to 2 years imprisonment OR fine up to twice the cheque amount OR both. The offence is compoundable — can settle at any stage including appeal. Burden of proof shifts to accused (presumption of debt)." },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar", role: "Property Client", city: "Mumbai, Maharashtra", text: "Legitixy connected me with the right property lawyer within hours. My ancestral property case spanning 3 generations was resolved in 4 months. Exceptional platform.", rating: 5, img: "/images/testimonials/t1.jpg" },
  { name: "Priya Sharma", role: "Divorce Client", city: "Bengaluru, Karnataka", text: "Going through a contested divorce was devastating. The guidance here and the lawyer I found made the process fair and dignified. Truly grateful to the Legitixy team.", rating: 5, img: null },
  { name: "Adv. Mohan Tiwari", role: "Criminal Lawyer, Allahabad HC", city: "Prayagraj, UP", text: "As a practising advocate, I recommend Legitixy to clients needing preliminary guidance. Content is accurate, updated and genuinely helpful to the common man.", rating: 5, img: null },
  { name: "Sunita Verma", role: "498A Defense Client", city: "Jaipur, Rajasthan", text: "My husband was falsely implicated in a 498A case. Legitixy gave us a clear path forward and connected us with an expert. The case was resolved without going to trial.", rating: 5, img: null },
  { name: "Arjun Nair", role: "NRI Property Client", city: "Kerala / London, UK", text: "Managing ancestral property from London was a nightmare until Legitixy. They connected me with an NRI specialist who handled the mutation, sale, and repatriation seamlessly.", rating: 5, img: null },
  { name: "Deepa Krishnan", role: "RERA Complainant", city: "Chennai, Tamil Nadu", text: "Builder delayed my flat by 3 years and refused to refund. With Legitixy's RERA guide and lawyer connect, I got full refund plus 11.5% interest. Couldn't have done it alone.", rating: 5, img: null },
];

const INDIA_STATES = ["Andhra Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Chandigarh","Puducherry","Jammu & Kashmir","Ladakh"];

/* ================================================================
   HOME COMPONENT
================================================================ */
const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [courtTab, setCourtTab] = useState("high");
  const [searchQ, setSearchQ] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", state: "", issue: "" });
  const [formSent, setFormSent] = useState(false);

  const suggestions = ["How to file for divorce in India?", "Anticipatory bail procedure", "Property partition suit", "498A IPC false case defense", "Consumer complaint against builder", "NRI property management"];
  const filtered = searchQ.length > 1 ? suggestions.filter(s => s.toLowerCase().includes(searchQ.toLowerCase())) : [];

  const handleForm = async (e) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 900));
    setFormSent(true);
    setForm({ name: "", phone: "", state: "", issue: "" });
    setTimeout(() => setFormSent(false), 5000);
  };

  const EMERGENCY = [
    { icon: <Users size={19} />, title: "Divorce in India", path: "/divorce-delhi", tag: "Family", color: "#E07B54" },
    { icon: <Shield size={19} />, title: "498A Case Help", path: "/498a-case-help", tag: "Criminal", color: "#C0392B" },
    { icon: <Gavel size={19} />, title: "Bail Process", path: "/bail-process", tag: "Criminal", color: "#C0392B" },
    { icon: <HomeIcon size={19} />, title: "Property Dispute", path: "/property-dispute", tag: "Property", color: "#4A9D8E" },
    { icon: <Monitor size={19} />, title: "Cyber Crime FIR", path: "/cyber-crime-complaint", tag: "Cyber", color: "#1A7A8A" },
    { icon: <FileText size={19} />, title: "Cheque Bounce 138", path: "/cheque-bounce-138-ni-act", tag: "Civil", color: "#7B68EE" },
    { icon: <Globe size={19} />, title: "NRI Legal Help", path: "/nri-divorce", tag: "NRI", color: "#5B8DD9" },
    { icon: <Landmark size={19} />, title: "RERA Complaint", path: "/rera-complaint", tag: "Property", color: "#27AE60" },
  ];

  return (
    <div className={`hp-page ${isDarkMode ? "dark" : "light"}`}>
      <WABtn />
      <StickyCTA isDarkMode={isDarkMode} />

      {/* ════════ HERO ════════ */}
      <section className="hp-hero">
        <div className="hp-hero__bg" aria-hidden />
        <div className="hp-glow hp-glow--a" aria-hidden />
        <div className="hp-glow hp-glow--b" aria-hidden />
        <div className="hp-glow hp-glow--c" aria-hidden />
        <div className="hp-floats" aria-hidden>
          {[Scale,Gavel,Shield,BookOpen,FileText,Landmark,Lock,Award,Globe,Briefcase,Heart,GraduationCap].map((Icon,i)=>(
            <div key={i} className={`hp-float hp-float--${i+1}`}><Icon size={17}/></div>
          ))}
        </div>
        <div className="hp-hero__inner">
          <div className="hp-hero__content">
            <div className="hp-hero__pill">
              <span className="hp-hero__dot" />
              India's Most Comprehensive Legal Platform — All 28 States + UTs + 50 Countries
            </div>
            <h1 className="hp-hero__h1">
              India's Smartest
              <span className="hp-hero__h1-br" />
              <TypingText words={["Legal Knowledge Hub","Lawyer Connect Platform","Court Guide for India","NRI Legal Resource","Legal Tools Engine"]} />
            </h1>
            <p className="hp-hero__sub">
              Supreme Court to District Court. Family law to corporate law. Delhi to Kanyakumari to London.
              Connect with <strong>verified Indian lawyers</strong>, get court guides, and use free legal tools.{" "}
              <strong>100% confidential. Free to browse.</strong>
            </p>

            {/* AI search */}
            <div className={`hp-search ${searchFocus ? "hp-search--focus" : ""}`}>
              <Search size={17} className="hp-search__ico" />
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} onFocus={()=>setSearchFocus(true)} onBlur={()=>setTimeout(()=>setSearchFocus(false),180)} placeholder="Search any legal problem, law section, or court across India…" className="hp-search__inp" aria-label="Search" />
              <Link to="/consult-lawyer" className="hp-search__btn"><Zap size={13}/> Get Help</Link>
              {searchFocus && filtered.length > 0 && (
                <ul className="hp-search__drop">
                  {filtered.map((s,i)=><li key={i}><button onMouseDown={()=>setSearchQ(s)} className="hp-search__sugg"><Search size={11}/>{s}</button></li>)}
                </ul>
              )}
            </div>

            <div className="hp-hero__ctas">
              <Link to="/consult-lawyer" className="hp-btn hp-btn--gold hp-btn--lg"><Phone size={15}/> Free Consultation</Link>
              <a href="#practice" className="hp-btn hp-btn--ghost hp-btn--lg"><ArrowRight size={15}/> Explore Legal Areas</a>
            </div>

            <div className="hp-hero__trust">
              {[
                {i:<Users size={12}/>, l:"1,00,000+ Helped"},
                {i:<Map size={12}/>, l:"All 28 States + UTs"},
                {i:<BadgeCheck size={12}/>, l:"Verified Lawyers"},
                {i:<Globe size={12}/>, l:"50+ Countries NRI"},
                {i:<Lock size={12}/>, l:"100% Confidential"},
              ].map((b,i)=><span key={i} className="hp-hero__badge">{b.i}{b.l}</span>)}
            </div>
          </div>

          <div className="hp-hero__visual">
            <ImgSlot src="/images/hero/india-justice.jpg" alt="India Legal Platform" aspectRatio="4/5" className="hp-hero__img" />
            <div className="hp-hero__sc hp-hero__sc--1"><Scale size={14}/><div><strong><AnimatedCounter end={100000} suffix="+" /></strong><span>Users</span></div></div>
            <div className="hp-hero__sc hp-hero__sc--2"><Gavel size={14}/><div><strong><AnimatedCounter end={98} suffix="%" /></strong><span>Success</span></div></div>
            <div className="hp-hero__sc hp-hero__sc--3"><Globe size={14}/><div><strong>50+</strong><span>Countries</span></div></div>
            <div className="hp-hero__ring" aria-hidden />
          </div>
        </div>
        <div className="hp-scroll-line" aria-hidden><div className="hp-scroll-dot" /></div>
      </section>

      {/* ════════ STATS BAND ════════ */}
      <div className={`hp-stats ${isDarkMode?"dark":"light"}`}>
        <div className="hp-container">
          <div className="hp-stats__grid">
            {[
              {n:100000,s:"+",l:"Users Helped Pan-India"},{n:98,s:"%",l:"Success Rate"},
              {n:1500,s:"+",l:"Verified Lawyers"},{n:25,s:"",l:"High Courts Covered"},
              {n:700,s:"+",l:"District Courts Listed"},{n:50,s:"+",l:"Countries NRI Services"},
            ].map((s,i)=>(
              <div key={i} className="hp-stats__item">
                <span className="hp-stats__num"><AnimatedCounter end={s.n} suffix={s.s}/></span>
                <span className="hp-stats__label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ EMERGENCY ════════ */}
      <Section className="hp-emg" id="emergency">
        <div className="hp-container">
          <div className="hp-emg__head">
            <div className="hp-emg__alarm"><AlarmClock size={19}/></div>
            <div><h2 className="hp-emg__title">Need Immediate Legal Help?</h2><p className="hp-emg__sub">India's most-searched legal situations — get instant guidance and lawyer connect</p></div>
          </div>
          <div className="hp-emg__grid">
            {EMERGENCY.map((c,i)=>(
              <Link key={i} to={c.path} className="hp-emg__card" style={{"--acc":c.color}}>
                <span className="hp-emg__icon">{c.icon}</span>
                <span className="hp-emg__tag">{c.tag}</span>
                <span className="hp-emg__name">{c.title}</span>
                <ArrowRight size={12} className="hp-emg__arr"/>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ PRACTICE AREAS ════════ */}
      <Section className="hp-practice" id="practice">
        <div className="hp-container">
          <div className="hp-shead">
            <span className="hp-eyebrow">Practice Areas</span>
            <h2 className="hp-stitle">12 Legal Domains. <span className="hp-gold">All Covered.</span></h2>
            <p className="hp-ssub">From family law to international arbitration — comprehensive guides for every branch of Indian law, with state-specific coverage.</p>
          </div>
          <div className="hp-practice__grid">
            {PRACTICE_AREAS.map((a,i)=>(
              <div key={i} className="hp-pcard" style={{"--acc":a.color,"--acc-bg":a.colorBg}}>
                <div className="hp-pcard__icon">{a.icon}</div>
                <h3 className="hp-pcard__title">{a.title}</h3>
                <p className="hp-pcard__desc">{a.desc}</p>
                <ul className="hp-pcard__links">
                  {a.links.map((lk,j)=><li key={j}><Link to={lk.p} className="hp-pcard__link"><ChevronRight size={10}/>{lk.l}</Link></li>)}
                </ul>
                <div className="hp-pcard__glow" aria-hidden/>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ AI LEGAL ASSISTANT ════════ */}
      <Section className="hp-lexi-sec">
        <div className="hp-container">
          <div className="hp-lexi-sec__inner">
            <div className="hp-lexi-sec__left">
              <span className="hp-eyebrow">AI Legal Assistant</span>
              <h2 className="hp-stitle">Meet <span className="hp-gold">Lexi</span> — Your 24/7 Legal Guide</h2>
              <p className="hp-ssub" style={{textAlign:"left"}}>
                Can't wait for office hours? Lexi answers Indian legal questions instantly — divorce, bail, property, cyber crime, consumer rights, NRI law and more. No API, no data sharing — runs entirely on Legitixy's legal knowledge base.
              </p>
              <div className="hp-lexi-sec__feats">
                {[
                  {i:<Brain size={16}/>, t:"Trained on Indian law, IPC, CrPC, HMA, IT Act"},
                  {i:<Zap size={16}/>, t:"Instant answers — no waiting, no login required"},
                  {i:<Lock size={16}/>, t:"Private & anonymous — nothing stored"},
                  {i:<MessageCircle size={16}/>, t:"Plain language — no legal jargon needed"},
                ].map((f,i)=><div key={i} className="hp-lexi-sec__feat"><span className="hp-lexi-sec__feat-ico">{f.i}</span><span>{f.t}</span></div>)}
              </div>
              <p className="hp-lexi-sec__note"><HelpCircle size={13}/>Lexi provides general legal information, not advice. <Link to="/consult-lawyer" className="hp-link-gold">Consult a verified lawyer</Link> for your specific case.</p>
            </div>
            <div className="hp-lexi-sec__right">
              <Lexi isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </Section>

      {/* ════════ INDIA COURTS ════════ */}
      <Section className="hp-courts" id="courts">
        <div className="hp-container">
          <div className="hp-shead">
            <span className="hp-eyebrow">Indian Courts Directory</span>
            <h2 className="hp-stitle">Every Court in <span className="hp-gold">India.</span></h2>
            <p className="hp-ssub">Supreme Court to all 25 High Courts, 700+ District Courts and 12 major Tribunals — your complete guide to India's judicial system with procedures, timings, jurisdiction and filing guides.</p>
          </div>

          <div className="hp-ctabs">
            {[
              {k:"high", l:"Supreme & High Courts (25)", i:<Building2 size={14}/>},
              {k:"district", l:"District Courts (700+)", i:<Landmark size={14}/>},
              {k:"tribunal", l:"Tribunals & Commissions (12)", i:<Scale size={14}/>},
            ].map(t=>(
              <button key={t.k} className={`hp-ctab ${courtTab===t.k?"hp-ctab--on":""}`} onClick={()=>setCourtTab(t.k)}>
                {t.i} {t.l}
              </button>
            ))}
          </div>

          {courtTab === "high" && (
            <div className="hp-hc-grid">
              {HIGH_COURTS.map((c,i)=>(
                <Link key={i} to={c.path} className="hp-hc-card">
                  <ImgSlot src={c.img} alt={c.name} aspectRatio="16/9" className="hp-hc-img"/>
                  <div className="hp-hc-body">
                    <span className="hp-hc-tag">{c.tag}</span>
                    <h3 className="hp-hc-name">{c.name}</h3>
                    <p className="hp-hc-loc"><MapPin size={11}/> {c.loc}</p>
                    <p className="hp-hc-est">Est. {c.est}</p>
                    <span className="hp-hc-cta">Learn More <ArrowRight size={12}/></span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {courtTab === "district" && (
            <div className="hp-dc-grid">
              {DISTRICT_COURTS.map((c,i)=>(
                <Link key={i} to={c.path} className="hp-dc-card">
                  <div className="hp-dc-icon"><Landmark size={18}/></div>
                  <div className="hp-dc-body"><h3 className="hp-dc-name">{c.name}</h3><p className="hp-dc-state"><MapPin size={10}/> {c.state}</p></div>
                  <span className="hp-dc-type">{c.type}</span>
                </Link>
              ))}
              <div className="hp-dc-card hp-dc-more">
                <Globe size={22}/>
                <div><strong>700+ District Courts</strong><span>Across all 28 States + UTs</span></div>
                <Link to="/blog" className="hp-btn hp-btn--ghost">View All</Link>
              </div>
            </div>
          )}

          {courtTab === "tribunal" && (
            <div className="hp-trib-grid">
              {TRIBUNALS.map((t,i)=>(
                <Link key={i} to="/blog" className="hp-trib-card">
                  <div className="hp-trib-abbr">{t.abbr}</div>
                  <div className="hp-trib-body">
                    <h3 className="hp-trib-name">{t.name}</h3>
                    <p className="hp-trib-juris">{t.jurisdiction}</p>
                    <p className="hp-trib-loc"><MapPin size={10}/> {t.loc}</p>
                  </div>
                  <ChevronRight size={15} className="hp-trib-arr"/>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* ════════ LEGAL TOOLS ════════ */}
      <Section className="hp-tools">
        <div className="hp-container">
          <div className="hp-shead">
            <span className="hp-eyebrow">Free Legal Tools</span>
            <h2 className="hp-stitle">Smart Tools. <span className="hp-gold">Instant Answers.</span></h2>
            <p className="hp-ssub">India's only complete free legal calculator suite. No signup required — get instant clarity on costs, eligibility, and legal documents.</p>
          </div>
          <div className="hp-tools__grid">
            {TOOLS.map((t,i)=>(
              <Link key={i} to={t.path} className="hp-tool" style={{"--acc":t.color}}>
                <div className="hp-tool__ico">{t.icon}</div>
                <div className="hp-tool__body"><h3 className="hp-tool__title">{t.title}</h3><p className="hp-tool__desc">{t.desc}</p></div>
                <ArrowRight size={14} className="hp-tool__arr"/>
                <span className="hp-tool__badge">FREE</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════ FIND LAWYERS ════════ */}
      <Section className="hp-lawyers" id="lawyers">
        <div className="hp-container">
          <div className="hp-shead">
            <span className="hp-eyebrow">Find a Lawyer</span>
            <h2 className="hp-stitle">Verified Lawyers. <span className="hp-gold">India & Worldwide.</span></h2>
            <p className="hp-ssub">From Supreme Court advocates to local district court lawyers — and specialised international legal services for the 30-million-strong Indian diaspora worldwide.</p>
          </div>
          <ImgSlot src="/images/lawyers/team-india.jpg" alt="Verified Indian Lawyers Network" aspectRatio="21/6" className="hp-lawyers__hero-img"/>
          <h3 className="hp-lawyers__sub-h">India — By Practice Area</h3>
          <div className="hp-lawyers__grid">
            {[
              {t:"Divorce Lawyer",p:"/divorce-lawyer-delhi",i:<Users size={19}/>,c:"#E07B54",exp:"12+ yrs avg",cases:"800+"},
              {t:"Property Lawyer",p:"/property-lawyer-delhi",i:<HomeIcon size={19}/>,c:"#4A9D8E",exp:"15+ yrs avg",cases:"1,200+"},
              {t:"Criminal Lawyer",p:"/criminal-lawyer-delhi",i:<Shield size={19}/>,c:"#C0392B",exp:"10+ yrs avg",cases:"600+"},
              {t:"Corporate Lawyer",p:"/blog",i:<Briefcase size={19}/>,c:"#5B8DD9",exp:"14+ yrs avg",cases:"900+"},
              {t:"Cyber Lawyer",p:"/blog",i:<Monitor size={19}/>,c:"#1A7A8A",exp:"8+ yrs avg",cases:"400+"},
              {t:"Tax Lawyer",p:"/blog",i:<CircleDollarSign size={19}/>,c:"#27AE60",exp:"16+ yrs avg",cases:"1,100+"},
            ].map((l,i)=>(
              <Link key={i} to={l.p} className="hp-lcard" style={{"--acc":l.c}}>
                <div className="hp-lcard__ico">{l.i}</div>
                <h3 className="hp-lcard__title">{l.t}</h3>
                <div className="hp-lcard__meta"><span><Award size={11}/>{l.exp}</span><span><Gavel size={11}/>{l.cases} cases</span></div>
                <div className="hp-lcard__stars">{[...Array(5)].map((_,j)=><Star key={j} size={11} fill="currentColor"/>)}<span>4.9</span></div>
                <div className="hp-lcard__cta">Find {l.t} <ArrowRight size={11}/></div>
              </Link>
            ))}
          </div>

          <h3 className="hp-lawyers__sub-h" style={{marginTop:"60px"}}>International & NRI Legal Services</h3>
          <div className="hp-world__grid">
            {WORLD_LAWYERS.map((l,i)=>(
              <div key={i} className="hp-wcard" style={{"--acc":l.color}}>
                <div className="hp-wcard__ico">{l.icon}</div>
                <h4 className="hp-wcard__title">{l.title}</h4>
                <p className="hp-wcard__regions"><Globe size={11}/> {l.regions}</p>
                <p className="hp-wcard__desc">{l.desc}</p>
                <Link to="/consult-lawyer" className="hp-wcard__btn">Find Specialist <ArrowRight size={12}/></Link>
              </div>
            ))}
          </div>

          <div className="hp-lawyers__bottom">
            <p>Can't find a specialist? Tell us your issue — we match you within 2 hours.</p>
            <Link to="/consult-lawyer" className="hp-btn hp-btn--gold hp-btn--lg"><Phone size={14}/> Free Case Evaluation</Link>
          </div>
        </div>
      </Section>

      {/* ════════ WHY LEGITIXY ════════ */}
      <Section className="hp-why">
        <div className="hp-container">
          <div className="hp-why__inner">
            <div className="hp-why__left">
              <span className="hp-eyebrow" style={{color:"var(--ln-gold-light,#E2B85A)"}}>Why Legitixy</span>
              <h2 className="hp-stitle" style={{color:"#fff"}}>Built for India.<br/><span className="hp-gold">For Every Indian.</span></h2>
              <p style={{color:"rgba(255,255,255,0.65)",fontSize:"clamp(13px,1.2vw,15px)",lineHeight:"1.75"}}>
                We built Legitixy because navigating India's legal system felt impossible without money or connections. From a farmer in Bihar to an NRI in London — justice for all.
              </p>
              <div className="hp-why__stats">
                {[{n:100000,s:"+",l:"Users Helped"},{n:98,s:"%",l:"Success Rate"},{n:1500,s:"+",l:"Verified Lawyers"},{n:25,s:"",l:"High Courts"},{n:700,s:"+",l:"District Courts"},{n:50,s:"+",l:"Countries"}].map((s,i)=>(
                  <div key={i} className="hp-why__stat">
                    <span className="hp-why__stat-n"><AnimatedCounter end={s.n} suffix={s.s}/></span>
                    <span className="hp-why__stat-l">{s.l}</span>
                  </div>
                ))}
              </div>
              <Link to="/consult-lawyer" className="hp-btn hp-btn--gold"><Phone size={14}/> Start Free Consultation</Link>
            </div>
            <div className="hp-why__right">
              <ImgSlot src="/images/why/justice-india.jpg" alt="Justice for all Indians" aspectRatio="3/4" className="hp-why__img"/>
              <div className="hp-why__pts">
                {WHY_POINTS.map((p,i)=>(
                  <div key={i} className="hp-why__pt">
                    <div className="hp-why__pt-ico">{p.icon}</div>
                    <div><h4 className="hp-why__pt-title">{p.title}</h4><p className="hp-why__pt-desc">{p.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════ LEGAL RESOURCES ════════ */}
      <Section className="hp-resources">
        <div className="hp-container">
          <div className="hp-shead">
            <span className="hp-eyebrow">Legal Resources</span>
            <h2 className="hp-stitle">Learn the Law <span className="hp-gold">in Plain Language.</span></h2>
            <p className="hp-ssub">Plain-English explainers of India's most important laws — updated regularly by practising advocates. No law degree needed.</p>
          </div>
          <div className="hp-res__grid">
            {RESOURCES.map((r,i)=>(
              <Link key={i} to={r.path} className="hp-rcard">
                <div className="hp-rcard__ico">{r.icon}</div>
                <div className="hp-rcard__body">
                  <span className="hp-rcard__tag">{r.tag}</span>
                  <h3 className="hp-rcard__title">{r.title}</h3>
                  <span className="hp-rcard__time"><Clock size={10}/> {r.time} read</span>
                </div>
                <ArrowRight size={13} className="hp-rcard__arr"/>
              </Link>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"36px"}}>
            <Link to="/blog" className="hp-btn hp-btn--ghost"><Newspaper size={14}/> View All Legal Articles</Link>
          </div>
        </div>
      </Section>

      {/* ════════ TESTIMONIALS ════════ */}
      <Section className="hp-testimonials">
        <div className="hp-container">
          <div className="hp-shead">
            <span className="hp-eyebrow">Testimonials</span>
            <h2 className="hp-stitle">Real People. <span className="hp-gold">Real Results.</span></h2>
            <p className="hp-ssub">From Kashmir to Kanyakumari, from Mumbai to London — thousands of Indians trust Legitixy with their most sensitive legal matters.</p>
          </div>
          <div className="hp-tgrid">
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="hp-tcard">
                <div className="hp-tcard__stars">{[...Array(t.rating)].map((_,j)=><Star key={j} size={13} fill="currentColor"/>)}</div>
                <p className="hp-tcard__text">"{t.text}"</p>
                <div className="hp-tcard__author">
                  <div className="hp-tcard__av">
                    {t.img ? <img src={t.img} alt={t.name} className="hp-tcard__av-img"/> : <span>{t.name.charAt(0)}</span>}
                  </div>
                  <div><div className="hp-tcard__name">{t.name}</div><div className="hp-tcard__role">{t.role} · {t.city}</div></div>
                  <CheckCircle2 size={15} className="hp-tcard__verified"/>
                </div>
              </div>
            ))}
          </div>
          <ImgSlot src="/images/testimonials/clients-india.jpg" alt="Happy clients across India" aspectRatio="21/5" className="hp-testimonials__strip"/>
        </div>
      </Section>

      {/* ════════ FAQ ════════ */}
      <Section className="hp-faq">
        <div className="hp-container">
          <div className="hp-shead">
            <span className="hp-eyebrow">Frequently Asked Questions</span>
            <h2 className="hp-stitle">Your Legal Questions <span className="hp-gold">Answered.</span></h2>
            <p className="hp-ssub">India's most commonly searched legal questions, answered in plain language by our team of verified advocates.</p>
          </div>
          <div className="hp-faq__grid">
            {FAQS.map((f,i)=><FAQItem key={i} q={f.q} a={f.a}/>)}
          </div>
        </div>
      </Section>

      {/* ════════ FINAL CTA + LEAD FORM ════════ */}
      <Section className="hp-cta">
        <div className="hp-container">
          <div className="hp-cta__inner">
            <div className="hp-cta__left">
              <div className="hp-cta__ico"><Scale size={30}/></div>
              <h2 className="hp-cta__h2">Talk to a Lawyer <span className="hp-gold">Today.</span></h2>
              <p className="hp-cta__sub">Free 15-minute consultation with a verified Indian advocate. Available across all states and for NRI clients worldwide.</p>
              <div className="hp-cta__checks">
                {["Free first consultation","Matched by case type & location","Response within 2 hours","Available for NRIs worldwide","Verified Bar Council advocates only"].map((c,i)=>(
                  <div key={i} className="hp-cta__check"><CheckCircle2 size={14}/>{c}</div>
                ))}
              </div>
              <div className="hp-cta__contacts">
                <a href="tel:+919876543210" className="hp-cta__contact"><Phone size={14}/> +91 98765 43210</a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hp-cta__contact"><MessageCircle size={14}/> WhatsApp</a>
              </div>
              <ImgSlot src="/images/cta/lawyers-group.jpg" alt="Our Verified Indian Lawyer Network" aspectRatio="16/7" className="hp-cta__group-img"/>
            </div>
            <div className="hp-cta__form-wrap">
              {formSent ? (
                <div className="hp-cta__success">
                  <CheckCircle2 size={48}/>
                  <h3>Request Received!</h3>
                  <p>A verified lawyer will contact you within 2 hours.</p>
                </div>
              ) : (
                <form className="hp-cta__form" onSubmit={handleForm}>
                  <h3 className="hp-cta__form-h"><Zap size={15}/> Free Case Evaluation</h3>
                  <input type="text" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="hp-cta__inp" required aria-label="Name"/>
                  <input type="tel" placeholder="Phone / WhatsApp Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="hp-cta__inp" required aria-label="Phone"/>
                  <select value={form.state} onChange={e=>setForm({...form,state:e.target.value})} className="hp-cta__inp hp-cta__sel" required aria-label="State">
                    <option value="">Select State / Country</option>
                    {INDIA_STATES.map(s=><option key={s}>{s}</option>)}
                    <option>USA</option><option>UK</option><option>Canada</option><option>Australia</option><option>UAE</option><option>Singapore</option><option>Other Country</option>
                  </select>
                  <select value={form.issue} onChange={e=>setForm({...form,issue:e.target.value})} className="hp-cta__inp hp-cta__sel" required aria-label="Issue">
                    <option value="">Select Legal Issue</option>
                    <option>Divorce / Family Matter</option><option>Property Dispute</option>
                    <option>Criminal Case / Bail</option><option>498A / Dowry Case</option>
                    <option>Civil / Financial Case</option><option>Cyber Crime</option>
                    <option>Corporate / Business</option><option>NRI Legal Matter</option>
                    <option>Consumer Complaint</option><option>Labour / Employment</option>
                    <option>Tax Dispute</option><option>Intellectual Property</option>
                    <option>Constitutional / PIL</option><option>Other</option>
                  </select>
                  <button type="submit" className="hp-btn hp-btn--gold" style={{width:"100%",justifyContent:"center",padding:"14px 0"}}>
                    <Send size={14}/> Submit — It's Free
                  </button>
                  <p className="hp-cta__note"><Lock size={11}/> 100% confidential · No spam · No obligation ever</p>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="hp-cta__orb hp-cta__orb--1" aria-hidden/>
        <div className="hp-cta__orb hp-cta__orb--2" aria-hidden/>
      </Section>
    </div>
  );
};

const WHY_POINTS = [
  {icon:<BadgeCheck size={19}/>, title:"Verified Legal Information", desc:"All content reviewed by practising advocates registered with Bar Councils across India."},
  {icon:<Map size={19}/>, title:"Pan-India + Global Coverage", desc:"All 28 States, 8 UTs, 25 High Courts, 700+ District Courts and 50+ countries for NRIs."},
  {icon:<Phone size={19}/>, title:"Free Initial Consultation", desc:"First 15 minutes free, no hidden charges, no obligation to proceed, no spam calls."},
  {icon:<ShieldCheck size={19}/>, title:"100% Confidential", desc:"Protected by attorney-client privilege and our DPDP Act 2023 compliant privacy policy."},
  {icon:<Globe size={19}/>, title:"NRI & International Reach", desc:"Legal assistance for the Indian diaspora across USA, UK, Canada, Australia, UAE and 50+ countries."},
  {icon:<Clock size={19}/>, title:"24/7 AI + 9AM-9PM Lawyers", desc:"Lexi answers instantly any time. Verified lawyers connect within 2 hours during business hours."},
  {icon:<HeartHandshake size={19}/>, title:"Transparent Lawyer Matching", desc:"Matched by case type, location and language preference. No referral fees from lawyers."},
  {icon:<ThumbsUp size={19}/>, title:"No Hidden Charges", desc:"All fee structures disclosed upfront. We never charge hidden commissions or success fees."},
];

export default Home;