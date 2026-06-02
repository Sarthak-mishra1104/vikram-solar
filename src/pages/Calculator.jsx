import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Zap, Sun, Battery, TrendingUp, IndianRupee, Leaf } from 'lucide-react'
import { calculateSolar, APPLIANCE_LOAD } from '../utils/solar'
import { useToast } from '../hooks/useToast'
import styles from './Calculator.module.css'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const STATES = [
  'Maharashtra — MSEDCL','Delhi — BSES / Tata Power','Karnataka — BESCOM',
  'Tamil Nadu — TANGEDCO','Gujarat — DGVCL','Rajasthan — JVVNL',
  'Uttar Pradesh — UPPCL','Madhya Pradesh — MPEZ','Punjab — PSPCL',
  'Haryana — DHBVN','Andhra Pradesh — APEPDCL','Telangana — TSSPDCL',
  'Kerala — KSEB','West Bengal — WBSEDCL',
]
const APPLIANCES = Object.keys(APPLIANCE_LOAD)
function fmt(n) { return Number(n).toLocaleString('en-IN') }

export default function Calculator({ showPage }) {
  const toast = useToast()
  const [form, setForm] = useState({ roofSize:500, monthlyBill:3000, monthlyUnits:300, stateName:STATES[7] })
  const [selected, setSelected] = useState(new Set(['🌀 AC (1.5T)','🔆 Geyser','🖥️ Computer']))
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const toggleApp = (a) => setSelected(prev => { const s = new Set(prev); s.has(a)?s.delete(a):s.add(a); return s })
  const handleFile = (e) => { const f=e.target.files?.[0]; if(f){setFileName(f.name);toast(`File uploaded: ${f.name}`)} }
  const handleDrop = (e) => { e.preventDefault(); const f=e.dataTransfer.files?.[0]; if(f){setFileName(f.name);toast(`File uploaded: ${f.name}`)} }

  const calculate = () => {
    setLoading(true)
    setTimeout(() => { const res = calculateSolar(form)
    setResult(res)
    setLoading(false)
    toast('Calculation complete')
    // Save to Firebase
    try {
      await addDoc(collection(db, 'calculations'), {
        ...form,
        result: res,
        source: 'Calculator',
        status: 'New Lead',
        createdAt: serverTimestamp(),
        companyId: 'solarsync',
      })
    } catch (e) {
      console.error(e)
    }
  }, 1500)
  }

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.35}}>
      <div className={styles.pageHeader}>
        <div className="section-label">AI Calculator</div>
        <h1 className={styles.pageTitle}>Smart Solar Calculator</h1>
        <p className={styles.pageSub}>Enter your details below to get a precise AI-powered solar recommendation with cost, subsidy, ROI and savings breakdown.</p>
      </div>

      <div className={styles.layout}>
        {/* INPUT */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <Zap size={18} strokeWidth={1.5} style={{color:'var(--red)'}} />
            <span>Your Details</span>
          </div>

          <div className="form-group">
            <label className="form-label">Rooftop Size (sq.ft)</label>
            <input className="form-input" type="number" value={form.roofSize} min={50}
              onChange={e=>setForm(f=>({...f,roofSize:+e.target.value}))} placeholder="e.g. 500" />
          </div>
          <div className="form-group">
            <label className="form-label">Monthly Bill Amount (₹)</label>
            <input className="form-input" type="number" value={form.monthlyBill} min={100}
              onChange={e=>setForm(f=>({...f,monthlyBill:+e.target.value}))} placeholder="e.g. 3000" />
          </div>
          <div className="form-group">
            <label className="form-label">Monthly Units Consumed (kWh)</label>
            <input className="form-input" type="number" value={form.monthlyUnits} min={10}
              onChange={e=>setForm(f=>({...f,monthlyUnits:+e.target.value}))} placeholder="e.g. 300" />
          </div>
          <div className="form-group">
            <label className="form-label">State / Electricity Board</label>
            <select className="form-select" value={form.stateName}
              onChange={e=>setForm(f=>({...f,stateName:e.target.value}))}>
              {STATES.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Appliances</label>
            <div className={styles.appGrid}>
              {APPLIANCES.map(a=>(
                <button key={a} className={`${styles.appTag} ${selected.has(a)?styles.appOn:''}`}
                  onClick={()=>toggleApp(a)}>
                  {a.replace(/^[^\s]+\s/,'')}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Electricity Bill (Optional)</label>
            <div className={`${styles.uploadZone} ${fileName?styles.uploaded:''}`}
              onClick={()=>document.getElementById('bill-file').click()}
              onDragOver={e=>e.preventDefault()} onDrop={handleDrop}>
              <Upload size={20} strokeWidth={1.5} style={{color:fileName?'var(--red)':'var(--muted)',margin:'0 auto 8px'}} />
              <div className={styles.uploadText}>
                {fileName ? fileName : <><span style={{color:'var(--red)'}}>Browse</span> or drag & drop bill here</>}
              </div>
              <div className={styles.uploadSub}>JPG, PNG, PDF supported</div>
              <input id="bill-file" type="file" accept="image/*,.pdf" style={{display:'none'}} onChange={handleFile} />
            </div>
          </div>

          <button className={styles.calcBtn} onClick={calculate} disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate Solar Savings'}
          </button>
        </div>

        {/* RESULTS */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <TrendingUp size={18} strokeWidth={1.5} style={{color:'var(--red)'}} />
            <span>AI Recommendation</span>
          </div>

          {!result && !loading && (
            <div className={styles.placeholder}>
              <Sun size={40} strokeWidth={1} style={{color:'var(--muted2)',marginBottom:16}} />
              <p>Enter your details and click<br /><strong>Calculate</strong> to see your solar plan</p>
            </div>
          )}

          {loading && (
            <div className={styles.placeholder}>
              <div className={styles.spinner} />
              <p style={{marginTop:16,color:'var(--muted)'}}>AI is analysing your data...</p>
            </div>
          )}

          {result && !loading && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}}>
              {/* TOP METRICS */}
              <div className={styles.topMetrics}>
                <div className={styles.metric}>
                  <div className={styles.metricIcon}><Zap size={16} strokeWidth={1.5}/></div>
                  <div className={styles.metricVal}>{result.recommendedKw} kW</div>
                  <div className={styles.metricLabel}>Recommended</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricIcon}><Sun size={16} strokeWidth={1.5}/></div>
                  <div className={styles.metricVal}>{result.numPanels}</div>
                  <div className={styles.metricLabel}>Panels Needed</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricIcon}><TrendingUp size={16} strokeWidth={1.5}/></div>
                  <div className={styles.metricVal}>{result.payback} yrs</div>
                  <div className={styles.metricLabel}>Payback Period</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricIcon}><Leaf size={16} strokeWidth={1.5}/></div>
                  <div className={styles.metricVal}>{result.co2Saved}kg</div>
                  <div className={styles.metricLabel}>CO₂ Saved/yr</div>
                </div>
              </div>

              <div className={styles.recRow}>
                <div>
                  <div className={styles.recLabel}>Panel Type</div>
                  <div className={styles.recVal}>{result.panelType}</div>
                </div>
                <div>
                  <div className={styles.recLabel}>Inverter</div>
                  <div className={styles.recVal}>{result.inverterType}</div>
                </div>
              </div>

              <div className={styles.costBlock}>
                <div className={styles.costRow}>
                  <span>Installation Cost</span>
                  <span className="mono">₹{fmt(result.totalCost)}</span>
                </div>
                <div className={styles.costRow} style={{color:'var(--red)'}}>
                  <span>Govt. Subsidy (PM Surya Ghar)</span>
                  <span className="mono">− ₹{fmt(result.subsidy)}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.costRowBig}>
                  <span>Net Cost to You</span>
                  <span className="mono">₹{fmt(result.netCost)}</span>
                </div>
              </div>

              <div className={styles.savingsGrid}>
                <div className={styles.savingsCard}>
                  <IndianRupee size={14} strokeWidth={1.5} style={{color:'var(--red)'}} />
                  <div className={styles.savingsVal}>₹{fmt(result.monthlySavings)}</div>
                  <div className={styles.savingsLabel}>Monthly Savings</div>
                </div>
                <div className={styles.savingsCard}>
                  <IndianRupee size={14} strokeWidth={1.5} style={{color:'var(--red)'}} />
                  <div className={styles.savingsVal}>₹{fmt(result.yearlySavings)}</div>
                  <div className={styles.savingsLabel}>Yearly Savings</div>
                </div>
                <div className={styles.savingsCard}>
                  <TrendingUp size={14} strokeWidth={1.5} style={{color:'var(--red)'}} />
                  <div className={styles.savingsVal}>{result.roiPercent}%</div>
                  <div className={styles.savingsLabel}>Annual ROI</div>
                </div>
              </div>

              {/* BILL COMPARISON */}
              <div className={styles.compareBox}>
                <div className={styles.compareTitle}>Monthly Bill Comparison</div>
                <div className={styles.compareRow}>
                  <div className={styles.compareItem}>
                    <div className={styles.compareLabel}>Before Solar</div>
                    <div className={styles.compareAmt} style={{color:'#ef4444'}}>₹{fmt(form.monthlyBill)}</div>
                    <div className={styles.compareBar}><div style={{width:'100%',height:'100%',background:'rgba(239,68,68,0.4)',borderRadius:3}}/></div>
                  </div>
                  <div className={styles.compareItem}>
                    <div className={styles.compareLabel}>After Solar</div>
                    <div className={styles.compareAmt} style={{color:'var(--red)'}}>₹{fmt(result.billAfter)}</div>
                    <div className={styles.compareBar}>
                      <motion.div initial={{width:0}} animate={{width:`${Math.round(result.billAfter/form.monthlyBill*100)}%`}}
                        transition={{duration:0.9}} style={{height:'100%',background:'var(--red)',borderRadius:3}}/>
                    </div>
                  </div>
                </div>
                <div className={styles.compareSave}>You save {Math.round((1-result.billAfter/form.monthlyBill)*100)}% on your electricity bill</div>
              </div>

              <button className={styles.calcBtn} onClick={()=>showPage('contact')}>
                Get Free Installation Quote
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
