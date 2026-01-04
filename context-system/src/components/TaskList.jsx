import { useNavigate } from "react-router-dom";

export default function TaskList({ tasks }) {
  const navigate = useNavigate();

  if (tasks.length === 0) return <p>No tasks yet</p>;

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-card"
          onClick={() => navigate(`/resume/${task.id}`)}
        >
          <strong>{task.title}</strong>
          <p>Click to resume</p>
        </div>
      ))}
    </div>
  );
}
