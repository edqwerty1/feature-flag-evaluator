import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  details: {
    marginBottom: "16px",
  },
  name: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "8px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
  },
});

export default function ProductDetails() {
  return (
    <div {...stylex.props(styles.details)}>
      <h2 {...stylex.props(styles.name)}>Classic Cotton Socks</h2>
      <p {...stylex.props(styles.description)}>
        Comfortable everyday cotton socks. Breathable fabric, reinforced heel
        and toe for lasting durability. Machine washable.
      </p>
    </div>
  );
}
