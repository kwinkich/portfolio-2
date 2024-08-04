const inputToDoName = document.querySelector('#todo-name-input');
const inputToDoDescription = document.querySelector('#todo-name-desc');

const textToDoNameError = document.querySelector('#todo-name-error');
const textToDoDescriptionError = document.querySelector('#todo-desc-error');

const buttonToDoCreate = document.querySelector('#btn-toDoCreate');

const todoList = localStorage.getItem('todoList');
const arrTodoList = todoList ? JSON.parse(todoList) : [];

let todoName = inputToDoName.value;
let todoDescription = inputToDoDescription.value;

if (!todoList) {
	localStorage.setItem('todoList', JSON.stringify([]));
}

function validateToDoData(data, elementInput, elementError) {
	if (data.length < 4) {
		elementInput.classList.add('error');
		elementError.style.display = 'block';

		setTimeout(() => {
			elementInput.classList.remove('error');
			elementError.style.display = 'none';
		}, 2000);

		return false;
	} else {
		return true;
	}
}

inputToDoName.addEventListener('input', () => {
	todoName = inputToDoName.value;
});

inputToDoDescription.addEventListener('input', () => {
	todoDescription = inputToDoDescription.value;
});

buttonToDoCreate.addEventListener('click', () => {
	const isValidName = validateToDoData(
		todoName,
		inputToDoName,
		textToDoNameError
	);
	const isValidDesc = validateToDoData(
		todoDescription,
		inputToDoDescription,
		textToDoDescriptionError
	);
	if (isValidName && isValidDesc) {
		const todo = {
			id: arrTodoList.length + 1,
			name: todoName,
			description: todoDescription,
			isDone: false,
		};
		arrTodoList.push(todo);
		localStorage.setItem('todoList', JSON.stringify(arrTodoList));
		inputToDoName.value = '';
		inputToDoDescription.value = '';
		todoName = '';
		todoDescription = '';
	}
});
