import { useState } from "react";
import { toast } from "react-toastify";
import useInterviewStore from "../context/InterviewContext";

const InterviewForm = () => {
  const { addInterview, interviews } = useInterviewStore();
  const [formData, setFormData] = useState({
    candidate: "",
    interviewer: "",
    date: "",
    time: "",
    type: "Technical",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Conflict check
    const conflict = interviews.some(
      (i) => i.date === formData.date && i.time === formData.time && (i.candidate === formData.candidate || i.interviewer === formData.interviewer)
    );

    if (conflict) {
      toast.error("Time slot already booked!");
      return;
    }

    addInterview({ id: Date.now(), ...formData });
    toast.success("Interview scheduled!");
    setFormData({ candidate: "", interviewer: "", date: "", time: "", type: "Technical" });
  };

  return (
    <form onSubmit={handleSubmit} className="interview-form">
      <input type="text" name="candidate" placeholder="Candidate Name" value={formData.candidate} onChange={handleChange} required />
      <input type="text" name="interviewer" placeholder="Interviewer Name" value={formData.interviewer} onChange={handleChange} required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option>Technical</option>
        <option>HR</option>
        <option>Behavioral</option>
      </select>
      <button type="submit">Schedule Interview</button>
    </form>
  );
};

export default InterviewForm;
