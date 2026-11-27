export default function AnimatedText({
  text,
  mode = "words",
  className = "",
  as: Tag = "span",
  immediate = false,
  baseDelay = 0,
}) {
  if (mode === "chars") {
    const words = text.split(" ");

    return (
      <Tag
        className={`nb-anim-text nb-anim-chars ${className}`}
        aria-label={text}
        data-text-reveal={immediate ? "immediate" : "scroll"}
      >
        {words.map((word, wIdx) => {
          const offset = words.slice(0, wIdx).reduce((acc, w) => acc + w.length, 0);
          return (
            <span className="nb-word-wrap" key={`${word}-${wIdx}`} aria-hidden="true">
              {word.split("").map((char, cIdx) => {
                const delay = baseDelay + (offset + cIdx) * 24;
                return (
                  <span className="nb-char-clip" key={`${char}-${cIdx}`}>
                    <span
                      className="nb-char-inner"
                      style={{ "--char-delay": `${delay}ms` }}
                    >
                      {char}
                    </span>
                  </span>
                );
              })}
              {wIdx < words.length - 1 && <span className="nb-char-space">&nbsp;</span>}
            </span>
          );
        })}
      </Tag>
    );
  }

  const words = text.split(" ");
  return (
    <Tag
      className={`nb-anim-text nb-anim-words ${className}`}
      aria-label={text}
      data-text-reveal={immediate ? "immediate" : "scroll"}
    >
      {words.map((word, idx) => (
        <span className="nb-word-clip" key={`${word}-${idx}`} aria-hidden="true">
          <span
            className="nb-word-inner"
            style={{ "--word-delay": `${baseDelay + idx * 55}ms` }}
          >
            {word}
            {idx < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
