/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ===== Tweaks defaults =====
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ED3024",
  "density": "comfortable",
  "showGrain": true
}/*EDITMODE-END*/;

// ===== Reveal hook =====
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-stagger");
    // Immediately reveal anything already in viewport on mount
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("in");
      }
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
    return () => io.disconnect();
  }, []);
}

// ===== Nav =====
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="nav-logo">
        <span className="mk">M</span>
        <span>BARBER MAXX</span>
      </a>
      <div className="nav-links">
        <a href="#features">Tools</a>
        <a href="#testimonials">Reviews</a>
        <a href="#offer">Shop</a>
        <a href="#faq">Support</a>
      </div>
      <div className="nav-cta">
        <a href="#offer" className="btn btn-primary" style={{padding: "12px 22px", fontSize: 12}}>
          Shop Now
          <Arrow />
        </a>
        <button className="nav-cart" aria-label="Cart">
          <CartIcon />
          <span className="badge">2</span>
        </button>
      </div>
    </nav>
  );
}

const Arrow = () => (
  <svg className="arr" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 7h10M8 3l4 4-4 4" />
  </svg>
);
const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 4h2l2 12h12l2-8H6" />
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
  </svg>
);

// ===== Hero =====
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg-word">MAXX</div>
      <>
        <div className="hero-copy">
          <span className="eyebrow">PROFESSIONAL BARBER TOOLS · EST. 2019</span>
          <h1>
            Upgrade<br/>
            <span className="strike">your cuts.</span><br/>
            <span className="accent">Elevate</span> your game.
          </h1>
          <p className="hero-sub">
            Professional-grade barber tools trusted by elite barbers across America.
            Power, precision and performance — engineered into every cut.
          </p>
          <ul className="hero-bullets">
            <li>High-torque brushless motors</li>
            <li>Precision-engineered blades</li>
            <li>Cordless all-day performance</li>
            <li>Built for pros &amp; home barbers</li>
          </ul>
          <div className="hero-ctas">
            <a href="#offer" className="btn btn-primary">
              Shop Now <Arrow />
            </a>
            <a href="#features" className="btn btn-ghost">
              See Best Sellers <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-product">
            <span className="hero-tag">Bestseller</span>
            <span className="hero-rating">
              <span className="stars">★★★★★</span> 4.9 / 2,847
            </span>
            <image-slot
              id="hero-product"
              shape="rect"
              placeholder="Drop product photo (VGR V-001)"
            ></image-slot>
            <div className="hero-meta">
              <div>
                <div style={{fontSize: 10, marginBottom: 4}}>VGR · FLAGSHIP</div>
                <div style={{fontFamily: "var(--font-display)", fontSize: 28, color: "var(--text)", letterSpacing: 0, lineHeight: 1, textTransform: "uppercase"}}>
                  V-001 Pro
                </div>
              </div>
              <div className="price">
                <small>FROM</small>
                $149
              </div>
            </div>
          </div>
        </div>
      </>
      <div className="hero-strip">
        <span>FREE U.S. SHIPPING ON ORDERS $99+</span>
        <span className="scroll-hint">SCROLL</span>
      </div>
    </section>
  );
}

