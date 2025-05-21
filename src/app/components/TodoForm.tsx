import React, { useEffect, useState } from "react";
import styles from "../../styles/todo.module.scss";
import Tasks from "../components/Tasks";
import axios from "axios";
import Modal from "./Modal";
import { FourSquare } from "react-loading-indicators";

// Type définissant la structure d'une tâche
export type Task = {
  id: string;
  text: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
};

function TodoForm() {
  // États du composant
  const [listTasks, setListTasks] = useState<Task[]>([]); // Liste des tâches
  const [modalOpen, setModalOpen] = useState(false); // Visibilité de la modale
  const [completedFilter, setCompletedFilter] = useState<boolean | null>(null); // Filtre par statut
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | null>(null); // Tri des tâches
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined); // Tâche sélectionnée
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add"); // Type de modale
  const [loading, setLoading] = useState<boolean>(false); // État de chargement

  // Fonction pour récupérer les tâches depuis l'API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const url = new URL("http://localhost:3000/api/tasks");

      // Ajout des paramètres de filtre si définis
      if (completedFilter !== null) {
        url.searchParams.append("completed", completedFilter.toString());
      }

      const result = await axios.get(url.toString());

      let sortedTasks = result.data;

      // Tri des tâches selon le critère sélectionné
      if (sortBy === "createdAt") {
        sortedTasks = result.data.sort((a: Task, b: Task) => {
          // Tri d'abord par statut complété/incomplété
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
          }
          // Puis par date de création
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
      } else if (sortBy === "dueDate") {
        sortedTasks = result.data.sort((a: Task, b: Task) => {
          // Gestion des dates nulles
          if (a.dueDate === null && b.dueDate === null) return 0;
          if (a.dueDate === null) return 1;
          if (b.dueDate === null) return -1;
          // Tri par date d'échéance
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
      }

      setListTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour mettre à jour le statut d'une tâche
  const checkedFunction = async (taskId: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:3000/api/tasks`, {
        id: taskId,
        completed,
      });
      // Mise à jour optimiste de l'état local
      setListTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
  };

  // Effet pour charger les tâches quand les filtres ou le tri changent
  useEffect(() => {
    fetchTasks();
  }, [completedFilter, sortBy]);

  // Gestionnaires d'événements pour les actions sur les tâches
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
        <button onClick={handleAddTask} title="add a new task ?">
          ADD NEW TASK +
        </button>
      </div>
      <div className={styles.tasksContainer}>
        <div className={styles.titlesTask}>
          <span className={styles.titleTask}>
            <input className={styles.titleInput} type="checkbox" />
            <p>Task</p>
          </span>
          <span>
            <p>Created date</p>
          </span>
          <span>
            <p>Due Date</p>
          </span>
          <span className={styles.actionTitle}>
            <p>Action</p>
          </span>
        </div>

        <div className={styles.tasks}>
          {loading && (
            <div className={styles.loading}>
              <FourSquare color="#6971cb" size="medium" text="" textColor="" />
            </div>
          )}

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
              checkedFunction={checkedFunction}
            />
          ))}
        </div>
        <div className={styles.btnFilters}>
          <div className={styles.btnGroup}>
            <button onClick={() => setCompletedFilter(null)} title="all tasks">
              All tasks
            </button>
            <button
              onClick={() => setCompletedFilter(true)}
              title="finished tasks"
            >
              Finished tasks
            </button>
          </div>
          <div className={styles.btnGroup}>
            <button
              onClick={() => setCompletedFilter(false)}
              title=" unfinished tasks"
            >
              Unfinished tasks
            </button>
            <button
              onClick={() => setSortBy("createdAt")}
              title="sort by creation date"
            >
              Sort/creation date
            </button>
          </div>
          <div className={styles.lastBtn}>
            <button
              onClick={() => setSortBy("dueDate")}
              title="sort by due date"
            >
              Sort/due date
            </button>
          </div>
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
