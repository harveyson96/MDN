import React from "react";
// useRef for ref, useState for states, useEffect for side-effects wanted to render process
import { useRef, useState, useEffect } from "react";
// get previous state
// for focus management on checking whether the value has changed
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  // for template , btn save and edit change this state
  const [isEditing, setEditing] = useState(false);
  // for new name updated on UI
  const [newName, setNewName] = useState("");
  // two ref for tracking focus on edit button in viewing
  // other is for tracking edit field in editing template
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  // track the previous value of isEditing
  const wasEditing = usePrevious(isEditing);
  // handle new name change
  function handleChange(e) {
    setNewName(e.target.value);
  }
  // handle sumbit
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  // in order to edit item, there will be two templates. View and Edit
  // Focus between templates, when user toggle a <Todo/>  template from viewing to editing, we should focus on the <input>
  // when toggle back from editing to viewing, move focus back to Edit button
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          //update the value to newName
          value={newName}
          onChange={handleChange}
          //for focus tracking
          ref={editFieldRef}
        />
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          // for focus tracking
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );
  //useEffect executes after components render
  useEffect(() => {
    if (isEditing && !wasEditing) {
      // move focus to editing field
      editFieldRef.current.focus();
    }
    if (!isEditing && wasEditing) {
      editButtonRef.current.focus();
    }
    //useEffect run when isEditing changes
  }, [wasEditing, isEditing]);
  // compare to useEffect, this one log first
  console.log("main render");
  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}
