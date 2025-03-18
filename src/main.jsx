import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";
import Container from "./components/Container";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container>
      <Home />
    </Container>
  </StrictMode>
);
