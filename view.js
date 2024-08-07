
const url = new URL(window.location.href)
let id = url.searchParams.get('id')
console.log("received ", id);


let alldata = [];
viewEmployee(id);



function populateData(data) {

  let alldata = data;
  let name = `${alldata.salutation} ${alldata.firstName} ${alldata.lastName}`;
  let details = `${alldata.address} ${alldata.country} ${alldata.state} ${alldata.pin} `;
  document.getElementById('user_image').src = `http://localhost:3000/employees/${id}/avatar`
  document.getElementById('viewname').innerHTML = name
  document.getElementById('viewemail').innerHTML = alldata.email
  document.getElementById('viewgender').innerHTML = alldata.gender
  document.getElementById('viewdob').innerHTML = alldata.dob
  document.getElementById('viewphone').innerHTML = alldata.phone
  document.getElementById('viewqualification').innerHTML = alldata.qualifications
  document.getElementById('viewaddress').innerHTML = details
  document.getElementById('viewusername').innerHTML = alldata.username



}


function viewEmployee(id) {
  try {


    fetch(`http://localhost:3000/employees/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },

    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        alldata = data
        console.log("succesfully data saved", alldata);
        populateData(alldata);
        //age
        let [day, month, ageyear] = alldata.dob.split("-");
        const newyear = `${ageyear}`;
        const date = new Date();
        let year = date.getFullYear();
        const age = Math.abs(newyear - year)
        document.getElementById('viewage').innerHTML = age
      })
  }
  catch (error) {
    popupMessage("cant fetch data right die to server issue")
  }
}

function editclose() {
  document.getElementById("editemployee_view").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("delete_employee_view").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}



//----------------------- UPDATE EMPLOYEE ------------------------------------//


let inputfileedit = document.getElementById('image_upload_edit')
let profilepicedit = document.getElementById('edit_image')

inputfileedit.onchange = function () {
  profilepicedit.src = URL.createObjectURL(inputfileedit.files[0])
}

function displaydata() {
  document.getElementById("editemployee_view").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

let over = document.getElementById("viewedit");
over.addEventListener("click", () => {
  displaydata();
});


document.getElementById("upclose").addEventListener("click", () => {
  editclose();
});

document.getElementById('editcancelbtn').addEventListener('click', () => {
  editclose();
})


let view = document.getElementById('viewedit');
view.addEventListener('click', () => {

  update_employee(id);
})

function update_employee(id) {

  document.getElementById("editemployee_view").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  try {
    fetch(`http://localhost:3000/employees/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      return res.json();
    }).then(data => {


      document.getElementById('edit_image').src = `http://localhost:3000/employees/${id}/avatar`
      document.getElementById("editsalutation").value = data.salutation;
      document.getElementById("editfirstname").value = data.firstName;
      document.getElementById("editlastname").value = data.lastName;
      document.getElementById("editemail").value = data.email;
      document.getElementById("editphone").value = data.phone;
      document.getElementById("editqualifications").value = data.qualifications;
      document.getElementById("editaddress").value = data.address;
      document.getElementById("editcity").value = data.city;
      document.getElementById("editstate").value = data.state;
      document.getElementById("editcountry").value = data.country;
      document.getElementById("editusername").value = data.username;
      document.getElementById("editpassword").value = data.password;
      document.getElementById("editpin").value = data.pin;
      let genderinput = document.querySelector(`input[name="editgender"][value='${data.gender}']`)
      if (genderinput) {
        genderinput.checked = true;
      }
      //dob
      if (data.dob) {
        let [day, month, year] = data.dob.split("-");
        let newdob = `${year}-${month}-${day}`;
        document.getElementById("editdate").value = newdob;
      } else {
        document.getElementById("editdate").value = ``
      }

    }).catch(error => {
      console.error(error)
    })
  } catch (error) {
    console.error(error)
  }
  let updateemployee = document.getElementById('viewsave');


  updateemployee.addEventListener('click', function view_edit() {
    const editvalidationresult = addValidationedit();
    if (!editvalidationresult) {
      return;
    } else {
      saveemployee(id);
      editclose();
      updateemployee.removeEventListener('click', view_edit)
    }
  });
}

