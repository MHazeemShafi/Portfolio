import AnimatedText from "../layout/AnimatedText";

export default function Hero() {
  return (
    <section id="hero" className="nb-hero">
      <div className="nb-container nb-hero-editorial">
        <div className="nb-hero-meta" data-reveal="fade-up">
          <span className="nb-section-num">01</span>
          <span>P.A. COLLEGE OF ENGINEERING</span>
          <span className="nb-meta-divider" aria-hidden="true">/</span>
          <span>B.E. COMPUTER SCIENCE ENGINEERING</span>
          <span className="nb-meta-divider" aria-hidden="true">/</span>
          <span>2026 — 2029</span>
        </div>

        <div className="nb-hero-split">
          <h1 className="nb-hero-title" aria-label="Mohammed Hazeem Shafi">
            <AnimatedText text="Mohammed" mode="chars" immediate baseDelay={40} className="nb-hero-line" />
            <AnimatedText text="Hazeem" mode="chars" immediate baseDelay={220} className="nb-hero-line" />
            <span className="nb-hero-line nb-hero-highlight">
              <AnimatedText text="Shafi" mode="chars" immediate baseDelay={380} />
            </span>
          </h1>

          <aside className="nb-hero-spec" aria-label="Developer profile" data-reveal="fade-up">
            <div className="nb-hero-spec-head">
              <span>PROFILE</span>
              <span>2026 — 2029</span>
            </div>
            <dl className="nb-hero-spec-list">
              <div className="nb-hero-spec-row">
                <dt>DEGREE</dt>
                <dd>B.E. Computer Science</dd>
              </div>
              <div className="nb-hero-spec-row">
                <dt>YEAR</dt>
                <dd>2nd Year Undergraduate</dd>
              </div>
              <div className="nb-hero-spec-row">
                <dt>LINKEDIN</dt>
                <dd>
                  <a
                    href="https://in.linkedin.com/in/mohammed-hazeem-shafi-b06aa9386"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mohammed Hazeem Shafi ↗
                  </a>
                </dd>
              </div>
              <div className="nb-hero-spec-row">
                <dt>GITHUB</dt>
                <dd>
                  <a href="https://github.com/MHazeemshafi" target="_blank" rel="noreferrer">
                    MHazeemshafi ↗
                  </a>
                </dd>
              </div>
              <div className="nb-hero-spec-row">
                <dt>EMAIL</dt>
                <dd>
                  <a href="mailto:stryker461@gmail.com">stryker461@gmail.com ↗</a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="nb-hero-bottom">
          <p className="nb-hero-intro">
            <AnimatedText
              text="Computer Science Engineering undergraduate at P.A. College of Engineering, building desktop software and browser-based web applications."
              mode="words"
              immediate
              baseDelay={420}
            />
          </p>

          <div className="nb-hero-actions" data-reveal="fade-up">
            <a className="nb-btn nb-btn-red" href="#projects">
              VIEW PROJECTS →
            </a>
            <a className="nb-btn nb-btn-white" href="#contact">
              CONTACT ME →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
