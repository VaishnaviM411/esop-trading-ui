import CreateOrderAPIService from "./createOrderAPIService.js";

export class CreateOrder{
   
    async createOrder(event) {
        const queryString = window.location.search;
        const username = new URLSearchParams(queryString).get('username')
        event.preventDefault()
    
        this.clearResultDiv()
        const apiService = new CreateOrderAPIService()
        const response = apiService.placeOrderAPI(this.getBody(),username)
    
        this.handleResponse(response)
    }

    async handleResponse(response) {
        const data = await response.json()
    
        if (response.status == 200) {
            this.successAlert(data)
            this.clearCreateOrderForm()
            this.selectEsopType()
        } else {
            errors = data["error"]
            this.displayErrors(errors)
        }
    }
    clearResultDiv = () => {
        document.getElementById("result").innerHTML = ""
    }
    
 successAlert(data) {
        const orderDetails = this.createOrderDetails(data)
        alert("Order placed successfully!" + "\n" + orderDetails)
    }
    
 
    
 displayErrors(errors) {
        const errorCard = document.getElementById("result")
        for (let i = 0; i < errors.length; i++) {
            const errorMessage = document.createElement("li")
            errorMessage.setAttribute("id", "error")
            errorMessage.innerText = errors[i]
            errorCard.append(errorMessage)
        }
        errorCard.style.display = "flex"
    }
    
 createOrderDetails(data) {
        var orderDetails = `OrderId: ${data.orderId}\n`
            + `Quantity: ${data.quantity}\n`
            + `Price: ${data.price}\n`
            + `Type: ${data.type}\n`
            + `Status: ${data.status}\n`
    
        if (data.type == 'SELL') {
            orderDetails += `ESOP type: ${data.esopType}`
        }
    
        return orderDetails
    }
    
 getBody() {
    
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
    
 clearCreateOrderForm() {
        document.getElementById("orderType").value = "BUY"
        document.getElementById("price").value = null
        document.getElementById("quantity").value = null
        document.getElementById("esopType").value = "PERFORMANCE"
    }
    
 selectEsopType() {
        let orderType = document.getElementById("orderType").value
        if (orderType == "BUY") {
            document.getElementById("esopTypeDiv").style.display = "none"
        } else {
            document.getElementById("esopTypeDiv").style.display = "flex"
        }
    }
    
}

