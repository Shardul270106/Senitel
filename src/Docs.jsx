import { useEffect } from 'react';
import { Activity, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, FileAudio2, FileText, Fingerprint, LockKeyhole, ShieldCheck, Waves } from 'lucide-react';
import './docs.css';

const documentation = [
  {
    id: 'multimodal-forensics', number: '01', title: 'Multimodal Forensics', icon: FileAudio2,
    summary: 'Review communication in its original context across voice, video, email, and documents. Keep the source file connected to the analysis so reviewers can trace where evidence came from.',
    inputs: 'Audio recordings, video clips, email content, and documents with their available metadata.',
    analysis: 'Inspect media authenticity signals and preserve provenance details such as file identity and source references alongside the review.',
    output: 'A risk assessment linked to the submitted material and a traceable evidence record for human review.',
    boundary: 'A media authenticity result says something about the media. It does not prove who sent it or authorize a requested action.',
  },
  {
    id: 'indian-speech-intelligence', number: '02', title: 'Indian Speech Intelligence', icon: Waves,
    summary: 'Evaluate speech with attention to Indian languages, code-switching, Hinglish, and regional accents. The goal is to interpret a communication in context instead of treating every voice as identical.',
    inputs: 'Voice recordings or speech extracted from a submitted video, including multilingual and code-switched speech.',
    analysis: 'Examine speech content and communication signals while accounting for language and accent variation.',
    output: 'Speech findings that can be considered with the media, identity, and intent checks in a review.',
    boundary: 'Accent, language, or a voice match by itself should not be treated as identity proof or permission to act.',
  },
  {
    id: 'intent-and-coercion', number: '03', title: 'Intent & Coercion', icon: Activity,
    summary: 'Surface transaction intent, urgency, and pressure tactics in communication. These signals help reviewers understand what is being requested and whether the request appears unusually pressuring.',
    inputs: 'Communication tied to a proposed transaction or sensitive administrative action.',
    analysis: 'Identify the requested outcome, urgency cues, pressure language, and contextual inconsistencies.',
    output: 'Intent and coercion signals that contribute to a broader risk assessment.',
    boundary: 'Intent analysis is a decision aid. It does not establish that a person is who they claim to be.',
  },
  {
    id: 'action-bound-capsules', number: '04', title: 'Action-Bound Capsules', icon: LockKeyhole,
    summary: 'Bind an approved action to the exact target and its limits. A capsule is designed to expire and use a one-time nonce so approval cannot be casually reused for a different action.',
    inputs: 'The proposed action, target account or recipient, amount or other limits, expiry, and required approvals.',
    analysis: 'Check that the action being presented remains within the approved target, scope, limits, and validity period.',
    output: 'A constrained authorization record associated with one specific action.',
    boundary: 'Approval applies only to the bounded action. A change in recipient, amount, or scope requires a new review.',
  },
  {
    id: 'dual-key-authorization', number: '05', title: 'Dual-Key Authorization', icon: ShieldCheck,
    summary: 'Require independent, multi-party approval before sensitive financial or administrative actions proceed. This adds a second decision point when one person or signal should not be enough.',
    inputs: 'A sensitive action, its policy requirements, and the designated approvers.',
    analysis: 'Track the required approvals and whether each approver has authorized the same bounded action.',
    output: 'An approval state and an auditable record of the people and decisions involved.',
    boundary: 'A second key does not replace identity checks, transaction limits, or the need to verify the action details.',
  },
  {
    id: 'verifiable-evidence', number: '06', title: 'Verifiable Evidence', icon: FileText,
    summary: 'Preserve a tamper-evident record of the review and its outcome. Signed, verifiable receipts help teams trace what was analyzed, what was approved, and when.',
    inputs: 'Evidence references, analysis results, approval decisions, and action outcomes.',
    analysis: 'Associate records with the relevant action and maintain a verifiable sequence of events.',
    output: 'An audit trail with signed receipts that can be checked against the recorded event.',
    boundary: 'An evidence receipt supports traceability. It does not make an incorrect source or decision correct.',
  },
  {
    id: 'identity-and-authority', number: '07', title: 'Identity ≠ Authority', icon: Fingerprint,
    summary: 'Keep media authenticity, identity, intent, and action authorization as separate checks. A genuine recording can still be replayed, a verified identity can still be pressured, and neither alone grants authority.',
    inputs: 'Media authenticity findings, identity evidence, intent signals, and the proposed action’s authorization state.',
    analysis: 'Evaluate each signal on its own and combine the results only within the action’s review policy.',
    output: 'A clearer record of which checks passed, which remain uncertain, and what authorization is still required.',
    boundary: 'No single signal is treated as proof of every other signal. Identity is not the same as authority.',
  },
];

