import React from "react";
import { createRoot } from "react-dom/client";

const Hello = () => <h1>Hello from React!</h1>;

const mount = (el:string) => {
  const container = document.getElementById(el)!;
  const root = createRoot(container);

  root.render(<Hello />);
}

if (process.env.NODE_ENV === 'development') {
  const container = document.getElementById('root')!;

  if (container) {
    mount('root')
  }
}

export {mount}
