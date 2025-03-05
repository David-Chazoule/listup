import Image from "next/image";
import React from "react";
import edit from "../../styles/img/edit.png";
import cancel from "../../styles/img/cancel.png";
import styles from "../../styles/task.module.scss";

function Tasks() {
  return (
    <div className={styles.task_container}>
      <p className={styles.task_action}>Ranger sa chambre</p>
      <span className={styles.img_container}>
        <Image  src={edit} alt="edit-logo" />
        <Image  src={cancel} alt="cancel-logo" />
      </span>
    </div>
  );
}

export default Tasks;
