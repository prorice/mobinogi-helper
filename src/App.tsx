import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/main';
import ExchangePage from './pages/ExchangePage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/mobinogi-helper">
      <Layout>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
