import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faShieldHalved,
  faMagnifyingGlass,
  faTriangleExclamation,
  faClipboardCheck,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:5000/api/scamshield/analyze";

export default function ScamShield() {
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze(event) {
    event.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage) {
      toast.error("Suspicious message paste karo.");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const response = await axios.post(
        API_URL,
        { message: cleanMessage },
        {
          timeout: 40000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      const result = data?.analysis;

      if (
        !result ||
        !["Low", "Medium", "High"].includes(result.riskLevel) ||
        typeof result.summary !== "string" ||
        !Array.isArray(result.warningSigns) ||
        !Array.isArray(result.verificationSteps) ||
        typeof result.disclaimer !== "string"
      ) {
        throw new Error("AI analysis ka response incomplete hai.");
      }

      setAnalysis(result);
      toast.success("Analysis complete aur MongoDB mein save ho gaya.");
    } catch (error) {
      console.error("ScamShield frontend error:", error);

      let errorMessage =
        error.response?.data?.message ||
        "Scam analysis failed. Backend terminal check karo.";

      if (
        error.code === "ECONNABORTED" ||
        error.code === "ETIMEDOUT"
      ) {
        errorMessage =
          "Request timeout ho gayi. Backend terminal check karo.";
      } else if (
        error.code === "ERR_NETWORK" ||
        error.message === "Network Error"
      ) {
        errorMessage =
          "Backend se connection nahi ho raha. Port 5000 check karo.";
      }

      // Add save status only once.
      if (
        error.response?.data?.saved === true &&
        !/prompt.*mongo\s*db.*save|mongo\s*db.*save/i.test(errorMessage)
      ) {
        errorMessage += " Prompt MongoDB mein save hai.";
      }

      toast.error(errorMessage, { duration: 6000 });
    } finally {
      setLoading(false);
    }
  }

  const riskClass = analysis
    ? `risk-${analysis.riskLevel.toLowerCase()}`
    : "";

  return (
    <main className="scamshield-page">
      <section className="scamshield-heading">
        <div className="scamshield-icon">
          <FontAwesomeIcon icon={faShieldHalved} />
        </div>

        <span className="section-eyebrow">
          NEXORA SECURITY TOOL
        </span>

        <h1>
          ScamShield <span>AI</span>
        </h1>

        <p>
          Suspicious emails, SMS messages, and invoices ko
          analyze karo aur possible warning signs samjho.
        </p>
      </section>

      <section className="scamshield-card">
        <h2>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          {" "}Check a suspicious message
        </h2>

        <p className="scamshield-muted">
          Message paste karo. Analysis ke liye links open nahi kiye jayenge.
        </p>

        <form onSubmit={handleAnalyze}>
          <label htmlFor="scamshield-message">
            Email, SMS, or invoice text
          </label>

          <textarea
            id="scamshield-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Example: Your account will be suspended. Pay immediately..."
            maxLength={12000}
            rows={8}
            disabled={loading}
            required
          />

          <div className="scamshield-form-footer">
            <span>{message.length}/12000 characters</span>

            <button
              type="submit"
              disabled={loading || !message.trim()}
            >
              <FontAwesomeIcon icon={faShieldHalved} />
              {loading ? "Analyzing..." : "Analyze Message"}
            </button>
          </div>
        </form>

        <div className="scamshield-privacy">
          <FontAwesomeIcon icon={faLock} />
          <span>
            Submitted messages and analysis results are stored in the
            project database. Passwords, PINs, verification codes, or
            private financial information submit mat karo.
          </span>
        </div>
      </section>

      {loading && (
        <div className="scamshield-loading" aria-live="polite">
          Gemini is checking the message for potential warning signs...
        </div>
      )}

      {analysis && (
        <section className="scamshield-results" aria-live="polite">
          <div className="scamshield-result-top">
            <div>
              <span className="scamshield-muted">AI assessment</span>
              <h2>Message Analysis</h2>
            </div>

            <span className={`scamshield-risk ${riskClass}`}>
              {analysis.riskLevel} Risk
            </span>
          </div>

          <div className="scamshield-result-block">
            <h3>Summary</h3>
            <p>{analysis.summary}</p>
          </div>

          <div className="scamshield-result-block">
            <h3>
              <FontAwesomeIcon icon={faTriangleExclamation} />
              {" "}Potential warning signs
            </h3>

            {analysis.warningSigns.length ? (
              <ul>
                {analysis.warningSigns.map((item, index) => (
                  <li key={`${index}-${item}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No clear warning signs were identified in the text.</p>
            )}
          </div>

          <div className="scamshield-result-block">
            <h3>
              <FontAwesomeIcon icon={faClipboardCheck} />
              {" "}Verification checklist
            </h3>

            {analysis.verificationSteps.length ? (
              <ul className="scamshield-checklist">
                {analysis.verificationSteps.map((item, index) => (
                  <li key={`${index}-${item}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>
                Verify the message independently through an official
                channel before taking action.
              </p>
            )}
          </div>

          <p className="scamshield-disclaimer">
            {analysis.disclaimer} AI results are not proof that a message
            is genuine or fraudulent. Verify independently.
          </p>
        </section>
      )}
    </main>
  );
}