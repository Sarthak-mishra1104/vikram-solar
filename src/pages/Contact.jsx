import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageSquare, MapPin, Home, CheckCircle } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import styles from './Contact.module.css'

const QUICK = [
  { Icon:MessageSquare, bg:'rgba(37,211,102,0.1)', color:'#25D366', title:'WhatsApp', sub:'Chat with a solar expert instantly', action:'Opening WhatsApp...' },
  { Icon:Phone,         bg:'rgba(204,0,0,0.1)',    color:'var(--red)',  title:'Call: 1800-XXX-XXXX', sub:'Mon–Sat, 9AM–7PM · Toll Free', action:'Calling...' },
  { Icon:Home,          bg:'rgba(255,255,255,0.06)', color:'var(--text)', title:'Request Site Visit', sub:'Free rooftop survey by certified engineer', action:'Scheduling visit...' },
  { Icon:MapPin,        bg:'rgba(255,255,255,0.06)', color:'var(--text)', title:'Find Nearest Installer', sub:'Certified partners across 22 states', action:'Finding nearest installer...' },
]
const INTERESTS = ['Residential Solar — Home','Society / Apartment Complex','Small Business / Commercial','Agricultural / Farm Pump','Industrial / Factory','Just Exploring']

export default function Contact() {
  const toast = useToast()
  const [form, setForm] = useState({name:'',phone:'',city:'',bill:'',interest:INTERESTS[0],msg:''})
  const [submitted, setSubmitted] = useState(false)
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}))

  const submit = () => {
    if(!form.name.trim()||!form.phone.trim()){ toast('Please fill in your name and mobile number','warn'); return }
    setSubmitted(true); toast('Consultation booked successfully')
  }

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.35}}>
      <div className={styles.pageHeader}>
        <div className="section-label">Contact Us</div>
        <h1 className={styles.pageTitle}>Get In Touch</h1>
        <p className={styles.pageSub}>Talk to our certified solar experts. Free consultation, no obligations.</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <div className={styles.panelHead}>Quick Connect</div>
          <div className={styles.quickGrid}>
            {QUICK.map(q=>(
              <motion.div key={q.title} className={styles.quickCard}
                onClick={()=>toast(q.action)} whileHover={{x:4}} transition={{type:'spring',stiffness:400,damping:20}}>
                <div className={styles.quickIcon} style={{background:q.bg}}>
                  <q.Icon size={18} strokeWidth={1.5} style={{color:q.color}}/>
                </div>
                <div>
                  <div className={styles.quickTitle}>{q.title}</div>
                  <div className={styles.quickSub}>{q.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.certBox}>
            <div className={styles.certTitle}>Certifications & Awards</div>
            {['MNRE Approved Installer','BIS Certified Panels','ISO 9001:2015 Quality','25-Year Performance Warranty'].map(c=>(
              <div key={c} className={styles.certItem}>
                <CheckCircle size={14} style={{color:'var(--red)',flexShrink:0}}/>
                <span>{c}</span>
              </div>
            ))}
          </div>

          <div className={styles.faqBox}>
            <div className={styles.certTitle}>Common Questions</div>
            {[
              ['How long does installation take?','1–2 days for residential systems after permit approval.'],
              ['Do I need to inform my DISCOM?','Yes — your Vikram Solar installer handles the net metering application.'],
              ['What happens during a power cut?','Grid-tied systems shut down for safety. Add battery backup to use power during outages.'],
            ].map(([q,a])=>(
              <div key={q} className={styles.faqItem}>
                <div className={styles.faqQ}>{q}</div>
                <div className={styles.faqA}>{a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightCol}>
          {submitted ? (
            <motion.div className={styles.successBox} initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}}>
              <CheckCircle size={48} style={{color:'var(--red)',marginBottom:16}}/>
              <h3 className={styles.successTitle}>Consultation Booked</h3>
              <p className={styles.successSub}>Our solar expert will call <strong>{form.phone}</strong> within 2 working hours.</p>
              <button className={styles.submitBtn} style={{marginTop:24}} onClick={()=>setSubmitted(false)}>Submit Another Request</button>
            </motion.div>
          ) : (
            <>
              <div className={styles.panelHead}>Book Free Consultation</div>
              <div className="form-group"><label className="form-label">Full Name *</label>
                <input className="form-input" value={form.name} onChange={set('name')} placeholder="Your full name"/></div>
              <div className="form-group"><label className="form-label">Mobile Number *</label>
                <input className="form-input" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210"/></div>
              <div className={styles.formRow}>
                <div className="form-group" style={{flex:1}}><label className="form-label">City</label>
                  <input className="form-input" value={form.city} onChange={set('city')} placeholder="e.g. Dewas, Indore"/></div>
                <div className="form-group" style={{flex:1}}><label className="form-label">Monthly Bill (₹)</label>
                  <input className="form-input" type="number" value={form.bill} onChange={set('bill')} placeholder="e.g. 4000"/></div>
              </div>
              <div className="form-group"><label className="form-label">I Am Interested In</label>
                <select className="form-select" value={form.interest} onChange={set('interest')}>
                  {INTERESTS.map(i=><option key={i}>{i}</option>)}
                </select></div>
              <div className="form-group"><label className="form-label">Message</label>
                <textarea className="form-textarea" value={form.msg} onChange={set('msg')} placeholder="Tell us about your requirements, rooftop size, or any questions..."/></div>
              <button className={styles.submitBtn} onClick={submit}>Submit Request</button>
              <p className={styles.disclaimer}>Our experts will contact you within 2 working hours. No spam.</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
