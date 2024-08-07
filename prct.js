const fetchURL = "http://localhost:3000/employees";
const paginationUl = document.getElementById("paginationUl")
const tableBody = document.getElementById("tableBody")
const delSubmitBtn = document.getElementById("delSubmitBtn")
const addForm = document.getElementById("addEmployeeForm")
const addFormSubmitBtn = document.getElementById("addFormSubmit")
const addEmployeeBtn = document.getElementById("employAddBtn")
const editSubmitBtn = document.getElementById("EditSubmit")
const actionBtnTh = document.getElementById("thActionBtns")
let itemsPerPage = parseInt(document.getElementById("page-no").value)
let tableContents = []
let currentPage = 1
let totalItems = 0
let searhNo = document.getElementById("serchResultNo")

fetchData()

// function to fetch data ("GET") /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function fetchData() {
  try {
    let response = await fetch(fetchURL)
    if (!response.ok) {
      throw new Error("Could not fetch resources")
    }
    else {
      let data = await response.json()
      tableContents = data.reverse()
      document.getElementById("page-no").addEventListener("change", () => {
        itemsPerPage = parseInt(document.getElementById("page-no").value)
        renderData(currentPage = 1)
        pagination()
        highlight(currentPage)
      })
      renderData(currentPage)
      pagination()
      highlight(currentPage)
    }
  }
  catch (error) {
    console.error(error);
  }
}


// function to display the fetched data to table ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderData(page) {
  const from = (page - 1) * itemsPerPage
  const to = from + itemsPerPage
  const finalData = tableContents.slice(from, to)
  let i = from
  let output = ``
  finalData.map(employee => {
    i++
    totalItems++
    let slNo = i > 9 ? `#${i}` : `#0${i}`
    employee.id = slNo
    output += `
    <tr>
    <td class="colo-r table-slno" scope="row">${employee.id}</td>
    <td class="colo-r">
        <img src="${fetchURL}/${employee.id}/avatar" width="30px" style="padding : 1px 0 1px 0" class="rounded-4"  alt="" />
        <span id="employeeName">${employee.salutation}.${employee.firstName} ${employee.lastName}</span>
    </td>
    <td class="colo-r">${employee.email}</td>
    <td class="colo-r">${employee.phone}</td>
    <td class="colo-r">${employee.gender}</td>
    <td class="colo-r">${employee.dob}</td>
    <td class="colo-r">${employee.country}</td>
    <td class="colo-r">
      
      <div class="dropdown">
        <button class="btn btn-secondary actionBtns hoverEditBtn px-2 py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
        <ul class="dropdown-menu">
          <li id="previewBtn" class="li-dropdown"><a href="preview_page.html?id=${employee.id}" class="dropdown-item py-1 px-2" href="preview_page.html"><span class="d-flex"><div class="subDrpFlx"><i class="fa-regular fa-eye"></i></div><span class="subMenuViewDetail dropMenus">View Details</span></span></a></li>
          <li onclick="passId('${employee.id}')" id="editBtn" data-bs-toggle="modal" data-bs-target="#exampleModa2" class="li-dropdown"><a  class="dropdown-item drp-edit d-block py-1 px-2" href="#"><span class="d-flex"><div class="subDrpFlx"><i class="fa-solid fa-pen"></i></div><span class="subMenuEdit dropMenus">Edit</span></span></a></li>
          <li onclick="passId('${employee.id}')" id="delBtn" data-bs-toggle="modal" data-bs-target="#exampleModa3" class="li-dropdown"><a  class="dropdown-item drp-delete d-block py-1 px-2" href="#"><span class="d-flex"><div class="subDrpFlx"><i class="fa-regular fa-trash-can"></i></div><span class="subMenuDelete dropMenus">Delete</span></span></a></li>
        </ul>
      </div>
    </td>
  </tr>
    `
  })
  tableBody.innerHTML = output
  document.getElementById("totalItems").textContent = tableContents.length
}


