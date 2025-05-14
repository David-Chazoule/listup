import Link from "next/link";
import styles from "../styles/page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>
          Organize smarter, <span>not harder.</span>
          <br />
          List <span>Up— </span> where productivity meets{" "}
          <span>minimalist design.</span>
        </h1>
        <Link href="/todo">
          <button>ENTRER</button>
        </Link>
      </main>
    </div>
  );
}
