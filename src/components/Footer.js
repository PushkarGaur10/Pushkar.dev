import React from 'react'
import styles from '@/styles/Footer.module.css'
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';

export default function Footer() {
  return (
    <div className={styles.position}>
    <div className={styles.container}>
        <div>Connect</div>
        <div className={styles.icons}>
                  <Link href={'https://www.instagram.com/pushkar_2601?igsh=NDJkeW1mdzVhdGww'} className={styles.linked}><FaInstagram className={styles.icon} /></Link>
                  <Link href={'https://www.linkedin.com/in/pushkargaur10/'} className={styles.linked}><FaLinkedin className={styles.icon} /></Link>
                  <Link href={'https://github.com/PushkarGaur10'} className={styles.linked}><FaGithub className={styles.icon} /></Link>
        </div>
    </div>
    </div>
  )
}
