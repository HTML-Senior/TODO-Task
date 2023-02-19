'use strict'
const dom = { //элементы для взаимодействия
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks')
};
//кнопка добавить задачу
dom.add.onclick = () => {
    const newTaskText = dom.new.value;
    if (newTaskText && isNotHaveTask(newTaskText, tasks)) {
        addTask(newTaskText, tasks);
        dom.new.value = '';
        tasksRender(tasks);
    }

}
//добавление задачи

let tasks = [];
tasks.toString();
localStorage.setItem('array1', JSON.stringify(tasks))
tasks = JSON.parse(localStorage.getItem('array1'))

function addTask(text) {
    const timestamp = Date.now();
    const task = {
        id: timestamp,
        text,
        complete: false
    }  
    
    tasks.push(task);    
    
    
}


//проверка на повторение задачи
function isNotHaveTask(text, list) {
    let isNotHave = true;
    list.forEach((task => {
        if (task.text === text) {
            alert('Такая задача уже существует!');
            isNotHave = false;

        }
    }))
    return isNotHave;
}

//отображение списка задач пользователю
function tasksRender(list) {
    let htmlList = '';
    list.forEach(task => {
        const cls = task.isComplete
            ? 'todo-task todo-task_complete'
            : 'todo-task';
        const checked = task.isComplete ? 'checked' : ''
        const taskHtml = `
            <div class="${cls}" id = "${task.id}">
                <label class="todo-checkbox">
                    <input type="checkbox" ${checked} />
                    <div class = "todo-checkbox_div"></div>
                </label>
                <div class="todo-task-name">${task.text}</div>
                <div class="todo-task-delete">&Chi;</div>
            </div>
`
        htmlList = htmlList + taskHtml;
    })
    dom.tasks.innerHTML = htmlList;
}

//отслеживание клика по чекбоксу (через id)
dom.tasks.onclick = (event) => {
    const target = event.target; //делигирование событий
    const isCheckboxEl = target.classList.contains('todo-checkbox_div');
    const isDeleteEl = target.classList.contains('todo-task-delete')
    if (isCheckboxEl) {
        const task = target.parentElement.parentElement; //обращение к 2 родителю
        const taskId = task.getAttribute('id');
        changeTaskStatus(taskId, tasks);
        tasksRender(tasks); //обновление списка для прорисовки выполненных задач
    }

    if (isDeleteEl) {
        const task = target.parentElement;
        const taskId = task.getAttribute('id');
        deleteTask(taskId, tasks);
        tasksRender(tasks);
        
    }
}

//изменение состояния задачи
function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {//жесткое сравнение === здесь сравнит тип данных
            task.isComplete = !task.isComplete;
        } 

    }) 
}

//удаление задачи
function deleteTask(id, list) {
    list.forEach((task, idx) => {
        if (task.id == id) {
            list.splice(idx, 1);
            
        }
        
    })
}