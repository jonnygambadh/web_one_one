import React from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import FederatedWrapper from "./components/FederatedWrapper";

const SidebarPlugin = React.lazy(() => import("./components/SidebarPlugin"));

const transaction = Sentry.startTransaction({ name: "sidebarLoad" });

Sentry.getCurrentHub().configureScope((scope) => {
  scope.setSpan(transaction);
  scope.setTag("plugin", "sidebar");
  scope.setTag("performance", "sidebar");
});

const span = transaction.startChild({
  op: "task",
  description: "loading sidebar plugin",
});

span.setTag("plugin", "sidebar");

const Hello = () => {
  return (
    <main>
      <h1>Hello from React - Shell!</h1>
      <FederatedWrapper
        error={<div>Temporary Sidebar</div>}
        delayed={<div>Loading sidebar...</div>}
      >
        <SidebarPlugin span={span} transaction={transaction} />
      </FederatedWrapper>
    </main>
  );
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<Hello />);
