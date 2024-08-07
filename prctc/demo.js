

//fetching data from api
//-------------------------------------------------------------------------------
let fetchUrl = "http://localhost:3000/employees";
let userdatas = [];
let curentpage = 1;
let employesperpage = parseInt(document.getElementById('emply_perpage').value)
let table_body = document.getElementById('table_body')



const fetchdata = async () => {
    const res = await fetch(fetchUrl);
    const data = await res.json();
    userdatas = data.reverse();
    document.getElementById('emply_perpage').addEventListener('change', () => {
        employesperpage = parseInt(document.getElementById('emply_perpage').value)
        getdata(curentpage = 1)
        pagination()
        highlightbtn(curentpage)
    })

    getdata(curentpage)
    pagination()
    highlightbtn(curentpage)
}

fetchdata();

let inputfile = document.getElementById('image_uploads')
let profilepic = document.getElementById('imguploading')
inputfile.onchange = function () {
    profilepic.src = URL.createObjectURL(inputfile.files[0])
}

//DISPLAY dATA TO TABLE
//-------------------------------------------------------------------------------
function getdata(page) {

    let start = (page - 1) * employesperpage;
    let end = start + employesperpage;
    let finaldata = userdatas.slice(start, end)
    let i = start
    let tabledata = "";

    finaldata.map((value) => {
        // console.log(`${fetchUrl}/${value.id}/avatar`);
        i++
        let slNo = i > 9 ? `#${i}` : `#0${i}`
        tabledata += `<tr>
      <th scope="row">${slNo}</th>
      <td><img class="img_uploadings" src="${fetchUrl}/${value.id}/avatar"> ${value.salutation}.${value.firstName} ${value.lastName}</td>
      <td>${value.email}</td>
      <td>${value.phone}</td>
      <td>${value.gender}</td>
      <td>${value.dob}</td>
      <td>${value.country}</td>
      <td><div class="dropdown">
      <button class="btn drp  type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-ellipsis"></i>
      </button>
      <ul class="dropdown-menu drpmenutd" aria-labelledby="dropdownMenuButton1">
      <li onclick="view_employee('${value.id}')"><a class="dropdown-item" href="view.html?id=${value.id}"><i class="ri-eye-line"></i></i>view details</a></li>
      <li onclick="update_employee('${value.id}')"><a class="dropdown-item" href="#"><i class="ri-pencil-line"></i>Edit</a></li>
      <li onclick="deleteemp('${value.id}')"><a class="dropdown-item" href="#"><i class="ri-delete-bin-6-line"></i>delete</a></li>
      </ul>
      </div></td>
      </tr>`
    });
    document.getElementById("table_body").innerHTML = tabledata;
    document.getElementById("totalitems").textContent = userdatas.length
};


//PAGINATION 
//--------------------------------------------------------------------------------------

let paginationul = document.getElementById('paginationUl')
function pagination() {
    const totalpages = Math.ceil(userdatas.length / employesperpage)
    paginationul.innerHTML = ''

    //fastback button
    const fastback = document.createElement('li');
    paginationul.appendChild(fastback)
    // fastback.classList.add('page-item')
    fastback.innerHTML = `<a class="page-link"><<</a>`
    fastback.addEventListener('click', () => {
        getdata(curentpage = 1)
        highlightbtn()
    })
    //previous button
    const prevbtn = document.createElement('li')
    paginationul.appendChild(prevbtn)
    prevbtn.classList.add('page-item')
    prevbtn.innerHTML = `<a class="page-link"><</a>`
    prevbtn.addEventListener('click', () => {
        if (curentpage !== 1) {
            curentpage--
        }
        else {
            curentpage = 1
        }
        getdata(curentpage)
        highlightbtn()
    })

    //function for button creating

    for (let i = 1; i <= totalpages; i++) {
        let page = document.createElement('li')
        paginationul.appendChild(page)
        page.classList.add('page-item')
        page.innerHTML = `<a class="page-link">${i}</a>`
        page.addEventListener('click', () => {
            getdata(curentpage = i)
            highlightbtn()
        })
    }

    //next button////
    const nextbtn = document.createElement('li')
    paginationul.appendChild(nextbtn)
    nextbtn.classList.add('page-item')
    nextbtn.innerHTML = `<a class="page-link">></a>`
    nextbtn.addEventListener('click', () => {
        if (curentpage !== totalpages) {
            curentpage++
        }
        else {
            curentpage = totalpages
        }
        getdata(curentpage)
        highlightbtn()
    })

    //fastforward button//////
    const fastForward = document.createElement('li')
    paginationul.appendChild(fastForward)
    fastForward.classList.add('page-item')
    fastForward.innerHTML = `<a class="page-link">>></a>`
    fastForward.addEventListener('click', () => {
        getdata(curentpage = totalpages)
        highlightbtn()
    })

}

