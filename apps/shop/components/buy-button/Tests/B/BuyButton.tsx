import React from "react";
import * as stylex from "@stylexjs/stylex";

const pulse = stylex.keyframes({
  "0%": { boxShadow: "0 0 0 0 rgba(139, 92, 246, 0.4)" },
  "70%": { boxShadow: "0 0 0 10px rgba(139, 92, 246, 0)" },
  "100%": { boxShadow: "0 0 0 0 rgba(139, 92, 246, 0)" },
});

const styles = stylex.create({
  button: {
    padding: "14px 36px",
    fontSize: "17px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    width: "100%",
    animationName: pulse,
    animationDuration: "2s",
    animationIterationCount: "infinite",
  },
});

export default function BuyButtonB() {
  return (
    <button
      {...stylex.props(styles.button)}
      onClick={() => alert("Added to basket!")}
    >
      Add to Basket
    </button>
  );
}
