// import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <h1>HomePage</h1>
        <Link
          href="/register"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Перейти на сторінку реєстрації
        </Link>
      </div>
    </main>
  );
}
