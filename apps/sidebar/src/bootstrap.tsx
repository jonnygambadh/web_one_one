import React from "react";
import { createRoot } from "react-dom/client";

const Hello = () => <h1>Hello from React - Sidebar</h1>;

const mount = (el:string) => {
  const container = document.getElementById(el)!;
  const root = createRoot(container);

  root.render(<Hello />);
}

if (process.env.NODE_ENV === 'development') {
  const container = document.getElementById('main')!;

  if (container) {
    mount('main')
  }
}

export {mount}
