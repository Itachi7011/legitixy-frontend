import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale, ChevronDown, ChevronRight, BookOpen, Shield, Users, Heart,
  FileText, AlertCircle, Phone, Mail, MapPin, Clock, Star,
  CheckCircle, Info, ArrowRight, MessageSquare, Gavel,
  Home, Baby, UserX, Handshake, Eye, Lock, RotateCcw, Award,
  Calendar, TrendingUp, HelpCircle, ExternalLink, Building2,
  Landmark, ScrollText, ShieldCheck, UserCheck, HeartHandshake,
  Briefcase, Globe, CircleDot, Hash, BarChart2, BookMarked,
  Sparkles, AlertTriangle, Layers, Search, PenLine
} from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import familly1 from "../../images/familly1.jpg"


// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const SUBTOPIC_LINKS = [
  { label: "Divorce in Delhi",              path: "/divorce-delhi",               icon: Gavel },
  { label: "Mutual Divorce",                path: "/mutual-divorce",              icon: Handshake },
  { label: "Contested Divorce",             path: "/contested-divorce",           icon: Scale },
  { label: "One-Sided Divorce",             path: "/one-sided-divorce",           icon: UserX },
  { label: "NRI Divorce",                   path: "/nri-divorce",                 icon: Globe },
  { label: "498A Case Help",                path: "/498a-case-help",              icon: ShieldCheck },
  { label: "498A False Case Defense",       path: "/false-498a-defense",          icon: Shield },
  { label: "Dowry Harassment",              path: "/dowry-harassment",            icon: AlertTriangle },
  { label: "Maintenance (125 CrPC)",        path: "/maintenance-125-crpc",        icon: BarChart2 },
  { label: "Interim Maintenance",           path: "/interim-maintenance",         icon: Clock },
  { label: "Child Custody",                 path: "/child-custody",               icon: Baby },
  { label: "Visitation Rights",             path: "/visitation-rights",           icon: Eye },
  { label: "Domestic Violence Act",         path: "/domestic-violence-act",       icon: Lock },
  { label: "Protection Orders",             path: "/domestic-violence-act",       icon: ShieldCheck },
  { label: "Restitution of Conjugal Rights",path: "/blog",                        icon: HeartHandshake },
  { label: "Annulment of Marriage",         path: "/blog",                        icon: RotateCcw },
  { label: "Court Marriage Delhi",          path: "/court-marriage-delhi",        icon: Heart },
  { label: "Marriage Registration Delhi",   path: "/marriage-registration-delhi", icon: PenLine },
  { label: "Adoption Law India",            path: "/blog",                        icon: Home },
];

const NAV_SECTIONS = [
  { id: 'intro',        label: 'Introduction',    icon: BookOpen },
  { id: 'laws',         label: 'Key Laws',         icon: Scale },
  { id: 'topics',       label: 'Topics',           icon: Layers },
  { id: 'rights',       label: 'Rights',           icon: Shield },
  { id: 'courts',       label: 'Courts',           icon: Building2 },
  { id: 'process',      label: 'Process',          icon: FileText },
  { id: 'judgements',   label: 'Case Law',         icon: Gavel },
  { id: 'timeline',     label: 'Timeline',         icon: Clock },
  { id: 'glossary',     label: 'Glossary',         icon: BookMarked },
  { id: 'faqs',         label: 'FAQs',             icon: HelpCircle },
  { id: 'consult',      label: 'Consult',          icon: Phone },
];

const KEY_ACTS = [
  {
    name: "Hindu Marriage Act, 1955",
    short: "HMA",
    color: "gold",
    scope: "Hindus, Buddhists, Jains, Sikhs",
    keySections: [
      { sec: "Sec 5",   desc: "Conditions for a valid Hindu marriage — parties must be legally free to marry, of sound mind, of marriageable age." },
      { sec: "Sec 11",  desc: "Void marriages — bigamy, prohibited degree of relationship, sapinda relationship (unless custom permits)." },
      { sec: "Sec 12",  desc: "Voidable marriages — impotency, mental disorder, fraud, force, concealment of pre-marriage pregnancy." },
      { sec: "Sec 13",  desc: "Grounds for divorce — adultery, cruelty, desertion (2+ yrs), conversion, mental disorder, leprosy, venereal disease, renunciation, presumed death." },
      { sec: "Sec 13B", desc: "Mutual consent divorce — 1-year separation + joint petition + 6-month cooling period (waivable by SC/HC)." },
      { sec: "Sec 13A", desc: "Alternate relief — court may grant judicial separation instead of divorce if divorce seems harsh." },
      { sec: "Sec 24",  desc: "Pendente lite maintenance — interim alimony and litigation expenses during pendency of any HMA petition." },
      { sec: "Sec 25",  desc: "Permanent alimony — lump sum or monthly; modifiable on change of circumstances; ceases on remarriage." },
      { sec: "Sec 26",  desc: "Custody and education of minor children — court may pass orders at any stage of proceedings." },
      { sec: "Sec 27",  desc: "Property disposal orders — jointly owned property may be disposed of as court deems just and proper." },
      { sec: "Sec 28",  desc: "Appeals — all decrees/orders appealable to the High Court." },
    ]
  },
  {
    name: "Special Marriage Act, 1954",
    short: "SMA",
    color: "blue",
    scope: "Civil / Inter-faith / Inter-caste marriages",
    keySections: [
      { sec: "Sec 4",  desc: "Conditions for marriage — capacity, monogamy, sound mind, age (21M/18F), no prohibited degrees." },
      { sec: "Sec 15", desc: "Registration of marriages solemnized in other forms — existing marriages can be registered under SMA." },
      { sec: "Sec 27", desc: "Divorce grounds — same as HMA; also includes wilful refusal to consummate." },
      { sec: "Sec 28", desc: "Divorce by mutual consent — 1 year separation; 6-month cooling period." },
      { sec: "Sec 36", desc: "Alimony pendente lite and permanent alimony — identical scheme to HMA Sec 24/25." },
      { sec: "Sec 38", desc: "Custody and maintenance of children." },
    ]
  },
  {
    name: "Protection of Women from DV Act, 2005",
    short: "PWDVA",
    color: "rose",
    scope: "All women in domestic relationships",
    keySections: [
      { sec: "Sec 3",  desc: "Definition of domestic violence — physical, sexual, verbal/emotional, economic abuse; threats of abuse." },
      { sec: "Sec 12", desc: "Application to Magistrate — aggrieved person, Protection Officer, or any NGO can apply." },
      { sec: "Sec 17", desc: "Right to reside in shared household — regardless of ownership or tenancy." },
      { sec: "Sec 18", desc: "Protection orders — court restrains respondent from committing violence, entering workplace, communicating." },
      { sec: "Sec 19", desc: "Residence orders — cannot be evicted; respondent may be directed to provide alternative accommodation." },
      { sec: "Sec 20", desc: "Monetary relief — maintenance, medical expenses, loss of earnings, damage to property." },
      { sec: "Sec 21", desc: "Custody orders — interim custody; considers best interests of child." },
      { sec: "Sec 22", desc: "Compensation orders — court may award compensation for injuries, mental torture, emotional distress." },
      { sec: "Sec 31", desc: "Breach of protection order — cognizable, non-bailable offence; imprisonment up to 1 year or fine up to ₹20,000." },
    ]
  },
  {
    name: "Section 85 BNS / 498A IPC",
    short: "BNS",
    color: "amber",
    scope: "Cruelty to wife by husband or relatives",
    keySections: [
      { sec: "Sec 85 BNS", desc: "Cruelty by husband or relatives — punishment up to 3 years + fine; cognizable, non-bailable offence." },
      { sec: "Sec 86 BNS", desc: "Definition of cruelty — wilful conduct to drive woman to suicide; harassment for dowry." },
      { sec: "Sec 84 BNS", desc: "Dowry death — husband/relatives liable for death of woman within 7 years of marriage by burns/bodily injury or suspicious circumstances." },
      { sec: "Arnesh Kumar", desc: "SC directive 2014 — police cannot automatically arrest under 498A; Section 41A BNSS notice mandatory first." },
    ]
  },
  {
    name: "BNSS Sec 144 / CrPC Sec 125",
    short: "BNSS",
    color: "green",
    scope: "Maintenance for wife, children, parents",
    keySections: [
      { sec: "Sec 144",     desc: "Order for maintenance — wife (including divorced wife), minor children, major children (if disabled), parents." },
      { sec: "Sec 145",     desc: "Procedure — magistrate may order interim maintenance within 60 days from first hearing." },
      { sec: "Sec 147",     desc: "Alteration of allowance — on change of circumstances, either party can apply for modification." },
      { sec: "Sec 148",     desc: "Enforcement by warrant — magistrate can issue warrant of attachment and sale if payment defaulted." },
      { sec: "Rajnesh 2020", desc: "SC judgment standardizing maintenance procedure — mandatory disclosure, one court proceedings, no parallel claims." },
    ]
  },
  {
    name: "Hindu Adoption & Maintenance Act, 1956",
    short: "HAMA",
    color: "teal",
    scope: "Hindus — adoption and maintenance",
    keySections: [
      { sec: "Sec 7",  desc: "Capacity to adopt — Hindu male (sound mind, major); wife's consent required unless she is unsound mind, has renounced world, or ceased to be Hindu." },
      { sec: "Sec 8",  desc: "Female Hindu's capacity to adopt — must be of sound mind, major, unmarried or divorced/widow." },
      { sec: "Sec 11", desc: "Conditions for valid adoption — child must be Hindu, not already adopted, not married (unless custom permits), not above 15 years (unless custom permits)." },
      { sec: "Sec 18", desc: "Maintenance of wife — husband must maintain wife during his lifetime; separated wife entitled to maintenance." },
      { sec: "Sec 20", desc: "Maintenance of children and aged parents — legal obligation on Hindu to maintain children (minor) and parents." },
    ]
  },
];