function saveemployee(id) {

  let salutation = document.getElementById("editsalutation").value;
  let firstName = document.getElementById("editfirstname").value;
  let lastName = document.getElementById("editlastname").value;
  let email = document.getElementById("editemail").value;
  let phone = document.getElementById("editphone").value;
  let dob = document.getElementById("editdate").value;
  let gender = document.querySelector('input[name="editgender"]:checked').value;
  let qualifications = document.getElementById("editqualifications").value;
  let address = document.getElementById("editaddress").value;
  let city = document.getElementById("editcity").value;
  let state = document.getElementById("editstate").value;
  let country = document.getElementById("editcountry").value;
  let username = document.getElementById("editusername").value;
  let password = document.getElementById("editpassword").value;
  let pin = document.getElementById("editpin").value;

  let [year, month, day] = dob.split("-");
  let finaldate = `${day}-${month}-${year}`;

  const newempdata = {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    dob: finaldate,
    gender,
    qualifications,
    address,
    city,
    state,
    country,
    username,
    password,
    pin,
  };

  fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newempdata),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Successfully saved", data);

      // Update DOM with new data
      // document.getElementById('edit_image').src = `http://localhost:3000/employees/${id}/avatar`;
      // document.getElementById("editsalutation").value = data.salutation;
      // document.getElementById("editfirstname").value = data.firstName;
      // document.getElementById("editlastname").value = data.lastName;
      // document.getElementById("editemail").value = data.email;
      // document.getElementById("editphone").value = data.phone;
      // document.getElementById("editqualifications").value = data.qualifications;
      // document.getElementById("editaddress").value = data.address;
      // document.getElementById("editcity").value = data.city;
      // document.getElementById("editstate").value = data.state;
      // document.getElementById("editcountry").value = data.country;
      // document.getElementById("editusername").value = data.username;
      // document.getElementById("editpassword").value = data.password;
      // document.getElementById("editpin").value = data.pin;

      // let genderInput = document.querySelector(`input[name="editgender"][value='${data.gender}']`);
      // if (genderInput) {
      //   genderInput.checked = true;
      // }

      // if (data.dob) {
      //   let [day, month, year] = data.dob.split("-");
      //   let newdob = `${year}-${month}-${day}`;
      //   document.getElementById("editdate").value = newdob;
      // } else {
      //   document.getElementById("editdate").value = "";
      // }

      // Check if there is a file to upload
      let inputfile = document.getElementById('image_upload_edit');
      if (inputfile.files.length > 0) {
        uploadFile(inputfile, id);
      } else {
        Swal.fire({
          title: "Employee data edited successfully!",
          text: "You clicked the button!",
          icon: "success"
        });
        populateData(newempdata)

      }
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: `An error occurred: ${error.message}`,
        icon: "error"
      });
    });
}

function uploadFile(inputFile, id) {
  let formData = new FormData();
  formData.append("avatar", inputFile.files[0]);

  fetch(`http://localhost:3000/employees/${id}/avatar`, {
    method: 'POST',
    body: formData
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      Swal.fire({
        title: "Employee data edited successfully!",
        text: "You clicked the button!",
        icon: "success"
      });
      viewEmployee(id);
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: `An error occurred: ${error.message}`,
        icon: "error"
      });
    });
}


//--------------------- DELETE EMPLOYEE ----------------------------//

function viewdata() {
  document.getElementById("delete_employee_view").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

let vid = document.getElementById("viewdelete");
vid.addEventListener("click", () => {
  viewdata();
});


document.getElementById("delete_cancel").onclick = function () {
  editclose();
};



function deleteemp() {
  document.getElementById("delete_employee_view").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}
const delete_em = document.getElementById("viewdelete_data");
delete_em.addEventListener("click", () => {
  delete_employee_data(id);
});






const delete_employee_data = async (id) => {
  document.getElementById("delete_employee_view").style.display = "block";
  document.getElementById("overlay").style.display = "block";


  const res = await fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
  })
  const data = await res.json();
  console.log("succesfully saved ", data);
  delete_closefn()
  window.location.href = "index.html"
  window.onload();
}

document.getElementById("viewdeleteclose").onclick = function () {
  delete_closefn();
};

