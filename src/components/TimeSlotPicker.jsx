import React from 'react';
import './TimeSlotPicker.css';

const TimeSlotPicker = ({ availableSlots, selectedTime, onTimeSelect }) => {
  if (!availableSlots || availableSlots.length === 0) {
    return (
      <div className="time-slots-container">
        <div className="no-slots-message">
          No available time slots for the selected date and interviewer.
        </div>
      </div>
    );
  }

  return (
    <div className="time-slots-container">
      <div className="time-slots-grid">
        {availableSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
            onClick={() => onTimeSelect(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
