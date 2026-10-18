
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



const API_BASE_URL = "https://hackaton-web-sooty.vercel.app";

export default function ScamShield() {
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze(event) {
    event.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage) {
      toast.error("Please enter a message to analyze.");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/scamshield/analyze`,
        { message: cleanMessage },
        { timeout: 65000 }
      );

      const result = response.data?.analysis;

      if (
        !response.data?.success ||
        !result ||
        !["Low", "Medium", "High"].includes(result.riskLevel) ||
        typeof result.summary !== "string" ||
        !Array.isArray(result.warningSigns) ||
        !Array.isArray(result.verificationSteps) ||
        typeof result.disclaimer !== "string"
      ) {
        throw new Error("The AI returned an incomplete analysis.");
      }

      setAnalysis(result);
      toast.success("Analysis completed successfully.");
    } catch (error) {
      console.error("ScamShield error:", error);

      const message =
        error.response?.data?.message ||
        (error.code === "ECONNABORTED"
          ? "Request timed out. Please try again."
          : "Could not connect to the backend. Check the API URL and CORS settings.");

      toast.error(message, { duration: 6000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="scamshield-page">
      <section className="scamshield-hero">
        <div className="scamshield-logo">
          <FontAwesomeIcon icon={faShieldHalved} />
        </div>

        <span className="scamshield-eyebrow">
          NEXORA SECURITY TOOL
        </span>

        <h1>
          ScamShield <span>AI</span>
        </h1>

        <p>
          Check suspicious messages for potential warning signs
          and learn how to verify them safely.
        </p>
      </section>

      <section className="scamshield-card">
        <h2>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          {" "}Analyze a message
        </h2>

        <p className="scamshield-muted">
          Paste the text of a suspicious email, SMS, or invoice.
        </p>

        <form onSubmit={handleAnalyze}>
          <label htmlFor="scam-message">
            Message text
          </label>

          <textarea
            id="scam-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Paste your suspicious message here..."
            maxLength={12000}
            rows={8}
            required
            disabled={loading}
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
            Submitted messages are stored in the project database.
            Do not submit passwords, PINs, verification codes, or
            private financial information.
          </span>
        </div>
      </section>

      {loading && (
        <div className="scamshield-loading" aria-live="polite">
          Groq AI is checking the message for potential warning signs...
        </div>
      )}

      {analysis && (
        <section className="scamshield-results" aria-live="polite">
          <div className="scamshield-result-top">
            <div>
              <span className="scamshield-muted">AI assessment</span>
              <h2>Message Analysis</h2>
            </div>

            <span
              className={`scamshield-risk risk-${analysis.riskLevel.toLowerCase()}`}
            >
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

            {analysis.warningSigns.length > 0 ? (
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

            {analysis.verificationSteps.length > 0 ? (
              <ul>
                {analysis.verificationSteps.map((item, index) => (
                  <li key={`${index}-${item}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>
                Verify the message through an official channel
                before taking action.
              </p>
            )}
          </div>

          <p className="scamshield-disclaimer">
            {analysis.disclaimer} AI results are not proof that a
            message is genuine or fraudulent. Verify independently.
          </p>
        </section>
      )}
    </div>
  );
}
