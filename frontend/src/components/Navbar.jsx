import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLeaf,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function Navbar() {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(sessionStorage.getItem("user")) || null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        function updateUser() {
            try {
                setUser(
                    JSON.parse(sessionStorage.getItem("user")) || null
                );
            } catch {
                setUser(null);
            }
        }

        window.addEventListener("auth-change", updateUser);

        return () => {
            window.removeEventListener("auth-change", updateUser);
        };
    }, []);

    function handleLogout() {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");

        setUser(null);

        window.dispatchEvent(new Event("auth-change"));

        toast.success("Logged out successfully!");

        navigate("/login", { replace: true });
    }

    const userName =
        user?.name ||
        user?.username ||
        user?.fullName ||
        "User";

    return (
        <header className="navbar">
            <Link to="/" className="logo">
                <FontAwesomeIcon icon={faLeaf} />

                <span>
                    Nexora<span className="green">.</span>
                </span>
            </Link>

            <nav className="nav-links">
                <NavLink to="/">Home</NavLink>

                <NavLink to="/ai-chat">
                    AI Assistant
                </NavLink>

                <NavLink to="/career">
                    Resume & Career
                </NavLink>

                <NavLink to="/about">
                    About
                </NavLink>

                <NavLink to="/scamshield">
                    ScamShield AI
                </NavLink>
            </nav>

            <div className="nav-actions">
                <span className="nav-user-name">
                    Hi, {userName}
                </span>

                <button
                    type="button"
                    className="nav-button"
                    onClick={handleLogout}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    {" "}Logout
                </button>
            </div>
        </header>
    );
}