// function to pagination system //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function pagination() {
  const totalPages = Math.ceil(tableContents.length / itemsPerPage)
  paginationUl.innerHTML = ``

  const fastBack = document.createElement("li")
  paginationUl.appendChild(fastBack)
  fastBack.classList.add("page-item")
  fastBack.innerHTML = `<a class="page-link"><<</a>`
  fastBack.addEventListener("click", () => {
    renderData(currentPage = 1)
    highlight()
  })

  const prevBtn = document.createElement("li")
  paginationUl.appendChild(prevBtn)
  prevBtn.classList.add("page-item")
  prevBtn.innerHTML = `<a class="page-link"><</a>`
  prevBtn.addEventListener("click", () => {
    if (currentPage !== 1) {
      currentPage--
    }
    else {
      currentPage = 1
    }
    renderData(currentPage)
    highlight()
  })

  for (let i = 1; i <= totalPages; i++) {
    let page = document.createElement("li")
    paginationUl.appendChild(page)
    page.classList.add("page-item")
    page.innerHTML = `<a class="page-link">${i}</a>`
    page.addEventListener("click", () => {
      renderData(currentPage = i)
      highlight()
    })
  }

  const nextBtn = document.createElement("li")
  paginationUl.appendChild(nextBtn)
  nextBtn.classList.add("page-item")
  nextBtn.innerHTML = `<a class="page-link">></a>`
  nextBtn.addEventListener("click", () => {
    if (currentPage !== totalPages) {
      currentPage++
    }
    else {
      currentPage = totalPages
    }
    renderData(currentPage)
    highlight()
  })

  const fastForward = document.createElement("li")
  paginationUl.appendChild(fastForward)
  fastForward.classList.add("page-item")
  fastForward.innerHTML = `<a class="page-link">>></a>`
  fastForward.addEventListener("click", () => {
    renderData(currentPage = totalPages)
    highlight()
  })
}



// function to highlight current page in pagination //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function highlight() {
  paginationUl.querySelectorAll("li").forEach(btns => {
    if (btns.textContent == currentPage) {
      btns.classList.add("active")
    }
    else {
      btns.classList.remove("active")
    }
  })
  if (tableContents.length <= itemsPerPage) {
    paginationHide()
  } else {
    paginationShow()
  }
}


// function to hide pagination //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function paginationHide() {
  paginationUl.querySelectorAll("li").forEach(element => {
    element.style.display = "none"
  });
}

// function to show pagination ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function paginationShow() {
  paginationUl.querySelectorAll("li").forEach(element => {
    element.style.display = ""
  });
}


// function to searchEmployee /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function search() {
  const searchKey = document.getElementById("search").value
  const rows = document.getElementsByTagName("tr")
  const theadTr = document.getElementById("tableHeading")
  const tableParent = document.getElementById("tableHead")
  let totalSearch = 0;
  let found = false
  itemsPerPage = searchKey == `` ? parseInt(document.getElementById("page-no").value) : tableContents.length
  renderData(currentPage = 1)
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i].textContent.toLowerCase().includes(searchKey)) {
      rows[i].style.display = "none"
    } else {
      rows[i].style.display = ""
      found = true
      totalSearch++

    }
  }
  if (!found) {
    theadTr.querySelectorAll("th").forEach(element => {
      element.style.display = "none"
    });
    const notFound = document.createElement("tr")
    tableBody.appendChild(notFound)
    notFound.innerHTML = `
              <td class="colo-r text-center">"${searchKey}" not found</td>
              `
    searhNo.style.display = `none`
  }
  else {
    tableParent.classList.add("scrollbar-hidden")
    tableParent.style.overflowY = "auto"
    tableParent.classList.add("scrolling-height")
    tableParent.querySelector("thead").querySelectorAll("th").forEach(element => {
      element.style.position = "sticky"
      element.style.top = "0"
    });
    actionBtnTh.style.position = `sticky`
    actionBtnTh.style.zIndex = `2`
    actionBtnTh.style.top = `0`

    theadTr.querySelectorAll("th").forEach(element => {
      element.style.display = ""
    });

    searhNo.style.display = `flex`
    searhNo.innerHTML = `<span class="colo-r">your search got ${totalSearch} results</span>`
  }
  if (searchKey !== ``) {
    paginationHide()
    document.getElementById("page-no").style.display = `none`
  }
  else {
    paginationShow()
    document.getElementById("page-no").style.display = ``
    searhNo.style.display = `none`
  }
}




// function to Display sweetAlert message ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function simulateTask(msg, icon) {
  setTimeout(function () {
    Swal.fire({
      title: `Employee ${msg}`,
      text: `Employee ${msg} succesfully`,
      icon: `${icon}`
    });
  }, 500);
}



