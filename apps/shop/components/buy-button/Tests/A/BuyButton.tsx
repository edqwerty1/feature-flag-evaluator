import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  button: {
    padding: "16px 40px",
    fontSize: "18px",
    fontWeight: "700",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "transform 0.2s, background-color 0.2s",
    width: "100%",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
});

export default function BuyButtonA() {
  return (
    <button
      {...stylex.props(styles.button)}
      onClick={() => alert("Added to basket!")}
    >
      Buy Now
    </button>
  );
}
