const inputEmail = document.querySelector('#input-email');
const inputPass = document.querySelector('#input-pass');
const labelInputEmail = document.querySelector('#email-error');
const labelInputPass = document.querySelector('#pass-error');

const signinInputEmail = document.querySelector('#signin-input-email');
const signinInputPass = document.querySelector('#signin-input-pass');
const signinLabelInputEmail = document.querySelector('#signin-email-error');
const signinLabelInputPass = document.querySelector('#signin-pass-error');

const createProfileBtn = document.querySelector('#create-profile');
const signInProfileBtn = document.querySelector('#sign-in-acc');
const signUpBtn = document.querySelector('#sign-up');
const signInBtn = document.querySelector('#sign-in');
const signUpContainer = document.querySelector('.sign-up-container');
const signInContainer = document.querySelector('.sign-in-container');
let highPassText = document.querySelector('#high-pass');
let isStrongPass = document.querySelector('#is-strong-pass');

const isLeastPass = document.querySelector('#least-pass');

let highPass = 0;
let email;
let pass;

function validateEmail(text) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(text);
}

inputEmail.addEventListener('input', () => {
	if (validateEmail(inputEmail.value)) {
		console.log(inputEmail.value);
		email = inputEmail.value;
	} else {
		email = undefined;
	}
});

inputPass.addEventListener('input', (e) => {
	console.log(inputPass.value);
	pass = inputPass.value;
	if (pass.length >= 8) {
		highPass = 1;
		isLeastPass.style.listStyleImage = "url('../images/check-true.svg')";
		isLeastPass.style.color = '#00A500';
	} else {
		isLeastPass.style.listStyleImage = "url('../images/check.svg')";
		isLeastPass.style.color = '#26203B';
		highPass = 0;
	}

	if (pass.length >= 14) {
		highPass = 2;
	}

	switch (highPass) {
		case 0: {
			highPassText.textContent = 'Weak';
			isStrongPass.style.listStyleImage = "url('../images/check.svg')";
			isStrongPass.style.color = '#26203B';
			break;
		}
		case 1: {
			highPassText.textContent = 'Moderate';
			isStrongPass.style.listStyleImage = "url('../images/check-true.svg')";
			isStrongPass.style.color = '#00A500';
			break;
		}
		case 2: {
			highPassText.textContent = 'Strong';
			break;
		}
		default: {
			highPassText.textContent = 'Weak';
			isStrongPass.style.listStyleImage = "url('../images/check.svg')";
			isStrongPass.style.color = '#26203B';
			break;
		}
	}
});

signinInputEmail.addEventListener('input', () => {
	if (validateEmail(signinInputEmail.value)) {
		console.log(signinInputEmail.value);
		email = signinInputEmail.value;
	} else {
		email = undefined;
	}
});

signinInputPass.addEventListener('input', (e) => {
	console.log(signinInputPass.value);
	pass = signinInputPass.value;
});

createProfileBtn.addEventListener('click', () => {
	if (!email || email.length < 5) {
		inputEmail.classList.add('error');
		labelInputEmail.style.display = 'block';
		setTimeout(() => {
			inputEmail.classList.remove('error');
			labelInputEmail.style.display = 'none';
		}, 2000);
	}
	if (!pass || pass.length < 8) {
		inputPass.classList.add('error');
		labelInputPass.style.display = 'block';
		setTimeout(() => {
			inputPass.classList.remove('error');
			labelInputPass.style.display = 'none';
		}, 2000);
	}
});

signInProfileBtn.addEventListener('click', () => {
	if (!email || email.length < 5) {
		signinInputEmail.classList.add('error');
		signinLabelInputEmail.style.display = 'block';
		setTimeout(() => {
			signinInputEmail.classList.remove('error');
			signinLabelInputEmail.style.display = 'none';
		}, 2000);
	}
	if (!pass || pass.length < 8) {
		signinInputPass.classList.add('error');
		signinLabelInputPass.style.display = 'block';
		setTimeout(() => {
			signinInputPass.classList.remove('error');
			signinLabelInputPass.style.display = 'none';
		}, 2000);
	}
});

signUpBtn.addEventListener('click', () => {
	if (!signUpBtn.classList.contains('active')) {
		signUpBtn.classList.toggle('active');
		signInBtn.classList.toggle('active');
		signUpContainer.style.display = 'block';
		signInContainer.style.display = 'none';
		highPass = 0;
		email = undefined;
		pass = undefined;
	}
});

signInBtn.addEventListener('click', () => {
	if (!signInBtn.classList.contains('active')) {
		signInBtn.classList.toggle('active');
		signUpBtn.classList.toggle('active');
		signInContainer.style.display = 'block';
		signUpContainer.style.display = 'none';
		highPass = 0;
		email = undefined;
		pass = undefined;
	}
});
