import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Vitals from './components/Vitals';
import Layout from './components/Layout';

function App() {
  const userProfile = useStore((state) => state.userProfile);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          !userProfile ? <Onboarding /> : <Navigate to="/dashboard" />
        } />
        <Route path="/dashboard" element={
          userProfile ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        } />
        <Route path="/vitals" element={
          userProfile ? (
            <Layout>
              <Vitals />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        } />
        <Route path="/profile" element={
          userProfile ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;