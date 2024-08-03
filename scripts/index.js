// Универсальная функция для выборки элементов
const select = (selector) => document.querySelector(selector);

const isVerified = localStorage.getItem('isVerified');
const kwinkichProjEmail = localStorage.getItem('isVerified');
const kwinkichProjPass = localStorage.getItem('isVerified');

if (!isVerified) {
	localStorage.setItem('isVerified', 'false');
}

if (!kwinkichProjEmail) {
	localStorage.setItem('kwinkichProjEmail', '');
}

if (!kwinkichProjPass) {
	localStorage.setItem('kwinkichProjPass', '');
}

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
let highPass = 0;
let email;
let pass;

if (isVerified === 'true') {
	signUpContainer.style.display = 'none';
	signInContainer.style.display = 'block';
	signUpBtn.classList.toggle('active');
	signInBtn.classList.toggle('active');
}

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

// Убираем показ ошибок в handleInput
function handleInput(inputElement, validateFunction) {
	inputElement.addEventListener('input', () => {
		if (validateFunction(inputElement.value)) {
			email = inputElement.value;
		} else {
			email = undefined;
		}
	});
}

function handleError(inputElement, labelElement, condition) {
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

handleInput(inputEmail, validateEmail);
handleInput(signinInputEmail, validateEmail);

inputPass.addEventListener('input', () => validatePass(inputPass.value));
signinInputPass.addEventListener('input', () => (pass = signinInputPass.value));

createProfileBtn.addEventListener('click', () => {
	const isEmail = handleError(
		inputEmail,
		labelInputEmail,
		!email || email.length < 5
	);
	const isPass = handleError(
		inputPass,
		labelInputPass,
		!pass || pass.length < 8
	);
	if (isEmail && isPass) {
		registration(inputEmail.value, inputPass.value);
	}
});

signInProfileBtn.addEventListener('click', () => {
	handleError(
		signinInputEmail,
		signinLabelInputEmail,
		!email || email.length < 5
	);
	handleError(signinInputPass, signinLabelInputPass, !pass || pass.length < 8);
});

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
