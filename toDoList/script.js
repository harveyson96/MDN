// https://www.youtube.com/watch?v=i1pxPSl9ZHc

//grab the elements
const form = document.querySelector('form');
const button = document.querySelector('button');
const toDoIn = document.querySelector('input');
const section = document.querySelector('#todos-list');
// local storage for todos
let todos = JSON.parse(localStorage.getItem('todos'))||[];
let editToDoID = -1; // index starts from 0
// first time render
renderToDo();

button.addEventListener('click', saveToDo)

// add 
function saveToDo(e) {
    //prevent defalut
    e.preventDefault();
    //check if inputis empty
    const toDoValue = toDoIn.value;
    const isEmpty = toDoIn.value === '';
    const isDuplicate = todos.some((item) => item.value.toUpperCase() === toDoValue.toUpperCase());
    if (isEmpty) {
        showNotification('no input detected')
    } else if (isDuplicate) {
        showNotification('duplicate detected')
    }
    else {
        if (editToDoID > -1) {
        // update the edit todo
           todos =  todos.map((todo, index) => {
                return {
                    ...todo,
                    value: index === editToDoID? toDoValue:todo.value
                }
           })
            editToDoID = -1;
        }
        else 
    {//save the new to do item
    const newToDo = {
        value: toDoIn.value,
        checked: false,
        color: '#989DAA'
    }
        todos.push(newToDo);
       
        toDoIn.value = "";
        console.log('new to do item saved')
    
        }
    // render
        renderToDo();
     // store the todos to local by coverting to JSON, each time
    // when you need to render
    localStorage.setItem('todos', JSON.stringify(todos))

    }
   
}

function renderToDo() {
    if (todos.length === 0) {
        section.innerHTML = '<center>Nothing to do</center>'
        return
    }
    //clear element
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    // for iteration, stackinbg html is much sufficient than add elements
    todos.forEach((todo, index) => {
        // declare new elements
        section.innerHTML += `
        <div class="todo" id= ${index}>
          <i class="bi ${todo.checked? 'bi-check-circle-fill': 'bi-circle'}"
          data-action= "check"></i>
          <p class="${todo.checked? 'checked':''}" data-action= "check">${todo.value}</p>
          <i class="bi bi-pencil-square" data-action= "edit"></i>
          <i class="bi bi-trash3" data-action= "delete"></i>
      </div>`
    })
}

// click event listen on section
section.addEventListener('click', toDoClicked);

function toDoClicked(e) {
    const target = e.target;
    const parentNode = target.parentNode;
    // determine the clicked element
    if (parentNode.className !== 'todo') return;
    // target action, the data-action inside attribute 
    const toDoID = Number(parentNode.id);
    const action = target.dataset.action;
    console.log(toDoID, action)

    if (action === 'check') checkToDo(toDoID);
    if (action === 'edit') editToDo(toDoID);
    if (action === 'delete') deleteToDo(toDoID);
    }

function checkToDo(toDoID) {
    // find the checked item and revert the check property
    todos =
        todos.map((item, index) =>  (

        {value: item.value,
            color: item.color,
        checked : index === toDoID? !item.checked:item.checked,
         }
            
            
        ));
    console.log(todos);
    renderToDo();
    localStorage.setItem('todos', JSON.stringify(todos))

}

function editToDo(toDoID) {
    toDoIn.value = todos[toDoID].value;
    editToDoID = toDoID;
}

function deleteToDo(toDoID) {
    todos = todos.filter((todo, index) => 
        index != toDoID
    )
    // corner case detected, edit one item without save then delete
    // another item can cause mismatching edit. Try to keep the editID = -1 to make sure no
    // no mismatching here 
    editToDoID = -1;
    // rerender
    renderToDo();
    localStorage.setItem('todos', JSON.stringify(todos))

}

function showNotification(msg) {
    const notification = document.querySelector('.notification')

    notification.innerHTML = msg;

    notification.classList.add('notif-enter');

    setTimeout(() => {
        notification.classList.remove('notif-enter')
    }, 2000)
}