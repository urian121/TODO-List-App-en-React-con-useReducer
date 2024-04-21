import { useState } from "react";
import { toast } from "react-toastify";
import { useTodoReducer } from "../reducers/todoReducer"; // Importa solo el hook de useTodoReducer
import { TYPES } from "../actions/Types"; // Importa las constantes de Types.js

export const useTodoActions = () => {
  const [tasks, dispatch] = useTodoReducer();
  const [toastId, setToastId] = useState(null);

  const addTask = (text, completed) => {
    dispatch({ type: TYPES.CREAR_TAREA, payload: { text, completed } });
    if (!toast.isActive(toastId)) {
      setToastId(toast.success("Tarea agregada correctamente", { toastId }));
    }
  };

  const toggleTaskCompletion = (id) => {
    dispatch({ type: TYPES.TOGGLE_TASK, payload: { id } });
    if (!toast.isActive(toastId)) {
      setToastId(toast.success("Tarea completada correctamente", { toastId }));
    }
  };

  const deleteTask = (id) => {
    dispatch({ type: TYPES.DELETE_TASK, payload: { id } });
    if (!toast.isActive(toastId)) {
      setToastId(toast.error("Tarea eliminada correctamente", { toastId }));
    }
  };

  return { tasks, addTask, toggleTaskCompletion, deleteTask };
};