// highlight current page in pagination //////////////////

function highlightbtn() {
    paginationul.querySelectorAll('li').forEach(btn => {
        if (btn.textContent == curentpage)
            btn.classList.add('active')
        else {
            btn.classList.remove('active')
        }
    })


    if (userdatas.length <= employesperpage) {
        paginationhide()
    } else {
        paginationshow()
    }
}

//PAGINATION HIDE/////////////

function paginationhide() {
    paginationul.querySelectorAll("li").forEach(item => {
        item.style.display = "none"
    })
}

//PAGINATION SHOW/////////////

function paginationshow() {
    paginationul.querySelectorAll("li").forEach(item => {
        item.style.display = ""
    })
}

//sweet alert popup
//-------------------------------------------
function popupmessage(msg, icon) {
    setTimeout(() => {

        Swal.fire({
            title: `Employee ${msg}`,
            text: `Employee ${msg} `,
            icon: `${icon}`
        })


    }, 500);
}







//ADDING EMPLOYEE
//--------------------------------------------------------------------------------------
function displaydata() {
    document.getElementById("addemployee").style.display = "block";
    document.getElementById("overlay").style.display = "block";

}

let over = document.getElementById("add_emp_data");
over.addEventListener("click", () => {
    displaydata();

});

document.getElementById("close").addEventListener("click", () => {
    closefunc();
    validationclear()
});

function closefunc() {
    document.getElementById("addemployee").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

document.getElementById('cancel').addEventListener('click', () => {
    closefunc();
    validationclear()
})


function empdata() {
    let salutation = document.getElementById("Salutation").value;
    let firstName = document.getElementById("addfirstname").value;
    let lastName = document.getElementById("addlastname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let dob = document.getElementById("date").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    let qualifications = document.getElementById("qualifications").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let country = document.getElementById("country").value;
    let username = document.getElementById("addusername").value;
    let password = document.getElementById("addpassword").value;
    let pin = document.getElementById("pin").value;

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

    add_empdata(newempdata);
}

async function add_empdata(newempdata) {
    try {
        let response = await fetch(fetchUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newempdata),
        })
        if (!response.ok) {
            throw new Error('could not add employee')
        }
        let data = await response.json() // Parse JSON response
        console.log(data)
        let inputfile = document.getElementById('image_uploads');
        let formdata = new FormData();
        formdata.append("avatar", inputfile.files[0]);

        let Imgresponse = await fetch(`${fetchUrl}/${data.id}/avatar`, {
            method: "POST",
            body: formdata,
        })
        // if (!Imgresponse.ok) {
        //     throw new Error("Could not upload employee avatar")
        // }
        let imgdata = Imgresponse.json()

        console.log("Avatar uploaded sucessfully");
        newempdata.id = data.id;
        userdatas.unshift(newempdata)
        getdata(1)
        popupmessage("added succesfully", "success")

    }
    catch (error) {
        popupmessage("failed to add", "error")
    }


}


//update employee
//-----------------------------------------------------------------------------------

