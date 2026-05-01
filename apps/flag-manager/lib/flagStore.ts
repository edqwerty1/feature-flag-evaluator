import { Flag } from "./types";
import { seedFlags } from "./seedFlags";

// Module-scoped store survives HMR but not server restart
// Uses globalThis to persist across hot reloads in development
const globalKey = "__FLAG_STORE__";

function getStore(): Flag[] {
  if (!(globalThis as any)[globalKey]) {
    (globalThis as any)[globalKey] = [...seedFlags];
  }
  return (globalThis as any)[globalKey];
}

function setStore(flags: Flag[]): void {
  (globalThis as any)[globalKey] = flags;
}

export const flagStore = { getStore, setStore };
