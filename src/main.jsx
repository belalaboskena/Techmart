import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Storeprovider from "./contexts/storecontext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import { SnackbarProvider } from "notistack";
import Grow from "@mui/material/Grow";
createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <SnackbarProvider maxSnack={3} TransitionComponent={Grow}>
        <AuthProvider>
          <Storeprovider>
            <App />
          </Storeprovider>
        </AuthProvider>
      </SnackbarProvider>
    </StrictMode>
  </HashRouter>,
);
