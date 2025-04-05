import Link from "next/link";
import styles from "../styles/page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>
          Organize smarter, not harder. ListUp—where productivity meets
          minimalist design.
        </h1>
        <Link href="/todo">
          <button>ENTRER</button>
        </Link>
      </main>
    </div>
  );
}
