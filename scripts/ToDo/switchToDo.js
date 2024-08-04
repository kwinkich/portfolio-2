const containerActiveToDo = document.querySelector('#container-activeToDo');
const containerDoneToDo = document.querySelector('#container-doneToDo');
const btnActiveToDo = document.querySelector('#btn-activeToDo');
const btnDoneToDo = document.querySelector('#btn-doneToDo');

// Функция переключения между разделами
function toggleSignMode(activeBtn, inactiveBtn, showContainer, hideContainer) {
	if (!activeBtn.classList.contains('active')) {
		activeBtn.classList.add('active');
		inactiveBtn.classList.remove('active');
		showContainer.style.display = 'flex';
		hideContainer.style.display = 'none';

		// Сохраняем последний выбранный раздел в localStorage
		localStorage.setItem('lastSelectedSection', activeBtn.id);
	}
}

// Обработчики кнопок переключения
btnActiveToDo.addEventListener('click', () => {
	toggleSignMode(
		btnActiveToDo,
		btnDoneToDo,
		containerActiveToDo,
		containerDoneToDo
	);
});

btnDoneToDo.addEventListener('click', () => {
	toggleSignMode(
		btnDoneToDo,
		btnActiveToDo,
		containerDoneToDo,
		containerActiveToDo
	);
});

window.addEventListener('DOMContentLoaded', () => {
	const lastSelectedSection = localStorage.getItem('lastSelectedSection');

	if (!lastSelectedSection) {
		localStorage.setItem('lastSelectedSection', 'btn-activeToDo');
	}

	if (lastSelectedSection === 'btn-doneToDo') {
		toggleSignMode(
			btnDoneToDo,
			btnActiveToDo,
			containerDoneToDo,
			containerActiveToDo
		);
	} else {
		toggleSignMode(
			btnActiveToDo,
			btnDoneToDo,
			containerActiveToDo,
			containerDoneToDo
		);
	}
});
