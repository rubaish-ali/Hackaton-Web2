import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password.length < 8) {
      return toast.error(
        "Password must be at least 8 characters."
      );
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }
      );

      toast.success(data.message || "Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error(
        "Signup error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="logo auth-logo">
          <FontAwesomeIcon icon={faLeaf} />
          Nexora<span className="green">AI</span>
        </Link>

        <div className="auth-icon">
          <FontAwesomeIcon icon={faUserPlus} />
        </div>

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Join us and explore new possibilities with AI.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              maxLength={80}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email address</label>

            <input
              id="signup-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>

            <input
              id="signup-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">
              Confirm password
            </label>

            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-button full-button"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}