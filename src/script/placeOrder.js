import { CreateOrder } from "./createOrder.js";
import "../css/createOrder.css"
import "../css/index.css"

const form = document.getElementById('createOrder')

const createOrder = new CreateOrder()
form.addEventListener("submit", createOrder.createOrder)
