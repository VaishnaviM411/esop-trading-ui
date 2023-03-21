import CreateOrderAPIService from "../src/script/createOrderAPIService.js"



describe("Create Order Tests", () => {
    let createOrderService = new CreateOrderAPIService()

    it("should return error given insufficient amount in wallet", async () => {
        const mockRequestBody = JSON.stringify({
            "type": "BUY",
            "quantity": 10,
            "price": 10
        })
        const body = mockRequestBody
        const mockUsername = "harsh"
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve({ "error": ["insufficient wallet funds"] })
        }));


        let response = await createOrderService.placeOrderAPI(mockRequestBody, mockUsername)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/user/${mockUsername}/order`, { body, "headers": { "Content-Type": "application/json" }, "method": "POST" })
        expect(response).toEqual({ "error": ["insufficient wallet funds"] })

        global.fetch.mockRestore()
    })

    it("should return error if user does not exist", async () => {
        const mockRequestBody = JSON.stringify({
            "type": "BUY",
            "quantity": 10,
            "price": 10
        })
        const body = mockRequestBody
        const mockUsername = "john"
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve({ "error": ["user does not exists"] })
        }))

        let response = await createOrderService.placeOrderAPI(mockRequestBody, mockUsername)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/user/${mockUsername}/order`, { body, "headers": { "Content-Type": "application/json" }, "method": "POST" })
        expect(response).toEqual({ "error": ["user does not exists"] })

        global.fetch.mockRestore()
    })

    it("should place order", async () => {
        const mockRequestBody = JSON.stringify({
            "type": "BUY",
            "quantity": 10,
            "price": 10
        })
        const body = mockRequestBody
        const mockUsername = "vaishnavi"
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve({
                "orderId": "16",
                "username": "vaishnavi",
                "type": "BUY",
                "quantity": 20,
                "price": 10,
                "esopType": "NON_PERFORMANCE",
                "status": "PLACED",
                "remainingQuantity": 20,
                "createdAt": 1679394821574
            })
        }))

        let response = await createOrderService.placeOrderAPI(mockRequestBody, mockUsername)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/user/${mockUsername}/order`, { body, "headers": { "Content-Type": "application/json" }, "method": "POST" })
        expect(response).toEqual({
            "orderId": "16",
            "username": "vaishnavi",
            "type": "BUY",
            "quantity": 20,
            "price": 10,
            "esopType": "NON_PERFORMANCE",
            "status": "PLACED",
            "remainingQuantity": 20,
            "createdAt": 1679394821574
        })

        global.fetch.mockRestore()
    })

})