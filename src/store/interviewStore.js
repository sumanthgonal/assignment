import create from 'zustand';
import { persist } from 'zustand/middleware';

const useInterviewStore = create(
  persist(
    (set, get) => ({
      interviews: [],
      interviewers: [
        { id: 1, name: 'John Doe', expertise: ['Technical', 'System Design'] },
        { id: 2, name: 'Jane Smith', expertise: ['HR', 'Behavioral'] },
        { id: 3, name: 'Mike Johnson', expertise: ['Technical', 'Behavioral'] },
      ],
      
      // Add new interview
      addInterview: (interview) => {
        const { interviews } = get();
        
        // Check for conflicts
        const hasConflict = interviews.some(existing => {
          const sameDate = existing.date === interview.date;
          const sameInterviewer = existing.interviewerId === interview.interviewerId;
          
          if (sameDate && sameInterviewer) {
            const existingTime = new Date(`2000-01-01T${existing.time}`);
            const newTime = new Date(`2000-01-01T${interview.time}`);
            const timeDiff = Math.abs(existingTime - newTime) / (1000 * 60);
            return timeDiff < 60;
          }
          return false;
        });

        if (hasConflict) {
          throw new Error('Interview time conflicts with existing schedule');
        }

        set(state => ({
          interviews: [...state.interviews, { ...interview, id: Date.now() }]
        }));
      },

      // Get available time slots
      getAvailableTimeSlots: (date, interviewerId) => {
        const { interviews } = get();
        const timeSlots = [];
        const workStart = 9; // 9 AM
        const workEnd = 17; // 5 PM

        // Generate all possible time slots
        for (let hour = workStart; hour < workEnd; hour++) {
          for (let minute of ['00', '30']) { // Adding 30-minute intervals
            const time = `${hour.toString().padStart(2, '0')}:${minute}`;
            timeSlots.push(time);
          }
        }

        // Filter out booked slots
        const availableSlots = timeSlots.filter(time => {
          const isBooked = interviews.some(interview => {
            if (interview.date === date && interview.interviewerId === interviewerId) {
              const interviewTime = new Date(`2000-01-01T${interview.time}`);
              const slotTime = new Date(`2000-01-01T${time}`);
              const timeDiff = Math.abs(interviewTime - slotTime) / (1000 * 60);
              return timeDiff < 60; // Block slots within 1 hour of existing interviews
            }
            return false;
          });
          return !isBooked;
        });

        return availableSlots;
      },

      // Update existing interview
      updateInterview: (id, updatedInterview) => {
        const { interviews } = get();
        
        // Check for conflicts excluding the current interview
        const hasConflict = interviews.some(existing => {
          if (existing.id === id) return false;
          
          const sameDate = existing.date === updatedInterview.date;
          const sameInterviewer = existing.interviewerId === updatedInterview.interviewerId;
          
          if (sameDate && sameInterviewer) {
            const existingTime = new Date(`2000-01-01T${existing.time}`);
            const newTime = new Date(`2000-01-01T${updatedInterview.time}`);
            const timeDiff = Math.abs(existingTime - newTime) / (1000 * 60);
            return timeDiff < 60;
          }
          return false;
        });

        if (hasConflict) {
          throw new Error('Interview time conflicts with existing schedule');
        }

        set(state => ({
          interviews: state.interviews.map(interview =>
            interview.id === id ? { ...interview, ...updatedInterview } : interview
          )
        }));
      },

      // Delete interview
      deleteInterview: (id) => {
        set(state => ({
          interviews: state.interviews.filter(interview => interview.id !== id)
        }));
      },

      // Filter interviews
      filterInterviews: ({ startDate, endDate, interviewerId, candidateName, type }) => {
        const { interviews } = get();
        return interviews.filter(interview => {
          const matchesDateRange = (!startDate || interview.date >= startDate) &&
                                 (!endDate || interview.date <= endDate);
          const matchesInterviewer = !interviewerId || interview.interviewerId === interviewerId;
          const matchesCandidate = !candidateName || 
                                 interview.candidate.toLowerCase().includes(candidateName.toLowerCase());
          const matchesType = !type || interview.type === type;
          
          return matchesDateRange && matchesInterviewer && matchesCandidate && matchesType;
        });
      }
    }),
    {
      name: 'interview-store',
    }
  )
);

export default useInterviewStore; 