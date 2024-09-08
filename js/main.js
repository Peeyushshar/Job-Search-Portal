import {
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
} from "./validations.js";

import { getFromLocalStorage, setInLocalStorage } from "./utility.js";

const addUser = document.getElementById("addUser");
const cancel = document.getElementById("cancel");
const submitForm = document.getElementById("submit");
const form = document.getElementById("form");
const dataList = document.querySelector(".data-list");
const dataList1 = document.querySelector(".data-list1");
const update = document.getElementById("update");
const deleteOpenJob = document.getElementById("deleteJob");
const addResponsibilities = document.getElementById("responsibilities");
const title = document.getElementById("title");
const jobType = document.getElementById("job-type");
const overview = document.getElementById("overview");
const salary = document.getElementById("salary");
const noOfVacancies = document.getElementById("vacancies");
const jobStatus = document.getElementById("status");
const responsibilitiesDataValues = [];

const responsibilityStaticValue = document.getElementById(
  "responsibilityStatic"
);

const div = document.querySelector(".task");

addUser.addEventListener("click", (e) => {
  submitForm.style.display = "block";
  resetAllField();
  update.style.display = "none";
  form.style.display = "block";
});

const removeField = (event) => {
  event.target.parentElement.parentElement.remove();
};

addResponsibilities.addEventListener("click", addDynamicFields);

function addDynamicFields() {
  if (!validateResponsibilities()) {
    return;
  }
  if (!checkvalidate(responsibilityStaticValue)) {
    return;
  }
  removeError(addResponsibilities);

  const row = document.createElement("div");
  row.classList.add("row", "mb-3");
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg1.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg1.setAttribute("width", "12");
  svg1.setAttribute("height", "12");
  svg1.setAttribute("fill", "currentColor");
  svg1.setAttribute(
    "class",
    "bi bi-asterisk text-danger position-absolute top-0"
  );
  svg1.setAttribute("viewBox", "0 0 16 16");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1"
  );

  svg1.appendChild(path1);

  const col = document.createElement("div");
  col.classList.add("col-md-8");

  const responsibilityValue = document.createElement("input");
  responsibilityValue.setAttribute("type", "text");
  responsibilityValue.classList.add("form-control", "responsibility");
  responsibilityValue.setAttribute("id", "ingName");
  responsibilityValue.placeholder = "Enter responsibilities";

  responsibilityValue.addEventListener("blur", function () {
    validateResponsibilities(this);
  });

  col.appendChild(responsibilityValue);

  const col1 = document.createElement("div");
  col1.classList.add(
    "col-md-2",
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.classList.add("btn", "btn-close", "delBtn", "bg-primary");
  button.setAttribute("aria-label", "Close");

  button.addEventListener("click", removeField);

  col1.appendChild(button);

  row.appendChild(col);
  row.appendChild(col1);

  div.appendChild(row);
}

/*----------------validate Dynamic Fields-------------*/

function validateResponsibilities() {
  const responsibilityInputs = document.querySelectorAll(".responsibility");
  for (let input of responsibilityInputs) {
    if (input.value.trim() === "") {
      removeError(input);
      showError(input, "Responsibility cannot be empty.");
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
    }
  }
  return true;
}

const reponsibilityValue = document.querySelectorAll(".responsibility");

reponsibilityValue.forEach(function (input) {
  input.addEventListener("blur", function () {
    validateResponsibilities(input);
  });
});

/*--------------------------Reset all Fields after successfull submit--------------------*/

function resetAllField() {
  removeError(title);
  title.classList.remove("is-valid", "is-invalid");
  title.value = "";

  removeError(jobType);
  jobType.classList.remove("is-valid", "is-invalid");
  jobType.value = "Select the Job Type";

  removeError(overview);
  overview.classList.remove("is-valid", "is-invalid");
  overview.value = "";

  removeError(salary);
  salary.classList.remove("is-valid", "is-invalid");
  salary.value = "";

  removeError(noOfVacancies);
  noOfVacancies.classList.remove("is-valid", "is-invalid");
  noOfVacancies.value = "";

  removeError(jobStatus);
  jobStatus.classList.remove("is-valid", "is-invalid");
  jobStatus.value = "Select the Status";
  // jobStatus.value = "";

  removeError(responsibilityStaticValue);
  responsibilityStaticValue.classList.remove("is-valid", "is-invalid");
  responsibilityStaticValue.value = "";

  const responsibilityValue = document.querySelectorAll(".responsibility");
  responsibilityValue.forEach((input) => {
    removeError(input);
    input.classList.remove("is-valid", "is-invalid");
    input.value = "";
  });

  const dltBtn = document.querySelectorAll(".delBtn");
  dltBtn.forEach((del) => {
    del.click();
  });
}

