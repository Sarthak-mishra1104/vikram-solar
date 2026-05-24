import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'
import styles from './IndiaMap.module.css'

const CITIES = [
  { name: 'Delhi',       x: 42, y: 24, installs: '8,500+', size: 'lg' },
  { name: 'Mumbai',      x: 26, y: 52, installs: '7,200+', size: 'lg' },
  { name: 'Bangalore',   x: 36, y: 71, installs: '6,800+', size: 'lg' },
  { name: 'Chennai',     x: 44, y: 74, installs: '5,400+', size: 'md' },
  { name: 'Hyderabad',   x: 40, y: 62, installs: '5,100+', size: 'md' },
  { name: 'Ahmedabad',   x: 22, y: 42, installs: '4,800+', size: 'md' },
  { name: 'Pune',        x: 27, y: 55, installs: '4,200+', size: 'md' },
  { name: 'Jaipur',      x: 34, y: 30, installs: '3,900+', size: 'sm' },
  { name: 'Lucknow',     x: 50, y: 28, installs: '3,200+', size: 'sm' },
  { name: 'Indore',      x: 33, y: 44, installs: '2,800+', size: 'sm' },
  { name: 'Surat',       x: 23, y: 48, installs: '2,600+', size: 'sm' },
  { name: 'Kolkata',     x: 63, y: 42, installs: '2,400+', size: 'sm' },
  { name: 'Bhopal',      x: 36, y: 43, installs: '2,200+', size: 'sm' },
  { name: 'Kochi',       x: 33, y: 81, installs: '1,600+', size: 'sm' },
  { name: 'Nagpur',      x: 43, y: 50, installs: '1,500+', size: 'sm' },
]

