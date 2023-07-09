import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import FederatedWrapper from "./components/FederatedWrapper";

const SidebarPlugin = React.lazy(() => import("./components/SidebarPlugin"));

const Hello = () => {
  const transactionRef = useRef<Sentry.Transaction | null>(null);
  const spanRef = useRef<Sentry.Span | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    const newTransaction = Sentry.startTransaction({
      name: "Sidebar:load:transaction:3",
    });

    Sentry.getCurrentHub().configureScope((scope) => {
      scope.setSpan(newTransaction);
    });

    const newSpan = newTransaction.startChild({
      op: "task",
      description: "Sidebar:load:plugin:3",
    });

    transactionRef.current = newTransaction;
    spanRef.current = newSpan;
    setIsInitialized(true);
  }, []);

  return (
    <main>
      <h1>Hello from React - Shell!</h1>
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
      </FederatedWrapper>
    </main>
  );
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<Hello />);
