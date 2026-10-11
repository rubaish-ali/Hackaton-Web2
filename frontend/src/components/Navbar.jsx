import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <header className="navbar">
            {/* Nexora Logo */}
            <Link to="/" className="logo">
                <FontAwesomeIcon icon={faLeaf} />
                <span>
                    Nexora<span className="green">.</span>
                </span>
            </Link>

            {/* Navigation Links */}
            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/ai-chat">AI Assistant</NavLink>
                <NavLink to="/career">Resume & Career</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/scamshield">ScamShield AI</NavLink>

            </nav>

            {/* Login and Signup */}
            <div className="nav-actions">
                <Link to="/login" className="nav-login">
                    Login
                </Link>

                <Link to="/signup" className="nav-button">
                    Sign Up
                </Link>
            </div>
        </header>
    );
}