function Docs() {
  useEffect(() => {
    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    if (!sectionId) return undefined;
    const frame = requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div className="docs-page">
    <header className="docs-header"><a className="docs-back" href="/"><ArrowLeft size={15} /> Back to Senitel</a><a className="docs-brand" href="/"><span><Fingerprint size={20} /></span>senitel<span>.</span></a><a className="docs-dashboard-link" href="/dashboard">Open dashboard <ArrowUpRight size={14} /></a></header>
    <div className="docs-shell">
      <aside className="docs-sidebar"><div className="docs-side-label">DOCUMENTATION</div><a className="docs-overview-link" href="#docs-overview"><BookOpen size={14} /> Overview</a><div className="docs-side-label docs-capability-label">CAPABILITIES</div><nav aria-label="Documentation sections">{documentation.map(({ id, number, title }) => <a key={id} href={`#${id}`}><span>{number}</span>{title}</a>)}</nav><div className="docs-aside-note"><ShieldCheck size={15} /><p>Each signal supports a review. No signal grants authority on its own.</p></div></aside>
      <main className="docs-main">
        <section className="docs-hero" id="docs-overview"><div className="docs-eyebrow"><span /> TRUSTLOCK / FIELD GUIDE</div><h1>Trust, explained<br /><em>signal by signal.</em></h1><p>A practical guide to Senitel Trustlock’s evidence, speech, intent, and action authorization capabilities.</p><div className="docs-hero-meta"><span><BookOpen size={14} /> 7 CAPABILITY GUIDES</span><span>MEDIA ≠ IDENTITY ≠ INTENT ≠ AUTHORIZATION</span></div></section>
        <section className="docs-process"><div className="docs-section-kicker"><span>00</span> THE REVIEW FLOW</div><h2>From communication to accountable action.</h2><div className="docs-process-steps"><article><span>01</span><b>Collect</b><p>Keep the original communication and its provenance in view.</p></article><ArrowRight size={15} /><article><span>02</span><b>Analyze</b><p>Review authenticity, speech, intent, and pressure signals.</p></article><ArrowRight size={15} /><article><span>03</span><b>Authorize</b><p>Bind approval to an exact action and require the right keys.</p></article><ArrowRight size={15} /><article><span>04</span><b>Record</b><p>Preserve a verifiable receipt of the decision and outcome.</p></article></div></section>
        <section className="docs-capabilities"><div className="docs-section-kicker"><span>01—07</span> CAPABILITY REFERENCE</div><h2>Explore the Trustlock layers.</h2>{documentation.map(({ id, number, title, icon: Icon, summary, inputs, analysis, output, boundary }) => <article className="docs-feature" id={id} key={id}><div className="docs-feature-top"><span className="docs-feature-number">{number}</span><span className="docs-feature-icon"><Icon size={17} /></span><span className="docs-feature-type">CAPABILITY GUIDE</span></div><h3>{title}</h3><p className="docs-feature-summary">{summary}</p><div className="docs-detail-grid"><div><b>INPUTS</b><p>{inputs}</p></div><div><b>WHAT IT CHECKS</b><p>{analysis}</p></div><div><b>OUTPUT</b><p>{output}</p></div><div className="docs-boundary"><b>IMPORTANT BOUNDARY</b><p>{boundary}</p></div></div><a className="docs-back-top" href="#docs-overview">Back to overview <ArrowUpRight size={13} /></a></article>)}</section>
        <footer className="docs-footer"><span><PlusDocs /> SENITEL TRUSTLOCK</span><span>TRUST EVERY SIGNAL.</span><a href="/">Return to landing <ArrowRight size={13} /></a></footer>
      </main>
    </div>
  </div>;
}

function PlusDocs() {
  return <span className="docs-plus" aria-hidden="true">+</span>;
}

export default Docs;
