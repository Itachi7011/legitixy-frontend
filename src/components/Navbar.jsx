// src/components/Navbar.jsx
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Scale,
  Users,
  Home,
  Shield,
  FileText,
  Monitor,
  Calculator,
  BookOpen,
  MapPin,
  UserCheck,
  X,
  ChevronDown,
  Moon,
  Sun,
  Phone,
  Lock,
  Info,
  PenLine,
  Menu,
  ArrowRight,
  Gavel,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { createPortal } from "react-dom";
/* ─────────────────────────────────────────────
   NAV DATA
───────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label: "Family Law",
    emoji: "👨‍👩‍👧",
    icon: <Users size={14} />,
    color: "#E07B54",
    children: [
      { label: "Divorce in Delhi", path: "/divorce-delhi" },
      { label: "Mutual Divorce", path: "/mutual-divorce" },
      { label: "Contested Divorce", path: "/contested-divorce" },
      { label: "One-Sided Divorce", path: "/one-sided-divorce" },
      { label: "NRI Divorce", path: "/nri-divorce" },
      { label: "498A Case Help", path: "/498a-case-help" },
      { label: "498A False Case Defense", path: "/false-498a-defense" },
      { label: "Dowry Harassment", path: "/dowry-harassment" },
      { label: "Maintenance (125 CrPC)", path: "/maintenance-125-crpc" },
      { label: "Interim Maintenance", path: "/interim-maintenance" },
      { label: "Child Custody", path: "/child-custody" },
      { label: "Visitation Rights", path: "/visitation-rights" },
      { label: "Domestic Violence Act", path: "/domestic-violence-act" },
      { label: "Protection Orders", path: "/domestic-violence-act" },
      { label: "Restitution of Conjugal Rights", path: "/blog" },
      { label: "Annulment of Marriage", path: "/blog" },
      { label: "Court Marriage Delhi", path: "/court-marriage-delhi" },
      {
        label: "Marriage Registration Delhi",
        path: "/marriage-registration-delhi",
      },
      { label: "Adoption Law India", path: "/blog" },
    ],
  },
  {
    label: "Property Law",
    emoji: "🏠",
    icon: <Home size={14} />,
    color: "#4A9D8E",
    children: [
      { label: "Property Dispute", path: "/property-dispute" },
      { label: "Partition Suit", path: "/partition-suit" },
      { label: "Ancestral Property", path: "/ancestral-property" },
      { label: "Illegal Possession", path: "/illegal-possession" },
      { label: "Land Grabbing", path: "/blog" },
      { label: "DDA Property Issues", path: "/blog" },
      { label: "Builder Fraud", path: "/builder-fraud" },
      { label: "RERA Complaint", path: "/rera-complaint" },
      { label: "GPA Property Issues", path: "/blog" },
      { label: "Property Mutation", path: "/blog" },
      { label: "Title Search", path: "/blog" },
      { label: "Sale Deed Registration", path: "/blog" },
      { label: "Will Drafting", path: "/will-drafting" },
      { label: "Probate of Will", path: "/blog" },
      { label: "Succession Certificate", path: "/succession-certificate" },
      { label: "Gift Deed", path: "/gift-deed" },
      { label: "Tenant Eviction Delhi", path: "/tenant-eviction-delhi" },
      { label: "Rent Agreement Drafting", path: "/blog" },
    ],
  },
  {
    label: "Criminal Law",
    emoji: "🚔",
    icon: <Shield size={14} />,
    color: "#C0392B",
    children: [
      { label: "Bail Process Delhi", path: "/bail-process" },
      { label: "Regular Bail", path: "/regular-bail" },
      { label: "Anticipatory Bail", path: "/anticipatory-bail" },
      { label: "FIR Registration", path: "/blog" },
      { label: "FIR Quashing", path: "/fir-quashing" },
      { label: "Criminal Complaint", path: "/blog" },
      { label: "Dowry Case Defense", path: "/dowry-case-defense" },
      { label: "Drunk & Drive Case", path: "/blog" },
      { label: "Cyber Crime Complaint", path: "/cyber-crime-complaint" },
      { label: "Online Fraud", path: "/blog" },
      { label: "White Collar Crime", path: "/blog" },
      { label: "NDPS Cases", path: "/ndps-case" },
      { label: "Assault Case", path: "/assault-case" },
      { label: "Theft Case", path: "/theft-case" },
      { label: "Criminal Appeal", path: "/blog" },
    ],
  },
  {
    label: "Civil & Financial",
    emoji: "🧾",
    icon: <FileText size={14} />,
    color: "#7B68EE",
    children: [
      {
        label: "Cheque Bounce (138 NI Act)",
        path: "/cheque-bounce-138-ni-act",
      },
      { label: "Money Recovery Suit", path: "/money-recovery-suit" },
      { label: "Legal Notice Drafting", path: "/legal-notice-format" },
      { label: "Consumer Complaint", path: "/consumer-complaint" },
      { label: "Loan Recovery", path: "/blog" },
      { label: "Arbitration Case", path: "/blog" },
      { label: "Breach of Contract", path: "/blog" },
      { label: "Defamation Case", path: "/defamation-case" },
      { label: "Company Dispute", path: "/blog" },
      { label: "Partnership Dispute", path: "/blog" },
    ],
  },
  {
    label: "Cyber & Online Law",
    emoji: "💻",
    icon: <Monitor size={14} />,
    color: "#1A7A8A",
    children: [
      { label: "Cyber Crime FIR", path: "/cyber-crime-complaint" },
      { label: "Online Harassment", path: "/blog" },
      { label: "Data Theft", path: "/data-theft-case" },
      { label: "Social Media Defamation", path: "/blog" },
      { label: "UPI Fraud Case", path: "/upi-fraud-case" },
      { label: "Crypto Fraud", path: "/blog" },
      { label: "IT Act Explained", path: "/it-act-explained" },
    ],
  },
  {
    label: "Legal Tools",
    emoji: "🧮",
    icon: <Calculator size={14} />,
    color: "#C9A84C",
    badge: "FREE",
    children: [
      { label: "Divorce Cost Calculator", path: "/divorce-cost-calculator" },
      { label: "Maintenance Calculator", path: "/maintenance-calculator" },
      { label: "Bail Eligibility Checker", path: "/bail-eligibility-checker" },
      {
        label: "Property Share Calculator",
        path: "/property-share-calculator",
      },
      { label: "Court Fee Calculator", path: "/court-fee-calculator" },
      { label: "Stamp Duty Calculator", path: "/blog" },
      { label: "Legal Notice Generator", path: "/legal-notice-generator" },
      { label: "Rent Agreement Generator", path: "/blog" },
      { label: "FIR Draft Generator", path: "/blog" },
      { label: "Complaint Draft Generator", path: "/blog" },
    ],
  },
  {
    label: "Legal Resources",
    emoji: "📚",
    icon: <BookOpen size={14} />,
    color: "#5B8DD9",
    children: [
      { label: "IPC Sections Explained", path: "/blog" },
      { label: "CrPC Explained", path: "/blog" },
      { label: "Indian Evidence Act Guide", path: "/blog" },
      { label: "Constitution Articles Simplified", path: "/blog" },
      { label: "Court Procedure Guide", path: "/blog" },
      { label: "How Courts Work in Delhi", path: "/blog" },
      { label: "District Courts of Delhi", path: "/blog" },
      { label: "High Court Guide", path: "/delhi-high-court" },
    ],
  },
  {
    label: "Delhi Courts",
    emoji: "📍",
    icon: <MapPin size={14} />,
    color: "#E07B54",
    children: [
      { label: "Rohini Court", path: "/rohini-court" },
      { label: "Saket Court", path: "/saket-court" },
      { label: "Tis Hazari Court", path: "/tis-hazari-court" },
      { label: "Dwarka Court", path: "/blog" },
      { label: "Patiala House Court", path: "/blog" },
      { label: "Karkardooma Court", path: "/blog" },
      { label: "Delhi High Court", path: "/delhi-high-court" },
    ],
  },
  {
    label: "Find a Lawyer",
    emoji: "👨‍⚖️",
    icon: <UserCheck size={14} />,
    color: "#4A9D8E",
    children: [
      { label: "Divorce Lawyer Delhi", path: "/divorce-lawyer-delhi" },
      { label: "Property Lawyer Delhi", path: "/property-lawyer-delhi" },
      { label: "Criminal Lawyer Delhi", path: "/criminal-lawyer-delhi" },
      { label: "Bail Lawyer Delhi", path: "/blog" },
      { label: "Cyber Crime Lawyer Delhi", path: "/blog" },
      { label: "Lawyer Near Me", path: "/blog" },
    ],
  },
];

/* ─────────────────────────────────────────────
   DROPDOWN PANEL
───────────────────────────────────────────── */
const DropdownPanel = ({ item, visible, onClose }) => {
  const location = useLocation();
  const half = Math.ceil(item.children.length / 2);
  const col1 = item.children.slice(0, half);
  const col2 = item.children.slice(half);

  return (
    <div
      className={`legitixy-navbar-dropdown ${visible ? "ln-dd--visible" : ""}`}
      style={{ "--ln-accent": item.color }}
    >
      <div className="legitixy-navbar-dropdown__inner">
        {/* Left header strip */}
        <div className="legitixy-navbar-dropdown__header">
          <span className="legitixy-navbar-dropdown__emoji">{item.emoji}</span>
          <span className="legitixy-navbar-dropdown__title">{item.label}</span>
          {item.badge && (
            <span className="legitixy-navbar-dropdown__badge">
              {item.badge}
            </span>
          )}
        </div>
        {/* Links grid */}
        <div className="legitixy-navbar-dropdown__grid">
          <ul className="legitixy-navbar-dropdown__col">
            {col1.map((child, i) => (
              <li key={i}>
                <Link
                  to={child.path}
                  className={`legitixy-navbar-dropdown__link ${location.pathname === child.path ? "ln-dd-link--active" : ""}`}
                  onClick={onClose}
                >
                  <ArrowRight size={11} className="ln-dd-link__arrow" />
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
          {col2.length > 0 && (
            <ul className="legitixy-navbar-dropdown__col">
              {col2.map((child, i) => (
                <li key={i}>
                  <Link
                    to={child.path}
                    className={`legitixy-navbar-dropdown__link ${location.pathname === child.path ? "ln-dd-link--active" : ""}`}
                    onClick={onClose}
                  >
                    <ArrowRight size={11} className="ln-dd-link__arrow" />
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────── */
const Navbar = () => {
  // const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const [mobileExpIdx, setMobileExpIdx] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const navRef = useRef(null);
  const location = useLocation();

  /* close on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpIdx(null);
    setActiveIdx(null);
  }, [location.pathname]);

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* outside click */
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setActiveIdx(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = useCallback((idx) => {
    clearTimeout(closeTimer.current);
    setActiveIdx(idx);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveIdx(null), 180);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveIdx(null), 180);
  }, []);

  return (
    <>
      {/* ── Top utility bar ── */}
      <div
        className={`legitixy-navbar-topbar ${isDarkMode ? "dark" : "light"}`}
      >
        <div className="legitixy-navbar-topbar__inner">
          <span className="legitixy-navbar-topbar__text">
            <Gavel size={11} /> Free Legal Consultation — Call{" "}
            <strong>+91 98765 43210</strong>
          </span>
          <div className="legitixy-navbar-topbar__right">
            <Link to="/blog" className="legitixy-navbar-topbar__link">
              Blog
            </Link>
            <span className="legitixy-navbar-topbar__sep">·</span>
            <Link to="/about" className="legitixy-navbar-topbar__link">
              About
            </Link>
            <span className="legitixy-navbar-topbar__sep">·</span>
            <Link to="/contact" className="legitixy-navbar-topbar__link">
              Contact
            </Link>
            <span className="legitixy-navbar-topbar__sep">·</span>
            <Link
              to="/admin-dashboard"
              className="legitixy-navbar-topbar__link ln-topbar__admin"
            >
              <Lock size={11} /> Admin
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav
        ref={navRef}
        className={`legitixy-navbar ${isDarkMode ? "dark" : "light"} ${scrolled ? "ln--scrolled" : ""}`}
      >
        {/* Gold accent rule */}
        <div className="legitixy-navbar__rule" />

        <div className="legitixy-navbar__container">
          {/* Logo */}
          <Link to="/" className="legitixy-navbar-logo">
            <div className="legitixy-navbar-logo__mark">
              <Scale size={20} strokeWidth={2.4} />
            </div>
            <div className="legitixy-navbar-logo__wordmark">
              <span className="legitixy-navbar-logo__name">Legitixy</span>
              <span className="legitixy-navbar-logo__sub">
                Legal Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="legitixy-navbar-menu">
            <Link to="/" className="legitixy-navbar-menu__home">
              <Home size={14} /> Home
            </Link>

            {NAV_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`legitixy-navbar-menu__item ${activeIdx === idx ? "ln-menu--open" : ""}`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="legitixy-navbar-menu__trigger"
                  aria-expanded={activeIdx === idx}
                >
                  <span className="ln-trigger__icon">{item.icon}</span>
                  <span className="ln-trigger__label">{item.label}</span>
                  {item.badge && (
                    <span className="ln-trigger__badge">{item.badge}</span>
                  )}
                  <ChevronDown
                    size={12}
                    className={`ln-trigger__chevron ${activeIdx === idx ? "ln-chevron--up" : ""}`}
                  />
                </button>

                {/* REPLACE WITH: */}
                <div
                  className={`legitixy-navbar-dropdown-wrap ${activeIdx === idx ? "ln-dd-wrap--visible" : ""}`}
                  onMouseEnter={() => {
                    clearTimeout(closeTimer.current);
                    setActiveIdx(idx); // keep it open when hovering the panel itself
                  }}
                  onMouseLeave={handleDropdownLeave}
                >
                  <DropdownPanel
                    item={item}
                    visible={activeIdx === idx}
                    onClose={() => setActiveIdx(null)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="legitixy-navbar-actions">
            <button
              className="legitixy-navbar-actions__theme"
              onClick={toggleTheme}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <span className="ln-theme-icon">
                {isDarkMode ? (
                  <Sun size={15} strokeWidth={2} />
                ) : (
                  <Moon size={15} strokeWidth={2} />
                )}
              </span>
            </button>

            <Link to="/consult-lawyer" className="legitixy-navbar-actions__cta">
              <Phone size={13} />
              <span>Consult Now</span>
            </Link>

            <button
              className={`legitixy-navbar-actions__burger ${mobileOpen ? "ln-burger--open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer overlay ── */}
        {createPortal(
          <>
            {/* ── Mobile drawer overlay ── */}
            <div
              className={`legitixy-navbar-mob-overlay ${mobileOpen ? "ln-overlay--open" : ""}`}
              onClick={() => setMobileOpen(false)}
            />

            {/* ── Mobile drawer ── */}
            <aside
              className={`legitixy-navbar-mob-drawer ${mobileOpen ? "ln-drawer--open" : ""} ${isDarkMode ? "dark" : "light"}`}
            >
              <div className="legitixy-navbar-mob-drawer__head">
                <Link
                  to="/"
                  className="legitixy-navbar-logo"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="legitixy-navbar-logo__mark ln-logo-mark--sm">
                    <Scale size={17} strokeWidth={2.4} />
                  </div>
                  <div className="legitixy-navbar-logo__wordmark">
                    <span className="legitixy-navbar-logo__name">Legitixy</span>
                    <span className="legitixy-navbar-logo__sub">
                      Legal Intelligence
                    </span>
                  </div>
                </Link>
                <button
                  className="legitixy-navbar-mob-drawer__close"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="legitixy-navbar-mob-drawer__body">
                <Link
                  to="/"
                  className="legitixy-navbar-mob__home"
                  onClick={() => setMobileOpen(false)}
                >
                  <Home size={15} /> Homepage
                </Link>

                {NAV_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="legitixy-navbar-mob__group"
                    style={{ "--ln-accent": item.color }}
                  >
                    <button
                      className={`legitixy-navbar-mob__trigger ${mobileExpIdx === idx ? "ln-mob-trigger--open" : ""}`}
                      onClick={() =>
                        setMobileExpIdx(mobileExpIdx === idx ? null : idx)
                      }
                    >
                      <span className="ln-mob-trigger__left">
                        <span className="ln-mob-trigger__emoji">
                          {item.emoji}
                        </span>
                        <span className="ln-mob-trigger__label">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="ln-trigger__badge">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`ln-trigger__chevron ${mobileExpIdx === idx ? "ln-chevron--up" : ""}`}
                      />
                    </button>
                    <div
                      className={`legitixy-navbar-mob__submenu ${mobileExpIdx === idx ? "ln-mob-sub--open" : ""}`}
                    >
                      {item.children.map((child, ci) => (
                        <Link
                          key={ci}
                          to={child.path}
                          className={`legitixy-navbar-mob__sublink ${location.pathname === child.path ? "ln-mob-sub--active" : ""}`}
                          onClick={() => setMobileOpen(false)}
                        >
                          <ArrowRight size={11} /> {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Static links */}
                <div className="legitixy-navbar-mob__statics">
                  {[
                    { to: "/blog", icon: <PenLine size={15} />, label: "Blog" },
                    {
                      to: "/consult-lawyer",
                      icon: <Phone size={15} />,
                      label: "Consult a Lawyer",
                    },
                    { to: "/about", icon: <Info size={15} />, label: "About" },
                    {
                      to: "/contact",
                      icon: <Phone size={15} />,
                      label: "Contact",
                    },
                    {
                      to: "/admin-dashboard",
                      icon: <Lock size={15} />,
                      label: "Admin",
                    },
                  ].map(({ to, icon, label }, i) => (
                    <Link
                      key={i}
                      to={to}
                      className="legitixy-navbar-mob__static-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      {icon} {label}
                    </Link>
                  ))}
                </div>

                <Link
                  to="/consult-lawyer"
                  className="legitixy-navbar-mob__cta"
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone size={15} /> Free Consultation
                </Link>
              </div>
            </aside>
          </>,
          document.body /* renders directly into <body>, escaping all parents */,
        )}
      </nav>
    </>
  );
};

export default Navbar;
