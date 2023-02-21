const form = document.getElementById('createOrder')

const queryString = window.location.search;

const username = new URLSearchParams(queryString).get('username')
form.addEventListener("submit", createOrder)

async function createOrder(event) {
    event.preventDefault()

    clearResultDiv()
    const response = await fetch(`http://localhost:8080/user/${username}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getBody()
    })

    handleResponse(response)
}

async function handleResponse(response) {
    const data = await response.json()

    if (response.status == 200) {
        alert("Order placed successfully!")
        clearCreateOrderForm()
        selectEsopType()
    } else {
        errors = data["error"]
        displayErrors(errors)
    }
}

function clearResultDiv() {
    document.getElementById("result").innerHTML = ""
}

function displayErrors(errors) {
    const errorCard = document.getElementById("result")
    for (let i = 0; i < errors.length; i++) {
        const errorMessage = document.createElement("li")
        errorMessage.setAttribute("id", "error")
        errorMessage.innerText = errors[i]
        errorCard.append(errorMessage)
    }
    errorCard.style.display = "flex"
}

function createOrderCard(data) {
    const order = document.getElementById('result')
    const orderCard = document.createElement("div")

    const orderIdEle = document.createElement("p")
    orderIdEle.innerText = `OrderId: ${data.orderId}`

    const quantityEle = document.createElement("p")
    quantityEle.innerText = `Quantity: ${data.quantity}`

    const priceEle = document.createElement("p")
    priceEle.innerText = `Price: ${data.price}`

    const orderTypeEle = document.createElement("p")
    orderTypeEle.innerText = `Type: ${data.type}`

    const orderStatusEle = document.createElement("p")
    orderStatusEle.innerText = `Status: ${data.status}`

    orderCard.appendChild(orderTypeEle)
    orderCard.appendChild(quantityEle)
    orderCard.appendChild(priceEle)

    if (data.type == 'SELL') {
        const esopTypeEle = document.createElement("p")
        esopTypeEle.innerText = `ESOP type: ${data.esopType}`
        orderCard.appendChild(esopTypeEle)
    }

    orderCard.appendChild(orderStatusEle)

    order.appendChild(orderCard)
}

function getBody() {

    const orderType = document.getElementById('orderType').value
    const price = document.getElementById('price').value
    const esopType = document.getElementById('esopType').value
    const quantity = document.getElementById('quantity').value

    return JSON.stringify({
        "type": orderType,
        "quantity": quantity,
        "price": price,
        "esopType": orderType == "SELL" ? esopType : undefined
    })
}

function clearCreateOrderForm() {
    document.getElementById("orderType").value = "BUY"
    document.getElementById("price").value = null
    document.getElementById("quantity").value = null
    document.getElementById("esopType").value = "PERFORMANCE"
}

function selectEsopType() {
    let orderType = document.getElementById("orderType").value
    if (orderType == "BUY") {
        document.getElementById("esopTypeDiv").style.display = "none"
    } else {
        document.getElementById("esopTypeDiv").style.display = "flex"
    }
}
