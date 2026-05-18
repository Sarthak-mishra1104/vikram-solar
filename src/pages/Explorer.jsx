import { motion } from 'framer-motion'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { PANEL_TYPES, PACKAGES, SUBSIDY_ROWS } from '../utils/solar'
import styles from './Explorer.module.css'

export default function Explorer({ showPage }) {
  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.35}}>
      <div className={styles.pageHeader}>
        <div className="section-label">Panel Explorer</div>
        <h1 className={styles.pageTitle}>Compare Solar Panel Types</h1>
        <p className={styles.pageSub}>All Vikram Solar panels are MNRE and BIS certified. Choose the best panel for your rooftop size, budget and energy needs.</p>
      </div>

      {/* PANEL CARDS */}
      <div className={styles.panelsGrid}>
        {PANEL_TYPES.map((p,i) => (
          <motion.div key={p.id} className={styles.panelCard}
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
            whileHover={{y:-3}}>
            {p.badge && (
              <div className={`${styles.badge} ${p.badgeType==='best'?styles.badgeBest:styles.badgeNormal}`}>
                {p.badge}
              </div>
            )}
            <div className={styles.panelName}>{p.name}</div>
            <p className={styles.panelDesc}>{p.desc}</p>
            <div className={styles.effRow}>
              <span className={styles.effLabel}>Efficiency</span>
              <span className={styles.effVal}>{p.efficiency}</span>
            </div>
            <div className={styles.effTrack}>
              <motion.div className={styles.effFill}
                initial={{width:0}} animate={{width:`${p.efficiencyPct}%`}}
                transition={{duration:0.9,delay:i*0.08+0.3}}
                style={{background:`linear-gradient(90deg,${p.gradStart},${p.gradEnd})`}}/>
            </div>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <div className={styles.specLabel}>Lifespan</div>
                <div className={styles.specVal}>{p.lifespan}</div>
              </div>
              <div className={styles.spec}>
                <div className={styles.specLabel}>Cost / Watt</div>
                <div className={styles.specVal}>{p.costPerW}</div>
              </div>
              <div className={styles.spec}>
                <div className={styles.specLabel}>Best For</div>
                <div className={styles.specVal}>{p.id==='mono'?'Urban':p.id==='poly'?'Large Roof':p.id==='bifacial'?'Max Output':'Shaded Roof'}</div>
              </div>
            </div>
            <button className={styles.panelCta} onClick={()=>showPage('contact')}>
              Get Quote <ChevronRight size={14}/>
            </button>
          </motion.div>
        ))}
      </div>

      {/* PACKAGES */}
      <section className="section">
        <div className="section-label">Installation Packages</div>
        <h2 className="section-title" style={{marginBottom:32}}>Choose Your Package</h2>
        <div className={styles.pkgGrid}>
          {PACKAGES.map((pkg,i)=>(
            <motion.div key={pkg.title} className={`${styles.pkgCard} ${pkg.popular?styles.pkgPop:''}`}
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
              onClick={()=>showPage('contact')}>
              {pkg.popular && <div className={styles.popTag}>Most Popular</div>}
              <div className={styles.pkgTitle} style={{color:pkg.titleColor}}>{pkg.title}</div>
              <p className={styles.pkgDesc}>{pkg.desc}</p>
              <div className={styles.pkgFeatures}>
                {['MNRE Certified Panels','5-Year Warranty','Net Metering Support','Free Site Survey'].map(f=>(
                  <div key={f} className={styles.pkgFeature}>
                    <CheckCircle size={14} style={{color:'var(--red)',flexShrink:0}}/>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div className={styles.pkgDivider}/>
              <div className={styles.pkgPricing}>
                <div>
                  <div className={styles.pkgLabel}>Installation Cost</div>
                  <div className={styles.pkgPrice}>{pkg.grossCost}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className={styles.pkgLabel}>After Subsidy</div>
                  <div className={styles.pkgPriceRed}>{pkg.netCost}</div>
                </div>
              </div>
              <button className={styles.pkgBtn}>Request Quote</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SUBSIDY TABLE */}
      <section className="section" style={{paddingTop:0}}>
        <div className="section-label">Government Scheme</div>
        <h2 className="section-title" style={{marginBottom:24}}>PM Surya Ghar Subsidy Chart</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Capacity</th><th>Gross Cost</th><th>Govt. Subsidy</th><th>Net Cost</th><th>Est. Monthly Savings</th></tr>
            </thead>
            <tbody>
              {SUBSIDY_ROWS.map(r=>(
                <tr key={r.cap} className={r.star?styles.starRow:''}>
                  <td><strong>{r.cap}</strong></td>
                  <td>{r.gross}</td>
                  <td style={{color:'var(--red)',fontWeight:600}}>{r.sub}</td>
                  <td style={{fontWeight:700}}>{r.net}</td>
                  <td style={{color:'var(--muted)'}}>{r.save}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  )
}
