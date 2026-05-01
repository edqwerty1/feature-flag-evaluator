import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    marginBottom: "8px",
  },
  price: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#10b981",
  },
  original: {
    fontSize: "16px",
    color: "#999",
    textDecoration: "line-through",
  },
  badge: {
    fontSize: "12px",
    fontWeight: "700",
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "2px 8px",
    borderRadius: "12px",
  },
});

export default function PriceA() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <span {...stylex.props(styles.price)}>£7.99</span>
      <span {...stylex.props(styles.original)}>£9.99</span>
      <span {...stylex.props(styles.badge)}>SAVE 20%</span>
    </div>
  );
}
