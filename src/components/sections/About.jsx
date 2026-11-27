import AnimatedText from "../layout/AnimatedText";

export default function About() {
  return (
    <section id="about" className="nb-section nb-about" data-surface="silver">
      <div className="nb-container">
        <header className="nb-section-header" data-reveal="fade-up">
          <span className="nb-section-num">02</span>
          <h2 className="nb-section-title">
            <AnimatedText text="About Me" mode="words" />
          </h2>
        </header>

        <div className="nb-about-layout">
          <div className="nb-about-statement" data-reveal="from-left">
            <p className="nb-editorial-lead">
              I focus on writing practical software — from real-time computer vision pipelines in Python to fast, client-side utilities and data-driven interfaces on the web.
            </p>
          </div>

          <div className="nb-about-details" data-reveal="from-right">
            <p className="nb-editorial-body">
              I&apos;m a 2nd-year Computer Science Engineering undergraduate at P.A. College of Engineering, Mangalore. Alongside my coursework, I build open-source projects across computer vision, browser utilities, and environmental monitoring, while participating in hackathons and technical workshops.
            </p>

            <dl className="nb-facts-strip">
              <div className="nb-fact-row">
                <dt>INSTITUTION</dt>
                <dd>P.A. College of Engineering</dd>
              </div>
              <div className="nb-fact-row">
                <dt>PROGRAM</dt>
                <dd>B.E. Computer Science Engineering</dd>
              </div>
              <div className="nb-fact-row">
                <dt>ACADEMIC PERIOD</dt>
                <dd>2026 — 2029 (2nd Year)</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

