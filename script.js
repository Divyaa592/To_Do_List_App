// Get references
const inputBox = document.getElementById("textInput");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("addBtn");
const clearAllButton = document.getElementById("clearAllBtn");
const taskCount = document.getElementById("taskCount");

// Function to update the task count
function updateTaskCount() {
    const totalTasks = listContainer.querySelectorAll("li").length;
    const completedTasks = listContainer.querySelectorAll("li.checked").length;
    taskCount.textContent = `Total: ${totalTasks}, Completed: ${completedTasks}`;
}

// Function to add a task
function addTask() {
    const taskText = inputBox.value.trim(); // Remove extra spaces
    if (taskText === '') {
        alert("You must write something!");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Add a delete button (span) to the task
    const span = document.createElement("span");
    span.innerHTML = "&times;"; // Unicode for '×' symbol
    li.appendChild(span);

    // Append the task to the list
    listContainer.appendChild(li);

    // Clear the input box
    inputBox.value = "";

    // Update task count and save data
    updateTaskCount();
    saveData();
}

// Function to clear all tasks
function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        listContainer.innerHTML = "";
        updateTaskCount();
        saveData();
    }
}

// Event delegation for task actions
listContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        // Toggle checked state
        event.target.classList.toggle("checked");
    } else if (event.target.tagName === "SPAN") {
        // Delete the task
        event.target.parentElement.remove();
    }
    updateTaskCount();
    saveData();
}, false);

// Enable editing tasks
listContainer.addEventListener("dblclick", function (event) {
    if (event.target.tagName === "LI") {
        const currentText = event.target.textContent.replace("\u00d7", "").trim();
        const newText = prompt("Edit your task:", currentText);
        if (newText !== null && newText.trim() !== "") {
            event.target.firstChild.textContent = newText.trim();
            saveData();
        }
    }
});

// Function to save tasks to localStorage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Function to display saved tasks on page load
function showTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
    updateTaskCount();
}

// Add event listeners
addButton.addEventListener("click", addTask);
clearAllButton.addEventListener("click", clearAllTasks);

// Load tasks when the page loads
showTasks();
