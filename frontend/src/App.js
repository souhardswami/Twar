import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import LoginPage from "./components/Auth/LoginPage";
import Registration from "./components/Auth/Registration";
import HomePage from "./components/Home/HomePage";
import PricingPage from "./components/Subscription/PricingPage";
import DocsPage from "./components/Documentation/DocsPage";
import WorkspacePage from "./components/Bot/WorkspacePage";
import Success from "./components/Subscription/Success";
import Cancel from "./components/Subscription/Cancel";
import AgentStudio from "./components/Agent/AgentStudio";
import ReactFlow, { ReactFlowProvider } from "reactflow";

function App() {
  return (
    
    <ChakraProvider>
      
      <Router>
        <Navbar />
        <ReactFlowProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/agent-studio" element={<AgentStudio />} />
          </Routes>
        </ReactFlowProvider>
      </Router> 
    </ChakraProvider>
  );
}

export default App;