let inputfileedit = document.getElementById('image_upload_edit')  //image updating 
let profilepicedit = document.getElementById('edit_image')

inputfileedit.onchange = function () {
    profilepicedit.src = URL.createObjectURL(inputfileedit.files[0])

}

function updateclose() {
    document.getElementById("editemployee").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

document.getElementById("upclose").addEventListener("click", () => {
    editclose();
});

document.getElementById('editcancelbtn').addEventListener('click', () => {
    editclose();
})

function editclose() {
    document.getElementById("editemployee").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}


let filtereddata;

function update_employee(empid) {
    document.getElementById("editemployee").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    let filldata = userdatas.filter(element => element.id == empid);

    filtereddata = filldata[0];

    document.getElementById('edit_image').src = `http://localhost:3000/employees/${empid}/avatar`;
    document.getElementById("editsalutation").value = filtereddata.salutation;
    document.getElementById("editfirstname").value = filtereddata.firstName;
    document.getElementById("editlastname").value = filtereddata.lastName;
    document.getElementById("editemail").value = filtereddata.email;
    document.getElementById("editphone").value = filtereddata.phone;
    document.getElementById("editqualifications").value = filtereddata.qualifications;
    document.getElementById("editaddress").value = filtereddata.address;
    document.getElementById("editcity").value = filtereddata.city;
    document.getElementById("editstate").value = filtereddata.state;
    document.getElementById("editcountry").value = filtereddata.country;
    document.getElementById("editusername").value = filtereddata.username;
    document.getElementById("editpassword").value = filtereddata.password;
    document.getElementById("editpin").value = filtereddata.pin;
    document.querySelector(`input[name="editgender"][value='${filtereddata.gender}']`).checked = true;

    //dob
    let [day, month, year] = filtereddata.dob.split("-");
    let newdob = `${year}-${month}-${day}`;
    document.getElementById("editdate").value = newdob;
    console.log("hello", filtereddata);

    let updateemployee = document.getElementById('save');
    updateemployee.addEventListener('click', async function handler() {
        const editvalidationresult = addValidationedit();
        if (!editvalidationresult) {
            return;
        } else {
            const isUpdated = await saveemployee(empid);
            if (isUpdated) {
                Swal.fire({
                    title: "Employee data edited successfully!",
                    text: "You clicked the button!",
                    icon: "success"
                });
            } else {
                console.log("No changes detected, not updating.");
            }
            getdata(1);
            editclose();
            updateemployee.removeEventListener('click', handler);
        }
    });
}

async function saveemployee(empid) {
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

    const isDataChanged = !datacheck(newempdata, filtereddata);
    let isUpdated = false;

    if (isDataChanged) {
        await fetch(`http://localhost:3000/employees/${empid}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newempdata),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Successfully saved", data);
                userdatas = userdatas.map(user => user.id === empid ? { ...user, ...newempdata } : user);
                fetchdata(); // Refresh data after update
                isUpdated = true;
            })
            .catch(error => {
                console.error("Error updating employee:", error);
            });
    }

    const isImageUploaded = await uploadImage(empid);
    return isUpdated || isImageUploaded;
}

async function uploadImage(empid) {
    let inputfileedit = document.getElementById('image_upload_edit');
    if (inputfileedit.files.length > 0) {
        let formdata = new FormData();
        formdata.append("avatar", inputfileedit.files[0]);
        try {
            const response = await fetch(`http://localhost:3000/employees/${empid}/avatar`, {
                method: "POST",
                body: formdata,
            });
            const data = await response.json();
            console.log("Image uploaded successfully", data);
            // Force reload the image by updating the src attribute with a timestamp
            document.getElementById('edit_image').src = `http://localhost:3000/employees/${empid}/avatar?${new Date().getTime()}`;
            return true;
        } catch (error) {
            console.error("Error uploading image:", error);
            return false;
        }
    } else {
        return false; // No image to upload
    }
}

