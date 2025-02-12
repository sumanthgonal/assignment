import useInterviewStore from "../context/InterviewContext";
import { toast } from "react-toastify";

const InterviewList = () => {
  const { interviews, deleteInterview } = useInterviewStore();

  return (
    <div>
      <h2>Scheduled Interviews</h2>
      <ul>
        {interviews.length === 0 ? (
          <p>No interviews scheduled.</p>
        ) : (
          interviews.map((int) => (
            <li key={int.id}>
              {int.candidate} with {int.interviewer} on {int.date} at {int.time} ({int.type})
              <button onClick={() => { deleteInterview(int.id); toast.info("Interview deleted!"); }}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default InterviewList;
