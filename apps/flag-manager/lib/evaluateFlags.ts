import { Flag, CustomerContext, FlagResult, FlagRule } from "./types";

export function evaluateRule(
  rule: FlagRule,
  context: CustomerContext
): boolean {
  if (!rule.if) return false;
  return Object.entries(rule.if).every(
    ([key, value]) =>
      context[key]?.toLowerCase() === String(value).toLowerCase()
  );
}

export function evaluateFlag(
  flag: Flag,
  context: CustomerContext
): FlagResult {
  if (!flag.enabled) {
    return { key: flag.key, variant: "control" };
  }

  for (const rule of flag.rules) {
    if (rule.default !== undefined) {
      return { key: flag.key, variant: rule.default, matchedRule: rule };
    }
    if (evaluateRule(rule, context)) {
      return { key: flag.key, variant: rule.then!, matchedRule: rule };
    }
  }

  return { key: flag.key, variant: "control" };
}

export function evaluateFlags(
  flags: Flag[],
  context: CustomerContext
): FlagResult[] {
  return flags.map((flag) => evaluateFlag(flag, context));
}
