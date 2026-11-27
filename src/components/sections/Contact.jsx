import { useState } from "react";
import AnimatedText from "../layout/AnimatedText";

const email = "stryker461@gmail.com";

export default function Contact() {
  const [feedback, setFeedback] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setFeedback("Email copied to clipboard.");
    } catch {
      setFeedback("Copy unavailable in this browser.");
    }
  }

  return (
    <section id="contact" className="nb-section nb-contact">
      <div className="nb-container nb-contact-layout">
        <div className="nb-contact-lead" data-reveal="from-left">
          <header className="nb-section-header">
            <span className="nb-section-num">06</span>
            <h2 className="nb-section-title">
              <AnimatedText text="Get In Touch" mode="words" />
            </h2>
          </header>

          <p className="nb-contact-copy">
            Open to discussing software development, computer-vision tools, and web engineering projects.
          </p>
        </div>

        <div className="nb-contact-panel" data-reveal="from-right">
          <span className="nb-contact-kicker">DIRECT EMAIL</span>
          <a className="nb-contact-email" href={`mailto:${email}`}>
            {email}
          </a>

          <div className="nb-contact-actions">
            <button
              type="button"
              className="nb-btn nb-btn-red"
              onClick={copyEmail}
            >
              COPY EMAIL
            </button>
            <a
              className="nb-btn nb-btn-black"
              href="https://github.com/MHazeemshafi"
              target="_blank"
              rel="noreferrer"
            >
              GITHUB ↗
            </a>
            <a
              className="nb-btn nb-btn-white"
              href="https://in.linkedin.com/in/mohammed-hazeem-shafi-b06aa9386"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN ↗
            </a>
          </div>

          <p className="nb-copy-feedback" aria-live="polite">
            {feedback}
          </p>
        </div>
      </div>
    </section>
  );
}

