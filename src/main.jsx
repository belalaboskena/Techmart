import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Storeprovider from "./contexts/storecontext.jsx";
import { SnackbarProvider } from "notistack";
createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Techmart">
    <StrictMode>
      <Storeprovider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </Storeprovider>
    </StrictMode>
  </BrowserRouter>,
);
