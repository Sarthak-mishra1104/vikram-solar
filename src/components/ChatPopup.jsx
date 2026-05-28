import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Minimize2 } from 'lucide-react'
import styles from './ChatPopup.module.css'

const QUICK = [
  'Solar subsidy kitni milti hai?',
  'How much will I save?',
  'Best solar panels for home?',
  'EMI options available?',
]

const FALLBACK = (msg) => {
  const l = msg.toLowerCase()
  if (l.includes('subsidy') || l.includes('सब्सिडी'))
    return 'PM Surya Ghar scheme mein:\n• 1kW → ₹30,000 subsidy\n• 2kW → ₹60,000 subsidy\n• 3kW → ₹78,000 subsidy ⭐\n\nApply at pmsuryaghar.gov.in!'
  if (l.includes('save') || l.includes('saving') || l.includes('bachega'))
    return 'Average Indian home saves ₹2,000–3,500/month after solar! Payback period is just 4–5 years. After that — FREE electricity for 20+ years! 🌞'
  if (l.includes('panel') || l.includes('best'))
    return 'For most Indian homes:\n• Best value: Mono PERC (22–24% efficiency)\n• Premium: Bifacial TOPCon (24–27%)\n• Budget: Polycrystalline (15–18%)\n\nMono PERC is most popular!'
  if (l.includes('emi') || l.includes('loan'))
    return 'Solar loan options:\n• SBI: 7.4% interest\n• Canara Bank: ~8%\n• Bajaj Finserv: Zero-cost EMI\n\nYour EMI will be LESS than your current electricity bill! 💰'
  if (l.includes('cost') || l.includes('price') || l.includes('kitna'))
    return 'Solar installation cost:\n• 1kW: ~₹65,000 (after subsidy ₹35,000)\n• 3kW: ~₹1,95,000 (after subsidy ₹1,17,000)\n• 5kW: ~₹3,25,000 (after subsidy ₹2,30,500)\n\nUse our Calculator for exact numbers!'
  return 'Great question! 😊 I can help you with solar savings, subsidies, panel types, EMI options and more.\n\nTry our AI Calculator for personalized recommendations, or ask me anything!'
}

export default function ChatPopup() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{
    role: 'ai',
    text: 'Namaste! 👋 I\'m SolarSync AI.\n\nAsk me anything about solar — savings, subsidies, panels, EMI options. Hindi or English! 🌞',
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    // Show popup hint after 3 seconds
    const timer = setTimeout(() => {
      if (!open) setUnread(1)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    if (open) setUnread(0)

    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setTyping(true)

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: FALLBACK(msg) }])
      setTyping(false)
      if (!open) setUnread(prev => prev + 1)
    }, 1000)
  }

  const handleOpen = () => {
    setOpen(true)
    setUnread(0)
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        className={styles.fab}
        onClick={open ? () => setOpen(false) : handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <X size={22} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}>
              <MessageSquare size={22} strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* UNREAD BADGE */}
        {!open && unread > 0 && (
          <motion.div className={styles.badge}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}>
            {unread}
          </motion.div>
        )}
      </motion.button>

      {/* TOOLTIP when closed */}
      <AnimatePresence>
        {!open && (
          <motion.div className={styles.tooltip}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 1 }}>
            <div className={styles.tooltipDot} />
            Ask about solar savings!
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}>

            {/* HEADER */}
            <div className={styles.header}>
              <div className={styles.avatar}>
                <Bot size={16} strokeWidth={1.5} />
              </div>
              <div className={styles.headerInfo}>
                <div className={styles.headerName}>SolarSync AI</div>
                <div className={styles.headerStatus}>
                  <span className={styles.statusDot} />
                  Online · Hindi & English
                </div>
              </div>
              <button className={styles.minimize} onClick={() => setOpen(false)}>
                <Minimize2 size={14} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className={styles.messages}>
              {messages.map((m, i) => (
                <motion.div key={i}
                  className={`${styles.msg} ${m.role === 'user' ? styles.userMsg : styles.aiMsg}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}>
                  {m.role === 'ai' && (
                    <div className={styles.msgAvatar}>
                      <Bot size={12} strokeWidth={1.5} />
                    </div>
                  )}
                  <div className={styles.bubble}>
                    {m.text.split('\n').map((line, li, arr) => (
                      <span key={li}>
                        {line}
                        {li < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className={`${styles.msg} ${styles.aiMsg}`}>
                  <div className={styles.msgAvatar}><Bot size={12} strokeWidth={1.5} /></div>
                  <div className={styles.bubble}>
                    <div className={styles.dots}>
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* QUICK REPLIES */}
            <div className={styles.quickRow}>
              {QUICK.map(q => (
                <button key={q} className={styles.quickBtn} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>

            {/* INPUT */}
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send() }}
                placeholder="Ask anything about solar..."
              />
              <button className={styles.sendBtn} onClick={() => send()}>
                <Send size={15} strokeWidth={2} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}