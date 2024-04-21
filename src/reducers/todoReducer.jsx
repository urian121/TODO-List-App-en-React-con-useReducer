import { useReducer } from "react";
import { TYPES } from "../actions/Types";

// Reducer para manejar las acciones en la lista de tareas
export const todoReducer = (state, action) => {
  if (action.type === TYPES.CREAR_TAREA) {
    return [
      ...state,
      { id: state.length + 1, text: action.payload.text, completed: action.payload.completed },
    ];
  } else if (action.type === TYPES.TOGGLE_TASK) {
    return state.map((task) =>
      task.id === action.payload.id ? { ...task, completed: !task.completed } : task
    );
  } else if (action.type === TYPES.DELETE_TASK) {
    return state.filter((task) => task.id !== action.payload.id);
  } else {
    return state;
  }
};

export const useTodoReducer = () => {
  return useReducer(todoReducer, []);
};
