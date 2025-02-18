import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/Home/HomePage';
import PricingPage from './components/NavBar/PricingPage';
import DocsPage from './components/NavBar/DocsPage';
import WorkspacePage from './components/NavBar/WorkspacePage';
import Success from './components/Subscription/Success';
import Cancel from './components/Subscription/Cancel';


function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
		  <Route path="/success" element={<Success />} />
 		  <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
