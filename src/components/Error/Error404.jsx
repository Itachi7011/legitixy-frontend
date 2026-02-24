// src/pages/Error404.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Scale,
  Home,
  ArrowLeft,
  Search,
  Phone,
  FileText,
  Shield,
  Users,
  Calculator,
  ChevronRight,
  Gavel,
  BookOpen,
  MapPin,
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

/* ── Quick links shown on 404 page ── */
const QUICK_LINKS = [
  { icon: <Users size={16} />,      label: "Family Law",        path: "/divorce-delhi",         color: "#E07B54" },
  { icon: <Home size={16} />,       label: "Property Law",      path: "/property-dispute",       color: "#4A9D8E" },
  { icon: <Shield size={16} />,     label: "Criminal Law",      path: "/bail-process",           color: "#C0392B" },
  { icon: <FileText size={16} />,   label: "Civil Cases",       path: "/cheque-bounce-138-ni-act", color: "#7B68EE" },
  { icon: <Calculator size={16} />, label: "Legal Tools",       path: "/divorce-cost-calculator", color: "#C9A84C" },
  { icon: <Phone size={16} />,      label: "Consult Lawyer",    path: "/consult-lawyer",         color: "#1A7A8A" },
  { icon: <BookOpen size={16} />,   label: "Legal Resources",   path: "/blog",                   color: "#5B8DD9" },
  { icon: <MapPin size={16} />,     label: "Delhi Courts",      path: "/rohini-court",           color: "#E07B54" },
];

/* ── Animated gavel SVG ── */
const GavelIllustration = ({ isDarkMode }) => (
  <div className="e404-gavel-wrap" aria-hidden="true">
    {/* Scales of justice — broken/tilted */}
    <svg
      className="e404-scales-svg"
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central pillar */}
      <rect x="136" y="40" width="8" height="140" rx="4"
        className="e404-svg-pillar" />

      {/* Base */}
      <rect x="90" y="176" width="100" height="12" rx="6"
        className="e404-svg-base" />

      {/* Top crossbar */}
      <rect x="60" y="44" width="160" height="8" rx="4"
        className="e404-svg-bar" />

      {/* Left chain (drooping — out of balance) */}
      <line x1="80" y1="52" x2="52" y2="118" strokeWidth="2.5" strokeDasharray="5,4"
        className="e404-svg-chain" />

      {/* Right chain */}
      <line x1="200" y1="52" x2="228" y2="100" strokeWidth="2.5" strokeDasharray="5,4"
        className="e404-svg-chain" />

      {/* Left pan — tilted low (justice lost) */}
      <g className="e404-svg-pan-left">
        <ellipse cx="52" cy="128" rx="32" ry="10" className="e404-svg-pan-fill" />
        <ellipse cx="52" cy="126" rx="32" ry="10" className="e404-svg-pan-rim" />
        {/* Question mark in pan */}
        <text x="46" y="128" fontSize="14" fontWeight="700"
          className="e404-svg-pan-text" textAnchor="middle" dominantBaseline="middle">
          ?
        </text>
      </g>

      {/* Right pan — tilted high */}
      <g className="e404-svg-pan-right">
        <ellipse cx="228" cy="110" rx="32" ry="10" className="e404-svg-pan-fill" />
        <ellipse cx="228" cy="108" rx="32" ry="10" className="e404-svg-pan-rim" />
        {/* 404 in pan */}
        <text x="228" y="110" fontSize="10" fontWeight="700"
          className="e404-svg-pan-text" textAnchor="middle" dominantBaseline="middle">
          404
        </text>
      </g>

      {/* Gavel head */}
      <g className="e404-svg-gavel" style={{ transformOrigin: "100px 80px" }}>
        <rect x="58" y="62" width="84" height="30" rx="8"
          className="e404-svg-gavel-head" />
        {/* Handle */}
        <rect x="118" y="72" width="90" height="10" rx="5"
          className="e404-svg-gavel-handle"
          style={{ transformOrigin: "118px 77px", transform: "rotate(28deg)" }} />
        {/* Strike lines */}
        <line x1="48" y1="88" x2="38" y2="78" strokeWidth="3" strokeLinecap="round"
          className="e404-svg-strike e404-svg-strike--1" />
        <line x1="44" y1="96" x2="32" y2="92" strokeWidth="3" strokeLinecap="round"
          className="e404-svg-strike e404-svg-strike--2" />
        <line x1="48" y1="104" x2="36" y2="106" strokeWidth="3" strokeLinecap="round"
          className="e404-svg-strike e404-svg-strike--3" />
      </g>
    </svg>
  </div>
);

/* ── Floating particles background ── */
const Particles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="e404-particles" aria-hidden="true">
      {particles.map((i) => (
        <div
          key={i}
          className="e404-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            opacity: 0.15 + Math.random() * 0.25,
          }}
        />
      ))}
    </div>
  );
};

