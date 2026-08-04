import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiGrid,
  FiCheckSquare,
  FiDollarSign,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import "./Projects.css";

const PROJECTS = [
  {
    title: "Parking System",
    category: "Java Application",
    description:
      "A Java application that manages vehicle entry, exit, and slot allocation for a parking facility. Tracks available slots in real time and calculates parking fees based on duration.",
    features: [
      "Tracks available and occupied parking slots in real time",
      "Records vehicle entry and exit timestamps",
      "Automatically computes parking fees based on duration",
      "Prevents booking of already-occupied slots",
    ],
    tech: ["Java", "OOP", "Collections"],
    icon: <FiGrid />,
    featured: true,
  },
  {
    title: "To-Do List Application",
    category: "Java Application",
    description:
      "A task management application built in Java that lets users add, edit, complete, and delete tasks, helping keep daily activities organized and on track.",
    features: [
      "Add, edit, and delete tasks",
      "Mark tasks as complete or pending",
      "Organizes tasks for easy tracking",
      "Simple, straightforward task workflow",
    ],
    tech: ["Java", "OOP", "File I/O"],
    icon: <FiCheckSquare />,
    featured: false,
  },
  {
    title: "Payroll Computation",
    category: "Java Application",
    description:
      "A Java program that automates employee payroll processing, computing gross and net pay based on hours worked, deductions, and allowances.",
    features: [
      "Computes gross and net pay per employee",
      "Applies deductions and allowances automatically",
      "Reduces manual computation errors",
      "Generates a clear payroll summary",
    ],
    tech: ["Java", "OOP"],
    icon: <FiDollarSign />,
    featured: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <motion.section
      id="projects"
      className="section projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="projects-subtitle">
          Here are some of the projects I've worked on throughout my learning
          journey.
        </p>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project) => (
            <motion.article
              className="card project-card"
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {project.featured && (
                <span className="project-featured-badge">Featured</span>
              )}

              <div className="project-icon" aria-hidden="true">
                {project.icon}
              </div>

              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech-list">
                {project.tech.map((tech, index) => (
                  <motion.span
                    className="project-tech-badge"
                    key={tech}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="project-actions">
                <motion.button
                  type="button"
                  className="btn project-btn-primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  aria-label={`View details for ${project.title}`}
                  onClick={() => setActiveProject(project)}
                >
                  View Details
                  <FiArrowRight />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.title} details`}
            >
              <button
                type="button"
                className="project-modal-close"
                onClick={() => setActiveProject(null)}
                aria-label="Close details"
              >
                <FiX />
              </button>

              <div className="project-icon project-modal-icon" aria-hidden="true">
                {activeProject.icon}
              </div>

              <span className="project-category">{activeProject.category}</span>
              <h3 className="project-modal-title">{activeProject.title}</h3>
              <p className="project-modal-description">
                {activeProject.description}
              </p>

              <h4 className="project-modal-subheading">Key Features</h4>
              <ul className="project-modal-features">
                {activeProject.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="project-tech-list">
                {activeProject.tech.map((tech) => (
                  <span className="project-tech-badge" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
