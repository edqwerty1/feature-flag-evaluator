export interface FlagRule {
  if?: Record<string, string>;
  default?: string;
  then?: string;
}

export interface Flag {
  key: string;
  enabled: boolean;
  rules: FlagRule[];
}

export interface CustomerContext {
  id: string;
  country: string;
  plan: string;
  [key: string]: string;
}

export interface FlagResult {
  key: string;
  variant: string;
  matchedRule?: FlagRule;
}
