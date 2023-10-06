// get form in html
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const list = document.querySelector('.empty-list__title')

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)


let count = 1
let tasks = [];


if(localStorage.getItem('tasks')){
	tasks = JSON.parse(localStorage.getItem('tasks'))
	tasks.forEach(task => renderTask(task));
}

checEmptyList()

function addTask(event) {
	event.preventDefault()
	const taskText = taskInput.value
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false
	}


	tasks.push(newTask)
	saveToLocalstorage()

renderTask(newTask)

	taskInput.value = '';
	taskInput.focus()
	checEmptyList()
}

function deleteTask(event) {

	if (event.target.dataset.action !== 'delete') {
		return
	}

	if (event.target.dataset.action === 'delete') {
		const parentNode = event.target.closest('li')

		const id = +parentNode.id

		const index = tasks.findIndex(item => tasks.id === parentNode.id)
		
		
		parentNode.remove()
		tasks.splice(index, 1)
		saveToLocalstorage()

	}
	checEmptyList()
}

function doneTask(event) {
	if (event.target.dataset.action !== 'done') return

	const parentNodeDone = event.target.closest("li")
	const id = +parentNodeDone.id

	const task = tasks.find(task => task.id === id)
	
	
	task.done = !task.done
	const taskTitle = parentNodeDone.querySelector('.task-title')
	taskTitle.classList.toggle("task-title--done")
	saveToLocalstorage()
}

function checEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `
		<li id="emptyList" class="list-group-item empty-list">
				<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
				<div class="empty-list__title">Список дел пуст</div>
		</li>`
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
	}

	if (tasks.length > 0) {
		const emptyListEl = document.querySelector("#emptyList");
		emptyListEl ? emptyListEl.remove() : null;
	}
}

function saveToLocalstorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	cssClass = task.done === true ? 'task-title task-title--done' : 'task-title';

	const taskHTML = `
		<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
			<span class="${cssClass}">${count++}) ${task.text}</span>
				<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
				</div>
		</li>
	`;
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
