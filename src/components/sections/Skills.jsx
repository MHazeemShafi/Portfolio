import AnimatedText from "../layout/AnimatedText";
import { skillGroups } from "../../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="nb-section nb-skills">
      <div className="nb-container">
        <header className="nb-section-header" data-reveal="fade-up">
          <span className="nb-section-num">03</span>
          <h2 className="nb-section-title">
            <AnimatedText text="Skills & Technologies" mode="words" />
          </h2>
        </header>

        <div className="nb-skills-ledger" data-reveal="stagger">
          {skillGroups.map((group, idx) => (
            <div className="nb-skill-row" key={group.title}>
              <div className="nb-skill-cat">
                <span className="nb-idx-badge">0{idx + 1}</span>
                <h3>{group.title}</h3>
              </div>

              <ul className="nb-skill-list" aria-label={group.title}>
                {group.skills.map((skill, sIdx) => (
                  <li key={skill} className="nb-skill-item">
                    <span>{skill}</span>
                    {sIdx < group.skills.length - 1 && (
                      <span className="nb-skill-sep" aria-hidden="true">/</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

