import React, { useState } from "react";
import styles from "../../styles/modal.module.scss";
import axios from "axios";
import { Task } from "./TodoForm";

// Définition des props du composant Modal
type ModalProps = {
  type: "add" | "edit" | "delete"; // Type de modal (ajout, édition ou suppression)
  task: Task | undefined; // Tâche à éditer/supprimer (undefined pour l'ajout)
  refreshTasks: () => void; // Fonction pour rafraîchir la liste des tâches
  closeModal: () => void; // Fonction pour fermer la modal
};

function Modal({ type, task, closeModal, refreshTasks }: ModalProps) {
  // États pour gérer les champs du formulaire
  const [text, setText] = useState(task?.text || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  // Gestion de la soumission du formulaire
  const handleSubmit = async () => {
    try {
      // Envoi de la requête en fonction du type de modal
      if (type === "add") {
        await axios.post("/api/tasks", { text, dueDate }); // Création
      } else if (type === "edit" && task) {
        await axios.put("/api/tasks", {
          // Mise à jour
          id: task.id,
          text,
          dueDate,
          completed: task.completed, // On conserve le statut existant
        });
      } else if (type === "delete" && task) {
        await axios.delete("/api/tasks", { data: { id: task.id } }); // Suppression
      }

      refreshTasks(); // Rafraîchit la liste des tâches
      closeModal(); // Ferme la modal
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