const RIGHTS_DATA = [
  {
    category: "Wife / Woman",
    icon: Heart,
    color: "rose",
    rights: [
      { title: "Streedhan Protection", desc: "All gifts, jewellery, cash and property received by a woman before, during, or after marriage is her absolute property (streedhan). Husband/in-laws holding it without consent constitutes criminal breach of trust." },
      { title: "Right to Reside", desc: "A woman cannot be thrown out of the matrimonial home. Even without ownership, she has a right to reside in the shared household under Section 17 of PWDVA 2005." },
      { title: "Maintenance Rights", desc: "Wife has multiple maintenance avenues — Section 144 BNSS (magistrate court), Section 24/25 HMA (family court), Section 20 PWDVA. All three can run simultaneously but amount is coordinated." },
      { title: "Divorce on Cruelty", desc: "Mental or physical cruelty — including verbal abuse, neglect, social isolation, financial control — is a full ground for divorce under Section 13(1)(ia) HMA. Courts have a broad, subjective test for cruelty." },
      { title: "Child Custody Preference", desc: "Children below 5 years are ordinarily in the custody of the mother (Section 6, Guardians & Wards Act 1890). This is a presumption, rebuttable only by clear evidence of the mother's unfitness." },
      { title: "Protection from DV", desc: "Any act of domestic violence — physical, emotional, sexual, economic — entitles the woman to apply to a Magistrate for protection orders, residence orders, monetary relief and custody orders within days." },
      { title: "Legal Aid Entitlement", desc: "Any woman is entitled to free legal aid regardless of income, under the Legal Services Authorities Act 1987 and various State Legal Services rules." },
      { title: "Anti-Dowry Rights", desc: "Demanding, giving or abetting the giving of dowry is punishable under the Dowry Prohibition Act 1961 (up to 5 years + fine). Section 85 BNS criminalises harassment for dowry." },
    ]
  },
  {
    category: "Husband / Man",
    icon: Briefcase,
    color: "blue",
    rights: [
      { title: "Right to Contest False Cases", desc: "A man accused of false 498A/DV can apply for anticipatory bail under Section 482 BNSS, file a quashing petition in HC under Section 528 BNSS, and simultaneously file a civil suit for malicious prosecution or defamation." },
      { title: "Divorce on Desertion", desc: "If the wife has deserted the husband without reasonable cause or his consent for 2+ continuous years, this constitutes a ground for divorce under Section 13(1)(ib) HMA." },
      { title: "Custody Rights", desc: "Fathers have equal rights to custody. Courts decide custody based on the 'best interests of the child' doctrine — not on the sex of the parent. Active, caring fathers are routinely given shared or primary custody." },
      { title: "Seek Reduction of Maintenance", desc: "If the maintenance amount ordered is excessive or the wife has started earning, the husband can apply to the court for variation under Section 147 BNSS or Section 25(2) HMA." },
      { title: "Restitution of Conjugal Rights", desc: "If the wife has withdrawn from society without reasonable excuse, the husband (or wife) can file a petition for Restitution of Conjugal Rights under Section 9 HMA. Non-compliance becomes a divorce ground after 1 year." },
      { title: "Protection from False DV", desc: "Filing a false DV application is punishable under Section 23 PWDVA. The accused can also file a private complaint for filing a false affidavit (perjury) or for frivolous litigation." },
      { title: "NRI Rights", desc: "Indian men residing abroad have the right to contest divorce/maintenance petitions filed in India. Courts cannot proceed ex-parte without proper service of summons; NRI can appear through counsel." },
      { title: "Property Protection", desc: "Self-acquired property of the husband belongs solely to him. It cannot be claimed by the wife on divorce unless she proves contribution. HMA Sec 27 covers only jointly acquired property." },
    ]
  },
  {
    category: "Children",
    icon: Baby,
    color: "amber",
    rights: [
      { title: "Best Interests Doctrine", desc: "Indian courts follow the 'welfare of the child' as the paramount consideration in all custody and guardianship matters (Sec 17, Guardians & Wards Act 1890). No statutory right of either parent overrides this." },
      { title: "Right to Maintenance", desc: "Both parents are obligated to maintain their minor children. Under BNSS Sec 144, a father must maintain children (including illegitimate children) who are minor. Mother's obligation arises if father is unable." },
      { title: "Right to Be Heard", desc: "Children above approximately 9–12 years are given an opportunity to express their wishes in custody proceedings. Courts may appoint an amicus curiae or child welfare officer to represent the child." },
      { title: "Visitation Rights", desc: "The non-custodial parent has a legal right to regular, meaningful access to the child. Courts enforce visitation orders through contempt proceedings if the custodial parent obstructs access." },
      { title: "Education Rights", desc: "Courts routinely pass orders ensuring that the child's education is not disrupted during divorce proceedings. School fees are included in maintenance calculations." },
      { title: "Inheritance Rights", desc: "Legitimate children inherit from both parents under the Hindu Succession Act 1956 (as amended 2005). Illegitimate children inherit only from the mother and her family." },
      { title: "Right Against Abduction", desc: "Removal of a child from India by one parent without court permission is punishable under the Hague Convention principles and Indian criminal law. Courts issue 'Hold' orders preventing departure." },
      { title: "Right in Adoption", desc: "Under HAMA 1956, a child above 9 years must give consent to adoption. Under JJ Act 2015 (secular adoption), a child's welfare is assessed holistically including their wishes." },
    ]
  },
  {
    category: "NRI / Overseas Indians",
    icon: Globe,
    color: "teal",
    rights: [
      { title: "Jurisdiction Rules", desc: "Indian courts have jurisdiction over NRI matrimonial disputes if the marriage was solemnized in India, parties last resided in India, or the wife currently resides in India. Foreign divorces may not be recognised." },
      { title: "Challenging Foreign Decrees", desc: "A foreign divorce decree obtained ex-parte (without the other party appearing) is not recognised in India under Section 13 CPC. The aggrieved party can sue afresh in Indian courts." },
      { title: "NRI Maintenance Orders", desc: "Indian courts can pass maintenance orders enforceable against NRI spouses. Diplomatic channels and bilateral treaties assist in enforcement. Courts increasingly use contempt and Interpol notices for wilful defaulters." },
      { title: "Child Custody Across Borders", desc: "India is not a signatory to the Hague Convention on Child Abduction, but the Supreme Court has developed principles of comity, mirror orders, and habeas corpus to deal with cross-border custody disputes." },
    ]
  },
];

const COURT_SYSTEM = [
  { level: "Supreme Court of India", desc: "Final appellate authority. Issues special leave petitions (SLP) against HC orders. Can exercise Article 142 powers to dissolve a marriage directly and grant ancillary reliefs.", icon: Landmark },
  { level: "High Courts", desc: "First appeals from Family Courts. Can quash FIR/charge-sheets under Section 528 BNSS. Issue writs of habeas corpus for child custody. 24 High Courts across India.", icon: Building2 },
  { level: "Family Courts", desc: "Established under Family Courts Act 1984. Handle divorce, custody, maintenance, DV civil reliefs, matrimonial property. Separate courts in all metro cities and most district HQs. Delhi: Saket, Rohini, Karkardooma, Dwarka, Tis Hazari.", icon: Scale },
  { level: "Magistrate Courts (JMFC)", desc: "Handle BNSS Sec 144 maintenance, DV criminal orders, 498A trials, Dowry Prohibition Act cases. Every district has multiple Judicial Magistrate First Class courts.", icon: Gavel },
  { level: "District Courts", desc: "Handle civil suits for matrimonial property, injunctions, succession. District Judge also handles family court appeals in some states.", icon: Building2 },
  { level: "Lok Adalats / DSLSA", desc: "Delhi State Legal Services Authority runs Lok Adalats and mediation centres. Settlements at Lok Adalat are final and non-appealable decrees. Free for all parties.", icon: Handshake },
];

