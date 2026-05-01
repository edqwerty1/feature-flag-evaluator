import React, { useEffect, useState, useCallback } from "react";
import * as stylex from "@stylexjs/stylex";
import { Flag, CustomerContext, FlagResult } from "@/lib/types";
import { evaluateFlag } from "@/lib/evaluateFlags";

const styles = stylex.create({
  sidebar: {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: "16px",
    borderRight: "1px solid #e0e0e0",
    backgroundColor: "#f8f9fa",
    overflowY: "auto",
    overflowX: "hidden",
    height: "100%",
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#1a1a2e",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "4px",
    color: "#555",
  },
  select: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  resultCard: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
  },
  resultTitle: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#1a1a2e",
  },
  variantBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "13px",
    marginBottom: "8px",
  },
  control: {
    backgroundColor: "#e0e0e0",
    color: "#333",
  },
  variantA: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  variantB: {
    backgroundColor: "#cce5ff",
    color: "#004085",
  },
  ruleDetail: {
    fontSize: "12px",
    fontFamily: "monospace",
    backgroundColor: "#f0f0f0",
    padding: "8px",
    borderRadius: "4px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  },
});

interface MockCustomerProps {
  flags: Flag[];
  onCustomerChange?: (customer: CustomerContext) => void;
}

export default function MockCustomer({
  flags,
  onCustomerChange,
}: MockCustomerProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [plans, setPlans] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [plan, setPlan] = useState("");
  const [selectedFlagKey, setSelectedFlagKey] = useState("");
  const [result, setResult] = useState<FlagResult | null>(null);

  useEffect(() => {
    const shopOrigin =
      process.env.NEXT_PUBLIC_SHOP_ORIGIN || "http://localhost:3000";
    const base = `${shopOrigin.replace(/\/$/, "")}/api`;
    fetch(`${base}/countries`)
      .then((r) => r.json())
      .then(setCountries)
      .catch(() => setCountries(["UK", "France", "Germany", "Spain", "Italy"]));

    fetch(`${base}/plans`)
      .then((r) => r.json())
      .then(setPlans)
      .catch(() => setPlans(["free", "pro"]));
  }, []);

  useEffect(() => {
    if (countries.length && !country) setCountry(countries[0]);
  }, [countries, country]);

  useEffect(() => {
    if (plans.length && !plan) setPlan(plans[0]);
  }, [plans, plan]);

  useEffect(() => {
    if (flags.length && !selectedFlagKey) setSelectedFlagKey(flags[0].key);
  }, [flags, selectedFlagKey]);

  const evaluate = useCallback(() => {
    if (!country || !plan || !selectedFlagKey) return;

    const customer: CustomerContext = {
      id: `${country.toLowerCase()}-${plan}`,
      country,
      plan,
    };
    onCustomerChange?.(customer);

    const flag = flags.find((f) => f.key === selectedFlagKey);
    if (flag) {
      setResult(evaluateFlag(flag, customer));
    }
  }, [country, plan, selectedFlagKey, flags, onCustomerChange]);

  useEffect(() => {
    evaluate();
  }, [evaluate]);

  const variantStyle =
    result?.variant === "variant_a"
      ? styles.variantA
      : result?.variant === "variant_b"
      ? styles.variantB
      : styles.control;

  return (
    <div {...stylex.props(styles.sidebar)}>
      <div {...stylex.props(styles.title)}>Mock Customer</div>

      <div {...stylex.props(styles.formGroup)}>
        <label {...stylex.props(styles.label)}>Country</label>
        <select
          {...stylex.props(styles.select)}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div {...stylex.props(styles.formGroup)}>
        <label {...stylex.props(styles.label)}>Plan</label>
        <select
          {...stylex.props(styles.select)}
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          {plans.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div {...stylex.props(styles.formGroup)}>
        <label {...stylex.props(styles.label)}>Flag</label>
        <select
          {...stylex.props(styles.select)}
          value={selectedFlagKey}
          onChange={(e) => setSelectedFlagKey(e.target.value)}
        >
          {flags.map((f) => (
            <option key={f.key} value={f.key}>
              {f.key}
            </option>
          ))}
        </select>
      </div>

      {result && (
        <div {...stylex.props(styles.resultCard)}>
          <div {...stylex.props(styles.resultTitle)}>Evaluation Result</div>
          <span {...stylex.props(styles.variantBadge, variantStyle)}>
            {result.variant}
          </span>
          {result.matchedRule && (
            <div {...stylex.props(styles.ruleDetail)}>
              {JSON.stringify(result.matchedRule, null, 2)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
