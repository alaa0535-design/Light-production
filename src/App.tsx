import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLayout from './layouts/AdminLayout';
import AuthGuard from './components/Auth/AuthGuard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProjectManagement from './pages/Admin/ProjectManagement';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={
            <AuthGuard>
              <AdminLayout />
            </AuthGuard>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<ProjectManagement />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;