import { motion } from 'framer-motion'
import { Calculator, Cpu, BarChart3, MessageSquare, ChevronRight, Shield, Award, Users, Zap } from 'lucide-react'
import styles from './Home.module.css'

const fade = { hidden:{opacity:0,y:28}, show:{opacity:1,y:0,transition:{duration:0.5,ease:[0.4,0,0.2,1]}} }
const stagger = { show:{ transition:{ staggerChildren:0.1 } } }

const STATS = [
  { val:'3 GW+',     label:'Installed Capacity'   },
  { val:'50K+',      label:'Happy Customers'      },
  { val:'22 States', label:'Pan India Network'    },
  { val:'18+ Years', label:'Industry Experience'  },
]
const FEATURES = [
  { Icon:Calculator,    title:'Smart Solar Calculator', desc:'Enter rooftop size, consumption and appliances. AI instantly recommends the perfect system size, cost, ROI and payback period.', cta:'Calculate savings', page:'calculator' },
  { Icon:Cpu,           title:'AI Bill Analyzer',        desc:'Upload your electricity bill. AI extracts consumption data and generates a precise personalised solar recommendation.', cta:'Analyze my bill', page:'calculator' },
  { Icon:BarChart3,     title:'Solar Setup Explorer',    desc:'Compare Mono PERC, Bifacial and Poly panels. Explore packages, efficiency ratings, lifespan and subsidy benefits.', cta:'Explore panels', page:'explorer' },
  { Icon:MessageSquare, title:'AI Solar Assistant',      desc:'Ask anything about solar — subsidies, net metering, EMI options, maintenance. Hindi and English, 24/7.', cta:'Start chatting', page:'assistant' },
]
const WHY = [
  { Icon:Shield,  title:'25-Year Warranty',   desc:'Industry-best product and performance warranty on all panel installations.' },
  { Icon:Award,   title:'MNRE Certified',     desc:'All systems certified by Ministry of New and Renewable Energy, India.' },
  { Icon:Users,   title:'50,000+ Customers',  desc:'Trusted by homes, societies and businesses across 22 Indian states.' },
  { Icon:Zap,     title:'Fast Installation',  desc:'Professional installation completed in 1–2 days with zero downtime.' },
]

export default function Home({ showPage }) {
  return (
    <motion.div initial="hidden" animate="show" variants={stagger}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <motion.div variants={fade}>
            <div className={styles.heroBadge}>
              <span className="badge"><span className="badge-dot" />India's #1 Solar Platform</span>
            </div>
            <h1 className={styles.h1}>
              Power Your<br />
              Home With<br />
              <span className="gradient-text">Clean Solar</span>
            </h1>
            <p className={styles.heroSub}>
              India's most trusted solar platform. Calculate savings, compare panels, and get expert installation — backed by 18 years of solar expertise.
            </p>
            <div className={styles.heroBtns}>
              <button className="btn-primary" onClick={() => showPage('calculator')}>
                <Calculator size={16} /> Calculate My Savings
              </button>
              <button className="btn-outline" onClick={() => showPage('contact')}>
                Free Consultation <ChevronRight size={15} />
              </button>
            </div>
            <div className={styles.heroTrust}>
              {[{v:'50K+',l:'Customers'},{v:'3GW+',l:'Installed'},{v:'25 Yr',l:'Warranty'}].map((s,i) => (
                <div key={s.l} style={{display:'flex',alignItems:'center',gap:20}}>
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
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statVal}>{s.val}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FEATURES */}
      <motion.section className={styles.featSection} variants={fade}>
        <div className={styles.featInner}>
          <div className={styles.featHeader}>
            <div>
              <div className="section-label">Platform Features</div>
              <h2 className="section-title">Everything You Need<br />To Go Solar</h2>
            </div>
            <p className="section-sub">From calculation to installation, our AI platform guides you through every step of your solar journey.</p>
          </div>
          <div className={styles.featGrid}>
            {FEATURES.map(f => (
              <motion.div key={f.title} className={styles.featCard}
                onClick={() => showPage(f.page)} whileHover={{ y:-2 }}
                transition={{ type:'spring',stiffness:300,damping:20 }}>
                <div className={styles.featIcon}><f.Icon size={24} strokeWidth={1.5} /></div>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
                <div className={styles.featArrow}>{f.cta} <ChevronRight size={13} /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SUBSIDY */}
      <motion.section variants={fade}>
        <div className={styles.subsidySection}>
          <div className={styles.subsidyCard}>
            <div className={styles.subsidyLeft}>
              <div className={styles.subsidyLabel}>Government Scheme · 2024</div>
              <h3 className={styles.subsidyTitle}>PM Surya Ghar Muft Bijli Yojana</h3>
              <p className={styles.subsidySub}>
                Get up to <strong>₹78,000 subsidy</strong> on a 3kW rooftop solar installation.
                MNRE approved scheme available across all Indian states.
                Apply at pmsuryaghar.gov.in
              </p>
              <button className="btn-primary" style={{marginTop:24}} onClick={() => showPage('calculator')}>
                Check My Eligibility <ChevronRight size={15} />
              </button>
            </div>
            <div className={styles.subsidyRight}>
              <div className={styles.subsidyAmt}>₹78K</div>
              <div className={styles.subsidyAmtSub}>Max Subsidy Available</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* WHY VIKRAM */}
      <motion.section className={styles.whySection} variants={fade}>
        <div className={styles.whyInner}>
          <div className="section-label">Why Vikram Solar</div>
          <h2 className="section-title">Trusted by 50,000+<br />Indian Homeowners</h2>
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

      {/* CTA */}
      <motion.section className={styles.ctaSection} variants={fade}>
        <div className={styles.ctaBg}>
          <h2 className={styles.ctaTitle}>Ready to Switch to Solar?</h2>
          <p className={styles.ctaSub}>Get a free rooftop assessment and customised quote from our certified solar experts.</p>
          <div className={styles.ctaBtns}>
            <button className="btn-primary" onClick={() => showPage('contact')}>
              Book Free Site Visit
            </button>
            <button className="btn-outline" onClick={() => showPage('calculator')}>
              <Calculator size={15} /> Use AI Calculator
            </button>
          </div>
        </div>
      </motion.section>

    </motion.div>
  )
}
