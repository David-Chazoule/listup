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
  const [completedFilter, setCompletedFilter] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");

  const fetchTasks = async () => {
    try {
      const url = new URL("http://localhost:3000/api/tasks");

      if (completedFilter !== null) {
        url.searchParams.append("completed", completedFilter.toString());
      }

      const result = await axios.get(url.toString());

      let sortedTasks = result.data;

      if (sortBy === "createdAt") {
        
        sortedTasks = result.data.sort((a: Task, b: Task) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
      } else if (sortBy === "dueDate") {
        
        sortedTasks = result.data.sort((a: Task, b: Task) => {
          if (a.dueDate === null && b.dueDate === null) return 0;
          if (a.dueDate === null) return 1; 
          if (b.dueDate === null) return -1; 
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
      }

      setListTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [completedFilter, sortBy]);
  
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
        <div className="btn-filters">
          <button onClick={() => setCompletedFilter(null)}>all tasks</button>
          <button onClick={() => setCompletedFilter(true)}>
            finished tasks
          </button>
          <button onClick={() => setCompletedFilter(false)}>
          unfinished tasks
          </button>
          <button onClick={() => setSortBy("createdAt")}>
          sort by creation date
          </button>
          <button onClick={() => setSortBy("dueDate")}>
          sort by due date
          </button>
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
