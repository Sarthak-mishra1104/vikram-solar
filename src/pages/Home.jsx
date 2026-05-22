import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Calculator, Cpu, BarChart3, MessageSquare, ChevronRight, Shield, Award, Users, Zap, Sun, Battery, TrendingUp, CheckCircle, ArrowRight, Star, Phone } from 'lucide-react'
import styles from './Home.module.css'
import { useCounter } from '../hooks/useCounter'

const fadeUp = { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }
const fadeLeft = { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }
const fadeRight = { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }

const STATS = [
  { val: '500',   suffix: '+',  label: 'Solar Companies',      isText: false },
  { val: '50000', suffix: 'K+', label: 'End Customers Served', isText: false },
  { val: 'AI',    suffix: '',   label: 'Powered Platform',     isText: true  },
  { val: 'Free',  suffix: '',   label: 'To Get Started',       isText: true  },
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

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'how',  label: 'How It Works' },
  { id: 'feat', label: 'Features' },
  { id: 'why',  label: 'Why Us' },
  { id: 'test', label: 'Stories' },
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
      <div className={styles.sunCore}>
        <div className={styles.sunInner}>
          <Sun size={32} strokeWidth={1.5} style={{ color: '#fff' }} />
        </div>
        <div className={styles.sunRing1} />
        <div className={styles.sunRing2} />
        <div className={styles.sunRing3} />
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.sunRay} style={{ transform: `rotate(${i * 45}deg)` }} />
        ))}
      </div>
      <div className={styles.house}>
        <img src="/house.png" alt="Solar House" className={styles.houseImg} />
      </div>
      <motion.div className={styles.floatCard1}
        animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <div className={styles.floatCardIcon}><Zap size={14} /></div>
        <div>
          <div className={styles.floatCardVal}>₹2,400</div>
          <div className={styles.floatCardLabel}>Monthly Savings</div>
        </div>
      </motion.div>
      <motion.div className={styles.floatCard2}
        animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        <div className={styles.floatCardIcon}><TrendingUp size={14} /></div>
        <div>
          <div className={styles.floatCardVal}>18%</div>
          <div className={styles.floatCardLabel}>Annual ROI</div>
        </div>
      </motion.div>
      <motion.div className={styles.floatCard3}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        <div className={styles.floatCardIcon}><Sun size={14} /></div>
        <div>
          <div className={styles.floatCardVal}>5 kW</div>
          <div className={styles.floatCardLabel}>Recommended</div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── SCROLL PROGRESS DOTS ── */
