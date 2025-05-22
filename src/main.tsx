import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
const querClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={querClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>
);
