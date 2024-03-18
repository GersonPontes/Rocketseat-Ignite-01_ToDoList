import { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface Task{
  onNewTaskChange: (task: string) => void;
};

export function Input({ onNewTaskChange }: Task) {

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    onNewTaskChange(event.target.value);
  };

  return (
    <input 
      type="text"
      className={styles.input}
      placeholder="Adicione uma nova tarefa"
      onChange={handleNewTaskChange}
    />
  );
};