const PROCESS_STEPS = [
  { step: 1, title: "Initial Consultation", icon: MessageSquare, desc: "Discuss facts, grounds, evidence, and jurisdiction with a family law advocate. Assess eligibility for mutual vs contested proceedings. Review documents: marriage certificate, address proof, income records, correspondence, photographs.", tip: "Preserve ALL electronic evidence — WhatsApp messages, emails, call records. These are admissible under Section 63 of the BSA (Bharatiya Sakshya Adhiniyam) 2023 with a certificate." },
  { step: 2, title: "Document Preparation", icon: FileText, desc: "Lawyer drafts the petition/application with supporting affidavits. Financial disclosure affidavit (as per Rajnesh SC guidelines) is mandatory in maintenance matters. Vakalatnama (power of attorney to lawyer) is executed.", tip: "Full and honest financial disclosure is mandatory after Rajnesh (2020). Concealment of income/assets can result in adverse inferences and contempt proceedings." },
  { step: 3, title: "Filing the Case", icon: PenLine, desc: "Petition filed at the appropriate Family Court/Magistrate Court. Court fees paid (typically ₹200–₹1,000). Case number assigned. Date for first hearing given (typically 4–8 weeks). Interim orders for maintenance/custody can be sought on the first date.", tip: "File jurisdiction correctly: courts where marriage was solemnised, where parties last resided together, or where the respondent currently resides." },
  { step: 4, title: "Service of Summons", icon: Mail, desc: "Court issues summons to the opposite party. Served via court bailiff or Speed Post with Acknowledgement Due. For NRIs: through Embassy/High Commission or courier per court order. If respondent evades: substituted service via newspaper publication.", tip: "If the opposite party is residing abroad, a specific application for service through Ministry of External Affairs or email (as allowed by High Courts) must be filed." },
  { step: 5, title: "Mediation & Counselling", icon: HeartHandshake, desc: "Family Courts mandate attempt at reconciliation under Section 9, Family Courts Act 1984. DSLSA-run mediation centres handle most Delhi cases for FREE. Private mediation also available. Statements in mediation are confidential.", tip: "Even if reconciliation fails, mediation often results in consent terms for maintenance, custody, and property — saving years of litigation. Give it a genuine chance." },
  { step: 6, title: "Pleadings & Evidence", icon: BookOpen, desc: "Respondent files Written Statement (within 30 days, extendable). Both parties file Affidavit of Evidence (chief examination on affidavit). Cross-examination of witnesses in court. Documentary evidence exhibited. Expert witnesses (doctors, forensic experts, valuers) can be examined.", tip: "CCTV footage, call detail records (obtained via police complaint), medical records, school records, and bank statements are powerful corroborative evidence." },
  { step: 7, title: "Arguments", icon: ScrollText, desc: "Both counsel advance oral arguments. Written synopses/arguments may be submitted. Judgment reserved. Judgment typically delivered within 30–90 days of completion of arguments.", tip: "Written arguments with case law citations significantly help the judge draft a well-reasoned order — insist on filing these with your advocate." },
  { step: 8, title: "Decree & Post-Decree", icon: Award, desc: "Court pronounces decree/order. Certified copy obtained (7–10 days). Appeal period: 30 days for Family Court orders, 90 days for HC orders. Divorce becomes absolute after appeal period or final disposal of appeal. Execution proceedings for enforcement of maintenance/custody orders.", tip: "Maintenance decrees can be enforced by attachment of salary, bank accounts, and property if the paying party defaults. File an execution application promptly." },
];

const LANDMARK_CASES = [
  { case: "Shilpa Sailesh v. Varun Sreenivasan", year: "2023", court: "SC Constitution Bench", principle: "Supreme Court can dissolve marriage directly under Article 142 on ground of irretrievable breakdown. 6-month cooling period under Sec 13B(2) HMA can be waived. Compensation for the weaker spouse can be awarded simultaneously.", impact: "Transformative" },
  { case: "Rajnesh v. Neha & Anr.", year: "2020", court: "Supreme Court", principle: "Standardised maintenance procedure: mandatory disclosure of assets/liabilities, no parallel maintenance proceedings, one consolidated order. Criteria for quantum: status of parties, needs of claimant, earning capacity, reasonable expenses of child.", impact: "Landmark" },
  { case: "Arnesh Kumar v. State of Bihar", year: "2014", court: "Supreme Court", principle: "Police cannot automatically arrest in 498A cases. Magistrate must apply mind before ordering detention. Section 41A CrPC notice to accused mandatory. Violation of guidelines means contempt of Supreme Court.", impact: "Landmark" },
  { case: "Satish Sitole v. Ganga", year: "2008", court: "Supreme Court", principle: "Irretrievable breakdown of marriage is a valid ground for divorce in the exercise of Article 142, even if not a statutory ground. SC may dissolve marriages where parties have lived separately for many years.", impact: "Seminal" },
  { case: "Rupali Devi v. State of UP", year: "2019", court: "Supreme Court", principle: "Wife who is forced to leave matrimonial home due to cruelty can file 498A complaint at the place where she eventually resides with her parents. Both courts have jurisdiction.", impact: "Important" },
  { case: "Vineeta Sharma v. Rakesh Sharma", year: "2020", court: "SC Constitution Bench", principle: "Hindu daughters have equal coparcenary rights as sons, with right to ancestral property by birth. Amendment to Hindu Succession Act 2005 applies retrospectively. Father need not be alive at the time of amendment.", impact: "Landmark" },
  { case: "Githa Hariharan v. RBI", year: "1999", court: "Supreme Court", principle: "Mother can be the natural guardian of a minor child, not just the father. Section 6 of HMA read down to give mother primary guardianship rights in appropriate circumstances.", impact: "Historic" },
  { case: "Savitaben Somabhai Bhatiya v. State of Gujarat", year: "2005", court: "Supreme Court", principle: "Only legally wedded wife can claim maintenance under Section 125 CrPC. However, a woman in a long-standing 'domestic relationship' (live-in) may have rights under PWDVA 2005.", impact: "Important" },
  { case: "D Velusamy v. D Patchaiammal", year: "2010", court: "Supreme Court", principle: "Live-in relationships akin to marriage entitled to protection under PWDVA 2005. Defined criteria for 'relationship in the nature of marriage' — must be publicly held out as spouses.", impact: "Landmark" },
  { case: "Independent Thought v. Union of India", year: "2017", court: "Supreme Court", principle: "Sexual intercourse with a wife between 15–18 years is rape under IPC Section 375. Exception 2 to Section 375 (marital rape exception) struck down for minor wives.", impact: "Constitutional" },
];

const TIMELINE_COSTS = [
  { type: "Mutual Consent Divorce", minTime: "6 months", maxTime: "18 months", minCost: "₹15,000", maxCost: "₹60,000", color: "green", note: "Fastest route. Cooling period waivable. Fees include advocate + court + misc." },
  { type: "Contested Divorce (Simple)", minTime: "2–3 years", maxTime: "5 years", minCost: "₹50,000", maxCost: "₹3,00,000", color: "yellow", note: "Single grounds, limited witnesses, property not in dispute." },
  { type: "Contested Divorce (Complex)", minTime: "5 years", maxTime: "10+ years", minCost: "₹1,00,000", maxCost: "₹10,00,000+", color: "red", note: "Multiple grounds, extensive cross-examination, property + child custody battles." },
  { type: "Maintenance (BNSS Sec 144)", minTime: "6 months", maxTime: "2 years", minCost: "₹10,000", maxCost: "₹80,000", color: "blue", note: "Interim maintenance typically in 60–90 days." },
  { type: "DV Protection Order", minTime: "3–7 days", maxTime: "30 days", minCost: "₹5,000", maxCost: "₹30,000", color: "green", note: "Ex-parte order possible within 3 days in extreme cases." },
  { type: "498A / BNS Sec 85 Trial", minTime: "3 years", maxTime: "8 years", minCost: "₹50,000", maxCost: "₹5,00,000+", color: "red", note: "Criminal case — outcome is acquittal/conviction; separate from civil reliefs." },
  { type: "Child Custody Dispute", minTime: "1 year", maxTime: "4 years", minCost: "₹40,000", maxCost: "₹4,00,000", color: "orange", note: "Interim custody typically in 1–3 hearings. Final custody trial longer." },
  { type: "High Court Appeal", minTime: "1 year", maxTime: "4 years", minCost: "₹40,000", maxCost: "₹3,00,000", color: "orange", note: "Against Family Court orders. HC also issues habeas corpus for child custody." },
];

