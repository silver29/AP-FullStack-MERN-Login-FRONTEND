import {useForm} from 'react-hook-form';
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react'; 

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskFormPage() {

  const {register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  //console.log(createTask())
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      console.log(params)
      if(params.id) {
        const task = await getTask(params.id);
        console.log(task)
        setValue('title', task.title);
        setValue('description', task.description);
        //console.log(dayjs(task.date).utc().format('DD/MM/YYYY'));
        setValue("date", dayjs(task.date).utc().format('YYYY/MM/DD'));
      }
    }
    loadTask()
  },[]);

  const onSubmit = handleSubmit((data) => {
   /*  console.log({
      ...data,
      date: dayjs.utc(data.date).format()
    }) */
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    //if(data.date) dateValid.date = dayjs.utc(data.date).format();
    console.log(dateValid);
    /*
    if(params.id) {
      updateTask(params.id, {
        ...data,
        //date: dayjs.utc(data.date).format()
      });
    } else {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    }
    */
    if(params.id) {
      updateTask(params.id, dateValid);
    } else {
      createTask(dateValid);
    }

    navigate('/tasks');

  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">title</label>
          <input 
            type="text" 
            placeholder="Title" 
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          <label htmlFor="description">description</label>
          <textarea 
            rows="3" 
            placeholder="Description"
            {...register("description")} //devuelve tres propiedades: 'onChange', 'value' y 'name'
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>

          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            {...register("date")} 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
          />

          <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage