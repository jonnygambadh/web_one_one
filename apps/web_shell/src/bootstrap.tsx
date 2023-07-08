import React from "react";
import { createRoot } from "react-dom/client";

const Hello = () => <h1>Hello from React!</h1>;

  const container = document.getElementById(el)!;
  const root = createRoot(container);

  root.render(<Hello />);

