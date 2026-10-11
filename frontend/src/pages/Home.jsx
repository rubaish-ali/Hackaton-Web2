import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faFilePdf,
  faLightbulb,
  faGraduationCap,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faRobot,
    title: "AI Problem Solver",
    description:
      "Describe everyday challenges and explore practical, AI-powered solutions.",
    link: "/ai-chat",
    action: "Talk to AI",
  },
  {
    icon: faFilePdf,
    title: "Smart Resume Review",
    description:
      "Upload your PDF resume and receive feedback to improve your job applications.",
    link: "/career",
    action: "Review Resume",
  },
  {
    icon: faGraduationCap,
    title: "Career Guidance",
    description:
      "Discover relevant career paths, useful skills and actionable next steps.",
    link: "/career",
    action: "Explore Careers",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            AI FOR A BETTER PAKISTAN
          </span>

          <h1>
            Big challenges.
            <br />
            <span>Smarter solutions.</span>
          </h1>

          <p>
            A platform that helps people explore solutions to everyday
            problems, improve their skills and discover new opportunities
            with artificial intelligence.
          </p>

          <div className="hero-actions">
            <Link to="/ai-chat" className="primary-button">
              Explore AI Solutions <FontAwesomeIcon icon={faArrowRight} />
            </Link>

            <Link to="/career" className="secondary-button">
              Improve Your Resume
            </Link>
          </div>

          <div className="hero-note">
            <FontAwesomeIcon icon={faLightbulb} />
            Built around people, ideas and positive change.
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-top">
            <span className="status-dot" />
            NEXORA INTELLIGENCE
            <span className="visual-label">ASSISTANT</span>
          </div>

          <div className="visual-icon">
            <FontAwesomeIcon icon={faRobot} />
          </div>

          <h3>What can we solve today?</h3>
          <p>
            Education, clean communities, employment, water conservation
            and more.
          </p>

          <Link to="/ai-chat" className="visual-prompt">
            Ask your question <FontAwesomeIcon icon={faArrowRight} />
          </Link>

          <div className="floating-card">
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>
              <strong>Grow your skills</strong>
              <small>Build your future</small>
            </span>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <span className="section-eyebrow">WHAT YOU CAN DO</span>
          <h2 className="section-title">One platform. More possibilities.</h2>
          <p className="section-description">
            Practical AI tools designed to help you take your next step.
          </p>

          <div className="cards">
            {features.map((feature) => (
              <article className="card" key={feature.title}>
                <div className="card-icon">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                <Link className="card-link" to={feature.link}>
                  {feature.action} <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-section">
        <div className="container impact-content">
          <div>
            <span className="section-eyebrow">OUR VISION</span>
            <h2>Technology should create opportunities for everyone.</h2>
          </div>

          <Link to="/about" className="secondary-button">
            Discover Our Mission
          </Link>
        </div>
      </section>
    </>
  );
}