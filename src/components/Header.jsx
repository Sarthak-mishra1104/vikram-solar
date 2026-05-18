import { useState } from 'react'
import styles from './Header.module.css'

const NAV = [
  { id:'home',       label:'Home'       },
  { id:'calculator', label:'Calculator' },
  { id:'explorer',   label:'Explore'    },
  { id:'assistant',  label:'AI Chat'    },
  { id:'contact',    label:'Contact'    },
]

export default function Header({ currentPage, showPage }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className={styles.header}>
        {/* LOGO */}
        <div className={styles.logo} onClick={() => showPage('home')}>
          <div className={styles.logoMark}>
           <img src="/logo.png" alt="Vikram Solar" className={styles.logoImg} /> 
          </div>
          <div className={styles.logoText}>
            <div className={styles.logoName}>vikram<span>solar</span></div>
            <div className={styles.logoSub}>AI Platform</div>
          </div>
        </div>

        {/* NAV */}
        <nav className={styles.nav}>
          {NAV.map(n => (
            <button key={n.id}
              className={`${styles.navBtn} ${currentPage === n.id ? styles.active : ''}`}
              onClick={() => showPage(n.id)}>
              {n.label}
              {currentPage === n.id && <span className={styles.activeDot} />}
            </button>
          ))}
        </nav>

        {/* RIGHT */}
        <div className={styles.navRight}>
          <button className={styles.cta} onClick={() => showPage('contact')}>Get Free Quote</button>
          <button className={styles.hamburger} onClick={() => setOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      {open && (
        <div className={styles.mobileMenu}>
          {NAV.map(n => (
            <button key={n.id}
              className={currentPage === n.id ? styles.mobileActive : ''}
              onClick={() => { showPage(n.id); setOpen(false) }}>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
