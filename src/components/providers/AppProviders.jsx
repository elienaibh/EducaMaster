// src/providers/AppProviders.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QuizProvider } from '../contexts/QuizContext';
import { FlashcardProvider } from '../contexts/FlashcardContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ProgrammingProvider } from '../contexts/ProgrammingContext';
import { BossProvider } from '../contexts/BossContext';
import { AuthProvider } from '../contexts/AuthContext';

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BossProvider>
          <FlashcardProvider>
            <LanguageProvider>
              <ProgrammingProvider>
                <QuizProvider>
                  {children}
                </QuizProvider>
              </ProgrammingProvider>
            </LanguageProvider>
          </FlashcardProvider>
        </BossProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppProviders;