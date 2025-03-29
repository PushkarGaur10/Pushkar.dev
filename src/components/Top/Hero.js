import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/TextShredding.module.css";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: "easeOut", delay: 3 } // Added 1s delay
  },
};

const TextShredding = ({ loading }) => {
  return (
    <div className={styles.shreddingContainer}>
      <motion.h1 className={styles.shreddingText}>
        <div className={styles.overflow}>
        <motion.div 
        className={styles.heading}
        variants={textVariants} 
        initial="hidden" 
        animate={loading ? "visible" : "hidden"}>
          Transform ideas into interactive designs
        </motion.div>
        </div>
        <div className={styles.overflow1}>
        <motion.div className={styles.text} 
        variants={textVariants}
        initial="hidden" 
        animate={loading ? "visible" : "hidden"}>
          Blending code with creativity to build seamless user experiences
        </motion.div>
        </div>
      </motion.h1>
    </div>
  );
};

export default TextShredding;