const GLOSSARY = [
  { term: "Alimony / Maintenance", def: "Periodic or lump-sum financial support ordered by a court to be paid by one spouse to the other during or after divorce." },
  { term: "Annulment", def: "A legal declaration that a marriage was void or voidable from its inception — as if it never happened. Different from divorce, which ends a valid marriage." },
  { term: "Bailable Offence", def: "An offence where the accused has a right to bail. Contrasted with non-bailable offences where bail is discretionary." },
  { term: "Child Welfare Officer (CWO)", def: "An officer appointed by the court to investigate living conditions, relationships, and the child's wishes in custody disputes; submits a report to assist the judge." },
  { term: "Cognizable Offence", def: "An offence where police can arrest without a warrant. 498A, DV breach, and Dowry Death are all cognizable offences." },
  { term: "Condonation", def: "Forgiving a matrimonial offence (e.g., adultery) with knowledge of the offence and resuming cohabitation. Once condoned, that act cannot be used as a ground for divorce." },
  { term: "Coparcenary", def: "A joint ownership concept in Hindu law — male and female descendants of a common ancestor have equal birthright in ancestral property after the 2005 HSA amendment." },
  { term: "Cruelty (matrimonial)", def: "Any conduct that makes it impossible for a spouse to live in the matrimonial home. Covers physical violence as well as mental cruelty (nagging, false allegations, public humiliation, deprivation)." },
  { term: "Desertion", def: "Voluntarily abandoning a spouse for 2+ continuous years without reasonable cause or consent. Both the physical separation AND the animus deserendi (intention to desert) must be proved." },
  { term: "Domestic Relationship", def: "Any relationship where two persons live or have lived together in a shared household — covers wives, domestic partners, mothers, sisters, widows." },
  { term: "Ex-Parte Order", def: "An order passed in the absence of one party, typically in emergencies. Can be challenged within 30 days by the absent party." },
  { term: "Guardians & Wards Act, 1890", def: "Secular law governing guardianship of minors regardless of religion. 'Best interests of the child' is the paramount consideration." },
  { term: "Irretrievable Breakdown", def: "A modern divorce ground where the marriage has broken down to such an extent that no reasonable prospect of reconciliation exists. Not yet a statutory ground in India but increasingly exercised by the SC under Article 142." },
  { term: "Jurisdiction", def: "The authority of a court to hear and decide a case. In matrimonial matters: where marriage was solemnised, where parties last resided together, or where the respondent resides." },
  { term: "Lok Adalat", def: "Alternative dispute resolution forum under Legal Services Authorities Act 1987. Settlements are final decrees, non-appealable, fee-refunded. Highly effective for maintenance and matrimonial compromises." },
  { term: "Maintenance Pendente Lite", def: "Interim maintenance during the pendency of court proceedings — ordered quickly (within 60 days under BNSS) to ensure financial support while the case is going on." },
  { term: "Matrimonial Home", def: "The shared household where husband and wife live or have lived. The woman cannot be evicted from the matrimonial home under PWDVA 2005, regardless of ownership." },
  { term: "Mediation", def: "A confidential, voluntary dispute resolution process facilitated by a neutral third-party mediator. Increasingly mandatory in Indian family courts before trial begins." },
  { term: "Mirror Order", def: "An order passed by a foreign court that 'mirrors' an Indian court's custody/access arrangement — used in NRI/international custody cases to ensure enforcement in both jurisdictions." },
  { term: "Pendente Lite", def: "Latin for 'pending the suit'. Refers to interim orders (maintenance, custody, injunction) passed during the pendency of the main case." },
  { term: "Protection Officer", def: "Government-appointed officer under PWDVA 2005 who assists the aggrieved woman in filing applications, obtaining medical aid, legal aid and shelter." },
  { term: "Sapinda Relationship", def: "Prohibited degree of Hindu relationship based on shared line of descent — marriages within these degrees are void under Sec 11 HMA unless local custom permits." },
  { term: "Streedhan", def: "All property — movable and immovable — received by a woman as a gift before, during, or after marriage from her parents, in-laws, husband, or friends. Belongs absolutely to the woman." },
  { term: "Vakalatnama", def: "A document authorising a lawyer to appear and act on behalf of a client in court proceedings. Equivalent to Power of Attorney for court purposes." },
  { term: "Void Marriage", def: "A marriage that is invalid from the start and has no legal effect — e.g., bigamous marriage, marriage within prohibited degrees. No court decree is needed to declare it void, though courts can do so for certainty." },
  { term: "Voidable Marriage", def: "A marriage that is valid until one party obtains a court decree annulling it — e.g., marriage by fraud, force, or where one party was impotent at the time of marriage." },
];

const FAQS = [
  { q: "What is the difference between mutual consent divorce and contested divorce?", a: "In mutual consent divorce (Section 13B HMA), both spouses jointly petition the court, agree on all terms (maintenance, custody, property division), and there is a 6-month cooling-off period before the divorce is granted. In contested divorce (Section 13 HMA), one spouse files on a specific ground (cruelty, adultery, desertion, etc.), and the other party contests it — leading to a full trial with evidence and cross-examination." },
  { q: "Can a wife claim maintenance even before the divorce decree?", a: "Yes. Section 24 of the HMA allows any spouse (practically, mostly wives) to claim maintenance pendente lite — interim maintenance for themselves and litigation expenses — from the date of filing the petition. The court must decide this application within 60 days under BNSS Section 145." },
  { q: "Is Section 498A (Cruelty) a non-bailable offence?", a: "Yes, Section 498A IPC (now Section 85 BNS 2023) is a cognizable, non-bailable, and non-compoundable offence carrying up to 3 years' imprisonment and fine. However, the Supreme Court in Arnesh Kumar v. State of Bihar (2014) directed that police cannot automatically arrest — they must issue a Section 41A BNSS notice first and the Magistrate must apply mind before ordering arrest." },
  { q: "What is streedhan and can the husband use it?", a: "Streedhan is the exclusive property of the wife — all gifts, jewellery, cash, and valuables received before, during or after marriage. The husband may use it during financial distress but is obligated to return it on demand. Refusing to return streedhan is criminal breach of trust under Section 316 BNS (earlier Sec 406 IPC) and can result in imprisonment of up to 3 years." },
  { q: "Can a live-in partner claim maintenance or protection?", a: "Women in live-in relationships 'in the nature of marriage' are entitled to protection under PWDVA 2005 (as held in D Velusamy v. D Patchaiammal, 2010). However, they cannot claim maintenance under Section 144 BNSS (which is limited to legally married wives) unless children are involved. They may apply for monetary relief under Section 20 PWDVA." },
  { q: "Who gets custody of the child after divorce?", a: "The court grants custody based on the 'best interests and welfare of the child' as the paramount consideration — not as a matter of parental rights. Below age 5, there is a presumption in favour of the mother. Above that age, the court evaluates both parents' ability, stability, living conditions, the child's emotional bond, and (if old enough) the child's own preference. Joint custody, shared parenting, and defined visitation for the non-custodial parent are increasingly granted." },
  { q: "What documents are required to file a divorce petition in Delhi?", a: "Marriage certificate (if registered) or proof of marriage (photos, invitation card, witness affidavits), address proof of both parties, 4 passport-size photographs of the petitioner, any evidence relevant to the grounds (medical records, police complaints, bank statements, correspondence), income documents (salary slips, ITR) if maintenance is claimed, and birth certificates of children if custody is involved." },
  { q: "Can an NRI file for divorce in India?", a: "Yes. An NRI who got married in India, or whose spouse resides in India, can file for divorce in Indian courts through a lawyer holding their Power of Attorney. Conversely, if an NRI obtains an ex-parte foreign divorce (without the Indian spouse appearing), it is generally not recognised in India under Section 13 CPC." },
  { q: "What is the cooling-off period in mutual consent divorce and can it be waived?", a: "The 6-month cooling-off period under Section 13B(2) HMA is designed for reconciliation. The Supreme Court in Amardeep Singh (2017) held that this period is directory, not mandatory, and can be waived by the High Court or Supreme Court when the marriage is irretrievably broken. The 5-judge bench in Shilpa Sailesh (2023) confirmed this and extended the waiver power to all cases under Article 142." },
  { q: "Can I get an emergency protection order under the DV Act?", a: "Yes. Under Section 12 read with Section 23 of PWDVA 2005, a Magistrate can pass an ex-parte interim protection order (without hearing the respondent) if the case is urgent. Such an order can be obtained within 3–7 working days. Breach of a protection order is a non-bailable offence under Section 31 PWDVA." },
  { q: "Is court marriage different from marriage registration?", a: "Yes. Court marriage refers to marrying under the Special Marriage Act 1954, which requires 30-days advance notice at the SDM's office and a ceremony before the Marriage Officer. Marriage registration under the Hindu Marriage Act 1955 is the registration of a marriage already solemnised under Hindu customs — it does not involve any ceremony at the registrar's office." },
  { q: "What is the process and timeline for adoption in India?", a: "For Hindus: adoption under HAMA 1956 requires a deed of adoption, the consent of the biological parents, and compliance with age/gender rules. For all religions (secular adoption): under JJ Act 2015 through CARA (Central Adoption Resource Authority) — register on CARINGS portal, home study, matching with a child, pre-adoption fostering, and court order. The CARA process typically takes 1–3 years." },
];

