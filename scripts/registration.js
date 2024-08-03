// Универсальная функция для выборки элементов
const select = (selector) => document.querySelector(selector);

// Устанавливаем состояния, пароль и почту
const isVerified = localStorage.getItem('isVerified');
const kwinkichProjEmail = localStorage.getItem('kwinkichProjEmail');
const kwinkichProjPass = localStorage.getItem('kwinkichProjPass');

// Переменные для надёжности пароля, хранения почты и пароля
let highPass = 0;
let email;
let pass;

// Проверка и создание, в случае отсутствия

if (!isVerified) {
	localStorage.setItem('isVerified', 'false');
}

if (!kwinkichProjEmail) {
	localStorage.setItem('kwinkichProjEmail', '');
}

if (!kwinkichProjPass) {
	localStorage.setItem('kwinkichProjPass', '');
}

// Получаем элементы

// Buttons
const createProfileBtn = select('#create-profile');
const signInProfileBtn = select('#sign-in-acc');
const signUpBtn = select('#sign-up');
const signInBtn = select('#sign-in');

// Inputs
const inputEmail = select('#input-email');
const inputPass = select('#input-pass');
const signinInputEmail = select('#signin-input-email');
const signinInputPass = select('#signin-input-pass');

// Labels
const labelInputEmail = select('#email-error');
const labelInputPass = select('#pass-error');
const signinLabelInputEmail = select('#signin-email-error');
const signinLabelInputPass = select('#signin-pass-error');

// Containers
const signUpContainer = select('.sign-up-container');
const signInContainer = select('.sign-in-container');

// Password strength meter
const isLeastPass = select('#least-pass');
const highPassText = select('#high-pass');
const isStrongPass = select('#is-strong-pass');

// Функции регистрации и входа
function registration(email, pass) {
	localStorage.setItem('isVerified', 'true');
	localStorage.setItem('kwinkichProjEmail', email);
	localStorage.setItem('kwinkichProjPass', pass);
}
function signIn(email, pass) {
	if (
		email === localStorage.getItem('kwinkichProjEmail') &&
		pass === localStorage.getItem('kwinkichProjPass')
	) {
		return true;
	} else {
		return false;
	}
}

// Функция валидации почты и пароля
function validateEmail(text) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(text);
}
function validatePass(password) {
	pass = password;
	highPass = pass.length >= 14 ? 2 : pass.length >= 8 ? 1 : 0;

	const status = {
		0: { text: 'Weak', color: '#26203B', img: 'url("../images/check.svg")' },
		1: {
			text: 'Moderate',
			color: '#00A500',
			img: 'url("../images/check-true.svg")',
		},
		2: {
			text: 'Strong',
			color: '#00A500',
			img: 'url("../images/check-true.svg")',
		},
	};

	isLeastPass.style.listStyleImage = status[highPass >= 1 ? 1 : 0].img;
	isLeastPass.style.color = status[highPass >= 1 ? 1 : 0].color;
	highPassText.textContent = status[highPass].text;
	isStrongPass.style.listStyleImage = status[highPass].img;
	isStrongPass.style.color = status[highPass].color;
}

// Обработчик инпутов
function handleInput(inputElement, validateFunction) {
	inputElement.addEventListener('input', () => {
		if (validateFunction(inputElement.value)) {
			email = inputElement.value;
		} else {
			email = undefined;
		}
	});
}

// Обработчики ошибок
function handleErrorCondition(inputElement, labelElement, condition) {
	if (condition) {
		inputElement.classList.add('error');
		labelElement.style.display = 'block';
		setTimeout(() => {
			inputElement.classList.remove('error');
			labelElement.style.display = 'none';
		}, 2000);
		return false;
	} else {
		return true;
	}
}
function handleError(inputElement, labelElement) {
	inputElement.classList.add('error');
	labelElement.style.display = 'block';
	setTimeout(() => {
		inputElement.classList.remove('error');
		labelElement.style.display = 'none';
	}, 2000);
}

handleInput(inputEmail, validateEmail);
handleInput(signinInputEmail, validateEmail);

inputPass.addEventListener('input', () => validatePass(inputPass.value));
signinInputPass.addEventListener('input', () => (pass = signinInputPass.value));

// Обработчик кнопок
createProfileBtn.addEventListener('click', () => {
	const isEmail = handleErrorCondition(
		inputEmail,
		labelInputEmail,
		!email || email.length < 5
	);
	const isPass = handleErrorCondition(
		inputPass,
		labelInputPass,
		!pass || pass.length < 8
	);
	if (isEmail && isPass) {
		registration(inputEmail.value, inputPass.value);
		window.location.href = '/pages/success.html';
	}
});
signInProfileBtn.addEventListener('click', () => {
	handleErrorCondition(
		signinInputEmail,
		signinLabelInputEmail,
		!email || email.length < 5
	);
	handleErrorCondition(
		signinInputPass,
		signinLabelInputPass,
		!pass || pass.length < 8
	);

	if (email === kwinkichProjEmail && pass === kwinkichProjPass) {
		window.location.href = '/pages/app.html';
	}
	if (email !== kwinkichProjEmail) {
		handleError(signinInputEmail, signinLabelInputEmail);
	}
	if (pass !== kwinkichProjPass) {
		handleError(signinInputPass, signinLabelInputPass);
	}
});

// Переключение форм
function toggleSignMode(activeBtn, inactiveBtn, showContainer, hideContainer) {
	if (!activeBtn.classList.contains('active')) {
		activeBtn.classList.add('active');
		inactiveBtn.classList.remove('active');
		showContainer.style.display = 'block';
		hideContainer.style.display = 'none';
		highPass = 0;
		email = undefined;
		pass = undefined;
	}
}
signUpBtn.addEventListener('click', () =>
	toggleSignMode(signUpBtn, signInBtn, signUpContainer, signInContainer)
);
signInBtn.addEventListener('click', () =>
	toggleSignMode(signInBtn, signUpBtn, signInContainer, signUpContainer)
);
