import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import styles from './Assistant.module.css'

const QUICK_CHIPS = [
  { label: 'Subsidies 2024',    q: 'Solar subsidy kitni milti hai India mein 2024 mein? Poori detail do.' },
  { label: 'Net Metering',      q: 'Net metering kya hota hai aur kaise kaam karta hai India mein?' },
  { label: 'EMI Options',       q: 'Solar ke liye konse bank loan aur EMI options available hain India mein?' },
  { label: 'System Sizing',     q: 'Mere ghar mein 300 units per month consumption hai, kitne kW ka solar chahiye?' },
  { label: 'Maintenance Tips',  q: 'Solar panels ki maintenance kaise karein? Indian climate ke liye tips do.' },
  { label: 'Payback Period',    q: '5kW solar system ka payback period kitna hoga India mein?' },
  { label: 'Best Panels',       q: 'India mein ghar ke liye sabse acche solar panels konse hain aur kyun?' },
]

const SYSTEM_PROMPT = `You are Vikram, a friendly and expert solar energy advisor for SolarSync India. You help Indian homeowners and businesses make smart solar decisions.

PERSONALITY:
- Warm, friendly, and conversational — like a knowledgeable friend
- Use Hinglish naturally (mix of Hindi and English) when the user writes in Hindi or Hinglish
- When user writes in English, reply in English
- Use simple language, avoid too much technical jargon
- Be encouraging and positive about solar adoption

KNOWLEDGE BASE:
Government Subsidies (PM Surya Ghar Muft Bijli Yojana):
- 1 kW: ₹30,000 subsidy, net cost ~₹35,000
- 2 kW: ₹60,000 subsidy, net cost ~₹70,000  
- 3 kW: ₹78,000 subsidy, net cost ~₹1,17,000 (MOST POPULAR)
- 4-10 kW: ₹94,500 subsidy
- Apply at pmsuryaghar.gov.in
- Your installer handles most paperwork

System Costs & Savings:
- Average cost: ₹60,000-70,000 per kW installed
- 1 kW generates ~100-130 units/month depending on location
- Payback period: 4-6 years after subsidy
- Annual ROI: 15-25%
- Panels last 25+ years

Panel Types:
- Monocrystalline PERC: 22-24% efficiency, ₹28-35/W, best for small rooftops
- Bifacial N-Type TOPCon: 24-27% efficiency, ₹38-48/W, maximum output
- Polycrystalline: 15-18% efficiency, ₹22-28/W, budget option
- Half-Cut Cell: 20-22% efficiency, ₹30-38/W, good for partial shade

Net Metering:
- Available in all Indian states
- Bidirectional meter installed by DISCOM
- Sell excess power back to grid
- Pay only for net units consumed
- Application handled by installer

Financing Options:
- SBI Solar Loan: 7.4% p.a., up to ₹5 lakh
- Canara Bank Green Loan: ~8% p.a.
- Bajaj Finserv: Zero-cost EMI
- NABARD: Rural solar schemes
- Monthly EMI usually less than current electricity bill

Maintenance:
- Clean panels monthly with water, early morning
- Annual inspection by certified engineer
- Monitor output through inverter app
- Inverter service every 2-3 years
- Very low maintenance overall

RESPONSE STYLE:
- Always give DETAILED, helpful answers (minimum 3-4 sentences)
- Use bullet points for lists
- Include specific numbers and data
- End with a helpful tip or next step
- Never give one-line answers
- If asked about savings, always calculate based on their bill amount
- Be proactive — suggest related information they might find useful`

