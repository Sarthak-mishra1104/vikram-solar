import { motion } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'
import styles from './IndiaMap.module.css'

const CITIES = [
  { name: 'Delhi',       x: 42, y: 28, installs: 8500  },
  { name: 'Mumbai',      x: 28, y: 52, installs: 7200  },
  { name: 'Bangalore',   x: 38, y: 72, installs: 6800  },
  { name: 'Chennai',     x: 45, y: 76, installs: 5400  },
  { name: 'Hyderabad',   x: 42, y: 63, installs: 5100  },
  { name: 'Ahmedabad',   x: 25, y: 42, installs: 4800  },
  { name: 'Pune',        x: 30, y: 56, installs: 4200  },
  { name: 'Jaipur',      x: 35, y: 32, installs: 3900  },
  { name: 'Lucknow',     x: 50, y: 30, installs: 3200  },
  { name: 'Indore',      x: 35, y: 46, installs: 2800  },
  { name: 'Surat',       x: 25, y: 48, installs: 2600  },
  { name: 'Kolkata',     x: 65, y: 42, installs: 2400  },
  { name: 'Bhopal',      x: 38, y: 44, installs: 2200  },
  { name: 'Chandigarh',  x: 40, y: 20, installs: 1800  },
  { name: 'Kochi',       x: 34, y: 82, installs: 1600  },
  { name: 'Nagpur',      x: 44, y: 50, installs: 1500  },
  { name: 'Coimbatore',  x: 38, y: 78, installs: 1400  },
  { name: 'Vadodara',    x: 27, y: 45, installs: 1300  },
]

const STATS = [
  { val: 4500,  suffix: '+', label: 'Installations'  },
  { val: 75,    suffix: '+', label: 'Cities'          },
  { val: 22,    suffix,      label: 'States'          },
  { val: 3,     suffix: 'GW+',label: 'Capacity'       },
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

          {/* SVG INDIA MAP */}
          <svg viewBox="0 0 100 100" className={styles.mapSvg} xmlns="http://www.w3.org/2000/svg">
            {/* India outline — simplified */}
            <path
              d="M38,5 L45,4 L52,6 L58,8 L65,10 L70,14 L72,18 L74,22 L76,26 L75,30 L72,33 L74,36 L76,40 L75,44 L72,47 L70,50 L68,54 L65,58 L62,62 L60,66 L58,70 L56,74 L54,77 L52,80 L50,83 L48,86 L46,88 L44,90 L42,88 L40,85 L38,82 L36,79 L34,76 L32,72 L30,68 L28,64 L26,60 L24,56 L22,52 L20,48 L19,44 L18,40 L20,36 L22,32 L20,28 L18,24 L20,20 L23,17 L26,14 L29,11 L32,8 L35,6 Z"
              className={styles.mapPath}
            />
            {/* Kashmir */}
            <path
              d="M38,5 L40,3 L44,2 L48,3 L50,5 L48,7 L45,7 L42,6 Z"
              className={styles.mapPath}
            />
            {/* Northeast */}
            <path
              d="M65,30 L68,28 L72,29 L74,32 L72,35 L69,34 L66,33 Z"
              className={styles.mapPath}
            />

            {/* GRID LINES */}
            {[20,30,40,50,60,70,80].map(y => (
              <line key={y} x1="15" y1={y} x2="80" y2={y} className={styles.gridLine} />
            ))}
            {[20,30,40,50,60,70].map(x => (
              <line key={x} x1={x} y1="2" x2={x} y2="92" className={styles.gridLine} />
            ))}

            {/* CITY DOTS */}
            {CITIES.map((city, i) => (
              <g key={city.name}>
                {/* Outer pulse ring */}
                <circle
                  cx={city.x} cy={city.y}
                  r={city.installs > 5000 ? 3 : city.installs > 3000 ? 2.5 : 2}
                  className={styles.dotRing}
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                {/* Inner dot */}
                <circle
                  cx={city.x} cy={city.y}
                  r={city.installs > 5000 ? 1.5 : city.installs > 3000 ? 1.2 : 0.9}
                  className={styles.dot}
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              </g>
            ))}
          </svg>

          {/* CITY LABELS (hover tooltips) */}
          {CITIES.slice(0,8).map((city, i) => (
            <motion.div
              key={city.name}
              className={styles.cityLabel}
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
              initial={{ opacity:0, scale:0 }}
              whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }}
              transition={{ delay: 0.5 + i * 0.1 }}>
              <div className={styles.cityName}>{city.name}</div>
              <div className={styles.cityCount}>{city.installs.toLocaleString('en-IN')}+</div>
            </motion.div>
          ))}

          {/* GLOW EFFECT */}
          <div className={styles.mapGlow} />
        </motion.div>

      </div>
    </section>
  )
}