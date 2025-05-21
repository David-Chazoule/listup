import React from "react";

import styles from "../../styles/task.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Définition des props du composant Task
type TaskProps = {
  id: string; // Identifiant unique de la tâche
  text: string; // Texte de la tâche
  createdAt: string; // Date de création
  dueDate: string; // Date d'échéance
  completed: boolean; // Statut d'accomplissement
  openModal: (
    // Fonction pour ouvrir la modal
    type: "edit" | "delete", // Type d'action
    task: Omit<TaskProps, "openModal" | "checkedFunction"> // Données de la tâche (sans les fonctions)
  ) => void;
  checkedFunction: (id: string, completed: boolean) => void; // Gestion du statut
};

// Fonction utilitaire pour formater les dates
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "-"; // Gestion des valeurs nulles

  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR"); // Formatage français
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
  // Gestion du changement de statut (complété/incomplété)
  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCompleted = e.target.checked;
    await checkedFunction(id, newCompleted); // Appel de la fonction parente
  };

  return (
    <div key={id} className={styles.task_container}>
      <div className={styles.task_card}>
        <div
          className={`${styles.card} ${completed ? styles.taskCompleted : ""}`}
        >
          <label className={styles.taskCheck}>
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCheckboxChange}
            />
            <p className={completed ? styles.completedText : ""}>{text}</p>
          </label>
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
            <FaEdit
              className={completed ? styles.editCustom : styles.iconEdit}
              onClick={() =>
                openModal("edit", { id, text, createdAt, dueDate, completed })
              }
              title="edit task"
            />

            <FaTrashAlt
              className={styles.iconDelete}
              onClick={() =>
                openModal("delete", { id, text, createdAt, dueDate, completed })
              }
              title="delete task"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