// add Employee with click, keyboard "Enter" key event and validation ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

addFormSubmitBtn.addEventListener("click", () => {
  let validation = addValidation()
  if (!validation) {
    return
  }
  else {
    postData()
  }
})

addEmployeeBtn.addEventListener("click", () => {
  document.addEventListener("keyup", (e) => {
    if (e.key === `Enter` || e.keyCode === 13) {

      let validation = addValidation()
      if (!validation) {
        return
      }
      else {
        postData()
      }
    }
  })
})





// function to addEmployee //////////////////////////////////////////////////////////////////////////////////

async function postData() {
  const salutationIs = document.getElementById("salutation").value
  let firstNameIs = document.getElementById("firstName").value
  firstNameIs = firstNameIs.charAt(0).toUpperCase() + firstNameIs.slice(1)
  let lastNameIs = document.getElementById("lastName").value
  lastNameIs = lastNameIs.charAt(0).toUpperCase() + lastNameIs.slice(1)
  const emailIs = document.getElementById("email").value
  const phoneNoIs = document.getElementById("phoneNo").value
  const userNameIs = document.getElementById("userName").value
  const passwordIs = document.getElementById("password").value
  const dateOfBirth = document.getElementById("dob").value
  let [year, month, day] = dateOfBirth.split("-")
  let dobIs = `${day}-${month}-${year}`
  const genderIs = document.querySelector('input[name="gender"]:checked').value
  const qualificationsIs = document.getElementById("qualifications").value
  const addressIs = document.getElementById("address").value
  const countryIs = document.getElementById("country").value
  const stateIs = document.getElementById("state").value
  const cityIs = document.getElementById("city").value
  const pinZipIs = document.getElementById("pinZip").value

  let newUserData = {
    salutation: salutationIs,
    firstName: firstNameIs,
    lastName: lastNameIs,
    email: emailIs,
    phone: phoneNoIs,
    dob: dobIs,
    gender: genderIs,
    qualifications: qualificationsIs,
    address: addressIs,
    city: cityIs,
    state: stateIs,
    pin: pinZipIs,
    country: countryIs,
    username: userNameIs,
    password: passwordIs
  }

  try {
    let response = await fetch(fetchURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newUserData)
    })
    if (!response.ok) {
      throw new Error("Could not add employee")
    }
    let data = await response.json()
    console.log(data);
    let userImg = document.getElementById("upload")
    let imgObject = new FormData()
    imgObject.append(`avatar`, userImg.files[0])

    let imgResponse = await fetch(`${fetchURL}/${data.id}/avatar`, {
      method: "POST",
      body: imgObject
    })

    if (!imgResponse.ok) {
      throw new Error("Could not upload employee avatar")
    }
    let imgData = imgResponse.json()
    console.log(`Avatar uploaded successfully`);
    newUserData.id = data.id
    tableContents.unshift(newUserData)
    $("#exampleModal").modal("hide")
    fetchData()
    simulateTask("added", "success")
  }
  catch (error) {
    console.error(error);
  }
}


// function to avatar Preview ///////////////////////////////////////////////////////////////////////////////
function avatarPreview() {
  let preview = document.getElementById("avatarimg")
  preview.src = URL.createObjectURL(event.target.files[0])
  preview.style.width = `90px`
  preview.style.height = `90px`
  document.getElementById("placeholdderImageUploadLabel").style.width = `100px`
  // document.getElementById("placeholdderImageUploadLabel").style.margin = ``
  document.getElementById("bg-upload").querySelectorAll(".upload-bg").forEach(element => {
    element.style.display = `none`
  });
}




