import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../store/interviewStore';
import { useNotification } from '../context/NotificationContext';
import TimeSlotPicker from './TimeSlotPicker';
import './ScheduleInterview.css';

const INTERVIEW_TYPES = ['Technical', 'HR', 'Behavioral', 'System Design'];

const ScheduleInterview = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { interviewers, addInterview, getAvailableTimeSlots } = useInterviewStore();

  const [formData, setFormData] = useState({
    candidate: '',
    interviewerId: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update available slots whenever date or interviewer changes
  useEffect(() => {
    if (formData.date && formData.interviewerId) {
      const slots = getAvailableTimeSlots(
        formData.date,
        Number(formData.interviewerId) // Ensure interviewerId is a number
      );
      console.log('Available slots:', slots); // Debug log
      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.date, formData.interviewerId, getAvailableTimeSlots]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (formData.candidate || formData.time) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset time when date or interviewer changes
    if (name === 'date' || name === 'interviewerId') {
      setFormData(prev => ({ ...prev, [name]: value, time: '' }));
    }

    if (name === 'candidate') {
      const isValid = validateCandidate(value);
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        candidateError: !isValid ? 'Please enter a valid name (at least 2 characters, letters only)' : ''
      }));
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formattedDate = new Date(formData.date).toLocaleDateString('en-CA');
      await addInterview({
        ...formData,
        date: formattedDate,
        interviewerId: Number(formData.interviewerId)
      });
      showNotification('Interview scheduled successfully!');
      navigate('/dashboard');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const validateCandidate = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setFormData({
        candidate: '',
        interviewerId: '',
        date: '',
        time: '',
        type: '',
        notes: ''
      });
      setAvailableSlots([]);
    }
  };

  return (
    <div className="schedule-interview">
      <h2>Schedule New Interview</h2>
      
      <form onSubmit={handleSubmit} className="interview-form">
        <div className="form-group">
          <label htmlFor="candidate" className="required">Candidate Name</label>
          <input
            type="text"
            id="candidate"
            name="candidate"
            value={formData.candidate}
            onChange={handleInputChange}
            required
            className={formData.candidateError ? 'error' : ''}
          />
          {formData.candidateError && (
            <span className="error-message">{formData.candidateError}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="interviewerId" className="required">Interviewer</label>
          <select
            id="interviewerId"
            name="interviewerId"
            value={formData.interviewerId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Interviewer</option>
            {interviewers.map(interviewer => (
              <option key={interviewer.id} value={interviewer.id}>
                {interviewer.name} ({interviewer.expertise.join(', ')})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type" className="required">Interview Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            {INTERVIEW_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date" className="required">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="required">Time Slot</label>
            {formData.date && formData.interviewerId ? (
              <TimeSlotPicker
                availableSlots={availableSlots}
                selectedTime={formData.time}
                onTimeSelect={(time) => setFormData(prev => ({ ...prev, time }))}
              />
            ) : (
              <div className="no-slots-message">
                Please select both date and interviewer first
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={handleClear}
            className="btn-secondary"
          >
            Clear Form
          </button>
          <div className="form-actions-right">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')} 
              className="btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={!formData.time || isLoading || formData.candidateError}
            >
              {isLoading ? 'Scheduling...' : 'Schedule Interview'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScheduleInterview; 