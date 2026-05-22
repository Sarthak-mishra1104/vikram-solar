import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
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
  const { user, logout } = useAuth()

  const handleLogout = async () => await logout()

  return (
    <>
      <header className={styles.header}>

        {/* LOGO */}
        <div className={styles.logo} onClick={() => showPage('home')}>
          <span className={styles.logoText}>
            Solar<span className={styles.logoAccent}>Sync</span>
          </span>
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

          {/* GET FREE QUOTE — always visible */}
          <button className={styles.cta} onClick={() => showPage('contact')}>
            Get Free Quote
          </button>

          {/* USER / SIGN IN */}
          {user ? (
            <div className={styles.userRow}>
              <img src={user.photoURL} alt={user.displayName} className={styles.userAvatar} />
              <span className={styles.userName}>{user.displayName?.split(' ')[0]}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>Sign Out</button>
            </div>
          ) : (
            <button className={styles.signInBtn} onClick={() => showPage('login')}>
              Sign In
            </button>
          )}

          {/* HAMBURGER */}
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
          {user ? (
            <button onClick={handleLogout}>Sign Out</button>
          ) : (
            <button onClick={() => { showPage('login'); setOpen(false) }}>Sign In</button>
          )}
        </div>
      )}
      {/* MOBILE BOTTOM NAV */}
<nav className={styles.bottomNav}>
  <button className={`${styles.bottomNavBtn} ${currentPage==='home' ? styles.bottomNavActive : ''}`} onClick={()=>showPage('home')}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    <span>Home</span>
  </button>
  <button className={`${styles.bottomNavBtn} ${currentPage==='calculator' ? styles.bottomNavActive : ''}`} onClick={()=>showPage('calculator')}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
    <span>Calculate</span>
  </button>
  <button className={`${styles.bottomNavBtn} ${currentPage==='explorer' ? styles.bottomNavActive : ''}`} onClick={()=>showPage('explorer')}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <span>Explore</span>
  </button>
  <button className={`${styles.bottomNavBtn} ${currentPage==='assistant' ? styles.bottomNavActive : ''}`} onClick={()=>showPage('assistant')}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    <span>AI Chat</span>
  </button>
  <button className={`${styles.bottomNavBtn} ${currentPage==='contact' ? styles.bottomNavActive : ''}`} onClick={()=>showPage('contact')}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012 .04h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
    <span>Contact</span>
  </button>
</nav>
    </>
  )
}