// function to add employee Validation /////////////////////////////////////////////////////////////////////
function addValidation() {

  // variables to inputFields

  const salutationVal = document.getElementById("salutation")
  const firstNameVal = document.getElementById("firstName")
  const lastNameVal = document.getElementById("lastName")
  const emailVal = document.getElementById("email")
  const phoneVal = document.getElementById("phoneNo")
  const usernameVal = document.getElementById("userName")
  const passwordVal = document.getElementById("password")
  const qualificationVal = document.getElementById("qualifications")
  const addressVal = document.getElementById("address")
  const countryVal = document.getElementById("country")
  const stateVal = document.getElementById("state")
  const cityVal = document.getElementById("city")
  const pinZipVal = document.getElementById("pinZip")

  const dobVal = document.getElementById("dob")
  const male = document.getElementById("male")
  const female = document.getElementById("female")





  // byppass error msg when an input field have valid value in realtime hides the errorMsg with eventListener

  salutationVal.addEventListener("input", () => {
    document.getElementById("SalutationValidation").textContent = ""
    if (salutationVal.value === ``) {
      document.getElementById("SalutationValidation").textContent = "Please select a salutation"
    }
  })


  firstNameVal.addEventListener("input", () => {
    document.getElementById("FirstnameValidation").textContent = ``
    if (!namePattern.test(firstNameVal.value)) {
      document.getElementById("FirstnameValidation").textContent = "Enter valid first name"
    }
  })


  lastNameVal.addEventListener("input", () => {
    document.getElementById("LastnameValidation").textContent = ``
    if (!namePattern.test(lastNameVal.value)) {
      document.getElementById("LastnameValidation").textContent = "Enter valid last name"
    }
  })


  emailVal.addEventListener("input", () => {
    document.getElementById("emailaddValidation").textContent = ``
    if (!emailPattern.test(emailVal.value)) {
      document.getElementById("emailaddValidation").textContent = "Please enter a valid email id"
    }
  })


  phoneVal.addEventListener("input", () => {
    document.getElementById("MobileValidation").textContent = ``
    if (!phonePattern.test(phoneVal.value)) {
      document.getElementById("MobileValidation").textContent = "Phone number should be 10 digits"
    }
  })


  usernameVal.addEventListener("input", () => {
    document.getElementById("userNameValidation").textContent = ``
    if (usernameVal.value === ``) {
      document.getElementById("userNameValidation").textContent = "Enter a User name"
    }
  })


  passwordVal.addEventListener("input", () => {
    document.getElementById("PasswordValidation").textContent = ``
    if (!passwordPattern.test(passwordVal.value)) {
      document.getElementById("PasswordValidation").textContent = "password should contain atleast 8 character with number, symbol, capital and small letters"
    }
  })


  dobVal.addEventListener("input", () => {
    addDOBValidation.textContent = ``
    if (dobVal.value === ``) {
      addDOBValidation.textContent = `Please select Date of Birth`
    }
  })


  document.getElementById("addEmployeeForm").addEventListener("input", () => {
    if (male.checked || female.checked) {
      genderValidation.textContent = ``
    }
  })


  qualificationVal.addEventListener("input", () => {
    document.getElementById("QualificationValidation").textContent = ``
    if (qualificationVal.value === ``) {
      document.getElementById("QualificationValidation").textContent = "Enter qualification"
    }
  })


  addressVal.addEventListener("input", () => {
    document.getElementById("AddressValidation").textContent = ``
    if (addressVal.value === ``) {
      document.getElementById("AddressValidation").textContent = "Enter address"
    }
  })


  countryVal.addEventListener("input", () => {
    document.getElementById("CountryValidation").textContent = ``
    if (countryVal.value === ``) {
      document.getElementById("CountryValidation").textContent = "select a country"
    }
  })


  stateVal.addEventListener("input", () => {
    document.getElementById("stateValidation").textContent = ``
    if (stateVal.value === ``) {
      document.getElementById("stateValidation").textContent = "select a state"
    }
  })


  cityVal.addEventListener("input", () => {
    document.getElementById("cityValidation").textContent = ``
    if (cityVal.value === ``) {
      document.getElementById("cityValidation").textContent = "Enter city"
    }
  })


  pinZipVal.addEventListener("input", () => {
    document.getElementById("pinzipValidation").textContent = ``
    if (pinZipVal.value === ``) {
      document.getElementById("pinzipValidation").textContent = "Enter Pin / Zip code"
    }
  })






  // variables to values of inputFields to validate /////////////////////////////////////////////////////////

  const salutation = salutationVal.value.trim()
  const firstName = firstNameVal.value.trim()
  const lastName = lastNameVal.value.trim()
  const email = emailVal.value.trim()
  const phone = phoneVal.value.trim()
  const username = usernameVal.value.trim()
  const password = passwordVal.value.trim()
  const qualification = qualificationVal.value.trim()
  const address = addressVal.value.trim()
  const country = countryVal.value.trim()
  const state = stateVal.value.trim()
  const city = cityVal.value.trim()
  const pinZip = pinZipVal.value.trim()


  const gender = document.querySelector('input[name="gender"]:checked')
  const dobValue = dob.value.trim()
  const addDOBValidation = document.getElementById("DOBValidation")
  const genderValidation = document.getElementById("GenderValidation")

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const phonePattern = /^\d{10}$/
  const namePattern = /^[a-zA-Z]+$/

  const passwordPattern = new RegExp("(?=.*[a-z])" + "(?=.*[A-Z])" + "(?=.*\\d)" + "(?=.*[^a-zA-Z0-9])" + ".{8,}")

  let isValid = true




  // checking  inputed values valid or not


  if (gender) {
    genderValidation.textContent = ``
  }
  else {
    genderValidation.textContent = `Please select a gender`
    isValid = false
  }
  if (dobValue === ``) {
    addDOBValidation.textContent = `Please select Date of Birth`
    isValid = false
  }
  if (!phonePattern.test(phone)) {
    document.getElementById("MobileValidation").textContent = "Phone number should be 10 digits"
    isValid = false
  }
  if (!emailPattern.test(email)) {
    document.getElementById("emailaddValidation").textContent = "Please enter a valid email id"
    isValid = false
  }
  if (!namePattern.test(firstName)) {
    document.getElementById("FirstnameValidation").textContent = "Enter valid first name"
    isValid = false
  }
  if (!namePattern.test(lastName)) {
    document.getElementById("LastnameValidation").textContent = "Enter valid last name"
    isValid = false
  }
  if (!passwordPattern.test(password)) {
    document.getElementById("PasswordValidation").textContent = "password should contain atleast 8 character with number, symbol, capital and small letters"
    isValid = false
  }
  if (salutation === ``) {
    document.getElementById("SalutationValidation").textContent = "Please select a salutation"
    isValid = false
  }
  if (username === ``) {
    document.getElementById("userNameValidation").textContent = "Enter a User name"
    isValid = false
  }
  if (qualification === ``) {
    document.getElementById("QualificationValidation").textContent = "Enter qualification"
    isValid = false
  }
  if (address === ``) {
    document.getElementById("AddressValidation").textContent = "Enter address"
    isValid = false
  }
  if (state === ``) {
    document.getElementById("stateValidation").textContent = "select a state"
    isValid = false
  }
  if (country === ``) {
    document.getElementById("CountryValidation").textContent = "select a country"
    isValid = false
  }
  if (city === ``) {
    document.getElementById("cityValidation").textContent = "Enter city"
    isValid = false
  }
  if (pinZip === ``) {
    document.getElementById("pinzipValidation").textContent = "Enter Pin / Zip code"
    isValid = false
  }
  return isValid
}


