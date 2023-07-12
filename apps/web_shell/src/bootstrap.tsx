import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";

import FederatedWrapper from "./components/FederatedWrapper";
import ReviewsMain from "reviews/Main";
import { SdkProvider, useSdk } from "host/sdk";

const SidebarPlugin = React.lazy(() => import("./components/SidebarPlugin"));

const Hello = () => {
  const transactionRef = useRef<Sentry.Transaction | null>(null);
  const spanRef = useRef<Sentry.Span | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { getPlatform } = useSdk();

  useEffect(() => {
    const newTransaction = Sentry.startTransaction({
      name: "Plugin:Sidebar:Transaction:3",
    });

    Sentry.getCurrentHub().configureScope((scope) => {
      scope.setSpan(newTransaction);
    });

    const newSpan = newTransaction.startChild({
      op: "task",
      description: "Plugin:Sidebar:TTI:3",
    });

    transactionRef.current = newTransaction;
    spanRef.current = newSpan;
    setIsInitialized(true);
  }, []);

  return (
    <main>
      <h1>Hello from React - Shell! {getPlatform()}</h1>
      <FederatedWrapper
        error={<div>Temporary Sidebar</div>}
        delayed={<div>Loading sidebar...</div>}
      >
        {isInitialized && (
          <SidebarPlugin
            span={spanRef.current}
            transaction={transactionRef.current}
          />
        )}
        <ReviewsMain />
      </FederatedWrapper>
    </main>
  );
};

ReactDOM.render(
  <SdkProvider>
    <Hello />
  </SdkProvider>,
  document.getElementById("root"),
);
