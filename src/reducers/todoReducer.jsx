import { useReducer } from "react";

//import { TYPES } from "../actions/Types";

// Definimos los tipos de acciones que pueden ocurrir en nuestra lista de tareas
export const ADD_TASK = "ADD_TASK";
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const DELETE_TASK = "DELETE_TASK";

// Reducer para manejar las acciones en la lista de tareas
export const todoReducer = (state, action) => {
  if (action.type === "ADD_TASK") {
    return [
      ...state,
      { id: state.length + 1, text: action.payload.text, completed: action.payload.completed },
    ];
  } else if (action.type === "TOGGLE_TASK_COMPLETION") {
    return state.map((task) =>
      task.id === action.payload.id ? { ...task, completed: !task.completed } : task
    );
  } else if (action.type === "DELETE_TASK") {
    return state.filter((task) => task.id !== action.payload.id);
  } else {
    return state;
  }
};

export const useTodoReducer = () => {
  return useReducer(todoReducer, []);
};
