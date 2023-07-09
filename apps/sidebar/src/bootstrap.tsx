import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const Hello = ({ span, transaction }: { span: any; transaction: any }) => {
  span.finish();
  transaction.finish();
  return <h1>Hello from React - Sidebar</h1>;
};

const DelayedHello = ({
  span,
  transaction,
}: {
  span: any;
  transaction: any;
}) => {
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHello(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return showHello ? <Hello span={span} transaction={transaction} /> : null;
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
  const renderMainComponentspan = span.startChild({
    op: "task",
    description: "Render main component",
  });

  span.finish();

  const root = createRoot(el);

  root.render(
    <DelayedHello span={renderMainComponentspan} transaction={transaction} />,
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