// ===== Marquee =====
function Marquee() {
  const items = ["BRUSHLESS POWER", "ZERO-GAP BLADES", "ALL-DAY BATTERY", "PRO-GRADE PRECISION", "MADE FOR THE CRAFT"];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((t, i) => (
          <React.Fragment key={i}>
            <span>{t}</span>
            <span className="dot" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ===== Social Proof =====
function Proof() {
  return (
    <section className="proof">
      <div className="wrap">
        <div className="proof-grid">
          <div className="reveal">
            <span className="eyebrow">TRUSTED ACROSS AMERICA</span>
            <h2 className="proof-headline" style={{marginTop: 16}}>
              Trusted by<br/>
              <span className="num">10,000+</span>
              barbers
            </h2>
          </div>
          <div className="proof-stats reveal-stagger">
            <div className="proof-stat">
              <div className="v"><Counter to={10000} suffix="+" /></div>
              <div className="l">Pro Barbers</div>
            </div>
            <div className="proof-stat">
              <div className="v"><Counter to={4.9} decimals={1} /><sup>★</sup></div>
              <div className="l">Average Rating</div>
            </div>
            <div className="proof-stat">
              <div className="v"><Counter to={50} suffix="" /></div>
              <div className="l">U.S. States Shipped</div>
            </div>
          </div>
        </div>
        <div className="brands reveal">
          <span className="lbl">As trusted as ↘</span>
          <ul>
            <li>VGR</li>
            <li className="italic">JRL</li>
            <li className="serif">Wahl</li>
            <li>ANDIS</li>
            <li className="italic">BabylissPRO</li>
            <li className="serif">StyleCraft</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Counter({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const dur = 1600;
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  const formatted = decimals > 0
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString();
  return <span ref={ref}>{formatted}{suffix}</span>;
}

// ===== Problem / Solution =====
function Problem() {
  const pains = [
    "Weak motors that pull and snag",
    "Blades that lose their edge",
    "Battery that dies mid-cut",
    "Inconsistent, sloppy fades",
  ];
  return (
    <section className="problem" id="problem">
      <span className="section-num">03</span>
      <div className="wrap">
        <div className="problem-grid">
          <div className="reveal">
            <span className="eyebrow">THE PROBLEM</span>
            <h2 className="problem-head">
              Tired of clippers<br/>
              that <em>don't</em><br/>
              deliver?
            </h2>
            <p className="solution-copy">
              You've felt it. Halfway through a fade, the motor bogs down.
              The blade drags. Your line breaks. You blame the cut — but
              the truth is: <strong>it's the tool</strong>.
            </p>
          </div>
          <ul className="pain-list reveal-stagger">
            {pains.map((p, i) => (
              <li key={i}>
                <span className="num">0{i+1}</span>
                <span>{p}</span>
                <span className="strike-x" aria-hidden />
              </li>
            ))}
          </ul>
        </div>
        <div className="transition-banner reveal">
          <div className="qm">that's why —</div>
          <h3>We built <strong>Barber Maxx</strong></h3>
        </div>
      </div>
    </section>
  );
}

// ===== Feature Stack =====
function Features() {
  const [active, setActive] = useState(0);
  const features = [
    { icon: <BoltIcon />, title: "High-Torque Motor", desc: "8,000 RPM brushless drive — no pulling, no lag, no excuses." },
    { icon: <BladeIcon />, title: "Stainless Precision", desc: "Zero-gap stainless steel blades that hold their edge for 1,000+ cuts." },
    { icon: <BatteryIcon />, title: "All-Day Battery", desc: "180-minute runtime on a 90-minute charge. Cord optional, never required." },
    { icon: <GripIcon />, title: "Ergonomic Grip", desc: "Balanced 250g body with anti-slip texture. Built for ten-hour shifts." },
    { icon: <SoundIcon />, title: "Whisper-Quiet", desc: "Under 60dB. Calm clients, focused barbers, sharper cuts." },
  ];
  return (
    <section className="features" id="features">
      <span className="section-num">04</span>
      <div className="wrap">
        <div className="features-head reveal">
          <h2>
            Built for performance.<br/>
            Designed for <em style={{color: "var(--accent)", fontStyle: "italic"}}>precision.</em>
          </h2>
          <p className="lede">
            Every component on the V-001 Pro is engineered for a single purpose:
            to disappear in your hand and let your work speak. This is not just a
            clipper — it's your edge.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-showcase reveal">
            <image-slot id="features-product" shape="rect" placeholder="Drop product photo"></image-slot>
            <div className="hotspot" data-pos="motor" title="Brushless motor">+</div>
            <div className="hotspot" data-pos="blade" title="Zero-gap blade">+</div>
            <div className="hotspot" data-pos="grip" title="Ergonomic grip">+</div>
            <div className="corner">
              <div className="model">V-001 PRO</div>
              <div className="desc">FLAGSHIP CLIPPER</div>
            </div>
          </div>
          <div className="feature-list">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feature-item ${active === i ? "active" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <div className="ico">{f.icon}</div>
                <div>
                  <div className="ttl">{f.title}</div>
                  <div className="desc">{f.desc}</div>
                </div>
                <div className="arr"><Arrow /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="features-pull reveal">
          <q>This isn't just a clipper — it's <em>your edge.</em></q>
          <span className="sig">— the Maxx team</span>
        </div>
      </div>
    </section>
  );
}

const BoltIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"/></svg>;
const BladeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 8h16M4 16h16"/></svg>;
const BatteryIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="18" height="10" rx="1"/><path d="M22 11v2"/><rect x="4" y="9" width="10" height="6" fill="currentColor"/></svg>;
const GripIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4v16M10 4v16M14 4v16M18 4v16"/></svg>;
const SoundIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10v4h4l5 4V6L7 10H3zM18 8a6 6 0 010 8"/></svg>;

// ===== Emotional =====
function Emotional() {
  return (
    <section className="emotional">
      <div className="bg-stripe" />
      <span className="section-num">05</span>
      <div className="wrap">
        <div className="emotional-content reveal">
          <span className="signature">More than a tool —</span>
          <h2>
            it's your<br/>
            <span className="it">signature.</span>
          </h2>
          <p>
            Every cut you make represents your craft. With Barber Maxx,
            you don't just cut hair — you build a reputation. Tools sharp
            enough to match your ambition.
          </p>
          <div className="tags">
            <span>Craft</span>
            <span>Authority</span>
            <span>Culture</span>
            <span>Precision</span>
            <span>Reputation</span>
          </div>
        </div>
        <div className="emotional-photos reveal">
          <div><image-slot id="emo-1" shape="rect" placeholder="Barbershop scene"></image-slot></div>
          <div><image-slot id="emo-2" shape="rect" placeholder="Hero portrait of barber"></image-slot></div>
          <div><image-slot id="emo-3" shape="rect" placeholder="Client / shop detail"></image-slot></div>
        </div>
      </div>
    </section>
  );
}

// ===== Testimonials =====
const TESTIMONIALS = [
  { stars: 5, quote: "Best clipper I've used in years. Strong motor, smooth cuts, zero issues. My fades have never been cleaner.", name: "Mike R.", role: "Owner · Crown Cuts, Los Angeles" },
  { stars: 5, quote: "Battery lasts the entire day. Perfect for my shop — six chairs, back-to-back, no downtime.", name: "James K.", role: "Master Barber · Brooklyn" },
  { stars: 5, quote: "Switched from a $400 brand and never looked back. The blade is real. The motor is real. The price is unreal.", name: "Carlos D.", role: "Barber · Miami" },
  { stars: 5, quote: "Quietest clipper I own. Clients actually relax now. That's a game-changer for kid cuts.", name: "Andre T.", role: "Owner · Fadeline, Atlanta" },
  { stars: 5, quote: "I bought one for the home setup, ended up buying three more for the shop. Pros notice the difference.", name: "Devon W.", role: "Master Barber · Chicago" },
  { stars: 5, quote: "Solid build, sharp blade, no learning curve. Out of the box and into the rotation same day.", name: "Ricky M.", role: "Barber · Houston" },
];

function Testimonials() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(2);
  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 880 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const safePage = Math.min(page, totalPages - 1);
  const offset = -(safePage * 100);
  return (
    <section className="testimonials" id="testimonials">
      <span className="section-num">06</span>
      <div className="wrap">
        <div className="testimonials-head reveal">
          <div>
            <span className="eyebrow">REAL BARBERS · REAL RESULTS</span>
            <h2 style={{marginTop: 16}}>
              The proof<br/>is in the <em style={{color: "var(--accent)", fontStyle: "italic"}}>cut.</em>
            </h2>
          </div>
          <div className="t-controls">
            <button className="t-btn" onClick={() => setPage(Math.max(0, safePage - 1))} disabled={safePage === 0} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 7H2M6 3L2 7l4 4"/></svg>
            </button>
            <button className="t-btn" onClick={() => setPage(Math.min(totalPages - 1, safePage + 1))} disabled={safePage === totalPages - 1} aria-label="Next">
              <Arrow />
            </button>
          </div>
        </div>
        <div className="t-track-wrap">
          <div className="t-track" style={{transform: `translateX(${offset}%)`}}>
            {TESTIMONIALS.map((t, i) => (
              <div className="t-card" key={i}>
                <span className="quote-mark">"</span>
                <span className="stars">{"★".repeat(t.stars)}</span>
                <blockquote>"{t.quote}"</blockquote>
                <div className="person">
                  <div className="avatar">
                    <image-slot id={`t-avatar-${i}`} shape="circle" placeholder="Avatar"></image-slot>
                  </div>
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="t-dots">
          {Array.from({length: totalPages}).map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === safePage ? "active" : ""}`}
              onClick={() => setPage(i)}
              aria-label={`Page ${i+1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Offer =====
function Offer() {
  return (
    <section className="offer" id="offer">
      <span className="section-num">07</span>
      <div className="wrap">
        <div style={{textAlign: "center", marginBottom: 60}} className="reveal">
          <span className="eyebrow" style={{color: "#555"}}>THE OFFER</span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 0.92,
            textTransform: "uppercase",
            letterSpacing: "-0.015em",
            marginTop: 16
          }}>
            Get yours <em style={{color: "var(--accent)", fontStyle: "italic"}}>today.</em>
          </h2>
        </div>
        <div className="offer-grid">
          <div className="offer-card reveal">
            <span className="badge">SAVE $50</span>
            <div className="product-name">V-001 PRO</div>
            <div className="product-sub">FLAGSHIP CLIPPER · CORDLESS</div>
            <div className="price-row">
              <span className="price-now">$149</span>
              <span className="price-old">$199</span>
              <span className="price-save">−25%</span>
            </div>
            <ul className="offer-incl">
              <li>VGR V-001 Pro Cordless Clipper</li>
              <li>4 precision guard combs (1.5 / 3 / 6 / 9mm)</li>
              <li>Charging dock + USB-C cable</li>
              <li>Cleaning brush + blade oil</li>
              <li>1-year manufacturer warranty</li>
              <li>Free U.S. shipping (2-day)</li>
            </ul>
            <div className="stock-bar">
              <div className="top">
                <span>STOCK LEVEL</span>
                <span className="red">22% LEFT</span>
              </div>
              <div className="track"><div className="fill" /></div>
            </div>
            <a href="#" className="btn btn-primary">
              Add to Cart — $149 <Arrow />
            </a>
          </div>
          <div className="offer-visual reveal">
            <image-slot id="offer-img" shape="rect" placeholder="Lifestyle / kit photo"></image-slot>
            <div className="countdown">
              <div className="lbl">⚡ LIMITED-TIME PRICE ENDS IN</div>
              <Countdown />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Countdown() {
  const [t, setT] = useState({ d: 2, h: 14, m: 32, s: 47 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((prev) => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const cells = [
    { v: t.d, l: "DAYS" },
    { v: t.h, l: "HRS" },
    { v: t.m, l: "MIN" },
    { v: t.s, l: "SEC" },
  ];
  return (
    <div className="cd-row">
      {cells.map((c, i) => (
        <div className="cd-cell" key={i}>
          <div className="v">{String(c.v).padStart(2, "0")}</div>
          <div className="l">{c.l}</div>
        </div>
      ))}
    </div>
  );
}

// ===== FAQ =====
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: "Is it good for beginners?", a: "Absolutely. The V-001 Pro is designed for both first-time home barbers and seasoned professionals. The taper lever and pre-set guard combs make a clean fade approachable, while the motor and blade quality keep it relevant in any pro shop." },
    { q: "How long does the battery last?", a: "Up to 180 minutes of cutting per charge — that's a full day of back-to-back appointments. A 90-minute charge gets you to full, and a 10-minute quick charge gives you ~30 minutes of runtime if you're in a pinch." },
    { q: "What if I don't like it?", a: "You're covered. Every Barber Maxx tool ships with a 30-day, 100% satisfaction guarantee. If it's not the best clipper you've ever held, send it back for a full refund — no questions, no restocking fees." },
    { q: "How does it compare to Wahl or Andis?", a: "Built to compete at the highest level. The V-001 Pro pairs a brushless motor and zero-gap stainless blade with a price 30–50% lower than comparable Wahl Cordless Magic Clip or Andis Master setups. Same performance, smarter price." },
    { q: "Do you ship internationally?", a: "Right now we ship across all 50 U.S. states with free 2-day shipping on orders over $99. International is rolling out in 2026 — drop your email at checkout and we'll let you know when your country is live." },
    { q: "What's included in the warranty?", a: "1-year full manufacturer warranty against motor, battery, and electrical defects. Blades are covered for 6 months against manufacturing flaws. Just contact support — we'll repair or replace, on us." },
  ];
  return (
    <section className="faq" id="faq">
      <span className="section-num">08</span>
      <div className="wrap">
        <div className="faq-grid">
          <div className="faq-side reveal">
            <span className="eyebrow">QUESTIONS · ANSWERED</span>
            <h2 style={{marginTop: 16}}>
              No gimmicks.<br/>
              Straight <em style={{color: "var(--accent)", fontStyle: "italic"}}>answers.</em>
            </h2>
            <p className="lede">
              Still on the fence? Here's what we hear most often
              from barbers before they pull the trigger.
            </p>
          </div>
          <div className="faq-list reveal">
            {items.map((it, i) => (
              <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="num">{String(i+1).padStart(2, "0")}</span>
                  <span>{it.q}</span>
                  <span className="toggle" />
                </button>
                <div className="faq-a"><div><p>{it.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Urgency band =====
function Urgency() {
  const items = ["DON'T WAIT", "STOCK RUNS FAST", "SHOP NOW", "LIMITED INVENTORY"];
  return (
    <div className="urgency">
      <div className="urgency-track">
        {[...items, ...items, ...items].map((t, i) => (
          <React.Fragment key={i}>
            <span>{t}</span>
            <span className="star" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ===== Final CTA =====
function FinalCTA() {
  return (
    <section className="final" id="final">
      <div className="final-bg">MAXX OUT</div>
      <div className="final-content">
        <span className="eyebrow" style={{justifyContent: "center"}}>READY?</span>
        <h2 style={{marginTop: 24}}>
          Upgrade<br/>
          your <em>setup.</em>
        </h2>
        <p>
          Get the tool that built the reputation of 10,000+ barbers across America.
          Free shipping. 30-day guarantee. No regrets.
        </p>
        <div className="final-cta">
          <a href="#offer" className="btn btn-primary">
            Get professional results today <Arrow />
          </a>
          <span className="micro">⚡ Limited stock · 30-day money back · Free shipping</span>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">BARBER MAXX</div>
            <p className="footer-tagline">
              Professional-grade barber tools, engineered for the craft.
              Built in America, trusted in 10,000+ shops.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="#">Clippers</a></li>
              <li><a href="#">Trimmers</a></li>
              <li><a href="#">Bundles</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Pro Program</a></li>
              <li><a href="#">Wholesale</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 BARBER MAXX USA · ALL RIGHTS RESERVED</span>
          <span>MADE FOR THE CRAFT</span>
        </div>
      </div>
    </footer>
  );
}

// ===== Tweaks =====
function Tweaks() {
  if (!window.useTweaks) return null;
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to root
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.body.classList.toggle("grain", !!t.showGrain);
    document.documentElement.style.setProperty(
      "--pad-x",
      t.density === "compact" ? "clamp(16px, 3vw, 40px)" : "clamp(20px, 4vw, 64px)"
    );
  }, [t]);

  const { TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakColor
          label="Accent color"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#ED3024", "#4F86C6", "#f4b400", "#bebec6"]}
        />
      </TweakSection>
      <TweakSection title="Layout">
        <TweakRadio
          label="Density"
          value={t.density}
          onChange={(v) => setTweak("density", v)}
          options={[
            { value: "comfortable", label: "Comfortable" },
            { value: "compact", label: "Compact" },
          ]}
        />
        <TweakToggle
          label="Film grain"
          value={t.showGrain}
          onChange={(v) => setTweak("showGrain", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ===== App =====
function App() {
  useReveal();
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Proof />
      <Problem />
      <Features />
      <Emotional />
      <Testimonials />
      <Offer />
      <FAQ />
      <Urgency />
      <FinalCTA />
      <Footer />
      <Tweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
