import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./IndiaMap.module.css";

const sections = [1, 2, 3, 4, 5, 6];

const STATES = [
  "Delhi-NCR",
  "Uttar Pradesh",
  "Punjab",
  "Karnataka",
  "Telangana",
  "Gujarat",
  "Madhya Pradesh",
  "Maharashtra",
];

export default function IndiaMap() {
  const [activeState, setActiveState] = useState("Delhi-NCR");
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      const index = Math.floor(scrollY / height);
      setActiveDot(index);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mapSrc = `https://maps.google.com/maps?q=28.6139,77.2090&z=5&output=embed&t=m`;

  return (
    <div className={styles.pageWrapper}>
      {/* LEFT SCROLL DOTS */}
      <div className={styles.scrollDots}>
        {sections.map((_, i) => (
          <div
            key={i}
            className={`${styles.scrollDot} ${
              activeDot === i ? styles.activeDot : ""
            }`}
          />
        ))}
      </div>

      {/* MAP SECTION */}
      <section className={styles.section}>
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
        >
          <div className={styles.miniTitle}>PAN INDIA PRESENCE</div>

          <h2 className={styles.title}>zunsolars Across India</h2>

          <div className={styles.underline}></div>
        </motion.div>

        <motion.div
          className={styles.mapCard}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
        >
          {/* LEFT PANEL */}
          <div className={styles.overlayPanel}>
            <h3 className={styles.overlayTitle}>
              Over 4500+ high quality solar rooftop installations across 75+
              cities, ranging from 1kW to 100kW.
            </h3>

            <div className={styles.statesGrid}>
              {STATES.map((state) => (
                <button
                  key={state}
                  onClick={() => setActiveState(state)}
                  className={`${styles.stateBtn} ${
                    activeState === state ? styles.stateBtnActive : ""
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* MAP */}
          <iframe
            src={mapSrc}
            className={styles.map}
            loading="lazy"
            title="India Solar Map"
          />
        </motion.div>
      </section>

      {/* SUCCESS STORIES */}
      <section className={styles.storySection}>
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
        >
          <div className={styles.miniTitle}>SUCCESS STORIES</div>

          <h2 className={styles.title}>Solar Success Stories</h2>

          <div className={styles.underline}></div>
        </motion.div>

        <motion.div
          className={styles.cardsWrap}
          animate={{ x: [0, -20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* CARD */}
          <div className={styles.storyCard}>
            <div className={styles.quote}>“</div>

            <p className={styles.storyText}>
              They helped us with installation, subsidy and net metering. Our
              solar installation is helping us save a lot on electricity bills.
            </p>

            <div className={styles.user}>Mr. Sunil Kumar</div>

            <div className={styles.location}>Lucknow</div>
          </div>

          {/* IMAGE CARD */}
          <div className={styles.storyImageCard}>
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
              alt=""
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}