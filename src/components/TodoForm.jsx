const TodoForm = ({ onSubmit, onInputChange, onCheckboxChange, newTask, defaultStatus }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control"
        defaultValue={newTask} // Cambiar value por defaultValue
        onChange={onInputChange}
        placeholder="Nueva Tarea"
      />

      <div className="form-check mt-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="defaultStatusCheckbox"
          defaultChecked={defaultStatus} // Cambiar checked por defaultChecked
          onChange={onCheckboxChange}
        />
        <label className="form-check-label float-start" htmlFor="defaultStatusCheckbox">
          ¿La tarea está completada?
        </label>
      </div>

      <div className="d-grid gap-2 mt-3">
        <button type="submit" className="btn btn-primary custom_button">
          Registrar Tarea
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