/*-------------------------------Validate all the Fields---------------------------*/

title.addEventListener("blur", () => {
  checkTitleValidity(title);
});

jobType.addEventListener("blur", () => {
  checkJobTypeRequired(jobType);
});

salary.addEventListener("blur", () => {
  checkSalaryValidity(salary);
});

noOfVacancies.addEventListener("blur", () => {
  checkVacanciesValidity(noOfVacancies);
});
overview.addEventListener("blur", () => {
  checkOverviewValidity(overview);
});

jobStatus.addEventListener("blur", () => {
  checkStatusRequired(jobStatus);
});

responsibilityStaticValue.addEventListener("blur", () => {
  checkvalidate(responsibilityStaticValue);
});

/*-----------------------OnSubmit--------------------*/

const formData = getFromLocalStorage("jobPortal") ?? [];

submitForm.addEventListener("click", function (e) {
  e.preventDefault();

  let isValid = false;

  isValid = checkTitleValidity(title);
  isValid = checkJobTypeRequired(jobType) && isValid;
  isValid = checkOverviewValidity(overview) && isValid;
  isValid = checkSalaryValidity(salary) && isValid;
  isValid = checkVacanciesValidity(noOfVacancies) && isValid;
  isValid = checkvalidate(responsibilityStaticValue) && isValid;
  isValid = checkStatusRequired(jobStatus) && isValid;

  const reponsibilityValue = document.querySelectorAll(".responsibility");
  reponsibilityValue.forEach((input) => {
    isValid = validateResponsibilities(input) && isValid;
  });

  if (isValid) {
    

    responsibilitiesDataValues.push(responsibilityStaticValue.value);

    for (let i = 0; i < reponsibilityValue.length; i++) {
      responsibilitiesDataValues.push(reponsibilityValue[i].value);
    }
    const checkTitle = formData.find((data) => data.title === title.value);
    const uniqueId = Math.random().toString(36).substr(2, 9);

    if (checkTitle == undefined) {
      const newUser = {
        id: uniqueId,
        title: title.value,
        jobType: jobType.value,
        overview: overview.value,
        responsibilities: responsibilitiesDataValues,
        salary: salary.value,
        noOfVacancies: noOfVacancies.value,
        status: jobStatus.value,
      };

      formData.push(newUser);
      setInLocalStorage("jobPortal", formData);
      getAllUserData();
      
      responsibilitiesDataValues.splice(0);
      resetAllField();
      form.style.display = "none";
    } else {
        showError(title, `${getFieldName(title)} is already present`);
    }
  }
});

/*---------------GetAll Jobs Data--------------*/

