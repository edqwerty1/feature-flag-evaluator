import React, { useEffect, useRef, useState, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { useFlagContext } from "@/context/FlagContext";

const borderGlow = stylex.keyframes({
  "0%": {
    boxShadow:
      "0 0 0 0 rgba(67, 97, 238, 0), inset 0 0 0 0 rgba(255, 255, 255, 0)",
  },
  "20%": {
    boxShadow:
      "0 0 12px 2px rgba(67, 97, 238, 0.95), 0 0 28px 6px rgba(236, 72, 153, 0.55), inset 0 0 8px rgba(255, 255, 255, 0.15)",
  },
  "45%": {
    boxShadow:
      "0 0 18px 3px rgba(236, 72, 153, 0.9), 0 0 40px 10px rgba(34, 211, 238, 0.5), inset 0 0 10px rgba(34, 211, 238, 0.12)",
  },
  "70%": {
    boxShadow:
      "0 0 14px 2px rgba(34, 211, 238, 0.85), 0 0 32px 8px rgba(167, 139, 250, 0.45), inset 0 0 6px rgba(167, 139, 250, 0.1)",
  },
  "100%": {
    boxShadow:
      "0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(255, 255, 255, 0)",
  },
});

const styles = stylex.create({
  wrapper: {
    position: "relative",
    borderRadius: "10px",
    overflow: "visible",
  },
  animating: {
    animationName: borderGlow,
    animationDuration: "0.75s",
    animationTimingFunction: "cubic-bezier(0.34, 1.2, 0.64, 1)",
    animationFillMode: "forwards",
  },
});

interface TestDeciderProps {
  flagKey: string;
  control: ReactNode;
  variantA: ReactNode;
  variantB: ReactNode;
}

export default function TestDecider({
  flagKey,
  control,
  variantA,
  variantB,
}: TestDeciderProps) {
  const { results } = useFlagContext();
  const result = results.find((r) => r.key === flagKey);
  const variant = result?.variant ?? "control";

  const [animating, setAnimating] = useState(false);
  const prevVariant = useRef(variant);

  useEffect(() => {
    if (prevVariant.current !== variant) {
      setAnimating(true);
      prevVariant.current = variant;
      const timer = setTimeout(() => setAnimating(false), 750);
      return () => clearTimeout(timer);
    }
  }, [variant]);

  let child: ReactNode;
  switch (variant) {
    case "variant_a":
      child = variantA;
      break;
    case "variant_b":
      child = variantB;
      break;
    default:
      child = control;
  }

  return (
    <div
      {...stylex.props(styles.wrapper, animating && styles.animating)}
    >
      {child}
    </div>
  );
}
