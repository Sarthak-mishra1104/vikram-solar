import { motion } from 'framer-motion'
import { Calculator, Cpu, BarChart3, MessageSquare, ChevronRight, Shield, Award, Users, Zap, Sun, Battery, TrendingUp, CheckCircle, ArrowRight, Star } from 'lucide-react'
import styles from './Home.module.css'
import { useCounter } from '../hooks/useCounter'

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
}
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
}
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
}

const STATS = [
  { val: '500',   suffix: '+',  label: 'Solar Companies',      isText: false },
  { val: '50000', suffix: 'K+', label: 'End Customers Served', isText: false },
  { val: 'AI',    suffix: '',   label: 'Powered Platform',     isText: true  },
  { val: 'Free',  suffix: '',   label: 'To Get Started',       isText: true  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Calculate Your Savings',
    desc: 'Enter rooftop size, monthly bill and appliances. Our AI calculates exact savings, ROI and payback period in seconds.',
    Icon: Calculator,
    color: '#00684a',
  },
  {
    step: '02',
    title: 'Compare Solar Panels',
    desc: 'Browse Mono PERC, Bifacial and Poly panels. Compare efficiency, lifespan and pricing to find the perfect fit.',
    Icon: BarChart3,
    color: '#00684a',
  },
  {
    step: '03',
    title: 'Get Expert Consultation',
    desc: 'Book a free consultation with certified solar experts. Get a customised quote with subsidy deductions applied.',
    Icon: Users,
    color: '#00684a',
  },
  {
    step: '04',
    title: 'Go Solar & Save',
    desc: 'Get professional installation in 1-2 days. Start saving on electricity bills from day one.',
    Icon: Sun,
    color: '#00684a',
  },
]

const FEATURES = [
  { Icon: Calculator,    title: 'Smart Solar Calculator',  desc: 'AI instantly recommends the perfect system size, cost, ROI and payback period based on real data.',   cta: 'Calculate savings', page: 'calculator' },
  { Icon: Cpu,           title: 'AI Bill Analyzer',        desc: 'Upload electricity bill — AI extracts data and generates a precise personalised solar recommendation.', cta: 'Analyze my bill',   page: 'calculator' },
  { Icon: BarChart3,     title: 'Solar Setup Explorer',    desc: 'Compare panel types, explore packages, efficiency ratings, lifespan and government subsidy benefits.',   cta: 'Explore panels',    page: 'explorer'   },
  { Icon: MessageSquare, title: 'AI Solar Assistant',      desc: 'Ask anything about solar in Hindi or English — subsidies, net metering, EMI, maintenance. 24/7.',       cta: 'Start chatting',    page: 'assistant'  },
]

const WHY = [
  { Icon: Shield,     title: 'White Label Ready',  desc: 'Brand the platform with your own logo, colors and content in minutes.' },
  { Icon: Award,      title: 'AI Powered',          desc: 'Smart calculator and AI assistant built in — no extra setup needed.' },
  { Icon: Users,      title: 'Customer Friendly',   desc: 'Simple UI any homeowner can use. Designed to convert visitors into leads.' },
  { Icon: Zap,        title: 'Quick Setup',          desc: 'Get your branded solar platform live in less than 24 hours.' },
  { Icon: Battery,    title: 'Subsidy Calculator',   desc: 'Automatically shows latest PM Surya Ghar subsidies — up to ₹78,000.' },
  { Icon: TrendingUp, title: 'ROI Tracking',         desc: 'Show customers exact savings, payback period and 25-year ROI.' },
]

const TESTIMONIALS = [
  { name: 'Rajesh Kumar', location: 'Mumbai',    text: 'SolarSync helped us convert 3x more leads. The AI calculator is a game changer.', rating: 5 },
  { name: 'Priya Sharma', location: 'Delhi',     text: 'Our customers love the AI assistant. It answers every question perfectly.',        rating: 5 },
  { name: 'Amit Patel',   location: 'Ahmedabad', text: 'We set up our branded platform in just 2 hours. Best investment for our company.', rating: 5 },
]

