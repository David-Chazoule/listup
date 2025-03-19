"use client";
import React from "react";
import styles from "../../styles/todo.module.scss";
import TodoForm from "../components/TodoForm";

function page() {
  return (
    <div className={styles.todoContainer}>
     
      <TodoForm />
    </div>
  );
}

export default page;
