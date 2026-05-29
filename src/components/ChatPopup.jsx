import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Mic, MicOff, Bot, ChevronDown } from 'lucide-react'
import styles from './ChatPopup.module.css'

const SYSTEM_PROMPT = `You are SolarSync AI, a friendly solar energy expert for India. Answer in Hinglish or English based on user language. Give detailed helpful answers about solar panels, subsidies, savings, installation. Key facts: PM Surya Ghar subsidy up to ₹78,000, cost ₹60,000-70,000/kW, payback 4-6 years, 1kW = 120 units/month.`

const QUICK = [
  'Solar subsidy kitni milti hai?',
  'How much can I save?',
  'Best solar panels for home?',
  'Net metering kya hai?',
]

function getFallback(msg) {
  const l = msg.toLowerCase()
  if (l.includes('subsid') || l.includes('सब्सिडी'))
    return 'PM Surya Ghar scheme mein:\n• 1kW → ₹30,000\n• 2kW → ₹60,000\n• 3kW → ₹78,000 ⭐\n• 4-10kW → ₹94,500\n\npmsuryaghar.gov.in pe apply karein!'
  if (l.includes('save') || l.includes('bacha') || l.includes('saving'))
    return 'Solar se aap apne electricity bill ka 80-90% bacha sakte hain!\n\nExample: ₹3,000/month bill → sirf ₹300-400 reh jaata hai solar ke baad.\n\nPayback period: 4-6 saal, phir 20+ saal FREE electricity! 🌞'
  if (l.includes('panel') || l.includes('best'))
    return 'Ghar ke liye best panels:\n\n1. Mono PERC — 22-24% efficiency, best value\n2. Bifacial TOPCon — 24-27%, maximum output\n3. Half-Cut Cell — 20-22%, shading ke liye best\n\nMono PERC sabse popular hai urban homes mein!'
  if (l.includes('net meter') || l.includes('grid'))
    return 'Net metering se aap extra solar bijli grid ko bech sakte hain!\n\n• Bidirectional meter lagta hai\n• Sirf net units ka bill aata hai\n• Sabhi Indian states mein available\n• Installer application handle karta hai'
  if (l.includes('cost') || l.includes('price') || l.includes('kitna'))
    return 'Solar installation cost:\n\n• 1kW: ~₹65,000 (subsidy baad ₹35,000)\n• 3kW: ~₹1,95,000 (subsidy baad ₹1,17,000)\n• 5kW: ~₹3,25,000 (subsidy baad ₹2,30,500)\n\nCalculator use karein exact quote ke liye!'
  return 'Main SolarSync AI hoon! Solar ke baare mein kuch bhi poochho — subsidies, savings, panels, installation. Hindi ya English mein! 🌞'
}

export default function ChatPopup() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Namaste! 🙏 Main SolarSync AI hoon.\n\nSolar ke baare mein kuch bhi poochho — subsidies, savings, best panels, installation cost!\n\nKya aapka monthly bill ₹2,000 se zyada hai? Main calculate kar sakta hoon kitna bachega! 💰'
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const [unread, setUnread] = useState(1)
  const bottomRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [open, messages])

  // Show popup hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setUnread(1)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    const userMsg = { role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setTyping(true)
    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || getFallback(msg)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: getFallback(msg) }])
    } finally {
      setTyping(false)
    }
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SR()
    recognition.lang = 'hi-IN'
    recognition.onresult = (e) => { setInput(e.results[0][0].transcript); setListening(false) }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        className={styles.fab}
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <ChevronDown size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && unread > 0 && (
          <motion.div className={styles.badge}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}>
            {unread}
          </motion.div>
        )}
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}>

            {/* HEADER */}
            <div className={styles.header}>
              <div className={styles.avatar}><Bot size={16} /></div>
              <div className={styles.headerInfo}>
                <div className={styles.name}>SolarSync AI</div>
                <div className={styles.status}><span className={styles.dot} />Online · Solar Expert</div>
              </div>
              <button className={styles.close} onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className={styles.messages}>
              {messages.map((m, i) => (
                <motion.div key={i}
                  className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.bot}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}>
                  {m.role === 'assistant' && (
                    <div className={styles.botAva}><Bot size={12} /></div>
                  )}
                  <div className={styles.bubble}>
                    {m.content.split('\n').map((line, li, arr) => (
                      <span key={li}>
                        {line.startsWith('•') ? <span style={{ display: 'block', paddingLeft: 6 }}>{line}</span> : line}
                        {li < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className={`${styles.msg} ${styles.bot}`}>
                  <div className={styles.botAva}><Bot size={12} /></div>
                  <div className={styles.bubble}>
                    <div className={styles.dots}><span /><span /><span /></div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* QUICK CHIPS */}
            <div className={styles.chips}>
              {QUICK.map(q => (
                <button key={q} className={styles.chip} onClick={() => send(q)}>{q}</button>
              ))}
            </div>

            {/* INPUT */}
            <div className={styles.inputRow}>
              <button
                className={`${styles.mic} ${listening ? styles.micOn : ''}`}
                onClick={listening ? () => { recognitionRef.current?.stop(); setListening(false) } : startListening}>
                {listening ? <MicOff size={14} /> : <Mic size={14} />}
              </button>
              <input
                className={styles.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send() }}
                placeholder="Ask about solar..."
              />
              <button className={styles.send} onClick={() => send()}>
                <Send size={14} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}