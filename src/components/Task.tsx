import styles from "./Task.module.css";
import { Trash } from "phosphor-react";

interface TaskListType {
  id: string;
  completed: boolean;
  content: string;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export function Task({ id, completed, content, onDeleteTask, onCompleteTask }: TaskListType) {

  function handleCompletedtask() {
    onCompleteTask(id);
  };

  function handleDeleteTask() {
    onDeleteTask(id);
  };

  return (
    <div className={styles.task}>
      <div className={styles.taskCheckbox}>
        <input id={id} type="checkbox" checked={completed} onChange={handleCompletedtask}/>
        <label htmlFor={id}></label>
      </div>
      {
        completed === false 
        ? 
        <div className={styles.taskText}>
          <p>{content}</p>
        </div> 
        : 
        <div className={styles.taskCompletedText}>
          <p>{content}</p>
        </div> 
      }   
      <Trash size={24} onClick={handleDeleteTask} />
    </div>
  );
};