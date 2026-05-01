import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  details: {
    marginBottom: "16px",
    padding: "20px",
    background: "linear-gradient(135deg, #ede9fe, #fce7f3)",
    borderRadius: "16px",
  },
  name: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#581c87",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#7c3aed",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  description: {
    fontSize: "14px",
    color: "#4a4a4a",
    lineHeight: "1.6",
  },
  features: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
  },
  featureTag: {
    fontSize: "11px",
    fontWeight: "600",
    padding: "4px 10px",
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    color: "#7c3aed",
    borderRadius: "20px",
  },
});

export default function ProductDetailsB() {
  return (
    <div {...stylex.props(styles.details)}>
      <div {...stylex.props(styles.subtitle)}>Limited Edition</div>
      <h2 {...stylex.props(styles.name)}>Designer Comfort Socks</h2>
      <p {...stylex.props(styles.description)}>
        Exclusive design with premium Merino wool blend. Temperature-regulating
        and incredibly soft against the skin.
      </p>
      <div {...stylex.props(styles.features)}>
        <span {...stylex.props(styles.featureTag)}>Merino Wool</span>
        <span {...stylex.props(styles.featureTag)}>Eco-Friendly</span>
        <span {...stylex.props(styles.featureTag)}>Gift Ready</span>
      </div>
    </div>
  );
}
