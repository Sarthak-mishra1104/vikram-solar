import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useCounter } from '../hooks/useCounter'
import styles from './IndiaMap.module.css'

const GEO_URL = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json'

const CITIES = [
  { name: 'New Delhi',  coords: [77.1025, 28.7041], installs: '8,500+', size: 'lg' },
  { name: 'Mumbai',     coords: [72.8777, 19.0760], installs: '7,200+', size: 'lg' },
  { name: 'Bangalore',  coords: [77.5946, 12.9716], installs: '6,800+', size: 'lg' },
  { name: 'Chennai',    coords: [80.2707, 13.0827], installs: '5,400+', size: 'md' },
  { name: 'Hyderabad',  coords: [78.4867, 17.3850], installs: '5,100+', size: 'md' },
  { name: 'Ahmedabad',  coords: [72.5714, 23.0225], installs: '4,800+', size: 'md' },
  { name: 'Pune',       coords: [73.8567, 18.5204], installs: '4,200+', size: 'md' },
  { name: 'Jaipur',     coords: [75.7873, 26.9124], installs: '3,900+', size: 'sm' },
  { name: 'Lucknow',    coords: [80.9462, 26.8467], installs: '3,200+', size: 'sm' },
  { name: 'Indore',     coords: [75.8577, 22.7196], installs: '2,800+', size: 'sm' },
  { name: 'Surat',      coords: [72.8311, 21.1702], installs: '2,600+', size: 'sm' },
  { name: 'Kolkata',    coords: [88.3639, 22.5726], installs: '2,400+', size: 'sm' },
  { name: 'Bhopal',     coords: [77.4126, 23.2599], installs: '2,200+', size: 'sm' },
  { name: 'Kochi',      coords: [76.2673, 9.9312],  installs: '1,600+', size: 'sm' },
  { name: 'Nagpur',     coords: [79.0882, 21.1458], installs: '1,500+', size: 'sm' },
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

export default function IndiaMap() {
  const [tooltip, setTooltip] = useState(null)

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

        <motion.div className={styles.statsRow}
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.2 }}>
          {STATS.map(s => <StatCount key={s.label} {...s} />)}
        </motion.div>

        <motion.div className={styles.mapWrap}
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.2 }}
          transition={{ duration:0.8, delay:0.3 }}>

          {/* TOOLTIP */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                className={styles.tooltip}
                style={{ left: tooltip.x, top: tooltip.y }}
                initial={{ opacity:0, scale:0.9, y:4 }}
                animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:0.9 }}
                transition={{ duration:0.15 }}>
                <div className={styles.tooltipCity}>{tooltip.name}</div>
                <div className={styles.tooltipInstalls}>
                  <span className={styles.tooltipDot}/>
                  {tooltip.installs} installs
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.mapInner}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 1000, center: [82, 22] }}
              width={600}
              height={650}
              style={{ width:'100%', height:'auto' }}>

              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: 'rgba(0,200,83,0.07)',
                          stroke: 'rgba(0,104,74,0.35)',
                          strokeWidth: 0.8,
                          outline: 'none',
                        },
                        hover: {
                          fill: 'rgba(0,200,83,0.15)',
                          stroke: 'rgba(0,104,74,0.6)',
                          strokeWidth: 1,
                          outline: 'none',
                          cursor: 'pointer',
                        },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {CITIES.map((city, i) => {
                const ps = city.size === 'lg' ? 13 : city.size === 'md' ? 10 : 7
                return (
                  <Marker
                    key={city.name}
                    coordinates={city.coords}
                    onMouseEnter={(e) => {
                      const svg = e.target.closest('svg')
                      const rect = svg ? svg.getBoundingClientRect() : { left: 0, top: 0 }
                      setTooltip({
                        name: city.name,
                        installs: city.installs,
                        x: e.clientX - rect.left + 12,
                        y: e.clientY - rect.top - 70,
                      })
                    }}
                    onMouseLeave={() => setTooltip(null)}>

                    {/* Glow */}
                    <circle r={ps * 2.2}
                      fill="rgba(0,237,100,0.08)"
                      style={{ animation: `glowPulse 2.5s ease-in-out ${i * 0.25}s infinite` }}/>

                    {/* Solar Panel Body */}
                    <rect
                      x={-ps} y={-ps * 0.7}
                      width={ps * 2} height={ps * 1.4}
                      rx="1.2"
                      fill="rgba(0,104,74,0.12)"
                      stroke="#00684a"
                      strokeWidth="0.9"
                      style={{ cursor:'pointer' }}/>

                    {/* Horizontal grid lines */}
                    <line x1={-ps} y1={-ps * 0.23} x2={ps} y2={-ps * 0.23}
                      stroke="#00684a" strokeWidth="0.5"/>
                    <line x1={-ps} y1={ps * 0.23} x2={ps} y2={ps * 0.23}
                      stroke="#00684a" strokeWidth="0.5"/>

                    {/* Vertical grid lines */}
                    <line x1={-ps * 0.33} y1={-ps * 0.7} x2={-ps * 0.33} y2={ps * 0.7}
                      stroke="#00684a" strokeWidth="0.5"/>
                    <line x1={ps * 0.33} y1={-ps * 0.7} x2={ps * 0.33} y2={ps * 0.7}
                      stroke="#00684a" strokeWidth="0.5"/>

                    {/* Stand */}
                    <line x1={0} y1={ps * 0.7} x2={0} y2={ps * 1.2}
                      stroke="#00684a" strokeWidth="0.9"/>
                    <line x1={-ps * 0.5} y1={ps * 1.2} x2={ps * 0.5} y2={ps * 1.2}
                      stroke="#00684a" strokeWidth="0.9"/>

                    {/* Pulse ring */}
                    <circle r={ps * 1.6}
                      fill="none"
                      stroke="#00684a"
                      strokeWidth="0.6"
                      style={{ animation: `ringExpand 2.5s ease-out ${i * 0.25}s infinite` }}/>
                  </Marker>
                )
              })}
            </ComposableMap>
          </div>

          {/* LEGEND */}
          <div className={styles.legend}>
            <span className={styles.legendTitle}>Scale:</span>
            {[
              { cls: styles.lgPanel, label: 'Major Hub (5,000+)' },
              { cls: styles.mdPanel, label: 'Growing City (2,000+)' },
              { cls: styles.smPanel, label: 'Active Market (500+)' },
            ].map(l => (
              <div key={l.label} className={styles.legendItem}>
                <div className={`${styles.legendPanel} ${l.cls}`}/>
                <span>{l.label}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>

      <style>{`
        @keyframes glowPulse { 0%,100%{opacity:0.3} 50%{opacity:0.9} }
        @keyframes ringExpand { 0%{opacity:0.7;transform:scale(0.8)} 100%{opacity:0;transform:scale(2.8)} }
      `}</style>
    </section>
  )
}