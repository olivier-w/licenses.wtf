import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import "@fontsource-variable/geist";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./hooks/useTheme";

inject();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