const STATS = [
  { val: 4500, suffix: '+',   label: 'Installations' },
  { val: 75,   suffix: '+',   label: 'Cities'        },
  { val: 22,   suffix: '',    label: 'States'        },
  { val: 3,    suffix: 'GW+', label: 'Capacity'      },
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

function PanelMarker({ city, index }) {
  const [hovered, setHovered] = useState(false)
  const size = city.size === 'lg' ? 20 : city.size === 'md' ? 15 : 11

  return (
    <g
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Glow pulse */}
      <circle
        cx={city.x + '%'} cy={city.y + '%'}
        r={size * 0.8}
        fill="rgba(0,200,83,0.1)"
        className={styles.pulse}
        style={{ animationDelay: `${index * 0.3}s` }}
      />

      {/* Solar Panel */}
      <g transform={`translate(${city.x - size/2}%, ${city.y - size * 0.6}%)`}>
        {/* Panel frame */}
        <rect
          x="0" y="0"
          width={`${size}%`} height={`${size * 0.65}%`}
          rx="0.5%"
          fill={hovered ? 'rgba(0,104,74,0.25)' : 'rgba(0,104,74,0.12)'}
          stroke={hovered ? '#00c853' : '#00684a'}
          strokeWidth="0.4%"
          style={{ transition: 'all 0.2s' }}
        />
        {/* Horizontal grid */}
        <line x1="0" y1={`${size * 0.22}%`} x2={`${size}%`} y2={`${size * 0.22}%`}
          stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.3%"/>
        <line x1="0" y1={`${size * 0.43}%`} x2={`${size}%`} y2={`${size * 0.43}%`}
          stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.3%"/>
        {/* Vertical grid */}
        <line x1={`${size * 0.33}%`} y1="0" x2={`${size * 0.33}%`} y2={`${size * 0.65}%`}
          stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.3%"/>
        <line x1={`${size * 0.66}%`} y1="0" x2={`${size * 0.66}%`} y2={`${size * 0.65}%`}
          stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.3%"/>
        {/* Stand */}
        <line x1={`${size * 0.5}%`} y1={`${size * 0.65}%`} x2={`${size * 0.5}%`} y2={`${size * 0.9}%`}
          stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.4%"/>
        <line x1={`${size * 0.2}%`} y1={`${size * 0.9}%`} x2={`${size * 0.8}%`} y2={`${size * 0.9}%`}
          stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.4%"/>
      </g>

      {/* Hover tooltip - rendered as foreignObject */}
      {hovered && (
        <foreignObject
          x={`${city.x - 6}%`}
          y={`${city.y - 14}%`}
          width="12%" height="10%">
          <div className={styles.tooltip}>
            <div className={styles.tooltipCity}>{city.name}</div>
            <div className={styles.tooltipCount}>{city.installs} installs</div>
          </div>
        </foreignObject>
      )}
    </g>
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

        {/* MAP CONTAINER */}
        <motion.div className={styles.mapWrap}
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.2 }}
          transition={{ duration:0.8, delay:0.3 }}>

          <div className={styles.mapInner}>
            {/* REAL INDIA SVG */}
            <svg
              viewBox="0 0 550 620"
              className={styles.mapSvg}
              xmlns="http://www.w3.org/2000/svg">

              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,104,74,0.15)"/>
                </filter>
                <filter id="panelGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* INDIA OUTLINE - accurate path */}
              <path
                d="M220,15 L235,12 L252,14 L268,11 L282,16 L296,13 L310,20 L322,18 
                   L335,25 L342,20 L352,28 L358,38 L364,32 L374,35 L380,46 L376,58 
                   L384,64 L388,75 L384,86 L390,94 L388,106 L382,114 L386,124 
                   L382,134 L376,142 L380,152 L375,162 L368,170 L372,180 L366,190 
                   L360,200 L354,210 L348,220 L342,230 L335,240 L328,250 L320,260 
                   L312,270 L304,280 L295,290 L286,300 L276,310 L266,320 L256,330 
                   L246,340 L236,350 L226,360 L216,368 L206,376 L196,382 L186,388 
                   L176,392 L166,396 L156,398 L146,396 L136,390 L126,382 L118,374 
                   L110,364 L103,354 L96,344 L90,334 L84,323 L78,312 L73,300 
                   L68,288 L64,276 L60,264 L57,252 L55,240 L54,228 L54,216 
                   L56,204 L59,192 L64,180 L60,168 L56,156 L60,144 L66,134 
                   L74,124 L82,116 L90,108 L98,100 L95,90 L92,80 L96,70 
                   L104,62 L114,55 L124,49 L135,44 L146,40 L158,36 L170,32 
                   L182,28 L194,24 L206,20 L214,17 Z
                   M156,398 L162,410 L165,422 L162,435 L156,447 L149,458 
                   L141,468 L132,477 L122,485 L112,491 L102,495 L93,490 
                   L88,480 L92,470 L98,460 L106,452 L114,444 L120,436 
                   L126,428 L132,420 L138,412 L144,405 L150,400 Z
                   M282,16 L295,11 L308,14 L318,10 L328,15 L322,22 L312,20 Z
                   M374,35 L386,30 L398,34 L406,42 L400,50 L390,48 L380,46 Z
                   M384,86 L398,82 L412,86 L418,96 L412,104 L400,102 L390,94 Z"
                fill="rgba(0,237,100,0.06)"
                stroke="rgba(0,104,74,0.35)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                filter="url(#shadow)"
              />

              {/* SOLAR PANEL MARKERS */}
              {CITIES.map((city, i) => {
                const cx = (city.x / 100) * 550
                const cy = (city.y / 100) * 620
                const ps = city.size === 'lg' ? 22 : city.size === 'md' ? 16 : 12

                return (
                  <PanelSVG key={city.name} cx={cx} cy={cy} ps={ps} city={city} index={i} />
                )
              })}
            </svg>
          </div>

          {/* LEGEND */}
          <div className={styles.legend}>
            <div className={styles.legendTitle}>Installation Scale</div>
            <div className={styles.legendItems}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendPanel} ${styles.lgPanel}`}/>
                <span>Major Hub (5,000+)</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendPanel} ${styles.mdPanel}`}/>
                <span>Growing City (2,000+)</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendPanel} ${styles.smPanel}`}/>
                <span>Active Market (500+)</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

/* Solar Panel SVG Component */
function PanelSVG({ cx, cy, ps, city, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}>

      {/* Glow pulse circle */}
      <circle cx={cx} cy={cy} r={ps * 1.8}
        fill={hovered ? 'rgba(0,200,83,0.15)' : 'rgba(0,237,100,0.08)'}
        className={styles.pulseCircle}
        style={{ animationDelay: `${index * 0.25}s` }}/>

      {/* Panel body */}
      <rect
        x={cx - ps} y={cy - ps * 0.65}
        width={ps * 2} height={ps * 1.3}
        rx="1.5"
        fill={hovered ? 'rgba(0,104,74,0.2)' : 'rgba(0,104,74,0.1)'}
        stroke={hovered ? '#00c853' : '#00684a'}
        strokeWidth="1"
        style={{ transition: 'all 0.2s', filter: hovered ? 'drop-shadow(0 0 4px rgba(0,200,83,0.6))' : 'none' }}
      />

      {/* Horizontal lines */}
      <line x1={cx - ps} y1={cy - ps * 0.22} x2={cx + ps} y2={cy - ps * 0.22}
        stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.6"/>
      <line x1={cx - ps} y1={cy + ps * 0.22} x2={cx + ps} y2={cy + ps * 0.22}
        stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.6"/>

      {/* Vertical lines */}
      <line x1={cx - ps * 0.33} y1={cy - ps * 0.65} x2={cx - ps * 0.33} y2={cy + ps * 0.65}
        stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.6"/>
      <line x1={cx + ps * 0.33} y1={cy - ps * 0.65} x2={cx + ps * 0.33} y2={cy + ps * 0.65}
        stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="0.6"/>

      {/* Stand */}
      <line x1={cx} y1={cy + ps * 0.65} x2={cx} y2={cy + ps * 1.1}
        stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="1"/>
      <line x1={cx - ps * 0.5} y1={cy + ps * 1.1} x2={cx + ps * 0.5} y2={cy + ps * 1.1}
        stroke={hovered ? '#00c853' : '#00684a'} strokeWidth="1"/>

      {/* Pulse ring */}
      <circle cx={cx} cy={cy} r={ps * 1.4}
        fill="none" stroke="#00684a" strokeWidth="0.6"
        className={styles.pulseRing}
        style={{ animationDelay: `${index * 0.25}s` }}/>

      {/* Tooltip on hover */}
      {hovered && (
        <g>
          <rect x={cx - 35} y={cy - ps * 2.8} width="70" height="32"
            rx="6" fill="white" stroke="rgba(0,104,74,0.3)" strokeWidth="1"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}/>
          <text x={cx} y={cy - ps * 2.8 + 12}
            textAnchor="middle" fontSize="8" fontWeight="700" fill="#00684a" fontFamily="Space Grotesk">
            {city.name}
          </text>
          <text x={cx} y={cy - ps * 2.8 + 24}
            textAnchor="middle" fontSize="7" fill="#666" fontFamily="Inter">
            {city.installs} installs
          </text>
          {/* Arrow */}
          <polygon
            points={`${cx - 5},${cy - ps * 1.6} ${cx + 5},${cy - ps * 1.6} ${cx},${cy - ps * 1.4}`}
            fill="white" stroke="rgba(0,104,74,0.3)" strokeWidth="0.5"/>
        </g>
      )}
    </g>
  )
}