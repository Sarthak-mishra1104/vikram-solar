import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import BgOrbs from './components/BgOrbs'
import ToastContainer from './components/ToastContainer'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Explorer from './pages/Explorer'
import Assistant from './pages/Assistant'
import Contact from './pages/Contact'
import { ToastContext } from './hooks/useToast'

export default function App() {
  const [page, setPage] = useState('home')
  const [toasts, setToasts] = useState([])

  const showPage = (id) => {
    setPage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToast = (msg, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }

  const pages = { home: Home, calculator: Calculator, explorer: Explorer, assistant: Assistant, contact: Contact }
  const PageComponent = pages[page] || Home

  return (
    <ToastContext.Provider value={addToast}>
      <BgOrbs />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header currentPage={page} showPage={showPage} />
        <main style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <PageComponent key={page} showPage={showPage} />
          </AnimatePresence>
        </main>
        <Footer showPage={showPage} />
      </div>
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}
