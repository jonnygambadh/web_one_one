import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const Hello = ({
  mainSpan,
  transaction,
}: {
  mainSpan: any;
  transaction: any;
}) => {
  React.useEffect(() => {
    mainSpan.finish();
    transaction.finish();
  }, []);

  return <h1>Hello from React - Sidebar</h1>;
};

const DelayedHello = ({
  mainSpan,
  transaction,
}: {
  mainSpan: any;
  transaction: any;
}) => {
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHello(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return showHello ? (
    <Hello mainSpan={mainSpan} transaction={transaction} />
  ) : null;
};

const mount = (
  el: Element,
  {
    sdk: {
      sentry: { span, transaction },
    },
  }: {
    sdk: {
      sentry: {
        span: any;
        transaction: any;
      };
    };
  },
) => {
  span.finish();
  const renderMainComponentspan = transaction.startChild({
    op: "task",
    description: "Plugin:Sidebar:FCP:3",
  });

  const root = createRoot(el);

  root.render(
    <DelayedHello
      mainSpan={renderMainComponentspan}
      transaction={transaction}
    />,
  );
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#main");

  if (devRoot) {
    mount(devRoot, {
      sdk: {
        sentry: {
          span: {
            setTag: (name: string, value: string) => {
              console.log("name: ", name);
              console.log("value: ", value);
            },
            finish: () => {},
          },
          transaction: {
            startChild: () => {},
            finish: () => {},
          },
        },
      },
    });
  }
}

export { mount };
