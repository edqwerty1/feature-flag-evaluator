import React, { useState, useCallback, lazy, Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { LocalFlagProvider } from "@/context/FlagContext";
import FlagConfig from "@/components/FlagConfig";
import MockCustomer from "@/components/MockCustomer";
import { Flag, CustomerContext } from "@/lib/types";

const RemoteProductPage = lazy(() =>
  import("shop/ProductPage").catch(() => ({
    default: () => (
      <div {...stylex.props(styles.fallback)}>
        <p>Shop app not available. Start it on port 3000.</p>
      </div>
    ),
  }))
);

const styles = stylex.create({
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(320px, 400px) minmax(0, 1fr) minmax(300px, 420px)",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    overflowX: "hidden",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  center: {
    padding: "24px",
    backgroundColor: "#fff",
    overflowY: "auto",
    overflowX: "hidden",
    minWidth: 0,
  },
  fallback: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#888",
    fontSize: "16px",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    color: "#888",
  },
});

export default function ProductTester() {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [customer, setCustomer] = useState<CustomerContext | null>(null);

  const handleFlagsChange = useCallback((newFlags: Flag[]) => {
    setFlags(newFlags);
  }, []);

  const handleCustomerChange = useCallback((c: CustomerContext) => {
    setCustomer(c);
  }, []);

  return (
    <div {...stylex.props(styles.layout)}>
      <MockCustomer flags={flags} onCustomerChange={handleCustomerChange} />
      <div {...stylex.props(styles.center)}>
        <LocalFlagProvider flags={flags} customer={customer}>
          <Suspense
            fallback={
              <div {...stylex.props(styles.loading)}>
                Loading product page...
              </div>
            }
          >
            <RemoteProductPage />
          </Suspense>
        </LocalFlagProvider>
      </div>
      <FlagConfig onFlagsChange={handleFlagsChange} />
    </div>
  );
}
