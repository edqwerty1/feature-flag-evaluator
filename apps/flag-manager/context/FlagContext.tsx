import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { FlagResult, CustomerContext, Flag } from "@/lib/types";
import { evaluateFlags } from "@/lib/evaluateFlags";

interface FlagContextValue {
  results: FlagResult[];
  loading: boolean;
  refresh: () => void;
}

const FlagContext = createContext<FlagContextValue>({
  results: [],
  loading: true,
  refresh: () => {},
});

export function useFlagContext() {
  return useContext(FlagContext);
}

/**
 * Used when consumed via Module Federation in App 2 (Shop).
 * Calls the /api/get-flags-for-customer endpoint.
 */
export function ApiFlagProvider({
  customer,
  children,
}: {
  customer: CustomerContext | null;
  children: ReactNode;
}) {
  const [results, setResults] = useState<FlagResult[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!customer) return;
    setLoading(true);
    const flagManagerOrigin =
      process.env.NEXT_PUBLIC_FLAG_MANAGER_ORIGIN || "http://localhost:3001";
    fetch(`${flagManagerOrigin.replace(/\/$/, "")}/api/get-flags-for-customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((r) => r.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [customer]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <FlagContext.Provider value={{ results, loading, refresh }}>
      {children}
    </FlagContext.Provider>
  );
}

/**
 * Used within App 3 (FlagManager).
 * Derives flag results from local component state.
 */
export function LocalFlagProvider({
  flags,
  customer,
  children,
}: {
  flags: Flag[];
  customer: CustomerContext | null;
  children: ReactNode;
}) {
  const [results, setResults] = useState<FlagResult[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    if (!customer || flags.length === 0) {
      setResults([]);
      return;
    }
    setResults(evaluateFlags(flags, customer));
  }, [flags, customer]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <FlagContext.Provider value={{ results, loading, refresh }}>
      {children}
    </FlagContext.Provider>
  );
}

export { FlagContext };
export default FlagContext;
