import Todo from "./components/Todos";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
// delcare the functions we will use to filter tasks data array
const FILTER_MAP = {
  // all filter shows all tasks
  All: () => true,
  // active filter shows completed is false
  Active: (task) => !task.completed,
  // completed filter shows completed is true
  Completed: (task) => task.completed,
};
// get previous state
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_NAMES = Object.keys(FILTER_MAP); // keys return an array of a given objet's own enmerable string-keyed property names
// define the above outside app() cuz we dont want to render it every time
function App(props) {
  // Also use state to  declare tasks
  const [tasks, setTasks] = useState(props.tasks);
  // declare state for filter
  const [filter, setFilter] = useState("All");
  // ref for headlisting
  // when item is deleted, stwitch focus to heading
  const listHeadingRef = useRef(null);
  // prepare for move focus on deleting item
  const prevTaskLength = usePrevious(tasks.length);
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  // render the filter list with buttons
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //change the completed only the task was toggled, map all the tasks and only change the matching one
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    // update the new state
    setTasks(updatedTasks);
  }
  // delete
  function deleteTask(id) {
    console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  // edit
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      //if this task has the same id as the edited task
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  // the callbcak Prop for Task
  function addTask(name) {
    alert(name);
    //create new task object
    // set unqiue id from nanoid
    const newTask = {
      id: `todo-${nanoid()}`,
      name,
      completed: false,
      toggleTaskCompleted: false,
    };
    // update state, adding the new task to tasks array
    setTasks([...tasks, newTask]);
  }
  // count remaining tasks
  //single or pural
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
