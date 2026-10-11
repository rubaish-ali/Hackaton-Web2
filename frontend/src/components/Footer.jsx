import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand */}
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <FontAwesomeIcon icon={faLeaf} />
                        <span>
                            Nexora<span className="green">.</span>
                        </span>
                    </Link>

                    <p>
                        Your partner in smarter learning, AI assistance,
                        and career growth.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/ai-chat">AI Assistant</Link>
                    <Link to="/career">Resume & Career</Link>
                    <Link to="/about">About Us</Link>
                </div>

                {/* Account */}
                <div className="footer-links">
                    <h3>Your Account</h3>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} Nexora. All rights reserved.
                </p>
                <p>Connect. Learn. Grow.</p>
            </div>
        </footer>
    );
}
