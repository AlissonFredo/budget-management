import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import SetupPage from "./pages/SetupPage";
import Navbar from "./components/Navbar";
import i18n from "./lib/i18n";
import { I18nextProvider } from "react-i18next";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </section>
    </I18nextProvider>
  </StrictMode>
);
