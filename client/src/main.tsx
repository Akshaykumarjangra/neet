import { createRoot } from "react-dom/client";
import App from "./App";
import "./variables.css";
import "./index.css";

// Ensure all fetch calls include credentials by default so session cookies are sent
const originalFetch = window.fetch.bind(window);
window.fetch = (input, init = {}) => {
  const nextInit = { credentials: "include", ...init };
  return originalFetch(input as RequestInfo, nextInit as RequestInit);
};

createRoot(document.getElementById("root")!).render(<App />);
