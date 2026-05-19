import styles from './SolarSun.module.css'

export default function SolarSun() {
  return (
    <div className={styles.sunWrap}>
      <div className={styles.glow} />
      <div className={styles.ring1} />
      <div className={styles.ring2} />
      <div className={styles.ring3} />
      <div className={styles.sun}>
        <div className={styles.sunInner} />
      </div>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={styles.ray}
          style={{ transform: `rotate(${i * 30}deg)` }}
        />
      ))}
    </div>
  )
}