import React, { useEffect, useState, lazy, Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import Cookies from "js-cookie";
import type { ReactNode } from "react";

interface CustomerContext {
  id: string;
  country: string;
  plan: string;
  [key: string]: string;
}

interface FlagResult {
  key: string;
  variant: string;
}

const RemoteApiFlagProvider = lazy(() =>
  import("flagManager/FlagContext").then((mod) => ({
    default: mod.ApiFlagProvider,
  })).catch(() => ({
    default: ({ children }: { children: ReactNode; customer: CustomerContext | null }) => <>{children}</>,
  }))
);

const DEFAULT_AUTH_ID = "uk-pro";

const styles = stylex.create({
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    padding: "16px 24px",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "700",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    color: "#888",
  },
});

export default function ShopProductPage() {
  const [customer, setCustomer] = useState<CustomerContext | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let authId = Cookies.get("authId");
    if (!authId) {
      authId = DEFAULT_AUTH_ID;
      Cookies.set("authId", authId, { expires: 7 });
    }

    fetch(`/api/customers/${encodeURIComponent(authId)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      })
      .catch(() => {
        setCustomer({ id: authId!, country: "UK", plan: "pro" });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div {...stylex.props(styles.loading)}>Loading customer data...</div>
    );
  }

  // Import ProductPage component directly since this is the Shop app
  const ProductPage =
    require("@/components/ProductPage").default;

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header)}>ExperianShop</div>
      <Suspense
        fallback={
          <div {...stylex.props(styles.loading)}>Loading flags...</div>
        }
      >
        <RemoteApiFlagProvider customer={customer}>
          <ProductPage />
        </RemoteApiFlagProvider>
      </Suspense>
    </div>
  );
}
