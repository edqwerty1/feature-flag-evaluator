import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  button: {
    padding: "12px 32px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    width: "100%",
  },
});

export default function BuyButton() {
  return (
    <button
      {...stylex.props(styles.button)}
      onClick={() => alert("Added to basket!")}
    >
      Add to Basket
    </button>
  );
}
