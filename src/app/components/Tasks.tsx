import Image from "next/image";
import React from "react";
import edit from "../../styles/img/edit.png";
import cancel from "../../styles/img/cancel.png";
import styles from "../../styles/task.module.scss";

type TasksProps = {
  id: number;
  text: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
};

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

function Tasks({ id, text, createdAt, dueDate, completed }: TasksProps) {
  const formattedCreatedAt = formatDate(createdAt);
  const formattedDueDate = formatDate(dueDate);

  return (
    <div key={id} className={styles.task_container}>
      <div className={styles.task_card}>
        <div className={styles.card}>
          <p className={styles.task_action}>{text}</p>
          <p>{formattedCreatedAt}</p>
          <p>{formattedDueDate}</p>
          <span className={styles.img_container}>
            <Image src={edit} alt="edit-logo" />
            <Image src={cancel} alt="cancel-logo" />
          </span>
        </div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
}

export default Tasks;
