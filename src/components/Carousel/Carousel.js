import React, { useRef, useState } from "react"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from '../../styles/Three/slider.module.css';

export default function Carousel (props) {
  const [activeSlide, setactiveSlide] = useState(props.activeSlide || 1);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, threshold: 0.3 });

  const next = () => {
    setactiveSlide((prev) => (prev < props.data.length - 1 ? prev + 1 : prev));
  };
  
  const prev = () => {
    setactiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };
  
  const getStyles = (index) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7
      };
  };

  return (
    <div className={styles.bigC} ref={ref}>
        {/* Background Video */}
        <video
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={"/Projects/vid1.mp4"} type="video/mp4" />
      </video>
      {/* Projects Title */}
      <motion.div
        className={styles.topic}
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Projects
      </motion.div>

      {/* Reflection (Shadow) */}
      <div className={styles.topicReflection}>Projects</div>

      {/* Carousel */}
      <div className={styles.slideC}>
        {props.data.map((item, i) => (
          <React.Fragment key={item.id}>
            <motion.div
              className={styles.slide}
              style={{
                // background: item.bgColor,
                boxShadow: `0 5px 20px ${item.bgColor}30`,
                ...getStyles(i)
              }}
            >
              <SliderContent {...item} />
            </motion.div>
            <div
              className={styles.reflection}
              style={{
                background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                ...getStyles(i)
              }}
            />
          </React.Fragment>
        ))}
      </div>
      {/* Carousel Controls */}
      <div className={styles.btns}>
        <FaChevronLeft
          className={styles.btn1}
          onClick={prev}
          color="#fff"
          size="2x"
        />
        <FaChevronRight
          className={styles.btn2}
          onClick={next}
          color="#fff"
          size="2x"
        />
      </div>
    </div>
  );
};

const SliderContent = (props) => {
  // "flipped" controls which side is visible:
  // false => image (front), true => detailed text (back)
  const [flipped, setFlipped] = useState(false);

  // Define Framer Motion variants for flip animation.
  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  return (
    <div className={styles.sliderContent}>
      <motion.div
        className={styles.card}
        variants={flipVariants}
        animate={flipped ? "back" : "front"}
        transition={{ duration: 0.6 }}
        style={{ 
          transformStyle: "preserve-3d", 
          position: "relative", 
          width: "100%", 
          height: "100%" 
        }}
      >
        {/* Front Side: Image & Icon */}
        <div
          className={styles.cardFace}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden"
          }}
        >
          <div className={styles.imageWrapper}>
            <Image
              className={styles.images}
              src={props.img}
              width={400}
              height={400}
              alt=""
            />
          </div>
          <div className={styles.icons}>
            <BsInfoCircle 
              className={styles.icon}
              onClick={() => setFlipped(true)}
            />
          </div>
        </div>
        {/* Back Side: Detailed Info (scrollable) */}
        <div
          className={styles.cardFace}
          style={{
            position: "absolute",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            overflowY: "auto",
          }}
        >
          
          <div className={styles.infoContent}>
<div className={styles.flexing}>
  <h2 className={styles.projectTitle}>{props.title || "Project Title"}</h2>
  <a href={props.link || "/1"} className={styles.links} target="_blank" rel="noopener noreferrer">
      {props.link ? "Link" : "No Link Available"}
    </a>
</div>
  
  <div className={styles.techStack}>
  <div className={styles.techGrid}>
    {(props.technologies || ["React", "Next.js", "CSS", "JavaScript", "Node.js", "MongoDB", "Tailwind", "Firebase", "GraphQL"]).map((tech, index) => (
      <div key={index} className={styles.techItem}>{tech.slice(0,12)}</div>
    ))}
  </div>
</div>
</div>

          <div className={styles.icons}>
            <RxCross2 
              className={styles.icon}
              onClick={() => setFlipped(false)}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

