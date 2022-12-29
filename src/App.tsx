import { useState } from "react";
import { Header } from "./components/Header";
import { Tasks} from "./components/Tasks";

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([
    { id: "string", title: "string", isCompleted: true },
    
  ]);

  //Essa função desestrutura o estado tasks e add os outros itens no array
  function addTask(taskTitle: string) {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(), //Nem todos os navegadores suportam, mas não necessita instalar biblioteca externa
        title: taskTitle,
        isCompleted: false
      } 
    ])
  }

  function deleteTaskById(taskId: string){
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }

  function toggleTask(taskId: string){
    const newTasks = tasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <>
        <Header onAddTask={addTask} />
        <Tasks tasks={tasks} onDelete={deleteTaskById} onComplete={toggleTask}/>
    </>
  );
}

export default App;
