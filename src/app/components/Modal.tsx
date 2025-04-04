import React, { useState } from "react";
import styles from "../../styles/modal.module.scss";
import axios from "axios";
import { Task } from "./TodoForm";

type ModalProps = {
  type: "add" | "edit" | "delete";
  task: Task | undefined;
  refreshTasks: () => void;
  closeModal: () => void;
};

function Modal({ type, task, closeModal, refreshTasks }: ModalProps) {
  const [text, setText] = useState(task?.text || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSubmit = async () => {
    try {
      if (type === "add") {
        await axios.post("/api/tasks", { text, dueDate });
      } else if (type === "edit" && task) {
        await axios.put("/api/tasks", {
          id: task.id,
          text,
          dueDate,
          completed: task.completed,
        });
      } else if (type === "delete" && task) {
        await axios.delete("/api/tasks", { data: { id: task.id } });
      }

      refreshTasks();
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <h2>
          {type === "add"
            ? "Add Task"
            : type === "edit"
            ? "Edit Task"
            : "Delete Task"}
        </h2>

        {type !== "delete" ? (
          <div className={styles.input_container}>
            <input
              type="text"
              placeholder="Task description"
              className={styles.inputTask}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        ) : (
          <p>Are you sure you want to delete this task?</p>
        )}

        <div className={styles.btn_container}>
          <button onClick={handleSubmit}>
            {type === "delete" ? "Confirm" : "Save"}
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
