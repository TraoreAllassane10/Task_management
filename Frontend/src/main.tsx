import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {FractoDevTools} from "fractostate/devtools"
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster/>
      <FractoDevTools
        position="left"
        initialOpen={false}
        maximizeMode="overlay"
      />
    </BrowserRouter>
  </StrictMode>,
);
