import { motion } from "framer-motion";
import { FiMapPin, FiBookOpen, FiCode } from "react-icons/fi";
import profileImage from "../../assets/hero.webp";
import "./About.css";

const QUICK_INFO = [
  { icon: <FiMapPin />, label: "Location", value: "Philippines" },
  { icon: <FiBookOpen />, label: "Education", value: "Computer Science Student" },
  { icon: <FiCode />, label: "Focus", value: "Frontend Development" },
];

const SKILLS = [
  "React",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Python",
  "Java",
  "Git",
  "GitHub",
  "Responsive Design",
  "Problem Solving",
];

const STATS = [
  { value: "5+", label: "Technologies Learned" },
  { value: "3+", label: "Academic Projects" },
  { value: "100%", label: "Passion for Learning" },
];

export default function About() {
  return (
    <motion.section
      id="about"
      className="section about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="about-subtitle">Get to know me better</p>

        <div className="about-grid">
          <motion.div
            className="about-profile"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="card about-profile-card">
              <div className="about-profile-image-frame">
                <img
                  src={profileImage}
                  alt="Portrait of Joshua Cedric Cortez"
                  className="about-profile-image"
                />
              </div>
              <h3 className="about-profile-name">Joshua Cedric Cortez</h3>
              <p className="about-profile-course">
                Bachelor of Science in Computer Science
              </p>
              <p className="about-profile-title">
                Aspiring Full-Stack Developer
              </p>
            </div>

            <div className="about-info-cards">
              {QUICK_INFO.map((info) => (
                <div className="card about-info-card" key={info.label}>
                  <span className="about-info-icon">{info.icon}</span>
                  <span className="about-info-label">{info.label}</span>
                  <span className="about-info-value">{info.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="about-heading">Who Am I?</h3>
            <p className="about-text">
              I'm Joshua Cedric Cortez, a Bachelor of Science in Computer
              Science student with a passion for software development and
              modern web technologies.
            </p>
            <p className="about-text">
              I enjoy building responsive, user-friendly, and visually
              appealing web applications while continuously improving my
              programming skills. My goal is to become a professional
              full-stack developer by creating projects that solve
              real-world problems and provide meaningful user experiences.
            </p>
            <p className="about-text">
              I enjoy learning new technologies, exploring UI/UX design
              principles, and writing clean, maintainable code.
            </p>

            <h4 className="about-skills-title">Skills</h4>
            <div className="about-skills">
              {SKILLS.map((skill, index) => (
                <motion.span
                  className="about-skill-pill"
                  key={skill}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="about-stats">
              {STATS.map((stat) => (
                <motion.div
                  className="card about-stat-card"
                  key={stat.label}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
