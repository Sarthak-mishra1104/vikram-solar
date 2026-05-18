import styles from './Footer.module.css'

const LINKS = [
  { label:'Calculator',    page:'calculator' },
  { label:'Explore Panels',page:'explorer'   },
  { label:'AI Assistant',  page:'assistant'  },
  { label:'Contact Us',    page:'contact'    },
]

export default function Footer({ showPage }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <div className={styles.mark}>
              <img src="/logo.png" alt="VS" className={styles.markImg} />
            </div>
           <div className={styles.brandName}>Solar<span>Sync</span></div>
          </div>
          <p className={styles.tagline}>India's leading solar energy company. Powering homes and businesses with clean, renewable energy since 2006.</p>
          <div className={styles.certs}>
            <span>MNRE Approved</span>
            <span>BIS Certified</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
        <div>
          <div className={styles.colTitle}>Platform</div>
          {LINKS.map(l => <div key={l.page} className={styles.link} onClick={() => showPage(l.page)}>{l.label}</div>)}
        </div>
        <div>
          <div className={styles.colTitle}>Contact</div>
          <div className={styles.info}>1800-XXX-XXXX (Toll Free)</div>
          <div className={styles.info}>info@vikramsolar.com</div>
          <div className={styles.info}>Mon – Sat · 9AM – 7PM</div>
          
        </div>
      </div>
      <div className={styles.bottom}>
       <span>© 2025 SolarSync. All rights reserved.</span>
        <span style={{color:'var(--green)',opacity:0.7}}>Making India solar-powered ⚡</span>
      </div>
    </footer>
  )
}
