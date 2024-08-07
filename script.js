const fetchUrl = "http://localhost:3000/employees";
let userDatas = [];
let originalData = [];
let currentPage = 1;
let employeesPerPage = parseInt(document.getElementById('emply_perpage').value);
let tableBody = document.getElementById('table_body');



//--------------- DATA FETCHING -----------------------//
const fetchData = async () => {
    const res = await fetch(fetchUrl);
    const data = await res.json();
    userDatas = data.reverse();
    originalData = [...userDatas]; // Store the original data

    document.getElementById('emply_perpage').addEventListener('change', () => {
        employeesPerPage = parseInt(document.getElementById('emply_perpage').value);
        updatePage(1);
    });

    updatePage(currentPage);
}

fetchData();

// IMAGE CHANGING

let inputFile = document.getElementById('image_uploads');
let profilePic = document.getElementById('imguploading');
inputFile.onchange = () => {
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
};

//--------------- UPDATE PAGE --------------------------//

function updatePage(page) {
    currentPage = page;
    renderTable(page);
    renderPagination();
    highlightCurrentPage();
}


//--------------- RENDER TABLE DATA -----------------------//

function renderTable(page) {
    let start = (page - 1) * employeesPerPage;
    let end = start + employeesPerPage;
    let finalData = userDatas.slice(start, end);

    let tableData = finalData.map((value, index) => {
        let slNo = index + start + 1;
        slNo = slNo > 9 ? `#${slNo}` : `#0${slNo}`;
        return `
            <tr>
                <th scope="row">${slNo}</th>
                <td><img class="img_uploadings" src="${fetchUrl}/${value.id}/avatar"> ${value.salutation}.${value.firstName} ${value.lastName}</td>
                <td>${value.email}</td>
                <td>${value.phone}</td>
                <td>${value.gender}</td>
                <td>${value.dob}</td>
                <td>${value.country}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn drp" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu drpmenutd" aria-labelledby="dropdownMenuButton1">
                            <li onclick="viewEmployee('${value.id}')"><a class="dropdown-item" href="view.html?id=${value.id}"><i class="ri-eye-line"></i>view details</a></li>
                            <li onclick="updateEmployee('${value.id}')"><a class="dropdown-item" href="#"><i class="ri-pencil-line"></i>Edit</a></li>
                            <li onclick="deleteEmployee('${value.id}')"><a class="dropdown-item" href="#"><i class="ri-delete-bin-6-line"></i>delete</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    tableBody.innerHTML = tableData;
    document.getElementById("totalitems").textContent = userDatas.length;
}


//--------------- PAGINATION FUNCTION -----------------------//

let createPageButton;
function renderPagination() {
    const paginationUl = document.getElementById('paginationUl');
    const totalPages = Math.ceil(userDatas.length / employeesPerPage);

    paginationUl.innerHTML = '';

    createPageButton = (content, page) => {
        let li = document.createElement('li');
        li.classList.add('page-item');
        li.innerHTML = `<a class="page-link">${content}</a>`;
        li.addEventListener('click', () => updatePage(page));
        return li;
    };

    paginationUl.appendChild(createPageButton('<<', 1));
    paginationUl.appendChild(createPageButton('<', Math.max(1, currentPage - 1)));

    // Add page number buttons only if employeesPerPage is not 1,2,3
    if (employeesPerPage !== 1 && employeesPerPage !== 2 && employeesPerPage !== 3) {
        for (let i = 1; i <= totalPages; i++) {
            paginationUl.appendChild(createPageButton(i, i));
        }
    }

    paginationUl.appendChild(createPageButton('>', Math.min(totalPages, currentPage + 1)));
    paginationUl.appendChild(createPageButton('>>', totalPages));

    highlightCurrentPage();
}

// HIGHLIGHT PAGE BTN

function highlightCurrentPage() {
    document.querySelectorAll('#paginationUl li').forEach(btn => {
        if (btn.textContent == currentPage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

//--------------- POPUP FUNCTION -----------------------//

function popupMessage(msg, icon) {
    setTimeout(() => {
        Swal.fire({
            title: `Employee ${msg}`,
            text: `Employee ${msg}`,
            icon: `${icon}`
        });
    }, 0);
}


//--------------- SEARCH FUNCTION-----------------------//

let searchResultNo = document.getElementById('serchResultNo');
function search() {
    const searchInput = document.getElementById('searchinput').value.toLowerCase();
    if (searchInput === '') {
        userDatas = [...originalData]; // Reset to original data
        employeesPerPage = parseInt(document.getElementById('emply_perpage').value);
        updatePage(1);
        return;
    }

    userDatas = originalData.filter(employee => {
        return Object.values(employee).some(val =>
            String(val).toLowerCase().includes(searchInput)
        );
    });

    if (userDatas.length === 0) {
        tableBody.innerHTML = `<tr><td class="colo-r text-center" colspan="8">"${searchInput}" not found</td></tr>`;
        searchResultNo.style.display = 'none';
        return;
    }

    updatePage(1);
}


// PAGE CLOSING FUNCTION

function closefunction() {

    document.getElementById("addemployee").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("editemployee").style.display = "none";
    document.getElementById("delete_employee").style.display = "none";
}

document.getElementById('cancel').addEventListener('click', () => {
    closefunction();
    validationclear()
})

document.getElementById("close").addEventListener("click", () => {
    closefunction();
    validationclear()
});




//--------------- ADDING EMPLOYEE -----------------------//

let display_data = document.getElementById("add_emp_data");
display_data.addEventListener("click", () => {
    empdata()

});

function empdata() {
    document.getElementById("addemployee").style.display = "block";
    document.getElementById("overlay").style.display = "block";

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

        console.log("Avatar uploaded sucessfully", imgdata);
        newempdata.id = data.id;
        userDatas.unshift(newempdata)
        updatePage(1)
        popupMessage("added succesfully", "success")

    }
    catch (error) {
        popupMessage("failed to add", "error")
    }


}

//--------------- UPDATE EMPLOYEE -----------------------//


//image updating 
let inputfileedit = document.getElementById('image_upload_edit')
let profilepicedit = document.getElementById('edit_image')


inputfileedit.onchange = function () {
    profilepicedit.src = URL.createObjectURL(inputfileedit.files[0])

}


let filtereddata;

function updateEmployee(empid) {
    try {


        document.getElementById("editemployee").style.display = "block";
        document.getElementById("overlay").style.display = "block";
        // let filldata = userDatas.filter(element => element.id == empid);

        // filtereddata = filldata[0];

        fetch(`http://localhost:3000/employees/${empid}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },

        }).then((res) => res.json())
            .then(data => {


                document.getElementById('edit_image').src = `http://localhost:3000/employees/${empid}/avatar`;
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
                document.querySelector(`input[name="editgender"][value='${data.gender}']`).checked = true;

                //dob
                let [day, month, year] = data.dob.split("-");
                let newdob = `${year}-${month}-${day}`;
                document.getElementById("editdate").value = newdob;
                console.log("hello", data);
                filtereddata = data;

            }).catch(error => {
                popupMessage("failed to fetch details", "error")
            })
    } catch (error) {
        popupMessage("failed to fetch", "error")
    }

    let updateemployee = document.getElementById('save');
    updateemployee.addEventListener('click', async function handler() {
        const editvalidationresult = ValidationEdit();
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
            renderTable(1);
            closefunction()
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
    console.log("bbcb", filtereddata);
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
                userDatas = userDatas.map(user => user.id === empid ? { ...user, ...newempdata } : user);
                // fetchData(); // Refresh data after update
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

//  CLOSE FUNCTION
document.getElementById("upclose").addEventListener("click", () => {
    closefunction();
});

document.getElementById('editcancelbtn').addEventListener('click', () => {
    closefunction();
})




//--------------- DELETE EMPLOYEE -----------------------//


function deleteEmployee(empid) {
    document.getElementById("delete_employee").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    const deleteValue = document.getElementById("deletedetails");
    deleteValue.addEventListener("click", function deletem() {
        DeleteData(empid);

        deleteValue.removeEventListener('click', deletem)
    });
}

const DeleteData = async (empid) => {
    let newid = empid;
    let indexid = userDatas.findIndex(person => person.id == newid)
    if (indexid === -1) {
        console.error('Employee not found');
        return;
    }


    const res = await fetch(`${fetchUrl}/${empid}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error('Failed to delete data');
    }

    const data = await res.json();
    console.log("Successfully deleted", data);

    // Remove the entry from the local data array
    userDatas.splice(indexid, 1);

    // Update the table by removing the corresponding row
    const tableRow = document.querySelector(`#row-${empid}`);
    if (tableRow) {
        tableRow.remove();
    }

    updatePage(1);
    closefunction();

};


document.getElementById("deleteclose").onclick = function () {
    closefunction()
};

document.getElementById("delete_cancel").onclick = () => {
    closefunction()
}





//--------------- ADD EMPLOYEE VALIDATION -----------------------//

let validbtn = document.getElementById('addempdetails');
validbtn.addEventListener('click', () => {

    const validationresult = addValidation();
    if (!validationresult) {
        return
    }
    else {
        empdata()
        closefunction();
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




// CLEAR ERROR MSG AFTER TYPING

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


//--------------- UPDATE VALIDATION -----------------------//


function ValidationEdit() {
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