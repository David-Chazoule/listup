"use client";
import React from "react";
import styles from "../../styles/todo.module.scss";
import TodoForm from "../components/TodoForm";

function page() {
  return (
    <div className={styles.todoContainer}>
      <h1>List Up</h1>
      <p>Todo list</p>
      <TodoForm />
    </div>
  );
}

export default page;
