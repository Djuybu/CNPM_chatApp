import { validateInput, showError } from './personal-info.js';

function main() {
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');

  nameInput.addEventListener('input', function(event) {
    nameInput.value = event.target.value;

    const errorMessage = validateInput(nameInput.value, emailInput.value);

    if (errorMessage) {
      showError(errorMessage);
    }
  });

  emailInput.addEventListener('input', function(event) {
    emailInput.value = event.target.value;

    const errorMessage = validateInput(nameInput.value, emailInput.value);

    if (errorMessage) {
      showError(errorMessage);
    }
  });
}

document.addEventListener('DOMContentLoaded', main);