function delete_closefn() {
  document.getElementById("delete_employee_view").style.display = "none";
  document.getElementById("overlay").style.display = "none";

}
//-------------------- VALIDATION EMPLOYEE ---------------------------//
function addValidationedit() {
  const salutation = document.getElementById("editsalutation").value.trim();
  const firstName = document.getElementById("editfirstname").value.trim();
  const lastName = document.getElementById("editlastname").value.trim();
  const email = document.getElementById("editemail").value.trim();
  const phone = document.getElementById("editphone").value.trim();
  // gender
  const gender = document.querySelector('input[name="editgender"]:checked')
  const gender_addValidation = document.getElementById("editgender-error")
  const qualifications = document.getElementById("editqualifications").value.trim();
  const address = document.getElementById("editaddress").value.trim();
  const country = document.getElementById("editcountry").value.trim();
  const state = document.getElementById("editstate").value.trim();
  const city = document.getElementById("editcity").value.trim();
  const pin = document.getElementById("editpin").value.trim();
  const username = document.getElementById("editusername").value.trim();
  const password = document.getElementById("editpassword").value.trim();
  // dob
  const dob = document.getElementById("editdate")
  const dob_addValidation = document.getElementById("editdate-error")
  const dob_value = dob.value.trim();
  // patterns
  const namePattern = /^[A-za-z]+$/
  const phonePattern = /^\d{10}$/
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const pinpattern = /^\d{6}$/
  let Valid = true;
  // validation of dob & gender
  if (gender) {
    gender_addValidation.textContent = ""
    console.log("gender");
  }
  else {
    gender_addValidation.textContent = "gender is required"
    Valid = false;
  }
  if (dob_value === "") {
    dob_addValidation.textContent = "Date of Birth is required"

  }
  // validation of form ...
  if (salutation == "" || salutation == "select") {
    document.getElementById('editsalutation-error').textContent = "salutation is required";
    Valid = false;
  }
  if (!namePattern.test(firstName)) {
    document.getElementById('editfirstname-error').textContent = "First Name is required"
    Valid = false;
  }
  if (!namePattern.test(lastName)) {
    document.getElementById('editlastname-error').textContent = "Last Name is required"
    Valid = false;
  }
  if (!emailPattern.test(email)) {
    document.getElementById('editemail-error').textContent = "Email is required"
    Valid = false;
  }
  if (!phonePattern.test(phone)) {
    document.getElementById('editphone-error').textContent = "Phone is required"
    Valid = false;
  }
  if (!pinpattern.test(pin)) {
    document.getElementById('editpin-error').textContent = "Pin is required"
    Valid = false;
  }
  if (qualifications == "") {
    document.getElementById('editqualification-error').textContent = "Qualifications are required"
    Valid = false;
  }
  if (address == "") {
    document.getElementById('editaddress-error').textContent = "Address is required"
    Valid = false;
  }
  if (country == "" || country == "select") {
    document.getElementById('editcountry-error').textContent = "Country is required"
    Valid = false;
  }
  if (state == "" || state == "select") {
    document.getElementById('editstate-error').textContent = "State is required"
    Valid = false;
  }
  if (city == "") {
    document.getElementById('editcity-error').textContent = "City is required"
    Valid = false;
  }
  if (username == "") {
    document.getElementById('editusername-error').textContent = "*Username is required"
    Valid = false;
  }
  if (password == "") {
    document.getElementById('editpassword-error').textContent = "Password is required"
    Valid = false;
  }
  // validation of gender
  const male = document.getElementById("male")
  const female = document.getElementById("female")
  male.addEventListener("click", () => {
    document.getElementById("editgender-error").textContent = "";
  })
  female.addEventListener("click", () => {
    document.getElementById("editgender-error").textContent = "";
  })
  formedit.addEventListener('submit', (event) => {

    event.preventDefault(); // Prevent form submission if email is invalid

  });
  return Valid;

}


// clear error message after typed
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('editemployee_view').addEventListener('input', (event) => {
    const input = event.target; // Get the input that triggered the event
    const errorMessage = input.parentElement.querySelector('.text-danger'); // Get the corresponding error message

    if (input && errorMessage) {
      errorMessage.textContent = ""; // Clear the error message
    }
  });
  formedit.addEventListener('submit', (event) => {

    event.preventDefault(); // Prevent form submission if email is invalid

  });

});