import { motion } from 'framer-motion'
import { Calculator, Cpu, BarChart3, MessageSquare, ChevronRight, Shield, Award, Users, Zap } from 'lucide-react'
import styles from './Home.module.css'
import SolarSun from '../components/SolarSun'
import { useCounter } from '../hooks/useCounter'

const fade = { hidden:{opacity:0,y:28}, show:{opacity:1,y:0,transition:{duration:0.5,ease:[0.4,0,0.2,1]}} }
const stagger = { show:{ transition:{ staggerChildren:0.1 } } }

const STATS = [
  { val:'500',  suffix:'+', label:'Solar Companies',      isText:false },
  { val:'50000',suffix:'K+',label:'End Customers Served', isText:false },
  { val:'AI',   suffix:'',  label:'Powered Platform',     isText:true  },
  { val:'Free', suffix:'',  label:'To Get Started',       isText:true  },
]

const FEATURES = [
  { Icon:Calculator,    title:'Smart Solar Calculator', desc:'Customers enter rooftop size, consumption and appliances. AI instantly recommends the perfect system size, cost, ROI and payback period.', cta:'Calculate savings', page:'calculator' },
  { Icon:Cpu,           title:'AI Bill Analyzer',       desc:'Customers upload their electricity bill. AI extracts consumption data and generates a precise personalised solar recommendation.', cta:'Analyze my bill', page:'calculator' },
  { Icon:BarChart3,     title:'Solar Setup Explorer',   desc:'Compare Mono PERC, Bifacial and Poly panels. Explore packages, efficiency ratings, lifespan and government subsidy benefits.', cta:'Explore panels', page:'explorer' },
  { Icon:MessageSquare, title:'AI Solar Assistant',     desc:'Ask anything about solar — subsidies, net metering, EMI options, maintenance. Available in Hindi and English, 24/7.', cta:'Start chatting', page:'assistant' },
]

const WHY = [
  { Icon:Shield,  title:'White Label Ready', desc:'Any solar company can brand the platform with their own logo, colors, contact details and content in minutes.' },
  { Icon:Award,   title:'AI Powered',        desc:'Smart calculator, bill analyzer and AI assistant built in — no extra setup or technical knowledge needed.' },
  { Icon:Users,   title:'Customer Friendly', desc:'Simple, clean UI that any homeowner can use easily. Designed to convert visitors into leads.' },
  { Icon:Zap,     title:'Quick Setup',       desc:'Get your fully branded solar platform live in less than 24 hours. No coding required.' },
]

function StatItem({ val, suffix, label, isText }) {
  const { count, ref } = useCounter(isText ? 0 : parseInt(val), 2000)
  return (
    <div ref={ref} className={styles.statItem}>
      <div className={styles.statVal}>
        {isText ? val : `${count}${suffix}`}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

export default function Home({ showPage }) {
  return (
    <motion.div initial="hidden" animate="show" variants={stagger}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <motion.div variants={fade}>

            {/* ANIMATED SUN */}
            <SolarSun />

            <div className={styles.heroBadge}>
              <span className="badge">
                <span className="badge-dot" />
                Smart Solar Platform for Every Company
              </span>
            </div>

            <h1 className={styles.h1}>
              The Smartest<br />
              Way to Sell<br />
              <span className="gradient-text">Solar Energy</span>
            </h1>

            <p className={styles.heroSub}>
              The all-in-one solar platform that helps your customers calculate savings,
              compare panels, understand subsidies and connect with your team —
              all under your brand.
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
                { v:'500+', l:'Companies' },
                { v:'AI',   l:'Powered'   },
                { v:'Free', l:'To Try'    },
              ].map((s, i) => (
                <div key={s.l} style={{ display:'flex', alignItems:'center', gap:20 }}>
                  {i > 0 && <div className={styles.trustDivider} />}
                  <div className={styles.trustStat}>
                    <div className={styles.trustVal}>{s.v}</div>
                    <div className={styles.trustLabel}>{s.l}</div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <motion.div className={styles.statsStrip} variants={fade}>
        <div className={styles.statsInner}>
          {STATS.map(s => (
            <StatItem
              key={s.label}
              val={s.val}
              suffix={s.suffix}
              label={s.label}
              isText={s.isText}
            />
          ))}
        </div>
      </motion.div>

      {/* FEATURES */}
      <motion.section className={styles.featSection} variants={fade}>
        <div className={styles.featInner}>
          <div className={styles.featHeader}>
            <div>
              <div className="section-label">Platform Features</div>
              <h2 className="section-title">Everything Your Customers<br />Need In One Place</h2>
            </div>
            <p className="section-sub">
              Give your customers a powerful AI tool to calculate savings, compare panels
              and book consultations — all under your brand.
            </p>
          </div>
          <div className={styles.featGrid}>
            {FEATURES.map(f => (
              <motion.div key={f.title} className={styles.featCard}
                onClick={() => showPage(f.page)} whileHover={{ y:-2 }}
                transition={{ type:'spring', stiffness:300, damping:20 }}>
                <div className={styles.featIcon}><f.Icon size={24} strokeWidth={1.5} /></div>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
                <div className={styles.featArrow}>{f.cta} <ChevronRight size={13} /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SUBSIDY BANNER */}
      <motion.section variants={fade}>
        <div className={styles.subsidySection}>
          <div className={styles.subsidyCard}>
            <div className={styles.subsidyLeft}>
              <div className={styles.subsidyLabel}>Government Scheme · 2024</div>
              <h3 className={styles.subsidyTitle}>Government Subsidy Made Simple</h3>
              <p className={styles.subsidySub}>
                SolarSync automatically shows your customers the latest{' '}
                <strong>PM Surya Ghar subsidies</strong> — up to ₹78,000 on 3kW systems.
                Real-time, accurate and always up to date.
              </p>
              <button className="btn-primary" style={{ marginTop:24 }} onClick={() => showPage('calculator')}>
                Check Eligibility <ChevronRight size={15} />
              </button>
            </div>
            <div className={styles.subsidyRight}>
              <div className={styles.subsidyAmt}>₹78K</div>
              <div className={styles.subsidyAmtSub}>Max Subsidy Available</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* WHY SOLARSYNC */}
      <motion.section className={styles.whySection} variants={fade}>
        <div className={styles.whyInner}>
          <div className="section-label">Why SolarSync</div>
          <h2 className="section-title">Built for Solar<br />Companies Like Yours</h2>
          <div className={styles.whyGrid}>
            {WHY.map(w => (
              <div key={w.title} className={styles.whyCard}>
                <div className={styles.whyIconWrap}><w.Icon size={20} strokeWidth={1.5} /></div>
                <h4 className={styles.whyTitle}>{w.title}</h4>
                <p className={styles.whyDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section className={styles.ctaSection} variants={fade}>
        <div className={styles.ctaBg}>
          <h2 className={styles.ctaTitle}>Ready to Grow Your Solar Business?</h2>
          <p className={styles.ctaSub}>
            Get SolarSync for your company and start converting more customers today.
            Free to get started — no credit card required.
          </p>
          <div className={styles.ctaBtns}>
            <button className="btn-primary" onClick={() => showPage('contact')}>
              Get Started Free
            </button>
            <button className="btn-outline" onClick={() => showPage('calculator')}>
              <Calculator size={15} /> Try the Calculator
            </button>
          </div>
        </div>
      </motion.section>

    </motion.div>
  )
}