import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { DiseaseProvider } from "./context/DiseaseContext";
import "./index.css";
import { SoilProvider } from "./context/SoilContext";

createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="top-center" />

    <BrowserRouter>
      <DiseaseProvider>
        <SoilProvider>
          <App />
        </SoilProvider>
      </DiseaseProvider>
    </BrowserRouter>
  </>
);
