import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Home />
    </section>
  </StrictMode>
);
