import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiGithub, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import "./Contact.css";

const CONTACT_CARDS = [
  {
    label: "Email",
    value: "example@email.com",
    icon: <FiMail />,
  },
  {
    label: "GitHub",
    value: "https://github.com/yourusername",
    icon: <FiGithub />,
  },
  {
    label: "LinkedIn",
    value: "https://linkedin.com/in/yourprofile",
    icon: <FaLinkedin />,
  },
  {
    label: "Location",
    value: "Philippines",
    icon: <FiMapPin />,
  },
];

const SOCIAL_LINKS = [
  { label: "GitHub", icon: <FaGithub />, href: "#" },
  { label: "LinkedIn", icon: <FaLinkedin />, href: "#" },
  { label: "Facebook", icon: <FaFacebook />, href: "#" },
  { label: "Email", icon: <FaEnvelope />, href: "#" },
];

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };
const INITIAL_ERRORS = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function validateField(name, value) {
  const trimmed = value.trim();

  switch (name) {
    case "name":
      if (!trimmed) return "Please enter your full name.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      return "";
    case "email":
      if (!trimmed) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Please enter a valid email address.";
      return "";
    case "subject":
      if (!trimmed) return "Please enter a subject.";
      if (trimmed.length < 3) return "Subject must be at least 3 characters.";
      return "";
    case "message":
      if (!trimmed) return "Please enter a message.";
      if (trimmed.length < 10) return "Message must be at least 10 characters.";
      return "";
    default:
      return "";
  }
}

function validateForm(data) {
  return {
    name: validateField("name", data.name),
    email: validateField("email", data.email),
    subject: validateField("subject", data.subject),
    message: validateField("message", data.message),
  };
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Re-validate live once a field has already been touched,
    // so the error clears as soon as the user fixes it.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitError("");

    const fieldErrors = validateForm(formData);
    const hasErrors = Object.values(fieldErrors).some(Boolean);

    setErrors(fieldErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (hasErrors) {
      setSubmitError("Please fix the errors below before sending your message.");
      const firstInvalidField = Object.keys(fieldErrors).find(
        (field) => fieldErrors[field]
      );
      if (firstInvalidField) {
        document.getElementById(firstInvalidField)?.focus();
      }
      return;
    }

    setSubmitted(true);
    setFormData(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setTouched({});
  };

  return (
    <motion.section
      id="contact"
      className="section contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <p className="contact-subtitle">
          Let's connect! Feel free to reach out for collaborations,
          opportunities, or just to say hello.
        </p>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="contact-heading">Let's Build Something Together</h3>
            <p className="contact-text">
              I'm always open to discussing new opportunities, collaborating
              on exciting projects, or simply connecting with fellow
              developers. Whether you have a question or just want to say
              hello, I'd love to hear from you.
            </p>

            <motion.div
              className="contact-cards"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {CONTACT_CARDS.map((card) => (
                <motion.div
                  className="card contact-card"
                  key={card.label}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <span className="contact-card-icon">{card.icon}</span>
                  <span className="contact-card-label">{card.label}</span>
                  <span className="contact-card-value">{card.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <div className="card contact-form-card">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    className="contact-success"
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <FiCheckCircle className="contact-success-icon" />
                    <p className="contact-success-text">
                      Thank you! Your message has been received.
                    </p>
                    <button
                      type="button"
                      className="contact-success-reset"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    className="contact-form"
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {submitError && (
                      <p className="contact-form-error-banner" role="alert">
                        {submitError}
                      </p>
                    )}

                    <div
                      className={`contact-form-group${
                        errors.name ? " has-error" : ""
                      }`}
                    >
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Juan Dela Cruz"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        required
                      />
                      {errors.name && (
                        <span className="contact-form-error" id="name-error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div
                      className={`contact-form-group${
                        errors.email ? " has-error" : ""
                      }`}
                    >
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="juan@email.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        required
                      />
                      {errors.email && (
                        <span className="contact-form-error" id="email-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div
                      className={`contact-form-group${
                        errors.subject ? " has-error" : ""
                      }`}
                    >
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Let's collaborate"
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        required
                      />
                      {errors.subject && (
                        <span className="contact-form-error" id="subject-error" role="alert">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    <div
                      className={`contact-form-group${
                        errors.message ? " has-error" : ""
                      }`}
                    >
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell me a bit about your project or idea..."
                        rows={5}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        required
                      ></textarea>
                      {errors.message && (
                        <span className="contact-form-error" id="message-error" role="alert">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      className="contact-submit-btn"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      Send Message
                      <FiArrowRight />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="contact-socials">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  href={social.href}
                  key={social.label}
                  className="contact-social-icon"
                  aria-label={social.label}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
