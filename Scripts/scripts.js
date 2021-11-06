const form = document.getElementById('form');
const input = document.getElementById('input');
const todoUl = document.getElementById('todos');

const tasksFromLS = localStorage.getItem('todos');

if(tasksFromLS){
	displayAllTasks();
}

form.addEventListener('submit', (e)=>{
	e.preventDefault();

	const message = input.value;
	addTodo(message, false);
})

function addTodo(todoText, completed){
	//const todoText = input.value;

	if(todoText){
		const todoEl = document.createElement('li');

		todoEl.innerText = todoText;
		if(completed){
			todoEl.classList.add('completed');
		}

		todoUl.appendChild(todoEl);
		input.value = "";

		todoEl.addEventListener('click', ()=>{
			todoEl.classList.toggle('completed');
			updateLS();
		})

		todoEl.addEventListener('contextmenu', (e)=>{
			e.preventDefault();

			todoEl.remove();
			updateLS();
		})

		updateLS();

	} else 
		{return;}
}

function updateLS(){
	const taskElements = document.querySelectorAll('li');

	const allTasks = [];

	taskElements.forEach((taskElement)=>{
		allTasks.push({
			text: taskElement.innerText,
			completed: taskElement.classList.contains('completed')
		});
	})
	

	localStorage.setItem('todos', JSON.stringify(allTasks));
}

function displayAllTasks(){
	const allTasks = JSON.parse(localStorage.getItem('todos'));

	allTasks.forEach((oneTask)=>{
		if(oneTask.completed){
			addTodo(oneTask.text, true)
		} else{
			addTodo(oneTask.text, false);
		}
	})
}
