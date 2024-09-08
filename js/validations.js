function showError(input, message) {
  if (!input.classList.contains("is-invalid")) {
    input.classList.add("is-invalid");
    const errorText = document.createElement("small");
    errorText.innerText = message;
    errorText.classList.add("text-danger");
    input.parentElement.appendChild(errorText);
    return false;
  }
}

function removeError(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  const errorText = input.nextElementSibling;

  if (errorText) {
    errorText.remove();
  }
}

function getFieldName(input) {
  const label = input.previousElementSibling;
  return label ? label.innerText.trim() : "Field";
}

function checkJobTypeRequired(input) {
  if (input.value == "Select the Job Type" || input.value.trim() === "") {
    removeError(input);
    showError(input, `${getFieldName(input)} is required`);
    return false;
  } else {
    removeError(input);
    return true;
  }
}

function checkStatusRequired(input) {
  if (input.value == "Select the Status" || input.value.trim() === "") {
    removeError(input);
    showError(input, `${getFieldName(input)} is required`);
    return false;
  } else {
    removeError(input);
    return true;
  }
}

function checkTitleValidity(input) {
  if (input.value.trim() === "") {
    removeError(input);
    showError(input, `${getFieldName(input)} is required`);
  } else if (
    input.value.trim().length >= 5 &&
    input.value.trim().length <= 35
  ) {
    removeError(input);
    return true;
  } else {
    removeError(input);
    showError(
      input,
      `${getFieldName(
        input
      )} should be min 5 and max 35 character length and not a number only characters`
    );
    return false;
  }
}

function checkSalaryValidity(input) {
  if (input.value.trim() === "") {
    removeError(input);
    showError(input, `${getFieldName(input)} is required`);
  } else if (
    /^[0-9]+$/.test(input.value) &&
    input.value >= 10000 &&
    input.value <= 300000
  ) {
    removeError(input);
    return true;
  } else {
    removeError(input);
    showError(
      input,
      `${getFieldName(
        input
      )} should be min 10000 and max 300000 and not a character`
    );
    return false;
  }
}

function checkVacanciesValidity(input) {
  if (input.value.trim() === "") {
    removeError(input);
    showError(input, `${getFieldName(input)} is required`);
  } else if (
    /^[0-9]+$/.test(input.value) &&
    input.value >= 1 &&
    input.value <= 20
  ) {
    removeError(input);
    return true;
  } else {
    removeError(input);
    showError(
      input,
      `${getFieldName(input)} should be min 1 and max 20 and not a character`
    );
    return false;
  }
}

function checkOverviewValidity(input) {
  if (input.value.trim() === "") {
    removeError(input);
    showError(input, `${getFieldName(input)} is required`);
  } else if (input.value.length >= 10 && input.value.length <= 100) {
    removeError(input);
    return true;
  } else {
    removeError(input);
    showError(
      input,
      `${getFieldName(input)} should be min 10 and max 100 character length`
    );
    return false;
  }
}


function checkvalidate(input) {
  if (input.value.trim() === "") {
    removeError(input);
    showError(input, `Field is required`);
    return false;
  } else if (!(input.value.length >= 5 && input.value.length <= 30)) {
    removeError(input);
    showError(
      input,
      `Responsibility should be min 5 and max 30 character length`
    );
    return false;
  } else {
    removeError(input);
    return true;
  }
}


/*-----------------------Applicant.js validation---------------------------*/

/*--------------------Check Name Validity--------------*/


function checkNameValidity(input) {
  if (input.value.trim() === "") {
    removeError(input);
    showError(input, `${getFieldName(input)} is required`);
    return false;
  } else if (input.value.length >= 2 && input.value.length <= 30) {
    removeError(input);
    return true;
  } else {
    removeError(input);
    showError(
      input,
      `${getFieldName(
        input
      )} should be min 2 and max 30 character length and not a number`
    );
    return false;
  }
}

/*------------------CheckEmail---------------*/

function checkEmail(input) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (input.value.trim() === '') {
        removeError(input);
        showError(input, `${getFieldName(input)} is required`);
        return false;
    }
  else if (regex.test(input.value.trim())) {
    removeError(input);
    return true;
  } else {
    removeError(input)
    showError(input, `${getFieldName(input)} is inValid`);
    return false;
  }
}


/*--------------------------CheckExperience Validation------------------------- */

function checkExperience(input) {
  if (input.value.trim() === "") {
    removeError(input);
    showError(input, `${getFieldName(input)} is required`);
    return false;
    }
  else {
      removeError(input);
    return true;
  }
}
   

export {
  showError,
  removeError,
  getFieldName,
  checkJobTypeRequired,
  checkStatusRequired,
  checkTitleValidity,
  checkSalaryValidity,
  checkVacanciesValidity,
  checkOverviewValidity,
  checkvalidate,
  checkNameValidity,
  checkEmail,
  checkExperience,
};
