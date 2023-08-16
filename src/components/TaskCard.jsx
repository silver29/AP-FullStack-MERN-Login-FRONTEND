import { useTasks } from "../context/TasksContext";
import { Link } from 'react-router-dom'; 

// Arreglando el problema de la fecha que no se actualiza.
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function TaskCard({ task }) {
  // console.log(task);
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex gap-x-2 items-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" 
                onClick={() =>{
                //console.log(task._id)
                deleteTask(task._id);
              }}>delete</button>
            <Link to={`/tasks/${task._id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >edit</Link>
          </div>
        </header>
        <p className="text-slate-300">{task.description}</p>
        <p>{days(task.date).utc().format('DD/MM/YYYY')}</p>
    </div>
  );
   //<p>{ new Date(task.date).toLocaleDateString()}</p>
}

export default TaskCard;