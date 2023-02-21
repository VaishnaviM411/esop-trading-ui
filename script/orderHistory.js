(async function () {

    const queryString = window.location.search;

    const username = new URLSearchParams(queryString).get('username')

    const response = await fetch(`http://localhost:8080/user/${username}/order`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    handleResponse(response)

})()

async function handleResponse(response) {
    const data = await response.json()
    if (response.status == 200) {
        displayHistory(data)
    } else {
        alert("404 not found")
    }
}

function displayHistory(data) {
    const orderHistory = document.getElementById("orderHistoryTable")
    data.forEach(order => {
        const row = createOrderRow(order)
        orderHistory.appendChild(row)
    });
}

function createOrderRow(order) {
    const row = document.createElement("tr")

    const orderId = document.createElement("td")
    orderId.innerText = order["orderId"]
    row.appendChild(orderId)

    const type = document.createElement("td")
    type.innerText = order["type"]
    row.appendChild(type)

    const quantity = document.createElement("td")
    quantity.innerText = order["quantity"]
    row.appendChild(quantity)

    const price = document.createElement("td")
    price.innerText = order["price"]
    row.appendChild(price)

    const esopType = document.createElement("td")
    esopType.innerText = order["esopType"]=="PERFORMANCE" ? String.fromCodePoint(0x2B50) : ""
    row.appendChild(esopType)

    const status = document.createElement("td")
    status.innerText = order["status"]
    row.appendChild(status)

    return row
}


