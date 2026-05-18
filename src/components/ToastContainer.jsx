import { AnimatePresence, motion } from 'framer-motion'

export default function ToastContainer({ toasts }) {
  return (
    <div style={{ position:'fixed',bottom:28,right:28,zIndex:9999,display:'flex',flexDirection:'column',gap:10 }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ x:60,opacity:0,scale:0.95 }}
            animate={{ x:0,opacity:1,scale:1 }}
            exit={{ x:60,opacity:0,scale:0.95 }}
            transition={{ type:'spring',stiffness:400,damping:30 }}
            style={{
              background:'var(--surface2)',
              border:`1px solid ${t.type==='warn' ? 'rgba(255,160,0,0.3)' : 'var(--green-border)'}`,
              borderRadius:10,padding:'13px 18px',fontSize:13,
              color:t.type==='warn' ? '#ffb300' : 'var(--green)',
              maxWidth:320,boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
              backdropFilter:'blur(20px)',
            }}>
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
