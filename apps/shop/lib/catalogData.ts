export const countries = ["UK", "France", "Germany", "Spain", "Italy"];

export const plans = ["free", "pro"];

export const customers: Record<
  string,
  { id: string; country: string; plan: string }
> = {
  "uk-pro": { id: "uk-pro", country: "UK", plan: "pro" },
  "uk-free": { id: "uk-free", country: "UK", plan: "free" },
  "fr-pro": { id: "fr-pro", country: "France", plan: "pro" },
  "fr-free": { id: "fr-free", country: "France", plan: "free" },
  "de-free": { id: "de-free", country: "Germany", plan: "free" },
};
