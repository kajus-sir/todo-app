function addTask() {
    let input = document.getElementById("todo-input");
    let task = input.value.trim();
    if (task === "") return;
    
    let li = document.createElement("li");
    li.textContent = task;
    li.onclick = function() { this.remove(); };
    document.getElementById("todo-list").appendChild(li);
    
    input.value = "";
}