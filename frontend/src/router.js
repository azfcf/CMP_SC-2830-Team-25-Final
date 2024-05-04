import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/home';
import Register from './components/register';
import Game from './components/game'

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/game" element={ <Game /> } />
        </Routes>
    </Router>
  );
}

export default AppRouter;