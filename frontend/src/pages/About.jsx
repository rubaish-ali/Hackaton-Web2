import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faBullseye,
  faEye,
  faUsers,
  faLightbulb,
  faGraduationCap,
  faHeart,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";


const values = [
  {
    icon: faLightbulb,
    title: "Innovation",
    description:
      "We use AI and modern technology to make everyday challenges easier to understand and solve.",
  },
  {
    icon: faUsers,
    title: "Community First",
    description:
      "We focus on people's needs and encourage solutions that can create a positive community impact.",
  },
  {
    icon: faGraduationCap,
    title: "Learning for Everyone",
    description:
      "We aim to make learning opportunities and useful information easier for people to discover.",
  },
  {
    icon: faHeart,
    title: "Positive Impact",
    description:
      "We believe technology should be practical, accessible, responsible, and helpful to society.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">
            <FontAwesomeIcon icon={faRobot} />
            ABOUT NEXORA
          </span>

          <h1>
            Technology with a purpose.
            <span> Innovation for everyone.</span>
          </h1>

          <p>
            Nexora brings technology, artificial intelligence, and
            practical resources together to help people explore ideas,
            develop skills, and find solutions to everyday challenges.
          </p>

          <a href="#about-mission" className="about-primary-btn">
            Discover Our Mission
            <FontAwesomeIcon icon={faArrowRight} />
          </a>

          <div className="about-hero-note">
            <span className="about-note-dot" />
            Building a smarter, more connected future
          </div>
        </div>

        <div className="about-hero-visual">
          <div className="about-orbit about-orbit-one" />
          <div className="about-orbit about-orbit-two" />

          <div className="about-main-icon">
            <FontAwesomeIcon icon={faRobot} />
          </div>

          <div className="about-floating-card about-floating-top">
            <span className="about-floating-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </span>

            <div>
              <strong>Smart Ideas</strong>
              <p>Explore new possibilities</p>
            </div>
          </div>

          <div className="about-floating-card about-floating-bottom">
            <span className="about-floating-icon">
              <FontAwesomeIcon icon={faUsers} />
            </span>

            <div>
              <strong>People First</strong>
              <p>Technology for everyone</p>
            </div>
          </div>

          <div className="about-visual-caption">
            <span />
            AI-powered possibilities
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro-section">
        <div className="about-section-label">WHO WE ARE</div>

        <h2>
          More than technology.
          <span> A better way forward.</span>
        </h2>

        <p>
          Nexora is designed around the idea that technology should
          be useful in real life. Our platform brings together AI
          assistance, learning support, career resources, and tools
          designed to help people make more informed decisions.
        </p>
      </section>

      {/* Mission and Vision */}
      <section
        className="about-mission-section"
        id="about-mission"
      >
        <article className="about-purpose-card">
          <div className="about-purpose-icon">
            <FontAwesomeIcon icon={faBullseye} />
          </div>

          <span className="about-card-label">OUR MISSION</span>

          <h3>Make useful technology more accessible.</h3>

          <p>
            Our mission is to provide practical digital tools that
            support learning, career development, community awareness,
            and everyday problem-solving.
          </p>
        </article>

        <article className="about-purpose-card about-vision-card">
          <div className="about-purpose-icon">
            <FontAwesomeIcon icon={faEye} />
          </div>

          <span className="about-card-label">OUR VISION</span>

          <h3>A future powered by meaningful innovation.</h3>

          <p>
            We envision a future where technology helps more people
            access information, discover opportunities, and contribute
            to stronger communities.
          </p>
        </article>
      </section>

      {/* Values */}
      <section className="about-values-section" id="about-values">
        <div className="about-section-heading">
          <span className="about-eyebrow">WHAT GUIDES US</span>

          <h2>
            The values behind <span>Nexora.</span>
          </h2>

          <p>
            These principles guide how we approach technology,
            develop useful tools, and think about the people we serve.
          </p>
        </div>

        <div className="about-values-grid">
          {values.map((value, index) => (
            <article className="about-value-card" key={value.title}>
              <div className="about-value-top">
                <div className="about-value-icon">
                  <FontAwesomeIcon icon={value.icon} />
                </div>

                <span className="about-value-number">
                  0{index + 1}
                </span>
              </div>

              <h3>{value.title}</h3>

              <p>{value.description}</p>

              <div className="about-value-line" />
            </article>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="about-platform-section">
        <div className="about-platform-content">
          <span className="about-eyebrow">THE NEXORA EXPERIENCE</span>

          <h2>
            Tools that turn
            <span> possibilities into action.</span>
          </h2>

          <p>
            From AI-powered conversations to career and resume
            assistance, Nexora brings helpful resources into one
            digital experience. Our goal is to make exploring,
            learning, and finding practical guidance easier.
          </p>

          <div className="about-platform-points">
            <div>
              <span className="about-check">✓</span>
              <span>AI assistance for questions and ideas</span>
            </div>

            <div>
              <span className="about-check">✓</span>
              <span>Learning and career development support</span>
            </div>

            <div>
              <span className="about-check">✓</span>
              <span>Tools focused on everyday challenges</span>
            </div>
          </div>
        </div>

        <div className="about-platform-visual">
          <div className="about-platform-glow" />

          <div className="about-platform-logo">
            <FontAwesomeIcon icon={faRobot} />
          </div>

          <div className="about-platform-name">
            <span>NEXORA</span>
            <p>Ideas meet intelligent solutions.</p>
          </div>

          <div className="about-platform-decoration about-decoration-one" />
          <div className="about-platform-decoration about-decoration-two" />
        </div>
      </section>

      {/* Closing Section */}
      <section className="about-closing-section">
        <div className="about-closing-icon">
          <FontAwesomeIcon icon={faHeart} />
        </div>

        <h2>
          The future starts with
          <span> better ideas.</span>
        </h2>

        <p>
          We believe small, thoughtful steps can lead to meaningful
          change. Nexora is here to help you explore what is possible.
        </p>

        <a href="#about-values" className="about-secondary-btn">
          Explore Our Values
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </section>
    </main>
  );
}