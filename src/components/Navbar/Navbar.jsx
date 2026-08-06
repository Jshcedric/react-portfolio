import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { scrollToHash } from "../../utils/scrollTo";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    scrollToHash(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <motion.a
          href="#"
          className="navbar-logo"
          onClick={(event) => handleNavClick(event, "#")}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <span className="navbar-logo-mark">JC</span>
          <span className="navbar-logo-text">
            <span className="navbar-logo-name">Joshua Cedric Cortez</span>
            <span className="navbar-logo-role">Computer Science Student</span>
          </span>
        </motion.a>

        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar-link"
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#contact"
          className="navbar-hire-btn"
          onClick={(event) => handleNavClick(event, "#contact")}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          Hire Me
        </motion.a>

        <button
          className="navbar-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="navbar-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ul className="navbar-mobile-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="navbar-mobile-link"
                    onClick={(event) => handleNavClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="navbar-mobile-hire-btn"
                  onClick={(event) => handleNavClick(event, "#contact")}
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}