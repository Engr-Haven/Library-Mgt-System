let logoutBtn = document.getElementById(`logout-btn`);
let loginForm = document.getElementById(`my-form`);
let loginUsernameInput = document.getElementById(`username`);
let loginPassWrdInput = document.getElementById(`password`);
let errDiv = document.getElementById(`error-cont`);
let addBookBtn = document.getElementById(`add-book-btn`);
let modalDiv = document.getElementById(`modal-section-container`);
let exitModalDiv = document.getElementById(`close-icon`);
let addBookForm = document.getElementById(`add-form`);
let addBookTitleInput = document.getElementById(`title`);
let addBookAuthorInput = document.getElementById(`author`);
let addBookYearInput = document.getElementById(`year`);
let addBookAvailabilityInput = document.getElementById(`availability`);
let renderDiv = document.getElementById(`all-cards-container`);
let studentViewDiv = document.getElementById(`card-book-container`);
let togglePassword = document.getElementById(`toggle-passwrd`);

// It's either i use anchor tag <a href="..." /a> or a btn, then use it in JS below >>>
logoutBtn?.addEventListener(`click`, () => {
  window.location.href = `./login.html`;
});

// Do Authentication on your pages and forms...

// Login HTML validation code here >>>>
loginForm?.addEventListener(`submit`, (e) => {
  e.preventDefault();
  let usernameLogin = loginUsernameInput.value.trim().toLowerCase();
  let passwordLogin = loginPassWrdInput.value.trim().toLowerCase();

  if (usernameLogin === `admin` && passwordLogin === `library123`) {
    window.location.href = `./dashboard.html`;
  } else {
    errDiv.style.visibility = `visible`;
    let errMsg = document.createElement(`p`);
    errMsg.textContent = `Either Username or Password is incorrect!`;
    errDiv.append(errMsg);

    loginForm.reset();
    loginUsernameInput.focus();
  }
});

// This is for toggling the password visibility >>>

togglePassword?.addEventListener(`click`, () => {
  let passWrdBoolean = loginPassWrdInput.type === `password`;

  if (passWrdBoolean) {
    loginPassWrdInput.type = `text`;
    togglePassword.classList.add(`fa-regular`, `fa-eye-slash`);
  } else {
    loginPassWrdInput.type = `password`;
    togglePassword.classList.remove(`fa-regular`, `fa-eye-slash`);
    togglePassword.classList.add(`fa-regular`, `fa-eye`);
  }
});

loginUsernameInput?.addEventListener(`input`, () => {
  errDiv.innerHTML = ``;
  errDiv.style.visibility = `hidden`;
});

// Dashboard page JS code here >>>>
addBookBtn?.addEventListener(`click`, () => {
  modalDiv.classList.remove(`modal-section-container`);
  modalDiv.classList.add(`modal-section-container-visible`);
});

exitModalDiv?.addEventListener(`click`, () => {
  if (modalDiv.classList.contains(`modal-section-container-visible`)) {
    modalDiv.classList.remove(`modal-section-container-visible`);
    modalDiv.classList.add(`modal-section-container`);
    addBookForm.reset();
  }
});

let libraryArr = [];

addBookForm?.addEventListener(`submit`, (e) => {
  e.preventDefault();

  let libraryTitle = addBookTitleInput.value.trim();
  let libraryAuthor = addBookAuthorInput.value.trim();
  let libraryYear = addBookYearInput.value.trim();
  let libraryAvailability = addBookAvailabilityInput.value.trim();

  const libraryBookDetails = {
    title: libraryTitle,
    author: libraryAuthor,
    year: libraryYear,
    availability: libraryAvailability,
  };

  // This code is for editing data in the local storage, without it, it will keep adding the edited data as a new data...nah wahala be that o >>>>
  if (editedDataIndex !== null) {
    libraryArr[editedDataIndex] = libraryBookDetails;
    editedDataIndex = null;
    modalDiv.classList.remove(`modal-section-container-visible`);
    modalDiv.classList.add(`modal-section-container`);
    localStorage.setItem(`Book Catalogue`, JSON.stringify(libraryArr));
    fetchLibraryCatalogue();
    addBookForm.reset();
    return;
  }

  libraryArr.push(libraryBookDetails);
  localStorage.setItem(`Book Catalogue`, JSON.stringify(libraryArr));

  addBookForm.reset();
  // exitModalDiv?.click();
  fetchLibraryCatalogue();
});

