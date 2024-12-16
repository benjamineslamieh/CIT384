// Select DOM elements
const tabs = document.querySelectorAll(".tab-btn");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const aboutBtn = document.getElementById("about-btn");
const aboutSection = document.getElementById("about-section");
const backToAppBtn = document.getElementById("back-to-app-btn");
const appWrapper = document.querySelector(".app-wrapper");
const notebookTab = document.getElementById("notebook-tab");
const groupListTab = document.getElementById("group-list-tab");

const notebookSection = document.getElementById("notebook-section");
const groupListSection = document.getElementById("group-list-section");
const notebookInput = document.getElementById("notebook-input");
const saveNoteBtn = document.getElementById("save-note-btn");
const noteList = document.getElementById("note-list");
const backToAppBtnNotebook = document.getElementById("back-to-app-btn-notebook");
const backToAppBtnGroupList = document.getElementById("back-to-app-btn-group-list");
const inviteLink = document.getElementById("invite-link");
const copyLinkBtn = document.getElementById("copy-link-btn");

let currentTab = "school"; // Default tab is "school"
const tasks = { school: [], work: [], personal: [], other: [] }; // Task array for each category
let notes = []; // Array for notebook notes

// Switch Tabs
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentTab = tab.id.split("-")[0]; // Extract tab name from button ID
    document.querySelector(".active-tab")?.classList.remove("active-tab");
    tab.classList.add("active-tab");
    renderTasks(); // Re-render tasks when switching tabs

    // Hide sections
    notebookSection.classList.add("hidden-section");
    groupListSection.classList.add("hidden-section");
    aboutSection.classList.add("hidden-section");

    appWrapper.classList.remove("hidden-section"); // Show the Task Manager section
  });
});

// Add Task (Click)
addTaskBtn.addEventListener("click", () => {
  addTask();
});

// Add Task (Enter key)
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    tasks[currentTab].push({ task, completed: false }); // Add task to the selected tab
    taskInput.value = ""; // Clear the input field
    renderTasks(); // Re-render tasks after adding a new one
  }
}

// Render Tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear the task list before re-rendering
  tasks[currentTab].forEach((taskObj, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span class="task-text">${taskObj.task}</span>
      <button class="task-complete-btn" data-index="${index}">✅</button>
      <button class="task-delete-btn" data-index="${index}">❌</button>
    `;
    taskList.appendChild(taskItem);

    // Add Event Listener to Complete Button
    taskItem.querySelector(".task-complete-btn").addEventListener("click", () => {
      taskObj.completed = !taskObj.completed; // Toggle completion status
      renderTasks(); // Re-render tasks after completion
    });

    // Add Event Listener to Delete Button
    taskItem.querySelector(".task-delete-btn").addEventListener("click", () => {
      tasks[currentTab].splice(index, 1); // Remove task from the list
      renderTasks(); // Re-render tasks after deletion
    });

    // If task is completed, cross it out with an animation
    if (taskObj.completed) {
      taskItem.querySelector(".task-text").classList.add("task-completed");
    }
  });
}

// About Section
aboutBtn.addEventListener("click", () => {
  aboutSection.classList.remove("hidden-section");
  appWrapper.classList.add("hidden-section");
});

// Back to Task Manager from About Section
backToAppBtn.addEventListener("click", () => {
  aboutSection.classList.add("hidden-section");
  appWrapper.classList.remove("hidden-section");
});

// Notebook Section
notebookTab.addEventListener("click", () => {
  notebookSection.classList.remove("hidden-section");
  appWrapper.classList.add("hidden-section");
});

// Back to Task Manager from Notebook Section
backToAppBtnNotebook.addEventListener("click", () => {
  notebookSection.classList.add("hidden-section");
  appWrapper.classList.remove("hidden-section");
});

// Group List Section
groupListTab.addEventListener("click", () => {
  groupListSection.classList.remove("hidden-section");
  appWrapper.classList.add("hidden-section");
});

// Back to Task Manager from Group List Section
backToAppBtnGroupList.addEventListener("click", () => {
  groupListSection.classList.add("hidden-section");
  appWrapper.classList.remove("hidden-section");
});

// Save Note
saveNoteBtn.addEventListener("click", () => {
  const note = notebookInput.value.trim();
  if (note) {
    notes.push(note); // Add note to notebook
    notebookInput.value = ""; // Clear input field
    renderNotes(); // Re-render notes
  }
});

// Render Notes
function renderNotes() {
  noteList.innerHTML = ""; // Clear note list before re-rendering
  notes.forEach((note, index) => {
    const noteItem = document.createElement("li");
    noteItem.className = "note-item";
    noteItem.innerHTML = `
      <span>${note}</span>
      <button class="note-delete-btn" data-index="${index}">❌</button>
    `;
    noteList.appendChild(noteItem);

    // Add Event Listener to Delete Button for notes
    noteItem.querySelector(".note-delete-btn").addEventListener("click", () => {
      notes.splice(index, 1); // Remove note
      renderNotes(); // Re-render notes
    });
  });
}

// Copy Invite Link
copyLinkBtn.addEventListener("click", () => {
  inviteLink.select();
  document.execCommand("copy");
});
