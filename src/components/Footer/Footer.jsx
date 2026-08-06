import { motion } from "framer-motion";
import { scrollToHash } from "../../utils/scrollTo";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Footer() {
  const year = new Date().getFullYear();

  const handleLinkClick = (event, href) => {
    event.preventDefault();
    scrollToHash(href);
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container footer-container">
        <motion.div
          className="footer-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="footer-brand" variants={itemVariants}>
            <span className="footer-brand-name">Joshua Cedric Cortez</span>
            <span className="footer-brand-role">Computer Science Student</span>
            <p className="footer-brand-text">
              Building modern web experiences with clean code and thoughtful
              design.
            </p>
          </motion.div>

          <motion.nav
            className="footer-links"
            variants={itemVariants}
            aria-label="Footer navigation"
          >
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links-list">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-link"
                    onClick={(event) => handleLinkClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>

        <div className="footer-divider" aria-hidden="true"></div>

        <p className="footer-copyright">
          © {year} Joshua Cedric Cortez. Built with React and{" "}
          <span className="footer-heart" aria-label="love">
            ❤️
          </span>
        </p>
      </div>
    </motion.footer>
  );
}
