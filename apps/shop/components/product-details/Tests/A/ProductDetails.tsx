import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  details: {
    marginBottom: "16px",
    padding: "16px",
    backgroundColor: "#f0fdf4",
    borderRadius: "12px",
    border: "1px solid #bbf7d0",
  },
  name: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#065f46",
    marginBottom: "8px",
  },
  badge: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "700",
    backgroundColor: "#10b981",
    color: "#fff",
    padding: "3px 10px",
    borderRadius: "20px",
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  description: {
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.6",
  },
});

export default function ProductDetailsA() {
  return (
    <div {...stylex.props(styles.details)}>
      <span {...stylex.props(styles.badge)}>Premium Collection</span>
      <h2 {...stylex.props(styles.name)}>Luxury Bamboo Socks</h2>
      <p {...stylex.props(styles.description)}>
        Ultra-soft bamboo fibre socks with arch support and moisture-wicking
        technology. Naturally antibacterial for all-day freshness.
      </p>
    </div>
  );
}
