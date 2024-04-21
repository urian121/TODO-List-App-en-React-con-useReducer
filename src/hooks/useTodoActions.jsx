import { useState } from "react";
import { toast } from "react-toastify";

import {
  useTodoReducer,
  ADD_TASK,
  TOGGLE_TASK_COMPLETION,
  DELETE_TASK,
} from "../reducers/todoReducer";

export const useTodoActions = () => {
  const [tasks, dispatch] = useTodoReducer();
  const [toastId, setToastId] = useState(null);

  const addTask = (text, completed) => {
    dispatch({ type: ADD_TASK, payload: { text, completed } });
    if (!toast.isActive(toastId)) {
      setToastId(toast.success("Tarea agregada correctamente", { toastId }));
    }
  };

  const toggleTaskCompletion = (id) => {
    dispatch({ type: TOGGLE_TASK_COMPLETION, payload: { id } });
    if (!toast.isActive(toastId)) {
      setToastId(toast.success("Tarea completada correctamente", { toastId }));
    }
  };

  const deleteTask = (id) => {
    dispatch({ type: DELETE_TASK, payload: { id } });
    if (!toast.isActive(toastId)) {
      setToastId(toast.error("Tarea eliminada correctamente", { toastId }));
    }
  };

  return { tasks, addTask, toggleTaskCompletion, deleteTask };
};
