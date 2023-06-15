function updateQtyPlus(to) {
    let a = document.getElementById("ticket" + to);
    a.value = parseInt(a.value) + 1
    updatePrice()
}

function updateQtyMinus(to) {
    let a = document.getElementById("ticket" + to);
    a.value = parseInt(a.value) - 1
    if (a.value < 0) a.value = 0;
    updatePrice()
}

function updatePrice() {
    let totalPrice = 0
    let totalTicket = 0
    for(let i = 1; i <= 4; i++) {
        let a = document.getElementById("ticket" + i);
        totalTicket += parseInt(a.value);
        let tmp = 0
        switch (i) {
            case 1:
            case 3:
                tmp = parseInt(a.value) * 4000;
                break;
            case 2:
                tmp = parseInt(a.value) * 5000;
                break;
            case 4:
                tmp = parseInt(a.value) * 5500;
                break;
        }
        totalPrice += tmp;
    }
    document.getElementById("totalTickets").innerText = `Total: ${totalTicket} tickets`;
    document.getElementById("totalPrice").innerText = `₩ ${totalPrice}`
}

function reset() {
    for(let i = 1; i <= 4; i++) {
        document.getElementById("ticket" + i).value = 0;
    }
    updatePrice();
}

function buyTickets() {
    let newT = []
    for(let i = 1; i <= 4; i++) {
        newT.push(document.getElementById("ticket" + i).value);
    }
    let oldT = localStorage.getItem("tickets").split('/');
    for(let i = 0; i < 4; i++) {
        newT[i] = parseInt(oldT[i]) + parseInt(newT[i]);
    }
    localStorage.setItem("tickets", newT.join('/'));
    console.log(localStorage.getItem("tickets"));
    location.href = "./index.html";
    reset();
}

updatePrice()