import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import InterviewDashboard from './components/InterviewDashboard';
import ScheduleInterview from './components/ScheduleInterview';
import EditInterview from './components/EditInterview';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<InterviewDashboard />} />
              <Route path="/schedule" element={<ScheduleInterview />} />
              <Route path="/edit-interview/:id" element={<EditInterview />} />
            </Routes>
          </main>
        </div>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default App;
