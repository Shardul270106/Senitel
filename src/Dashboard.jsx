import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Bell, Check, ChevronDown, Clock3, FileAudio2, FileText, Fingerprint, LayoutDashboard, LockKeyhole, MoreHorizontal, Plus, Search, ShieldAlert, ShieldCheck, Video, Waves } from 'lucide-react';
import './dashboard.css';

const queue = [
  { icon: FileAudio2, title: 'Voice transfer request', detail: 'Ananya Mehta · Axis Bank', time: '2 min ago', risk: 'HIGH RISK', tone: 'high', score: '92' },
  { icon: Video, title: 'Video identity review', detail: 'Rahul Kapoor · HDFC Bank', time: '18 min ago', risk: 'REVIEW', tone: 'review', score: '61' },
  { icon: FileText, title: 'Invoice approval', detail: 'Northstar Logistics · ₹4.8L', time: '46 min ago', risk: 'VERIFIED', tone: 'clear', score: '08' },
];

const events = [
  { title: 'Dual approval completed', detail: 'Payroll release · 2 of 2 keys', time: '09:42:18', status: 'AUTHORIZED', tone: 'clear' },
  { title: 'Synthetic voice detected', detail: 'Incoming call · +91 98765 43210', time: '09:36:04', status: 'BLOCKED', tone: 'high' },
  { title: 'Evidence capsule sealed', detail: 'Vendor payment · INV-2048', time: '09:21:51', status: 'RECORDED', tone: 'review' },
];

const capabilities = [
  ['01', 'Multimodal Forensics', 'Analyze voice, video, email, and document evidence with verifiable file provenance.'],
  ['02', 'Indian Speech Intelligence', 'Evaluate speech across Indian languages and Hinglish, with attention to regional accents.'],
  ['03', 'Intent & Coercion', 'Identify transaction intent, urgency, and pressure tactics in communication.'],
  ['04', 'Action-Bound Capsules', 'Bind approved actions to a target, strict limits, an expiry, and a one-time nonce.'],
  ['05', 'Dual-Key Authorization', 'Require multi-party approval before sensitive financial or administrative actions.'],
  ['06', 'Verifiable Evidence', 'Preserve a tamper-evident audit trail with signed, verifiable receipts.'],
  ['07', 'Identity ≠ Authority', 'Keep media authenticity, identity, intent, and action authorization as separate checks.'],
];

const dashboardLinks = [
  { id: 'overview', title: 'Overview', detail: 'Dashboard metrics and trust posture' },
  { id: 'queue', title: 'Risk queue', detail: 'Review flagged communications' },
  { id: 'activity', title: 'Evidence log', detail: 'Recent signed audit events' },
  { id: 'authorizations', title: 'Authorizations', detail: 'Pending dual-key approvals' },
  { id: 'signals', title: 'Signal monitors', detail: 'Risk activity and signal trends' },
  { id: 'settings', title: 'Policies', detail: 'Trust layer policy status' },
];

const demoNotifications = [
  { title: 'Voice transfer flagged', detail: 'High risk · 2 minutes ago', section: 'queue', tone: 'high' },
  { title: 'Second approval needed', detail: 'Northstar Logistics · 12 minutes ago', section: 'authorizations', tone: 'review' },
  { title: 'Evidence capsule sealed', detail: 'Vendor payment · 39 minutes ago', section: 'activity', tone: 'clear' },
];

