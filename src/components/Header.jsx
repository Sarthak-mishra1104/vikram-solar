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
    </>
  )
}