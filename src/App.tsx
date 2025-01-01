// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Whiteboard from './pages/Whiteboard';
import Dashboard from './pages/Dashboard';
import FileSharing from './pages/FileSharing';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>        
      <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />  
        <Route path="/whiteboard" element={<Whiteboard />}></Route>      
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/file" element={<FileSharing />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
