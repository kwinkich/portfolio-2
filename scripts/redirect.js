window.onload = () => {
	const isVerified = localStorage.getItem('isVerified');
	const currentUrl = window.location.pathname;

	if (
		isVerified === 'true' &&
		!currentUrl.includes('app.html') &&
		!currentUrl.includes('success.html') &&
		!currentUrl.includes('createToDo.html') &&
		!currentUrl.includes('createtodo')
	) {
		window.location.href = '/pages/app/app.html';
	} else if (isVerified !== 'true' && !currentUrl.includes('/index.html')) {
		window.location.href = '../index.html';
	}

	if (isVerified !== 'true' && !currentUrl.includes('auth.html')) {
		window.location.href = '/pages/registration/auth.html';
	}
};

function goToApp() {
	window.location.href = '/pages/app/app.html';
}

function goToCreateToDo() {
	window.location.href = '/pages/app/createToDo.html';
}
function goToHome() {
	window.location.href = '/pages/app/app.html';
}
