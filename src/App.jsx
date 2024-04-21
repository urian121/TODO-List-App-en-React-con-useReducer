import { useState, useMemo } from "react";
import "./assets/styles/toogle.css";

import Titulo from "./components/Titulo";
import TodoForm from "./components/TodoForm";
import TodoListTask from "./components/TodoListTask";
import ProgressBar from "./components/ProgressBar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mi custom hook para manejar las acciones
import { useTodoActions } from "./hooks/useTodoActions";

function TodoApp() {
  // Extrae las acciones de useTodoActions
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useTodoActions();
  const [newTask, setNewTask] = useState("");
  const [defaultStatus, setDefaultStatus] = useState(false);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setDefaultStatus(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() === "") {
      toast.error("La  tarea no puede estar vacía");
      return; // Debes retornar aquí si la tarea está vacía
    }

    addTask(newTask, defaultStatus);
    setDefaultStatus(false); // Restablece el estado de defaultStatus antes de limpiar newTask
    setNewTask("");
  };

  const completedTasksCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const totalTasksCount = tasks.length;

  return (
    <>
      <ToastContainer />
      <Titulo />

      <div className="row justify-content-center mt-5">
        <div className="col-md-4" style={{ borderRight: "1px solid #ccc" }}>
          <TodoForm
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            newTask={newTask}
            defaultStatus={defaultStatus}
          />
        </div>

        <div className="col-md-5">
          <TodoListTask
            tasks={tasks}
            toggleTaskCompletion={toggleTaskCompletion}
            borrarTarea={deleteTask}
          />
        </div>

        <div className="col-md-3 d-flex justify-content-center align-items-center">
          {totalTasksCount === 0 ? (
            <p className="text-center">No hay tareas 😭 {totalTasksCount - completedTasksCount}</p>
          ) : (
            <ProgressBar
              completedTasksCount={completedTasksCount}
              totalTasksCount={totalTasksCount}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TodoApp;
