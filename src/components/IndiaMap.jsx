import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'
import styles from './IndiaMap.module.css'

const STATES = [
  'Delhi-NCR', 'Uttar Pradesh', 'Punjab', 'Karnataka',
  'Telangana', 'Gujarat', 'Madhya Pradesh', 'Maharashtra',
  'Rajasthan', 'Tamil Nadu', 'Kerala', 'West Bengal'
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
  const [activeState, setActiveState] = useState('Delhi-NCR')

  const STATE_COORDS = {
    'Delhi-NCR':       { lat: 28.6139, lng: 77.2090, zoom: 10 },
    'Uttar Pradesh':   { lat: 26.8467, lng: 80.9462, zoom: 7  },
    'Punjab':          { lat: 31.1471, lng: 75.3412, zoom: 7  },
    'Karnataka':       { lat: 15.3173, lng: 75.7139, zoom: 7  },
    'Telangana':       { lat: 18.1124, lng: 79.0193, zoom: 7  },
    'Gujarat':         { lat: 22.2587, lng: 71.1924, zoom: 7  },
    'Madhya Pradesh':  { lat: 22.9734, lng: 78.6569, zoom: 7  },
    'Maharashtra':     { lat: 19.7515, lng: 75.7139, zoom: 7  },
    'Rajasthan':       { lat: 27.0238, lng: 74.2179, zoom: 7  },
    'Tamil Nadu':      { lat: 11.1271, lng: 78.6569, zoom: 7  },
    'Kerala':          { lat: 10.8505, lng: 76.2711, zoom: 7  },
    'West Bengal':     { lat: 22.9868, lng: 87.8550, zoom: 7  },
  }

  const current = STATE_COORDS[activeState]
  const mapSrc = `https://maps.google.com/maps?q=${current.lat},${current.lng}&z=${current.zoom}&output=embed&t=m`

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <motion.div className={styles.head}
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }}
          transition={{ duration:0.7 }}>
          <div className="section-label">Pan India Presence</div>
          <h2 className={styles.title}>SolarSync Installations<br />Across India</h2>
          <p className={styles.sub}>Over 4,500 high quality solar rooftop installations across 75+ cities, ranging from 1kW to 100kW.</p>
        </motion.div>

        {/* STATS */}
        <motion.div className={styles.statsRow}
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.2 }}>
          {STATS.map(s => <StatCount key={s.label} {...s} />)}
        </motion.div>

        {/* MAP SECTION */}
        <motion.div className={styles.mapSection}
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.2 }}
          transition={{ duration:0.8, delay:0.3 }}>

          {/* LEFT — STATE SELECTOR */}
          <div className={styles.statePanel}>
            <div className={styles.statePanelTitle}>Select State</div>
            <div className={styles.stateGrid}>
              {STATES.map(state => (
                <button
                  key={state}
                  className={`${styles.stateBtn} ${activeState === state ? styles.stateBtnActive : ''}`}
                  onClick={() => setActiveState(state)}>
                  {state}
                </button>
              ))}
            </div>
            <div className={styles.stateInfo}>
              <div className={styles.stateInfoTitle}>{activeState}</div>
              <div className={styles.stateInfoStats}>
                <div className={styles.stateInfoStat}>
                  <div className={styles.stateInfoVal}>500+</div>
                  <div className={styles.stateInfoLabel}>Installations</div>
                </div>
                <div className={styles.stateInfoStat}>
                  <div className={styles.stateInfoVal}>10+</div>
                  <div className={styles.stateInfoLabel}>Cities</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — MAP */}
          <div className={styles.mapWrap}>
            <iframe
  key={activeState}
  src={mapSrc}
  className={styles.mapFrame}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title={`Solar installations in ${activeState}`}
  style={{ pointerEvents: 'auto', touchAction: 'none' }}
/>
            <div className={styles.mapBadge}>
              <span className={styles.mapBadgeDot}/>
              Solar installations in {activeState}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}