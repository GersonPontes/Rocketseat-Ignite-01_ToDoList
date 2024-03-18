import styles from "./Button.module.css";
import { PlusCircle } from "phosphor-react";

export function Button() {
  return (
    <button 
      className={styles.button}
    >
      Criar
      <PlusCircle size={16} weight="bold"/>
    </button>
  );
};