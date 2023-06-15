import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RoutesApp } from "./router/RoutesApp.tsx";
import { mswInit } from "./msw/browser.ts";

mswInit();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RoutesApp />
  </React.StrictMode>,
);
