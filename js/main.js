//todo contactname MM
//todo modify sweet alerts messages
var contactName = document.getElementById("fname");
var contactPhone = document.getElementById("phone");
var contactEmail = document.getElementById("email");
var contactAddress = document.getElementById("address");
var contactGroup = document.getElementById("group");
var contactNotes = document.getElementById("notes");
var contactFav = document.getElementById("fav");
var contactEmergency = document.getElementById("emergency");
var favbtn = document.getElementById("fav-btn");
var searchbtn = document.getElementById("searchbtn");
var closebtn = document.getElementById("close-btn");
const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
var contacts = [];
var favorites = [];
var emergencies = [];
if (localStorage.getItem("contacts")) {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  addfavorites();
  addemergenices();
  displayContact();
  displayfav();
  displayemg();
}
function addContact() {
  if (!checkmissing(contactName)) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please Enter a name for the Contact",
    });
    return;
  }
  if (!validation(contactName)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50)",
    });
    return;
  }
  if (!checkmissing(contactPhone)) {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please Enter a phone number!",
    });
    return;
  }
  

  if (!validation(contactPhone)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
    return;
  }
  if (!validation(contactEmail)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please Enter a valid email address",
    });
    return;
  }
  if (!checkduplicatephone(contactPhone)) {
    Swal.fire({
      icon: "error",
      title: "Phone number already exists",
    });
    return;
  }

  var user = {
    contactname: contactName.value,
    contactphone: contactPhone.value,
    contactemail: contactEmail.value,
    contactaddress: contactAddress.value,
    contactgroup: contactGroup.value,
    contactnotes: contactNotes.value,
    contactfav: contactFav.checked,
    contactemergency: contactEmergency.checked,
  };

  contacts.push(user);

  if (contactFav.checked) addfavorites();
  if (contactEmergency.checked) addemergenices();

  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContact();
  displayfav();
  displayemg();
  clearform();
  console.log("Before hide");
  modal.hide();
  console.log("After hide");
  setTimeout(() => {
    Swal.fire({
      position: "center",
      icon: "success",
      title:"Added",
      text: "Contact has been added Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }, 300);
}

/*function addContact() {
  if (validation(contactName) && validation(contactPhone)) {
    var user = {
      contactname: contactName.value,
      contactphone: contactPhone.value,
      contactemail: contactEmail.value,
      contactaddress: contactAddress.value,
      contactgroup: contactGroup.value,
      contactnotes: contactNotes.value,
      contactfav: contactFav.checked,
      contactemergency: contactEmergency.checked,
    };
    contacts.push(user);
    if (contactFav.checked) {
      addfavorites();
    }
    if (contactEmergency.checked) {
      addemergenices();
    }
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContact();
    displayfav();
    displayemg();
    clearform();
    modal.hide();
  }
  if(validation(contactName)===false)
  {
     Swal.fire({
       icon: "error",
       title: "Name should contain letters and spaces(2-50)",
     });
  }
}*/

function clearform() {
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  contactNotes.value = "";
  contactFav.checked = false;
  contactEmergency.checked = false;
}
function displayfav() {
  if (favorites.length === 0) {
    document.getElementById("no-favorite").classList.remove("d-none");
    document.getElementById("favorite-list").classList.add("d-none");
  } else {
    document.getElementById("no-favorite").classList.add("d-none");
    document.getElementById("favorite-list").classList.remove("d-none");

    var box = ``;
    for (var i = 0; i < favorites.length; i++) {
      box += `<div
                      class="favorite-item rounded-3 p-1 d-flex justify-content-between align-items-center"
                    style="background-color: #F6FAFB">
                      <div class="d-flex align-items-center gap-2">
                        <div
                          class="small-box-lg indiago  rounded-3 d-flex align-items-center justify-content-center"
                        >
                          <span class="text-white f-14 f-700">${favorites[i].contactname[0]}</span>
                        </div>
                        <div class="text">
                          <h4 class="m-0 p-0 mt-3 f-14">${favorites[i].contactname}</h4>
                          <p class="f-12 f-400 dark-gray">${favorites[i].contactphone}</p>
                        </div>
                      </div>
                      <div
                        class="md-small-box green-clr d-flex align-items-center justify-content-center rounded-3"
                      >
                        <i class="f-12 fa-solid fa-phone"></i>
                      </div>
                    </div>`;
    }
    document.getElementById("favorite-list").innerHTML = box;
  }

  document.getElementById("favcount").innerHTML = favorites.length;
}
function displayemg() {
  console.log(emergencies.length);
  if (emergencies.length === 0) {
    document.getElementById("no-emergency").classList.remove("d-none");
    document.getElementById("emergency-list").classList.add("d-none");
  } else {
    document.getElementById("no-emergency").classList.add("d-none");
    document.getElementById("emergency-list").classList.remove("d-none");
    var box = ``;
    for (var i = 0; i < emergencies.length; i++) {
      box += `<div
                      class="emergency-item rounded-3 p-1 d-flex justify-content-between align-items-center"
                    style="background-color: #F6FAFB">
                      <div class="d-flex align-items-center gap-2">
                        <div
                          class="small-box-lg indiago rounded-3 d-flex align-items-center justify-content-center"
                        >
                          <span class="text-white f-14 f-700">${emergencies[i].contactname[0]}</span>
                        </div>
                        <div class="text">
                          <h4 class="m-0 p-0 mt-3 f-14">${emergencies[i].contactname}</h4>
                          <p class="f-12 f-400 gray-clr">${emergencies[i].contactphone}</p>
                        </div>
                      </div>
                      <div
                        class="md-small-box dark-rose d-flex align-items-center justify-content-center rounded-3"
                      >
                        <i class="f-12 fa-solid fa-phone"></i>
                      </div>
                    </div>`;
    }
    document.getElementById("emergency-list").innerHTML = box;
  }
  document.getElementById("emgcount").innerHTML = emergencies.length;
}

/*function displayContact(list = contacts) {
  var box = ``;
  for (var i = 0; i < list.length; i++) {
    box += `<div class="col-md-6">
                  <div
                    class="contact-item rounded-3 border border-2 shadow p-3"
                  >
                    <div class="d-flex align-items-center gap-3">
                      <div
                        class="small-box rounded-3 d-flex justify-content-center align-items-center position-relative"
                      >
                        <span class="text-white fw-bold f-20">${
                          list[i].contactname[0]
                        }</span>
                        <div
                          class="position-absolute ${
                            list[i].contactfav ? "d-block" : "d-none"
                          } rounded-circle star-circle d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-star text-white f-12"></i>
                        </div>
                        <div
                          class="position-absolute ${
                            list[i].contactemergency ? "d-block" : "d-none"
                          } rounded-circle emg-circle d-flex justify-content-center align-items-center"
                        >
                          <i class="fa-solid fa-heart-pulse text-white f-12"></i>
                        </div>
                      </div>
                      <div>
                        <h3 class="fw-bold m-0 p-0 f-16 mt-2">${
                          list[i].contactname
                        }</h3>
                        <div class="d-flex align-items-center gap-2 mt-2">
                          <div
                            class="v-small-box d-flex justify-content-center align-items-center rounded-3 bg-info"
                          >
                            <i class="fa-solid fa-phone text-white f-12"></i>
                          </div>
                          <p class="f-14 f-400 m-0 p-0">${
                            list[i].contactphone
                          }</p>
                        </div>
                      </div>
                    </div>
                    <div class="contact-info">
                      <div class="mt-3 d-flex align-items-center gap-2">
                        <div
                          class="v-small-box bg-info rounded-3 d-flex align-items-center justify-content-center rounded-3 bg-info"
                        >
                          <i class="fa-solid fa-envelope f-12"></i>
                        </div>
                        <p class="f-14 f-400 m-0 p-0">${
                          list[i].contactemail
                        }</p>
                      </div>
                      <div class="mt-3 d-flex align-items-center gap-2">
                        <div
                          class="v-small-box bg-info rounded-3 d-flex align-items-center justify-content-center rounded-3 bg-info"
                        >
                          <i class="fa-solid fa-location-dot f-12"></i>
                        </div>
                        <p class="f-14 f-400 m-0 p-0">${
                          list[i].contactaddress
                        }</p>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="d-flex align-items-center gap-2">
                        <span class="info-badge">${list[i].contactgroup}</span>
                        <span class="emergency-badge ${
                          list[i].contactemergency ? "d-block" : "d-none"
                        }"
                          ><i class="fa-solid fa-heart-pulse"></i
                          >Emergency</span
                        >
                      </div>
                    </div>
                    <div
                      class="d-flex align-items-center gap-2 justify-content-between border-top mt-3"
                    >
                      <div class="d-flex align-items-center gap-2 border-top">
                        <a href="tel:${list[i].contactphone}" class="call-btn">
                          <i class="fa-solid fa-phone"></i>
                        </a>
                        <a
                          href="mailto:${list[i].contactemail}"
                          class="email-btn"
                        >
                          <i class="fa-solid fa-envelope"></i>
                        </a>
                      </div>
                      <div class="d-flex align-items-center gap-2">
                        <button class="favorite-btn ${
                          list[i].contactfav ? "active" : ""
                        }" onclick="favChange(this,${i})">
                          <i class="fa-solid fa-star"></i>
                        </button>
                        <button class="emergency-btn ${
                          list[i].contactemergency ? "active" : ""
                        }" onclick="emgChange(this,${i})"
                        >
                          <i class="fa-solid fa-heart-pulse"></i>
                        </button>
                        <button class="edit-btn" onclick="Edit(${i})">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="delete-btn">
                          <i class="fa-solid fa-trash" onclick="deleteContact(${i})"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
  }
  document.getElementById("contact-list").innerHTML = box;
  document.getElementById("total").innerHTML = list.length;
}*/
function displayContact(list = contacts) {
  if (list.length === 0) {
    document.getElementById("no-contacts").classList.remove("d-none");
    document.getElementById("contact-list").classList.add("d-none");
  } else {
    document.getElementById("no-contacts").classList.add("d-none");
    document.getElementById("contact-list").classList.remove("d-none");

    var box = ``;
    for (var i = 0; i < list.length; i++) {
      let emailDivClass = list[i].contactemail ? "" : "d-none";
      let addressDivClass = list[i].contactaddress ? "" : "d-none";
      let groupDivClass = list[i].contactgroup ? "" : "d-none";

      box += `<div class="col-md-6">
              <div class="contact-item rounded-3 border border-2 shadow p-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="small-box indiago rounded-3 d-flex justify-content-center align-items-center position-relative">
                    <span class="text-white fw-bold f-20">${
                      list[i].contactname[0]
                    }</span>
                    <div class="position-absolute ${
                      list[i].contactfav ? "d-block" : "d-none"
                    } rounded-circle star-circle d-flex justify-content-center align-items-center">
                      <i class="fa-solid fa-star text-white f-12"></i>
                    </div>
                    <div class="position-absolute ${
                      list[i].contactemergency ? "d-block" : "d-none"
                    } rounded-circle emg-circle d-flex justify-content-center align-items-center">
                      <i class="fa-solid fa-heart-pulse text-white f-12"></i>
                    </div>
                  </div>
                  <div>
                    <h3 class="fw-bold m-0 p-0 f-16 mt-2">${
                      list[i].contactname
                    }</h3>
                    <div class="d-flex align-items-center gap-2 mt-2">
                      <div class="v-small-box d-flex justify-content-center align-items-center rounded-3 light-blue">
                        <i class="fa-solid fa-phone f-12"></i>
                      </div>
                      <p class="f-14 f-400 m-0 p-0 gray-clr">${
                        list[i].contactphone
                      }</p>
                    </div>
                  </div>
                </div>
                <div class="contact-info">
                  <div class="mt-3 d-flex align-items-center gap-2 ${emailDivClass}">
                    <div class="v-small-box light-purple rounded-3 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-envelope f-12"></i>
                    </div>
                    <p class="f-14 f-400 m-0 p-0 dark-gray">${
                      list[i].contactemail
                    }</p>
                  </div>
                  <div class="mt-3 d-flex align-items-center gap-2 ${addressDivClass}">
                    <div class="v-small-box green-clr rounded-3 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-location-dot f-12"></i>
                    </div>
                    <p class="f-14 f-400 m-0 p-0 dark-gray">${
                      list[i].contactaddress
                    }</p>
                  </div>
                </div>
                <div class="mt-3">
                  <div class="d-flex align-items-center gap-2">
                    <span class="info-badge ${groupDivClass}">${
        list[i].contactgroup
      }</span>
                    <span class="emergency-badge ${
                      list[i].contactemergency ? "d-block" : "d-none"
                    }">
                      <i class="fa-solid fa-heart-pulse"></i>Emergency
                    </span>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 justify-content-between border-top mt-3">
                  <div class="d-flex align-items-center gap-2 border-top">
                    <a href="tel:${list[i].contactphone}" class="call-btn">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                    <a href="mailto:${
                      list[i].contactemail
                    }" class="email-btn light-purple">
                      <i class="fa-solid fa-envelope"></i>
                    </a>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <button class="favorite-btn ${
                      list[i].contactfav ? "active" : ""
                    }" onclick="favChange(this,${i})">
                      <i class="fa-solid fa-star"></i>
                    </button>
                    <button class="emergency-btn ${
                      list[i].contactemergency ? "active" : ""
                    }" onclick="emgChange(this,${i})">
                      <i class="fa-solid fa-heart-pulse"></i>
                    </button>
                    <button class="edit-btn" onclick="Edit(${i})">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="delete-btn">
                      <i class="fa-solid fa-trash" onclick="deleteContact(${i})"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
    }
    document.getElementById("contact-list").innerHTML = box;
  }
  document.getElementById("total").innerHTML = list.length;
}

function addfavorites() {
  favorites = [];
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].contactfav == true) {
      favorites.push(contacts[i]);
    }
  }
}
function addemergenices() {
  emergencies = [];
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].contactemergency == true) {
      emergencies.push(contacts[i]);
    }
  }
}
function favChange(favbtn, index) {
  if (favbtn.classList.contains("active")) {
    console.log(index);
    favorites.splice(favorites.indexOf(contacts[index]), 1);
    contacts[index].contactfav = false;
    favbtn.classList.remove("active");
  } else {
    favorites.push(contacts[index]);
    contacts[index].contactfav = true;
    favbtn.classList.add("active");
  }
  localStorage.setItem("contacts", JSON.stringify(contacts));
  addfavorites();
  displayContact();
  displayfav();
}
function emgChange(emgbtn, index) {
  if (emgbtn.classList.contains("active")) {
    console.log(index);
    emergencies.splice(emergencies.indexOf(contacts[index]), 1);
    contacts[index].contactemergency = false;
    emgbtn.classList.remove("active");
  } else {
    emergencies.push(contacts[index]);
    contacts[index].contactemergency = true;
    emgbtn.classList.add("active");
  }
  localStorage.setItem("contacts", JSON.stringify(contacts));
  addemergenices();
  displayContact();
  displayemg();
}
function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contacts[index].contactname}? This action Cannot be undone`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C62222",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      addfavorites();
      addemergenices();
      displayContact();
      displayfav();
      displayemg();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Deleted",
        text: "Contact has been deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}
var globalIndex;
function Edit(i) {
  document.getElementById("exampleModalLabel").innerHTML = "Edit Contact";
  document.getElementById("add-btn").classList.add("d-none");
  globalIndex = i;
  document.getElementById("update-button").classList.remove("d-none");
  contactName.value = contacts[i].contactname;
  contactPhone.value = contacts[i].contactphone;
  contactEmail.value = contacts[i].contactemail;
  contactAddress.value = contacts[i].contactaddress;
  contactGroup.value = contacts[i].contactgroup;
  contactNotes.value = contacts[i].contactnotes;
  contactFav.checked = contacts[i].contactfav;
  contactEmergency.checked = contacts[i].contactemergency;
  modal.show();
}

function updateContact() {
  if (!checkmissing(contactName)) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please Enter a name for the Contact",
    });
    return;
  }
  if (!validation(contactName)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50)",
    });
    return;
  }
  if (!checkmissing(contactPhone)) {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please Enter a phone number!",
    });
    return;
  }
  if (!validation(contactPhone)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
    return;
  }
  if (!validation(contactEmail)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please Enter a valid email address",
    });
    return;
  }
  contacts[globalIndex].contactname = contactName.value;
  contacts[globalIndex].contactphone = contactPhone.value;
  contacts[globalIndex].contactemail = contactEmail.value;
  contacts[globalIndex].contactaddress = contactAddress.value;
  contacts[globalIndex].contactgroup = contactGroup.value;
  contacts[globalIndex].contactnotes = contactNotes.value;
  contacts[globalIndex].contactfav = contactFav.checked;
  contacts[globalIndex].contactemergency = contactEmergency.checked;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  modal.hide();
  addfavorites();
  addemergenices();
  displayContact();
  displayfav();
  displayemg();
  clearform();
  document.getElementById("exampleModalLabel").innerHTML = "Add Contact";
  document.getElementById("add-btn").classList.remove("d-none");
  document.getElementById("update-button").classList.add("d-none");
  setTimeout(() => {
    Swal.fire({
      position: "center",
      icon: "success",
      title:"Updated",
      text: "Contact has been updated Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }, 300);
}
function search() {
  var searchedcontacts = [];
  var searchvalue = searchbtn.value.toLowerCase();
  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].contactname.toLowerCase().includes(searchvalue) ||
      contacts[i].contactphone.toString().includes(searchvalue) ||
      contacts[i].contactemail.toLowerCase().includes(searchvalue)
    ) {
      searchedcontacts.push(contacts[i]);
    }
  }
  displayContact(searchedcontacts);
}
var contactregex = {
  fname: /^[A-Za-z ]{2,50}$/,
  phone: /^(\+201|01)[0125]{1}[0-9]{8}$/,
  email: /^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};
function validation(input) {
  if (contactregex[input.id].test(input.value)) {
    input.nextElementSibling.classList.add("d-none");
    input.style.border = "";
    return true;
  } else {
    document.getElementById(input.id).style.cssText = "border: 1px solid red !important";
    input.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
function checkduplicatephone(input) {
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].contactphone == input.value) {
      return false;
    }
  }
  return true;
}
function checkmissing(input) {
  if (input.value == "") {
    return false;
  } else {
    return true;
  }
}
closebtn.addEventListener("click", () => {
  clearform();
});   
