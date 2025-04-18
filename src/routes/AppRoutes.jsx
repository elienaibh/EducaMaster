// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from '../components/layout/MainLayout';

// Páginas
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import QuizPage from '../pages/QuizPage';
import QuizDetailsPage from '../pages/QuizPage/QuizDetailsPage';
import QuizPlayPage from '../pages/QuizPage/QuizPlayPage';
import FlashcardPage from '../pages/FlashcardPage';
import FlashcardStudyPage from '../pages/FlashcardPage/FlashcardStudyPage';
import FlashcardCreatePage from '../pages/FlashcardPage/FlashcardCreatePage';
import FlashcardEditPage from '../pages/FlashcardPage/FlashcardEditPage';
import FlashcardStatsPage from '../pages/FlashcardPage/FlashcardStatsPage';
import ProgrammingPage from '../pages/ProgrammingPage';
import ChallengePage from '../pages/ProgrammingPage/ChallengePage';
import LanguagePage from '../pages/LanguagePage';
import LanguageLessonsPage from '../pages/LanguagePage/LanguageLessonsPage';
import AudioSyncPage from '../pages/LanguagePage/AudioSyncPage';
import BossBattlePage from '../pages/BossBattlePage'; // Nova importação
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import LoginPage from '../pages/AuthPage/LoginPage';
import RegisterPage from '../pages/AuthPage/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

// Mock de autenticação (substituir por um contexto real posteriormente)
const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};

// Componente de rota protegida
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rotas protegidas */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Rota do Boss Battle */}
      <Route 
        path="/boss" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <BossBattlePage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas de Quiz */}
      <Route 
        path="/quiz" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <QuizPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/quiz/:id" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <QuizDetailsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/quiz/:id/play" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <QuizPlayPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas de Flashcard */}
      <Route 
        path="/flashcards" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <FlashcardPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/flashcards/:id" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <FlashcardStudyPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/flashcards/create" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <FlashcardCreatePage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/flashcards/:id/edit" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <FlashcardEditPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/flashcards/:id/stats" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <FlashcardStatsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas de Programação */}
      <Route 
        path="/programming" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProgrammingPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/programming/:id" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <ChallengePage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas de Idiomas */}
      <Route 
        path="/language" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <LanguagePage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/language/:id" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <LanguageLessonsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/language/audio-sync/:id" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <AudioSyncPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas de Perfil e Configurações */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Rota para página não encontrada */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;