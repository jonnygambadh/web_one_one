import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root")!;
const root = createRoot(container);

const Hello = () => <h1>Hello from React!</h1>;

root.render(<Hello />);
