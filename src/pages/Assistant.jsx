import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot } from 'lucide-react'
import styles from './Assistant.module.css'

const QUICK_CHIPS = [
  { label:'Government Subsidies',  q:'What is the current solar subsidy available in India in 2024?' },
  { label:'Net Metering',          q:'How does net metering work in India?' },
  { label:'EMI & Loan Options',    q:'What are the bank loan and EMI options for solar installation in India?' },
  { label:'System Sizing',         q:'How many kW solar do I need for 300 units per month consumption?' },
  { label:'Maintenance',           q:'How to maintain solar panels in Indian climate? Cleaning and care tips?' },
  { label:'Payback Period',        q:'What is the typical payback period for a 5kW solar system in India?' },
  { label:'Hindi Support',         q:'सोलर पैनल पर सरकारी सब्सिडी कितनी मिलती है?' },
]

const SYSTEM_PROMPT = `You are Vikram AI, an expert solar energy advisor for Vikram Solar India. You help Indian homeowners make informed solar decisions.

Key facts to use:
- PM Surya Ghar Muft Bijli Yojana: ₹30,000 for 1kW, ₹60,000 for 2kW, ₹78,000 for 3kW, ₹94,500 for 4-10kW
- Average installation cost: ₹60,000–70,000 per kW
- 1 kW generates approximately 100–130 units/month depending on location
- Payback period: 4–6 years after subsidy
- Net metering available in all Indian states
- Vikram Solar is an 18+ year old company with 3GW+ installed capacity

Guidelines:
- Be professional, concise and factual
- Use bullet points for lists
- Provide specific numbers when asked
- Answer in the same language as the question (Hindi or English)
- Do not use excessive emojis — maintain a professional tone`

function getFallback(msg) {
  const l = msg.toLowerCase()
  if(l.includes('subsidy')||l.includes('scheme')||l.includes('सब्सिडी'))
    return 'Under the PM Surya Ghar Muft Bijli Yojana:\n\n• 1 kW system: ₹30,000 subsidy\n• 2 kW system: ₹60,000 subsidy\n• 3 kW system: ₹78,000 subsidy (recommended)\n• 4–10 kW system: ₹94,500 subsidy\n\nApply at pmsuryaghar.gov.in. Your certified installer will assist with the documentation.'
  if(l.includes('net meter')||l.includes('grid'))
    return 'Net metering allows you to export surplus solar power to the grid and receive credit on your electricity bill.\n\nHow it works:\n• A bidirectional meter is installed by your DISCOM\n• Excess power fed to grid is credited at a fixed rate\n• You pay only for net units consumed\n• Available across all Indian states\n\nYour installer handles the net metering application with your DISCOM.'
  if(l.includes('emi')||l.includes('loan')||l.includes('finance'))
    return 'Solar financing options available in India:\n\n• SBI Solar Loan: Starting at 7.4% p.a., up to ₹5 lakh\n• Canara Bank Green Energy Loan: ~8% p.a.\n• Bajaj Finserv: Zero-cost EMI options\n• NABARD: Rural and agricultural solar schemes\n\nIn most cases, monthly EMI is lower than your current electricity bill — making solar cash-flow positive from day one.'
  if(l.includes('maintain')||l.includes('clean'))
    return 'Solar panel maintenance in India:\n\n• Clean panels monthly with water and soft cloth — early morning preferred\n• Annual inspection by a certified engineer\n• Monitor output through the inverter app daily\n• Inverter service every 2–3 years\n• Panels rated for 25–30 years of operation\n\nVikram Solar offers Annual Maintenance Contracts (AMC) for all installations.'
  if(l.includes('payback')||l.includes('roi')||l.includes('return'))
    return 'Typical ROI for a residential solar system in India:\n\n• Payback period: 4–6 years after government subsidy\n• Annual return on investment: 15–25%\n• Panel lifespan: 25+ years\n• Net savings over 25 years: 10–15x the net investment\n\nExample: A 3kW system at ₹1.17L net cost saves ~₹2,500–3,000/month = payback in approximately 4 years.'
  return 'I can assist you with:\n\n• Solar system sizing and cost estimation\n• Government subsidies and application process\n• Net metering and grid connection\n• Financing and EMI options\n• Installation and maintenance guidance\n\nFor a personalised analysis, use our Smart Calculator or call 1800-XXX-XXXX for a free consultation.'
}

export default function Assistant() {
  const [messages, setMessages] = useState([{
    role:'assistant',
    content:'Welcome to Vikram Solar AI Assistant.\n\nI can help you with solar system sizing, government subsidies, financing options, net metering, and installation guidance.\n\nAsk me anything in Hindi or English.'
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}) },[messages,typing])

  const send = async (text) => {
    const msg = text || input.trim()
    if(!msg) return
    setInput('')
    const userMsg = {role:'user',content:msg}
    setMessages(prev=>[...prev,userMsg])
    setTyping(true)
    const history = [...messages,userMsg].map(m=>({role:m.role,content:m.content}))
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, system:SYSTEM_PROMPT, messages:history })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || getFallback(msg)
      setMessages(prev=>[...prev,{role:'assistant',content:reply}])
    } catch {
      setMessages(prev=>[...prev,{role:'assistant',content:getFallback(msg)}])
    } finally { setTyping(false) }
  }

  return (
    <motion.div className={styles.page} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.35}}>
      <div className={styles.header}>
        <div className={styles.botAvatar}><Bot size={18} strokeWidth={1.5}/></div>
        <div>
          <div className={styles.botName}>Vikram AI Assistant</div>
          <div className={styles.botStatus}>Online · Answers in Hindi & English</div>
        </div>
      </div>

      <div className={styles.chips}>
        {QUICK_CHIPS.map(c=>(
          <button key={c.label} className={styles.chip} onClick={()=>send(c.q)}>{c.label}</button>
        ))}
      </div>

      <div className={styles.messages}>
        <AnimatePresence initial={false}>
          {messages.map((m,i)=>(
            <motion.div key={i} className={`${styles.msg} ${m.role==='user'?styles.userMsg:styles.aiMsg}`}
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.25}}>
              {m.role==='assistant' && (
                <div className={styles.aiAvatar}><Bot size={14} strokeWidth={1.5}/></div>
              )}
              <div className={styles.bubble}>
                {m.content.split('\n').map((line,li,arr)=>(
                  <span key={li}>
                    {line.startsWith('•') ? <span style={{display:'block',paddingLeft:8}}>{line}</span> : line}
                    {li<arr.length-1 && <br/>}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <div className={`${styles.msg} ${styles.aiMsg}`}>
            <div className={styles.aiAvatar}><Bot size={14} strokeWidth={1.5}/></div>
            <div className={styles.bubble}><div className={styles.dots}><span/><span/><span/></div></div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      <div className={styles.inputRow}>
        <input className={styles.chatInput} value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()} }}
          placeholder="Type your question about solar..." />
        <button className={styles.sendBtn} onClick={()=>send()}>
          <Send size={16} strokeWidth={1.5}/>
        </button>
      </div>
    </motion.div>
  )
}
