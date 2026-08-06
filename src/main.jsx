import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";
import queryClient from "@/services/queryClient";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@/assets/styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import bootstrap from "@/bootstrap";
import App from "./App";

await bootstrap();

createRoot(document.getElementById('root')).render(


  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>

  ,
)
