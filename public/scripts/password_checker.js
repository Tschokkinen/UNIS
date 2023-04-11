let timeout;
const password = document.getElementById('password')
const passwordLabel = document.getElementById('passwordLabel');

let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

const checkPasswordStrength = (currentPassword) => {
    if (strongPassword.test(currentPassword)) {
        password.style.backgroundColor = '#90EE90';
        passwordLabel.textContent = "Password - Strength: Strong";
    } else if (mediumPassword.test(currentPassword)){
        password.style.backgroundColor = '#ADD8E6';
        passwordLabel.textContent = "Password - Strength: Medium";
    } else {
        password.style.backgroundColor = '#FFCCCB';
        passwordLabel.textContent = "Password - Strength: Weak";
    }
}

password.addEventListener("input", () => {
    clearTimeout(timeout);
    if (password.value.length === 0) {
        password.style.backgroundColor = 'transparent';
        passwordLabel.textContent = "Password";
    } else if (password.value.length > 0) {
        timeout = setTimeout(() => checkPasswordStrength(password.value), 500);
    }
});