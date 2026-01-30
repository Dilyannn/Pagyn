import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './components/auth/ProtectedRoute'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import EditorPage from './pages/EditorPage.jsx'
import ViewBookPage from './pages/ViewBookPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
        />
        <Route 
          path="/editor/:bookId" 
          element={<ProtectedRoute><EditorPage /></ProtectedRoute>} 
        />
        <Route 
          path="/view-book/:bookId" 
          element={<ProtectedRoute><ViewBookPage /></ProtectedRoute>} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
        />
      </Routes>
    </>
  )
}

export default App