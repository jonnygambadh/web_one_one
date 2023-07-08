import React from "react";
import { createRoot } from "react-dom/client";
import SidebarPlugin from "./components/SidebarPlugin";

const Hello = () => <main>
<h1>Hello from React - Shell!</h1>
<SidebarPlugin />
</main>;

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<Hello />);