function AnimatedMetric({ value, decimals = 0 }) {
  const metricRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const finish = () => setDisplayValue(value);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      finish();
      return undefined;
    }
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1050;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - ((1 - progress) ** 3);
        setDisplayValue(value * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    if (metricRef.current) observer.observe(metricRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={metricRef} className="metric-count">{new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(displayValue)}</span>;
}

function Dashboard() {
  const sectionIds = ['overview', 'queue', 'activity', 'authorizations', 'signals', 'settings'];
  const getActiveSection = () => {
    const hash = window.location.hash.slice(1);
    return sectionIds.includes(hash) ? hash : 'overview';
  };
  const [activeSection, setActiveSection] = useState(getActiveSection);
  const [openHeaderPanel, setOpenHeaderPanel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const headerActionsRef = useRef(null);

  const matchingLinks = dashboardLinks.filter((link) => `${link.title} ${link.detail}`.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  const navigateToSection = (event, sectionId) => {
    event.preventDefault();
    setActiveSection(sectionId);
    setOpenHeaderPanel('');
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${sectionId}`);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  useEffect(() => {
    const syncActiveSection = () => setActiveSection(getActiveSection());
    window.addEventListener('hashchange', syncActiveSection);
    return () => window.removeEventListener('hashchange', syncActiveSection);
  }, []);

  useEffect(() => {
    const updateActiveSectionFromScroll = () => {
      const marker = Math.min(170, window.innerHeight * 0.3);
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((element) => ({ id: element.id, bounds: element.getBoundingClientRect() }));
      const current = sections.filter(({ bounds }) => bounds.top <= marker && bounds.bottom > marker).at(-1)
        || sections.filter(({ bounds }) => bounds.top <= marker).at(-1);
      setActiveSection(current?.id || 'overview');
    };
    let frame = 0;
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        updateActiveSectionFromScroll();
        frame = 0;
      });
    };
    updateActiveSectionFromScroll();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!openHeaderPanel) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!headerActionsRef.current?.contains(event.target)) setOpenHeaderPanel('');
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpenHeaderPanel('');
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [openHeaderPanel]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
    const animatedItems = document.querySelectorAll('.dashboard-shell .dash-heading, .dashboard-shell .stat-card, .dashboard-shell .dash-panel');
    animatedItems.forEach((item, index) => {
      item.classList.add('dash-enter');
      item.style.setProperty('--enter-delay', `${Math.min(index % 6, 4) * 65}ms`);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    animatedItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <div className="dashboard-shell">
    <aside className="dash-sidebar">
      <a className="dash-brand" href="/" aria-label="Senitel home"><span><Fingerprint size={20} strokeWidth={1.6} /></span>senitel<span className="dash-brand-dot">.</span></a>
      <div className="dash-workspace"><span className="workspace-avatar">A</span><span><b>Agnomatic</b><small>ENTERPRISE WORKSPACE</small></span><ChevronDown size={14} /></div>
      <div className="dash-side-label">WORKSPACE</div>
      <nav className="dash-menu" aria-label="Dashboard navigation">
        <a className={activeSection === 'overview' ? 'selected' : ''} href="#overview" onClick={(event) => navigateToSection(event, 'overview')}><LayoutDashboard size={16} />Overview{activeSection === 'overview' && <span className="menu-active-dot" />}</a>
        <a className={activeSection === 'queue' ? 'selected' : ''} href="#queue" onClick={(event) => navigateToSection(event, 'queue')}><Activity size={16} />Risk queue<span className="menu-count">3</span>{activeSection === 'queue' && <span className="menu-active-dot" />}</a>
        <a className={activeSection === 'activity' ? 'selected' : ''} href="#activity" onClick={(event) => navigateToSection(event, 'activity')}><FileText size={16} />Evidence log{activeSection === 'activity' && <span className="menu-active-dot" />}</a>
        <a className={activeSection === 'authorizations' ? 'selected' : ''} href="#authorizations" onClick={(event) => navigateToSection(event, 'authorizations')}><LockKeyhole size={16} />Authorizations{activeSection === 'authorizations' && <span className="menu-active-dot" />}</a>
      </nav>
      <div className="dash-side-label security-label">SECURITY</div>
      <nav className="dash-menu"><a className={activeSection === 'signals' ? 'selected' : ''} href="#signals" onClick={(event) => navigateToSection(event, 'signals')}><Waves size={16} />Signal monitors{activeSection === 'signals' && <span className="menu-active-dot" />}</a><a className={activeSection === 'settings' ? 'selected' : ''} href="#settings" onClick={(event) => navigateToSection(event, 'settings')}><ShieldCheck size={16} />Policies{activeSection === 'settings' && <span className="menu-active-dot" />}</a></nav>
      <div className="dash-sidebar-bottom"><div className="system-status"><span className="status-pulse" /><span><b>All systems operational</b><small>Last checked just now</small></span></div><a className="dash-user" href="#overview" onClick={(event) => navigateToSection(event, 'overview')}><span className="user-avatar">SP</span><span><b>Shardul Patil</b><small>Workspace admin</small></span><MoreHorizontal size={17} /></a></div>
    </aside>

    <main className="dash-main">
      <header className="dash-topbar">
        <div className="dash-breadcrumb-group"><a className="dashboard-home-link" href="/"><ArrowLeft size={13} /> Back to landing</a><div className="dash-breadcrumb">WORKSPACE <span>/</span> <b>{dashboardLinks.find((link) => link.id === activeSection)?.title.toUpperCase()}</b></div></div>
        <div className="dash-top-actions" ref={headerActionsRef}>
          <div className="header-control status-control">
            <button className="live-indicator live-status-button" aria-expanded={openHeaderPanel === 'status'} onClick={() => setOpenHeaderPanel(openHeaderPanel === 'status' ? '' : 'status')}><i /> PROTECTION ACTIVE</button>
            {openHeaderPanel === 'status' && <div className="header-popover status-popover"><div className="popover-title"><span className="popover-ok"><ShieldCheck size={15} /></span><span><b>Protection is active</b><small>All trust layers are responding</small></span></div><div className="health-row"><span>Media authenticity</span><b>Operational</b></div><div className="health-row"><span>Identity assurance</span><b>Operational</b></div><div className="health-row"><span>Intent analysis</span><b>Operational</b></div><div className="health-row"><span>Action authorization</span><b>Operational</b></div><small className="popover-footnote">Last system check · just now</small></div>}
          </div>
          <div className="header-control">
            <button className="icon-button" aria-label="Search dashboard" aria-expanded={openHeaderPanel === 'search'} onClick={() => { setOpenHeaderPanel(openHeaderPanel === 'search' ? '' : 'search'); setSearchQuery(''); }}><Search size={17} /></button>
            {openHeaderPanel === 'search' && <div className="header-popover search-popover"><label className="search-field"><Search size={15} /><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search dashboard" /></label><div className="popover-section-label">{searchQuery ? 'MATCHING SECTIONS' : 'QUICK JUMP'}</div>{matchingLinks.length ? matchingLinks.map((link) => <a className="popover-link" href={`#${link.id}`} key={link.id} onClick={(event) => navigateToSection(event, link.id)}><span><b>{link.title}</b><small>{link.detail}</small></span><ArrowRight size={14} /></a>) : <p className="empty-search">No matching dashboard sections.</p>}<div className="popover-hint"><kbd>ESC</kbd> to close</div></div>}
          </div>
          <div className="header-control">
            <button className="icon-button notification-button" aria-label="Notifications" aria-expanded={openHeaderPanel === 'notifications'} onClick={() => setOpenHeaderPanel(openHeaderPanel === 'notifications' ? '' : 'notifications')}><Bell size={17} /><i /></button>
            {openHeaderPanel === 'notifications' && <div className="header-popover notification-popover"><div className="popover-heading"><span><b>Notifications</b><small>3 recent updates</small></span><span className="notification-unread">3 NEW</span></div>{demoNotifications.map((notification) => <a className="notification-item" href={`#${notification.section}`} key={notification.title} onClick={(event) => navigateToSection(event, notification.section)}><i className={notification.tone} /><span><b>{notification.title}</b><small>{notification.detail}</small></span><ArrowRight size={13} /></a>)}<div className="popover-hint">Demo notifications · click to view section</div></div>}
          </div>
          <div className="header-control">
            <button className="top-avatar" aria-label="Open Shardul Patil profile menu" aria-expanded={openHeaderPanel === 'profile'} onClick={() => setOpenHeaderPanel(openHeaderPanel === 'profile' ? '' : 'profile')}>SP</button>
            {openHeaderPanel === 'profile' && <div className="header-popover profile-popover"><div className="profile-summary"><span className="profile-avatar-large">SP</span><span><b>Shardul Patil</b><small>Workspace admin</small></span></div><div className="profile-workspace"><small>ACTIVE WORKSPACE</small><b>Agnomatic Enterprise</b></div><a className="profile-menu-link" href="#authorizations" onClick={(event) => navigateToSection(event, 'authorizations')}><LockKeyhole size={14} />Pending authorizations<ArrowRight size={13} /></a><a className="profile-menu-link" href="#settings" onClick={(event) => navigateToSection(event, 'settings')}><ShieldCheck size={14} />Workspace policies<ArrowRight size={13} /></a><div className="popover-hint">Profile menu · demo</div></div>}
          </div>
        </div>
      </header>
      <div className="dash-content">
        <section className="dash-heading" id="overview"><div><div className="dash-eyebrow"><span /> TRUSTLOCK / CONTROL ROOM</div><h1>Good morning, Shardul<span>.</span></h1><p>Here’s your trust overview for today, <span>Friday, November 21, 2026</span></p></div><button className="dash-new-action"><Plus size={16} /> New authorization</button></section>

        <section className="dash-stats" aria-label="Trust overview metrics">
          <article className="stat-card"><div className="stat-top"><span>COMMUNICATIONS ANALYZED</span><Activity size={16} /></div><div className="stat-value"><AnimatedMetric value={1284} /></div><div className="stat-foot"><span className="trend-up"><ArrowUpRight size={13} /> 12.8%</span><span>vs. previous 30 days</span><div className="sparkline spark-one"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></article>
          <article className="stat-card"><div className="stat-top"><span>RISKY INTERACTIONS</span><ShieldAlert size={16} /></div><div className="stat-value"><AnimatedMetric value={23} /></div><div className="stat-foot"><span className="trend-down"><ArrowDownRight size={13} /> 8.2%</span><span>vs. previous 30 days</span><div className="sparkline spark-two"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></article>
          <article className="stat-card"><div className="stat-top"><span>ACTIONS AUTHORIZED</span><LockKeyhole size={16} /></div><div className="stat-value"><AnimatedMetric value={96.4} decimals={1} /><span className="stat-unit">%</span></div><div className="stat-foot"><span className="trend-up"><ArrowUpRight size={13} /> 2.4%</span><span>approval completion</span><div className="sparkline spark-three"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></article>
          <article className="stat-card"><div className="stat-top"><span>AVG. RISK SCORE</span><Waves size={16} /></div><div className="stat-value"><AnimatedMetric value={18} /><span className="stat-unit">/100</span></div><div className="stat-foot"><span className="trend-up"><ArrowDownRight size={13} /> 5 pts</span><span>lower is safer</span><div className="risk-meter"><i /></div></div></article>
        </section>

        <section className="dash-middle-grid">
          <article className="dash-panel trend-panel" id="signals"><div className="panel-heading"><div><div className="panel-kicker">SIGNAL INTELLIGENCE</div><h2>Risk activity</h2></div><button className="period-select">Last 7 days <ChevronDown size={14} /></button></div><div className="chart-legend"><span><i className="legend-violet" /> Flagged interactions</span><span><i className="legend-muted" /> Reviewed</span></div><div className="chart-wrap"><div className="chart-y"><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div><div className="chart-plot"><div className="chart-grid"><i /><i /><i /><i /><i /></div><svg className="risk-chart" viewBox="0 0 640 170" preserveAspectRatio="none" aria-label="Risk activity trend over the last seven days"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#af50ff" stopOpacity=".2" /><stop offset="1" stopColor="#af50ff" stopOpacity="0" /></linearGradient></defs><path className="risk-chart-area" d="M0 130 C35 118 45 122 80 106 S125 120 160 95 S205 104 240 78 S285 95 320 69 S365 84 400 62 S445 74 480 48 S525 66 560 38 S605 51 640 24 L640 170 L0 170Z" fill="url(#chart-fill)"/><path className="risk-chart-line" pathLength="1" d="M0 130 C35 118 45 122 80 106 S125 120 160 95 S205 104 240 78 S285 95 320 69 S365 84 400 62 S445 74 480 48 S525 66 560 38 S605 51 640 24" fill="none" stroke="#af50ff" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/><path className="review-chart-line" pathLength="1" d="M0 149 C35 140 45 145 80 134 S125 143 160 126 S205 131 240 121 S285 128 320 111 S365 120 400 107 S445 111 480 101 S525 109 560 93 S605 101 640 87" fill="none" stroke="#65616d" strokeWidth="1.5" strokeDasharray="4 5" vectorEffect="non-scaling-stroke"/><circle className="risk-chart-endpoint" cx="640" cy="24" r="4" /></svg><div className="chart-x"><span>15 NOV</span><span>16 NOV</span><span>17 NOV</span><span>18 NOV</span><span>19 NOV</span><span>20 NOV</span><span>21 NOV</span></div></div></div></article>
          <article className="dash-panel layer-panel"><div className="panel-heading"><div><div className="panel-kicker">DEFENSE POSTURE</div><h2>Trust layers</h2></div><button className="more-button" aria-label="More trust layer options"><MoreHorizontal size={18} /></button></div><div className="layer-score"><div className="score-ring"><div><b>94</b><small>HEALTH</small></div></div><div><b>Strong posture</b><span>Across all 5 layers</span></div></div><div className="layer-list"><div><span className="layer-icon"><Fingerprint size={14} /></span><span>Media authenticity</span><b>98%</b></div><div><span className="layer-icon"><ShieldCheck size={14} /></span><span>Identity assurance</span><b>96%</b></div><div><span className="layer-icon"><Activity size={14} /></span><span>Intent analysis</span><b>91%</b></div><div><span className="layer-icon"><LockKeyhole size={14} /></span><span>Action authorization</span><b>94%</b></div></div></article>
        </section>

        <section className="dash-panel queue-panel" id="queue"><div className="panel-heading"><div><div className="panel-kicker">NEEDS YOUR ATTENTION <span className="queue-pip" /></div><h2>Risk queue <span className="heading-count">03</span></h2></div><a href="#queue" className="panel-link" onClick={(event) => navigateToSection(event, 'queue')}>View all <ArrowRight size={14} /></a></div><div className="queue-list">{queue.map(({ icon: Icon, title, detail, time, risk, tone, score }) => <div className="queue-row" key={title}><span className={`queue-icon ${tone}`}><Icon size={17} /></span><div className="queue-primary"><b>{title}</b><span>{detail}</span></div><span className={`risk-tag ${tone}`}>{risk}</span><div className="queue-score"><small>RISK SCORE</small><b className={tone}>{score}<span>/100</span></b></div><span className="queue-time"><Clock3 size={12} />{time}</span><button className="row-arrow" aria-label={`Review ${title}`}><ArrowUpRight size={16} /></button></div>)}</div><a className="queue-mobile-link" href="#queue" onClick={(event) => navigateToSection(event, 'queue')}>Open risk queue <ArrowRight size={14} /></a></section>

        <section className="dash-panel events-panel" id="activity"><div className="panel-heading"><div><div className="panel-kicker">AUDIT TRAIL</div><h2>Recent activity</h2></div><a href="#activity" className="panel-link" onClick={(event) => navigateToSection(event, 'activity')}>Full evidence log <ArrowRight size={14} /></a></div><div className="event-list">{events.map((event) => <div className="event-row" key={event.title}><span className={`event-mark ${event.tone}`}>{event.tone === 'clear' ? <Check size={13} /> : event.tone === 'high' ? <ShieldAlert size={13} /> : <FileText size={13} />}</span><div><b>{event.title}</b><span>{event.detail}</span></div><span className={`event-status ${event.tone}`}>{event.status}</span><time>{event.time}</time></div>)}</div></section>
        <section className="dash-panel approvals-panel" id="authorizations"><div className="panel-heading"><div><div className="panel-kicker">DUAL-KEY CONTROL</div><h2>Pending authorizations</h2></div><span className="capability-count">02 AWAITING</span></div><div className="approval-list"><div className="approval-row"><span className="approval-symbol"><LockKeyhole size={15} /></span><div><b>Vendor payment · Northstar Logistics</b><small>₹4,80,000 · Requested by A. Mehta</small></div><span className="approval-progress"><i /><i /></span><span className="approval-wait">1 OF 2 KEYS</span></div><div className="approval-row"><span className="approval-symbol"><LockKeyhole size={15} /></span><div><b>Quarterly payroll release</b><small>₹18,20,000 · Requested by R. Kapoor</small></div><span className="approval-progress"><i /><i /></span><span className="approval-wait">1 OF 2 KEYS</span></div></div></section>
        <section className="dash-panel capabilities-panel" id="settings"><div className="panel-heading"><div><div className="panel-kicker">TRUSTLOCK / CAPABILITY INDEX</div><h2>Seven layers of trust</h2></div><span className="capability-count">07 ACTIVE</span></div><div className="capability-grid">{capabilities.map(([number, title, description]) => <article className="capability-card" key={number}><span className="capability-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><span className="capability-status"><i /> ACTIVE</span></article>)}</div></section>
        <footer className="dash-footer"><span><Plus size={13} /> TRUST EVERY SIGNAL.</span><span>MEDIA ≠ IDENTITY ≠ INTENT ≠ AUTHORIZATION</span><span>SECURE BY DESIGN</span></footer>
      </div>
    </main>
  </div>;
}

export default Dashboard;
