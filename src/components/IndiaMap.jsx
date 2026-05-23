import { motion } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'
import styles from './IndiaMap.module.css'

const CITIES = [
  { name: 'Delhi',      x: 44, y: 26, size: 'lg' },
  { name: 'Mumbai',     x: 27, y: 55, size: 'lg' },
  { name: 'Bangalore',  x: 38, y: 73, size: 'lg' },
  { name: 'Chennai',    x: 46, y: 76, size: 'md' },
  { name: 'Hyderabad',  x: 42, y: 64, size: 'md' },
  { name: 'Ahmedabad',  x: 24, y: 44, size: 'md' },
  { name: 'Pune',       x: 29, y: 58, size: 'md' },
  { name: 'Jaipur',     x: 36, y: 32, size: 'sm' },
  { name: 'Lucknow',    x: 52, y: 32, size: 'sm' },
  { name: 'Indore',     x: 35, y: 48, size: 'sm' },
  { name: 'Surat',      x: 25, y: 50, size: 'sm' },
  { name: 'Kolkata',    x: 65, y: 45, size: 'sm' },
  { name: 'Bhopal',     x: 38, y: 46, size: 'sm' },
  { name: 'Kochi',      x: 35, y: 83, size: 'sm' },
  { name: 'Nagpur',     x: 44, y: 52, size: 'sm' },
]

const STATS = [
  { val: 4500, suffix: '+',  label: 'Installations' },
  { val: 75,   suffix: '+',  label: 'Cities'         },
  { val: 22,   suffix: '',   label: 'States'          },
  { val: 3,    suffix: 'GW+',label: 'Capacity'        },
]

function StatCount({ val, suffix, label }) {
  const { count, ref } = useCounter(val, 2000)
  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.statVal}>{count}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

/* Solar Panel Icon SVG */
function SolarPanelIcon({ size }) {
  const s = size === 'lg' ? 18 : size === 'md' ? 14 : 10
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {/* Panel grid */}
      <rect x="1" y="4" width="22" height="14" rx="1" fill="rgba(0,104,74,0.15)" stroke="#00684a" strokeWidth="1.5"/>
      {/* Horizontal lines */}
      <line x1="1" y1="9" x2="23" y2="9" stroke="#00684a" strokeWidth="1"/>
      <line x1="1" y1="14" x2="23" y2="14" stroke="#00684a" strokeWidth="1"/>
      {/* Vertical lines */}
      <line x1="8" y1="4" x2="8" y2="18" stroke="#00684a" strokeWidth="1"/>
      <line x1="16" y1="4" x2="16" y2="18" stroke="#00684a" strokeWidth="1"/>
      {/* Stand */}
      <line x1="12" y1="18" x2="12" y2="22" stroke="#00684a" strokeWidth="1.5"/>
      <line x1="8" y1="22" x2="16" y2="22" stroke="#00684a" strokeWidth="1.5"/>
    </svg>
  )
}

