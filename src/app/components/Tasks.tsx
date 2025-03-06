import Image from "next/image";
import React from "react";
import edit from "../../styles/img/edit.png";
import cancel from "../../styles/img/cancel.png";
import styles from "../../styles/task.module.scss";

function Tasks() {
  return (
    <div className={styles.task_container}>
      <div className={styles.task_card}>
        <div className={styles.card}>
          <p className={styles.task_action}>Ranger sa chambre</p>
          <p>10/10</p>
          <p>12/10</p>
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
