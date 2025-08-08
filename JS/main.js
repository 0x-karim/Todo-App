let gradientBtn = document.querySelector('.gradient')
let lightBtn = document.querySelector('.light')
let darkBtn = document.querySelector('.dark')

let inputTask = document.getElementById('taskInput')
let addBtn = document.querySelector('.add')

let toDoList;

if (localStorage.getItem('tasks') != null) {
    toDoList = JSON.parse(localStorage.getItem('tasks'));
    displayTask();
} else {
    toDoList = [];
}

function changeMode(bg1, bg2, color, boxColor, btnColor, hovColor, iconColor, borderColor, hovInput) {
    document.body.style.backgroundImage = `linear-gradient(100deg, ${bg1}, ${bg2})`;
    document.querySelectorAll("body, #taskInput").forEach(el => { el.style.color = color });
    document.documentElement.style.setProperty('--bg-color', boxColor);
    document.documentElement.style.setProperty('--color', btnColor);
    document.documentElement.style.setProperty('--hover-background-color', hovColor);
    document.documentElement.style.setProperty('--ico-color', iconColor);
    document.documentElement.style.setProperty('--border-color', borderColor);
    document.documentElement.style.setProperty('--hover-dark', hovInput);
    document.documentElement.style.setProperty('--input-color', color)
}

gradientBtn.addEventListener('click', function () {
    changeMode('#575656', '#062e3f', '#FFDFDB', '#181a1a', '#FFDFDB', '#FFFFFF', '#000000', '#181a1a', '#000000');
    localStorage.setItem("mode", "gradient");
})

lightBtn.addEventListener('click', function () {
    changeMode('#d4f1ff', '#fffFFF', '#1A1502', '#AEB1B4', '#FFFFFF', '#F0F0F0', '#000000', '#000000', '#919699');
    localStorage.setItem("mode", "light");
})

darkBtn.addEventListener('click', function () {
    changeMode('#001214', '#001f29', '#FFFFFF', '#01394C', '#002837', '#001F29', '#FFFFFF', '#01394C', '#013141');
    localStorage.setItem("mode", "dark");
})

window.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem("mode");

    if (savedMode === "gradient") {
        changeMode('#575656', '#062e3f', '#FFDFDB', '#181a1a', '#FFDFDB', '#FFFFFF', '#000000', '#181a1a', '#000000');
    } else if (savedMode === "light") {
        changeMode('#d4f1ff', '#fffFFF', '#1A1502', '#AEB1B4', '#FFFFFF', '#F0F0F0', '#000000', '#000000', '#919699');
    } else if (savedMode === "dark") {
        changeMode('#001214', '#001f29', '#FFFFFF', '#01394C', '#002837', '#001F29', '#FFFFFF', '#01394C', '#013141');
    }

    displayDate()
})

function displayDate() {
    let now = new Date();
    let formatted = now.toLocaleString();
    document.querySelector('.time').innerHTML = formatted;
};

addBtn.addEventListener('click', function () {
    let task = {
        text: inputTask.value,
        state: false
    };
    if (task.text != '') {
        toDoList.push(task);
        localStorage.setItem('tasks', JSON.stringify(toDoList))
        displayTask()
        clear();
    } else {
        window.alert('you must write something !!!');
    }
})

function clear() {
    inputTask.value = null;
}

function displayTask() {
    let taskContainer = ``;

    for (let i = 0; i < toDoList.length; i++) {
        taskContainer += `<li class="task-item ${toDoList[i].state ? 'completed' : ''}" data-index="${i}">
                <p> ${toDoList[i].text} </p>
                <div class="btn-group">
                    <button class="done" data-index="${i}" aria-label="submit task"><i class="fa-solid fa-check"></i></button>
                    <button class="delete" data-index="${i}" aria-label="delete task"><i class="fa-solid fa-trash"></i></button>
                </div>
            </li>`
    }

    document.querySelector('.task-list').innerHTML = taskContainer;
    deleteTask()
    submitTask()
}

function deleteTask() {
    let deleteBtns = document.querySelectorAll('.delete')

    deleteBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let index = Number(btn.dataset.index);

            toDoList.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(toDoList));
            displayTask();
        });
    });
};

function submitTask() {
    let doneBtns = document.querySelectorAll('.done')

    doneBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let taskItem = btn.closest('.task-item');
            let index = Number(taskItem.dataset.index);

            if (toDoList[index].state == true) {

                taskItem.classList.remove('completed');
                toDoList[index].state = !toDoList[index].state;
                localStorage.setItem('tasks', JSON.stringify(toDoList));
                displayTask()
                
            } else {
                taskItem.classList.add('completed');
                toDoList[index].state = !toDoList[index].state;
                localStorage.setItem('tasks', JSON.stringify(toDoList));
                displayTask()
                
            }
        })
    })
}