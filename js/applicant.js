import {
  removeError,
  checkNameValidity,
  checkEmail,
  checkExperience,
} from "./validations.js";

import { setInLocalStorage, getFromLocalStorage } from "./utility.js";

let isValid = false;

const addApplicantUser = document.getElementById("addUser");
const cancel = document.getElementById("cancel1");
const submitApplicantForm = document.getElementById("submit");
const formApplicant = document.getElementById("form");
const dataList = document.querySelector(".data-list");
const username = document.getElementById("fname");
const email = document.getElementById("email");
const experience = document.getElementById("experience");
const jobtitle = document.getElementById("job-title");
const noOfVacancies = document.getElementById("vacancies");

cancel.addEventListener("click", () => {
  resetAllField();
  formApplicant.style.display = "none";
});

/*-------------resetFields-------------*/

function resetAllField() {
  removeError(username);
  username.classList.remove("is-valid", "is-invalid");
  username.value = "";
  removeError(email);
  email.classList.remove("is-valid", "is-invalid");
  email.value = "";
  removeError(experience);
  experience.classList.remove("is-valid", "is-invalid");
  experience.value = "";
}

username.addEventListener("blur", () => {
  checkNameValidity(username);
});

email.addEventListener("blur", () => {
  checkEmail(email);
});

experience.addEventListener("blur", () => {
  checkExperience(experience);
});

const applicantData = getFromLocalStorage("aplicantData") ?? [];
const formData = getFromLocalStorage("jobPortal") ?? [];

/*--------------Form Submit----------------*/

submitApplicantForm.addEventListener("click", function (e) {
  e.preventDefault();

  isValid = false;

  isValid = checkNameValidity(username);
  isValid = checkEmail(email) && isValid;
  isValid = checkExperience(experience) && isValid;

  const jobTitle = document.getElementById("job-title");

  const vacancies = formData.find((x) => x.title === jobTitle.value);

  vacancies.noOfVacancies = parseInt(vacancies.noOfVacancies) - 1;
  const uniqueId = vacancies.id;

  if (isValid) {
    const newUser = {
      id: uniqueId,
      username: username.value,
      email: email.value,
      experience: experience.value,
      jobTitle: jobtitle.value,
    };

    applicantData.push(newUser);

    setInLocalStorage("aplicantData", applicantData);

    setInLocalStorage("jobPortal", formData);

    jobTitle.value = "";
    jobTitle.disabled = false;

    getAllOpenJobs();
    resetAllField();

    formApplicant.style.display = "none";
  }
});

/*-------------GetJob Data-----------*/

function getAllOpenJobs() {
  dataList.innerHTML = "";
  formData.forEach((data, index) => {
    const dataStr = JSON.stringify(data);
    const finalData = dataStr.replace(/"/g, "'");

    if (data.status == "Open") {
      dataList.innerHTML += `
     <tr>
            <td class="py-2"  index="${index}">${data.title}</td>
            <td class="py-2">${data.jobType}</td>
            <td class="py-2">${data.overview}</td>
            <td class="py-2">${data.salary}</td>
            <td class="py-2">${data.noOfVacancies}</td>
            <td class="py-2">${data.status}</td>
            <td class="py-2">
               
                <button   index="${index}" class="apply btn p-1 px-2"><i class="fa fa-plus"></i></button>
                
            </td>
        </tr> `;
    }
  });
  action();
}

/*------------Apply for Job------------- */

const action = () => {
  const applyJobs = document.querySelectorAll(".apply");
  applyJobs.forEach((apply, index) => {
    let currentIndex = index;
    apply.onclick = () => {
      const dataRowValue =
        document.getElementsByTagName("tr")[currentIndex + 1];

      const jobtitle = dataRowValue.getElementsByTagName("td")[0];
      const countVacancy = dataRowValue.getElementsByTagName("td")[4];

      const tdText = jobtitle.innerHTML;

      const jobTitle = document.getElementById("job-title");

      jobTitle.value = tdText;
      jobTitle.disabled = true;

      const jobProfile = tdText;

      formApplicant.style.display = "block";

      getAllOpenJobs();
    };
    const dataRowValue = document.getElementsByTagName("tr")[currentIndex + 1];

    const jobtitle = dataRowValue.getElementsByTagName("td")[0];
    const countVacancy = dataRowValue.getElementsByTagName("td")[4];

    const tdText = jobtitle.innerHTML;

    const jobTitle = document.getElementById("job-title");

    jobTitle.value = tdText;
    jobTitle.disabled = true;

    const jobProfile = tdText;

    if (Number(countVacancy.innerHTML) === 0) {
      const jobIndex = formData.findIndex((job) => job.title === jobProfile);
      formData[jobIndex].status = "Closed";

      localStorage.setItem("jobPortal", JSON.stringify(formData));
      getAllOpenJobs();
    }
  });
};
getAllOpenJobs();
