import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import { useNavigate } from 'react-router-dom';
import './CalendarView.css';

const CalendarView = ({ interviews }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to format time in 12-hour format
  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    return date.toLocaleDateString('en-CA'); // This returns YYYY-MM-DD format
  };

  // Function to get interviews for a specific date
  const getInterviewsForDate = (date) => {
    const dateStr = formatDate(date);
    return interviews.filter(interview => interview.date === dateStr);
  };

  // Function to handle tile content (shows dots for dates with interviews)
  const getTileContent = ({ date }) => {
    const dateStr = formatDate(date);
    const dayInterviews = interviews.filter(i => i.date === dateStr);
    
    if (dayInterviews.length === 0) return null;

    return (
      <div className="interview-indicator">
        <span className="dot"></span>
        {dayInterviews.length > 1 && (
          <span className="count">{dayInterviews.length}</span>
        )}
      </div>
    );
  };

  // Get interviews for the selected date
  const selectedDateInterviews = getInterviewsForDate(selectedDate);

  return (
    <div className="calendar-view">
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={getTileContent}
          className="custom-calendar"
          minDetail="month"
          maxDetail="month"
          minDate={new Date()}
        />
      </div>

      <div className="interviews-panel">
        <h3 className="date-header">
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h3>

        <div className="day-interviews">
          {selectedDateInterviews.length === 0 ? (
            <p className="no-interviews">No interviews scheduled for this date</p>
          ) : (
            selectedDateInterviews
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(interview => (
                <div key={interview.id} className="interview-item">
                  <div className="interview-time">
                    {formatTime(interview.time)}
                  </div>
                  <div className="interview-details">
                    <div className="interview-header">
                      <h4>{interview.candidate}</h4>
                      <span className={`interview-type ${interview.type.toLowerCase()}`}>
                        {interview.type}
                      </span>
                    </div>
                    <p className="interviewer-name">
                      Interviewer: {interview.interviewer}
                    </p>
                  </div>
                  <div className="interview-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => navigate(`/edit-interview/${interview.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
