if (localStorage.length != 4) {
    localStorage.setItem("restaurant", "dormitorykor");
    localStorage.setItem("allergy", "");
    localStorage.setItem("tickets", "0/0/0/0");
    localStorage.setItem("first", "0");
}

if (localStorage.getItem("first") === "0") {
    const myModal = new bootstrap.Modal($('#firstModal'));
    myModal.show();
    localStorage.setItem("first", "1");
}

function updateMenu(menu, allergy) {
    // restaurant name
    let restaurantName = document.getElementById("restaurant_name");
    let tmp = localStorage.getItem("restaurant")
    switch(tmp) {
        case "dormitorykor":
            restaurantName.innerText = "Dormitory Cafeteria Korean";
            break;
        case "dormitoryhal":
            restaurantName.innerText = "Dormitory Cafeteria Halral";
            break;
        case "student":
            restaurantName.innerText = "Student Cafeteria";
            break;
        case "dining":
            restaurantName.innerText = "Dining Hall";
            break;
    }


    // menus
    let menulist = document.getElementById("menu_list");
    let myAllergies = localStorage.getItem('allergy');
    menulist.innerHTML = '';
    let menus = menu.split('/');
    let allergies = allergy.split('/');
    for (let i = 0; i < menus.length; i++) {
        let menuNode = document.createElement('li');
        menuNode.classList.add('list-group-item');
        menuNode.innerText = menus[i];
        let allergyNode = document.createElement('div');
        allergyNode.classList.add('allergy-information');
        allergyNode.innerText = allergies[i];
        let a = menulist.appendChild(menuNode);
        a.appendChild(allergyNode);
        let tmp = myAllergies.split('/')
        for(let al in tmp) {
            if (tmp[al] === '') break;
            console.log(tmp[al])
            if (allergies[i].split('.').includes(tmp[al])) {
                menuNode.classList.add('bg-warning');
            }
        }
    }
}

let data = {};
Papa.parse("../data/data.csv", {
    download: true,
    step: function(row) {
        data[row.data[0]] = {};
        data[row.data[0]]['menu'] = row.data[1];
        data[row.data[0]]['allergy'] = row.data[2];
    },
    complete: function() {
        updateMenu(data[localStorage.getItem("restaurant")]["menu"],
            data[localStorage.getItem("restaurant")]["allergy"]);
    }
});

console.log(localStorage.getItem("restaurant"));
console.log(localStorage.getItem("allergy"));
console.log(localStorage.getItem("tickets"));

let tickets = localStorage.getItem("tickets").split('/')
let flag = false;
let tmp = localStorage.getItem("restaurant")
switch(tmp) {
    case "dormitorykor":
        document.getElementById("tickets").innerText = `${parseInt(tickets[0])} Tickets`;
        if (parseInt(tickets[0]) > 0) flag = true;
        break;
    case "dormitoryhal":
        document.getElementById("tickets").innerText = `${parseInt(tickets[1])} Tickets`;
        if (parseInt(tickets[1]) > 0) flag = true;
        break;
    case "student":
        document.getElementById("tickets").innerText = `${parseInt(tickets[2])} Tickets`;
        if (parseInt(tickets[2]) > 0) flag = true;
        break;
    case "dining":
        document.getElementById("tickets").innerText = `${parseInt(tickets[3])} Tickets`;
        if (parseInt(tickets[3]) > 0) flag = true;
        break;
}

if (!flag) {
    document.getElementById("top_bar").setAttribute("href", "");
    document.getElementById("top_description").innerText = "";
    document.getElementById("buy_button").classList.add("btn-danger");
}