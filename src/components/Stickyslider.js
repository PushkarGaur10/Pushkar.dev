import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '@/styles/StickySlider.module.css';
import Image from 'next/image';

const slides = [
  { id: 1, content: 'HTML', url:'/skills/html1.png' },
  { id: 2, content: 'CSS', url:'/skills/css.png' },
  { id: 3, content: 'Javascript', url:'/skills/javascript.png' },
  { id: 4, content: 'React Js', url:'/skills/reactjs.png' },
  { id: 5, content: 'Next Js', url:'/skills/3.jpg' },
  { id: 6, content: 'Node Js', url:'/skills/nodejs.png' },
  { id: 7, content: 'Express Js', url:'/skills/4.jpg' },
  { id: 8, content: 'MongoDB', url:'/skills/mongodb.png' },
  { id: 9, content: 'Tailwind CSS', url:'/skills/tailwind.png' },
  { id: 10, content: 'TypeScript', url:'/skills/typescript.png' },
  { id: 11, content: 'Redux', url:'/skills/redux.png' },
  { id: 12, content: 'Git', url:'/skills/git.png' },
  { id: 13, content: 'Docker', url:'/skills/docker.png' },
  { id: 14, content: 'Figma', url:'/skills/figma.png' },
  { id: 15, content: 'Three Js', url:'/skills/threejs.svg' },
];

const slideWidth = 300; // px
const gap = 20;         // px
const totalTranslate = (slides.length - 1) * (slideWidth + gap);

const StickySlider = () => {
  const containerRef = useRef(null);

  // Get scroll progress for the wrapper element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress from 0.1 to 0.7 to horizontal translation
  const xRange = useTransform(scrollYProgress, [0.1, 0.7], [0, -totalTranslate], { clamp: true });

  // Map scroll progress from 0.15 to 0.2 to opacity (1 => 0)
  const topicOpacity = useTransform(scrollYProgress, [0.15, 0.8], [1, 0], { clamp: true });

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <motion.div className={styles.topic} style={{ opacity: topicOpacity }}>
        Technical Skills
      </motion.div>
      <div className={styles.sticky}>
        <motion.div className={styles.slider} style={{ x: xRange }}>
          {slides.map((slide) => (
            <div key={slide.id} className={styles.slide}>
            <div className={styles.flexhead}>
              <Image src={slide.url} className={styles.img} height={100} width={100} alt='img'/>
              <div>{slide.content}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StickySlider;