/* ── Main 404 Component ── */
const Error404 = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);
  const [searchVal, setSearchVal] = useState("");
  const timerRef = useRef(null);

  /* Auto-redirect countdown */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [navigate]);

  const cancelCountdown = () => {
    clearInterval(timerRef.current);
    setCountdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/blog?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <div className={`e404-page ${isDarkMode ? "dark" : "light"}`}>

      {/* Background layers */}
      <div className="e404-bg-grid" aria-hidden="true" />
      <div className="e404-bg-glow e404-bg-glow--gold" aria-hidden="true" />
      <div className="e404-bg-glow e404-bg-glow--teal" aria-hidden="true" />
      <Particles />

      {/* ── Decorative diagonal stripe ── */}
      <div className="e404-stripe" aria-hidden="true" />

      <div className="e404-container">

        {/* ── Top brand mark ── */}
        <Link to="/" className="e404-brand" onClick={cancelCountdown}>
          <div className="e404-brand__mark">
            <Scale size={20} strokeWidth={2.3} />
          </div>
          <span className="e404-brand__name">Legitixy</span>
        </Link>

        {/* ── Main content card ── */}
        <div className="e404-card">

          {/* Left — Illustration side */}
          <div className="e404-card__visual">
            {/* Giant 404 text */}
            <div className="e404-glitch-wrap" aria-hidden="true">
              <span className="e404-glitch" data-text="404">404</span>
            </div>

            <GavelIllustration isDarkMode={isDarkMode} />

            {/* Floating badges */}
            <div className="e404-float-badge e404-float-badge--1">
              <Gavel size={12} /> Case Not Found
            </div>
            <div className="e404-float-badge e404-float-badge--2">
              <Scale size={12} /> Out of Jurisdiction
            </div>
          </div>

          {/* Right — Content side */}
          <div className="e404-card__content">

            {/* Status pill */}
            <div className="e404-status-pill">
              <span className="e404-status-dot" />
              Error 404 · Page Not Found
            </div>

            <h1 className="e404-heading">
              This page has been
              <span className="e404-heading__accent"> adjourned.</span>
            </h1>

            <p className="e404-subtext">
              The page you're looking for doesn't exist, has been moved, or is temporarily unavailable — 
              like a case that's been transferred to another court. Let us help you find what you need.
            </p>

            {/* Search bar */}
            <form className="e404-search" onSubmit={handleSearch}>
              <div className={`e404-search__wrap ${isDarkMode ? "dark" : "light"}`}>
                <Search size={16} className="e404-search__icon" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search legal topics, sections, cases…"
                  className="e404-search__input"
                  aria-label="Search Legitixy"
                  onClick={cancelCountdown}
                />
                <button type="submit" className="e404-search__btn" onClick={cancelCountdown}>
                  Search
                </button>
              </div>
            </form>

            {/* Action buttons */}
            <div className="e404-actions">
              <Link to="/" className="e404-btn e404-btn--primary" onClick={cancelCountdown}>
                <Home size={15} />
                Go to Homepage
              </Link>
              <button
                className="e404-btn e404-btn--secondary"
                onClick={() => { cancelCountdown(); navigate(-1); }}
              >
                <ArrowLeft size={15} />
                Go Back
              </button>
              <Link to="/consult-lawyer" className="e404-btn e404-btn--gold" onClick={cancelCountdown}>
                <Phone size={15} />
                Talk to a Lawyer
              </Link>
            </div>

            {/* Auto-redirect notice */}
            {countdown !== null && (
              <div className="e404-redirect-notice">
                <div
                  className="e404-redirect-bar"
                  style={{ animationDuration: "15s" }}
                />
                <span>
                  Redirecting to homepage in{" "}
                  <strong>{countdown}s</strong> —{" "}
                  <button className="e404-redirect-cancel" onClick={cancelCountdown}>
                    Cancel
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Quick links section ── */}
        <div className="e404-quick-section">
          <h2 className="e404-quick-section__title">
            <Gavel size={16} />
            Find what you're looking for
          </h2>
          <div className="e404-quick-grid">
            {QUICK_LINKS.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="e404-quick-card"
                style={{ "--e404-accent": item.color }}
                onClick={cancelCountdown}
              >
                <span className="e404-quick-card__icon">{item.icon}</span>
                <span className="e404-quick-card__label">{item.label}</span>
                <ChevronRight size={13} className="e404-quick-card__arrow" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="e404-footer-bar">
          <span>© {new Date().getFullYear()} Legitixy — Legal Intelligence</span>
          <div className="e404-footer-bar__links">
            <Link to="/contact" onClick={cancelCountdown}>Contact Support</Link>
            <span aria-hidden="true">·</span>
            <Link to="/blog" onClick={cancelCountdown}>Legal Blog</Link>
            <span aria-hidden="true">·</span>
            <Link to="/consult-lawyer" onClick={cancelCountdown}>Get Help</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Error404;