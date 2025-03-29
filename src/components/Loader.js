import React, { useEffect, useState } from 'react';
import styles from '@/styles/Loader.module.css';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for the window load event
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener('load', handleLoad);

    // Fallback: hide loader after 3 seconds even if load event doesn't fire
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={styles.background}>
    <div className={styles.container}>
      <svg width="100%" height="100" viewBox="-1 -1 22 22">
        <path style={{ '--order': 7 }} className={`${styles.eight} ${styles.e8}`}></path>
        <path style={{ '--order': 6 }} className={`${styles.eight} ${styles.e7}`}></path>
        <path style={{ '--order': 5 }} className={`${styles.eight} ${styles.e6}`}></path>
        <path style={{ '--order': 4 }} className={`${styles.eight} ${styles.e5}`}></path>
        <path style={{ '--order': 3 }} className={`${styles.eight} ${styles.e4}`}></path>
        <path style={{ '--order': 2 }} className={`${styles.eight} ${styles.e3}`}></path>
        <path style={{ '--order': 1 }} className={`${styles.eight} ${styles.e2}`}></path>
        <path style={{ '--order': 0 }} className={`${styles.eight} ${styles.e1}`}></path>
      </svg>
    </div>
    </div>
  );
};

export default Loader;
