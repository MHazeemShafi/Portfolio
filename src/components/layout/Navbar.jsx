import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "hero", num: "01", label: "HOME" },
  { id: "about", num: "02", label: "ABOUT" },
  { id: "skills", num: "03", label: "SKILLS" },
  { id: "experience", num: "04", label: "EXPERIENCE" },
  { id: "projects", num: "05", label: "PROJECTS" },
  { id: "contact", num: "06", label: "CONTACT" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleNavigate = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeItem = navItems.find((item) => item.id === activeId) || navItems[0];

  return (
    <>
      <div className="nb-floating-controls">
        <div className="nb-section-pill" aria-live="polite" aria-label="Current section">
          <span className="nb-pill-num">{activeItem.num}</span>
          <span className="nb-pill-sep">/</span>
          <span className="nb-pill-label">{activeItem.label}</span>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="nb-menu-trigger"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-nav-overlay"
          aria-label="Open navigation menu"
          data-cursor="MENU"
        >
          <span className="nb-menu-bars" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>MENU</span>
        </button>
      </div>

      <div
        id="site-nav-overlay"
        className={`nb-nav-overlay${open ? " is-open" : ""}`}
        aria-hidden={!open}
        data-surface="midnight"
      >
        <div className="nb-nav-overlay-inner">
          <div className="nb-nav-overlay-top">
            <span className="nb-nav-owner">Mohammed Hazeem Shafi</span>
            <button
              ref={closeBtnRef}
              type="button"
              className="nb-btn nb-btn-red"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              tabIndex={open ? 0 : -1}
              aria-label="Close navigation menu"
            >
              CLOSE ✕
            </button>
          </div>

          <nav className="nb-nav-list" aria-label="Primary navigation">
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nb-nav-link${activeId === item.id ? " is-current" : ""}`}
                style={{ "--link-idx": idx }}
                onClick={(e) => handleNavigate(e, item.id)}
                tabIndex={open ? 0 : -1}
                aria-current={activeId === item.id ? "page" : undefined}
                data-cursor="GO"
              >
                <span className="nb-nav-num">{item.num}</span>
                <span className="nb-nav-text">{item.label}</span>
                <span className="nb-nav-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </nav>

          <div className="nb-nav-overlay-foot">
            <a
              href="mailto:stryker461@gmail.com"
              tabIndex={open ? 0 : -1}
              data-cursor="MAIL"
            >
              stryker461@gmail.com
            </a>
            <div className="nb-nav-socials">
              <a
                href="https://github.com/MHazeemshafi"
                target="_blank"
                rel="noreferrer"
                tabIndex={open ? 0 : -1}
                data-cursor="OPEN"
              >
                GITHUB ↗
              </a>
              <a
                href="https://in.linkedin.com/in/mohammed-hazeem-shafi-b06aa9386"
                target="_blank"
                rel="noreferrer"
                tabIndex={open ? 0 : -1}
                data-cursor="OPEN"
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