const LEGAL_AID_INFO = [
  { org: "DSLSA — Delhi State Legal Services Authority", contact: "011-23384554", email: "dslsa.delhi@gmail.com", address: "Patiala House Courts, New Delhi — 110001", services: "Free legal aid, mediation, Lok Adalat, Para-legal volunteers, legal clinics at 11 district legal services authorities." },
  { org: "NALSA — National Legal Services Authority", contact: "011-23382778", email: "nalsa@nic.in", address: "12/11, Jam Nagar House, Shahjahan Road, New Delhi — 110011", services: "Policy, funding and coordination of State LSAs. Free legal aid, victim compensation, legal literacy." },
  { org: "Delhi High Court Legal Services Committee", contact: "011-23384367", email: "", address: "Delhi High Court Campus, Sher Shah Road, New Delhi", services: "Free representation before Delhi HC, mediation, legal clinics." },
];

const IMPORTANT_NUMBERS = [
  { label: "Women Helpline", num: "181", note: "24×7 — Delhi Police" },
  { label: "Police Emergency", num: "112", note: "National Emergency" },
  { label: "National Commission for Women", num: "7827170170", note: "Mon–Sat 9AM–5PM" },
  { label: "Childline India", num: "1098", note: "24×7 — for children in distress" },
  { label: "DCW — Delhi Commission for Women", num: "011-23379181", note: "Legal support, shelter, counselling" },
  { label: "DSLSA Legal Aid", num: "011-23384554", note: "Free legal aid eligibility" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="legitixy-fl-sec-label">
      <span className="legitixy-fl-sec-label-dot" />
      {children}
    </div>
  );
}

function TooltipBadge({ text, tooltip }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="legitixy-fl-tooltip-wrap"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="legitixy-fl-badge-pill">
        {text} <Info size={11} />
      </span>
      {show && <div className="legitixy-fl-tooltip-box">{tooltip}</div>}
    </span>
  );
}

function AccordionItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`legitixy-fl-faq-item${open ? ' legitixy-fl-faq-open' : ''}`}>
      <button
        className="legitixy-fl-faq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="legitixy-fl-faq-qnum">Q{index + 1}</span>
        <span className="legitixy-fl-faq-qtext">{q}</span>
        <ChevronDown className="legitixy-fl-faq-chevron" size={17} />
      </button>
      <div className="legitixy-fl-faq-body" aria-hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  );
}

