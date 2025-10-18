import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import { Provider } from "./components/ui/provider"
import { Toaster } from "./components/utils/Toaster";
import { AuthProvider } from "./components/utils/AuthContext";


import "./style.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <AuthProvider>
      <App/>
    </AuthProvider>
    <Toaster/>
  </Provider>
  
  
);
