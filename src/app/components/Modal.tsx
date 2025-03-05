import React from "react";
import styles from "../../styles/modal.module.scss";

function Modal() {
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <h2>add task</h2>
        <input></input>

        <div className={styles.btn_container}>
          <button>Confirmer</button>
          <button>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
