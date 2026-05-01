import { Flag } from "./types";

export const seedFlags: Flag[] = [
  {
    key: "new_checkout",
    enabled: true,
    rules: [
      { if: { country: "UK", plan: "pro" }, then: "variant_a" },
      { if: { country: "UK" }, then: "variant_b" },
      { default: "control" },
    ],
  },
  {
    key: "dark_mode",
    enabled: true,
    rules: [{ if: { plan: "pro" }, then: "variant_a" }, { default: "control" }],
  },
  {
    key: "holiday_banner",
    enabled: true,
    rules: [
      { if: { country: "UK" }, then: "variant_a" },
      { if: { country: "France" }, then: "variant_b" },
      { if: { country: "Germany" }, then: "variant_a" },
      { default: "control" },
    ],
  },
  {
    key: "premium_support",
    enabled: true,
    rules: [{ if: { plan: "pro" }, then: "variant_a" }, { default: "control" }],
  },
  {
    key: "checkout_redesign",
    enabled: true,
    rules: [
      { if: { country: "UK", plan: "pro" }, then: "variant_a" },
      { if: { country: "France", plan: "pro" }, then: "variant_a" },
      { if: { country: "Germany" }, then: "variant_b" },
      { if: { plan: "free" }, then: "variant_b" },
      { default: "control" },
    ],
  },
];
