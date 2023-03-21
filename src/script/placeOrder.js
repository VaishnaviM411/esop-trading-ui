import { CreateOrder } from "./createOrder.js";

const form = document.getElementById('createOrder')

const createOrder = new CreateOrder()
form.addEventListener("submit", createOrder.createOrder)
