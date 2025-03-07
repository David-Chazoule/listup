import React, { useEffect, useState } from "react";
import styles from "../../styles/todo.module.scss";
import Tasks from "../components/Tasks";
import axios from "axios";
type Task = {
  id: number;
  text: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
};

function TodoForm() {
  const [listTasks, setListTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/tasks");
        setListTasks(result.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={styles.todoContainer}>
      <div className={styles.buttonContainer}>
        <button>ADD NEW TASK +</button>
      </div>
      <div className={styles.tasksContainer}>
        <div className={styles.titleTask}>
          <p>Task</p> <p>Action</p>
        </div>

        <div className={styles.tasks}>
          {listTasks?.map((task) => (
            <Tasks
              key={task.id}
              id={task.id}
              text={task.text}
              createdAt={task.createdAt}
              dueDate={task.dueDate}
              completed={task.completed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoForm;
