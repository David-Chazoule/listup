import Image from "next/image";
import React from "react";
import edit from "../../styles/img/edit.png";
import cancel from "../../styles/img/cancel.png";
import styles from "../../styles/task.module.scss";

type TaskProps = {
  id: string;
  text: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
  openModal: (
    type: "edit" | "delete",
    task: Omit<TaskProps, "openModal" | "checkedFunction">
  ) => void;
  checkedFunction: (id: string, completed: boolean) => void;
};

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR");
}

function Tasks({
  id,
  text,
  createdAt,
  dueDate,
  completed,
  openModal,
  checkedFunction,
}: TaskProps) {
  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCompleted = e.target.checked;
    await checkedFunction(id, newCompleted);
  };

  return (
    <div key={id} className={styles.task_container}>
      <div className={styles.task_card}>
        <div
          className={`${styles.card} ${completed ? styles.taskCompleted : ""}`}
        >
          <span className={styles.taskCheck}>
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCheckboxChange}
            />
            <p className={completed ? styles.completedText : ""}>{text}</p>
          </span>
          <span>
            <p className={completed ? styles.completedText : ""}>
              {formatDate(createdAt)}
            </p>
          </span>
          <span>
            {" "}
            <p className={dueDate ? "" : styles.task_action}>
              {formatDate(dueDate)}
            </p>
          </span>

          <span className={styles.img_container}>
            <Image
              src={edit}
              alt="edit-logo"
              onClick={() =>
                openModal("edit", { id, text, createdAt, dueDate, completed })
              }
            />
            <Image
              src={cancel}
              alt="cancel-logo"
              onClick={() =>
                openModal("delete", { id, text, createdAt, dueDate, completed })
              }
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