function StatItem({ val, suffix, label, isText }) {
  const { count, ref } = useCounter(isText ? 0 : parseInt(val), 2000)
  return (
    <div ref={ref} className={styles.statItem}>
      <div className={styles.statVal}>{isText ? val : `${count}${suffix}`}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

function SolarAnimation() {
  return (
    <div className={styles.solarAnim}>
      {/* SUN */}
      <div className={styles.sunCore}>
        <div className={styles.sunInner}>
          <Sun size={32} strokeWidth={1.5} style={{ color: '#fff' }} />
        </div>
        <div className={styles.sunRing1} />
        <div className={styles.sunRing2} />
        <div className={styles.sunRing3} />
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.sunRay}
            style={{ transform: `rotate(${i * 45}deg)` }} />
        ))}
      </div>

      {/* HOUSE */}
      <div className={styles.house}>
        <img src="/house.png" alt="Solar House" className={styles.houseImg} />
      </div>

      {/* FLOATING CARDS */}
      <motion.div className={styles.floatCard1}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <div className={styles.floatCardIcon}><Zap size={14} /></div>
        <div>
          <div className={styles.floatCardVal}>₹2,400</div>
          <div className={styles.floatCardLabel}>Monthly Savings</div>
        </div>
      </motion.div>

      <motion.div className={styles.floatCard2}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        <div className={styles.floatCardIcon}><TrendingUp size={14} /></div>
        <div>
          <div className={styles.floatCardVal}>18%</div>
          <div className={styles.floatCardLabel}>Annual ROI</div>
        </div>
      </motion.div>

      <motion.div className={styles.floatCard3}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        <div className={styles.floatCardIcon}><Sun size={14} /></div>
        <div>
          <div className={styles.floatCardVal}>5 kW</div>
          <div className={styles.floatCardLabel}>Recommended</div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Home({ showPage }) {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div className={styles.heroLeft}
            initial="hidden" animate="show" variants={fadeLeft}>
            <div className={styles.heroBadge}>
              <span className="badge">
                <span className="badge-dot" />
                India's Smartest Solar Platform
              </span>
            </div>
            <h1 className={styles.h1}>
              The Smartest<br />
              Way to Sell<br />
              <span className={styles.gradText}>Solar Energy</span>
            </h1>
            <p className={styles.heroSub}>
              The all-in-one AI platform that helps solar companies convert more customers —
              with smart calculators, AI assistant, and beautiful white-label branding.
            </p>
            <div className={styles.heroBtns}>
              <button className="btn-primary" onClick={() => showPage('calculator')}>
                <Calculator size={16} /> Try the Calculator
              </button>
              <button className="btn-outline" onClick={() => showPage('contact')}>
                Get Started Free <ChevronRight size={15} />
              </button>
            </div>
            <div className={styles.heroTrust}>
              {[
                { v: '500+', l: 'Companies' },
                { v: 'AI',   l: 'Powered'   },
                { v: 'Free', l: 'To Try'    },
              ].map((s, i) => (
                <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  {i > 0 && <div className={styles.trustDivider} />}
                  <div className={styles.trustStat}>
                    <div className={styles.trustVal}>{s.v}</div>
                    <div className={styles.trustLabel}>{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.heroRight}
            initial="hidden" animate="show" variants={fadeRight}>
            <SolarAnimation />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <motion.div className={styles.statsStrip}
        initial="hidden" whileInView="show" variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}>
        <div className={styles.statsInner}>
          {STATS.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </motion.div>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <motion.div className={styles.sectionHead}
            initial="hidden" whileInView="show" variants={fadeUp}
            viewport={{ once: true, amount: 0.3 }}>
            <div className="section-label">How It Works</div>
            <h2 className={styles.sectionTitle}>From Calculation to<br />Installation in 4 Steps</h2>
            <p className={styles.sectionSub}>A seamless journey that converts curious visitors into happy solar customers.</p>
          </motion.div>
          <div className={styles.stepsGrid}>
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.step} className={styles.stepCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}>
                <div className={styles.stepNum}>{step.step}</div>
                <div className={styles.stepIconWrap}>
                  <step.Icon size={22} strokeWidth={1.5} style={{ color: step.color }} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className={styles.stepArrow}><ArrowRight size={16} /></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.featSection}>
        <div className={styles.featInner}>
          <motion.div className={styles.sectionHead}
            initial="hidden" whileInView="show" variants={fadeUp}
            viewport={{ once: true, amount: 0.3 }}>
            <div className="section-label">Platform Features</div>
            <h2 className={styles.sectionTitle}>Everything Your Customers<br />Need In One Place</h2>
            <p className={styles.sectionSub}>Give your customers a powerful AI tool to calculate savings, compare panels and book consultations.</p>
          </motion.div>
          <div className={styles.featGrid}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} className={styles.featCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                onClick={() => showPage(f.page)}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div className={styles.featIconWrap}>
                  <f.Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
                <div className={styles.featLink}>{f.cta} <ArrowRight size={14} /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSIDY ── */}
      <motion.section className={styles.subsidySection}
        initial="hidden" whileInView="show" variants={fadeUp}
        viewport={{ once: true, amount: 0.2 }}>
        <div className={styles.subsidyInner}>
          <div className={styles.subsidyLeft}>
            <div className={styles.subsidyTag}>Government Scheme · 2024</div>
            <h2 className={styles.subsidyTitle}>Government Subsidy<br />Made Simple</h2>
            <p className={styles.subsidySub}>
              SolarSync automatically shows your customers the latest{' '}
              <strong>PM Surya Ghar subsidies</strong> — up to ₹78,000 on 3kW systems.
              Real-time and always up to date.
            </p>
            <div className={styles.subsidyList}>
              {[
                'Auto-calculates subsidy for each customer',
                'Covers all Indian states and DISCOMs',
                'Updated with every government revision',
              ].map(item => (
                <div key={item} className={styles.subsidyItem}>
                  <CheckCircle size={15} style={{ color: 'var(--green-dark)', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => showPage('calculator')}>
              Check Eligibility <ChevronRight size={15} />
            </button>
          </div>
          <div className={styles.subsidyRight}>
            <div className={styles.subsidyCard}>
              <div className={styles.subsidyCardLabel}>Max Subsidy Available</div>
              <div className={styles.subsidyAmt}>₹78,000</div>
              <div className={styles.subsidyCardSub}>On 3kW System</div>
              <div className={styles.subsidyBreakdown}>
                {[
                  { kw: '1 kW', amt: '₹30,000' },
                  { kw: '2 kW', amt: '₹60,000' },
                  { kw: '3 kW', amt: '₹78,000' },
                ].map(s => (
                  <div key={s.kw} className={styles.subsidyRow}>
                    <span>{s.kw}</span>
                    <span style={{ color: '#00ed64', fontWeight: 600 }}>{s.amt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── WHY SOLARSYNC ── */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <motion.div className={styles.sectionHead}
            initial="hidden" whileInView="show" variants={fadeUp}
            viewport={{ once: true, amount: 0.3 }}>
            <div className="section-label">Why SolarSync</div>
            <h2 className={styles.sectionTitle}>Built for Solar<br />Companies Like Yours</h2>
            <p className={styles.sectionSub}>Everything you need to run a modern solar business — in one platform.</p>
          </motion.div>
          <div className={styles.whyGrid}>
            {WHY.map((w, i) => (
              <motion.div key={w.title} className={styles.whyCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className={styles.whyIconWrap}>
                  <w.Icon size={20} strokeWidth={1.5} />
                </div>
                <h4 className={styles.whyTitle}>{w.title}</h4>
                <p className={styles.whyDesc}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testSection}>
        <div className={styles.testInner}>
          <motion.div className={styles.sectionHead}
            initial="hidden" whileInView="show" variants={fadeUp}
            viewport={{ once: true, amount: 0.3 }}>
            <div className="section-label">Success Stories</div>
            <h2 className={styles.sectionTitle}>Loved by Solar<br />Companies Across India</h2>
          </motion.div>
          <div className={styles.testGrid}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} className={styles.testCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}>
                <div className={styles.testStars}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} style={{ color: '#00684a', fill: '#00684a' }} />
                  ))}
                </div>
                <p className={styles.testText}>"{t.text}"</p>
                <div className={styles.testAuthor}>
                  <div className={styles.testAvatar}>{t.name[0]}</div>
                  <div>
                    <div className={styles.testName}>{t.name}</div>
                    <div className={styles.testLocation}>{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section className={styles.ctaSection}
        initial="hidden" whileInView="show" variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow} />
          <h2 className={styles.ctaTitle}>Ready to Grow Your<br />Solar Business?</h2>
          <p className={styles.ctaSub}>
            Get SolarSync for your company and start converting more customers today.
            Free to get started — no credit card required.
          </p>
          <div className={styles.ctaBtns}>
            <button className="btn-primary" onClick={() => showPage('contact')}>
              Get Started Free <ArrowRight size={15} />
            </button>
            <button className="btn-outline" onClick={() => showPage('calculator')}>
              <Calculator size={15} /> Try the Calculator
            </button>
          </div>
        </div>
      </motion.section>

    </div>
  )
}