function ScrollDots() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id))
      const scrollY = window.scrollY + window.innerHeight / 2
      sections.forEach((sec, i) => {
        if (sec && sec.offsetTop <= scrollY) setActive(i)
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.scrollDots}>
      {SECTIONS.map((s, i) => (
        <div key={s.id} className={styles.dotWrap} onClick={() => scrollTo(s.id)}>
          <div className={`${styles.dot} ${active === i ? styles.dotActive : ''}`} />
          <div className={styles.dotLabel}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/* ── CSS ILLUSTRATIONS ── */
function CalcIllustration() {
  return (
    <div className={styles.illus}>
      <div className={styles.illusCard}>
        <div className={styles.illusCardHead}>
          <div className={styles.illusDot} style={{background:'#ff5f57'}}/>
          <div className={styles.illusDot} style={{background:'#febc2e'}}/>
          <div className={styles.illusDot} style={{background:'#28c840'}}/>
          <div style={{marginLeft:'auto',fontSize:11,color:'var(--muted)'}}>AI Calculator</div>
        </div>
        <div className={styles.illusRow}>
          <div className={styles.illusLabel}>Rooftop Size</div>
          <div className={styles.illusBar}><div className={styles.illusBarFill} style={{width:'70%'}}/></div>
        </div>
        <div className={styles.illusRow}>
          <div className={styles.illusLabel}>Monthly Bill</div>
          <div className={styles.illusBar}><div className={styles.illusBarFill} style={{width:'50%'}}/></div>
        </div>
        <div className={styles.illusRow}>
          <div className={styles.illusLabel}>Units/Month</div>
          <div className={styles.illusBar}><div className={styles.illusBarFill} style={{width:'60%'}}/></div>
        </div>
        <div className={styles.illusResult}>
          <div>
            <div className={styles.illusResultLabel}>Recommended</div>
            <div className={styles.illusResultVal}>5 kW System</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div className={styles.illusResultLabel}>Monthly Savings</div>
            <div className={styles.illusResultVal} style={{color:'var(--green-dark)'}}>₹2,400</div>
          </div>
        </div>
      </div>
      <motion.div className={styles.illusBadge}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        <CheckCircle size={14} style={{color:'var(--green-dark)'}}/>
        <span>ROI: 18% per year</span>
      </motion.div>
    </div>
  )
}

function PanelIllustration() {
  return (
    <div className={styles.illus}>
      <div className={styles.panelGrid}>
        {[
          { name: 'Mono PERC', eff: '22–24%', cost: '₹28–35/W', color: '#00684a', w: 85 },
          { name: 'Bifacial',  eff: '24–27%', cost: '₹38–48/W', color: '#00ed64', w: 100 },
          { name: 'Poly',      eff: '15–18%', cost: '₹22–28/W', color: '#a3d9a5', w: 65 },
        ].map((p, i) => (
          <motion.div key={p.name} className={styles.panelItem}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}>
            <div className={styles.panelItemHead}>
              <span className={styles.panelItemName}>{p.name}</span>
              <span className={styles.panelItemEff} style={{color: p.color}}>{p.eff}</span>
            </div>
            <div className={styles.panelBar}>
              <motion.div className={styles.panelBarFill}
                initial={{ width: 0 }}
                whileInView={{ width: `${p.w}%` }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true }}
                style={{ background: p.color }} />
            </div>
            <div className={styles.panelItemCost}>{p.cost}</div>
          </motion.div>
        ))}
      </div>
      <motion.div className={styles.illusBadge}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
        <Star size={14} style={{color:'var(--green-dark)', fill:'var(--green-dark)'}}/>
        <span>MNRE Certified Panels</span>
      </motion.div>
    </div>
  )
}

function ChatIllustration() {
  return (
    <div className={styles.illus}>
      <div className={styles.chatBox}>
        <div className={styles.chatHead}>
          <div className={styles.chatAvatar}><Sun size={14}/></div>
          <div>
            <div className={styles.chatName}>SolarSync AI</div>
            <div className={styles.chatStatus}><span className={styles.chatOnline}/>Online</div>
          </div>
        </div>
        {[
          { me: false, text: 'सोलर पर कितनी सब्सिडी मिलती है?' },
          { me: true,  text: 'PM Surya Ghar scheme में 3kW पर ₹78,000 subsidy मिलती है!' },
          { me: false, text: 'What is the payback period?' },
          { me: true,  text: 'Typically 4–6 years after subsidy. Then 20+ years of free electricity!' },
        ].map((m, i) => (
          <motion.div key={i} className={`${styles.chatMsg} ${m.me ? styles.chatMe : styles.chatBot}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}>
            {m.text}
          </motion.div>
        ))}
      </div>
      <motion.div className={styles.illusBadge}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        <MessageSquare size={14} style={{color:'var(--green-dark)'}}/>
        <span>Hindi + English Support</span>
      </motion.div>
    </div>
  )
}

function SubsidyIllustration() {
  return (
    <div className={styles.illus}>
      <div className={styles.subsidyCard2}>
        <div className={styles.subsidyCard2Head}>Government Subsidy</div>
        {[
          { kw: '1 kW', gross: '₹65,000', sub: '₹30,000', net: '₹35,000' },
          { kw: '2 kW', gross: '₹1,30,000', sub: '₹60,000', net: '₹70,000' },
          { kw: '3 kW', gross: '₹1,95,000', sub: '₹78,000', net: '₹1,17,000', star: true },
        ].map((r, i) => (
          <motion.div key={r.kw}
            className={`${styles.subsidyCard2Row} ${r.star ? styles.subsidyCard2Star : ''}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}>
            <span className={styles.subsidyCard2Kw}>{r.kw} {r.star ? '⭐' : ''}</span>
            <span className={styles.subsidyCard2Sub} style={{color:'#00684a'}}>−{r.sub}</span>
            <span className={styles.subsidyCard2Net}>{r.net}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className={styles.illusBadge}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        <CheckCircle size={14} style={{color:'var(--green-dark)'}}/>
        <span>Auto-updated subsidies</span>
      </motion.div>
    </div>
  )
}

const JOURNEY = [
  {
    num: '01',
    title: 'Smart Solar Calculator',
    sub: 'Calculate in seconds',
    desc: 'Enter rooftop size, monthly bill and appliances. Our AI instantly calculates the perfect system size, exact cost, ROI and payback period. No guesswork — just accurate data.',
    points: ['Rooftop size analysis', 'Appliance-based recommendation', 'ROI & payback calculation'],
    Illus: CalcIllustration,
    flip: false,
  },
  {
    num: '02',
    title: 'Solar Panel Explorer',
    sub: 'Compare & choose',
    desc: 'Browse and compare Mono PERC, Bifacial N-Type and Polycrystalline panels. See efficiency ratings, lifespan, cost per watt and find the perfect panel for every rooftop.',
    points: ['4 panel types compared', 'Efficiency & cost breakdown', 'MNRE certified options'],
    Illus: PanelIllustration,
    flip: true,
  },
  {
    num: '03',
    title: 'AI Solar Assistant',
    sub: 'Ask anything, anytime',
    desc: 'Our AI assistant answers every solar question in Hindi and English — government subsidies, net metering, EMI options, maintenance tips and savings estimates. Available 24/7.',
    points: ['Hindi + English support', 'Subsidy & scheme queries', 'EMI & financing guidance'],
    Illus: ChatIllustration,
    flip: false,
  },
  {
    num: '04',
    title: 'Subsidy Calculator',
    sub: 'Maximize government benefits',
    desc: 'SolarSync automatically calculates the exact PM Surya Ghar subsidy for every customer. Up to ₹78,000 on 3kW systems. Always accurate, always up to date.',
    points: ['PM Surya Ghar scheme', 'State-wise DISCOM data', 'Net cost after subsidy'],
    Illus: SubsidyIllustration,
    flip: true,
  },
]

export default function Home({ showPage }) {
  return (
    <div className={styles.page}>
      <ScrollDots />

      {/* ── HERO ── */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div className={styles.heroLeft}
            initial="hidden" animate="show" variants={fadeLeft}>
            <div className={styles.heroBadge}>
              <span className="badge"><span className="badge-dot" />India's Smartest Solar Platform</span>
            </div>
            <h1 className={styles.h1}>
              The Smartest<br />Way to Sell<br />
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
              {[{ v:'500+',l:'Companies'},{v:'AI',l:'Powered'},{v:'Free',l:'To Try'}].map((s,i)=>(
                <div key={s.l} style={{display:'flex',alignItems:'center',gap:20}}>
                  {i>0&&<div className={styles.trustDivider}/>}
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
        initial="hidden" whileInView="show" variants={fadeUp} viewport={{once:true,amount:0.3}}>
        <div className={styles.statsInner}>
          {STATS.map(s=><StatItem key={s.label} {...s}/>)}
        </div>
      </motion.div>

      {/* ── JOURNEY (alternating sections) ── */}
      <section id="how" className={styles.journeySection}>
        <div className={styles.journeyInner}>
          <motion.div className={styles.sectionHead}
            initial="hidden" whileInView="show" variants={fadeUp} viewport={{once:true,amount:0.3}}>
            <div className="section-label">How It Works</div>
            <h2 className={styles.sectionTitle}>Everything Your Customer<br />Needs, In One Flow</h2>
            <p className={styles.sectionSub}>A seamless journey from curiosity to solar installation — powered by AI.</p>
          </motion.div>

          {/* VERTICAL TIMELINE LINE */}
          <div className={styles.timelineLine} />

          {JOURNEY.map((j, i) => (
            <div key={j.num} className={`${styles.journeyItem} ${j.flip ? styles.journeyFlip : ''}`}>
              {/* TIMELINE DOT */}
              <motion.div className={styles.timelineDot}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}>
                <div className={styles.timelineDotInner}>{j.num}</div>
              </motion.div>

              {/* TEXT */}
              <motion.div className={styles.journeyText}
                initial={{ opacity: 0, x: j.flip ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.4,0,0.2,1] }}>
                <div className={styles.journeyNum}>{j.num}</div>
                <div className={styles.journeySub}>{j.sub}</div>
                <h3 className={styles.journeyTitle}>{j.title}</h3>
                <p className={styles.journeyDesc}>{j.desc}</p>
                <div className={styles.journeyPoints}>
                  {j.points.map(p=>(
                    <div key={p} className={styles.journeyPoint}>
                      <CheckCircle size={14} style={{color:'var(--green-dark)',flexShrink:0}}/>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <button className={styles.journeyBtn} onClick={()=>showPage('calculator')}>
                  Try it now <ArrowRight size={14}/>
                </button>
              </motion.div>

              {/* ILLUSTRATION */}
              <motion.div className={styles.journeyIllus}
                initial={{ opacity: 0, x: j.flip ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.4,0,0.2,1] }}>
                <j.Illus />
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SOLARSYNC ── */}
      <section id="feat" className={styles.whySection}>
        <div className={styles.whyInner}>
          <motion.div className={styles.sectionHead}
            initial="hidden" whileInView="show" variants={fadeUp} viewport={{once:true,amount:0.3}}>
            <div className="section-label">Why SolarSync</div>
            <h2 className={styles.sectionTitle}>Built for Solar<br />Companies Like Yours</h2>
            <p className={styles.sectionSub}>Everything you need to run a modern solar business — in one platform.</p>
          </motion.div>
          <div className={styles.whyGrid}>
            {WHY.map((w,i)=>(
              <motion.div key={w.title} className={styles.whyCard}
                initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
                viewport={{once:true,amount:0.2}} transition={{duration:0.5,delay:i*0.1}}
                whileHover={{y:-4,transition:{duration:0.2}}}>
                <div className={styles.whyIconWrap}><w.Icon size={20} strokeWidth={1.5}/></div>
                <h4 className={styles.whyTitle}>{w.title}</h4>
                <p className={styles.whyDesc}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="test" className={styles.testSection}>
        <div className={styles.testInner}>
          <motion.div className={styles.sectionHead}
            initial="hidden" whileInView="show" variants={fadeUp} viewport={{once:true,amount:0.3}}>
            <div className="section-label">Success Stories</div>
            <h2 className={styles.sectionTitle}>Loved by Solar<br />Companies Across India</h2>
          </motion.div>
          <div className={styles.testGrid}>
            {TESTIMONIALS.map((t,i)=>(
              <motion.div key={t.name} className={styles.testCard}
                initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
                viewport={{once:true,amount:0.2}} transition={{duration:0.5,delay:i*0.12}}>
                <div className={styles.testStars}>
                  {[...Array(t.rating)].map((_,i)=>(
                    <Star key={i} size={14} style={{color:'#00684a',fill:'#00684a'}}/>
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
        initial="hidden" whileInView="show" variants={fadeUp} viewport={{once:true,amount:0.3}}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow}/>
          <h2 className={styles.ctaTitle}>Ready to Grow Your<br />Solar Business?</h2>
          <p className={styles.ctaSub}>
            Get SolarSync for your company and start converting more customers today.
            Free to get started — no credit card required.
          </p>
          <div className={styles.ctaBtns}>
            <button className="btn-primary" onClick={()=>showPage('contact')}>
              Get Started Free <ArrowRight size={15}/>
            </button>
            <button className="btn-outline" onClick={()=>showPage('calculator')}>
              <Calculator size={15}/> Try the Calculator
            </button>
          </div>
        </div>
      </motion.section>

    </div>
  )
}