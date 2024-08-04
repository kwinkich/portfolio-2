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
	} else if (isVerified !== 'true' && !currentUrl.includes('auth.html')) {
		window.location.href = '/pages/registration/auth.html';
	}
};

export function goToApp() {
	window.location.href = '/pages/app/app.html';
}

export function goToCreateToDo() {
	window.location.href = '/pages/app/createToDo.html';
}

export function goToSuccess() {
	window.location.href = '/pages/registration/success.html';
}

export function logout() {
	localStorage.setItem('isVerified', 'false');
	window.location.href = '/pages/registration/auth.html';
}
