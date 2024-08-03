const containerToDos = document.querySelector('.main-app-flex');

const todoList = localStorage.getItem('todoList');

console.log(todoList);

const arrTodoList = todoList ? JSON.parse(todoList) : [];

console.log(arrTodoList);

if (arrTodoList.length > 0) {
	arrTodoList.forEach((todo) => {
		let todoElement = document.createElement('article');
		todoElement.classList.add('todo-item');
		todoElement.innerHTML = `
					<div class="todo-item-text">
						<h4 class="h4 h4-todo-item-visual">${todo.name}</h4>
						<p class="todo-desc">${todo.description}</p>
					</div>
					<div class="btns-todo-item-flex">
						<div>
							<button class="button active button-main-anim">See</button>
						</div>
						<div>
							<button class="button warning button-main-warning-anim">
								Delete
							</button>
						</div>
					</div>
		`;

		containerToDos.appendChild(todoElement);
	});
}
