function validateInput(name, email) {
  if (name === '') {
    return 'Tên không được để trống.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email không hợp lệ.';
  }

  return null;
}

function showError(errorMessage) {
  const errorElement = document.getElementById('error');

  errorElement.textContent = errorMessage;

  errorElement.style.display = 'block';
}

document.getElementById('saveButton').addEventListener('click', function() {
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;

  const errorMessage = validateInput(name, email);

  if (errorMessage) {
    showError(errorMessage);
  }
});