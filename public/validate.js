// validate.js
function validatePassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters long.';
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        errorMessage.textContent = 'Password must contain at least one uppercase letter.';
        return false;
    }

    if (!/[a-z]/.test(password)) {
        errorMessage.textContent = 'Password must contain at least one lowercase letter.';
        return false;
    }

    if (!/[!@#$%^&*]/.test(password)) {
        errorMessage.textContent = 'Password must contain at least one special character.';
        return false;
    }

    errorMessage.textContent = '';
    return true;
}