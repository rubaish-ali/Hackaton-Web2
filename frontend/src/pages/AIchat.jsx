import { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faPaperPlane,
  faUser,
  faLightbulb,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:5000/api/chat";

const suggestions = [
  "How can we reduce plastic waste?",
  "How can students find free learning resources?",
  "Suggest solutions for water shortages.",
];

export default function AIChat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [history, loading]);

  async function sendMessage(text = input) {
    const message = text.trim();

    if (!message || loading) {
      return;
    }

    // Prepare the previous conversation for the backend.
    const previousHistory = history
      .filter(
        (item) =>
          ["user", "model"].includes(item.role) &&
          typeof item.text === "string"
      )
      .slice(-8)
      .map(({ role, text }) => ({
        role,
        text,
      }));

    setInput("");
    setLoading(true);

    // Show the user's message immediately.
    setHistory((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    try {
      console.log("Sending Nexora AI request...");

      const response = await axios.post(
        API_URL,
        {
          message,
          history: previousHistory,
        },
        {
          // Backend timeout is 30 seconds.
          // Frontend waits a little longer for the backend error.
          timeout: 40000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data?.reply;

      if (typeof reply !== "string" || !reply.trim()) {
        throw new Error(
          "AI se valid jawab nahi mila. Backend response check karo."
        );
      }

      console.log("Nexora AI response received.");

      setHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: reply.trim(),
        },
      ]);
    } catch (error) {
      console.error("Nexora AI Chat Error:", error);

      let errorMessage =
        error.response?.data?.message ||
        "AI se connect nahi ho saka.";

      if (
        error.code === "ECONNABORTED" ||
        error.code === "ETIMEDOUT"
      ) {
        errorMessage =
          "Request timeout ho gayi. Backend terminal mein Gemini API ka error check karo.";
      } else if (
        error.code === "ERR_NETWORK" ||
        error.message === "Network Error"
      ) {
        errorMessage =
          "Backend se connection nahi ho raha. Check karo ke server port 5000 par chal raha hai.";
      } else if (!error.response && error.message) {
        errorMessage = error.message;
      }

      setHistory((prev) => [
        ...prev,
        {
          role: "error",
          text: errorMessage,
        },
      ]);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <main className="chat-page">
      {/* Heading */}
      <section className="chat-heading">
        <div className="chat-heading-icon">
          <FontAwesomeIcon icon={faRobot} />
        </div>

        <span className="section-eyebrow">
          <FontAwesomeIcon icon={faLightbulb} />
          {" "}NEXORA INTELLIGENCE
        </span>

        <h1>
          Your ideas deserve
          <span className="green"> smarter answers.</span>
        </h1>

        <p>
          Explore ideas, discover learning opportunities, and get
          practical guidance for education, careers, and everyday
          challenges.
        </p>
      </section>

      {/* Chat Panel */}
      <section className="chat-panel">
        <header className="chat-panel-header">
          <div className="chat-avatar">
            <FontAwesomeIcon icon={faRobot} />
          </div>

          <div className="chat-header-info">
            <strong>Nexora AI</strong>
            <p>
              <span className="chat-status-dot" />
              AI Assistant
            </p>
          </div>

          <span className="online-label">
            SMART ASSISTANT
          </span>
        </header>

        {/* Messages */}
        <div className="chat-messages">
          {history.length === 0 && (
            <div className="message assistant-message">
              <div className="message-avatar">
                <FontAwesomeIcon icon={faRobot} />
              </div>

              <div className="message-content">
                <strong>Nexora AI</strong>
                <p className="message-text">
                  Hello! Welcome to Nexora. What would you like
                  to explore today? Ask me a question, share a
                  challenge, or choose a suggestion below.
                </p>
              </div>
            </div>
          )}

          {history.map((item, index) => (
            <div
              key={`${index}-${item.role}`}
              className={`message ${
                item.role === "user"
                  ? "user-message"
                  : item.role === "error"
                  ? "assistant-message error-message"
                  : "assistant-message"
              }`}
            >
              <div className="message-avatar">
                <FontAwesomeIcon
                  icon={
                    item.role === "user"
                      ? faUser
                      : faRobot
                  }
                />
              </div>

              <div className="message-content">
                <strong>
                  {item.role === "user"
                    ? "You"
                    : item.role === "error"
                    ? "Connection Error"
                    : "Nexora AI"}
                </strong>

                <p className="message-text">
                  {item.text}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="typing-indicator">
              <FontAwesomeIcon icon={faRobot} />
              <span>Nexora is thinking...</span>
              <span className="typing-dots">•••</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {history.length === 0 && (
          <div className="suggestion-area">
            <span className="suggestion-heading">
              <FontAwesomeIcon icon={faLightbulb} />
              Start with an idea
            </span>

            {suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                disabled={loading}
                className="suggestion-button"
              >
                <span>{suggestion}</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            ))}
          </div>
        )}

        {/* Message Input */}
        <form
          className="chat-input-area"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Nexora anything..."
            maxLength={5000}
            aria-label="Write your message"
            disabled={loading}
          />

          <button
            type="submit"
            className="send-button"
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>

        <p className="chat-disclaimer">
          <FontAwesomeIcon icon={faLightbulb} />
          AI can make mistakes. Verify important information.
        </p>
      </section>
    </main>
  );
}