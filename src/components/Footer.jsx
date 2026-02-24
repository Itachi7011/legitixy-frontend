// src/components/Footer.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronRight,
  Shield,
  Clock,
  Star,
  Award,
  Users,
  MessageSquare,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ExternalLink,
  BookOpen,
  Gavel,
  FileText,
  Home,
  Monitor,
  Calculator,
  UserCheck,
  CheckCircle2,
  Heart,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

/* ── Newsletter form ── */
const NewsletterForm = ({ isDarkMode }) => {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    setStatus("loading");
    // Simulate API call – replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form className="legitixy-footer-newsletter__form" onSubmit={handleSubmit} noValidate>
      <div className="legitixy-footer-newsletter__row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address…"
          className={`legitixy-footer-newsletter__input ${isDarkMode ? "dark" : "light"}`}
          aria-label="Email for newsletter"
          disabled={status === "loading" || status === "success"}
        />
        <button
          type="submit"
          className={`legitixy-footer-newsletter__btn ${status}`}
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" && <span className="lf-spinner" />}
          {status === "success" && <CheckCircle2 size={15} />}
          {(status === "idle" || status === "error") && <Send size={15} />}
          <span>
            {status === "loading" ? "Sending…"
              : status === "success" ? "Subscribed!"
              : "Subscribe"}
          </span>
        </button>
      </div>
      {status === "error" && (
        <p className="legitixy-footer-newsletter__msg error">Please enter a valid email address.</p>
      )}
      {status === "success" && (
        <p className="legitixy-footer-newsletter__msg success">
          🎉 Welcome! You'll receive legal updates soon.
        </p>
      )}
    </form>
  );
};

/* ── Animated counter ── */
const Counter = ({ end, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="legitixy-footer-stat">
      <span className="legitixy-footer-stat__number">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="legitixy-footer-stat__label">{label}</span>
    </div>
  );
};

