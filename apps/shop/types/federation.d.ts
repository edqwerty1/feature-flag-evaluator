declare module "flagManager/TestDecider" {
  import { ReactNode } from "react";

  interface TestDeciderProps {
    flagKey: string;
    control: ReactNode;
    variantA: ReactNode;
    variantB: ReactNode;
  }

  const TestDecider: React.ComponentType<TestDeciderProps>;
  export default TestDecider;
}

declare module "flagManager/FlagContext" {
  import { ReactNode } from "react";

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

  export function ApiFlagProvider(props: {
    customer: CustomerContext | null;
    children: ReactNode;
  }): JSX.Element;

  export function LocalFlagProvider(props: {
    flags: any[];
    customer: CustomerContext | null;
    children: ReactNode;
  }): JSX.Element;

  export function useFlagContext(): {
    results: FlagResult[];
    loading: boolean;
    refresh: () => void;
  };
}