// clear addForm input fields when clicking add employee Btn /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

addEmployeeBtn.addEventListener("click", () => {
  clearInputAnderrorMsg()
})


// function to clearInputFields //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function clearInputAnderrorMsg() {
  document.getElementById("salutation").value = ``
  document.getElementById("firstName").value = ``
  document.getElementById("lastName").value = ``
  document.getElementById("email").value = ``
  document.getElementById("phoneNo").value = ``
  document.getElementById("userName").value = ``
  document.getElementById("password").value = ``
  document.getElementById("qualifications").value = ``
  document.getElementById("address").value = ``
  document.getElementById("country").value = ``
  document.getElementById("state").value = ``
  document.getElementById("city").value = ``
  document.getElementById("pinZip").value = ``

  document.getElementById("dob").value = ``
  const male = document.getElementById("male")
  const female = document.getElementById("female")

  document.querySelectorAll(".addValidation").forEach(erroMsg => {
    erroMsg.textContent = ``
  })

  const preview = document.getElementById("avatarimg")
  preview.src = ``
  preview.style.width = ``
  preview.style.height = ``
  document.getElementById("placeholdderImageUploadLabel").style.width = ``
  document.getElementById("bg-upload").querySelectorAll(".upload-bg").forEach(element => {
    element.style.display = ``
  });
}






