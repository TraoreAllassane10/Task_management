import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {FractoDevTools} from "fractostate/devtools"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <FractoDevTools
        position="left"
        initialOpen={false}
        maximizeMode="overlay"
      />
    </BrowserRouter>
  </StrictMode>,
);
