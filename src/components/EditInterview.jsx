import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useInterviewStore from '../store/interviewStore';
import { useNotification } from '../context/NotificationContext';
import './EditInterview.css';

const INTERVIEW_TYPES = ['Technical', 'HR', 'Behavioral', 'System Design'];

const EditInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { interviews, interviewers, updateInterview, getAvailableTimeSlots } = useInterviewStore();

  const [formData, setFormData] = useState({
    candidate: '',
    interviewerId: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [originalTime, setOriginalTime] = useState('');

  useEffect(() => {
    const interview = interviews.find(i => i.id === Number(id));
    if (!interview) {
      showNotification('Interview not found', 'error');
      navigate('/dashboard');
      return;
    }

    setFormData(interview);
    setOriginalTime(interview.time);
    
    // Get available time slots for the date and interviewer
    const slots = getAvailableTimeSlots(interview.date, Number(interview.interviewerId));
    setAvailableSlots([...slots, interview.time].sort());
  }, [id, interviews, navigate, showNotification, getAvailableTimeSlots]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'date' || name === 'interviewerId') {
      if (formData.date && formData.interviewerId) {
        const slots = getAvailableTimeSlots(
          name === 'date' ? value : formData.date,
          name === 'interviewerId' ? Number(value) : Number(formData.interviewerId)
        );
        // Include original time slot if same date and interviewer
        if (name === 'date' && formData.date === value && 
            name === 'interviewerId' && formData.interviewerId === value) {
          slots.push(originalTime);
        }
        setAvailableSlots(slots.sort());
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInterview(Number(id), formData);
      showNotification('Interview updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  return (
    <div className="edit-interview">
      <div className="edit-header">
        <h2>Edit Interview</h2>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="interview-form">
        <div className="form-group">
          <label htmlFor="candidate">Candidate Name</label>
          <input
            type="text"
            id="candidate"
            name="candidate"
            value={formData.candidate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interviewerId">Interviewer</label>
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
          <label htmlFor="type">Interview Type</label>
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
            <label htmlFor="date">Date</label>
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
            <label htmlFor="time">Time Slot</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Time Slot</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
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
            onClick={() => navigate('/dashboard')} 
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Update Interview
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInterview;
