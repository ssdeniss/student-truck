import React, { lazy, Suspense } from 'react';
import Default from './layouts/Default';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Home = lazy(() => import('./pages/home/Home'));

const App: React.FC = () => {
  return (
    <div className="app">
      <Default>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </Default>
    </div>
  );
};

export default App;
