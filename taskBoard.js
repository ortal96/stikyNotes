
let tasksDiv = document.getElementById("tasksDiv");

let arr = [];

let i = 0;

checkTaskLocalStorage();


function addTask(x) {
    if(x!=0){
    let note = document.createElement("div");
    note.setAttribute("id", "n" + i + "note");
    note.style.backgroundImage = "url(img/notebg.png)";
    note.setAttribute("class" , "noteStyle");
    tasksDiv.appendChild(note);
    note.addEventListener("mouseenter" , function(e){
        
        document.querySelector("#a" + e.target.id.replace("n","").replace("note","")).style.display = "block";
    })
    note.addEventListener("mouseleave" , function(e){
        
        document.querySelector("#a" + e.target.id.replace("n","").replace("note","")).style.display = "none";
    })
    closeButton();
    addDetailsTask(note);
    }
}

function checkInputs() {
    let taskInput = document.getElementById("taskInput");
    let dateInput = document.getElementById("dateInput");
    let timeInput = document.getElementById("timeInput");

    if(taskInput.value == "" || dateInput.value == "" || timeInput.value == ""){
        addTask(0);
    }
}

function closeButton() {
    let close = document.createElement("button");
    close.setAttribute("id", "a"+i);
    close.setAttribute("class" , "closeButton")
    close.style.display = "none";
    tasksDiv.appendChild(close);
    let span = document.createElement("span");
    span.setAttribute("class" , "glyphicon glyphicon-remove");
    close.appendChild(span);

    close.onclick = function () { removeItem(close.id) }
}

function removeItem(c) {
    let a = c.replace("a","")
    arr.splice(a, 1);
    let e = document.getElementById("n"+c.replace("a","")+"note");
    e.parentElement.removeChild(e);
    let y = document.querySelector(`#${c}`);
    console.log(arr);
    y.parentElement.removeChild(y);

    localStorage.setItem("task", JSON.stringify(arr));   
}

function addDetailsTask(note) {

    let taskInput = document.getElementById("taskInput");
    let dateInput = document.getElementById("dateInput");
    let timeInput = document.getElementById("timeInput");

    let taskObject = {
        taskDetails: taskInput.value,
        date: dateInput.value,
        time: timeInput.value,
    }

    arr.push(taskObject);
    localStorage.setItem("task", JSON.stringify(arr));
    i++;

    console.log(arr);

    let divDit = document.createElement("div");
    divDit.setAttribute("class" , "divDit");
    note.appendChild(divDit);
    let p = document.createElement("p");
    p.innerHTML = taskObject.taskDetails;
    
    
    let p2 = document.createElement("p");
    p2.innerHTML = taskObject.date + "<br>" + taskObject.time;
    p2.setAttribute("class" , "p2");
    divDit.appendChild(p);
    note.appendChild(p2);
}

function resetForm() {
    document.getElementById("myForm").reset();
}


function checkTaskLocalStorage() {
    if (localStorage.getItem("task") != null) {
        //debugger;
        let task = JSON.parse(localStorage.getItem("task"));
        console.log(task);
        for (let j = 0; j < task.length; j++) {
            let note = document.createElement("div");
            note.setAttribute("id", "n" + i + "note")
            note.style.backgroundImage = "url(img/notebg.png)";
            note.setAttribute("class" , "noteStyle");
            tasksDiv.appendChild(note);
            closeButton();
            arr.push(task[j]);
            console.log(arr);
            i++;


            let divDit = document.createElement("div");
            divDit.setAttribute("class" , "divDit");
            let p = document.createElement("p");
            p.innerHTML = task[j].taskDetails;  
            let p2 = document.createElement("p");
            p2.innerHTML = task[j].date + "<br>" + task[j].time;
            p2.setAttribute("class" , "p2");
            note.appendChild(divDit);
            divDit.appendChild(p);
            note.appendChild(p2);

            note.addEventListener("mouseenter" , function(e){
                
                document.querySelector("#a" + e.target.id.replace("n","").replace("note","")).style.display = "block";
            })
            note.addEventListener("mouseleave" , function(e){
                
                document.querySelector("#a" + e.target.id.replace("n","").replace("note","")).style.display = "none";
            })
            

        }
    }
}