// function to passId to delete and edit //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function passId(id) {






  document.getElementById("imgDel").addEventListener("change", () => {
    document.getElementById("editImagePreview").src = `api/public/default-avatar.jpg`
    let validate = editValidation()
    if (!validate) {
      return
    }
    else {
      document.getElementById("EditSubmit").addEventListener("click", () => {
        console.log(id);

      })
    }
  })






  // delete when clicking delete Btn with passed id //////////////////////////////////////////////////////////////////////////
  delSubmitBtn.addEventListener("click", async () => {
    let response = await fetch(`${fetchURL}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
    if (!response.ok) {
      console.log(); ("Could not deleted")
    }
    let data = await response.json()
    console.log(data);

    $("#exampleModa3").modal("hide")
    simulateTask("deleted", "success")
    fetchData()
  })


  // add the correct values to correspond input fields for correspondent employee /////////////////////////////////

  initializeEmployee(id)
  async function initializeEmployee(id) {
    try {
      let response = await fetch(`${fetchURL}/${id}`)
      if (!response.ok) {
        throw new Error("Could not fetch resources")
      }
      else {
        let data = await response.json()

        document.getElementById("salutationEdit").value = data.salutation
        document.getElementById("firstNameEdit").value = data.firstName
        document.getElementById("lastNameEdit").value = data.lastName
        document.getElementById("emailEdit").value = data.email
        document.getElementById("phoneNoEdit").value = data.phone
        document.getElementById("userNameEdit").value = data.username
        document.getElementById("passwordEdit").value = data.password
        document.getElementById("qualificationsEdit").value = data.qualifications
        document.getElementById("addressEdit").value = data.address
        document.getElementById("countryEdit").value = data.country
        document.getElementById("stateEdit").value = data.state
        document.getElementById("cityEdit").value = data.city
        document.getElementById("pinZipEdit").value = data.pin

        let [day, month, year] = data.dob.split("-")
        let newDOB = `${year}-${month}-${day}`
        document.getElementById("dobEdit").value = newDOB
        document.querySelector(`input[name="Editgender"][value='${data.gender}']`).checked = true

        editImagePreview.src = `${fetchURL}/${id}/avatar`
      }
    }
    catch (error) {
      console.error(error);
    }
  }




  // edit when clicking edit btn with passed id ////////////////////////////////////////////////////////////////////////////////////


  editSubmitBtn.addEventListener("click", () => {
    let validate = editValidation()
    if (!validate) {
      return
    }
    else {
      editPostData(id)
    }
  })
}







// function to edit employee //////////////////////////////////////////////////////////////////////////////////

async function editPostData(id) {
  try {

    setTimeout(async () => {
      const userImg = document.getElementById("Editformupload")
      const imgObject = new FormData()
      imgObject.append(`avatar`, userImg.files[0])

      const imgResponse = await fetch(`${fetchURL}/${id}/avatar`, {
        method: "POST",
        body: imgObject
      })

      if (!imgResponse.ok) {
        throw new Error("Could not edit image")
      }
      else {
        const imgData = await imgResponse.json()
      }
    }, 100);



    setTimeout(async () => {

      const salutationEdit = document.getElementById("salutationEdit").value
      let firstNameEdit = document.getElementById("firstNameEdit").value
      firstNameEdit = firstNameEdit.charAt(0).toUpperCase() + firstNameEdit.slice(1)
      let lastNameEdit = document.getElementById("lastNameEdit").value
      lastNameEdit = lastNameEdit.charAt(0).toUpperCase() + lastNameEdit.slice(1)
      const emailEdit = document.getElementById("emailEdit").value
      const phoneNoEdit = document.getElementById("phoneNoEdit").value
      const userNameEdit = document.getElementById("userNameEdit").value
      const passwordEdit = document.getElementById("passwordEdit").value
      const qualificationsEdit = document.getElementById("qualificationsEdit").value
      const addressEdit = document.getElementById("addressEdit").value
      const countryEdit = document.getElementById("countryEdit").value
      const stateEdit = document.getElementById("stateEdit").value
      const cityEdit = document.getElementById("cityEdit").value
      const pinZipEdit = document.getElementById("pinZipEdit").value

      // let Editgender = document.querySelector(`input=[name="Editgender"]:checked`).value
      const Editgender = document.querySelector(`input[name="Editgender"]:checked`).value
      const dobEdit = document.getElementById("dobEdit").value
      let [year, month, day] = dobEdit.split("-")
      const newDOB = `${day}-${month}-${year}`

      const EditUserData = {
        salutation: salutationEdit,
        firstName: firstNameEdit,
        lastName: lastNameEdit,
        email: emailEdit,
        phone: phoneNoEdit,
        dob: newDOB,
        gender: Editgender,
        qualifications: qualificationsEdit,
        address: addressEdit,
        city: cityEdit,
        state: stateEdit,
        pin: pinZipEdit,
        country: countryEdit,
        username: userNameEdit,
        password: passwordEdit
      }

      const response = await fetch(`${fetchURL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(EditUserData)
      })
      if (!response.ok) {
        throw new Error("Could not edit employee")
      }
      else {
        const data = await response.json()

        $("#exampleModa2").modal("hide")
        fetchData()
        simulateTask("edited", "success")
      }
    }, 500);



  }
  catch (error) {
    console.log(error);
  }
}




