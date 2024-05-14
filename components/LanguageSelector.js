import Link from "next/link";
import styles from "./LanguageSelector.module.css";

const LanguageSelector = () => (
  <div className={styles["language-selector"]}>
    <Link href="/en">
      <button className="LanguageSelectorButton">English</button>
    </Link>
    <Link href="/tr">
      <button className="LanguageSelectorButton">Türkçe</button>
    </Link>
  </div>
);

export default LanguageSelector;
