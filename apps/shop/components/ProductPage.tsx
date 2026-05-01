import React, { useState, lazy, Suspense } from "react";
import * as stylex from "@stylexjs/stylex";

import BuyButton from "./buy-button/BuyButton";
import BuyButtonA from "./buy-button/Tests/A/BuyButton";
import BuyButtonB from "./buy-button/Tests/B/BuyButton";
import Price from "./price/Price";
import PriceA from "./price/Tests/A/Price";
import PriceB from "./price/Tests/B/Price";
import ProductDetails from "./product-details/ProductDetails";
import ProductDetailsA from "./product-details/Tests/A/ProductDetails";
import ProductDetailsB from "./product-details/Tests/B/ProductDetails";

const RemoteTestDecider = lazy(() =>
  import("flagManager/TestDecider").catch(() => ({
    default: ({
      control,
    }: {
      flagKey: string;
      control: React.ReactNode;
      variantA: React.ReactNode;
      variantB: React.ReactNode;
    }) => <>{control}</>,
  }))
);

const PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop";

const styles = stylex.create({
  page: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px 24px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  imageWrapper: {
    width: "100%",
    maxWidth: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "20px",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    maxHeight: "160px",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },
  sizeRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  sizeLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#555",
  },
  sizeSelect: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
  },
});

export default function ProductPage() {
  const [size, setSize] = useState("M");

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.imageWrapper)}>
        <img
          {...stylex.props(styles.image)}
          src={PRODUCT_IMAGE}
          alt="Classic Cotton Socks"
        />
      </div>

      <Suspense fallback={<ProductDetails />}>
        <RemoteTestDecider
          flagKey="new_checkout"
          control={<ProductDetails />}
          variantA={<ProductDetailsA />}
          variantB={<ProductDetailsB />}
        />
      </Suspense>

      <Suspense fallback={<Price />}>
        <RemoteTestDecider
          flagKey="checkout_redesign"
          control={<Price />}
          variantA={<PriceA />}
          variantB={<PriceB />}
        />
      </Suspense>

      <div {...stylex.props(styles.sizeRow)}>
        <span {...stylex.props(styles.sizeLabel)}>Size</span>
        <select
          {...stylex.props(styles.sizeSelect)}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      <Suspense fallback={<BuyButton />}>
        <RemoteTestDecider
          flagKey="holiday_banner"
          control={<BuyButton />}
          variantA={<BuyButtonA />}
          variantB={<BuyButtonB />}
        />
      </Suspense>
    </div>
  );
}
