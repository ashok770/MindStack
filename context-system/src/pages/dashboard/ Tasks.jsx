import { useEffect, useState } from "react";
import { getUserTasks } from "../../tasks/getTasks";
import TaskList from "../../components/TaskList";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getUserTasks().then(setTasks);
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}
