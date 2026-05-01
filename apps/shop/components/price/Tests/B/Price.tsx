import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  wrapper: {
    marginBottom: "8px",
    padding: "12px 16px",
    backgroundColor: "#fef3c7",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#d97706",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#92400e",
  },
});

export default function PriceB() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <span {...stylex.props(styles.label)}>Member Price</span>
      <span {...stylex.props(styles.price)}>£6.99</span>
    </div>
  );
}
