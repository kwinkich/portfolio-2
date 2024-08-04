let buttonToDoDone;
let buttonToDontDone;
let buttonToDoDelete;

const containerActiveToDos = document.querySelector('#container-activeToDo');
const containerDoneToDos = document.querySelector('#container-doneToDo');

const todoList = localStorage.getItem('todoList');
export let arrTodoList = todoList ? JSON.parse(todoList) : [];

function createTodoElement(todo) {
	const todoElement = document.createElement('article');
	todoElement.classList.add('todo-item');
	todoElement.id = `todo-${todo.id}`;
	todoElement.innerHTML = `
			<div class="todo-item-text">
					<h4 class="h4 h4-todo-item-visual">${todo.name}</h4>
					<p class="todo-desc">${todo.description}</p>
			</div>
			<div class="btns-todo-item-flex">
					<div>
							<button id="${todo.isDone ? 'btn-toDontDone' : 'btn-toDoDone'}" data-todoId="${
		todo.id
	}" class="button active button-main-anim">${
		todo.isDone ? 'Not done' : 'Done'
	}</button>
					</div>
					<div>
							<button id="btn-toDoDelete" data-todoId="${
								todo.id
							}" class="button warning button-main-warning-anim">Delete</button>
					</div>
			</div>
	`;
	return todoElement;
}

function createEmptyText() {
	let textToDoIsEmpty = document.createElement('p');
	textToDoIsEmpty.classList.add('text-isempty');
	textToDoIsEmpty.innerText = 'Your ToDo list is empty!';
	return textToDoIsEmpty;
}

if (arrTodoList.length > 0) {
	let activeToDos = arrTodoList.filter((todo) => {
		if (todo.isDone !== true) {
			containerActiveToDos.appendChild(createTodoElement(todo));
			return todo;
		}
	});

	if (activeToDos.length <= 0) {
		containerActiveToDos.appendChild(createEmptyText());
	} else {
		buttonToDoDone = document.querySelectorAll('#btn-toDoDone');
		buttonToDoDelete = document.querySelectorAll('#btn-toDoDelete');
	}
} else {
	containerActiveToDos.appendChild(createEmptyText());
}

if (arrTodoList.length > 0) {
	let doneTodos = arrTodoList.filter((todo) => {
		if (todo.isDone !== false) {
			containerDoneToDos.appendChild(createTodoElement(todo));
			return todo;
		}
	});

	if (doneTodos.length <= 0) {
		containerDoneToDos.appendChild(createEmptyText());
	} else {
		buttonToDontDone = document.querySelectorAll('#btn-toDontDone');
		buttonToDoDelete = document.querySelectorAll('#btn-toDoDelete');
	}
} else {
	containerDoneToDos.appendChild(createEmptyText());
}

if (buttonToDoDelete != undefined) {
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
			window.location.reload();
		});
	});
}

if (buttonToDoDone != undefined) {
	buttonToDoDone.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			let doneTodo = arrTodoList.find(
				(todo) => todo.id.toString() === event.target.dataset.todoid
			);
			doneTodo.isDone = true;
			console.log(arrTodoList);

			localStorage.setItem('todoList', JSON.stringify(arrTodoList));
			window.location.reload();
		});
	});
}

if (buttonToDontDone != undefined) {
	buttonToDontDone.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			let doneTodo = arrTodoList.find(
				(todo) => todo.id.toString() === event.target.dataset.todoid
			);
			doneTodo.isDone = false;
			console.log(arrTodoList);

			localStorage.setItem('todoList', JSON.stringify(arrTodoList));
			window.location.reload();
		});
	});
}
