import { useReducer, useMemo } from "react";
import { TYPES } from "../actions/Types";

// Estado inicial
const initialState = {
  tasks: [],
  newTask: "",
  defaultStatus: false,
};

// Función reducer para manejar las acciones
const todoReducer = (state, action) => {
  if (action.type === TYPES.CREAR_TAREA) {
    const newTask = {
      id: state.tasks.length + 1,
      text: state.newTask,
      completed: state.defaultStatus,
    };
    return {
      ...state,
      tasks: [...state.tasks, newTask],
      newTask: "",
    };
  } else if (action.type === TYPES.SET_NEW_TASK) {
    return {
      ...state,
      newTask: action.payload,
    };
  } else if (action.type === TYPES.TOGGLE_TASK) {
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      ),
    };
  } else if (action.type === TYPES.SET_DEFAULT_STATUS) {
    return {
      ...state,
      defaultStatus: action.payload,
    };
  } else if (action.type === TYPES.DELETE_TASK) {
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
    };
  } else {
    return state;
  }
};

export const useTodoReducer = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const completedTasksCount = useMemo(
    () => state.tasks.reduce((count, task) => (task.completed ? count + 1 : count), 0),
    [state.tasks]
  );
  const totalTasksCount = state.tasks.length;

  return { state, dispatch, completedTasksCount, totalTasksCount };
};