function datacheck(obj1, obj2) {
    let obj2copy = { ...obj2 }; // Create a shallow copy to avoid mutation
    delete obj2copy['avatar'];  // Remove properties not included in the new data
    delete obj2copy['id'];

    return JSON.stringify(obj1) === JSON.stringify(obj2copy);
}



//delete employee
//--------------------------------------------------------------------------------
document.getElementById("deleteclose").onclick = function () {
    deleteclose();
};

function deleteclose() {
    document.getElementById("delete_employee").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function deleteemp(empid) {
    document.getElementById("delete_employee").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    const delete_em = document.getElementById("deletedetails");
    delete_em.addEventListener("click", function deletem() {
        delete_employee_data(empid);
        delete_em.removeEventListener('click', deletem)
    });
}

const delete_employee_data = async (empid) => {
    let newid = empid;
    let indexid = userdatas.findIndex(person => person.id == newid)
    const res = await fetch(`${fetchUrl}/${empid}`, {
        method: "DELETE",
    })
    const data = await res.json();
    console.log("succesfully saved ", data);
    deleteclose();
    userdatas.splice(indexid, 1)
    // window.location.href = "index.html";

}



//search bar
//------------------------------------------------------------------------------------

let serchResultNo = document.getElementById('serchResultNo')
function search() {
    const searchdata = document.getElementById('searchinput').value;
    const rows = document.getElementsByTagName('tr')
    const thead = document.getElementById('tablerow')
    const tablehead = document.getElementById('tablehead')
    let totalsearch = 0;
    let found = false
    employesperpage = searchdata == `` ? parseInt(document.getElementById('emply_perpage').value) : userdatas.length;
    getdata(curentpage = 1)
    for (let i = 1; i < rows.length; i++) {
        if (!rows[i].textContent.toLowerCase().includes(searchdata)) {
            rows[i].style.display = "none"
        } else {
            rows[i].style.display = ""
            found = true
            totalsearch++
        }
    }
    if (!found) {
        thead.querySelectorAll('th').forEach(element => {
            element.style.display = "none"
        })
        const notfound = document.createElement('tr')
        table_body.appendChild(notfound)
        notfound.innerHTML = `<td class="colo-r text-center">"${searchdata}" not found</td>`
        serchResultNo.style.display = 'none'

    }
    else {
        tablehead.classList.add('scrollbar-hidden')
        tablehead.style.overflowY = "auto"
        tablehead.classList.add("scrolling-height")
        tablehead.querySelector("thead").querySelectorAll("th").forEach(element => {
            element.style.position = "sticky"
            element.style.top = "0"
        });
    }
    if (searchdata == '') {
        let table_head = document.querySelector('#tablerow').querySelectorAll('th').forEach(element => {
            element.style.display = ``
        })
    }
}



// validation

let validbtn = document.getElementById('addempdetails');
validbtn.addEventListener('click', () => {

    const validationresult = addValidation();
    if (!validationresult) {
        return
    }
    else {
        empdata()
        closefunc();
    }

})



function addValidation() {
    const salutation = document.getElementById("Salutation").value.trim();
    const firstName = document.getElementById("addfirstname").value.trim();
    const lastName = document.getElementById("addlastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    // gender
    const gender = document.querySelector('input[name="gender"]:checked')
    const gender_addValidation = document.getElementById("gender-error")
    const qualifications = document.getElementById("qualifications").value.trim();
    const address = document.getElementById("address").value.trim();
    const country = document.getElementById("country").value.trim();
    const state = document.getElementById("state").value.trim();
    const city = document.getElementById("city").value.trim();
    const pin = document.getElementById("pin").value.trim();
    const username = document.getElementById("addusername").value.trim();
    const password = document.getElementById("addpassword").value.trim();
    // dob
    const dob = document.getElementById("date")
    const dob_addValidation = document.getElementById("date-error")
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
        Valid = false;
    }
    // validation of form ...
    if (salutation == "" || salutation == "select") {
        document.getElementById('salutation-error').textContent = "salutation is required";
        Valid = false;
    }
    if (!namePattern.test(firstName)) {
        document.getElementById('firstname-error').textContent = "First Name is required"
    }
    if (!namePattern.test(lastName)) {
        document.getElementById('lastname-error').textContent = "Last Name is required"
        Valid = false;
    }
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = "Email is required"
        Valid = false;
    }
    if (!phonePattern.test(phone)) {
        document.getElementById('phone-error').textContent = "Phone is required"
        Valid = false;
    }
    if (qualifications == "") {
        document.getElementById('qualification-error').textContent = "Qualifications are required"
        Valid = false;
    }
    if (address == "") {
        document.getElementById('address-error').textContent = "Address is required"
        Valid = false;
    }
    if (country == "" || country == "select") {
        document.getElementById('country-error').textContent = "Country is required"
        Valid = false;
    }
    if (state == "" || state == "select") {
        document.getElementById('state-error').textContent = "State is required"
        Valid = false;
    }
    if (city == "") {
        document.getElementById('city-error').textContent = "City is required"
        Valid = false;
    }
    if (username == "") {
        document.getElementById('username-error').textContent = "*Username is required"
        Valid = false;
    }
    if (password == "") {
        document.getElementById('password-error').textContent = "Password is required"
        Valid = false;
    }
    if (!pinpattern.test(pin)) {
        document.getElementById('pin-error').textContent = "pin is required"
        Valid = false;
    }
    // validation of gender
    const male = document.getElementById("male")
    const female = document.getElementById("female")
    male.addEventListener("click", () => {
        document.getElementById("gender-error").textContent = "";
    })
    female.addEventListener("click", () => {
        document.getElementById("gender-error").textContent = "";
    })
    formid.addEventListener('submit', (event) => {

        event.preventDefault(); // Prevent form submission if email is invalid

    });
    return Valid;

}