function ImageSlot({ label, hint, aspect = '4/3', icon: Icon = Eye, src, alt }) {
  return (
    <div className="legitixy-fl-img-slot" style={{ aspectRatio: aspect }}>
      <div className="legitixy-fl-img-slot-inner">
        {src ? (
          <img src={src} alt={alt || label} className="legitixy-fl-img-slot-img" />
        ) : (
          <>
            <Icon size={28} className="legitixy-fl-img-slot-icon" />
            <span className="legitixy-fl-img-slot-label">{label}</span>
            {hint && <span className="legitixy-fl-img-slot-hint">{hint}</span>}
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const FamilyLaws = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeNav, setActiveNav] = useState('intro');
  const [actTab, setActTab] = useState(0);
  const [glossarySearch, setGlossarySearch] = useState('');
  const observerRef = useRef(null);

  // Scroll-spy
  useEffect(() => {
    const sections = NAV_SECTIONS.map(n => document.getElementById(`legitixy-fl-${n.id}`)).filter(Boolean);
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.dataset.navId); });
    }, { threshold: 0.25 });
    sections.forEach(s => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(`legitixy-fl-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredGlossary = GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className={`legitixy-fl-root${isDarkMode ? ' dark' : ' light'}`}>

      {/* ── Background ambiance ── */}
      <div className="legitixy-fl-ambiance" aria-hidden="true">
        <div className="legitixy-fl-orb legitixy-fl-orb-a" />
        <div className="legitixy-fl-orb legitixy-fl-orb-b" />
        <div className="legitixy-fl-orb legitixy-fl-orb-c" />
        <div className="legitixy-fl-grid-pattern" />
      </div>

      {/* ── Sticky Nav ── */}
      <nav className="legitixy-fl-sticky-nav" aria-label="Page sections">
        <div className="legitixy-fl-sticky-nav-inner">
          <div className="legitixy-fl-nav-brand">
            <Scale size={15} />
            <span>Family Law — India</span>
          </div>
          <div className="legitixy-fl-nav-scroll">
            {NAV_SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`legitixy-fl-nav-btn${activeNav === id ? ' active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                <Icon size={12} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <header className="legitixy-fl-hero" id="legitixy-fl-intro" data-nav-id="intro">
        <div className="legitixy-fl-hero-content">
          <div className="legitixy-fl-hero-eyebrow">
            <Sparkles size={13} />
            <span>Comprehensive Legal Guide — Authenticated & Updated 2024</span>
          </div>

          <h1 className="legitixy-fl-hero-title">
            <span className="legitixy-fl-hero-title-top">Indian</span>
            <span className="legitixy-fl-hero-title-main">Family Laws</span>
            <span className="legitixy-fl-hero-title-sub">Rights, Remedies & Legal Recourse</span>
          </h1>

          <p className="legitixy-fl-hero-para">
            A definitive, court-verified guide covering divorce, maintenance, custody, domestic violence, adoption, marriage registration, and all major areas of family law in India. Whether you're a litigant, a law student, or a practising advocate — this is your comprehensive resource.
          </p>

          <div className="legitixy-fl-hero-pills">
            <TooltipBadge text="HMA 1955" tooltip="Hindu Marriage Act 1955 — governs marriage, divorce, maintenance and custody for Hindus, Buddhists, Jains and Sikhs." />
            <TooltipBadge text="SMA 1954" tooltip="Special Marriage Act 1954 — civil marriage law applicable to all Indians regardless of religion; also governs inter-faith marriages." />
            <TooltipBadge text="PWDVA 2005" tooltip="Protection of Women from Domestic Violence Act 2005 — provides civil remedies: protection orders, residence orders, monetary relief, custody orders." />
            <TooltipBadge text="BNSS 2023" tooltip="Bharatiya Nagarik Suraksha Sanhita 2023 — replaces CrPC. Section 144 is the new maintenance provision (earlier CrPC Section 125)." />
            <TooltipBadge text="BSA 2023" tooltip="Bharatiya Sakshya Adhiniyam 2023 — replaces Indian Evidence Act. Section 63 governs admissibility of electronic records including WhatsApp, email, CCTV." />
          </div>

          <div className="legitixy-fl-hero-stats">
            {[
              { val: "6+", lbl: "Major Statutes" },
              { val: "50+", lbl: "Sections Covered" },
              { val: "10+", lbl: "Landmark Judgements" },
              { val: "19", lbl: "Topic Guides" },
            ].map(s => (
              <div className="legitixy-fl-stat" key={s.lbl}>
                <span className="legitixy-fl-stat-val">{s.val}</span>
                <span className="legitixy-fl-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>

          <div className="legitixy-fl-hero-ctas">
            <button className="legitixy-fl-btn-primary" onClick={() => scrollTo('consult')}>
              <Phone size={15} /> Free Consultation
            </button>
            <button className="legitixy-fl-btn-ghost" onClick={() => scrollTo('topics')}>
              <Layers size={15} /> Browse Topics
            </button>
          </div>
        </div>

        <div className="legitixy-fl-hero-visual">
          <ImageSlot label="Hero — Family Law / Justice" hint="800×700px or any — auto-fit" aspect="3/4" icon={Scale}  src={familly1}  alt="Family Law Hero Visual" />
          <div className="legitixy-fl-hero-float-a">
            <CheckCircle size={13} />
            <span>Court-Verified Content</span>
          </div>
          <div className="legitixy-fl-hero-float-b">
            <Star size={13} />
            <span>2024 Updated</span>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          IMAGE GALLERY STRIP
      ══════════════════════════════════════════════════ */}
      <section className="legitixy-fl-gallery-strip" aria-label="Photo gallery">
        <div className="legitixy-fl-container">
          <div className="legitixy-fl-gallery-grid">
            {[
              { label: "Delhi Family Court", hint: "Building exterior/interior", icon: Building2 },
              { label: "Legal Documents", hint: "Petition / Decree / Affidavit", icon: FileText },
              { label: "Lawyer Consultation", hint: "Advocate with client", icon: Users },
              { label: "Mediation Session", hint: "Conference room / DSLSA", icon: Handshake },
              { label: "Court Proceedings", hint: "Courtroom / hearing", icon: Gavel },
            ].map(({ label, hint, icon: Icon }) => (
              <div className="legitixy-fl-gallery-slot" key={label}>
                <ImageSlot label={label} hint={hint} aspect="4/3" icon={Icon} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INTRODUCTION / OVERVIEW
      ══════════════════════════════════════════════════ */}
      <section className="legitixy-fl-section" id="legitixy-fl-intro-body" data-nav-id="intro" aria-labelledby="legitixy-fl-intro-heading">
        <div className="legitixy-fl-container">
          <SectionLabel>Overview</SectionLabel>
          <h2 id="legitixy-fl-intro-heading" className="legitixy-fl-section-title">
            Understanding Family Law in India
          </h2>
          <p className="legitixy-fl-section-sub">A multi-religious, multi-layered legal framework</p>

          <div className="legitixy-fl-two-col-wide">
            <div className="legitixy-fl-prose-block">
              <p className="legitixy-fl-lead">
                India's family law system is uniquely pluralistic — different communities are governed by their own personal laws rooted in religion and custom, alongside secular civil laws that apply to all citizens irrespective of faith.
              </p>
              <p className="legitixy-fl-body">
                The <strong>Hindu Marriage Act, 1955</strong> governs Hindus (including Buddhists, Jains and Sikhs) and is the most widely applicable statute. The <strong>Special Marriage Act, 1954</strong> enables civil marriages for any two persons regardless of religion and is the go-to law for inter-faith couples. <strong>Muslim Personal Law (Shariat) Application Act, 1937</strong> governs Muslims, while the <strong>Indian Divorce Act, 1869</strong> (now significantly amended) governs Christians. Parsis are covered by the <strong>Parsi Marriage and Divorce Act, 1936</strong>.
              </p>
              <p className="legitixy-fl-body">
                Overarching all personal laws are several secular statutes: the <strong>Protection of Women from Domestic Violence Act, 2005</strong> (applies to all women regardless of religion), the <strong>Dowry Prohibition Act, 1961</strong>, the <strong>Hindu Adoption and Maintenance Act, 1956</strong>, the <strong>Guardians and Wards Act, 1890</strong>, and the <strong>Juvenile Justice (Care and Protection of Children) Act, 2015</strong> which governs secular adoption.
              </p>
              <p className="legitixy-fl-body">
                The Supreme Court plays a vital constitutional role — exercising its extraordinary jurisdiction under <strong>Article 142 of the Constitution</strong> to do complete justice in matrimonial matters, including dissolving marriages on the ground of irretrievable breakdown even when the statute does not provide this ground. The landmark 2023 five-judge bench decision in <em>Shilpa Sailesh</em> confirmed and expanded this power.
              </p>
              <p className="legitixy-fl-body">
                India also saw major criminal law reform in 2023. The <strong>Bharatiya Nyaya Sanhita (BNS) 2023</strong> replaced the Indian Penal Code, the <strong>Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023</strong> replaced CrPC, and the <strong>Bharatiya Sakshya Adhiniyam (BSA) 2023</strong> replaced the Evidence Act — all effective from July 1, 2024. Key family law provisions: IPC Sec 498A → BNS Sec 85; CrPC Sec 125 → BNSS Sec 144; IPC Sec 406 (streedhan) → BNS Sec 316.
              </p>
            </div>

            <div className="legitixy-fl-aside-stack">
              <ImageSlot label="Overview — Indian Justice System" hint="Any size — fits perfectly" aspect="3/4" icon={Landmark} />
              <div className="legitixy-fl-quick-act-list">
                <h3 className="legitixy-fl-aside-title"><BookMarked size={15} /> Applicable Laws at a Glance</h3>
                {[
                  ["Hindus / Buddhists / Jains / Sikhs", "HMA 1955, HAMA 1956, HSA 1956"],
                  ["Civil / Inter-faith", "Special Marriage Act 1954"],
                  ["Muslims", "Muslim Personal Law (Shariat) Act 1937"],
                  ["Christians", "Indian Divorce Act 1869 (amended)"],
                  ["Parsis", "Parsi Marriage & Divorce Act 1936"],
                  ["All women (DV)", "PWDVA 2005"],
                  ["Maintenance (all)", "BNSS Sec 144 (earlier CrPC 125)"],
                  ["Cruelty (all)", "BNS Sec 85 (earlier IPC 498A)"],
                  ["Adoption (all, secular)", "JJ Act 2015 via CARA"],
                  ["Dowry (all)", "Dowry Prohibition Act 1961"],
                ].map(([who, law]) => (
                  <div className="legitixy-fl-act-row" key={who}>
                    <span className="legitixy-fl-act-row-who">{who}</span>
                    <span className="legitixy-fl-act-row-law">{law}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          KEY LAWS — TABBED
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section legitixy-fl-section-alt"
        id="legitixy-fl-laws"
        data-nav-id="laws"
        aria-labelledby="legitixy-fl-laws-heading"
      >
        <div className="legitixy-fl-container">
          <SectionLabel>Statutes & Sections</SectionLabel>
          <h2 id="legitixy-fl-laws-heading" className="legitixy-fl-section-title">Key Acts & Provisions</h2>
          <p className="legitixy-fl-section-sub">Detailed sections, their scope, and what they mean for you</p>

          {/* Tab bar */}
          <div className="legitixy-fl-tabs" role="tablist" aria-label="Acts">
            {KEY_ACTS.map((act, i) => (
              <button
                key={act.short}
                className={`legitixy-fl-tab legitixy-fl-tab-${act.color}${actTab === i ? ' legitixy-fl-tab-active' : ''}`}
                role="tab"
                aria-selected={actTab === i}
                onClick={() => setActTab(i)}
              >
                <span className="legitixy-fl-tab-short">{act.short}</span>
                <span className="legitixy-fl-tab-name">{act.name}</span>
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div className="legitixy-fl-tab-panel" role="tabpanel">
            <div className="legitixy-fl-act-meta">
              <Scale size={18} />
              <div>
                <h3 className="legitixy-fl-act-panel-title">{KEY_ACTS[actTab].name}</h3>
                <p className="legitixy-fl-act-panel-scope"><strong>Applicable to:</strong> {KEY_ACTS[actTab].scope}</p>
              </div>
            </div>
            <div className="legitixy-fl-act-sections-grid">
              {KEY_ACTS[actTab].keySections.map(sec => (
                <div className="legitixy-fl-act-sec-card" key={sec.sec}>
                  <span className="legitixy-fl-act-sec-num">{sec.sec}</span>
                  <span className="legitixy-fl-act-sec-desc">{sec.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wide image for legal framework */}
          <div className="legitixy-fl-banner-img-wrap">
            <ImageSlot label="Legal Framework / Law Books / Statute Image" hint="Wide banner — any width × 200–400px height" aspect="21/5" icon={BookOpen} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TOPIC LINKS GRID
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section"
        id="legitixy-fl-topics"
        data-nav-id="topics"
        aria-labelledby="legitixy-fl-topics-heading"
      >
        <div className="legitixy-fl-container">
          <SectionLabel>All Topics</SectionLabel>
          <h2 id="legitixy-fl-topics-heading" className="legitixy-fl-section-title">
            Family Law — Complete Topic Guide
          </h2>
          <p className="legitixy-fl-section-sub">
            Select a topic for a dedicated, in-depth legal guide with sections, process, rights, FAQs and more
          </p>
          <div className="legitixy-fl-topics-grid">
            {SUBTOPIC_LINKS.map(({ label, path, icon: Icon }) => (
              <Link to={path} className="legitixy-fl-topic-card" key={label}>
                <div className="legitixy-fl-topic-icon"><Icon size={20} /></div>
                <span className="legitixy-fl-topic-label">{label}</span>
                <ArrowRight size={14} className="legitixy-fl-topic-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          RIGHTS
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section legitixy-fl-section-alt"
        id="legitixy-fl-rights"
        data-nav-id="rights"
        aria-labelledby="legitixy-fl-rights-heading"
      >
        <div className="legitixy-fl-container">
          <SectionLabel>Legal Rights</SectionLabel>
          <h2 id="legitixy-fl-rights-heading" className="legitixy-fl-section-title">
            Know Your Rights
          </h2>
          <p className="legitixy-fl-section-sub">Detailed breakdown of rights by category — Wife, Husband, Children, and NRIs</p>

          {/* Rights banner image */}
          <div className="legitixy-fl-banner-img-wrap">
            <ImageSlot label="Rights & Empowerment Banner" hint="1400×350px — any aspect works" aspect="16/4" icon={Shield} />
          </div>

          <div className="legitixy-fl-rights-wrap">
            {RIGHTS_DATA.map(({ category, icon: Icon, color, rights }) => (
              <div className={`legitixy-fl-rights-block legitixy-fl-rights-${color}`} key={category}>
                <div className="legitixy-fl-rights-header">
                  <div className="legitixy-fl-rights-header-icon"><Icon size={20} /></div>
                  <h3 className="legitixy-fl-rights-category">{category}</h3>
                </div>
                <div className="legitixy-fl-rights-cards">
                  {rights.map(({ title, desc }) => (
                    <div className="legitixy-fl-right-item" key={title}>
                      <div className="legitixy-fl-right-item-top">
                        <CheckCircle size={14} className="legitixy-fl-right-check" />
                        <strong className="legitixy-fl-right-title">{title}</strong>
                      </div>
                      <p className="legitixy-fl-right-desc">{desc}</p>
                    </div>
                  ))}
                </div>
                {/* Per-category image slot */}
                <div className="legitixy-fl-rights-img-slot">
                  <ImageSlot label={`${category} — Rights Image`} hint="Any size — auto-fit" aspect="16/5" icon={Icon} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COURTS
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section"
        id="legitixy-fl-courts"
        data-nav-id="courts"
        aria-labelledby="legitixy-fl-courts-heading"
      >
        <div className="legitixy-fl-container">
          <SectionLabel>Judicial Hierarchy</SectionLabel>
          <h2 id="legitixy-fl-courts-heading" className="legitixy-fl-section-title">
            Court System for Family Matters
          </h2>
          <p className="legitixy-fl-section-sub">Which court handles what — and how to navigate the hierarchy</p>

          <div className="legitixy-fl-courts-grid">
            {COURT_SYSTEM.map(({ level, desc, icon: Icon }, i) => (
              <div className="legitixy-fl-court-card" key={level} style={{ '--court-idx': i }}>
                <div className="legitixy-fl-court-rank">L{COURT_SYSTEM.length - i}</div>
                <div className="legitixy-fl-court-icon"><Icon size={22} /></div>
                <h3 className="legitixy-fl-court-level">{level}</h3>
                <p className="legitixy-fl-court-desc">{desc}</p>
              </div>
            ))}
          </div>

          <div className="legitixy-fl-two-col-equal" style={{ marginTop: '3rem' }}>
            <div>
              <h3 className="legitixy-fl-sub-heading"><MapPin size={16} /> Delhi Family Courts — Locations</h3>
              <div className="legitixy-fl-location-list">
                {[
                  { court: "Principal Family Court", location: "Dwarka (Sector 10), South-West Delhi", handles: "All family matters — principal jurisdiction" },
                  { court: "Karkardooma Family Court", location: "Karkardooma, East Delhi", handles: "East and North-East Delhi matters" },
                  { court: "Saket Family Court", location: "Saket District Centre, South Delhi", handles: "South Delhi, South-West Delhi" },
                  { court: "Tis Hazari Family Court", location: "Tis Hazari, North Delhi", handles: "North, North-West Delhi matters" },
                  { court: "Rohini Family Court", location: "Rohini, North-West Delhi", handles: "North-West and West Delhi matters" },
                ].map(loc => (
                  <div className="legitixy-fl-location-row" key={loc.court}>
                    <div className="legitixy-fl-location-court">{loc.court}</div>
                    <div className="legitixy-fl-location-addr"><MapPin size={12} /> {loc.location}</div>
                    <div className="legitixy-fl-location-handles">{loc.handles}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <ImageSlot label="Delhi Courts Map / Building" hint="Any size — auto-contained" aspect="4/3" icon={Building2} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section legitixy-fl-section-alt"
        id="legitixy-fl-process"
        data-nav-id="process"
        aria-labelledby="legitixy-fl-process-heading"
      >
        <div className="legitixy-fl-container">
          <SectionLabel>Step-by-Step</SectionLabel>
          <h2 id="legitixy-fl-process-heading" className="legitixy-fl-section-title">
            The Legal Process — From Filing to Decree
          </h2>
          <p className="legitixy-fl-section-sub">What happens at every stage of a matrimonial case in Indian courts</p>

          <div className="legitixy-fl-process-list">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <article className="legitixy-fl-process-step" key={step.step} style={{ '--si': idx }}>
                  <div className="legitixy-fl-process-left">
                    <div className="legitixy-fl-process-bubble">
                      <Icon size={18} />
                    </div>
                    <div className="legitixy-fl-process-connector" aria-hidden="true" />
                  </div>
                  <div className="legitixy-fl-process-body">
                    <div className="legitixy-fl-process-step-num">Step {step.step}</div>
                    <h3 className="legitixy-fl-process-title">{step.title}</h3>
                    <p className="legitixy-fl-process-desc">{step.desc}</p>
                    <div className="legitixy-fl-process-tip">
                      <Info size={13} />
                      <span><strong>Pro Tip:</strong> {step.tip}</span>
                    </div>
                    <ImageSlot label={`Step ${step.step} — ${step.title}`} hint="Any dimension — auto-contained" aspect="16/5" icon={Icon} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          LANDMARK JUDGEMENTS
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section"
        id="legitixy-fl-judgements"
        data-nav-id="judgements"
        aria-labelledby="legitixy-fl-judgements-heading"
      >
        <div className="legitixy-fl-container">
          <SectionLabel>Case Law</SectionLabel>
          <h2 id="legitixy-fl-judgements-heading" className="legitixy-fl-section-title">
            Landmark Judgements & Precedents
          </h2>
          <p className="legitixy-fl-section-sub">
            Supreme Court and High Court decisions that shaped Indian family law
          </p>

          <div className="legitixy-fl-judgements-grid">
            {LANDMARK_CASES.map(lc => (
              <article className="legitixy-fl-judgement-card" key={lc.case}>
                <div className="legitixy-fl-judgement-top">
                  <span className="legitixy-fl-judgement-court">{lc.court}</span>
                  <span className={`legitixy-fl-judgement-impact legitixy-fl-impact-${lc.impact.toLowerCase()}`}>{lc.impact}</span>
                </div>
                <h3 className="legitixy-fl-judgement-case">{lc.case} ({lc.year})</h3>
                <p className="legitixy-fl-judgement-principle">{lc.principle}</p>
              </article>
            ))}
          </div>

          <div className="legitixy-fl-banner-img-wrap" style={{ marginTop: '2.5rem' }}>
            <ImageSlot label="Supreme Court of India / Justice Image" hint="Wide format — 1200×300px+" aspect="21/5" icon={Landmark} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TIMELINE & COSTS
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section legitixy-fl-section-alt"
        id="legitixy-fl-timeline"
        data-nav-id="timeline"
        aria-labelledby="legitixy-fl-timeline-heading"
      >
        <div className="legitixy-fl-container">
          <SectionLabel>Duration & Costs</SectionLabel>
          <h2 id="legitixy-fl-timeline-heading" className="legitixy-fl-section-title">
            Realistic Timeline & Cost Estimates
          </h2>
          <p className="legitixy-fl-section-sub">
            Delhi court data — indicative ranges; every case is different
          </p>

          <div className="legitixy-fl-timeline-table">
            <div className="legitixy-fl-tl-header">
              <span>Type of Proceeding</span>
              <span>Min Duration</span>
              <span>Max Duration</span>
              <span>Approx. Cost (Lawyer + Court)</span>
              <span>Note</span>
            </div>
            {TIMELINE_COSTS.map(row => (
              <div className="legitixy-fl-tl-row" key={row.type}>
                <span className="legitixy-fl-tl-type">
                  <span className={`legitixy-fl-tl-dot legitixy-fl-dot-${row.color}`} />
                  {row.type}
                </span>
                <span className="legitixy-fl-tl-min">{row.minTime}</span>
                <span className="legitixy-fl-tl-max">{row.maxTime}</span>
                <span className="legitixy-fl-tl-cost">
                  <span className="legitixy-fl-cost-range">{row.minCost} – {row.maxCost}</span>
                </span>
                <span className="legitixy-fl-tl-note">{row.note}</span>
              </div>
            ))}
          </div>

          <div className="legitixy-fl-alert legitixy-fl-alert-info" style={{ marginTop: '1.5rem' }}>
            <Info size={16} />
            <div>
              <strong>Free Legal Aid:</strong> Any person below the poverty line, women, children, SC/ST, persons with disability, victims of trafficking, or those in custody are entitled to FREE legal services including court representation, under the Legal Services Authorities Act, 1987. Contact DSLSA: <a href="tel:01123384554">011-23384554</a>
            </div>
          </div>

          <div className="legitixy-fl-two-col-equal" style={{ marginTop: '2.5rem' }}>
            <ImageSlot label="Delhi Court Building / Legal Aid Centre" hint="Any size — auto-fit" aspect="4/3" icon={Building2} />
            <div className="legitixy-fl-legal-aid-cards">
              {LEGAL_AID_INFO.map(org => (
                <div className="legitixy-fl-legal-aid-card" key={org.org}>
                  <h4 className="legitixy-fl-la-org">{org.org}</h4>
                  <div className="legitixy-fl-la-row"><Phone size={12} /> <a href={`tel:${org.contact}`}>{org.contact}</a></div>
                  {org.email && <div className="legitixy-fl-la-row"><Mail size={12} /> {org.email}</div>}
                  <div className="legitixy-fl-la-row"><MapPin size={12} /> {org.address}</div>
                  <p className="legitixy-fl-la-services">{org.services}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          IMPORTANT NOTICES / ALERTS
      ══════════════════════════════════════════════════ */}
      <section className="legitixy-fl-section" aria-label="Important legal notices">
        <div className="legitixy-fl-container">
          <SectionLabel>Must Know</SectionLabel>
          <h2 className="legitixy-fl-section-title">Critical Legal Notices</h2>
          <p className="legitixy-fl-section-sub">Common mistakes and important points that can make or break a family law case</p>
          <div className="legitixy-fl-alerts-grid">
            {[
              { type: 'warn', icon: AlertTriangle, title: 'Do Not Miss Limitation Deadlines', body: 'Appeal against a Family Court decree must be filed within 30 days. Against a Magistrate maintenance order: 30 days. SLP to Supreme Court: 90 days from HC order. Missing these without adequate cause leads to dismissal of appeal.' },
              { type: 'danger', icon: AlertCircle, title: '498A / BNS Sec 85 — Not Automatic Arrest', body: 'The Supreme Court in Arnesh Kumar (2014) mandated that police must first issue a Section 41A BNSS notice and satisfy themselves that arrest is necessary. Magistrates must apply mind before ordering detention. Any police officer making an automatic arrest violates SC directions and is liable for contempt.' },
              { type: 'info', icon: Info, title: 'New Criminal Laws — BNS / BNSS / BSA (2024)', body: 'From July 1, 2024, IPC is replaced by BNS, CrPC by BNSS, and Evidence Act by BSA. For family law: 498A → BNS Sec 85; CrPC Sec 125 → BNSS Sec 144; Sec 406 IPC (streedhan) → BNS Sec 316. All principles and judgements under old provisions continue to apply.' },
              { type: 'success', icon: CheckCircle, title: 'Electronic Evidence Now Fully Admissible', body: 'Under Section 63 of the BSA 2023, electronic records — WhatsApp messages, emails, audio/video recordings, social media posts, CCTV footage, call records — are admissible with a certificate of authentication from the person who generated/received them. No longer limited to the S.65B IEA formalities.' },
              { type: 'warn', icon: AlertTriangle, title: 'Financial Disclosure is Mandatory', body: 'Post Rajnesh v. Neha (SC 2020), both parties in maintenance/divorce proceedings must file a standardised affidavit disclosing all income, assets, liabilities, and expenses. Concealment constitutes perjury and the court draws adverse inferences against the concealing party.' },
              { type: 'info', icon: Info, title: 'Streedhan Cannot Be Seized by In-Laws', body: "A woman's streedhan is her absolute property under Hindu law. Even if the husband or his family members hold it, they cannot claim ownership. The wife can file a criminal complaint under BNS Sec 316 (breach of trust) for refusal to return streedhan, in addition to claiming it in the divorce/DV proceedings." },
            ].map(n => (
              <div className={`legitixy-fl-notice-card legitixy-fl-notice-${n.type}`} key={n.title}>
                <div className="legitixy-fl-notice-icon"><n.icon size={18} /></div>
                <div>
                  <strong className="legitixy-fl-notice-title">{n.title}</strong>
                  <p className="legitixy-fl-notice-body">{n.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GLOSSARY
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section legitixy-fl-section-alt"
        id="legitixy-fl-glossary"
        data-nav-id="glossary"
        aria-labelledby="legitixy-fl-glossary-heading"
      >
        <div className="legitixy-fl-container">
          <SectionLabel>Glossary</SectionLabel>
          <h2 id="legitixy-fl-glossary-heading" className="legitixy-fl-section-title">
            Legal Terms Explained
          </h2>
          <p className="legitixy-fl-section-sub">Plain-language definitions of family law terms you'll encounter</p>

          <div className="legitixy-fl-glossary-search-wrap">
            <Search size={16} className="legitixy-fl-search-icon" />
            <input
              className="legitixy-fl-glossary-search"
              type="search"
              placeholder="Search terms or definitions..."
              value={glossarySearch}
              onChange={e => setGlossarySearch(e.target.value)}
              aria-label="Search glossary"
            />
          </div>

          <div className="legitixy-fl-glossary-grid">
            {filteredGlossary.map(({ term, def }) => (
              <div className="legitixy-fl-glossary-item" key={term}>
                <dt className="legitixy-fl-glossary-term">{term}</dt>
                <dd className="legitixy-fl-glossary-def">{def}</dd>
              </div>
            ))}
            {filteredGlossary.length === 0 && (
              <div className="legitixy-fl-glossary-empty">No terms match your search.</div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section"
        id="legitixy-fl-faqs"
        data-nav-id="faqs"
        aria-labelledby="legitixy-fl-faqs-heading"
      >
        <div className="legitixy-fl-container legitixy-fl-container-narrow">
          <SectionLabel>FAQs</SectionLabel>
          <h2 id="legitixy-fl-faqs-heading" className="legitixy-fl-section-title">
            Frequently Asked Questions
          </h2>
          <p className="legitixy-fl-section-sub">
            Authentic answers to the most searched family law questions in India
          </p>
          <div className="legitixy-fl-faq-list">
            {FAQS.map((faq, i) => <AccordionItem key={i} q={faq.q} a={faq.a} index={i} />)}
          </div>

          <div className="legitixy-fl-banner-img-wrap" style={{ marginTop: '2.5rem' }}>
            <ImageSlot label="Lawyer / FAQ Illustration" hint="Portrait or landscape — both work" aspect="16/5" icon={HelpCircle} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          IMPORTANT NUMBERS
      ══════════════════════════════════════════════════ */}
      <section className="legitixy-fl-section legitixy-fl-section-alt" aria-labelledby="legitixy-fl-numbers-heading">
        <div className="legitixy-fl-container">
          <SectionLabel>Emergency & Helplines</SectionLabel>
          <h2 id="legitixy-fl-numbers-heading" className="legitixy-fl-section-title">
            Important Helpline Numbers
          </h2>
          <p className="legitixy-fl-section-sub">Save these — available 24×7 for urgent situations</p>
          <div className="legitixy-fl-numbers-grid">
            {IMPORTANT_NUMBERS.map(n => (
              <a href={`tel:${n.num.replace(/[^0-9+]/g, '')}`} className="legitixy-fl-number-card" key={n.label}>
                <div className="legitixy-fl-num-icon"><Phone size={18} /></div>
                <div className="legitixy-fl-num-body">
                  <span className="legitixy-fl-num-label">{n.label}</span>
                  <span className="legitixy-fl-num-val">{n.num}</span>
                  <span className="legitixy-fl-num-note">{n.note}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONSULT / CTA
      ══════════════════════════════════════════════════ */}
      <section
        className="legitixy-fl-section legitixy-fl-consult-section"
        id="legitixy-fl-consult"
        data-nav-id="consult"
        aria-labelledby="legitixy-fl-consult-heading"
      >
        <div className="legitixy-fl-container">
          <div className="legitixy-fl-consult-wrap">
            <div className="legitixy-fl-consult-text">
              <SectionLabel>Speak to an Expert</SectionLabel>
              <h2 id="legitixy-fl-consult-heading" className="legitixy-fl-section-title">
                Get a Free Legal Consultation
              </h2>
              <p className="legitixy-fl-body" style={{ marginBottom: '1.5rem' }}>
                Our panel of verified, experienced family law advocates in Delhi are available for confidential consultations. Whether you're filing for divorce, defending against a false case, seeking custody, or simply need to understand your rights — speak to an expert before making any decision.
              </p>
              <ul className="legitixy-fl-consult-features">
                {[
                  "Confidential & Privileged Communication",
                  "15+ Years Experienced Delhi Advocates",
                  "Family Court Specialists",
                  "Same-Day Appointments Available",
                  "Online / In-Person Consultations",
                  "Transparent Fee Structure",
                ].map(f => (
                  <li key={f}><CheckCircle size={14} /> {f}</li>
                ))}
              </ul>
              <div className="legitixy-fl-consult-ctas">
                <a href="tel:+911234567890" className="legitixy-fl-btn-primary">
                  <Phone size={15} /> Call Now
                </a>
                <a href="mailto:legal@legitixy.in" className="legitixy-fl-btn-outline">
                  <Mail size={15} /> Email Us
                </a>
                <a href="#" className="legitixy-fl-btn-ghost">
                  <MessageSquare size={15} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="legitixy-fl-consult-visual">
              <ImageSlot label="Lawyer / Team / Office Photo" hint="400×500px portrait or any size" aspect="4/5" icon={Users} />
              <div className="legitixy-fl-consult-badges">
                <div className="legitixy-fl-consult-badge"><Star size={13} /> 4.9/5 Client Rating</div>
                <div className="legitixy-fl-consult-badge"><Calendar size={13} /> Free First Session</div>
                <div className="legitixy-fl-consult-badge"><ShieldCheck size={13} /> Verified Advocates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DISCLAIMER
      ══════════════════════════════════════════════════ */}
      <footer className="legitixy-fl-disclaimer" role="contentinfo">
        <div className="legitixy-fl-container">
          <div className="legitixy-fl-disclaimer-inner">
            <AlertCircle size={14} className="legitixy-fl-disclaimer-icon" />
            <p>
              <strong>Legal Disclaimer:</strong> The content on this page is for general educational and informational purposes only and does not constitute legal advice. It should not be relied upon as a substitute for consultation with a qualified advocate who is aware of the facts of your specific case. Laws and court procedures are subject to change. Legitixy makes no warranty as to the accuracy or completeness of the information. Data has been sourced from official statutes (as available on IndiaCode.nic.in), Supreme Court of India judgements, Delhi High Court orders, and Delhi Family Court guidelines. Always consult a licensed family law advocate before taking any legal step.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default FamilyLaws;