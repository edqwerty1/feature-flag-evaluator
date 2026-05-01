import React from "react";
import * as stylex from "@stylexjs/stylex";
import Link from "next/link";

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1a1a2e",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "32px",
  },
  link: {
    display: "inline-block",
    padding: "14px 32px",
    backgroundColor: "#4361ee",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background-color 0.2s",
  },
});

export default function Home() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>ExperianShop Flag Manager</h1>
      <p {...stylex.props(styles.subtitle)}>
        Feature flag configuration and testing dashboard
      </p>
      <Link href="/product" {...stylex.props(styles.link)}>
        Go to Product Tester
      </Link>
    </div>
  );
}
