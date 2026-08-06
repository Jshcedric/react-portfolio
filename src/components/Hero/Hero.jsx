import { motion } from "framer-motion";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FiArrowDown } from "react-icons/fi";
import heroImage from "../../assets/hero.webp";
import { scrollToHash } from "../../utils/scrollTo";
import "./Hero.css";

const TECH_STACK = [
  { label: "React", icon: <SiReact /> },
  { label: "JavaScript", icon: <SiJavascript /> },
  { label: "HTML", icon: <SiHtml5 /> },
  { label: "CSS", icon: <span>CSS</span> },
  { label: "Git", icon: <SiGit /> },
  { label: "GitHub", icon: <SiGithub /> },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Hero() {
  const handleNavClick = (event, href) => {
    event.preventDefault();
    scrollToHash(href);
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero-badge" variants={itemVariants}>
            👋 Hello, I'm
          </motion.span>

          <motion.h1 className="hero-name" variants={itemVariants}>
            Joshua Cedric Cortez
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Computer Science Student
          </motion.p>

          <motion.p className="hero-accent" variants={itemVariants}>
            Aspiring Full-Stack Developer
          </motion.p>

          <motion.p className="hero-description" variants={itemVariants}>
            I'm a Computer Science student passionate about creating
            responsive web applications and continuously improving my
            programming skills. I enjoy solving problems, learning modern
            technologies, and building software with clean, user-friendly
            interfaces.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.a
              href="#projects"
              className="btn hero-btn-primary"
              onClick={(event) => handleNavClick(event, "#projects")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="btn hero-btn-secondary"
              onClick={(event) => handleNavClick(event, "#contact")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div className="hero-tech-list" variants={itemVariants}>
            {TECH_STACK.map((tech, index) => (
              <motion.span
                key={tech.label}
                className="hero-tech-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <span className="hero-tech-icon">{tech.icon}</span>
                {tech.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <div className="hero-glow hero-glow-one" aria-hidden="true"></div>
          <div className="hero-glow hero-glow-two" aria-hidden="true"></div>

          <motion.div
            className="hero-image-frame"
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={heroImage}
              alt="Portrait of Joshua Cedric Cortez"
              className="hero-image"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="hero-scroll"
        onClick={(event) => handleNavClick(event, "#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        aria-label="Scroll to About section"
      >
        <span>Scroll Down</span>
        <motion.span
          className="hero-scroll-arrow"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown />
        </motion.span>
      </motion.a>
    </section>
  );
}
