
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faCloudArrowUp,
  faWandMagicSparkles,
  faChartLine,
  faBriefcase,
  faGraduationCap,
  faLightbulb,
  faShieldHalved,
  faCircleCheck,
  faArrowRight,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const features = [
  {
    icon: faChartLine,
    title: "Resume Insights",
    text: "Discover strengths and areas that need improvement.",
  },
  {
    icon: faBriefcase,
    title: "Job Matching",
    text: "Compare your resume with a target job description.",
  },
  {
    icon: faLightbulb,
    title: "Actionable Tips",
    text: "Get practical suggestions to improve your resume.",
  },
];

export default function Career() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  function selectFile(selectedFile) {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf" &&
        !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a PDF resume.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("Your PDF must be smaller than 5 MB.");
      return;
    }

    setFile(selectedFile);
    setAnalysis("");
  }

  function handleFileInput(event) {
    selectFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function clearFile() {
    setFile(null);
    setAnalysis("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function analyzeResume(event) {
    event.preventDefault();

    if (!file) {
      toast.error("Please upload your resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription.trim());

    setLoading(true);
    setAnalysis("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData
      );

      const result =
        response.data?.analysis ??
        response.data?.result ??
        response.data?.reply ??
        response.data?.message;

      if (typeof result === "string") {
        setAnalysis(result);
      } else if (result && typeof result === "object") {
        setAnalysis(JSON.stringify(result, null, 2));
      } else {
        throw new Error("The server did not return an analysis.");
      }

      toast.success("Resume analysis completed!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Unable to analyze your resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="career-page">
      <section className="career-hero">
        <div className="career-hero-content">
          <span className="career-eyebrow">
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            NEXORA CAREER STUDIO
          </span>

          <h1>
            Make your resume work
            <span className="career-gradient"> for you.</span>
          </h1>

          <p>
            Get AI-powered feedback on your resume, discover ways to
            strengthen your application, and prepare for your next
            career opportunity.
          </p>

          <a href="#resume-analyzer" className="career-hero-button">
            Analyze My Resume
            <FontAwesomeIcon icon={faArrowRight} />
          </a>

          <div className="career-trust">
            <span>
              <FontAwesomeIcon icon={faShieldHalved} />
              Secure upload
            </span>
            <span>
              <FontAwesomeIcon icon={faFilePdf} />
              PDF format
            </span>
          </div>
        </div>

        <div className="career-hero-visual">
          <div className="career-visual-glow" />
          <div className="career-resume-preview">
            <div className="preview-top">
              <div className="preview-avatar">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div>
                <div className="preview-line preview-name" />
                <div className="preview-line preview-subtitle" />
              </div>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="preview-check"
              />
            </div>

            <div className="preview-section-title">PROFESSIONAL SUMMARY</div>
            <div className="preview-line preview-long" />
            <div className="preview-line preview-medium" />

            <div className="preview-section-title">SKILLS</div>
            <div className="preview-skills">
              <span>Communication</span>
              <span>Problem solving</span>
              <span>Teamwork</span>
            </div>

            <div className="preview-section-title">EXPERIENCE</div>
            <div className="preview-line preview-long" />
            <div className="preview-line preview-short" />

            <div className="preview-insight">
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              <span>Ready for smarter feedback</span>
            </div>
          </div>
          <div className="career-floating-label">
            <FontAwesomeIcon icon={faChartLine} />
            <span>AI-powered insights</span>
          </div>
        </div>
      </section>

      <section className="career-features">
        {features.map((feature) => (
          <article className="career-feature-card" key={feature.title}>
            <div className="career-feature-icon">
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="career-analyzer-section" id="resume-analyzer">
        <div className="career-section-heading">
          <span className="career-eyebrow">YOUR NEXT STEP STARTS HERE</span>
          <h2>Resume Analyzer</h2>
          <p>
            Upload your resume to receive personalized feedback.
            Add a job description for more relevant suggestions.
          </p>
        </div>

        <div className="career-analyzer-layout">
          <form className="career-form-card" onSubmit={analyzeResume}>
            <div className="career-form-heading">
              <div className="career-form-icon">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
              <div>
                <h3>Upload your resume</h3>
                <p>Start with your latest resume in PDF format.</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileInput}
              hidden
            />

            {!file ? (
              <div
                className={`career-upload-area ${dragging ? "is-dragging" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  selectFile(event.dataTransfer.files?.[0]);
                }}
              >
                <div className="career-upload-icon">
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </div>
                <h4>Drop your resume here</h4>
                <p>or click to browse files</p>
                <span>PDF only · Maximum size 5 MB</span>
              </div>
            ) : (
              <div className="career-selected-file">
                <div className="career-file-icon">
                  <FontAwesomeIcon icon={faFilePdf} />
                </div>
                <div className="career-file-details">
                  <strong>{file.name}</strong>
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB · PDF</span>
                </div>
                <button
                  type="button"
                  className="career-remove-file"
                  onClick={clearFile}
                  aria-label="Remove resume"
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}

            <label className="career-field-label" htmlFor="jobDescription">
              Job description
              <span>Optional</span>
            </label>

            <textarea
              id="jobDescription"
              className="career-job-description"
              rows={5}
              maxLength={10000}
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the job requirements here to get more targeted feedback..."
              disabled={loading}
            />

            <div className="career-character-count">
              {jobDescription.length}/10000 characters
            </div>

            <button
              type="submit"
              className="career-analyze-button"
              disabled={loading || !file}
            >
              <FontAwesomeIcon
                icon={loading ? faRotateRight : faWandMagicSparkles}
                className={loading ? "career-spinning" : ""}
              />
              {loading ? "Analyzing your resume..." : "Analyze My Resume"}
            </button>

            <p className="career-privacy-note">
              <FontAwesomeIcon icon={faShieldHalved} />
              Upload only a resume you're comfortable sharing with this
              service. Check your backend's file handling and privacy settings.
            </p>
          </form>

          <aside className="career-result-card">
            <div className="career-result-heading">
              <div className="career-result-icon">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <div>
                <h3>Analysis results</h3>
                <p>Your personalized feedback will appear here.</p>
              </div>
            </div>

            {!analysis && !loading && (
              <div className="career-empty-result">
                <div className="career-empty-icon">
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                </div>
                <h4>Ready to improve?</h4>
                <p>
                  Upload your resume and select Analyze to see the feedback
                  returned by Nexora.
                </p>
                <ul>
                  <li>Resume strengths and improvement areas</li>
                  <li>Suggestions for clearer descriptions</li>
                  <li>Job-specific feedback when you add a description</li>
                </ul>
              </div>
            )}

            {loading && (
              <div className="career-loading-result">
                <div className="career-loader" />
                <h4>Reviewing your resume</h4>
                <p>It may take a little while. Please keep this page open.</p>
              </div>
            )}

            {analysis && !loading && (
              <div className="career-analysis-output">
                <div className="career-analysis-success">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  Analysis complete
                </div>
                <pre>{analysis}</pre>
                <button
                  type="button"
                  className="career-reanalyze-button"
                  onClick={() => {
                    setAnalysis("");
                    document
                      .getElementById("resume-analyzer")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                  Analyze again
                </button>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
