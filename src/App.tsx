import React from 'react';
import Default from './layouts/Default';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';

const App = () => {
  return (
    <div className="app">
      <Default>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Default>
    </div>
  );
};

export default App;
