import OrderHistoryAPIService from "./orderHistoryAPIService.js";

let orders
(async function () {
    const queryString = window.location.search;

    const username = new URLSearchParams(queryString).get('username')

    const orderHistoryAPIService = new OrderHistoryAPIService()
    const response = await orderHistoryAPIService.orderHistoryAPI(username)
    handleResponse(response)
})()

async function handleResponse(response) {
    const data = await response.json()
    if (response.status == 200) {
        orders = data
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
    row.addEventListener("click", showModal);

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
    switch(order["status"]) {
        case "COMPLETE": status.innerText = String.fromCodePoint(0x2705);break;
        case "PARTIAL": status.innerText = String.fromCodePoint(0x1F535);break;
        default: status.innerText = ""
    }
    
    row.appendChild(status)

    return row
}


function showModal(event){
    console.log("show modal called");
    const modalEle = document.createElement("div")
    modalEle.setAttribute("class", "modal")
    const modalContentEle = document.createElement("div")
    modalContentEle.setAttribute("class","modal-content")
    const closeBtn = document.createElement("span")
    
    closeBtn.innerHTML = "&times;"
    closeBtn.setAttribute("class", "close")
    modalContentEle.appendChild(closeBtn)

    const content = document.createElement("div")
    content.innerText = JSON.stringify( orders[event.currentTarget.rowIndex-1], null, 4)

    modalContentEle.appendChild(content)

    modalEle.appendChild(modalContentEle)
    document.body.appendChild(modalEle)

    closeBtn.onclick = function() {
        modalEle.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == modalEle) {
          modal.style.display = "none";
        }
      }
}
  
  
