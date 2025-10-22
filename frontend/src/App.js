import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import Navbar from "./components/NavBar/NavBar";
import LoginPage from "./components/Auth/LoginPage";
import Registration from "./components/Auth/Registration";
import HomePage from "./components/Home/HomePage";
import PricingPage from "./components/Subscription/PricingPage";
import WorkspacePage from "./components/Bot/WorkspacePage";
import Success from "./components/Subscription/Success";
import Cancel from "./components/Subscription/Cancel";
import AgentStudio from "./components/Agent/AgentStudio";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ReactFlowProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/agent-studio" element={<AgentStudio />} />
        </Routes>
      </ReactFlowProvider>
    </Router>
  );
};

export default App;
