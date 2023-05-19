import React, { useState } from "react";

function Form(props) {
  // Use state and hooks to update name
  const [name, setName] = useState("");
  // handle change for user input in textfield
  function handleChange(e) {
    //acquire the input in textfield and use hook to update the state
    setName(e.target.value);
  }
  function handleSumbit(e) {
    e.preventDefault();
    // call the callback prop from App
    props.addTask(name);
    // clear the field after we sumbit
    setName("");
  }
  return (
    <form onSubmit={handleSumbit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        //here call the name state we init ealier
        value={name}
        //
        onChange={handleChange}
      />
      <button className="btn btn__primay btn__lg">Add</button>
    </form>
  );
}

export default Form;
