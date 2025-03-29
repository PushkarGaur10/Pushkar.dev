"use client"; // Required for Framer Motion in Next.js App Router

import React from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";

import styles from "@/styles/Experience.module.css"; // Import CSS Module

// Animation Variants
const riseUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

export const experiences = [
    {
      id: 1,
      title: "Full Stack Developer",
      company_name: "Upskilledu Solutions",
      icon: "/Projects/U.png", // Place your icon in public/icons/
      iconBg: "#131313",
      date: "Mar 2024 - present",
      points: [
        "I have worked with ReactJs, NextJs, NodeJs, MongoDB, TailwindCSS, JWT, Redux Toolkit, BCrypt, ExpressJS.",
        "Led a team of developers in the successful redesign of websites, resulting in improved user experience and positive client feedback.",
        "Resolved critical performance issues by identifying and refactoring inefficient code sections, resulting in a 50% improvement in application responsiveness.",
      ],
    },
    {
      id: 2,
      title: "Front End Developer",
      company_name: "Hyperglot Review",
      icon: "/Projects/H.jpg",
      iconBg: "#131313",
      date: "Mar 2023 - Mar 2024",
      points: [
        "I worked with ReactJs, NextJs, NodeJs, Redux, SQL, Strapi Headless CMS, Styled Components,Postgresql, Framer motion on several projects and used my experience for writing clean, readable and reusable code",
        "Pioneered the adoption of Nextjs which improved development efficiency by 200%.",
      ],
    },
    {
      id: 3,
      title: "Web Developer",
      company_name: "Hyperglot Review",
      icon: "/Projects/H.jpg", // Place your icon in public/icons/
      iconBg: "#131313",
      date: "Dec 2022 - Mar 2023",
      points: [
        "I worked with HTML, CSS, Bootstrap, Javascript, jquery, Nodejs, slider libraries, external API endpoints on multiple projects and collabrated with the team and gained experience.",
        "Reduced page load times by 30% through implementation of efficient coding practices and image optimization.",
      ],
    },
  ];
  

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#131313", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid rgb(224, 224, 224)" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className={styles.imgcont}>
          <Image
            src={experience.icon}
            alt={experience.company_name}
            width={60}
            height={60}
            className={styles.img}
          />
        </div>
      }
    >
      <div>
        <h3 className={styles.title}>{experience.title}</h3>
        <p className={styles.company}>{experience.company_name}</p>
      </div>

      <ul className={styles.pointsList}>
        {experience.points.map((point, index) => (
          <li key={index} className={styles.point}>
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
     <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={riseUpVariant}
        className={styles.textContainer}
      >
        <motion.p className={styles.sectionSubText} variants={riseUpVariant}>
          What I have done so far
        </motion.p>
        <motion.h2 className={styles.sectionHeadText} variants={riseUpVariant}>
          Work Experience.
        </motion.h2>
      </motion.div>

      <div className={styles.container}>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default Experience;
