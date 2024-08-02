const signUpBtn = document.querySelector('#sign-up');
const signInBtn = document.querySelector('#sign-in');
const signUpContainer = document.querySelector('.sign-up-container');
const signInContainer = document.querySelector('.sign-in-container');

signUpBtn.addEventListener('click', () => {
	if (!signUpBtn.classList.contains('active')) {
		signUpBtn.classList.toggle('active');
		signInBtn.classList.toggle('active');
		signUpContainer.style.display = 'block';
		signInContainer.style.display = 'none';
	}
});

signInBtn.addEventListener('click', () => {
	if (!signInBtn.classList.contains('active')) {
		signInBtn.classList.toggle('active');
		signUpBtn.classList.toggle('active');
		signInContainer.style.display = 'block';
		signUpContainer.style.display = 'none';
	}
});
