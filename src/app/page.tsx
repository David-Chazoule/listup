import Link from "next/link";
import styles from "../styles/page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/todo">
          <button>entrer</button>
        </Link>
      </main>
    </div>
  );
}
