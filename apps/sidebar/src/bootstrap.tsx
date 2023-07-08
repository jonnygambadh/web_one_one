import React from "react";
import { createRoot } from "react-dom/client";

const Hello = () => <h1>Hello from React - Sidebar</h1>;

const mount = (el: Element) => {
  const root = createRoot(el);

  root.render(<Hello />);
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#main");

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
