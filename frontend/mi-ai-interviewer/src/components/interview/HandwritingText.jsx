import { useState, useEffect, useRef } from "react";

export default function HandwritingText({ text, speed = 22, onComplete }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    idx.current = 0;
    if (timer.current) clearInterval(timer.current);

    if (!text) return;

    timer.current = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(timer.current);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer.current);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <span
          className="blink-cursor inline-block align-middle"
          style={{
            width: "2px",
            height: "1.2em",
            background: "#3538cd",
            borderRadius: "1px",
            marginLeft: "2px",
            verticalAlign: "middle",
          }}
        />
      )}
    </span>
  );
}
