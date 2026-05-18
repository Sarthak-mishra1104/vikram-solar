import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import styles from './Login.module.css'

export default function Login({ showPage }) {
  const { loginWithGoogle, user } = useAuth()
  const toast = useToast()

  if (user) {
    showPage('home')
    return null
  }

  const handleGoogle = async () => {
    try {
      await loginWithGoogle()
      toast('Welcome to SolarSync!')
      showPage('home')
    } catch (err) {
      toast('Login failed. Please try again.', 'warn')
    }
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.4 }}
    >
      <div className={styles.card}>
        <div className={styles.logo}>
          Solar<span>Sync</span>
        </div>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.sub}>Sign in to access your solar dashboard</p>

        <button className={styles.googleBtn} onClick={handleGoogle}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Continue with Google
        </button>

        <p className={styles.terms}>
          By signing in you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </motion.div>
  )
}