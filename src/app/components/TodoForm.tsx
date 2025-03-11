import React, { useEffect, useState } from "react";
import styles from "../../styles/todo.module.scss";
import Tasks from "../components/Tasks";
import axios from "axios";
import Modal from "./Modal";
export type Task = {
  id: number;
  text: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
};

function TodoForm() {
  const [listTasks, setListTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");

  const fetchTasks = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/tasks");
      const sortedTasks = result.data.sort((a: Task, b: Task) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ); 
      });
      setListTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
 
  useEffect(() => {
    fetchTasks();
  }, []);

 
  const handleAddTask = () => {
    setModalType("add");
    setSelectedTask(undefined);
    setModalOpen(true);
  };

  
  const handleEditTask = (type: "edit" | "delete", task: Task) => {
    setModalType(type);
    setSelectedTask(task);
    setModalOpen(true);
  };

 
  const handleDeleteTask = (type: "edit " | "delete", task: Task) => {
    setModalType("delete");
    setSelectedTask(task);
    setModalOpen(true);
  };

  return (
    <div className={styles.todoContainer}>
      <div className={styles.buttonContainer}>
        <button onClick={handleAddTask}>ADD NEW TASK +</button>
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
              openModal={(type) =>
                type === "edit"
                  ? handleEditTask("edit", task)
                  : handleDeleteTask("delete", task)
              }
            />
          ))}
        </div>
      </div>

      {modalOpen && (
        <Modal
          type={modalType}
          task={selectedTask}
          refreshTasks={fetchTasks}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default TodoForm;
