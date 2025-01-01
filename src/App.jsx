import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { SpeedDialMain } from './components/SpeedDialMain'
import { StickyNavbar } from './components/StickyNavbar'
import { AuthProvider } from './context/AuthContext'
import Bot from './pages/Bot'
import Bots from './pages/Bots'
import CreateBot from './pages/CreateBot'
import Docs from './pages/Docs'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <main className="w-full overflow-scroll relative">
          <StickyNavbar />

          <div className="p-4">
            <div className="mx-auto max-w-screen-md py-12">
              <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bots"
                  element={
                    <ProtectedRoute>
                      <Bots />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/docs"
                  element={
                    <ProtectedRoute>
                      <Docs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-bot"
                  element={
                    <ProtectedRoute>
                      <CreateBot />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bot/:id"
                  element={
                    <ProtectedRoute>
                      <Bot />
                    </ProtectedRoute>
                  }
                />

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          <SpeedDialMain />
          <Footer />
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
