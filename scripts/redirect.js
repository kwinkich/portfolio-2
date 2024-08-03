window.onload = () => {
	const isVerified = localStorage.getItem('isVerified'); // Предполагается, что значение хранится в localStorage
	const currentUrl = window.location.pathname; // Получаем текущий путь

	if (
		isVerified === 'true' &&
		!currentUrl.includes('/pages/app.html') &&
		!currentUrl.includes('/pages/success.html') &&
		!currentUrl.includes('/pages/createToDo.html')
	) {
		window.location.href = '/pages/app.html';
	} else if (isVerified !== 'true' && !currentUrl.includes('/index.html')) {
		window.location.href = '../index.html';
	}
};

function goToApp() {
	window.location.href = '/pages/app.html';
}

function goToCreateToDo() {
	window.location.href = 'createToDo.html';
}
function goToHome() {
	window.location.href = 'app.html';
}
