import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  price: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "8px",
  },
});

export default function Price() {
  return <div {...stylex.props(styles.price)}>£9.99</div>;
}
