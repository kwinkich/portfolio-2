import * as redirect from '../redirects/redirect.js';

const logOutBtn = document.querySelectorAll('#btn-logOut');
const letsStart = document.querySelectorAll('#btn-letsStart');
const goToCreateToDoBtn = document.querySelectorAll('#btn-createToDo');
const goHome = document.querySelectorAll('#btn-goApp');

const buttonNavHandler = (elements, func) => {
	elements.forEach((element) => {
		element.addEventListener('click', () => {
			func();
		});
	});
};

buttonNavHandler(logOutBtn, redirect.logout);
buttonNavHandler(letsStart, redirect.goToApp);
buttonNavHandler(goToCreateToDoBtn, redirect.goToCreateToDo);
buttonNavHandler(goHome, redirect.goToApp);
