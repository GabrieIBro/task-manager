import axios from "axios";

let createTaskForm = document.getElementById('create-task-form');
let taskInput = document.getElementById('task-input');
let submitTaskButton = document.getElementById('create-task-submit');
let taskList = document.getElementById('task-list');
let errorField = document.getElementById('error-field');

submitTaskButton.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("Clicked Submit");
    const taskText = taskInput.value;

    if(taskText === '') {
        toggleError(true, "This field can't be empty!");
    }
    else if(taskText.length > 200) {
        toggleError(true, "The task can't be longer than 200 characters!");
    }

    try {
        let res = await axios.post('/', {task:taskText});

        if(res.status === 201) {
            setButtonsFunction();
            taskInput.value = '';
        }

    } catch (error) {
        console.log(error)
    }    
})

taskInput.addEventListener('focus', () => {
    toggleError(false)
})

async function getTasks() {
    let tasks = await axios.get('/tasks');
    tasks = tasks.data

    if(tasks.length > 0) {
        taskList.innerHTML = '';

        tasks.forEach(task => {
            taskList.insertAdjacentHTML('afterbegin',`
            <div class="task" id="${task.id}">
                ${(task.complete) ? '<s': '<p'}
                    class="task-text">${task.value}</s>
                ${(task.complete) ? '</s>': '</p>'}
                <div class="task-buttons-container">
                    <img src="../images/edit.svg" class="task-buttons edit-button" draggable="false">
                    <img src="../images/delete.svg" class="task-buttons delete-button" draggable="false">
                </div>
            </div>
            `)

        })
    }
    else {
        taskList.innerHTML = '';
    }
    return true;
}

async function setButtonsFunction() {
    await getTasks();

    let deleteButtons = document.getElementsByClassName('delete-button');
    let editButtons = document.getElementsByClassName('edit-button');
    let deleteButtonsArr = Array.from(deleteButtons);
    let editButtonsArr = Array.from(editButtons);
    
    deleteButtonsArr.forEach((button) => {

            button.addEventListener('click', async function listen() {
                let taskID = button.parentNode.parentNode.id;
                let res = await axios.delete(`/taskdel=${taskID}`);
    
                if(res.status = 204) {
                    // button.removeEventListener('click', listen);
                    setButtonsFunction();
                }
            })
    })

    editButtonsArr.forEach((button) => {
        button.addEventListener('click', async function listen() {
            let taskID = button.parentNode.parentNode.id;
            let res = await axios.get(`/task=${taskID}`);
            
            if(res.status === 200) {
                console.log(taskID)
                window.location.href = `/task=${taskID}`;
            }
        })
    })
}

function toggleError(error, message='') {
    if(error) {
        errorField.innerText = message;
        errorField.style.display = 'block';
        taskInput.classList.add('error-active');
        submitTaskButton.classList.add('error-active');            
    }
    else {
        errorField.innerText = '';
        errorField.style.display = 'none';
        taskInput.classList.remove('error-active');
        submitTaskButton.classList.remove('error-active');    
    }
}

setButtonsFunction();