function getFallback(msg) {
  const l = msg.toLowerCase()
  if (l.includes('subsidy') || l.includes('सब्सिडी') || l.includes('scheme'))
    return `PM Surya Ghar Muft Bijli Yojana ke under aapko ye subsidies milti hain:\n\n• 1 kW system: ₹30,000 subsidy → Net cost sirf ₹35,000\n• 2 kW system: ₹60,000 subsidy → Net cost ₹70,000\n• 3 kW system: ₹78,000 subsidy → Net cost ₹1,17,000 ⭐ (Sabse popular)\n• 4-10 kW: ₹94,500 subsidy\n\nApply karne ke liye pmsuryaghar.gov.in pe jaayein. Aapka installer saari paperwork handle kar leta hai!\n\n💡 Tip: 3kW system sabse best value hai — maximum subsidy aur average Indian ghar ke liye perfect size.`
  if (l.includes('net meter') || l.includes('grid') || l.includes('bijli wapas'))
    return `Net metering ek bahut acchi facility hai! Isme aap apni extra solar bijli government grid ko bech sakte hain.\n\nKaise kaam karta hai:\n• Aapke ghar mein ek bidirectional meter lagta hai\n• Jab solar zyada electricity banata hai, extra grid mein jaati hai\n• Aapko us extra bijli ka credit milta hai\n• Month end mein sirf net units ka bill aata hai\n\nNet metering sabhi Indian states mein available hai. Aapka installer DISCOM ke saath application process handle karta hai.\n\n💡 Tip: 5kW system se typically 600+ units per month generate hoti hain, jo average ghar ki zaroorat se zyada hai!`
  if (l.includes('emi') || l.includes('loan') || l.includes('finance') || l.includes('किस्त'))
    return `Solar ke liye bahut acche financing options available hain:\n\n• SBI Solar Loan: 7.4% interest, up to ₹5 lakh\n• Canara Bank Green Loan: ~8% p.a.\n• Bajaj Finserv: Zero-cost EMI options\n• NABARD: Rural aur agricultural solar schemes\n\nSabse acchi baat ye hai ki aapki monthly EMI usually aapke current electricity bill se kam hoti hai — matlab day 1 se savings!\n\n💡 Tip: 3kW system ke liye ₹1.17 lakh ka loan lein → ~₹3,000/month EMI, lekin electricity bill mein ₹2,500+ bachenge!`
  if (l.includes('maintenance') || l.includes('clean') || l.includes('साफ'))
    return `Solar panels ki maintenance bahut simple hai, tension mat lo!\n\nMonthly:\n• Subah jaldi thoda paani se panels saaf karein\n• Soft cloth ya mop use karein, scratches se bachein\n\nYearly:\n• Certified engineer se inspection karwaayein\n• Wiring aur connections check karwaayein\n\nHar 2-3 saal:\n• Inverter ka service karwaayein\n• Performance data review karein\n\nInverter app se daily output monitor kar sakte hain. Panels 25+ saal chalte hain minimal care se!\n\n💡 Tip: Most installers 5-year AMC (Annual Maintenance Contract) offer karte hain jo bahut useful hota hai.`
  if (l.includes('payback') || l.includes('return') || l.includes('roi') || l.includes('kitne saal'))
    return `Solar investment ka return bahut accha hota hai!\n\nTypical payback period:\n• Subsidy ke baad: 4-6 saal\n• Annual ROI: 15-25%\n• Panels ki life: 25+ saal\n\nExample calculation:\n• 3kW system, net cost ₹1,17,000\n• Monthly savings: ~₹2,500-3,000\n• Payback period: ~3.5-4 saal\n• Baaki 21+ saal FREE electricity!\n\n25 saal mein total savings: ₹7-9 lakh (sirf ₹1.17 lakh investment pe)!\n\n💡 Tip: Aapka specific ROI calculate karne ke liye Calculator page use karein — bill amount daalo aur exact numbers paao.`
  return `Namaste! Main Vikram hoon, aapka solar energy expert. 😊\n\nMain aapki help kar sakta hoon:\n• Solar system sizing aur cost calculation\n• Government subsidies aur PM Surya Ghar scheme\n• Net metering aur billing\n• EMI aur financing options\n• Installation aur maintenance guidance\n• Panel types comparison\n\nKoi bhi sawaal poochho — Hindi, English, ya Hinglish mein! 🌞\n\n💡 Quick tip: Apna monthly electricity bill batao, main turant calculate kar doonga kitna bachega solar se!`
}

