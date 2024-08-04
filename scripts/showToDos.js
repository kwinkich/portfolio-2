const containerToDos = document.querySelector('.main-app-flex');
const todoList = localStorage.getItem('todoList');
let arrTodoList = todoList ? JSON.parse(todoList) : [];
console.log(arrTodoList);

let buttonToDoDelete;

if (arrTodoList.length > 0) {
	arrTodoList.forEach((todo) => {
		let todoElement = document.createElement('article');
		todoElement.classList.add('todo-item');
		todoElement.id = `todo-${todo.id}`;
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
							<button data-todoId="${todo.id}" id="btn-toDoDelete" class="button warning button-main-warning-anim">
								Delete
							</button>
						</div>
					</div>
		`;

		containerToDos.appendChild(todoElement);
	});

	buttonToDoDelete = document.querySelectorAll('#btn-toDoDelete');
} else {
	let textToDoIsEmpty = document.createElement('p');
	textToDoIsEmpty.classList.add('text-isempty');
	textToDoIsEmpty.innerText = 'Your ToDo list is empty!';
	containerToDos.appendChild(textToDoIsEmpty);
}

buttonToDoDelete.forEach((btn) => {
	btn.addEventListener('click', (event) => {
		let deletedTodo = arrTodoList.find(
			(todo) => todo.id.toString() === event.target.dataset.todoid
		);
		arrTodoList.splice(deletedTodo.id - 1, 1);
		console.log(arrTodoList);

		const updatedArr = arrTodoList.map((todo) => {
			if (todo.id > event.target.dataset.todoid) {
				return Object({ ...todo, id: todo.id - 1 });
			} else {
				return Object({ ...todo });
			}
		});
		arrTodoList = updatedArr;
		localStorage.setItem('todoList', JSON.stringify(updatedArr));

		const deleteElement = document.querySelector(
			`#todo-${event.target.dataset.todoid}`
		);
		deleteElement.remove();
	});
});
