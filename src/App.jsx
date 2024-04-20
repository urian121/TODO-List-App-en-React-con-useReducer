import Titulo from "./components/Titulo";
import TodoForm from "./components/TodoForm";
import TodoListTask from "./components/TodoListTask";
import ProgressBar from "./components/ProgressBar";

import "./assets/styles/toogle.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importando mi custom hooks
//import useTaskActions from "./hooks/useTaskActions";

import { useTodoReducer } from "./reducers/reducerTodoTask";

function App() {
  //const { borrarTarea } = useTaskActions();

  const { state, dispatch, completedTasksCount, totalTasksCount } = useTodoReducer(); // Usa useTodoReducer en lugar de useTodoContext
  const { tasks, newTask, defaultStatus } = state;

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    dispatch({ type: "SET_NEW_TASK", payload: inputValue });
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    dispatch({ type: "SET_DEFAULT_STATUS", payload: isChecked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newTask.trim() === "") {
      if (!toast.isActive("Toastify__toast")) {
        toast.error("La tarea no puede estar vacía", {
          toastId: "Toastify__toast",
        });
      }
      return;
    }
    dispatch({ type: "ADD_TASK", payload: { newTask, defaultStatus } });

    if (!toast.isActive("Toastify__toast")) {
      toast.success("Tarea agregada correctamente", {
        toastId: "Toastify__toast",
      });
    }
  };

  // Función para cambiar el estado de completación de una tarea

  const toggleTaskCompletion = (taskId) => {
    if (!toast.isActive("Toastify__toast")) {
      toast.success("Tarea completada correctamente", {
        toastId: "Toastify__toast",
      });
    }

    dispatch({ type: "TOGGLE_TASK_COMPLETION", payload: taskId });
  };

  // Función para borrar una tarea
  const borrarTarea = (taskId) => {
    if (!toast.isActive("Toastify__toast")) {
      toast.error("Tarea eliminada correctamente", {
        toastId: "Toastify__toast",
      });
    }

    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
    <>
      <ToastContainer />
      <Titulo />
      <div className="row justify-content-center mt-5">
        <div className="col-md-4" style={{ borderRight: "1px solid #ccc" }}>
          <TodoForm
            onSubmit={handleSubmit}
            newTask={newTask}
            defaultStatus={defaultStatus}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="col-md-5">
          <TodoListTask
            tasks={tasks}
            toggleTaskCompletion={toggleTaskCompletion}
            borrarTarea={borrarTarea}
          />
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <ProgressBar
            completedTasksCount={completedTasksCount}
            totalTasksCount={totalTasksCount}
          />
        </div>
      </div>
    </>
  );
}

export default App;
