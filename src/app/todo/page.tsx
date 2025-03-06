import React from "react";
import styles from "../../styles/todo.module.scss";
import Tasks from "../components/Tasks";
function page() {
  return (
    <div className={styles.todoContainer}>
      <h1>List Up</h1>
      <p>Todo list</p>
      <div className={styles.buttonContainer}>
        <button>ADD NEW TASK +</button>
      </div>
      <div className={styles.tasksContainer}>
        <div className={styles.titleTask}>
          <p>Task</p> <p>Action</p>
        </div>

        <div className={styles.tasks}>
          <Tasks />
          <Tasks />
        </div>
      </div>
    </div>
  );
}

export default page;
