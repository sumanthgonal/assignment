import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../store/interviewStore';
import { useNotification } from '../context/NotificationContext';
import CalendarView from './CalendarView';
import './InterviewDashboard.css';

const InterviewDashboard = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { interviews, interviewers, deleteInterview } = useInterviewStore();

  // State for filters and view
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    interviewerId: '',
    candidateName: '',
    type: ''
  });
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'

  // Memoized filtered interviews
  const filteredInterviews = useMemo(() => {
    return interviews.filter(interview => {
      // Date range filter
      const matchesDateRange = (!filters.startDate || interview.date >= filters.startDate) &&
                             (!filters.endDate || interview.date <= filters.endDate);
      
      // Interviewer filter
      const matchesInterviewer = !filters.interviewerId || 
                                interview.interviewerId === Number(filters.interviewerId);
      
      // Candidate name filter
      const matchesCandidate = !filters.candidateName || 
                              interview.candidate.toLowerCase().includes(filters.candidateName.toLowerCase());
      
      // Interview type filter
      const matchesType = !filters.type || interview.type === filters.type;
      
      return matchesDateRange && matchesInterviewer && matchesCandidate && matchesType;
    });
  }, [interviews, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      try {
        await deleteInterview(id);
        showNotification('Interview deleted successfully');
      } catch (error) {
        showNotification(error.message, 'error');
      }
    }
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="interview-dashboard">
      <div className="dashboard-header">
        <h1>Interview Dashboard</h1>
        <button 
          className="btn-primary schedule-btn"
          onClick={() => navigate('/schedule')}
        >
          Schedule New Interview
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            placeholder="Start Date"
            className="filter-input"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            placeholder="End Date"
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <select
            name="interviewerId"
            value={filters.interviewerId}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option value="">All Interviewers</option>
            {interviewers.map(interviewer => (
              <option key={interviewer.id} value={interviewer.id}>
                {interviewer.name}
              </option>
            ))}
          </select>

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option value="">All Types</option>
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Behavioral">Behavioral</option>
            <option value="System Design">System Design</option>
          </select>

          <input
            type="text"
            name="candidateName"
            value={filters.candidateName}
            onChange={handleFilterChange}
            placeholder="Search by candidate name"
            className="filter-input search-input"
          />
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${view === 'calendar' ? 'active' : ''}`}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
          <button
            className={`view-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            List View
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <CalendarView interviews={filteredInterviews} />
      ) : (
        <div className="interviews-list">
          {filteredInterviews.length === 0 ? (
            <div className="no-interviews">
              <p>No interviews found matching your criteria</p>
            </div>
          ) : (
            filteredInterviews.map(interview => (
              <div key={interview.id} className="interview-card">
                <div className="interview-card-header">
                  <h3>{interview.candidate}</h3>
                  <span className={`interview-type ${interview.type.toLowerCase()}`}>
                    {interview.type}
                  </span>
                </div>
                
                <div className="interview-card-body">
                  <p>
                    <strong>Interviewer:</strong> {
                      interviewers.find(i => i.id === Number(interview.interviewerId))?.name
                    }
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {formatTime(interview.time)}
                  </p>
                  {interview.notes && (
                    <p className="interview-notes">
                      <strong>Notes:</strong> {interview.notes}
                    </p>
                  )}
                </div>

                <div className="interview-card-actions">
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/edit-interview/${interview.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(interview.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewDashboard;
