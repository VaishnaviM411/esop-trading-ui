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
        successAlert(data)
        clearCreateOrderForm()
        selectEsopType()
    } else {
        errors = data["error"]
        displayErrors(errors)
    }
}

function successAlert(data) {
    const orderDetails = createOrderDetails(data)
    alert("Order placed successfully!" + "\n" + orderDetails)
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

function createOrderDetails(data) {
    const orderDetails = `OrderId: ${data.orderId}\n`
        + `Quantity: ${data.quantity}\n`
        + `Price: ${data.price}\n`
        + `Type: ${data.type}\n`
        + `Status: ${data.status}\n`

    if (data.type == 'SELL') {
        orderDetails += `ESOP type: ${data.esopType}`
    }

    return orderDetails
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
