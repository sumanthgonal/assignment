import { create } from "zustand";

const useInterviewStore = create((set) => ({
  interviews: [],
  addInterview: (interview) =>
    set((state) => ({
      interviews: [...state.interviews, interview],
    })),
  updateInterview: (id, updatedInterview) =>
    set((state) => ({
      interviews: state.interviews.map((int) =>
        int.id === id ? { ...int, ...updatedInterview } : int
      ),
    })),
  deleteInterview: (id) =>
    set((state) => ({
      interviews: state.interviews.filter((int) => int.id !== id),
    })),
}));

export default useInterviewStore;