export default function Assistant() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Namaste! 🙏 Main Vikram hoon, aapka personal solar energy advisor!\n\nMain aapki help kar sakta hoon:\n• Solar savings calculate karna\n• Government subsidies samajhna (up to ₹78,000!)\n• Sahi panel choose karna\n• EMI aur financing options\n• Net metering aur maintenance\n\nHindi, English, ya Hinglish — kisi bhi language mein poochho! 🌞\n\nAapka monthly electricity bill kitna hai? Main turant bata doonga kitna bachega solar se! 💰`,
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const bottomRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // VOICE INPUT
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please use Chrome.')
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'hi-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setInput(transcript)
      setListening(false)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  // TEXT TO SPEECH
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const clean = text.replace(/[•\*#]/g, '').replace(/\n+/g, '. ')
      const utterance = new SpeechSynthesisUtterance(clean)
      utterance.lang = 'hi-IN'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    const userMsg = { role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setTyping(true)
    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || getFallback(msg)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      speak(reply)
    } catch {
      const fallback = getFallback(msg)
      setMessages(prev => [...prev, { role: 'assistant', content: fallback }])
      speak(fallback)
    } finally {
      setTyping(false)
    }
  }

  return (
    <motion.div className={styles.page}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.botAvatar}><Bot size={18} strokeWidth={1.5} /></div>
        <div style={{ flex: 1 }}>
          <div className={styles.botName}>Vikram — Solar AI Expert</div>
          <div className={styles.botStatus}>
            <span className={styles.statusDot} />
            Online · Hindi, English & Hinglish
          </div>
        </div>
        <button
          className={`${styles.voiceToggle} ${speaking ? styles.voiceActive : ''}`}
          onClick={speaking ? stopSpeaking : () => speak(messages[messages.length - 1]?.content || '')}>
          {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* CHIPS */}
      <div className={styles.chips}>
        {QUICK_CHIPS.map(c => (
          <button key={c.label} className={styles.chip} onClick={() => send(c.q)}>{c.label}</button>
        ))}
      </div>

      {/* MESSAGES */}
      <div className={styles.messages}>
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div key={i}
              className={`${styles.msg} ${m.role === 'user' ? styles.userMsg : styles.aiMsg}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {m.role === 'assistant' && (
                <div className={styles.aiAvatar}><Bot size={14} strokeWidth={1.5} /></div>
              )}
              <div className={styles.bubble}>
                {m.content.split('\n').map((line, li, arr) => (
                  <span key={li}>
                    {line.startsWith('•') ? <span style={{ display: 'block', paddingLeft: 8 }}>{line}</span> : line}
                    {li < arr.length - 1 && <br />}
                  </span>
                ))}
                {m.role === 'assistant' && (
                  <button className={styles.speakBtn} onClick={() => speak(m.content)}>
                    <Volume2 size={12} /> Listen
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <div className={`${styles.msg} ${styles.aiMsg}`}>
            <div className={styles.aiAvatar}><Bot size={14} strokeWidth={1.5} /></div>
            <div className={styles.bubble}>
              <div className={styles.dots}><span /><span /><span /></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className={styles.inputRow}>
        <button
          className={`${styles.micBtn} ${listening ? styles.micActive : ''}`}
          onClick={listening ? stopListening : startListening}>
          {listening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
        <input className={styles.chatInput} value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder={listening ? 'Listening... speak now' : 'Ask in Hindi, English or Hinglish...'} />
        <button className={styles.sendBtn} onClick={() => send()}>
          <Send size={16} strokeWidth={1.5} />
        </button>
      </div>

    </motion.div>
  )
}