function editValidation() {

  const salutationVal = document.getElementById("salutationEdit")
  const firstNameVal = document.getElementById("firstNameEdit")
  const lastNameVal = document.getElementById("lastNameEdit")
  const emailVal = document.getElementById("emailEdit")
  const phoneVal = document.getElementById("phoneNoEdit")
  const usernameVal = document.getElementById("userNameEdit")
  const passwordVal = document.getElementById("passwordEdit")
  const qualificationVal = document.getElementById("qualificationsEdit")
  const addressVal = document.getElementById("addressEdit")
  const countryVal = document.getElementById("countryEdit")
  const stateVal = document.getElementById("stateEdit")
  const cityVal = document.getElementById("cityEdit")
  const pinZipVal = document.getElementById("pinZipEdit")
  const dobVal = document.getElementById("dobEdit")



  // this input events helps to realtime verify for correct values else error shows


  salutationVal.addEventListener("input", () => {
    document.getElementById("salutationEditV").textContent = ``
    if (salutationVal.value === ``) {
      document.getElementById("salutationEditV").textContent = "Please select a salutation"
    }
  })

  firstNameVal.addEventListener("input", () => {
    document.getElementById("firstNameEditV").textContent = ``
    if (!namePattern.test(firstNameVal.value)) {
      document.getElementById("firstNameEditV").textContent = "Please enter a first name"
    }
  })

  lastNameVal.addEventListener("input", () => {
    document.getElementById("lastNameEditV").textContent = ``
    if (!namePattern.test(lastNameVal.value)) {
      document.getElementById("lastNameEditV").textContent = "Please enter a last name"
    }
  })

  dobVal.addEventListener("input", () => {
    editDobValidation.textContent = ``
    if (dobVal.value === ``) {
      editDobValidation.textContent = "Please select a DOB"
    }
  })

  emailVal.addEventListener("input", () => {
    document.getElementById("emailEditV").textContent = ``
    if (!emailPattern.test(emailVal.value)) {
      document.getElementById("emailEditV").textContent = "Please enter a valid email"
    }
  })

  phoneVal.addEventListener("input", () => {
    document.getElementById("phoneEditV").textContent = ``
    if (!phonePattern.test(phoneVal.value)) {
      document.getElementById("phoneEditV").textContent = "Phone number should contain 10 digits"
    }
  })

  qualificationVal.addEventListener("input", () => {
    document.getElementById("qualifEditV").textContent = ``
    if (qualificationVal.value === ``) {
      document.getElementById("qualifEditV").textContent = "Please enter your qualifications"
    }
  })

  addressVal.addEventListener("input", () => {
    document.getElementById("addressEditV").textContent = ``
    if (addressVal.value === ``) {
      document.getElementById("addressEditV").textContent = "Please enter address"
    }
  })

  cityVal.addEventListener("input", () => {
    document.getElementById("cityEditV").textContent = ``
    if (cityVal.value === ``) {
      document.getElementById("cityEditV").textContent = "Please enter city"
    }
  })

  stateVal.addEventListener("input", () => {
    document.getElementById("stateEditV").textContent = ``
    if (stateVal.value === ``) {
      document.getElementById("stateEditV").textContent = "Please select a state"
    }
  })

  pinZipVal.addEventListener("input", () => {
    document.getElementById("pinzipEditV").textContent = ``
    if (pinZipVal.value === ``) {
      document.getElementById("pinzipEditV").textContent = "Please enter pin"
    }
  })

  countryVal.addEventListener("input", () => {
    document.getElementById("countryEditV").textContent = ``
    if (countryVal.value === ``) {
      document.getElementById("countryEditV").textContent = "Please select a country"
    }
  })

  usernameVal.addEventListener("input", () => {
    document.getElementById("usernameEditV").textContent = ``
    if (usernameVal.value === ``) {
      document.getElementById("usernameEditV").textContent = "Please enter a user name"
    }
  })

  passwordVal.addEventListener("input", () => {
    document.getElementById("passwordEditV").textContent = ``
    if (!passwordPattern.test(passwordVal.value)) {
      document.getElementById("passwordEditV").textContent = "password should contain atleast 8 character with number, symbol, capital and small letters"
    }
  })



  const firstName = firstNameVal.value.trim()
  const lastName = lastNameVal.value.trim()
  const salutation = salutationVal.value.trim()
  const email = emailVal.value.trim()
  const phone = phoneVal.value.trim()
  const username = usernameVal.value.trim()
  const password = passwordVal.value.trim()
  const qualification = qualificationVal.value.trim()
  const address = addressVal.value.trim()
  const country = countryVal.value.trim()
  const state = stateVal.value.trim()
  const city = cityVal.value.trim()
  const pinzip = pinZipVal.value.trim()
  const dob = dobVal.value.trim()

  const editDobValidation = document.getElementById("editDobValidation")

  const gender = document.querySelector(`input[name="Editgender"]:checked`)
  const genderEditValidation = document.getElementById("editGenderValidation")

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const phonePattern = /^\d{10}$/
  const namePattern = /^[a-zA-Z]+$/
  const passwordPattern = new RegExp("(?=.*[a-z])" + "(?=.*[A-Z])" + "(?=.*\\d)" + "(?=.*[^a-zA-Z0-9])" + ".{8,}")
  let isValid = true


  if (gender) {
    genderEditValidation.textContent = ""
  }
  else {
    genderEditValidation.textContent = "Please select a gender"
    isValid = false
  }


  if (dob === ``) {
    editDobValidation.textContent = "Please select a DOB"
    isValid = false
  }

  if (!namePattern.test(firstName)) {
    document.getElementById("firstNameEditV").textContent = "Please enter a first name"
    isValid = false
  }

  if (!namePattern.test(lastName)) {
    document.getElementById("lastNameEditV").textContent = "Please enter a last name"
    isValid == false
  }
  if (!passwordPattern.test(password)) {
    document.getElementById("passwordEditV").textContent = "password should contain atleast 8 character with number, symbol, capital and small letters"
    isValid = false
  }

  if (!phonePattern.test(phone)) {
    document.getElementById("phoneEditV").textContent = "Phone number should contain 10 digits"
    isValid = false
  }

  if (!emailPattern.test(email)) {
    document.getElementById("emailEditV").textContent = "Please enter a valid email"
    isValid = false
  }

  if (salutation === ``) {
    document.getElementById("salutationEditV").textContent = "Please select a salutation"
    isValid = false
  }

  if (username === ``) {
    document.getElementById("usernameEditV").textContent = "Please enter a user name"
    isValid = false
  }

  if (qualification === ``) {
    document.getElementById("qualifEditV").textContent = "Please enter your qualifications"
    isValid = false
  }

  if (address === ``) {
    document.getElementById("addressEditV").textContent = "Please enter address"
    isValid = false
  }

  if (country === ``) {
    document.getElementById("countryEditV").textContent = "Please select a country"
    isValid = false
  }

  if (state === ``) {
    document.getElementById("stateEditV").textContent = "Please select a state"
    isValid = false
  }

  if (city === ``) {
    document.getElementById("cityEditV").textContent = "Please enter city"
    isValid = false
  }

  if (pinzip === ``) {
    document.getElementById("pinzipEditV").textContent = "Please enter pin"
    isValid = false
  }

  return isValid

}




function EditavatarPreview() {
  const editPreview = document.getElementById("editImagePreview")
  editPreview.src = URL.createObjectURL(event.target.files[0])
}