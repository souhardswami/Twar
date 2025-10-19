import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/utils/Toaster";
import { AuthProvider } from "./components/utils/AuthContext";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster />
  </Provider>
);