function validationclear() {

    // Clear the error message
    document.getElementById('firstname-error').innerHTML = "";
    document.getElementById('lastname-error').innerHTML = "";
    document.getElementById('password-error').innerHTML = "";
    document.getElementById('salutation-error').innerHTML = ""
    document.getElementById('phone-error').innerHTML = ""
    document.getElementById('pin-error').innerHTML = ""
    document.getElementById("state-error").innerHTML = ""
    document.getElementById("country-error").innerHTML = ""
    document.getElementById("qualification-error").innerHTML = ""
    document.getElementById("address-error").innerHTML = ""
    document.getElementById('city-error').innerHTML = ""
    document.getElementById('username-error').innerHTML = ""
    document.getElementById('gender-error').innerHTML = ""
    document.getElementById('date-error').innerHTML = ""
    document.getElementById('email-error').innerHTML = ""

    document.getElementById('addfirstname').value = "";
    document.getElementById("addlastname").value = "";
    document.getElementById("addpassword").value = "";
    document.getElementById("Salutation").value = "select";
    document.getElementById("state").value = "select";
    document.getElementById("country").value = "select";
    document.getElementById("qualifications").value = "";
    document.getElementById("address").value = "";
    document.getElementById('phone').value = "";
    document.getElementById('pin').value = "";
    document.getElementById('city').value = "";
    document.getElementById('addusername').value = ""
    document.getElementById('date').value = ""
    document.getElementById('email').value = ""

}




// clear error message after typed
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addemployee').addEventListener('input', (event) => {
        const input = event.target; // Get the input that triggered the event
        const errorMessage = input.parentElement.querySelector('.text-danger'); // Get the corresponding error message

        if (input && errorMessage) {
            errorMessage.textContent = ""; // Clear the error message
        }
    });
    formid.addEventListener('submit', (event) => {

        event.preventDefault(); // Prevent form submission if email is invalid

    });

});





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
    formid.addEventListener('submit', (event) => {

        event.preventDefault(); // Prevent form submission if email is invalid

    });
    return Valid;

}


// clear error message after typed
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('editemployee').addEventListener('input', (event) => {
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