// This function helps to get the data in the local storage >>>>
function fetchLibraryCatalogue() {
  if (localStorage.getItem(`Book Catalogue`)) {
    libraryArr = JSON.parse(localStorage.getItem(`Book Catalogue`));
  }
  renderCatalogueOnUi();
  renderStudentView();
}
fetchLibraryCatalogue();

// I am storing all the edited index in the above array here ...>>>
let editedDataIndex = null;

// ...and this function render it on the UI >>>
function renderCatalogueOnUi() {
  if (renderDiv) {
    renderDiv.innerHTML = ``;
  }

  libraryArr.forEach((item, index) => {
    let bookCata = item.title;
    let authorCata = item.author;
    let yearCata = item.year;
    let availaCata = item.availability;

    let cardFlowDiv = document.createElement(`div`);
    cardFlowDiv.classList.add(`cards-container-flow`);

    let cardIconsDiv = document.createElement(`div`);
    cardIconsDiv.classList.add(`icons-cont`);

    let editIcon = document.createElement(`i`);
    editIcon.classList.add(`fa-solid`, `fa-pencil`);
    editIcon.addEventListener(`click`, () => {
      editedDataIndex = index;
      addBookTitleInput.value = bookCata;
      addBookAuthorInput.value = authorCata;
      addBookYearInput.value = yearCata;
      addBookAvailabilityInput.value = availaCata;
      modalDiv.classList.remove(`modal-section-container`);
      modalDiv.classList.add(`modal-section-container-visible`);
      fetchLibraryCatalogue();
    });

    let deleteIcon = document.createElement(`i`);
    deleteIcon.classList.add(`fa-solid`, `fa-trash-can`);
    deleteIcon.addEventListener(`click`, () => {
      libraryArr.splice(index, 1);
      localStorage.setItem(`Book Catalogue`, JSON.stringify(libraryArr));
      fetchLibraryCatalogue();
    });

    let contentDiv = document.createElement(`div`);
    contentDiv.classList.add(`content-div`);
    let h2TitleElement = document.createElement(`h2`);
    h2TitleElement.textContent = `Title:`;
    let pTitleElement = document.createElement(`p`);
    pTitleElement.textContent = bookCata;

    let secContentDiv = document.createElement(`div`);
    secContentDiv.classList.add(`content-divs`);
    let h2Author = document.createElement(`h2`);
    h2Author.textContent = `Author:`;
    let pAuthor = document.createElement(`p`);
    pAuthor.textContent = authorCata;

    let thirdContentDiv = document.createElement(`div`);
    thirdContentDiv.classList.add(`content-divss`);
    let h2Year = document.createElement(`h2`);
    h2Year.textContent = `Year:`;
    let pYear = document.createElement(`p`);
    pYear.textContent = yearCata;

    let fourthContentDiv = document.createElement(`div`);
    fourthContentDiv.classList.add(`content-divsss`);
    let h2Availability = document.createElement(`h2`);
    h2Availability.textContent = `Availability:`;
    let pAvailability = document.createElement(`p`);
    pAvailability.textContent = availaCata;

    cardIconsDiv.append(editIcon, deleteIcon);
    contentDiv.append(h2TitleElement, pTitleElement);
    secContentDiv.append(h2Author, pAuthor);
    thirdContentDiv.append(h2Year, pYear);
    fourthContentDiv.append(h2Availability, pAvailability);

    cardFlowDiv.append(
      cardIconsDiv,
      contentDiv,
      secContentDiv,
      thirdContentDiv,
      fourthContentDiv
    );

    renderDiv?.append(cardFlowDiv);
  });
}

// Student view html part >>>>

function renderStudentView() {
  if (studentViewDiv) {
    studentViewDiv.innerHTML = ``;
  }

  libraryArr.forEach((item) => {
    let bookCata = item.title;
    let authorCata = item.author;
    let yearCata = item.year;
    let availaCata = item.availability;

    let studentCardBlock = document.createElement(`div`);
    studentCardBlock.classList.add(`cards-contss`);

    let thePElement = document.createElement(`p`);
    thePElement.textContent = `Title: ${bookCata}`;
    let thePElement2 = document.createElement(`p`);
    thePElement2.textContent = `Author: ${authorCata}`;
    let thePElement3 = document.createElement(`p`);
    thePElement3.textContent = `Year: ${yearCata}`;
    let thePElement4 = document.createElement(`p`);
    thePElement4.textContent = `Availability: ${availaCata}`;

    studentCardBlock.append(
      thePElement,
      thePElement2,
      thePElement3,
      thePElement4
    );

    studentViewDiv?.append(studentCardBlock);
  });
}
