import { CreateOrder } from "../src/script/createOrder"

describe("Create Order Tests", () => {

    it("should send alert with given data", async () => {
        const mockData = {
            orderId: "16",
            username: "vaishnavi",
            type: "BUY",
            quantity: 20,
            price: 10,
            esopType: "NON_PERFORMANCE",
            status: "PLACED",
            remainingQuantity: 20,
            createdAt: 1679394821574
        }
        const mockResponse = 
            "OrderId: 16\n" +
            "Quantity: 20\n" +
            "Price: 10\n" +
            "Type: BUY\n" +
            "Status: PLACED\n"
        global.alert = jest.fn().mockImplementationOnce()

        const createOrder = new CreateOrder()
        createOrder.successAlert(mockData)
        
        expect(global.alert).toHaveBeenCalledTimes(1)
        expect(global.alert).toHaveBeenCalledWith("Order placed successfully!" + "\n" + mockResponse)
    })

})