import React from "react";
import { createRoot } from "react-dom/client";
import { mount } from "sidebar/Main";

console.log('mount: ', mount);

const Hello = () => <h1>Hello from React - Shell!</h1>;

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<Hello />);