export default function IndiaMap() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div className={styles.head}
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }}
          transition={{ duration:0.7 }}>
          <div className="section-label">Pan India Presence</div>
          <h2 className={styles.title}>Powering Solar Across<br />Every Corner of India</h2>
          <p className={styles.sub}>From Kashmir to Kanyakumari — SolarSync is helping solar companies reach more customers across India.</p>
        </motion.div>

        {/* STATS */}
        <motion.div className={styles.statsRow}
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.2 }}>
          {STATS.map(s => <StatCount key={s.label} {...s} />)}
        </motion.div>

        {/* MAP */}
        <motion.div className={styles.mapWrap}
          initial={{ opacity:0, scale:0.95 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true, amount:0.2 }}
          transition={{ duration:0.8, delay:0.3 }}>

          {/* REAL INDIA SVG MAP */}
          <svg
            viewBox="0 0 400 450"
            className={styles.mapSvg}
            xmlns="http://www.w3.org/2000/svg">

            <defs>
              <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,237,100,0.08)"/>
                <stop offset="100%" stopColor="rgba(0,237,100,0.02)"/>
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* INDIA MAP PATH - accurate outline */}
            <path
              d="M160,10 L170,8 L185,10 L200,8 L215,12 L225,10 L240,15 L248,12 L255,18 L260,25 
                 L265,20 L272,22 L278,28 L282,35 L285,30 L292,32 L295,40 L290,48 L295,52 
                 L298,58 L295,65 L300,70 L298,78 L292,82 L295,88 L290,95 L285,100 
                 L288,108 L285,115 L280,120 L275,128 L270,135 L265,142 L260,150 
                 L255,158 L250,165 L245,172 L240,180 L235,188 L228,195 L222,202 
                 L215,208 L208,215 L200,222 L192,228 L185,235 L178,240 L170,245 
                 L162,248 L155,252 L148,255 L140,258 L132,255 L125,250 L118,245 
                 L112,238 L106,230 L100,222 L95,214 L90,206 L85,198 L80,190 
                 L76,182 L72,174 L68,165 L65,156 L62,147 L60,138 L58,128 
                 L56,118 L55,108 L54,98 L56,88 L58,78 L62,68 L58,60 
                 L55,52 L58,44 L64,38 L70,32 L78,27 L88,22 L98,18 
                 L108,15 L118,12 L130,10 L142,9 L152,10 Z
                 M155,252 L160,260 L162,270 L158,280 L152,288 L145,295 
                 L140,302 L135,308 L130,315 L125,322 L118,328 L112,332 
                 L105,335 L98,330 L95,322 L98,314 L102,306 L108,298 
                 L112,290 L116,282 L120,274 L124,266 L128,260 L132,255 Z
                 M240,15 L250,12 L258,8 L265,10 L270,15 L265,20 L258,18 L250,18 Z
                 M292,32 L300,28 L308,30 L315,35 L318,42 L312,46 L305,44 L298,40 Z
                 M295,88 L305,85 L315,88 L320,95 L315,102 L308,100 L300,95 Z"
              fill="url(#mapGrad)"
              stroke="rgba(0,104,74,0.3)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* STATE DIVIDERS - subtle lines */}
            <path d="M160,80 L200,75 L240,80" stroke="rgba(0,104,74,0.1)" strokeWidth="0.5" fill="none"/>
            <path d="M120,130 L200,125 L270,130" stroke="rgba(0,104,74,0.1)" strokeWidth="0.5" fill="none"/>
            <path d="M100,180 L200,175 L285,180" stroke="rgba(0,104,74,0.1)" strokeWidth="0.5" fill="none"/>
            <path d="M90,230 L200,225 L280,230" stroke="rgba(0,104,74,0.1)" strokeWidth="0.5" fill="none"/>

            {/* SOLAR PANEL MARKERS */}
            {CITIES.map((city, i) => {
              const cx = (city.x / 100) * 400
              const cy = (city.y / 100) * 450
              const panelSize = city.size === 'lg' ? 12 : city.size === 'md' ? 9 : 7

              return (
                <g key={city.name} filter="url(#glow)">
                  {/* Glow circle */}
                  <circle cx={cx} cy={cy} r={panelSize * 2}
                    fill="rgba(0,237,100,0.08)"
                    className={styles.glowCircle}
                    style={{ animationDelay: `${i * 0.25}s` }}/>

                  {/* Solar Panel */}
                  <g transform={`translate(${cx - panelSize}, ${cy - panelSize * 0.8})`}>
                    {/* Panel body */}
                    <rect width={panelSize * 2} height={panelSize * 1.4}
                      rx="1" fill="rgba(0,104,74,0.12)" stroke="#00684a" strokeWidth="0.8"/>
                    {/* Grid lines horizontal */}
                    <line x1="0" y1={panelSize * 0.47} x2={panelSize * 2} y2={panelSize * 0.47}
                      stroke="#00684a" strokeWidth="0.5"/>
                    <line x1="0" y1={panelSize * 0.93} x2={panelSize * 2} y2={panelSize * 0.93}
                      stroke="#00684a" strokeWidth="0.5"/>
                    {/* Grid lines vertical */}
                    <line x1={panelSize * 0.67} y1="0" x2={panelSize * 0.67} y2={panelSize * 1.4}
                      stroke="#00684a" strokeWidth="0.5"/>
                    <line x1={panelSize * 1.33} y1="0" x2={panelSize * 1.33} y2={panelSize * 1.4}
                      stroke="#00684a" strokeWidth="0.5"/>
                    {/* Stand */}
                    <line x1={panelSize} y1={panelSize * 1.4} x2={panelSize} y2={panelSize * 1.8}
                      stroke="#00684a" strokeWidth="0.8"/>
                    <line x1={panelSize * 0.5} y1={panelSize * 1.8} x2={panelSize * 1.5} y2={panelSize * 1.8}
                      stroke="#00684a" strokeWidth="0.8"/>
                  </g>

                  {/* Pulse ring */}
                  <circle cx={cx} cy={cy} r={panelSize * 1.5}
                    fill="none" stroke="#00684a" strokeWidth="0.5"
                    className={styles.pulseRing}
                    style={{ animationDelay: `${i * 0.25}s` }}/>
                </g>
              )
            })}
          </svg>

          {/* CITY TOOLTIPS */}
          {CITIES.filter(c => c.size === 'lg').map((city, i) => (
            <motion.div key={city.name} className={styles.cityLabel}
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
              initial={{ opacity:0, y:10 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: 0.8 + i * 0.15 }}>
              {city.name}
            </motion.div>
          ))}

          <div className={styles.mapGlow}/>
        </motion.div>

        {/* LEGEND */}
        <motion.div className={styles.legend}
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ delay:0.5 }}>
          <div className={styles.legendItem}>
            <div className={styles.legendDotLg}/>
            <span>Major Hub (5000+ installs)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendDotMd}/>
            <span>Growing City (2000+ installs)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendDotSm}/>
            <span>Active Market (500+ installs)</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}