/* ── Link column ── */
const LinkColumn = ({ title, icon, links }) => (
  <div className="legitixy-footer-col">
    <h4 className="legitixy-footer-col__title">
      <span className="legitixy-footer-col__title-icon">{icon}</span>
      {title}
    </h4>
    <ul className="legitixy-footer-col__list">
      {links.map((link, i) => (
        <li key={i}>
          <Link to={link.path} className="legitixy-footer-col__link">
            <ChevronRight size={11} className="lf-link-arrow" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* ── MAIN FOOTER ── */
const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const familyLinks = [
    { label: "Divorce in Delhi",          path: "/divorce-delhi" },
    { label: "Mutual Divorce",            path: "/mutual-divorce" },
    { label: "Contested Divorce",         path: "/contested-divorce" },
    { label: "498A Case Help",            path: "/498a-case-help" },
    { label: "Dowry Harassment",          path: "/dowry-harassment" },
    { label: "Child Custody",             path: "/child-custody" },
    { label: "Domestic Violence Act",     path: "/domestic-violence-act" },
    { label: "Court Marriage Delhi",      path: "/court-marriage-delhi" },
    { label: "Maintenance (125 CrPC)",    path: "/maintenance-125-crpc" },
  ];

  const propertyLinks = [
    { label: "Property Dispute",          path: "/property-dispute" },
    { label: "Partition Suit",            path: "/partition-suit" },
    { label: "Builder Fraud",             path: "/builder-fraud" },
    { label: "RERA Complaint",            path: "/rera-complaint" },
    { label: "Will Drafting",             path: "/will-drafting" },
    { label: "Succession Certificate",    path: "/succession-certificate" },
    { label: "Tenant Eviction Delhi",     path: "/tenant-eviction-delhi" },
    { label: "Gift Deed",                 path: "/gift-deed" },
    { label: "Ancestral Property",        path: "/ancestral-property" },
  ];

  const criminalLinks = [
    { label: "Bail Process Delhi",        path: "/bail-process" },
    { label: "Anticipatory Bail",         path: "/anticipatory-bail" },
    { label: "FIR Quashing",              path: "/fir-quashing" },
    { label: "NDPS Cases",               path: "/ndps-case" },
    { label: "Dowry Case Defense",        path: "/dowry-case-defense" },
    { label: "Cyber Crime Complaint",     path: "/cyber-crime-complaint" },
    { label: "Assault Case",             path: "/assault-case" },
    { label: "Theft Case",               path: "/theft-case" },
  ];

  const civilLinks = [
    { label: "Cheque Bounce (138 NI)",    path: "/cheque-bounce-138-ni-act" },
    { label: "Money Recovery Suit",       path: "/money-recovery-suit" },
    { label: "Legal Notice Drafting",     path: "/legal-notice-format" },
    { label: "Consumer Complaint",        path: "/consumer-complaint" },
    { label: "Defamation Case",           path: "/defamation-case" },
    { label: "UPI Fraud Case",            path: "/upi-fraud-case" },
    { label: "Data Theft",               path: "/data-theft-case" },
    { label: "IT Act Explained",          path: "/it-act-explained" },
  ];

  const toolLinks = [
    { label: "Divorce Cost Calculator",   path: "/divorce-cost-calculator" },
    { label: "Maintenance Calculator",    path: "/maintenance-calculator" },
    { label: "Bail Eligibility Checker",  path: "/bail-eligibility-checker" },
    { label: "Property Share Calculator", path: "/property-share-calculator" },
    { label: "Court Fee Calculator",      path: "/court-fee-calculator" },
    { label: "Legal Notice Generator",    path: "/legal-notice-generator" },
  ];

  const courtLinks = [
    { label: "Rohini Court",             path: "/rohini-court" },
    { label: "Saket Court",              path: "/saket-court" },
    { label: "Tis Hazari Court",         path: "/tis-hazari-court" },
    { label: "Delhi High Court",         path: "/delhi-high-court" },
    { label: "Divorce Lawyer Delhi",     path: "/divorce-lawyer-delhi" },
    { label: "Property Lawyer Delhi",    path: "/property-lawyer-delhi" },
    { label: "Criminal Lawyer Delhi",    path: "/criminal-lawyer-delhi" },
  ];

  const socials = [
    { icon: <Facebook size={17} />,  label: "Facebook",  href: "https://facebook.com" },
    { icon: <Twitter size={17} />,   label: "Twitter",   href: "https://twitter.com" },
    { icon: <Linkedin size={17} />,  label: "LinkedIn",  href: "https://linkedin.com" },
    { icon: <Youtube size={17} />,   label: "YouTube",   href: "https://youtube.com" },
    { icon: <Instagram size={17} />, label: "Instagram", href: "https://instagram.com" },
  ];

  const badges = [
    { icon: <Shield size={16} />,       label: "Bar Council\nVerified" },
    { icon: <Award size={16} />,        label: "10+ Years\nExperience" },
    { icon: <Star size={16} />,         label: "4.9★ Client\nRating" },
    { icon: <Users size={16} />,        label: "15,000+\nCases Won" },
  ];

  return (
    <footer className={`legitixy-footer ${isDarkMode ? "dark" : "light"}`}>

      {/* ── Decorative top wave ── */}
      <div className="legitixy-footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* ══════════════ STATS BAND ══════════════ */}
      <div className="legitixy-footer-stats-band">
        <div className="legitixy-footer-stats-band__inner">
          <Counter end={15000} label="Cases Handled" />
          <div className="lf-stat-divider" aria-hidden="true" />
          <Counter end={98}    label="Success Rate" suffix="%" />
          <div className="lf-stat-divider" aria-hidden="true" />
          <Counter end={500}   label="Expert Lawyers" />
          <div className="lf-stat-divider" aria-hidden="true" />
          <Counter end={22}    label="Districts Covered" />
          <div className="lf-stat-divider" aria-hidden="true" />
          <Counter end={10}    label="Years of Trust" />
        </div>
      </div>

      {/* ══════════════ NEWSLETTER STRIP ══════════════ */}
      <div className="legitixy-footer-newsletter">
        <div className="legitixy-footer-newsletter__inner">
          <div className="legitixy-footer-newsletter__copy">
            <h3 className="legitixy-footer-newsletter__heading">
              <MessageSquare size={18} />
              Free Legal Updates, Straight to Your Inbox
            </h3>
            <p className="legitixy-footer-newsletter__sub">
              Get weekly explainers on IPC sections, case updates, know-your-rights guides — no spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* ══════════════ MAIN GRID ══════════════ */}
      <div className="legitixy-footer-main">
        <div className="legitixy-footer-main__inner">

          {/* Brand column */}
          <div className="legitixy-footer-brand">
            {/* Logo */}
            <Link to="/" className="legitixy-footer-brand__logo">
              <div className="legitixy-footer-brand__logo-mark">
                <Scale size={22} strokeWidth={2.3} />
              </div>
              <div className="legitixy-footer-brand__logo-text">
                <span className="legitixy-footer-brand__name">Legitixy</span>
                <span className="legitixy-footer-brand__tagline">Legal Intelligence</span>
              </div>
            </Link>

            <p className="legitixy-footer-brand__desc">
              India's trusted legal companion — connecting citizens with expert lawyers, 
              free legal tools, and plain-language guides for Delhi's courts and beyond. 
              Justice made accessible.
            </p>

            {/* Trust badges */}
            <div className="legitixy-footer-badges">
              {badges.map((b, i) => (
                <div key={i} className="legitixy-footer-badge">
                  <span className="legitixy-footer-badge__icon">{b.icon}</span>
                  <span className="legitixy-footer-badge__label">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="legitixy-footer-contact">
              <a href="tel:+919876543210" className="legitixy-footer-contact__item">
                <span className="legitixy-footer-contact__icon"><Phone size={14} /></span>
                +91 98765 43210
              </a>
              <a href="mailto:help@legitixy.in" className="legitixy-footer-contact__item">
                <span className="legitixy-footer-contact__icon"><Mail size={14} /></span>
                help@legitixy.in
              </a>
              <div className="legitixy-footer-contact__item">
                <span className="legitixy-footer-contact__icon"><MapPin size={14} /></span>
                New Delhi, India — 110001
              </div>
              <div className="legitixy-footer-contact__item">
                <span className="legitixy-footer-contact__icon"><Clock size={14} /></span>
                Mon–Sat · 9 AM – 7 PM IST
              </div>
            </div>

            {/* Socials */}
            <div className="legitixy-footer-socials">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="legitixy-footer-social__btn"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="legitixy-footer-links-grid">
            <LinkColumn
              title="Family Law"
              icon={<Users size={13} />}
              links={familyLinks}
            />
            <LinkColumn
              title="Property Law"
              icon={<Home size={13} />}
              links={propertyLinks}
            />
            <LinkColumn
              title="Criminal Law"
              icon={<Shield size={13} />}
              links={criminalLinks}
            />
            <LinkColumn
              title="Civil & Cyber"
              icon={<Monitor size={13} />}
              links={civilLinks}
            />
            <LinkColumn
              title="Legal Tools"
              icon={<Calculator size={13} />}
              links={toolLinks}
            />
            <LinkColumn
              title="Courts & Lawyers"
              icon={<UserCheck size={13} />}
              links={courtLinks}
            />
          </div>
        </div>
      </div>

      {/* ══════════════ DISCLAIMER BAND ══════════════ */}
      <div className="legitixy-footer-disclaimer">
        <div className="legitixy-footer-disclaimer__inner">
          <Gavel size={14} className="lf-disc-icon" />
          <p>
            <strong>Disclaimer:</strong> The information provided on Legitixy is for general informational and educational 
            purposes only and does not constitute legal advice. Use of this website does not create an attorney-client 
            relationship. Please consult a qualified advocate for advice specific to your legal situation. 
            Laws may vary and are subject to change.
          </p>
        </div>
      </div>

      {/* ══════════════ BOTTOM BAR ══════════════ */}
      <div className="legitixy-footer-bottom">
        <div className="legitixy-footer-bottom__inner">
          <p className="legitixy-footer-bottom__copy">
            © {new Date().getFullYear()} <strong>Legitixy</strong>. All rights reserved.
            Made with <Heart size={11} className="lf-heart" fill="currentColor" /> in India.
          </p>

          <nav className="legitixy-footer-bottom__links" aria-label="Legal pages">
            {[
              { label: "Privacy Policy",   path: "/blog" },
              { label: "Terms of Use",     path: "/blog" },
              { label: "Cookie Policy",    path: "/blog" },
              { label: "Grievance",        path: "/contact" },
              { label: "Sitemap",          path: "/blog" },
            ].map((link, i) => (
              <Link key={i} to={link.path} className="legitixy-footer-bottom__link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="legitixy-footer-bottom__secure">
            <Shield size={12} />
            <span>256-bit SSL Secured</span>
          </div>
        </div>
      </div>

      {/* ── Background decorative orbs ── */}
      <div className="legitixy-footer-orb legitixy-footer-orb--1" aria-hidden="true" />
      <div className="legitixy-footer-orb legitixy-footer-orb--2" aria-hidden="true" />
      <div className="legitixy-footer-orb legitixy-footer-orb--3" aria-hidden="true" />
    </footer>
  );
};

export default Footer;