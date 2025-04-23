import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </section>
  </StrictMode>
);
