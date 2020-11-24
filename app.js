//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const mode = document.querySelector('#toggle');

//Load all Events
loadEventListeners();


function loadEventListeners(){
    //Get Task from LS
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task Event
    form.addEventListener('submit',addTask);
    //Remove Task
    taskList.addEventListener('click',removeTask);
    //Clear task
    clearBtn.addEventListener('click',clearTasks)
    //Filter tasks
    filter.addEventListener('keyup',filterTasks);
    //toggle dark Mode
    mode.addEventListener('click',changeMode)
}

//Get Tasks from LS
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
         //Create li
         const li = document.createElement('li');
         //Add class
         li.className = 'collection-item';
         //create text Node
         li.appendChild(document.createTextNode(task));
         //Create new link
         const link = document.createElement('a');
         //Create a new Class
         link.className = 'delete-item secondary-content';
         //Add html icon
         link.innerHTML = '<i class="fa fa-remove"></i>';
         //Append link to li
         li.appendChild(link)
         //Append li to taskList
         taskList.appendChild(li);
 
         taskInput.value = '';
    })

}

//Add Task Event
function addTask(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Add a Task!')
    }else{
        //Create li
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create text Node
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link
        const link = document.createElement('a');
        //Create a new Class
        link.className = 'delete-item secondary-content';
        //Add html icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link to li
        li.appendChild(link)
        //Append li to taskList
        taskList.appendChild(li);

        //Store to LS
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
}
//Store to LS
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

//RemoveTask
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
       if( confirm('Are You Sure?')){
           e.target.parentElement.parentElement.remove();
       }
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    e.preventDefault();
}

//Remove Task from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        task = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent == task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Clear Task
function clearTasks(e){
    //while loop
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

//clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter task
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        
        const item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}

//Change Mode
function changeMode(e){
    const li = document.querySelectorAll('li');
    
    if(document.body.classList.contains('dark-mode')){
        toggle.textContent = 'Dark Mode';
        for(let i = 0; i< li.length; i++){
            li[i].style.backgroundColor = 'white'
            li[i].style.color = '#453A38'
        }
    }else{
        toggle.textContent = 'Light Mode';
        for(let i = 0; i< li.length; i++){
            li[i].style.backgroundColor = '#453A38'
            li[i].style.color = 'white'
        }
    }
    
    document.body.classList.toggle('dark-mode')
    document.querySelector('.card').classList.toggle('dark-mode')
}
