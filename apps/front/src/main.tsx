import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare let VITE_DEFINE_BASE_PATH: string;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter basename={VITE_DEFINE_BASE_PATH}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
);
