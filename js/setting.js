function updateDropdownName() {
    let restaurantName = document.getElementById("restaurantDropdown");
    let tmp = localStorage.getItem("restaurant")
    console.log(tmp);
    switch(tmp) {
        case "dormitorykor":
            restaurantName.innerText = "Dormitory - Korean";
            break;
        case "dormitoryhal":
            restaurantName.innerText = "Dormitory - Halral";
            break;
        case "student":
            restaurantName.innerText = "Student Cafeteria";
            break;
        case "dining":
            restaurantName.innerText = "Dining Hall";
            break;
    }
}

function updateRestaurant(id) {
    localStorage.setItem("restaurant", id);
    updateDropdownName();
}

function initializeCheckbox() {
    let tmp = localStorage.getItem("allergy");
    allergies = tmp.split('/');
    if (allergies[0] === '') return;
    for (let i = 0; i < allergies.length; i++) {
        console.log("allergy" + allergies[i]);
        let a = document.getElementById("allergy" + allergies[i]);
        a.setAttribute("checked", true);
    }
}

function updateAllergy() {
    let tmp = [];
    for (let i = 1; i <= 19; i++) {
        let a = document.getElementById("allergy" + i);
        if(a.checked) {
            tmp.push(i);
        }
    }
    localStorage.setItem("allergy", tmp.join('/'));
    console.log(localStorage.getItem("allergy"));
}

function resetInformation() {
    localStorage.setItem("restaurant", "dormitorykor");
    localStorage.setItem("allergy", "");
    localStorage.setItem("tickets", "0/0/0/0");
    localStorage.setItem("first", "0");
    updateDropdownName();
    updateAllergy();
}

updateDropdownName();
initializeCheckbox();
