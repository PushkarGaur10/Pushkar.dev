"use client";

import React, { useState } from "react";
import styles from "../../styles/navbar.module.css";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarleft}>Pushkar.dev</div>
      <div className={styles.navbarright} onClick={toggleMenu}>
        {menuOpen ? "Close" : "Menu"}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.navcont}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: "-100%",
              transition: { delay: 1.2, duration: 0.5, ease: "easeOut" },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Left Section: Links */}
            <motion.div
              className={styles.left}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 100,
                transition: { delay: 0.8, duration: 0.6, ease: "easeIn" },
              }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              {/* Top Section */}
              <motion.div
                className={styles.link}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{
                  scaleX: 0,
                  transition: { delay: 0.8, duration: 0.3, ease: "easeIn" },
                }}
                transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className={styles.right}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 100,
                    transition: { delay: 0.8, duration: 0.6, ease: "easeIn" },
                  }}
                  transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                >
                  Top Section
                </motion.div>
              </motion.div>

              {/* Projects */}
              <motion.div
                className={styles.link}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{
                  scaleX: 0,
                  transition: { delay: 0.6, duration: 0.3, ease: "easeIn" },
                }}
                transition={{ delay: 0.7, duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className={styles.right}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 100,
                    transition: { delay: 0.6, duration: 0.6, ease: "easeIn" },
                  }}
                  transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
                >
                  Projects
                </motion.div>
              </motion.div>

              {/* Technical Skills */}
              <motion.div
                className={styles.link}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{
                  scaleX: 0,
                  transition: { delay: 0.4, duration: 0.3, ease: "easeIn" },
                }}
                transition={{ delay: 0.8, duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className={styles.right}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 100,
                    transition: { delay: 0.4, duration: 0.6, ease: "easeIn" },
                  }}
                  transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
                >
                  Technical Skills
                </motion.div>
              </motion.div>

              {/* Experience */}
              <motion.div
                className={styles.link}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{
                  scaleX: 0,
                  transition: { delay: 0.2, duration: 0.3, ease: "easeIn" },
                }}
                transition={{ delay: 0.9, duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className={styles.right}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 100,
                    transition: { delay: 0.2, duration: 0.6, ease: "easeIn" },
                  }}
                  transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
                >
                  Experience
                </motion.div>
              </motion.div>

              {/* Contact */}
              <motion.div
                className={styles.link1}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{
                  scaleX: 0,
                  transition: { delay: 0, duration: 0.3, ease: "easeIn" },
                }}
                transition={{ delay: 1.0, duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className={styles.right}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 100,
                    transition: { delay: 0, duration: 0.6, ease: "easeIn" },
                  }}
                  transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
                >
                  Contact
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Section: Contact & Links */}
            <motion.div
              className={styles.right}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 100,
                transition: { delay: 0, duration: 0.6, ease: "easeIn" },
              }}
              transition={{ delay: 2.6, duration: 0.6, ease: "easeOut" }}
            >
              <div>
                <div className={styles.topic}>Mail:</div>
                <div className={styles.text}>pushkarsharma2699@gmail.com</div>
              </div>
              <div>
                <div className={styles.topic}>Links:</div>
                <div className={styles.icons}>
                  <Link href={'https://www.instagram.com/pushkar_2601?igsh=NDJkeW1mdzVhdGww'} className={styles.linked}><FaInstagram className={styles.icon} /></Link>
                  <Link href={'https://www.linkedin.com/in/pushkargaur10/'} className={styles.linked}><FaLinkedin className={styles.icon} /></Link>
                  <Link href={'https://github.com/PushkarGaur10'} className={styles.linked}><FaGithub className={styles.icon} /></Link>
                </div>
              </div>
              <div className={styles.text1}>
                <IoLocationSharp className={styles.icon} /> Delhi, India
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