function getAllUserData() {
  dataList.innerHTML = "";
  formData.forEach((data, index) => {
    const dataStr = JSON.stringify(data);
    const finalData = dataStr.replace(/"/g, "'");

    dataList.innerHTML += `
     <tr>
            <td class="border py-1">${data.title}</td>
            <td class="border py-1">${data.jobType}</td>
            <td class="border py-1">${data.overview}</td>
            <td class="border py-1">${data.salary}</td>
            <td class="border py-1">${data.noOfVacancies}</td>
            <td class="border py-1">${data.status}</td>
            <td >
                <button data="${finalData}" index="${index}" class="edit-btn btn p-1 px-2"><i class="fa fa-edit"></i></button>
                <button  index="${index}" class="del-btn btn p-1 px-2"><i class="fa fa-trash"></i></button>
                 <button data="${finalData}" index="${index}" class="show-btn btn p-1 px-2"><i class="fa fa-eye"></i></button>
            </td>
        </tr> `;
  });
  action();
}


function deleteJob() {
  deleteOpenJob.style.display = "block";
}

const remove = document.getElementById("delete");
const deleteButton = document.getElementById("deleteJobUpdate");
const message = document.getElementById("message");
const modalClose = document.getElementById("popUpdelete");

remove.onclick = () => {
  message.innerText = "Are you sure to delete Job?";
  deleteOpenJob.style.display = "none";
};

modalClose.onclick = () => {
  message.innerText = "Are you sure to delete Job?";
  deleteOpenJob.style.display = "none";
};

/*----------------action button functionality-------------------*/

const action = () => {
  const delBtn = dataList.querySelectorAll(".del-btn");
  delBtn.forEach((del) => {
    del.onclick =  () => {
      deleteJob();
      deleteButton.onclick = () => {
        const index = del.getAttribute("index");
        if (formData[index].status == "Open") {
          formData.splice(index, 1);
          setInLocalStorage("jobPortal", formData);

          getAllUserData();
          deleteOpenJob.style.display = "none";
        } else {
          message.innerText = "Job Status is not Open";
        }
      };
    };
    message.innerText = "Are you sure to delete Job?";
  });

  const editBtn = dataList.querySelectorAll(".edit-btn");
  editBtn.forEach((edit) => {
    edit.onclick = async () => {
      const index = edit.getAttribute("index");
      const dataStr = edit.getAttribute("data");
      const finalData = dataStr.replace(/'/g, '"');
      const data = JSON.parse(finalData);

      if (formData[index].status == "Closed") {
        alert("Job status is closed");
      } else {
        addUser.click();

        submitForm.style.display = "none";
        update.style.display = "block";

        const uniqueId = data.id;

        title.value = data.title;
        jobType.value = data.jobType;
        overview.value = data.overview;
        salary.value = data.salary;
        noOfVacancies.value = data.noOfVacancies;
        jobStatus.value = data.status;

        responsibilityStaticValue.value = data.responsibilities[0];

        data.responsibilities.forEach((element, index) => {
          if (index !== 0) {
            if (data.responsibilities.length > 1) {
              addDynamicFields();
              responsibilityStaticValue.classList.remove(
                "is-valid",
                "is-invalid"
              );
              const reponsibilityValues =
                document.querySelectorAll(".responsibility");
              reponsibilityValues[index - 1].value = element;
            }
          }
        });
        const reponsibilityValues =
          document.querySelectorAll(".responsibility");
        reponsibilityValues.forEach((responsibility) => {
          responsibility.classList.remove("is-valid", "is-invalid");
        });
      }

      update.onclick = (e) => {
        let isValid = false;

        isValid = checkTitleValidity(title);
        isValid = checkJobTypeRequired(jobType) && isValid;
        isValid = checkOverviewValidity(overview) && isValid;
        isValid = checkSalaryValidity(salary) && isValid;
        isValid = checkVacanciesValidity(noOfVacancies) && isValid;
        isValid = checkvalidate(responsibilityStaticValue) && isValid;
        isValid = checkStatusRequired(jobStatus) && isValid;

        
        const reponsibilityValue = document.querySelectorAll(".responsibility");
        reponsibilityValue.forEach((input) => {
          isValid = validateResponsibilities(input) && isValid;
        });

        if (isValid) {
          const checkTitle = formData.find(
            (data) => data.title === title.value
          );
          responsibilitiesDataValues.push(responsibilityStaticValue.value);
          for (let i = 0; i < reponsibilityValue.length; i++) {
            responsibilitiesDataValues.push(reponsibilityValue[i].value);
          }
          
          const uniqueId = formData[index].id;
          if (checkTitle == undefined || title.value == formData[index].title) {
            formData[index] = {
              id: uniqueId,
              title: title.value,
              jobType: jobType.value,
              overview: overview.value,
              responsibilities: responsibilitiesDataValues,
              salary: salary.value,
              noOfVacancies: noOfVacancies.value,
              status: jobStatus.value,
            };

            setInLocalStorage("jobPortal", formData);
            
           
            getAllUserData();
             responsibilitiesDataValues.splice(0);
            const dynamicBtn = document.querySelectorAll(".delBtn");
            dynamicBtn.forEach((del) => {
              del.click();
            });
            resetAllField();
            form.style.display = "none";
          } else {
            showError(title, `${getFieldName(title)} is already present`);
          }
        }
      };
    };
  });
};

getAllUserData();

/*----------------Show Applicant Data-------------------*/

const applicantData = JSON.parse(localStorage.getItem("aplicantData")) ?? [];

const showBtn = document.querySelectorAll(".show-btn");
const showApplicant = document.getElementById("applicantForm");

showBtn.forEach((btn, index) => {
  btn.onclick = () => {
    dataList1.innerHTML = "";
    const jobId = formData[index].id;
    const user = applicantData.filter((x) => x.id == jobId);

    user.forEach((data) => {
      dataList1.innerHTML += `
     <tr>
            <td>${data.username}</td>
            <td>${data.email}</td>
            <td>${data.jobTitle}</td>
            <td>${data.experience}</td>
        </tr> `;
    });

    showApplicant.style.display = "block";
  };
});

const cancelApplicantForm = document.getElementById("cancel1");
cancelApplicantForm.addEventListener("click", (e) => {
  e.preventDefault();
  showApplicant.style.display = "none";
});

/*-----------Cancel button ----------*/

cancel.addEventListener("click", (e) => {
  resetAllField();
  form.style.display = "none";
});
