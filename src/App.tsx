import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import TournamentFormPage from './pages/TournamentFormPage';
import BracketPage from './pages/BracketPage';
import TournamentEditPage from './pages/TournamentEditPage';
import TournamentSettingsPage from './pages/TournamentSettingsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="tournaments/new" element={<TournamentFormPage />} />
          <Route path="tournaments/:id" element={<BracketPage />} />
          <Route path="tournaments/:id/edit" element={<TournamentEditPage />} />
          <Route path="tournaments/:id/settings" element={<TournamentSettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;