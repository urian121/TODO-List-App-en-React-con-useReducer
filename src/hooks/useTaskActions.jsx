import { useToast } from "react-toastify";
import { useTodoReducer } from "../reducers/reducerTodoTask";

const useTaskActions = () => {
  const { dispatch } = useTodoReducer();
  const toast = useToast();

  /*
  const addTask = (newTask, defaultStatus) => {
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
  */

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

  return { toggleTaskCompletion, borrarTarea };
};
export default useTaskActions;
