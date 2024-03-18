import "./global.css";
import styles from "./App.module.css";
import { FormEvent, useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Task } from "./components/Task";
import { ClipboardText } from "phosphor-react";

interface TaskListType {
  id: string;
  completed: boolean;
  content: string;
}

export function App() {
  const [ taskList, setTaskList ] = useState<TaskListType[]>([])

  const [ numberOfCompletedTask, setNumberOfCompletedTask ] = useState(0)
  const [ newTask, setNewTask ] = useState("");

  function handleNewTask(event: FormEvent) {
    event.preventDefault();

    const taskToAddOnList = {
      id: newTask,
      completed: false,
      content: newTask
    }

    setTaskList([...taskList, taskToAddOnList])
  };

  function handleNewTaskChange (task: string) {
    setNewTask(task);
  };

  function handleCompletedtask(taskCompletedId: string) {
    const taskListWithTasksCompletedUpdated = taskList.map(task => {
      if(task.id !== taskCompletedId) {
        return task;
      } else {
        if(task.completed === false){
          return {
            id: task.id,
            completed: true,
            content: task.content
          }
        } else {
          return {
            id: task.id,
            completed: false,
            content: task.content
          }         
        }
      };
    });

    setTaskList(taskListWithTasksCompletedUpdated);
  };

  function handleDeleteTask(taskToDeleteId: string) {
    const taskListWithoutDeletedOne  = taskList.filter(task => {
      return task.id !== taskToDeleteId;
    });

    setTaskList(taskListWithoutDeletedOne);
  };

  useEffect(() => {
    let counter = 0;

    taskList.map(task => {
      if(task.completed === true) {
        counter = counter + 1;
      }
    })

    setNumberOfCompletedTask(counter)

  }, [taskList]);
 
  return (
    <div className={styles.content}>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleNewTask} className={styles.inputTaskForm}>
          <Input onNewTaskChange={handleNewTaskChange} />
          <Button/>
        </form>

        <div className={styles.tasks}>
          <div className={styles.tasksHeader}>
            <div className={styles.createdTasksTxt}>
              <strong>Tarefas criadas</strong>
              <span>{taskList.length}</span>
            </div> 
            <div className={styles.completedTasksTxt}>
              <strong>Concluídas</strong>
                {
                  numberOfCompletedTask === 0 
                  ?
                  <span>0</span> 
                  :
                  <span>{numberOfCompletedTask} de {taskList.length}</span>
                }                
            </div>
          </div>

          <div className={styles.tasksMain}>

            {
              taskList.length === 0 
              ?
              <div className={styles.hasNoTasks}>
                <ClipboardText size={56}/>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>          
              :
              taskList.map(task => {
                return (
                  <Task 
                    key={task.id}
                    id={task.id}
                    completed={task.completed}
                    content={task.content}
                    onDeleteTask={handleDeleteTask}
                    onCompleteTask={handleCompletedtask}
                  />
                )
              })
            }
          </div>

        </div>      
        
      </main>
    </div>
  );
};